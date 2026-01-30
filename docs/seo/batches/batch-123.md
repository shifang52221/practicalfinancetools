## Batch 123 (Schema noindex cleanup)

Date: 2026-01-30

Scope: tighten schema output on noindex pages and align calculator index type.

### URLs updated
- /404
- /contact
- /cookie-notice
- /calculators

### Changes applied (high level)
- Disabled WebPage/Breadcrumb JSON-LD on noindex pages.
- Set calculators index page type to CollectionPage.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-132815`
