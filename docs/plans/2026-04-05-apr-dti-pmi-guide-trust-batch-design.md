# APR DTI PMI Guide Trust Batch Design

## Goal

Upgrade the next three high-value active guides that still use the legacy review model so they better communicate authorship, review responsibility, and page role without changing the site's structure or expanding scope.

The target pages in this batch are:

- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/what-counts-in-dti.astro`
- `src/pages/guides/pmi-removal-vs-extra-principal.astro`

## Context

The previous trust-quality batches established a strong pattern for active guides:

- import `TRUST_PROFILES`
- pass `authorProfile` and `reviewProfiles` into `BaseLayout`
- use `ReviewedByCard` with `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- include a short "Use this guide when..." section that makes the page's decision role explicit
- keep `lastUpdated` and the visible `Last updated:` date aligned

The next batch should continue that same pattern on three pages that still leave obvious trust gaps.

These three were chosen because:

- they are still active workflow pages, not redirect-source cleanups
- they cover important decision topics across APR, DTI, and mortgage payoff
- two already have some role language but still rely on the old ad-hoc review model
- the PMI page is materially older and still lacks the shared trust layer entirely

## Options

### Option 1: Pick only the pages with the highest remaining internal link counts

Pros:

- straightforward numerical prioritization
- easy to defend by traffic-weight logic

Cons:

- can leave larger trust gaps untouched when a slightly lower-count page is much more obviously legacy

### Option 2: Pick the next three pages with the biggest trust deficit among still-important active guides

Pros:

- strongest quality lift per edit
- continues the sitewide trust normalization across major topics
- improves pages that are most likely to look inconsistent in a manual quality review

Cons:

- not purely sorted by link count

### Option 3: Stay inside one cluster only

Examples:

- all mortgage-payoff pages
- all DTI pages
- all credit-card APR pages

Pros:

- cleaner topical grouping

Cons:

- weaker overall sitewide trust lift right now
- delays obviously stale pages in other active flows

## Recommendation

Choose **Option 2**.

That gives the best balance between safety and impact. It improves one APR page, one DTI page, and one mortgage-payoff page with minimal structural risk and a meaningful trust-signal gain.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/what-counts-in-dti.astro`
- `src/pages/guides/pmi-removal-vs-extra-principal.astro`

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

#### `how-to-use-apr-for-credit-cards`

This page already has a role section, but it is generic and still uses the legacy reviewer format.

Strengthen it so the page clearly owns:

- comparing credit card APR types and promo windows
- separating fee treatment from daily-interest mechanics
- routing readers toward payoff, promo, and fee comparison tools

#### `what-counts-in-dti`

This page already has a strong role section, but still uses legacy review metadata.

Upgrade it with the shared trust model and make the `reviewScope` explicitly cover:

- debt inclusion rules
- income/documentation framing
- routing toward improve-DTI and calculator workflows

This page should be a light-touch trust normalization, not a rewrite.

#### `pmi-removal-vs-extra-principal`

This page is much older and still lacks both a shared trust layer and an explicit role section.

Add a short "Use this guide when..." section near the top that makes it the right page for:

- deciding whether extra principal should be prioritized because it may remove PMI sooner
- comparing PMI savings with ordinary interest savings
- understanding when appraisal rules, loan type, or servicer policy changes the answer

This is the highest-value gap in the batch.

### Copy boundary

This batch should not:

- redesign layouts
- change route structure
- change canonical paths
- alter calculator behavior
- rewrite full articles
- touch redirects or sitemap behavior

The goal is trust normalization and page-role clarity only.

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

- an explicit role phrase for `how-to-use-apr-for-credit-cards`
- the existing role phrase on `what-counts-in-dti`
- a new role phrase for `pmi-removal-vs-extra-principal`
- `lastUpdated` and visible `Last updated:` equal to `2026-04-05`

## Out Of Scope

This batch should not:

- change redirects
- change sitemap inclusion
- expand into biweekly or broader mortgage-payoff rewrites
- rewrite DTI supporting pages
- push or deploy anything
