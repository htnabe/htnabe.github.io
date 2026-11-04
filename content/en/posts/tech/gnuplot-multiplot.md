---
title: "[Gnuplot] Combining Multiple Graphs with multiplot"
date: 2023-01-10T22:37:55+09:00
draft: false
tags: [gnuplot]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1673872788/NabeBlog/gnuplot-icon_dzclx4.webp"
---

## Introduction

The basic usage of `multiplot` is well covered by the site below, but I found no consolidated article covering margin settings or how to output directly to SVG (or other formats like EPS), so I'm writing it up here.

{{<blogcard url="https://ss.scphys.kyoto-u.ac.jp/person/yonezawa/contents/program/gnuplot/multiplot_01.html">}}

## Outputting Directly to an SVG File

The `.dat` files used in this example can be downloaded from [here](/gnuplot_datFilles.zip).

With the `.dat` files in place, running the commands below will output a graph directly as an SVG file.

```
reset

set terminal svg enhanced font "Arial, 24" size 1280 960 # svg出力、1280px x 960px
set output "example.svg"
set multiplot layout 3,1 # 3行1列出力
set key horizontal opaque box height 0.6 font "Times New Roman, 20" # 横長の凡例
set xr[0:15]
set xtics (0, 5, 10,15)
set yl font "Times New Roman, 28"
set rmargin screen 0.9 #キャンバスの長さの20%(100%-80%)の余白を右側に作る
set lmargin screen 0.1 #キャンバスの長さの20%の余白を左に作る

set yl "{/:Italic E_{x}, hoge = 10 [m/s]}"
set format x ""
set bmargin screen 0.7128 #グラフの高さとグラフ間の余白設定
set tmargin screen 0.9504
plot "example1.dat" using 1:2 w p ps 0.5 pt 7 title "{/:Italic {E_{x}}^{(1)}" , \
     "example1.dat" using 1:3 w p ps 0.5 pt 9 title "{/:Italic {E_{x}}^{(m)}" , \
     "example1.dat" using 1:4 w p ps 0.5 pt 5 title "{/:Italic {E_{x}}^{(-m)}" , \
     0 w l dt (5, 5) lw 1.5 lt rgb 'black' notitle

set yl "{/:Italic E_{x}, hoge = 100 [m/s]}"
set format x ""
set bmargin screen 0.4224 #グラフの高さとグラフ間の余白設定
set tmargin screen 0.66
plot "example2.dat" using 1:2 w p ps 0.5 pt 7 title "{/:Italic {E_{x}}^{(1)}" ,\
     "example2.dat" using 1:3 w p ps 0.5 pt 9 title "{/:Italic {E_{x}}^{(m)}" ,\
     "example2.dat" using 1:4 w p ps 0.5 pt 5 title "{/:Italic {E_{x}}^{(-m)}" , \
     0 w l dt (5, 5) lw 1.5 lt rgb 'black' notitle

set yl "{/:Italic E_{x}, hoge = 1000 [m/s]}"
set format x "%g"
set bmargin screen 0.132 #グラフの高さとグラフ間の余白設定
set tmargin screen 0.3696
set xl "{/:Italic n}" font "Times New Roman, 28"
plot "example3.dat" using 1:2 w p ps 0.5 pt 7 title "{/:Italic {E_{x}}^{(1)}" ,\
     "example3.dat" using 1:3 w p ps 0.5 pt 9 title "{/:Italic {E_{x}}^{(m)}" ,\
     "example3.dat" using 1:4 w p ps 0.5 pt 5 title "{/:Italic {E_{x}}^{(-m)}" , \
     0 w l dt (5, 5) lw 1.5 lt rgb 'black' notitle
unset multiplot
unset output
```

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1673357810/NabeBlog/example_ln9pn0.webp" alt="Multiplot example">}}

### Notes on the Commands

- Changing `set terminal svg` to `set terminal eps` (or another format) changes the output file format.

Switching the terminal type changes the output format, but garbled characters can occur — sometimes what works fine in SVG breaks in EPS. Changing the file encoding (e.g., `utf-8` → `Shift-JIS`) can sometimes prevent garbling.

- The margin between plots can be adjusted with `set rmargin screen xxx` to set the margin as a fraction of the canvas size.
- If the canvas size is set correctly, margin adjustments may not be necessary.
- The position and orientation of the legend can be changed with commands like `set key vertical right outside`.
