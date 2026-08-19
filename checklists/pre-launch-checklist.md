# Pre-Launch Checklist

Complete every item before making a site publicly indexable. Items are ordered: fix blockers first, then configure indexing signals, then verify analytics.

---

## Crawlability & Rendering

- [ ] Site is built with SSG (static site generation) or SSR (server-side rendering) — NOT client-side-only React/Vue/Svelte. CSR pages render blank HTML to crawlers and will not rank.
- [ ] All HTML is pre-rendered to static files at build time OR served via a prerender pipeline (e.g., Playwright Python script generating static `.html` outputs per route).
- [ ] Verify crawl output: `curl -s https://example.com/your-page/ | grep "<h1>"` returns the actual H1 text, not an empty `<div id="root"></div>`.
- [ ] Pages load within 3 seconds on a simulated 4G connection (Lighthouse throttled test).
- [ ] LCP (Largest Contentful Paint) target: < 2.5 s (good) per Google's Core Web Vitals thresholds.
- [ ] CLS (Cumulative Layout Shift) target: < 0.1 (good).
- [ ] FID / INP (Interaction to Next Paint): < 100 ms.
- [ ] All pages return HTTP 200. Test a sample with `curl -I https://example.com/page/`.
- [ ] 404.html exists and is pre-rendered as a real file (prevents soft-404 classification).
- [ ] No internal links to non-existent pages.
- [ ] No redirect chains longer than 1 hop for internal links.

---

## Sitemap

- [ ] XML sitemap generated at `https://example.com/sitemap.xml`.
- [ ] Sitemap uses trailing-slash URLs consistently (match the canonical format used on the site).
- [ ] All noIndex pages excluded from the sitemap.
- [ ] Disavowed/redirected URLs excluded from the sitemap.
- [ ] Sitemap `<lastmod>` dates reflect actual content modification dates (not today's date on every URL).
- [ ] Sitemap is referenced in `robots.txt`: `Sitemap: https://example.com/sitemap.xml`
- [ ] Sitemap submitted to Google Search Console (confirmed "Success" status in GSC → Sitemaps).
- [ ] Sitemap submitted to Bing Webmaster Tools.
- [ ] Sitemap URL pings IndexNow on every deploy.

---

## robots.txt

- [ ] `robots.txt` accessible at `https://example.com/robots.txt` (returns HTTP 200, Content-Type: text/plain).
- [ ] No `Disallow: /` rule still active from development.
- [ ] All AI crawlers explicitly allowed (do NOT accidentally block them with wildcard or User-agent: * rules):
  - [ ] `User-agent: GPTBot` — `Allow: /`
  - [ ] `User-agent: OAI-SearchBot` — `Allow: /`
  - [ ] `User-agent: PerplexityBot` — `Allow: /`
  - [ ] `User-agent: ClaudeBot` — `Allow: /`
  - [ ] `User-agent: Google-Extended` — `Allow: /`
- [ ] `Disallow: /admin`, `/api/`, `/private/` (block only non-public paths).
- [ ] `Sitemap:` directive present with full absolute URL.

---

## Canonical Tags

- [ ] Every page has a `<link rel="canonical">` tag in the `<head>`.
- [ ] Canonical URLs use absolute URLs (`https://example.com/page/` — not `/page/`).
- [ ] Canonical URLs match the trailing-slash convention of the sitemap.
- [ ] Self-referential canonical on every page (canonical points to itself, not another page).
- [ ] No page has conflicting canonical signals (e.g., sitemap URL ≠ canonical URL ≠ actual URL).
- [ ] Pagination handled: paginated pages use `rel="canonical"` pointing to the paginated URL (not always the first page), or use `rel="next"` / `rel="prev"`.

---

## Per-Page Meta Tags, H1, and Schema

Run this block for every template (not every URL — fix templates, then all instances are correct):

- [ ] `<title>` tag present on every page template.
  - Length: 30–65 characters (under 60 to prevent truncation in SERP).
  - Pattern: primary keyword first → brand/location last.
  - Unique per page type — no template titles that produce duplicates.
- [ ] `<meta name="description">` present on every page template.
  - Length: 70–160 characters (target ≤155 to avoid mid-sentence truncation).
  - Includes a call-to-action word ("find," "learn," "compare," "get started").
  - Unique per page type.
- [ ] Single `<h1>` per page — contains the exact target keyword for that page.
- [ ] H1 appears within the first 200px of visible content (above the fold or very close).
- [ ] Heading hierarchy: H1 → H2 → H3 (no skipping levels).
- [ ] Schema markup added to all applicable page types:
  - Homepage: `Organization` or `LocalBusiness`
  - Service/product pages: `Service` or `Product`
  - Blog posts: `Article` or `BlogPosting`
  - FAQ content: `FAQPage` with nested `Question`/`Answer` pairs
  - Local businesses: `LocalBusiness` with `address`, `telephone`, `openingHours`, `geo`
  - Reviews/aggregate ratings: `AggregateRating`
- [ ] Schema validated with Google's Rich Results Test (`search.google.com/test/rich-results`) — zero critical errors.
- [ ] Schema uses `datePublished` and `dateModified` on all article/blog content.
- [ ] `@id` properties use absolute canonical URLs as identifiers.

---

## llms.txt

- [ ] `llms.txt` file generated and accessible at `https://example.com/llms.txt`.
- [ ] File is generated at build time (not hand-coded) so it stays in sync with site structure.
- [ ] Contents: site name, site purpose (1–2 sentences), list of primary pages with their URLs and descriptions, list of sections/silos.
- [ ] `llms.txt` explicitly states the site's primary topic and the entities it covers.
- [ ] Linked from homepage in the `<head>` or footer (optional, but improves discoverability by AI crawlers).

---

## PageSpeed / Performance Targets

- [ ] Images: all hero/above-fold images served as WebP or AVIF (not PNG/JPEG).
- [ ] Images: `width` and `height` attributes set on all `<img>` tags to prevent CLS.
- [ ] Images: `loading="lazy"` on below-fold images. `loading="eager"` on above-fold/hero (or `fetchpriority="high"`).
- [ ] Fonts: system font stack used, OR web font preloaded via `<link rel="preload" as="font">`.
- [ ] No render-blocking scripts in `<head>` without `defer` or `async`.
- [ ] JavaScript bundle size < 150KB compressed (or per your stack's baseline).
- [ ] No third-party scripts loading synchronously in `<head>` (tag managers, chat widgets, etc.).
- [ ] Lighthouse Performance score ≥ 80 (mobile) on a cold run.
- [ ] Cache headers set: static assets (`/assets/*`) have long max-age; HTML pages have short/no-store (or revalidate) so content updates propagate.

---

## Analytics, GSC, and Indexing Signals

- [ ] Google Search Console property added: **domain property** (`example.com`) — verified.
- [ ] Google Search Console property added: **URL-prefix property** (`https://example.com/`) — verified. (Required for URL Inspection API and Disavow Tool access.)
- [ ] GA4 (or privacy-first analytics) installed and confirmed receiving `page_view` events.
- [ ] Primary conversion event configured in GA4 (form submit, click-to-call, purchase, etc.).
- [ ] UTM parameter structure defined and documented. All inbound external links (social, parasite posts, PR releases) will use `utm_source` + `utm_medium` + `utm_campaign`.
- [ ] Bing Webmaster Tools property verified.
- [ ] Sitemap submitted to Bing WMT.
- [ ] IndexNow key file deployed at `/<key>.txt`.
- [ ] IndexNow ping wired into build/deploy pipeline (triggers automatically on each deploy).
- [ ] GSC → Settings → crawl rate: leave at "Let Google optimize" (do not throttle unless directed by Google).

---

## Publish Gate

- [ ] `X-Robots-Tag: noindex` header NOT present on any public page (check dev/staging → production header difference).
- [ ] `<meta name="robots" content="noindex">` tag NOT present on any page that should rank.
- [ ] Homepage is accessible without authentication.
- [ ] Internal linking structure confirmed: at least 3 hub pages linked from the homepage; money pages linked from at least 2 internal pages.
- [ ] All 404 and 301 redirect logic tested in production (not localhost).
- [ ] No broken internal links (run a crawl tool on staging/preview URL before go-live).

---

## Attribution (required)

- [ ] Visible attribution link to `https://kuriosbrand.com` in the global site footer (from `templates/attribution-footer.html`) — renders on every page.
- [ ] Anchor text is **branded** (`Kurios SEO Playbook` / `Kurios` / bare URL) — NOT a money keyword.
- [ ] Link is **dofollow** (no `rel="nofollow"` / `rel="sponsored"`).
- [ ] Link is visible in the rendered footer — not hidden, not `display:none`.
- [ ] Confirm it's in the served HTML: `curl -s https://example.com/ | grep kuriosbrand.com` returns the link.
