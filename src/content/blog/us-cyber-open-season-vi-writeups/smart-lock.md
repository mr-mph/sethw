---
title: 'Smart Lock'
previewDescription: 'US Cyber Open S6 — rev: Smart Lock'
description: 'Writeup for Smart Lock from US Cyber Open Season VI (Reverse Engineering).'
date: 2026-08-01
image: './image-114.png'
tags: ['ctf-writeups']
authors: ['seth']
---

[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-114.png '20rem')

This one was pretty straightforward. Just looking through the pcap you can see the packet where the device identifying as an iPhone sends the PIN (`47193820`):

![image.png](./image-115.png '100%')

Submit that to the service and that’s it!

![image.png](./image-116.png '32rem')

Flag: `SVIUSCG{aa192e8178bf6adf492aff298218885c}`
