---
title: "Getting Error Logs for React Native (Expo) with Sentry"
date: 2021-12-07T23:33:01+09:00
tags: [React Native, Sentry, Expo, Error Log]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## Why I Wrote This Article

I am developing a React Native + Expo project with a friend. Having mostly finished implementing the required features, I started looking into how to capture error logs from real devices. Two services came up as candidates:

- [Sentry](https://sentry.io/welcome/)
- [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics?hl=ja)

While I am considering migrating to Crashlytics in the future, I decided to start with Sentry, since Expo itself provides documentation for it.

However, many articles about Sentry setup were outdated or unclear about where exactly to obtain tokens, so I also wrote this as a personal reference.

## Development Environment

- Expo SDK 42

These steps work for Expo SDK 40 and above.

## Implementation

Refer primarily to the Expo documentation. Sentry's official documentation also describes the setup, but it is not very user-friendly, so I recommend following the Expo docs.

{{<blogcard url="https://docs.expo.dev/guides/using-sentry/">}}

### Installing Required Packages

The only command you essentially need is:

```
expo install sentry-expo
```

Depending on your environment, you may also need to run:

```
expo install expo-application expo-constants expo-device expo-updates @sentry/react-native
```

I recommend running both commands just to be safe.

### Code

Add the following code to `App.js`. This initializes Sentry when the application launches.

```
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxx@xxxxxxxx.xxxxxx.sentry.io/xxxxxxxxxxxxx',
  enableInExpoDevelopment: true,  // falseとした場合、開発時のエラーは無視されます
  debug: true, // 製品版ではfalseにしてください
});
```

`enableInExpoDevelopment` defaults to true, but leaving it as-is means errors during development will also be reported, which is inconvenient, so I usually set it to `false`.

Additionally, setting `debug` to true will output useful information as debug logs when error log submission fails. This is something I am still experimenting with, so I will skip the details.

### Config Setup

Add the following to either `app.json` or `app.config.js`.

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

### How to Find the AuthToken and DSN

Go to the Sentry web page and select `Settings`.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry1_1_ypdzl2.webp" alt="sentry_setting_page">}}

The DSN is listed under `Client Keys (DSN)`, which you can find by scrolling down the page.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry2_kj958r.webp" alt="sentry_dsn">}}

The location of `AuthToken` is not immediately obvious, but you can navigate directly to the page by searching for `AuthToken` in the search bar at the top right of the `Settings` screen.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1638943470/NabeBlog/Inkedsentry3_yljl9l.webp" alt="sentry_search_bar">}}

## References

For further details on how to use Sentry, I recommend referring to the following three articles:

- [Sentry を活用したい！](https://zenn.dev/magicmoment/articles/sentry-202109)
- [Sentry で始める快適エラートラッキング on React Native](https://medium.com/@tsugitta/sentry-on-react-native-1364c3fb407a)
