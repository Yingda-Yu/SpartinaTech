# Spartina Technology

Company website for Spartina Technology, an AI-native studio for multimodal
digital product generation.

## Local Development

```bash
npm run dev
```

Open <http://localhost:3000>.

## Content Updates

Most public website content lives in:

```txt
src/lib/data.ts
```

Use it to update:

- Brand name, tagline, and homepage positioning
- Product modes and workflow copy
- AI system cards
- Wallpaper/product collections
- Contact links

Static assets live in:

```txt
public/images
```

Prefer lowercase ASCII filenames such as `tennis-girl-summer-01.jpg` for stable
deployment across GitHub Pages, static hosting, and custom domains.

## Build

```bash
npm run build
```

This project is configured with `output: "export"`, so production builds create
a static `out` directory that can be hosted by GitHub Pages, Cloudflare Pages,
Netlify, Nginx, or any static file server.

## GitHub Pages

For repository Pages under `Yingda-Yu.github.io/SpartinaTech`, build with:

```bash
GITHUB_PAGES=true npm run build
```

The `GITHUB_PAGES=true` flag enables the `/SpartinaTech` base path.

For a custom root domain such as `spartinatech.com`, build normally:

```bash
npm run build
```

## Future Product Upgrade

If the site grows into a full product with login, payments, generated-asset
management, or AI job queues, deploy it to a server-capable platform such as
Vercel, AWS, Alibaba Cloud, Tencent Cloud, or a VPS, and remove the static export
constraint.
