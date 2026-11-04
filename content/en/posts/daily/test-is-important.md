---
title: "A Story of Messing Up a Peer-Reviewed Paper [Test Code Is Very Important]"
date: 2021-12-18T19:30:37+09:00
tags: [research, test code, Octave]
categories: [Daily]
mathPosts: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1639831566/NabeBlog/understand_test_tc8jm7.webp"
---

## Introduction

I finally submitted the peer-reviewed paper I'd been writing for nearly a year at the end of the month before last. Related article below:
[What I Wish I Had Been More Careful About When Writing My First Peer-Reviewed Paper]({{< relref "./publishPaper-Review.md" >}})

I still haven't received the review for this paper, but just 3 days ago, I found an error in the material constants used to generate the graphs in the paper. On top of that, I found this error had a very large impact on the paper's results.

_I feel so sorry that I want to kneel and apologize directly to the referees. I'm truly sorry._

After discussing with my boss, we are currently considering either withdrawing this paper or resubmitting a corrected paper (most likely withdrawal).

I want to record both how this error was found and what happened afterward.

## Where It Started

This happened in last week's lab seminar. Near the end we had a conversation like this (roughly).

```

Boss: "The deadline for the next conference abstract is next month, so by next week, decide and summarize what you'll put as the main content in the abstract."

Me: "Roger that."

```

## Discovery of the Disaster

After that, I spent about a day and a half reviewing results from the past 2-3 months and thinking which result should be the main point of the presentation. Then I checked an old program because I had additional things I wanted to investigate.

```

Me: "(If $B$ becomes this here... then this should be positive...)" typing

Me: "(Then this... should become like this...?)" typing

Me: "(...hmm...? that's weird... this should be negative...)" typing

Me: "(Then this $\Delta$ value should be positive... wait... (sweat)... then... huh...?????)" typing

Me: "(Then the material constant is wrong... right...?)"

Me: "(Wait... then doesn't that mean the material constant in the paper the other day is also wrong...?)"

Me: "(Wait wait, this isn't the time to panic yet...)" flipping docs

Me: "Ah... ahh............it's over..."

```

As a result, **a material constant that should be less than 1 no matter how large it is had become 5.07... in the program, which is obviously too large**.

This was my first peer-reviewed paper, and I'd spent nearly a year writing and rewriting it. I never imagined this could happen, not even 1mm.

## Why Did This Disaster Happen?

Technical terms appear here, so ~~please study~~ feel free to skip.

Originally, in a program I created a little over a year ago, I tried to use Poisson's ratios $\nu_{jk}$ $(j, k=x, y, z, j\ne k)$ (a material constant) for a 2D orthotropic material based on references.

- [Orthotropic body, Mechanical Engineering Dictionary](https://www.jsme.or.jp/jsme-medwiki/07:1008409)
- [What are strain, stress, and Poisson's ratio? KYOWA](https://www.kyowa-ei.com/jpn/technical/strain_gages/what.html)

I read several books and tried to use a suitable Poisson's ratio, but couldn't find one listing all the needed values. So, considering material properties, I assumed
\begin{equation}
\nu*{xy}=\nu*{zx}
\end{equation}

and additionally used the relation from Maxwell's reciprocal theorem,
\begin{equation}
\nu*{jk}=\frac{E_j\cdot\nu*{kj}}{E_k}
\end{equation}

to calculate needed Poisson's ratios in the program. But **I couldn't notice there was already a mistake by this point**.

The 2D orthotropic material considered here has extremely high strength only in the $x$-axis direction, so equation (1) was wrong. The correct relation was
\begin{equation}
\nu*{xy}=\nu*{xz}
\end{equation}

This mistake produced obviously strange values such as $\nu_{xz}>5$.

## What I Did So This Never Happens Again

To reduce the chance of this disaster as much as possible, I decided to thoroughly enforce these three points:

- Verify whether numbers/conditions used are valid through third-party checks **before programming**, not only from references
- Add test code to programs
- Publish only results that pass test code

The first one is obvious, but humans are such that **once we believe something wrong is correct, it's hard to notice without a trigger**, so I concluded objective third-party checks are necessary.

Ideally, this third party should be someone who can view the research content objectively. However, someone with too little background knowledge may make checking itself take too long, so that isn't ideal either. Choosing the person is difficult.

Next, points 2 and 3 are as important as, or more important than, point 1.

I usually hadn't had anyone review programs I use for research. Some labs might do double checks on programs (so-called code review), but my lab doesn't, so I had no choice but to ensure correctness of the program and generated data myself as the programmer.

Until now, unless data/graphs looked obviously weird, almost any result was effectively passed through (which is also a problem), and there was almost nothing ensuring data correctness (and that led to this disaster).

In this case especially, **I could have caught this if I had simply checked material constants in the program and forced an error when a value was out of range**.

Through this incident, I strongly came to think that **programmers themselves should also write test code to ensure correctness of both the program and the resulting data**. Seriously.

## Bonus

### Added Code

For reference, here's part of the test code I added. Language is Octave. It should be compatible with MATLAB as well.

```
# main.m
E_xx = 148*10^9;
E_yy = 10.50*10^9; # axial + vertical young's modulus
E_zz = E_yy; # two dimensinal orthotropy's condition
n_xy = 0.30;
n_yz = 0.59;
n_xz = 0.30; # poisson's ratio
n_yx = (E_yy * n_xy)/E_xx; # two dimensinal orthotropy's condition
n_zy = E_zz * n_yz/E_yy;
n_zx = E_zz * n_xz/E_xx;

for array = [n_yx n_zy n_zx]
  test_poisson(array);
end
（以下略）
```

```
# test_poisson.m
function test_poisson(n)
  if (n >= 1)
    error('Invalid poisson raio is inputted(more than 1).');
  elseif ( n < 0)
    error('Suspicious poisson raio is inputted(less than 0).');
  end
end
```

This program forcibly throws an error when the material constant (here Poisson's ratio) exceeds thresholds.

### Even So, We Usually Don't Learn Coding Practices (Especially Testing)...

In university classes, I took things like introductory/applied programming, but I barely learned programming/coding practices (at most things like "align indentation").

Also, even in research, I'd never heard discussions about _how surrounding students/faculty ensure the accuracy of obtained data_. Same for test code.

For details around this, the two articles below are extremely helpful, so please check them. I wish I'd read them much earlier... (cry)

{{<blogcard url="https://kesin.hatenablog.com/entry/2014/02/27/%E7%A0%94%E7%A9%B6%E3%81%AE%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E6%82%B2%E5%8A%87%E3%82%92%E7%84%A1%E3%81%8F%E3%81%99%E3%81%9F%E3%82%81">}}
{{<blogcard url="https://qiita.com/hmkz/items/0689cd85fb3e1adcda1a">}}

### How Should We Learn Coding?

In programming classes at my university and in my lab's guidelines, coding practices were not written at all. I suspect labs that clearly document coding practices are probably rare.

In that context, to understand the importance of test code, besides reading the linked articles above:

- **Actually build real products yourself**
- Build broad connections with labs/researchers/students who heavily use programming

I think these are very effective approaches. Unfortunately the first one has a higher barrier, but if you've built applications used by many users, you can deeply understand the importance of testing to avoid unexpected errors.

The second point is also important: in labs that have accumulated lots of knowledge about research programming, this kind of knowledge should be far easier to obtain (certainly far more than in my lab).

### Final Thoughts

I hope fewer people step into the same trap. And I also want to encourage those who already did. On Twitter everyone flexes with `One accepted`, but nobody talks about withdrawing papers... isn't that weird in its own way?

Also, make peace with tests (roughly speaking).
