---
title: "When the Stress Tensor Becomes Non-Symmetric"
date: 2022-03-04T15:47:10+09:00
tags:
  [
    Continuum Mechanics,
    Solid Mechanics,
    Stress Tensor,
    Equation of Motion,
    Euler's Equation of Motion,
  ]
categories: [Math]
mathPosts: true
draft: false
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1647689517/NabeBlog/bodyMoment_zyv4bu.webp"
---

## Introduction (Skippable)

In the previous two articles, I explained [stress tensor and its properties]({{< relref "stressTensor.md" >}}) and [Euler's equation of motion and Cauchy's equation of motion]({{< relref "continuousEquationMotion.md" >}}).

At this stage, one would usually introduce that the stress tensor is symmetric except in special cases, but explanations of conditions where it is not symmetric are often omitted. Many readers will likely wonder: "**Are there cases where it is not a symmetric tensor?**"

In this article, I explain one case where the stress tensor becomes non-symmetric. Please note the following four points when reading.

1. Small deformation is assumed.
2. This article is for readers who understand definitions of stress tensor and Euler's equation of motion.
3. To explicitly distinguish vectors and matrices, matrix A is written as $\left[A\right]$ and vector A as $\\{A\\}$, using `[]` and `{}` separately.
4. Since this is for beginners, index notation is not used (it would make formulas shorter, though...).

For unclear points and details, please refer to the books below.

{{<amazon asin="4785310685" title="Tensor: For Science and Engineering">}}
{{<amazon asin="4339043400" title="Fundamentals of Continuum Mechanics">}}

## Introducing Volume Moment

If a body is subjected to a non-negligible volume moment, the stress tensor becomes non-symmetric.

The definition of volume moment is as follows[^1].

> In cases such as a dielectric influenced in an electric field or a magnetic body influenced in a magnetic field, each part of the solid may receive a moment. In such cases, the moment acting per unit volume is a vector quantity, called volume moment, denoted by M.

Some books introduce the force generating volume moment as body moment (body couple)[^2]. More concretely, this corresponds to the state shown below.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1647689517/NabeBlog/bodyMoment_zyv4bu.webp" alt="body_moment_image">}}

In other words, besides stress (surface force) and body force such as gravity, some additional body force acts as a couple.

### Concrete Calculation

Start from Euler's second law of motion (the angular equation of motion of a continuum) shown in [this article]({{< relref "continuousEquationMotion.md" >}}).
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS
\end{equation}
In this equation, density, volume, velocity, stress vector acting on the continuum, and body force per unit mass are denoted by $\rho, V(t), v, \\{t\\}, \\{K\\}$, respectively.

Now introduce volume moment $\\{M\\}$ according to the definition above. Then Eq. (1) becomes
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS + \int_V \\{M\\} dV
\end{equation}

Transform Eq. (2) using the relationship between unit normal vector $\\{n\\}$ and $\\{t\\}=[\sigma]\\{n\\}$[^3].
\begin{eqnarray}
\int_V \rho\\{r\\}\times\\{a\\} dV &=& \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times[\sigma]\\{n\\} dS + \int_V \\{M\\} dV
\end{eqnarray}

Here, extract and transform the second term on the right-hand side. Let $\\{r\\}=\\{x, y, z\\}^T$, $\\{n\\}=\\{n_1, n_2, n_3\\}^T$.
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

Thus Eq. (3) becomes
\begin{eqnarray}
\int_V \rho\\{r\\}\times\\{a\\} dV
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times[\sigma]\\{n\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=&\int_V \rho\\{r\\}\times\\{K\\} dV + \int_S [D]\\{n\\} dS + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=& \int_V \nabla\cdot[D] dV + \int_V \rho\\{r\\}\times\\{K\\} dV + \int_V \\{M\\} dV\nonumber\\\\\[ 5pt ]
&=& \int_V \Big[\rho\\{r\\}\times\\{K\\} +\nabla\cdot[D]+ \\{M\\} \Big]dV
\end{eqnarray}

Since this holds for arbitrary regions,
\begin{equation}
\rho\\{r\\}\times\\{a\\} = \rho\\{r\\}\times\\{K\\} +\nabla\cdot[D] + \\{M\\}
\end{equation}

The troublesome term is $\nabla\cdot[D]$. **To compute this part, one needs to understand how to compute divergence of a second-order tensor field.** Since this article is for beginners, I will not go into that calculation method and just show the result[^4].
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

From Eq. (7), Eq. (6) is transformed as
\begin{equation}
\\{r\\}\times(\rho\\{a\\} - \rho\\{K\\} - \nabla\cdot[\sigma]) =
\begin{Bmatrix}
\sigma_{zy} - \sigma_{yz} \\\\
\sigma_{xz} - \sigma_{zx} \\\\
\sigma_{yx} - \sigma_{xy}
\end{Bmatrix}+
\\{M\\}
\end{equation}

Using Cauchy's equation of motion from [here]({{< relref "continuousEquationMotion.md" >}}), the left-hand side becomes 0, so
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

As seen here, shear stress components are not equal, so the stress tensor is not symmetric.

## Closing

In textbooks this topic may be finished in less than a page, but showing it without index notation makes it this long. Index notation really is excellent.

By the way, what other conditions lead to a non-symmetric stress tensor? I should look for concrete examples when I have time... (if you know, please let me know).

[^1]: Shigeru Ishihara, Tensor - For Science and Technology, Shokabo (2011), p. 110.

[^2]: Kiyoji Nakamura and Noriyasu Mori, Fundamentals of Continuum Mechanics, Corona Publishing (2012), pp. 104 - pp. 105.

[^3]: This relationship is explained in [this article]({{< relref "continuousEquationMotion.md" >}}).

[^4]: For concrete computation methods, please refer to the references.
