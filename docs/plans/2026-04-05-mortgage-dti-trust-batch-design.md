# Mortgage DTI Trust Batch Design

## Goal

Upgrade the next three still-legacy high-value guides so they align with the stronger trust model and clearer page-role pattern already established across the site.

The target pages in this batch are:

- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/how-to-improve-dti.astro`
- `src/pages/guides/mortgage-recast-vs-extra-payments.astro`

## Context

The current site-quality pass already proved a stable pattern for strong active guides:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- use `ReviewedByCard` with `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- add or preserve a clear "Use this guide when..." role section
- keep `lastUpdated` and visible `Last updated:` aligned

Among the remaining legacy guides, these three now give the best balance of weight and quality gap:

- `biweekly-vs-extra-principal` still has high internal demand and already has a strong role section, so this is a low-risk trust normalization
- `how-to-improve-dti` is another high-demand page whose role is strong but whose trust model still uses the old reviewer format
- `mortgage-recast-vs-extra-payments` is older, more obviously legacy, and still lacks both the shared trust layer and an explicit role section

## Options

### Option 1: Choose only the oldest pages

Pros:

- maximizes freshness lift

Cons:

- may skip higher-weight pages that still shape active user flows

### Option 2: Choose the next three pages with the best mix of weight and trust deficit

Pros:

- strongest practical lift for both SEO consistency and quality-review readiness
- keeps scope small and verifiable
- continues the trust rollout across mortgage-payoff and DTI workflows

Cons:

- not purely sorted by age

### Option 3: Skip pages that already have `ReviewedByCard`

Pros:

- concentrates only on the most obviously legacy templates

Cons:

- leaves important active pages half-upgraded and inconsistent with the stronger sitewide trust model

## Recommendation

Choose **Option 2**.

This gives the safest and strongest outcome: two partially-upgraded high-weight pages get normalized, and one clearly outdated page gets fully brought into the stronger trust model.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/how-to-improve-dti.astro`
- `src/pages/guides/mortgage-recast-vs-extra-payments.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep or add `ReviewedByCard`
- use:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- update both `lastUpdated` and visible `Last updated:` to `2026-04-05`

### Page-role reinforcement

#### `biweekly-vs-extra-principal`

This page already has a good role section. It should not be rewritten, only normalized into the shared trust system.

The `reviewScope` should explicitly cover:

- biweekly-versus-principal-only comparison logic
- program-fee and posting-timing framing
- routing into extra-payment calculators and related mortgage-payoff pages

#### `how-to-improve-dti`

This page also already has a strong role section. Treat it as a trust-model normalization pass.

The `reviewScope` should explicitly cover:

- DTI improvement ordering
- statement-cycle and documentation timing
- routing between DTI interpretation, improvement, and calculator workflows

#### `mortgage-recast-vs-extra-payments`

This page needs the biggest upgrade.

Add a short role section near the top that makes it the right page for:

- deciding between lower required payment and faster payoff
- understanding when recast availability or fees change the answer
- routing toward extra-payment modeling when the user needs to quantify the tradeoff

This page should get the full trust model plus the new role section.

### Copy boundary

This batch should not:

- redesign layouts
- change routes or canonicals
- alter calculator logic
- touch redirects or sitemap behavior
- rewrite the full bodies of these guides

The goal is trust alignment and role clarity only.

### Test strategy

Add one dedicated regression block in `tests/seo.test.ts` covering these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also lock in:

- the existing role phrase on `biweekly-vs-extra-principal`
- the existing role phrase on `how-to-improve-dti`
- a new role phrase for `mortgage-recast-vs-extra-payments`
- `lastUpdated` and visible `Last updated:` equal to `2026-04-05`

## Out Of Scope

This batch should not:

- change redirects
- change sitemap inclusion
- expand into APR or rent-vs-buy pages
- push or deploy anything
