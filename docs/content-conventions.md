# Content Conventions

## Front Matter Baseline

New post defaults are defined in `archetypes/default.md`.

Expected keys:

- `title`
- `date`
- `draft`
- `show_date`
- `toc`
- `tags`
- `categories`
- `thumbnail`

## Category and Path Alignment

- Keep post paths and category values aligned.
- `content/{ja,en}/posts/daily/` -> `daily`
- `content/{ja,en}/posts/gallery/` -> `gallery`
- `content/{ja,en}/posts/math/` -> `math`
- `content/{ja,en}/posts/tech/` -> `tech`

## Language and Style

- Preserve the original language and tone of the article you edit.

## Asset Usage

- Keep thumbnail and embedded image references consistent with existing patterns (for example Cloudinary URLs and shortcode parameters).

## Amazon Shortcodes

- Preserve an existing `img_url`; it is an explicitly selected product image.
- When a default Amazon image is a placeholder, use the Amazon image repair command
  to add a verified `m.media-amazon.com` URL instead of constructing an image ID.
- Use the same verified `img_url` for matching ASINs in EN/JA counterpart articles.
