## Batch 141 (DTI calculator smart presets)

Date: 2026-01-31

Scope: improve DTI calculator usability with presets and a one-click max housing action.

### URLs updated
- /calculators/debt-to-income-calculator

### Changes applied (high level)
- Added quick presets for income, housing payment, and other debts.
- Added one-click action to apply max housing at current targets.
- Reused clamped input values for consistent calculations.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260131-113105`
