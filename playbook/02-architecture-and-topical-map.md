# Site Architecture & Topical Map

**Purpose:** Define the full URL taxonomy, hub-and-spoke link structure, and page sequencing before writing a single line of code or content. Architecture errors (scattered subdomains, orphan pages, topic bleed) are the most expensive SEO mistakes to fix — they require a full restructure. Done right up front, the architecture does most of the ranking work automatically.

**When to use:** After keyword research and intent bucketing are complete. Before any pages are written or any code is built. Revisit when adding a new topic cluster or geo layer.

---

## The SOP

1. **Consolidate authority onto one root domain.** Every subdomain Google treats as a mostly-separate entity. If authority is fragmented across subdomains (`leads.your-site.com`, `app.your-site.com`, `go.your-site.com`), consolidate all SEO content into root-domain subdirectories (`/leads/`, `/app/`, `/go/`). 301-redirect all subdomain variants to the root subdirectory equivalents. This is not optional — subdomain sprawl is the single most common architecture mistake that kills new sites' rankings.

2. **Draw the hub-and-spoke map before building.** Every content cluster has exactly one hub page that links down to spokes; every spoke links back up to the hub and laterally to 2–3 close neighbors. Identify this for every cluster before writing content.

3. **Assign URL patterns to each intent bucket.** Do this once; never change URL patterns after pages are indexed (URL changes lose accumulated link equity and require 301s).

   Recommended patterns:
   ```
   /                                → homepage (hub of all hubs)
   /[primary-keyword]/              → money pages (top hub per cluster)
   /[primary-keyword]/[variant]/    → leadtype spoke pages
   /[primary-keyword]/[state]/      → geo programmatic spoke pages
   /vendors/[name]/                 → vendor review spoke pages
   /guides/[topic]/                 → guide spoke pages
   /compare/[a]-vs-[b]/             → direct comparison pages
   /best-[category]/                → comparison pillar (hub for vendor spokes)
   ```

4. **Pick ONE primary taxonomy.** Google tokenizes topics linearly, not semantically. A site that adds 33% off-topic content has been documented to drop from $40K/mo to $4–5K/mo in organic revenue in a single algorithm update. Adjacent topics that seem related ("personal injury" and "workers comp") may not be tokenized as related by Google. Pick one primary topic cluster and build depth there before expanding.

5. **Sequence your build in phases by crawl-budget and authority.** A young domain has limited crawl budget. Don't publish 500 pages at launch.

   | Phase | What to build | Why |
   |-------|--------------|-----|
   | Phase 1 | 10–20 core pages: homepage + money pages + key guides | Establish topical authority first |
   | Phase 2 | Comparison/vendor cluster + GEO content structure | Highest ROI, wins AI citations |
   | Phase 3 | Programmatic depth: state/city pages, additional vendor reviews, lead-type pages | Scales topical breadth once authority is established |
   | Phase 4 | Link-bait layer: calculators, tools, checklists | Earn passive links and AI citations |

6. **Enforce zero orphan pages.** An orphan page is one with fewer than 3 inbound internal links. Orphans don't rank. Build internal linking into your page templates at the framework level — not as a manual task per page. After each build, run a programmatic orphan check.

7. **Plan noindex pages upfront.** Decide which pages should never rank: thank-you pages, funnel/conversion paths, legal pages, admin pages. noindex them explicitly. Index only pages intended to rank.

8. **Plan your programmatic pages as a data-driven system, not as individual pages.** State/geo pages and vendor review pages must be generated from structured data (one template + data file per page) — not written manually at scale. The template is written once; the generator produces all variants. This is the only way to maintain quality parity across hundreds of pages.

9. **Build the comparison/vendor cluster early.** In most niches with an established vendor landscape, the comparison cluster is: lowest KD, highest BOFU intent, and the primary cluster cited by AI engines. Build it second, right after core money pages. Structure: one pillar page (`/best-[category]/`) → individual vendor pages (`/vendors/[name]/`) → head-to-head pages (`/compare/[a]-vs-[b]/`).

---

## Standards & thresholds

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Inbound internal links per page (minimum) | 3 | Fewer = orphan risk; aim for 5+ |
| Average in-content links per page (target) | 8–12 | Programmatically verify post-build |
| Max pages at launch (fresh domain) | ~50 | Crawl-budget discipline; build authority first |
| Programmatic publish cadence (after Phase 1) | 5–7 pages/day | Some teams go faster; monitor crawl stats |
| Off-topic content allowed | 0% | Any topic bleed risks whole-site ranking drops |
| Subdomain SEO content | 0 | Consolidate everything to root domain |
| Subdomains (application, non-SEO) | OK | Only SEO content needs to be on root domain |
| City page pagination (to stay under 2MB HTML crawl limit) | 9–12 listings/page | More listings = thin/duplicate risk |
| Google HTML crawl limit | 2MB per page | Paginate city/listing pages to stay under |
| Geo pages: state vs metro level | Metro-level volumes only | DataForSEO state-level volume = null |
| Phase 1 → Phase 2 gate | Phase 1 pages indexed and crawled | Don't scale pages before core authority pages are indexed |

---

## AI-agent checklist

- [ ] All SEO content consolidated on one root domain; subdomains 301-redirected to subdirectories
- [ ] Hub-and-spoke map drawn for every topic cluster; no spoke page is missing its hub link
- [ ] URL patterns assigned to every intent bucket; patterns documented and locked
- [ ] One primary taxonomy selected; no off-topic content added
- [ ] Build sequence defined: Phase 1 (core) → Phase 2 (comparison + GEO) → Phase 3 (depth) → Phase 4 (link-bait)
- [ ] Max ~50 pages at launch enforced on fresh domain
- [ ] Noindex list documented: thank-you pages, funnel paths, legal pages, admin pages
- [ ] Programmatic pages designed as data-driven templates, not individually written
- [ ] Comparison/vendor cluster sequenced in Phase 2 (not last)
- [ ] Programmatic orphan check wired into build pipeline
- [ ] Every page in architecture has ≥3 planned inbound internal links before build begins
- [ ] State/geo pages added to footer navigation and money-page cross-links (most commonly equity-starved)

---

## Common mistakes

**Building on subdomains.** Every subdomain resets authority. Even if the subdomain is technically yours, Google treats it as a separate entity. Consolidate before scaling.

**Dumping 500 pages at launch.** A fresh domain's crawl budget is limited. Publishing 500 pages at launch, especially if many have thin content, results in: rapid initial indexing, then a cliff — de-indexing as Google marks them low-value. Classic "traffic spikes then crashes" pattern. Sequence by authority first.

**Adding off-topic content.** The documented case: a weight-loss site added 33% composting content → $40K/mo dropped to $4–5K/mo. Google tokenizes topics linearly. Adjacent-seeming topics are not perceived as related. Build depth in ONE taxonomy before expanding.

**Building comparison pages last.** The comparison/vendor cluster is typically the highest-ROI cluster: lowest KD, highest BOFU intent, and what AI engines cite. Many builders defer it as "nice to have." It should be Phase 2.

**Manual internal linking as a per-page task.** At scale, manually managed internal links are always incomplete. Build linking into page templates at the framework level — every money page links to its state/geo variants, every state page links to adjacent states, every vendor page links to 3 sibling vendors. Automate it or it won't happen.

**Orphan pages.** Pages with <3 inbound internal links rarely rank regardless of on-page quality. Run a programmatic orphan check after every build. State/geo pages are the most commonly equity-starved — they need footer nav rows and in-content cross-links from money pages.

**URL patterns changed post-indexing.** A URL change after a page is indexed loses all accumulated link equity to that URL. 301-redirects recover some, but not all. Decide URL patterns once, before building.
