# Bluesky Auto Post for New Articles

This document explains how to auto-post article summaries to Bluesky when new JA/EN posts are merged into `main`.

## What it does

- Trigger: push to `main`
- Scope: newly added files only
  - `content/ja/posts/**/*.md`
  - `content/en/posts/**/*.md`
- Exclusions:
  - edited existing posts
  - `draft: true`
- Summary generation:
  - first try: GitHub Models API
  - fallback: rule-based summary from article body
- Post target: Bluesky account configured in repository secrets

## Workflow and script

- Workflow: `.github/workflows/post-bluesky-new-posts.yml`
- Script: `scripts/post-bluesky-new-articles.mjs`

## Required repository secrets

Add these repository secrets in GitHub:

- `BLUESKY_HANDLE`
  - example: `your-account.bsky.social`
- `BLUESKY_APP_PASSWORD`
  - App Password created in Bluesky settings

Notes:

- `GITHUB_TOKEN` is provided automatically by GitHub Actions.
- The workflow requests `models: read` permission to call GitHub Models.

## Setup steps

1. Create a Bluesky App Password.
2. In GitHub repository settings, add `BLUESKY_HANDLE` and `BLUESKY_APP_PASSWORD` as secrets.
3. Merge `.github/workflows/post-bluesky-new-posts.yml` into `main`.
4. Run workflow manually with `workflow_dispatch` and keep `dry_run=true` for first verification.
5. Confirm generated text in logs.
6. Add a test post file in JA/EN and merge into `main` to verify real posting.

## Manual testing

Dry run from local workspace:

- `npm run post:bluesky:new-articles -- --dry-run --range HEAD~1..HEAD`

Behavior:

- prints generated post text
- does not call Bluesky API

## Operational notes

- GitHub Models free usage is preview and can change.
- If model request fails or is rate-limited, fallback summary is used so posting can continue.
- Keep app password rotation in your regular credential rotation process.
- If a push adds many posts, each new post is sent as a separate Bluesky post.
