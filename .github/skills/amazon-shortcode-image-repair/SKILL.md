---
name: amazon-shortcode-image-repair
description: "Check and repair broken Hugo amazon shortcode product images by adding verified img_url values from Amazon product pages. Use when adding or updating Amazon shortcodes, when asked to find an Amazon product image/img_url, and before committing or pushing article changes that contain Amazon shortcodes."
argument-hint: "Target article path(s), or describe the Amazon shortcode/image task"
user-invocable: true
---

# Amazon Shortcode Image Repair

## When To Use

- Adding or changing an `{{<amazon ...>}}` shortcode.
- Asked to obtain an Amazon product image or `img_url`.
- Preparing a commit or push that changes an article containing Amazon shortcodes.
- Asked to diagnose a missing Amazon product image.

## Required Workflow

1. Identify changed article paths containing Amazon shortcodes. Include the EN/JA
   counterpart when it exists.
2. Preview the check without changing files:

   ```bash
   npm run check:amazon-images -- content/ja/posts/daily/example.md
   ```

3. Repair verified placeholders only:

   ```bash
   npm run fix:amazon-images -- content/ja/posts/daily/example.md
   ```

   For staged article changes, use:

   ```bash
   npm run fix:amazon-images:staged
   ```

4. Review the diff. Each change must only add `img_url="..."` to an affected
   Amazon shortcode; preserve title, `alt`, affiliate links, and shortcode style.
5. Re-run the check for the same article paths, then run `npm run build` before
   a requested commit or push.

## Repair Rules

- The command treats the legacy default image as broken only when it returns the
  observed 1x1 placeholder image.
- It obtains a replacement from the product page's primary image data and accepts
  it only after the candidate responds as a non-placeholder image.
- The same ASIN uses the same verified `img_url` in the selected EN/JA article pair.
- Existing `img_url` values are never replaced automatically.
- Do not add an image URL inferred from an ASIN, unrelated Amazon search result, or
  an unverified CDN response.

## Failure Handling

- If Amazon blocks the product page, times out, or yields no verifiable primary
  image, report the ASIN and reason. Leave its shortcode unchanged.
- An unresolved ASIN is a warning, not a reason to alter affiliate links or to
  fabricate an image URL.
- The command intentionally does not run in the Husky pre-commit hook because its
  required external requests could make ordinary commits unreliable.

## Completion Criteria

- All repairable placeholder images in the changed article scope have verified
  `img_url` values.
- EN/JA counterparts use the same URL for the same repaired ASIN.
- The follow-up check and `npm run build` succeed.
- Any unresolved ASINs are clearly reported.