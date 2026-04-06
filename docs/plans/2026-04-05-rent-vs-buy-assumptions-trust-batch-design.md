# Rent vs Buy Assumptions Trust Batch Design

## Goal

Upgrade the next three rent-vs-buy assumption guides to the stronger shared trust model while preserving their current routes, `noindex` posture, and topic-cluster structure.

The target pages in this batch are:

- `src/pages/guides/rent-vs-buy-time-horizon.astro`
- `src/pages/guides/rent-vs-buy-rent-growth.astro`
- `src/pages/guides/rent-vs-buy-home-appreciation.astro`

## Context

The current rent-vs-buy quality pass already has stronger destination pages in place:

- `rent-vs-buy-break-even`
- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-checklist`

Those pages now communicate clear authorship, review coverage, role-based routing, and date alignment. The remaining assumption-support pages above still look like older thin support content:

- no shared `TRUST_PROFILES`
- no `authorProfile` or `reviewProfiles`
- no standard `ReviewedByCard`
- no explicit "Use this guide when..." role framing
- stale `2026-02-08` dates

These pages are also not random leftovers. Together they explain the three biggest modeling levers inside the rent-vs-buy workflow:

- how long you stay
- how rent changes
- how home value changes

That makes them a strong mini-cluster for reducing low-value signals without changing the site's overall structure.

## Options

### Option 1: Upgrade the partially modernized price-to-rent page plus two assumption pages

Pros:

- includes a page that already has a references section
- keeps a quick-screening angle in the batch

Cons:

- `rent-vs-buy-price-to-rent-ratio` is already closer to the new standard than the true legacy pages
- leaves `rent-vs-buy-home-appreciation` behind even though it is a core assumption page

### Option 2: Upgrade the three core rent-vs-buy assumption pages

Pros:

- strongest topical coherence
- removes three true legacy pages in one pass
- improves the assumption-sensitivity layer directly underneath the upgraded break-even guide

Cons:

- does not clean up `rent-vs-buy-price-to-rent-ratio` in the same batch

### Option 3: Widen into a four-page rent-vs-buy batch

Pros:

- would clean up more of the cluster at once

Cons:

- bigger batch than needed
- increases verification scope and regression surface
- works against the user's preferred small, reviewable batches

## Recommendation

Choose **Option 2**.

This is the safest and strongest next step because these three pages are all still clearly legacy, all describe assumption sensitivity inside the same rent-vs-buy decision flow, and all can be normalized with low-risk structural edits.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/rent-vs-buy-time-horizon.astro`
- `src/pages/guides/rent-vs-buy-rent-growth.astro`
- `src/pages/guides/rent-vs-buy-home-appreciation.astro`

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

### Page-level role framing and review scopes

#### `rent-vs-buy-time-horizon`

The role phrase should clearly position this page as the holding-period decision layer for break-even modeling.

The `reviewScope` should explicitly cover:

- holding-period framing
- short-versus-long horizon comparison logic
- routing between break-even, closing-cost, and appreciation assumption workflows

#### `rent-vs-buy-rent-growth`

The role phrase should position this page as the rent-side assumption page for scenario realism.

The `reviewScope` should explicitly cover:

- rent-growth assumption setting
- scenario-range guidance
- routing between checklist, break-even, and appreciation comparison workflows

#### `rent-vs-buy-home-appreciation`

The role phrase should position this page as the buy-side appreciation assumption page for scenario realism.

The `reviewScope` should explicitly cover:

- appreciation assumption realism
- downside and conservative-scenario framing
- routing between time horizon, rent growth, and break-even workflows

### Copy boundary

This batch should not:

- change routes or canonical paths
- change `robots`
- redesign the layout
- rewrite the whole article body
- touch calculator logic
- alter existing topic-hub structure

Allowed content additions:

- add one role section near the top of each page
- add one `ReviewedByCard` to each page
- lightly strengthen section sequencing so each page reads like part of a decision system rather than a standalone stub

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

- `rent-vs-buy-time-horizon.astro` includes `Use this guide when holding period uncertainty is the main rent-vs-buy decision risk`
- `rent-vs-buy-rent-growth.astro` includes `Use this guide when rent growth assumptions are the weakest part of your rent-vs-buy model`
- `rent-vs-buy-home-appreciation.astro` includes `Use this guide when appreciation assumptions are doing too much work in the buy case`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other rent-vs-buy support pages in the same turn
- revisit redirect rules or sitemap decisions
