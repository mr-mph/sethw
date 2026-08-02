---
title: 'Photo Fraud'
previewDescription: 'US Cyber Open S6 — forensics: Photo Fraud'
description: 'Writeup for Photo Fraud from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-70.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-70.png "24rem")

We get an image that may have been tampered with. exiftool shows us there is a thumbnail in the metadata.

![image.png](./image-71.png "32rem")

extract it with `exiftool -b challenge.jpg > thumb.jpg`

the file isn’t renderable, so look for the [jpeg magic bytes](https://en.wikipedia.org/wiki/List_of_file_signatures) 

![image.png](./image-72.png "100%")

![image.png](./image-73.png "100%")

and crop the image to start with `ÿØÿÛ`

![image.png](./image-74.png "32rem")

Flag: `SVIUSCG{meridian_thumbnail_reveal_garret}`
