---
title: 'Lost In Translation 🌍'
previewDescription: 'US Cyber Open S6 — web: Lost In Translation 🌍'
description: 'Writeup for Lost In Translation 🌍 from US Cyber Open Season VI (Web Exploitation).'
date: 2026-08-01
image: './image-7.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-7.png "20rem")

The site appears to only show us the flag if we have the `session` cookie resolve to role=admin and have a valid signature (md5 hash) of that session as the `sig` cookie.

![image.png](./image-8.png "32rem")

We could just modify the session cookie to have `&role=admin` at the end so that we can read the flag but then the signature wouldn’t match since we don’t know the SECRET which is prepended to the session before hashing.

![image.png](./image-9.png "100%")

It turns out there’s a way to forge a hash that includes the initial `SECRET + data` as well as some arbitrary data appended to the end with the hash length extension attack. We can resume the md5 algorithm where it left off using [https://github.com/iagox86/hash_extender](https://github.com/iagox86/hash_extender) to get the full `md5(SECRET+data+'&role=admin')`.  The hash extender tool also requires knowing the length of `SECRET` but it turns out we can just try every possibility until we find a length that works. Once we try length 16, it works!

Here’s the original request with session `user=e&role=guest`:

![image.png](./image-10.png "32rem")

![image.png](./image-11.png "100%")

Now we can use that session and signature and we get the flag!

![image.png](./image-12.png "100%")

Flag: `SVIUSCG{3870c9834229edbfb24a134ecbf7278b}`
