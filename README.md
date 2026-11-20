# myonlinepdfeditor.com

Free, AdSense-funded PDF toolkit (edit, sign, convert, merge, split) built with Next.js and hosted on Vercel. Files are processed in the browser.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_ADSENSE_CLIENT` to your AdSense publisher ID before production.

Set `NEXT_PUBLIC_SITE_URL` to your canonical domain for sitemap/OG URLs.

## Deploy

Connect the `myonlinepdfeditor.com` folder to Vercel and deploy. No server secrets are required for core tools.

## SEO

- `app/sitemap.ts` — tools + features + static pages
- `app/robots.ts` — allows major search/AI crawlers
- `public/llms.txt` — AI-readable site summary
- JSON-LD on home and tool pages
