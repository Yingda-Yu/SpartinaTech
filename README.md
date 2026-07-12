# Spartina Technology

Company website for Spartina Technology, an AI-native studio for multimodal
digital product generation.

## Local Development

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:3000>.

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

Normal builds use the default Next.js behavior. This is the correct mode for
Vercel and other server-capable Next.js hosts.

## GitHub Pages

GitHub Pages deploys automatically when `main` is pushed. The workflow is:

- `.github/workflows/deploy.yml`
- build command: `npm run build`
- required environment:
  - `GITHUB_PAGES=true`
  - `NEXT_PUBLIC_BASE_PATH=/SpartinaTech`

The public URL is:

```txt
https://yingda-yu.github.io/SpartinaTech/
```

For local verification of the GitHub Pages static export on Windows PowerShell:

```powershell
$env:GITHUB_PAGES="true"
$env:NEXT_PUBLIC_BASE_PATH="/SpartinaTech"
npm run build
Remove-Item Env:\GITHUB_PAGES
Remove-Item Env:\NEXT_PUBLIC_BASE_PATH
```

This mode enables:

- `output: "export"`
- `basePath: "/SpartinaTech"`
- `assetPrefix: "/SpartinaTech/"`
- `images.unoptimized: true`

## Vercel Deployment

The production site is deployed on Vercel at:

```txt
https://spartina.tech
```

### Environment variables

Vercel does **not** need any environment variables by default.

- Do **not** set `GITHUB_PAGES`.
- Do **not** set `NEXT_PUBLIC_BASE_PATH`.

These are only used for the GitHub Pages backup deployment. When unset, the
site builds for the root path `/` with no basePath or assetPrefix.

If you want to override the canonical / OpenGraph URL (e.g. for a preview
deployment), set:

```txt
NEXT_PUBLIC_SITE_URL=https://spartina.tech
```

This defaults to `https://spartina.tech` already, so it is optional.

### Build settings

- **Framework Preset:** Next.js (auto-detected)
- **Build command:** `npm run build`
- **Install command:** `npm install`
- **Output directory:** (leave default — Vercel handles this)

### Production branch

- **Production branch:** `main`

Pushing or merging to `main` triggers an automatic production deployment to
`spartina.tech`.

### Vercel import steps

1. Log in to Vercel.
2. Choose **Import Git Repository**.
3. Select `Yingda-Yu/SpartinaTech`.
4. Keep **Framework Preset** as `Next.js`.
5. Do not set `GITHUB_PAGES` or `NEXT_PUBLIC_BASE_PATH`.
6. Click **Deploy**.
7. After the first deploy, bind the custom domain `spartina.tech` in
   **Settings → Domains**.

The site serves from the root path with no `/SpartinaTech` prefix.

## Future Product Upgrade

If the site grows into a full product with login, payments, generated-asset
management, or AI job queues, deploy it to a server-capable platform such as
Vercel, AWS, Alibaba Cloud, Tencent Cloud, or a VPS, and remove the static export
constraint.
