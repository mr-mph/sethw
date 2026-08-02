---
title: 'Intern-Net'
previewDescription: 'US Cyber Open S6 — web: Intern-Net'
description: 'Writeup for Intern-Net from US Cyber Open Season VI (Web Exploitation).'
date: 2026-08-01
image: './image.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image.png "24rem")

We’re given a website where we can create an account but can’t see the secret post, you have to be a senior intern for that.

![image.png](./image-1.png "100%")

Since mike torres’s username is mike.torres, maybe alex revera (the guy with senior intern permissions’) username is just `alex.rivera`? 

Let’s see if we can log into his account on the announcements page to read the secret message.

When intercepting the request sent, we can see it’s just authenticated by this `auth_token` cookie, which is a base64 encoding of the user’s password hash.

![image.png](./image-2.png "100%")

Looking at the http history from browsing the site, we can see where the client gets that hash from, the server provides it!

![image.png](./image-3.png "32rem")

This request is unauthenticated, though, meaning we can just request the password hash for any user. Let’s fetch `alex.rivera`’s password hash.

![image.png](./image-4.png "100%")

Now we can base64 encode that and use it to read the announcements page as him:

![image.png](./image-5.png "100%")

![image.png](./image-6.png "32rem")

There’s the secret message with the flag!

Flag: `SVIUSCG{fe325dfa5dbd8aecc6d45f5f76037cb5}`
