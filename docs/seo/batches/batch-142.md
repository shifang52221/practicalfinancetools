## Batch 142 (APR calculator smart presets)

Date: 2026-01-31

Scope: improve APR calculator clarity with presets and fee impact signals.

### URLs updated
- /calculators/apr-calculator

### Changes applied (high level)
- Added quick presets for loan amount, rate, term, and fees.
- Added scenario buttons for auto and personal loan examples.
- Added total cost and APR vs nominal KPIs for fee impact clarity.
- Reused clamped inputs for consistent calculations.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260131-113519`
