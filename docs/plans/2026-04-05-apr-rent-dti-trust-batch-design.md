# APR Rent DTI Trust Batch Design

## Goal

Upgrade the next three still-legacy support guides to the stronger shared trust model while preserving their current structure, routing, and content purpose.

The target pages in this batch are:

- `src/pages/guides/apr-by-loan-type.astro`
- `src/pages/guides/rent-vs-buy-costs-to-include.astro`
- `src/pages/guides/dti-credit-card-minimums.astro`

## Context

The current site-quality pass already established a stable upgrade pattern:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- preserve or add a clear "Use this guide when..." role section
- align `lastUpdated` with the visible `Last updated:` line

Among remaining pages still using the old review-card format, these three now give the best balance of value and safety:

- `apr-by-loan-type` is indexable and supports APR topic depth
- `rent-vs-buy-costs-to-include` is indexable and helps defend comparison quality
- `dti-credit-card-minimums` is noindex, but it is a practical DTI workflow page with strong support value

## Options

### Option 1: Only upgrade remaining indexable pages

Pros:

- keeps the batch purely index-focused

Cons:

- leaves a high-value DTI support page in the older trust format
- next batch becomes smaller and less balanced

### Option 2: Upgrade two indexable pages plus one high-value workflow support page

Pros:

- strongest practical balance between crawl-visible quality signals and internal workflow quality
- keeps the batch small and verifiable
- continues quality normalization across multiple core topics

Cons:

- mixes topics

### Option 3: Stay inside one topic cluster only

Pros:

- simpler thematic grouping

Cons:

- lower practical value than the best available mixed batch

## Recommendation

Choose **Option 2**.

This gives the safest and strongest next outcome: two indexable pages improve visible trust consistency, and one important DTI support page no longer lags behind the stronger site standard.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/apr-by-loan-type.astro`
- `src/pages/guides/rent-vs-buy-costs-to-include.astro`
- `src/pages/guides/dti-credit-card-minimums.astro`

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

#### `apr-by-loan-type`

This page already has the right role content, but its heading is still generic. Tighten the heading so the role cue becomes explicit and consistent with the stronger guides.

The `reviewScope` should explicitly cover:

- APR comparison boundaries across loan categories
- fee and cash-received interpretation
- routing between APR calculator, checklist, and topic workflows

#### `rent-vs-buy-costs-to-include`

Keep the current role section as-is.

The `reviewScope` should explicitly cover:

- ownership-cost completeness
- upfront cash and missing-assumption framing
- routing between rent-vs-buy modeling, break-even, and topic workflows

#### `dti-credit-card-minimums`

Keep the current role section as-is.

The `reviewScope` should explicitly cover:

- credit card minimum treatment inside DTI
- statement-cycle timing and minimum-payment interpretation
- routing between DTI calculation, payoff-minimum, and improvement workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- rewrite the body content
- change calculator logic
- redesign the layout

The only copy change beyond trust normalization should be the stronger role heading on `apr-by-loan-type`.

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

- `apr-by-loan-type.astro` includes `Use this guide when you are comparing APR across auto, personal, student, or small-business loans`
- `rent-vs-buy-costs-to-include.astro` includes `Use this guide when ownership costs, upfront cash needs, and incomplete assumptions are the main modeling problem`
- `dti-credit-card-minimums.astro` includes `Use this guide when credit card minimum payments are the DTI bottleneck`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other APR or rent-vs-buy support pages
