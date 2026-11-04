---
name: cloudinary-url-bulk-migration
description: "Bulk-migrate Cloudinary image URLs in Hugo/Markdown articles when upload folder structure changes. Use for replacing old /image/upload/... paths (for example NabeBlog) with a new base path, while preserving each file name/public ID and syncing JA/EN counterpart articles."
argument-hint: "Target file(s) and one example of the new Cloudinary URL base"
user-invocable: true
---

# Cloudinary URL Bulk Migration

## When To Use

- Cloudinary URL folder structure changed after `/image/upload/`.
- Many images in one article (or paired JA/EN articles) must be updated consistently.
- You want deterministic replacement plus verification of leftovers.

## Inputs

- One or more target article paths (for example `content/ja/posts/...`).
- Optional counterpart language path(s) (for example `content/en/posts/...`).
- One concrete example of the new URL shape, such as:
  - `https://res.cloudinary.com/<cloud>/image/upload/v1678514107/daily/.../stand11_us0xim.webp`

## Migration Rules

1. Preserve each image file name/public ID (for example `stand11_us0xim.webp`).
2. Preserve transformation segments already in use (for example `w_800,f_auto`, `f_auto`).
3. Replace only the upload-side directory structure portion.
4. Keep non-Cloudinary links unchanged.
5. Apply the same rule to thumbnail and inline shortcode URLs.

## Procedure

1. Read the target file(s) and collect all Cloudinary URLs in front matter and body.
2. Infer old common base and new common base from the provided example.
3. Decide replacement scope:
   - Single file only
   - JA + EN counterpart files together
4. Apply bulk replacement in as few edits as possible.
5. Verify with search commands:
   - Check old markers (for example `NabeBlog`) are gone.
   - Check new base path exists in all intended locations.
6. If counterpart exists and request implies parity, mirror the same migration there.
7. Report changed files and verification result.

## Decision Points

- If only one URL changed but same article contains multiple old-path images:
  - Replace all matching old-path images in that article, not only one line.
- If JA article changed and EN counterpart exists:
  - Mirror the same migration rule in EN unless explicitly excluded.
- If multiple possible new bases are found:
  - Stop and ask which base should be canonical.

## Completion Criteria

- All intended Cloudinary URLs in target files use the new base path.
- No leftover old-path markers remain in migrated files.
- JA/EN counterpart consistency is preserved when both are in scope.
- Final report includes changed file list and verification summary.

## Suggested Invocation

- `/cloudinary-url-bulk-migration content/ja/posts/daily/gasdesk.md new base: /image/upload/v1672842774/daily/%E3%82%AC%E3%82%B9%E5%BC%8F%E6%98%87%E9%99%8D%E3%83%87%E3%82%B9%E3%82%AF/`
- `/cloudinary-url-bulk-migration Migrate JA+EN smartphone-stand articles to new Cloudinary folder structure shown in this URL.`
