---
title: 'Cloudy with a Chance of Breach'
previewDescription: 'US Cyber Open S6 — forensics: Cloudy with a Chance of Breach'
description: 'Writeup for Cloudy with a Chance of Breach from US Cyber Open Season VI (Forensics).'
date: 2026-08-01
image: './image-84.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./image-84.png "24rem")

We are dropped into a linux shell. One of the first things I do is check the shell history of my user with `history` 

![image.png](./image-85.png "100%")

Looks like the attacker stores some aws credentials in `/tmp/creds_bkp_4e8f21.txt`

yup:

![image.png](./image-86.png "100%")

Checking the crontab entry that was previously viewed shows us the aws region as well as s3 bucket name

![image.png](./image-87.png "100%")

Now we can just list what’s in this bucket by entering in the auth details in `aws configure` then reading what’s in the bucket with `aws s3 ls s3://meridian-netmon-logs`

![image.png](./image-88.png "100%")

![image.png](./image-89.png "100%")

Cool, there’s the flag. Let’s copy it out with `aws s3 cp s3://meridian-netmon-logs/flag.txt /tmp/flag.txt`. Now we can just read it from `/tmp/flag.txt`:

![image.png](./image-90.png "100%")

Flag: `SVIUSCG{l00ks_4_l1ttl3_cl0udy}`
