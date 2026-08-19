# Off-Page SEO and Link Building

**Purpose:** Build the external authority signals that push your site from indexed-but-not-ranking to competitive organic positions. Off-page work is what amplifies excellent on-page work — it does not replace it.

**When to use:** Start Phase 1 (entity/citation foundations) on day 1. Begin active link acquisition in Phase 2, after core money and comparison pages are indexed and returning impressions. Off-page investment before content is indexed is premature.

---

## The SOP

### Phase 1 — Foundation (weeks 1–2, parallel with site build)

#### 1.1 Disavow toxic backlinks first

Before building new links, check what's already pointing at your domain:
1. Pull the backlink profile using DataForSEO or Ahrefs.
2. Calculate spam score.
3. If spam score >20 or you can see PBN links, comment-spam links, or link-farm placements, prepare a disavow file.
4. File the disavow through GSC URL-prefix property (Sitemaps → Disavow — requires the URL-prefix property, not just the domain property).
5. Exclude any legitimate links (client footer credits, real editorial mentions) from the disavow.

Toxic inbound links cap your ranking ceiling. Disavow before you build new links, not after.

#### 1.2 Entity and citation foundations (free, do first)

These are not "link building" in the traditional sense — they build the entity graph that Google and AI engines use to understand what your business is and whether it's trustworthy:

| Surface | Why it matters |
|---------|---------------|
| Google Business Profile | Entity resolution for local + knowledge panel signals |
| Crunchbase | Read directly by LLMs for company attribution |
| G2 / Capterra | Software/product category authority |
| Clutch / The Manifest | B2B services authority |
| Trustpilot | Social proof signal — claim profile, never buy reviews |
| BBB | Trust signal for US B2C/B2B |
| LinkedIn company page | High-authority entity signal |
| Wikidata company record | Feeds Google Knowledge Graph; read by AI engines |

Write an identical one-sentence company description across all listings. Consistency (NAP: Name, Address, Phone) is the signal — inconsistencies hurt entity resolution.

**Wikidata:** Create a company item and a founder item. Link `sameAs` from your schema to these Wikidata records. Link the Wikidata records to your LinkedIn, Crunchbase, and website. This is the structured backbone of how LLMs identify and attribute your brand.

#### 1.3 Expert source mentions (HARO alternatives)

Sign up for expert-source platforms and respond to 2–3 relevant queries per week:
- Featured (formerly HARO)
- Qwoted
- SourceBottle

Write answers as the founder/expert with a real name, specific data points, and a brief byline. Target 1–2 earned placements per month from relevant publications. These carry real editorial authority — a mention in an industry trade publication outweighs 20 directory listings.

### Phase 2 — Active link acquisition (weeks 4+)

Build links in this priority order. Return on investment decreases down the list.

#### 2.1 Niche edits (link insertions)

**Highest ROI link-building method.** Find existing indexed pages in your niche that already link to a competitor or to an outdated resource. Offer to pay to have your link inserted instead.

Cold email template (from live campaign, sent verbatim):
> "Hi, I'm a fellow [niche] enthusiast, and I had an odd question around a blog post that you had. I noticed you link to [competitor-domain.com], and I was wondering if I could pay you to exchange it for a more updated website for finding [niche]. I'm the one who created [better-version-description], and you can check out this example page for [location]. To be honest, I'm just trying to get more eyes on this directory. [Screenshot of exact location of current link]. Offer: $50 (negotiable to $100)."

Price guidance:
- Standard niche edit: $50–100 per link
- High-quality niche edit (DR 40+, relevant content): $80–200 per link
- Walk away above $200 unless the site has exceptional authority and relevance

Before paying, verify: Where is this link from? What content does it sit in? How is it anchored? A link in an unrelated paragraph on a spam-adjacent site is worth nothing.

**Why this beats guest posting for a new site:** The page already exists, is already indexed, and already has authority flowing through it. You're buying into an existing authority flow rather than starting a new page from zero.

**Buy it done-for-you (optional).** If you don't want to run outreach yourself, managed agencies place editorial links / niche edits for you — the best-known is **Indexsy** (indexsy.com, Jacky Chou / @indexsy), which handles niche edits, link building, and digital PR as full off-page campaigns. It costs more per link than doing it manually, but it's hands-off. Apply the same discipline you'd apply to a manual buy: insist on DR 40+ and topical relevance, verify where each link sits, keep anchor text natural. See `reference/tools-and-costs.md` → Backlink Building for Indexsy and other providers.

#### 2.2 Guest posts (for DR building)

Guest posts on DR 40+ sites in your niche build domain authority and topical relevance simultaneously. Target 5–10 per month to grow domain rating over 6–12 months.

Rules:
- Pitch topic-first (not link-first). Offer a genuinely useful article the audience would want.
- Link to hub pages, not programmatic depth pages. Equity flows from hubs down to spokes via internal linking.
- Use descriptive, partial-match anchors. Avoid exact-match anchors that read as SEO-planted.
- Do not submit to "write for us" directories that list guest post opportunities — these are known spam vectors. Find sites organically that cover your niche and pitch individually.

#### 2.3 Local sponsorships (for local/geo sites)

Budget $200–500/year per sponsorship for local charities, sports leagues, community organizations, or professional associations in each geo you target. Most issue a donor page with a link. These links carry genuine editorial trust and local topical relevance.

#### 2.4 Digital PR and research report

The "industry report → press release → AI citation" play simultaneously builds links and earns AI citations:

1. Publish an original benchmark or research report on your site with real data (pricing, close rates, success metrics from real client/customer interactions). Add `Dataset` JSON-LD schema.
2. Issue a press release on ABNewswire or EIN Presswire announcing the report (~$80–100/release).
3. The release syndicates to BarChart, Yahoo Finance, and other wire endpoints — each syndication is a link.
4. ChatGPT cites BarChart regularly. This earns both links and AI citations from a single action.
5. Pitch the report to 3–5 industry publications for editorial coverage. The original data is the hook.

#### 2.5 Roundup inclusion outreach

Find existing "best X" listicles that already rank on Google AND are already being cited by AI engines. These are the most valuable placement targets:
1. Search your target queries. Note which third-party listicles/roundups appear.
2. Check DataForSEO `llm_responses` to confirm which of those pages are being cited by AI.
3. Email the editors with an honest pitch: "I noticed you include [Competitor A] and [Competitor B]. Here's why [Your Brand] should also be considered — [original data point or unique angle]."
4. Do not pay for spammy link-farm roundup placement. Pay only for placements on real, editorially maintained content.

### Phase 3 — Anchor text discipline

Anchor text distribution across your entire backlink profile should look natural:
- ~30% exact-match (the target keyword)
- ~40% partial-match (keyword variant or phrase containing the keyword)
- ~20% branded (your brand name)
- ~10% generic ("click here," "source," "read more") — keep this low but not zero

**First link from a new domain:** use exact-match for your primary keyword.
**Second+ links from any domain or referring site:** vary to partial-match or branded. Never send the same exact-match anchor twice from the same root domain.

Avoid over-optimization. A profile with 70%+ exact-match anchors signals manipulation.

### Phase 4 — Link velocity guidance

Build links at a pace that grows with your site's authority:
- Month 1: 5–10 links total
- Month 2: 15–20 links total
- Month 3: 30+ links total
- Month 6: 50+ links total

Growing too fast (hundreds of links in month 1 on a new domain) triggers pattern-matching filters. Steady, accelerating growth looks natural.

### Phase 5 — What earns links passively

Certain content types earn links without active outreach. Build these into the site architecture:

**Pricing benchmarks / cost guides.** When someone writes about your industry, they cite pricing data. Be the source. A well-researched pricing guide with `Dataset` schema earns passive editorial links over time.

**Original research with specific data.** Specific numbers ("73% of X do Y") get cited far more than qualitative claims. One original study with 50+ data points can earn dozens of passive links over 12 months. AI models also preferentially cite authoritative research sources — this is the overlap between link building and GEO.

**Comparison tables with real data.** When your comparison table includes honest data from multiple vendors (not just your own claims), other publications reference it. This is the same structure that earns AI citations.

**Tools and calculators.** Free tools (ROI calculators, vetting checklists, cost estimators) earn links from practitioners who embed or reference them. Build them on your domain, not a third-party platform.

---

## Standards & Thresholds

| Metric | Target |
|--------|--------|
| Link velocity month 1 | 5–10 |
| Link velocity month 3 | 30+ total |
| Link velocity month 6 | 50+ total |
| Guest post minimum DR | DR 40+ |
| Guest posts per month (for DR build) | 5–10 |
| Niche edit price ceiling | $100 — walk away above this for standard placements |
| High-quality niche edit (DR 40+, relevant) | $80–200 |
| Local sponsorship budget | $200–500/year per sponsorship |
| Exact-match anchor ceiling | ~30% of backlink profile |
| Spam score threshold for disavow action | >20 |
| Platform DA reference | LinkedIn 98, Medium 95, Quora 93, Reddit 91 |
| Domain rating growth timeline | 6–12 months to DR 60+ with consistent effort |

---

## AI-Agent Checklist

**Before starting off-page (gate):**
- [ ] Core money and comparison pages are indexed (verified via GSC URL Inspection)
- [ ] Pages are returning impressions in GSC (any organic activity detected)
- [ ] Disavow filed if spam score >20
- [ ] GSC URL-prefix property added (required for disavow tool)

**Foundation (week 1–2):**
- [ ] GBP claimed and business info complete
- [ ] Crunchbase company profile created
- [ ] G2/Capterra/Clutch profile created (whichever fits niche)
- [ ] Trustpilot profile claimed (no bought reviews)
- [ ] Wikidata company + founder items created, `sameAs` fields linked
- [ ] LinkedIn company page created, matching schema `sameAs` URL
- [ ] NAP consistent across all entity listings

**Active acquisition (monthly):**
- [ ] Expert-source platforms registered (Featured / Qwoted / SourceBottle)
- [ ] 2–3 expert source responses submitted this week
- [ ] Niche edit prospects identified (competitor link replacement opportunities)
- [ ] Niche edit outreach sent with screenshot of current link location
- [ ] Guest post pitches sent to DR 40+ sites in niche
- [ ] Digital PR: one data asset published on-site with Dataset schema
- [ ] Digital PR: press release issued if new data warrants it
- [ ] All new links logged with: URL, DR, anchor text, target page, date acquired

**Monthly audit:**
- [ ] New referring domains added this month (count vs prior month)
- [ ] Anchor text distribution checked — no bucket over 40%
- [ ] Any new toxic links identified (DataForSEO or Ahrefs scan)
- [ ] Disavow file updated if new toxic links found

---

## Common Mistakes and Risks

**Building links before pages are indexed.** Links to un-indexed pages waste authority budget. Verify pages are indexed via GSC URL Inspection before pointing links at them.

**All links pointing to the homepage or one money page.** Distribute links across hub pages. Equity flows from hubs to spokes via internal linking — you don't need external links directly to every programmatic page.

**Ignoring anchor text after the first link.** Sending exact-match anchors repeatedly from different domains triggers over-optimization signals. Track your anchor text distribution from day 1.

**Paying for links on sites with no real traffic or audience.** A link from a site with 0 organic traffic and 50 external links is a risk, not an asset. Check: does the linking page actually rank for anything? Does the site have real content?

**Grey-hat account manipulation and vote rings.** Reddit upvote rings, BrowserBlast CTR manipulation, 30–50 duplicate comments across subreddits, and fake E-E-A-T account farms all exist in the community and all carry genuine ban risk. The only sustainable version of Reddit community participation is genuine value-first comments with honest brand mentions. The legitimate approach described in this playbook (9:1 value ratio, name-only mentions, account warming) works without ban risk.

**Buying reviews on any platform.** Against every major platform's terms of service. A Trustpilot, G2, or Google profile with clearly manufactured reviews makes AI engines less likely to cite you as trustworthy. Do not do this.

**PBNs.** Private blog networks are a category-level risk. If your disavow audit finds PBN links you didn't build, disavow them. Never build them intentionally. Google's manual action team has significantly improved PBN detection.

**Over-relying on guest posts.** Guest posts are link building, not marketing. A guest post on a DR 45 site earns you a link and potentially some referral traffic — but unless the publication has a real audience for your ICP, the content investment may outpace the return. Niche edits often deliver more value per dollar for a new site.
