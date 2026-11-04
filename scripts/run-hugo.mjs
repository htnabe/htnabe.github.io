import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { access, chmod, mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { constants, homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);
const version = "0.166.0";
const asset = `hugo_extended_${version}_linux-amd64.tar.gz`;
const release = `https://github.com/gohugoio/hugo/releases/download/v${version}`;

async function validateBinary(binary) {
  const { stdout } = await exec(binary, ["version"], { timeout: 10_000 });
  const reported = /^hugo v(\d+\.\d+\.\d+)(?:-\S+)?\+extended(?:\+withdeploy)?\s/.exec(stdout);
  if (reported?.[1] !== version) {
    throw new Error(`Expected Hugo ${version} extended at ${binary}, got: ${stdout.trim()}`);
  }
}

async function download(url, fetchRelease) {
  const response = await fetchRelease(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok) {
    throw new Error(`Hugo download failed: HTTP ${response.status} from ${url}`);
  }
  return response;
}

export async function ensureHugo({
  cacheRoot = process.env.XDG_CACHE_HOME || join(homedir(), ".cache"),
  fetchRelease = fetch,
  platform = process.platform,
  arch = process.arch,
} = {}) {
  if (platform !== "linux" || arch !== "x64") {
    throw new Error(
      `Unsupported Hugo platform: ${platform}/${arch}; this runner supports linux/x64`
    );
  }
  const directory = join(resolve(cacheRoot), "t-pot", "hugo", `${version}-linux-amd64`);
  const binary = join(directory, "hugo");
  let installed = true;
  try {
    await access(binary);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    installed = false;
  }
  if (installed) {
    await validateBinary(binary);
    return binary;
  }

  await mkdir(directory, { recursive: true, mode: 0o700 });
  const temporary = await mkdtemp(join(directory, "download-"));
  try {
    console.error(`Downloading Hugo ${version} extended to ${directory}`);
    const checksums = await (
      await download(`${release}/hugo_${version}_checksums.txt`, fetchRelease)
    ).text();
    const entry = checksums
      .split(/\r?\n/)
      .map((line) => line.trim().split(/\s+/))
      .find((parts) => parts[1] === asset || parts[1] === `*${asset}`);
    if (!entry || !/^[a-f0-9]{64}$/i.test(entry[0])) {
      throw new Error(`Hugo checksum entry missing for ${asset}`);
    }
    const archive = Buffer.from(
      await (await download(`${release}/${asset}`, fetchRelease)).arrayBuffer()
    );
    if (createHash("sha256").update(archive).digest("hex") !== entry[0].toLowerCase()) {
      throw new Error(`Hugo checksum mismatch for ${asset}`);
    }
    const archivePath = join(temporary, asset);
    const extracted = join(temporary, "hugo");
    await writeFile(archivePath, archive);
    await exec("tar", ["-xzf", archivePath, "-C", temporary, "hugo"], { timeout: 120_000 });
    await chmod(extracted, 0o755);
    await validateBinary(extracted);
    // Atomic publication keeps concurrent starts from seeing an incomplete executable.
    await rename(extracted, binary);
    return binary;
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

export async function runHugo(args, options) {
  const binary = await ensureHugo(options);
  const child = spawn(binary, args, { stdio: "inherit" });
  const handlers = new Map();
  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    const handler = () => child.kill(signal);
    handlers.set(signal, handler);
    process.on(signal, handler);
  }
  try {
    return await new Promise((resolveExit, reject) => {
      child.once("error", reject);
      child.once("exit", (code, signal) => {
        resolveExit(code ?? 128 + constants.signals[signal]);
      });
    });
  } finally {
    for (const [signal, handler] of handlers) process.off(signal, handler);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  runHugo(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      console.error(`Hugo runner: ${error.message}`);
      process.exitCode = 1;
    }
  );
}
