# On-Page SEO

**Purpose:** Configure every page element — title, meta, headings, content structure, and trust signals — so search engines and AI engines extract maximum signal from each URL.

**When to use this:** When building a new page, auditing an existing page, or conducting a pre-deploy verification pass across all generated pages.

---

## The SOP

### 1. Set the title tag
- Keep ≤60 characters including the brand suffix.
- Lead with the primary keyword, end with brand name: `[Primary Keyword] | Brand`.
- For CTR on high-impression pages, diverge from the H1: H1 = lean keyword phrase; title = CTR-pull formula (`Best [X] in [City] — Free [Hook] 2026`).
- Every page gets a unique title. No two pages may share the same title string.

### 2. Write the meta description
- Target 150–160 characters; hard cap at 155 to prevent mid-sentence truncation.
- Write for CTR, not keyword stuffing — include the core value proposition and an implied call to action.
- Meta descriptions are not a ranking factor; Google rewrites programmatic metas. Focus manual effort on homepage + top 20 high-impression pages.

### 3. Place one H1 per page
- Every page has exactly one H1 containing the primary target keyword.
- H1 and title may differ — H1 = keyword phrase; title = CTR variant.
- Homepage H1: target brand/value framing, NOT the niche money keyword (avoids cannibalization with money pages).

### 4. Build the heading hierarchy
- H2/H3: secondary and cluster keywords (lower-volume synonyms, long-tail, geographic variants, question variants). Tell the crawler "rank me for these too."
- Do not skip heading levels.
- H4–H6: rarely necessary. Demote decorative labels to paragraph text to preserve hierarchy signal.
- "Complex, well-structured nested header hierarchy" is a ranking signal.

### 5. Write the opening 100 words as a direct answer
- Put the direct answer to the page's core question in the first 30–100 words.
- 44% of AI-engine citations pull from the intro paragraph.
- Answer-first format feeds AI Overviews, Featured Snippets, and Perplexity citations.

### 6. Enforce content depth targets by page type

| Page type | Minimum word count | Key requirements |
|-----------|-------------------|-----------------|
| Money/service page | 800–1,500 words | H1 (exact keyword) → 60-word direct answer → what/how/why → FAQ → CTA |
| Comparison / vendor page | 1,500–2,500 words | Neutral methodology intro → comparison table → per-vendor 300–500w deep-dive → verdicts → CTA at bottom only |
| Guide / editorial | 2,000–3,000 words | Question as H1 → direct answer in first 30% → body → FAQ → internal links |
| State / geo programmatic | 1,400+ words recommended | Unique jurisdiction data → local market data → unique FAQ → real internal links |
| Directory listing | 150–300 unique words min | All enrichment attributes; conditional blocks (hide empty sections) |
| Category / city hub | 200–500 word intro + listing links | City/type-specific context; breadcrumbs; internal links |

### 7. Apply keyword placement priority
Place the primary keyword in this order of importance:
1. URL slug
2. Title tag
3. H1
4. First 100 words of body
5. Meta description
6. Image alt text
7. H2s and H3s
8. Body copy (naturally)

### 8. Format content for readability and AI extraction
- Paragraphs: 2–3 sentences, under 20 words per sentence.
- Flesch readability score: target 60+.
- Use numbered lists and bullet points for scannable content.
- Atomic answers: write 40–60 word self-contained paragraphs that answer one question completely. These feed AI Overviews.
- FAQs: always render open (expanded) by default — collapsed FAQs are indexable but less reliably extracted by AI crawlers.

### 9. Add internal links
- Minimum 3–5 contextual internal links per 1,000 words.
- Money pages: 8–12 internal links minimum.
- Use descriptive anchor text (exact-match ~30%, partial-match ~40%, branded ~20%, generic ~10%).
- Never "click here." Every anchor text describes the target page.
- Links in the top 30% of content carry approximately 3× more weight than footer links.

### 10. Add trust signals (E-E-A-T)
- Visible author byline on all guides: "By [Author Name], [Title] · Updated [Month Year]."
- Schema-only author attribution is insufficient — the byline must be visible on the page.
- About and Contact pages: must exist, be linked from footer, and be prerendered/indexed. These carry E-E-A-T and entity-resolution signals.
- Cite sources for statistics and claims.

### 11. Add images with optimized alt text
- Compress all images below 100KB; target 50KB/1,000px width for directories.
- Use WebP or JPEG 2000 format.
- Alt text formula: `[Entity Name] [niche/keyword] in [City], [State]` — geo-keyword in every alt text.
- Set explicit width and height attributes on every image (prevents CLS).

### 12. Set the directAnswer field (for programmatic/template pages)
- The `directAnswer` field in your page data model: 40–60 words, fully self-contained sentence(s) that answer the page's primary question without surrounding context.
- This field feeds the `description` in AI-engine extraction, structured data descriptions, and OG tags.

### 13. Configure meta robots and Open Graph
- Production pages: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`
- Funnel pages (apply, qualify, thank-you, calendar, onboarding): `noindex, follow`.
- OG image: 1200×630px minimum. OG title and description should differ from meta title/description.
- Twitter card: `summary_large_image`.

### 14. Verify uniqueness programmatically
- Run sentence-level similarity checks across all page pairs.
- Target: 0 page pairs over 40% similarity.
- "Programmatic content with 10 words swapped out is dead." Same structure + genuinely different data = acceptable; same structure + filler = penalty risk.

### 15. Maintain freshness
- Update `dateModified` at least monthly on indexed pages.
- For pages with existing impressions: add 2 paragraphs + 2 list items of updated data every 90–120 days.
- Content refresh on indexed pages outperforms publishing net-new pages (50% of LLM-cited sources stop being cited within 30 days of last update).

---

## Standards & thresholds

| Element | Hard threshold |
|---------|---------------|
| Title tag | ≤60 characters |
| Meta description | 150–160 characters (hard cap 155) |
| H1 per page | Exactly 1 |
| Money page word count | 800–1,500 words |
| Comparison page word count | 1,500–2,500 words |
| Guide page word count | 2,000–3,000 words |
| Geo/state programmatic page | 1,400+ words recommended |
| Directory listing minimum | 150–300 unique words |
| Internal links | 3–5 per 1,000 words (8–12 on money pages) |
| Image file size | <100KB (target 50KB/1,000px for directories) |
| FAQ minimum (dedicated FAQ page) | 20+ questions |
| Flesch readability | 60+ |
| directAnswer field | 40–60 words, self-contained |
| Page similarity threshold | <40% pairwise overlap |
| AI citation intro window | First 30–100 words contain the answer |
| LLM source decay | ~50% of cited sources stop being cited within 30 days |

---

## AI-agent checklist

- [ ] Title tag ≤60 chars, primary keyword first, unique per page
- [ ] Meta description 150–155 chars, CTR-focused, unique per page
- [ ] Exactly one H1 containing the primary keyword
- [ ] No heading levels skipped (H1→H2→H3)
- [ ] Direct answer in first 100 words
- [ ] Word count meets page-type minimum
- [ ] Flesch score ≥60
- [ ] FAQs render open by default (not collapsed)
- [ ] ≥3 contextual internal links per 1,000 words
- [ ] No two pages share the same title or meta description
- [ ] Pairwise similarity <40% across all generated pages
- [ ] Images: WebP/JPEG 2000, <100KB, explicit width+height, descriptive alt text
- [ ] Author byline visible on-page for all guide content
- [ ] `noindex` applied to all funnel/conversion/legal pages
- [ ] `dateModified` current (within 90 days for indexed pages)
- [ ] OG image 1200×630px, OG title and description set

---

## Common mistakes

**Using the same H1 as the title tag on every page** — the title tag is a CTR lever; the H1 is a ranking signal. They can and often should differ.

**Putting CTAs above the fold on comparison pages** — a top-of-page CTA destroys credibility on review/comparison content. Place CTA at the bottom after the evidence.

**Collapsed FAQ accordions** — collapsed FAQs are indexed but less reliably extracted by AI crawlers. Render them open by default.

**Thin programmatic pages with boilerplate text** — generating state pages with only 10 words swapped creates doorway-page risk. Each geo page needs unique jurisdiction data, unique FAQ questions, and unique local market context.

**Ignoring the directAnswer field** — the first 30–100 words are the AI citation window. If these words are a generic intro or marketing copy instead of a direct answer, the page loses 44% of its AI-citation potential.

**Schema-only author attribution** — Google and AI engines require visible on-page author signals, not just JSON-LD. The byline must be visible to a user reading the page.

**Publishing hundreds of programmatic pages at once on a fresh domain** — crawl budget on new domains is limited. Batch releases at ≤50 pages in month 1; scale only after early pages index and establish trust.
