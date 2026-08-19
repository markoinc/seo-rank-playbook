# Meta Title & Description Formulas

**Purpose:** Provide fill-in-the-blank formulas for `<title>` tags and meta descriptions that are keyword-first, CTR-optimized, and within Google's display limits — for every page type in the hub-and-spoke architecture. These formulas apply to both manually written pages and programmatically generated pages at scale.

**When to use:** When writing the `title` and `metaDescription` fields in your page data model (see `page-seo-data-model.ts`). Also use for auditing existing pages — every page that deviates from these formulas is a conversion opportunity.

---

## The SOP

### Core rules (apply to every page type)

1. **Keyword first.** Put the target keyword at the start of the title tag. Google truncates from the right; keyword position determines relevance signal and user attention.
2. **Brand last.** Brand name always goes at the end, separated by ` | `. Never sandwich brand between keyword and description.
3. **30–65 characters total.** Below 30: you're leaving ranking signal on the table. Above 65: Google rewrites the title, usually badly.
4. **Meta description: 70–160 chars (target ≤ 155).** The hard max is 160 chars; truncation at 155 prevents mid-sentence cuts that make the snippet read as broken.
5. **Meta description = target keyword once + a human pitch.** It's a CTR signal, not a ranking signal — but Google **bolds the query terms it matches** in the snippet, so lead with the exact target keyword (once, naturally), then the value prop + implied action ("Find out how..." / "See why..." / "Compare the top..."). Keyword-matched snippets stand out in the results and lift click-through. Include the keyword once; never stuff a list of keywords.
6. **Unique per page.** No two pages on the site share a title or meta description. Duplicate titles tell Google the pages cover the same topic and trigger cannibalization.
7. **One H1 per page.** H1 = the exact target keyword, matching the search intent 1:1. Do not repeat the title tag verbatim — the H1 is a variation, not a copy.

---

## Formulas by page type

### Money pages
These are your core commercial pages. Keyword first, no hedging, clear value proposition.

**Title formula:**
```
[Primary Keyword] | [Brand Name]
[Primary Keyword] for [Audience] | [Brand Name]
[Primary Keyword] — [Core Differentiator] | [Brand Name]
```

**Examples (generic niche):**
```
Plumbing Services Austin | [Brand]
Car Accident Leads for Attorneys | [Brand]
Enterprise Project Management Software | [Brand]
```

**Meta description formula:**
```
[Primary keyword phrased naturally] — [outcome the buyer wants]. [Key differentiator or proof point]. [Implied CTA — "See how it works" / "Get started today"].
```
(Lead with the exact keyword so Google bolds it in the snippet, then sell the click.)

**Example** (target keyword = *car accident leads for attorneys*):
```
Exclusive car accident leads for attorneys, delivered in real time to one firm. Verified, never shared, no contracts. See how it works.
```

**H1 formula:**
```
[Primary Keyword] (exact; 4–10 words ideal)
```

---

### Comparison/vendor review pages
Editorial tone. The reader is comparing options. Do not promise the product is the best in the title — let the review do that. CTA goes at the bottom of the page, not the top.

**Title formula:**
```
[Competitor/Vendor Name] Review: [Key Attribute or Verdict] | [Brand]
[A] vs [B]: Which Is Better for [Use Case]? | [Brand]
Best [Product/Service Category] Companies in [Year] | [Brand]
```

**Examples:**
```
Acme Software Review: Pricing, Features & Honest Take | [Brand]
HubSpot vs Salesforce: Which CRM Wins for SMBs? | [Brand]
Best Lead Generation Companies for Law Firms 2026 | [Brand]
```

**Meta description formula:**
```
[Neutral methodology claim — "We tested/compared X"]. [The key differentiator or finding]. [What the reader will learn — "Find out which wins for your use case"].
```

**Example:**
```
We compared 8 lead gen vendors across price, quality, and exclusivity. Here's who wins and who to avoid. Find out which fits your firm.
```

**H1 formula:**
```
[Vendor Name] Review: [Outcome-focused Subtitle]
[A] vs [B]: [Specific comparison dimension]
```

**Important:** Neutral methodology intro in the first 100 words. Admitting a competitor's strength = credibility. AI engines cite balanced comparisons far more than one-sided endorsements.

---

### Guide pages (informational)
Answer the question directly in the title. High word-count pages. These feed AI Overviews and E-E-A-T signals.

**Title formula:**
```
How to [Achieve Outcome]: [Specific Qualifier] | [Brand]
What Is [Term]? [Clarifying Phrase] | [Brand]
[Topic] Guide: [Key Angle or Year] | [Brand]
[Number] Ways to [Achieve Outcome] | [Brand]
```

**Examples:**
```
How to Choose a Personal Injury Lawyer: 7 Questions to Ask | [Brand]
What Is Topical Authority? SEO Guide for 2026 | [Brand]
Local SEO Guide: Rank on Google Maps in 90 Days | [Brand]
```

**Meta description formula:**
```
[Direct answer to the page's core question in 10–15 words]. [What the reader will find in this guide]. [Breadth signal — "Covers X, Y, and Z"].
```

**Example:**
```
Topical authority means dominating a subject area so Google treats you as the go-to source. This guide covers how to map, build, and measure it.
```

**H1 formula:**
```
[Question phrasing or "How to" phrasing — slightly expanded from the title]
```

---

### Geo / state pages (programmatic)
These pages target "[product/service] + [state/city]" long-tail searches. Programmatically generated. Title must be unique per page — do not reuse the same template with only the geo swapped. Add 1–2 location-specific differentiators to the meta description.

**Title formula:**
```
[Primary Keyword] in [City/State] | [Brand]
[City/State] [Primary Keyword] — [Core Differentiator] | [Brand]
```

**Examples:**
```
Car Accident Leads in Texas | [Brand]
Chicago Plumbing Services — Same-Day Repair | [Brand]
```

**Meta description formula:**
```
[Service/product description tailored to this geo]. [Location-specific proof point or differentiator if available]. [CTA].
```

**Example:**
```
Exclusive car accident leads from Texas attorneys actively searching for representation. Verified, real-time delivery. Start receiving leads today.
```

**Critical for programmatic pages:** Ensure each geo page has unique content beyond the swapped location name. A title template with only the geo changed is not enough — the meta description and at least one content block must include location-specific signals.

---

### Lead-type / variant pages
Sub-pages of money pages. Target a specific service variant or customer sub-segment.

**Title formula:**
```
[Specific Service Variant] | [Brand]
[Variant] for [Specific Audience Segment] | [Brand]
```

**Examples:**
```
Truck Accident Leads for Law Firms | [Brand]
Workers' Compensation Leads — Verified & Exclusive | [Brand]
```

**Meta description formula:** Same as money page formula, but scoped to the variant audience.

---

## The `directAnswer` field

Every page data model has a `directAnswer` field: **40–60 words, lead with the answer**. This is not the meta description — it's the first paragraph of visible page content.

Purpose: feeds AI Overviews and featured snippet extracts. 44% of AI citations are pulled from the intro paragraph of a page. The directAnswer must:
- Answer the page's core question directly in the first sentence
- Use short sentences, one idea per paragraph
- Avoid vague intros ("In this guide, we'll cover...")
- Be 40–60 words (AI Overviews truncate longer extracts)

**Formula:**
```
[Direct answer to the page's core question]. [Qualifying context in 1–2 sentences]. [What makes your answer authoritative or specific].
```

**Example (vendor review page):**
```
Acme Software is best suited for mid-size agencies that need automated follow-up without a large upfront commitment. It outperforms most competitors on onboarding speed and per-lead pricing, but trails on real-time delivery and exclusivity guarantees. This review covers pricing, lead quality, and who it's right for.
```

---

## Standards & thresholds

| Element | Minimum | Maximum | Notes |
|---------|---------|---------|-------|
| Title tag length | 30 chars | 65 chars | Google rewrites outside this window |
| Meta description length | 70 chars | 160 chars (target ≤155) | Truncation at 155 prevents mid-sentence cuts |
| H1 count per page | 1 | 1 | Exactly one H1 per page |
| H1 keyword match | Exact target keyword | — | Must match the page's primary intent 1:1 |
| directAnswer length | 40 words | 60 words | Feeds AI Overview extraction |
| Title uniqueness | 100% unique | — | Duplicate titles trigger cannibalization |
| Meta description uniqueness | 100% unique | — | Duplicate descriptions = wasted CTR opportunity |
| Keyword position in title | Position 1 (first word) | — | Never brand-first; keyword-first |
| Brand in title | Always last | — | Separated by ` | ` |
| Meta description tone | Human marketing pitch | — | Not keyword stuffing |
| FAQs rendering | Expanded by default | — | Collapsed/accordion FAQs not indexed by all AI crawlers |

---

## AI-agent checklist

- [ ] Every page title: keyword first, brand last, 30–65 chars
- [ ] Every meta description: 70–155 chars, unique, human-pitch tone
- [ ] Every page: exactly one H1 with exact target keyword
- [ ] Every page: `directAnswer` field 40–60 words, answer-first structure
- [ ] Zero duplicate title tags across the site (programmatically verified)
- [ ] Zero duplicate meta descriptions across the site (programmatically verified)
- [ ] Comparison/vendor pages: neutral methodology intro in first 100 words; CTA at bottom only
- [ ] Guide pages: direct answer to core question within first 30% of content
- [ ] Geo pages: meta description includes location-specific signals (not just the geo-swapped template)
- [ ] FAQs rendered expanded by default (not collapsed accordion)
- [ ] Visible author byline on guide pages: "By [Author], [Title] · Updated [Month Year]"

---

## Common mistakes

**Putting the brand first in the title.** "[Brand] | Keyword" means the keyword appears in position 2 or 3. Google truncates from the right; users scan left to right. Always keyword-first.

**Titles over 65 chars.** Google rewrites them, often badly ("Best Lead Gen..."), removing your CTR-optimized language and replacing it with something generic pulled from the page content.

**Writing meta descriptions as keyword lists.** "Lead generation, attorney leads, legal leads, personal injury leads..." — this reads as spam to humans and provides no CTR lift. Write the value prop.

**Meta descriptions over 160 chars.** Truncation mid-sentence makes your snippet read as broken ("Find the best attorney leads in your state and start receiving real-time..." — cut). Target 155 to leave a buffer.

**Duplicate titles across geo pages.** "Car Accident Leads | Brand" appearing on all 50 state pages tells Google they're the same page. Every geo page needs a unique title; the title formula must include the geo name.

**Vague `directAnswer` openings.** "In this article we're going to cover everything you need to know about..." wastes the AI Overview extraction window. Lead with the answer: "Car accident leads are verified contact records of people who were recently in an accident and are actively searching for legal help."

**Collapsed FAQ accordions.** Some AI crawlers don't execute JavaScript and won't see collapsed FAQ content. Render FAQ answers expanded by default.
