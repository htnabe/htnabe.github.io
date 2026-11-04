---
title: "Managing VBA Programs with Git Using Rubberduck"
date: 2023-10-14T13:24:53+09:00
draft: false
tags: [Rubberduck, VBA, Excel]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1697270730/tech/tech-logos/rubberduck_logo_c13b4l.webp"
---

The thumbnail is taken from the Rubberduck homepage.

## Update

[Rubberduck](https://github.com/rubberduck-vba) has moved to archived status.

As stated [here](https://rubberduckvba.blog/2026/03/08/whats-next/), the reason is to work full-time on Rubberduck VBA as a job.

> take Rubberduck to the next level by finally working full-time on it,

## What This Article Covers & What It Does Not Cover

- What I want to convey
  - Using Rubberduck, you can manage VBA program versions with relative ease
- What I am not saying
  - That using Rubberduck is the best choice for all VBA programmers in every situation
  - That VBA and VBE are still fully viable in the modern era

## What Can Rubberduck Do?

There are many summaries of this topic online, so I will skip it here.

{{<blogcard url="https://qiita.com/mochimo/items/e9be36619a76e15bc898">}}
{{<blogcard url="https://qiita.com/mima_ita/items/3629006163d0a7fa6e55">}}

## Specific Steps for Git Management

First, set up an Excel file and a folder (`src`) to store your VBA programs, as shown below:

```plaintext
 /root
  ┣ hoge.xlsm
  ┗ /src
```

Open `hoge.xlsm`, then select `Export Active Project` from the `rubberduck` tab.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_export_code1_i1abph.webp" alt="Selecting a tab" caption="Selecting a tab">}}

In the folder selection dialog that appears, select the `src` folder you created earlier.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_export_code2_xyvzkm.webp" alt="Selecting a folder" caption="Selecting a folder">}}

This alone exports `Module1.bas` (named after the module) to the `src` folder.[^1] You can also open it in VS Code like this:
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_open_from_vscode_avgbkb.webp" alt="Opening in VSCode" caption="Opening in VSCode">}}

If you're familiar with Git, you'll realize that the exported files are the VBA source files — from here you can use `git tag` ~~or whatever you like~~ to manage version history at appropriate points.

You can also update the VBA code through the following workflow:

1. Edit the `bas` file in VS Code
2. Import (or rather, sync) the updated file on the VBE side

Specifically, edit the program in VS Code as follows:
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_vscode_edit_exmp_vrbxxi.webp" alt="Editing in VSCode" caption="Editing in VSCode">}}

Specifically, I added the following section:

```C#
    Dim helloWorld As String: helloWorld = "hello, World!"
    Debug.Print helloWorld
```

Then, in VBE, use Rubberduck's `Code Explorer` tab and select `Sync Project` → `Update Components from files...`.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_sync_huwczn.webp" alt="Pressing the sync button" caption="Pressing the sync button">}}

A file selection dialog will appear — select the file(s) you want to sync (multiple selections are supported).
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_select_file_jaaxam.webp" alt="Selecting a file" caption="Selecting a file">}}

Finally, opening the `Module1` module in VBE shows that the changes have been applied as expected.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rubberduck_result_f80jpa.webp" alt="Amazing…" caption="Amazing…">}}

### Benefits of the Above Workflow

Beyond simply making version control easier, there are additional benefits:

- Even when multiple people manage different VBA programs via Git, only the changed portions need to be updated
- Features used in other projects can be added or managed at the module level

### Downsides

- Changes managed in Git are not automatically reflected in VBE
- Every change requires the full Export → add & commit & push → (when syncing) → Sync Project workflow

## Dim Summary As Aside

VBA and VBE are not something one would recommend in the modern era, but unfortunately they are still used in many contexts. Managing and maintaining them is genuinely painful, but:

- Making management slightly easier with modern tools
- Verifying functionality before migrating to another language or framework

...there are few reasons not to introduce Rubberduck.

Furthermore, I think Rubberduck could be a savior for legacy ~~garbage of garbage~~ systems, for the following reasons:

- A reasonably polished feature set
- Does not require admin rights to install, and works in relatively any environment
- Extensive documentation (in English)
- Active development with long-term plans[^2]

Of course, Rubberduck VBA is not perfect — **compared to not using it, performance can be sluggish, loading large programs is slow, and Excel may crash more easily when working with multiple Excel files.**

Even so, **VBA and VBE are bad enough that more often than not, having Rubberduck is better than not having it.**

Personally, I even made a financial contribution because I want Rubberduck to become the de facto standard for VBA development.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/rb_opened_box_sm_setiwq.webp" alt="Arrived from Canada in a few months" caption="Arrived from Canada in a few months">}}
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702908219/tech/rubberduck/all_items_sm_tkvseb.webp" alt="The rubber duck is so cute!" caption="The rubber duck is so cute!">}}

[^1]: This example only has one module, but the same applies with multiple subroutines. Class files and functions defined per sheet will also be exported.

[^2]: In particular, there is a [post](https://rubberduckvba.blog/2023/10/04/rd3-update-october-2023/) announcing plans to implement a dedicated Rubberduck editor using the `.NET7` framework, making it even more user-friendly and ensuring long-term development.
