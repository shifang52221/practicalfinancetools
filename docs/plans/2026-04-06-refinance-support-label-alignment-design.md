# Refinance Support Label Alignment Design

## Goal

Tighten a small set of refinance support pages that still show obvious label-to-destination mismatch, which makes the cluster feel templated instead of intentionally curated.

This batch stays conservative:

- no new pages
- no route changes
- no redirect changes
- no sitemap changes
- no `noindex` changes
- no framework or layout changes

The work is limited to internal-link alignment and regression coverage.

## Context

The refinance cluster already has a stronger destination layer than before:

- `/guides/refinance-break-even`
- `/guides/refinance-closing-costs`
- `/guides/refinance-checklist`

The next quality weakness is not topic leakage but destination mismatch inside a few support pages.

Current high-confidence examples:

- `src/pages/guides/refinance-no-closing-costs-myth.astro`
  - label `Rolling costs into the loan` points to `/guides/refinance-closing-costs`
- `src/pages/guides/refinance-rolling-costs-into-loan.astro`
  - label `APR when fees are financed` points to `/guides/apr-with-origination-fee`
- `src/pages/guides/refinance-offer-comparison-checklist.astro`
  - label `No closing cost refinance` points to `/guides/refinance-closing-costs`
  - label `Rolling costs into the loan` points to `/guides/refinance-closing-costs`
  - label `Points break-even` points to `/guides/refinance-break-even`

These are strong cleanup candidates because the mismatch is obvious and the better destinations already exist.

## In-Scope Pages

- `src/pages/guides/refinance-no-closing-costs-myth.astro`
- `src/pages/guides/refinance-rolling-costs-into-loan.astro`
- `src/pages/guides/refinance-offer-comparison-checklist.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Relabel links only

Pros:

- lowest implementation risk
- fastest possible cleanup

Cons:

- keeps weaker destination choices in place
- does not improve cluster routing quality

### Option 2: Replace mismatched links with label-aligned refinance destinations

Pros:

- still low risk
- removes obvious template signals
- keeps users inside the refinance support cluster
- improves perceived curation without structural changes

Cons:

- touches more than one page

### Option 3: Sweep the broader refinance support layer

Pros:

- could clean additional weak exits in one pass

Cons:

- broader scope than needed
- higher chance of changing pages that are already acceptable

## Recommendation

Choose **Option 2**.

This is the safest strong move because it fixes the clearest mismatch signals while preserving the current information architecture.

## Design

### Routing rule

If a refinance support page uses a specific label, that label should point to the page that actually matches the promise.

Avoid:

- using a generic strong page under multiple unrelated labels
- routing a refinance support page into an adjacent APR page when an equivalent refinance-native destination exists
- stacking multiple template-style aliases in the same related-guides block

### Replacement strategy

#### `refinance-no-closing-costs-myth`

Current weak pattern:

- `Rolling costs into the loan` -> `/guides/refinance-closing-costs`

Replace with:

- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`

Reason:

- the label already names a dedicated refinance support page
- sending users to the exact page is cleaner than sending them to the general closing-cost guide

#### `refinance-rolling-costs-into-loan`

Current weak pattern:

- `APR when fees are financed` -> `/guides/apr-with-origination-fee`

Replace the related-guides group with refinance-native exits:

- `No closing cost refinance` -> `/guides/refinance-no-closing-costs-myth`
- `Refinance closing costs` -> `/guides/refinance-closing-costs`
- `Refinance checklist` -> `/guides/refinance-checklist`

Reason:

- this page sits inside the refinance support path, not the APR topic path
- the stronger next step is to compare fee treatment within refinance, not detour into a generic APR explainer

#### `refinance-offer-comparison-checklist`

Current weak patterns:

- `No closing cost refinance` -> `/guides/refinance-closing-costs`
- `Rolling costs into the loan` -> `/guides/refinance-closing-costs`
- `Points break-even` -> `/guides/refinance-break-even`

Replace the related-guides group with exact-match destinations:

- `No closing cost refinance` -> `/guides/refinance-no-closing-costs-myth`
- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`
- `Points break-even` -> `/guides/refinance-points-break-even`

Reason:

- this page is a comparison hub and should fan users into the correct support pages
- exact-match routing makes the page feel curated instead of templatized

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- `refinance-no-closing-costs-myth.astro` includes:
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
- `refinance-no-closing-costs-myth.astro` does not include:
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
- `refinance-rolling-costs-into-loan.astro` includes:
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-closing-costs">Refinance closing costs</a>`
  - `href="/guides/refinance-checklist">Refinance checklist</a>`
- `refinance-rolling-costs-into-loan.astro` does not include:
  - `href="/guides/apr-with-origination-fee">APR when fees are financed</a>`
- `refinance-offer-comparison-checklist.astro` includes:
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
  - `href="/guides/refinance-points-break-even">Points break-even</a>`
- `refinance-offer-comparison-checklist.astro` does not include:
  - `href="/guides/refinance-closing-costs">No closing cost refinance</a>`
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
  - `href="/guides/refinance-break-even">Points break-even</a>`

This keeps the regression narrow and protects against reintroducing the same templated mismatch pattern.

## Out of Scope

- changing routes or canonicals
- changing redirects
- changing sitemap rules
- changing indexability
- broad refinance-cluster trust refresh
- new content sections or structural redesign
- pushing, deploying, or committing
