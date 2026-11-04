---
title: スマホアプリの作成に参考になったサイト一覧【React Native + Expo】
tags: [React Native, Expo]
categories: [Tech]
date: 2021-03-26
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## 追記（2022年3月）

2022年になってもまた参考になった記事が幾つか見つかったのでシェアしておきます。

## 始めに

最近、自分が所属する学生向けにスマホアプリを作成しました。構成としてはTwitter API, Google Cloud Platform, Google Spreadsheet API, React Native, Expoです。

周りにReact Native, Expoについて明るい方がいないので完全に独学になりました。が、その分2021年現在でも問題なく参考になるサイトを把握できたのと、お気に入りバーが狭くなってきたので自分の備忘録がてらシェアしときます。

## Twitter APIについて

今回作成したアプリではTwitter APIとして`user_timeline`APIと`oEmbed`APIを用いました。それぞれ下記リンクの通りです。

- {{<rawhtml>}}<a href="https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline" target="_blank" rel="noopener noreferrer">GET statuses/user_timeline | Twitter - Developer</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed" target="_blank" rel="noopener noreferrer">GET statuses/oembed | Twitter - Developer</a>{{</rawhtml>}}

通常、**Twitter APIを利用してツイートを外部のアプリケーションで表示する際にはTwitterの埋め込み機能が推奨されています**（Twitterの利用規約なども全て満たせています）。

これはwebアプリケーションなどではそのままhtmlのタグを読み込むだけなので簡単に実装できますが、スマホアプリ、しかもReact Native+ Expoだと、ツイートの埋め込みは面倒な手順となります。特に、Flatlist内にhtmlタグを埋め込むにはサードパーティのライブラリをがっつり導入することになったり、そもそもExpoの`managed flow`では実装できない可能性が高いです（私には実装方法が分からなかった）。

そこでhtmlタグでの埋め込みを回避し、**Twitterの利用規約や外部アプリでツイートを表示する際に必ず守らなければならないデザインの要綱**を全て満たし、React NativeのViewやTextタグにスタイルを付けて実装しました。

ツイートを外部アプリで表示するためには下記の5～7番目などのTwitterの規約を守る必要があります。なかなか細かく決まっていますが根気よく読んで、違反箇所が無いように気を付けるしかかなさそうです。

2. {{<rawhtml>}}<a href="https://qiita.com/hitsumabushi845/items/f7fd87106381fc65fc86" target="_blank" rel="noopener noreferrer">140文字以上のツイートを取得する - Qiita</a>{{</rawhtml>}}
3. {{<rawhtml>}}<a href="https://e-yota.com/webservice/post-2511/" target="_blank" rel="noopener noreferrer">Twitter APIのユーザータイムライン（GET statuses/user_timeline）をデータベースに切れ目なく保存する（その4~since_idとmax_idの組み合わせについて） &#8211; エコテキブログ</a>{{</rawhtml>}}
4. {{<rawhtml>}}<a href="http://ailaby.com/twitter_api/" target="_blank" rel="noopener noreferrer">TwitterAPI でツイートを大量に取得。サーバー側エラーも考慮（pythonで） | コード７区</a>{{</rawhtml>}}
5. {{<rawhtml>}}<a href="https://developer.twitter.com/en/developer-terms/display-requirements" target="_blank" rel="noopener noreferrer">Display requirements – Twitter Developers | Twitter
   Developer</a>{{</rawhtml>}}
6. {{<rawhtml>}}<a href="https://developer.twitter.com/en/developer-terms/more-on-restricted-use-cases" target="_blank" rel="noopener noreferrer">More on restricted use cases – Twitter Developers | Twitter
   Developer</a>{{</rawhtml>}}
7. {{<rawhtml>}}<a href="https://developer.twitter.com/ja/developer-terms/agreement" target="_blank" rel="noopener noreferrer">開発者契約 − Twitter開発者 | Twitter
   Developer</a>{{</rawhtml>}}

## React Nativeの各ライブラリについて

全体に共通する基礎部分である、RNの構文についてよくまとめられています。

- [Zenn - React Native ハンズオン〜第一回目　基本文法編](https://zenn.dev/yutama_kotaro/articles/7a0d1d771d2ca3#props)
- [React Native勉強メモ　〜Componentの基礎編〜](https://qiita.com/Omoti/items/83e331ca3d9dfb751be7)

### Flatlist関連

先ほど出てきたFlatlistですが、いくつかオプションを付けることが可能です。特に「スクロールした際に最新データをロードする機能」や「FlatList内で検索バーを挿入する場合の注意点」などについてはとても参考になりました。

- [React Native Official Menu about Flatlist](https://reactnative.dev/docs/flatlist)
- {{<rawhtml>}}<a href="https://puroguradesu.hatenadiary.jp/entry/2020/07/16/020556" target="_blank" rel="noopener noreferrer">【ReactNative】FlatListの基本の使い方 - PUROGU LADESU</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://qiita.com/Kontam/items/eb924d86228236f8ca2d" target="_blank" rel="noopener noreferrer">React Native リストの一番上の更に上までスクロールしたら最新のリストをロードする - Qiita</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps/" target="_blank" rel="noopener noreferrer">How to Add a Search Bar in a FlatList in React Native Apps</a>{{</rawhtml>}}
- {{<rawhtml>}}<a href="https://puroguradesu.hatenadiary.jp/entry/2020/03/12/121608" target="_blank" rel="noopener noreferrer">【ReactNative】FlatListの検索バー - PUROGU LADESU</a>{{</rawhtml>}}

また、私が書いた[こちら]({{< relref "flatlist-checkbox-example.md" >}})の記事でもそうですが「FLatList内でチェックマークを利用する」という実装はかなり面倒です。

- [How to render check box inside flatlist](https://javascript.tutorialink.com/how-to-render-check-box-inside-flatlist/)
- [How to check individual item in FlatList with checkbox in react native?](https://stackoverflow.com/questions/61772299/how-to-check-individual-item-in-flatlist-with-checkbox-in-react-native)

その他、FlatListのパフォーマンスチューニングについても幾つか非常に参考になる記事がありました。

- [Zenn - React NativeでFlatList/SectionListを使うときに実施したい性能改善策](https://zenn.dev/hal1986/articles/60be82bc096a4a6c8faa)
- [Zenn - React Native + Expoでアプリを作ってApp StoreとGoogle Playで公開した](https://zenn.dev/ryonakae/articles/35ebacb8e7be49#flatlist%E3%81%AE%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0)

### AsyncStorage関連

Twitter APIを実行してFetchしてきたデータの管理・永続化にはAsyncStorageを利用しています。また、データの書き込み・呼び出し・代入は`useState`や`useEffect`を用いています。

これらの使い方は下記リンクを参照しました。

1. {{<rawhtml>}}<a href="https://qiita.com/Ryusou/items/8bce84e7b036114b8d72" target="_blank" rel="noopener noreferrer">リロードしてもデータを保持するためには「localStorage」 - Qiita</a>{{</rawhtml>}}
2. {{<rawhtml>}}<a href="https://docs.expo.io/versions/latest/sdk/filesystem/" target="_blank" rel="noopener noreferrer">FileSystem - Expo Documentation</a>{{</rawhtml>}}
3. {{<rawhtml>}}<a href="https://qiita.com/yonetty/items/ad19bddc26806bb49cef" target="_blank" rel="noopener noreferrer">TypeScriptでReact Hooksに入門するチュートリアル - Qiita</a>{{</rawhtml>}}
4. {{<rawhtml>}}<a href="https://reffect.co.jp/react/react-useeffect-understanding" target="_blank" rel="noopener noreferrer">React useEffectを理解する | アールエフェクト</a>{{</rawhtml>}}
5. {{<rawhtml>}}<a href="https://blog.photosynthesic.jp/2018/09/react-native%e3%81%a7%e9%81%8a%e3%82%93%e3%81%a7%e3%81%bf%e3%82%88%e3%81%86-%e5%85%b6%e3%83%8e%e5%bc%90%ef%bc%9areact-native-storage-%e3%81%a7%e3%83%87%e3%83%bc%e3%82%bf%e3%82%92%e4%bf%9d%e5%ad%98/" target="_blank" rel="noopener noreferrer">React Nativeで遊んでみよう - 其ノ弐：react native storage でデータを保存 - Photosynthesic blog</a>{{</rawhtml>}}

また、近いうちに`Realm`への移行も考えているため、下記の記事はとても参考になりました。

- [Zenn - Watermelon『Realmよ。俺と戦え。』 AsyncStorage『。。。。。』](https://zenn.dev/yutama_kotaro/articles/d3f40128fc35e5)

### View, style関連

`View`と`StyleSheet`についてです。

2. {{<rawhtml>}}<a href="https://bagelee.com/programming/react-native/react-native-layout/#3" target="_blank" rel="noopener noreferrer">レイアウトを整える【これからはじめるReact Native】 - bagelee（ベーグリー）</a>{{</rawhtml>}}
3. [Layout with Flexbox](https://reactnative.dev/docs/flexbox)

### useContextについて

例えば親ファイルで定義された状態変数を子コンポネントから変更する、みたいなことをやるときにすごく参考になりました。

- [React Context API と useContext() の使い方](https://gotohayato.com/content/523/)
- [React NativeでuseContextを使ってstateを変更する方法【React Native + Expo】]({{< relref "RN-useContext.md" >}})

## JavaScriptでのデータ整形などについて

JavaScriptを触り始めてたころはネタでも何でもなく**フィーリングでコードを書いてました**。ところが1年間個人開発をしているとやはりパフォーマンスチューニングの機会も出てくるので、その都度JS自体の仕様についても勉強していました。

連想配列や単純な配列内を探索する際にどういった方法でパフォーマンスチューニングを行うべきなのか、下記のサイトに詳しく書かれています。

- [100倍速い!? Set, Mapでパフォーマンス改善](https://nulab.com/ja/blog/nulab/100times-faster-performance-improvement-set-map/)
- [配列を高速に探索するTips](https://qiita.com/alucky0707/items/10052866719ba5c5f5d7)

JSX内での三項演算子についてはこちらが参考になりますた。

- [【React Native】 JSX内で三項演算子を使って「連続表示させないタグ」と「連続表示させるタグ」を包括する](https://qiita.com/LemonmanNo39/items/6d4e032efabee6c918d0)
- [Zenn - React Native の JSX 内で && 演算子を使ったらエラーに怒られた](https://zenn.dev/luvmini511/articles/ce1e75d285e0ce)

## 最後に

現在進行形でワイ史上初のスマホアプリのアップデートも行っています。

なのでこのページのリンクもアプリのアップデート共に増えていくと思います。乞うご期待（白目）
