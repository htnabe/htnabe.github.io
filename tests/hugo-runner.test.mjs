import assert from "node:assert/strict";
import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import { onTestFinished, test } from "vitest";
import { ensureHugo, runHugo } from "../scripts/run-hugo.mjs";

const exec = promisify(execFile);
const runner = fileURLToPath(new URL("../scripts/run-hugo.mjs", import.meta.url));
const version = "hugo v0.169.0-test+extended linux/amd64";
const latestRelease = "https://api.github.com/repos/gohugoio/hugo/releases/latest";

async function fixture(reportedVersion = version, releaseVersion = "0.169.0") {
  const root = await mkdtemp(join(tmpdir(), "t-pot-hugo-test-"));
  onTestFinished(() => rm(root, { recursive: true, force: true }));
  const source = join(root, "source");
  await mkdir(source);
  await writeFile(
    join(source, "hugo"),
    `#!/usr/bin/env node
if (process.argv[2] === "version") {
  console.log(${JSON.stringify(reportedVersion)});
} else if (process.argv[2] === "wait") {
  process.on("SIGTERM", () => { console.log("stopped"); process.exit(0); });
  console.log("ready");
  setInterval(() => {}, 1000);
} else {
  console.log(JSON.stringify(process.argv.slice(2)));
  process.exitCode = process.argv[2] === "fail" ? 7 : 0;
}
`
  );
  await chmod(join(source, "hugo"), 0o755);
  const archivePath = join(root, "release.tar.gz");
  await exec("tar", ["-czf", archivePath, "-C", source, "hugo"]);
  const archive = await readFile(archivePath);
  const checksum = createHash("sha256").update(archive).digest("hex");
  const fetchFixture = join(root, "fetch-fixture.mjs");
  await writeFile(
    fetchFixture,
    `import { readFile } from "node:fs/promises";
export const requests = [];
export const release = { tag_name: "v${releaseVersion}", draft: false, prerelease: false };
export async function fetchRelease(url) {
  requests.push(url);
  if (url === ${JSON.stringify(latestRelease)}) return Response.json(release);
  if (url.endsWith("_checksums.txt")) {
    return new Response(${JSON.stringify(`${checksum}  hugo_extended_${releaseVersion}_linux-amd64.tar.gz\n`)});
  }
  if (url.endsWith("hugo_extended_${releaseVersion}_linux-amd64.tar.gz")) {
    return new Response(await readFile(${JSON.stringify(archivePath)}));
  }
  throw new Error("Unexpected fixture request: " + url);
}
`
  );
  const preload = join(root, "preload.mjs");
  await writeFile(
    preload,
    'import { fetchRelease } from "./fetch-fixture.mjs";\nglobalThis.fetch = fetchRelease;\n'
  );
  const { fetchRelease, requests, release } = await import(pathToFileURL(fetchFixture).href);
  return { root, cacheRoot: join(root, "cache"), fetchRelease, requests, release, preload };
}

test("checks the latest release each time, reuses its verified cache, and forwards arguments and failures", async () => {
  const options = await fixture();
  const binary = await ensureHugo(options);
  assert.equal(options.requests.length, 3);
  assert.equal(options.requests[0], latestRelease);
  assert.ok(
    options.requests
      .slice(1)
      .every((url) =>
        url.startsWith("https://github.com/gohugoio/hugo/releases/download/v0.169.0/")
      )
  );
  assert.equal(await ensureHugo(options), binary);
  assert.equal(options.requests.length, 4);
  assert.equal(options.requests[3], latestRelease);
  const result = await exec(
    process.execPath,
    ["--import", options.preload, runner, "server", "--port", "1456", "argument with spaces"],
    { env: { ...process.env, XDG_CACHE_HOME: options.cacheRoot } }
  );
  assert.deepEqual(JSON.parse(result.stdout), ["server", "--port", "1456", "argument with spaces"]);
  assert.equal(await runHugo(["fail"], options), 7);
});

test("concurrent first starts publish only complete binaries and clean temporary downloads", async () => {
  const options = await fixture();
  const [first, second] = await Promise.all([ensureHugo(options), ensureHugo(options)]);
  assert.equal(first, second);
  assert.match((await exec(first, ["version"])).stdout, /v0\.169\.0.*\+extended/);
  assert.deepEqual(await readdir(dirname(first)), ["hugo"]);
});

test("rejects checksum mismatch without installing a binary", async () => {
  const options = await fixture();
  const fetchRelease = options.fetchRelease;
  options.fetchRelease = (url) =>
    url.endsWith("_checksums.txt")
      ? Promise.resolve(
          new Response(`${"0".repeat(64)}  hugo_extended_0.169.0_linux-amd64.tar.gz\n`)
        )
      : fetchRelease(url);
  await assert.rejects(ensureHugo(options), /checksum mismatch/i);
  assert.deepEqual(
    await readdir(join(options.cacheRoot, "t-pot", "hugo", "0.169.0-linux-amd64")),
    []
  );
});

test("reports download errors instead of falling back to PATH", async () => {
  const options = await fixture();
  options.fetchRelease = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(ensureHugo(options), /503/);
});

test("rejects a release without the expected checksum entry", async () => {
  const options = await fixture();
  const fetchRelease = options.fetchRelease;
  options.fetchRelease = (url) =>
    url.endsWith("_checksums.txt")
      ? Promise.resolve(new Response("not a checksums file"))
      : fetchRelease(url);
  await assert.rejects(ensureHugo(options), /checksum.*missing/i);
});

test("installs a newly released version instead of reusing an older cached version", async () => {
  const previous = await fixture();
  const oldBinary = await ensureHugo(previous);
  const next = await fixture("hugo v0.170.0+extended linux/amd64", "0.170.0");
  const binary = await ensureHugo({ ...next, cacheRoot: previous.cacheRoot });
  assert.notEqual(binary, oldBinary);
  assert.match((await exec(binary, ["version"])).stdout, /v0\.170\.0\+extended/);
});

test("fails when latest release lookup fails even if an older verified binary is cached", async () => {
  const options = await fixture();
  await ensureHugo(options);
  options.fetchRelease = async () => new Response("rate limited", { status: 403 });
  await assert.rejects(ensureHugo(options), /403/);
});

test("uses the GitHub token only for release metadata, not binary downloads", async () => {
  const options = await fixture();
  const previous = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "fixture-token";
  try {
    const fetchRelease = options.fetchRelease;
    options.fetchRelease = (url, request) => {
      if (url === latestRelease) {
        assert.equal(request.headers.Authorization, "Bearer fixture-token");
      } else {
        assert.equal(request.headers?.Authorization, undefined);
      }
      return fetchRelease(url);
    };
    await ensureHugo(options);
    assert.equal(options.requests.length, 3);
  } finally {
    if (previous === undefined) {
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = previous;
    }
  }
});

for (const release of [
  { tag_name: "v0.170.0-rc.1", prerelease: true, draft: false },
  { tag_name: "v0.170.0", prerelease: false, draft: true },
  { tag_name: "invalid", prerelease: false, draft: false },
]) {
  test(`rejects invalid or unstable latest release metadata: ${release.tag_name}, draft=${release.draft}`, async () => {
    const options = await fixture();
    Object.assign(options.release, release);
    await assert.rejects(ensureHugo(options), /invalid.*latest.*release/i);
    assert.deepEqual(options.requests, [latestRelease]);
  });
}

for (const reportedVersion of ["hugo v0.170.0+extended linux/amd64", "hugo v0.169.0 linux/amd64"]) {
  test(`rejects incompatible downloaded and cached binaries: ${reportedVersion}`, async () => {
    const options = await fixture(reportedVersion);
    await assert.rejects(ensureHugo(options), /expected Hugo 0\.169\.0 extended/i);
    const binary = join(options.cacheRoot, "t-pot", "hugo", "0.169.0-linux-amd64", "hugo");
    await writeFile(binary, await readFile(join(options.root, "source", "hugo")), { mode: 0o755 });
    const fetchRelease = options.fetchRelease;
    options.fetchRelease = (url) => {
      assert.equal(url, latestRelease, "must not silently replace an invalid cached binary");
      return fetchRelease(url);
    };
    await assert.rejects(ensureHugo(options), /expected Hugo 0\.169\.0 extended/i);
  });
}

test("CLI ignores system Hugo and forwards termination to the server", async () => {
  const options = await fixture();
  await ensureHugo(options);
  const systemBin = join(options.root, "system-bin");
  await mkdir(systemBin);
  await writeFile(join(systemBin, "hugo"), "#!/bin/sh\nexit 99\n", { mode: 0o755 });
  const env = {
    ...process.env,
    XDG_CACHE_HOME: options.cacheRoot,
    PATH: `${systemBin}:${process.env.PATH}`,
  };
  const { stdout } = await exec(
    process.execPath,
    ["--import", options.preload, runner, "server", "--watch"],
    { env }
  );
  assert.deepEqual(JSON.parse(stdout), ["server", "--watch"]);
  const child = spawn(process.execPath, ["--import", options.preload, runner, "wait"], {
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  onTestFinished(() => {
    if (child.exitCode === null) child.kill("SIGKILL");
  });
  let output = "";
  const stopped = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code, signal) => resolve({ code, signal }));
  });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("server did not start")), 5000);
    child.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.includes("ready")) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });
  child.kill("SIGTERM");
  assert.deepEqual(await stopped, { code: 0, signal: null });
  assert.match(output, /stopped/);
}, 10_000);

test("unsupported platforms fail explicitly before downloading", async () => {
  const options = await fixture();
  await assert.rejects(ensureHugo({ ...options, platform: "win32" }), /unsupported.*win32/i);
  assert.equal(options.requests.length, 0);
});
