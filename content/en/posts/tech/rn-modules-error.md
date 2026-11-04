---
title: "[React Native] Fixing the \"Invariant Violation: \\\"main\\\" has not been registered...\" Error"
date: 2022-03-17
tags: [React Native, Expo, Error]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## Cause of This Error (In My Case)

I manage library dependencies with `yarn`, and this error appeared after removing unused libraries. It was likely caused by some inconsistency in the package manager's state.

### Environment

An excerpt from `package.json`:

```
 "dependencies": {
    "expo": "^44.0.0",
    "react": "17.0.1",
    "react-native": "0.64.3",
  }
```

### Error Message

```
Invariant Violation "main" has not been registered. This can happen if: *Metro (the local dev server)
is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.*
A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.
```

### Solution

In my case, the error started appearing immediately after removing unused libraries, so I suspected that `yarn` had left `node_modules` and `yarn.lock` in an inconsistent state.

To resolve this, **I deleted and regenerated `node_modules` and `yarn.lock`**. The steps were as follows:

1. Delete `node_modules` and `yarn.lock`
2. Run the `yarn install` command

## Closing

Apparently the same error can occur for other reasons, but in my case the cause was simple, making it easy to fix. As always, committing to branches frequently is important.

Reference: [【React Native】Invariant Violation "main" has not been registered. This can happen if: \*Metro (the local dev server ... の解決法](https://qiita.com/ikkei12/items/06e1a5ed164989feb4d0)
