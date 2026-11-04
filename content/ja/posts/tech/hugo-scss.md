---
title: "HUGOでSassを導入する"
date: 2024-07-27T15:51:58+09:00
draft: false
show_date: true
toc: true
tags: [HUGO, Sass]
categories: [Tech]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1630548809/tech/tech-logos/hugo-logo-wide_japtea.svg"
---

HUGO内でSass | Scssを使ってスタイルをイイ感じに記述する方法は色々な方が解説していますが、導入方法は公式ドキュメントの奥深くにあったり記事が古くなっていたりするのでこの記事で簡単な解説を加えます。

Sassでの記述方法やHUGOでの導入例は下記の通り。
{{<blogcard url="https://zenn.dev/lovegraph/articles/c9f0bbc5896178">}}
{{<blogcard url="https://blog.chick-p.work/til/hugo-css-variable">}}

## 導入方法

詳細は[こちら](https://gohugo.io//functions/css/sass/#dart-sass)にあります。Sass => CSSへのトランスパイラが必要なので別途インストールする必要があります。

私はWSLで`brew`コマンドを使ってHUGOのバージョンを管理していたのでそのまま`brew install sass/sass/sass`でインストールしました。

また、公式サイトにもある通りですが、scssファイルのトランスパイラを指定することも可能です。

```
{{ $opts := dict
  "transpiler" "dartsass"
}}
{{ with resources.Get "sass/main.scss" | toCSS $opts | minify | fingerprint }}
  <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
{{ end }}
```

GitHub Pages, GitLab Pages, Netlifyに自動デプロイしているような環境では、先ほどの公式ページでも紹介されていたように、workflowを追加する必要があるみたいです。

私はCloudflare Pagesを使っているのですが、特別設定の変更は必要なかったので省略します。

それでは良きSass生活を～！:wave:
