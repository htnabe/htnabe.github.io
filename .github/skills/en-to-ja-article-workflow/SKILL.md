---
name: en-to-ja-article-workflow
description: "Generate Japanese Hugo articles from English source articles with preserved front matter, shortcodes, LaTeX, links, and category structure. Use when translating or localizing blog posts from EN to JA."
argument-hint: "Source EN file path and target JA file path (or slug/category)"
user-invocable: true
---

# EN to JA Article Workflow

## When To Use

- Translate an English article into Japanese for this Hugo site.
- Keep URL/category behavior stable.
- Preserve Markdown, shortcodes, links, and equations.

## Required Inputs

- Source article path in `content/en/posts/...`.
- Target article path in `content/ja/posts/...`.
- Whether to overwrite existing JA content.

## Rules To Preserve

- Front matter schema and category/path alignment (see `docs/content-conventions.md`).
- Generated directories are out of scope (see `docs/agent-guardrails.md`).

## Procedure

1. Locate and read the EN source article and the JA target file (if it exists).
2. Copy EN front matter structure, then localize only text fields (`title`, `tags`, summary-like text).
3. Keep `date`, `categories`, slug behavior, and `thumbnail` unchanged unless requested.
4. Translate body paragraph-by-paragraph while preserving structure and URLs.
5. Keep shortcode parameters unchanged; localize only visible text (`alt`, `caption`) when needed.
6. For math content, preserve TeX commands and escaping exactly.
7. Run `npm run build`; if parse errors occur, fix shortcode/math escaping and rerun.
8. QA pass: meaning fidelity, natural Japanese, valid links/shortcodes.

## Completion Criteria

- JA article renders without build errors.
- Front matter and category/path alignment are valid.
- Markdown, shortcodes, links, and equations render correctly.
- Translation is faithful and readable.

## Suggested Invocation

- `/en-to-ja-article-workflow content/en/posts/math/stressTensor.md -> content/ja/posts/math/stressTensor.md`
- `/en-to-ja-article-workflow Translate this EN daily post into natural Japanese and keep shortcode parameters intact.`
