## Batch 143 (Biweekly mortgage calculator smart presets)

Date: 2026-01-31

Scope: improve biweekly mortgage calculator clarity with presets and extra-payment visibility.

### URLs updated
- /calculators/biweekly-mortgage-payment-calculator

### Changes applied (high level)
- Added quick presets for loan amount, rate, and term.
- Added quick presets for custom extra monthly payments.
- Added KPIs for base monthly P&I and extra monthly applied.
- Reused clamped inputs for consistent calculations.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260131-113820`
