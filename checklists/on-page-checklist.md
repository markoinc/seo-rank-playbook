# On-Page Checklist

Run this checklist on every page before publishing. Use it at the template level when building programmatic pages (fix the template → all instances are correct).

---

## Title Tag

- [ ] `<title>` tag is present in the `<head>`.
- [ ] Length: 30–65 characters. Target ≤60 to prevent SERP truncation.
- [ ] Primary keyword appears first (or within first 2 words).
- [ ] Brand/location name at the end, separated by ` | ` or ` – `.
- [ ] No keyword stuffing (keyword appears once — not "Keyword | Keyword City | Keyword Services").
- [ ] Title is unique across the site — not duplicated by any other page.
- [ ] Title matches the intent of the page (informational, commercial, navigational).

---

## Meta Description

- [ ] `<meta name="description">` is present.
- [ ] Length: 70–160 characters. Target ≤155 to avoid mid-sentence SERP truncation.
- [ ] Contains the primary keyword (naturally, not forced).
- [ ] Contains an action word ("find," "compare," "learn," "get," "see").
- [ ] Accurately describes the page content — no bait-and-switch language.
- [ ] Unique — not duplicated from any other page.
- [ ] Does NOT contain double quotes (`"`) — they break the HTML attribute and truncate the meta in SERP.

---

## H1 Tag

- [ ] Exactly one `<h1>` on the page — not zero, not two.
- [ ] H1 contains the exact target keyword for this page (the specific phrase the page is optimized for).
- [ ] H1 is the first heading on the page.
- [ ] H1 is visible to crawlers in the raw HTML (not injected by JavaScript after DOM load — verify with `curl | grep "<h1>"`).
- [ ] H1 is placed above the fold or within the first visible block of content.
- [ ] H1 is not the same as the title tag (variation is fine; near-duplicate is fine; exact copy is a wasted signal).

---

## Heading Hierarchy

- [ ] Heading levels descend without skipping: H1 → H2 → H3 (never H1 → H3 directly).
- [ ] H2s cover the major sections of the page (2–6 H2s is typical).
- [ ] H2s include secondary keywords and related phrases naturally.
- [ ] H3s used for sub-points within H2 sections.
- [ ] No decorative use of headings (bold text is not the same as an H2 — use `<strong>`, not `<h2>`, for emphasis that is not a structural section heading).

---

## Content Depth

- [ ] Word count meets the minimum for the page type:
  - Money / service pages: 800–1,500 words
  - Comparison / "vs." pages: 1,500–2,500 words
  - Comprehensive guides / pillar pages: 2,000–3,000+ words
  - Directory listing pages: 150–300 words per listing card
  - Local / city landing pages: 1,500+ words
  - Any page: minimum 300 words
- [ ] Content opens with a direct answer to the main query in the first 40–100 words (answer-first format for AI Overview eligibility and featured snippet eligibility).
- [ ] First 100 words do not include boilerplate ("Welcome to our website…", "In this article, we will cover…").
- [ ] Content covers the primary topic completely — a user who reads this page should not need to go elsewhere for the core answer.
- [ ] E-E-A-T signals present:
  - [ ] Author or entity name visible
  - [ ] Experience/credentials indicated where relevant
  - [ ] Date published and date modified visible on blog/news content
  - [ ] Citations or references linked where factual claims are made
- [ ] No AI-generated content that is factually hallucinated, redundant, or filler (every paragraph must add new information).

---

## Internal Links

- [ ] Minimum 3 internal links per 1,000 words of content.
- [ ] Minimum 8–12 internal links on money/hub pages.
- [ ] Each internal link uses descriptive anchor text — not "click here" or "read more."
- [ ] Anchor text variation: target 30% exact-match / 40% partial-match / 20% branded / 10% generic.
- [ ] Links flow toward the site's hub pages and money pages (hub-and-spoke architecture).
- [ ] No internal links point to pages with `noindex` meta tag.
- [ ] No internal links use `rel="nofollow"` for internal content (reserve nofollow for external affiliate/sponsored links).
- [ ] Orphan page check: this page is linked from at least one other internal page (not only accessible via sitemap).

---

## Schema Markup

- [ ] Appropriate schema type added for this page type (see list below).
- [ ] Schema validated — zero critical errors in Google Rich Results Test.
- [ ] Schema is in the `<head>` (as `<script type="application/ld+json">`) — not inline on the body.
- [ ] `@context: "https://schema.org"` present.
- [ ] `@id` uses the canonical URL of this page.
- [ ] `dateModified` updated whenever content is significantly changed.

**Schema type by page:**
- Service / money page → `Service` or `LocalBusiness`
- Blog post / article → `Article` or `BlogPosting`
- FAQ section → `FAQPage` with `Question` and `acceptedAnswer`
- Review page → `Product` or `LocalBusiness` + `AggregateRating`
- How-to / tutorial → `HowTo` with `HowToStep` items
- Event → `Event`
- Product → `Product` with `Offer` and optionally `AggregateRating`

---

## FAQ Section

- [ ] Page includes at least one FAQ section (improves Featured Snippet and AI Overview eligibility).
- [ ] FAQ questions are written exactly as users type them (use GSC query data as the source of truth).
- [ ] Each answer is 40–80 words — concise, direct, complete.
- [ ] `FAQPage` schema wraps the FAQ section.
- [ ] FAQ questions cover the long-tail queries surface area for this page's topic.
- [ ] No duplicate FAQ questions across pages (each page's FAQs are specific to that page's angle).

---

## Images and Alt Text

- [ ] At least one relevant image or visual element on the page.
- [ ] Hero/above-fold image: format is WebP or AVIF.
- [ ] All `<img>` tags have a non-empty `alt` attribute.
- [ ] Alt text describes the image content accurately — includes the keyword naturally if it fits; never forced.
- [ ] Decorative images (spacers, icons) use `alt=""` (empty alt, not missing).
- [ ] `width` and `height` attributes set on all images to prevent layout shift (CLS).
- [ ] Image file names are descriptive (`red-widget-product-photo.webp`, not `IMG_00473.jpg`).
- [ ] No images above 200KB (aim for <100KB for above-fold images).
- [ ] `loading="lazy"` on all below-fold images.
- [ ] `fetchpriority="high"` (or `loading="eager"`) on the largest above-fold image (the LCP candidate).

---

## Canonical Tag

- [ ] `<link rel="canonical" href="https://example.com/this-page/">` is present.
- [ ] Canonical URL is absolute (not relative).
- [ ] Canonical URL matches this page's actual URL exactly (trailing slash matches sitemap convention).
- [ ] Canonical points to itself (not to a parent or hub page, unless this is an intentional consolidation decision).
- [ ] Canonical URL appears in the sitemap.

---

## Social / Open Graph Tags (if applicable)

- [ ] `<meta property="og:title">` present.
- [ ] `<meta property="og:description">` present (can mirror meta description).
- [ ] `<meta property="og:image">` present — image is at least 1200×630 px.
- [ ] `<meta property="og:url">` matches the canonical URL.
- [ ] `<meta property="og:type">` set (`website`, `article`, etc.).

---

## Final Spot-Checks

- [ ] Page loads without JavaScript errors in the browser console.
- [ ] No lorem ipsum or placeholder text present on the page.
- [ ] All outbound links open (`rel="noopener"` on `target="_blank"`) and are not broken.
- [ ] Spelling and grammar check passed.
- [ ] Primary CTA (call-to-action) is visible above the fold.
- [ ] Mobile layout is readable — no horizontal scroll, no text too small to tap.
- [ ] `curl -s https://example.com/this-page/ | grep "primary keyword"` returns a match (confirms keyword is in the server-rendered HTML, not JS-only).
