# Refinance Support Destination Dedup Design

## Goal

Tighten two refinance support pages so they stop repeating the same strong destination under multiple labels, which currently makes the pages feel more templated than intentionally routed.

This batch is intentionally conservative:

- no new pages
- no route changes
- no redirect changes
- no `noindex` changes
- no framework changes

The work is limited to internal-link cleanup, label-to-destination alignment, and regression coverage.

## Context

The refinance cluster already has a clear strong-destination model:

- `/guides/refinance-break-even`
- `/guides/refinance-checklist`
- `/guides/refinance-closing-costs`

The remaining weak signal is inside a few `noindex` refinance support pages.

Two pages still repeat `refinance-break-even` under multiple different labels:

- `src/pages/guides/refinance-when-not-to-refinance.astro`
- `src/pages/guides/refinance-reset-amortization.astro`

Examples of the current pattern:

- `Rate vs term tradeoff` -> `/guides/refinance-break-even`
- `Reset amortization` -> `/guides/refinance-break-even`

On `refinance-reset-amortization`, the hero button also uses the label `Rate vs term tradeoff` while linking to `/guides/refinance-break-even`.

This is not a routing failure, but it is a quality problem:

- the pages look more templated
- the labels do not match the destination
- the related-guides section does not feel curated

## In-Scope Pages

- `src/pages/guides/refinance-when-not-to-refinance.astro`
- `src/pages/guides/refinance-reset-amortization.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Remove the duplicate links only

Pros:

- lowest implementation risk
- quickly reduces template repetition

Cons:

- leaves weaker next-step coverage
- does not improve label clarity

### Option 2: Replace duplicate `break-even` repeats with distinct strong refinance destinations

Pros:

- still low risk
- improves both user-path quality and perceived page intent
- uses already-established strong refinance pages

Cons:

- slightly broader than pure removal

### Option 3: Sweep the whole refinance `noindex` support layer

Pros:

- broader architecture cleanup

Cons:

- more scope than needed for the current issue
- higher chance of touching contextually acceptable routing

## Recommendation

Choose **Option 2**.

This is the safest strong move because it reduces template repetition and improves label-to-destination clarity without changing site structure.

## Design

### Routing rule

Each support page in this batch should still route into the refinance destination layer, but with distinct, label-aligned destinations:

- `refinance-break-even`
- `refinance-checklist`
- `refinance-closing-costs`

Avoid:

- repeating `/guides/refinance-break-even` multiple times under unrelated labels
- using a label that implies one guide while linking to another

### Replacement strategy

#### `refinance-when-not-to-refinance`

Current weak pattern:

- `Refinance break-even`
- `Rate vs term tradeoff` -> `/guides/refinance-break-even`
- `Reset amortization` -> `/guides/refinance-break-even`

Replace the related-guides group with:

- `Refinance break-even`
- `Refinance closing costs`
- `Refinance checklist`

Reason:

- this page is a broad “don’t refinance blindly” warning page
- users typically need break-even, fee review, and process review next

#### `refinance-reset-amortization`

Current weak patterns:

- hero button label `Rate vs term tradeoff` -> `/guides/refinance-break-even`
- related-guides repeats `Refinance break-even` and `Rate vs term tradeoff` -> `/guides/refinance-break-even`

Replace with:

- hero secondary button label aligned to `Refinance break-even`
- related-guides group:
  - `Refinance break-even`
  - `Refinance closing costs`
  - `Refinance checklist`

Reason:

- this page is specifically about amortization reset risk
- break-even is still central, but closing costs and checklist are the better distinct support exits

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- each of the two in-scope pages includes:
  - `href="/guides/refinance-break-even"`
  - `href="/guides/refinance-checklist"`
  - `href="/guides/refinance-closing-costs"`
- each page contains at most three occurrences of `href="/guides/refinance-break-even"` across the full file
  - one strong CTA path is acceptable
  - repeated template-style copies are not
- `refinance-reset-amortization` no longer contains the exact off-pattern button/link pair:
  - `href="/guides/refinance-break-even">Rate vs term tradeoff</a>`
- `refinance-when-not-to-refinance` no longer contains the exact off-pattern links:
  - `href="/guides/refinance-break-even">Rate vs term tradeoff</a>`
  - `href="/guides/refinance-break-even">Reset amortization</a>`

This keeps the regression narrow and protects against reintroducing the same templated routing pattern.

## Out of Scope

- changing routes or canonicals
- changing redirects
- changing sitemap rules
- changing indexability
- broad refinance-cluster refresh beyond these two files
- trust-model upgrades on these pages
- pushing, deploying, or committing
