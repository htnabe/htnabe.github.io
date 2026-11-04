---
title: "RubberduckでVBAプログラムをGit管理する"
date: 2023-10-14T13:24:53+09:00
draft: false
tags: [Rubberduck, VBA, Excel]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1697270730/tech/tech-logos/rubberduck_logo_c13b4l.webp"
---

サムネイルはRubberduckのホームページのものを引用しています。

## 追記

[Rubberduck](https://github.com/rubberduck-vba)は現在アーカイブ状態に移りました。

理由は[こちら](https://rubberduckvba.blog/2026/03/08/whats-next/)に記載のある通り、仕事としてRubberduck VBAをフルタイム開発するためであるそうです。

> take Rubberduck to the next level by finally working full-time on it,

## この記事で伝えたいこと & この記事で言っていないこと

- 伝えたいこと
  - Rubberduckを使うことで比較的簡単にVBAプログラムのバージョン管理を行えます
- 言っていないこと
  - 全てのVBAプログラマにとって、そしてあらゆる案件でRubberduckを使うことが最善手です
  - VBAとVBEは令和の時代でも十分使えます

## そもそもRubberduckで何ができるのか

この辺りの内容は色々な方がまとめているので省略します。

{{<blogcard url="https://qiita.com/mochimo/items/e9be36619a76e15bc898">}}
{{<blogcard url="https://qiita.com/mima_ita/items/3629006163d0a7fa6e55">}}

## Gitで管理する具体的な方法

次のように、エクセルファイルとVBAプログラムの格納先のフォルダ（`src`）を用意してみます。

```plaintext
 /root
  ┣ hoge.xlsm
  ┗ /src
```

`hoge.xlsm`を開いて、`rubberduck`のタブから`Export Active Project`を選択します。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_export_code1_i1abph.webp" alt="タブ選択" caption="タブ選択">}}

続いて現れるフォルダ選択ウィンドウで、先ほど用意した`src`フォルダを選択します。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_export_code2_xyvzkm.webp" alt="フォルダ選択" caption="フォルダ選択">}}

これだけで、`src`フォルダにはモジュール名に対応した`Module1.bas`が出力されます[^1]。また、例えばVSCodeでも次のように開けます。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_open_from_vscode_avgbkb.webp" alt="VSCodeで開いてみる" caption="VSCodeで開いてみる">}}

Gitを使い慣れている方はもうお分かりだと思うのですが、ここで出力されたファイルがVBAのソースファイルなので、後は ~~焼くなり煮るなり~~ `git tag`コマンドで、適当なタイミングでプログラムのバージョン管理を行える、という訳ですね。

また、例えば次のような流れでVBA側のコードを変更することも可能です。

1. VSCode側で`bas`ファイルを編集
2. VBE側で変更後のファイルをインポート（というより同期）する

具体的に、以下の様にVSCode側でプログラムを編集します。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_vscode_edit_exmp_vrbxxi.webp" alt="VSCodeで編集" caption="VSCodeで編集">}}

具体的には以下の部分を追加しました。

```C#
    Dim helloWorld As String: helloWorld = "hello, World!"
    Debug.Print helloWorld
```

その後、VBE側で`Rubberduck`の専用機能である、`Code Explorer`のタブで`Sync Project` -> `Update Components from files...`を選択します。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_sync_huwczn.webp" alt="同期ボタン押下" caption="同期ボタン押下">}}

ファイルの選択ウィンドウが現れるので、同期させたいファイルを選択します（もちろん複数選択も可能です）。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_select_file_jaaxam.webp" alt="ファイル選択" caption="ファイル選択">}}

最終的にVBE側で`Module1`モジュールを開いてみると、次の様に変更箇所がアップデートされていることが分かります。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_result_f80jpa.webp" alt="しゅごい…" caption="しゅごい…">}}

### 上記ができることで嬉しいこと

単にバージョン管理を簡単化するだけでなく、他にも以下のようなメリットがあると思います。

- 複数人で異なるVBAプログラムをGit管理していても変更箇所だけをアップデート可能
- 別のプロジェクトで使われている機能をモジュール単位などで追加したり管理することが可能

### 面倒な所

- Git側で管理した変更点が自動的に反映されない
- 変更してから必ず Export -> add & commit & push -> （変更反映する際は） -> Sync Project の手続きが必須

## Dim まとめ As 蛇足

VBAとVBEは、お世辞にも令和の時代に人に勧められるものではないですが、残念ながら未だに様々な場面で使われています。保守・管理の面からしてもこれらを扱うのはハイパーしんどいですが、

- 少しでもモダンな技術で管理しやすくする
- 別の言語・フレームワークへ移行するまでの機能の検証

などのためにRubberduckを導入しない理由はあまり無いように思います。

また、以下の理由からRubberduckが古の ~~クソ of クソ~~ システムにとっての救世主になるのではないかと思います。

- ある程度洗練された機能
- インストールに管理者権限を必要とせず、比較的どのような環境でも動く
- (英語ではあるが)ドキュメントが豊富
- 開発が活発で、長期的な開発も予定されている[^2]

もちろん、Rubberduck VBAが完璧かと言えばそうではなく、**使わない場合と比べて動作がもっさりしていたり、規模の大きなプログラムのロードが遅かったり、複数のエクセルファイルを操作中にExcelが落ちやすくなったりします。**

それでも**VBA, VBEが酷すぎて、ないよりはマシやなぁと思うことの方が多いのが現状です。**

また、個人的にはRubberduckがVBAプログラム開発のデファクトスタンダードになってほしいな～と思って金銭的な支援もしました。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rb_opened_box_sm_setiwq.webp" alt="カナダから数か月で届いた" caption="カナダから数か月で届いた">}}
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/all_items_sm_tkvseb.webp" alt="アヒルちゃそｶﾜｲｲﾔｯﾀｰ!" caption="アヒルちゃそｶﾜｲｲﾔｯﾀｰ!">}}

[^1]: 今回は一つのモジュールしか扱っていませんが、複数のサブルーチンなどがあっても同様に出力されます。クラスファイルや各シート毎に定義された関数などもあれば出力されます。

[^2]: 特に`.NET7`フレームワークを使ったRubberduck専用のEditorが実装される予定という[ポスト](https://rubberduckvba.blog/2023/10/04/rd3-update-october-2023/)などもあり、更に使いやすく、なおかつ長期的に開発が進むようです。
