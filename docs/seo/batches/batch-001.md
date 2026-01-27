# SEO Batch 001 (2026-01-27)

## Scope (≤10 URLs targeted)
- `/guides` (internal linking to resolve orphan guides)
- `/guides/credit-card-interest-calculator-payoff` (title length)
- `/guides/how-credit-card-interest-is-calculated` (title + description length)
- `/guides/mortgage-extra-principal-calculator` (title + description length)
- `/guides/principal-only-extra-payments` (title + encoding/typography cleanup)
- `/calculators/apr-calculator` (description length)

## Changes
- Internal linking: added missing guide links on `/guides` to eliminate orphaned core guides (APR + credit card + APR-vs-rate + mortgage extra principal).
- Meta fixes:
  - Shortened long titles to stay within typical SERP limits.
  - Shortened overlong descriptions where flagged.
- Content quality: rewrote mojibake quotes/apostrophes on `/guides/principal-only-extra-payments` to standard ASCII quotes, improving readability and trust.
- Schema scripts: added `is:inline` on JSON-LD scripts in layouts to remove Astro check hints (no behavior change).
- Removed unused `SITE` imports on several guides to keep `astro check` clean.

## Validation (local)
- `npm run check`: 0 errors / 0 warnings / 0 hints
- `npm run build`: success (one upstream Vite warning from `node_modules/astro/.../remotePattern.js`, not from project code)
- Local crawl audit (preview): run with `--expected-origin https://practicalfinancetools.com` to avoid localhost canonical noise.

## Validation (live)
- Live crawl audit: non-200 URLs = 0, canonical mismatch = 0, orphan pages = 0.
- Remaining warnings (description length only, 11 URLs):
  - `/calculators/extra-payment-calculator`
  - `/contact`
  - `/guides/apr-with-origination-fee`
  - `/guides/biweekly-mortgage-program-fees`
  - `/guides/extra-mortgage-payment-calculator`
  - `/guides/mortgage-lump-sum-10000` (noindex)
  - `/guides/mortgage-lump-sum-5000` (noindex)
  - `/guides/pay-300-extra-on-mortgage` (noindex)
  - `/guides/pmi-removal-vs-extra-principal`
  - `/guides/why-minimum-payments-take-so-long`
  - `/terms`

## Audit artifacts (local only)
- `reports/seo-audit/run-002/` (live crawl baseline)
- `reports/seo-audit/local-run-004/` (post-change preview crawl)
 - `reports/seo-audit/run-003-live/` (post-deploy live crawl)
