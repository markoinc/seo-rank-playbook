# PageSpeed & Core Web Vitals

**Purpose:** Achieve green Core Web Vitals scores in the field so that page quality and content depth translate into rankings — and so AI crawlers (which skip high-TTFB pages) can actually reach every URL.

**When to use this:** During initial build, before every deploy, and when field metrics drop below the green threshold in GSC's Core Web Vitals report.

---

## The SOP

### 1. Target field metrics, not just Lighthouse lab scores
- Lab scores (Lighthouse, PageSpeed Insights) vary ±5–7 points run-to-run. Google uses **field metrics** (Chrome User Experience Report / GSC Core Web Vitals report) for ranking.
- Fix what the GSC Core Web Vitals report flags as "Poor" or "Needs Improvement" first.
- Lab scores are diagnostic tools, not ranking inputs.
- Tools: PageSpeed Insights, Lighthouse (DevTools), GTmetrix, WebPageTest, GSC Core Web Vitals report.

### 2. Fix LCP first — it has the largest ranking impact

**LCP (Largest Contentful Paint) thresholds:**

| Range | Status |
|-------|--------|
| <2.5s | Good |
| 2.5–4.0s | Needs Improvement |
| >4.0s | Poor |

Steps to fix LCP:
1. **Identify the LCP element** — run Lighthouse; click the LCP element in the audit output. It is almost always the hero image or the largest H1.
2. **Prerender to static HTML** — LCP on SPAs is dominated by the time-to-JS-execution. Prerendered static HTML eliminates this completely.
3. **Eager-load the LCP image** — set `loading="eager"` (not `lazy`) on the hero/LCP image. Set `fetchpriority="high"`.
4. **Remove blocking third-party scripts** — identify all third-party scripts loading on page load (analytics, pixels, visitor-ID tools, chat widgets). Defer every non-critical script to first user interaction.
5. **Do not defer analytics to scroll or mousemove events** — headless crawlers (Lighthouse, Googlebot) trigger scroll events during crawl. Instead, gate heavy scripts on `setTimeout` after `DOMContentLoaded` or on the first `pointerdown`/`touchstart`. This preserves real-user conversion tracking while keeping LCP clean for crawlers.
6. **Preconnect to key third-party origins** — add `<link rel="preconnect" href="https://fonts.googleapis.com">` for any font or CDN your LCP depends on.
7. **Use a CDN** — Cloudflare Pages / Vercel edge serves assets from the nearest PoP, reducing round-trip time.

### 3. Fix CLS — explicit dimensions on every image and embed

**CLS (Cumulative Layout Shift) thresholds:**

| Range | Status |
|-------|--------|
| <0.1 | Good |
| 0.1–0.25 | Needs Improvement |
| >0.25 | Poor |

Steps to fix CLS:
1. **Set explicit `width` and `height` attributes** on every `<img>` tag. This lets the browser reserve space before the image loads.
2. **Set `aspect-ratio` in CSS** for any element whose dimensions are set dynamically.
3. **Load fonts from your own domain** — Google Fonts loaded from `fonts.gstatic.com` can cause layout shift. Self-host fonts or use `font-display: optional` to prevent invisible-text flash.
4. **Avoid inserting DOM elements above existing content** after load (ads, banners, cookie notices).

Target CLS: 0 (zero). This is achievable with explicit dimensions on all images.

### 4. Fix FID / INP — reduce main-thread blocking

**FID (First Input Delay) thresholds:**

| Range | Status |
|-------|--------|
| <100ms | Good |
| 100–300ms | Needs Improvement |
| >300ms | Poor |

FID is being replaced by INP (Interaction to Next Paint, target <200ms). Both measure main-thread responsiveness.

Steps to fix:
1. **Split large JavaScript bundles** — for React/Vite apps, split the vendor chunk: `build.rollupOptions.output.manualChunks` to isolate React, router, and large dependencies into separate chunks. Reduces time-to-interactive.
2. **Minimize total JS on the critical path** — defer or remove any script not needed for first-paint content.
3. **Astro** — if choosing a framework for a new build, Astro ships near-zero JS by default and has the best CWV baseline for content/SEO sites.

### 5. Optimize images aggressively

- Format: WebP preferred; JPEG 2000 as fallback for older Safari.
- Size: compress all images below 100KB. For directories: target 50KB per image at 1,000px width (quality ≈50/100 in most tools).
- Lazy-load all below-fold images: `<img loading="lazy">`.
- Eager-load the LCP image (above-fold hero): `<img loading="eager" fetchpriority="high">`.
- Set explicit `width` and `height` on every image (CLS prevention).
- HTML pages must stay under 2MB total — do not embed large image datasets inline.

### 6. Configure Cloudflare caching correctly

In your `_headers` file:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate
```

**Immutable caching trap:** `immutable` is only safe on files with content-hashed filenames (e.g., Vite's `/assets/index-a3b4c5d6.js`). If file names are NOT hashed, `immutable` means returning browsers never re-fetch the file — they run old assets forever while fresh incognito sessions see the new version. Use `must-revalidate` for any non-hashed file.

### 7. Purge CDN cache after every deploy

- After every `wrangler pages deploy`, purge Cloudflare's edge cache.
- Verify: after deploy, `curl -I https://your-site.com/slug/` should return the new asset hash in the HTML.
- A post-deploy cache bug can cause Cloudflare to serve stale routing for new hashed JS files.

### 8. Keep TTFB low for AI crawlers

- High TTFB causes AI crawlers (GPTBot, ClaudeBot, PerplexityBot) to skip pages entirely.
- Cloudflare Pages edge serving eliminates origin TTFB for static files — prerendered HTML gets this automatically.
- For SSR pages: use Vercel Edge Functions or Cloudflare Workers to serve from the edge.

### 9. Achieve 90+ on mobile PageSpeed
- Mobile-first non-negotiable: 80–83% of directory traffic is mobile.
- Target mobile PageSpeed score: 90+ (lab score as a proxy; field metrics are the actual goal).
- Test on a throttled mobile connection (Lighthouse "Mobile" preset = 4G throttled).
- Minimum acceptable mobile score: 70. Below 70 means LCP or TBT is hurting rankings.

### 10. Validate accessibility (SEO score dependency)
- Accessibility issues (missing `aria-label`, unlabeled form elements, low contrast) affect SEO audit scores and can reduce crawler confidence.
- Fix: link every `<label>` to its `<input>` via `for`/`id`; add `aria-label` to icon-only buttons; ensure all text meets WCAG 4.5:1 contrast ratio.
- Target: Lighthouse Accessibility score 100.

---

## Standards & thresholds

| Metric | Good (target) | Needs Improvement | Poor |
|--------|--------------|------------------|------|
| LCP | <2.5s | 2.5–4.0s | >4.0s |
| CLS | <0.1 (target 0) | 0.1–0.25 | >0.25 |
| FID | <100ms | 100–300ms | >300ms |
| INP | <200ms | 200–500ms | >500ms |
| Overall page load target | <3s on 4G mobile | — | — |
| Image file size | <100KB (target 50KB/1,000px) | — | — |
| HTML page size | <2MB (Google crawl limit) | — | — |
| Mobile PageSpeed score | 90+ | 70–89 | <70 |
| Lighthouse Accessibility | 100 | — | — |
| Mobile traffic share | ~80–83% of directory traffic | — | — |

---

## AI-agent checklist

- [ ] LCP identified per page; LCP image has `loading="eager"` and `fetchpriority="high"`
- [ ] All third-party scripts (analytics, pixels, chat) deferred to first user interaction (not scroll/mousemove)
- [ ] All images: WebP format, <100KB, explicit width+height, `loading="lazy"` for below-fold
- [ ] CLS = 0: explicit dimensions on all images; fonts self-hosted or `font-display: optional`
- [ ] JS bundle split for React/Vite apps (vendor chunk separated)
- [ ] Cloudflare `_headers`: `immutable` only on content-hashed `/assets/*` files; `must-revalidate` on HTML
- [ ] CDN cache purged after every deploy
- [ ] Mobile PageSpeed score ≥90 (lab), or LCP/CLS/FID green in GSC field report
- [ ] TTFB low: static HTML served from Cloudflare edge (not origin)
- [ ] HTML per page <2MB
- [ ] Lighthouse Accessibility = 100
- [ ] Verified: `curl` of page returns <3s for first byte (no TTFB issues)
- [ ] No `preconnect` hints left for removed third-party scripts

---

## Common mistakes

**Deferring analytics to scroll or mousemove** — Lighthouse and Googlebot scroll during crawl, triggering deferred scripts. This causes the lab test to load heavy scripts and report artificially bad LCP. Defer to `pointerdown`/`touchstart` or `setTimeout(fn, 0)` after `DOMContentLoaded` instead.

**Using `immutable` on non-hashed filenames** — returning visitors' browsers never re-fetch `immutable` files. If the filename is fixed (e.g., `/bundle.js`, not `/bundle-a3b4c5.js`), dropping `immutable` is mandatory. Returning visitors will run the old bundle forever, see blank features, and get raw i18n keys — while fresh incognito sessions work fine.

**Not purging CDN cache after deploy** — Cloudflare edge nodes cache aggressively. A deploy without a cache purge means some users (and crawlers from certain PoPs) receive the old HTML and assets for hours.

**Lazy-loading the LCP image** — `loading="lazy"` delays the image that Google measures. The above-fold hero image must be `loading="eager"`.

**Setting image sizes in CSS only** — `width: 100%; height: auto` without HTML `width` and `height` attributes prevents the browser from reserving layout space. The image loads and shifts content below it (CLS).

**Testing performance without mobile throttling** — desktop Lighthouse scores are not what Google uses for mobile rankings. Always test with the Mobile preset (4G throttled). A 98/100 desktop score can be a 60/100 mobile score.

**Ignoring field metrics** — Lighthouse lab scores vary run to run and do not reflect real-user conditions. The GSC Core Web Vitals report uses Chrome field data (real users). A page that scores 90 in Lighthouse can still fail in the field if real users experience network conditions or render-blocking ads not present in lab testing.
