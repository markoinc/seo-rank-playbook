# 14. Measurement and Tracking

**Purpose:** Define how to instrument a new site, which KPIs to report and when, how to run an AI-visibility (GEO) citation sweep, and how to avoid common measurement traps that produce misleading conclusions.

---

**When to use this section:**
- During site launch (GSC/Bing WMT setup, IndexNow wiring)
- After the first full index (establish baselines)
- Weekly/monthly operating cadence
- Before and after every GEO content push
- When a stakeholder asks "how is the site doing?"

---

## The SOP

### Part A — Initial Setup (do once, at launch)

1. **Verify GSC is property-dual configured.**
   Add both a *domain property* (`example.com`) AND a *URL-prefix property* (`https://example.com/`). The domain property aggregates data; the URL-prefix property is required to use the Disavow Tool and URL Inspection API.

2. **Submit sitemap to Google Search Console.**
   GSC → Indexing → Sitemaps → Add new sitemap URL (e.g. `https://example.com/sitemap.xml`). Confirm status shows "Success."
   ⚠️ **Caveat:** the "Indexed pages" counter in GSC Sitemaps is unreliable and often displays 0 even when pages are indexed. Do NOT use this number to diagnose indexing. Use URL Inspection → `coverageState` for authoritative per-URL status.

3. **Submit sitemap to Bing Webmaster Tools.**
   Create a free account at `webmaster.bing.com`, verify the property (DNS TXT or HTML file), then add the sitemap. This feeds Bing's index AND the ChatGPT web-search pipeline (ChatGPT with web search runs on Bing's index).

4. **Activate IndexNow.**
   - Place the IndexNow key file at `https://example.com/<key>.txt`.
   - On every deploy, `POST` all new/updated page URLs to `https://api.indexnow.org/indexnow` with your key. This simultaneously notifies Bing, Yandex, and Naver — and indirectly surfaces content to ChatGPT's web-search cache faster.
   - Do NOT use Google's Indexing API at scale — Google filters it heavily.

5. **Wire GA4 (or privacy-first alternative).**
   Set up a GA4 property with at minimum: `page_view`, `scroll`, and a `conversion` event on your primary goal (form submit, click-to-call, etc.). Tag every referral source from parasite platforms with UTM parameters so GA4 can attribute traffic from HackMD, LinkedIn, Medium, press releases, etc. separately from organic.

6. **Set up AI-referral source tracking in GA4.**
   AI engines (ChatGPT, Perplexity, Claude) increasingly send referral traffic. In GA4, create a custom channel group or segment for these sources:
   - `chatgpt.com`, `chat.openai.com` → "ChatGPT referral"
   - `perplexity.ai` → "Perplexity referral"
   - Direct traffic growth post AI-citation push is also a proxy signal (AI citations cause branded direct searches).

7. **Install call tracking (if phone-conversion site).**
   Use a call-tracking platform to attribute inbound calls to organic vs. parasite vs. direct. Track which pages, keywords, and referral sources produce calls.

8. **Claim Bing Webmaster Tools AI Performance Report.**
   Free and overlooked. Bing WMT has an AI Performance report showing how your site appears in Copilot (Bing's AI). Check it monthly.

---

### Part B — GSC Weekly Workflow

9. **Pull clicks by query and page (weekly, every Monday).**
   GSC → Performance → Queries. Filter by last 28 days. Sort by clicks descending.
   - Report clicks, NOT impressions. On young or B2B sites, impressions are inflated 5–10× by AI bots, international junk crawlers, and crawl traffic. Impressions tell you visibility; clicks tell you impact.
   - Track your 20 most important money terms by exact query over time.

10. **Run the long-tail content-expansion query.**
    GSC → Performance → Queries → Filter Query → Regex: `^(?:\S+\s+){6,}\S+$`
    This finds 7+ word queries you already rank for. Mine these for: (a) FAQ content additions to existing pages, and (b) new pages targeting long-tail intents that are already converting.

11. **Filter positions 4–20 for "push" opportunities.**
    GSC → Performance → Queries → filter Average Position between 4 and 20. These are pages one internal-link push or one content improvement away from materially higher CTR. Act on these before building new pages.

12. **Check Coverage (Indexing) report weekly.**
    GSC → Indexing → Pages. Review the "Not indexed" reasons. Common critical errors:
    - "Crawled — currently not indexed" = Google crawled but deferred. Check thin content and internal link equity.
    - "Duplicate without user-selected canonical" = canonical tag missing or wrong.
    - "Soft 404" = page returns 200 but has no real content (fix rendering or content depth).
    - "Blocked by robots.txt" = check for accidental disallows.

13. **Check Core Web Vitals report in GSC quarterly.**
    GSC → Experience → Core Web Vitals. Use the *field data* report (real user data), not Lighthouse lab scores. Field metrics are what Google's ranking algorithm actually uses. Lab scores vary ±5–7 points run-to-run. Fix pages failing LCP or CLS thresholds.

14. **Remove stale sitemaps.**
    If the site has been migrated or restructured, remove old/incorrect sitemaps from GSC Sitemaps. An old sitemap pointing to defunct URLs wastes crawl budget and confuses coverage reports.

---

### Part C — Bing Webmaster Tools Monthly Workflow

15. **Check Bing indexing coverage (monthly).**
    Bing WMT → Site Explorer. Verify key pages are indexed. Pages not indexed in Bing are also invisible to ChatGPT web search. Submit any missing pages via the IndexNow submit tool inside Bing WMT.

16. **Check Bing AI Performance Report (monthly).**
    Review which queries trigger Copilot responses that include your site. This is distinct from Bing organic rankings and often reflects AI-citation behavior.

---

### Part D — AI-Visibility (GEO) Citation Sweep

**Why:** 90% of ChatGPT citations come from pages ranked position 21+ on Google. A new site can win AI visibility before it wins Google page-1 rankings. AI-referred visitors convert at roughly 3× the rate of traditional organic visitors. Track these separately.

**Two methods — use both:**

#### Method 1: Manual sweep (free, monthly minimum)

17. **Run 12–20 target prompts manually across four AI engines.**
    Engines: ChatGPT (chat.openai.com), Perplexity (perplexity.ai), Gemini (gemini.google.com), Claude (claude.ai).
    Prompt pattern: `"best [category] [city/niche]"`, `"[category] recommendations"`, `"who is the best [service provider] for [use case]"`.
    Log in a spreadsheet:

    | Date | Engine | Prompt | Cited? (Y/N) | Citation URL | Position in response | Competitor cited instead |
    |------|--------|--------|-------------|-------------|---------------------|------------------------|

18. **Run a ChatGPT/Perplexity citation sweep quarterly.**
    Specifically test the comparison queries and "best X companies" prompts — these are the #1 AI-cited content formats (43.8–72.4% of all AI citations in published studies). If you're not cited for these, your comparison/listicle content layer is the gap.

19. **Note query casing variants.**
    Capitalization and phrasing can change which sources AI engines pull. Test both `"best [category]"` and `"Best [Category]"` as well as question forms (`"What is the best [category]?"`).

#### Method 2: DataForSEO `llm_responses` API (automated, recommended)

20. **Set up a DataForSEO account** at `dataforseo.com`. The `llm_responses` endpoint queries AI engine responses programmatically.

    **Endpoint:** `POST https://api.dataforseo.com/v3/serp/google/ai_overview/live/advanced`
    (Also available: ChatGPT and Perplexity citation endpoints — check DataForSEO docs for current endpoint paths as these evolve.)

    **Generic payload shape:**
    ```json
    {
      "keyword": "best [category] [niche]",
      "location_code": 2840,
      "language_code": "en",
      "device": "desktop"
    }
    ```

    **Response includes:**
    - Whether an AI Overview was triggered
    - Which URLs were cited in the AI Overview
    - The source domains ranked in the AI response

    **Cost benchmark:** a sweep of 12–16 prompts across ChatGPT + Perplexity + Google AI Overviews costs roughly $0.09–$0.58 per run.

21. **Establish a citation baseline sweep (Phase 0).**
    Before your first content push, run the sweep on 12–16 buy-side prompts. Record who is currently cited and how many times. This is your competitive benchmark.

22. **Re-run after every major content or GEO push (Phase 2, Phase 3).**
    Compare to baseline: did you enter any AI responses? Which engines? Which prompts?
    The gap between engines reveals tactical priorities:
    - Not cited in Bing/ChatGPT → fix Bing indexing (IndexNow + Bing WMT)
    - Not cited in Perplexity → build more third-party surface-level mentions (Reddit, HackMD, LinkedIn)
    - Not cited in Google AI Overviews → improve answer-first formatting (direct answer in first 100 words) + FAQPage schema

23. **Track AI citation decay monthly.**
    ~50% of cited sources stop being quoted after 30 days (community-confirmed across multiple citation studies). Monthly GEO content refreshes (updating HackMD listicles, new Reddit/Quora answers, fresh press releases) are mandatory maintenance, not optional.

---

### Part E — KPIs and Reporting Cadence

#### Primary KPIs

| KPI | Tool | Frequency | Notes |
|-----|------|-----------|-------|
| Organic clicks (non-branded) | GSC | Weekly | Primary metric. Impressions are secondary and inflated on young domains. |
| Average position on 20 target queries | GSC | Weekly | Track by specific query, not blended site average. |
| Pages in Top 10 | GSC | Monthly | Count of pages appearing in positions 1–10. |
| AI citation rate | DataForSEO llm_responses or manual sweep | Monthly | % of test prompts where you are cited. By engine. |
| AI-referred sessions | GA4 referral source | Monthly | Direct sessions growth is a proxy when AI traffic is misattributed to direct. |
| Domain Rating / referring domains | Ahrefs or equivalent | Monthly | Track growth trajectory, not absolute number. |
| Conversion rate from organic | GA4 + call tracking | Monthly | Clicks → conversion goal. This is the bottom-line metric. |

#### Supplementary KPIs (local/service sites)

| KPI | Tool | Frequency |
|-----|------|-----------|
| GBP views, calls, direction requests | Google Business Profile Insights | Weekly |
| Map pack rankings | LocalRank.so or BrightLocal | Monthly |
| Review velocity | GBP / Yelp dashboards | Monthly |
| Link velocity (new referring domains) | Ahrefs | Monthly |

#### Reporting cadence

**Daily:**
- Respond to new reviews (within 24 hours — audit benchmark requirement)
- Check GBP Insights for anomalies

**Weekly:**
- GSC query/page performance pull
- Position check on 20 target money terms
- GBP post published (minimum 2×/week)
- New citations built (10–20/week during growth phase)

**Monthly:**
- Full AI citation sweep (manual + DataForSEO)
- Rank tracking on full keyword set
- Referring domains growth check
- Schema review for errors in GSC Structured Data report
- GEO refresh: update HackMD listicles, post 2–3 new Reddit/Quora answers, check for AI citation movement post-refresh
- Citation audit and consistency check

**Quarterly:**
- Technical SEO audit (Core Web Vitals field data, coverage errors, orphan pages, sitemap freshness)
- Schema update (outdated hours, pricing, or dateModified timestamps)
- Content refresh: add 2 paragraphs + 2 list items of updated data to top-traffic pages; update `dateModified`
- Backlink profile audit: spam score, new toxic links for disavow, new legitimate links to replicate
- Full competitor AI-citation analysis: paste competitor URL into AI engine, ask "why do you recommend this?" — replicate the trigger signals

---

## Standards & Thresholds

| Metric | Standard / Target | Why |
|--------|-------------------|-----|
| GSC clicks (primary) | Report over impressions | Impressions 5–10× inflated on B2B/young sites from AI bots |
| GSC position lag | Last 2–3 days are partial | Never extrapolate from an in-progress reporting window |
| URL Inspection → coverageState | Required for per-URL indexing diagnosis | GSC sitemap indexed count is deprecated/unreliable |
| AI citation rate target | >50% of tested prompts by month 6 | Based on measured 14/26 (54%) AI Overview rate in 3 weeks on a well-structured site |
| Citation decay | Refresh all GEO content every 30–60 days | ~50% of cited sources drop off within 30 days |
| Reporting day gate | Report only fully-closed days (GSC lags 2–3 days) | In-progress day data has been restated down 28%+ in 20 minutes in real cases |
| Young domain ranking timeline | KD 0–4: weeks to months. KD 15+: 3–12 months + links | Indexed ≠ ranking; trust signals accumulate over time |
| Position average drop | Normal when pages 20–100 enter index at pos 20–50 | Average position falling while clicks increase = growth, not regression |

---

## AI-Agent Checklist

### Initial setup
- [ ] GSC domain property added and verified
- [ ] GSC URL-prefix property added (required for Disavow Tool + URL Inspection API)
- [ ] Sitemap submitted to GSC and confirms "Success" status
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] IndexNow key file deployed at `/<key>.txt`
- [ ] IndexNow ping script wired into deploy pipeline
- [ ] GA4 property created with `conversion` event on primary goal
- [ ] AI referral sources tagged in GA4 (chatgpt.com, perplexity.ai custom channel)
- [ ] UTM parameters on all parasite-platform links (HackMD, LinkedIn, Medium, press releases)
- [ ] Call tracking installed if phone conversions are primary goal
- [ ] Bing Webmaster Tools AI Performance Report bookmarked

### Weekly GSC workflow
- [ ] Pulled click/query/position data for last 28 days (Mondays)
- [ ] Reporting clicks, NOT impressions, as primary metric
- [ ] Reviewed "Not indexed" reasons in Coverage report
- [ ] Identified positions 4–20 for internal-link push candidates
- [ ] Ran long-tail regex query for content expansion opportunities
- [ ] Checked for new crawl errors

### Monthly AI sweep
- [ ] Manual prompts tested across ChatGPT, Perplexity, Gemini, Claude (12–20 prompts)
- [ ] Results logged in citation tracking spreadsheet with date, engine, prompt, cited Y/N, URL, position
- [ ] DataForSEO `llm_responses` sweep run on target prompts (record cost)
- [ ] Compared to prior month baseline — delta recorded
- [ ] Engine-level gaps identified (Bing/ChatGPT gap → IndexNow/Bing WMT fix; Perplexity gap → third-party platform fix)
- [ ] GEO refresh executed if citation rate dropped (updated HackMD, new Reddit/Quora answers)
- [ ] Bing Webmaster Tools AI Performance Report checked

### Quarterly audit
- [ ] Core Web Vitals field data reviewed in GSC
- [ ] Schema errors reviewed in GSC → Structured Data
- [ ] Backlink profile audited (spam score, new toxic domains)
- [ ] Top-traffic pages refreshed (new data + `dateModified` updated)
- [ ] Sitemap regenerated if new pages added
- [ ] Old/stale sitemaps removed from GSC

---

## Common Mistakes

1. **Reporting impressions as the success metric on a young site.** AI bots, international crawlers, and brand-search noise inflate impressions 5–10× on B2B and new domains. Always report clicks.

2. **Diagnosing "not indexing" from the GSC sitemap indexed count.** This counter is broken — it frequently shows 0 for sites with hundreds of indexed pages. Use GSC → URL Inspection → coverageState for definitive per-page indexing status.

3. **Concluding that indexed = ranking.** A page can be indexed and appear in GSC Impressions at position 40–80 with virtually no clicks. Ranking requires accumulated off-page trust signals and typically 3–12 months on a new domain for competitive terms.

4. **Treating position average drop as a problem.** When 50–200 new pages enter the index at positions 20–80, the site-wide average position falls — while clicks simultaneously increase. A falling average position in early months is a sign of healthy scaling, not a regression.

5. **Extrapolating from an in-progress reporting day.** GSC data lags 2–3 days. The current day and the previous 1–2 days are partial. Always gate reporting on fully-closed days. In-progress data has been seen to restate downward by 28% in 20 minutes.

6. **Treating AI citation data as static.** ~50% of AI-cited sources stop being cited within 30 days. A site that is cited in month 1 and not refreshed will typically fall out of AI responses by month 2. GEO content needs monthly maintenance.

7. **Running AI citation sweeps only on your own domain.** Always record who else is cited for each prompt. Your citation gaps are explained by who is cited instead of you and why (comparison pages, stronger entity signals, more third-party mentions).

8. **Skipping Bing Webmaster Tools.** ChatGPT with web search runs on Bing's index. A site not indexed in Bing will not appear in ChatGPT web-search responses, regardless of its Google rankings. Bing indexing is a distinct requirement.

9. **Measuring AI visibility only in Google AI Overviews.** Google AI Overviews, ChatGPT, Perplexity, Claude, and Gemini pull from different source pools and require different tactics. Measure each engine separately.

10. **Not establishing a baseline before the first content push.** Without a pre-launch AI citation sweep, you cannot measure the impact of your GEO layer. Run the baseline sweep before publishing any content.
