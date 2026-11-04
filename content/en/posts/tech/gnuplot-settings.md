---
title: "[Windows 10] How to Save Gnuplot Drawing Settings"
tags: [gnuplot, Windows10]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1673872788/NabeBlog/gnuplot-icon_dzclx4.webp"
categories: [Tech]
date: 2020-06-02
show_date: true
toc: true
---

## Background

As I started using Gnuplot heavily for research, I got used to tweaking drawing settings with various command combinations.

However, when generating a large number of similar graphs, having to type all the drawing settings every time you launch Gnuplot is quite a hassle…

Most software on Windows has a startup configuration file (e.g., Visual Studio Code's `settings.json`). That made me wonder: "Gnuplot probably has a startup config file too, right?" — so I went looking.

## Gnuplot Version

- Version 5.2

## How to Create the Config File and Where to Put It

The file that Gnuplot reads on startup is typically named `gnuplot.ini` and saved under `C:\Users\<username>\AppData\Roaming`.

If it doesn't exist, simply create a new `gnuplot.ini` in that directory and you're good to go.

Usage is straightforward — just write Gnuplot commands directly into the file. For example:

```
set tics font "Arial, 25"
```

Save the file, launch Gnuplot, and plot something — you'll see the tick labels are now uniformly set to Arial.

## Closing Note

This article only covers Windows 10. Unfortunately I can't speak to the details for Mac or Linux.

If the software and research materials in our lab had been handed down more carefully, I wouldn't have had to look this up myself… (´;ω;｀)
