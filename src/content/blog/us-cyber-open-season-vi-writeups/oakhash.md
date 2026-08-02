---
title: 'OakHash'
previewDescription: 'US Cyber Open S6 — forensics: OakHash'
description: 'Writeup for OakHash from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-75.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-75.png "20rem")

We’re given a custom hash `$oak$1$753a7277c956277fc6a3bb8e31822b25` where `753a7277c956277fc6a3bb8e31822b25` is the md5sum of the password and the password is in format `SVIUSCG{<pokemon nature>_<gen1 pokemon name>}`

I found a list of gen1 pokemons and list of pokemon natures online and pasted them into text files

![image.png](./image-76.png "20rem")

![image.png](./image-77.png "24rem")

Then combined the two wordlists into all combinations using a python script

```python
with open("nature.txt", "r") as f:
    natures = [line.strip() for line in f]

with open("pokemon.txt", "r") as f:
    pokemons = [line.strip() for line in f]

with open("wordlist.txt", "w") as f:
    for nature in natures:
        for pokemon in pokemons:
            f.write(f"SVIUSCG{{{nature}_{pokemon}}}\n")
```

With that final wordlist used hashcat: `hashcat -a 0 -m 0 '753a7277c956277fc6a3bb8e31822b25' wordlist.txt`

and cracked it:

![image.png](./image-78.png "100%")

Flag: `SVIUSCG{adamant_zubat}`
