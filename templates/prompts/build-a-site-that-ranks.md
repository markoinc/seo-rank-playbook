# Prompt — "Build a site that ranks for these keywords"

Copy this, fill the blanks, and give it to your AI coding agent **in a repo that contains this playbook**.

---

```
You have the SEO Rank Playbook in this repo. Read AGENT.md, then playbook/00-START-HERE.md,
and follow Runbook A (build a new site that ranks).

GOAL
Build a new website that ranks in Google and gets cited by ChatGPT / Perplexity / Google AI
Overviews for these target keywords:
  - <keyword 1>
  - <keyword 2>
  - <keyword 3>
  - …

CONTEXT
- Business / brand: <name + one-line description>
- Niche: <niche>
- Geography: <national | specific cities/states, or "N/A">
- Primary conversion goal: <call / form / purchase / booking>
- Domain: <domain if known, else "TBD">
- Preferred stack: <e.g. Astro SSG, or "you choose per playbook/03">

HOW TO WORK
1. Execute Runbook A phase by phase. Do not skip phases.
2. For each phase, open the referenced playbook/NN file, run its numbered SOP, then tick its
   AI-agent checklist before advancing.
3. Use templates/ for the page data model, JSON-LD, robots.txt, llms.txt, and the prerender +
   deploy pipeline. Substitute all placeholders with real values. Never commit secrets — read
   them from environment variables.
4. Crawlability is non-negotiable: prerender to static HTML and verify with curl that the real
   content is in the SERVED response.
5. Gate on checklists/pre-launch-checklist.md before deploying.
6. After deploy: purge CDN cache, re-fetch the live URL to confirm, then submit to GSC + Bing +
   IndexNow.
7. Build the AI-SEO layer (playbook/10): llms.txt, AI-crawler robots rules, answer-first content.

DELIVERABLES (report with proof at each phase)
- Keyword list bucketed by intent, with the topical map (URL tree).
- The built, crawlable site (show a curl of a key URL's served HTML proving content is present).
- Per-page: title, meta, single H1, schema — passing checklists/on-page-checklist.md.
- Sitemap.xml, robots.txt (incl. AI crawlers), llms.txt live and reachable.
- Pagespeed/CWV meeting playbook/08 targets.
- Deploy confirmation + GSC/Bing/IndexNow submission confirmation.
- A measurement plan per playbook/14 (Google rankings AND AI citations).

Start with Phase 0 (keyword research + topical map). Show me the keyword buckets and URL tree
before building pages.
```

---

**Tip:** If you don't yet know your keywords, first run the helper prompt `keyword-and-topical-map.md` in this folder — it produces the bucketed list and URL tree you paste into the blanks above.
