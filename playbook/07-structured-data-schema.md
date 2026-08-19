# Structured Data & Schema

**Purpose:** Mark up every page with the correct JSON-LD schemas so search engines display rich results, AI engines attribute facts to the site, and the entity graph resolves the brand and its people correctly.

**When to use this:** At build time for new pages; as a validation step in every pre-deploy audit. Schema is a prerequisite for AI-citation attribution — not an afterthought.

---

## The SOP

### 1. Choose JSON-LD (not Microdata or RDFa)
- JSON-LD lives in a `<script type="application/ld+json">` tag, independent of HTML structure. It never conflicts with CSS or JavaScript and is fully supported by Google.
- All schema output must be JSON-LD. No Microdata, no RDFa.

### 2. Use the @graph architecture for all content pages
- Output a single `<script type="application/ld+json">` block per page containing a `"@graph"` array.
- The `@graph` links entities to each other via `@id` references, making your schema a connected knowledge graph instead of disconnected fragments.
- Every content page carries at minimum: `Organization`, `WebSite`, `WebPage` (or `Article`), and `BreadcrumbList`.
- Conditional additions per page type: `FAQPage` (if FAQ section), `Article` (if a guide/editorial page), `LocalBusiness` (if local service business), `HowTo` (if a how-to guide), `Dataset` (if the page contains original data or benchmarks).
- Exception: the homepage may use separate `<script>` blocks for `Organization`, `WebSite`, and `Service` rather than forcing them all into `@graph`.

### 3. Build the base graph for every content page

The base graph contains:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://your-site.com/#org",
      "name": "Brand Name",
      "url": "https://your-site.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-site.com/logo.png"
      },
      "sameAs": [
        "https://www.linkedin.com/company/brand-slug",
        "https://www.facebook.com/brandpage"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://your-site.com/#website",
      "url": "https://your-site.com/",
      "name": "Brand Name",
      "publisher": { "@id": "https://your-site.com/#org" }
    },
    {
      "@type": "WebPage",
      "@id": "https://your-site.com/slug/#webpage",
      "url": "https://your-site.com/slug/",
      "name": "Page Title",
      "description": "Page meta description.",
      "isPartOf": { "@id": "https://your-site.com/#website" },
      "about": { "@id": "https://your-site.com/#org" },
      "datePublished": "2026-01-15",
      "dateModified": "2026-08-01"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://your-site.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Category",
          "item": "https://your-site.com/category/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Page Title",
          "item": "https://your-site.com/category/page-slug/"
        }
      ]
    }
  ]
}
```

### 4. Choose the right schema type for each page

| Page type | Required @types | Optional @types |
|-----------|----------------|-----------------|
| Homepage | Organization, WebSite, Service | FAQPage, Person (founder) |
| Money / service page | WebPage, BreadcrumbList | FAQPage, Service |
| Guide / editorial | Article, BreadcrumbList | FAQPage, HowTo (if steps) |
| Comparison / vendor review | Article, BreadcrumbList | FAQPage, Person (author) |
| Pricing / benchmark page | WebPage, BreadcrumbList, Dataset | FAQPage |
| State / geo programmatic | WebPage, BreadcrumbList | FAQPage, LocalBusiness (if single business) |
| Local business listing | LocalBusiness, BreadcrumbList | FAQPage, AggregateRating |
| Directory listing category | WebPage, BreadcrumbList | ItemList |
| FAQ page | FAQPage, WebPage, BreadcrumbList | — |
| About page | WebPage, BreadcrumbList, Person | Organization |
| How-to guide | HowTo, Article, BreadcrumbList | FAQPage |
| Data/statistics page | Dataset, WebPage, BreadcrumbList | Article |

### 5. Add FAQPage schema to every page with a FAQ section

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [topic]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct answer in 40–80 words. Self-contained. No references to 'above' or 'below'."
      }
    },
    {
      "@type": "Question",
      "name": "How does [process] work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Step-by-step or direct answer. Fully self-contained."
      }
    }
  ]
}
```

Rules:
- FAQPage schema must match visible, expanded FAQ content on the page.
- Do not add FAQPage schema if the FAQs are collapsed/accordion — render them open.
- Keep FAQ answers self-contained (40–80 words; no "as mentioned above").
- Dedicated FAQ pages: 20+ questions minimum.
- Do not duplicate identical FAQ blocks across city/state pages — vary the questions by page type and location.

### 6. Add Article schema for guide and editorial content

```json
{
  "@type": "Article",
  "@id": "https://your-site.com/guides/slug/#article",
  "headline": "Article Headline",
  "datePublished": "2026-01-15",
  "dateModified": "2026-08-01",
  "author": {
    "@type": "Person",
    "name": "Author Full Name",
    "jobTitle": "Title / Role",
    "url": "https://your-site.com/about/",
    "sameAs": "https://www.linkedin.com/in/author-slug"
  },
  "publisher": { "@id": "https://your-site.com/#org" },
  "isPartOf": { "@id": "https://your-site.com/#website" }
}
```

Rule: the `author.sameAs` LinkedIn URL must exactly match the actual LinkedIn profile URL. Schema + visible footer byline must agree on the person's name and title.

### 7. Add LocalBusiness schema for local service businesses

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "Brief description of services offered.",
  "url": "https://www.your-site.com",
  "telephone": "+1-555-123-4567",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City Name",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5"
  }
}
```

**AggregateRating warning:** only add this if backed by real, verifiable review data. Fabricated or unsupported ratings trigger structured-data manual actions from Google.

For more specific business types, use a more precise `@type`: `LegalService`, `MedicalBusiness`, `HomeAndConstructionBusiness`, `FinancialService`, `AutoRepair`, etc. More specific types improve rich-result eligibility.

Required LocalBusiness properties: `name`, `address`, `telephone`, `url`.
Recommended additions: `geo`, `openingHoursSpecification`, `priceRange`, `description`.

### 8. Add Dataset schema on pages with original data

```json
{
  "@type": "Dataset",
  "name": "2026 [Niche] Benchmark Report",
  "description": "Original survey data on [metrics] collected from [N] sources in 2026.",
  "url": "https://your-site.com/research/benchmark-2026/",
  "creator": { "@id": "https://your-site.com/#org" },
  "datePublished": "2026-08-01",
  "license": "https://creativecommons.org/licenses/by/4.0/"
}
```

Dataset schema makes your site the attributed source when AI engines quote numbers or benchmarks from your original data. Add this to any page containing pricing tables, market statistics, or survey data you gathered.

### 9. Add Person schema for founders and authors

```json
{
  "@type": "Person",
  "@id": "https://your-site.com/#founder",
  "name": "Full Name",
  "jobTitle": "Founder & CEO",
  "url": "https://your-site.com/about/",
  "sameAs": [
    "https://www.linkedin.com/in/linkedin-slug",
    "https://www.youtube.com/@channel-handle",
    "https://www.crunchbase.com/person/person-slug"
  ]
}
```

- `sameAs` URLs feed Google's Knowledge Graph and AI entity resolution. Verify every URL is live and matches the actual profile.
- Consistent `sameAs` across schema, footer, and all entity listings (Crunchbase, G2, Wikidata) = stronger entity resolution.

### 10. Add HowTo schema on how-to guides

```json
{
  "@type": "HowTo",
  "name": "How to [Task]",
  "description": "Step-by-step guide to [task].",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Step Name",
      "text": "Description of what to do in this step."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Step Name",
      "text": "Description of what to do in this step."
    }
  ]
}
```

### 11. Validate all schema programmatically
- Run schema validation across all pages after every build.
- Check: valid JSON parse (0 errors), required fields present, `@type` matches page content.
- Use Google's Rich Results Test or Schema.org validator for spot-checks.
- Target: 0 parse errors across all pages.

---

## Standards & thresholds

| Rule | Value |
|------|-------|
| Format | JSON-LD only (no Microdata, no RDFa) |
| Architecture | @graph on all content pages |
| Base graph | Organization + WebSite + WebPage/Article + BreadcrumbList — every content page |
| FAQPage trigger | Any page with a visible, expanded FAQ section |
| FAQ minimum (dedicated FAQ page) | 20+ questions |
| FAQ answer length | 40–80 words, fully self-contained |
| AggregateRating | Only with real, verifiable review data |
| Schema validation | 0 JSON parse errors across all pages |
| Author sameAs | Must match actual live profile URL exactly |
| datePublished / dateModified | Present on all Article and WebPage schemas |
| Schema coverage | Every indexed page carries schema — not just the homepage |

---

## AI-agent checklist

- [ ] All schema output is JSON-LD (not Microdata/RDFa)
- [ ] @graph architecture used on all content pages
- [ ] Every content page has: Organization, WebSite, WebPage/Article, BreadcrumbList
- [ ] FAQPage schema on every page with a visible FAQ section (FAQs rendered open)
- [ ] Article schema on all guides with visible author byline
- [ ] LocalBusiness schema on local business listing pages
- [ ] Dataset schema on any page with original data/benchmarks
- [ ] HowTo schema on how-to guides
- [ ] Person schema with accurate sameAs URLs on About/author pages
- [ ] AggregateRating only where real review data exists
- [ ] Schema validated: 0 JSON parse errors across all pages
- [ ] datePublished and dateModified present and accurate
- [ ] Schema extends to all inner pages, not just homepage
- [ ] Author sameAs URLs verified as live and matching actual profiles

---

## Common mistakes

**Adding schema only to the homepage** — inner pages (money pages, comparison pages, guides) are what AI engines cite. Without schema on those pages, there is no structured attribution.

**Disconnected schema blocks** — outputting three separate `<script>` tags instead of one `@graph` block means entities are disconnected. Organization and Article don't reference each other, weakening the knowledge graph signal.

**FAQPage schema on collapsed accordions** — if FAQ items are collapsed by default (accordion CSS), some AI crawlers fail to extract them. The schema and the visible content must agree. Render FAQs open.

**AggregateRating without data** — fake or estimated ratings trigger manual actions. Only add `AggregateRating` when you have real, verifiable review data backing it.

**Wrong author sameAs URL** — using a shortened LinkedIn URL (`/in/jane`) that redirects to the full URL causes schema-URL mismatch. Copy the exact canonical URL from the browser address bar.

**Generic schema that doesn't match page content** — `"@type": "WebPage"` with a generic description on a page that is clearly an Article or LocalBusiness listing. More specific, accurate types improve rich-result eligibility.

**Not updating dateModified** — a stale `dateModified` date (months old) signals to AI engines that the content is stale. Update this field every time content is meaningfully refreshed.

**Omitting BreadcrumbList** — every page benefits from breadcrumb schema for SERP trail display and to help search engines understand site structure. Never skip it on inner pages.
