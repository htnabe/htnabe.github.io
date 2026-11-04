---
title: "円柱座標系での連続体の運動方程式"
date: 2022-05-02T17:27:16+09:00
tags: [連続体力学, 固体力学, 円柱座標系, 座標変換]
categories: [Math]
mathPosts: true
toc: true
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1651825554/NabeBlog/equilibrium_body_yiomer.webp"
---

先月、円柱座標系での連続体の運動方程式の導出を扱ったのですが、複数ある導出方法の中で初学者にとって理解しやすい方法についての解説がどこにも載っていなかったので自分で書くことにしました。

## はじめに

本記事ではベクトルと行列のそれぞれを明示するために行列Aの場合は$[A]$、ベクトルAの場合は$\\{A\\}$のように`[]`と`{}`を使い分けています。

また、本記事では円柱座標系での連続体の運動方程式の導出について簡単な紹介しか行わないため、詳細については下記の文献などを参照してください。

{{< amazon asin="4627666012" title="弾性力学入門 - ていねいな数式展開で基礎をしっかり理解する" >}}
{{< amazon asin="4320081846" title="弾性力学" >}}

なお、この記事を読むにあたって以前書いた[オイラーの運動方程式関連の話]({{< relref "continuousEquationMotion.md" >}})と[応力テンソル]({{< relref "stressTensor.md" >}})の内容を理解しておいた方が理解しやすいかもしれません。

また、ここでいう円柱座標系は下の図のような$r, \theta, z$座標系を指しています。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1652083107/NabeBlog/%E5%86%86%E6%9F%B1%E5%BA%A7%E6%A8%99%E7%B3%BB_ekje9b.webp" alt="円柱座標系のポンチ絵">}}

## 直交座標系での運動方程式

円筒座標系での運動方程式の導出方法は幾つかありますが、本記事では直交座標系での運動方程式を座標変換する方法を用います。そこでまず、次の図のような微小体積に働く応力と慣性力のつり合いを考えます。なお、簡単のため体積力は無視します。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1651825554/NabeBlog/equilibrium_body_yiomer.webp" alt="微小体積">}}

密度$\rho$は一定であるとし、$x$軸方向の変位を$u$とすると、$x$軸方向の運動方程式は

\begin{eqnarray}
\rho dx dy dz\displaystyle\frac{\partial^2 u}{\partial t^2} &=&
-\sigma_x dy dz + (\sigma_x + \displaystyle\frac{\partial \sigma_x}{\partial x} dx)dy dz -
\tau_{xy} dx dz + (\tau_{xy} + \displaystyle\frac{\partial \tau_{xy}}{\partial y} dy)dx dz-
\tau_{zx} dy dx + (\tau_{zx} + \displaystyle\frac{\partial \tau_{zx}}{\partial z}dz)dy dx \nonumber\\\\
\rho\displaystyle\frac{\partial^2 u}{\partial t^2} &=&
\displaystyle\frac{\partial \sigma_x}{\partial x} +
\displaystyle\frac{\partial \tau_{xy}}{\partial y} +
\displaystyle\frac{\partial \tau_{zx}}{\partial z}
\end{eqnarray}

となります。さらに、$y, z$軸方向の変位を$v, w$とし、先ほどと同様にそれぞれの方向の運動方程式をまとめると次の通りとなります。

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2 v}{\partial t^2} &=&
\displaystyle\frac{\partial \sigma_y}{\partial y} +
\displaystyle\frac{\partial \tau_{xy}}{\partial x} +
\displaystyle\frac{\partial \tau_{yz}}{\partial z} \\\\
\rho\displaystyle\frac{\partial^2 w}{\partial t^2} &=&
\displaystyle\frac{\partial \sigma_z}{\partial z} +
\displaystyle\frac{\partial \tau_{zx}}{\partial x} +
\displaystyle\frac{\partial \tau_{yz}}{\partial y}
\end{eqnarray}

当たり前ですが、コーシーの運動方程式から体積力を無視したものとなります。

## 円柱座標系での運動方程式の導出

### 応力テンソルと慣性力の座標変換

詳細は文献[1][^1]に載っているので詳細は省略しますが、直交座標系から円柱座標系への座標変換行列$[P]$は次の通り表せます。

\begin{equation}
[P] =
\begin{bmatrix}
\cos{\theta}&\sin{\theta}&0 \\\\
-\sin{\theta}&\cos{\theta}&0 \\\\
0 & 0 &1
\end{bmatrix}
\end{equation}

なお、この行列$[P]$は単純に$z$軸周りに角度$+\theta $だけ回転させた際の回転行列と同じです。$[P]$を用いて、座標変換前と変換後の応力テンソル$[\sigma]$と$[\sigma']$の関係を表します。

\begin{equation}
[\sigma] =
\begin{bmatrix}
\sigma_{x} & \tau_{xy} & \tau_{xz} \\\\
\tau_{yx} & \sigma_{y} & \tau_{yz} \\\\
\tau_{zx} & \tau_{zy} & \sigma_{z}
\end{bmatrix}
\end{equation}

\begin{equation}
[\sigma^\prime]=
\begin{bmatrix}
\sigma_{r}&\tau_{r\theta}&\tau_{rz}\\\\
\tau_{\theta r}&\sigma_{\theta}&\tau_{\theta z}\\\\
\tau_{zr}&\tau_{z\theta}&\sigma_{z}
\end{bmatrix}
\end{equation}

任意の二階のテンソルについて、座標変換前のテンソル$[T]$と変換後のテンソル$[T']$の関係は座標変換行列$[P]$を用いて次の通り表せます[^2]。

\begin{equation}
[T']=[P][T][P]^T
\end{equation}

当然ながら式(7)は応力テンソルにおいても成り立ち、座標変換行列$[P]$は$[P]^{-1}=[P]^T$が成り立つため、

\begin{eqnarray}
[\sigma']&=&[P][\sigma][P]^T\nonumber\\\\
[\sigma]&=&[P]^T[\sigma'][P]\nonumber\\\\
&=&
\begin{bmatrix}
\cos{\theta}&-\sin{\theta}&0\\\\
\sin{\theta}&\cos{\theta}&0\\\\
0&0&1
\end{bmatrix}
\begin{bmatrix}
\sigma_{r}&\tau_{r\theta}&\tau_{rz}\\\\
\tau_{\theta r}&\sigma_{\theta}&\tau_{\theta z}\\\\
\tau_{zr}&\tau_{z\theta}&\sigma_{z}
\end{bmatrix}
\begin{bmatrix}
\cos{\theta}&\sin{\theta}&0\\\\
-\sin{\theta}&\cos{\theta}&0\\\\
0&0&1
\end{bmatrix}
\nonumber\\\\
&=&
\begin{bmatrix}
\sigma_{r}\cos^2{\theta}-\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\sin^2{\theta}&(\sigma_{r}-\sigma_{\theta})\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta}&\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta}\\\\
(\sigma_{r}-\sigma_{\theta})\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta}&\sigma_{r}\sin^2{\theta}+\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\cos^2{\theta}&\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}\\\\
\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta}&\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}&\sigma_{z}
\end{bmatrix}
\end{eqnarray}

となります。なお、式(8)を導出する際に応力テンソルの対称性は保たれているとしており、次の式を断ることなく用いています。

\begin{equation}
\tau_{r\theta}=\tau_{\theta r},\ \ \tau_{rz}=\tau_{zr},\ \ \tau_{r\theta}=\tau_{\theta r},\ \ \tau_{rz}=\tau_{zr}
\end{equation}

式(8)では行列の成分の個数としては9個存在しますが、応力テンソルの対称性から独立な成分は6個となります。したがって式(8)は

\begin{equation}
\begin{Bmatrix}
\sigma_x \\\\
\sigma_y \\\\
\sigma_z \\\\
\tau_{xy} \\\\
\tau_{xz} \\\\
\tau_{yz}
\end{Bmatrix} =
\begin{Bmatrix}
\sigma_{r}\cos^2{\theta}-\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\sin^2{\theta} \\\\
\sigma_{r}\sin^2{\theta}+\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\cos^2{\theta} \\\\
\sigma_{z} \\\\
\left(\sigma_{r}-\sigma_{\theta}\right)\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta} \\\\
\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta} \\\\
\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}
\end{Bmatrix}
\end{equation}

となります。続いて慣性力も座標変換を行います。円柱座標系での慣性力のベクトルを$\\{F_{r,\ \theta,\ z}\\}$とし、次の通り定めます。

\begin{equation}
\begin{Bmatrix}
F_{r,\ \theta,\ z}
\end{Bmatrix}=
\begin{Bmatrix}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}
\end{Bmatrix}
\end{equation}

直交座標系での慣性力を$\\{F_{x,\ y,\ \ z}\\}$としてベクトルとして表すと、

\begin{equation}
\begin{Bmatrix}
F_{x,\ y,\ \ z}
\end{Bmatrix}=
\begin{Bmatrix}
\rho\displaystyle\frac{\partial^2u}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2v}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}
\end{Bmatrix}
\end{equation}

となります。これらの慣性力は単なるベクトルなので、両者の関係は

\begin{eqnarray}
\\{F_{x,\ y,\ \ z}\\}&=&
[P]^T\\{F_{r,\ \theta,\ z}\\}
\nonumber\\\\
&=&
\begin{bmatrix}
\cos{\theta}&-\sin{\theta}&0\\\\
\sin{\theta}&\cos{\theta}&0\\\\
0&0&1
\end{bmatrix}
\begin{Bmatrix}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2} \\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}
\end{Bmatrix}=
\begin{Bmatrix}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\cos{\theta}-\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\sin{\theta} \\\\
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\theta}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\cos{\theta} \\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}
\end{Bmatrix}
\end{eqnarray}

で表せます。

### 偏微分演算子の変換

直交座標系での偏微分演算子を円柱座標上で表します。まず、下記の関係を導きます。

\begin{equation}
\left\\{
\begin{matrix}
\displaystyle\frac{\partial r}{\partial x}=\displaystyle\frac{\partial}{\partial x}\left(\sqrt{x^2+y^2+z^2}\right)=\displaystyle\frac{2x}{2\sqrt{x^2+y^2+z^2}}=\displaystyle\frac{x}{r}=\displaystyle\frac{r\cos{\theta}}{r}=\cos{\theta}\\\\
\displaystyle\frac{\partial r}{\partial y}=\displaystyle\frac{\partial}{\partial y}\left(\sqrt{x^2+y^2+z^2}\right)=\displaystyle\frac{2y}{2\sqrt{x^2+y^2+z^2}}=\displaystyle\frac{y}{r}=\displaystyle\frac{r\sin{\theta}}{r}=\sin{\theta}\\\\
\displaystyle\frac{\partial r}{\partial z}=\displaystyle\frac{\partial}{\partial y}\left(\sqrt{x^2+y^2+z^2}\right)=\displaystyle\frac{2z}{2\sqrt{x^2+y^2+z^2}}=\displaystyle\frac{z}{r}=0\\\\
\displaystyle\frac{\partial\theta}{\partial x}=\displaystyle\frac{\partial\left(\tan^{-1}{\displaystyle\frac{y}{x}}\right)}{\partial x}=\displaystyle\frac{1}{\left(\displaystyle\frac{y}{x}\right)^2+1}\cdot\displaystyle\frac{d\left(\displaystyle\frac{y}{x}\right)}{dx}=\displaystyle\frac{x^2}{y^2+x^2}\cdot y\cdot\left(-\displaystyle\frac{1}{x^2}\right)=\displaystyle\frac{-r\sin{\theta}}{r^2}=\displaystyle\frac{-\sin{\theta}}{r}\\\\
\displaystyle\frac{\partial\theta}{\partial y}=\displaystyle\frac{\partial\left(\tan^{-1}{\displaystyle\frac{y}{x}}\right)}{\partial y}=\displaystyle\frac{1}{\left(\displaystyle\frac{y}{x}\right)^2+1}\cdot\displaystyle\frac{d\left(\displaystyle\frac{y}{x}\right)}{dy}=\displaystyle\frac{x^2}{y^2+x^2}\cdot\displaystyle\frac{1}{x}=\displaystyle\frac{r\cos{\theta}}{r^2}=\displaystyle\frac{\cos{\theta}}{r}\\\\
\displaystyle\frac{\partial\theta}{\partial z}=\displaystyle\frac{\partial z}{\partial\theta}=0\\\\
\displaystyle\frac{\partial z}{\partial z}=\displaystyle\frac{\partial z}{\partial z}
\end{matrix}
\right.
\end{equation}

式(14)を用いて、直交座標系での偏微分演算子$（\displaystyle\frac{\partial}{\partial x},\ \displaystyle\frac{\partial}{\partial y},\ \displaystyle\frac{\partial}{\partial z}）$を変形します。

\begin{equation}
\left\\{
\begin{matrix}
\displaystyle\frac{\partial}{\partial x}=\displaystyle\frac{\partial r}{\partial x}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\partial\theta}{\partial x}\displaystyle\frac{\partial}{\partial\theta}+\displaystyle\frac{\partial z}{\partial x}\displaystyle\frac{\partial}{\partial z}=\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta} \\\\
\displaystyle\frac{\partial}{\partial y}=\displaystyle\frac{\partial r}{\partial y}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\partial\theta}{\partial y}\displaystyle\frac{\partial}{\partial\theta}+\displaystyle\frac{\partial z}{\partial y}\displaystyle\frac{\partial}{\partial z}=\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\\\\
\displaystyle\frac{\partial}{\partial z}=\displaystyle\frac{\partial}{\partial z}
\end{matrix}
\right.
\end{equation}

### 運動方程式の導出

直交座標系での$x$軸方向の運動方程式である式(1)に式(10), (13), (15)を代入して整理します。

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2 u_r}{\partial t^2}\cos{\theta}-\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\sin{\theta}&=&
\left(\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)
\left(\sigma_{r}\cos^2{\theta}-\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\sin^2{\theta}\right)+
\left(\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left\\{\left(\sigma_{r}-\sigma_{\theta}\right)\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta}\right\\}+\displaystyle\frac{\partial}{\partial z}
\left(\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta}\right)
\nonumber\\\\
\displaystyle\frac{\partial^2u_r}{\partial t^2}\cos{\theta}-\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\sin{\theta}&=&
\displaystyle\frac{\partial\sigma_{r}}{\partial r}\cos{\theta}-\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\sin{\theta}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\cos{\theta}-\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\sin{\theta}+\sigma_{r}\cos{\theta}-\sigma_{\theta}\cos{\theta}-2\tau_{\theta r}\sin{\theta}\right)+\cos{\theta}\displaystyle\frac{\partial\tau_{rz}}{\partial z}-\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}\sin{\theta}
\end{eqnarray}

同様に、$y, z$軸方向の運動方程式である式(2), (3)についても式(10), (13), (15)を代入して整理します。式(2)については

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\theta}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\cos{\theta}&=&
\left(\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left\\{\left(\sigma_{r}-\sigma_{\theta}\right)\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta}\right\\}+\left(\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\sigma_{r}\sin^2{\theta}+\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\cos^2{\theta}\right)+\displaystyle\frac{\partial}{\partial z}\left(\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}\right)
\nonumber\\\\
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\theta}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\cos{\theta}&=&
\displaystyle\frac{\partial\sigma_{r}}{\partial r}\sin{\theta}+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\cos{\theta}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\sin{\theta}+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\cos{\theta}+\sigma_{r}\sin{\theta}-\sigma_{\theta}\sin{\theta}+2\tau_{\theta r}\cos{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\sin{\theta}+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}\cos{\theta}
\end{eqnarray}

となり、式(3)については

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2w}{\partial t^2}&=&
\left(\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta}\right)+\left(\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}\right)+\displaystyle\frac{\partial\sigma_z}{\partial z}
\nonumber\\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}&=&\displaystyle\frac{1}{r}\displaystyle\frac{\partial}{\partial r}\left(r\tau_{rz}\right)+\displaystyle\frac{1}{r}\displaystyle\frac{\partial\tau_{\theta z}}{\partial\theta}+\displaystyle\frac{\partial\sigma_z}{\partial z}
\end{eqnarray}

となります。しかしここで、最終的に求めたい運動方程式は次のように円筒座標系での各軸方向の式であるため[^3]、

\begin{equation}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\cdots ,\ \ \rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\cdots,\ \ \rho\displaystyle\frac{\partial^2w}{\partial t^2}= \cdots
\nonumber
\end{equation}

式(16), (17)では不十分なことが分かります。そこで、いったん式(16)＋式(17)とします。

\begin{equation}
\displaystyle\frac{\partial^2u_r}{\partial t^2}\left(\cos{\theta}+\sin{\theta}\right)+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\left(\cos{\theta}-\sin{\theta}\right)=\displaystyle\frac{\partial\sigma_{r}}{\partial r}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\left(\cos{\theta}-\sin{\theta}\right)+\displaystyle\frac{1}{r}\left\\{\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\left(\cos{\theta}-\sin{\theta}\right)+\sigma_{r}\left(\cos{\theta}+\sin{\theta}\right)-\sigma_{\theta}\left(\cos{\theta}+\sin{\theta}\right)+2\tau_{\theta r}\left(\cos{\theta}-\sin{\theta}\right)\right\\}+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}{\left(\cos{\theta}-\sin{\theta}\right)}
\end{equation}

ここで分かる通り、式(19)は$\cos{\theta}+\sin{\theta}$の項と$\cos{\theta}-\sin{\theta}$の項に分けられます。そして、次の関係を用い式(19)を変形します。

\begin{equation}
\cos{\theta}+\sin{\theta}=\displaystyle\frac{2}{\sqrt2}\left(\sin{\displaystyle\frac{\pi}{4}}\cdot\cos{\theta}+\sin{\theta}\cdot\cos{\displaystyle\frac{\pi}{4}}\right)=\displaystyle\frac{2}{\sqrt2}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}\\\\
\cos{\theta}-\sin{\theta}=\displaystyle\frac{2}{\sqrt2}\left(\sin{\displaystyle\frac{\pi}{4}}\cdot\cos{\theta}-\sin{\theta}\cdot\cos{\displaystyle\frac{\pi}{4}}\right)=\displaystyle\frac{2}{\sqrt2}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}
\nonumber
\end{equation}

これにより、

\begin{equation}
\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}+\displaystyle\frac{1}{r}\left\\{\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}+\sigma_{r}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}-\sigma_{\theta}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+2\tau_{\theta r}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}\right\\}+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}{\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}}
\end{equation}

となります。上式の両辺で$\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}$と$\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}$の項の係数は等しいはずなので、

\begin{equation}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}+\sigma_{r}-\sigma_{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}+2\tau_{\theta r}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}
\end{equation}

が成り立ちます。最終的に、円柱座標系での運動方程式を以下の通り表せます。

\begin{equation}
\left\\{
\begin{array}{c}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}+\sigma_{r}-\sigma_{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z} \\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}+2\tau_{\theta r}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}\\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}=\displaystyle\frac{1}{r}\displaystyle\frac{\partial}{\partial r}\left(r\tau_{rz}\right)+\displaystyle\frac{1}{r}\displaystyle\frac{\partial\tau_{\theta z}}{\partial\theta}+\displaystyle\frac{\partial\sigma_z}{\partial z}
\end{array}
\right.
\end{equation}

## 最後に

特に式(19)以降の式展開については解説している資料が見つからなかったので自分なりにまとめてみました。ちなみにですが、**慣性力を体積力に書き換えることで静解析に必要な平衡方程式を導くことも可能です**。

[^1]: 荻博次、”弾性力学”、共立出版 (2011)．

[^2]: 詳しい話は[こちら]({{< relref "stressTensor.md" >}}#%E5%BA%A7%E6%A8%99%E5%9B%9E%E8%BB%A2%E3%81%AE%E5%89%8D%E5%BE%8C%E3%81%AE%E5%BF%9C%E5%8A%9B%E3%83%86%E3%83%B3%E3%82%BD%E3%83%AB%E3%81%AE%E9%96%A2%E4%BF%82)で説明しています。

[^3]: 今回の記事では説明しませんが、最終的に振動数方程式を導く際に各軸方向の運動方程式を導いている必要があります。
