# Hosting, Cloudflare Pages, Deployment, and Indexing

**Purpose:** Get your static site live on Cloudflare Pages, cached correctly, and indexed by every search engine — including the AI crawlers (ChatGPT/Bing, Perplexity, Claude) — within days of launch.

**When to use:** Every production deployment and every time you add new pages or update existing ones.

---

## The SOP

### PHASE 1 — One-time Cloudflare setup

1. Create a Cloudflare Pages project in the dashboard for your domain.

2. Set up wrangler auth using the **Global API Key**, not a scoped token. Scoped tokens frequently lack Pages write permissions and silently fail.
   ```bash
   export CLOUDFLARE_EMAIL="account@example.com"
   export CLOUDFLARE_API_KEY="<your-global-api-key>"
   export CLOUDFLARE_ACCOUNT_ID="<your-account-id>"
   ```
   Store these as environment variables in your deploy script — never hard-code them.

3. Find your Zone ID: Cloudflare dashboard → your domain → Overview → right sidebar → Zone ID. Add it to your deploy script.

4. Configure `public/_headers` for caching (see Standards section below). This file is deployed with your site and overrides Cloudflare's defaults.

5. Configure `public/_redirects` to return real 404 status for unknown paths. If Cloudflare serves your SPA shell (200) on unknown paths, every 404 is a soft-404 — Google treats it as duplicate content and wastes crawl budget.

6. Verify **Super Bot Fight Mode** does not block AI crawlers. Go to Security → Bots → verify "Verified bots" are allowed. If SBFM is on, add a WAF skip rule for GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended user agents. Confirm with:
   ```bash
   curl -A "GPTBot/1.1" https://your-site.com/ | grep -c "<h1"
   ```
   If count = 0, AI crawlers are being challenged. Fix before any other SEO work — all your prerender effort is invisible until this is resolved.

### PHASE 2 — Write `robots.txt` with AI crawler allowances

Place in `public/robots.txt`. Explicitly name every major AI crawler with `Allow: /`:

```
User-agent: Googlebot
Allow: /
Disallow: /gated-path

User-agent: Bingbot
Allow: /
Disallow: /gated-path

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# AI / answer-engine crawlers — explicitly welcomed
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /gated-path
Disallow: /app-route-not-for-crawlers

Sitemap: https://your-site.com/sitemap.xml

# LLM/AI model-truth summary: https://your-site.com/llms.txt
```

Blocking GPTBot/ClaudeBot/PerplexityBot means your content never appears in AI-generated answers regardless of how well it ranks on Google. Do not block them unless you have a hard legal reason.

### PHASE 3 — The 5-step deploy pipeline

Run this script (`deploy.sh`) for every production deployment:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
MODE="${1:-preview}"   # "prod" or "preview"

echo "==> [1/5] build"
npm run build

echo "==> [2/5] prerender (SPA → static HTML + regenerate sitemap.xml + llms.txt)"
python3 scripts/prerender.py

# Auth via global key (scoped token lacks Pages permissions)
export CLOUDFLARE_EMAIL="$CF_EMAIL"
export CLOUDFLARE_API_KEY="$CF_KEY"
export CLOUDFLARE_ACCOUNT_ID="$CF_ACCT"

if [ "$MODE" = "prod" ]; then
  echo "==> [3/5] deploy PRODUCTION"
  npx wrangler pages deploy dist --project-name=<project-name> --commit-dirty=true
else
  echo "==> [3/5] deploy PREVIEW"
  npx wrangler pages deploy dist --project-name=<project-name> --branch=preview --commit-dirty=true
fi

echo "==> [4/5] purge Cloudflare edge cache (MANDATORY — see pitfalls)"
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/<zone-id>/purge_cache" \
  -H "X-Auth-Email: $CF_EMAIL" -H "X-Auth-Key: $CF_KEY" \
  -H "Content-Type: application/json" --data '{"purge_everything":true}' \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('purge:', 'OK' if d.get('success') else d)"

if [ "$MODE" = "prod" ]; then
  echo "==> [5/5] IndexNow ping"
  python3 scripts/indexnow_ping.py
fi
```

**Why this order matters:** build → prerender → deploy → purge → ping. Skipping any step breaks the chain:
- Build without prerender = search engines see your SPA shell, not your content.
- Deploy without cache purge = Cloudflare's edge may serve old HTML to returning visitors even after new files are uploaded.
- Deploy without IndexNow = Bing (and therefore ChatGPT) may take weeks to discover new pages.

### PHASE 4 — IndexNow setup (one-time)

IndexNow is a free protocol that notifies Bing, Yandex, Seznam, and Naver instantly when a URL changes. Bing's index is what ChatGPT web search runs on — IndexNow is the fastest path from publish to AI-visible.

**Setup:**
1. Generate a random hex key (e.g. `openssl rand -hex 32`).
2. Create `public/<your-key>.txt` containing just the key string.
3. Deploy — the file must be accessible at `https://your-site.com/<key>.txt`.
4. Done. No dashboard registration needed.

**Submit all URLs after every production deploy (`scripts/indexnow_ping.py`):**

```python
import json, subprocess, re

HOST = "your-site.com"
KEY  = "your-hex-key-here"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"  # central hub → distributes to Bing + others

# Read URLs from the just-generated sitemap
xml = open("dist/sitemap.xml").read()
urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)

body = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}

# Use curl, not urllib — some endpoints return 403 on urllib's default UA
r = subprocess.run(
    ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "-X", "POST", ENDPOINT,
     "-H", "Content-Type: application/json; charset=utf-8",
     "-d", json.dumps(body)],
    capture_output=True, text=True)
print("IndexNow response:", r.stdout.strip())
# 200/202 = accepted  |  403 = key file wrong/missing  |  422 = URL/host mismatch  |  429 = rate-limited
```

### PHASE 5 — Wire Google Search Console and Bing Webmaster Tools

**Google Search Console:**
1. Add a **domain property** (covers all subdomains + HTTP/HTTPS).
2. Also add a **URL-prefix property** (required for the Disavow tool and the URL Inspection API).
3. Verify via DNS TXT record (domain property) or HTML file in `public/` (URL-prefix).
4. Submit sitemap: Sitemaps → `https://your-site.com/sitemap.xml`.
5. Remove any stale sitemaps from previous site versions.
6. Use URL Inspection for per-URL crawl status — more reliable than the sitemap indexed-count counter, which is broken and often shows 0 even when pages are indexed.

**Bing Webmaster Tools:**
1. `https://www.bing.com/webmasters/` → Add site.
2. Verify via CNAME or XML file.
3. Submit sitemap.
4. Configure IndexNow in the Bing settings (or rely on the direct API calls from your deploy script — both work).

Bing Webmaster is not optional if you want ChatGPT/Copilot visibility. ChatGPT's web search runs exclusively on Bing's index.

### PHASE 6 — Third-party indexing accelerators (for off-site content)

For third-party URLs you control or publish on (HackMD listicles, Medium posts, LinkedIn articles, Reddit threads), use a paid indexing accelerator to force crawl within minutes:

- **IndexChex**: $19.99/mo starter (5,000 credits). Confirmed sub-2-minute indexing on community-tested URLs. Use for any third-party surface you publish to.
- **RapidURLIndexer**: ~$0.05/URL, auto-refunds for pages that don't index. Use for individual high-priority URLs.

Do **not** use Google's Indexing API at scale for regular content pages — Google filters it for non-job-posting/livestream content and ignores submissions.

---

## Standards & Thresholds

### Caching (`public/_headers`)

```
# Vite content-hashed assets — safe for permanent cache (filename changes on every rebuild)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

# HTML must stay fresh — it references the hashed assets
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate
```

### IndexNow response codes
| Code | Meaning |
|------|---------|
| 200 or 202 | Accepted and queued for crawl |
| 403 | Key file is wrong or not live at the expected URL |
| 422 | URL/host mismatch — URLs in `urlList` must match the `host` field |
| 429 | Rate-limited — max 10,000 URLs per batch request |

### Observed indexing timeline (measured on a B2B site, mid-2026)
- Pages submitted to sitemap + IndexNow: indexed on Bing within 2–7 days.
- GSC impressions appeared on day 1 post-indexing.
- Site grew from ~296 to 3,490 impressions/week in the first 7 days after full index.

### www vs apex
Ensure one redirects to the other (301). Both serving 200 = duplicate content. Pick one and stick to it throughout schema, sitemap, and canonical tags.

---

## AI-Agent Checklist

Before every production deploy, verify:

- [ ] `npm run build` completed without errors
- [ ] `python3 scripts/prerender.py` ran AFTER build (not before)
- [ ] Each prerendered route has unique `<title>` and `<h1>` text (spot-check 3 pages)
- [ ] `dist/404.html` exists and contains a genuine not-found message (not homepage content)
- [ ] `dist/sitemap.xml` contains only the URLs you expect
- [ ] `wrangler pages deploy` succeeded (check exit code and output URL)
- [ ] Cloudflare cache purge returned `"success": true`
- [ ] IndexNow ping returned 200 or 202
- [ ] `curl https://your-site.com/any-real-page/ | grep -c "<h1"` returns 1+ (content is in HTML)
- [ ] `curl -A "GPTBot/1.1" https://your-site.com/ | grep -c "<h1"` returns 1+ (AI crawlers not blocked)
- [ ] GSC sitemap shows the correct URL count (note: the count may display 0 — use URL Inspection as the authoritative check, not the counter)
- [ ] Bing Webmaster shows sitemap submitted

---

## Common Mistakes and Risks

**Immutable headers on fixed filenames.** `immutable` on `/assets/*` is correct when Vite content-hashes the filenames (e.g. `index-Bq3fK7.js`). If you manually manage asset filenames that don't change on rebuild, `immutable` means returning visitors run old JavaScript forever — their browsers refuse to check for updates. Only use `immutable` on hash-named assets. All HTML must use `must-revalidate`.

**Deploying without prerendering.** After `npm run build`, `dist/index.html` is your SPA shell — every route returns the same blank HTML with a `<script>` tag. Deploy that and every page appears identical to search engines. The prerender step is what creates `dist/texas/index.html`, `dist/guides/topic/index.html`, etc. with real content baked in.

**Skipping the cache purge.** Cloudflare's edge CDN caches aggressively. Without a post-deploy purge, the edge may serve old HTML for hours or days. The purge is a one-second API call. Skip it and you risk returning users getting the previous version.

**Scoped Cloudflare API token.** Scoped tokens frequently lack Pages deploy permissions. Use the Global API Key stored as environment variables. Never commit credentials to source control.

**Blocking AI crawlers with Bot Fight Mode.** Cloudflare's Super Bot Fight Mode issues CAPTCHA challenges to non-browser UAs. GPTBot and PerplexityBot get challenged and can't read your content. Verify with a raw curl using the GPTBot user agent before declaring your robots.txt work done.

**GSC "indexed count = 0" panic.** The sitemap indexed-count column in GSC is a deprecated/unreliable display. Pages can be indexed and ranking with impressions while showing 0. Use URL Inspection → `coverageState` for reliable per-URL status.

**Soft-404s.** If unknown paths return HTTP 200 with homepage content, Google burns crawl budget on them and may confuse your actual home page authority. Generate a real `404.html` during prerender and ensure `_redirects` routes unknown paths to it with a 404 status code.
