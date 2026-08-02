---
title: 'Supply'
previewDescription: 'US Cyber Open S6 — web: Supply'
description: 'Writeup for Supply from US Cyber Open Season VI (Web Exploitation).'
date: 2026-08-01
image: './image-27.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-27.png "20rem")

We’re given a site and source code. Interestingly that source code has dependencies written by the challenge author as well.

![image.png](./image-28.png "32rem")

The bottom two aren’t online on github, but the first one is.

![image.png](./image-29.png "100%")

And mux has a dependency to another package also written by the author, interesting. I decided to download that one as well to make sure I can see all the custom code.

![image.png](./image-30.png "100%")

Wow, it has yet another dependency by the author. This one has two go files linked.

![image.png](./image-31.png "100%")

`diag.go` has a very interesting function which parses the `X-Forwarded-Context` header on requests:

![image.png](./image-32.png "24rem")

Looks like we just need `base64(0xdeadbeef + <filepath>)` as the header value to get an arbitrary file read. Maybe we can literally just do `X-Forwarded-Context: b64(0xdeadbeef+'/flag.txt')` then:

![image.png](./image-33.png "100%")

Flag: `SVIUSCG{4cf633164913a50c191142efa65dac01}`
