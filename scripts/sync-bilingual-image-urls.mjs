import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const IMAGE_URL_RE = /https?:\/\/[^)"\s>]+/g;
const IMAGE_URL_FILTER = (url) => /cloudinary|\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(url);
const PARAMETERIZED_UPLOAD_RE = /\/upload\/[^/]+\/v\d+/i;
const BASE_UPLOAD_RE = /\/image\/upload\/v\d+\//i;

function isParameterizedUpload(url) {
  return PARAMETERIZED_UPLOAD_RE.test(url);
}

function isBaseUpload(url) {
  return BASE_UPLOAD_RE.test(url) && !isParameterizedUpload(url);
}

function basenameFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname.split("/").pop() || "");
  } catch {
    return url;
  }
}

function counterpartPath(filePath) {
  if (filePath.startsWith("content/en/posts/")) {
    return filePath.replace("content/en/posts/", "content/ja/posts/");
  }
  if (filePath.startsWith("content/ja/posts/")) {
    return filePath.replace("content/ja/posts/", "content/en/posts/");
  }
  return null;
}

function extractImageUrls(content) {
  const urls = content.match(IMAGE_URL_RE) || [];
  const filtered = urls.filter(IMAGE_URL_FILTER);
  return [...new Set(filtered)];
}

function chooseCandidate(candidates, isThumbnailLine, isCldimgLine) {
  const withParams = candidates.filter(isParameterizedUpload);
  const withoutParams = candidates.filter((u) => !isParameterizedUpload(u));
  const baseUploads = candidates.filter(isBaseUpload);

  if (isThumbnailLine) {
    return withParams[0] || withoutParams[0] || candidates[0];
  }

  if (isCldimgLine) {
    return baseUploads[0] || withoutParams[0] || withParams[0] || candidates[0];
  }

  return withoutParams[0] || withParams[0] || candidates[0];
}

function syncContent(sourceContent, targetContent) {
  const sourceUrls = extractImageUrls(sourceContent);
  if (sourceUrls.length === 0) {
    return { content: targetContent, changed: false, replacements: 0 };
  }

  const byBasename = new Map();
  for (const url of sourceUrls) {
    const key = basenameFromUrl(url);
    const list = byBasename.get(key) || [];
    list.push(url);
    byBasename.set(key, list);
  }

  let replacements = 0;
  const updated = targetContent.replace(IMAGE_URL_RE, (targetUrl, offset) => {
    if (!IMAGE_URL_FILTER(targetUrl)) {
      return targetUrl;
    }

    const key = basenameFromUrl(targetUrl);
    const candidates = byBasename.get(key);
    if (!candidates || candidates.length === 0) {
      return targetUrl;
    }

    const lineStart = targetContent.lastIndexOf("\n", offset) + 1;
    const lineEnd = targetContent.indexOf("\n", offset);
    const line = targetContent.slice(lineStart, lineEnd === -1 ? targetContent.length : lineEnd);
    const isThumbnail = /^\s*thumbnail\s*:/i.test(line);
    const isCldimg = /{{<\s*cldimg\b/i.test(line);

    const chosen = chooseCandidate(candidates, isThumbnail, isCldimg);
    if (!chosen || chosen === targetUrl) {
      return targetUrl;
    }

    replacements += 1;
    return chosen;
  });

  return { content: updated, changed: updated !== targetContent, replacements };
}

function getStagedMarkdownFiles() {
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "--cached", "--diff-filter=ACMRT", "--", "content/**/*.md"],
    { encoding: "utf8" }
  );

  return output
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function syncPair(sourcePath, targetPath) {
  if (!existsSync(sourcePath) || !existsSync(targetPath)) {
    return { changed: false, replacements: 0 };
  }

  const [sourceContent, targetContent] = await Promise.all([
    readFile(sourcePath, "utf8"),
    readFile(targetPath, "utf8"),
  ]);

  const result = syncContent(sourceContent, targetContent);
  if (!result.changed) {
    return result;
  }

  await writeFile(targetPath, result.content, "utf8");
  execFileSync("git", ["add", targetPath]);
  return result;
}

async function main() {
  const rawArgs = process.argv.slice(2);
  const useStaged = rawArgs.includes("--staged");

  const fileArgs = rawArgs
    .filter((arg) => arg !== "--staged")
    .filter((arg) => arg.toLowerCase().endsWith(".md"));

  const targets = useStaged ? getStagedMarkdownFiles() : fileArgs;
  const uniqueTargets = [...new Set(targets)].filter((filePath) => filePath.startsWith("content/"));

  if (uniqueTargets.length === 0) {
    return;
  }

  const changedSet = new Set(uniqueTargets);
  const processedPairs = new Set();
  const updatedFiles = [];

  for (const sourcePath of uniqueTargets) {
    const targetPath = counterpartPath(sourcePath);
    if (!targetPath) {
      continue;
    }

    const pairKey = [sourcePath, targetPath].sort().join("::");
    if (processedPairs.has(pairKey)) {
      continue;
    }

    if (changedSet.has(targetPath)) {
      // If both sides were explicitly changed in the same commit,
      // do not auto-overwrite either side.
      processedPairs.add(pairKey);
      continue;
    }

    const result = await syncPair(sourcePath, targetPath);
    processedPairs.add(pairKey);

    if (result.changed) {
      updatedFiles.push({ filePath: targetPath, replacements: result.replacements });
    }
  }

  if (updatedFiles.length > 0) {
    for (const item of updatedFiles) {
      console.log(`synced ${item.filePath} (${item.replacements} replacements)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
