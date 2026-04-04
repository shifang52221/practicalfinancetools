# Core Page Trust And Quality Upgrade Design

## Goal

Upgrade the remaining core calculators and index pages to the same trust, clarity, and quality standard already applied to the site's highest-priority workflows, without expanding scope into a broad guide-library rewrite.

## Context

Recent batches already improved the site's overall quality posture:

- major workflow consolidation is in place across APR, refinance, DTI, rent-vs-buy, and mortgage-payoff clusters
- trust pages now explain ownership, editorial policy, methodology, and correction handling
- the homepage, topic hubs, and several high-value calculators already expose a stronger role-based trust system
- structured data now supports author and review roles on the upgraded pages

That said, a second-tier gap is still visible across several important pages:

- some remaining calculators still use the legacy generic reviewer language
- some of the most interpretation-sensitive pages still do not explain decision boundaries strongly enough
- the three index pages still look more like navigation collections than maintained, responsibility-aware entry pages
- these gaps weaken consistency, which matters for Google quality evaluation and AdSense trust review on a finance site

This batch should stay intentionally narrow:

- no redirect strategy changes
- no sitemap strategy changes
- no framework restructuring
- no broad rewrite of all guide detail pages
- no fake expertise, fake credentials, or inflated authority claims

## Scope

This batch covers exactly eight pages:

### Calculators

- `src/pages/calculators/debt-snowball-calculator.astro`
- `src/pages/calculators/debt-avalanche-calculator.astro`
- `src/pages/calculators/debt-to-income-calculator.astro`
- `src/pages/calculators/rent-vs-buy-calculator.astro`
- `src/pages/calculators/amortization-schedule-calculator.astro`

### Index pages

- `src/pages/calculators/index.astro`
- `src/pages/topics/index.astro`
- `src/pages/guides/index.astro`

## Options

### Option 1: Trust-only patch

Add the new role-based trust model to the remaining pages, but avoid deeper page-structure changes.

Pros:

- smallest edit surface
- lowest immediate implementation risk
- quick consistency gain

Cons:

- does not fully address low-value risk on interpretation-sensitive calculators
- keeps some pages thin on usage boundaries and scenario guidance
- index pages would still feel more like link collections than maintained navigation assets

### Option 2: Standardized trust-and-quality upgrade

Apply the full current page-quality standard to the remaining calculators and index pages: trust roles, review scope, decision boundaries, input-validation guidance, scenario-routing guidance, and clear maintenance framing.

Pros:

- strongest balanced option
- materially improves page usefulness for users, not just appearance
- creates sitewide consistency between first-tier and second-tier core pages
- helps Google and AdSense see clearer ownership, review, and page purpose signals

Cons:

- more copy and regression coverage work
- requires careful page-by-page review to avoid over-explaining or duplicating trust-page content

### Option 3: Full-library expansion

Apply Option 2 and extend the same treatment to many guide detail pages in the same batch.

Pros:

- widest coverage
- could increase consistency across a larger percentage of the site

Cons:

- too large for one safe batch
- higher review burden
- greater chance of uneven quality and scope creep

## Recommendation

Choose **Option 2**.

This is the safest strong move. It improves the remaining core pages enough to matter, but still respects the site's operating principle of controlled, unified pushes instead of sprawling rewrites.

## Design

### Shared trust model

Reuse the existing role-based trust system already implemented in the first trust batch:

- `Practical Finance Tools Site Owner`
- `Practical Finance Tools Methodology Review`
- `Practical Finance Tools Editorial Review`

All eight pages in this batch should adopt:

- `authorProfile`
- `reviewProfiles`
- the upgraded `ReviewedByCard` with `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`

The language must stay specific and honest. These pages should communicate responsibility and review scope, not pretend to have named credentialed experts if none are being represented.

### Calculator-page standard

Each of the five calculators should be upgraded to the same five-layer standard:

1. Trust layer
   Show ownership and review scope explicitly.
2. Usage-boundary layer
   Explain what decision the tool helps with, what it does not decide, and which outputs are easiest to misread.
3. Input-validation layer
   Tell users where values usually come from and what common input mistakes distort results.
4. Result-interpretation layer
   Explain what to compare first, when to run a second scenario, and when to switch to a different calculator or topic hub.
5. Evidence/method layer
   Preserve or strengthen methodology and references where real support already exists, but do not add fake authority padding.

The wording should stay practical and finance-specific. The goal is to help users make fewer comparison mistakes, not just lengthen pages.

### Calculator-specific emphasis

#### Debt snowball calculator

Emphasize:

- motivation and consistency advantages
- tradeoff versus minimizing total interest
- when a user should compare snowball to avalanche before choosing a plan

#### Debt avalanche calculator

Emphasize:

- interest-minimization logic
- execution difficulty when the highest-APR debt is large
- when the practical answer may still be snowball because the user needs faster early wins

These two pages should read as a coordinated pair rather than isolated tools.

#### Debt-to-income calculator

Emphasize:

- lender/program variation
- front-end versus back-end DTI interpretation
- why the tool is not an approval predictor
- what counts as housing payment and what debt treatment varies by policy

#### Rent vs buy calculator

Emphasize:

- assumption sensitivity
- why break-even is a modeled threshold, not a forecast
- how to stress-test scenarios
- when the user should move from a quick model to a more conservative comparison workflow

#### Amortization schedule calculator

Emphasize:

- note rate versus APR
- principal-and-interest schedule versus escrow-inclusive payment views
- when to use this tool versus the extra-payment calculator
- why statements can differ slightly because of posting and rounding

### Index-page standard

The three index pages should become stronger navigation assets, not long-form trust pages.

Each index page should add:

1. trust coverage using the new role-based model
2. a clear statement of page purpose
3. route-selection guidance so users know when to start there versus going directly to a core page
4. a short maintenance/quality explanation showing that the strongest pathways are intentionally prioritized

The index pages should stay concise. They should not duplicate the full trust explanations that already live on `About`, `Editorial Policy`, `Methodology`, and `Contact`.

### Page-role guidance

#### `/calculators`

Should position itself as:

- the fastest tool-finding entry point
- a task-based chooser
- the place to start when the user knows the tool they need more than the educational workflow behind it

#### `/topics`

Should position itself as:

- the workflow-routing layer
- the place to start when the user has a decision to make, not just a single input to calculate
- the bridge between calculators and supporting guides

#### `/guides`

Should position itself as:

- the explanation layer
- the place to go deeper after choosing a workflow or calculator
- a curated library where strongest paths are surfaced first and narrower edge-case pages remain secondary

### Testing and regression design

This batch should extend source-based SEO regression coverage in `tests/seo.test.ts`.

The tests should verify:

- the five remaining calculators adopt `TRUST_PROFILES`
- the five remaining calculators use `writtenBy=` and `reviewScope=`
- the three index pages adopt the stronger trust model
- the new wording patterns do not drift back to the old generic one-line reviewer model

Regression coverage should focus on adoption and consistency, not brittle exact prose matching.

## Implementation Order

Follow this sequence:

1. upgrade the three highest interpretation-risk calculators:
   - DTI
   - rent-vs-buy
   - amortization schedule
2. upgrade the paired debt-strategy calculators:
   - debt snowball
   - debt avalanche
3. upgrade the three index pages:
   - calculators
   - topics
   - guides
4. finish by expanding regression tests and running full verification

This order reduces risk because the index pages can be written last using the final, settled page-role language from the calculator pages.

## Success Criteria

This batch is successful if:

- all eight scoped pages adopt the role-based trust model
- the five calculators explain decision boundaries and common interpretation mistakes more clearly than before
- the three index pages read like maintained entry pages rather than bare navigation collections
- no routing, sitemap, or structural strategy is disrupted
- regression tests protect the rollout
- the changes are strong enough to improve site quality posture without looking padded or artificial
