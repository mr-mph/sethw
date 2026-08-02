---
title: 'Forensic Download Play'
previewDescription: 'US Cyber Open S6 — forensics: Forensic Download Play'
description: 'Writeup for Forensic Download Play from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-79.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

We’re given an innocuous looking jpeg. let’s run `binwalk` on it to see what files may lie within:

![image.png](./image-79.png "100%")

Looks like there’s a DS rom in there. I extracted it from that offset(59904): `dd if=nintendo-ds.jpg bs=1 skip=59904 of=extracted_rom.nds`

Then loaded it into an emulator ([https://ds.44670.org/](https://ds.44670.org/)). When we play the game, we see the flag!

![image.png](./image-80.png "32rem")

Flag: `SVIUSCG{WHICH_EMULATOR_DID_YOU_USE?}`
