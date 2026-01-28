## Batch 021 (One extra payment + amortization copy)

Date: 2026-01-28

Scope: align "one extra payment per year" guide copy with calculator intent and normalize apostrophes in amortization guide.

### URLs upgraded
- /guides/one-extra-mortgage-payment-per-year
- /guides/amortization-with-extra-payments

### Changes applied (high level)
- Updated CTA and copy to match "one extra mortgage payment per year calculator" intent.
- Normalized non-ASCII apostrophes to ASCII in the amortization guide.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-183342` (issues.csv empty)
