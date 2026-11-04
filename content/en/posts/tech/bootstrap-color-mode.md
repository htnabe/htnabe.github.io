---
title: "Bootstrap's Dark/Light Mode Finally Arrived — Here's How I Set It Up"
date: 2024-08-04T16:38:24+09:00
draft: false
show_date: true
toc: true
tags: [Bootstrap]
categories: [tech]
thumbnail: ""
---

This blog has been using Bootstrap for a while. Recently, while reading the Bootstrap documentation, I noticed that color mode support was added in v5.3 (see the relevant pages below).

- [Bootstrap supports color modes (themes) from v5.3.0](https://getbootstrap.jp/docs/5.3/customize/color-modes/)
- [v5.3.0 Release Notes](https://blog.getbootstrap.com/2023/05/30/bootstrap-5-3-0/)

It was added over a year ago, but I only just noticed… :joy:

So, I spent a weekend quickly adding dark/light mode switching and automatic reflection of the user's system settings.

The implementation lives in [this file](https://github.com/htnabe/HikaeMe/blob/main/assets/ts/color-module.ts) and [this file](https://github.com/htnabe/HikaeMe/blob/main/layouts/partials/head.html) in this site's source code.

- Tips when integrating:
  - Setting the page background color with `bg-body` or `bg-body-tertiary` allows it to switch automatically when toggling dark/light mode.
  - Setting `text-body` on text elements makes them switch at the same time as the background.
  - JS is required for the toggle logic itself.
  - Images with transparent backgrounds (like PNG or WebP) may blend into the background color depending on the mode. :cry:
