# SEO Batch 002 (2026-01-27)

## Scope (11 URLs targeted)
- Meta description length fixes:
  - `/calculators/extra-payment-calculator`
  - `/contact` (noindex)
  - `/guides/apr-with-origination-fee`
  - `/guides/biweekly-mortgage-program-fees`
  - `/guides/extra-mortgage-payment-calculator`
  - `/guides/mortgage-lump-sum-10000` (noindex)
  - `/guides/mortgage-lump-sum-5000` (noindex)
  - `/guides/pay-300-extra-on-mortgage` (noindex)
  - `/guides/pmi-removal-vs-extra-principal`
  - `/guides/why-minimum-payments-take-so-long`
  - `/terms`

## Changes
- SEO meta: rewrote/shortened/expanded descriptions to stay within typical SERP length ranges while keeping intent-specific wording.
- Content quality: normalized a few problematic smart punctuation / symbols to plain ASCII in two guides to reduce encoding risk across environments.
- Tooling: `scripts/seo/seo-audit.mjs` now rewrites sitemap `<loc>` origins from `--expected-origin` to `--base` when they differ (improves local preview audits without depending on the live site).
- Tooling: audit now gracefully falls back when sitemaps are temporarily unavailable (still runs deep crawl seed checks).

## Validation (local)
- `npm test`: pass
- `npm run check`: 0 errors / 0 warnings / 0 hints
- `npm run build`: success (one upstream Vite warning from `node_modules/astro/.../remotePattern.js`, not from project code)
- Local crawl audit (preview):
  - Output: `reports/seo-audit/local-run-006/`
  - Issues: none (`issues.csv` header only)

## Validation (live)
- Pending deploy. After Vercel deploy completes, run:
  - `node scripts/seo/seo-audit.mjs --base https://practicalfinancetools.com --expected-origin https://practicalfinancetools.com --out reports/seo-audit/run-xxx-live`
