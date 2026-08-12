# GlowZen content plan — SEO & GEO expansion

**Goal:** go from 5 pages to a content surface that ranks in Google *and* gets
quoted by assistants (ChatGPT, Claude, Perplexity, Google AI Overviews), so that
people researching face yoga meet GlowZen before they meet the App Store.

**Status:** plan only. Nothing below is built.

---

## 1. Where we are today

| Route | What it is | Ranking surface |
|---|---|---|
| `/` | Landing page | Brand terms only |
| `/guide` | 8-section beginner guide | "face yoga at home", "face score", "looksmaxxing" |
| `/support` | Requirements, permissions, data deletion | Brand + support terms |
| `/privacy`, `/terms` | Legal | None (correctly) |
| `/llms.txt` | Plain-text summary for assistants | GEO |

Already in place and worth keeping: `MobileApplication` + `FAQPage` + `Article`
structured data, `sitemap.xml`, `robots.ts`, OG images, canonical URLs, and the
`text/plain` alternate link pointing assistants at `/llms.txt`.

**The gap:** one article cannot rank for a category. Face yoga search demand
splits into hundreds of distinct questions — per body zone, per concern, per
comparison — and each one needs its own answerable URL.

---

## 2. Guardrails (read before writing a single page)

These come from the existing codebase, not from general SEO advice. Breaking one
risks App Store rejection or an FTC problem, either of which costs more than the
traffic is worth.

1. **Never name a competitor app or brand.** `app/layout.tsx` documents why:
   trademark infringement, and App Store review rejects metadata naming rival
   apps. → **All comparison pages compare *modalities*, never products.**
2. **No medical claims.** GlowZen is "a general wellbeing and fitness app… it
   does not diagnose, treat or prevent any condition." Cosmetic-concern pages
   (double chin, nasolabial folds) describe the *practice*, never promise a
   *result*.
3. **No invented testimonials, no `aggregateRating`/`Review` markup.**
   Documented in `components/Reviews.tsx` — FTC 16 CFR 465 and the UK DMCCA.
4. **Free tools must process on-device.** The whole privacy story is "no email,
   no account, photos never leave you." A tool that uploads a selfie to a server
   contradicts `/privacy` and hands a reviewer a reason to look harder.
5. **Hedge like `lib/guide.ts` already does.** "Honestly: it depends on the
   person." That tone is an asset — it is exactly what makes an assistant treat
   the page as trustworthy rather than as marketing.

---

## 3. Architecture: build a content layer, not 60 bespoke pages

The site already separates content data from presentation — `lib/guide.ts`,
`lib/zones.ts`, `lib/faqs.ts` are data; the page components are thin. **Extend
that pattern rather than hand-writing pages.**

```
lib/content/
  types.ts          shared frontmatter-ish types
  zones/            7 zone entries (extend existing lib/zones.ts)
  exercises/        18 exercise entries
  comparisons/      modality-vs-modality entries
  posts/            blog entries
  glossary/         term definitions
app/
  face-yoga/[zone]/page.tsx        generateStaticParams from zones
  exercises/[slug]/page.tsx        generateStaticParams from exercises
  compare/[slug]/page.tsx
  blog/[slug]/page.tsx
  glossary/[term]/page.tsx
  tools/[tool]/page.tsx
```

Each template is written once. `generateStaticParams` fans it out. `sitemap.ts`
maps over the same data, so a new entry is automatically indexed — no chance of
the sitemap drifting from reality.

**Consider MDX** (`@next/mdx`) for blog posts specifically, where prose needs
inline formatting. Keep zones/exercises/comparisons as typed TS objects — they
are structured records, not essays, and typing them means the JSON-LD can be
generated from the same source with no drift.

---

## 4. The content map

### Tier 1 — Programmatic pages from data we already have (highest ROI)

`lib/zones.ts` already contains 7 zones and 18 named exercises. That is **25
pages of structured content already modelled**, needing only prose added.

**7 zone hubs** → `/face-yoga/jawline`, `/face-yoga/eyes`, `/face-yoga/neck`,
`/face-yoga/cheeks`, `/face-yoga/forehead`, `/face-yoga/lips`, `/face-yoga/nose`

Each: what the zone's muscles are, what people want from it, the exercises that
target it, how often, what to avoid, FAQ. Targets "jawline exercises", "face yoga
for eyes", "neck exercises for tightening".

**18 exercise pages** → `/exercises/jawline-sculptor`, `/exercises/cheek-lifter`, …

Each: how to do it (numbered steps → `HowTo` schema), muscle worked, duration,
common mistakes, who should skip it. These are the pages assistants quote when
someone asks "how do I do the fish face exercise" — short, procedural,
unambiguous. Also the best long-tail-to-install path we have.

### Tier 2 — Comparison pages (modality, never brand)

High commercial intent, and the format assistants love because it's a table.

| URL | Angle |
|---|---|
| `/compare/face-yoga-vs-botox` | Cosmetic procedure vs exercise. Heavy hedging; describe, don't discourage. |
| `/compare/face-yoga-vs-gua-sha` | Both manual, different mechanism (lymph vs muscle) |
| `/compare/face-yoga-vs-microcurrent` | Device category vs manual |
| `/compare/face-yoga-vs-facial-massage` | Most confused pair |
| `/compare/face-yoga-vs-mewing` | Huge search volume, overlaps looksmaxxing |
| `/compare/face-yoga-vs-jaw-exercisers` | Chewing devices — genuine safety angle (TMJ) |
| `/compare/face-yoga-vs-facial-taping` | Trend-driven |

Each page: a comparison table (cost, time, invasiveness, evidence, reversibility,
risks), then honest prose on who each suits. **Do not conclude "face yoga wins"
every time** — a page that says "if you want a guaranteed change in 6 weeks, this
is not it" is the one that gets cited as balanced.

### Tier 3 — Concern pages (the real search demand)

What people actually type. Frame every one as *practice*, never *cure*.

- `/face-yoga/double-chin` · `/face-yoga/nasolabial-folds` · `/face-yoga/jowls`
- `/face-yoga/under-eye-bags` · `/face-yoga/forehead-lines` · `/face-yoga/puffy-face`
- `/face-yoga/uneven-face` (symmetry) · `/face-yoga/tmj-jaw-tension`

### Tier 4 — Blog (`/blog`)

Clusters, each linking up to a Tier-1/2 hub:

- **Getting started:** first week, common beginner mistakes, how long before anything changes, building the habit
- **Routines:** 5-minute morning routine, evening wind-down, desk-break routine, pre-event routine
- **Evidence & myths:** what the research does and doesn't show, "does face yoga cause wrinkles?", why results photos mislead
- **Looksmaxxing:** what the term means, where face yoga fits, where the community goes wrong, safety
- **Skin & lifestyle adjacents:** sleep position, hydration, sun, posture and the neck

Cadence: **1–2 posts a week beats 10 in a burst.** Freshness signals matter less
than consistency, and assistants re-crawl steadily.

### Tier 5 — Glossary (`/glossary/[term]`)

Underrated for GEO. Short, single-definition pages with `DefinedTerm` schema are
disproportionately quoted by assistants because they are unambiguous and
extractable.

Terms: face yoga · facial exercise · mewing · looksmaxxing · buccal fat ·
platysma · masseter · orbicularis oculi · gua sha · microcurrent · face scan ·
facial symmetry · nasolabial fold · jowls · lymphatic drainage · TMJ

---

## 5. Free tools (`/tools`)

The strongest asset in this plan. Tools earn links, get shared, and give a
person the app's core value in the browser before they install — which is a far
better sell than a landing page. **All client-side only.**

Ranked by (demand × conversion × build effort):

| Tool | What it does | Effort | Why it converts |
|---|---|---|---|
| **Routine builder** `/tools/face-yoga-routine-builder` | Pick zones + minutes → generated routine from `lib/zones.ts` | **Low** | It *is* the app's core loop. Ends with "get this as a guided plan" |
| **Session timer** `/tools/face-yoga-timer` | Interval timer with hold/release cues, works hands-free | **Low** | Ranks for "face yoga timer"; used repeatedly → return visits |
| **Progress photo comparer** `/tools/progress-photo-comparison` | Two photos side-by-side/slider, on-device, nothing uploaded | **Low-Med** | Mirrors the app's before/after; strong privacy story |
| **Streak tracker** `/tools/face-yoga-tracker` | localStorage habit calendar | **Low** | Habit hook; natural "keep this on your phone" prompt |
| **Goal quiz** `/tools/face-yoga-quiz` | 6 questions → recommended zones + routine | **Low** | Highest-intent path to install |
| **Symmetry checker** `/tools/face-symmetry-checker` | MediaPipe FaceMesh in WASM, fully on-device | **High** | Huge search demand — **but see warning** |

> **Symmetry checker warning.** Big traffic, big risk. It must (a) run entirely
> in-browser with no upload, (b) state plainly that it is an estimate for
> guidance and not a clinical assessment — the same language `/privacy` and
> `lib/guide.ts` already use, (c) never produce a "score out of 10" that reads
> as an attractiveness rating. Build the five low-effort tools first and treat
> this as a later, deliberate project.

Every tool page needs `WebApplication` schema, a written explainer beneath the
tool (a bare widget ranks for nothing), and an honest limitations section.

---

## 6. The GEO layer — being quotable, not just crawlable

Ranking and being cited are different problems. This is the half most sites skip.

1. **Markdown twins.** Serve `/guide.md`, `/blog/[slug].md` etc. — the same
   content as clean markdown. Assistants ingest it without stripping markup, and
   it costs one route handler reusing the existing content objects. Link via
   `alternates.types` as `/llms.txt` already does.
2. **`/llms-full.txt`** — full corpus concatenated, alongside the existing index.
3. **Answer-first structure.** Every page opens with a 40–60 word direct answer
   to its title question before any context. That paragraph is what gets lifted
   into an AI Overview.
4. **Question-shaped H2s** with stable anchor IDs (`/guide` already does this) —
   assistants deep-link to sections.
5. **Real citations for E-E-A-T.** Face yoga is health-adjacent (YMYL), so
   unsourced claims get discounted. Anchor the evidence pages to actual
   literature — e.g. Alam et al., *JAMA Dermatology* 2018, the 20-week facial
   exercise study. **Verify every citation before publishing; do not paraphrase
   from memory.** One fabricated study destroys the trust the hedged tone buys.
6. **A named author with a real bio.** Currently the site has no author entity.
   `Person` schema + an `/about` page stating who is behind GlowZen and what
   qualifies them. This is the single biggest E-E-A-T gap.
7. **Schema per template:** `HowTo` (exercises), `Article` + `BreadcrumbList`
   (blog, guides), `ItemList` (zone hubs), `DefinedTerm` (glossary),
   `WebApplication` (tools), `FAQPage` (where FAQs genuinely exist — not padded).
8. **Accurate `dateModified`.** `sitemap.ts` already warns that lying about
   `lastModified` teaches crawlers to ignore it. Same discipline in Article schema.

---

## 7. Internal linking

Flat and shallow. Nothing more than 3 clicks from `/`.

```
/  →  /face-yoga (pillar hub)  →  /face-yoga/[zone]  →  /exercises/[slug]
                               →  /face-yoga/[concern]
   →  /compare  →  /compare/[slug]
   →  /blog     →  /blog/[slug]
   →  /tools    →  /tools/[tool]
   →  /glossary →  /glossary/[term]
```

Rules: every exercise page links to its zone hub; every zone hub lists its
exercises; every blog post links to one hub and one tool; every tool links to the
guide. Add `BreadcrumbList` schema throughout. Update `app/sitemap.ts` to map
over the content collections so nothing is orphaned.

---

## 8. Sequencing

Each phase ships something indexable. Do not start the next until the previous is live.

| Phase | Scope | Why this order |
|---|---|---|
| **0 — Foundations** | Content layer in `lib/content/`, `[slug]` templates, breadcrumbs, sitemap generation, `/about` + author entity | Everything after is cheap once this exists |
| **1 — Data we own** | 7 zone hubs + 18 exercise pages (+`HowTo`) | Content is already modelled; fastest 25 pages |
| **2 — Tools** | Routine builder, timer, tracker, quiz, photo comparer | Link magnets + install conversion |
| **3 — Comparisons** | 7 modality comparisons | Highest commercial intent |
| **4 — GEO layer** | Markdown twins, `/llms-full.txt`, answer-first rewrite of `/guide`, citations | Compounds everything already shipped |
| **5 — Ongoing** | Blog 1–2×/week, concern pages, glossary | Steady freshness |

---

## 9. Measuring it

- **Search Console:** impressions by page cluster, not just totals. A zone hub
  earning impressions with no clicks means the title/meta is wrong, not the content.
- **Assistant citation checks:** monthly, ask ChatGPT/Claude/Perplexity the 20
  target questions and record whether glowzen.app is cited. This is the only real
  GEO metric and nobody's dashboard reports it.
- **Tool → App Store clicks:** the conversion number that decides whether tools
  were worth building.
- **`/llms.txt` and `.md` request volume** in server logs — direct evidence of
  assistant crawling.

Do not chase rankings for "face yoga" alone. The win is a hundred long-tail
questions each sending a few high-intent people.

---

## 10. Risks

- **Thin programmatic pages.** 25 near-identical exercise pages with two
  sentences each is a spam signal. Every page needs genuinely distinct
  substance — if there isn't enough to say about an exercise, fold it into the
  zone hub instead.
- **Claim creep.** Concern pages ("double chin", "jowls") drift toward promises
  under commercial pressure. The hedged tone is a legal control, not a style choice.
- **Tool scope.** The symmetry checker can eat a month. Ship the five easy tools first.
- **Volume over consistency.** A 40-page burst then silence performs worse than
  two pages a week sustained.
