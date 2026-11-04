---
title: "HUGOの.Permalinkでlocalhostが指定されてしまう場合の対処法"
date: 2024-07-22T21:24:20+09:00
draft: false
tags: [HUGO]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1630548809/tech/tech-logos/hugo-logo-wide_japtea.svg"
---

## 結論

`hugo serve`コマンドはデバッグ用のコマンドなので、`hugo`コマンドや`hugo build`コマンドで本番用にビルドしてあげる必要があります（当たり前体操）。

下記の記事を参考にしました。

{{<blogcard url="https://discourse.gohugo.io/t/localhost-links-being-generated/1059">}}

## なぜこの記事を書いたか

このブログではブログ内検索にAlgoliaを使っているのですが、検索結果の記事のBaseUrlが何故か`localhost:1313`（ローカル環境でのURL）になってしまっていたため、検索した記事に飛べない状況になってしまっていました… :crying_cat_face:

### 原因

元々、ローカル環境でのデバッグは次の手順で行っていました。

1. 何らかの編集
2. `hugo server`コマンドを実行して動作確認
3. npm scriptで設定したコマンドを使って自動的にAlgoliaにデータをアップロード
4. githubにも変更点をプッシュして自動デプロイ

今までは特に気にしたことも無かったのですが、手順2の`hugo server`コマンドによってビルドされたファイルの`.Permalink`は`localhost:1313`になってしまいます。Algoliaへのデータの反映はこのビルド時のデータを元にしていたので、Algolia経由での検索結果のURLがおかしくなっていました…:crying_cat_face:

### 対策

編集 ~ ビルド ~ デプロイまでの手順を次の様に変えました。

1. 何らかの編集
2. `hugo server`コマンドを実行して動作確認
3. **`hugo`コマンドを実行**
4. npm scriptで設定したコマンドを使って自動的にAlgoliaにデータをアップロード
5. githubにも変更点をプッシュして自動デプロイ

手順3により、`.Permalink`がちゃんと`config.toml`等で指定した`baseUrl`になりました。

なお、実際には手順3, 4はほぼ同時に行われるようにしており、`package.json`の`script`内では次のようなコマンドを定義し、サイトのビルドとAlgoliaへのアップロードをシームレスに実行しています。

```
"scripts": {
  "algolia": "algoliaへの自動アップロード処理"
  "build": "hugo --minify --gc && npm run algolia"
}
```

## 蛇足

本業並に時間があれば`Algolia`の検索機能のテストコードも書いて実装したいんだけどそんな余裕はない…
