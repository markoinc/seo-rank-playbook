# Technical Crawl Checklist

Site-wide technical audit. Run this at launch, after any major structural change, and quarterly as a maintenance audit. This checklist covers the full index at the site level — it is not per-page (see `on-page-checklist.md` for per-page items).

---

## Index Coverage

- [ ] GSC → Indexing → Pages: review the "Not indexed" bucket. Every reason in this bucket should be understood and intentional or actioned.
  - "Crawled — currently not indexed" (check content quality and internal link equity to affected pages)
  - "Duplicate without user-selected canonical" (add or correct canonical tags)
  - "Soft 404" (pages returning 200 with empty or near-empty content — add content or return real 404)
  - "Blocked by robots.txt" (verify any blocked paths are intentionally blocked)
  - "Page with redirect" (redirected pages showing up — clean up stale redirect chains)
  - "Alternate page with proper canonical tag" (expected if you have pagination, but verify intent)
- [ ] GSC → URL Inspection: spot-check your 10 most important pages. Confirm each shows `coverageState: INDEXED`. Do NOT rely on the GSC sitemap indexed count (it is unreliable — often shows 0 even for fully-indexed sites).
- [ ] No pages inadvertently carrying `<meta name="robots" content="noindex">` from development or staging.
- [ ] No live pages blocked via `X-Robots-Tag: noindex` HTTP header (verify with `curl -I https://example.com/page/`).
- [ ] Pages count in GSC (indexed) aligns with your expected content count (±10%). Large discrepancies indicate either crawl exclusions or a rendering failure.

---

## Soft-404 Detection

- [ ] Search GSC Coverage for "Soft 404" errors. For each:
  - Does the page return HTTP 200 with real content? → Fix the content.
  - Does the page no longer exist? → Return HTTP 404 or 410, or redirect to a relevant live page.
- [ ] Programmatic/template pages: verify each template populates all fields at build time. An empty programmatic page (missing city name, missing listing data) registers as a soft-404.
- [ ] A dedicated `404.html` file exists and is pre-rendered/deployed as a real static file.
- [ ] Test your 404 page: visit a non-existent URL and confirm the page returns HTTP 404 (not 200) and displays your real 404 template.

---

## Orphan Pages

- [ ] No pages are accessible only via the sitemap with zero internal links pointing to them. Every page that should rank must receive at least one internal link from a page that is itself linked.
- [ ] Run a crawl (Screaming Frog, Sitebulb, or equivalent) starting from the homepage. Compare the URLs discovered to the sitemap. URLs in the sitemap but NOT discovered in the crawl are orphans.
- [ ] Orphan pages: either add internal links pointing to them, or remove them from the sitemap if they are not intended to be discoverable.
- [ ] Verify hub/pillar pages link to all their spokes. A hub page missing spoke links is a partial orphan problem.
- [ ] Check that the homepage links to at minimum your 3–6 primary hub/category pages.

---

## Sitemap Freshness

- [ ] Sitemap is regenerated automatically at every deploy (not a manually maintained file).
- [ ] `<lastmod>` dates in the sitemap reflect actual content modification timestamps (not the deploy date of every URL).
- [ ] All new pages added to the site appear in the sitemap within one deploy cycle.
- [ ] Deleted or redirected pages are removed from the sitemap promptly.
- [ ] No URLs in the sitemap return 404 or 301 — sitemap should contain only canonical, live, 200 URLs.
- [ ] Sitemap URL count in the file matches your expected live page count.
- [ ] If site has >50,000 URLs: sitemap index file (`sitemap-index.xml`) used to split into chunks of ≤50,000 URLs each.
- [ ] GSC → Sitemaps → confirm "Success" and "Last read" date is recent (< 7 days).
- [ ] Bing WMT sitemap is also updated (re-submit or verify Bing re-fetched the sitemap URL).

---

## Canonical Consistency

- [ ] Every page has a canonical tag.
- [ ] Canonical URLs are absolute (not relative paths).
- [ ] Canonical URL convention is consistent site-wide: either all trailing-slash (`/page/`) or all no-trailing-slash (`/page`). Mixed conventions cause canonical mismatches.
- [ ] Canonical in `<head>` matches URL in sitemap matches actual page URL — all three must agree.
- [ ] `www` vs. non-`www` resolved: the site serves content on one version only; the other redirects. Canonical always uses the authoritative version.
- [ ] HTTPS used in all canonical tags (never `http://`).
- [ ] Pagination: paginated pages have canonical pointing to themselves (not to page 1), unless you are intentionally consolidating paginated content.
- [ ] No cross-domain canonicals unless intentional (syndicated content).

---

## Crawl Budget Considerations (large sites only)

*Applies to sites with 500+ pages. Smaller sites rarely have crawl budget constraints.*

- [ ] HTML page size: < 2MB per page (aim for < 200KB). Oversized pages slow Googlebot's crawl rate.
- [ ] URL parameters: faceted navigation, filter URLs, and sort parameters are either canonicalized to the clean URL, blocked in robots.txt, or handled via GSC URL Parameters tool.
- [ ] Infinite scroll / client-side pagination: ensure crawlers see paginated HTML, not a wall of content with no page breaks.
- [ ] Session IDs and tracking parameters stripped from internal links (e.g., `?sessionid=abc123` in internal hrefs confuses crawlers and wastes crawl budget on duplicate URLs).
- [ ] Internal site search result pages blocked (`/search?q=...`): these are low-value, near-duplicate pages that consume crawl budget.
- [ ] "Drip-publish" discipline on fresh domains: publish at most ~50 pages in month 1. A fresh domain spiking 500+ pages risks triggering Google's quality hold — authority pages first, then scale.
- [ ] Pagination pages added to sitemap (pagination acts as an index multiplier for programmatic directory sites — if you have directory listings, paginate them to expose all entries to crawlers).

---

## Mobile Optimization

- [ ] Site is mobile-first responsive — layout adapts correctly from 320px to 1440px viewport width.
- [ ] Google's Mobile Usability report in GSC shows zero critical errors.
- [ ] Tap targets (buttons, links) are at least 48×48px with adequate spacing.
- [ ] Text readable without zooming (base font size ≥ 16px on mobile).
- [ ] No horizontal scrolling on mobile at any viewport width.
- [ ] Content is not hidden on mobile that is visible on desktop (Google uses the mobile version for indexing).
- [ ] Images and media scale correctly on mobile (no overflow, no clipping).

---

## Core Web Vitals (Field Data)

*Field data = real user data. More important than lab scores for rankings.*

- [ ] GSC → Experience → Core Web Vitals: check the "Mobile" tab for pages flagged "Poor" or "Needs Improvement."
- [ ] LCP (Largest Contentful Paint): target < 2.5 s (good). Common causes of LCP failure: large unoptimized hero images, render-blocking resources, slow server response.
- [ ] CLS (Cumulative Layout Shift): target < 0.1 (good). Common causes: images without `width`/`height` attributes, fonts causing layout shift on load, dynamically injected content above existing content.
- [ ] FID / INP (First Input Delay / Interaction to Next Paint): target < 100 ms (good). Common causes: heavy JavaScript, third-party scripts blocking the main thread.
- [ ] For each "Poor" URL in GSC CWV report: identify the specific element failing (GSC will group by cause), then fix at the template level.
- [ ] After fixes: CWV field data takes 28+ days to update in GSC (it reflects the prior month's user sessions). Use Lighthouse or PageSpeed Insights for pre-fix validation, but track GSC for post-fix confirmation.

---

## Redirect Audit

- [ ] No redirect chains longer than 1 hop for any URL a user or crawler would request (A → B → C should become A → C).
- [ ] No redirect loops (A → B → A).
- [ ] All 301 redirects from old URLs to new URLs are in place after any migration.
- [ ] Old sitemap URLs removed from GSC if they 301 to new structure.
- [ ] Verify redirects with `curl -I https://example.com/old-url/` — confirm it returns 301 with the correct `Location` header.

---

## Link Equity Flow

- [ ] Every page a backlink points to returns HTTP 200 (not 404 or redirect). Backlinks to 404 pages waste link equity.
- [ ] Redirected pages that receive backlinks: confirm the 301 destination page is the intended ranking target.
- [ ] Homepage passes equity downward to hub pages via clear internal linking.
- [ ] `rel="nofollow"` not applied to any internal links (internal nofollow blocks PageRank from flowing to your own pages).
- [ ] No more than 150–200 internal links on any single page (excessive internal links dilute per-link equity and can trigger thin-page signals).

---

## Structured Data Site-Wide

- [ ] GSC → Enhancements: check for structured data errors on page types that use schema.
- [ ] No schema type used on a page that doesn't match the page content (e.g., `Product` schema on a blog post).
- [ ] `sameAs` entity links (to Wikidata, LinkedIn, Crunchbase, etc.) present on the `Organization` schema on the homepage.
- [ ] `BreadcrumbList` schema added to inner pages (helps GSC display breadcrumbs in SERPs).
- [ ] Review-count in `AggregateRating` schema is not hardcoded — it is pulled from your actual review count dynamically.

---

## Server & Hosting Configuration

- [ ] HTTPS enforced: HTTP → HTTPS redirect active. All internal links use `https://`.
- [ ] SSL certificate valid and not expiring within 30 days.
- [ ] Server response time (TTFB) < 200ms for the homepage (test from a US server location).
- [ ] Gzip or Brotli compression enabled for HTML, CSS, and JS responses.
- [ ] Appropriate cache headers: static assets (`/assets/*`) have `Cache-Control: max-age=31536000, immutable` only if asset URLs are content-hashed. HTML pages: `Cache-Control: no-cache` or `max-age=0, must-revalidate` so updates propagate to returning visitors immediately.
  - ⚠️ Do NOT use `immutable` on fixed-filename assets without content-hashing — returning browsers will run stale JS forever.
- [ ] Security headers present: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or `SAMEORIGIN`), `Referrer-Policy: strict-origin-when-cross-origin`.
