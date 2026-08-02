---
title: 'Fog Of War 🇨🇿'
previewDescription: 'US Cyber Open S6 — crypto: Fog Of War 🇨🇿'
description: 'Writeup for Fog Of War 🇨🇿 from US Cyber Open Season VI (Cryptography).'
date: 2026-08-01
image: './image-108.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-108.png "24rem")

We are given two images of seemingly noise, but when you take the XOR of them you get:

![image.png](./image-109.png "100%")

The quote XFOK XKEK XKDK I couldn’t figure out how to decrypt but 3 words of 4 letters each looks a lot like it could represent “VENI VIDI VICI” which is a famous quote by Julius Caesar and matches the theme.

`SVIUSCG{CAESAR}`
