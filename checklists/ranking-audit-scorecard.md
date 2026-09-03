# Ranking Audit Scorecard — 300-Point System

Use this scorecard to grade a site across three domains: Technical SEO, AI SEO / GEO (Generative Engine Optimization), and Conversion Rate Optimization. Score each item, sum by category, then compute a total grade.

**Total possible: 300 points**

---

## How to Score

Each item has a maximum point value. Award the full points if the requirement is fully met, partial points if it is partially met, and 0 if it is absent.

After scoring all items, total each category (100 pts max each), then sum for the overall grade.

---

## Grade Thresholds

| Grade | Score Range | Meaning |
|-------|-------------|---------|
| A+ | 270–300 | Exceptional. Site is a strong ranking candidate. |
| A | 240–269 | Strong. Minor gaps only. Prioritize link acquisition. |
| B | 210–239 | Solid. A few high-impact gaps to address. |
| C | 180–209 | Functional but significant weaknesses. |
| D | 150–179 | Multiple critical issues requiring structural fixes. |
| F | 0–149 | Fundamental problems. Rebuild or major overhaul required. |

---

## Category 1: Technical SEO (100 points)

### 1A. Technical Foundation (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Site renders full HTML on the server (SSG or SSR — not CSR-only) | 5 | | |
| HTTPS enforced, valid SSL, HTTP redirects to HTTPS | 3 | | |
| Sitemap present, submitted to GSC, and confirmed "Success" | 3 | | |
| robots.txt correct: no accidental blocks, AI crawlers allowed | 3 | | |
| Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID/INP < 100ms | 5 | | |
| Mobile-first responsive, no mobile usability errors in GSC | 3 | | |
| No redirect chains > 1 hop; no redirect loops | 3 | | |
| **Category 1A Subtotal** | **25** | | |

---

### 1B. On-Page Fundamentals (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Every page has a unique `<title>` (30–65 chars, keyword first) | 5 | | |
| Every page has a unique `<meta description>` (70–160 chars) | 3 | | |
| Exactly one `<h1>` per page with exact target keyword | 5 | | |
| Heading hierarchy: H1 → H2 → H3, no skipped levels | 3 | | |
| Canonical tags present on every page, self-referential, absolute URL | 5 | | |
| Page load time < 3 seconds (4G simulated) | 2 | | |
| Open Graph / social meta tags present | 2 | | |
| **Category 1B Subtotal** | **25** | | |

---

### 1C. Content Quality (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Word count meets page-type minimums (800w+ money, 300w absolute minimum) | 5 | | |
| Answer-first content: direct answer in first 40–100 words | 5 | | |
| E-E-A-T signals visible: author/entity, expertise, date, citations | 5 | | |
| Internal linking: 3–5 links per 1,000 words; 8–12 on money pages | 5 | | |
| No orphan pages: every ranking target linked from at least 1 internal page | 3 | | |
| Images have descriptive alt text; WebP/AVIF format; `width`/`height` set | 2 | | |
| **Category 1C Subtotal** | **25** | | |

---

### 1D. Structured Data (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Appropriate schema type for every major page template | 5 | | |
| `FAQPage` schema on all FAQ sections | 5 | | |
| `LocalBusiness` or `Organization` schema on homepage with `sameAs` entity links | 5 | | |
| Zero critical errors in Google Rich Results Test | 5 | | |
| `datePublished` + `dateModified` on all article/blog content | 3 | | |
| `BreadcrumbList` schema on inner pages | 2 | | |
| **Category 1D Subtotal** | **25** | | |

---

**Category 1 Total (Technical SEO): _______ / 100**

---

## Category 2: AI SEO / GEO (100 points)

### 2A. Crawler Access (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| All major AI crawlers allowed: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended | 5 | | |
| `llms.txt` file present and accessible at `/llms.txt` | 3 | | |
| IndexNow wired and pinging Bing on every deploy | 2 | | |
| **Subtotal** | **10** | | |

---

### 2B. Structured Data for AI Readability (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| `FAQPage` schema present on money/service pages | 4 | | |
| `HowTo` schema on tutorial/process content | 3 | | |
| `AggregateRating` or `Review` schema where reviews exist | 3 | | |
| **Subtotal** | **10** | | |

---

### 2C. Content Structure for AI Extraction (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Direct answer in first 100 words (answer-first structure) | 4 | | |
| FAQ section on every major page (2+ questions, 40–80 word answers each) | 3 | | |
| Clear heading hierarchy that describes the page topic in scan mode | 3 | | |
| **Subtotal** | **10** | | |

---

### 2D. E-E-A-T and Entity Signals (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Entity home page (LinkedIn, Crunchbase, Wikidata, or equivalent) linked from `sameAs` in schema | 4 | | |
| Author/expert attribution on all substantive content | 3 | | |
| Credentials or experience evidence visible (portfolio, case studies, certifications) | 3 | | |
| **Subtotal** | **10** | | |

---

### 2E. Brand Mentions and Third-Party Surface Area (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Brand mentioned on ≥3 third-party platforms (Reddit, LinkedIn, HackMD, Medium, G2, Clutch, etc.) | 4 | | |
| At least one listicle on a parasite platform includes the brand/service | 3 | | |
| At least one press release distributed mentioning the brand/service | 3 | | |
| **Subtotal** | **10** | | |

---

### 2F. Content Freshness (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| `dateModified` updated on content pages when substantively revised | 4 | | |
| At least 2 content pieces published or refreshed in the last 60 days | 3 | | |
| Parasite/GEO content (HackMD, Reddit answers) refreshed within last 30 days | 3 | | |
| **Subtotal** | **10** | | |

---

### 2G. Question-Based Content (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Target queries rephrased as questions in headings (H2/H3) | 4 | | |
| "People Also Ask" style questions addressed on money pages | 3 | | |
| Content answers the full intent of the question — not just keywords | 3 | | |
| **Subtotal** | **10** | | |

---

### 2H. AI Citation Rate (10 points)

> For a competitive, quantified read (share-of-voice + citation counts vs named rivals + the AI-Overview grid) rather than this binary yes/no, run `checklists/aeo-visibility-sweep.md`.

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Site cited in Google AI Overviews for ≥1 target query | 4 | | |
| Site cited in Perplexity for ≥1 target query | 3 | | |
| Site cited in ChatGPT for ≥1 target query | 3 | | |
| **Subtotal** | **10** | | |

---

### 2I. Technical Performance for AI Bots (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Site indexed in Bing (verify in Bing WMT → Site Explorer) | 5 | | |
| AI bot traffic not blocked by server rate limits or WAF rules | 3 | | |
| `llms.txt` describes site structure, primary topic, and key entities | 2 | | |
| **Subtotal** | **10** | | |

---

### 2J. AI Platform Presence (10 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Brand mentions in AI-training data proxies: Wikipedia, Wikidata, G2/Clutch listings, academic citations | 4 | | |
| Positive brand context: reviews on platforms AI engines cite (Trustpilot, G2, Clutch) | 3 | | |
| At least monthly AI citation sweep run and documented | 3 | | |
| **Subtotal** | **10** | | |

---

**Category 2 Total (AI SEO / GEO): _______ / 100**

---

## Category 3: Conversion Rate Optimization (100 points)

### 3A. Above-the-Fold Experience (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Primary CTA visible without scrolling on mobile | 8 | | |
| Value proposition clear within 5 seconds of page load | 7 | | |
| H1 matches the intent of the search query that brought the user here | 5 | | |
| No pop-ups that appear before user has engaged for > 5 seconds (intrusive interstitials) | 5 | | |
| **Subtotal** | **25** | | |

---

### 3B. CTA Quality (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| CTA uses action + benefit language (not just "Submit" or "Click here") | 7 | | |
| CTA is visually distinct (high-contrast button color that does not appear elsewhere on the page) | 7 | | |
| CTA repeated: at top, after value-proof section, and at bottom of the page | 6 | | |
| CTA destination is correct (no broken links, no irrelevant landing pages) | 5 | | |
| **Subtotal** | **25** | | |

---

### 3C. Form Optimization (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Form has ≤4 fields (every additional required field reduces conversions) | 8 | | |
| Form includes privacy microcopy (e.g., "No spam. Unsubscribe anytime.") | 5 | | |
| Form shows a confirmation message immediately after submission | 5 | | |
| Form is accessible: labels on every field, visible focus states, error messages describe what to fix | 4 | | |
| Thank-you page / confirmation fires a GA4 `conversion` event for tracking | 3 | | |
| **Subtotal** | **25** | | |

---

### 3D. Trust and Social Proof (25 points)

| Item | Max pts | Score | Notes |
|------|---------|-------|-------|
| Genuine reviews visible on the page (star rating + at least 3 review excerpts) | 8 | | |
| Real photos present (team, product, location, work samples) — not stock photos | 5 | | |
| Key credentials or logos visible (certifications, press mentions, partner logos) | 5 | | |
| Contact information visible and real (phone, email, or address) | 4 | | |
| Microcopy removes risk near the CTA (e.g., "Free consultation," "No commitment") | 3 | | |
| **Subtotal** | **25** | | |

---

**Category 3 Total (CRO): _______ / 100**

---

## Final Score Sheet

| Category | Score | Max |
|----------|-------|-----|
| 1. Technical SEO | | 100 |
| 2. AI SEO / GEO | | 100 |
| 3. Conversion Rate Optimization | | 100 |
| **TOTAL** | | **300** |

**Grade: _______**  
**Audit date:** ____________________  
**Site URL:** ____________________  
**Auditor:** ____________________

---

## Priority Action Framework

After scoring, identify the highest-impact gaps by multiplying (points missing) × (category weight). Generally:

1. Any Technical Foundation issue (Category 1A) that blocks indexing or crawling: **Fix first, before anything else.**
2. AI SEO gaps in Crawler Access (2A) and Content Structure (2C): **Quick wins — often implementable in one deploy.**
3. CRO above-the-fold gaps (3A, 3B): **Highest revenue impact per hour of work.**
4. Content quality and E-E-A-T (1C, 2D): **Medium-term — requires writing and editing.**
5. AI citation rate (2H) and platform presence (2J): **Ongoing, 30-day cycle.**
