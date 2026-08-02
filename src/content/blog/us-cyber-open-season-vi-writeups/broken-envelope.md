---
title: 'Broken Envelope'
previewDescription: 'US Cyber Open S6 — forensics: Broken Envelope'
description: 'Writeup for Broken Envelope from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-62.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-62.png "24rem")

We’re given a corrupted zip file. Thankfully my unarchiving tool (the unarchiver) auto-repairs it so we can literally just unzip it and the flag is base64 encoded there.

```python
Blue Mountain Geotechnical - project dispatch
tag: U1ZJVVNDR3tibHVlbW91bnRhaW5femlwX2VvY2RfcmVidWlsZH0=
site: Sawatch Ridge borehole 17
```

![image.png](./image-63.png "100%")

Flag: `SVIUSCG{bluemountain_zip_eocd_rebuild}`
