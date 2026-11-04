import { execFileSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const AMAZON_SHORTCODE_RE = /\{\{<\s*amazon\b[\s\S]*?>\}\}/g;
const ASIN_RE = /\basin\s*=\s*"([^"]+)"/i;
const IMAGE_URL_RE = /\bimg_url\s*=\s*"([^"]+)"/i;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36";
const REQUEST_TIMEOUT_MS = 15_000;

function parseArgs(args) {
  return {
    dryRun: args.includes("--dry-run"),
    fix: args.includes("--fix"),
    staged: args.includes("--staged"),
    files: args.filter((arg) => arg.toLowerCase().endsWith(".md")),
  };
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

function stagedMarkdownFiles() {
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "--cached", "--diff-filter=ACMRT", "--", "content/**/*.md"],
    { encoding: "utf8" }
  );
  return output.split("\n").filter((filePath) => filePath.endsWith(".md"));
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return markdownFiles(entryPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
    })
  );
  return nested.flat();
}

async function targetFiles(options) {
  const requested = options.staged ? stagedMarkdownFiles() : options.files;
  const baseFiles =
    requested.length > 0
      ? requested.filter((filePath) => filePath.startsWith("content/") && existsSync(filePath))
      : options.staged || options.files.length > 0
        ? []
        : await markdownFiles("content");
  const expanded = new Set(baseFiles);

  for (const filePath of baseFiles) {
    const counterpart = counterpartPath(filePath);
    if (counterpart && existsSync(counterpart)) {
      expanded.add(counterpart);
    }
  }

  return [...expanded].sort();
}

function imageDimensions(buffer, contentType) {
  if (contentType.includes("gif") && buffer.length >= 10) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (contentType.includes("png") && buffer.length >= 24) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  return null;
}

async function fetchImage(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": BROWSER_USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const contentType = response.headers.get("content-type") || "";
    const buffer = Buffer.from(await response.arrayBuffer());
    const dimensions = imageDimensions(buffer, contentType);
    const isImage = response.ok && contentType.startsWith("image/") && buffer.length > 100;
    const isPlaceholder = dimensions?.width === 1 && dimensions?.height === 1;
    return { ok: isImage && !isPlaceholder, contentType, isPlaceholder, status: response.status };
  } catch (error) {
    return { ok: false, error: error.name === "TimeoutError" ? "timeout" : error.message };
  }
}

function defaultImageUrl(asin) {
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.09.LZZZZZZZ.jpg`;
}

function extractLargeImageUrl(html) {
  const largeMatch = html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"\\]+)"/);
  if (largeMatch) {
    return largeMatch[1];
  }

  const oldHiresMatch = html.match(/data-old-hires="(https:\/\/[^"\s]+)"/i);
  if (oldHiresMatch) {
    return oldHiresMatch[1].replace(/&amp;/g, "&");
  }

  const mediaImageMatch = html.match(
    /https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_.-]+\.(?:jpe?g|png|webp)/i
  );
  return mediaImageMatch?.[0] || null;
}

async function replacementImageUrl(asin) {
  try {
    const response = await fetch(`https://www.amazon.co.jp/dp/${asin}`, {
      headers: { "User-Agent": BROWSER_USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      return { reason: `product page HTTP ${response.status}` };
    }
    const candidate = extractLargeImageUrl(await response.text());
    if (!candidate) {
      return { reason: "no primary image candidate found" };
    }
    const validation = await fetchImage(candidate);
    return validation.ok
      ? { url: candidate }
      : { reason: `candidate is unavailable (${validation.status || validation.error})` };
  } catch (error) {
    return { reason: error.name === "TimeoutError" ? "product page timeout" : error.message };
  }
}

function addImageUrl(shortcode, imageUrl) {
  return shortcode.replace(ASIN_RE, (attribute) => `${attribute} img_url="${imageUrl}"`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const files = await targetFiles(options);
  if (files.length === 0) {
    console.log("No Markdown files selected.");
    return;
  }

  const contents = new Map(
    await Promise.all(files.map(async (filePath) => [filePath, await readFile(filePath, "utf8")]))
  );
  const occurrences = new Map();
  for (const [filePath, content] of contents) {
    for (const match of content.matchAll(AMAZON_SHORTCODE_RE)) {
      const asin = match[0].match(ASIN_RE)?.[1];
      if (!asin) {
        continue;
      }
      const item = occurrences.get(asin) || [];
      item.push({ filePath, shortcode: match[0], imageUrl: match[0].match(IMAGE_URL_RE)?.[1] });
      occurrences.set(asin, item);
    }
  }

  const repairs = new Map();
  const unresolved = [];
  let healthy = 0;
  let explicit = 0;
  for (const [asin, items] of occurrences) {
    if (items.some((item) => item.imageUrl)) {
      explicit += 1;
      continue;
    }

    const fallback = await fetchImage(defaultImageUrl(asin));
    if (fallback.ok) {
      healthy += 1;
      continue;
    }
    if (!fallback.isPlaceholder) {
      unresolved.push({ asin, reason: fallback.error || `default image HTTP ${fallback.status}` });
      continue;
    }

    const replacement = await replacementImageUrl(asin);
    if (replacement.url) {
      repairs.set(asin, replacement.url);
    } else {
      unresolved.push({ asin, reason: replacement.reason });
    }
  }

  const shouldWrite = options.fix && !options.dryRun;
  let updatedShortcodes = 0;
  for (const [filePath, before] of contents) {
    const after = before.replace(AMAZON_SHORTCODE_RE, (shortcode) => {
      const asin = shortcode.match(ASIN_RE)?.[1];
      if (!asin || shortcode.match(IMAGE_URL_RE) || !repairs.has(asin)) {
        return shortcode;
      }
      updatedShortcodes += 1;
      return addImageUrl(shortcode, repairs.get(asin));
    });
    if (after !== before && shouldWrite) {
      await writeFile(filePath, after, "utf8");
    }
  }

  console.log(
    `Amazon images: ${occurrences.size} ASINs, ${healthy} healthy defaults, ${explicit} existing overrides, ${repairs.size} repairable, ${updatedShortcodes} ${shouldWrite ? "updated" : "would update"}.`
  );
  for (const item of unresolved) {
    console.warn(`Unresolved ${item.asin}: ${item.reason}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
