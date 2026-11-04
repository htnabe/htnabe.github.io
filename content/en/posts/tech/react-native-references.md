---
title: Useful Resources for Building a Smartphone App [React Native + Expo]
tags: [React Native, Expo]
categories: [Tech]
date: 2021-03-26
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## Update (March 2022)

Now that 2022 has arrived, I've found a few more helpful articles worth sharing.

## Introduction

Recently, I built a smartphone app aimed at students in my organization. The tech stack consisted of Twitter API, Google Cloud Platform, Google Spreadsheet API, React Native, and Expo.

Since no one around me was familiar with React Native or Expo, I taught myself entirely from scratch. On the bright side, I was able to identify sites that are still useful as of 2021, and since my bookmarks bar was getting crowded, I'm sharing them here as a personal reference.

## About the Twitter API

For this app, I used the `user_timeline` API and the `oEmbed` API from Twitter. Links for each are below.

- {{<rawhtml>}}<a href="https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline" target="_blank" rel="noopener noreferrer">GET statuses/user_timeline | Twitter - Developer</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed" target="_blank" rel="noopener noreferrer">GET statuses/oembed | Twitter - Developer</a>{{</rawhtml>}}

In general, **when displaying tweets in an external application using the Twitter API, Twitter's embed feature is the recommended approach** (and it satisfies all of Twitter's terms of service).

For web applications this is simple — you just load the HTML tag — but for a smartphone app, especially React Native + Expo, embedding tweets is a cumbersome process. In particular, embedding HTML tags inside a FlatList requires pulling in a heavy third-party library, and there is a good chance it simply cannot be done within Expo's `managed workflow` (I couldn't figure it out, at least).

So instead of using HTML tag embedding, I implemented it using React Native's `View` and `Text` tags with styling, satisfying **all of Twitter's design guidelines that must be followed when displaying tweets in external applications**.

To display tweets in an external app, you need to comply with Twitter's policies, particularly rules 5–7 below. They are fairly detailed, so you just have to read them carefully and make sure you are not violating anything.

2. {{<rawhtml>}}<a href="https://qiita.com/hitsumabushi845/items/f7fd87106381fc65fc86" target="_blank" rel="noopener noreferrer">140文字以上のツイートを取得する - Qiita</a>{{</rawhtml>}}
3. {{<rawhtml>}}<a href="https://e-yota.com/webservice/post-2511/" target="_blank" rel="noopener noreferrer">Twitter APIのユーザータイムライン（GET statuses/user_timeline）をデータベースに切れ目なく保存する（その4~since_idとmax_idの組み合わせについて） &#8211; エコテキブログ</a>{{</rawhtml>}}
4. {{<rawhtml>}}<a href="http://ailaby.com/twitter_api/" target="_blank" rel="noopener noreferrer">TwitterAPI でツイートを大量に取得。サーバー側エラーも考慮（pythonで） | コード７区</a>{{</rawhtml>}}
5. {{<rawhtml>}}<a href="https://developer.twitter.com/en/developer-terms/display-requirements" target="_blank" rel="noopener noreferrer">Display requirements – Twitter Developers | Twitter
   Developer</a>{{</rawhtml>}}
6. {{<rawhtml>}}<a href="https://developer.twitter.com/en/developer-terms/more-on-restricted-use-cases" target="_blank" rel="noopener noreferrer">More on restricted use cases – Twitter Developers | Twitter
   Developer</a>{{</rawhtml>}}
7. {{<rawhtml>}}<a href="https://developer.twitter.com/ja/developer-terms/agreement" target="_blank" rel="noopener noreferrer">開発者契約 − Twitter開発者 | Twitter
   Developer</a>{{</rawhtml>}}

## About React Native Libraries

The following resources give a well-organized overview of basic RN syntax, which applies broadly across the whole project.

- [Zenn - React Native ハンズオン〜第一回目　基本文法編](https://zenn.dev/yutama_kotaro/articles/7a0d1d771d2ca3#props)
- [React Native勉強メモ　〜Componentの基礎編〜](https://qiita.com/Omoti/items/83e331ca3d9dfb751be7)

### FlatList-related

FlatList, which was mentioned earlier, supports a number of options. I found articles about "loading the latest data when scrolling" and "considerations when inserting a search bar inside a FlatList" particularly helpful.

- [React Native Official Menu about Flatlist](https://reactnative.dev/docs/flatlist)
- {{<rawhtml>}}<a href="https://puroguradesu.hatenadiary.jp/entry/2020/07/16/020556" target="_blank" rel="noopener noreferrer">【ReactNative】FlatListの基本の使い方 - PUROGU LADESU</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://qiita.com/Kontam/items/eb924d86228236f8ca2d" target="_blank" rel="noopener noreferrer">React Native リストの一番上の更に上までスクロールしたら最新のリストをロードする - Qiita</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps/" target="_blank" rel="noopener noreferrer">How to Add a Search Bar in a FlatList in React Native Apps</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://puroguradesu.hatenadiary.jp/entry/2020/03/12/121608" target="_blank" rel="noopener noreferrer">【ReactNative】FlatListの検索バー - PUROGU LADESU</a>{{</rawhtml>}}

As I also wrote in [this article]({{< relref "flatlist-checkbox-example.md" >}}), implementing checkboxes inside a FlatList is quite a hassle.

- [How to render check box inside flatlist](https://javascript.tutorialink.com/how-to-render-check-box-inside-flatlist/)
- [How to check individual item in FlatList with checkbox in react native?](https://stackoverflow.com/questions/61772299/how-to-check-individual-item-in-flatlist-with-checkbox-in-react-native)

There were also several very helpful articles on FlatList performance tuning.

- [Zenn - React NativeでFlatList/SectionListを使うときに実施したい性能改善策](https://zenn.dev/hal1986/articles/60be82bc096a4a6c8faa)
- [Zenn - React Native + Expoでアプリを作ってApp StoreとGoogle Playで公開した](https://zenn.dev/ryonakae/articles/35ebacb8e7be49#flatlist%E3%81%AE%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0)

### AsyncStorage-related

I use AsyncStorage to manage and persist the data fetched via the Twitter API. For reading, writing, and assigning data, I rely on `useState` and `useEffect`.

I referenced the following links for their usage.

1. {{<rawhtml>}}<a href="https://qiita.com/Ryusou/items/8bce84e7b036114b8d72" target="_blank" rel="noopener noreferrer">リロードしてもデータを保持するためには「localStorage」 - Qiita</a>{{</rawhtml>}}
2. {{<rawhtml>}}<a href="https://docs.expo.io/versions/latest/sdk/filesystem/" target="_blank" rel="noopener noreferrer">FileSystem - Expo Documentation</a>{{</rawhtml>}}
3. {{<rawhtml>}}<a href="https://docs.expo.io/versions/latest/sdk/async-storage/#usage" target="_blank" rel="noopener noreferrer">AsyncStorage - Expo Documentation</a>{{</rawhtml>}}
4. {{<rawhtml>}}<a href="https://qiita.com/yonetty/items/ad19bddc26806bb49cef" target="_blank" rel="noopener noreferrer">TypeScriptでReact Hooksに入門するチュートリアル - Qiita</a>{{</rawhtml>}}
5. {{<rawhtml>}}<a href="https://reffect.co.jp/react/react-useeffect-understanding" target="_blank" rel="noopener noreferrer">React useEffectを理解する | アールエフェクト</a>{{</rawhtml>}}
6. {{<rawhtml>}}<a href="https://blog.photosynthesic.jp/2018/09/react-native%e3%81%a7%e9%81%8a%e3%82%93%e3%81%a7%e3%81%bf%e3%82%88%e3%81%86-%e5%85%b6%e3%83%8e%e5%bc%90%ef%bc%9areact-native-storage-%e3%81%a7%e3%83%87%e3%83%bc%e3%82%bf%e3%82%92%e4%bf%9d%e5%ad%98/" target="_blank" rel="noopener noreferrer">React Nativeで遊んでみよう - 其ノ弐：react native storage でデータを保存 - Photosynthesic blog</a>{{</rawhtml>}}

I'm also considering migrating to `Realm` in the near future, so the following article was very helpful.

- [Zenn - Watermelon『Realmよ。俺と戦え。』 AsyncStorage『。。。。。』](https://zenn.dev/yutama_kotaro/articles/d3f40128fc35e5)

### View and Style-related

Resources about `View` and `StyleSheet`.

2. {{<rawhtml>}}<a href="https://bagelee.com/programming/react-native/react-native-layout/#3" target="_blank" rel="noopener noreferrer">レイアウトを整える【これからはじめるReact Native】 - bagelee（ベーグリー）</a>{{</rawhtml>}}
3. [Layout with Flexbox](https://reactnative.dev/docs/flexbox)

### About useContext

These were very helpful when I needed to modify a state variable defined in a parent file from a child component.

- [React Context API と useContext() の使い方](https://gotohayato.com/content/523/)
- [React NativeでuseContextを使ってstateを変更する方法【React Native + Expo】]({{< relref "RN-useContext.md" >}})

## Data Formatting in JavaScript

When I first started using JavaScript, I was genuinely writing code on pure intuition — no joke. But after a year of solo development, I inevitably ran into situations that required performance tuning, so I kept studying JavaScript's specifications along the way.

The following sites explain in detail how to approach performance tuning when searching through associative arrays or plain arrays.

- [100倍速い!? Set, Mapでパフォーマンス改善](https://nulab.com/ja/blog/nulab/100times-faster-performance-improvement-set-map/)
- [配列を高速に探索するTips](https://qiita.com/alucky0707/items/10052866719ba5c5f5d7)

For ternary operators within JSX, these articles were helpful.

- [【React Native】 JSX内で三項演算子を使って「連続表示させないタグ」と「連続表示させるタグ」を包括する](https://qiita.com/LemonmanNo39/items/6d4e032efabee6c918d0)
- [Zenn - React Native の JSX 内で && 演算子を使ったらエラーに怒られた](https://zenn.dev/luvmini511/articles/ce1e75d285e0ce)

## Closing

I'm currently in the middle of releasing updates for what is my very first smartphone app ever.

So I expect the links on this page to grow alongside the app's updates. Stay tuned (🙄)
