# Refinance Cash Support Label Fixes Design

## Goal

Tighten two refinance cash-structure support pages that still route highly specific labels into a generic closing-cost page, which makes the cluster feel more templated than curated.

This batch remains intentionally conservative:

- no new pages
- no route changes
- no redirect changes
- no sitemap changes
- no `noindex` changes
- no framework or layout changes

The work is limited to internal-link alignment and regression coverage.

## Context

The refinance support cluster now has dedicated pages for several fee-treatment and refinance-structure questions:

- `/guides/refinance-rolling-costs-into-loan`
- `/guides/refinance-no-closing-costs-myth`
- `/guides/refinance-closing-costs`
- `/guides/refinance-checklist`

The next quality gap is inside the cash-in and cash-out support pages.

Current high-confidence mismatch examples:

- `src/pages/guides/refinance-cash-in-lower-rate.astro`
  - hero label `Rolling costs into the loan` points to `/guides/refinance-closing-costs`
- `src/pages/guides/refinance-cash-out-vs-rate-term.astro`
  - related-guide label `Rolling costs into the loan` points to `/guides/refinance-closing-costs`
  - related-guide label `No closing cost refinance` points to `/guides/refinance-closing-costs`

These are strong cleanup candidates because the label names already match dedicated refinance support pages.

## In-Scope Pages

- `src/pages/guides/refinance-cash-in-lower-rate.astro`
- `src/pages/guides/refinance-cash-out-vs-rate-term.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Fix the cash-in page only

Pros:

- absolute minimum risk
- removes one obvious mismatch quickly

Cons:

- leaves the same pattern active on the cash-out page
- weaker batch value

### Option 2: Fix cash-in and cash-out together

Pros:

- still low risk
- cleans the two strongest remaining exact-match issues in the refinance cash-support layer
- keeps the cluster more intentionally routed

Cons:

- touches one more file than the minimum

### Option 3: Expand into rate-lock and points pages too

Pros:

- broader refinance support refresh

Cons:

- introduces more interpretive routing decisions
- higher chance of changing links that are acceptable, not clearly wrong

## Recommendation

Choose **Option 2**.

This is the safest strong move because both pages show obvious label-to-destination mismatch, while nearby rate-lock and points pages are less clear-cut and can wait.

## Design

### Routing rule

If a refinance support page uses a specific support-page label, it should point to the exact refinance page that matches the promise.

Avoid:

- sending a named support concept into a generic page when a dedicated page already exists
- repeating the same generic destination under multiple more-specific labels

### Replacement strategy

#### `refinance-cash-in-lower-rate`

Current weak pattern:

- `Rolling costs into the loan` -> `/guides/refinance-closing-costs`

Replace with:

- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`

Reason:

- the label already names a dedicated refinance support page
- the user intent is about financed costs, not the full closing-cost overview

#### `refinance-cash-out-vs-rate-term`

Current weak patterns:

- `Rolling costs into the loan` -> `/guides/refinance-closing-costs`
- `No closing cost refinance` -> `/guides/refinance-closing-costs`

Replace the related-guides block with:

- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`
- `No closing cost refinance` -> `/guides/refinance-no-closing-costs-myth`
- `Refinance checklist` -> `/guides/refinance-checklist`

Reason:

- this page compares refinance structures and should fan users into the exact support pages for cost treatment
- the page already keeps a general `Closing costs` route in the hero, so there is no need to overload the related-guides block with generic duplicates

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- `refinance-cash-in-lower-rate.astro` includes:
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
- `refinance-cash-in-lower-rate.astro` does not include:
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
- `refinance-cash-out-vs-rate-term.astro` includes:
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-checklist">Refinance checklist</a>`
- `refinance-cash-out-vs-rate-term.astro` does not include:
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
  - `href="/guides/refinance-closing-costs">No closing cost refinance</a>`

This keeps the regression narrow and protects against reintroducing the same generic-template routing pattern.

## Out of Scope

- changing routes or canonicals
- changing redirects
- changing sitemap rules
- changing indexability
- broad refinance support refresh beyond these two files
- rate-lock or points-page reinterpretation
- pushing, deploying, or committing
