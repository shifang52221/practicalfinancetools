## Batch 018 (Credit card payoff intent links)

Date: 2026-01-28

Scope: add user-friendly guide links for credit card interest/payoff intent on the main payoff calculator.

### URLs upgraded
- /calculators/credit-card-payoff-calculator
- /calculators/additional-principal-payment-calculator
- /calculators/extra-payment-calculator

### Changes applied (high level)
- Added guide links for "interest calculator payoff" and "payment payoff" under related guides.
- Aligned extra principal/extra payment calculator copy to query language and removed non-ASCII artifacts.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-145651` (issues.csv empty)
