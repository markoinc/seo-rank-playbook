# JSON-LD Builder Reference

Complete schema snippets for every page type. Copy the relevant block, fill in the placeholders, and combine into a single `@graph` per page.

---

## How to compose a page's schema

Every content page gets one `<script type="application/ld+json">` tag containing a `@graph` array. Add the base graph first, then append conditional blocks based on page type.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    /* BASE: always include */
    /* ... Organization block ... */,
    /* ... WebSite block ... */,
    /* ... WebPage or Article block ... */,
    /* ... BreadcrumbList block ... */,

    /* CONDITIONAL: add if page has these */
    /* ... FAQPage block ... */,
    /* ... LocalBusiness block ... */,
    /* ... Dataset block ... */,
    /* ... HowTo block ... */
  ]
}
</script>
```

---

## Block 1 — Organization (include on every page)

```json
{
  "@type": "Organization",
  "@id": "https://your-site.com/#org",
  "name": "Your Brand Name",
  "url": "https://your-site.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://your-site.com/logo.png",
    "width": 200,
    "height": 60
  },
  "sameAs": [
    "https://www.linkedin.com/company/your-company-slug",
    "https://www.facebook.com/your-page",
    "https://twitter.com/your-handle",
    "https://www.crunchbase.com/organization/your-slug"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://your-site.com/contact/"
  }
}
```

---

## Block 2 — WebSite (include on every page)

```json
{
  "@type": "WebSite",
  "@id": "https://your-site.com/#website",
  "url": "https://your-site.com/",
  "name": "Your Brand Name",
  "publisher": { "@id": "https://your-site.com/#org" }
}
```

---

## Block 3a — WebPage (non-editorial pages)

```json
{
  "@type": "WebPage",
  "@id": "https://your-site.com/slug/#webpage",
  "url": "https://your-site.com/slug/",
  "name": "Page Title Here",
  "description": "Meta description text (150–155 chars).",
  "isPartOf": { "@id": "https://your-site.com/#website" },
  "about": { "@id": "https://your-site.com/#org" },
  "datePublished": "2026-01-15",
  "dateModified": "2026-08-01"
}
```

---

## Block 3b — Article (editorial/guide pages)

```json
{
  "@type": "Article",
  "@id": "https://your-site.com/guides/slug/#article",
  "headline": "Guide or Article Title",
  "description": "Meta description text (150–155 chars).",
  "url": "https://your-site.com/guides/slug/",
  "datePublished": "2026-01-15",
  "dateModified": "2026-08-01",
  "author": {
    "@type": "Person",
    "name": "Author Full Name",
    "jobTitle": "Author Title",
    "url": "https://your-site.com/about/",
    "sameAs": "https://www.linkedin.com/in/author-linkedin-slug"
  },
  "publisher": { "@id": "https://your-site.com/#org" },
  "isPartOf": { "@id": "https://your-site.com/#website" }
}
```

---

## Block 4 — BreadcrumbList (include on every page)

```json
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
      "name": "Category Name",
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
```

For two-level paths, use positions 1 and 2 only. For deeper hierarchies (state → city → listing), extend accordingly.

---

## Block 5 — FAQPage (add when page has an expanded FAQ section)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [topic]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct, self-contained answer in 40–80 words. Do not reference 'above' or 'the guide below'. The answer must stand alone."
      }
    },
    {
      "@type": "Question",
      "name": "How does [process] work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Step-by-step or direct explanation. Fully self-contained. 40–80 words."
      }
    },
    {
      "@type": "Question",
      "name": "What does [service] cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "State the price range or pricing model directly. Include the key factors that affect cost."
      }
    }
  ]
}
```

Requirements:
- FAQs must be **rendered open** (not collapsed) on the page. Schema and visible content must match.
- Each answer: 40–80 words, fully self-contained.
- Dedicated FAQ pages: 20+ question/answer pairs minimum.
- Vary question phrasing across pages — do not copy identical FAQ blocks to 50 city pages.

---

## Block 6 — LocalBusiness (local service listing pages)

```json
{
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "2–3 sentence description of services offered.",
  "url": "https://www.business-website.com",
  "telephone": "+1-555-123-4567",
  "email": "contact@business.com",
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
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4"
  ]
}
```

**Replace `@type` with a more specific subtype where applicable:** `LegalService`, `MedicalBusiness`, `HomeAndConstructionBusiness`, `FinancialService`, `AutoRepair`, `Restaurant`, `AccountingService`, `InsuranceAgency`.

**AggregateRating rule:** only include this block if you have real, verifiable review data. Fabricated ratings trigger structured-data manual penalties.

**Google Maps Place ID:** capture stable Place IDs for each listing; use as the `sameAs` Maps URL. Place IDs survive business address changes.

---

## Block 7 — Dataset (original data and benchmark pages)

```json
{
  "@type": "Dataset",
  "name": "2026 [Niche] Pricing Benchmark",
  "description": "Original data collected from [N] sources showing price ranges, conversion rates, and market trends for [topic] in 2026.",
  "url": "https://your-site.com/research/2026-benchmark/",
  "creator": { "@id": "https://your-site.com/#org" },
  "datePublished": "2026-08-01",
  "dateModified": "2026-08-01",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "keywords": ["keyword1", "keyword2", "benchmark", "statistics"]
}
```

Use Dataset on any page with original pricing tables, market statistics, survey data, or benchmark figures. This is the schema that causes AI engines to credit your site as the source when quoting your numbers.

---

## Block 8 — HowTo (how-to guide pages)

```json
{
  "@type": "HowTo",
  "name": "How to [Task Description]",
  "description": "A step-by-step guide explaining how to [accomplish the task].",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Step One Title",
      "text": "Detailed description of what to do in this step. Be specific and actionable."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Step Two Title",
      "text": "Detailed description of what to do in this step."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Step Three Title",
      "text": "Detailed description of what to do in this step."
    }
  ]
}
```

---

## Block 9 — Person (founder/author, About page)

```json
{
  "@type": "Person",
  "@id": "https://your-site.com/#founder",
  "name": "Full Name",
  "jobTitle": "Founder & CEO",
  "url": "https://your-site.com/about/",
  "sameAs": [
    "https://www.linkedin.com/in/linkedin-profile-slug",
    "https://www.youtube.com/@youtube-handle",
    "https://www.crunchbase.com/person/person-slug",
    "https://twitter.com/twitter-handle"
  ]
}
```

Verify every `sameAs` URL is live and uses the exact canonical URL (copy from browser, not from docs). The Person `@id` can then be referenced as `"author": { "@id": "https://your-site.com/#founder" }` in Article schema on guide pages.

---

## Block 10 — Service (homepage, money pages)

```json
{
  "@type": "Service",
  "serviceType": "Your Service Type",
  "name": "Service Name",
  "description": "What this service does and who it serves.",
  "provider": { "@id": "https://your-site.com/#org" },
  "areaServed": {
    "@type": "Country",
    "name": "US"
  },
  "url": "https://your-site.com/service-page/"
}
```

For regional services, replace `areaServed` with a `State` or `City` object:
```json
"areaServed": { "@type": "State", "name": "Texas" }
```

---

## Full assembled example — guide page

This is a complete `@graph` for an editorial guide page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://your-site.com/#org",
      "name": "Your Brand",
      "url": "https://your-site.com/",
      "logo": { "@type": "ImageObject", "url": "https://your-site.com/logo.png" },
      "sameAs": ["https://www.linkedin.com/company/your-brand"]
    },
    {
      "@type": "WebSite",
      "@id": "https://your-site.com/#website",
      "url": "https://your-site.com/",
      "name": "Your Brand",
      "publisher": { "@id": "https://your-site.com/#org" }
    },
    {
      "@type": "Article",
      "@id": "https://your-site.com/guides/how-to-choose-a-vendor/#article",
      "headline": "How to Choose a [Type] Vendor: Complete Guide",
      "description": "A practical 150-char meta description goes here.",
      "url": "https://your-site.com/guides/how-to-choose-a-vendor/",
      "datePublished": "2026-06-01",
      "dateModified": "2026-08-01",
      "author": {
        "@type": "Person",
        "name": "Author Name",
        "jobTitle": "CEO",
        "sameAs": "https://www.linkedin.com/in/author-slug"
      },
      "publisher": { "@id": "https://your-site.com/#org" },
      "isPartOf": { "@id": "https://your-site.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://your-site.com/" },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://your-site.com/guides/" },
        { "@type": "ListItem", "position": 3, "name": "How to Choose a Vendor", "item": "https://your-site.com/guides/how-to-choose-a-vendor/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What should I look for in a [type] vendor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Look for verified credentials, transparent pricing, clear SLA terms, and references from similar clients. The most important factor is whether the vendor can demonstrate results in your specific use case."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## TypeScript graph builder pattern

For programmatic/template-based pages, build the graph array from your page data model at render time:

```typescript
const SITE = "https://your-site.com";

function buildJsonLd(page: SeoPage, canonicalUrl: string): string {
  const crumbs = [
    { name: "Home", url: `${SITE}/` },
    ...page.breadcrumb.map((b) => ({ name: b.label, url: `${SITE}${b.href}` })),
  ];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      "name": "Your Brand",
      "url": `${SITE}/`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "url": `${SITE}/`,
      "publisher": { "@id": `${SITE}/#org` },
    },
    {
      "@type": page.isArticle ? "Article" : "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": page.title,
      "description": page.metaDescription,
      "isPartOf": { "@id": `${SITE}/#website` },
      "datePublished": page.datePublished,
      "dateModified": page.dateModified,
      ...(page.isArticle && page.author
        ? {
            "author": {
              "@type": "Person",
              "name": page.author.name,
              "sameAs": page.author.linkedIn,
            },
            "publisher": { "@id": `${SITE}/#org` },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": crumbs.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": c.name,
        "item": c.url,
      })),
    },
  ];

  if (page.faqs && page.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": page.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
      })),
    });
  }

  if (page.dataset) {
    graph.push({
      "@type": "Dataset",
      "name": page.dataset.name,
      "description": page.dataset.description,
      "url": canonicalUrl,
      "creator": { "@id": `${SITE}/#org` },
      "datePublished": page.datePublished,
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}
```

Inject the output into a `<script type="application/ld+json">` tag at render/prerender time. Do not rely on client-side hydration to write JSON-LD — bake it into the server-returned HTML.

---

## Validation

After every build:
1. Run `JSON.parse(jsonLdString)` on each page's schema output — 0 parse errors required.
2. Spot-check 5+ pages with Google's Rich Results Test (`search.google.com/test/rich-results`).
3. Spot-check Schema.org validator for @graph correctness.
4. Verify `dateModified` is current on all Article/WebPage schemas.
5. Verify all `sameAs` URLs resolve to live pages (no 404s).
