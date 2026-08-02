---
title: 'Souvenirs 🌍'
previewDescription: 'US Cyber Open S6 — forensics: Souvenirs 🌍'
description: 'Writeup for Souvenirs 🌍 from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-60.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-60.png "20rem")

We got an image file. I ran `binwalk -Me souvenirs.jpg` and flag is in one of the text files it carved out of the jpeg.

![image.png](./image-61.png "100%")

Flag: `SVIUSCG{p0stc4rds_h1dd3n_p4st_th3_FFD9_h0r1z0n}`
