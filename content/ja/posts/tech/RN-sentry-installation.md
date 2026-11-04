---
title: "SentryでReact Native(Expo)のエラーログを取得する"
date: 2021-12-07T23:33:01+09:00
tags: [React Native, Sentry, Expo, エラーログ]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## この記事を書いた理由

React Native + Expoのプロジェクトを友人と開発しているのですが、概ね必要な機能の実装を済ませたので、実機でのエラーログの取得について検討しました。その結果、エラーログの取得を行えるサービスとして、以下の二つが候補に上がりました。

- [Sentry](https://sentry.io/welcome/)
- [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics?hl=ja)

将来的にはCrashlyticsへの移行を考えていますが、ひとまずExpo側にもドキュメントが用意されているSentryでクラッシュログの取得を行うことにしました。

しかしながら、Sentryの導入について書かれた記事が古くなっていたり、具体的にどこでトークンの取得などを行えるのか分かりにくい記事が多かったので備忘録としてもこの記事を書きました。

## 開発環境

- Expo SDK 42

Expo SDK 40以上であればこの記事の手順でインストールできます。

## 実装方法

基本的にはExpo側のドキュメントを参考にしてください。Sentryの公式サイトのドキュメントにも導入方法が書かれていますが、あまり親切ではないのでExpo側のドキュメントに従うことをお勧めします。

{{<blogcard url="https://docs.expo.dev/guides/using-sentry/">}}

### 必要なパッケージのインストール

必要なコマンドは基本的には下記のみですが、

```
expo install sentry-expo
```

環境によっては追加で下記のコマンドも実行する必要があります。

```
expo install expo-application expo-constants expo-device expo-updates @sentry/react-native
```

念のため両方のコマンドの実行をお勧めします。

### コード

`App.js`に下記のコードを追加してください。アプリケーションの起動時にSentryの初期化が行われます。

```
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxx@xxxxxxxx.xxxxxx.sentry.io/xxxxxxxxxxxxx',
  enableInExpoDevelopment: true,  // falseとした場合、開発時のエラーは無視されます
  debug: true, // 製品版ではfalseにしてください
});
```

`enableInExpoDevelopment`はデフォルトでtrueになっているのですが、このままだと開発時のエラーも報告されてしまって面倒なので私は基本的に`false`にしています。

また、エラーログの送信に失敗した場合などには`debug`をtrueにしておくことで有益な情報をデバッグログとして出力してくれるようです。これについては私も現在試している部分なので詳細を省きます。

### コンフィグの設定

`app.json`か`app.config.js`のいづれかに下記の項目を追加します。

```
{
  "expo": {
    // ... your existing configuration
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "sentryで作成した組織名",
            "project": "sentryで作成したプロジェクト名",
            "authToken": "ランダムっぽい英数字が並ぶトークン"
          }
        }
      ]
    }
  }
}
```

### AuthTokenとDSNの調べ方

Sentryのwebページに移り、`Settings`を選びます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry1_1_ypdzl2.webp" alt="sentry_setting_page">}}

DSNは画面を下にスクロールしていくとある、`Client Keys(DSN)`に記されています。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry2_kj958r.webp" alt="sentry_dsn">}}

`AuthToken`の場所は分かりにくいのですが、`Settings`の画面の右上にある検索バーから`AuthToken`と検索することで、直接目的のページへ移れます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry3_yljl9l.webp" alt="sentry_search_bar">}}

## 参考

その他、Snetryの具体的な使い方などについては下記3つの記事などを参照することをオススメします。

- [Sentry を活用したい！](https://zenn.dev/magicmoment/articles/sentry-202109)
- [Sentry で始める快適エラートラッキング on React Native](https://medium.com/@tsugitta/sentry-on-react-native-1364c3fb407a)
