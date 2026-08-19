# Prerender Pattern — SPA to Crawlable Static HTML

**Purpose:** Convert a JavaScript single-page application (React, Vue, Svelte) into static HTML files that search engines and AI crawlers can read without executing JavaScript. This pattern is the bridge between the dev experience of a SPA and the indexability of a static site.

**When to use:** When your site is built as a client-side-rendered SPA and you cannot or will not switch to a true SSG framework (Astro, Next.js static export, Eleventy). If starting fresh, Astro SSG is simpler and produces better Lighthouse scores — use prerender only if you already have a SPA or need interactive components alongside static content.

---

## The Pattern

```
[npm run build]
      ↓
dist/index.html  ← SPA shell (identical for every route)
      ↓
[python3 scripts/prerender.py]
      ↓
dist/
├── index.html                ← Home page (prerendered)
├── some-page/
│   └── index.html            ← /some-page/ (prerendered)
├── guides/
│   └── how-to-do-x/
│       └── index.html        ← /guides/how-to-do-x/ (prerendered)
├── 404.html                  ← Real not-found page (prevents soft-404s)
├── sitemap.xml               ← Auto-regenerated from route list
└── llms.txt                  ← Auto-regenerated AI crawler summary
```

Each route becomes `dist/[slug]/index.html`. Cloudflare Pages (and any static host with directory index serving) serves `dist/some-page/index.html` at the URL `/some-page/`.

---

## Why Prerendering Is Required for SPAs

A plain `vite build` (or any SPA bundler output) produces a single `dist/index.html` that looks like:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <!-- NO page-specific meta, NO H1, NO content -->
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index-Bq3fK7.js"></script>
</body>
</html>
```

Google, Bing, GPTBot, PerplexityBot, and all other crawlers receive this empty shell for **every URL**. They see:
- The same `<title>` on every page
- No H1, no content, no meta description
- No structured data / JSON-LD

Result: Google cannot distinguish your pages from each other. They may all index with the same title tag and zero keyword relevance. Client-side rendering is an SEO death sentence for content sites.

---

## Complete Implementation

### `scripts/prerender.py`

```python
#!/usr/bin/env python3
"""
SPA prerender script — converts every route to static HTML.
Generates sitemap.xml and llms.txt as side effects.

Requirements:
  pip install playwright
  playwright install chromium

Usage:
  python3 scripts/prerender.py
  (Run AFTER npm run build, BEFORE wrangler pages deploy)
"""

import subprocess, time, os, glob, re, http.server, socketserver, threading, datetime
from playwright.sync_api import sync_playwright

# ─── Configuration ────────────────────────────────────────────────────────────
ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
DIST  = os.path.join(ROOT, "dist")
PORT  = 4188
SITE  = "https://your-site.com"  # ← replace with your domain
BRAND = "Your Brand"              # ← replace with your brand name

# Routes that exist outside the src/seo/pages/ auto-discovery system
EXTRA_ROUTES = ["/privacy", "/terms"]

# Routes where page content is gated (exclude from sitemap)
NOINDEX_PATTERNS = ["/apply", "/qualify", "/thank-you", "/onboarding"]

# ─── Route discovery ──────────────────────────────────────────────────────────
def discover_routes():
    """Read slugs directly from TypeScript source files (no build-step dependency)."""
    pages = []
    pattern = os.path.join(ROOT, "src", "seo", "pages", "*.ts")
    for f in sorted(glob.glob(pattern)):
        txt = open(f).read()
        m_slug    = re.search(r'slug:\s*"([^"]+)"', txt)
        m_noindex = re.search(r'noIndex:\s*true', txt)
        m_type    = re.search(r'pageType:\s*"([^"]+)"', txt)
        m_title   = re.search(r'title:\s*"([^"]+)"', txt) or re.search(r'h1:\s*"([^"]+)"', txt)
        if not m_slug:
            continue
        pages.append({
            "slug":    m_slug.group(1),
            "noindex": bool(m_noindex),
            "type":    m_type.group(1) if m_type else "page",
            "title":   (m_title.group(1) if m_title else m_slug.group(1)).replace(f" | {BRAND}", ""),
        })
    return pages

# ─── SPA-fallback static file server ─────────────────────────────────────────
class SpaFallbackHandler(http.server.SimpleHTTPRequestHandler):
    """Serves dist/ like a SPA host: unknown paths → index.html (the app shell)."""
    def translate_path(self, path):
        p = super().translate_path(path.split("?")[0])
        if os.path.isdir(p):
            idx = os.path.join(p, "index.html")
            return idx if os.path.exists(idx) else p
        if not os.path.exists(p) and "." not in os.path.basename(p):
            return os.path.join(DIST, "index.html")  # SPA fallback
        return p
    def log_message(self, *a):
        pass  # suppress request logs during prerender

def start_server():
    os.chdir(DIST)
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", PORT), SpaFallbackHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    time.sleep(1)  # wait for server to bind
    return httpd

# ─── Scroll simulation ────────────────────────────────────────────────────────
def scroll_full_page(page):
    """
    Scroll in 600px steps to trigger lazy-loaded sections.
    Settle at bottom, then return to top (important for scroll-triggered animations).
    Use page.content() not page.inner_html() — the former includes full <!DOCTYPE> and <head>.
    """
    height = page.evaluate("document.body.scrollHeight")
    for y in range(0, int(height) + 1200, 600):
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(120)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(600)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(200)
    return page.content()

# ─── Prerender a single route ─────────────────────────────────────────────────
def prerender_route(page, route, out_path):
    url = f"http://localhost:{PORT}{route}"
    page.goto(url, wait_until="networkidle", timeout=45000)
    html = scroll_full_page(page)

    # Sanity checks
    h1_count = html.lower().count("<h1")
    if h1_count == 0:
        print(f"  WARNING: no <h1> found in {route} (H1 count: {h1_count})")
    if len(html) < 20000:
        print(f"  WARNING: suspiciously small output for {route} ({len(html)} bytes)")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  ✓ {route} → {os.path.relpath(out_path, ROOT)} ({len(html):,} bytes)")

# ─── Sitemap generation ───────────────────────────────────────────────────────
def generate_sitemap(pages):
    today = datetime.date.today().isoformat()
    LEGAL_ROUTES = {"/privacy", "/terms"}

    def changefreq(r):
        if r == "/": return "daily"
        if r in LEGAL_ROUTES: return "monthly"
        return "weekly"

    def priority(r):
        if r == "/": return "1.0"
        if r in LEGAL_ROUTES: return "0.3"
        return "0.8"

    def loc(r):
        if r == "/": return f"{SITE}/"
        return f"{SITE}{r}/"

    indexable_routes = ["/"] + [f"/{p['slug']}" for p in pages if not p["noindex"]] + list(LEGAL_ROUTES)

    entries = "\n".join(
        f"  <url>\n"
        f"    <loc>{loc(r)}</loc>\n"
        f"    <lastmod>{today}</lastmod>\n"
        f"    <changefreq>{changefreq(r)}</changefreq>\n"
        f"    <priority>{priority(r)}</priority>\n"
        f"  </url>"
        for r in indexable_routes
    )

    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'{entries}\n'
        '</urlset>\n'
    )

    # Write to both dist/ (runtime) and public/ (for next build tooling)
    for path in [os.path.join(DIST, "sitemap.xml"), os.path.join(ROOT, "public", "sitemap.xml")]:
        with open(path, "w") as f:
            f.write(sitemap)

    print(f"  ✓ sitemap.xml — {len(indexable_routes)} URLs")

# ─── llms.txt generation ──────────────────────────────────────────────────────
def generate_llms_txt(pages):
    """Generate machine-readable site summary for AI crawlers."""
    by_type = {}
    for p in pages:
        if not p["noindex"]:
            by_type.setdefault(p["type"], []).append(p)

    def section(heading, page_type):
        items = sorted(by_type.get(page_type, []), key=lambda x: x["slug"])
        if not items:
            return ""
        lines = "\n".join(f"- [{p['title']}]({SITE}/{p['slug']}/)" for p in items)
        return f"\n## {heading}\n{lines}\n"

    llms_content = (
        f"# {BRAND} — [One-line business description]\n\n"
        f"> [2–4 sentence description: what the business does, who it serves, "
        f"what makes it different, geographic coverage, and model.]\n\n"
        f"## What makes {BRAND} different\n"
        f"- [Differentiator 1]\n"
        f"- [Differentiator 2]\n"
        f"- [Differentiator 3]\n"
        + section("Services / Commercial Pages", "money")
        + section("Vendor Reviews & Comparisons", "comparison")
        + section("Guides & Resources", "guide")
        + section("Coverage by Location", "state")
        + "\n"
    )

    for path in [os.path.join(DIST, "llms.txt"), os.path.join(ROOT, "public", "llms.txt")]:
        with open(path, "w") as f:
            f.write(llms_content)

    print(f"  ✓ llms.txt — {sum(len(v) for v in by_type.values())} pages listed")

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    pages = discover_routes()
    routes = ["/"] + [f"/{p['slug']}" for p in pages] + EXTRA_ROUTES

    print(f"\nPrerendering {len(routes)} routes...")
    httpd = start_server()

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 900})

            # IMPORTANT: process home page LAST.
            # Home page = the SPA fallback shell. If prerendered first, navigating
            # to other routes during the same session may get the cached home HTML
            # before React Router rehydrates. This causes other routes to have the
            # home <title> baked in instead of their own title.
            ordered = [r for r in routes if r != "/"] + ["/"]

            for route in ordered:
                if route == "/":
                    out_path = os.path.join(DIST, "index.html")
                else:
                    slug = route.strip("/")
                    out_path = os.path.join(DIST, slug, "index.html")
                prerender_route(page, route, out_path)

            # Generate real 404.html — prevents soft-404s.
            # Without this, Cloudflare Pages returns your SPA shell (200 status) for
            # unknown paths, which Google treats as duplicate content.
            print("\nGenerating 404.html...")
            page.goto(
                f"http://localhost:{PORT}/__not_found_404__",
                wait_until="networkidle",
                timeout=45000
            )
            with open(os.path.join(DIST, "404.html"), "w") as f:
                f.write(page.content())
            print("  ✓ 404.html")

            browser.close()

    finally:
        httpd.shutdown()

    print("\nGenerating sitemap.xml and llms.txt...")
    generate_sitemap(pages)
    generate_llms_txt(pages)

    print(f"\nPrerender complete. {len(routes)} routes written to dist/")

if __name__ == "__main__":
    main()
```

---

## Key Implementation Notes

### Process home page last

The home page (`/`) is the SPA shell file — it's the same as `dist/index.html` produced by the build. If you prerender home first, Playwright may serve the already-prerendered home HTML when you navigate to other routes in the same browser session. This causes other routes to get the home `<title>` baked into their HTML.

Always process home last:
```python
ordered = [r for r in routes if r != "/"] + ["/"]
```

### Use `page.content()`, not `page.inner_html()`

`page.content()` returns the full `<!DOCTYPE html>...<head>...<body>...` document including the `<head>` tag where your title, meta, canonical, and JSON-LD live. `page.inner_html()` returns only the inner content of a selected element. For prerendering, you need the complete document.

### Scroll to trigger lazy-loaded content

Sections using `IntersectionObserver` or CSS animation triggers that fire on scroll will not be visible in the initial render. The scroll simulation (600px steps with pauses) triggers these sections before capturing the HTML:

```python
height = page.evaluate("document.body.scrollHeight")
for y in range(0, int(height) + 1200, 600):
    page.evaluate(f"window.scrollTo(0, {y})")
    page.wait_for_timeout(120)
page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
page.wait_for_timeout(600)
page.evaluate("window.scrollTo(0, 0)")
page.wait_for_timeout(200)
```

The final `scrollTo(0, 0)` is important: some scroll-triggered animations have forward-only state (they fire once when scrolled into view). Returning to the top ensures any top-of-page content is in final rendered state.

### Sanity checks after capture

Always verify the captured HTML before writing:
1. `<h1>` count must be ≥ 1 (if 0, React didn't render — wrong title will be baked in)
2. HTML byte length must be > 20,000 (a short page suggests the app shell was captured rather than rendered content)

```python
if html.lower().count("<h1") == 0:
    raise RuntimeError(f"No H1 found in {route} — check React rendering")
if len(html) < 20000:
    print(f"WARNING: short output for {route} ({len(html)} bytes)")
```

### Directory-style file structure

Write each route to `dist/[slug]/index.html` (directory style). Cloudflare Pages, Netlify, and most static hosts serve `dist/some-page/index.html` at the URL `/some-page/` automatically. The home page exception is `dist/index.html` (not `dist//index.html`).

---

## Verifying the Prerender Output

After running the prerender script, verify before deploying:

```bash
# 1. Check that pages exist with real content
ls dist/some-page/index.html
wc -c dist/some-page/index.html    # should be >20KB

# 2. Verify unique title tags across pages
grep -r "<title>" dist/ | grep -v ".js" | head -20
# Every line should show a different title

# 3. Verify H1 is present and unique on key pages
grep -A1 "<h1" dist/some-page/index.html | head -5

# 4. Verify 404.html exists and looks like a real 404 (not homepage)
grep -c "<h1" dist/404.html    # should be 1

# 5. Verify sitemap.xml was regenerated
cat dist/sitemap.xml | grep -c "<loc>"    # should match your page count

# 6. Check that noindex pages are NOT in the sitemap
grep "qualify\|onboarding\|apply" dist/sitemap.xml   # should return nothing

# 7. Confirm JSON-LD schema is baked into the HTML
grep -c "application/ld+json" dist/some-page/index.html   # should be 1+
```

---

## Common Pitfalls

**Deploying after `npm run build` but before `prerender.py`.** The build overwrites `dist/index.html` with a fresh SPA shell. If you deploy at this point, every page shows the empty shell. Always run prerender immediately before the deploy command, never before.

**Home page gets wrong title.** Cause: home was processed first in the route list, and subsequent routes inherited its cached render. Fix: always process home last.

**Short HTML output (< 20KB).** Cause: the SPA shell was captured instead of rendered content. Usually means React Router didn't mount, or the route isn't registered. Check: does the route exist in your React Router config? Is there a TypeScript error in the page data file that prevented it from loading?

**No H1 in output.** Cause: the component that renders H1 is not mounted when `networkidle` fires — it may be conditionally rendered after a data fetch or animation. Fix: add a `page.wait_for_selector("h1", timeout=10000)` call before `scroll_full_page()`.

**Soft-404s.** If `dist/404.html` is not generated, Cloudflare Pages returns the SPA shell (HTTP 200) for all unknown paths. Google sees this as duplicate content (same HTML as homepage). The 404.html generation step is not optional.

**Playwright not installed.** Run `pip install playwright && playwright install chromium` before using this script. On CI, add these to your build environment setup.

**`networkidle` timeout on heavy pages.** If a page has long-polling connections or never truly reaches `networkidle`, the prerender hangs. Fix: add `timeout=45000` (45 seconds) and catch the timeout exception — capture the page content at whatever state it's in after timeout.
