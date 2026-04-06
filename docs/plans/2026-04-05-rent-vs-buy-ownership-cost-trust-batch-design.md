# Rent vs Buy Ownership Cost Trust Batch Design

## Goal

Upgrade the next three rent-vs-buy ownership-cost support guides to the stronger shared trust model while preserving their current routes, `noindex` posture, and supporting role under the rent-vs-buy costs workflow.

The target pages in this batch are:

- `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`
- `src/pages/guides/rent-vs-buy-hoa-fees.astro`
- `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

## Context

The rent-vs-buy cluster now has stronger destination pages and stronger assumption pages:

- `rent-vs-buy-break-even`
- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-checklist`
- `rent-vs-buy-time-horizon`
- `rent-vs-buy-rent-growth`
- `rent-vs-buy-home-appreciation`
- `rent-vs-buy-price-to-rent-ratio`
- `rent-vs-buy-investment-return`
- `rent-vs-buy-mortgage-rate-sensitivity`

The remaining legacy pages in the rent-vs-buy cluster are now concentrated in the ownership-cost layer:

- maintenance reserves
- HOA dues and special assessments
- PMI treatment
- down payment
- closing costs

Among those, the strongest next mini-cluster is:

- `maintenance-estimate`
- `hoa-fees`
- `pmi-assumptions`

Together they explain the three easiest homeowner costs to underestimate in a rent-vs-buy model. That makes them especially important for low-value recovery because they show that the site is not just helping users calculate optimistic buy scenarios.

## Options

### Option 1: Upgrade the ownership-cost trio

Pros:

- strongest thematic continuity
- directly strengthens the `rent-vs-buy-costs-to-include` destination page
- helps counter the most common undercounting problem in buy-side modeling

Cons:

- leaves `down-payment` and `closing-costs` for a later batch

### Option 2: Upgrade the upfront-cash trio

This would be:

- `down-payment`
- `closing-costs`
- `pmi-assumptions`

Pros:

- also coherent
- focuses on cash-to-close and loan-structure questions

Cons:

- overlaps more with the batch that just strengthened investment-return and mortgage-rate sensitivity
- does not finish the ongoing-cost layer

### Option 3: Mix the oldest remaining pages

Pros:

- maximizes date cleanup per batch

Cons:

- weaker topical story
- more likely to feel like random cleanup instead of system-building

## Recommendation

Choose **Option 1**.

This is the safest and strongest next step because the three pages all answer the same core user problem:

- "What homeowner costs am I still underestimating?"

That makes the batch coherent for search quality, manual review, and user experience.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`
- `src/pages/guides/rent-vs-buy-hoa-fees.astro`
- `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `ReviewedByCard`
- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep `robots="noindex, follow"` unchanged
- add a visible `ReviewedByCard`
- use:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- set `const lastUpdated = "2026-04-05";`
- align the visible `Last updated:` line to `2026-04-05`
- add a strong top role section starting with `Use this guide when...`
- add a small official references section

### Page-level role framing and review scopes

#### `rent-vs-buy-maintenance-estimate`

Role phrase:

- `Use this guide when maintenance reserves are the least certain part of your ownership-cost estimate`

The `reviewScope` should explicitly cover:

- maintenance-reserve realism
- property-type and age-related adjustments
- routing between checklist, costs-to-include, and break-even workflows

#### `rent-vs-buy-hoa-fees`

Role phrase:

- `Use this guide when HOA dues or special assessments are the ownership cost most likely to be missed or double counted`

The `reviewScope` should explicitly cover:

- HOA dues and master-policy coverage
- special-assessment and reserve-health framing
- routing between costs-to-include, maintenance, and break-even workflows

#### `rent-vs-buy-pmi-assumptions`

Role phrase:

- `Use this guide when PMI is the hidden ownership cost changing the low-down-payment comparison`

The `reviewScope` should explicitly cover:

- PMI treatment inside the rent-versus-buy model
- removal-timing realism
- routing between calculator, break-even, and ownership-cost workflows

### References strategy

Use primary official sources only.

#### `rent-vs-buy-maintenance-estimate`

Use CFPB pages that explicitly tell buyers to budget for:

- home maintenance and repairs
- total home payment inputs

#### `rent-vs-buy-hoa-fees`

Use CFPB pages that explicitly cover:

- HOA dues as part of affordability planning
- HOA dues typically not being included in the mortgage-servicer payment

#### `rent-vs-buy-pmi-assumptions`

Use CFPB pages that explicitly cover:

- what PMI is
- how PMI is paid
- how and when PMI may be removed

### Routing cleanup

These pages are redirect-source support pages, so they should avoid relying on old support-page destinations when stronger active destination pages already exist.

Where reasonable, update CTA and related-guide routing toward:

- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-break-even`
- `rent-vs-buy-checklist`
- the calculator

instead of other legacy rent-vs-buy support pages.

### Copy boundary

This batch should not:

- change routes or canonical paths
- change `robots`
- redesign the layout
- rewrite full article bodies
- alter calculator logic

Allowed additions:

- add one role section near the top of each page
- add one `ReviewedByCard`
- add a small official references section
- tighten CTA and related-guide routing

### Test strategy

Add one regression block in `tests/seo.test.ts` for these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also lock in:

- `rent-vs-buy-maintenance-estimate.astro` includes `Use this guide when maintenance reserves are the least certain part of your ownership-cost estimate`
- `rent-vs-buy-hoa-fees.astro` includes `Use this guide when HOA dues or special assessments are the ownership cost most likely to be missed or double counted`
- `rent-vs-buy-pmi-assumptions.astro` includes `Use this guide when PMI is the hidden ownership cost changing the low-down-payment comparison`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into `down-payment` or `closing-costs` in the same turn
- change redirect or sitemap rules
