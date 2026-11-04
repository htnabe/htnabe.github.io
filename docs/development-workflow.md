# Development Workflow

## Common Commands

- `npm run dev`: Start the pinned Hugo local server with watch mode.
- `npm run dev:166`: Alias for `dev`, using the same pinned version.
- `npm run build`: Run production build with the pinned Hugo (`--minify --gc`).
- `npm run algolia`: Rebuild content with the pinned Hugo and upload Algolia search index.
- `npm run update:theme`: Update Hugo module theme and refresh npm metadata/install state.
- `npm run update`: Update npm dependencies via npm-check-updates.

## Pinned Hugo

`scripts/run-hugo.mjs` uses **Hugo 0.166.0 extended**, compatible with the current
HikaeMe theme. It supports Linux amd64 and does not fall back to Hugo on `PATH`.
Homebrew Hugo remains available for module management (`npm run update:theme`).

On first use, the runner downloads the archive and checksums from the official
GitHub release, verifies SHA-256, and caches the executable at
`$XDG_CACHE_HOME/t-pot/hugo/0.166.0-linux-amd64/hugo` (or
`~/.cache/t-pot/hugo/0.166.0-linux-amd64/hugo` when `XDG_CACHE_HOME` is unset).
The first run requires network access and `tar`; subsequent runs reuse the cache.
Version and extended support are checked before each invocation.

Download, checksum, extraction, and version failures stop the command with an
error rather than starting another Hugo version. For download failures, check
connectivity to GitHub and retry. For an invalid cached executable, remove only
the `hugo` file at the cache path above and rerun the command to download it again.
An unsupported OS or architecture requires adding a verified release asset to
the runner before these commands can be used there.

Additional Hugo arguments can be passed normally, for example:
`npm run dev -- --port 1413`.
For Hugo operations without an npm alias, use `node scripts/run-hugo.mjs <args>`.

## Recommended Flow

1. Make edits in source directories (`content/`, `layouts/`, `assets/`, `archetypes/`).
2. Run `npm run dev` for local validation.
3. If search-related content/config changed, run `npm run algolia`.
4. Run `npm run build` before release-oriented checks.

## Amazon Shortcode Images

For image checks and `img_url` repair when an article uses an `amazon` shortcode,
follow the [Amazon Shortcode Image Repair](../.github/skills/amazon-shortcode-image-repair/SKILL.md) task skill.

## Validation Notes

- Run `node --test tests/hugo-runner.test.mjs` after changing the pinned Hugo
  runner or its download, cache, and process behavior.
- Run `node --test tests/postcss-config.test.mjs` after PostCSS configuration or
  dependency changes to check production CSS purging and development behavior.
- Guardrails for edit scope and generated directories: `docs/agent-guardrails.md`.
- If generated output appears stale, rerun `npm run dev` or `npm run build`.
- Run `npm run update:theme` after theme-related changes.

## Bluesky Automation

- Auto-post setup guide: `docs/bluesky-auto-post.md`.
- Local dry-run command: `npm run post:bluesky:new-articles -- --dry-run --range HEAD~1..HEAD`.
