---
title: '【React Native】Invariant Violation "main" has not been registered... のエラーについて'
date: 2022-03-17
tags: [React Native, Expo, エラー]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## このエラーが起こった原因（私の場合）

`yarn`を使ってライブラリの依存管理をしているのですが、不要なライブラリを削除した後にこのエラーが出ました。おそらくパッケージマネージャ自体の何らかの不具合によるものだと思われます。

### 環境

`package.json`の一部抜粋です。

```
 "dependencies": {
    "expo": "^44.0.0",
    "react": "17.0.1",
    "react-native": "0.64.3",
  }
```

### エラー文

```
Invariant Violation "main" has not been registered. This can happen if: *Metro (the local dev server)
is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.*
A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.
```

### 解決方法

私の場合、不要なライブラリの削除を行った直後にこのエラーが突然出るようになったので、`yarn`によって`node_modules`と`yarn.lock`に変更が入った不具合が生じたと推測しています。

これを解決するために、**node_modulesとyarn.lockの削除と再生成を行いました**。次の通りの手順を取りました。

1. `node_modules`と`yarn.lock`の削除
2. `yarn install`コマンドの実行

## 最後に

これ以外の原因で同じエラーが出ることがあるそうですが、今回は原因が単純だったので対応も楽でした。やはりこまめにブランチを切っておくことが大事。

参考：[【React Native】Invariant Violation "main" has not been registered. This can happen if: \*Metro (the local dev server ... の解決法](https://qiita.com/ikkei12/items/06e1a5ed164989feb4d0)
