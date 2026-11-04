---
title: "Integrating Sass into Hugo"
date: 2024-07-27T15:51:58+09:00
draft: false
show_date: true
toc: true
tags: [HUGO, Sass]
categories: [Tech]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1630548809/tech/tech-logos/hugo-logo-wide_japtea.svg"
---

Many people have written about how to use Sass/SCSS in Hugo, but the official setup instructions are buried deep in the documentation and many existing articles are outdated. This article provides a quick guide.

Examples of writing styles in Sass and how to integrate them into Hugo:
{{<blogcard url="https://zenn.dev/lovegraph/articles/c9f0bbc5896178">}}
{{<blogcard url="https://blog.chick-p.work/til/hugo-css-variable">}}

## Setup

Full details are [here](https://gohugo.io//functions/css/sass/#dart-sass). A Sass → CSS transpiler is required, so you need to install one separately.

Since I was managing my Hugo version with `brew` on WSL, I simply ran `brew install sass/sass/sass`.

As also noted on the official site, you can specify the transpiler for SCSS files:

```
{{ $opts := dict
  "transpiler" "dartsass"
}}
{{ with resources.Get "sass/main.scss" | toCSS $opts | minify | fingerprint }}
  <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
{{ end }}
```

For environments that auto-deploy to GitHub Pages, GitLab Pages, or Netlify, as mentioned on the official page, you'll need to add a workflow step.

I'm using Cloudflare Pages, and no extra configuration was needed, so I'll skip that part.

Happy Sass coding! :wave:
