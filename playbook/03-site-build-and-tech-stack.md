# Site Build & Tech Stack

**Purpose:** Choose and implement a tech stack that produces fully crawlable, fast, semantically correct HTML at every route — without manual work per page. The wrong stack (client-side rendering) guarantees poor rankings regardless of how good your content is. The right stack turns architecture decisions into deployed, verified pages automatically.

**When to use:** After the keyword map and architecture are finalized. The build is the implementation of those decisions, not a substitute for them.

---

## The SOP

### Step 1: Choose your stack

Pick one of these three patterns. Do not mix them.

| Pattern | When to use | Complexity |
|---------|-------------|------------|
| **Astro (static export)** | New project; programmatic content sites; directories; anything where you control page data | Low — default output is static HTML, no prerender step needed |
| **Next.js / Nuxt static export** | New project; existing team with React/Vue; need islands of interactivity | Medium |
| **SPA + Playwright prerender** | Existing React/Vue SPA you can't replace; interactive app that also needs SEO pages | High — requires a prerender pipeline |

**Hard rule: CSR (client-side rendering) is a disqualifier.** A pure client-side app (`vite build` → `index.html` with no prerendering) is not crawlable. Search engines and AI crawlers will see an empty shell. You will not rank. This is not a trade-off — it is a binary failure mode.

**If starting fresh, choose Astro.** It produces static HTML by default, has zero-JS output if desired, integrates with Cloudflare Pages natively, and scores better Lighthouse numbers with less configuration than any SPA-based approach.

### Step 2: Structure the project for zero-maintenance scaling

Build the project so adding a new page = adding one file. No manual routing updates, no sitemap edits, no build script changes.

For Astro:
```
src/
  pages/
    [slug].astro        ← dynamic route — one file handles all SEO pages
    index.astro         ← homepage
  content/
    pages/
      service-name.json   ← one data file per SEO page
      state-texas.json
      vendor-name.json
```

For SPA + prerender:
```
src/
  seo/
    types.ts            ← SeoPage interface (single source of truth for page data shape)
    content.ts          ← auto-imports all ./pages/*.ts via import.meta.glob
    pages/
      service-name.ts   ← one file per SEO page
      state-texas.ts
scripts/
  prerender.py          ← Playwright: crawls every route → static HTML + sitemap.xml + llms.txt
  indexnow_ping.py      ← notifies Bing/ChatGPT after deploy
public/
  robots.txt
  _headers              ← Cloudflare Pages cache rules
  _redirects            ← 301/302 rules
```

Auto-wiring new pages (SPA pattern):
```typescript
// src/seo/content.ts
const modules = import.meta.glob<{ default: SeoPage }>("./pages/*.ts", { eager: true });
export const seoPages: Record<string, SeoPage> = {};
for (const mod of Object.values(modules)) {
  const p = mod.default;
  if (p && p.slug) seoPages[p.slug] = p;
}
```

Add a file → it appears in routing, the sitemap, and llms.txt automatically.

### Step 3: Use a type-safe page data model

Every SEO page is expressed as a structured data object, not a hand-written HTML file. This is what enables programmatic verification, auto-sitemap generation, auto-schema injection, and zero-orphan internal link enforcement.

See `templates/page-seo-data-model.ts` for the full interface. Core fields:
- `slug` — URL path
- `pageType` — one of: `money | comparison | guide | leadtype | state`
- `title` — 30–65 chars, keyword first, brand last
- `metaDescription` — 70–160 chars, CTR-focused
- `h1` — exact target keyword, one per page
- `directAnswer` — 40–60 words, lead with the answer (feeds AI Overviews)
- `blocks` — structured body content (H2 → paragraphs → bullets → H3 subblocks)
- `faqs` — FAQ pairs (also emitted as FAQPage JSON-LD)
- `breadcrumb` — for BreadcrumbList schema
- `related` — internal links rendered as "Related Pages"

### Step 4: Prerender every SEO route to static HTML

For SPA pattern, run Playwright headless Chrome over every route after `vite build`. Bake the rendered HTML (including all Helmet title/meta/canonical tags) into static files. This is what Googlebot, GPTBot, PerplexityBot, and ClaudeBot see.

Key verification after prerendering:
- JS-off check: disable JavaScript in browser → every SEO page must be fully readable
- Per-route titles: every page must have a unique title tag in its static HTML
- Schema in static HTML: JSON-LD blocks must appear in the prerendered file, not just in the JS bundle

### Step 5: Configure Cloudflare Pages for deployment and caching

**Deploy via `wrangler pages deploy`, NOT git push.** Direct deploy bypasses git latency and gives you control over exactly what's in the build.

`public/_headers` caching rules:
```
# Immutable assets (hashed filenames — safe to cache forever)
/assets/*
  Cache-Control: public, max-age=31536000, must-revalidate

# HTML — always revalidate (never use `immutable` on HTML)
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Root files — short cache
/robots.txt
/sitemap.xml
/llms.txt
  Cache-Control: public, max-age=3600, must-revalidate
```

**Critical trap:** Do NOT add `immutable` to HTML or any files with fixed filenames. `immutable` means "this response will never change." Combined with fixed filenames, returning visitors run old code forever — they see blank new features and raw template keys while incognito windows see the correct version. Use `must-revalidate` on HTML files.

**Bot-challenge trap:** Cloudflare's "Super Bot Fight Mode" will challenge non-browser bots with a CAPTCHA. GPTBot and PerplexityBot fail this challenge — all your prerender work becomes invisible to AI. Add a WAF rule or SBFM verified-bot allowlist for AI crawlers. Verify with: `curl -A "GPTBot/1.0" https://your-site.com/your-page` — you must get full HTML, not a challenge page.

### Step 6: Add robots.txt with AI crawler allowlist

```
User-agent: *
Allow: /

# AI crawlers — explicitly welcome all
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://your-site.com/sitemap.xml
```

### Step 7: Implement IndexNow for instant indexing

IndexNow notifies Bing, Yandex, and (via Bing's partnership) ChatGPT the instant new pages are live. Google has its own indexing pipeline; IndexNow accelerates the others.

Setup:
1. Create an API key (any random string, e.g. UUID)
2. Place `{key}.txt` at the root: `public/{your-key}.txt` containing just the key string
3. Add `IndexNow: https://your-site.com/{your-key}.txt` to robots.txt
4. After every deploy, POST all new/changed URLs to `https://api.indexnow.org/indexnow` with your key

### Step 8: Defer heavy third-party scripts

Gate analytics, pixels, session replay, and chat scripts on first user interaction — not page load. This protects LCP and TBT scores.

```javascript
// index.html — deferred script loader
var evs = ["pointerdown", "touchstart", "keydown", "wheel", "click"];
function onFirst() {
  evs.forEach(function(e) { window.removeEventListener(e, onFirst, { passive: true }); });
  loadAnalytics();
}
evs.forEach(function(e) { window.addEventListener(e, onFirst, { passive: true }); });
// Fallback for bounces (loads pixel even if no interaction within 5s)
window.addEventListener("load", function() { setTimeout(loadPixel, 5000); });
```

Do NOT use `scroll` or `mousemove` as triggers — Lighthouse programmatically scrolls the page during measurement, which would fire your heavy scripts and tank the Lighthouse score.

### Step 9: Run a programmatic build verification pass

After every build, before deploying:
- Title uniqueness: every page has a unique `<title>` tag
- Meta description length: ≤ 160 chars, no mid-sentence truncation
- Canonical format: absolute URL, matches exact URL served (trailing-slash consistency)
- Word count per page: money ≥ 800, comparison ≥ 1,500, guide ≥ 2,000
- Internal link counts: every page has ≥ 3 inbound links from other pages
- Schema validity: JSON-LD parses without errors
- 200 on all intended URLs; 404 on all unknown URLs (soft-404 check)
- AI crawler access: `curl -A "GPTBot/1.0"` on 3–5 pages returns full HTML

---

## Standards & thresholds

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Client-side rendering (CSR) | Hard disqualifier | Will not rank — binary failure |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals; measure after scripts deferred |
| FID / INP (interactivity) | < 100ms | Core Web Vitals |
| CLS (layout shift) | < 0.1 | Core Web Vitals |
| Page load (general) | < 3s | Aggressive target for SEO + UX |
| Image file size | < 100KB per image | Some teams target 50KB for aggressive optimization |
| Image width | 1,000px for primary images | Balance quality vs file size |
| HTML per page | < 2MB | Google crawls only first 2MB of HTML |
| Listings per paginated city page | 9–12 | Keeps page under 2MB; creates multiple indexable URLs |
| Mobile traffic share | ~80–83% | Design mobile-first; verify in GA4 |
| `immutable` cache header on HTML | Never | Combined with fixed filenames = returning visitors run old code |
| Bot challenge on AI crawlers | Block | Verify GPTBot gets full HTML, not CAPTCHA |
| Cloudflare deploy method | `wrangler pages deploy` | NOT git push — direct deploy |
| Build verification pass | Required pre-deploy | Automate; catch errors before they go live |
| IndexNow ping | After every deploy | Accelerates Bing/ChatGPT indexing |

---

## AI-agent checklist

- [ ] Stack chosen: Astro (new projects) or SPA+prerender (existing SPA) — CSR disqualified
- [ ] Zero-maintenance routing: adding one file = new page appears in routing + sitemap + llms.txt automatically
- [ ] Type-safe page data model in place (see `page-seo-data-model.ts`)
- [ ] Every SEO route prerendered to static HTML; verified with JS disabled
- [ ] Per-route title/meta/canonical baked into static HTML at prerender time, not just in JS
- [ ] Cloudflare Pages deployment via `wrangler pages deploy` (not git push)
- [ ] `_headers` configured: `must-revalidate` on HTML, `max-age=31536000` on hashed assets only — no `immutable` on HTML
- [ ] `robots.txt` welcomes GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended
- [ ] Bot challenge disabled for AI crawlers; verified with `curl -A "GPTBot/1.0"`
- [ ] IndexNow key deployed; post-deploy ping script wired into deploy pipeline
- [ ] Third-party scripts (pixels, analytics, chat) gated on first user interaction (not `scroll`/`mousemove`)
- [ ] Programmatic build verification pass runs pre-deploy (title uniqueness, meta length, canonical, word counts, internal links, schema, 404s)
- [ ] Soft-404 check: unknown URLs return HTTP 404 status (not 200 with homepage content)
- [ ] All programmatic pages (states, types, vendors) generated from structured data — not written manually

---

## Common mistakes

**Using client-side rendering.** The #1 ranking killer. A SPA that doesn't prerender buries all content from crawlers. The fix isn't adding meta tags — it's prerendering every route to static HTML. Verified by disabling JavaScript and checking if the page is readable.

**Adding `immutable` to HTML files or fixed-filename assets.** Returning visitors run old code forever while fresh incognito windows see the correct version. The symptom is complaints from returning users about broken features; screenshots taken right after deploy look correct. Use `must-revalidate` on HTML. Only use `immutable` on hashed filenames (e.g. `main.abc123.js`).

**Cloudflare Super Bot Fight Mode blocking AI crawlers.** All prerender work is invisible to GPTBot and PerplexityBot if they receive a CAPTCHA challenge. This is a silent failure — no error in your logs. Verify with `curl -A "GPTBot/1.0"`.

**Deploying via git push instead of `wrangler pages deploy`.** Git push adds latency, can trigger CI surprises, and doesn't give direct control over exactly what's deployed. Use wrangler for all production deploys.

**Publishing hundreds of thin pages at launch.** The pattern: traffic spikes for a month, then collapses as Google de-indexes low-value programmatic pages. Cap to ~50 pages at launch; build authority with core pages first; then scale depth pages.

**Skipping the build verification pass.** Soft-404s (pages returning 200 with homepage content) are invisible in normal browsing but waste crawl budget and confuse Googlebot. Title tag duplicates slip through without a uniqueness check. Schema errors live silently in production. Automate the verification pass; catch before deploy.

**Missing the site-focus score.** Adding off-topic content to an established site can trigger whole-site ranking drops. Google tokenizes topics linearly — topics that seem adjacent may not be treated as related. One documented case: 33% off-topic content → $40K/mo → $4–5K/mo. Vet every new topic cluster before adding it to an existing domain.
