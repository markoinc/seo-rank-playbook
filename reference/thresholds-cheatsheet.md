# Thresholds Cheat Sheet

One-line reference for every hard number across the playbook. Grouped by domain. Use this as a quick-reference when auditing or building — do not guess at numbers; use this table.

---

## On-Page SEO

| Threshold | Value | Why |
|-----------|-------|-----|
| Title tag length | 30–65 chars (target ≤60) | SERP truncates titles beyond ~60 chars |
| Title tag keyword position | Keyword first (or within first 2 words) | First-word keyword weighting in Google's title scoring |
| Meta description length | 70–160 chars (target ≤155) | GSC truncates at ~155–160 chars, causing mid-sentence cuts |
| H1 per page | Exactly 1 | Multiple H1s dilute the primary keyword signal |
| H1 position | First heading, above-fold or within first 200px | Crawlers weight early-appearing content more |
| Direct answer in copy | First 40–100 words | AI Overview and Featured Snippet eligibility requires answer-first structure |
| FAQ answer length | 40–80 words per answer | Concise enough for Featured Snippet extraction; complete enough to satisfy intent |
| Minimum word count (any page) | 300 words | Below this, high soft-404 or thin-content risk |
| Word count — money/service pages | 800–1,500 words | Enough depth to compete on commercial intent queries |
| Word count — comparison/vs. pages | 1,500–2,500 words | Comparison pages require more depth to cover alternatives fairly |
| Word count — guides/pillar pages | 2,000–3,000+ words | Comprehensive coverage required for informational anchors |
| Word count — directory listing cards | 150–300 words per listing | Enough for indexing; more risks thin duplication across similar listings |
| Word count — local/city pages | 1,500+ words | Location pages require localized depth to compete against established local results |

---

## Internal Linking

| Threshold | Value | Why |
|-----------|-------|-----|
| Internal links per 1,000 words | 3–5 links | Below this = weak topic mapping; above 8+ becomes spammy |
| Internal links on money pages | 8–12 per page | Hub pages need dense internal linking to pass and receive equity |
| Average internal links across site | ~8.4 per page (top-performer benchmark) | Observed metric from high-ranking programmatic sites |
| Max internal links on one page | 150–200 | Excessive links dilute per-link PageRank flow |
| Anchor text distribution | 30% exact-match / 40% partial / 20% branded / 10% generic | Natural distribution avoids over-optimization penalty |

---

## Core Web Vitals

| Metric | Good | Needs Improvement | Poor | Why |
|--------|------|-------------------|------|-----|
| LCP (Largest Contentful Paint) | < 2.5 s | 2.5–4.0 s | > 4.0 s | Google's ranking signal; directly impacts perceived load speed |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 | Prevents content jumping as page loads |
| FID / INP (First Input Delay / Interaction to Next Paint) | < 100 ms | 100–300 ms | > 300 ms | Responsiveness to user interaction |
| Page load time (4G simulated) | < 3 s | 3–5 s | > 5 s | Practical UX threshold; correlates with bounce rate |
| HTML page size | < 2 MB (target < 200 KB) | — | > 2 MB | Oversized HTML slows Googlebot crawl rate and increases LCP |

---

## Crawling & Indexing

| Threshold | Value | Why |
|-----------|-------|-----|
| GSC URL Inspection requests | 10/day limit | Hard API limit — do not exceed in automated scripts |
| Drip-publish on new domains | ~50 pages max in month 1 | Fresh domain spiking 500+ pages risks Google's quality deferral |
| Redirect chain max length | 1 hop | Each additional hop loses ~15% link equity and slows crawling |
| Sitemap URL cap per file | 50,000 URLs | Google/Bing spec limit — use sitemap index for larger sites |
| Crawl budget indicator | HTML < 2 MB per page | Pages over 2 MB cause Googlebot to abort mid-crawl |

---

## Keyword Difficulty Thresholds

| Source | KD ≤ | Interpretation |
|--------|------|----------------|
| Frey (conservative) | 5 | Winnable purely on-page, minimal links needed |
| Circle / Greg (aggressive) | < 20 | "Easy wins" for a new site with minimal authority |
| Circle / Greg (doable) | 40–50 | Achievable with moderate off-page effort (6–12 months) |
| Circle / Greg (possible) | 70 | Requires significant authority; possible with programmatic SEO at scale |
| New domain + zero backlinks | ≤ 4 (Ahrefs KD) | Realistic ranking window without link building; KD 15–26 requires off-page trust |

---

## Backlinks & Authority

| Threshold | Value | Why |
|-----------|-------|-----|
| Link velocity — month 1 | 5–10 new referring domains | Organic-looking velocity for a new domain |
| Link velocity — month 3 | 30+ referring domains | Minimum threshold to compete on KD 15–25 terms |
| DR (Domain Rating) target | DR 60+ by month 6–12 | Benchmark for competing in mid-difficulty niches |
| Niche edit price ceiling | $100/link | Above this, ROI becomes questionable for most niches |
| Reddit account age before link posting | 6+ months | Younger accounts have links removed or flagged by moderators |
| Reddit karma before posting links | 100+ | Below this threshold, links are commonly auto-removed |
| Reddit karma for real influence | 500+ | Threshold where comments gain community weight |

---

## Local SEO / Google Business Profile

| Threshold | Value | Why |
|-----------|-------|-----|
| GBP description length | 750 characters | Character cap; use fully |
| GBP post frequency | 2×/week minimum | Posts expire after 7 days; consistent cadence maintains freshness signal |
| GBP photos | 40+ photos | More photos correlate with higher map pack rankings and more profile views |
| GBP Q&A | 5–10 Q&As pre-populated | Prevents competitors or bots from seeding Q&As you don't control |
| Review response SLA | 24 hours | Timely response is part of the ranking audit score; also directly impacts conversion |
| Niche citation count at launch | 20–30 NAP-consistent citations | Below this, local trust signal is weak |

---

## Directory / Programmatic Sites

| Threshold | Value | Why |
|-----------|-------|-----|
| Directory launch minimum | 500–1,000 listings | Below this, the site lacks the scale to attract index authority and long-tail coverage |
| Pagination: listings per page | Site-dependent, typically 25–50 | Pagination exposes more listing cards to crawlers; each paginated page is an index multiplier |

---

## AI Visibility / GEO

| Threshold | Value | Why |
|-----------|-------|-----|
| AI Overview CTR | 38.9% | AI Overviews retain users longer; cited sites get meaningful traffic |
| AI-referred visitor conversion rate | ~27% | ~3× higher than traditional organic (2.1%); AI-referred visitors convert at 27% in measured cases |
| Citation decay rate | ~50% within 30 days | Half of AI-cited sources stop being cited within 30 days — GEO content requires monthly refresh |
| AI citation sweep frequency | Monthly minimum | Decay rate demands regular monitoring |
| LLM citation composition — listicles | 43.8% (Ahrefs study) / 72.4% (Zeeshan $10K study) | The dominant format AI engines cite; comparison/listicle content is highest-leverage |
| LLM citation composition — press releases | 24.1% (Zeeshan study) | Second-most cited format |
| GEO refresh cycle | 30–60 days | Align with citation decay; update parasite-platform listicles and Reddit answers monthly |
| Manual AI sweep per cycle | 12–20 prompts | Enough to get statistically meaningful citation rate per engine |
| Perplexity citation gap fix | Bing indexing + IndexNow | ChatGPT and Perplexity both use Bing's index; Bing non-indexing = invisible to both |

---

## SERP CTR Benchmarks

| Position / Feature | CTR | Notes |
|-------------------|-----|-------|
| #1 organic | 26.4% | First organic result average CTR |
| #2 organic | 12.1% | CTR drops roughly by half from position 1 to 2 |
| #3 organic | 6.7% | |
| Featured Snippet (position 0) | 42.9% | Highest CTR of any SERP feature |
| AI Overview (Google) | 38.9% | Sites cited in AI Overviews see strong CTR |
| Local Pack #1 | 17.6% | |
| Local Pack #2 | 15.4% | |
| Local Pack #3 | 15.1% | |
| Zero-click rate (all queries) | ~60% | 60% of all searches now end without a click |

---

## IndexNow / Indexing Tools

| Tool | Key Metric | Value |
|------|-----------|-------|
| IndexChex | Cost per URL | ~$0.002/URL (Growth plan) |
| IndexChex | Indexing verification time | < 2 minutes per URL check |
| RapidURLIndexer | Cost per URL | ~$0.05/URL |
| RapidURLIndexer | Claimed indexing rate | 91% |
| GSC URL Inspection | Daily request limit | 10/day |
| DataForSEO AI sweep | Cost per run (12–16 prompts) | $0.09–$0.58 |
| Manual AI sweep | Cost | Free |
| HackMD Pro | Monthly cost | $6/mo |
| Press release — ABNewswire / EIN Presswire | Cost per release | ~$80–$100 |

---

## Content Freshness Signals

| Signal | Standard | Why |
|--------|----------|-----|
| `dateModified` update | Every time content is substantively revised | Google's QDF (Query Deserves Freshness) uses modification dates |
| Content refresh cycle | Quarterly for evergreen pages; monthly for GEO content | Freshness signal decays; AI citation decay is 30-day |
| New content minimum | 2 pieces per month during growth phase | Below this, crawl frequency drops and freshness signals fade |
| Review response window | 24 hours | Benchmark for GBP audit scoring |

---

## Structured Data

| Item | Standard |
|------|----------|
| Schema validation errors allowed | 0 critical errors |
| `@id` format | Absolute canonical URL of the page |
| `datePublished` / `dateModified` format | ISO 8601: `YYYY-MM-DDTHH:MM:SS+00:00` |
| `AggregateRating` minimum review count | 1 (but credibility requires 5+ real reviews) |
| `FAQPage` answer length | 40–80 words per answer |
