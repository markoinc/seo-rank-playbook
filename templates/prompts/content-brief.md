# Prompt — Content brief for a single page

Use this to generate a rank-ready brief (or the full draft) for one URL. Follows `playbook/04` (on-page), `playbook/07` (schema), and `playbook/10` (AI-SEO).

---

```
You have the SEO Rank Playbook in this repo. Read playbook/04-on-page-seo.md,
playbook/05-internal-linking-and-siloing.md, playbook/07-structured-data-schema.md, and
playbook/10-ai-seo-aeo-geo.md. Produce a rank-ready page for:

URL: <path, e.g. /best-[niche]-[city]/>
PRIMARY KEYWORD: <keyword>
PAGE TYPE: <money | comparison | guide | local | listing>
SECONDARY / CLUSTER KEYWORDS: <list>
CONVERSION GOAL: <call / form / purchase / booking>
BRAND: <name>

PRODUCE
1. Title tag (≤60 chars, primary keyword first, brand suffix) and meta description (150–160 chars,
   CTR-focused). Title may diverge from H1 for CTR.
2. Single H1 (contains the primary keyword) and the full H2/H3 outline (secondary + cluster +
   question variants; no skipped levels).
3. An answer-first opening: the direct answer to the page's core question in the first 30–100 words
   (this is what AI engines cite).
4. The body content meeting the word-count + depth target for this page type (see playbook/04
   "Standards & thresholds"). Cover the topic comprehensively; write for humans, structured for
   extraction.
5. An FAQ block (question-form H3s + concise answers) — feeds FAQ schema and AI citations.
6. 3–5 internal links (per 1,000 words) to topically related URLs, with descriptive anchors.
7. The JSON-LD schema block for this page type (use templates/json-ld-builder.md), as an @graph.
8. Image slots with descriptive alt text.

CONSTRAINTS
- Answer-first, comprehensive, no fluff or keyword stuffing.
- Every claim that implies expertise should carry an E-E-A-T signal (author, source, data).
- Then run this page against checklists/on-page-checklist.md and report the box-by-box result.
```
