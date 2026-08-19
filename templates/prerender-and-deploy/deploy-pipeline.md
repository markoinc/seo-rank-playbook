# Deploy Pipeline — Build, Prerender, Deploy, Purge, Index

**Purpose:** The complete, ordered deployment pipeline for a prerendered SPA on Cloudflare Pages. Every step is mandatory. Skipping any step produces a broken or stale deployment.

**When to use:** Every production deployment. Also used for preview deployments (steps 4–5 are skipped for preview branches).

---

## The 5-Step Pipeline

```
Step 1: npm run build
  ↓  (generates dist/ with SPA shell)

Step 2: python3 scripts/prerender.py
  ↓  (converts SPA shell to per-route static HTML)
  ↓  (regenerates sitemap.xml and llms.txt)

Step 3: wrangler pages deploy dist/
  ↓  (uploads built + prerendered files to Cloudflare Pages CDN)

Step 4: curl Cloudflare purge_cache
  ↓  (purges edge-cached HTML so returning visitors get new pages immediately)

Step 5: python3 scripts/indexnow_ping.py
     (notifies Bing/ChatGPT of all updated URLs — production only)
```

---

## `deploy.sh` — Complete Script

```bash
#!/usr/bin/env bash
# deploy.sh — Full build → prerender → deploy → purge → IndexNow pipeline
#
# Usage:
#   bash deploy.sh prod      # Production: full pipeline including IndexNow ping
#   bash deploy.sh preview   # Preview: build + deploy to preview branch only
#   bash deploy.sh           # Defaults to "preview" if no arg given
#
# Required environment variables (set in your shell or .env file — never commit):
#   CF_EMAIL      Cloudflare account email
#   CF_KEY        Cloudflare Global API Key (NOT a scoped token — scoped tokens lack Pages perms)
#   CF_ACCT       Cloudflare Account ID
#   CF_ZONE       Cloudflare Zone ID (find in: dashboard → domain → Overview → right sidebar)
#   CF_PROJECT    Cloudflare Pages project name

set -euo pipefail
cd "$(dirname "$0")"  # always run from the project root

MODE="${1:-preview}"

# ─── Validate required env vars ───────────────────────────────────────────────
: "${CF_EMAIL:?Required: CF_EMAIL}"
: "${CF_KEY:?Required: CF_KEY}"
: "${CF_ACCT:?Required: CF_ACCT}"
: "${CF_ZONE:?Required: CF_ZONE}"
: "${CF_PROJECT:?Required: CF_PROJECT}"

# ─── Step 1: Build ────────────────────────────────────────────────────────────
echo ""
echo "==> [1/5] Build (npm run build)"
npm run build

# Verify build produced output
if [ ! -f "dist/index.html" ]; then
  echo "ERROR: dist/index.html not found after build. Build failed."
  exit 1
fi
echo "    ✓ Build complete ($(du -sh dist/ | cut -f1) output)"

# ─── Step 2: Prerender ────────────────────────────────────────────────────────
echo ""
echo "==> [2/5] Prerender (SPA → static HTML + regenerate sitemap.xml + llms.txt)"
python3 scripts/prerender.py

# Verify prerender produced content pages (not just the SPA shell)
PRERENDERED_COUNT=$(find dist -name "index.html" | wc -l | tr -d ' ')
if [ "$PRERENDERED_COUNT" -lt 5 ]; then
  echo "ERROR: Expected multiple prerendered pages; found only $PRERENDERED_COUNT index.html files."
  echo "       Check that scripts/prerender.py completed without errors."
  exit 1
fi
echo "    ✓ Prerendered $PRERENDERED_COUNT pages"

# Verify 404.html was generated (prevents soft-404s)
if [ ! -f "dist/404.html" ]; then
  echo "ERROR: dist/404.html not found. Soft-404 protection missing."
  exit 1
fi

# ─── Step 3: Deploy to Cloudflare Pages ──────────────────────────────────────
echo ""
echo "==> [3/5] Deploy to Cloudflare Pages ($MODE)"

export CLOUDFLARE_EMAIL="$CF_EMAIL"
export CLOUDFLARE_API_KEY="$CF_KEY"
export CLOUDFLARE_ACCOUNT_ID="$CF_ACCT"

if [ "$MODE" = "prod" ]; then
  npx wrangler pages deploy dist \
    --project-name="$CF_PROJECT" \
    --commit-dirty=true
else
  npx wrangler pages deploy dist \
    --project-name="$CF_PROJECT" \
    --branch=preview \
    --commit-dirty=true
fi

echo "    ✓ Deploy complete"

# ─── Step 4: Purge Cloudflare edge cache ─────────────────────────────────────
# MANDATORY on every deploy — without this, the Cloudflare edge may serve
# stale HTML to returning visitors even though new files were just uploaded.
echo ""
echo "==> [4/5] Purge Cloudflare edge cache (MANDATORY)"

PURGE_RESPONSE=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/purge_cache" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')

PURGE_SUCCESS=$(echo "$PURGE_RESPONSE" | python3 -c "import sys,json;print(json.load(sys.stdin).get('success','false'))")

if [ "$PURGE_SUCCESS" != "True" ]; then
  echo "ERROR: Cache purge failed. Response: $PURGE_RESPONSE"
  echo "       Live site may serve stale pages. Retry purge manually via Cloudflare dashboard."
  exit 1
fi
echo "    ✓ Edge cache purged"

# ─── Step 5: IndexNow ping (production only) ──────────────────────────────────
if [ "$MODE" = "prod" ]; then
  echo ""
  echo "==> [5/5] IndexNow ping — notify Bing/ChatGPT of updated URLs"
  python3 scripts/indexnow_ping.py
  echo "    ✓ IndexNow ping sent"
else
  echo ""
  echo "==> [5/5] IndexNow ping — SKIPPED (preview branch)"
fi

# ─── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo "Deploy complete [$MODE]"
if [ "$MODE" = "prod" ]; then
  echo "Next: verify https://your-site.com/ returns updated content (curl + human check)"
fi
```

---

## `scripts/indexnow_ping.py` — IndexNow Notification

```python
#!/usr/bin/env python3
"""
IndexNow notification script.
Reads URLs from dist/sitemap.xml and pings the IndexNow hub
(which distributes to Bing, Yandex, Seznam, Naver).

Bing's index is what ChatGPT web search runs on.
This is the fastest path from publish to AI-visible.

Setup (one-time):
  1. Generate a key: openssl rand -hex 32
  2. Create public/<your-key>.txt containing just the key
  3. Deploy the site — key must be live at https://your-site.com/<key>.txt
"""

import json
import re
import subprocess
import sys
import os

# ─── Configuration ────────────────────────────────────────────────────────────
HOST         = "your-site.com"           # ← replace with your domain
KEY          = "your-hex-key-here"       # ← replace with your IndexNow key
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT     = "https://api.indexnow.org/indexnow"  # central hub → distributes to all engines

def get_urls_from_sitemap():
    """Read URLs from the just-generated sitemap in dist/."""
    # Try dist/sitemap.xml first (just generated); fall back to public/sitemap.xml
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    for candidate in [
        os.path.join(project_root, "dist", "sitemap.xml"),
        os.path.join(project_root, "public", "sitemap.xml"),
    ]:
        if os.path.exists(candidate):
            xml = open(candidate).read()
            urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
            if urls:
                print(f"  Reading URLs from {os.path.relpath(candidate, project_root)}")
                return urls

    raise FileNotFoundError("No sitemap.xml found in dist/ or public/")

def ping(urls):
    """Submit URLs to IndexNow hub via curl (avoids urllib UA blocks on some endpoints)."""
    body = {
        "host":        HOST,
        "key":         KEY,
        "keyLocation": KEY_LOCATION,
        "urlList":     urls,
    }

    result = subprocess.run(
        [
            "curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
            "-X", "POST", ENDPOINT,
            "-H", "Content-Type: application/json; charset=utf-8",
            "-d", json.dumps(body),
        ],
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()

def main():
    # Support single-URL mode: python3 scripts/indexnow_ping.py https://your-site.com/page/
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
        print(f"  Single-URL ping: {urls}")
    else:
        urls = get_urls_from_sitemap()
        print(f"  Pinging {len(urls)} URLs from sitemap...")

    # IndexNow accepts max 10,000 URLs per batch request
    BATCH_SIZE = 10000
    for i in range(0, len(urls), BATCH_SIZE):
        batch = urls[i:i + BATCH_SIZE]
        code = ping(batch)
        status = {
            "200": "accepted",
            "202": "accepted (queued)",
            "403": "FAILED — key file not found at " + KEY_LOCATION,
            "422": "FAILED — URL/host mismatch (check HOST setting)",
            "429": "FAILED — rate limited",
        }.get(code, f"unexpected HTTP {code}")
        print(f"  Batch {i // BATCH_SIZE + 1}: HTTP {code} — {status}")

        if code not in ("200", "202"):
            print(f"\n  ERROR: IndexNow ping failed.")
            print(f"  Common causes:")
            print(f"    403: The key file must be live at {KEY_LOCATION}")
            print(f"    422: The HOST in this script must match the domain in the URL list")
            print(f"    429: You've been rate-limited. Wait 1 hour and retry.")
            sys.exit(1)

if __name__ == "__main__":
    main()
```

---

## Environment Variables Reference

Store these in your shell environment or a `.env` file (never commit to source control):

```bash
# Cloudflare Pages deploy
export CF_EMAIL="account@example.com"
export CF_KEY="your-global-api-key"        # Global API Key — NOT a scoped token
export CF_ACCT="your-account-id"           # Dashboard → My Profile → API Tokens → Account ID
export CF_ZONE="your-zone-id"              # Dashboard → domain → Overview → Zone ID
export CF_PROJECT="your-pages-project-name"

# Optional: load from .env file if using direnv or dotenv
# In .env (gitignored):
# CF_EMAIL=...
# CF_KEY=...
```

**Why Global API Key, not a scoped token?**
Cloudflare's scoped API tokens do not reliably include Pages deploy permissions. A deployment with a scoped token may fail silently or with a cryptic auth error. Use the Global API Key stored as environment variables. The Global Key has full account access — keep it in a password manager, never in source code.

---

## Cloudflare Pages `_headers` — Cache Rules

Place this file at `public/_headers` (deployed with your site):

```
# Vite content-hashed assets — safe for permanent cache.
# Vite renames these on every rebuild (e.g. index-Bq3fK7.js → index-Xq9mR2.js).
# When the filename changes, browsers fetch fresh. immutable is safe here.
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

# HTML files MUST be short-lived.
# HTML references the hashed asset filenames. Keeping HTML fresh means browsers
# always load the latest asset URLs after a deploy.
# WARNING: immutable on HTML = returning visitors run old JavaScript forever.
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

# Sitemap and llms.txt — check weekly
/sitemap.xml
  Cache-Control: public, max-age=86400, must-revalidate

/llms.txt
  Cache-Control: public, max-age=86400, must-revalidate

# robots.txt — check daily (search engines hit this frequently)
/robots.txt
  Cache-Control: public, max-age=3600, must-revalidate
```

**The immutable trap (documented failure mode):**
`immutable` tells the browser: "never check for a new version of this file." This is correct for Vite's `/assets/*` output because Vite changes the filename on every rebuild. If the filename changes, the browser fetches the new file. If the filename does NOT change (manually managed files, or any file outside Vite's output), `immutable` causes returning visitors to run old JavaScript forever — their browser will refuse to check for an update. Only use `immutable` on content-hashed filenames.

---

## Cloudflare Pages `_redirects` — SPA Routing + 404 Handling

Place at `public/_redirects`:

```
# SPA fallback — serve index.html for unknown paths so React Router can handle them.
# The prerender script generates dist/[slug]/index.html for known routes,
# so only truly unknown paths hit this fallback.
/*    /index.html    200

# Explicit 301 redirects (add as needed):
# /old-slug/    /new-slug/    301
```

**Important:** The `_redirects` fallback rule (`/* → /index.html 200`) serves the SPA shell for unknown paths — which means unknown paths return HTTP 200 instead of 404. This is a soft-404 and wastes crawl budget. Fix: generate a real `dist/404.html` during prerender (the prerender script does this). Cloudflare Pages will serve `404.html` with a 404 status for any path that doesn't have a matching file in dist/ AND doesn't have a `_redirects` rule.

To be explicit about the 404 behavior:
```
/*    /404.html    404
```

Or use the SPA fallback (for React Router to handle the not-found UI) and rely on the prerendered pages covering all valid routes.

---

## Preview vs Production Deployments

| Step | Preview | Production |
|------|---------|------------|
| `npm run build` | ✓ | ✓ |
| `python3 scripts/prerender.py` | ✓ | ✓ |
| `wrangler pages deploy --branch=preview` | ✓ | — |
| `wrangler pages deploy` (default branch) | — | ✓ |
| Cloudflare cache purge | ✓ | ✓ |
| IndexNow ping | — | ✓ |

Preview deployments get a unique URL (e.g. `abc123.your-project.pages.dev`). Use these for testing changes before they go live. Never submit a preview URL to IndexNow.

---

## Post-Deploy Verification Checklist

Run these checks after every production deployment:

```bash
DOMAIN="your-site.com"

# 1. Live site returns content (not the SPA shell)
curl -s https://$DOMAIN/ | grep -c "<h1"
# Expected: 1 or more

# 2. A content page returns unique content
curl -s https://$DOMAIN/some-page/ | grep "<title"
# Expected: the page's unique title, NOT the generic app title

# 3. AI crawlers are not blocked
curl -A "GPTBot/1.1" -s https://$DOMAIN/ | grep -c "<h1"
# Expected: 1 or more (0 = Cloudflare Bot Fight Mode is blocking AI crawlers)

# 4. Unknown path returns 404 status
curl -o /dev/null -w "%{http_code}" https://$DOMAIN/definitely-not-a-real-page-12345/
# Expected: 404

# 5. JSON-LD schema is in the HTML
curl -s https://$DOMAIN/ | grep -c "application/ld+json"
# Expected: 1 or more

# 6. sitemap.xml is accessible
curl -o /dev/null -w "%{http_code}" https://$DOMAIN/sitemap.xml
# Expected: 200

# 7. IndexNow key file is accessible
curl -o /dev/null -w "%{http_code}" https://$DOMAIN/your-key-here.txt
# Expected: 200 (if 404, IndexNow pings will fail with HTTP 403)

# 8. llms.txt is accessible
curl -o /dev/null -w "%{http_code}" https://$DOMAIN/llms.txt
# Expected: 200
```

---

## One-Time Setup Checklist

Complete these once per project before using the deploy pipeline:

- [ ] Cloudflare Pages project created in dashboard
- [ ] Custom domain added and DNS configured (or using `*.pages.dev` subdomain)
- [ ] Zone ID noted from dashboard (needed for cache purge)
- [ ] Global API Key retrieved from Cloudflare profile
- [ ] Environment variables set: `CF_EMAIL`, `CF_KEY`, `CF_ACCT`, `CF_ZONE`, `CF_PROJECT`
- [ ] `public/_headers` created with cache rules
- [ ] `public/_redirects` created with SPA fallback or 404 rule
- [ ] IndexNow key generated (`openssl rand -hex 32`)
- [ ] `public/<key>.txt` created with the key
- [ ] IndexNow key and HOST updated in `scripts/indexnow_ping.py`
- [ ] Cloudflare Bot Fight Mode checked — verified AI crawlers not blocked
- [ ] GSC domain property and URL-prefix property created, sitemap submitted
- [ ] Bing Webmaster Tools property created, sitemap submitted
- [ ] First deploy run in preview mode to verify all steps work
- [ ] First production deploy to confirm live site and IndexNow ping

---

## Common Failures and Fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `wrangler: error deploying` | Scoped token lacks Pages permissions | Use Global API Key via `CF_KEY` env var |
| Cache purge returns `success: false` | Wrong Zone ID | Find Zone ID in dashboard → domain → Overview |
| IndexNow returns HTTP 403 | Key file not live or wrong path | Deploy first, then verify `curl https://your-site.com/<key>.txt` returns the key |
| IndexNow returns HTTP 422 | HOST mismatch | The `HOST` in `indexnow_ping.py` must match the domain part of every URL in the sitemap |
| AI crawlers return empty H1 | Cloudflare Bot Fight Mode | Add WAF skip rule for GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended |
| Returning users see old site | Cache purge not run or failed | Re-run purge via curl or Cloudflare dashboard |
| Prerender produces tiny HTML files | SPA shell captured instead of rendered content | Check React Router registration; check for TypeScript errors in page files |
| 404 pages return 200 | `dist/404.html` not generated or `_redirects` misconfigured | Run prerender script (generates 404.html); update `_redirects` |
