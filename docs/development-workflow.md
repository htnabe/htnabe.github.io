# Development Workflow

## Common Commands

- `npm run dev`: Start the locally installed Hugo server with watch mode.
- `npm run build`: Run production build with the locally installed Hugo (`--minify --gc`).
- `npm run algolia`: Rebuild content with the locally installed Hugo and upload Algolia search index.
- `npm test`: Run all automated tests once with Vitest.
- `npm run test:watch`: Run Vitest in watch mode during development.
- `npm run format`: Format repository files with Prettier.
- `npm run linkcheck:md`: Check article links with lychee.
- `npm run update:theme`: Update Hugo module theme and refresh npm metadata/install state.
- `npm run update`: Update npm dependencies via npm-check-updates.

## Installed Hugo

The npm commands invoke `hugo` directly from `PATH` for local development,
production builds, Algolia builds, and theme updates. They do not download,
update, cache, or check Hugo's version. A missing executable fails explicitly;
there is no automatic installation.

Install Hugo and Dart Sass with `brew install hugo dart-sass`, and keep them
updated through your normal Homebrew maintenance (`brew update` and
`brew upgrade`). Use `command -v hugo` and `hugo version` to check the executable
used by npm commands. Hugo may need network access to fetch modules.

Hugo v0.170.0 and later use a unified binary without the `+extended` version
marker. These versions no longer support LibSass; use Dart Sass for Sass builds.
Older extended binaries remain usable if compatible with the theme.

GitHub Actions installs the latest stable Hugo with `peaceiris/actions-hugo`
before running the same npm build command. Run tests and a production build
after upgrading Hugo to check theme compatibility.

Additional Hugo arguments can be passed normally, for example:
`npm run dev -- --port 1413`.
For Hugo operations without an npm alias, use `hugo <args>`.

## Recommended Flow

1. Make edits in source directories (`content/`, `layouts/`, `assets/`, `archetypes/`).
2. Run `npm run dev` for local validation.
3. If search-related content/config changed, run `npm run algolia`.
4. Run `npm run build` before release-oriented checks.

## Amazon Shortcode Images

For image checks and `img_url` repair when an article uses an `amazon` shortcode,
follow the [Amazon Shortcode Image Repair](../.github/skills/amazon-shortcode-image-repair/SKILL.md) task skill.

## Validation Notes

- Run `npm test -- tests/postcss-config.test.mjs` after PostCSS configuration or
  dependency changes to check production CSS purging and development behavior.
- Guardrails for edit scope and generated directories: `docs/agent-guardrails.md`.
- If generated output appears stale, rerun `npm run dev` or `npm run build`.
- Run `npm run update:theme` after theme-related changes.

## Automated Tests and CI

Tests under `tests/` run with Vitest in a Node environment:

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
