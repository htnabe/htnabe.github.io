---
title: "【React Native】EAS buildでconfigファイルが読み込まれないときの対処法"
date: 2022-03-16T23:11:39+09:00
tags: [React Native, Expo, EAS, Expo Application Service, エラー]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

2023年1月4日に廃止になる`expo build`コマンドに変わり、現在、`eas build`コマンドを介したアプリケーションのビルドが推奨されています。そこで、私もEAS buildを初体験してみようと思ったのですが、思わぬエラーに詰まってしまったので紹介しておきます。

## 今回起こったこと

`eas build`コマンドでアプリをビルドしようとしたところ、下記のエラー文が`Prebuild`の段階で出ており、ビルドを完了できませんでした。なお、この時点で`expo build:andriod`コマンドによるビルドは問題なく動きました。

```
[05:49:21] 📝  Android package Learn more: https://expo.fyi/android-package
[stderr] [05:49:21] Input is required, but Expo CLI is in non-interactive mode.
[stderr] Your project must have a `package` set in the Expo config (app.json or app.config.js).
[stderr] See https://expo.fyi/android-package
bash exited with non-zero code: 1
So, I checked package section in my app.config.js, but the package section is included.
```

エラー文を読んだところ、単に「`app.json`または`app.config.js`内に`package`に関する部分が含まれていないよ！」ということを示していることが分かります。「あれ？書いてあるはずだけどな…」と思ったのですが、一応今回のプロジェクトの`app.config.js`を調べてみました。

そのときの`app.config.js`は↓のようになっていました。

```
export default {
  name: 'SUEP',
  icon: './assets/suep_icon.png',
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.1.3',
  orientation: 'portrait',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  updates: {
    fallbackToCacheTimeout: 10000,
  },
  android: {
    package: 'com.tpot.suepapp',
    versionCode: 12,
    permissions: [],
    adaptiveIcon: {
      foregroundImage: './assets/suep_icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  hooks: {
...secret...
  },
  plugins: ['sentry-expo'],
  extra: {
...secret...
  },
};
```

ここで分かる通り、`android`セクション内に`package`セクションが間違いなく含まれています。

追加でさらに調べてみたところ、`eas build`の実行結果内のRead app configセクションの結果がこのように示されていました。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1647441383/NabeBlog/appConfigResult_qgnn8h.webp" alt="app config section">}}

この画像の`name`や`version`を見て、「`app.config.js`に書き込んだ本来のアプリ名やバージョンを読み込めていないのではないか」ということが推測できます。

## 解決方法

解決方法について色々と調べたのですが、自力で見つけることができず、Expo forumで直接質問してみました。詳細については[こちら](https://forums.expo.dev/t/error-eas-build-failed-in-prebuild-bash-exited-with-non-zero-code-1/62389)を参照してください。

結果として、`eas build`によってアプリのビルドサーバーに送信されるデータは`.gitignore`で管理されていることが分かりました。さらに、`.easignore`を追加することにより、`.gitignore`を上書き可能であることも分かりました。

上記の内容を実際のプロジェクトにも反映することで、無事EAS buildを完了することができました。

## 最後に

今回の`.easignore`によって`.gitignore`を上書きできるという仕様は[こちら](https://github.com/expo/fyi/blob/main/eas-build-archive.md)のページまとめられています。
