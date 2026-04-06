# Cross-Topic Guide Trust Batch Design

## Goal

Upgrade the next three most worthwhile legacy active guides that still send weak trust and page-role signals, while preserving the site's current structure and keeping the batch safe enough for local-only review.

The target pages in this batch are:

- `src/pages/guides/rent-vs-buy-checklist.astro`
- `src/pages/guides/amortization-with-extra-payments.astro`
- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`

## Context

The previous trust-quality batches established a consistent pattern for strong active guides:

- `TRUST_PROFILES` drives authorship and review metadata
- `BaseLayout` includes `authorProfile` and `reviewProfiles`
- `ReviewedByCard` uses `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- a short "Use this guide when..." section clarifies exactly which decision the page is supposed to solve
- `lastUpdated` and visible `Last updated:` remain aligned

The next batch should continue that pattern, but only on pages where the improvement is materially worth the edit surface.

Among the remaining legacy guides, three pages stand out because they combine:

- strong internal link demand
- older visible freshness dates
- little or no existing trust framework
- high risk of being interpreted as generic supporting content unless their role is made explicit

## Options

### Option 1: Pick the next three pages by internal-link count alone

Likely pages:

- `rent-vs-buy-checklist`
- `amortization-with-extra-payments`
- `how-to-use-apr-for-credit-cards` or `what-counts-in-dti`

Pros:

- pure traffic-weight prioritization
- easy to justify numerically

Cons:

- the third page would deliver a smaller quality delta because some of the higher-count pages already have a `ReviewedByCard` and role section

### Option 2: Pick the pages with the biggest remaining trust gap among the top-weight guides

Likely pages:

- `rent-vs-buy-checklist`
- `amortization-with-extra-payments`
- `pay-off-mortgage-early-or-invest`

Pros:

- strongest trust-signal improvement per edit
- modernizes three pages that still look visibly legacy
- reduces the chance of low-value interpretation in two key mortgage flows and one rent-vs-buy flow

Cons:

- skips a couple of slightly higher-count pages that are already partially improved

### Option 3: Stay inside a single topic cluster

Examples:

- all remaining mortgage-payoff pages
- all remaining DTI pages

Pros:

- cleaner topical grouping
- simpler to narrate as one content cluster

Cons:

- weaker sitewide quality lift right now
- delays obvious high-gap pages in other active flows

## Recommendation

Choose **Option 2**.

This is the safest and strongest route because it prioritizes the biggest remaining trust gap inside still-important pages. That means a better quality lift per edit without changing architecture or widening scope.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/rent-vs-buy-checklist.astro`
- `src/pages/guides/amortization-with-extra-payments.astro`
- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- include `ReviewedByCard`
- use:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- update both `lastUpdated` and visible `Last updated:` to `2026-04-05`

### Page-role reinforcement

#### `rent-vs-buy-checklist`

This page currently reads like a useful checklist but not yet like a clearly owned entry point.

Add:

- a `ReviewedByCard`
- a short role section near the top that explains when this page is the right place to start:
  - before a rent-vs-buy comparison when assumptions are still weak
  - when the break-even result feels suspicious because taxes, insurance, HOA, maintenance, or selling costs are incomplete
  - when the user needs to gather realistic assumptions before opening the calculator

#### `amortization-with-extra-payments`

This page needs both trust coverage and role clarity.

Add:

- a `ReviewedByCard`
- a short role section near the top that explains when this page is the right place:
  - when the user wants to understand how extra principal changes the table, not just the payoff date
  - when monthly extra versus lump-sum timing is the key modeling question
  - when the user needs to choose between the amortization schedule tool and the extra payment calculator

#### `pay-off-mortgage-early-or-invest`

This page is materially older than the others and still has no explicit trust layer.

Add:

- a `ReviewedByCard`
- a short role section near the top that explains when this page is the right place:
  - when the user is comparing guaranteed mortgage savings versus uncertain market returns
  - when liquidity, taxes, and time horizon could change the answer
  - when the next step is to model extra payments before deciding

### Copy boundary

This batch should not:

- redesign the layout
- change canonical paths
- refactor calculators
- change topic-hub structure
- rewrite the full body copy of any page

The goal is a clear trust and role upgrade, not a full editorial rewrite.

### Test strategy

Add one dedicated regression block in `tests/seo.test.ts` for these three files.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also lock in:

- a role phrase for each page
- `lastUpdated` and visible `Last updated:` equal to `2026-04-05`

This keeps the stronger trust model from regressing later.

## Out Of Scope

This batch should not:

- touch redirects
- change sitemap rules
- alter the calculator components
- rewrite DTI or APR pages yet
- push or deploy anything
