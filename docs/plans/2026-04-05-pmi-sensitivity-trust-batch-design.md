# PMI Sensitivity Trust Batch Design

## Goal

Upgrade the next three mortgage-payment support guides to the stronger shared trust model while preserving their route behavior, `noindex` posture, and existing workflow structure.

The target pages in this batch are:

- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/estimating-pmi-cost.astro`

## Context

The current quality pass already established a stable trust-upgrade pattern:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- keep a clear "Use this guide when..." role section near the top
- align `lastUpdated` with the visible `Last updated:` line

This batch should stay tightly related to the mortgage-payment support cluster. The strongest next grouping is:

- `mortgage-payment-pmi-thresholds` for threshold-driven monthly payment changes
- `mortgage-payment-rate-sensitivity` for note-rate-driven monthly payment changes
- `estimating-pmi-cost` for the monthly PMI estimate that feeds those payment scenarios

This creates a coherent mini-cluster around payment sensitivity instead of forcing in a page that has already been upgraded.

## Options

### Option 1: Upgrade only the two remaining old mortgage-payment pages

Pros:

- smallest possible batch

Cons:

- leaves `estimating-pmi-cost` visibly behind even though it is directly linked from the PMI thresholds page
- misses a clean topic cluster

### Option 2: Upgrade the PMI-plus-rate sensitivity cluster

Pros:

- strongest topical continuity
- improves a complete decision path around payment scenarios
- keeps the batch compact and low-risk

Cons:

- the third page sits outside the `mortgage-payment-` prefix even though it belongs to the same workflow

### Option 3: Pull in a different already-close payment page

Pros:

- could stay inside one narrower route prefix

Cons:

- weaker thematic fit than `estimating-pmi-cost`
- risks duplicating work on pages already upgraded

## Recommendation

Choose **Option 2**.

This is the safest and strongest next step because the three pages already cross-link, already solve the same reader problem, and mainly need trust normalization rather than structural rewrites.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/estimating-pmi-cost.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep or add `ReviewedByCard`
- switch it to:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- update both `lastUpdated` and visible `Last updated:` to `2026-04-05`

### Page-level review scopes

#### `mortgage-payment-pmi-thresholds`

The `reviewScope` should explicitly cover:

- PMI threshold interpretation inside payment comparisons
- removal-timeline framing
- routing between mortgage payment, PMI cost estimation, and down-payment workflows

#### `mortgage-payment-rate-sensitivity`

The `reviewScope` should explicitly cover:

- note-rate sensitivity inside monthly payment modeling
- isolation of rate effects from other assumptions
- routing between mortgage payment, affordability, and payment-structure workflows

#### `estimating-pmi-cost`

This page currently lacks both a visible review summary and a role section near the top. It should adopt the same support-page standard as the rest of the cluster.

The `reviewScope` should explicitly cover:

- monthly PMI estimate realism
- monthly-versus-upfront insurance interpretation
- routing between mortgage payment, PMI thresholds, and removal workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- redesign the layout
- rewrite the core article body
- change calculator logic

The only body additions beyond trust normalization should be:

- add a `ReviewedByCard` to `estimating-pmi-cost`
- add a short "Use this guide when..." section to `estimating-pmi-cost`
- add a short references section to `estimating-pmi-cost` so it matches the stronger trust standard used on the surrounding mortgage-payment support pages

### Test strategy

Add one regression block in `tests/seo.test.ts` covering these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also lock in:

- `mortgage-payment-pmi-thresholds.astro` includes `Use this guide when PMI is the reason the payment scenario changes`
- `mortgage-payment-rate-sensitivity.astro` includes `Use this guide when rate sensitivity is the main mortgage-payment question`
- `estimating-pmi-cost.astro` includes `Use this guide when PMI cost is the missing piece of the full housing-payment estimate`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into unrelated APR, refinance, or rent-vs-buy pages in the same turn
