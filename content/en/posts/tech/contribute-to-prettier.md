---
title: "I Contributed a Tiny Bit to Prettier"
date: 2026-07-18T07:35:40Z
draft: false
show_date: true
toc: true
tags: [OSS, Prettier]
categories: [Tech]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1784360892/tech/contribute-to-prettier/plugin-screen-shot_mvsjnb.png"
---

## Background

Recently, I have been developing a Prettier plugin called [@htnabe/prettier-plugin-go-template](https://github.com/htnabe/prettier-plugin-go-template).

There originally was a plugin called `prettier-plugin-go-template` by NicklasPor, but that plugin had effectively become archived.

{{<blogcard url="https://github.com/NiklasPor/prettier-plugin-go-template">}}

- [Related issue](https://github.com/NiklasPor/prettier-plugin-go-template/issues/123)

As one of the users of `prettier-plugin-go-template`, I wanted to keep the plugin actively maintained, so I forked it and started releasing it under my own scope as mentioned above.

On npm, you can see the package here, and it had already reached around 220 downloads at the time of `v0.0.1-rc.1`, so it seems people are already using it.

- [npm page](https://www.npmjs.com/package/@htnabe/prettier-plugin-go-template)

## What I Contributed

The contribution itself was really small.

Prettier has a [plugin directory page](https://prettier.io/docs/plugins/), and I simply replaced the old `prettier-plugin-go-template` entry with `@htnabe/prettier-plugin-go-template` on that page.

There is not much more detail than that, but the PR is [here](https://github.com/prettier/prettier/pull/19665).

After it was merged, I checked the page and confirmed it appeared correctly under `Community plugin`.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1784360892/tech/contribute-to-prettier/plugin-screen-shot_mvsjnb.png" caption="It's on Prettier's plugin page!" alt="It's on Prettier's plugin page!">}}
