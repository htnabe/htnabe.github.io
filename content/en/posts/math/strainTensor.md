---
title: "[For Beginners] Green Strain Tensor and Infinitesimal Strain Tensor"
tags: [Continuum Mechanics, Green Strain Tensor, Strain Tensor]
categories: [Math]
mathPosts: true
toc: true
date: 2021-01-26
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1633249313/NabeBlog/deform_image_vsmkpc.webp"
---

## Introduction

In this article, to explicitly distinguish vectors and matrices, matrix A is denoted by $\left[A\right]$ and vector A by $\\{A\\}$, using `[]` and `{}` accordingly. Also, **to avoid overwhelming beginners, I do not introduce the Lagrangian and Eulerian formulations**.

This article only gives a brief introduction to Green strain tensor. If you want details, please refer to references such as the one below[^1][^2].

{{<amazon asin="4785310685" title="Tensor: For Science and Engineering">}}
{{<amazon asin="4339043400" title="Fundamentals of Continuum Mechanics">}}

## Motivation for Writing This Article

I had opportunities to study continuum mechanics (especially solid mechanics) over the last couple of years, but mostly because of Einstein summation notation, I found it very difficult.

Of course, I understand the importance of conveying concepts exactly as defined in mathematically efficient form. However, I do not think very strict definitions and highly abstract explanations are always effective for deepening beginners' understanding.

As a way to address this, although it takes more time, I felt it is necessary to **concretely connect beginners' familiar stress/strain concepts and matrix/vector operations to tensor operations** (in fact, this is how I was finally able to understand various tensor topics).

So in this article, as one example, I focus on the defining equation of Green strain tensor and try to make these concepts easier to grasp by following the definition while going through more concrete matrix/vector calculations[^2].

## What Is Green Strain Tensor?

The official JSME site explains Green strain tensor, which is important for finite deformation (large deformation) concepts.

- [Mechanical Engineering Dictionary: Green Strain Tensor](https://www.jsme.or.jp/jsme-medwiki/07:1003375)
- [Mechanical Engineering Dictionary: Finite Deformation](https://www.jsme.or.jp/jsme-medwiki/07:1012904)

In reference [^1], Green strain tensor is defined using position vectors before movement $\boldsymbol{\it{A}}, \boldsymbol{\it{B}}$ and after movement $\boldsymbol{\it{A'}}, \boldsymbol{\it{B'}}$ as follows[^3].

\begin{equation}
\boldsymbol{A'}\cdot\boldsymbol{B'}-\boldsymbol{A}\cdot\boldsymbol{B}=\rm{2\it{E_{ij}}\it{A_{i}}\it{B_{j}}}\\\\\
\end{equation}

If explained strictly by definition, this is a neat expression. But if a beginner just looks at this equation, it may only feel like "some hard matrix calculation written with hard subscripts (summation notation)."

## Something Like a Derivation of Green Strain Tensor

First, consider the case shown below where position vector $\\{A\\}$ becomes vector $\\{A'\\}$ by displacements $u, v, w$[^4]. Let vector $\\{A\\}$ be represented by Eq. (2).

\begin{equation}
\\{A\\}=
\begin{Bmatrix}\rm{d}x\\\\ \rm{d}y\\\\ \rm{d}z\end{Bmatrix}
\end{equation}

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1630548808/NabeBlog/deform_image_qhxczd.svg" alt="deformation">}}

Next, compute the following[^5].

\begin{equation}
\\{A'\\}\cdot\\{A'\\}-\\{A\\}\cdot\\{A\\}
\end{equation}

In this calculation, use that vector $\\{A'\\}$ can be expressed with displacement gradient tensor $\left[ \it{F}\rm~\right]$ and $\\{A\\}$ as

\begin{equation}
\\{A'\\}=\\{A\\}+\left[ \it{F}\rm~\right]\\{A\\}=\begin{Bmatrix}\rm{d}x\\\\ \rm{d}y\\\\ \rm{d}z\end{Bmatrix}+
\begin{bmatrix}
\frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} & \frac{\partial u}{\partial z} \\\\\\
\frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} & \frac{\partial v}{\partial z} \\\\\\
\frac{\partial w}{\partial x} & \frac{\partial w}{\partial y} & \frac{\partial w}{\partial z}
\end{bmatrix}\begin{Bmatrix}\rm{d}x\\\\ \rm{d}y\\\\ \rm{d}z\end{Bmatrix}
\end{equation}

Extracting and calculating the first term in Eq. (3):

\begin{eqnarray}
\\{A'\\}\cdot\\{A'\\} &=& \\{A'\\}^{\mathrm{ T }}\\{A'\\}\nonumber\\\\\[ 5pt ]
&=& \left(\\{A\\}^{\mathrm{ T }}+\\{A\\}^{\mathrm{ T }}\left[ \it{F}\rm~\right]^{\mathrm{ T }}\right)\left(\\{A\\}+\left[ \it{F}\rm~\right]\\{A\\}\right)\nonumber\\\\\[ 5pt ]
&=& \\{A\\}\cdot\\{A\\}+\\{A\\}^{\mathrm{ T }}\left(\left[ \it{F}\rm~\right]+\left[ \it{F}\rm~\right]^{\mathrm{ T }}+\left[ \it{F}\rm~\right]^{\mathrm{ T }}\left[ \it{F}\rm~\right]\right)\\{A\\}
\end{eqnarray}

Using Eq. (5), Eq. (3) becomes

\begin{equation}
\\{A'\\}\cdot\\{A'\\}-\\{A\\}\cdot\\{A\\} = \\{A\\}^{\mathrm{ T }}\left(\left[ \it{F}\rm~\right]+\left[ \it{F}\rm~\right]^{\mathrm{ T }}+\left[ \it{F}\rm~\right]^{\mathrm{ T }}\left[ \it{F}\rm~\right]\right)\\{A\\}
\end{equation}

Now, if we set $\\{A\\}=\\{B\\}$ in Eq. (1), we obtain the same form as Eq. (6), and we see that the term sandwiched by $\\{A\\}^{\mathrm{ T }}$ and $\\{A\\}$ is twice the Green strain tensor ($2\left[E\right]$). Therefore,

\begin{eqnarray}
2\left[E\right]&=&\left[ \it{F}\rm~\right]+\left[ \it{F}\rm~\right]^{\mathrm{ T }}+\left[ \it{F}\rm~\right]^{\mathrm{ T }}\left[ \it{F}\rm~\right]\nonumber\\\\\[ 5pt ]
&=&
\begin{bmatrix}
\frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} & \frac{\partial u}{\partial z} \\\\\\
\frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} & \frac{\partial v}{\partial z} \\\\\\
\frac{\partial w}{\partial x} & \frac{\partial w}{\partial y} & \frac{\partial w}{\partial z}
\end{bmatrix}+
\begin{bmatrix}
\frac{\partial u}{\partial x} & \frac{\partial v}{\partial x} & \frac{\partial w}{\partial x}\\\\\
\frac{\partial u}{\partial y} & \frac{\partial v}{\partial y} & \frac{\partial w}{\partial y} \\\\\\
\frac{\partial u}{\partial z} & \frac{\partial v}{\partial z} & \frac{\partial w}{\partial z}
\end{bmatrix}+
\begin{bmatrix}
\frac{\partial u}{\partial x} & \frac{\partial v}{\partial x} & \frac{\partial w}{\partial x}\\\\\
\frac{\partial u}{\partial y} & \frac{\partial v}{\partial y} & \frac{\partial w}{\partial y} \\\\\\
\frac{\partial u}{\partial z} & \frac{\partial v}{\partial z} & \frac{\partial w}{\partial z}
\end{bmatrix}
\begin{bmatrix}
\frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} & \frac{\partial u}{\partial z} \\\\\\
\frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} & \frac{\partial v}{\partial z} \\\\\\
\frac{\partial w}{\partial x} & \frac{\partial w}{\partial y} & \frac{\partial w}{\partial z}
\end{bmatrix}\nonumber\\\\\[ 5pt ]
&=&
\begin{bmatrix}
2\frac{\partial u}{\partial x} & \frac{\partial u}{\partial y}+\frac{\partial v}{\partial x} & \frac{\partial u}{\partial z}+\frac{\partial w}{\partial x} \\\\\\
\frac{\partial v}{\partial x}+\frac{\partial u}{\partial y} & 2\frac{\partial v}{\partial y} & \frac{\partial v}{\partial z}+\frac{\partial w}{\partial y} \\\\\\
\frac{\partial w}{\partial x}+\frac{\partial v}{\partial z} & \frac{\partial w}{\partial y}+\frac{\partial v}{\partial z} & 2\frac{\partial w}{\partial z}
\end{bmatrix}+
\begin{bmatrix}
\left(\frac{\partial u}{\partial x}\right)^2+\left(\frac{\partial v}{\partial x}\right)^2+\left(\frac{\partial w}{\partial x}\right)^2
& \frac{\partial u}{\partial x}\frac{\partial u}{\partial y}+\frac{\partial v}{\partial x}\frac{\partial v}{\partial y}+\frac{\partial w}{\partial x}\frac{\partial w}{\partial y}
& \frac{\partial u}{\partial x}\frac{\partial u}{\partial x}+\frac{\partial v}{\partial x}\frac{\partial v}{\partial z}+\frac{\partial w}{\partial x}\frac{\partial w}{\partial z} \\\\\\
\frac{\partial u}{\partial y}\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}\frac{\partial v}{\partial x}+\frac{\partial w}{\partial y}\frac{\partial w}{\partial x}
&\left(\frac{\partial u}{\partial y}\right)^2+\left(\frac{\partial v}{\partial y}\right)^2+\left(\frac{\partial w}{\partial y}\right)^2
& \frac{\partial u}{\partial y}\frac{\partial u}{\partial z}+\frac{\partial v}{\partial y}\frac{\partial v}{\partial z}+\frac{\partial w}{\partial y}\frac{\partial w}{\partial z} \\\\\\
\frac{\partial u}{\partial z}\frac{\partial u}{\partial x}+\frac{\partial v}{\partial z}\frac{\partial v}{\partial x}+\frac{\partial w}{\partial z}\frac{\partial w}{\partial x} & \frac{\partial u}{\partial z}\frac{\partial u}{\partial y}+\frac{\partial v}{\partial z}\frac{\partial v}{\partial y}+\frac{\partial w}{\partial z}\frac{\partial w}{\partial y}
& \left(\frac{\partial u}{\partial z}\right)^2+\left(\frac{\partial v}{\partial z}\right)^2+\left(\frac{\partial w}{\partial z}\right)^2
\end{bmatrix}
\end{eqnarray}

Then multiplying both sides of Eq. (7) by 1/2 and expressing with summation notation gives the Green strain tensor often seen in textbooks[^6] $(i, j, p = 1, 2, 3)$.

\begin{equation}
E_{ij}=\frac{1}{2}\left(\nabla_{i}u_{j}+\nabla_{j}u_{i}+\nabla_{i}u_{p}\nabla_{j}u_{p}\right)
\end{equation}

## Derivation of Infinitesimal Strain Tensor

By neglecting the second-order and higher terms (nonlinear terms) of the Green strain tensor, the infinitesimal strain tensor $[\varepsilon], \varepsilon_{ij}$ is obtained. These are summarized in Eq. (9), and Eq. (10) using summation notation.

\begin{eqnarray}
[\varepsilon]&=&\frac{1}{2}\begin{bmatrix}
2\frac{\partial u}{\partial x} & \frac{\partial u}{\partial y}+\frac{\partial v}{\partial x} & \frac{\partial u}{\partial z}+\frac{\partial w}{\partial x} \\\\\\
\frac{\partial v}{\partial x}+\frac{\partial u}{\partial y} & 2\frac{\partial v}{\partial y} & \frac{\partial v}{\partial z}+\frac{\partial w}{\partial y} \\\\\\
\frac{\partial w}{\partial x}+\frac{\partial v}{\partial z} & \frac{\partial w}{\partial y}+\frac{\partial v}{\partial z} & 2\frac{\partial w}{\partial z}
\end{bmatrix}\\\\\[ 5pt ]
\varepsilon_{ij}&=&\frac{1}{2}\left(\nabla_{i}u_{j}+\nabla_{j}u_{i}\right)
\end{eqnarray}

Therefore, each component of infinitesimal strain tensor consists of normal strain (engineering strain) and half of shear strain.

## Update (2022/1/2)

I found material that explains Green strain tensor (and Almansi strain tensor) with a similar approach, so I introduce it here.

- Enjoying Mechanics of Materials, 2019 Session 1(N/A)

This material also discusses two points not covered in this article: _expressions in Lagrangian and Eulerian formulations, and Almansi strain tensor_. It may still be difficult for beginners, but is relatively readable. Also, in that material, $\\{A\\}$ and $\\{A'\\}$ used here correspond to $\rm{d}\it{p}$ and $\rm{d}\boldsymbol{P}$.

## Summary

In my case, I was finally able to understand the concept of strain tensor through concrete matrix calculations like those explained here. At the same time, I also understood how convenient and compact calculations with summation notation are.

If I ever teach this topic, I would probably recommend doing this kind of matrix calculation at least once (even though it takes time), and then start using summation notation after learners get somewhat familiar.

By the way, this article only gives the minimum explanation needed to understand basic tensor concepts. These tensors have many other interesting properties, so if you are interested, please look into various references.

[^1]: Shigeru Ishihara, Tensor - For Science and Technology, Shokabo (2011), pp. 117 - pp. 122.

[^2]: Some expressions may be mathematically rough. The aim is to first understand the concept of strain tensor, so I would appreciate a warm reading. Corrections and comments are always welcome via DM on Twitter, etc.

[^3]: Since this is quoted from a reference, vector and matrix expressions follow that text.

[^4]: It may be easiest to think of coordinates in a body moving due to displacement.

[^5]: I omit explanation of why this expression suddenly appears. If unclear, refer to pp. 121-122 of the reference, or search with keywords like "vector inner product normal strain relation".

[^6]: As a brief note, correspondence is like $\nabla_{1}=\frac{\partial}{\partial x}, u_{2}=v$. See p. 120 of the reference for details.
