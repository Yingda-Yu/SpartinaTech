# Spartina Technology / 米草科技

Official company website for **Spartina Technology** -- an AI-powered Industrial Vision Data Enhancement Platform.

## About

Spartina Technology builds AI solutions for industrial vision, using Generative AI (GAN, Diffusion Models, Foundation Models) to solve data scarcity, class imbalance, long-tail defects, and cross-production-line generalization in industrial inspection.

**Target Industries**: PCB/AOI, Steel/Metal Surface, Semiconductor, Lithium Battery, Solar Panel, and more.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19 + Tailwind CSS 4
- **Language**: TypeScript
- **Design**: Dark theme inspired by kling.ai -- glassmorphism, gradient accents, premium tech aesthetic
- **i18n**: Bilingual support (English / Chinese)

## Local Development

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout (dark theme, metadata, Inter font)
    page.tsx            # Homepage (section assembly)
    globals.css         # Design tokens, glassmorphism, animations
  components/
    sections/
      Hero.tsx          # Full-screen hero with gradient glows
      ProductModes.tsx  # Core capabilities (4 cards)
      Workflow.tsx      # AI data enhancement pipeline (4 steps)
      AISystems.tsx     # AI technology systems (5 systems, 3 categories)
      StudioIdentity.tsx# About us section
      Contact.tsx       # Contact / Book a Demo section
    ui/
      SiteHeader.tsx    # Glassmorphism nav with language switcher
      Section.tsx       # Reusable section wrapper
  lib/
    data.ts             # All site content (bilingual i18n data)
    utils.ts            # Utility functions
```

## Content Updates

Most public website content lives in `src/lib/data.ts`. Use it to update:

- Company name, tagline, and positioning
- Core capability descriptions
- AI system cards and categories
- Workflow steps
- Contact information
- i18n translations (English / Chinese)

## Build

```bash
npm run build
```

Normal builds use the default Next.js behavior. This is the correct mode for Vercel and other server-capable Next.js hosts.

## GitHub Pages

GitHub Pages deploys automatically when `main` is pushed. The workflow is:

- `.github/workflows/deploy.yml`
- build command: `npm run build`
- required environment:
  - `GITHUB_PAGES=true`
  - `NEXT_PUBLIC_BASE_PATH=/SpartinaTech`

The public URL is:

```
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

## Vercel

Vercel should use the normal Next.js build mode.

1. Log in to Vercel.
2. Choose **Import Git Repository**.
3. Select `Yingda-Yu/SpartinaTech`.
4. Keep **Framework Preset** as `Next.js`.
5. Do not set `GITHUB_PAGES`.
6. Do not set `NEXT_PUBLIC_BASE_PATH`.
7. Click **Deploy**.

## License

All rights reserved. Spartina Technology.
