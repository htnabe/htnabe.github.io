---
title: "Notes on the Generalized Inverse Matrix"
date: 2023-01-11T00:13:44+09:00
draft: false
tags: [Generalized Inverse Matrix]
categories: [Math]
mathPosts: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1673878724/NabeBlog/generalized_inverse_wvjaqf.webp"
---

## Introduction

While studying for a certain qualification exam, I came across a question about properties of the generalized inverse matrix, so I looked into it.

A quick web search returned several hits, and the pages below were relatively easy to understand at a high level.

{{<blogcard url="https://www.slideshare.net/wosugi/ss-79624897">}}
{{<blogcard url="https://zellij.hatenablog.com/entry/20120811/p1">}}

However, after looking into it further, I noticed that generalized inverse notation is split between $[A^-]$ and $[A^+]$, and I also felt a slight inconsistency when doing calculations with Lagrange multipliers.

## Difference in Matrix Notation

First, I checked the difference between $[A^-]$ and $[A^+]$.

After searching references, I found that the source below uses $[A^-]$ for generalized inverse and $[A^+]$ for Moore-Penrose generalized inverse.

{{<amazon asin="4764910462" title="Self-Study Applied Linear Algebra: From Fundamentals to Engineering Applications of Generalized Inverses">}}

Also, on the [official website](https://www.jsme.or.jp/jsme-medwiki/13:1002625) operated by JSME, Moore-Penrose generalized inverse is denoted by $[A^+]$. Other articles, such as the one below, also distinguish generalized inverse and Moore-Penrose generalized inverse using $[A^-]$ and $[A^+]$.

{{<blogcard url="https://qiita.com/hatahataDev/items/892599855c091d9773b1">}}

On the other hand, the well-known linear algebra textbook below consistently uses $[A^-]$ for generalized inverse and does not seem to make a strict distinction[^1].

{{<amazon asin="4320113403" title="Linear Algebra Seminar: Projection, Singular Value Decomposition, and Generalized Inverse">}}

So it does seem to be notation meant to distinguish generalized inverse from Moore-Penrose generalized inverse, but perhaps not completely strict.

## Calculation Using Lagrange Multipliers

When the number of unknowns $m$ is at least the rank $r$ of matrix $[A]$ ($m\geq r$), define a Lagrangian and find $\\{\lambda\\}$ that minimizes $\\{x\\}$. At that point, I initially could not understand why $\\{x\\}^T\\{x\\}$ is multiplied by $1/2$.

\begin{equation}
L = \frac{1}{2}\\{x\\}^T\\{x\\} - \\{\lambda\\}^T ([A]\\{x\\}-\\{b\\})
\end{equation}

If you apply the method without prior context, it seems like you would simply search for candidates minimizing $\\{x\\}^T\\{x\\}$, so I expected the form without $1/2$:

\begin{equation}
L = \\{x\\}^T\\{x\\} - \\{\lambda\\}^T ([A]\\{x\\}-\\{b\\})
\end{equation}

Calculating from this,

\begin{equation}
\frac{\partial L}{\partial\\{x\\}}=2\\{x\\} - \\{\lambda\\}^T[A]=0
\end{equation}

\begin{equation}
\therefore \\{x\\} = \frac{1}{2}\\{\lambda\\}^T[A]
\end{equation}

But since $\\{\lambda\\}$ is a vector containing arbitrary real numbers, if we set $1/2\\{\lambda\\} = \\{\lambda'\\}$,

\begin{equation}
\\{x\\} = \\{\lambda'\\}^T[A]
\end{equation}

so it only changes from $\\{\lambda\\}$ to $\\{\lambda'\\}$.

As an aside, I check whether the following expression for generalized inverse is obtained using this $\\{\lambda'\\}$.

\begin{equation}
[A^-] = A^T([A][A]^T)^{-1}
\end{equation}

In general, for Lagrange multipliers, to find conditions where $f(x, y)$ is extremized under $g(x, y)=0$, consider

\begin{equation}
L = f(x, y) - \lambda g(x, y)
\end{equation}

So in this case,

\begin{equation}
f = \frac{1}{2}\\{x\\}^T\\{x\\}, {\quad} \\{g\\} = [A]\\{x\\} - \\{b\\}
\end{equation}

From the condition on $\\{g\\}$,

\begin{equation}
[A]\\{x\\} - \\{b\\} = \\{0\\}
\end{equation}

From Eq. (9) and Eq. (5),

\begin{eqnarray}
\\{b\\} &=& [A][A]^T\\{\lambda'\\} \nonumber\\\\
\therefore \\{\lambda'\\} &=& ([A][A]^T)^{-1}\\{b\\} \\\\
\end{eqnarray}

Substituting this back into Eq. (4),

\begin{eqnarray}
\\{x\\} &=& [A]^T\\{\lambda'\\} \nonumber\\\\
&=& [A]^T([A][A]^T)^{-1}\\{b\\} \nonumber\\\\
&=& [A^-]\\{b\\}
\end{eqnarray}

which is the same as Eq. (6). So whether $\\{x\\}^T\\{x\\}$ has a factor of $1/2$ or not, you eventually obtain the same generalized inverse.

Still, if we are going to introduce a new variable like $\\{\lambda'\\}$ midway as in this case, it is preferable to define the Lagrangian as in Eq. (1) from the start because the calculation is cleaner.

Well, no way I would have understood that at first glance...

## Closing

When self-studying, explanations that scratch this kind of itch are really valuable (self-praise, maybe).

[^1]: I have read it quite a bit, but I may still have missed some parts.
