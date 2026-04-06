# DTI Escrow Trust Batch Design

## Goal

Upgrade the next three mortgage-payment support guides to the stronger shared trust model while preserving their route behavior, `noindex` posture, and existing workflow structure.

The target pages in this batch are:

- `src/pages/guides/mortgage-payment-dti-housing-payment.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`

## Context

The ongoing quality pass already established a stable support-page upgrade pattern:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- keep a strong "Use this guide when..." role section near the top
- align `lastUpdated` with the visible `Last updated:` line

These three pages are the next safest cluster because they form one continuous housing-payment workflow:

- `mortgage-payment-dti-housing-payment` explains the full housing payment used in DTI
- `mortgage-payment-escrow-account` explains the monthly escrow baseline
- `mortgage-payment-escrow-shortage` explains why that payment can jump later

Together they strengthen the site's quality story around realistic payment assumptions, escrow interpretation, and borrower decision flow.

## Options

### Option 1: Upgrade only the two escrow pages

Pros:

- keeps the batch narrowly focused on escrow

Cons:

- leaves the DTI housing-payment step on the older trust format
- weakens the continuity of the housing-payment workflow

### Option 2: Upgrade the full DTI-plus-escrow workflow cluster

Pros:

- creates a cleaner thematic batch
- strengthens internal consistency across payment modeling and underwriting interpretation
- keeps the work small and low-risk

Cons:

- slightly broader than a single-topic escrow pair

### Option 3: Skip support pages and only focus on higher-visibility indexable pages

Pros:

- keeps all effort on crawl-visible pages

Cons:

- leaves important support pages weaker and inconsistent
- does less to improve the site's overall "complete workflow" quality profile

## Recommendation

Choose **Option 2**.

This is the safest and strongest next step because the three pages already belong to one decision path and need trust normalization more than body rewrites.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/mortgage-payment-dti-housing-payment.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`

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

#### `mortgage-payment-dti-housing-payment`

The `reviewScope` should explicitly cover:

- full housing-payment inclusion inside DTI
- front-end versus back-end ratio interpretation
- routing between DTI calculator, mortgage payment calculator, and affordability workflows

#### `mortgage-payment-escrow-account`

The `reviewScope` should explicitly cover:

- escrow baseline components for taxes and insurance
- cushion, annual review, and payment-drift framing
- routing between mortgage payment, principal-versus-escrow, and shortage workflows

#### `mortgage-payment-escrow-shortage`

The `reviewScope` should explicitly cover:

- shortage-cause interpretation
- separation of ongoing escrow baseline versus shortage repayment
- routing between escrow basics, payment calculator, and statement-structure workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- redesign the page layout
- rewrite the article body
- change calculator logic

The role headings on all three pages are already strong enough, so the batch should mainly normalize trust metadata and dates.

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

- `mortgage-payment-dti-housing-payment.astro` includes `Use this guide when your DTI answer depends on the full housing payment`
- `mortgage-payment-escrow-account.astro` includes `Use this guide when you need the escrow baseline before troubleshooting payment changes`
- `mortgage-payment-escrow-shortage.astro` includes `Use this guide when your payment jumped after an escrow analysis`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other mortgage-payment support pages in the same turn
