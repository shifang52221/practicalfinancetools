## Batch 019 (Credit card amortization intent)

Date: 2026-01-28

Scope: align credit card payoff content with amortization-related queries.

### URLs upgraded
- /calculators/credit-card-payoff-calculator
- /guides/calculate-credit-card-payoff

### Changes applied (high level)
- Added an FAQ that explains the payoff schedule as an amortization-style table.
- Added a short note and link to the calculator for the full month-by-month schedule.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-161939` (issues.csv empty)
