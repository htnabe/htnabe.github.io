---
title: "Equation of Motion for a Continuum in Cylindrical Coordinates"
date: 2022-05-02T17:27:16+09:00
tags: [Continuum Mechanics, Solid Mechanics, Cylindrical Coordinates, Coordinate Transformation]
categories: [Math]
mathPosts: true
toc: true
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1651825554/NabeBlog/equilibrium_body_yiomer.webp"
---

Last month I covered deriving the continuum equation of motion in cylindrical coordinates. Among several derivation approaches, I could not find an explanation that is easy for beginners to follow, so I decided to write one myself.

## Introduction

In this article, to clearly distinguish vectors and matrices, matrix A is written as $[A]$ and vector A as $\\{A\\}$, using `[]` and `{}` separately.

Also, since this article gives only a brief introduction to deriving the continuum equation of motion in cylindrical coordinates, please refer to the references below for details.

{{< amazon asin="4627666012" title="Introduction to Elasticity - Understand Fundamentals through Careful Formula Development" >}}
{{< amazon asin="4320081846" title="Elasticity" >}}

To follow this article more easily, it may help to understand my previous articles on [Euler's equation of motion]({{< relref "continuousEquationMotion.md" >}}) and [stress tensor]({{< relref "stressTensor.md" >}}).

Also, the cylindrical coordinate system here refers to the $r, \theta, z$ system shown below.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1652083107/NabeBlog/%E5%86%86%E6%9F%B1%E5%BA%A7%E6%A8%99%E7%B3%BB_ekje9b.webp" alt="Sketch of cylindrical coordinates">}}

## Equation of Motion in Cartesian Coordinates

There are multiple derivation methods for cylindrical coordinates, but in this article we use coordinate transformation from the Cartesian-coordinate equation of motion. First, consider equilibrium between stress and inertial force acting on the infinitesimal volume shown below. For simplicity, body force is neglected.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1651825554/NabeBlog/equilibrium_body_yiomer.webp" alt="Infinitesimal volume">}}

Assume constant density $\rho$, and let displacement in the $x$ direction be $u$. Then the equation of motion in the $x$ direction is

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

Further, letting displacements in the $y, z$ directions be $v, w$, and similarly collecting equations for each direction gives

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

As expected, these are Cauchy's equations of motion with body force neglected.

## Derivation in Cylindrical Coordinates

### Coordinate Transformation of Stress Tensor and Inertial Force

Details are in reference [1][^1], so they are omitted here. The coordinate transformation matrix $[P]$ from Cartesian to cylindrical coordinates is

\begin{equation}
[P] =
\begin{bmatrix}
\cos{\theta}&\sin{\theta}&0 \\\\
-\sin{\theta}&\cos{\theta}&0 \\\\
0 & 0 &1
\end{bmatrix}
\end{equation}

This matrix is simply the same as the rotation matrix for rotation by angle $+\theta$ about the $z$-axis. Using $[P]$, express the relation between stress tensors before and after transformation, $[\sigma]$ and $[\sigma']$.

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

For any second-order tensor, the relationship between tensor $[T]$ before transformation and tensor $[T']$ after transformation is[^2]

\begin{equation}
[T']=[P][T][P]^T
\end{equation}

Naturally, Eq. (7) also holds for stress tensor, and since $[P]^{-1}=[P]^T$,

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

In deriving Eq. (8), symmetry of stress tensor is assumed, and the following equalities are used without explicit note:

\begin{equation}
\tau_{r\theta}=\tau_{\theta r},\ \ \tau_{rz}=\tau_{zr},\ \ \tau_{r\theta}=\tau_{\theta r},\ \ \tau_{rz}=\tau_{zr}
\end{equation}

Eq. (8) has 9 matrix components, but due to symmetry only 6 are independent. Therefore Eq. (8) becomes

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

Next, transform inertial force as well. Let the inertial-force vector in cylindrical coordinates be $\\{F_{r,\ \theta,\ z}\\}$:

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

Let inertial force in Cartesian coordinates be $\\{F_{x,\ y,\ \ z}\\}$:

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

Since these inertial forces are ordinary vectors, their relation is

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

### Transformation of Partial Differential Operators

Express Cartesian partial differential operators in cylindrical coordinates. First derive the following relations:

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

Using Eq. (14), transform Cartesian partial differential operators $（\displaystyle\frac{\partial}{\partial x},\ \displaystyle\frac{\partial}{\partial y},\ \displaystyle\frac{\partial}{\partial z}）$.

\begin{equation}
\left\\{
\begin{matrix}
\displaystyle\frac{\partial}{\partial x}=\displaystyle\frac{\partial r}{\partial x}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\partial\theta}{\partial x}\displaystyle\frac{\partial}{\partial\theta}+\displaystyle\frac{\partial z}{\partial x}\displaystyle\frac{\partial}{\partial z}=\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta} \\\\
\displaystyle\frac{\partial}{\partial y}=\displaystyle\frac{\partial r}{\partial y}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\partial\theta}{\partial y}\displaystyle\frac{\partial}{\partial\theta}+\displaystyle\frac{\partial z}{\partial y}\displaystyle\frac{\partial}{\partial z}=\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\\\\
\displaystyle\frac{\partial}{\partial z}=\displaystyle\frac{\partial}{\partial z}
\end{matrix}
\right.
\end{equation}

### Derivation of the Equation of Motion

Substitute Eq. (10), (13), and (15) into Eq. (1), the $x$-direction equation in Cartesian coordinates, and rearrange:

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

Similarly, for Eq. (2) and Eq. (3) in $y, z$ directions, substitute Eq. (10), (13), and (15). For Eq. (2):

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\theta}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\cos{\theta}&=&
\left(\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left\\{\left(\sigma_{r}-\sigma_{\theta}\right)\sin{\theta}\cos{\theta}+\tau_{\theta r}\cos{2\theta}\right\\}+\left(\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\sigma_{r}\sin^2{\theta}+\tau_{\theta r}\sin{2\theta}+\sigma_{\theta}\cos^2{\theta}\right)+\displaystyle\frac{\partial}{\partial z}\left(\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}\right)
\nonumber\\\\
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\theta}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\cos{\theta}&=&
\displaystyle\frac{\partial\sigma_{r}}{\partial r}\sin{\theta}+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\cos{\theta}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\sin{\theta}+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\cos{\theta}+\sigma_{r}\sin{\theta}-\sigma_{\theta}\sin{\theta}+2\tau_{\theta r}\cos{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\sin{\theta}+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}\cos{\theta}
\end{eqnarray}

and for Eq. (3):

\begin{eqnarray}
\rho\displaystyle\frac{\partial^2w}{\partial t^2}&=&
\left(\cos{\theta}\displaystyle\frac{\partial}{\partial r}-\displaystyle\frac{\sin{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\tau_{rz}\cos{\theta}-\tau_{\theta z}\sin{\theta}\right)+\left(\sin{\theta}\displaystyle\frac{\partial}{\partial r}+\displaystyle\frac{\cos{\theta}}{r}\displaystyle\frac{\partial}{\partial\theta}\right)\left(\tau_{rz}\sin{\theta}+\tau_{\theta z}\cos{\theta}\right)+\displaystyle\frac{\partial\sigma_z}{\partial z}
\nonumber\\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}&=&\displaystyle\frac{1}{r}\displaystyle\frac{\partial}{\partial r}\left(r\tau_{rz}\right)+\displaystyle\frac{1}{r}\displaystyle\frac{\partial\tau_{\theta z}}{\partial\theta}+\displaystyle\frac{\partial\sigma_z}{\partial z}
\end{eqnarray}

However, the target final form is equations by each cylindrical axis direction[^3],

\begin{equation}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\cdots ,\ \ \rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\cdots,\ \ \rho\displaystyle\frac{\partial^2w}{\partial t^2}= \cdots
\nonumber
\end{equation}

so Eq. (16) and Eq. (17) are insufficient. Therefore, first take Eq. (16) + Eq. (17):

\begin{equation}
\displaystyle\frac{\partial^2u_r}{\partial t^2}\left(\cos{\theta}+\sin{\theta}\right)+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\left(\cos{\theta}-\sin{\theta}\right)=\displaystyle\frac{\partial\sigma_{r}}{\partial r}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\left(\cos{\theta}-\sin{\theta}\right)+\displaystyle\frac{1}{r}\left\\{\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\left(\cos{\theta}-\sin{\theta}\right)+\sigma_{r}\left(\cos{\theta}+\sin{\theta}\right)-\sigma_{\theta}\left(\cos{\theta}+\sin{\theta}\right)+2\tau_{\theta r}\left(\cos{\theta}-\sin{\theta}\right)\right\\}+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\left(\cos{\theta}+\sin{\theta}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}{\left(\cos{\theta}-\sin{\theta}\right)}
\end{equation}

As seen above, Eq. (19) can be separated into terms with $\cos{\theta}+\sin{\theta}$ and with $\cos{\theta}-\sin{\theta}$. Using the following relations:

\begin{equation}
\cos{\theta}+\sin{\theta}=\displaystyle\frac{2}{\sqrt2}\left(\sin{\displaystyle\frac{\pi}{4}}\cdot\cos{\theta}+\sin{\theta}\cdot\cos{\displaystyle\frac{\pi}{4}}\right)=\displaystyle\frac{2}{\sqrt2}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}\\\\
\cos{\theta}-\sin{\theta}=\displaystyle\frac{2}{\sqrt2}\left(\sin{\displaystyle\frac{\pi}{4}}\cdot\cos{\theta}-\sin{\theta}\cdot\cos{\displaystyle\frac{\pi}{4}}\right)=\displaystyle\frac{2}{\sqrt2}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}
\nonumber
\end{equation}

we obtain

\begin{equation}
\displaystyle\frac{\partial^2u_r}{\partial t^2}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}+\displaystyle\frac{1}{r}\left\\{\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}+\sigma_{r}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}-\sigma_{\theta}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+2\tau_{\theta r}\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}\right\\}+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}{\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}}
\end{equation}

Therefore, the coefficients of $\sin{\left(\displaystyle\frac{\pi}{4}+\theta\right)}$ and $\sin{\left(\displaystyle\frac{\pi}{4}-\theta\right)}$ must match on both sides, giving

\begin{equation}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}+\sigma_{r}-\sigma_{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z}\\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}+2\tau_{\theta r}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}
\end{equation}

Finally, the equation of motion in cylindrical coordinates is

\begin{equation}
\left\\{
\begin{array}{c}
\rho\displaystyle\frac{\partial^2u_r}{\partial t^2}=\displaystyle\frac{\partial\sigma_{r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\tau_{\theta r}}{\partial\theta}+\sigma_{r}-\sigma_{\theta}\right)+\displaystyle\frac{\partial\tau_{rz}}{\partial z} \\\\
\rho\displaystyle\frac{\partial^2u_\theta}{\partial t^2}=\displaystyle\frac{\partial\tau_{\theta r}}{\partial r}+\displaystyle\frac{1}{r}\left(\displaystyle\frac{\partial\sigma_{\theta}}{\partial\theta}+2\tau_{\theta r}\right)+\displaystyle\frac{\partial\tau_{\theta z}}{\partial z}\\\\
\rho\displaystyle\frac{\partial^2w}{\partial t^2}=\displaystyle\frac{1}{r}\displaystyle\frac{\partial}{\partial r}\left(r\tau_{rz}\right)+\displaystyle\frac{1}{r}\displaystyle\frac{\partial\tau_{\theta z}}{\partial\theta}+\displaystyle\frac{\partial\sigma_z}{\partial z}
\end{array}
\right.
\end{equation}

## Closing

I could not find materials that explain the expansion especially from Eq. (19) onward, so I summarized it in my own way. By the way, **if inertial force is rewritten as body force, the equilibrium equations needed for static analysis can also be derived**.

[^1]: Hirotsugu Ogi, "Elasticity", Kyoritsu Publishing (2011).

[^2]: A detailed explanation is available [here]({{< relref "stressTensor.md" >}}#relationship-before-and-after-coordinate-rotation).

[^3]: Not explained in this article, but when deriving the frequency equation, equations of motion in each axis direction are needed in the end.
