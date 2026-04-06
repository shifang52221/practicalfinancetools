# Indexable Decision Trust Batch Design

## Goal

Upgrade the next three indexable decision-support guides to the stronger shared trust model so they present clearer ownership, review coverage, and freshness signals without changing their structure.

The target pages in this batch are:

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`
- `src/pages/guides/dti-calculation-step-by-step.astro`

## Context

The current quality pass already proved a reliable upgrade pattern:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- keep a strong "Use this guide when..." role section
- align `lastUpdated` with the visible `Last updated:` line

Among the remaining pages that still use the old review-card model, these three are the best next batch because they are:

- indexable
- already structurally strong
- close to real decision and calculator flows
- low-risk to normalize

## Options

### Option 1: Continue with noindex support pages

Pros:

- keeps one cluster moving

Cons:

- less immediate impact on indexable trust signals

### Option 2: Upgrade the next three indexable decision guides with old review cards

Pros:

- strongest practical lift for quality signals on pages Google can actually keep evaluating
- avoids broad rewrites
- keeps scope small and verifiable

Cons:

- topic mix is broader than a pure single-cluster batch

### Option 3: Pick one larger page that also needs copy cleanup

Pros:

- may create a bigger single-page lift

Cons:

- higher risk
- weaker batch consistency

## Recommendation

Choose **Option 2**.

This is the safest and strongest path. These three pages already do useful work and only need trust normalization, not structural surgery.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`
- `src/pages/guides/dti-calculation-step-by-step.astro`

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

These pages already have strong role sections. Preserve them.

#### `biweekly-mortgage-program-fees`

The `reviewScope` should explicitly cover:

- biweekly program fee framing
- payment-posting timing risk
- routing between biweekly comparison and extra-payment workflows

#### `extra-payment-vs-refinance`

The `reviewScope` should explicitly cover:

- payoff-versus-refinance decision framing
- rate/term and cost tradeoff interpretation
- routing between payoff, refinance, and break-even workflows

#### `dti-calculation-step-by-step`

The `reviewScope` should explicitly cover:

- exact DTI workflow ordering
- housing-payment and debt-input interpretation
- routing between DTI calculation, what-counts, and improvement workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- add new sections
- rewrite the main body copy
- change calculator logic

The goal is trust alignment and freshness consistency only.

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
- clean unrelated local changes
- widen into APR or rent-vs-buy pages yet
