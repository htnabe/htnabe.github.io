---
title: "応力テンソルが非対称となる場合"
date: 2022-03-04T15:47:10+09:00
tags: [連続体力学, 固体力学, 応力テンソル, 運動方程式, オイラーの運動方程式]
categories: [Math]
mathPosts: true
draft: false
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1647689517/NabeBlog/bodyMoment_zyv4bu.webp"
---

## 始めに（スキップ可）

前回、前々回と[応力テンソルとその性質]({{< relref "stressTensor.md" >}})および[オイラーの運動方程式とコーシーの運動方程式]({{< relref "continuousEquationMotion.md" >}})の二つの概念ついて説明しました。

ここまでくると、特殊な場合を除いて応力テンソルが対称テンソルとなることを紹介すると思うのですが、往々にして対称テンソルとならない条件についての解説は省かれます。ここで大抵の方は「**対称テンソルとならない場合があるのか…？**」という疑問を持つと思います。

本記事では、応力テンソルが非対称となるある場合について解説します。なお、この記事を読むにあたって次の4点に注意してください。

1. 微小変形を仮定しています。
2. 応力テンソルとオイラーの運動方程式の定義を理解している方向けに記事を書いています。
3. 本記事では、ベクトルと行列のそれぞれを明示するため、行列Aを$\left[A\right]$と表し、ベクトルAを$\\{A\\}$と表しており、`[]`と`{}`を使い分けています。
4. 初学者向けに書いているので縮約記号を用いていません（縮約記号を使った方が式が短くなりますが...）。

本記事の詳細について、不明瞭な部分などは以下の書籍を参照してください。

{{<amazon asin="4785310685" title="テンソル―科学技術のために">}}
{{<amazon asin="4339043400" title="連続体力学の基礎">}}

## 体積モーメントの導入

ある物体に無視できない大きさの体積モーメントが作用している場合、応力テンソルは非対称となります。

体積モーメントの定義は下記の通りです[^1]。

> 電場内で誘電体が影響を受ける場合，または磁場内で磁性体が影響を受ける場合などでは，固体の各部分がモーメントを受けることがあり，このような場合に単位体積当たりに働くモーメントはベクトル量で，これを体積モーメントといい，これを記号Mで表す．

体積モーメントを生じる力を体積偶力（body moment）として紹介している書籍もあります[^2]。これをより具体的に考えると下の図のような状態と言えます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1647689517/NabeBlog/bodyMoment_zyv4bu.webp" alt="body_moment_image">}}

つまり、応力（表面力）や重力などの体積力とは別に何らかの体積力が偶力として作用している状態を示しています。

### 具体的な計算

まず、[この記事]({{< relref "continuousEquationMotion.md" >}})で示したオイラーの第二運動法則（つまり連続体の角運動方程式）からスタートします。
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS
\end{equation}
この式では連続体の密度、体積、速度、連続体に作用する応力ベクトル、単位質量当たりに働く物体力をそれぞれ$\rho, V(t), v, \\{t\\}, \\{K\\}$としています。

ここに、先ほどの定義に則って体積モーメント$\\{M\\}$を導入します。すると式(1)は次式となります。
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS + \int_V \\{M\\} dV
\end{equation}

式(2)について法線単位ベクトル$\\{n\\}$と$\\{t\\}=[\sigma]\\{n\\}$の関係を用いて式変形します[^3]。
\begin{eqnarray}
\int_V \rho\\{r\\}\times\\{a\\} dV &=& \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times[\sigma]\\{n\\} dS + \int_V \\{M\\} dV
\end{eqnarray}

ここで、右辺第二項を抜き出して式変形します。なお、$\\{r\\}=\\{x, y, z\\}^T$、$\\{n\\}=\\{n_1, n_2, n_3\\}^T$としています。
\begin{eqnarray}
\\{r\\}\times[\sigma]\\{n\\} &=&
\begin{Bmatrix}
x \\\\
y \\\\
z
\end{Bmatrix}
\times\
\begin{bmatrix}
\sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\\\
\sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\\\
\sigma_{zx} & \sigma_{zy} & \sigma_{zz}
\end{bmatrix}
\begin{Bmatrix}
n_1 \\\\
n_2 \\\\
n_3
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\begin{Bmatrix}
x \\\\
y \\\\
z
\end{Bmatrix}
\times
\begin{bmatrix}
\sigma_{xx}n_1 + \sigma_{xy}n_2 + \sigma_{xz}n_3\\\\
\sigma_{yx}n_1 + \sigma_{yy}n_2 + \sigma_{yz}n_3\\\\
\sigma_{zx}n_1 + \sigma_{zy}n_2 + \sigma_{zz}n_3
\end{bmatrix}\nonumber\\\\\[ 5pt ]
&=&
\begin{vmatrix}
\\{e_1\\} & \\{e_2\\} & \\{e_3\\} \\\\
x & y & z \\\\
\sigma_{xx}n_1 + \sigma_{xy}n_2 + \sigma_{xz}n_3 & \sigma_{yx}n_1 + \sigma_{yy}n_2 + \sigma_{yz}n_3 & \sigma_{zx}n_1 + \sigma_{zy}n_2 + \sigma_{zz}n_3
\end{vmatrix}\nonumber\\\\\[ 5pt ]
&=&
\begin{Bmatrix}
y(\sigma_{zx}n_1 + \sigma_{zy}n_2 + \sigma_{zz}n_3) - z(\sigma_{yx}n_1 + \sigma_{yy}n_2 + \sigma_{yz}n_3)\\\\
z(\sigma_{xx}n_1 + \sigma_{xy}n_2 + \sigma_{xz}n_3) - x(\sigma_{zx}n_1 + \sigma_{zy}n_2 + \sigma_{zz}n_3)\\\\
x(\sigma_{yx}n_1 + \sigma_{yy}n_2 + \sigma_{yz}n_3)-y(\sigma_{xx}n_1 + \sigma_{xy}n_2 + \sigma_{xz}n_3)
\end{Bmatrix}\nonumber\\\\\[ 5pt ]
&=&
\begin{Bmatrix}
(\sigma_{zx}y-\sigma_{yx} z)n_1 + (\sigma_{zy}y-\sigma_{yy}z)n_2 + (\sigma_{zz}y-\sigma_{yz}z)z\\\\
(\sigma_{xx}z - \sigma_{zx}x)n_1+(\sigma_{xy}z -\sigma_{zy} x)n_2+(\sigma_{xz}z -\sigma_{zz} x)n_3\\\\
(\sigma_{yx}x-\sigma_{xx}y)n_1+(\sigma_{yy}x-\sigma_{xy}y)n_2+(\sigma_{yz}x-\sigma_{xz}y)n_3
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\begin{bmatrix}
\sigma_{zx}y-\sigma_{yx} z &
\sigma_{zy}y-\sigma_{yy}z &
\sigma_{zz}y-\sigma_{yz}z \\\\
\sigma_{xx}z - \sigma_{zx}x &
\sigma_{xy}z -\sigma_{zy} x &
\sigma_{xz}z -\sigma_{zz} x \\\\
\sigma_{yx}x-\sigma_{xx}y &
\sigma_{yy}x-\sigma_{xy}y &
\sigma_{yz}x-\sigma_{xz}y
\end{bmatrix}
\begin{Bmatrix}
n_1 \\\\
n_2 \\\\
n_3
\end{Bmatrix}\nonumber\\\\\[ 5pt ]
&=& [D]\\{n\\}
\end{eqnarray}

これにより、式(3)は次の通り変形できます。
\begin{eqnarray}
\int_V \rho\\{r\\}\times\\{a\\} dV
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times[\sigma]\\{n\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S [D]\\{n\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=& \int_V \rho\\{r\\}\times\\{K\\} dV + \int_V \nabla\cdot[D] dV + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=& \int_V \Big[\rho\\{r\\}\times\\{K\\} +\nabla\cdot[D]+ \\{M\\} \Big]dV
\end{eqnarray}

上の式は任意の領域で成り立つので次の式が成り立ちます。
\begin{equation}
\rho\\{r\\}\times\\{a\\} = \rho\\{r\\}\times\\{K\\} +\nabla\cdot[D] + \\{M\\}
\end{equation}

ここで厄介なのが$\nabla\cdot[D]$の項です。**この部分の計算には二階のテンソル場の発散の計算方法を理解している必要があります**。しかし、本記事はあくまでも初学者向けのものなので、テンソル場の発散の計算方法には触れず、「計算するとこうなるよ」という説明で収めたいと思います[^4]。
\begin{eqnarray}
\nabla\cdot[D] &=&
\begin{Bmatrix}
\displaystyle\frac{\partial}{\partial x} \\\\
\displaystyle\frac{\partial}{\partial y} \\\\
\displaystyle\frac{\partial}{\partial z}
\end{Bmatrix}
\cdot
\begin{bmatrix}
\sigma_{zx}y-\sigma_{yx} z &
\sigma_{zy}y-\sigma_{yy}z &
\sigma_{zz}y-\sigma_{yz}z \\\\
\sigma_{xx}z - \sigma_{zx}x &
\sigma_{xy}z -\sigma_{zy} x &
\sigma_{xz}z -\sigma_{zz} x \\\\
\sigma_{yx}x-\sigma_{xx}y &
\sigma_{yy}x-\sigma_{xy}y &
\sigma_{yz}x-\sigma_{xz}y
\end{bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\begin{Bmatrix}
\displaystyle\frac{\partial (\sigma_{zx}y-\sigma_{yx} z)}{\partial x} +
\displaystyle\frac{\partial (\sigma_{zy}y-\sigma_{yy}z )}{\partial y} +
\displaystyle\frac{\partial (\sigma_{zz}y-\sigma_{yz}z)}{\partial z} \\\\
\displaystyle\frac{\partial (\sigma_{xx}z - \sigma_{zx}x)}{\partial x} +
\displaystyle\frac{\partial (\sigma_{xy}z -\sigma_{zy} x )}{\partial y} +
\displaystyle\frac{\partial (\sigma_{xz}z -\sigma_{zz} x)}{\partial z} \\\\
\displaystyle\frac{\partial (\sigma_{yx}x-\sigma_{xx}y)}{\partial x} +
\displaystyle\frac{\partial (\sigma_{yy}x-\sigma_{xy}y)}{\partial y} +
\displaystyle\frac{\partial (\sigma_{yz}x-\sigma_{xz}y)}{\partial z}
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\begin{Bmatrix}
y(\displaystyle\frac{\sigma_{zx}}{\partial x}+\displaystyle\frac{\sigma_{zy}}{\partial y}+\displaystyle\frac{\sigma_{zz}}{\partial z}) -
z(\displaystyle\frac{\sigma_{yx}}{\partial x}+\displaystyle\frac{\sigma_{yy}}{\partial y}+\displaystyle\frac{\sigma_{yz}}{\partial z})\\\\
z(\displaystyle\frac{\sigma_{xx}}{\partial x}+\displaystyle\frac{\sigma_{xy}}{\partial y}+\displaystyle\frac{\sigma_{xz}}{\partial z}) -
x(\displaystyle\frac{\sigma_{zx}}{\partial x}+\displaystyle\frac{\sigma_{zy}}{\partial y}+\displaystyle\frac{\sigma_{zz}}{\partial z})\\\\
x(\displaystyle\frac{\sigma_{yx}}{\partial x}+\displaystyle\frac{\sigma_{yy}}{\partial y}+\displaystyle\frac{\sigma_{yz}}{\partial z}) -
y(\displaystyle\frac{\sigma_{xx}}{\partial x}+\displaystyle\frac{\sigma_{xy}}{\partial y}+\displaystyle\frac{\sigma_{xz}}{\partial z})
\end{Bmatrix}+
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\begin{vmatrix}
\\{e_1\\} & \\{e_2\\} & \\{e_3\\} \\\\
x & y & z \\\\
\displaystyle\frac{\sigma_{xx}}{\partial x}+\displaystyle\frac{\sigma_{xy}}{\partial y}+\displaystyle\frac{\sigma_{xz}}{\partial z}&
\displaystyle\frac{\sigma_{yx}}{\partial x}+\displaystyle\frac{\sigma_{yy}}{\partial y}+\displaystyle\frac{\sigma_{yz}}{\partial z}&
\displaystyle\frac{\sigma_{zx}}{\partial x}+\displaystyle\frac{\sigma_{zy}}{\partial y}+\displaystyle\frac{\sigma_{zz}}{\partial z}
\end{vmatrix}+
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\\{r\\}\times
\begin{Bmatrix}
\displaystyle\frac{\sigma_{xx}}{\partial x}+\displaystyle\frac{\sigma_{xy}}{\partial y}+\displaystyle\frac{\sigma_{xz}}{\partial z} \\\\
\displaystyle\frac{\sigma_{yx}}{\partial x}+\displaystyle\frac{\sigma_{yy}}{\partial y}+\displaystyle\frac{\sigma_{yz}}{\partial z} \\\\
\displaystyle\frac{\sigma_{zx}}{\partial x}+\displaystyle\frac{\sigma_{zy}}{\partial y}+\displaystyle\frac{\sigma_{zz}}{\partial z}
\end{Bmatrix}+
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}
\nonumber\\\\\[ 5pt ]
&=&
\\{r\\}\times(\nabla\cdot[\sigma])+
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}
\end{eqnarray}

式(7)から、式(6)は次の通り変形できます。
\begin{equation}
\\{r\\}\times(\rho\\{a\\} - \rho\\{K\\} - \nabla\cdot[\sigma]) =
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}+
\\{M\\}
\end{equation}

これに対し、[こちら]({{< relref "continuousEquationMotion.md" >}})で用いたコーシーの運動方程式を用いて変形すると左辺が0となるため、次式が得られます。
\begin{eqnarray}
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}+
\\{M\\} &=& 0
\nonumber\\\\\[ 5pt ]
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}+
\begin{Bmatrix}
M_x \\\\
M_y \\\\
M_z
\end{Bmatrix}
&=& 0
\end{eqnarray}

ここから分かる通り、せん断応力成分が等しくならないため、応力テンソルは対称になりません。

## 最後に

教科書等であればほんの1ページ弱で説明が終わってしまうような内容ですが、縮約記号を用いずに示そうと思うとこんなに長くなってしまいます。縮約記号ってホントに優秀ですね。

ところで応力テンソルが非対称になる場合っていうのは他にどういった条件で生じるのでしょうか…また時間があるときに具体例を探したておこうかな…（詳しい方がいれば教えてください）

[^1]: 石原繁著，テンソル ―科学技術のために―，裳華房(2011)，pp. 110.

[^2]: 中村喜代次，森教安著，連続体力学の基礎，コロナ社(2012)，pp. 104 - pp. 105．

[^3]: この関係は[この記事]({{< relref "continuousEquationMotion.md" >}})で説明した通りです。

[^4]: 具体的な演算方法については参考文献などを参照してください。
