---
title: "RubberduckのTips"
date: 2023-10-14T22:31:03+09:00
tags: [Rubberduck, VBA, Excel]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1697270730/tech/tech-logos/rubberduck_logo_c13b4l.webp"
---

[はじめてのアドベントカレンダー](https://qiita.com/advent-calendar/2023/first-time)17日目の記事です。

※ サムネイルはRubberduckホームページのものを引用しています。

## 追記

[Rubberduck](https://github.com/rubberduck-vba)は現在アーカイブ状態に移りました。

理由は[こちら](https://rubberduckvba.blog/2026/03/08/whats-next/)に記載のある通り、仕事としてRubberduck VBAをフルタイム開発するためであるそうです。

## この記事で伝えたいこと

前回[Rubberduck + Gitでプログラムを管理する]({{< relref "rubberduck-vba-with-git.md" >}})方法について書きましたが、他にもいくつか便利な機能があります。

## 便利な機能

`Unit Testing`や`Code Inspections`、`Refactorings`や`Navigator`などの主要な機能についての説明は以下の記事などで説明されているので省きます。

{{<blogcard url="https://qiita.com/mochimo/items/e9be36619a76e15bc898">}}
{{<blogcard url="https://qiita.com/mima_ita/items/3629006163d0a7fa6e55">}}

その他に便利な機能として主に次の二つが挙げられます。

1. Annotations
2. Peek Definitions

### Annotations

変数に対する説明や、サブルーチン・関数・クラスが担当する処理、そしてモジュール単位での説明も加えられ、なおかつ、どこからでもその説明を参照できます。

例えば次の様な、簡単なプログラムに説明を付け加えます。

```vb
Public Function DoubleValue(ByVal Value As Integer) As Integer
    DoubleValue = Value * 2
End Function
```

このプログラムに対して、`@Description`接頭辞を付け、なおかつコメントアウトすることで説明を加えられます。

```vb
'@Description("値を二倍にして返す")
Public Function DoubleValue(ByVal Value As Integer) As Integer
    DoubleValue = Value * 2
End Function
```

実際の画面では↓のように、VBEの上部に説明が表示されます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/%E8%AA%AC%E6%98%8E_rubberduck_w67gdu.webp" alt="実際の画面" caption="実際の画面">}}

### Peek Definition

変数・サブルーチン・関数・クラスなどが、どのように定義されているのかを確かめられます。デフォルトのショートカットキーは`Ctrl + Shift + D`です。

先ほどの関数を呼び出している`Main`サブルーチン内の`DoubleValue`関数上で`Ctrl + Shift + D`を押下します。すると下図のように定義した部分が示されます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rd_peekDefinition_qxajiv.webp" alt="定義の閲覧" caption="定義の閲覧">}}

## まとめ

モダンなエディタであれば自動的に変数や関数の引数の説明を行ってくれるのですが、素のVBEだとそういうことをやってくれないので結構辛い。

上記で紹介した機能は、誰が書いたかも、どういう処理なのかも分からないVBAプログラム ~~という名の古文書~~ を解読する一助になると思います。

それはそうとRubberduckはサポーターを募集しています。また、Rubberduck3の開発も進んでいます。

- https://ko-fi.com/rubberduckvba
- https://rubberduckvba.blog/

### 蛇足

ここまでVBAの話をしてきましたが、そもそも「**令和の時代にガッツリVBAプログラムを書いてアプリを作るべきかどうか**」という点についてはしっかりと検討する必要があると思っています。例えば単にExcelファイルを操作するだけなら（ほとんどの場合で）`C#`や`Node.js`のライブラリを使えば目的を達成できると思います。

Excelだから、という理由でVBAを使って作り始める前に以下の検討が必要なんじゃないかなぁ…と思います。

- 今作っているアプリを今後も使い続けるかどうか
- アプリの規模が大きい or 大きくなる予定かどうか

つまり、それなりに多くの機能やUIが必要なら、開発効率や保守効率を上げるためによりモダンな言語やフレームワークを選ぶべきだと思います。
