## Batch 020 (Amortization + extra payments intent)

Date: 2026-01-28

Scope: align amortization schedule copy with extra payment intent and remove non-ASCII artifacts.

### URLs upgraded
- /calculators/amortization-schedule-calculator

### Changes applied (high level)
- Added references to amortization with extra payments and extra payment calculator in description/intro/FAQ.
- Normalized non-ASCII quote artifacts in copy.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-172031` (issues.csv empty)
