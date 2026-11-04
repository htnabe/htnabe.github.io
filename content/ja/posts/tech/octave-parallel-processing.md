---
title: "Octaveで並列処理を用いた実行時間削減を行う方法"
date: 2022-07-23T20:37:34+09:00
draft: false
tags: [Octave, 並列処理, parallel]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1631893765/tech/tech-logos/Gnu-octave-logo_mpu4ln.svg"
---

## 結論

Octaveで並列処理を行いプログラムの実行処理時間を短縮するためには`parallel`と呼ばれるパッケージの`pararrayfun`や`parcellfun`を使って多重for文内の処理を並列処理に変更すればよいです。

結論としては上記の通りなのですが、もう少し詳しく解説します。

## 並列処理を行うためのパッケージparallel

Octaveで他のプログラミング言語のように並列処理を行うためのツールとしてparallelというパッケージが用意されています。「並列処理ってなんのこっちゃ」っていう方は[こちら](https://qiita.com/4_mio_11/items/7f418ca661d9f5a2a39d)を読んでみると良いかもしれません。

公式のマニュアルページはあったのですが、今はなくなってます。主要な関数の一つであるpararrayfun()関数について大まかな使い方も載っています。

## 使う上での注意

使う上で幾つか注意点があり、主なものを下記にリストします。

1. Windowsでインストール中にエラーが出る
2. 引数と返り値の次元を合わせる必要がある
3. デバッグにはarrayfunを使うと便利

以下詳細。

### Windowsでインストール中にエラーが出る

`pkg install -forge parallel`でパッケージをインストールする際にデフォルトの状態だとWindowsではエラーが出ます。

詳しい内容や対処方法は下記のページを参照してください。
{{<blogcard url="https://octave.discourse.group/t/fail-of-parallel-4-0-1-installation-on-windows-10-home-and-octave-7-1-0/2533">}}

### 引数と返り値の次元を合わせる必要がある

pararrayfun()関数に渡す引数と返り値は同じ次元を持っていなければなりません。

公式ページのコードをそのまま使って解説しますが、↓のプログラムで`vector_x`と`vector_y`は1行10列の同じ次元を持つ配列です。pararrayfun（というかこの場合は`fun`）の引数と返り値の次元は一致している必要があります。

```
pkg load parallel
fun = @(x) x.^2;
vector_x = 1:10;
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1)
```

試しに引数（`vector_x`）を1行10列の配列とし、返り値（`vector_y`）を10行1列の配列とするプログラムを書いてみます。

```
pkg load parallel
fun = @(x) x.^2';
vector_x = 1:10;
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1)
```

すると次のようなエラーが帰ってきます。

```
error: cat: dimension mismatch
error: called from
    chunk_parcellfun>@<anonymous> at line 55 column 33
    chunk_parcellfun at line 55 column 15
    pararrayfun at line 73 column 28
```

### デバッグにはarrayfunを使うと便利

pararrayfunは通常の状態で使うとエラーの詳細までは表示してくれません。一応エラー詳細を出そうとすると引数の`ErrorHandler`を設定すれば見れるようですが、面倒なので私は使っていません。ErrorHandlerについては下のページを参照してください。

{{<blogcard url="https://octave.sourceforge.io/octave/function/arrayfun.html">}}

ではどうするかと言うと、`arrayfun`を使うのが手っ取り早いと思います。公式のマニュアルは[こちら](https://octave.sourceforge.io/octave/function/arrayfun.html)です。arrayfunは、単純に与えた関数と引数に対して**非**並列計算を行う関数で、ちゃんとエラーの詳細まで教えてくれます。

## 使うべき所とそうでない所

最初に述べた通り、**大体の多重for文の処理を高速化するのに向いてます**。

逆に下記の場合はそもそも実装できなかったり、並列化するのに向いていません。

- _pararrayfunの引数と返り値の次元を統一できなかったり、統一のために複雑な処理が必要な場合_
- _オーバーヘッドが大きすぎる場合_
- Octaveが得意な*配列専用の処理に書き換えた方が早い場合*

1点目は当たり前ですが、意外とこの制約のせいで並列化できない場合があります。また、並列化させようとして引数と返り値の次元を無理に統一しようとして、その結果、プログラムの可読性が著しく下がるなどの影響が出てしまう可能性が高いです。また、新たな処理を追加したことでプログラムの実行時間を思ったほど短縮できなかったりする場合もあります。

2点目については下記二つのページで説明されている通り、オーバーヘッドが大きいと低速化する場合があります。一番顕著な例ですと、pararrayfunで呼び出した関数内でさらにpararrayfunを使って多重に並列処理しようとすると低速化する場合があります。オーバーヘッドについてはそもそもマシンパワーに依存してしまう部分もありますが、pararrayfunの引数であるnprocの部分を変更するなど回避でき（ると思い）ます[^1]。

{{<blogcard url="https://www.dogrow.net/octave/blog22/">}}
{{<blogcard url="https://docs.oracle.com/cd/E19205-01/820-1209/bjael/index.html">}}

3点目について、安易に並列化するよりもOctaveやMATLABが得意とする配列を処理する演算に変換した方が処理が早い場合があります。

例として公式マニュアルに載っている並列処理のコードを少し改変したものと、配列の各要素を単純に2乗する二つのプログラムを比較してみます。下記のプログラムを`hoge.m`として保存して実行してみます。

```
pkg load parallel

fun = @(x) x.^2;
vector_x = 1:10;

tic
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1);
toc

tic
vector_y = fun(vector_x);
toc
```

私のPCでは次のような結果が出ました（何回やっても大体同じ結果でした）。

```
Elapsed time is 0.913133 seconds.
Elapsed time is 3.09944e-05 seconds.
```

今回は多重for文ではないので「絶対に配列処理の方が優れている！」と言えるわけではありませんが、このくらい単純な処理だと明らかにOctaveが得意とする配列専用の演算を用いた方が早いことが分かります（笑）

## 最後に

並列処理の使いどころやプログラムの可読性を下げないように注意しなければなりませんが、並列化はプログラムの実行時間削減に対して非常に強力です。

実際に、私が以前使っていたOctaveのプログラムは並列化と配列の演算を駆使することで実行時間が2時間 => 20分まで減りました。

[^1]: やったことが無いので推測ですが、理論上はできるはずです。しかしながらこうしたチューニングには時間がかかる可能性が高いので私は多重に並列処理を書かないようにしています。
