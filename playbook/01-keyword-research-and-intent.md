# Keyword Research & Intent Mapping

**Purpose:** Map every keyword in your niche to an intent bucket before writing a single page. The bucket drives the page type, the CTA density, the content depth, and ultimately the ranking strategy. Without this map, you build pages that compete with each other, miss the highest-ROI clusters, and waste crawl budget on terms that will never convert.

**When to use:** At project start, before any architecture decisions. Revisit every 90 days using GSC data to catch rising long-tails.

---

## The SOP

1. **Seed the pull.** Start with 10–20 core terms (the main product/service + obvious variants). Use DataForSEO `keyword_suggestions` (NOT `keyword_ideas` — `keyword_ideas` drifts semantically). Pull: keyword difficulty (KD 0–100), monthly Google volume, CPC, and AI-search-volume (how often terms appear in ChatGPT/Perplexity).

2. **Pull AI-search-volume alongside Google volume.** Some terms have near-zero Google volume but 10–22× AI search volume. These terms still merit a page — they win AI citations (GEO) rather than Google clicks. Segment and treat separately.

3. **Expand via surface-form variants.** For each seed, systematically check: abbreviation vs. spelled-out, synonym swaps on each word, modifier prefix/suffix, intent-bucket variants, industry jargon vs. consumer phrasing, competitor brand terms, and AI-query phrasings ("what is the best X" vs. "X near me"). This step typically uncovers a critical miss: the jargon form of a term may have KD 0 and the consumer form may have 10× volume.

4. **Pull competitor gaps.** Run 5–6 competitors through the DataForSEO competitor ranked-keywords endpoint. Every term they rank for that you don't is a gap. These gaps often surface entire topic clusters you missed.

5. **Bucket by intent.** Assign every keyword to exactly one bucket:

   | Bucket | Description | Page goal |
   |--------|-------------|-----------|
   | `money` | Commercial/transactional — the product or service itself | Conversion; max CTA density |
   | `leadtype` | Sub-product or service variant | Mirror money page; slightly narrower |
   | `comparison` | "[brand A] vs [brand B]", "[product] alternatives", review intent | Editorial; CTA at bottom only |
   | `vendor` | Specific competitor brand or product review | Same as comparison |
   | `guide` | Informational/definitional — "how to", "what is", "cost of" | Depth, E-E-A-T, feeds AI Overviews |
   | `state` | Geo-modifier ("product + city/state") | Programmatic long-tail; one page per geo |

6. **Score and prioritize.** Within each bucket, rank by: KD 0 + AI volume > KD 0 + no AI volume > KD ≤4 + any volume > KD 5–20. High CPC + low KD = organic gold (paid-ad-dominated with no organic content — fill the gap).

7. **Set build order.** Build pages in this sequence: proven-converting terms (GSC historical data, even at weak positions) → BOFU money + comparison/vendor pages → geo depth (state/city programmatic) → informational authority (guides).

8. **Map to page types for architecture.** Every keyword bucket must map to a URL pattern before you build. Comparison/vendor terms → `/compare/` or `/vendors/`. Geo terms → `/[primary-keyword]/[state]/`. Guides → `/guides/`. No keyword should live at an ambiguous URL.

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

---

## AI-agent checklist

- [ ] Seeds pulled from DataForSEO `keyword_suggestions` (not `keyword_ideas`)
- [ ] AI-search-volume column populated alongside Google volume for every seed
- [ ] Surface-form variant expansion completed across all 7 axes
- [ ] Competitor ranked-keywords pulled for ≥5 competitors
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
