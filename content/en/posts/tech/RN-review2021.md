---
title: "My Experience Developing a Smartphone App with React Native + Expo [2021]"
date: 2021-12-22T20:30:41+09:00
tags: [React Native, Expo]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## Introduction

Starting in April this year, I began working with React Native and developed and released my very first smartphone app — [SUEP](https://github.com/htnabe/SUEP), an information aggregator app for students at Shimane University.

The programming languages I had experience with before developing this app were:

- C (only from university coursework)
- Python (same as above)
- C# (only used briefly to make a small game in Unity)
- Google Apps Script (capable of writing reasonable scripts for simple tasks)

I had only briefly glimpsed others using React Native + Expo and had never written a single line of it myself. Likewise, I had never touched JavaScript at all.

Even without extensive programming experience, you can build a reasonably functional app with React Native + Expo, and I hope this post serves as a reference for anyone considering building an app.

## Why I Chose It

I now maintain and develop the app together with another programmer, but at the start in April I was developing it alone. So honestly, I chose it mainly because I genuinely wanted to try it lol.

Before development, I already knew:

- React Native + Expo supposedly makes it (**relatively**) easy to build smartphone apps
- Parts overlap with React, so once you get used to React Native syntax, React-based web apps also become easier (supposedly)

Combined with my vague desire to build a web app someday, these reasons led me to conclude **this is the one** and I started development.

Unfortunately, I only found out much later that Kotlin is the leading choice for iOS, Java for Android, and that Flutter, Unity, etc. are alternatives for cross-platform development.

## What Was Good About React Native + Expo

There were three things I found great about React Native + Expo:

- Low overall cost of building a smartphone app (Managed workflow only)
- Easy on-device debugging (Managed workflow only)
- Fewer steps required to release the app

### Low Overall Cost of Building a Smartphone App (Managed Workflow Only)

I currently manage SUEP with the `Managed workflow`. Its features are fairly simple: automatically fetching tweets and displaying Shimane University lecture information offline.

On the other hand, I understand that for cases requiring native functionality, such as Firebase Analytics, you need to migrate to `Bare workflow`.

With Managed workflow, you can use a wide range of libraries available through Expo, which undeniably speeds up development.

Depending on your app's requirements, you may be forced to choose Bare workflow. Please refer to the article below, but compared to Managed workflow, Bare workflow requires more consideration especially in these two areas:

- library selection during development
- release procedures

### Easy On-Device Debugging (Managed Workflow Only)

This too is specific to Managed workflow, but I also want to mention what is arguably Expo's biggest strength: the ease of on-device debugging.

Running `expo start` and scanning the QR code allows you to debug on any device, which has a significant impact on development speed. The ability to easily show app demos is also a big advantage.

However, on-device debugging with Bare workflow is somewhat more complicated. Please refer to the slides below for details.

{{<blogcard url="https://speakerdeck.com/takahi5/bu-kunaiexpo-eject-tech-stand-number-2?slide=28">}}

### Fewer Steps Required to Release the App

This is also a major advantage. When using Expo, OTA (Over-the-Air) updates allow you to push updates to users' apps without going through the store review process (subject to certain conditions).

As a beginner in particular, it was greatly appreciated that the `expo build:ios` and `expo build:android` commands take care of preparing all the files needed for release.

## What Was Difficult About React Native + Expo

- Searching online returns many React-specific articles
- Few articles written with Function Components
- The OTA update specification is complex
- (90% of documentation is in English)

### Many Search Results Are React-Specific

One thing that hampered the development experience was that searching for React Native library articles typically returns React-specific library articles instead.

Having to filter between React and React Native articles every time was very tedious.

### Few Articles Written with Function Components

As stated in the article below, Function Components are the recommended approach in React (and React Native).

{{<blogcard url="https://qiita.com/Kouichi_Itagaki/items/c8e05f084fe88a086100">}}

Despite this, when you search for help, far too many articles are written with Class Components only — honestly frustrating.

You could convert from Class Component to Function Component before writing your code, but there were many times when writing it from scratch was faster, which was equally frustrating.

### The OTA Update Specification Is Complex

I mentioned OTA updates as a positive aspect of RN + Expo, but the OTA update specification is actually quite confusing.

I referenced the following article for the OTA update spec, but because I didn't know the odd behavior where the `expo build` command automatically runs `expo publish`, I nearly released the app full of bugs.

{{<blogcard url="https://zenn.dev/marin_a___/articles/7eec197a8c3579">}}

OTA updates are convenient, but understanding the specification was quite an effort.

### (90% of Documentation Is in English)

Opinions on this are probably divided.

Since I can handle English to a reasonable extent, it wasn't a major issue for me personally, but I believe this was (and still is) the biggest barrier when it comes to team development.

English-language sites and forums are far more active, so when asking questions about React Native or Expo, or searching for solutions to unknown problems, English proficiency is essentially required for smooth problem-solving.

Now that I'm developing the app as a team, I honestly feel that the ability to read English articles and documentation makes a significant difference in both learning cost and development speed.

## Summary

Personally, I feel that choosing React Native + Expo for my first smartphone app was the right decision.

By continuing to develop with React Native + Expo, I hope to refine the thoughts and opinions shared here into more generalized insights.
