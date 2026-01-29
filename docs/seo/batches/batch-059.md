## Batch 059 (OG type for articles)

Date: 2026-01-29

Scope: align Open Graph type for guide pages.

### URLs upgraded
- /guides/* (og:type=article)
- /topics/* and other BaseLayout pages remain og:type=website

### Changes applied (high level)
- Set og:type to article for guide pages based on layout page type.

### QA / validation
- OK: `npm run build` (2026-01-29)
- OK: reports/seo-audit/local-20260129-004704

