---
title: "Comparison of Bernoulli-Euler Beam and Timoshenko Beam (Calculation)"
date: 2022-06-14T20:52:25+09:00
tags: [Continuum Mechanics, Mechanics of Materials, Beam Theory]
categories: [Math]
mathPosts: true
toc: true
draft: false
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1656756850/NabeBlog/bo_tim_omega_hqrz1s.webp"
---

## Introduction

This article continues from the previous one and aims to **investigate the difference between Bernoulli-Euler beam and Timoshenko beam through actual calculations**. The previous article is [here]({{< relref "EB-T-beam-method.md" >}}).

Some explanations are omitted in this article, so please refer to the following references for details.

{{<amazon asin="4254231350" title="Elasticity Handbook">}}
{{<amazon asin="4627910711" title="Industrial Vibration, 2nd Edition">}}

### Note

In the previous article, we considered the case where an arbitrary distributed load $q(x, t)$ acts on the beam. However, ~~solving that is cumbersome~~ since this article focuses on a simple comparison of the two theories, we consider $q(x, t)=0$, i.e., free vibration.

The analysis method for forced vibration with $q(x, t)\ne0$ is described in reference [^1].

### Beam Conditions

We consider a beam simply supported at both ends, as shown below.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1656757774/NabeBlog/natural_freq_calculate_condition_ql9ats.webp" alt="beam">}}

## Bernoulli-Euler Beam

From the previous article, the transverse vibration equation for a Bernoulli-Euler beam is

\begin{equation}
\frac{\rho A}{EI}\frac{\partial^2w}{\partial t^2}+\frac{\partial^4w}{\partial x^4}=0
\end{equation}

There are several ways to represent the solution, but here we follow the method in reference [1][^1]. As seen from Eq. (1), it is solvable by separation of variables, so assume displacement $w(x, t)$ as

\begin{equation}
w = W(x)T(t)
\end{equation}

Then Eq. (1) becomes

\begin{equation}
-\frac{1}{T}\frac{\partial^2T}{\partial t^2}=
\frac{EI}{\rho AW}\frac{\partial^4 W}{\partial x^4}
\end{equation}

For both sides of Eq. (3) to be equal, they must be constant. Let this constant be $C^2$:

\begin{equation}
\frac{\partial^2T}{\partial t^2} + C^2T = 0, \hspace{10pt}
EI\frac{\partial^4 W}{\partial x^4} - C^2\rho AW = 0
\end{equation}

Now set $T=e^{\lambda t}$ and substitute into the first equation of Eq. (4):

\begin{equation}
\lambda^2 e^{\lambda t} = -C^2 e^{\lambda t} \therefore \lambda = \pm iC
\end{equation}

Hence, the general solution of the first equation in Eq. (4), using constants $A', B', A, B$, is

\begin{equation}
T = A' e^{iCt} + B e^{-iCt}\nonumber\\\\
\therefore T = A \cos{Ct} + B \sin{Ct}
\end{equation}

Since $A = A' + B', \ B = i(A' - B')$, these include the imaginary unit $i$, but this is not a concern because $A, B$ are ultimately determined by boundary conditions.

For the second equation in Eq. (4), introduce $k^4=\rho A C^2/EI$:

\begin{equation}
\frac{\partial^4 W}{\partial x^4} - k^4 W = 0
\end{equation}

Also, with $W=e^{\lambda x}$,

\begin{equation}
\lambda^4 = k^4 \therefore \lambda = \pm k, \ \pm ik
\end{equation}

Thus, the general solution of the second equation in Eq. (4) is

\begin{eqnarray}
W &=& C_1 e^{kx} + C_2 e^{-kx} + C_3 e^{ikx} + C_4 e^{-ikx}\nonumber \\\\
&=& C_1 (\cosh{kx}+\sinh{kx}) + C_2(\cosh{kx}-\sinh{kx}) + C_3' \cos{kx} + C_4' \sin{kx}\nonumber \\\\
&=& C_1' \cosh{kx} + C_2' \sinh{kx} + C_3' \cos{kx} + C_4' \sin{kx}
\end{eqnarray}

### Boundary Conditions and Frequency Equation

Use Eq. (8) to obtain the frequency equation. The boundary condition is simply supported at both ends, so

\begin{equation}
W(0)=0, {\quad} \frac{\partial^2 W}{\partial x^2}(0)=0, {\quad}
W(l)=0, {\quad} \frac{\partial^2 W}{\partial x^2}(l)=0
\end{equation}

holds [^1], yielding the following four equations:

\begin{equation}
\left.
\begin{array}{ll}
C'\_1+C'\_3=0, {\quad} C'\_1-C'\_3=0\\\\
C'\_2\sinh{kl}+C'\_4\sin{kl}=0, {\quad} C'\_2\sinh{kl}-C'\_4\sin{kl}=0
\end{array}
\right\\}
\end{equation}

Using matrix/vector notation:

\begin{equation}
\begin{bmatrix}
\sinh{kl} & \sin{kl} \\\\
\sinh{kl} & -\sin{kl}
\end{bmatrix}
\left\\{
\begin{array}{cc}
C'\_2\\\\
C'\_4
\end{array}
\right\\}=
\left\\{
\begin{array}{cc}
0 \\\\
0
\end{array}
\right\\}
\end{equation}

For Eq. (11) to have a nontrivial solution where $C'_2, C'_4$ are not both zero, the matrix on the left must be non-invertible. Therefore,

\begin{equation}
\begin{vmatrix}
\sinh{kl} & \sin{kl} \\\\
\sinh{kl} & -\sin{kl}
\end{vmatrix}=0
\end{equation}

Rearranging gives the frequency equation:

\begin{equation}
\sin{kl}\sinh{kl}=0
\end{equation}

but since

\begin{equation}
\sinh{kl} = \frac{e^{kl}+e^{-kl}}{2} >0
\end{equation}

the frequency equation is ultimately [^1]

\begin{equation}
\sin{kl} = 0
\end{equation}

### Natural Angular Frequency and Mode Function

In Eq. (15), $l$ is the beam length, which is specified when computing concrete values. Solving Eq. (15) for $k$ gives

\begin{equation}
k_n=\frac{n\pi}{l} {\qquad}(n=1, 2, \cdots)
\end{equation}

[^1]. Recalling $k^4=\rho A C^2/EI$, the natural angular frequency $C_n(>0)$ is

\begin{equation}
C_n=\left(\frac{n\pi}{l}\right)^2\sqrt{\frac{EI}{\rho A}} {\qquad}(n=1, 2, \cdots)
\end{equation}

Substituting Eq. (15) into Eq. (10):

\begin{equation}
C'\_2\sinh{kl}=0 {\quad}\therefore C'\_2=0
\end{equation}

Thus the remaining $C_4$ can be arbitrary. For simplicity set $C_4=1$. Then the $n$-th mode function is [^1]

\begin{equation}
W_n(x)=\sin{\frac{n\pi}{l}x}{\qquad}(n=1, 2, \cdots)
\end{equation}

## Timoshenko Beam

When no arbitrary distributed load $q(x, t)$ acts, the transverse vibration equation for a Timoshenko beam is

\begin{equation}
\frac{\partial^4w}{\partial x^4}+\frac{\rho^2\kappa}{GE}\frac{\partial^4w}{\partial t^4}-\frac{\rho}{E}\left(1+\frac{\kappa E}{G}\right)\frac{\partial^4w}{\partial x^2\partial t^2}+\frac{\rho A}{EI}\frac{\partial^2w}{\partial t^2}=0
\end{equation}

Here, as before, assume simply supported boundaries and the $n$-th vibration mode as [^1] (the same assumption is also used in the energy method, so it seems reasonable):

\begin{equation}
w = \sin{\frac{n\pi x}{l}}\cos{\omega_n t}
\end{equation}

Substitute Eq. (21) into Eq. (20):

\begin{equation}
\frac{\rho^2 \kappa}{GE}{\omega_n}^4 - \left\\{\frac{\rho}{E}\left(1+\frac{\kappa E}{G}\right)\left(\frac{n\pi}{l}\right)^2 + \frac{\rho A}{EI}\right\\}{\omega_n}^2 + \left(\frac{n\pi}{l}\right)^4 = 0
\end{equation}

According to reference [^1], the ${\omega_n}^4$ term is usually small compared to the others and can be neglected. Then ${\omega_n}$ can be written as

\begin{equation}
\omega_n = \left(\frac{n\pi}{l}\right)^2\sqrt{\frac{EI}{\rho A}\frac{1}{1+\frac{I}{A}\left(1+\frac{\kappa E}{G}\right)\left(\frac{n\pi}{l}\right)^2}}
\end{equation}

As seen by comparing this with Eq. (17), the natural angular frequency of transverse vibration for the Timoshenko beam is always smaller than that for the Bernoulli-Euler beam.

Up to this point, we followed the reference and obtained natural angular frequency. For completeness, we also compute $\omega_n$ without neglecting the ${\omega_n}^4$ term in Eq. (22). From Eq. (22), let

\begin{eqnarray}
A &=& \frac{\rho^2 \kappa}{GE}\\\\
B &=& - \left\\{\frac{\rho}{E}\left(1+\frac{\kappa E}{G}\right)\left(\frac{n\pi}{l}\right)^2 + \frac{\rho A}{EI}\right\\}\\\\
C &=& \left(\frac{n\pi}{l}\right)^4
\end{eqnarray}

then

\begin{equation}
\omega_n = \sqrt{\frac{-B \pm \sqrt{B^2 - 4AC}}{2A}}
\end{equation}

## Numerical Calculation

For Bernoulli-Euler beam natural angular frequency, use Eq. (17). For Timoshenko beam natural angular frequency, use Eq. (23) and Eq. (27).

Denote each by $\omega_{bo}, \omega_{app}, \omega_{noApp+}, \omega_{noApp-}$. Here, `bo` stands for Bernoulli-Euler as-is, and `app`/`noapp` indicate whether the solution is approximate (approximation) or not. `+` and `-` correspond to the $\pm$ in Eq. (27).

The material is industrial pure iron, and calculation parameters are as follows [^2].
{{<table "table">}}

| Young's modulus $E$(GPa) | Shear modulus $G$(GPa) | Density $\rho$ (kg/$\text m^3$) | Length $l$ (m) | Width $b$ and thickness $a$ (m) | Shape factor $\kappa$ | Mode number $n$ |
| ------------------------ | ---------------------- | ------------------------------- | -------------- | ------------------------------- | --------------------- | --------------- |
| 205                      | 81                     | $7.9 \times 10^3$               | 1 ~ 10         | 1                               | 1.2                   | 1               |
{{</table>}}

Under these conditions, plot the natural angular frequency while varying length $l$ in steps of 0.1 m.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1656756850/NabeBlog/bo_tim_omega_hqrz1s.webp" alt="natural_frequency_graph">}}

From the figure, $\omega_{bo}$ and the Timoshenko approximate solution $\omega_{app}$ look almost identical up to around 5 [m]. On the other hand, for Timoshenko without approximation, $\omega_{noApp+}$ and $\omega_{noApp-}$ take values relatively different from $\omega_{bo}$ beyond about 3 [m].

I will also include the program for reference ~~it is a bit messy~~. The language is MATLAB (Octave is also fine).

```
clear;

E = 205 * 10^9;
G = 81 * 10^9;
r = 7.9 * 10^3;
l = 1:0.1:10;
h = a = 1;
A = h*a;
k = 1.2;
n = 1;
I = (h^3)*a/12;

o_bo = sqrt(E*I/(r*A)).*(n*pi./l).^2;
o_app = ((n*pi./l).^2).*sqrt((E*I/(r*A)).*(1./(1+(I/A)*(1+k*E/G).*(n*pi./l).^2)));

A1 = (k*r^2)/(G*E)
B1 = -(r/E)*((1+k*E/G).*(n*pi./l).^2 + r*A/(E*I));
C1 = (n*pi./l).^4;

o_noApp1 = sqrt((-B1 + sqrt(B1.^2 -4.*A1.*C1))./(2*A1));
o_noApp2 = sqrt((-B1 - sqrt(B1.^2 -4.*A1.*C1))./(2*A1));

y = [l.' o_bo.' o_app.' o_noApp1.' o_noApp2.'];
y = y.';
fileName = 'omega.dat';
fid = fopen(fileName, 'w');
fprintf(fid, '%f %15.14f %15.14f %15.14f %15.14f\n', y);
fclose(fid);

```

## Summary

In general, it is known that the difference between Timoshenko beam theory and Bernoulli-Euler beam theory becomes more pronounced as beam length decreases (due to shear effects). The graph shown here suggests the same tendency.

I have not investigated the following points yet, but they look interesting to explore further.

- Whether the non-approximated solutions $\omega_{noApp+}, \omega_{noApp-}$ converge to $\omega_{bo}$ as $l$ becomes large
- Differences in vibration modes between the two theories
- (If time allows) Comparison with finite element analysis results

[^1]: Kenji Nakagawa, Takuzo Iwatsubo, Yoshisada Murotsu, "Industrial Vibration, 2nd Edition" (1996), Morikita Publishing.

[^2]: "Rika Nenpyo 2020", Maruzen Publishing.
