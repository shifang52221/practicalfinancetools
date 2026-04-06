# Insurance Tax HOA Trust Batch Design

## Goal

Upgrade the next three mortgage-payment support guides to the stronger shared trust model while preserving their current route behavior, noindex posture, and page structure.

The target pages in this batch are:

- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/guides/hoa-fees-and-mortgage-payment.astro`

## Context

The current quality pass already established a safe pattern for support guides:

- import `TRUST_PROFILES`
- add `authorProfile` and `reviewProfiles` to `BaseLayout`
- switch `ReviewedByCard` to `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`
- keep a clear "Use this guide when..." role section near the top
- align `lastUpdated` with the visible `Last updated:` line

These three guides are still on the legacy review-card format, all sit in the same mortgage-payment support cluster, and already have strong references and internal routing. That makes them the safest next batch for steady quality normalization without changing the site's framework.

## Options

### Option 1: Upgrade only one page

Pros:

- lowest immediate risk

Cons:

- leaves the cluster inconsistent
- weakens the sitewide trust standard

### Option 2: Upgrade the full insurance-tax-HOA support cluster

Pros:

- keeps a tightly related topic set
- improves consistency across the main escrow and housing-cost support pages
- gives a clean regression target with low implementation risk

Cons:

- slightly larger batch than a single-page change

### Option 3: Skip support pages and only touch indexable pages

Pros:

- keeps visible crawl pages as the only focus

Cons:

- leaves noindex workflow pages visibly weaker
- misses the chance to strengthen AdSense and quality-review signals across the decision funnel

## Recommendation

Choose **Option 2**.

This is the safest and strongest next step. The pages are topically aligned, already interconnected, and only need trust normalization rather than structural rewrites.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/guides/hoa-fees-and-mortgage-payment.astro`

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

#### `how-to-estimate-homeowners-insurance`

The `reviewScope` should explicitly cover:

- homeowners insurance quote realism for mortgage-payment estimates
- coverage, deductible, and add-on policy tradeoffs
- routing between mortgage payment, tax estimation, and PITI workflows

#### `how-to-estimate-property-taxes`

The `reviewScope` should explicitly cover:

- local property-tax estimate boundaries
- reassessment and escrow-adjustment risk framing
- routing between mortgage payment, insurance estimation, and tax-assumption workflows

#### `hoa-fees-and-mortgage-payment`

The `reviewScope` should explicitly cover:

- HOA dues treatment inside housing-payment and DTI estimates
- special-assessment and reserve-risk framing
- routing between mortgage payment, DTI, and affordability workflows

### Copy boundary

This batch should not:

- change routes or canonicals
- change `robots`
- redesign the page layout
- change calculator logic
- rewrite the article body

The only content changes beyond trust normalization should be small wording upgrades if needed to make role cues slightly more explicit.

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

- `how-to-estimate-homeowners-insurance.astro` includes `Use this guide when homeowners insurance is the last uncertain input in your mortgage payment estimate`
- `how-to-estimate-property-taxes.astro` includes `Use this guide when property taxes are the last uncertain input in your mortgage payment estimate`
- `hoa-fees-and-mortgage-payment.astro` includes `Use this guide when HOA dues are the missing part of the housing-payment estimate`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- expand into other mortgage support pages in the same turn
