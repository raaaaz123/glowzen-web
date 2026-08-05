# glowzen-web

The marketing site for **GlowZen**, an iOS app for facial exercise. Next.js 16
(App Router, Turbopack) with Tailwind CSS 4.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Structure

| Path | What's there |
| --- | --- |
| `app/` | Routes. `page.tsx` is the landing page; `guide/`, `privacy/`, `terms/` are the standalone pages. |
| `components/` | One component per landing-page section, in the order they render. |
| `lib/` | Content data — see below. |
| `public/` | Screenshots, before/after images, app icon. |

### Content lives in `lib/`, not in components

The FAQ, the exercise catalogue and the site facts are each rendered by more
than one consumer: the visible page, the JSON-LD structured data, and
`/llms.txt`. Google treats structured data that disagrees with visible copy as
spam, so those lists have exactly one home.

| File | Feeds |
| --- | --- |
| `lib/site.ts` | Name, URL, tagline, exercise/zone counts, App Store URL. |
| `lib/faqs.ts` | The FAQ section, `FAQPage` markup, `/llms.txt`. |
| `lib/zones.ts` | The Areas section, the guide, `/llms.txt`. Mirrors the app's catalogue. |
| `lib/legal.ts` | `/privacy` and `/terms`. Mirrors `GlowFace/Views/Profile/LegalDocuments.swift` — edit both or neither. |
| `lib/guide.ts` | `/guide`. |

Change a fact in `lib/`, and the page, the markup and the plain-text summary
all move together.

## SEO and GEO

Generated at build time, all statically prerendered:

| Route | Source |
| --- | --- |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` — allows AI crawlers deliberately |
| `/llms.txt` | `app/llms.txt/route.ts` — plain-text brief for assistants |
| `/opengraph-image` | `app/opengraph-image.tsx` — 1200×630, generated with `next/og` |
| `/favicon.ico`, `/icon.png`, `/apple-icon.png` | `app/` file conventions |

Structured data is in `components/JsonLd.tsx` (home) and
`components/GuideJsonLd.tsx` (guide).

Two rules the copy follows, both deliberate:

- **No invented testimonials.** `components/Reviews.tsx` documents this — fake
  reviews breach the FTC's 16 CFR 465 and the UK DMCCA.
- **No `aggregateRating` or `Review` markup.** A site may not mark up reviews
  of itself, and there are no real ratings to cite yet.

## Before launch

- [ ] Set `APP_STORE_URL` in `lib/site.ts` — it fills the CTA button and the
      `installUrl` in the structured data. The CTA links to `#` until then.
- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.

## Notes

Next.js 16 has breaking changes from earlier versions — see `AGENTS.md`. Read
the bundled docs in `node_modules/next/dist/docs/` before writing route or
metadata code.
