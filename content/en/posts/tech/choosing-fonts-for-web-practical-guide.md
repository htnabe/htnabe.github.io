---
title: "A Practical Guide to Choosing Fonts for Web Apps"
date: 2026-02-22T10:00:00+09:00
draft: false
toc: true
show_thumb_post: false
tags: [typography, css, webfonts]
categories: [Tech]
thumbnail: ""
---

Font settings have a major impact on readability, tone, and user trust in web design, but they are often treated as a minor detail. In this post, I summarize practical points for choosing fonts on the web, from system fonts to Google Fonts.

## System Fonts: A Zero-Cost Option

System fonts are preinstalled on each OS (with some exceptions). Using them provides the following benefits:

- No network request is needed to fetch font files, which helps pages render faster
- Reduced risk of layout shifts caused by late font loading

A common system font stack looks like this:

```css
font-family:
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  /* macOS / iOS */ "Yu Gothic UI",
  "Yu Gothic",
  "Meiryo",
  /* Windows */ "Noto Sans CJK JP",
  /* Linux / Android */ system-ui,
  -apple-system,
  sans-serif;
```

On the other hand, system fonts can make it harder to express a distinct visual identity.

## Google Fonts: Wide Selection and Easy Setup

Google Fonts provides more than 1,500 free font families. You can use them by adding a link tag in head like this:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="preload stylesheet"
  as="style"
/>
```

By adding `display=swap`, text remains visible while the web font is loading, using a fallback system font until the download completes.

**Benefits:**

- A very wide range of font choices
- Generally good performance through CDN delivery

## Considerations for Multilingual Sites

If your site uses both Japanese and Latin text, choose fonts that properly cover both writing systems.

{{< table "table" >}}

| Use Case                | Recommended Font  | Notes                                                |
| ----------------------- | ----------------- | ---------------------------------------------------- |
| Body text (Latin)       | Noto Sans         | Neutral and highly readable                          |
| Body text (Japanese)    | Noto Sans JP      | Visually pairs well with Noto Sans                   |
| Headings / Display text | Orbitron, Raleway | Stylish options mainly designed for Latin characters |

{{</table>}}

Noto Sans JP can cover both Latin and Japanese glyphs in a single family, which makes rendering behavior easier to understand and simplifies real-world operations.

## Performance Optimization Tips

### Limit the Number of Weights

Each requested weight adds loading cost. Request only the weights you actually use.

```
family=Noto+Sans+JP:wght@400;700
```

Instead of loading all weights from 100 to 900, keep the request minimal.

### Add Preconnect

To establish early connections to Google Fonts servers, add preconnect hints.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## CSS `font-feature-settings` Property

For Japanese text, applying `font-feature-settings: "palt"` can improve readability by making punctuation spacing look more natural. In Latin text, however, spacing can become too loose, so test carefully.

```css
body {
  font-feature-settings: "palt";
  letter-spacing: 0.05em;
}
```

It is a small tweak, but it can noticeably improve reading comfort in Japanese content.

## Fallback Strategy

Always end your font-family stack with a generic family such as `sans-serif`, `serif`, or `monospace`. This ensures safe fallback to OS default fonts if preferred fonts are unavailable.

```css
font-family:
  "Noto Sans JP",
  /* preferred */ "Hiragino Sans",
  /* macOS fallback */ "Yu Gothic UI",
  /* Windows fallback */ sans-serif; /* last resort */
```

## Summary

- If performance is your highest priority and strong visual identity is not required, system fonts are a great option
- If consistency is more important and some network overhead is acceptable, Google Fonts such as Noto Sans JP are effective
- Always define a fallback chain and end with a generic family
- For Japanese readability, combining `font-feature-settings: "palt"` with `letter-spacing` can be effective

Font selection is more important than it looks because it sits at the intersection of visual quality, performance, and accessibility. It is worth experimenting, but a good starting point is to pick a design that you or your team genuinely like. Start small, then improve performance details incrementally.
