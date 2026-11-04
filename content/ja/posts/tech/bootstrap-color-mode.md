---
title: "Bootstrapにダーク・ライトモードがいつの間にか来てたので導入してみた"
date: 2024-08-04T16:38:24+09:00
draft: false
show_date: true
toc: true
tags: [Bootstrap]
categories: [tech]
thumbnail: ""
---

このブログでは以前からBootstrapを使っているのですが、この前Bootstrapのドキュメントを読んでたらv5.3からカラーモードが追加されていたことに気が付きました（該当のページは↓）。

- [Bootstrapは、v5.3.0からカラーモード（テーマ）に対応](https://getbootstrap.jp/docs/5.3/customize/color-modes/)
- [v5.3.0のリリースノート](https://blog.getbootstrap.com/2023/05/30/bootstrap-5-3-0/)

追加されたのは1年以上前なんですけどね…:joy:

ということで、土日を使ってパパっとダークモードとライトモードの切り替えや、ユーザーのシステム設定を自動反映させるように変更しました。

本サイトのソースコードの[ここ](https://github.com/htnabe/HikaeMe/blob/main/assets/ts/color-module.ts)と[ここ](https://github.com/htnabe/HikaeMe/blob/main/layouts/partials/head.html)で処理を書いています。

- 導入時のTips
  - `bg-body`や`bg-body-tertiary`でページの背景色を設定することでダーク・ライトの切り替え時に自動的に切り替わるよ
  - 文字についても`text-body`を設定していれば、背景色の反転と同時に切り替わるよ
  - 切り替え処理自体にはJSが必要だよ
  - png, webpみたいに背景が透過する画像だと、場合によっては文字が背景色に同化しちゃうよ:cry:
