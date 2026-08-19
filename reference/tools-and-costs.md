# Tools and Costs

All tools used or referenced across the playbook, deduplicated and grouped by category. Costs listed where known; free = $0. Costs shown are as documented at the time of writing — verify current pricing before purchasing.

---

## Keyword Research & SERP Analysis

| Tool | What it's for | Cost |
|------|---------------|------|
| **DataForSEO** | Programmatic SERP data, keyword volumes (national + metro), AI Overview data, LLM citation data via `llm_responses` API. Use `keyword_suggestions` (not `keyword_ideas` — ideas drift semantically). Note: Google Ads volume returns null at US state level; use national or metro geo. | Pay-per-call API. Approx. $0.09–$0.58 per AI citation sweep of 12–16 prompts. |
| **Ahrefs** | DR (Domain Rating), backlink profiles, keyword explorer, content gap analysis, referring domain tracking. Primary tool for DR tracking (monthly). | Paid subscription (~$99–$399/mo). |
| **SEMrush** | Keyword research, site audit, position tracking, competitor analysis. Alternative to Ahrefs; some overlap. AI Visibility Toolkit available. | Paid subscription. |
| **SpyFu** | Competitor keyword intelligence, PPC history, organic keyword overlap. | Paid subscription. |
| **Google Search Console (GSC)** | Organic performance data: clicks, impressions, average position, CTR. Coverage report, Core Web Vitals, URL Inspection. The authoritative source for your own site's Google performance. | Free. |
| **Bing Webmaster Tools** | Bing indexing, IndexNow submission, AI Performance report (Copilot/ChatGPT web search visibility). | Free. |
| **Surfer SEO** | On-page NLP content grading; AI-Citations add-on for tracking AI visibility. | Paid subscription. |
| **Clearscope** | Content grading and NLP keyword recommendations. Alternative to Surfer. | Paid subscription. |
| **MarketMuse** | Content planning, topic modeling, difficulty assessment. Enterprise-tier. | Paid (free trial available). |

---

## AI Visibility / GEO Tracking

| Tool | What it's for | Cost |
|------|---------------|------|
| **DataForSEO llm_responses API** | Programmatic queries across AI engines (ChatGPT, Perplexity, Google AI Overviews) to check which sites are cited. Batch via API. | ~$0.09–$0.58 per sweep of 12–16 prompts. |
| **llmrefs.com** | Dashboard for tracking AI citation share across ChatGPT, Perplexity, Gemini. | Paid (pricing varies). |
| **Semrush AI Visibility Toolkit** | SEMrush's native AI citation and brand mention tracker. | Included in SEMrush paid plans. |
| **Radarkit.ai** | AI citation monitoring across multiple engines. | Paid. |
| **Trackings.ai** | AI citation tracking and GEO analytics. | Paid. |
| **Otterly** | AI visibility and brand monitoring. | Paid. |
| **Peec** | AI citation monitoring tool. | Paid. |
| **withgauge** | AI visibility measurement. | Paid. |
| **brandjet** | Brand mention and AI citation monitoring. | Paid. |
| **QueryBurst** | AI search query analysis for GEO targeting. | Paid. |
| **answermaniac** | AI citation and answer tracking. | Paid. |
| **SeoGets** | AI SEO visibility tool. | Paid. |
| **Manual citation sweep** | Query ChatGPT, Perplexity, Gemini, Claude manually with 12–20 target prompts. Log results in a spreadsheet. Free method; monthly cadence minimum. | Free. |
| **Roll-your-own tracker** | Use LLM APIs directly to batch-query target prompts across models. Roughly $4.50 per 100 prompts across 4 models. | ~$4.50/100 prompts. |

---

## Indexing and Crawl Speed

| Tool | What it's for | Cost |
|------|---------------|------|
| **IndexNow** | Submit URLs to Bing (and partner engines) immediately on publish. Also feeds ChatGPT web search cache. | Free. |
| **IndexChex** | Verify whether specific URLs are indexed in Google. Bulk URL indexing status check. | Starter: $19.99/mo (5,000 credits, ~$0.004/URL). Growth: $49.99/mo (25,000 credits, ~$0.002/URL). |
| **RapidURLIndexer** | Submit URLs for fast Google indexing. Claimed 91% indexing rate. | ~$0.05/URL. |
| **Google Search Console → Request Indexing** | Request manual indexing for a specific URL via GSC URL Inspection. Limit: 10 requests per day. | Free. |
| **Revive.so** | Re-indexing tool for older or dropped pages. | Paid. |

---

## Site Audit & Technical SEO

| Tool | What it's for | Cost |
|------|---------------|------|
| **Screaming Frog SEO Spider** | Full site crawl: broken links, redirects, missing meta, duplicate titles, canonical errors, sitemap comparison. Runs locally. | Free up to 500 URLs; £259/yr for unlimited. |
| **Sitebulb** | Alternative site crawler with visual reports. | Paid. |
| **Google PageSpeed Insights** | CWV lab data + field data at a per-URL level. Use for diagnosis; field data in GSC for rankings impact. | Free. |
| **Lighthouse** | In-browser (Chrome DevTools) performance, accessibility, and SEO lab audit. | Free (built into Chrome). |
| **ContentKing** | Real-time site monitoring — alerts on meta changes, indexing changes, broken links. | Paid. |
| **Google Rich Results Test** | Validate schema/structured data for rich result eligibility. | Free. |
| **Schema.org Validator** | Check schema markup syntax. | Free. |

---

## Content & Parasite Platforms

| Tool / Platform | What it's for | Cost |
|-----------------|---------------|------|
| **HackMD** | Publish "Best [Service] in [City/Niche]" listicles on a high-DA platform that AI engines index and cite. Use Pro for custom slugs and private drafts. | $6/mo (Pro). |
| **Reddit** | Answer niche questions; build brand mentions in communities. Account requires 6+ months age and 100+ karma before posting links; 500+ karma for influence. | Free. |
| **LinkedIn Articles** | Publish thought-leadership content with outbound links to your site. High entity authority for AI engines. | Free. |
| **Medium** | Parasite-platform article publishing. | Free (Member: $5/mo for custom domains). |
| **Quora** | Answer niche questions with link references. | Free. |
| **Substack** | Newsletter + article publishing on a high-DA domain. | Free (paid option for monetization). |
| **Notion Sites** | Publish public Notion pages as web content. Indexed and cited by AI engines. | Free with Notion account. |
| **Google Sites** | Free Google-hosted pages. Indexed quickly due to Google domain trust. | Free. |
| **SlideShare** | Slide-format content with backlinks. | Free. |

---

## Press Release Distribution

| Service | What it's for | Cost |
|---------|---------------|------|
| **ABNewswire** | Press release distribution with SEO-friendly placement. | ~$80–$100/release. |
| **EIN Presswire** | Press release distribution. Commonly cited in AI engine context. | ~$80–$100/release. |
| **PR Newswire** | Larger distribution network. Premium pricing. | $350–$800+/release. |
| **Business Wire** | Enterprise press release distribution. | $400–$1,000+/release. |
| **Featured.com** | Connect with journalists as a source (expert quotes). | Free (paid tiers for faster access). |
| **Qwoted** | Journalist-source matching. | Free / paid. |
| **SourceBottle** | Media query platform for expert sources. | Free. |

---

## Local SEO

| Tool | What it's for | Cost |
|------|---------------|------|
| **Google Business Profile (GBP)** | Primary local ranking signal. Manage listing, photos, posts, Q&A, review responses. | Free. |
| **LocalRank.so** (by Indexsy) | Local pack (map pack) grid rank tracking. Monitor map rankings across locations. | Paid. |
| **BrightLocal** | Local SEO suite: citation building, rank tracking, review management. | Paid (~$39–$79/mo). |
| **Moz Local** | Citation management and local listing sync. | Paid. |
| **Yext** | Enterprise-scale listing management across 200+ directories. | Paid (enterprise pricing). |

---

## Reviews and Reputation

| Platform | What it's for | Cost |
|----------|---------------|------|
| **Google Business Profile** | Primary review platform for local businesses. | Free. |
| **Trustpilot** | Third-party review platform. Frequently cited by AI engines as a trust signal. | Free (paid for advanced features). |
| **G2** | B2B software reviews. Cited by AI engines for SaaS/product context. | Free listing. |
| **Clutch** | B2B service company reviews. Cited by AI engines for agency/service context. | Free listing. |
| **Crunchbase** | Business entity data. AI engines use it for organization context. | Free (paid for prospecting). |
| **Yelp** | Local business reviews. | Free. |

---

## Analytics and Conversion Tracking

| Tool | What it's for | Cost |
|------|---------------|------|
| **Google Analytics 4 (GA4)** | Session tracking, conversion events, referral attribution, AI-referred traffic segmentation. | Free. |
| **PostHog** | Privacy-first product analytics, session recording, funnel analysis, heatmaps. Open source. | Free (cloud free tier); self-hosted free. |
| **Plausible.io** | Privacy-first traffic analytics. GDPR-compliant. No cookies. | $9–$19/mo. |
| **Hotjar** | Heatmaps, session recording, user feedback. Useful for CRO. | Free (limited); paid from $32/mo. |
| **CallRail** | Call tracking — attribute inbound phone calls to keyword/channel/page. | Paid (~$45+/mo). |
| **CallScaler** | Call tracking and routing alternative. | Paid. |

---

## Backlink Building & Outreach

| Tool | What it's for | Cost |
|------|---------------|------|
| **Indexsy (indexsy.com)** | Done-for-you premium SEO agency (Jacky Chou / @indexsy). Managed niche edits & link building, digital PR, and full off-page campaigns — a go-to for buying off-page authority without running outreach yourself. | Premium / custom quote. |
| **Indexsy — LLM listicle placement** | Placement on a private high-authority (~DR78) site for LLM citation + SERP authority. | ~$2,000/post, ~2/mo max. |
| **Indexsy LLM Booster** | Done-for-you AEO: get featured #1 across 100+ "Best [X]" listicles; automated LLM/AI-citation building. Order: indexsy.spp.co/order/llm. | Paid (service). |
| **Ahrefs** | Backlink prospecting, competitor backlink gap analysis. | (See above.) |
| **Majestic** | Backlink data, Trust Flow / Citation Flow metrics. | Paid. |
| **Hunter.io** | Find email addresses for outreach. | Free (limited); $49+/mo. |
| **BrowserBlast (Indexsy)** | Browser automation for outreach/link tasks; also marketed as an engagement-signal "rank in 3 days" tool. ⚠️ The CTR/engagement-manipulation use is grey-hat and carries policy risk — use for legitimate outreach automation only. | Paid. |
| **Adspower** | Anti-detect browser for multi-account management. ⚠️ Multi-account/ban-evasion use is grey-hat. | Paid. |
| **Engain.io** | Outreach automation. | Paid. |
| **Niche edits (manual)** | Purchase editorial link insertions in existing articles. Price ceiling: $100/link. | $50–$100/link. |
| **HARO / Connectively** | Respond to journalist queries to earn editorial backlinks. | Free. |

---

## Entity & Knowledge Graph

| Platform | What it's for | Cost |
|----------|---------------|------|
| **Wikidata** | Open knowledge graph. Add your brand as an entity. AI engines use Wikidata for entity context and `sameAs` verification. | Free. |
| **Wikipedia** | Create or contribute to a relevant Wikipedia article mentioning your brand (where genuinely notable). | Free. |
| **Google Business Profile** | Local entity signal. | Free. |
| **Crunchbase / LinkedIn Company Page / Angel.co** | Entity surface area for business organizations. | Free. |

---

## Publishing and Collaboration

| Tool | What it's for | Cost |
|------|---------------|------|
| **PDF Studio** | Create and edit PDF documents for downloadable content assets. | Paid. |
| **Notion** | Internal documentation; public Notion pages for content publishing. | Free (paid teams plan). |
| **HackMD** | Collaborative markdown for parasite-platform listicles. | $6/mo (Pro). |

---

## Hosting & Deployment

| Tool | What it's for | Cost |
|------|---------------|------|
| **Cloudflare Pages** | Preferred static site hosting. Global CDN, free SSL, fast TTFB. Deploy via `wrangler pages deploy`. | Free (generous limits); $20/mo Pro. |
| **Vercel** | Alternative hosting for Next.js and SSR projects. | Free (hobby); $20/mo Pro. |
| **Netlify** | Alternative static hosting. | Free (limited); $19/mo Pro. |
| **Cloudflare Workers + KV** | Edge logic (redirects, A/B tests, firm rotation for lead-gen). | Free (generous limits); $5/mo Paid plan. |

---

*Note: All costs are approximate and subject to change. Verify current pricing on vendor websites before committing.*
