---
title: "Comparing Bernoulli-Euler Beam and Timoshenko Beam Theory (Theory)"
date: 2022-06-07T13:56:55+09:00
tags: [Continuum Mechanics, Mechanics of Materials, Beam Theory]
categories: [Math]
mathPosts: true
toc: true
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1654582010/NabeBlog/beam_inifinitesimal_element_fmo4yi.webp"
---

## Introduction

I recently had a chance to study Timoshenko beam theory. Since I could not find many concise explanations, I decided to write one myself. To understand it more completely, I compare it with Bernoulli-Euler beam theory.

Some derivations are omitted in this article, so please refer to the literature below for details.

{{< amazon asin="4254231350" title="Elasticity Handbook" >}}
{{< amazon asin="425423144X" title="Learn Mechanics of Materials Enjoyably" >}}

### Update

As a concrete calculation example, I computed the natural angular frequencies of a beam using both methods on the page below. If you want not only theory but also a numerical example, please check it out.
[Comparison of Bernoulli-Euler Beam and Timoshenko Beam (Calculation)]({{< relref "./compare-be-tim-beam-theory.md" >}})

## What Is Timoshenko Beam Theory?

Unlike Bernoulli-Euler beam theory, which is commonly taught in undergraduate mechanics of materials, Timoshenko beam theory calculates beam displacement while considering shear force effects. A precise definition is available [here](https://www.jsme.or.jp/jsme-medwiki/01:1008191).

When considering beam vibration using Timoshenko beam theory, rotational inertia associated with rotation due to bending moment must also be considered. This is another key difference from Bernoulli-Euler beam theory.

## Transverse Vibration Equations in Each Theory

For the infinitesimal beam element shown below, we derive the transverse vibration equations using both Bernoulli-Euler beam theory and Timoshenko beam theory. For simplicity, assume a homogeneous beam with a uniform cross-section.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1654582010/NabeBlog/beam_inifinitesimal_element_fmo4yi.webp" alt="Infinitesimal_beam_element">}}

The variables used in the derivation represent the following physical quantities:

{{<table "table">}}

|     Symbol      | Description                                |  Symbol   | Description                             |
| :-------------: | ------------------------------------------ | :-------: | --------------------------------------- |
|    $Q(x, t)$    | Shear force                                | $M(x, t)$ | Bending moment                          |
|    $q(x, t)$    | Arbitrary distributed load per unit length |   $dx$    | Infinitesimal length along the $x$-axis |
|       $E$       | Young's modulus                            |   $\nu$   | Poisson's ratio                         |
|       $G$       | Shear modulus                              |  $\rho$   | Density                                 |
|       $A$       | Cross-sectional area                       |
| $\theta (x, t)$ | Deflection angle                           | $w(x, t)$ | Deflection                              |
{{</table>}}
### Bernoulli-Euler Beam

Bernoulli-Euler beam theory refers to the standard beam deformation theory used in mechanics of materials, and as the name indicates, it relies on the [Bernoulli-Euler assumptions](https://www.jsme.or.jp/jsme-medwiki/07:1011885).

This theory is relatively straightforward, so I omit part of the explanation. For detailed derivations, see references such as [^1].

First, the equation of motion for an infinitesimal element is

\begin{equation}
\rho Adx\frac{\partial^2w}{\partial t^2}=\frac{\partial Q}{\partial x}dx+qdx
\end{equation}

Using

\begin{equation}
Q=\frac{\partial M}{\partial x},\ M=-EI\frac{\partial\theta}{\partial x},\ \theta=\frac{\partial w}{\partial x}
\end{equation}

to transform Eq. (1), we obtain

\begin{eqnarray}
\rho A\frac{\partial^2w}{\partial t^2}&=&\frac{\partial}{\partial x}\left(\frac{\partial M}{\partial x}\right)+q\nonumber\\\\
&=&\frac{\partial^2}{\partial x^2}\left(-EI\frac{\partial\theta}{\partial x}\right)+q=-EI\frac{\partial^3}{\partial x^3}\left(\frac{\partial w}{\partial x}\right)+q\\\\
\end{eqnarray}

Collecting terms, the final transverse vibration equation becomes

\begin{equation}
\frac{\rho A}{EI}\frac{\partial^2w}{\partial t^2}+\frac{\partial^4w}{\partial x^4}=\frac{q}{EI}
\end{equation}

[^2].

### Timoshenko Beam Theory

To derive the transverse vibration equation for a Timoshenko beam, it is important to understand what shear deformation looks like. The figure below shows a shearing beam.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1654584033/NabeBlog/beam_shear_deformation_q7erzi.webp" alt="beam_shear_deformation">}}

To see why this deformation occurs, it helps to subdivide segment AB into even smaller elements.

If segment AB is divided into infinitesimal elements of height $dy$, each element undergoes shear deformation due to shear stress $\tau$. On the other hand, deformation near points A and B is very small, so segment AB deforms in a wavy manner overall.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1654584501/NabeBlog/beam_shear_deformation_detail_jxhcot.webp" alt="beam_shear_defromation_detail">}}

The page below may also help clarify why this happens.
{{< blogcard url="https://kenchik.info/2020/09/30/sendankeijyoukeisuu/" >}}

Taking such shear deformation into account, the derivation procedure for the transverse vibration equation in Timoshenko beam theory is as follows.

1. Convert nonlinearly distributed shear strain into uniformly distributed shear strain.
2. Derive the equation of motion for an infinitesimal volume.
3. Derive the moment equilibrium equation including rotational inertia.
4. Derive the transverse vibration equation from the equation of motion, the bending moment equation, and the moment equilibrium equation.

Also define the following new variables:

{{<table "table">}}

| Variable          | Description                                         | Variable          | Description                                           |
| ----------------- | --------------------------------------------------- | ----------------- | ----------------------------------------------------- |
| $\theta_0$, $w_0$ | Deflection angle and deflection due to shear force  | $\theta_1$, $w_1$ | Deflection angle and deflection due to bending moment |
| $I$               | Second moment of area                               | $\kappa$          | Shear correction factor                               |
| $\gamma_0$        | Strain or deflection angle due to shear deformation |
{{</table>}}
Apply the following assumption[^2] to the bending moment $M$:

> Even when the deflection curve changes with time, the relationship between bending moment and radius of curvature is the same as in the static loading case. Therefore,

\begin{equation}
M=-EI\frac{\partial\theta_1}{\partial x}
\end{equation}

#### [Converting Nonlinear Shear Strain to Uniform Shear Strain]

Approximate the originally non-uniform shear strain by a uniformly distributed strain. Specifically, simplify the cross-section deformed as shown on the left side of the figure below into the form on the right.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1654586359/NabeBlog/simplify_deformation_osgcea.webp" alt="Simplify_deformation">}}

In this process, the shear correction factor $\kappa$ is obtained. For derivation of $\kappa$, see [here](https://www.jstage.jst.go.jp/article/aijs/84/762/84_1065/_pdf). Specifically, $\kappa$ is expressed as[^3]

\begin{equation}
\kappa=\frac{\gamma_0AG}{Q}
\end{equation}

#### [Deriving the Equation of Motion for an Infinitesimal Volume]

For the Timoshenko beam, the equation of motion is the same as Eq. (1). Therefore,

\begin{equation}
\rho Adx\frac{\partial^2w}{\partial t^2}=\frac{\partial Q}{\partial x}dx+qdx\nonumber
\end{equation}

#### [Deriving Moment Equilibrium Including Rotational Inertia]

When considering moment equilibrium, rotational inertia associated with rotation caused by bending moment must be included.

At this point, a natural question is: "Doesn't shear force also cause rotational motion?" However, rotational motion of an infinitesimal element is generated only by bending moment $M$.

For example, consider a beam subjected to a concentrated load or a bending moment as shown below. In this case, shear force $Q$ and shear strain $\gamma$ are as shown in the figure, and although each beam element deforms due to shear force, it does not undergo rotational motion[^4].

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1654587591/NabeBlog/shear_force_stress_w47icz.webp" alt="shear_force_stress">}}

Based on this, derive moment equilibrium using the relation between moment of inertia and second moment of area:

\begin{equation}
\frac{\partial M}{\partial x}dx-2Q\frac{dx}{2}-\frac{\partial Q}{\partial x}dx\frac{dx}{2}+\rho Idx\frac{\partial^2\theta_1}{\partial t^2}=0
\end{equation}

As noted above, rotational motion is not induced by shear force, so the rotational inertia term can be expressed only with $\theta_1$. Also, the moment due to distributed load $q(x, t)$ acting on the infinitesimal beam element is assumed negligible.

Since the third term on the left of Eq. (7) is small compared with the other terms, neglecting it and rearranging gives

\begin{equation}
Q=\frac{\partial M}{\partial x}+\rho I\frac{\partial^2\theta_1}{\partial t^2}
\end{equation}

[^2].

#### [Deriving the Transverse Vibration Equation from the Equation of Motion, Bending Moment Equation, and Moment Equilibrium]

For deformation of an infinitesimal beam element, the deflection angle due to shear force $\theta_0$ is

\begin{equation}
\theta_0=\frac{\partial w_0}{\partial x}=\frac{\kappa Q}{AG}
\end{equation}

[^2]. Since `(deflection angle due to bending moment) = (total deflection angle) - (deflection angle due to shear force)`,

\begin{equation}
\theta_1=\frac{\partial w}{\partial x}-\theta_0=\frac{\partial w}{\partial x}-\frac{\kappa Q}{AG}
\end{equation}

holds[^2]. From Eq. (8) and Eq. (10), the moment equilibrium equation in terms of deflection is

\begin{equation}
Q=\frac{\partial M}{\partial x}+\rho I\frac{\partial^2}{\partial t^2}\left(\frac{\partial w}{\partial x}-\frac{\kappa Q}{AG}\right)=\frac{\partial M}{\partial x}+\rho I\left(\frac{\partial^3w}{\partial x\partial t^2}-\frac{\kappa}{AG}\frac{\partial^2Q}{\partial t^2}\right)
\end{equation}

Also, from Eq. (1) and Eq. (11), the equation of motion in terms of deflection is

\begin{equation}
\rho A\frac{\partial^2w}{\partial t^2}=\frac{\partial}{\partial x}\left\\{\frac{\partial M}{\partial x}+\rho I\left(\frac{\partial^3w}{\partial x\partial t^2}-\frac{\kappa}{AG}\frac{\partial^2Q}{\partial t^2}\right)\right\\}+q
\end{equation}

From Eq. (5) and Eq. (10),

\begin{equation}
M=-EI\frac{\partial\theta_1}{\partial x}=-EI\left(\frac{\partial^2w}{\partial x^2}-\frac{\kappa}{AG}\frac{\partial Q}{\partial x}\right)
\end{equation}

and from Eq. (1),

\begin{equation}
\frac{\partial Q}{\partial x}=\rho A\frac{\partial^2w}{\partial t^2}-q
\end{equation}

so from Eq. (13) and Eq. (14),

\begin{equation}
M=-EI\left(\frac{\partial^2w}{\partial x^2}-\frac{\rho\kappa}{G}\frac{\partial^2w}{\partial t^2}-\frac{\kappa}{AG}q\right)
\end{equation}

From Eq. (12) and Eq. (15),

\begin{equation}
\rho A\frac{\partial^2w}{\partial t^2}=-EI\left(\frac{\partial^4w}{\partial x^4}-\frac{\rho\kappa}{G}\frac{\partial^4w}{\partial t^2\partial x^2}-\frac{\kappa}{AG}\frac{\partial^2q}{\partial x^2}\right)+\rho I\left(\frac{\partial^4w}{\partial x^2\partial t^2}-\frac{\kappa}{AG}\frac{\partial^3Q}{\partial x\partial t^2}\right)+q
\end{equation}

Also, from Eq. (14),

\begin{equation}
\frac{\partial^3Q}{\partial x\partial t^2}=\rho A\frac{\partial^4w}{\partial t^4}-\frac{\partial^2q}{\partial t^2}
\end{equation}

Substituting this into Eq. (16) and rearranging gives

\begin{equation}
\frac{\partial^4w}{\partial x^4}+\frac{\rho^2\kappa}{GE}\frac{\partial^4w}{\partial t^4}-\frac{\rho}{E}\left(1+\frac{\kappa E}{G}\right)\frac{\partial^4w}{\partial x^2\partial t^2}+\frac{\rho A}{EI}\frac{\partial^2w}{\partial t^2}=\frac{\kappa}{AG}\frac{\partial^2q}{\partial x^2}-\frac{\kappa\rho}{EAG}\frac{\partial^2q}{\partial t^2}+\frac{q}{EI}
\end{equation}

Since the distributed load $q(x, t)$ on the right-hand side is arbitrary, let

\begin{equation}
\frac{\kappa}{AG}\frac{\partial^2q}{\partial x^2}-\frac{\kappa\rho}{EAG}\frac{\partial^2q}{\partial t^2}+\frac{q}{EI}=\frac{q\prime}{EI}\nonumber
\end{equation}

Then the transverse vibration equation in Timoshenko beam theory is[^2]

\begin{equation}
\frac{\partial^4w}{\partial x^4}+\frac{\rho^2\kappa}{GE}\frac{\partial^4w}{\partial t^4}-\frac{\rho}{E}\left(1+\frac{\kappa E}{G}\right)\frac{\partial^4w}{\partial x^2\partial t^2}+\frac{\rho A}{EI}\frac{\partial^2w}{\partial t^2}=\frac{q\prime}{EI}
\end{equation}

The derivation was a bit long, but the transverse vibration equations differ substantially between Bernoulli-Euler beam theory (Eq. (4)) and Timoshenko beam theory (Eq. (19)).

## Summary

In Timoshenko beam theory, considering shear deformation invalidates part of the Euler-Bernoulli assumptions. Also, when dealing with dynamics such as vibration analysis, rotational inertia must be handled carefully.

It would be interesting to apply suitable boundary conditions and test how much the frequencies differ between the two theories (not sure yet whether I will do it).

[^1]: Fumio Narita, Takuya Morimoto, Tsuyoshi Murasawa, "Learn Mechanics of Materials Enjoyably", Asakura Publishing (2017).

[^2]: Ichiro Nakahara, Juichi Shibuya, Eiichiro Tsuchida, Hideaki Kasano, Tomoaki Tsuji, Hirotsugu Inoue, "Elasticity Handbook", Asakura Publishing (2012), pp. 509 - pp. 511.

[^3]: Kenichi Onosato, "Study on Shape Coefficients for Obtaining Shear Deformation", Journal of Structural and Construction Engineering, Architectural Institute of Japan, Vol.84, No.762.

[^4]: For details, see [here](https://www.akashi.ac.jp/miyoshi/str_eng/Theme04/%E6%9B%B2%E3%81%92%E5%A4%89%E5%BD%A2%E3%81%A8%E3%81%9B%E3%82%93%E6%96%AD%E5%A4%89%E5%BD%A2_%E5%89%8D%E7%B7%A8.pdf).
