---
title: "Rubberduck Tips"
date: 2023-10-14T22:31:03+09:00
tags: [Rubberduck, VBA, Excel]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1697270730/tech/tech-logos/rubberduck_logo_c13b4l.webp"
---

This is my article for day 17 of the [First-Time Advent Calendar](https://qiita.com/advent-calendar/2023/first-time).

- The thumbnail is taken from the Rubberduck homepage.

## Update

[Rubberduck](https://github.com/rubberduck-vba) has moved to archived status.

As stated [here](https://rubberduckvba.blog/2026/03/08/whats-next/), the reason is to work full-time on Rubberduck VBA as a job.

## What This Article Covers

In my [previous article]({{< relref "rubberduck-vba-with-git.md" >}}) I covered how to manage programs with Rubberduck + Git, but there are several other useful features.

## Useful Features

The main features such as `Unit Testing`, `Code Inspections`, `Refactorings`, and `Navigator` are covered in the following articles, so I'll skip those here.

{{<blogcard url="https://qiita.com/mochimo/items/e9be36619a76e15bc898">}}
{{<blogcard url="https://qiita.com/mima_ita/items/3629006163d0a7fa6e55">}}

The additional useful features I want to highlight are these two:

1. Annotations
2. Peek Definitions

### Annotations

You can add descriptions to variables, subroutines, functions, classes, and even entire modules, and view those descriptions from anywhere.

For example, let's add a description to the following simple program:

```vb
Public Function DoubleValue(ByVal Value As Integer) As Integer
    DoubleValue = Value * 2
End Function
```

By adding the `@Description` prefix as a comment to this program, you can attach a description.

```vb
'@Description("値を二倍にして返す")
Public Function DoubleValue(ByVal Value As Integer) As Integer
    DoubleValue = Value * 2
End Function
```

In the actual editor, the description is displayed at the top of the VBE as shown below:

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/%E8%AA%AC%E6%98%8E_rubberduck_w67gdu.webp" alt="Actual screen" caption="Actual screen">}}

### Peek Definition

You can inspect how variables, subroutines, functions, classes, etc. are defined. The default shortcut is `Ctrl + Shift + D`.

Place the cursor on the `DoubleValue` function call inside the `Main` subroutine and press `Ctrl + Shift + D`. The definition will be shown as in the figure below:

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rd_peekDefinition_qxajiv.webp" alt="Browsing definitions" caption="Browsing definitions">}}

## Summary

Modern editors automatically show variable and function argument descriptions, but vanilla VBE does not, which is quite painful.

The features introduced above should help with deciphering VBA programs ~~a.k.a. ancient scrolls~~ where you have no idea who wrote them or what they do.

By the way, Rubberduck is looking for supporters, and development on Rubberduck 3 is ongoing.

- https://ko-fi.com/rubberduckvba
- https://rubberduckvba.blog/

### Aside

We have talked a lot about VBA, but I think it is worth seriously considering **whether you should be writing VBA programs to build apps in the modern era at all**. For example, if you just need to manipulate Excel files, you can achieve your goals in most cases using `C#` or `Node.js` libraries.

Before jumping into VBA just because Excel is involved, I think the following considerations are warranted:

- Whether you plan to keep using the app long-term
- Whether the app is or will become large in scope

In other words, if the app requires substantial features or UI, you should choose a more modern language or framework for the sake of development and maintenance efficiency.
