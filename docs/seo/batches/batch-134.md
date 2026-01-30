## Batch 134 (Mortgage payment calculator smart input + insights)

Date: 2026-01-31

Scope: improve mortgage payment calculator input flexibility and add richer, accurate totals.

### URLs updated
- /calculators/mortgage-payment-calculator

### Changes applied (high level)
- Added down payment mode toggle (amount vs percent) with synchronized display.
- Added total interest (P&I) and total housing cost estimates for the full term.
- Kept PITI + HOA + PMI guidance while maintaining a clean input layout.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260131-001337`
