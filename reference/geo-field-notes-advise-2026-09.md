# GEO Field Notes — Practitioner Intel (Advise #geo, through 2026-09-01)

Raw, attributed field intel from an active GEO practitioner community, distilled into mechanics. This is the *evidence log* behind the strategic additions in `playbook/10-ai-seo-aeo-geo.md`. Each item notes its **status**: `proven` (multiple practitioners / a controlled test), `single-report` (one operator's result), `experimental` (being tested now, no verdict), or `grey-hat` (works but carries policy/ban risk).

Source: SEO/GEO operator community, #geo channel, Jun–Sep 2026. Practitioners cited run agencies and research-domain networks; treat as field reports, not peer-reviewed data.

---

## 1. The decay problem is really a *displacement* problem  `proven`

The widely-quoted "~50% of cited sources stop being quoted after 30 days" is real, but the mechanism was misread. It is **not your content going stale — it's your slot getting reassigned to a newer source.**

- Live example: one operator watched `indeedseo` drop from 15 → 7 citations in a week while `reddit` jumped 3 → 37 for the same query. "The slot didn't vanish, it got reassigned."
- Another: a paid one-and-done placement (Indexsy/Jacky-style LLM booster) produced a citation spike within 72 hours, then lost ~90% over 2–3 weeks. A separate operator: 4 boosters for a crafts store worked great for Grok + some Gemini/ChatGPT, then lost ~70% after ~20 days.

**The fix: chase the URL, not the answer.** Any single AI answer can drop you at any time. But if your mention sits on a URL that is *itself* cited across many different answers, you stay in the answer set even when one answer lets you go. So: place on sources that are (a) quoted a lot AND (b) easy to land on (listicles, strong industry blogs), then **keep feeding them** instead of publishing once and walking away. Solo placements bleed fastest.

## 2. Source tier beats content quality  `proven`

Controlled test (15 keywords, ~$10K, ChatGPT/Claude/Gemini/Perplexity, tracked with + without VPN):
- **Phase 1** — placed on industry sites the models already trust + ran PR → strong results.
- **Phase 2** — wrote *better* listicles on general sites → almost nothing ranked.
- Verdict: **"PR can lift a good placement, it can't save a bad one."** Where you place dominates how good the content is.

Corollary — **place on sources the LLM already quotes.** "Indeed SEO was being quoted ~10 times in ChatGPT before we ever touched it. We placed there. Still our top citation source months later. Felt like cheating." Find the URLs already cited for your query set and get yourself onto them.

## 3. Peer-set / entity adjacency — LLMs read *who you sit next to*  `proven`

- A listicle ranked the operator *above* Lily Ray and Aleyda Solis (recognized SEO figures). They removed those names later — performance dropped within days. "LLMs read the peer set, not just the mention."
- Same with PR: being named alongside recognized people/brands beats a solo feature on a stronger outlet.
- **Awards angle** (`experimental`, being tested now): award / nominee / winner pages are pure entity-adjacency plays — you sit beside the winners and inherit some of their trust. One operator is building an awards site specifically to test this. (Also a good networking business in its own right.)

Takeaway from the whole test: *"If SEO was about ranking pages, this feels more like ranking associations."* Win the neighborhood, not just the mention.

## 4. Listicles + PR are a *system*, not two tactics  `proven`

From the same test: listicles drove 72.4% of mentions, PR 24.1% — but the listicles that ranked were almost always the ones PR was amplifying. The stack:
1. **Listicle** states the claim ("X is the best Y").
2. **PR** validates the claim.
3. **Guest posts** reference both.

Each layer makes the next harder for the model to ignore. Don't run them as separate line items.

## 5. Unlinked brand mentions on tier-2 news media  `single-report`

Experiment (non-US / local market): a plain **brand mention with no link** on a medium-tier local news outlet put the brand on Google AI Overview + rank 1 within a few hours. Repeated across 3 tier-2 outlets → showed on all three AI search engines *and* produced the best Google-SEO result too.
- **Good enough for brand-name queries. NOT enough for a competitive head keyword** (e.g. brand showed for its name but got zero for "AI Agency Indonesia").
- Open question the operator is testing: does an **EMD** (exact-match-domain brand) convert the brand-mention lift into keyword lift? Untested.
- Implication: unlinked mentions on trusted news outlets are a cheap, fast entity/brand signal — but pair with the listicle+PR system for competitive commercial terms. Backlinks may matter less than the field assumes for *brand* visibility.

## 6. Content-format findings (reinforce the SOP)  `proven`

- **First 100 words must contain the answer.** "LLMs skim like a tired manager." Buried answers don't get cited. (Matches the SOP `directAnswer` rule.)
- **FAQs open by default.** "Click-to-expand is a tombstone for your visibility."
- **Keyword-exact listicles still matter.** Operator ranks for "Best LLM SEO Consultant" but barely for "Best AI SEO Consultant" — same intent, but no dedicated listicle for the second phrasing. **Semantic SEO does not bridge this in GEO — build one listicle per keyword variant you want to win.**
- **Query casing changes the source set.** Capitalized vs lowercase pulls different sources ("didn't believe it until I ran it three times"). → When monitoring, test both cases of each prompt.

## 7. Parasite surfaces beyond HackMD/Reddit  `experimental` / `single-report`

- **beehiiv AI-discovery pages** (`experimental`): beehiiv auto-generates public pages from newsletter sends; their team is actively pushing these on LinkedIn as GEO surfaces. Play being tested: grab a strong local domain, spin up a newsletter, highlight local businesses → beehiiv pages as parasite GEO surfaces for local. "Leaning into their parasite power."
- **Vertical/niche directories** (`single-report`): `medspascout.com/clinic/...` pages "getting ranked in ChatGPT like crazy." For any niche, find the vertical directory the LLMs favor and get your client listed. (Directory placement > building your own thin pages.)
- **Serve Markdown to LLM bot user-agents** (`experimental`): Cloudflare shipped a "Markdown for agents" feature (`developers.cloudflare.com/fundamentals/reference/markdown-for-agents`) — serve a clean Markdown rendering to known LLM crawler UAs. General principle several operators agree on: *anything that makes the model's scrape/parse job easier gets rewarded.* (Costs money on CF; test ROI.)

## 8. Knowledge-graph + LLM subdomains  `experimental`

One operator (groas.com) reports a GEO-visibility jump after adding two subdomains to their own domain:
- **`graph.<domain>`** — a published knowledge-graph / entity graph (e.g. `graph.groas.com`).
- **`llms.<domain>`** — an LLM-oriented subdomain (e.g. `llms.groas.com`), beyond a root `llms.txt`.

Self-reported ("I have reason to believe it works based on what we're tracking for ourselves") — no controlled proof, but cheap to replicate and consistent with the "make the model's job easier + strengthen the entity graph" thesis. Schema / knowledge-graph gains are the least controversial part; the dedicated `llm.` subdomain is the novel, unproven bit.

## 9. Press-wire landscape (2026)  `proven` / `single-report`

- **ABNewswire** still used for pushing research/EMD domains but "getting obsolete" per some operators (saturation). **BarChart** syndication (via wire) still strong for ChatGPT citations — the value is the BarChart/Yahoo endpoint, not the wire brand.
- Alternatives named: **EIN Presswire**, **King Newswire**. Demand exists for **non-English** wires (German/Spanish plugs asked-for, few good options) — a gap if you serve non-US markets.
- **PBN + press-release bundle** (`grey-hat`): some operators bundle PBN links with the press release for local-service clients and report it working. ⚠️ PBNs are an explicit Google violation; use only with eyes open on deindex risk, and never on a primary money domain.

## 10. Measurement caveats  `proven`

- **Ahrefs mis-reports AI-overview presence as a "position 1" ranking.** A DR0 site "ranking #1" for a 1.3K-volume keyword in Ahrefs was actually being counted as an *AI-overview source*, with near-zero real clicks. **GSC is the source of truth for clicks/impressions** — verify every Ahrefs "win" against GSC before believing it.
- **GA4's new AI Assistant undercounts AI referrals.** It does not roll `chatgpt.com / referral` under its own term — expand by **source / medium** to see true AI-referred traffic, or the numbers mislead.
- **Perplexity is losing momentum** (Aug 2026 community sentiment — "they are losing the momentum, I even do not use perplexity anymore"). Keep tracking it, but weight ChatGPT and Gemini higher when prioritizing effort.

## 11. Reference links worth reading

- Suganthan — *How Perplexity picks sources* (retrieved-vs-cited gap): `suganthan.com/blog/how-perplexity-picks-sources`
- Cloudflare — *Markdown for agents*: `developers.cloudflare.com/fundamentals/reference/markdown-for-agents`
- beehiiv — *AI discovery*: `product.beehiiv.com/p/ai-discovery`
- Kasra Dash — YouTube-for-GEO playbook (named as the reference for a "proper YouTube push")
- Austin Heaton — structured-data "about" page model (named as a template to copy)

---

*Compiled 2026-09-01 from a fresh export of the #geo channel (21 posts, 15 threads, 62 replies). Raw export: `~/clawd/research/advise-geo-2026-09-01/`. The durable, actionable mechanics from this file are folded into `playbook/10-ai-seo-aeo-geo.md` Part 6; grey-hat and experimental items are kept here with caveats rather than promoted into the SOP.*
