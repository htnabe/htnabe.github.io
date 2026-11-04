---
title: "Euler's Equation of Motion and Cauchy's Equation of Motion [For Beginners]"
tags:
  [
    Continuum Mechanics,
    Solid Mechanics,
    Equation of Motion,
    Euler's First Law of Motion,
    Euler's Second Law of Motion,
    Cauchy's Equation of Motion,
    Equilibrium Equation,
  ]
categories: [Math]
mathPosts: true
toc: true
date: 2022-01-10T21:09:13+09:00
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E9%96%89%E5%B1%80%E9%9D%A2_%E8%A1%A8%E9%9D%A2%E5%8A%9B_%E7%89%A9%E4%BD%93%E5%8A%9B_gkibvd.webp"
---

## Introduction

In this article, I cover `Euler's first law of motion` and `Euler's second law of motion`, which describe the equation of motion and angular equation of motion for a continuum, and also explain the relationship between `Cauchy's equation of motion` and the `equilibrium equation`.

This article is written for readers who already understand the content of the [previous article]({{< relref "stressTensor.md" >}}).

Also, to explicitly distinguish vectors and matrices, I use $\left[A\right]$ for matrix A and $\\{A\\}$ for vector A, i.e., `[]` and `{}` are used differently. In addition, to simplify the discussion, volume moment (body couple) is neglected from the beginning.

If you want more detail, please refer to references such as those below.

{{<amazon asin="4785310685" title="Tensor: For Science and Engineering">}}
{{<amazon asin="4339043400" title="Fundamentals of Continuum Mechanics">}}

## Stress Vector, Surface Force, and Body Force

When considering forces acting on a continuum or its motion, we need to consider surface force and body force. A concise explanation is as follows.

- Body force: force per unit mass or unit volume, such as gravity or electromagnetic force
- Surface force: force per unit area acting through a surface, corresponding to stress

Focusing on surface force, consider an infinitesimal area element $\Delta S$ to show how this force is connected to the stress vector.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E5%BE%AE%E5%B0%8F%E9%9D%A2%E7%A9%8D%E8%A6%81%E7%B4%A0_qobxre.webp" alt="Direction of force">}}

Let the direction indicated by normal vector $\\{n\\}$ of $\Delta S$ be positive, and let the force acting in the negative direction be $\Delta \\{f\\}$. Then the surface force $\\{t\\}$, called the _stress vector_, is defined as follows[^1].
\begin{equation}
\\{t\\}= \lim_{\Delta S \to 0} \frac{\Delta \\{f\\}}{\Delta S} = \frac{d\\{f\\}}{ds}
\end{equation}

## Euler's First Law of Motion

Consider the volume $V$ under body and surface forces, and an infinitesimal volume element $dV$ inside it, as shown below.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1642318422/NabeBlog/%E9%96%89%E5%B1%80%E9%9D%A2_%E8%A1%A8%E9%9D%A2%E5%8A%9B_%E7%89%A9%E4%BD%93%E5%8A%9B_gkibvd.webp" alt="Closed surface">}}

Let the volume, velocity, and density of this continuum at time $t$ be $V(t), v, \rho$, respectively. From the definition of momentum, momentum $\\{P\\}$ of the continuum is[^1]
\begin{equation}
\\{P\\} = \int_V \rho\\{v\\} dV
\end{equation}

Only body and surface forces act in this region $V$. If $\\{K\\}$ is body force per unit mass, the total body force acting on $V(t)$ is[^1]
\begin{equation}
\int_V \rho\\{K\\} dV
\end{equation}

Similarly for surface force, using surface area $S$ of $V$ and infinitesimal area $\Delta S$, the total surface force acting on the entire volume element is[^1]
\begin{equation}
\int_S \\{t\\} dS
\end{equation}

From Eq. (2), (3), and (4), the continuum equation of motion, called _Euler's first law of motion_, is[^1]
\begin{eqnarray}
\frac{D}{Dt}\int_V \rho\\{v\\} dV = \int_V \rho\\{K\\} dV + \int_S \\{t\\} dS\nonumber\\\\\[ 5pt ]
\int_V \rho\\{a\\} dV = \int_V \rho\\{K\\} dV + \int_S \\{t\\} dS
\end{eqnarray}

## Euler's Second Law of Motion

Angular momentum $\\{H\\}$ of the infinitesimal volume above is given by[^1]. Here vector multiplication means cross product.
\begin{eqnarray}
\\{H\\} &=& \\{r\\}\times\\{P\\} \nonumber\\\\\[ 5pt ]
&=& \int_V \rho \\{r\\}\times\\{v\\} dV
\end{eqnarray}

Thus, using Eq. (5), the angular equation of motion for the continuum is[^1]
\begin{equation}
\int_V \rho\\{r\\}\times\\{a\\} dV = \int_V \rho\\{r\\}\times\\{K\\} dV + \int_S \\{r\\}\times\\{t\\} dS
\end{equation}

## Cauchy's Equation of Motion

Cauchy's equation of motion is essentially the same as Euler's first law of motion. Its features are that it uses the stress tensor and is expressed in differential form.

First, Cauchy's stress relation can be written using stress vector $\\{t\\}$, stress tensor $\left[\sigma\right]$, and unit normal vector $\\{n\\}$ as
\begin{equation}
\\{t\\} = \left[\sigma\right]\\{n\\}
\end{equation}
Applying Gauss's divergence theorem during transformation,
\begin{eqnarray}
\int_S \\{t\\}dS &=& \int_S \left[\sigma\right]\\{n\\} dS \nonumber\\\\[ 5pt ]
&=& \int_S \left[\sigma\right]\\{dS\\} \nonumber\\\\[ 5pt ]
&=& \int_V \nabla\cdot\left[\sigma\right]dV
\end{eqnarray}
Substitute Eq. (9) into Eq. (5):
\begin{eqnarray}
\int_V \rho\\{a\\} dV &=& \int_V \\\\nabla\cdot\left[\sigma\right] dV + \int_V \rho \\{K\\} dV \nonumber\\\\[ 5pt ]
&=& \int_V \bigl(\nabla\cdot\left[\sigma\right] + \rho \\{K\\} \bigr)dV
\end{eqnarray}
As a result, Cauchy's equation of motion is obtained from Eq. (10):
\begin{equation}
\rho\\{a\\} = \nabla\cdot\left[\sigma\right]+ \rho \\{K\\}
\end{equation}

## Equilibrium Equation

The equilibrium equation is obtained by removing the acceleration term from Cauchy's equation of motion. Specifically, it represents a state where _both the forces and moments acting on the continuum are balanced_.

There are several ways to express the equilibrium equation. Here we remove the acceleration term from Cauchy's equation above, giving
\begin{equation}
\nabla\cdot\left[\sigma\right]+ \rho \\{K\\} = 0
\end{equation}

## Closing

Next time, I will explain why the stress tensor becomes a symmetric tensor and the assumptions under which it can be represented as a symmetric tensor.

[^1]: Kiyoji Nakamura and Noriyasu Mori, Fundamentals of Continuum Mechanics, Corona Publishing (2012), pp. 96 - pp. 97.
