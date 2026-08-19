# 00 — START HERE: the two runbooks + order of operations

This file routes you to the right sequence. Pick the runbook that matches your goal, then execute the phases in order. Each phase links to the discipline SOP that carries the detail.

> New here? Read `../AGENT.md` first. It defines the operating loop, the non-negotiable rules, and the definition of done.

---

## Pick your runbook

| Your goal | Runbook |
|-----------|---------|
| **"Build a site that ranks for these keywords"** (greenfield / new domain) | **Runbook A** below, and the ready prompt at `../templates/prompts/build-a-site-that-ranks.md` |
| **"Make this existing site rank for these keywords"** (site already exists) | **Runbook B** below, and the ready prompt at `../templates/prompts/make-this-site-rank.md` |

Both runbooks draw on the same discipline SOPs (`01`–`14`); they differ in order and starting point.

---

## Runbook A — Build a new site that ranks (0 → launch → rank)

**Phase 0 — Discovery & strategy**
1. Keyword research + intent mapping → `01-keyword-research-and-intent.md`. Output: a keyword list bucketed by intent (money / comparison / informational / local), with volume + KD + an AI-visibility read.
2. Architecture + topical map → `02-architecture-and-topical-map.md`. Output: the URL tree (hubs + spokes), one URL per concept.

**Phase 1 — Build (crawlable from day one)**
3. Choose stack + scaffold → `03-site-build-and-tech-stack.md`. Use the page data model at `../templates/page-seo-data-model.ts`.
4. Build page templates with on-page baked in → `04-on-page-seo.md` + `05-internal-linking-and-siloing.md`.
5. Wire technical foundation → `06-technical-seo.md`: prerender/SSG (`../templates/prerender-and-deploy/prerender-pattern.md`), sitemap.xml, `robots.txt` (`../templates/robots.txt`), canonicals.
6. Add schema to every template → `07-structured-data-schema.md` + `../templates/json-ld-builder.md`.
7. Add the AI-SEO layer → `10-ai-seo-aeo-geo.md`: generate `llms.txt` (`../templates/llms.txt.example`), answer-first content, AI-crawler allow rules.

**Phase 2 — Ship**
8. Pass `../checklists/pre-launch-checklist.md` (do not skip a box).
9. Optimize pagespeed/CWV → `08-pagespeed-core-web-vitals.md`.
10. Deploy + index → `09-hosting-cloudflare-deploy-indexing.md` + `../templates/prerender-and-deploy/deploy-pipeline.md`. Purge cache, verify served HTML, submit to GSC + Bing + IndexNow.

**Phase 3 — Rank (compound)**
11. Content depth + programmatic scale (if applicable) → `13-programmatic-directory-seo.md`.
12. Off-page authority → `11-off-page-and-link-building.md` (young domains need this to move competitive terms).
13. Local layer (if the business is local) → `12-local-seo-gbp.md`.
14. Measure + iterate → `14-measurement-and-tracking.md`. Track Google rankings AND AI citations.

## Runbook B — Make an existing site rank

**Phase 0 — Audit (find what's broken before adding anything)**
1. Run the technical crawl audit → `../checklists/technical-crawl-checklist.md` and score with `../checklists/ranking-audit-scorecard.md`.
2. Confirm crawlability: `curl` key URLs and confirm the real content is in the served HTML (the #1 silent killer on JS sites) → `06-technical-seo.md`.
3. Keyword + gap analysis vs. the target keywords → `01-keyword-research-and-intent.md`. Map targets to existing URLs; note cannibalization and gaps.

**Phase 1 — Fix the basics (highest ROI first)**
4. Fix indexation blockers: missing/broken sitemap, wrong canonicals, `noindex` leaks, soft-404s → `06-technical-seo.md`.
5. Fix on-page on money pages: titles, metas, single H1, headings, depth, internal links → `04` + `05`.
6. Add/repair schema → `07` + `../templates/json-ld-builder.md`.
7. Fix Core Web Vitals → `08-pagespeed-core-web-vitals.md`.

**Phase 2 — Add the AI-SEO layer**
8. `llms.txt`, AI-crawler `robots.txt`, answer-first rewrites of top pages, pursue citations → `10-ai-seo-aeo-geo.md`.

**Phase 3 — Expand + authority**
9. Build the missing pages in the topical map → `02`, `13`.
10. Off-page / link building → `11`. Local → `12` if relevant.
11. Deploy discipline every time → `09` + `../checklists/pre-launch-checklist.md` (the relevant subset). Purge, verify, resubmit.
12. Measure + iterate → `14`.

---

## The order-of-operations principle

Always: **make it crawlable → make it correct on-page → make it authoritative (schema + AI layer) → make it fast → ship & index → build authority off-page → measure.** Do not buy links for a site that isn't crawlable. Do not chase AI citations for pages that aren't indexed. Fix the foundation first; authority compounds on top of it.
