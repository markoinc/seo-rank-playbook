# SEO Rank Playbook

**A complete, execution-ready SEO + AI-SEO playbook you hand to an AI agent to build and rank websites — for any niche.**

Give an agent this repo plus a one-line goal — *"build a site that ranks for these keywords"* or *"make this site rank for these keywords"* — and it has everything it needs to do the job right: keyword research, site architecture, a crawlable build, on-page, technical SEO, schema, pagespeed, Cloudflare deploy + indexing, the AI-SEO layer (get cited by ChatGPT / Perplexity / Google AI Overviews), off-page authority, local SEO, programmatic/directory SEO, and measurement.

It is distilled from professional SEO SOP libraries and from a **real, executed build that went from 0 → 14/26 Google AI Overviews + 7/12 Perplexity citations in three weeks.** Every tactic is generalized and niche-agnostic.

---

## Quick start

### If you're an AI agent
Read [`AGENT.md`](AGENT.md) first — it's your operating manual — then [`playbook/00-START-HERE.md`](playbook/00-START-HERE.md).

### If you're a human
1. Skim this README and [`playbook/00-START-HERE.md`](playbook/00-START-HERE.md) to see the order of operations.
2. Open your AI coding agent (Claude Code, Cursor, etc.) in this repo.
3. Paste one of the ready prompts and fill in your keywords:
   - New site → [`templates/prompts/build-a-site-that-ranks.md`](templates/prompts/build-a-site-that-ranks.md)
   - Existing site → [`templates/prompts/make-this-site-rank.md`](templates/prompts/make-this-site-rank.md)
4. The agent executes the playbook phase by phase, gating on the checklists.

---

## What's inside

### `playbook/` — the SOPs (execute these in order)
| # | File | Covers |
|---|------|--------|
| 00 | `00-START-HERE.md` | The two runbooks + master order of operations |
| 01 | `01-keyword-research-and-intent.md` | Keyword discovery, intent bucketing, KD, AI-visibility read |
| 02 | `02-architecture-and-topical-map.md` | URL tree, hub-and-spoke, one-concept-per-URL |
| 03 | `03-site-build-and-tech-stack.md` | Stack choice, repo layout, the per-page data model |
| 04 | `04-on-page-seo.md` | Titles, metas, H1–H6, content depth, E-E-A-T |
| 05 | `05-internal-linking-and-siloing.md` | Internal link topology, anchors, orphan prevention |
| 06 | `06-technical-seo.md` | Crawlability, prerender/SSG, sitemap, robots, canonicals, soft-404s |
| 07 | `07-structured-data-schema.md` | JSON-LD `@graph`, page-type → schema matrix |
| 08 | `08-pagespeed-core-web-vitals.md` | LCP / CLS / TBT targets and fixes |
| 09 | `09-hosting-cloudflare-deploy-indexing.md` | Cloudflare Pages deploy, cache purge, IndexNow, GSC/Bing |
| 10 | `10-ai-seo-aeo-geo.md` | `llms.txt`, getting cited by ChatGPT/Perplexity/AI Overviews |
| 11 | `11-off-page-and-link-building.md` | Niche edits, digital PR, Reddit/Quora, link velocity |
| 12 | `12-local-seo-gbp.md` | GBP, NAP, local schema, the 65-point local checklist |
| 13 | `13-programmatic-directory-seo.md` | One template × many rows, mass indexing, uniqueness at scale |
| 14 | `14-measurement-and-tracking.md` | GSC, AI-visibility sweeps, KPIs, honest caveats |

### `templates/` — copy-paste assets
Per-page SEO data model (`page-seo-data-model.ts`), JSON-LD builder, `robots.txt` (with AI-crawler rules), `llms.txt` example, meta/title formulas, the prerender + deploy pipeline, and ready-to-use agent prompts under `templates/prompts/`.

### `checklists/` — gates
`pre-launch-checklist.md`, `on-page-checklist.md`, `technical-crawl-checklist.md`, and the `ranking-audit-scorecard.md`.

### `reference/` — fast lookups
`tools-and-costs.md` (every tool named, what it's for, cost) and `thresholds-cheatsheet.md` (every hard number in one table).

---

## Core principles

1. **Crawlable first.** If a JS/SPA renders client-side, crawlers and AI bots may see nothing. Prerender to static HTML and verify it in the *served* response — not in a browser.
2. **One concept, one URL.** No cannibalization.
3. **AI-SEO is a first-class layer.** For young domains, AI citations often land before Google rankings.
4. **Foundation → authority.** Make it crawlable and correct before spending on links.
5. **Verify, don't claim.** Purge cache, re-fetch live, confirm. Indexed ≠ ranking.
6. **Stay legitimate.** Grey-hat community tactics are noted with risk flags; the default path is white-hat.

---

## Scope & honesty

SEO is probabilistic, not deterministic. This playbook maximizes the inputs Google and AI engines reward; it does not guarantee a ranking position or timeline. Competitive terms on a young domain need off-page authority and time. Search-engine and AI-platform behavior changes — treat specific numbers as strong defaults, and re-validate periodically.

## License

[MIT](LICENSE). Use it, fork it, adapt it. No warranty.
