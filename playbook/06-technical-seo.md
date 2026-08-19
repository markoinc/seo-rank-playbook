# Technical SEO

**Purpose:** Ensure every page is crawlable, indexable, canonically correct, and returns the right HTTP status — so that on-page quality and content depth translate into actual rankings.

**When to use this:** During initial site build (before any content goes live), and as a pre-deploy checklist after any structural change. Technical issues are P0 — fix them before investing in content or links.

---

## The SOP

### 1. Fix rendering — the hard gate
- **CSR (client-side rendering) = you will not rank.** Content and internal links buried in JavaScript are indexed in a delayed second wave (days to weeks). Important content + internal links must be present in the initial HTML response with JavaScript disabled.
- **For React/Vue/Angular SPAs:** prerender every SEO content page to static HTML before deployment. Use a prerender script (Playwright/Puppeteer) that crawls every route and writes the full rendered HTML to disk.
- Verify: `curl -s https://your-site.com/slug/ | grep "your expected content"` — the content must appear in the raw curl output, not just in the browser.
- SSG frameworks (Astro, Next.js with static export) are preferred — they produce crawlable HTML by default.
- For remaining dynamic/interactive routes (authenticated areas, app flows), prerendering is not required. Restrict to content/SEO pages.

### 2. Prerender static HTML for SPA pages (detailed steps)

If using a React/Vite/Next.js SPA:

1. Install Playwright: `pip install playwright && playwright install chromium`
2. Create a prerender script that:
   a. Starts a local dev server on a fixed port.
   b. Iterates every content route (derive from your data/sitemap).
   c. Opens each route in headless Chromium; waits for `networkidle`.
   d. Scrolls the page to trigger lazy-loaded content.
   e. Extracts the full HTML (`page.content()`).
   f. Injects baked-in `<title>`, `<meta>`, `<link rel="canonical">`, and JSON-LD from the page's data model (do not rely on the client-side helmet rendering these — bake them in).
   g. Writes the rendered HTML to `/dist/<route>/index.html`.
   h. Processes the homepage LAST (so all other routes are already written when home is rendered).
3. Run the prerender script as part of every deploy: `build → prerender → deploy dist/`.
4. Verify rendering: JS-disabled browser load should show full content.

### 3. Configure robots.txt
- Allow all bots by default; disallow only pages that should not be crawled (search/sort/filter URLs, gated routes, app-internal routes).
- Explicitly welcome AI crawlers — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended.
- Reference `llms.txt` location in a comment.
- Reference the sitemap URL.
- See `templates/robots.txt` in this package for the canonical template.

### 4. Generate and submit sitemap.xml
- Every indexed page must appear in the sitemap. Noindexed pages must not appear.
- For programmatic/pSEO sites: build the sitemap as a dynamic route (Next.js/Astro) that queries the database at build/request time. New slugs auto-appear without a manual rebuild.
- Submit to Google Search Console (both domain property AND URL-prefix property).
- Submit to Bing Webmaster Tools.
- Implement IndexNow: after every deploy, POST all new/updated URLs to `https://api.indexnow.org/indexnow`. This notifies Bing, Yandex, and others simultaneously, and feeds ChatGPT's web search (which runs on Bing's index).
- Do NOT use Google's Indexing API at scale — Google filters/ignores it.
- The GSC sitemap "indexed count" column is deprecated and unreliable. Verify indexing via URL Inspection instead.

### 5. Enforce canonical tags
- Every page must have a self-referential canonical tag: `<link rel="canonical" href="https://your-site.com/slug/">`.
- Canonical URLs must be absolute, not relative.
- Trailing-slash consistency: decide on one form (trailing-slash or no trailing-slash) and use it everywhere — canonical, sitemap, internal links, and the server response must all agree. Every mismatch triggers a redirect = wasted crawl budget.
- The canonical must point to the URL that returns HTTP 200, not to a redirect target.
- Paginated pages each get their own canonical (do not canonical page 2 back to page 1).
- Consolidate subdomains: 301-redirect auxiliary subdomains (`www.`, `leads.`, `app.`) to the root domain. Do not develop each as a separate SEO property.

### 6. Fix soft-404s
- A soft-404 is an unknown/invalid URL that returns HTTP 200 with homepage or error content. Google indexes these as duplicate pages.
- Fix: unknown URLs must return HTTP 404 status with a real 404 page.
- In Cloudflare Pages: update `_redirects` so the SPA fallback returns a 404 status, not 200. Format: `/* /index.html 404` for the catch-all, with specific routes above it.
- Verify: `curl -s -o /dev/null -w "%{http_code}" https://your-site.com/this-does-not-exist` must return `404`.

### 7. Fix duplicate content
- www vs. apex: ensure exactly one variant serves 200; the other 301-redirects. Both serving 200 = duplicate content.
- HTTP vs. HTTPS: enforce HTTPS; HTTP must 301-redirect.
- Trailing slash: pick one form and redirect all non-canonical forms.
- Subdomains: consolidate or canonical.
- For international variants with identical English content (`/en-ca`, `/en-mx`): differentiate content or add `hreflang` tags and point canonicals appropriately.

### 8. Verify per-route meta tags are baked into HTML
- Every page must have a unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags in the server-returned HTML.
- For React SPA with react-helmet-async: these are client-side by default. Prerendering bakes them in. Confirm after build: `grep -i "<title>" dist/slug/index.html`.
- Run a programmatic check post-build: verify title uniqueness, meta description length (≤155 chars), canonical format, and OG presence across all generated pages.

### 9. Handle pagination correctly
- Each paginated page (page 2, 3...) gets its own crawlable URL.
- Each paginated URL has its own unique canonical.
- For large directory listing pages: paginate at 9–12 listings per page rather than one long page. A city page with 100 firms paginated = ~10 indexable URLs; each page stays within the 2MB crawl limit.
- HTML response must be under 2MB (Google's crawl limit). Large inline datasets, embedded scripts, or unfetched lazy content can push past this.

### 10. Allow AI crawlers through your bot-protection layer
- Cloudflare Super Bot Fight Mode (SBFM) by default challenges non-browser bots with a CAPTCHA ("Just a moment…"). This blocks GPTBot, PerplexityBot, and ClaudeBot.
- Fix options: (a) WAF skip rule matching verified-bot headers, or (b) SBFM setting → Verified Bots → set to "Allow."
- Verify: `curl -A "GPTBot/1.0" https://your-site.com/` must return full HTML content, not a challenge page.
- High TTFB also causes AI crawlers to skip pages — keep TTFB low via CDN cache.

### 11. Remove stale sitemaps and fix GSC setup
- Remove any sitemap registered in GSC from a prior domain version or old subdomain.
- Add both a domain property AND a URL-prefix property in GSC (the URL-prefix property is required to use the Disavow Tool and the URL Inspection API fully).
- GSC impressions on a young site may run 5–10× inflated due to international noise and bot traffic. Report CLICKS as the primary metric, not impressions.

### 12. Run a pre-deploy programmatic audit
After every build, before deploying:
- Title uniqueness: 0 duplicate titles.
- Meta description: all ≤155 chars; none empty.
- Canonical format: absolute URL, trailing-slash consistent, not pointing at redirects.
- Schema: 0 JSON parse errors.
- Internal link counts: 0 orphans (<3 inbound links).
- Word counts: all pages meet page-type minimums.
- HTTP status: all indexed pages return 200; funnel pages return 200 with noindex.
- Soft-404 test: junk URL returns 404.

### 13. Perform ongoing audits
- Free site audit: Ahrefs Webmaster Tools (free tier) connected to GSC.
- Fix in order: 404s → orphan pages → duplicate content → missing H1 → missing meta → broken redirects.
- Minimum fix: every issue flagged as an error (Ahrefs "red triangle") must be resolved.
- Run Render Diff (free Chrome extension) on any page showing "Crawled – not indexed" in GSC — it shows Googlebot's rendered view vs. user's rendered view side-by-side.
- After mass-deletes or noindex operations: submit an updated sitemap and use 410 (Gone) status for permanently removed pages — Google drops 410 faster than 404.

---

## Standards & thresholds

| Rule | Threshold / value |
|------|------------------|
| Rendering requirement | SSG or prerendered static HTML for all content pages |
| HTML per page | <2MB (Google's crawl limit) |
| HTTP status — indexed pages | 200 |
| HTTP status — funnel/gated pages | 200 + `noindex` meta |
| HTTP status — unknown URLs | 404 (not 200) |
| HTTP status — removed pages | 410 preferred over 404 |
| Canonical form | Absolute URL, self-referential, trailing-slash consistent |
| Sitemap | All indexed pages included; no noindexed pages |
| GSC submission | Domain property + URL-prefix property both added |
| IndexNow | Submit all new/updated URLs after every deploy |
| AI crawler verification | `curl -A "GPTBot/1.0"` returns full HTML |
| Title uniqueness | 0 duplicate titles |
| Meta description length | ≤155 chars |
| Pagination | 9–12 listings per page for large listing directories |
| Crawl depth | Every page reachable ≤3 clicks from homepage |
| TTFB target | Low enough for AI crawlers to receive the page |

---

## AI-agent checklist

- [ ] Rendering verified: `curl` of content pages returns full text (not a JS bundle)
- [ ] Prerender script runs as part of build pipeline (if SPA)
- [ ] robots.txt: AI crawlers explicitly allowed; filter-params disallowed; sitemap URL listed
- [ ] sitemap.xml: all indexed pages included, noindexed pages excluded
- [ ] Sitemap submitted to GSC and Bing Webmaster Tools
- [ ] IndexNow implemented; new URLs submitted after every deploy
- [ ] Canonical tags: absolute, self-referential, trailing-slash consistent, pointing at 200s
- [ ] Soft-404 fix: junk URL returns HTTP 404
- [ ] www/HTTP redirect: exactly one canonical domain form returns 200; others 301
- [ ] Per-route title, meta, canonical, OG tags baked into prerendered HTML
- [ ] Meta descriptions ≤155 chars, all unique
- [ ] No duplicate titles across any two pages
- [ ] Paginated pages each have own canonical; pagination at 9–12 per page
- [ ] Cloudflare bot protection: GPTBot, PerplexityBot, ClaudeBot pass through without CAPTCHA challenge
- [ ] GSC: domain property + URL-prefix property both added; stale sitemaps removed
- [ ] Ahrefs Webmaster Tools site audit: 0 red-triangle errors
- [ ] Post-build orphan check: 0 pages with <3 inbound internal links
- [ ] HTML size per page: <2MB

---

## Common mistakes

**Deploying a SPA without prerendering** — the most common technical SEO failure. Content that exists only in JavaScript is invisible to crawlers on first request, indexed days later at best, and never contributes to early ranking on a new domain.

**Canonical pointing at a redirect** — a canonical tag set to `https://your-site.com/slug` (no trailing slash) when the server redirects to `https://your-site.com/slug/` is wasted signal. The canonical must match the 200 URL exactly.

**Soft-404s from SPA fallback** — a `/* → /index.html 200` catch-all in `_redirects` causes every typo URL to return 200 with homepage content. Google indexes all of them as duplicate pages. Change the status to 404.

**Blocking AI crawlers with bot-protection** — Cloudflare's Super Bot Fight Mode presents a JavaScript challenge to non-browser bots. GPTBot and PerplexityBot fail this challenge. All prerender and robots.txt work is invisible to AI engines until this is fixed.

**Sitemap not updated after programmatic page additions** — a static sitemap file becomes stale the moment new pages are added. Build the sitemap as a dynamic route that queries the database, not as a file written once at build time.

**Trailing-slash inconsistency** — mixing `/slug` and `/slug/` across canonical tags, internal links, and sitemap creates unnecessary 301 redirects. Google resolves these but each redirect burns crawl budget.

**Not verifying renders after deploy** — testing in a browser (where JS runs) confirms the user experience, not Googlebot's experience. Always verify with `curl` or Googlebot's user agent.

**Using Google's Indexing API at scale** — Google filters and ignores bulk Indexing API submissions for general content. Use IndexNow (for Bing/ChatGPT) and GSC URL Inspection (for Google's top priority pages, 10/day limit per account) instead.
