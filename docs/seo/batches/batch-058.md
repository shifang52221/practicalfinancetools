## Batch 058 (Article/Collection schema for guides/topics)

Date: 2026-01-29

Scope: add WebPage/Article/CollectionPage schema to BaseLayout pages.

### URLs upgraded
- /guides/*
- /topics/*
- Other BaseLayout pages (WebPage schema)

### Changes applied (high level)
- Added WebPage schema with Article type for guides and CollectionPage for topics.
- Included publisher/author links to Organization.

### QA / validation
- OK: `npm run build` (2026-01-29)
- OK: reports/seo-audit/local-20260129-004704

