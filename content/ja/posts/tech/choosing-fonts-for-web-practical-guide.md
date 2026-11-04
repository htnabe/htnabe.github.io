---
title: "Webアプリのフォントの実践的な選定"
date: 2026-02-22T10:00:00+09:00
draft: false
toc: true
show_thumb_post: false
tags: [typography, css, webfonts]
categories: [Tech]
thumbnail: ""
---

フォント設定はWebデザインにおいて可読性・雰囲気・ユーザーの信頼感に大きく影響するのですが、意外に見落とされがちな技術要素でもあるかと思います。今回、システムフォントからGoogle Fontsまで、Webサイトのフォントを選ぶときのポイントを備忘録的に記載しておこうと思います。

## システムフォント: コストゼロの選択肢

システムフォントは、各OSにあらかじめインストールされているフォントです（例外あるかもですが）。これを使うと次のようなメリットがあります。

- フォント取得のためのネットワークリクエストが不要になり、ページ表示が早くなる
- フォント読み込みによるレイアウトシフト防止

代表的なシステムフォントスタックは次の通りです。

```css
font-family:
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  /* macOS / iOS */ "Yu Gothic UI",
  "Yu Gothic",
  "Meiryo",
  /* Windows */ "Noto Sans CJK JP",
  /* Linux / Android */ system-ui,
  -apple-system,
  sans-serif;
```

一方で、デザイン上の個性を出しにくいという問題点もあります。

## Google Fonts: 豊富な選択肢と簡単な導入

Google Fontsには1,500以上の無料フォントファミリーがあります。次のように`<head>`に`<link>`タグを追加するだけで利用できます。

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="preload stylesheet"
  as="style"
/>
```

`display=swap`を付けることで、Webフォントの読み込み中もテキストを非表示にせず、読み込み完了まではシステムフォントで表示できます。

**メリット:**

- フォントの選択肢が非常に多い
- CDN配信で比較的高いパフォーマンス

## 多言語サイトでの考慮点

和文と欧文の両方を扱うサイトでは、両方の文字体系に十分対応したフォントを選ぶ必要があります。

{{< table "table" >}}

| 用途                  | 推奨フォント      | 補足                                       |
| --------------------- | ----------------- | ------------------------------------------ |
| 本文（ラテン文字）    | Noto Sans         | クセが少なく読みやすい                     |
| 本文（日本語）        | Noto Sans JP      | Noto Sansと見た目の相性が良い              |
| 見出し / ディスプレイ | Orbitron, Raleway | ラテン文字向けかつスタイリッシュなデザイン |
{{</table>}}

Noto Sans JPは、1つのフォントファイルでラテン文字と日本語グリフの両方をカバーできるため、レンダリングの挙動を把握しやすく、実運用でも扱いやすい選択肢です。

## パフォーマンス最適化のポイント

### ウェイト数を絞る

指定するウェイトごとに読み込みが増えます。本当に使う太さだけをリクエストしましょう。

```
family=Noto+Sans+JP:wght@400;700
```

100〜900をすべて読み込むのではなく、実際に利用するウェイトだけに限定するのが基本です。

### Preconnectを設定する

Google Fontsのサーバーへ早めに接続を張るため、`preconnect`ヒントを追加します。

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## CSS `font-feature-settings` プロパティ

日本語テキストでは、`font-feature-settings: "palt"`を指定すると、句読点まわりの字間が自然になり、読みやすさが改善することがあります（欧文では逆に字間が広がりすぎるかもなので注意）。

```css
body {
  font-feature-settings: "palt";
  letter-spacing: 0.05em;
}
```

小さな調整ですが、日本語コンテンツの読み心地に明確な差が出ることがあります。

## フォールバック戦略

必ず最後に汎用ファミリー（`sans-serif`、`serif`、`monospace`）で終わるようにします。指定フォントが使えない場合でも、ブラウザがOS標準フォントへ安全にフォールバックできます。

```css
font-family:
  "Noto Sans JP",
  /* preferred */ "Hiragino Sans",
  /* macOS fallback */ "Yu Gothic UI",
  /* Windows fallback */ sans-serif; /* last resort */
```

## まとめ

- パフォーマンス最優先で個性が不要なら、**システムフォント**が有力
- 表示の一貫性を重視し、多少のネットワーク負荷を許容できるなら、**Google Fonts**（例: Noto Sans JP）が有効
- フォント指定では、必ず**フォールバックチェーン**を定義し、最後は汎用ファミリーで締める
- 日本語可読性の改善には、`font-feature-settings: "palt"`と`letter-spacing`の併用が効果的

フォント選定は、見た目・パフォーマンス・アクセシビリティのバランスが意外と重要で奥が深いです。色々試して設定してみるのがおすすめですが、まずは自分 or 自分たちが「イケてる」と思うデザインを設定するのがよいと思います。small startしつつ、パフォーマンスまで徐々に考えられると良いかもしれません。
