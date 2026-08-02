---
title: 'Injected Heron'
previewDescription: 'US Cyber Open S6 — forensics: Injected Heron'
description: 'Writeup for Injected Heron from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-81.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-81.png "24rem")

We’re given this memory dump. This solution was definitely unintended. I just ran strings and grepped for `U1ZJVVNDR`since that’s the base64 encoding of `SVIUSC`, part of the flag format (I had noticed a pattern of the flag being base64 encoded in previous forensics challenges).

![image.png](./image-82.png "100%")

![image.png](./image-83.png "100%")

Flag: `SVIUSCG{stonehaven_glass_heron_stg_9f1a33}`
