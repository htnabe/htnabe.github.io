---
title: "[React Native] How to Fix Config File Not Being Read During EAS Build"
date: 2022-03-16T23:11:39+09:00
tags: [React Native, Expo, EAS, Expo Application Service, Error]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

With the `expo build` command being deprecated on January 4, 2023, the recommended approach is now to build applications via the `eas build` command. I decided to try EAS build for the first time, but ran into an unexpected error — so I'm documenting it here.

## What Happened

When I tried to build the app with the `eas build` command, the following error appeared during the `Prebuild` phase, and the build could not complete. Note that at this point, building with the `expo build:android` command still worked fine.

```
[05:49:21] 📝  Android package Learn more: https://expo.fyi/android-package
[stderr] [05:49:21] Input is required, but Expo CLI is in non-interactive mode.
[stderr] Your project must have a `package` set in the Expo config (app.json or app.config.js).
[stderr] See https://expo.fyi/android-package
bash exited with non-zero code: 1
So, I checked package section in my app.config.js, but the package section is included.
```

Reading the error message, it clearly states that there is no `package` section in `app.json` or `app.config.js`. I thought "Wait, I definitely have that written…", so I checked the project's `app.config.js` just to be sure.

The `app.config.js` at that time looked like this:

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

As you can see, the `package` section is indeed included within the `android` section.

Investigating further, I found that the Read app config section of the `eas build` output showed this:
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1647441383/NabeBlog/appConfigResult_qgnn8h.webp" alt="app config section">}}

Looking at the `name` and `version` in the image, you can infer that the actual app name and version written in `app.config.js` are not being read.

## Solution

I looked into various solutions but couldn't figure it out on my own, so I posted a question directly on the Expo forum. See [this thread](https://forums.expo.dev/t/error-eas-build-failed-in-prebuild-bash-exited-with-non-zero-code-1/62389) for details.

It turned out that the data sent to the build server via `eas build` is governed by `.gitignore`. Furthermore, adding an `.easignore` file allows you to override `.gitignore`.

Applying this to my project, I was able to complete the EAS build successfully.

## Closing

The behavior where `.easignore` can override `.gitignore` is documented on [this page](https://github.com/expo/fyi/blob/main/eas-build-archive.md).
