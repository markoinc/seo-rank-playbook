# Market, Keyword & Competitor Research

**Purpose:** Size the market, map the competitive landscape, and assign every keyword to an intent bucket — before writing a single page. This is the research phase: you decide whether the niche is winnable, who you're up against, what you must build to beat them, and which clusters have the highest ROI. Skip it and you build pages that compete with each other, miss the best clusters, and waste crawl budget on terms you can't rank for.

**When to use:** At project start, before any architecture decisions. Revisit every 90 days using GSC data to catch rising long-tails and competitor moves.

**Covers:** market sizing & demand, competitor analysis (keyword gaps + authority landscape), SERP analysis (what's ranking and what it takes to beat it), keyword discovery & AI-search-volume, and intent bucketing.

---

## The SOP

1. **Seed the pull.** Start with 10–20 core terms (the main product/service + obvious variants). Use DataForSEO `keyword_suggestions` (NOT `keyword_ideas` — `keyword_ideas` drifts semantically). Pull: keyword difficulty (KD 0–100), monthly Google volume, CPC, and AI-search-volume (how often terms appear in ChatGPT/Perplexity).

2. **Pull AI-search-volume alongside Google volume.** Some terms have near-zero Google volume but 10–22× AI search volume. These terms still merit a page — they win AI citations (GEO) rather than Google clicks. Segment and treat separately.

3. **Expand via surface-form variants.** For each seed, systematically check: abbreviation vs. spelled-out, synonym swaps on each word, modifier prefix/suffix, intent-bucket variants, industry jargon vs. consumer phrasing, competitor brand terms, and AI-query phrasings ("what is the best X" vs. "X near me"). This step typically uncovers a critical miss: the jargon form of a term may have KD 0 and the consumer form may have 10× volume.

4. **Pull competitor gaps.** Run 5–6 competitors through the DataForSEO competitor ranked-keywords endpoint. Every term they rank for that you don't is a gap. These gaps often surface entire topic clusters you missed.

5. **Map the competitor authority landscape.** For those same 5–6 competitors pull: domain rating/authority, referring-domain count, number of ranking keywords, and estimated organic traffic. This tells you *realistically* how hard the niche is and where the soft spots are. Read it as: if the top of the SERP is DR20 thin content, on-page alone can win; if it's DR70 with thousands of backlinks, you need an off-page plan and a longer runway (or a lower-KD sub-niche). Note each competitor's strongest cluster (where they're strong = avoid head-on; where they're thin = your wedge).

6. **Size the market.** Sum monthly volume across the whole keyword set (all variants + geos) = total addressable search demand. Layer on: seasonality/trend (is demand rising, flat, or seasonal?), geo concentration (which metros/states hold the demand — pull volume at national + metro level, never state, which returns null), and AI-search demand (how much of the intent has moved to ChatGPT/Perplexity). Decide go/no-go and where to concentrate.

7. **Run SERP analysis on the priority terms.** For each top-priority keyword, inspect the live top-10 results and record: the dominant **content type/format** (money page vs. listicle vs. guide vs. comparison vs. directory), the **depth** (word count / sections you must match or beat), which **SERP features** appear (AI Overview, People-Also-Ask, featured snippet, local pack, reviews), and the **schema** the ranking pages use. This is your brief: it defines exactly what a page must be to displace what's there. If AI Overviews/PAA dominate, prioritize answer-first, schema-rich content.

8. **Bucket by intent.** Assign every keyword to exactly one bucket:

   | Bucket | Description | Page goal |
   |--------|-------------|-----------|
   | `money` | Commercial/transactional — the product or service itself | Conversion; max CTA density |
   | `leadtype` | Sub-product or service variant | Mirror money page; slightly narrower |
   | `comparison` | "[brand A] vs [brand B]", "[product] alternatives", review intent | Editorial; CTA at bottom only |
   | `vendor` | Specific competitor brand or product review | Same as comparison |
   | `guide` | Informational/definitional — "how to", "what is", "cost of" | Depth, E-E-A-T, feeds AI Overviews |
   | `state` | Geo-modifier ("product + city/state") | Programmatic long-tail; one page per geo |

9. **Score and prioritize.** Within each bucket, rank by: KD 0 + AI volume > KD 0 + no AI volume > KD ≤4 + any volume > KD 5–20 — cross-checked against the SERP-analysis reality (a low KD score is a lie if the live SERP is all high-authority incumbents). High CPC + low KD = organic gold (paid-ad-dominated with no organic content — fill the gap).

10. **Set build order.** Build pages in this sequence: proven-converting terms (GSC historical data, even at weak positions) → BOFU money + comparison/vendor pages → geo depth (state/city programmatic) → informational authority (guides).

11. **Map to page types for architecture.** Every keyword bucket must map to a URL pattern before you build. Comparison/vendor terms → `/compare/` or `/vendors/`. Geo terms → `/[primary-keyword]/[state]/`. Guides → `/guides/`. No keyword should live at an ambiguous URL.

---

## Standards & thresholds

| Metric | Threshold | Notes |
|--------|-----------|-------|
| KD target (easy win) | ≤ 20 | On-page alone can rank a fresh domain |
| KD target (conservative, niche discovery) | ≤ 5 | Some experts only pursue ≤5 for new domains |
| KD 15–26 | Requires off-page authority | Allow 3–6 months on a fresh domain |
| Individual keyword volume sweet spot | 300–1,500/mo per city | Below this: long-tail aggregate. Above this: higher KD usually |
| Total niche volume (viable pSEO play) | 30K–100K | Aggregate monthly across all location variants |
| DataForSEO state-level geo volume | Returns null | Use national + metro geos for volume data only |
| High CPC + low KD | Priority flag | Paid-ad-dominated gaps with no organic content = fastest wins |
| AI volume > Google volume | GEO play flag | Target with AI-first content structure (directAnswer first) |
| Surface-form expansion minimum | 7 axes | Abbreviation, synonym, modifier, intent, jargon, brand, AI-query |
| Competitor gap pull | 5–6 competitors | Every ranked term they have that you lack = gap page |
| Competitor authority read | DR + ref-domains + traffic | DR≤20 thin SERP = on-page can win; DR70+ = need off-page + runway |
| Total addressable demand | Sum all variant + geo volumes | Go/no-go signal; 30K–100K aggregate = viable pSEO play |
| SERP analysis | Top 10 per priority term | Record content type, depth-to-beat, SERP features, schema used |

---

## AI-agent checklist

- [ ] Seeds pulled from DataForSEO `keyword_suggestions` (not `keyword_ideas`)
- [ ] AI-search-volume column populated alongside Google volume for every seed
- [ ] Surface-form variant expansion completed across all 7 axes
- [ ] Competitor ranked-keywords pulled for ≥5 competitors (gap list built)
- [ ] Competitor authority landscape mapped (DR, ref domains, traffic, strongest cluster each)
- [ ] Market sized: total addressable demand summed + seasonality/geo concentration noted → go/no-go
- [ ] SERP analysis run on priority terms (content type, depth-to-beat, SERP features, schema)
- [ ] Every keyword assigned to exactly one intent bucket
- [ ] Build order documented: proven converters → BOFU → geo → guides
- [ ] High-CPC + low-KD terms flagged as priority
- [ ] AI vol > Google vol terms flagged for GEO content treatment
- [ ] Geo terms validated at national or metro level (not state level — DataForSEO returns null at state)
- [ ] Every keyword mapped to a URL pattern before architecture begins
- [ ] Comparison/vendor cluster identified and sequenced early (highest ROI, uncontested, cited by AI)

---

## Common mistakes

**Running `keyword_ideas` instead of `keyword_suggestions`.** `keyword_ideas` drifts semantically and inflates your list with irrelevant terms. Always use `keyword_suggestions` for phrase-locked expansion.

**Ignoring AI-search-volume.** Buyers in many niches don't Google — they ask ChatGPT or Perplexity. A term with 0 Google volume and 15 AI queries/month is worth a page. It wins AI citations months before Google rankings.

**Skipping competitor gap analysis.** You'll miss entire clusters. The competitor gap pull is the highest-signal step after intent bucketing.

**Building comparison/vendor pages last.** These are typically the lowest-KD cluster, highest BOFU intent, and the primary cluster AI engines cite. Build them second, right after money pages.

**Using DataForSEO for state-level volume loops.** State-level geo returns OK (no error) but all-null volume data. This burned real budget before we learned it. Diagnose with one call before looping — use national or metro geos only for volume.

**Treating keyword volume as the only signal.** KD 0 + AI volume beats KD 0 + high Google volume if your goal includes AI citation. Weight accordingly.

**Building pages before bucketing is complete.** Without the full bucket map, pages overlap each other in intent, cannibalizing rankings and diluting topical authority. Complete the bucket map first; build second.
