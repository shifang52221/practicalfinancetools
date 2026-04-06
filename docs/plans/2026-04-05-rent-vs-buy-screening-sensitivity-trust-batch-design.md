# Rent vs Buy Screening Sensitivity Trust Batch Design

## Goal

Upgrade the next three rent-vs-buy support guides to the stronger shared trust model while preserving their current routes, `noindex` posture, and supporting role around the rent-vs-buy break-even workflow.

The target pages in this batch are:

- `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`
- `src/pages/guides/rent-vs-buy-investment-return.astro`
- `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

## Context

The rent-vs-buy cluster now has stronger destination pages and stronger assumption pages:

- `rent-vs-buy-break-even`
- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-checklist`
- `rent-vs-buy-time-horizon`
- `rent-vs-buy-rent-growth`
- `rent-vs-buy-home-appreciation`

The remaining pages above still sit in a weaker support tier, even though they answer important reader questions:

- the quick screening shortcut before a full model
- the opportunity-cost assumption behind the renter scenario
- the mortgage-rate sensitivity that can change the break-even outcome

They are all redirect-source support pages feeding into the break-even decision path. Leaving them in a mixed or legacy state makes the topic system feel uneven and weakens both review trust and low-value recovery.

### Current state by page

#### `rent-vs-buy-price-to-rent-ratio`

This page is partially modernized:

- it already has a `ReviewedByCard`
- it already has a role section
- it already has a references section

But it still uses the older review-card props, lacks `TRUST_PROFILES`, lacks `authorProfile` and `reviewProfiles`, and still uses `2026-04-03`.

#### `rent-vs-buy-investment-return`

This page is still fully legacy:

- no `TRUST_PROFILES`
- no `authorProfile` or `reviewProfiles`
- no visible review summary
- no role section
- stale `2026-02-08` date
- links still point at a redirected support URL

#### `rent-vs-buy-mortgage-rate-sensitivity`

This page is also still fully legacy:

- no `TRUST_PROFILES`
- no `authorProfile` or `reviewProfiles`
- no visible review summary
- no role section
- stale `2026-02-08` date

## Options

### Option 1: Upgrade the screening-plus-sensitivity trio

Pros:

- strongest thematic continuity around the break-even workflow
- cleans up one partially modernized page plus two true legacy pages
- strengthens the whole decision path from quick screen to assumption pressure testing

Cons:

- mixes one half-upgraded page with two fully legacy pages

### Option 2: Upgrade only the two fully legacy pages

Pros:

- smallest possible batch
- lowest edit surface

Cons:

- leaves `rent-vs-buy-price-to-rent-ratio` in an awkward in-between state
- does not fully normalize the quick-entry layer

### Option 3: Switch to another rent-vs-buy subcluster

Pros:

- could target a different support slice

Cons:

- weaker fit than finishing the pages directly referenced by the break-even logic
- more likely to feel like random cleanup

## Recommendation

Choose **Option 1**.

This is the safest and strongest next step because these three pages belong to one decision chain:

- price-to-rent ratio screens the market
- investment return shapes the renter opportunity-cost case
- mortgage-rate sensitivity pressure-tests the owner financing case

That makes the batch coherent for users, for search quality, and for future manual review.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`
- `src/pages/guides/rent-vs-buy-investment-return.astro`
- `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `ReviewedByCard`
- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep `robots="noindex, follow"` unchanged
- add or normalize a visible `ReviewedByCard`
- use:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- set `const lastUpdated = "2026-04-05";`
- align the visible `Last updated:` line to `2026-04-05`
- keep or add a top role section starting with `Use this guide when...`

### Page-level role framing and review scopes

#### `rent-vs-buy-price-to-rent-ratio`

Keep the current role phrase:

- `Use this guide when you need a quick market screen before the full model`

The `reviewScope` should explicitly cover:

- price-to-rent ratio as a first-pass signal
- limitations relative to full scenario modeling
- routing between break-even, calculator, and assumption guides

#### `rent-vs-buy-investment-return`

Add a new role phrase:

- `Use this guide when investment return assumptions are the least certain part of your rent-vs-buy comparison`

The `reviewScope` should explicitly cover:

- opportunity-cost framing
- after-tax and conservative-range guidance
- routing between costs-to-include, checklist, and break-even workflows

This page should also replace links that currently point at redirected support URLs with links to the current active destination pages.

#### `rent-vs-buy-mortgage-rate-sensitivity`

Add a new role phrase:

- `Use this guide when rate volatility is the reason your rent-vs-buy answer keeps changing`

The `reviewScope` should explicitly cover:

- mortgage-rate sensitivity inside the rent-vs-buy model
- isolating rate effects from other assumptions
- routing between break-even, mortgage payment, and affordability checks

### References strategy

`rent-vs-buy-price-to-rent-ratio` already has a references section and should keep it.

`rent-vs-buy-investment-return` should gain a short official references section using primary sources that support:

- investing basics and return assumptions
- compound growth and opportunity-cost framing

`rent-vs-buy-mortgage-rate-sensitivity` should gain a short official references section using primary sources that support:

- mortgage rate shopping
- interpreting rate scenarios and quotes

### Copy boundary

This batch should not:

- change routes or canonical paths
- change `robots`
- redesign the layout
- rewrite the entire article bodies
- alter calculator logic

Allowed content additions:

- add one role section near the top where missing
- normalize or add one `ReviewedByCard`
- add small official references sections where missing
- tighten CTA and related-guide routing so users move to active destination pages rather than redirected support URLs

### Test strategy

Add one regression block in `tests/seo.test.ts` for these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also lock in:

- `rent-vs-buy-price-to-rent-ratio.astro` includes `Use this guide when you need a quick market screen before the full model`
- `rent-vs-buy-investment-return.astro` includes `Use this guide when investment return assumptions are the least certain part of your rent-vs-buy comparison`
- `rent-vs-buy-mortgage-rate-sensitivity.astro` includes `Use this guide when rate volatility is the reason your rent-vs-buy answer keeps changing`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into the remaining rent-vs-buy support pages in the same turn
- change redirect or sitemap rules
