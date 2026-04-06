# Refinance Points Exact-Match Fix Design

## Goal

Tighten one refinance support page that still uses an exact title label while linking to a different guide, which is a stronger mismatch signal than a normal cross-topic recommendation.

This batch stays deliberately tiny:

- no new pages
- no route changes
- no redirect changes
- no sitemap changes
- no `noindex` changes
- no layout changes

The work is limited to one internal-link correction and one regression test.

## Context

Most recent refinance cleanup work has focused on obvious label-to-destination mismatch and generic-template routing.

The strongest remaining exact-match issue is now inside:

- `src/pages/guides/refinance-points-break-even.astro`

Current weak pattern:

- label `APR and points break-even` points to `/guides/discount-points-vs-lender-credits`

This is a harder issue than normal “adjacent topic” linking because there is already a dedicated page with the exact matching title:

- `/guides/apr-and-points-break-even`

That means the current route does not just feel broad; it misses an exact-match destination that already exists.

## In-Scope Pages

- `src/pages/guides/refinance-points-break-even.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Leave it as-is

Pros:

- zero code change

Cons:

- preserves an obvious exact-title mismatch
- leaves a templated quality signal in place

### Option 2: Repoint the exact-match label to the exact-match page

Pros:

- lowest-risk real fix
- no content rewrite needed
- preserves the surrounding page structure

Cons:

- touches only one page, so batch size is small

### Option 3: Rework the broader points/credits bridge across several refinance pages

Pros:

- broader refinement of the refinance-to-APR relationship

Cons:

- introduces more interpretive decisions
- expands beyond the clearest defect

## Recommendation

Choose **Option 2**.

This is the safest strong move because the correction is exact, objective, and already supported by an existing page.

## Design

### Routing rule

If a refinance support page uses a visible label that exactly matches an existing guide title, the link should point to that exact guide unless there is a strong reason not to.

Avoid:

- using an exact-match label for a different destination
- sending users to a broader adjacent page when an exact-match page already exists

### Replacement strategy

#### `refinance-points-break-even`

Current weak pattern:

- `APR and points break-even` -> `/guides/discount-points-vs-lender-credits`

Replace with:

- `APR and points break-even` -> `/guides/apr-and-points-break-even`

Reason:

- the label matches the destination title exactly
- the existing destination is more precise than the current generic points-versus-credits page
- this reduces one of the clearest remaining mismatch signals without widening scope

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- `refinance-points-break-even.astro` includes:
  - `href="/guides/apr-and-points-break-even">APR and points break-even</a>`
- `refinance-points-break-even.astro` does not include:
  - `href="/guides/discount-points-vs-lender-credits">APR and points break-even</a>`

This keeps the regression narrow and protects against reintroducing the exact same mismatch.

## Out of Scope

- broader refinance-to-APR bridge redesign
- rate-lock page changes
- no-closing-cost page changes
- points-vs-credits label normalization elsewhere
- pushing, deploying, or committing
