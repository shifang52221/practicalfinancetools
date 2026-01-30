## Batch 124 (Calculator enhancement)

Date: 2026-01-30

Scope: add computed example outputs to core calculator pages.

### URLs updated
- /calculators/additional-principal-payment-calculator
- /calculators/amortization-schedule-calculator
- /calculators/apr-calculator
- /calculators/biweekly-mortgage-payment-calculator
- /calculators/debt-avalanche-calculator
- /calculators/debt-snowball-calculator
- /calculators/debt-to-income-calculator
- /calculators/minimum-payment-payoff-calculator
- /calculators/mortgage-payment-calculator
- /calculators/rent-vs-buy-calculator

### Changes applied (high level)
- Added computed example tables (inputs and outputs) using existing calc helpers.
- Updated last-updated dates on enhanced calculator pages.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-134208`
