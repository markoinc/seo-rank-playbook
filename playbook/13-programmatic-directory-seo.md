# Programmatic and Directory SEO

**Purpose:** Build a scalable page architecture that ranks across hundreds or thousands of geo/niche keyword combinations — using one template × many data rows. Covers niche validation, data pipeline, URL structure, content differentiation, indexing, and monetization.

**When to use:** When your target keyword has meaningful volume across many cities or subtypes (e.g. "[niche] in [city]" × 500 cities, or "[type] [niche]" × 30 types × 50 states). Not for sites where each page requires genuinely unique expert writing — programmatic SEO serves informational/directory intent, not deep editorial intent.

---

## The SOP

### Part 1 — Niche validation (before building anything)

Validate any niche against all 7 filters before committing to a build. Failing one filter is a reason to pause; failing two is a reason to stop.

**7-filter validation framework:**

1. **KD < 20 with meaningful search volume.** Use DataForSEO or Ahrefs. KD 0–4 = winnable with on-page alone on a new domain. KD 5–20 = requires some off-page authority over 6–12 months. KD 21+ = skip unless you have an existing authority site.
   - Individual keyword sweet spot: 300–1,500/mo per city keyword
   - Total niche volume sweet spot: 30K–100K total across all geo variations

2. **Competition research.** This is the #1 deal-breaker. Search your head term. Look at what's ranking:
   - Are the top 3 positions held by Wikipedia, government sites, or DR 80+ news outlets? Skip.
   - Are the top 3 dominated by thin, poorly maintained directory sites? Green flag.
   - Are there already 5+ well-funded, active directory sites in the niche? Find a sub-niche or skip.
   - A 30-second Ahrefs scroll on the SERP tells you whether to continue. KD < 20 and weak incumbents = proceed.

3. **Solving a real problem.** Does the directory provide genuine value to a visitor? "Find [niche] near me" has clear user intent. "List of [obscure topic]" may not. If you can't articulate the visitor's problem in one sentence, the niche lacks viable search intent.

4. **Clear search intent.** Is the intent informational (find a thing) or commercial (buy a thing)? Directories serve informational and commercial-local intent best. If the head term's SERP is dominated by transactional e-commerce pages, a directory is the wrong format.

5. **Future workload and maintenance.** How often does the data change? A restaurant directory requires weekly updates. A lawyer directory requires quarterly updates. A historical architecture directory barely changes. Estimate the update burden before building.

6. **Can you improve on existing results?** Visit the current top-ranking directory. Is it slow? Has thin descriptions? No photos? Outdated data? No mobile optimization? Every gap is an improvement you can bake into your build. If the top result is excellent, the bar to beat it is very high.

7. **Monetization potential.** Identify the revenue path before building. A directory in a high-CPM niche (legal, medical, finance, home services) monetizes at far higher display ad rates than one in a low-CPM niche (hobby, entertainment). Know the revenue ceiling before you invest in the build.

### Part 2 — Two build philosophies

Choose one before starting. Mixing them mid-build causes costly architectural changes.

| Philosophy | Description | When to choose |
|------------|-------------|----------------|
| **Meticulous** | One niche. Deep data. Professional design. Strong monetization plan. Every listing has 500+ words of enriched content. Launch with 500–1,000 listings at minimum. | When you've identified a niche with strong monetization and are willing to invest 3–6 months before seeing revenue. |
| **Shotgun** | Multiple niches, simpler builds, faster validation. Launch 5–10 simple directories across different niches. Double down on the ones that show early traction. Kill the others. | When you're still validating niches and want to test multiple bets simultaneously. |

For an AI agent: default to the Meticulous approach for any site intended to generate recurring revenue. Shotgun builds require human judgment calls about which niches to double down on.

### Part 3 — URL structure and page architecture

The URL structure must mirror the topical hierarchy:

```
/ (homepage — aggregate hub)
├── /[state] (50 state pages — geo hub)
│   ├── /[state]/[city] (city pages — local hub)
│   │   └── /[state]/[city]/[type] (type/category within city)
│   │         └── /[state]/[city]/[type]/[slug] (individual listing page)
│   └── /[state]/[type] (state + type aggregator)
├── /guides/ (editorial/content hub)
├── /statistics/ (linkable asset — earns passive backlinks)
├── /[niche]-calculator (tool page — earns links and AI citations)
└── /awards/[city]-best-[niche]-2026 (badges program)
```

**Page type purposes:**
- **State pages**: aggregate stats for the state, link to all city pages, link to state-level resources
- **City pages**: list all relevant listings for that city with pagination at 9–12 per page (HTML crawl limit = 2MB; keeping pages lean preserves crawl budget)
- **Type pages**: filter view by category/type within a city or state
- **Individual listing**: the single most important page type — where searchers land and convert
- **Guides**: editorial content that earns links and topical authority
- **Statistics page**: one summary page of key industry statistics — the most linkable non-listing page type
- **Calculator**: a simple tool (cost estimator, ROI calculator, lead quality scorer) — earns passive links and AI citations

**URL rules:**
- Use hyphens, not underscores
- All lowercase
- Include the primary keyword in every URL slug
- No pagination in the URL (use `?page=2` query strings for paginated pages)
- Canonical tags point to the base URL without the page parameter for paginated sets

### Part 4 — Data pipeline

#### 4.1 Data collection

Sources (use multiple for enrichment):
- **Scraping**: scrapling MCP (`stealthy_fetch` for JS-rendered sites, `fetch` for static HTML). Always check robots.txt before scraping.
- **Public APIs**: Google Places API (note: expensive — budget carefully), Open Data portals, government databases, industry association member directories
- **Manual CSV**: for smaller niches (<500 entries), a manually curated CSV is often faster and produces better data quality

#### 4.2 Data normalization

Use an AI prompt to normalize raw scraped data into a consistent schema. Example system prompt:

```
You are a data normalization specialist. Extract and normalize [Category] information into structured JSON format.

For each business, extract:
- name: Business name
- address: { street, city, state, postalCode }
- contact: { phone, website }
- description: 2–3 sentence summary of services
- categories: Array of applicable categories
- hours: Operating hours if mentioned
- notes: Any special notes

Return ONLY valid JSON array. If no businesses found, return [].
temperature: 0.1, max_tokens: 4000, chunkSize: 3000 characters per chunk
```

#### 4.3 Data enrichment

After normalization, enrich each listing:

**AI enrichment prompt pattern (dynamic, location-aware):**

```python
def create_enrichment_prompt(markdown_content: str, category: str, location: str) -> str:
    return f"""
Content scraped from a {category} website in {location}:
--- START ---
{markdown_content}
--- END ---

If irrelevant, return: {{"description": "Skipped.", "email": null, "social_media": null}}

If relevant:
1. Description: 2–3 paragraphs on services and unique qualities. Include "{location} {category}".
2. Email: Primary contact email, or null.
3. Social media: Full profile URLs (Instagram, Facebook, LinkedIn, YouTube), or null.

Return ONLY valid JSON: {{"description": "...", "email": "...", "social_media": [...]}}
"""
```

#### 4.4 Data storage and serving

For database-backed directories, use Postgres (Neon, Supabase, or self-hosted):

```sql
CREATE TABLE listings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  full_address TEXT,
  city        TEXT,
  state       TEXT,
  postal_code TEXT,
  phone       TEXT,
  website     TEXT,
  description TEXT,
  photo       TEXT,
  categories  TEXT[],
  hours       JSONB,
  lat         NUMERIC(10,7),
  lng         NUMERIC(10,7),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: public read, authenticated write
CREATE INDEX ON listings (state, city);
CREATE INDEX ON listings (state);
```

For static site generators (Astro, Next.js static export, Eleventy): export as JSON files and query at build time. Best for directories with <10K listings that don't update frequently.

### Part 5 — Content requirements per page type

Content depth rules for each page type. These are the minimum thresholds for Google to treat pages as genuinely useful rather than doorway pages.

**Individual listing pages (minimum):**
- 150–300 unique words of description (not copied from the listing's own website)
- Name, address, phone, website, hours (all in schema as well as in visible text)
- At least 1 photo
- Services list or specialties
- Links to: city hub page, 2–3 related listings in same city, 1–2 state/category pages

**City hub pages (minimum):**
- 300–500 word category intro (what to look for in a [niche] in [city], what makes [city]'s market distinct)
- Paginated listing grid (9–12 per page — stays within 2MB HTML limit)
- At least 1 FAQ specific to the city (not just "[niche] in [city]" repeated)
- Link to state hub page

**State hub pages (minimum):**
- 500–800 words about the niche in that state (state-specific laws, regulations, market characteristics)
- Stats table or data (market size, average prices, number of providers)
- Link grid to all city pages within the state
- Links to neighboring states
- State-level FAQ section

**Category/type pages (minimum):**
- 200–400 word explanation of what distinguishes this type/category
- Listing grid filtered to this type
- Cross-links to other types in same geography

**Guides and statistics pages (target):**
- Guides: 2,000–3,000 words, answer-first format, internal links to at least 5 city/listing pages
- Statistics pages: 20+ data points with sources, `Dataset` schema, date of last update visible

### Part 6 — Launch and indexing strategy

#### 6.1 Drip publishing on new domains

A fresh domain cannot absorb hundreds of pages simultaneously without crawl budget issues. The pattern:
- Month 1: Maximum ~50 pages. Build money/hub pages + top 10 geo markets first.
- Month 2: Add the next 50–100 pages as month-1 pages begin indexing.
- Month 3+: Scale to 200+ pages as domain authority builds.

Publish hub pages (state, category) first. Individual listing pages linked from a hub have better indexing rates than orphaned listing pages.

#### 6.2 Dynamic sitemap

Generate the sitemap dynamically from your database at build time (or serve it from a route that queries the DB on request). Never maintain a static sitemap manually — it will fall out of sync as listings are added.

For Astro:
```javascript
// src/pages/sitemap.xml.js
export async function get() {
  const listings = await db.query("SELECT slug, updated_at FROM listings ORDER BY updated_at DESC");
  const urls = listings.rows.map(r => `
  <url>
    <loc>https://your-site.com/listings/${r.slug}/</loc>
    <lastmod>${r.updated_at.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');
  return {
    body: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    headers: { 'Content-Type': 'application/xml' }
  };
}
```

#### 6.3 Crawl budget management

Signs of crawl budget exhaustion: pages indexed at launch, then de-indexed after 30–60 days. Causes: too many thin pages, too many orphan pages, too many duplicate/near-duplicate pages.

Prevention:
- All pages must be linked from at least one hub (no orphans)
- Paginate city pages at 9–12 listings per page (keeps individual HTML pages under 2MB crawl limit)
- Noindex thin or duplicate pages
- Use `robots.txt` to disallow admin, filter, sort, and search-parameter URLs

#### 6.4 Indexing acceleration

After every deploy:
1. Submit sitemap to GSC and Bing Webmaster
2. Use IndexNow for Bing (free, fast)
3. For high-priority new listings: submit directly via GSC URL Inspection (limit: 10/day per property)
4. For off-site content: IndexChex ($0.002/URL, confirmed sub-2-minute crawl trigger)

### Part 7 — Internal linking at scale

Internal linking for large directories must be systematic, not manual:

**Hub-spoke enforcement:**
- Every listing page → city hub page + state hub page
- Every city hub page → state hub page + 3 neighboring cities + 5 related listings
- Every state hub page → all city pages + adjacent states + national hub
- Build this linking logic into your template, not as manual per-page tasks

**Footer navigation:**
- "Popular [Niche] Cities": links to top 12 metro city pages
- "Browse by State": links to all 50 state pages (fold into an accordion on mobile)
- These footer links solve the "equity-starved geo page" problem (state/city pages otherwise only have one inbound link from the hub)

**Cross-linking among listing pages:**
- "Similar [niche] nearby": 3–5 listing pages in the same city
- "You might also be interested in": adjacent category listings in the same city

### Part 8 — Anti-doorway signals

Google's doorway page guidance targets exactly what a poor programmatic build looks like. Every anti-doorway signal must be genuine, not faked:

- Each geo variation has unique law/regulation data (not the same content with city name swapped)
- Each geo variation has unique local market data (pricing specific to that market, local competition context)
- FAQ questions are unique per geo (not templated "How much does [niche] cost in [City]?" × 500 cities)
- Meta descriptions are unique per page (not "[niche] in [City] — find the best [niche] in [City]")
- Run programmatic duplicate-detection after every build: compare all page pairs for sentence-level overlap. Target: 0 pairs with >40% overlap. Any pair above threshold gets manually rewritten.

### Part 9 — Monetization

Build for traffic first. Monetization follows attention. Honest timeline to revenue: 6+ months.

**Monetization tiers by traffic volume:**

| Traffic | Model | Notes |
|---------|-------|-------|
| 0–10K pageviews/month | Ezoic / AdSense | No minimum; low CPM |
| 10K sessions/month | Mediavine Journey | Apply early — they now accept as low as 10K sessions |
| 50K sessions/month | Mediavine standard | ~$20–50+ RPM in high-CPM niches |
| 100K+ pageviews | Raptive (formerly AdThrive) | Highest display ad CPM; invitation-based |
| Any traffic | Lead overflow brokerage | Callscaler, Elocal, ServiceDirect: $50–150/lead wholesale in high-value niches |
| Any traffic | Premium listings / featured placements | Charge listings a monthly fee to appear first, with an enhanced profile |
| Any traffic | Digital products | Guides, checklists, tools sold via Gumroad or Kit/ConvertKit |
| 20K–50K visits | Display ads (reference) | ~$1,000/month at these volumes (CPM varies by niche) |

Display ad revenue per visit in high-value niches (legal, medical, finance, home services) can be 10–20x higher than in low-value niches. The niche selection decision has more impact on revenue than any other factor.

### Part 10 — Badges and awards program

The badges play earns passive backlinks (listings link to their award page to display the badge):

1. Create an awards page: `/awards/best-[niche]-in-[city]-2026`
2. Select 15–20 businesses per award (real selection criteria — accuracy matters for trust)
3. Use AI to generate embeddable HTML badge code with your badge image hosted on your CDN
4. Reach out to all award winners with congratulations + badge embed code
5. Each business that displays the badge creates a link back to your award page
6. Award page internally links to listing pages of all winners → equity distributes

For advanced GEO: build `[brand]awards.org` + `[brand]awards.wiki` (Wikipedia-format) as separate entity domains. Community case: site ranked #1 organically AND appeared in AI Overviews within 3 days. This works because `.org` and `.wiki` TLDs carry trust signals, and Wikipedia-format content is heavily cited by AI engines.

---

## Standards & Thresholds

| Metric | Standard |
|--------|----------|
| KD target for niche entry | ≤ 20 (conservative: ≤ 5) |
| Individual keyword volume sweet spot | 300–1,500/mo per city keyword |
| Total niche volume sweet spot | 30K–100K |
| Minimum listing description | 150–300 unique words |
| City page intro | 300–500 words |
| State page content | 500–800 words |
| Guide length | 2,000–3,000 words |
| Directory launch minimum | 500–1,000 listings |
| Maximum pages month 1 (fresh domain) | ~50 pages |
| City page pagination | 9–12 listings per page |
| HTML crawl limit | 2MB per page (Google) |
| Image size target | Under 100KB (50KB at 1,000px for optimal speed) |
| Pair duplicate detection threshold | 0 pairs over 40% sentence-level overlap |
| Honest revenue timeline | 6+ months minimum |
| Mobile traffic share | ~80–83% on most directories |

---

## AI-Agent Checklist

**Before building (validation gate):**
- [ ] All 7 niche filters evaluated
- [ ] KD < 20 confirmed via DataForSEO
- [ ] Competition research: top 3 positions have exploitable weaknesses
- [ ] Monetization path identified before first line of code
- [ ] URL structure mapped (home → state → city → listing hierarchy)
- [ ] Build philosophy chosen (Meticulous vs Shotgun)

**Data pipeline:**
- [ ] Data source identified (scraping, API, or manual CSV)
- [ ] Data normalized to consistent schema (all fields present and consistent)
- [ ] Data enriched with AI-generated descriptions (minimum 150 words per listing)
- [ ] Duplicate listings removed
- [ ] Photos collected for at least 30% of listings
- [ ] GPS coordinates populated (for geo schema)

**Build checklist:**
- [ ] SSG or SSR framework chosen (not CSR/SPA without prerender — will not rank)
- [ ] URL structure follows state/city/type/listing hierarchy
- [ ] Dynamic sitemap generated from DB (not manually maintained)
- [ ] `LocalBusiness` or appropriate schema on every listing page
- [ ] City hub pages have 300–500 words of unique local content
- [ ] State hub pages have 500–800 words of unique state-level content
- [ ] No orphan pages (every listing links to city hub; verified programmatically)
- [ ] City pages paginated at 9–12 listings per page
- [ ] Footer "Popular Cities" links to top 12 city hubs
- [ ] Footer "Browse by State" links to all 50 state hubs
- [ ] Pair duplicate detection run: 0 pairs over 40% overlap

**Launch and indexing:**
- [ ] Month 1 capped at ~50 pages (fresh domain)
- [ ] Hub pages indexed first, listing pages second
- [ ] Sitemap submitted to GSC and Bing Webmaster
- [ ] IndexNow pinged for all new URLs
- [ ] GSC URL Inspection run on 5–10 priority pages

**Ongoing (monthly):**
- [ ] New listing pages added in batch
- [ ] Sitemap regenerated to reflect new pages
- [ ] IndexNow pinged for new URLs
- [ ] Pair duplicate check re-run
- [ ] Crawl budget check: are pages staying indexed? (GSC Coverage report)

---

## Common Mistakes and Risks

**Publishing 5,000+ pages on a new domain in the first month.** Google crawls a fixed number of pages per day based on your domain's crawl budget. A fresh domain's budget is low. Dumping thousands of pages means most are never crawled. Those that are crawled and found thin get de-indexed. Traffic spikes in month 1 then crashes — a common programmatic SEO failure mode. Cap at ~50 pages in month 1.

**Thin content that is just a name and address.** A listing page with 20 words of content is a doorway page by Google's standards. It will index, briefly, then be de-indexed. Every listing page needs at minimum 150–300 unique words of enriched description — not scraped from the listing's own website.

**Site-focus dilution.** Adding adjacent-but-different topics to a directory site can tank rankings across the entire site. Documented case: a weight-loss site that added 33% composting content lost 90%+ of its revenue ($40K/mo to $4–5K/mo). Stick to one primary taxonomy. Don't be a [niche A] directory that also covers [loosely related niche B]. Google tokenizes topics linearly, not semantically — adjacent may not be related in the algorithm's model.

**Ignoring the 2MB HTML crawl limit.** Google only crawls the first 2MB of a page's HTML. A city page with 100+ listings in a single HTML file will have many listings invisible to Googlebot. Paginate at 9–12 listings per page.

**No off-page authority on a new domain.** On-page quality is necessary but not sufficient for rankings. In competitive niches (KD 10–20), a new domain needs backlinks to push hub pages onto page 1. Build foundational links (niche edits, local citations, entity directories) as soon as core pages are indexed.

**Marrying one monetization model too early.** Display ads are the obvious choice but require significant traffic volume before generating meaningful revenue. Starting with lead-gen or premium listing fees can generate revenue at lower traffic levels. Don't build the entire site structure around a monetization model that requires 50K sessions/month when you're at 2K.

**Neglecting content freshness.** Google's freshness signals favor recently updated content. A "Best [niche] in [city] 2024" page in 2026 signals staleness. Add a visible "Last updated: [Month Year]" to all hub and listing pages. Update hub content at least quarterly. Update the `dateModified` in schema every time you update the page.
