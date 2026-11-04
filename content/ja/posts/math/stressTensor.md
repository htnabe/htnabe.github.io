---
title: "応力テンソルとその性質"
date: 2022-01-05T22:23:56+09:00
draft: false
tags: [連続体力学, 応力テンソル]
categories: [Math]
mathPosts: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1641536373/NabeBlog/%E5%9B%9B%E9%9D%A2%E4%BD%93_jhtini.webp"
---

## はじめに

この記事では、**応力テンソルがどのようなものなのか**について解説します。ここで解説しきれない内容については以下の文献などを参照してください。

{{<amazon asin="4785310685" title="テンソル―科学技術のために">}}
{{<amazon asin="4339043400" title="連続体力学の基礎">}}

また本記事ではベクトルと行列のそれぞれを明示するために行列Aを$\left[A\right]$と表し、ベクトルAを$\\{A\\}$と表しており、行列とベクトルで`[]`と`{}`を使い分けています。

そして、本記事を読む上で次の記事の内容を理解できていることを前提としています。
{{<blogcard url="https://ezu-ken.com/fem-stress/">}}

## 応力テンソルを導入するメリット（扱う意義）

応力テンソルを導入するメリットについては下記の記事が参考になりますので、解説を譲りたいと思います。

- [テンソルの不変量の導出](https://ramenhuhu.com/math-invariant#:~:text=%E3%83%86%E3%83%B3%E3%82%BD%E3%83%AB%E3%81%AE%E5%90%84%E6%88%90%E5%88%86%E3%81%AF,%E3%81%9A%E3%80%81%E4%B8%8D%E5%A4%89%E9%87%8F%E3%81%A7%E3%81%82%E3%82%8B%E3%80%82)

結局、上の記事にある通り、座標変換を施したりしてもその物理状態を一意に示せるのがメリットですね。

## 応力テンソルの誘導

### 二つの導入方法

初めて応力テンソルを考えるとき、主に二つの方法があります。

1. 「ある微小体積に働く応力が釣り合う場合」を考える[^1]（簡単）
2. 連続体の運動方程式と角運動方程式である、オイラーの第一、第二運動法則を介して考える[^2]（ちょっと難しい）

厳密に応力テンソルについて考える場合は後者をオススメしますが、`表面力と体積力`という概念について理解する必要があります。この二つの力は抽象度が高い概念であるため、初学者にとっては少し理解しづらいものだと思います。したがって、今回は前者の場合を考えます。

### 仮定

通常、物体に力が作用するとその**物体の形状は多少なりとも変化します**。この`物体の変形`について考えるとき、変形が大きな場合には`有限変形`[^3]を考える必要がありますが、複雑な数式が多く現れるため、今のところは**微小変形のみを考えます**。

このことをより具体的に説明すると下記の通りとなります[^1]。

> 固体の変形は小さいと仮定して，内力を考察するにあたって固体内部の図形の面積，方向などの変化は小さいとして無視することにする．すなわち，物体の点は移動しないとして内力を考察することにする．

### 応力ベクトルとつり合い式

ある微小な物体の中にある微小な体積をもつ四面体OABCを考えます[^4]。この四面体には`応力ベクトル`$\\{t_{1}\\}, \\{t_{2}\\}, \\{t_{3}\\}, \\{t\\}$のみが作用しています。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1641536373/NabeBlog/%E5%9B%9B%E9%9D%A2%E4%BD%93_jhtini.webp" alt="四面体に働く応力">}}

`応力ベクトル`は**その成分に応力をもつベクトル**のことです。例として$\\{t_{1}\\}$は次式で表されます。

\begin{equation}
\\{t_{1}\\}=\begin{Bmatrix}\sigma_{xx}\\\\ \sigma_{yx}\\\\ \sigma_{zx}\end{Bmatrix}
\end{equation}

このように、応力ベクトルはその面に作用する$x, y, z$軸方向それぞれの応力を成分としてもつベクトルです。したがって、$\\{t_{2}\\}と\\{t_{3}\\}$についても同様に、

\begin{equation}
\\{t_{2}\\}=\begin{Bmatrix}\sigma_{xy}\\\\ \sigma_{yy}\\\\ \sigma_{zy}\end{Bmatrix},\quad \\{t_{3}\\}=\begin{Bmatrix}\sigma_{xz}\\\\ \sigma_{yz}\\\\ \sigma_{zz}\end{Bmatrix}
\end{equation}

と表すことができます。ここで$\triangle{ABC}, \triangle{BOC}, \triangle{AOC},  \triangle{ABO}$のそれぞれの面積を$\mathrm{d}\mathit{S}, \mathrm{d}\mathit{S_\mathrm{1}}, \mathrm{d}\mathit{S_\mathrm{2}}, \mathrm{d}\mathit{S}_{\mathrm{3}}$とおくと、`力=応力×面積`より、この四面体に働く力のつり合い式は

\begin{equation}
\\{t\\}\mathrm{d}\mathit{S} - \\{t_1\\}\mathrm{d}\mathit{S_\mathrm{1}} - \\{t_2\\}\mathrm{d}\mathit{S_\mathrm{2}} - \\{t_3\\}\mathrm{d}\mathit{S_\mathrm{3}}\mathrm= 0
\end{equation}

となります[^5]。式(3)では、$\\{t_1\\}, \\{t_2\\}, \\{t_3\\}$は$x, y, z$軸方向の負の方向を向いているため`マイナス（-）`が付いています。さらに、$\triangle{ABC}$の面の単位法線ベクトルを$\\{n\\} (=\\{n_x, n_y, n_z\\}^{\mathrm{ T }})$として表すことで、各面の面積の関係を、

\begin{equation}
\begin{Bmatrix}
\mathrm{d}\mathit{S_\mathrm{1}}\\\\ \mathrm{d}\mathit{S_\mathrm{2}}\\\\ \mathrm{d}\mathit{S_\mathrm{3}}
\end{Bmatrix} = \begin{Bmatrix}
n_x\\\\ n_y\\\\ n_z
\end{Bmatrix} \mathrm{d}\mathit{S}
\end{equation}

と表すことができます。この式を式(3)に当てはめることで、

\begin{equation}
\\{t\\} - \\{t_\mathrm1\\}\mathit{n_x} - \\{t_\mathrm2\\}\mathit{n_y} - \\{t_\mathrm3\\}\mathit{n_z}\mathrm= 0
\end{equation}

となり、最終的に次の様にまとめることができます。

\begin{eqnarray}
\\{t\\} &=& \begin{bmatrix}
\\{t_1\\}& \\{t_2\\}& \\{t_3\\}
\end{bmatrix} \begin{Bmatrix}
n_x\\\\ n_y\\\\ n_z
\end{Bmatrix} \nonumber\\\\\[ 5pt ]
\\{t\\} &=& \begin{bmatrix}
\sigma_{xx}& \sigma_{xy}& \sigma_{xz}\\\\\
\sigma_{yx}& \sigma_{yy}& \sigma_{yz}\\\\\
\sigma_{zx}& \sigma_{zy}& \sigma_{zz}
\end{bmatrix} \begin{Bmatrix}
n_x\\\\ n_y\\\\ n_z
\end{Bmatrix}
\end{eqnarray}

この式(6)の行列部分を応力テンソルと呼び、記号$\left[\sigma\right]$で表します。

## 座標回転後の応力テンソル

座標回転後の応力テンソルの例として、数ある中から恐らく~~最も~~分かり易い**平面ひずみ状態での座標の回転と応力テンソルの値の変化**に着目してみます。

### 座標回転の前後の応力テンソルの関係

座標回転を行う前と後の応力テンソルがどのような関係で結ばれるかを確かめます。

まず下図のように、先ほど応力テンソルを考えるときに使った応力ベクトル$\\{t\\}$と単位法線ベクトル$\\{n\\}$を用います。下図左では先ほどの式(6)が成り立っています。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1641547559/NabeBlog/%E5%9B%9E%E8%BB%A2%E3%81%A8%E5%BF%9C%E5%8A%9B%E3%83%86%E3%83%B3%E3%82%BD%E3%83%AB_myxrli.webp" alt="rotation_and_stress_tensor">}}

左側の座標系が回転行列$\left[P\right]$によって右側の座標系に変換された場合を考えます。この座標系での応力ベクトルと応力テンソルおよび単位法線ベクトルの関係は次式で表せるものとします。

\begin{equation}
\\{t'\\} = \left[\sigma'\right]\\{n'\\}
\end{equation}

一方、回転前後の応力ベクトルと単位単位法線の関係は次式で表せます。

\begin{equation}
\\{t'\\} = \left[P\right]\\{t\\}, \quad \\{n'\\} = \left[P\right]\\{n\\}
\end{equation}

式(7)と式(8)より、

\begin{equation}
\left[P\right]\\{t\\} = \left[\sigma'\right]\left[P\right]\\{n\\}
\end{equation}

となり、下準備が整いました。続いて、式(6)の両辺に左から回転行列$\left[P\right]$を作用させると、

\begin{equation}
\left[P\right]\\{t\\} = \left[P\right]\left[\sigma\right]\\{n\\}
\end{equation}

となり、式(9)と式(10)の右辺同士が等しいということが分かります。従って、

\begin{eqnarray}
\left[\sigma'\right]\left[P\right]\\{n\\} &=& \left[P\right]\left[\sigma\right]\\{n\\} \nonumber\\\\\[ 5pt ]
\left[\sigma'\right]\left[P\right] &=& \left[P\right]\left[\sigma\right] \nonumber\\\\\[ 5pt ]
\left[\sigma'\right] &=& \left[P\right]\left[\sigma\right]\left[P\right]^{\mathrm{ T }}
\end{eqnarray}

となり、座標の回転前後での応力テンソルの関係を導くことができました。

### 平面ひずみ状態での応力テンソル

`平面ひずみ状態`の厳密な定義は下記の機械学会の公式サイトに記載されています。

- [日本機械学会 機械工学事典 平面ひずみ状態](https://www.jsme.or.jp/jsme-medwiki/07:1011772)

平面ひずみ状態とは名前の通りひずみが平面的であることを示しています。$x, y, z$座標系で考えたとき、ある軸方向（例えば$z$軸方向）のひずみが0である状態を指しています。また、平面ひずみ状態である物体には次のような形状と外力の条件が存在します。

1. 厚さと幅に対して長さが著しく大きい物体
2. （例えば）$z$軸方向に変化しない外力が働く

今、$z$軸方向のひずみが0である状態を考えると、平面ひずみ状態での応力テンソルは単純に$z$軸方向成分を0としたものとして表せるので、

\begin{equation}
\left[\sigma\right] =
\begin{bmatrix}
\sigma_{xx}& \sigma_{xy}& 0\\\\\
\sigma_{yx}& \sigma_{yy}& 0\\\\\
0& 0& 0
\end{bmatrix}
\end{equation}

となります。

### 座標変換後の応力テンソルの各成分

実際に$z$軸周りに$+\theta$だけ回転した座標系における応力テンソルを求めます。この場合の回転行列$\left[P\right]$は、

\begin{equation}
\left[P\right] = \begin{bmatrix}
\cos{\theta}& \sin{\theta}& 0\\\\\
-\sin{\theta}& \cos{\theta}& 0\\\\\
0& 0& 1
\end{bmatrix}
\end{equation}

です。したがって式(11)と式(12)より、

\begin{eqnarray}
\left[\sigma'\right] &=& \begin{bmatrix}
\cos{\theta}& \sin{\theta}& 0\\\\\
-\sin{\theta}& \cos{\theta}& 0\\\\\
0& 0& 1
\end{bmatrix}\begin{bmatrix}
\sigma_{xx}& \sigma_{xy}& 0\\\\\
\sigma_{yx}& \sigma_{yy}& 0\\\\\
0& 0& 0
\end{bmatrix}\begin{bmatrix}
\cos{\theta}& -\sin{\theta}& 0\\\\\
\sin{\theta}& \cos{\theta}& 0\\\\\
0& 0& 1
\end{bmatrix} \nonumber\\\\\[ 5pt ]
&=& \begin{bmatrix}
\sigma_{xx}\cos{\theta}+\sigma_{xy}\sin_{\theta} & \sigma_{xy}\cos{\theta}+\sigma_{yy}\sin{\theta} & 0 \\\\
-\sigma_{xx}\sin{\theta}+\sigma_{xy}\cos_{\theta} & -\sigma_{xy}\sin{\theta}+\sigma_{yy}\cos{\theta} & 0 \\\\
0 & 0 & 0
\end{bmatrix} \begin{bmatrix}
\cos{\theta}& -\sin{\theta}& 0\\\\\
\sin{\theta}& \cos{\theta}& 0\\\\\
0& 0& 1
\end{bmatrix}\nonumber\\\\\[ 5pt ]
&=& \begin{bmatrix}
\sigma_{xx}\cos^2{\theta} + \sigma_{xy}\sin{2\theta}+\sigma_{yy}\sin^2{\theta}&
-\frac{1}{2}\sigma_{xx}\sin{2\theta} + \sigma_{xy}\cos{2\theta}+\frac{1}{2}\sigma_{yy}\sin{2\theta}& 0\\\\\
-\frac{1}{2}\sigma_{xx}\sin{2\theta} + \sigma_{xy}\cos{2\theta}+\frac{1}{2}\sigma_{yy}\sin{2\theta}&
\sigma_{xx}\sin^2{\theta} - \sigma_{xy}\sin{2\theta}+\sigma_{yy}\cos^2{\theta}& 0\\\\\
0& 0& 0
\end{bmatrix}
\end{eqnarray}

となりました。式(14)からも、回転後の応力テンソルの$z$軸方向の成分が全て0のままとなっており、平面ひずみ状態の応力を示していることが分かります。

## 最後に

応力テンソルに限らず、工学分野のテンソルの勉強をする際には、テンソル特有の演算や縮約記号、ラグランジュ座標系・オイラー座標系など、初学者にとって幾つかの大きな壁があると思います。独学の場合、多くのテキストでは重要な式変形が省略されていたり、抽象的な説明に専念するばかり、その概念の物理的な意味を省略してしまう傾向があるように感じています。

抽象的な概念をなるべく除いた、初学者に優しいテキストが（私の知る範囲で）多くない中で、こうして学んだことを学びやすいように咀嚼し、アウトプットする活動も大切だと考えて記事にしてみました。参考になると幸いです。

[^1]: 石原繁著，テンソル ―科学技術のために―，裳華房(2011)，pp. 106 - pp. 107．

[^2]: 中村喜代次，森教安著，連続体力学の基礎，コロナ社(2012)，pp. 96 - pp. 97．

[^3]: 詳しくは[こちら](https://www.jsme.or.jp/jsme-medwiki/07:1012904)を参照してください。

[^4]: 応力を考える場合、任意の閉じられた面に働いていればどのような面でも良いです。今回、単に考えやすいという理由で四面体（という閉じられた面）に応力が働いている場合を考えています。立方六面体に応力が作用する場合などでも問題ありません。

[^5]: 本来はオイラーの第一運動法則から求まる式ですが、今回は直観的な理解を助けるために物体力と運動量の項を無視しています。
