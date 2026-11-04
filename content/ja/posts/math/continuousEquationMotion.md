---
title: "オイラーの運動方程式とコーシーの運動方程式【初学者向け】"
tags:
  [
    連続体力学,
    固体力学,
    運動方程式,
    オイラーの第一運動法則,
    オイラーの第二運動法則,
    コーシーの運動方程式,
    平衡方程式,
  ]
categories: [Math]
mathPosts: true
toc: true
date: 2022-01-10T21:09:13+09:00
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E9%96%89%E5%B1%80%E9%9D%A2_%E8%A1%A8%E9%9D%A2%E5%8A%9B_%E7%89%A9%E4%BD%93%E5%8A%9B_gkibvd.webp"
---

## はじめに

本記事では連続体の運動方程式と角運動方程式を表す`オイラーの第一運動法則`、`オイラーの第二運動法則`について触れ、`コーシーの運動方程式`と`平衡方程式`の関係についても解説します。

なお、本記事は[前回の記事]({{< relref "stressTensor.md" >}})の内容を理解している方向けに書いています。

また、本記事ではベクトルと行列のそれぞれを明示するために行列Aの場合は$\left[A\right]$、ベクトルAの場合は$\\{A\\}$のように`[]`と`{}`を使い分けています。さらに、話を簡単にするため、体積モーメント（体積偶力）を始めから無視しています。

この記事の詳細を知りたい方はこちら↓の文献などを参照してください。

{{<amazon asin="4785310685" title="テンソル―科学技術のために">}}
{{<amazon asin="4339043400" title="連続体力学の基礎">}}

## 応力ベクトルと表面力・体積力

連続体に作用する力やそのものの運動を考えるときに表面力と物体力を考える必要があります。これらの力を簡潔に説明すると下記の通りとなります。

- 物体力：重力や電磁力が該当する、単位質量または単位体積当たりの力
- 表面力：応力が該当する、面を介して作用する単位面積当たりの力

特に表面力に着目し、この力が応力ベクトルとどのように結びつくかを示すために微小面積要素$\Delta S$を考えます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E5%BE%AE%E5%B0%8F%E9%9D%A2%E7%A9%8D%E8%A6%81%E7%B4%A0_qobxre.webp" alt="力の向き">}}

この微小面積要素$\Delta S$の法線ベクトル$\\{n\\}$が示す方向を正の方向とし、負の方向に働く力を$\Delta \\{f\\}$としたとき、表面力$\\{t\\}$は*応力ベクトル*と呼ばれ、次の通り定義されます[^1]。
\begin{equation}
\\{t\\}= \lim_{\Delta S \to 0} \frac{\Delta \\{f\\}}{\Delta S} = \frac{d\\{f\\}}{ds}
\end{equation}

## オイラーの第一運動法則

下図の様に物体力と表面力が作用する体積$V$とその内部の微小体積$dV$を考えます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E9%96%89%E5%B1%80%E9%9D%A2_%E8%A1%A8%E9%9D%A2%E5%8A%9B_%E7%89%A9%E4%BD%93%E5%8A%9B_gkibvd.webp" alt="閉局面">}}

時刻$t$におけるこの連続体の体積、速度、密度をそれぞれ$V(t), v, \rho$とします。このとき、運動量の定義からこの連続体の持つ運動量$\\{P\\}$は次の通り表せます[^1]。
\begin{equation}
\\{P\\} = \int_V \rho\\{v\\} dV
\end{equation}

この領域$V$には物体力と表面力のみが作用しており、単位質量当たりに働く物体力$\\{K\\}$を考えると、$V(t)$全体に働く物体力は次の通り表せます[^1]。
\begin{equation}
\int_V \rho\\{K\\} dV
\end{equation}

同様に表面力についても考えます。この体積$V$の表面積$S$と微小面積$\Delta S$を用いると、この体積要素全体に作用する表面力は次の通り表せます[^1]。
\begin{equation}
\int_S \\{t\\} dS
\end{equation}

式(2)、(3)、(4)より、*オイラーの第一運動法則*と呼ばれる、連続体の運動方程式は次の通り表せます[^1]。
\begin{eqnarray}
\frac{D}{Dt}\int_V \rho\\{v\\} dV = \int_V \rho\\{K\\} dV + \int_S \\{t\\} dS\nonumber\\\\\[ 5pt ]
\int_V \rho\\{a\\} dV = \int_V \rho\\{K\\} dV + \int_S \\{t\\} dS
\end{eqnarray}

## オイラーの第二運動法則

先ほどの微小体積の角運動量$\\{H\\}$は次式で表せます[^1]。なお、ここでのベクトルの乗算は外積を意味しています。
\begin{eqnarray}
\\{H\\} &=& \\{r\\}\times\\{P\\} \nonumber\\\\\[ 5pt ]
&=& \int_V \rho \\{r\\}\times\\{v\\} dV
\end{eqnarray}

これにより、式(5)を用いて連続体の角運動方程式は次式の通り表せます[^1]。
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS
\end{equation}

## コーシーの運動方程式

コーシーの運動方程式はオイラーの第一運動法則と本質的には同じです。コーシーの運動方程式の特徴として、応力テンソルが用いられているという点と微分形で表されている点が挙げられます。

まずコーシーの応力公式は応力ベクトル$\\{t\\}$と応力テンソル$\left[\sigma\right]$および法線単位ベクトル$\\{n\\}$を用いて
\begin{equation}
\\{t\\} = \left[\sigma\right]\\{n\\}
\end{equation}
の通り表せ、これにガウスの発散定理を途中で適用して変形すると、
\begin{eqnarray}
\int_S \\{t\\}dS &=& \int_S \left[\sigma\right]\\{n\\} dS \nonumber\\\\[ 5pt ]
&=& \int_S \left[\sigma\right]\\{dS\\} \nonumber\\\\[ 5pt ]
&=& \int_V \nabla\cdot\left[\sigma\right]dV
\end{eqnarray}
となります。式(9)を式(5)へ代入し変形します。
\begin{eqnarray}
\int_V \rho\\{a\\} dV &=& \int_V \\nabla\cdot\left[\sigma\right] dV + \int_V \rho \\{K\\} dV \nonumber\\\\[ 5pt ]
&=& \int_V \bigl(\nabla\cdot\left[\sigma\right] + \rho \\{K\\} \bigr)dV
\end{eqnarray}
結果として式(10)から次式のコーシーの運動方程式が得られます。
\begin{equation}
\rho\\{a\\} = \nabla\cdot\left[\sigma\right]+ \rho \\{K\\}
\end{equation}

## 平衡方程式

平衡方程式はコーシーの運動方程式から加速度の項を除いたものです。具体的には*連続体に働く力が釣り合っている状態かつモーメントがつり合っている状態*を表しています。

平衡方程式を表す方法は幾つかありますが、ここでは上述したコーシーの運動方程式から加速度の項を除いた場合を考えます。従って式は
\begin{equation}
\nabla\cdot\left[\sigma\right]+ \rho \\{K\\} = 0
\end{equation}

となります。

## さいごに

次回、応力テンソルが対称テンソルとなることと、対象テンソルで表せる前提条件について解説します。

[^1]: 中村喜代次，森教安著，連続体力学の基礎，コロナ社(2012)，pp. 96 - pp. 97．
