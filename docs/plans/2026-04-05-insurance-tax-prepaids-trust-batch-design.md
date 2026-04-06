# Insurance Tax Prepaids Trust Batch Design

## Goal

Upgrade the next three mortgage-payment support guides to the stronger shared trust model while preserving their route behavior, `noindex` posture, and existing workflow structure.

The target pages in this batch are:

- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

## Context

The current quality pass already established a repeatable support-page pattern:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- keep a clear "Use this guide when..." role section near the top
- align `lastUpdated` with the visible `Last updated:` line

These three guides are the safest next cluster because they sit directly inside the escrow and housing-cost modeling workflow:

- `mortgage-payment-insurance-assumptions` explains insurance estimate quality
- `mortgage-payment-property-tax-assumptions` explains tax estimate quality
- `mortgage-payment-prepaids-and-reserves` explains cash-to-close and reserve mechanics

Together they strengthen the site's story around realistic mortgage inputs and reduce the chance that support pages look thin or disconnected from the core payment workflow.

## Options

### Option 1: Upgrade only the insurance and tax pages

Pros:

- keeps the batch tightly focused on recurring monthly assumptions

Cons:

- leaves the cash-to-close and reserve step on the older trust model
- weakens continuity across the full payment workflow

### Option 2: Upgrade the full insurance-tax-prepaids cluster

Pros:

- improves one complete housing-cost workflow
- keeps implementation small and low-risk
- strengthens both trust consistency and practical modeling depth

Cons:

- slightly broader than a two-page batch

### Option 3: Skip support pages and only focus on indexable pages

Pros:

- concentrates effort on visible crawl targets

Cons:

- leaves practical workflow support pages inconsistent
- does less to improve the site's overall quality envelope

## Recommendation

Choose **Option 2**.

This is the safest and strongest next step because the pages are already connected, already useful, and mainly need trust normalization instead of structural rewrites.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

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

### Page-level review scopes

#### `mortgage-payment-insurance-assumptions`

The `reviewScope` should explicitly cover:

- insurance-premium estimate realism inside mortgage-payment modeling
- coverage and renewal-risk framing
- routing between mortgage payment, homeowners insurance estimation, and PITI workflows

#### `mortgage-payment-property-tax-assumptions`

The `reviewScope` should explicitly cover:

- property-tax estimate boundaries and reassessment risk
- escrow impact on mortgage-payment assumptions
- routing between mortgage payment, property tax estimation, and escrow workflows

#### `mortgage-payment-prepaids-and-reserves`

The `reviewScope` should explicitly cover:

- prepaids and reserve treatment at closing
- cash-to-close versus monthly-payment interpretation
- routing between mortgage payment, escrow basics, and closing-cost workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- redesign the page layout
- rewrite the article body
- change calculator logic

The existing role headings are already strong enough, so the batch should focus on trust metadata, review framing, and date alignment.

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

- `mortgage-payment-insurance-assumptions.astro` includes `Use this guide when homeowners insurance assumptions are the weak point in your payment estimate`
- `mortgage-payment-property-tax-assumptions.astro` includes `Use this guide when property tax estimates are the weak point in your mortgage payment model`
- `mortgage-payment-prepaids-and-reserves.astro` includes `Use this guide when cash to close is the part of the mortgage payment workflow you need to explain`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other mortgage-payment support pages in the same turn
