# Prompt — Keyword research + topical map

Use this first when you don't yet have a finalized keyword list. It produces the bucketed keyword list and URL tree you feed into the build/rank prompts. Follows `playbook/01` and `playbook/02`.

---

```
You have the SEO Rank Playbook in this repo. Read playbook/01-keyword-research-and-intent.md and
playbook/02-architecture-and-topical-map.md, then do the following for my niche.

NICHE: <niche>
GEOGRAPHY: <national | specific cities/states>
SEED TERMS: <2–5 seed keywords in plain language a real buyer would type>
BUSINESS GOAL: <what a conversion is>

TASKS
1. Expand the seeds into a full keyword set. For each keyword capture: search volume, keyword
   difficulty (KD), and intent bucket (money / comparison / informational / local / branded).
   - Use natural, plain-language queries real users type — not industry jargon/abbreviations.
   - Note which terms are likely to trigger Google AI Overviews and which are asked to
     ChatGPT/Perplexity (the AI-visibility read).
   - Flag the low-difficulty, real-intent "quick win" terms (rank-able fast) separately from the
     high-difficulty "authority" terms.
2. Group the keywords into topical clusters (one hub per cluster, spokes beneath it).
3. Produce the URL tree: one URL per concept, hub-and-spoke, no two URLs targeting the same intent.
   For each URL give: the target primary keyword, the page type (money / comparison / guide /
   local / listing), and 3–5 internal links it should carry.
4. Call out cannibalization risks and any obvious content gaps vs. competitors.

OUTPUT
- A table: keyword | volume | KD | intent | AI-overview? | quick-win?
- The topical clusters.
- The URL tree (as an indented list), each node annotated with primary keyword + page type.

Keep it niche-agnostic in method but concrete for MY niche. Do not invent volumes — if you don't
have a data source, say the number is an estimate and mark it.
```
