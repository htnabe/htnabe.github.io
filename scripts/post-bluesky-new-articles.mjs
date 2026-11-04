import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const DEFAULT_MODEL = process.env.GH_MODELS_MODEL || "openai/gpt-4o-mini";
const MODELS_API_URL = "https://models.github.ai/inference/chat/completions";
const BLUESKY_API_URL = "https://bsky.social/xrpc";
const MAX_POST_CHARS = 300;
const textEncoder = new TextEncoder();

function parseArgs(argv) {
  const args = {
    dryRun: false,
    range: "",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (arg === "--range") {
      args.range = argv[i + 1] || "";
      i += 1;
      continue;
    }
  }

  return args;
}

function runGitDiff(range) {
  const diffRange = range && range.includes("..") ? range : "HEAD~1..HEAD";
  if (diffRange.startsWith("-")) {
    throw new Error(`Invalid diff range: ${diffRange}`);
  }

  const args = ["diff", "--name-status", "--diff-filter=A", diffRange];

  try {
    const output = execFileSync("git", args, { encoding: "utf8" });
    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    if (diffRange !== "HEAD~1..HEAD") {
      const output = execFileSync(
        "git",
        ["diff", "--name-status", "--diff-filter=A", "HEAD~1..HEAD"],
        { encoding: "utf8" }
      );
      return output
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }
    throw error;
  }
}

function isTargetPostPath(filePath) {
  return (
    /^content\/ja\/posts\/.+\.md$/i.test(filePath) || /^content\/en\/posts\/.+\.md$/i.test(filePath)
  );
}

function extractAddedPostPaths(diffLines) {
  const added = [];

  for (const line of diffLines) {
    const [status, ...rest] = line.split(/\s+/);
    const filePath = rest.join(" ");

    if (status !== "A" || !isTargetPostPath(filePath)) {
      continue;
    }

    added.push(filePath);
  }

  return [...new Set(added)];
}

function parsePathInfo(filePath) {
  const parts = filePath.split("/");
  const lang = parts[1];
  const category = parts[3] || "posts";
  const filename = parts[parts.length - 1] || "";
  const slug = filename.replace(/\.md$/i, "");
  return { lang, category, slug };
}

function splitFrontMatter(content) {
  if (!content.startsWith("---\n")) {
    return { frontMatter: "", body: content };
  }

  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    return { frontMatter: "", body: content };
  }

  const frontMatter = content.slice(4, end).trim();
  const body = content.slice(end + 4).trim();
  return { frontMatter, body };
}

function stripQuotes(value) {
  const raw = value.trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  return raw;
}

function parseFrontMatter(frontMatter) {
  const lines = frontMatter.split("\n");
  const data = {
    title: "",
    description: "",
    summary: "",
    thumbnail: "",
    draft: false,
    tags: [],
    categories: [],
    date: "",
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const sep = trimmed.indexOf(":");
    if (sep === -1) {
      continue;
    }

    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim();

    if (key === "title") {
      data.title = stripQuotes(value);
      continue;
    }

    if (key === "draft") {
      data.draft = /^true$/i.test(value);
      continue;
    }

    if (key === "date") {
      data.date = stripQuotes(value);
      continue;
    }

    if (key === "description") {
      data.description = stripQuotes(value);
      continue;
    }

    if (key === "summary") {
      data.summary = stripQuotes(value);
      continue;
    }

    if (key === "thumbnail" || key === "social_media_card") {
      data.thumbnail = stripQuotes(value);
      continue;
    }

    if (key === "tags" || key === "categories") {
      const cleaned = value.replace(/^\[/, "").replace(/\]$/, "");
      const list = cleaned
        .split(",")
        .map((item) => stripQuotes(item))
        .map((item) => item.trim())
        .filter(Boolean);

      if (key === "tags") {
        data.tags = list;
      } else {
        data.categories = list;
      }
    }
  }

  return data;
}

function cleanMarkdownBody(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/{{<[^>]+>}}/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[>#*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fallbackSummary(text, lang) {
  const limit = lang === "ja" ? 70 : 130;
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit - 1).trimEnd()}…`;
}

async function summarizeWithModel({ title, bodyText, lang, token, model }) {
  const prompt = [
    "You are a concise blog summarizer.",
    "Return only one sentence in the same language as the input post.",
    "Do not add hashtags or quotes.",
    "Keep it practical and concrete.",
  ].join(" ");

  const userInput = [
    `Language hint: ${lang}`,
    `Title: ${title}`,
    "Body:",
    bodyText.slice(0, 4000),
  ].join("\n");

  const response = await fetch(MODELS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userInput },
      ],
      temperature: 0.2,
      max_tokens: 120,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub Models API failed: ${response.status} ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("GitHub Models returned empty summary");
  }

  return content;
}

function truncatePost(text) {
  const chars = Array.from(text);
  if (chars.length <= MAX_POST_CHARS) {
    return text;
  }
  return `${chars.slice(0, MAX_POST_CHARS - 1).join("")}…`;
}

function countChars(text) {
  return Array.from(text).length;
}

function truncateChars(text, limit) {
  const chars = Array.from(text);
  if (chars.length <= limit) {
    return text;
  }
  if (limit <= 1) {
    return "…";
  }
  return `${chars.slice(0, limit - 1).join("")}…`;
}

function buildPostText({ title, summary, url }) {
  const head = `新しい記事を投稿しました。\n${title}`;
  const tail = `\n${url}`;
  const reserved = countChars(head) + countChars(tail) + 1;
  const summaryLimit = Math.max(0, MAX_POST_CHARS - reserved);
  const compactSummary = truncateChars(summary, summaryLimit);
  const raw = `${head}\n${compactSummary}${tail}`;
  return truncatePost(raw);
}

function buildPostUrl({ baseUrl, lang, category, slug }) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  if (lang === "en") {
    return `${normalizedBase}/en/posts/${category}/${slug}/`;
  }
  return `${normalizedBase}/posts/${category}/${slug}/`;
}

async function loadDefaultThumbnailUrl() {
  const paramsPath = "config/_default/params.yaml";

  try {
    const content = await readFile(paramsPath, "utf8");
    const match = content.match(/^\s*defaultThumbnailUrl:\s*(.+)$/m);
    if (!match) {
      return "";
    }

    const rawValue = match[1].split("#")[0].trim();
    return stripQuotes(rawValue);
  } catch (error) {
    console.warn(`default thumbnail fallback disabled: ${error.message}`);
    return "";
  }
}

async function createBlueskySession(handle, appPassword) {
  const response = await fetch(`${BLUESKY_API_URL}/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: handle,
      password: appPassword,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Bluesky session failed: ${response.status} ${body.slice(0, 200)}`);
  }

  return response.json();
}

function buildUrlFacet(text, url) {
  const charIndex = text.indexOf(url);
  if (charIndex === -1) {
    return null;
  }

  const before = text.slice(0, charIndex);
  const byteStart = textEncoder.encode(before).length;
  const byteEnd = byteStart + textEncoder.encode(url).length;

  return {
    index: {
      byteStart,
      byteEnd,
    },
    features: [
      {
        $type: "app.bsky.richtext.facet#link",
        uri: url,
      },
    ],
  };
}

function normalizeImageContentType(contentType) {
  const raw = (contentType || "").split(";")[0].trim().toLowerCase();
  if (raw === "image/jpeg" || raw === "image/png" || raw === "image/webp") {
    return raw;
  }
  return "";
}

function guessImageContentTypeFromUrl(imageUrl) {
  if (/\.png(?:$|\?)/i.test(imageUrl)) {
    return "image/png";
  }
  if (/\.jpe?g(?:$|\?)/i.test(imageUrl)) {
    return "image/jpeg";
  }
  if (/\.webp(?:$|\?)/i.test(imageUrl)) {
    return "image/webp";
  }
  return "";
}

async function uploadBlobFromUrl(session, imageUrl) {
  if (!imageUrl) {
    return null;
  }

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`thumbnail fetch failed: ${imageResponse.status}`);
  }

  const detectedType = normalizeImageContentType(imageResponse.headers.get("content-type"));
  const guessedType = guessImageContentTypeFromUrl(imageUrl);
  const contentType = detectedType || guessedType;
  if (!contentType) {
    throw new Error("thumbnail content type is not supported");
  }

  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  const uploadResponse = await fetch(`${BLUESKY_API_URL}/com.atproto.repo.uploadBlob`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessJwt}`,
      "Content-Type": contentType,
    },
    body: bytes,
  });

  if (!uploadResponse.ok) {
    const body = await uploadResponse.text();
    throw new Error(`thumbnail upload failed: ${uploadResponse.status} ${body.slice(0, 200)}`);
  }

  const uploadData = await uploadResponse.json();
  return uploadData?.blob || null;
}

function buildExternalEmbed({ url, title, description, thumbBlob }) {
  return {
    $type: "app.bsky.embed.external",
    external: {
      uri: url,
      title: truncateChars(title, 300),
      description: truncateChars(description || "", 300),
      ...(thumbBlob ? { thumb: thumbBlob } : {}),
    },
  };
}

function buildEmbedDescription(post, summary, lang) {
  const source =
    post.frontMatter.description ||
    post.frontMatter.summary ||
    summary ||
    fallbackSummary(post.bodyText, lang);
  return truncateChars(source, 280);
}

async function createBlueskyPost(session, { text, facets, embed }) {
  const record = {
    $type: "app.bsky.feed.post",
    text,
    createdAt: new Date().toISOString(),
  };

  if (facets?.length) {
    record.facets = facets;
  }

  if (embed) {
    record.embed = embed;
  }

  const response = await fetch(`${BLUESKY_API_URL}/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: "app.bsky.feed.post",
      record,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Bluesky post failed: ${response.status} ${body.slice(0, 200)}`);
  }

  return response.json();
}

async function loadPostData(filePath) {
  const content = await readFile(filePath, "utf8");
  const { frontMatter, body } = splitFrontMatter(content);
  const fm = parseFrontMatter(frontMatter);
  const bodyText = cleanMarkdownBody(body);
  return {
    filePath,
    frontMatter: fm,
    bodyText,
  };
}

function shouldSkipPost(post) {
  if (post.frontMatter.draft) {
    return "draft=true";
  }
  if (!post.frontMatter.title) {
    return "title not found";
  }
  if (!post.bodyText) {
    return "body text is empty";
  }
  return "";
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = process.env.SITE_BASE_URL || "https://htnabe.github.io";
  const githubToken = process.env.GITHUB_TOKEN || "";
  const defaultThumbnailUrl = await loadDefaultThumbnailUrl();

  const diffLines = runGitDiff(args.range);
  const addedPaths = extractAddedPostPaths(diffLines);

  if (addedPaths.length === 0) {
    console.log("No newly added JA/EN post files in diff range.");
    return;
  }

  console.log(`Detected ${addedPaths.length} new post(s).`);

  const records = [];

  for (const filePath of addedPaths) {
    const post = await loadPostData(filePath);
    const reason = shouldSkipPost(post);
    if (reason) {
      console.log(`skip ${filePath}: ${reason}`);
      continue;
    }

    const pathInfo = parsePathInfo(filePath);
    const url = buildPostUrl({
      baseUrl,
      lang: pathInfo.lang,
      category: pathInfo.category,
      slug: pathInfo.slug,
    });

    let summary = "";
    try {
      if (!githubToken) {
        throw new Error("GITHUB_TOKEN is missing");
      }
      summary = await summarizeWithModel({
        title: post.frontMatter.title,
        bodyText: post.bodyText,
        lang: pathInfo.lang,
        token: githubToken,
        model: DEFAULT_MODEL,
      });
    } catch (error) {
      console.warn(`summary fallback ${filePath}: ${error.message}`);
      summary = fallbackSummary(post.bodyText, pathInfo.lang);
    }

    const text = buildPostText({
      title: post.frontMatter.title,
      summary,
      url,
    });

    const facet = buildUrlFacet(text, url);
    const facets = facet ? [facet] : [];
    const embedDescription = buildEmbedDescription(post, summary, pathInfo.lang);

    records.push({
      filePath,
      url,
      text,
      facets,
      embedDescription,
      thumbnailUrl: post.frontMatter.thumbnail || defaultThumbnailUrl,
      title: post.frontMatter.title,
    });
  }

  if (records.length === 0) {
    console.log("No publishable posts after filtering.");
    return;
  }

  if (args.dryRun) {
    for (const record of records) {
      console.log(`--- dry-run post: ${record.filePath} ---`);
      console.log(record.text);
      console.log(`embed uri: ${record.url}`);
      console.log(`embed thumbnail: ${record.thumbnailUrl || "(none)"}`);
    }
    return;
  }

  const handle = process.env.BLUESKY_HANDLE || "";
  const appPassword = process.env.BLUESKY_APP_PASSWORD || "";

  if (!handle || !appPassword) {
    throw new Error("BLUESKY_HANDLE or BLUESKY_APP_PASSWORD is missing");
  }

  const session = await createBlueskySession(handle, appPassword);

  for (const record of records) {
    let thumbBlob = null;
    if (record.thumbnailUrl) {
      try {
        thumbBlob = await uploadBlobFromUrl(session, record.thumbnailUrl);
      } catch (error) {
        console.warn(`thumbnail fallback ${record.filePath}: ${error.message}`);
      }
    }

    const embed = buildExternalEmbed({
      url: record.url,
      title: record.title,
      description: record.embedDescription,
      thumbBlob,
    });

    const result = await createBlueskyPost(session, {
      text: record.text,
      facets: record.facets,
      embed,
    });
    console.log(`posted ${record.filePath} -> ${result?.uri || "(no uri)"}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
