# sethw.dev

Personal site, built on [Astro Erudite](https://github.com/jktrn/astro-erudite).

### Tech Stack

- **Astro**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **MDX / Markdown**
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

### Site configuration

Edit the `src/consts.ts` file to update your site's metadata, navigation links, and social links:

```ts
export const SITE = {
  title: 'astro-erudite',
  description: 'An opinionated, unstyled blogging template built with Astro.',
  locale: 'en-US',
  dir: 'ltr',
  defaultPageImage: '/static/opengraph-image.png',
  defaultPostImage: '/static/1200x630.png',
} as const

export const NAVIGATION = [
  { href: '/blog', label: 'Blog' },
  // ...
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: 'https://github.com/jktrn', label: 'GitHub', icon: GitHub },
  // ...
]
```

Your site's production URL is configurable in `astro.config.ts` as the `site` field, which is used for the sitemap, RSS feed, and canonical URLs.

### Color palette

Colors are defined in `src/styles/color.css` using the [Radix Colors](https://www.radix-ui.com/colors) scales. Each step carries a light/dark pair via [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) and the semantic tokens point at the scale, so the site respects system preference out of the box and the theme toggle only stores an override:

```css
:root {
  --gray-1: light-dark(#fcfcfc, #111111);
  /* ... */
  --gray-12: light-dark(#202020, #eeeeee);

  --background: var(--gray-1);
  --foreground: var(--gray-12);
  --muted-foreground: var(--gray-11);
  --border: var(--gray-6);
  /* ... */

  color-scheme: light dark;
}
```

### Favicons

Favicons are generated using [RealFaviconGenerator](https://realfavicongenerator.net/). To adjust the favicons, replace the files in the `public/` directory (such as `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, etc.) with your own. After updating the favicon files, you'll also need to adjust the references in `src/components/MetaHead.astro` to match your new favicon filenames and paths:

```html
<!-- Replace these with the generated meta tags -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="astro-erudite" />
<link rel="manifest" href="/site.webmanifest" />
```

## Adding content

### Blog posts

Add new blog posts as Markdown files in the `src/content/blog/` directory, either as a bare `your-post.md` or as a `your-post/index.md` folder (which lets you colocate assets). Use the following frontmatter structure:

```yml
---
title: 'Your Post Title'
description: 'A brief description of your post!'
date: 2026-01-01
authors:
  - enscribe
image: ./assets/banner.png
tags:
  - tag1
  - tag2
---
```

The blog post schema is defined as follows:

| Field         | Type (Zod)               | Requirements                                                                                                                                                        | Required |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `title`       | `string`                 | Should be ≤60 characters.                                                                                                                                           | Yes      |
| `description` | `string`                 | Should be ≤155 characters.                                                                                                                                          | Yes      |
| `date`        | `coerce.date()`          | Must be in `YYYY-MM-DD` format.                                                                                                                                     | Yes      |
| `order`       | `number`                 | Sort order for subposts within a series. Defaults to `0` if not provided.                                                                                           | Optional |
| `tags`        | `string[]`               | Preferably use kebab-case for these.                                                                                                                                | Optional |
| `authors`     | `reference("authors")[]` | Each entry must match the id of a file in `src/content/authors/` (e.g. if their file is named `jane-doe.md`, use `jane-doe` in the array). Validated at build time. | Yes      |
| `image`       | `image()`                | Should be exactly 1200px &times; 630px.                                                                                                                             | Optional |
| `draft`       | `boolean`                | Defaults to `false` if not provided. You can also prefix a filename with `_` to hide it from the content loader entirely.                                           | Optional |

### Subposts

A post becomes a series by nesting sibling Markdown files next to its `index.md`:

```
src/content/blog/
├── a-standalone-post.md
└── my-series/
    ├── index.md
    ├── getting-started.md
    └── going-further.md
```

The entire series renders as one continuous document, with the address bar syncing as you scroll between parts. Every subpost still gets its own URL (`/blog/my-series/getting-started`). Use the `order` frontmatter field to control the sequence. Only one level of nesting is supported, so files nested any deeper are ignored.

### Markdown extensions

A few authoring features exist that extend beyond standard Markdown:

- Callouts use the [directive](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) syntax, with five variants (`note`, `tip`, `warning`, `caution`, `important`) rendered as collapsible `<details>` elements. Append `{closed}` to start one collapsed:

  ```markdown
  :::note[An optional custom title]
  Hello, world!
  :::
  ```

- Math is written as `$inline$` or `$$display$$` $\LaTeX$ and rendered to MathML at build time.
- Inline code ending in an annotation gets syntax highlighting: `` `const x = 1{:ts}` `` highlights as TypeScript, and `` `text{:.string}` `` paints with the theme's color for a [TextMate scope](https://macromates.com/manual/en/language_grammars).

### Authors

Add author information in `src/content/authors/` as Markdown files. A file named `[author-name].md` can be associated with a blog post if `"author-name"` (the id) is added to the `authors` field:

```yml
---
name: 'enscribe'
pronouns: 'he/him'
avatar: 'https://avatars.githubusercontent.com/u/71956291?v=4'
bio: 'd(-_-)b'
mail: 'jason@enscribe.dev'
socials:
  website: 'https://enscribe.dev'
  twitter: 'https://twitter.com/enscrbe'
  github: 'https://github.com/jktrn'
---
```

The author schema is defined as follows:

| Field      | Type (Zod)                          | Requirements                                                                                                        | Required |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`     | `string`                            | n/a                                                                                                                 | Yes      |
| `pronouns` | `string`                            | n/a                                                                                                                 | Optional |
| `avatar`   | `url()` or `string.startsWith("/")` | Should be either a valid URL or a path starting with `/`.                                                           | Yes      |
| `bio`      | `string`                            | n/a                                                                                                                 | Optional |
| `mail`     | `email()`                           | Must be a valid email address.                                                                                      | Optional |
| `socials`  | `record(string, url())`             | A map of any label you like to a valid URL. Each label is matched to an icon in `src/components/SocialIcons.astro`. | Optional |

### Projects

Add projects in `src/content/projects/` as Markdown files:

```yml
---
name: 'Project A'
description: 'This is an example project description! You should replace this with a description of your own project.'
tags: ['Framework A', 'Library B', 'Tool C', 'Resource D']
image: './placeholder.png'
link: 'https://example.com'
startDate: '2024-01-01'
endDate: '2024-02-01'
---
```

The project schema is defined as follows:

| Field         | Type (Zod)      | Requirements                            | Required |
| ------------- | --------------- | --------------------------------------- | -------- |
| `name`        | `string`        | n/a                                     | Yes      |
| `description` | `string`        | n/a                                     | Yes      |
| `link`        | `url()`         | Must be a valid URL.                    | Yes      |
| `tags`        | `string[]`      | n/a                                     | Optional |
| `image`       | `image()`       | Should be exactly 1200px &times; 630px. | Optional |
| `startDate`   | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |
| `endDate`     | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |

## License

This project is open source and available under the [MIT License](LICENSE).
