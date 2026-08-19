# Internal Linking & Siloing

**Purpose:** Wire every page into the site's topical authority graph so link equity flows efficiently, crawlers index everything, and Google understands the site's topical depth.

**When to use this:** At template build time (before any content goes live), and again as a recurring audit whenever new pages are added.

---

## The SOP

### 1. Draw the hub-and-spoke map before building
- Identify: hub pages (money pages, comparison pillar, guides hub) and spoke pages (vendor reviews, geo/state pages, lead-type pages, individual guides, versus pages).
- Every page must have ≥3 inbound internal links before going live.
- Map this in your data layer or template — not as a manual per-page task.

### 2. Implement hub→spoke and spoke→hub links in the template
- Every hub page links out to all its direct spokes.
- Every spoke page links back to its parent hub AND cross-links to 3+ sibling spoke pages.
- Breadcrumbs on every page emit both a visual trail and `BreadcrumbList` JSON-LD.

### 3. Enforce the 3-click rule
- Every indexed page must be reachable within 3 clicks from the homepage.
- `Home → hub/category → listing/spoke` is the target path.
- Pages deeper than 3 clicks waste crawl budget and receive less PageRank.

### 4. Eliminate orphan pages
- An orphan page has fewer than 3 inbound internal links. Orphans are hard to find, miss topical authority, and fail to receive equity.
- Run a programmatic orphan check after every build. No page goes live with 0 inbound internal links.
- Geo/state pages are the most commonly orphaned — add them to a footer navigation block and cross-link from parent money pages.

### 5. Use descriptive anchor text with a healthy distribution
- Target distribution across the full site: ~30% exact-match / ~40% partial-match / ~20% branded / ~10% generic.
- Never "click here" or "learn more" without a following keyword.
- Exact-match anchor text >40% of total profile = over-optimization risk.

### 6. Place links early in the content
- Links in the top 30% of content carry approximately 3× more weight than bottom-of-page links.
- Place in-content contextual links in the body, not just in footers or sidebars.

### 7. Build footer navigation blocks for depth pages
- State pages, major city pages, and high-traffic category pages belong in a sitewide or section-level footer block.
- Include the ~12–25 highest-priority pages — not every URL.
- This provides equity to depth pages that would otherwise be starved.

### 8. Add editorial guide→money page links
- Every guide or editorial post must contain contextual in-body links to at least 3 relevant money pages or comparison pages.
- This is the cheapest, fastest equity lever: guide traffic and any incoming links flow directly into money pages.

### 9. Wire programmatic pages with auto-generated link blocks
For directories and programmatic sites, use data-driven link blocks in the template:
- **Breadcrumbs:** Home → State → City → Type → Listing on every page.
- **"More in [State]":** on every city page, link to neighboring/adjacent cities (use a real adjacency or population map, not random pairs).
- **"Other [Types] in [City]":** on each type page, link to sibling types.
- **"Similar [Listings]":** on individual listing pages, link to 3–5 nearby or related listings.
- **Footer state block:** on state pages, link to all cities in that state.

### 10. Avoid over-linking the same money page
- Linking the same money page from 50+ blog posts with identical anchor text looks manipulative.
- Prefer merging thin duplicate-intent pages (301 weaker into stronger) over building more entry points to the same target.

### 11. Verify after every build
- Programmatic orphan check: flag any URL with <3 inbound internal links.
- Anchor text distribution check: flag if exact-match anchor exceeds 40% of total.
- Internal link count per page: money pages must have 8–12; minimum 5 on any indexed page.

### 12. Use internal links as a ranking lever
- When a page stalls at positions 7–15, add 2–3 in-content links from higher-authority pages using keyword-rich anchor text.
- Wait 1–2 weeks to measure position movement before adding off-page links.
- Confirm: internal link additions have moved positions within one week in documented campaigns.

---

## Standards & thresholds

| Metric | Threshold |
|--------|-----------|
| Inbound internal links per page | ≥3 (minimum to avoid orphan status) |
| In-content links per money page | 8–12 |
| In-content links per 1,000 words | 3–5 |
| Maximum clicks from homepage | 3 (3-click rule) |
| Exact-match anchor text share | ≤40% of total internal link profile |
| Generic anchor text ("click here") | 0% — always descriptive |
| Crawl budget: pages in footer block | ~12–25 highest-priority pages |
| Sibling cross-links on programmatic pages | ≥3 per spoke page |

---

## AI-agent checklist

- [ ] Hub-and-spoke map drawn and encoded in data/template layer before building
- [ ] Every page has ≥3 inbound internal links
- [ ] Every page reachable within 3 clicks from homepage
- [ ] Breadcrumbs present on every page
- [ ] Orphan check passed after build (0 pages with 0 inbound links)
- [ ] Anchor text distribution: exact-match ≤40%, no "click here"
- [ ] Money pages have 8–12 in-content internal links
- [ ] Guides each link to ≥3 money/comparison pages
- [ ] Programmatic pages have auto-generated breadcrumbs, "More in [Region]" block, and sibling cross-links
- [ ] Geo/state depth pages appear in footer navigation block
- [ ] Sibling spoke pages cross-link to each other (≥3 cross-links per spoke)

---

## Common mistakes

**Building internal linking as a manual per-page task** — at scale (50+ pages), manual linking always produces orphans and missed opportunities. Internal linking must be wired into templates and data models at build time.

**Orphaned geo/state pages** — state and city pages are the most commonly starved. A hub page with only one inbound link from the state hub misses all the equity that money pages and the homepage could pass. Fix: sitewide footer block + in-content links from money pages.

**Uniform anchor text** — using the exact primary keyword every time looks manipulative and limits the page's semantic reach. Vary with partial-match and branded anchors.

**Footer-only linking** — footer links are the weakest signal. In-content contextual links within body copy, early in the page, carry far more equity.

**Over-linking the same page** — 50 blog posts all pointing to one money page with the same anchor text is a footprint. Merge thin duplicates instead.

**Linking geographically irrelevant pages** — linking Denver listings from Birmingham city pages is topically incoherent and dilutes relevance. Only link contextually related pages (nearby cities, same state, same category).

**Skipping the post-build orphan check** — a programmatic generator may silently drop a page from all link blocks if a data condition changes. Always verify after every build.
