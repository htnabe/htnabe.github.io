import assert from "node:assert/strict";
import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ensureHugo, runHugo } from "../scripts/run-hugo.mjs";

const exec = promisify(execFile);
const runner = fileURLToPath(new URL("../scripts/run-hugo.mjs", import.meta.url));
const version = "hugo v0.166.0-test+extended linux/amd64";

async function fixture(t, reportedVersion = version) {
  const root = await mkdtemp(join(tmpdir(), "t-pot-hugo-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
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
  const requests = [];
  const fetchRelease = async (url) => {
    requests.push(url);
    return new Response(
      url.endsWith("_checksums.txt")
        ? `${checksum}  hugo_extended_0.166.0_linux-amd64.tar.gz\n`
        : archive
    );
  };
  return { root, cacheRoot: join(root, "cache"), fetchRelease, requests };
}

test("downloads once, reuses the verified cache, and forwards arguments and failures", async (t) => {
  const options = await fixture(t);
  const binary = await ensureHugo(options);
  assert.equal(options.requests.length, 2);
  assert.ok(
    options.requests.every((url) =>
      url.startsWith("https://github.com/gohugoio/hugo/releases/download/v0.166.0/")
    )
  );
  assert.equal(await ensureHugo(options), binary);
  assert.equal(options.requests.length, 2);
  const result = await exec(
    process.execPath,
    [runner, "server", "--port", "1456", "argument with spaces"],
    { env: { ...process.env, XDG_CACHE_HOME: options.cacheRoot } }
  );
  assert.deepEqual(JSON.parse(result.stdout), ["server", "--port", "1456", "argument with spaces"]);
  assert.equal(await runHugo(["fail"], options), 7);
});

test("concurrent first starts publish only complete binaries and clean temporary downloads", async (t) => {
  const options = await fixture(t);
  const [first, second] = await Promise.all([ensureHugo(options), ensureHugo(options)]);
  assert.equal(first, second);
  assert.match((await exec(first, ["version"])).stdout, /v0\.166\.0.*\+extended/);
  assert.deepEqual(await readdir(dirname(first)), ["hugo"]);
});

test("rejects checksum mismatch without installing a binary", async (t) => {
  const options = await fixture(t);
  const fetchRelease = options.fetchRelease;
  options.fetchRelease = (url) =>
    url.endsWith("_checksums.txt")
      ? Promise.resolve(
          new Response(`${"0".repeat(64)}  hugo_extended_0.166.0_linux-amd64.tar.gz\n`)
        )
      : fetchRelease(url);
  await assert.rejects(ensureHugo(options), /checksum mismatch/i);
  assert.deepEqual(
    await readdir(join(options.cacheRoot, "t-pot", "hugo", "0.166.0-linux-amd64")),
    []
  );
});

test("reports download errors instead of falling back to PATH", async (t) => {
  const options = await fixture(t);
  options.fetchRelease = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(ensureHugo(options), /503/);
});

test("rejects a release without the expected checksum entry", async (t) => {
  const options = await fixture(t);
  options.fetchRelease = async () => new Response("not a checksums file");
  await assert.rejects(ensureHugo(options), /checksum.*missing/i);
});

for (const reportedVersion of ["hugo v0.167.0+extended linux/amd64", "hugo v0.166.0 linux/amd64"]) {
  test(`rejects incompatible downloaded and cached binaries: ${reportedVersion}`, async (t) => {
    const options = await fixture(t, reportedVersion);
    await assert.rejects(ensureHugo(options), /expected Hugo 0\.166\.0 extended/i);
    const binary = join(options.cacheRoot, "t-pot", "hugo", "0.166.0-linux-amd64", "hugo");
    await writeFile(binary, await readFile(join(options.root, "source", "hugo")), { mode: 0o755 });
    options.fetchRelease = () => {
      assert.fail("must not silently replace an invalid cached binary");
    };
    await assert.rejects(ensureHugo(options), /expected Hugo 0\.166\.0 extended/i);
  });
}

test(
  "CLI ignores system Hugo and forwards termination to the server",
  { timeout: 10_000 },
  async (t) => {
    const options = await fixture(t);
    await ensureHugo(options);
    const systemBin = join(options.root, "system-bin");
    await mkdir(systemBin);
    await writeFile(join(systemBin, "hugo"), "#!/bin/sh\nexit 99\n", { mode: 0o755 });
    const env = {
      ...process.env,
      XDG_CACHE_HOME: options.cacheRoot,
      PATH: `${systemBin}:${process.env.PATH}`,
    };
    const { stdout } = await exec(process.execPath, [runner, "server", "--watch"], { env });
    assert.deepEqual(JSON.parse(stdout), ["server", "--watch"]);
    const child = spawn(process.execPath, [runner, "wait"], {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    t.after(() => {
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
  }
);

test("unsupported platforms fail explicitly before downloading", async (t) => {
  const options = await fixture(t);
  await assert.rejects(ensureHugo({ ...options, platform: "win32" }), /unsupported.*win32/i);
  assert.equal(options.requests.length, 0);
});
