## Batch 017 (Extra principal calculator intent)

Date: 2026-01-28

Scope: align extra principal calculator copy and fix non-ASCII quote artifacts.

### URLs upgraded
- /calculators/additional-principal-payment-calculator
- /calculators/extra-payment-calculator

### Changes applied (high level)
- Updated titles/descriptions and FAQ wording to match "extra principal payment calculator" intent.
- Normalized quote artifacts to ASCII in checklist/pitfalls.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-144552` (issues.csv empty)
