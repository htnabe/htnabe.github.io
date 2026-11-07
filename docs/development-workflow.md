# Development Workflow

## Common Commands

- `npm run dev`: Start the latest stable Hugo extended local server with watch mode.
- `npm run build`: Run production build with the latest stable Hugo extended (`--minify --gc`).
- `npm run algolia`: Rebuild content with the latest stable Hugo extended and upload Algolia search index.
- `npm test`: Run all automated tests once with Vitest.
- `npm run test:watch`: Run Vitest in watch mode during development.
- `npm run format`: Format repository files with Prettier.
- `npm run linkcheck:md`: Check article links with lychee.
- `npm run update:theme`: Update Hugo module theme and refresh npm metadata/install state.
- `npm run update`: Update npm dependencies via npm-check-updates.

## Latest Hugo Extended

Every invocation of `scripts/run-hugo.mjs` queries the official GitHub
`gohugoio/hugo/releases/latest` API and uses the latest stable **Hugo extended**.
Local development, production builds, Algolia builds, and theme updates all use
this runner. GitHub Actions uses the same commands. The runner supports Linux
amd64 and does not fall back to Hugo on `PATH`.

For each newly released version, the runner downloads the official archive and
checksums, verifies SHA-256, and caches the executable at
`$XDG_CACHE_HOME/t-pot/hugo/<version>-linux-amd64/hugo` (or under
`~/.cache/t-pot/hugo/` when `XDG_CACHE_HOME` is unset). Later invocations still
check the latest release but reuse the verified binary if its version is current.
Version and extended support are checked before execution.

Network access is required on every invocation; `tar` is required when installing
a version. Actions supplies `GITHUB_TOKEN` for authenticated release lookup.
Local lookup works without a token, subject to GitHub's unauthenticated API rate
limit; an optional `GITHUB_TOKEN` authenticates only the metadata request.

Release lookup, download, checksum, extraction, and version failures stop the
command explicitly; an older cached or system Hugo is not silently used.
For lookup/download failures, check GitHub connectivity and API rate limits.
For an invalid cached executable, remove only the `hugo` file at the version's
cache path above and rerun the command to download it again.
An unsupported OS or architecture requires adding a verified release asset to
the runner before these commands can be used there.

Latest releases are adopted automatically, so a Hugo/theme incompatibility can
break a build without a repository change. Run tests and a production build after
new releases. The obsolete `dev:166` alias has been removed; use `npm run dev`.
If invoking the Homebrew `hugo` command directly, keep it updated separately with
`brew update` and `brew upgrade hugo`; npm commands do not modify that installation.

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

- Run `npm test -- tests/hugo-runner.test.mjs` after changing the Hugo
  runner or its download, cache, and process behavior.
- Run `npm test -- tests/postcss-config.test.mjs` after PostCSS configuration or
  dependency changes to check production CSS purging and development behavior.
- Guardrails for edit scope and generated directories: `docs/agent-guardrails.md`.
- If generated output appears stale, rerun `npm run dev` or `npm run build`.
- Run `npm run update:theme` after theme-related changes.

## Automated Tests and CI

The two suites under `tests/` run with Vitest in a Node environment:

- `hugo-runner.test.mjs`: latest stable release lookup and upgrade detection,
  download and checksum validation, cache reuse and
  concurrent installation, version/platform rejection, CLI arguments, exit codes,
  and signal forwarding. Downloads are simulated with local fixtures; the tests
  require Linux amd64, Node.js, and `tar`, not a real Hugo download or API secrets.
- `postcss-config.test.mjs`: production CSS purging, preservation of Hugo and
  Bootstrap classes, and development autoprefixing.

`vitest.config.mjs` uses forked processes because the PostCSS suite changes the
working directory. Keep tests that modify process-wide state sequential within
their suite.

The `Tests` workflow runs `npm test` on every branch push and pull request with
Node.js 24. It does not deploy the site or upload search data. The Pages build also
runs the complete suite before building, so failing tests prevent deployment.
The existing PR `npm audit` workflow checks dependency vulnerabilities separately.

## GitHub Pages and Automation

- `Deploy GitHub Pages` builds and publishes on pushes to `main` or manual execution.
- Enable Bluesky push-triggered posting with the Actions variable
  `BLUESKY_AUTOPUBLISH_ENABLED=true` and secrets `BLUESKY_HANDLE` and
  `BLUESKY_APP_PASSWORD`. Push-triggered posting stays disabled until the variable
  is set, to avoid bulk posting during an initial migration.
- Enable Algolia uploads with the Actions variable `ALGOLIA_UPLOAD_ENABLED=true`
  and secrets `ALGOLIA_APP_ID`, `ALGOLIA_ADMIN_API_KEY`, and `ALGOLIA_INDEX_NAME`.
  See [Multilingual Algolia Setup](multilingual-algolia-setup.md) for details.

## Bluesky Automation

- Auto-post setup guide: `docs/bluesky-auto-post.md`.
- Local dry-run command: `npm run post:bluesky:new-articles -- --dry-run --range HEAD~1..HEAD`.
