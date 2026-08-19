/**
 * page-seo-data-model.ts
 *
 * Type-safe data model for SEO pages in a static/prerendered site.
 *
 * Every SEO page exports one `SeoPage` object. The layout component
 * reads this object to inject <title>, <meta>, canonical, JSON-LD,
 * breadcrumbs, FAQs, and all structured content. Wrong field shape
 * fails at compile time, not at runtime.
 *
 * Usage:
 *   1. Copy this file into your project as `src/seo/types.ts` (or equivalent).
 *   2. Create one `.ts` file per SEO page in `src/seo/pages/`.
 *   3. Auto-discover pages via `import.meta.glob` (Vite) or equivalent.
 *   4. Pass each `SeoPage` to your layout component for rendering.
 *
 * See `meta-title-description-formulas.md` for title/meta copy guidelines.
 * See `playbook/03-site-build-and-tech-stack.md` for auto-wiring setup.
 */

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

/** A single FAQ pair. Rendered on-page AND emitted as FAQPage JSON-LD. */
export interface FaqItem {
  /** The question. Write as a natural-language question: "What is X?" */
  q: string;
  /** The answer. Keep ≤300 words. Full sentences. No HTML. */
  a: string;
}

/** A level-3 content sub-section within a ContentBlock. */
export interface SubBlock {
  /** H3 heading text. */
  h3: string;
  /** Paragraph strings. One string = one paragraph. */
  body: string[];
}

/**
 * A top-level content section (H2).
 * Use `body` for paragraphs, `bullets` for bulleted lists, `subBlocks` for H3 sections.
 * Mix freely; all three can coexist in one block.
 */
export interface ContentBlock {
  /** H2 heading text. */
  h2: string;
  /** Body paragraphs. One string = one `<p>`. */
  body?: string[];
  /** Bulleted list items. Rendered as `<ul><li>`. */
  bullets?: string[];
  /** H3 sub-sections within this H2 block. */
  subBlocks?: SubBlock[];
}

/**
 * An internal link rendered in the "Related Pages" section.
 * Used to enforce hub-and-spoke equity distribution.
 */
export interface RelatedLink {
  /** Visible link label. Use descriptive anchor text — never "click here". */
  label: string;
  /** Absolute path from site root. Example: "/guides/how-to-vet-a-vendor" */
  href: string;
  /** Optional one-sentence description shown below the link. */
  desc?: string;
}

/**
 * A single breadcrumb step.
 * The layout component prepends Home automatically — do not include it here.
 * Example: [{ label: "Guides", href: "/guides" }, { label: "This Guide", href: "/guides/this-guide" }]
 */
export interface Crumb {
  label: string;
  href: string;
}

/**
 * A comparison table for vendor review or comparison pages.
 * Rendered as `<table>` and optionally emitted in structured data.
 */
export interface ComparisonTable {
  /** Column headers. Example: ["Vendor", "Price", "Exclusivity", "Real-Time", "Verdict"] */
  headers: string[];
  /** Data rows. Each row must have the same number of cells as `headers`. */
  rows: string[][];
}

// ---------------------------------------------------------------------------
// Page type taxonomy
// ---------------------------------------------------------------------------

/**
 * Intent bucket for the page. Drives CTA density, content depth, schema type,
 * and internal linking behavior in the layout component.
 *
 * money      — Core commercial/transactional page. Max CTA density.
 * comparison — Vendor review, "best X", or "A vs B" editorial. CTA at bottom only.
 * guide      — Informational/definitional. Builds E-E-A-T + AI citation authority.
 * leadtype   — Sub-product or service-variant page. Mirrors money page structure.
 * state      — Geo-programmatic page (one per city/state). Long-tail geographic coverage.
 */
export type PageType = "money" | "comparison" | "guide" | "leadtype" | "state";

// ---------------------------------------------------------------------------
// Core SeoPage interface
// ---------------------------------------------------------------------------

/**
 * The complete data model for one SEO page.
 *
 * One file per page. Every field here drives something in the rendered output:
 * <title>, <meta description>, canonical, OG tags, JSON-LD schema, breadcrumbs,
 * H1, body content, FAQs, internal links.
 *
 * Field-level guidelines:
 *
 *   title           — 30–65 chars. Keyword FIRST. "| BRAND" LAST. Unique per page.
 *   metaDescription — 70–160 chars (target ≤155). CTR pitch, not keyword list. Unique per page.
 *   h1              — Exact target keyword. One per page. Do not repeat title verbatim.
 *   directAnswer    — 40–60 words. Lead with the answer. Feeds AI Overviews + featured snippets.
 *   faqs            — Render expanded by default (not collapsed). Collapsed = not indexed by AI.
 *   breadcrumb      — Excludes home (prepended automatically). Mirrors URL hierarchy.
 */
export interface SeoPage {
  /**
   * URL slug — the path segment after the domain root.
   * Examples: "plumbing-services-chicago", "vendors/acme-software", "guides/how-to-vet-a-vendor"
   * No leading slash. No trailing slash. Lowercase, hyphenated.
   */
  slug: string;

  /**
   * Intent bucket. Controls layout behavior, CTA placement, and schema type.
   * See PageType above.
   */
  pageType: PageType;

  /**
   * <title> tag content.
   * Rules: 30–65 chars. Keyword FIRST. "| BRAND" LAST.
   * Example: "Car Accident Leads for Attorneys | YourBrand"
   */
  title: string;

  /**
   * <meta name="description"> content.
   * Rules: 70–160 chars (≤155 to avoid mid-sentence truncation). CTR-focused human pitch.
   * Not a ranking signal — write for clicks, not bots.
   */
  metaDescription: string;

  /**
   * <meta name="keywords"> content.
   * Minor signal. Include anyway. Comma-separated.
   * Example: "car accident leads, attorney leads, personal injury leads"
   */
  keywords?: string;

  /**
   * <h1> text. Exactly one per page. Must match the page's primary search intent 1:1.
   * Not a copy of `title` — a variation. Can be slightly longer or question-form.
   */
  h1: string;

  /**
   * Small label displayed above the H1.
   * Examples: "Vendor Review", "State Coverage", "2026 Comparison"
   * Optional. Used on comparison and state pages.
   */
  eyebrow?: string;

  /**
   * First visible paragraph on the page. 40–60 words.
   * Lead with the direct answer to the page's core question.
   * This field is extracted by AI Overview systems and featured snippets.
   * Short sentences. One idea per sentence. No vague intros ("In this article...").
   */
  directAnswer: string;

  /**
   * Structured body content. Each item is an H2 section.
   * The layout renders: H2 → paragraphs → bullets → H3 subblocks.
   * Minimum blocks by page type:
   *   money      — 5 blocks (what it is, process, coverage, delivery, why us)
   *   comparison — 4 blocks (methodology, comparison table, per-vendor deep-dives, best-for)
   *   guide      — 6+ blocks (answer, context, steps, examples, FAQ, resources)
   *   leadtype   — 4 blocks (what this type is, use cases, delivery, FAQ)
   *   state      — 3 blocks (coverage, local context, how to get started)
   */
  blocks: ContentBlock[];

  /**
   * Optional comparison table for vendor/comparison pages.
   * Rendered as a styled HTML table. 5–7 columns max for readability.
   */
  comparisonTable?: ComparisonTable;

  /**
   * FAQ pairs. Rendered on-page expanded by default.
   * Also emitted as FAQPage JSON-LD.
   * Minimum: 5 FAQ pairs per page. Target: 8–12 for guide pages.
   * IMPORTANT: Render expanded, never in a collapsed accordion.
   * Collapsed FAQ content is not indexed by all AI crawlers.
   */
  faqs: FaqItem[];

  /**
   * Internal links for the "Related Pages" section.
   * Hub pages: link down to 5–8 spoke pages.
   * Spoke pages: link up to hub + 2–3 lateral neighbors.
   * Use descriptive anchor text. Never "click here".
   */
  related: RelatedLink[];

  /**
   * Breadcrumb trail for BreadcrumbList JSON-LD and visual breadcrumb nav.
   * DO NOT include Home — it is prepended automatically.
   * Mirror the URL hierarchy exactly.
   * Example for /guides/how-to-vet-a-vendor:
   *   [{ label: "Guides", href: "/guides" }, { label: "How to Vet a Vendor", href: "/guides/how-to-vet-a-vendor" }]
   */
  breadcrumb: Crumb[];

  /**
   * ISO 8601 date string. Required for guide and comparison pages (Article schema).
   * Example: "2026-01-15"
   * Update `dateModified` whenever the page content is refreshed.
   */
  datePublished?: string;

  /**
   * ISO 8601 date string. Update whenever the page is meaningfully refreshed.
   * Content refresh (2 new paragraphs + 2 list items + updated dateModified)
   * can move a stagnant indexed page from minimal traffic to thousands of uniques/month.
   */
  dateModified?: string;

  /**
   * CTA section heading displayed above the conversion form or button.
   * Example: "Get Exclusive Leads for Your Practice"
   */
  ctaHeading?: string;

  /**
   * CTA section subheading or supporting copy.
   * Example: "No contracts. Real-time delivery. Cancel anytime."
   */
  ctaSub?: string;

  /**
   * Set to true to add <meta name="robots" content="noindex"> to this page.
   * Use for: thank-you pages, funnel/conversion paths, legal pages, admin pages.
   * Never noindex pages intended to rank.
   * Default: false (all pages indexed unless this is true).
   */
  noIndex?: boolean;

  /**
   * Set to true if this page includes an interactive calculator or tool widget.
   * Used by the layout to load calculator-specific JS and structured data.
   */
  calculator?: boolean;

  /**
   * Additional JSON-LD schema objects to inject alongside the auto-generated schema.
   * The layout already emits: WebPage, BreadcrumbList, FAQPage, Article (for guides),
   * and Organization (sitewide). Use this field to add LocalBusiness, Product, etc.
   * Each item is a complete JSON-LD object (will be wrapped in <script type="application/ld+json">).
   */
  extraSchema?: Record<string, unknown>[];
}

// ---------------------------------------------------------------------------
// Example page (for reference — delete before shipping)
// ---------------------------------------------------------------------------

/*
import type { SeoPage } from "../types";

const examplePage: SeoPage = {
  slug: "your-service-your-city",
  pageType: "money",
  title: "Your Service in Your City | YourBrand",
  metaDescription: "Get exclusive, verified [service] leads delivered in real time. No shared leads, no contracts. Find out how it works.",
  keywords: "service keyword, service city, service variant",
  h1: "Your Service in Your City",
  directAnswer:
    "Your service description in 40–60 words that answers the core question directly. Lead with the answer. No vague intro. Short sentences.",
  blocks: [
    {
      h2: "What This Service Covers",
      body: [
        "First paragraph explaining the service.",
        "Second paragraph with supporting detail.",
      ],
    },
    {
      h2: "How the Process Works",
      bullets: [
        "Step one.",
        "Step two.",
        "Step three.",
      ],
    },
  ],
  faqs: [
    { q: "What is [service]?", a: "Direct answer in full sentences." },
    { q: "How much does [service] cost?", a: "Direct answer with specifics." },
    { q: "How quickly will I see results?", a: "Direct answer with timeline." },
    { q: "Do you offer exclusivity?", a: "Direct answer." },
    { q: "How do I get started?", a: "Direct answer with CTA." },
  ],
  related: [
    { label: "Service Variant A", href: "/service-variant-a", desc: "Narrow use case for X." },
    { label: "Service in Nearby City", href: "/service-nearby-city", desc: "Coverage in neighboring area." },
    { label: "How to Vet a Vendor", href: "/guides/how-to-vet-a-vendor", desc: "Buyer's guide for this category." },
  ],
  breadcrumb: [
    { label: "Services", href: "/services" },
    { label: "Your Service in Your City", href: "/your-service-your-city" },
  ],
  datePublished: "2026-01-01",
  dateModified: "2026-01-01",
  ctaHeading: "Get Started Today",
  ctaSub: "No contracts. Verified leads. Cancel anytime.",
};

export default examplePage;
*/
