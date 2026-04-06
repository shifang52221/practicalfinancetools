# Mortgage Payment Decision Trust Batch Design

## Goal

Upgrade the next three mortgage-payment decision guides to the stronger shared trust model so they better support quality review, clearer ownership, and more consistent user trust signals.

The target pages in this batch are:

- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`

## Context

These three pages are a strong next batch because they already have:

- clear route intent
- strong "Use this guide when..." role sections
- visible references
- old `ReviewedByCard` coverage

What they still lack is the shared trust layer already used on stronger pages:

- `TRUST_PROFILES`
- `authorProfile`
- `reviewProfiles`
- `writtenBy`
- `secondaryReview`
- `reviewScope`

All three pages also still show `2026-04-03`, which now leaves them slightly behind the current wave of quality-reviewed workflow pages.

## Options

### Option 1: Move deeper into older long-tail pages first

Pros:

- reduces some obviously stale dates quickly

Cons:

- spreads effort across lower-weight pages
- delays stronger consistency on pages that sit closer to mortgage calculator decisions

### Option 2: Upgrade the next coherent mortgage-payment decision cluster

Pros:

- keeps the sitewide quality pass coherent
- strengthens pages that support one practical user journey
- safest implementation because the pages already have solid structure

Cons:

- does not touch the oldest long-tail pages yet

### Option 3: Mix one page from each topic cluster

Pros:

- broad visual progress across the site

Cons:

- weaker topical momentum
- harder to test and review as one batch

## Recommendation

Choose **Option 2**.

This is the safest and strongest next move. These pages are already useful and well-shaped, so the remaining work is trust normalization rather than large content surgery.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep `ReviewedByCard`
- switch it to:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- update both `lastUpdated` and visible `Last updated:` to `2026-04-05`

### Page-role reinforcement

These pages already have strong role sections. Do not rewrite them unless a tiny consistency fix is needed.

#### `mortgage-payment-15-vs-30-year`

The `reviewScope` should explicitly cover:

- term-choice framing
- DTI and affordability implications
- routing between mortgage payment, affordability, and total-cost comparison pages

#### `mortgage-payment-down-payment-impact`

The `reviewScope` should explicitly cover:

- down-payment versus reserves framing
- PMI threshold and cash-to-close interpretation
- routing between mortgage payment, PMI, and affordability pages

#### `mortgage-payment-total-cost-vs-payment`

The `reviewScope` should explicitly cover:

- payment-versus-total-cost comparison logic
- time-horizon framing
- routing between amortization, mortgage payment, and term-choice pages

### Copy boundary

This batch should not:

- change routes or redirects
- change `robots`
- alter references structure
- redesign layout
- rewrite the main body copy

The goal is trust alignment and date consistency only.

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

- the existing role phrase on each page
- `lastUpdated` = `2026-04-05`
- visible `Last updated:` = `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- change calculator logic
- add new sections beyond trust normalization
- clean up unrelated local edits
