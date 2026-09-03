# AEO Visibility Sweep — Competitive AI-Answer Scoring

**Purpose:** Quantify exactly how visible a brand is in AI answers *relative to its competitors*, and turn it into a repeatable monthly scoreboard. This is the deep version of the scorecard's binary "AI Citation Rate" item (`ranking-audit-scorecard.md` §2H) and the manual/DataForSEO monitoring in `playbook/10-ai-seo-aeo-geo.md` §4 — read those first for the *tactics*; this file is the *measurement method*. Don't duplicate them; this adds the competitive scoring rigor.

**When to use:** as the opening diagnostic on any brand (it's the wedge finding for a proposal), and then re-run monthly as the KPI. Same prompt set, same brand list, fixed baseline.

---

## Step 1 — Build the prompt set

Pick 15–35 real buyer prompts. Two buckets, and the split matters:
- **Non-branded category questions** ("best X software", "best X for healthcare", "X alternatives", "top X platforms 2026"). This is the discovery layer — where a brand is either on the shortlist or invisible.
- **Branded/comparison questions** ("X vs [competitor]", "[brand] alternatives"). A brand often shows up here *only*, which is the tell that it's absent from discovery.

Log each prompt's bucket. Test each prompt in both lowercase and Title Case (engines pull different sources by case).

## Step 2 — Run the sweep across engines

Manual (free) or via DataForSEO `llm_responses` (paid, batch; **one prompt per call — loop**). Cover ChatGPT + Gemini on the full set; Perplexity + Claude on a subset if budget-limited. `web_search=true`. Weight effort toward ChatGPT and Gemini (highest-value engines, 2026), but include Claude — technical/enterprise buyers lean on it.

## Step 3 — Score three ways

**A. Share of voice (brand mentions).** Count how many answers name each vendor — the brand AND every competitor that appears. Rank them.
- Metric: `brand mentions / top competitor's mentions`. "Named 38% as often as the leader, mid-pack at #10 of 15" is a headline a decision-maker feels.

**B. Site citations (the money metric).** Count how many times each vendor's *own domain* is linked as a source.
- **Named but not linked = weak entity signal** (fix: `sameAs` to G2/Capterra/Crunchbase/Wikidata, complete `@graph`, Dataset schema). **Cited = you're the source.** Track both; citations are what compound.

**C. Google AI Overview grid.** For each priority term, record four columns:

| Term | AIO present? | Brand named? | Brand cited? | Named instead |
|------|-------------|-------------|-------------|---------------|
| … | Yes/No | Yes/No | Yes/No | comp, comp, comp |

The killer data point: a term where the brand **ranks top-3 organically but is absent from the AIO**. That proves the gap is *extractability + citation placement*, not authority — and it's fixable with answer-first structure + schema + placement on the sources the AIO already pulls.

## Step 4 — Read the mechanism

List the domains the engines actually cite for the target queries (directories, "best-X" listicles, Reddit/forums, YouTube, Gartner/G2/Capterra). Those specific URLs are the off-site placement targets — get the brand *onto them* (see `10-ai-seo-aeo-geo.md` §3, §6.2). Note per-engine behavior (e.g. one engine names brands but rarely links; another leans third-party directories) — it tells you where to spend.

## Step 5 — Baseline and re-run monthly

Freeze this run as the baseline. Re-run the identical prompt set monthly and diff: share-of-voice, citation counts, AIO presence, vs named competitors. This is the client scoreboard and the proof-of-progress. Tie it to GSC + analytics for the real click/traffic delta alongside the visibility numbers.

---

## Scoring output template

```
AI-Visibility Sweep — [brand] — [date]  (N answers across [engines])
Share of voice (mentions):  [leader] X · … · [brand] Y (#R of M)
Site citations:             [leader domain] X · … · [brand domain] Y
Per engine:                 ChatGPT named a/N cited b/N · Gemini … · Perplexity … · Claude …
AI Overview:                present on P of Q priority terms; brand named in n, cited in m
Absent-but-ranking terms:   [term(s) where brand is top-3 organic but not in AIO]  ← highest-leverage
Cited sources to target:    [domain, domain, domain …]
```

## Common traps

- **Binary thinking.** "We're cited somewhere" hides that you're 10th of 15 and only on branded queries. Always score competitively.
- **Run-to-run variance.** AI answers vary; treat share-of-voice as directional, re-measure monthly against the fixed baseline.
- **Ahrefs fake "position 1" / GA4 undercount** — verify visibility claims against GSC (see `10-ai-seo-aeo-geo.md` §4.1b).
- **Ignoring "named but not linked."** It's the cheapest win — an entity/schema fix, not a content one.
