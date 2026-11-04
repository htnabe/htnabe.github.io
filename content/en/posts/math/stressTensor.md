---
title: "Stress Tensor and Its Properties"
date: 2022-01-05T22:23:56+09:00
draft: false
tags: [Continuum Mechanics, Stress Tensor]
categories: [Math]
mathPosts: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1641536373/NabeBlog/%E5%9B%9B%E9%9D%A2%E4%BD%93_jhtini.webp"
---

## Introduction

In this article, I explain **what the stress tensor is**. For content that cannot be fully covered here, please refer to the references below.

{{<amazon asin="4785310685" title="Tensor: For Science and Engineering">}}
{{<amazon asin="4339043400" title="Fundamentals of Continuum Mechanics">}}

Also in this article, to explicitly distinguish vectors and matrices, matrix A is written as $\left[A\right]$ and vector A as $\\{A\\}$, using `[]` and `{}` differently.

This article also assumes that you already understand the following article.
{{<blogcard url="https://ezu-ken.com/fem-stress/">}}

## Advantages of Introducing the Stress Tensor (Why It Matters)

For the advantages of introducing stress tensor, the article below is helpful, so I will defer the detailed explanation to it.

- [Derivation of Tensor Invariants](https://ramenhuhu.com/math-invariant#:~:text=%E3%83%86%E3%83%B3%E3%82%BD%E3%83%AB%E3%81%AE%E5%90%84%E6%88%90%E5%88%86%E3%81%AF,%E3%81%9A%E3%80%81%E4%B8%8D%E5%A4%89%E9%87%8F%E3%81%A7%E3%81%82%E3%82%8B%E3%80%82)

In short, as described there, the merit is that the physical state can still be uniquely represented even after coordinate transformation.

## Derivation of the Stress Tensor

### Two Ways of Introduction

When first learning stress tensor, there are mainly two approaches.

1. Consider the case where stresses acting on an infinitesimal volume are in equilibrium[^1] (easy)
2. Consider it through Euler's first and second laws of motion, i.e., equation of motion and angular equation of motion for a continuum[^2] (a bit harder)

For rigorous treatment of stress tensor, I recommend the latter, but it requires understanding the concepts of `surface force and body force`. Since these are quite abstract, they can be difficult for beginners. Therefore, this article uses the former approach.

### Assumptions

Normally, when force acts on an object, **its shape changes to some extent**. When discussing this `deformation`, if deformation is large, `finite deformation`[^3] should be considered. But since that introduces many complex formulas, for now we consider only **small deformation**.

More concretely[^1]:

> Assume deformation of the solid is small, and when considering internal force, changes in area and direction of figures inside the solid are small enough to be neglected. That is, internal force is considered as if points in the body do not move.

### Stress Vector and Equilibrium Equation

Consider tetrahedron OABC with infinitesimal volume inside a tiny body[^4]. Only stress vectors $\\{t_{1}\\}, \\{t_{2}\\}, \\{t_{3}\\}, \\{t\\}$ act on this tetrahedron.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1641536373/NabeBlog/%E5%9B%9B%E9%9D%A2%E4%BD%93_jhtini.webp" alt="Stress acting on tetrahedron">}}

A `stress vector` is **a vector whose components are stresses**. For example, $\\{t_{1}\\}$ is

\begin{equation}
\\{t_{1}\\}=\begin{Bmatrix}\sigma_{xx}\\\\ \sigma_{yx}\\\\ \sigma_{zx}\end{Bmatrix}
\end{equation}

Thus, a stress vector has as components the stresses in each of the $x, y, z$ directions acting on the surface. So for $\\{t_{2}\\}$ and $\\{t_{3}\\}$ similarly,

\begin{equation}
\\{t_{2}\\}=\begin{Bmatrix}\sigma_{xy}\\\\ \sigma_{yy}\\\\ \sigma_{zy}\end{Bmatrix},\quad \\{t_{3}\\}=\begin{Bmatrix}\sigma_{xz}\\\\ \sigma_{yz}\\\\ \sigma_{zz}\end{Bmatrix}
\end{equation}

If the areas of $\triangle{ABC}, \triangle{BOC}, \triangle{AOC},  \triangle{ABO}$ are $\mathrm{d}\mathit{S}, \mathrm{d}\mathit{S_\mathrm{1}}, \mathrm{d}\mathit{S_\mathrm{2}}, \mathrm{d}\mathit{S}_{\mathrm{3}}$, then from `force = stress x area`, the force equilibrium equation is

\begin{equation}
\\{t\\}\mathrm{d}\mathit{S} - \\{t_1\\}\mathrm{d}\mathit{S_\mathrm{1}} - \\{t_2\\}\mathrm{d}\mathit{S_\mathrm{2}} - \\{t_3\\}\mathrm{d}\mathit{S_\mathrm{3}}\mathrm= 0
\end{equation}

[^5]. In Eq. (3), $\\{t_1\\}, \\{t_2\\}, \\{t_3\\}$ point in negative $x, y, z$ directions, so they have minus signs. Also, denoting the unit normal vector of face $\triangle{ABC}$ by $\\{n\\}(=\\{n_x, n_y, n_z\\}^{\mathrm{ T }})$, the area relation is

\begin{equation}
\begin{Bmatrix}
\mathrm{d}\mathit{S_\mathrm{1}}\\\\ \mathrm{d}\mathit{S_\mathrm{2}}\\\\ \mathrm{d}\mathit{S_\mathrm{3}}
\end{Bmatrix} = \begin{Bmatrix}
n_x\\\\ n_y\\\\ n_z
\end{Bmatrix} \mathrm{d}\mathit{S}
\end{equation}

Substituting into Eq. (3),

\begin{equation}
\\{t\\} - \\{t_\mathrm1\\}\mathit{n_x} - \\{t_\mathrm2\\}\mathit{n_y} - \\{t_\mathrm3\\}\mathit{n_z}\mathrm= 0
\end{equation}

and finally

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

The matrix part in Eq. (6) is called the stress tensor, denoted by $\left[\sigma\right]$.

## Stress Tensor After Coordinate Rotation

As an example of stress tensor after coordinate rotation, among many possibilities, we focus on probably the ~~most~~ understandable case: **coordinate rotation and stress tensor value change in plane strain**.

### Relationship Before and After Coordinate Rotation

Check how the stress tensors before and after coordinate rotation are related.

Using stress vector $\\{t\\}$ and unit normal vector $\\{n\\}$ as shown below, Eq. (6) holds in the left coordinate system.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1641547559/NabeBlog/%E5%9B%9E%E8%BB%A2%E3%81%A8%E5%BF%9C%E5%8A%9B%E3%83%86%E3%83%B3%E3%82%BD%E3%83%AB_myxrli.webp" alt="rotation_and_stress_tensor">}}

Assume the left coordinate system is transformed into the right one by rotation matrix $\left[P\right]$. In that rotated system, the relation among stress vector, stress tensor, and unit normal vector is

\begin{equation}
\\{t'\\} = \left[\sigma'\right]\\{n'\\}
\end{equation}

Meanwhile, stress vector and unit normal before/after rotation satisfy

\begin{equation}
\\{t'\\} = \left[P\right]\\{t\\}, \quad \\{n'\\} = \left[P\right]\\{n\\}
\end{equation}

From Eq. (7) and Eq. (8),

\begin{equation}
\left[P\right]\\{t\\} = \left[\sigma'\right]\left[P\right]\\{n\\}
\end{equation}

Now, applying rotation matrix $\left[P\right]$ from the left to both sides of Eq. (6),

\begin{equation}
\left[P\right]\\{t\\} = \left[P\right]\left[\sigma\right]\\{n\\}
\end{equation}

so the right-hand sides of Eq. (9) and Eq. (10) are equal. Therefore,

\begin{eqnarray}
\left[\sigma'\right]\left[P\right]\\{n\\} &=& \left[P\right]\left[\sigma\right]\\{n\\} \nonumber\\\\\[ 5pt ]
\left[\sigma'\right]\left[P\right] &=& \left[P\right]\left[\sigma\right] \nonumber\\\\\[ 5pt ]
\left[\sigma'\right] &=& \left[P\right]\left[\sigma\right]\left[P\right]^{\mathrm{ T }}
\end{eqnarray}

which gives the relation between stress tensors before and after coordinate rotation.

### Stress Tensor in Plane Strain

A strict definition of `plane strain` is available at the official JSME site below.

- [JSME Mechanical Engineering Dictionary: Plane Strain State](https://www.jsme.or.jp/jsme-medwiki/07:1011772)

As the name implies, plane strain means strain is planar. In the $x, y, z$ coordinates, it refers to a state where strain in one direction (e.g., $z$ direction) is zero. Also, for a body in plane strain, the following shape/load conditions exist.

1. Body length is significantly larger than thickness and width
2. External load that does not vary in one direction (e.g., $z$ direction)

If we consider a state with zero strain in $z$ direction, the stress tensor in plane strain can be simply written by setting $z$-direction components to zero:

\begin{equation}
\left[\sigma\right] =
\begin{bmatrix}
\sigma_{xx}& \sigma_{xy}& 0\\\\\
\sigma_{yx}& \sigma_{yy}& 0\\\\\
0& 0& 0
\end{bmatrix}
\end{equation}

### Components of Stress Tensor After Coordinate Transformation

Now compute the stress tensor in coordinates rotated by $+\theta$ around the $z$-axis. The rotation matrix $\left[P\right]$ is

\begin{equation}
\left[P\right] = \begin{bmatrix}
\cos{\theta}& \sin{\theta}& 0\\\\\
-\sin{\theta}& \cos{\theta}& 0\\\\\
0& 0& 1
\end{bmatrix}
\end{equation}

So from Eq. (11) and Eq. (12),

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

From Eq. (14), all $z$-direction components remain zero after rotation, indicating stress in plane strain state.

## Closing

When studying tensors in engineering, not only stress tensor but also tensor-specific operations, index notation, and Lagrangian/Eulerian coordinates are major hurdles for beginners. In self-study, many texts tend to omit important intermediate transformations or focus on abstract explanation while skipping the physical meaning.

Since beginner-friendly texts that avoid excessive abstraction are not very common (as far as I know), I wrote this article as an attempt to digest and output what I learned in a more learnable form. I hope it helps.

[^1]: Shigeru Ishihara, Tensor - For Science and Technology, Shokabo (2011), pp. 106 - pp. 107.

[^2]: Kiyoji Nakamura and Noriyasu Mori, Fundamentals of Continuum Mechanics, Corona Publishing (2012), pp. 96 - pp. 97.

[^3]: For details, see [here](https://www.jsme.or.jp/jsme-medwiki/07:1012904).

[^4]: For stress discussion, any arbitrary closed surface is acceptable. Here, we simply considered a tetrahedron (a closed surface) because it is easy to think about. A hexahedron with stress acting is also fine.

[^5]: Strictly, this equation is obtained from Euler's first law of motion, but here body force and momentum terms are neglected to aid intuitive understanding.
