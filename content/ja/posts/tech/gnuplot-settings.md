---
title: 【Windows10】gnuplotでの描画設定の保存方法
tags: [gnuplot, Windows10]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1673872788/NabeBlog/gnuplot-icon_dzclx4.webp"
categories: [Tech]
date: 2020-06-02
show_date: true
toc: true
---

## 背景

Gnuplotを研究で頻繁に使うようになって、様々なコマンドの組み合わせで描画設定を変更することに慣れてきました。

しかしながら似たグラフを大量に作る際、起動時に毎回描画設定用のコマンドを打ち込むのってまあまあな手間ですよね…

Windowsで使用できるソフトウェアには通常、起動時に読み込むファイルがあります（例：Visual Stdio Codeのsettings.json）。そこで、「Gnuplotにも起動時に読み込む設定ファイルがあるのでは？」と思いついて探してみました。

## gnuplotのバージョン

- Version 5.2

## 設定ファイルの作り方と配置場所

Gnuplotが起動時に読み込むファイルは通常、`gnuplot.ini`という名前で`C:\Users\ユーザー名\AppData\Roaming`下に保存されています。

無い場合には上記のディレクトリに`gnuplot.ini`を新規作成・保存してあげると良いです。

使い方としては、gnuplotで用いられるコマンドをそのまま打ち込むだけで問題ありません。例えば、

```
set tics font "Arial, 25"
```

と打ち込み保存してgnuplotを起動。何かしらプロットすると目盛りのフォントがArialで統一されているのを確認できます。

## 最後に

本記事はWindows10のみを対象にしています。Mac、Linux系統での詳細は残念ながら分かりません。

使ってるソフトウェアとか、研究室での研究資料の引継ぎが細かく成されていれば自分がこれを調べる必要も無かったのに…(´;ω;｀)
