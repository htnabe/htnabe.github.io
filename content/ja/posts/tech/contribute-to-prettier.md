---
title: "Prettierにﾁｮｯﾄﾀﾞｹ貢献しました"
date: 2026-07-18T07:35:40Z
draft: false
show_date: true
toc: true
tags: [OSS, Prettier]
categories: [Tech]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1784360892/tech/contribute-to-prettier/plugin-screen-shot_mvsjnb.png"
---

## 背景

最近、[@htnabe/prettier-plugin-go-template](https://github.com/htnabe/prettier-plugin-go-template)というprettierのプラグインを開発しています。

もともとはNicklasPorさんが作っていた`prettier-plugin-go-template`というプラグインがあったのですが、このプラグインが事実上のアーカイブ状態になっていました。

{{<blogcard url="https://github.com/NiklasPor/prettier-plugin-go-template">}}

- [関連issue](https://github.com/NiklasPor/prettier-plugin-go-template/issues/123)

そこで、`prettier-plugin-go-template`の1ユーザーとして、このプラグインを継続的に更新していきたいと思い、上記の通り私のほうでフォークし、リリースしなおしていました。

`npm.js`のほうでは以下の通り確認できるのですが、`v0.0.1-rc.1`のリリース時にすでに220ダウンロード程度されているので、既に使っていただけているようです。

- [npm.jsの方のページはこちら](https://www.npmjs.com/package/@htnabe/prettier-plugin-go-template)

## 貢献内容

貢献内容としては本当に小さなものです。

prettierの[プラグインを紹介するページ](https://prettier.io/docs/plugins/)があるのですが、このページで公開されていた、前の`prettier-plugin-go-template`を`@htnabe/prettier-plugin-go-template`に書き換えただけです。

詳細といえるほどの詳細はありませんが、PRは[こちら](https://github.com/prettier/prettier/pull/19665)です。

マージ後確認しましたが、特に問題なく`Community plugin`として載っていました。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1784360892/tech/contribute-to-prettier/plugin-screen-shot_mvsjnb.png" caption="prettierのpluginページに乗ってる！" alt="prettierのpluginページに乗ってる！">}}
