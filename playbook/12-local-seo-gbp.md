# Local SEO and Google Business Profile

**Purpose:** Dominate the local 3-pack and AI-powered local results for geo-specific service businesses. Covers the complete GBP optimization, citation building, review acquisition, on-page local signals, and the 2026 shift toward appearing in AI-generated local answers.

**When to use:** Any site targeting a specific city, metro, or regional service area. Also relevant for national B2B sites as an entity signal and knowledge graph anchor (GBP builds trust even when local pack ranking is not the primary goal).

---

## The SOP

### Phase 1 — GBP Claim and Build (week 1)

#### 1.1 Claim and verify

1. Go to `business.google.com` → "Manage now."
2. Search for your business name. If a profile exists (even unclaimed), claim it. If not, create it.
3. Verification method: phone, postcard, email, or video verification (newest option). Postcard takes 5–14 days; phone/email are instant if available.
4. For service-area businesses (no storefront): set service area to your target cities/radius. Do not list a home address publicly.
5. Use the exact legal business name — no keyword stuffing in the name field. Google filters and suspends profiles with keyword-stuffed names.

#### 1.2 Complete every GBP field

| Field | Standard |
|-------|----------|
| Business name | Legal name only — no keyword stuffing |
| Category | Primary category = single most accurate category. Secondary categories = every applicable. |
| Description | 750 characters. Lead with what you do and who you serve. Include primary keyword naturally in first 100 chars. |
| Phone | Use a local number, not a toll-free number, where possible. |
| Website | Link to the landing page most relevant to the GBP location. |
| Hours | Set accurately. Update for holidays (use Special Hours). |
| Address | Exact address matching your website, citations, and schema. |
| Service area | List every city/metro you actively serve. |
| Services | Add every service you offer with a description. |
| Products | Add product listings with photos and prices where applicable. |
| Questions & Answers | Seed 5–10 Q&As yourself (from customer-POV). Anyone can ask or answer — seed the good ones proactively. |
| Photos | Minimum 10 exterior + 10 interior + 10 team + 10 action = 40 photos. Add more regularly. |
| Attributes | Select every applicable attribute (women-led, LGBTQ-friendly, parking, accessibility, etc.). |
| Messaging | Enable if you can respond within a few hours. |

#### 1.3 Google Posts cadence

Post 2x per week minimum. Post types:
- **Updates**: news, announcements, recent project completions
- **Events**: local events, webinars, seasonal promotions
- **Offers**: time-limited promotions with start/end dates
- **Products**: highlight specific services or products

Posts disappear after 7 days (except Events/Offers). Consistent posting signals to Google that the business is active and engaged.

### Phase 2 — Reviews

#### 2.1 Review generation system

Target: 4+ star average. Volume > rating for early-stage profiles.

Organic review acquisition process:
1. Identify the 2-3 post-delivery touchpoints where customers express satisfaction (delivery call, project completion, first result milestone).
2. At that moment: ask verbally ("We really appreciate reviews — would you be willing to leave us one on Google?") then immediately follow up with a direct link (use `business.google.com/b/1234567890/reviews` or a shortened link).
3. The ask must be immediate — the emotional high of a successful outcome is when reviews happen.
4. Do NOT offer incentives for reviews. FTC rules prohibit conditional review incentives. Google may remove incentivized reviews.
5. Respond to every review within 24 hours — positive and negative.

For negative reviews:
- Respond professionally, never defensively.
- Acknowledge the concern, offer to resolve it offline.
- Do not argue publicly.
- A business that responds well to a negative review often earns more trust than one with all 5-star reviews.

#### 2.2 Review response templates (adapt to voice)

**Positive:**
> "Thank you [Name]! We're glad [specific thing they mentioned] made a difference. Looking forward to working with you again."

**Negative:**
> "We're sorry to hear about your experience, [Name]. This isn't the standard we hold ourselves to — please reach out to [email/phone] so we can make it right."

#### 2.3 Review platforms beyond Google

- Yelp (service businesses, restaurants)
- Facebook Reviews
- BBB
- Industry-specific: Avvo (legal), Healthgrades (medical), Houzz (home services), G2/Capterra (software)

AI engines pull from review aggregates across platforms. Presence on multiple review surfaces strengthens the entity trust signal.

### Phase 3 — Citation Building

#### 3.1 What citations are

Citations are any online mention of your business NAP (Name, Address, Phone). Consistency matters more than quantity — a mismatched address across directories is worse than no directory listing at all.

#### 3.2 Tier 1 citations (complete these first)

| Citation source | Priority |
|----------------|----------|
| Google Business Profile | P0 — already done |
| Bing Places | P0 — sync with GBP |
| Apple Maps | P0 — claim via Apple Business Connect |
| Facebook Business Page | P1 |
| LinkedIn company page | P1 |
| Yelp | P1 (service + food businesses) |
| BBB | P1 |
| Yellow Pages (YP.com) | P2 |
| Angi / HomeAdvisor | P2 (home services) |
| Foursquare | P2 |
| Manta | P2 |

#### 3.3 Tier 2 — Data aggregators

These feed hundreds of directories automatically:
- Data Axle (formerly Infogroup)
- Neustar/Localeze
- Foursquare

Getting your NAP into the aggregators propagates to ~200+ downstream directories without submitting to each individually. Use a service like Yext, BrightLocal, or Whitespark to manage this at scale.

#### 3.4 Tier 3 — Niche and local directories

- Local Chamber of Commerce
- Local newspaper or city website business directories
- Industry-specific directories (law, medical, home services, etc.)
- State business associations
- Local community directories

These carry strong local relevance signals because they're topically and geographically specific.

#### 3.5 Citation consistency rules

- Business name must match exactly across every surface — including punctuation. "Smith & Sons LLC" and "Smith and Sons" are different entries to a citation data aggregator.
- Address must match exactly — "Suite 100" vs "Ste. 100" vs "#100" are all different.
- Phone number: use the same format everywhere (use dashes consistently: 555-123-4567).
- Website URL: use the same canonical form (with or without www, with or without trailing slash) consistently.
- Run a quarterly citation audit with BrightLocal, Whitespark, or Moz Local to find inconsistencies.

### Phase 4 — On-Page Local Signals

#### 4.1 LocalBusiness schema

Add `LocalBusiness` JSON-LD (or a relevant subtype like `Plumber`, `LegalService`, `MedicalClinic`) to every location-specific page:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://your-site.com/#business",
  "name": "Business Name",
  "url": "https://your-site.com/",
  "telephone": "+15551234567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St, Suite 100",
    "addressLocality": "City Name",
    "addressRegion": "CA",
    "postalCode": "90210",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "City Name" },
    { "@type": "City", "name": "Adjacent City" }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/?cid=YOUR_CID",
    "https://www.facebook.com/YOUR_PAGE",
    "https://www.yelp.com/biz/YOUR_BUSINESS"
  ]
}
```

Use `latlong.net` to find exact GPS coordinates. The `geo` field is how Google confirms physical presence.

#### 4.2 Embed Google Maps on the contact/location page

An embedded Google Map on your contact page directly signals location relevance to Google's local ranking algorithm. Use the CID-based URL for the embed (get it from your GBP listing URL) so it connects to your verified profile.

#### 4.3 Location-specific content on geo pages

For businesses targeting multiple cities, each city page needs genuinely differentiated content:
- City name in H1, title, meta description, first paragraph, and at least 2–3 H2s
- Local stats relevant to the service (crime rates for security companies, accident data for attorneys, etc.)
- Local market context (pricing differences, local regulations, local competition)
- Neighborhood or landmark references that anchor the page to the place
- City-specific FAQs (not just "[service] in [city]" with city swapped)

Thin geo pages with only the city name swapped across a template get deindexed. 1,400+ words with genuine local data is the threshold for non-doorway treatment.

### Phase 5 — Local Link Building

Local links carry topical AND geographic relevance — doubly valuable:

- **Local business directories**: Chamber of Commerce, local newspaper, city business directories
- **Local sponsorships**: $200–500/year per sponsorship for local charities, sports leagues, schools. Most issue a donor page with a do-follow link.
- **Community organizations**: Rotary, BNI, professional associations, local trade associations
- **Local press**: Pitch genuinely newsworthy events or data to local newspaper reporters. A story in the local paper with a link is worth more for local rankings than 10 directory links.
- **Local business partners**: Complementary businesses (a plumber linking to an electrician, a lawyer linking to an accountant) carry local relevance signal.

### Phase 6 — AI and Local (2026 shifts)

Google AI Overviews now include Maps embeds (confirmed appearing April 2026). This means local businesses with optimized GBP profiles are appearing in AI-generated answers, not just in the traditional 3-pack.

What drives AI local citations:
1. Complete GBP profile (especially reviews and Q&A)
2. Consistent NAP across all surfaces
3. `LocalBusiness` schema with `geo` coordinates
4. Review volume and recency
5. Appearing in local listicles (Yelp, Angi, Houzz etc. articles about "Best X in City")
6. Wikipedia/Wikidata entity entries mentioning local presence

Run monthly tests of "[service] in [city]" queries in ChatGPT, Perplexity, and Google AI Overviews. Record who's cited. If a local competitor is being cited and you aren't, check: their reviews (volume + recency), their GBP completeness, their citation count, and whether they appear on any listicle surfaces that AI is reading.

---

## The 65-Point Local SEO Checklist

Organized by tier. Complete Tier 1 before Tier 2, Tier 2 before Tier 3.

### Tier 1 — Critical Foundation

**GBP Setup**
- [ ] Business claimed and verified
- [ ] All basic info complete and accurate (name, address, phone, website, hours, category)
- [ ] Primary category is single most accurate option
- [ ] At least 3 secondary categories selected
- [ ] 750-character description written with primary keyword in first 100 chars
- [ ] Service area configured (for SABs)

**Reviews**
- [ ] Review generation system active (post-delivery touchpoint defined)
- [ ] Responding to reviews within 24 hours
- [ ] Minimum 10 reviews with 4+ star average
- [ ] Present on Yelp, Facebook, and at least one industry-specific review platform

**Citations**
- [ ] NAP consistent across Google, Bing, Apple, Facebook, LinkedIn, Yelp, BBB
- [ ] Submitted to data aggregators (Data Axle, Neustar, Foursquare)
- [ ] Errors corrected on any existing incorrect listings

**On-Page**
- [ ] `LocalBusiness` schema on location page with address, phone, geo, hours, areaServed
- [ ] Google Maps embedded on contact/location page
- [ ] City + keyword in title, H1, meta description, and first paragraph
- [ ] NAP in footer sitewide

### Tier 2 — Growth Optimization

**GBP Optimization**
- [ ] 40+ photos uploaded (10+ each: exterior, interior, team, action/at-work)
- [ ] 5–10 Q&As seeded in GBP
- [ ] Posts running at 2x/week cadence
- [ ] Google Posts include at least one Offer or Event per month
- [ ] All available attributes selected

**Content**
- [ ] Dedicated page for each service with local keyword in title and H1
- [ ] Individual city pages for every market served (1,400+ words, unique local data)
- [ ] Blog or news section with at least 2 posts/month on local topics
- [ ] Case studies with location and outcome (minimum 3)
- [ ] FAQ section with 20+ questions, all expanded by default
- [ ] FAQ schema on all FAQ-containing pages

**Reviews**
- [ ] Review ask integrated into 2+ delivery touchpoints
- [ ] Responding to 100% of reviews
- [ ] Active on 3+ review platforms with consistent responses

**Citations**
- [ ] Tier 1 citations complete
- [ ] 10+ local/niche-specific directories
- [ ] Local Chamber of Commerce listing
- [ ] Industry association directories

**Local Links**
- [ ] At least 1 local sponsorship link
- [ ] Links from 2+ local business partners
- [ ] Active outreach to Chamber, local newspapers

### Tier 3 — Dominance

**Entity and Authority**
- [ ] Wikidata entry for business and founder
- [ ] Aggregated review schema (AggregateRating) on website using real third-party review data
- [ ] Photos updated at least monthly
- [ ] Video content on GBP (virtual tour, team intro, service walkthrough)
- [ ] Google Messaging enabled with response within 4 hours
- [ ] Full GBP Insights tracked and reviewed monthly

**Advanced Content**
- [ ] Local statistics page ("Crime statistics in [City]", "Accident data in [Metro]", etc.)
- [ ] Awards page or local recognition content
- [ ] Sponsorship/community involvement page with photos
- [ ] Local press mentions documented on site

**Measurement**
- [ ] GBP ranking scan running on 3–5 day cadence (BrightLocal, LocalRank.so)
- [ ] AI citation monitoring for local queries (monthly test in ChatGPT, Perplexity)
- [ ] Monthly citation audit for consistency errors
- [ ] Quarterly schema review and update
- [ ] Core Web Vitals checked quarterly

---

## Standards & Thresholds

| Metric | Standard |
|--------|----------|
| GBP description | 750 characters |
| GBP posts frequency | 2x per week minimum |
| GBP Q&A seeds | 5–10 questions minimum |
| GBP photos minimum | 10 exterior + 10 interior + 10 team + 10 action = 40 total |
| Review response SLA | Within 24 hours (positive and negative) |
| City page word count | 1,400+ words with genuine local data |
| FAQ minimum | 20+ questions, all expanded by default |
| Case studies minimum | 3+ with specific outcomes |
| Blog/freshness cadence | 2 posts/month minimum |
| GBP ranking scan | Every 3–5 days |
| Citation audit | Monthly |
| GBP signals weight | ~33% of all local pack signals |
| Local pack CTR | #1 = 17.6%, #2 = 15.4%, #3 = 15.1% (local queries) |
| Mobile traffic share | ~80–83% of local search happens on mobile |
| Citation signals weight | ~7% of local search signals |
| Consumers checking reviews | 63% check Google reviews before visiting |
| Local searches on mobile | 88% |

---

## AI-Agent Checklist

**Initial setup (do once):**
- [ ] GBP claimed and all 15+ fields complete
- [ ] All Tier 1 citations submitted and consistent
- [ ] Data aggregators fed (Data Axle / Neustar / Foursquare)
- [ ] `LocalBusiness` schema deployed on location page
- [ ] Google Maps embedded on contact page
- [ ] City name in title, H1, meta description, first paragraph on all city pages
- [ ] NAP in footer (sitewide)

**Ongoing (weekly):**
- [ ] 2 GBP posts published this week
- [ ] All reviews from last 7 days responded to within 24 hours
- [ ] 10–20 new citations built (Tier 2/3 sources)
- [ ] 1 new local piece of content published (blog, case study, news)

**Monthly:**
- [ ] Full citation audit run — all errors corrected
- [ ] GBP photos batch added (aim for 10+ new/month initially)
- [ ] Q&As reviewed and new ones added
- [ ] Review generation push (re-engage recent customers)
- [ ] AI sweep: test "[service] in [city]" in ChatGPT, Perplexity, Google AI Overviews
- [ ] GBP Insights reviewed (search queries, views, actions)

**Quarterly:**
- [ ] Schema review — all addresses, phone numbers, hours accurate?
- [ ] Core Web Vitals check on all location pages
- [ ] Competitor GBP comparison (their review count/rating vs yours; their GBP completeness)
- [ ] Content refresh on underperforming city pages (add new data, update dateModified)

---

## Common Mistakes and Risks

**Keyword stuffing in the GBP business name.** Google filters and suspends profiles with keyword-stuffed names ("Smith Law Firm – Personal Injury – Car Accidents – Houston TX"). Your name field must match your legal business name. Secondary categories, description, and posts are where keywords belong.

**Inconsistent NAP.** A mismatch of "Suite 100" vs "Ste. 100" across 50+ directories tells Google there may be multiple businesses at similar addresses. Consistency is the signal. Run a citation audit quarterly.

**Thin city pages with only the city name swapped.** Google's documentation explicitly identifies "doorway pages" (many pages targeted to individual cities with slight variations) as against quality guidelines. The fix: genuine per-city data (local regulations, local market data, local pricing) that makes each page independently useful.

**No photos.** GBP profiles with no photos rank lower and get fewer calls. The algorithm measures photo engagement as a relevance signal. 40 photos (across exterior, interior, team, in-action) is the working minimum. Profiles with more photos than competitors consistently outperform them in A/B tests.

**Ignoring Q&A.** Anyone can add Q&As to your GBP profile — including competitors and detractors. Check regularly. Seed 5–10 Q&As yourself to control the first-impression narrative. Upvote your own seeded Q&As.

**Buying reviews.** Any form of incentivized or purchased reviews violates Google's policies and platform terms. Reviews can be removed in bulk if patterns are detected. Do not do this.

**Setting GBP and forgetting it.** GBP is an active, ongoing channel — not a one-time setup. Posts, photos, Q&As, review responses, and regular info updates all signal to Google that the business is active. A stale GBP profile loses ground to competitors who treat it as an ongoing marketing channel.

**Ignoring AI local.** Google AI Overviews now show Maps embeds for local queries. Appearing in AI-generated local results requires the same inputs as traditional local SEO (GBP completeness, reviews, citations, schema) but prioritizes entities that AI sources like ChatGPT and Perplexity are already citing. Test your local AI presence monthly.
