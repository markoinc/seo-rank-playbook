# AI SEO, AEO, and GEO — Getting Cited by AI Engines

**Purpose:** Get your brand and content cited by ChatGPT, Perplexity, Claude, Google AI Overviews, and Bing Copilot. This is the 2026 priority channel — AI-referred visitors convert at 27% vs 2.1% for traditional organic traffic, and 60% of queries now end without a click to any website.

**When to use:** Starting from day 1 of site build. On-site AI optimization (technical signals, content format, schema) runs in parallel with regular SEO. Off-site GEO campaigns (third-party citations) begin in Phase 2 after core content is indexed.

---

## The SOP

### Part 1 — On-site technical signals (implement at build time)

#### 1.1 Generate `llms.txt`

`/llms.txt` is a plain-text Markdown file that gives AI crawlers a structured, scannable summary of your entire site. Format:

```markdown
# BRAND — [One-line business description]

> [2–4 sentence paragraph: what the business is, who it serves, what makes it different, geographic coverage, and model.]

## What makes [BRAND] different
- [Differentiator 1]
- [Differentiator 2]
- [Differentiator 3]

## [Page category 1 — e.g. "Commercial Pages"]
- [Page title](https://your-site.com/slug/)
- [Page title](https://your-site.com/slug/)

## [Page category 2 — e.g. "Guides"]
- [Page title](https://your-site.com/slug/)
```

Auto-generate this file in your prerender/build script so it stays current as pages are added. Reference it in `robots.txt` with a comment: `# LLM/AI model-truth summary: https://your-site.com/llms.txt`. Status as of Jun 2026: Google rates `llms.txt` as "neutral" (neither positive nor negative ranking signal). It primarily helps AI crawlers extract accurate information about your site.

#### 1.2 Explicitly allow AI crawlers in `robots.txt`

Every major AI engine has a named crawler bot. Allow them all unless you have a specific legal reason not to:

| Bot name | Engine |
|----------|--------|
| `GPTBot` | OpenAI / ChatGPT training + web search |
| `OAI-SearchBot` | OpenAI web search (separate from GPTBot) |
| `PerplexityBot` | Perplexity AI |
| `ClaudeBot` | Anthropic Claude |
| `Google-Extended` | Gemini + AI Overviews training |
| `Googlebot` | Google search + AI Overviews content |
| `Bingbot` | Bing → ChatGPT/Copilot web search |

Full `robots.txt` pattern is in playbook `09-hosting-cloudflare-deploy-indexing.md`. Blocking any of these means your content does not appear in that engine's AI-generated answers, regardless of your Google rankings.

Verify AI crawlers are not being blocked by Cloudflare Bot Fight Mode: `curl -A "GPTBot/1.1" https://your-site.com/ | grep -c "<h1"`. Count must be 1+.

#### 1.3 Write the `directAnswer` field for AI extraction

Every page should open with a 40–60 word paragraph that fully answers the query implied by the page title. This is what AI Overviews and Perplexity extract. Rules:
- Answer in the first sentence, not the second.
- Each sentence ≤20 words.
- Self-contained: readable if quoted out of context.
- Contains the target keyword naturally.
- No filler phrases ("basically," "simply," "in today's world").

Example structure:
> "[Target keyword] is [direct definition or answer]. [Key differentiator or most important fact]. [Who it's for or when to use it]. [One specific data point or threshold if available]."

44% of AI citations pull from the opening paragraph of a page. The `directAnswer` format determines whether you make the cut.

#### 1.4 FAQs must be expanded by default

Collapsed accordion FAQs are less reliably indexed by AI crawlers than questions that are visible in the DOM without JavaScript interaction. Always render FAQ sections open. The same FAQ data populates `FAQPage` JSON-LD schema — both are required.

#### 1.5 Add `Dataset` schema to original data pages

If you publish a pricing benchmark, close-rate study, or any table with original data, wrap it in `Dataset` JSON-LD schema. This is the mechanism that makes you the attributed source when AI quotes specific numbers. Without it, AI engines quote the numbers but not you.

#### 1.6 Emit a linked `@graph` JSON-LD on every page

Every page needs `Organization`, `WebSite`, `WebPage` (or `Article`), and `BreadcrumbList` at minimum. Guides and comparisons get an `Article` node with `author` (Person with `sameAs` pointing to LinkedIn). See `07-structured-data-schema.md` for the full builder.

Gemini's citation model favors brand-owned websites (52.15% of citations). A complete organization graph with `sameAs` links to social/professional profiles strengthens the entity signal that Gemini uses to source its answers.

### Part 2 — Content format for AI citation

#### 2.1 Build the comparison/vendor/best-of cluster first

The #1 content type cited by all AI engines is "Best X Companies" / comparison / review content. This is what buyers ask AI, and what AI answers with.

Structure of a best-of or comparison page:
1. Neutral methodology intro (who reviewed these, how, over what period)
2. `directAnswer`: one honest paragraph naming the top pick and why
3. Comparison table (5–7 criteria, 5–8 vendors including dominant incumbents AI already cites)
4. Per-vendor deep dive: 300–500 words each, honest pros/cons, who it fits best
5. "Best for X" verdict blurbs
6. FAQs expanded by default, targeting comparison-intent questions
7. CTA at bottom only (top CTA kills credibility on review content)

**Critical:** include the vendors that AI engines currently cite, even if they are your competitors. A best-of page that omits the AI-recommended incumbents will not displace those incumbents from AI answers. Honest reviews of competitors earn the trust that gets you cited alongside them.

Comparison/vendor pages have the fastest AI citation velocity of any page type. On a measured campaign, they appeared in AI Overviews within 3 weeks of indexing.

#### 2.2 Page-type citation speed ranking

From fastest AI citation to slowest (measured over 7+ weeks on a live B2B site):
1. Comparison / vendor / best-of pages
2. Pricing / cost guides ("how much does X cost")
3. Vetting / how-to guides ("how to choose a vendor")
4. Money / commercial pages (after comparison pages establish topical authority)
5. Geo / state pages (cited last, as domain matures)

Build in this order.

#### 2.3 Answer-first formatting everywhere

AI Overviews pull from the first 30% of a page's content. Structure every page so the answer appears in the top third:
- H1 = exact target keyword (the question being answered)
- Paragraph 1 = `directAnswer` (40–60 words, answer first)
- H2 sections = depth, evidence, nuance, alternatives
- FAQ section = 20+ specific questions, answered completely in each answer (no "see above")

For guides: 2,000–3,000 words with direct answer in first 100 words.
For comparison pages: 1,500–2,500 words.
For money/commercial pages: 800–1,500 words.
Minimum on any indexable page: 300 unique words.

#### 2.4 Visible author bylines on editorial content

Schema-only author attribution is not enough for E-E-A-T signals. Every guide, comparison, and case study needs a visible on-page byline: "By [Author Name], [Title] · Updated [Month Year]". Match the `Person` name in schema exactly to the byline name, and match `sameAs` to the actual LinkedIn profile URL.

### Part 3 — Off-site GEO campaign (third-party citation seeding)

LLM citation data from a $10K/15-keyword study:
- Listicles drove 72.4% of all LLM mentions
- Press releases drove 24.1%
- ~50% of cited sources stop being quoted after 30 days → monthly refresh is mandatory

#### 3.1 Platform citation preferences by AI engine

| Engine | Top citation sources | What this means for you |
|--------|---------------------|-------------------------|
| Gemini | Brand-owned websites (52.15%) | Invest in your own domain first |
| ChatGPT | Third-party listings/directories (48.73%) | Review sites + directories matter most |
| Perplexity | Niche/industry-specific directories | Specialized sources > general authority |
| Claude | Technical documentation, structured content | Schema markup + clear formatting |

Build for all four simultaneously by combining on-site quality with directory presence and structured data.

#### 3.2 HackMD listicle play

HackMD is a Markdown publishing platform (hackmd.io) that AI engines index and cite. It's one of the fastest paths from content publication to AI citation.

1. Pay $6/mo for HackMD Pro (public publishing).
2. Write a "Best [Service/Product] in [Niche]" listicle in Markdown:
   - Methodology paragraph first (how you evaluated, what criteria)
   - 8–10 vendors with identical per-vendor format (name, verdict, best-for, one data point)
   - Honest: include competitors, note their strengths
   - Embed your brand and link to your canonical comparison page
3. Publish publicly on hackmd.io.
4. Submit the HackMD URL to IndexChex immediately ($0.002/URL, confirmed sub-2-minute indexing).
5. Also submit to IndexNow via Bing Webmaster Tools or the API.
6. Community-confirmed: ChatGPT cites HackMD listicles, sometimes within hours.

Citation decay: update the listicle monthly with fresh data (new tools, updated prices, current date in title). ~50% of cited sources stop being cited after 30 days. Monthly refresh is not optional.

**Buy the listicle play done-for-you (optional).** If you'd rather have the citation-seeding run for you:
- **Indexsy LLM Booster** (indexsy.spp.co/order/llm, Jacky Chou / @indexsy) — managed AEO service: gets you featured #1 across 100+ "Best [X]" listicles and automates LLM-citation building. The done-for-you version of this whole section.
- **Indexsy — listicle on a private ~DR78 site** — ~$2,000/post (≈2/mo max) for LLM citation + SERP authority.
- **RankMenu** (rankmenu.com) — lower-cost bulk option: ~50 "Best [keyword] 2026" listicles with your brand #1, indexed, ~$30.

These accelerate the exact mechanism above — they do not replace the monthly-refresh discipline or your own on-site quality. See `reference/tools-and-costs.md` for the full list.

#### 3.3 LinkedIn Article + Medium repurpose

Publish the same "best of" content as a LinkedIn Article under the founder's profile and as a Medium post. Both are heavily cited by LLMs.
- LinkedIn profile → named entity signal (E-E-A-T reinforcement for the Person schema)
- LinkedIn DA: 98. Medium DA: 95.
- Submit both URLs to IndexChex for fast crawl.

#### 3.4 PDF seeding

Create unique PDFs (guides, checklists, research summaries) and submit them to 40+ document-sharing sites. Community members reported same-day AI citations from this approach.
- Each PDF should be unique (not identical across all sites — vary the intro/outro, include the site's topic in context)
- Tool: PDF Studio or any PDF editor
- Cost: ~$0.002–0.01 per PDF

#### 3.5 Press release → BarChart play

ChatGPT cites BarChart.com heavily. The mechanism:
1. Publish an original benchmark or research report on your site (real data with `Dataset` schema).
2. Issue a press release on ABNewswire (~$80–100/release) announcing the report.
3. ABNewswire syndicates to BarChart, Yahoo Finance, and other wire endpoints.
4. ChatGPT cites BarChart's version of the story.

Timeline: ~2 weeks from release to ChatGPT citation. Community-proven as of 2026.

For aggressive campaigns: 3–5 releases/week. EIN Presswire sells 15-packs at ~$750 total (~$50/release at bulk).

#### 3.6 Reddit — community mechanics

Reddit (DA 91) ranks heavily in Google's Discussions-and-Forums SERP block and is read by LLMs.

Comment format that gets cited:
- Line 1: Empathy — acknowledge the problem
- Line 2: Mini story — what you tried, what didn't work
- Line 3: Soft recommendation — your brand as what worked
- Line 4: Balanced comparison — name competitors honestly alongside your brand
- Line 5: Anti-shill exit — "not sponsored, just what worked for me"

Mechanics:
- **Default: name-only mention** ("we use [BrandName]") — no URL. Clears spam filters. Still full entity signal for AI.
- **When asked for a link explicitly**: use bare-domain text ("yoursite.com") not a hyperlink. Lower spam risk, same LLM entity signal.
- **Hyperlinks in Reddit comments**: almost never. Reserve for surfaces you control (your HackMD article, LinkedIn post, press release).
- Cadence: ≤2–3 comments/day while warming a new account. 9:1 value-to-mention ratio. Never paste identical comments.
- Account age is the #1 shadowban-avoidance factor. Warm each subreddit with 3–5 pure-value comments before any brand mention.
- Submit the Reddit thread URL to IndexChex after commenting to force the thread into Google's index quickly.

#### 3.7 Quora answers

Quora (DA 93) appears heavily in Google's Discussions-and-Forums block and is cited by AI Overviews. Find questions where Quora appears in the SERP block for your target queries. Write complete, sourced answers.

#### 3.8 Entity directory listings

Consistent NAP (Name, Address, Phone) + description across entity directories builds the knowledge graph signal that AI engines use for attribution.

Priority directories:
- Crunchbase (LLM-read, high authority)
- G2 / Capterra (product/software)
- Clutch / The Manifest (B2B services)
- Trustpilot (claim only — do not buy reviews)
- BBB
- Google Business Profile

Write an identical one-sentence description across all listings. This is what LLMs use as the canonical definition of what your company does when it can't find a better source.

#### 3.9 Wikidata entity record

Create a Wikidata item for the company and founder. Link `sameAs` fields in your schema to these Wikidata records. Wikidata feeds Google's Knowledge Graph and is actively read by LLMs.

#### 3.10 YouTube (high priority, Aug 2026)

YouTube "reigns supreme for AI citations right now" (Aug 2026 community data). A YouTube channel with tutorials, comparisons, or case studies earns AI citations faster than most text content. If you have video capability, prioritize a branded YouTube channel as part of the GEO stack.

### Part 4 — Monitoring AI citation presence

#### 4.1 Manual sweep (free)

Test 10–16 buy-side prompts in each engine monthly:
- ChatGPT (web search mode on)
- Perplexity
- Google AI Overviews (search for target queries in Google)
- Claude (with web access)

Record: who's cited, how many times, which pages. This is your GEO scoreboard.

#### 4.2 DataForSEO `llm_responses` API (paid, ~$0.09–$0.58/run)

Automated batch testing of AI citation presence. Run on the same 12–16 target prompts monthly. Compare to baseline. Identify which engines you're cited in vs not, and which competitors are cited instead of you.

#### 4.3 Trackings.ai

Dedicated AI rank tracker: GEO/AIO visibility monitoring, Reddit thread discovery, brand sentiment tracking. Use for ongoing monitoring if budget allows.

### Part 5 — GEO refresh cadence

AI citations decay. ~50% of cited sources stop being referenced within 30 days. Treat GEO like a subscription, not a one-time task:

- **Monthly**: Update HackMD listicle (new date, fresh data, updated verdicts). Post 2–3 new Reddit/Quora answers in new live threads. Resubmit updated URLs to IndexChex.
- **Quarterly**: Issue a new press release if there's new data worth reporting. Refresh on-site comparison pages with updated pricing/features. Re-run AI sweep to measure citation movement.
- **Ongoing**: Publish new LinkedIn Articles under the founder profile. Add new PDF assets to the seeding rotation.

---

## Standards & Thresholds

| Signal | Standard |
|--------|----------|
| `directAnswer` length | 40–60 words |
| Sentence length in `directAnswer` | Under 20 words each |
| FAQ count minimum | 20+ questions |
| FAQs rendering | Always open/expanded — never collapsed |
| Author byline | Visible on-page, not schema-only |
| LLM citation decay rate | ~50% of sources stop being cited after 30 days |
| Listicle refresh cadence | Monthly minimum |
| Third-party surfaces minimum | 5+ of the ~12–16 LLM-read positions per query |
| ChatGPT citation sources | 43.8% from "Best X" listicles (Ahrefs/Jacky Chou study of 4.9M citations) |
| AI visitor conversion rate | 27% vs 2.1% traditional organic (2026 data) |
| GEO campaign cost | Under $150–200/month for full stack |
| HackMD Pro cost | $6/month |
| IndexChex cost | $0.002/URL (Growth tier); $19.99/mo for 5K credits |
| ABNewswire press release | ~$80–100 per release |
| EIN Presswire bulk | ~$50/release in a 15-pack |

---

## AI-Agent Checklist

**On-site (run at build time):**
- [ ] `llms.txt` generated and deployed at `https://your-site.com/llms.txt`
- [ ] `robots.txt` explicitly allows: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended
- [ ] Cloudflare SBFM verified: `curl -A "GPTBot/1.1" https://your-site.com/ | grep -c "<h1"` returns 1+
- [ ] Every page has a `directAnswer` opening paragraph (40–60 words, answer-first)
- [ ] All FAQ sections render expanded (not collapsed accordion)
- [ ] `FAQPage` JSON-LD present on every page with FAQs
- [ ] `Dataset` schema on any page with original data tables
- [ ] `Organization` `@graph` node includes `sameAs` for LinkedIn, key social profiles
- [ ] Guides/comparisons have visible author bylines (name + title + updated date)
- [ ] `Article` schema with `author` (Person + sameAs) on all guides and comparisons

**Off-site GEO (run monthly):**
- [ ] HackMD "Best X" listicle published or updated this month
- [ ] HackMD URL submitted to IndexChex
- [ ] LinkedIn Article published or refreshed under founder profile
- [ ] Medium post published or refreshed
- [ ] Reddit: 2–3 value-first comments in live threads (name-only mention, no link)
- [ ] Quora answers posted on relevant questions
- [ ] Entity directories claimed: Crunchbase, G2/Capterra, Clutch, Trustpilot, BBB, GBP
- [ ] Wikidata entity record created for company + founder
- [ ] AI citation sweep run on 12–16 target prompts (manual or DataForSEO)
- [ ] Citation results logged vs prior month baseline

---

## Common Mistakes and Risks

**Not submitting to Bing Webmaster / not using IndexNow.** ChatGPT web search runs on Bing's index. If you're not indexed on Bing, you don't appear in ChatGPT web answers. This is the most common GEO gap — many sites optimize for Google and ignore Bing entirely.

**Self-published "best-of" lists on your own domain claiming you're #1.** Google patched this (Nov 2025). AI engines also discount it. Your own site cannot be the source for "best X" — you need independent third-party surfaces (HackMD, LinkedIn, Medium, Reddit, directories).

**Collapsed FAQs.** AI crawlers extracting FAQ answers need the content in the DOM without JavaScript interaction. Render FAQs open. If you must use accordion for UX, duplicate the content in a `FAQPage` JSON-LD block AND keep a static version in the HTML.

**Missing from the comparison pages AI already cites.** If there's a "best X companies" page that AI currently references, and you're not on it, AI will keep not citing you regardless of your on-site work. Find who's being cited for your target queries. Contact those pages and request honest inclusion, or out-build them with a more comprehensive comparison.

**Not refreshing.** Treating GEO as a one-time task. Citation decay is ~50% in 30 days. A listicle that earns citations in month 1 may stop being cited by month 2 if you don't update it. Monthly refresh is mandatory.

**Buying reviews.** Never purchase reviews on Trustpilot, G2, or any platform. Claim your profile. Respond to organic reviews. Do not manufacture reviews — it violates platform terms, risks deplatforming, and flagged fake reviews make AI engines less likely to cite you as a trusted source.

**Ignoring YouTube.** As of Aug 2026, YouTube is the highest-velocity surface for AI citations. If your niche has video-suitable topics and you skip YouTube, you're leaving the fastest citation channel untouched.

**Relying only on organic Google rankings.** 90% of ChatGPT citations come from pages ranked position 21+ on Google. New sites can win AI citations before they rank on Google. GEO is an early-stage win, not a follow-on to traditional SEO success.
