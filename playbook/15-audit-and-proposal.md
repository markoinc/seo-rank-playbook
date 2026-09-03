# Deep Audit → Proposal (turning a prospect into a scoped engagement)

**Purpose:** take a brand you know nothing about and produce (1) a deep, data-backed audit of where it stands in Google and AI answers, and (2) a proposal that scopes the work, prices it, and lowers the buyer's perceived risk. The rest of this playbook is *how to rank a site*; this chapter is *how to audit a prospect and sell the engagement*.

**When to use:** every new prospect. It's a repeatable pipeline — most of it is scriptable, the judgment steps are flagged.

---

## Phase A — Intake + ICP math

Capture the URL and the unit economics: deal size (or ARR), close rate, and CAC ceiling. Then convert the *target deal* into the *buyer's actual size* using the prospect's own pricing.

> Example: a $40k-ARR deal at $10–15/user/mo ≈ 250–350 seats → target the 300–1,000-seat mid-market that's actively evaluating, not the SMB (too small to hit ARR) or the mega-enterprise (already committed).

This one calculation decides which keywords and queries are buyer-fit vs. vanity volume, and it frames the whole proposal around money, not traffic. State it explicitly.

## Phase B — Understand the company

Read the live site (homepage, product, pricing, comparison pages, industries, customers, blog, sitemap). Capture what they *actually sell*, their differentiators, and — critically — **what assets already exist** (comparison pages, listicle/insights sections, glossary). Half the recommendations are usually "upgrade what's there," not "build from scratch." Getting this wrong makes the audit look uninformed.

## Phase C — Market, keyword & competitor research

Pull real data (DataForSEO or equivalent — see `01-keyword-research-and-intent.md`):
- **Keywords:** suggestions, volume, difficulty, CPC, intent, and **AI-tool search volume** (demand happening *inside* AI assistants).
- **Competitors:** organic keywords, estimated traffic value, top-3 count, referring domains — the authority landscape. Identify the runaway leader to study.
- **Keyword-gap clusters:** domain-intersection vs the top 2–3 competitors surfaces the on-theme clusters the brand is missing entirely (topical-authority gaps).
- **SERP reality:** pull the live SERP for priority terms — SERP features, People-Also-Ask, and whether an **AI Overview** is present (it almost always is now).

Read the result as: difficulty vs CPC vs AI-search demand. High CPC + low difficulty + AI demand = winnable, high-value.

## Phase D — AI-visibility sweep (the wedge)

Run the competitive AI-answer sweep and score it — full method in `checklists/aeo-visibility-sweep.md`. This is usually the sharpest finding: the brand is mid-pack or invisible on non-branded buyer questions while weaker competitors get named and cited, and it's absent from Google AI Overviews even on terms where it ranks top-3. That gap *is* the pitch.

## Phase E — Technical / on-page / AEO site audit

Grade the site against the **300-point scorecard** (`checklists/ranking-audit-scorecard.md`): Technical SEO, AI-SEO/GEO, CRO. Sample representative page types (you can't audit every URL). Use `checklists/technical-crawl-checklist.md` + `on-page-checklist.md` + chapters 04/06/07/08/10 as the rubric. Produce a graded score + a P1/P2/P3 fix list.

Also audit, because they change the offer:
- **Review presence** — G2, Capterra, TrustRadius, SourceForge, Software Advice, Trustpilot: count + rating. Often the brand is *already* well-reviewed and the real gap is missing `AggregateRating` schema / reviews not shown on-site — a cheap fix, not a "get listed" campaign. **Audit before you scope; don't sell a service they don't need.**
- **Backlink profile + toxic tail** — referring-domain authority (usually not the problem) and the spam/low-trust tail (→ a disavow line item).
- **Entity consistency** — legacy/renamed brand residue, `sameAs` completeness to the directories AI cites.

## Phase F — Build & integration

Detect the stack (framework/CMS, host, DNS, forms/CRM) from response headers, HTML, and DNS. This tells you *how changes ship*: repo PRs (best) vs. engineering-ready specs for their devs (fallback). Note the access you'll need (repo, GSC/GA4 read, Bing WMT). Don't propose re-hosting a site off its current stack — work inside it. See `03-site-build-and-tech-stack.md` and `09-hosting-cloudflare-deploy-indexing.md`.

## Phase G — Tactics & supply

Decide what to run (comparison/listicle cluster, off-site citation seeding, YouTube, PR, Reddit/forum, review signals — see chapters 10 & 11) and line up **who delivers it** and at what cost. Maintain a vendor/cost catalog (`reference/tools-and-costs.md`). This feeds pricing.

## Phase H — Pricing & offer

- **Deduce current spend** (domain age, content volume, backlink history, tooling) as a defensible anchor.
- **Build a hard-cost stack** from Phase-G vendor prices — every off-page deliverable gets a real monthly cost; on-page/schema work is labor.
- **Price to a margin rule.** A clean one: hard cost ≤ 40% of price (≥60% margin before labor). Offer **two tiers** (a steady-momentum tier and an aggressive tier) so the buyer self-selects.
- **Structure the offer on the value equation** (Value = Dream outcome × Perceived likelihood ÷ Time delay ÷ Effort):
  - *Likelihood ↑*: a measured baseline + monthly report, "structural not authority" framing (weaker rivals already win on structure, so the path is known), and fast early proof.
  - *Time delay ↓*: quick technical wins in weeks 1–2; first AI citations ~3 weeks.
  - *Effort ↓*: fully done-for-you.
- **Lower perceived risk with something that costs you nothing: month-to-month, no lock-in.** Only make a *contractual* performance guarantee if you actually intend to stand behind it — never ship one you haven't decided on.

## Phase I — Deliverables

Produce client-safe documents: (1) the market/competitive analysis, (2) the technical/AEO audit, (3) the proposal + scope. Keep the offer-formulation, margins, vendor names, and internal tactics in a separate internal doc — **scrub the client-facing set for anything that shouldn't be shown**.

Formatting matters — a raw-markdown-looking doc reads as low-effort:
- **Structure** (~7 sections): title + "Prepared for [brand]" → the opportunity / where-they-are-vs-where-we-take-them → what we fix → tiers + pricing table → projected outcomes → timeline → low-risk + next step.
- **Native formatting:** real headings, real tables (not literal `| pipes |`), clean lists, callout boxes for definitions/disclaimers. If a doc's data reads like a wall of `a · b · c` numbers, convert it to a ranked table (bold the brand's own row). Avoid fake block-character bar charts — embed a real chart image if you need a graph.
- **Set expectations honestly:** projections are targets, not guarantees (algorithm/competitor/site factors are outside anyone's control).

## Phase J — Execution → ranking

On signature, the engagement runs the rest of this playbook: foundation fixes (schema/@graph, open FAQs, answer-first rewrites, llms.txt, IndexNow, entity cleanup, disavow) → content cadence (comparison + category pages) → the monthly off-site citation engine (chapters 10 & 11; citations decay ~50%/30 days, so it's a subscription not a one-off) → top-3 conversion on striking-distance keywords → the **monthly AI-visibility sweep as the scoreboard** (Phase D, re-run against baseline).

---

## AI-Agent Checklist

- [ ] Intake captured; ICP derived from deal economics (seat math stated)
- [ ] Company understood; existing assets inventoried (upgrade vs build)
- [ ] Keyword + competitor + keyword-gap data pulled; SERP/AIO reality checked
- [ ] AI-visibility sweep scored competitively (`aeo-visibility-sweep.md`), baseline frozen
- [ ] Site graded on the 300-pt scorecard; P1/P2/P3 fix list produced
- [ ] Review presence + backlink tail + entity consistency audited
- [ ] Stack detected; integration path + access requirements noted
- [ ] Tactics chosen; vendor/cost catalog priced
- [ ] Current spend deduced; hard-cost stack built; tiers priced to margin rule
- [ ] Offer framed on the value equation; risk-reducer set (month-to-month); no unapproved guarantee
- [ ] Client-safe docs produced, formatted natively, and scrubbed of internal detail
