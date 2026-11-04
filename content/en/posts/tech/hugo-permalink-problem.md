---
title: "Fix for Hugo's .Permalink Generating localhost URLs"
date: 2024-07-22T21:24:20+09:00
draft: false
tags: [HUGO]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1630548809/tech/tech-logos/hugo-logo-wide_japtea.svg"
---

## Conclusion

`hugo serve` is a debug command, so you need to build for production using the `hugo` or `hugo build` command (yes, it's that obvious).

I referred to the following article:

{{<blogcard url="https://discourse.gohugo.io/t/localhost-links-being-generated/1059">}}

## Why I Wrote This

This blog uses Algolia for in-site search. The issue was that the `BaseUrl` in Algolia's search results was inexplicably pointing to `localhost:1313` (the local dev URL), making it impossible to navigate to search results. :crying_cat_face:

### Root Cause

My local debugging workflow was originally:

1. Make some edits
2. Run `hugo server` to verify behavior
3. Upload data to Algolia automatically using an npm script command
4. Push changes to GitHub to trigger automatic deployment

I had never thought much about it, but files built by `hugo server` in step 2 have their `.Permalink` set to `localhost:1313`. Since the Algolia data was based on that build output, the search result URLs from Algolia were broken. :crying_cat_face:

### Fix

I changed the edit → build → deploy workflow to the following:

1. Make some edits
2. Run `hugo server` to verify behavior
3. **Run the `hugo` command**
4. Upload data to Algolia automatically using an npm script command
5. Push changes to GitHub to trigger automatic deployment

With step 3 added, `.Permalink` now correctly uses the `baseUrl` specified in `config.toml` (or equivalent).

In practice, steps 3 and 4 happen almost simultaneously. In `package.json`'s `scripts`, I define the following command so that building the site and uploading to Algolia happen seamlessly:

```
"scripts": {
  "algolia": "algoliaへの自動アップロード処理"
  "build": "hugo --minify --gc && npm run algolia"
}
```

## Side Note

If only I had as much time as a full-time job allows, I'd write test code for Algolia's search functionality too — but that's not happening anytime soon…
