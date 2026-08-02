# sethw.dev

Personal site, based on [echoghi/v5](https://github.com/echoghi/v5) (Astro Erudite).

### Tech Stack

- **Astro**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **MDX / Markdown**
- **Cloudflare R2** – Object storage for photos and audio (optional)
- **AWS SDK (S3-compatible)** – Uploading and managing R2 assets
- **Plausible Analytics** – Lightweight, privacy-focused analytics

---

## Getting started

```bash
npm install
npm run dev
```

Site runs at `http://localhost:1234`.

---

## Prerequisites (photo galleries)

Before adding photo galleries or running the image processing scripts, configure Cloudflare R2 and your public media endpoint.

### Cloudflare Setup

- Create a **Cloudflare account** (free)
- Enable **R2 Object Storage** (free tier available)
- Create an **R2 bucket** for gallery assets
- Generate **R2 access keys** with read/write permissions for that bucket
- (Optional but recommended) Configure a **custom domain** for R2, e.g. `https://cdn.sethw.dev`

### Required Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
ACCOUNT_ID=your_cloudflare_account_id
BUCKET=your_r2_bucket_name
AWS_ACCESS_KEY_ID=your_r2_access_key_id
AWS_SECRET_ACCESS_KEY=your_r2_secret_access_key
```

### CDN / Media Endpoint Configuration

1. Update the media endpoint in `src/lib/utils.ts` (`getSongDataById`)
2. Update site metadata in `src/consts.ts`

---

## Adding Photo Galleries

### 1) Add raw images (gitignored)

Place raw images in `photos/<album-slug>-source/`.

### 2) Create the gallery content entry

`src/content/photos/<album-slug>/index.md`:

```md
---
name: 'San Francisco'
title: 'Life by the Marina'
description: 'A short description.'
period: '2019-2021'
date: '2021-01-01'
image: '/src/assets/images/sf-preview.jpg'
---
```

### 3) Process and upload images

```bash
npm run process-images
```

---

## Adding Music to a Gallery (Optional)

Register songs in `src/consts.ts`, place MP3s in `public/audio/<gallery-slug>/`, then:

```bash
npm run process-audio
```

---

## License

Based on work released under the [MIT License](LICENSE).
