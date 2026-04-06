# Priority Guide Trust Batch Design

## Goal

Strengthen the next three highest-priority active guides that still use the legacy review model so they better communicate authorship, review responsibility, and page role without changing site structure or broadening scope.

The target pages in this batch are:

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

## Context

This site-quality pass has already established a stronger pattern for active, high-centrality pages:

- use `TRUST_PROFILES` instead of ad-hoc reviewer strings
- expose `authorProfile` and `reviewProfiles` at the `BaseLayout` level
- use `ReviewedByCard` with `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- add a short "Use this guide when..." section near the top so the page clearly owns a specific decision point
- keep `lastUpdated` and the visible `Last updated:` line aligned

The next batch should stay inside that proven pattern.

These three pages are a safe next target because:

- they are still active pages, not redirect sources
- they have relatively high internal link counts
- two of them sit in credit-card workflows where intent can easily look thin or repetitive if the page role is not explicit
- the mortgage page already has partial role guidance, so it can be normalized into the same trust system with low risk

## Options

### Option 1: Only switch the reviewer card text

Pros:

- smallest possible edit surface
- quick visual improvement

Cons:

- leaves metadata inconsistent with the rest of the upgraded site
- does not strengthen authorship or review signals in `BaseLayout`
- does not clarify the exact decision role of the credit-card pages

### Option 2: Apply the full stronger trust model to all three pages

Pros:

- matches the pattern already established across the strongest guides
- improves both user clarity and machine-readable trust consistency
- keeps the batch small and verifiable
- addresses the highest-priority remaining active guides without changing architecture

Cons:

- slightly larger edit surface than a reviewer-card-only pass

### Option 3: Expand into a larger credit-card and mortgage rewrite batch

Pros:

- more visible content refresh in one round

Cons:

- raises review risk
- increases the chance of unnecessary churn
- breaks the current principle of small, high-confidence batches

## Recommendation

Choose **Option 2**.

This is the safest and strongest path because it:

- preserves the framework and current page hierarchy
- improves trust consistency on active pages that still look legacy
- keeps the work narrowly scoped to pages with the highest current leverage
- supports the broader goal of reducing low-value quality signals without triggering broad structural change

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

#### Test coverage to extend

- `tests/seo.test.ts`

### Trust-model upgrade rules

Each target page should:

- import `TRUST_PROFILES` from `src/config/trust`
- pass `authorProfile={TRUST_PROFILES.siteOwner}` into `BaseLayout`
- pass `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` into `BaseLayout`
- keep `ReviewedByCard`, but replace the legacy `reviewedBy` string and `reviewerRole` string with:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- update both `lastUpdated` and the visible `Last updated:` line to `2026-04-05`

### Page-role reinforcement

#### `how-credit-card-interest-is-calculated`

Add a short role section near the top that makes this page the clear home for:

- users who need to understand daily interest mechanics before trusting a payoff estimate
- users whose statement interest does not match a simple monthly estimate
- users deciding whether they should use the fixed-payment payoff calculator or the minimum-payment calculator next

#### `why-minimum-payments-take-so-long`

Add a short role section near the top that makes this page the clear home for:

- users who need to understand why minimum rules barely reduce principal early on
- users comparing a statement minimum path with a fixed-payment payoff path
- users who need a practical bridge from explanation to the correct calculator

#### `one-extra-mortgage-payment-per-year`

Keep the existing role section, but align the page with the stronger trust model and make the review scope explicitly about:

- timing of annual extra payments
- monthly-versus-lump-sum comparison framing
- routing into the calculator and related mortgage-payoff decision pages

This page should not be rewritten just because it already has a good role section.

### Copy boundary

This batch should not:

- redesign any layout
- change routes or canonical paths
- remove existing examples or references
- rewrite the entire article bodies
- change calculator behavior
- change topic-hub structure

The goal is consistency and clarity, not a full editorial rewrite.

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

- a page-role phrase for the two credit-card guides
- the existing role section on the mortgage page
- aligned `lastUpdated` and visible `Last updated:` set to `2026-04-05`

The goal is to freeze the stronger trust model so later edits do not silently drift back to the legacy pattern.

## Out Of Scope

This batch should not:

- touch redirect-source pages
- change sitemap rules
- change redirects
- refactor calculators
- rewrite the credit-card topic hub
- rewrite `rent-vs-buy-checklist`, `amortization-with-extra-payments`, or other remaining guides yet
- commit or push anything
