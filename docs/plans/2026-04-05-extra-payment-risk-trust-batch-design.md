# Extra Payment Risk Trust Batch Design

## Goal

Upgrade the highest-priority legacy extra-payment support guides in the risk and cash-allocation layer to the stronger shared trust model while preserving their current routes and decision-support role inside the mortgage-payoff system.

The target pages in this batch are:

- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- `src/pages/guides/extra-payment-tax-deduction-impact.astro`

## Context

The broader mortgage-payoff cluster already has stronger destination pages and reviewed support content across:

- extra payment modeling
- refinance comparison
- payoff-versus-investing tradeoffs
- servicer posting rules
- principal-only workflow
- biweekly versus extra principal framing

The weakest remaining indexable pages in this topic are concentrated around the decision risks that stop extra payments from being a universally good answer:

- liquidity risk
- higher-APR debt priority
- after-tax value

That makes this batch strategically important. It does not just "add trust widgets." It strengthens the cluster's credibility by showing the site can explain when extra payments are the wrong priority, when cash should stay liquid, and when tax assumptions change the real answer.

## Options

### Option 1: Upgrade the three risk pages as a coherent mini-cluster

Pros:

- strongest topical coherence
- directly addresses low-value signals in a sensitive YMYL-style decision area
- improves both SEO quality signals and AdSense/manual-review readiness

Cons:

- affects only three pages in this batch

### Option 2: Spread effort across unrelated legacy pages

Pros:

- more pages touched immediately

Cons:

- weaker topic system feel
- easier to create scattered improvements without improving overall decision quality

### Option 3: Focus on visual cleanup without trust/depth upgrades

Pros:

- faster cosmetic change

Cons:

- does not materially address low-value classification risk
- leaves thin decision framing in place

## Recommendation

Choose **Option 1**.

This is the safest and strongest next move because it upgrades the most important unresolved support pages in one coherent decision layer. Instead of telling readers to prepay faster by default, the topic will better reflect real tradeoffs around liquidity, competing debt costs, and tax treatment.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- `src/pages/guides/extra-payment-tax-deduction-impact.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `ReviewedByCard`
- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
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
- add a small official references section

### Page-level role framing and review scopes

#### `extra-payment-liquidity-reserve`

Role phrase:

- `Use this guide when liquidity risk is the main reason you hesitate to make extra mortgage payments`

The `reviewScope` should explicitly cover:

- emergency reserves before extra payments
- home-repair and income-shock buffer framing
- routing between affordability, payoff, and payoff-versus-investing workflows

#### `extra-payment-priority-vs-other-debts`

Role phrase:

- `Use this guide when another debt payoff may deserve priority over extra mortgage principal`

The `reviewScope` should explicitly cover:

- higher-APR debt priority checks
- revolving-debt and utilization implications
- routing between credit-card payoff, extra payment, and APR interpretation workflows

#### `extra-payment-tax-deduction-impact`

Role phrase:

- `Use this guide when tax assumptions are changing the after-tax value of extra mortgage payments`

The `reviewScope` should explicitly cover:

- mortgage-interest deduction limits and itemizing checks
- after-tax mortgage-rate framing
- routing between payoff-versus-investing, refinance, and extra-payment modeling workflows

### References strategy

Use primary official sources only.

#### `extra-payment-liquidity-reserve`

Use CFPB resources that directly cover:

- emergency funds
- unplanned home or income shocks
- keeping savings accessible instead of relying on debt

Suggested source:

- `https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/`

#### `extra-payment-priority-vs-other-debts`

Use official FTC / consumer.gov resources that directly cover:

- debt problems and repayment planning
- how credit cards and APRs affect borrowing cost
- how credit history and outstanding balances affect borrowing terms

Suggested sources:

- `https://consumer.gov/debt/debt-explained`
- `https://consumer.gov/credit/getting-credit-card`
- `https://consumer.gov/credit/your-credit-history-explained`

#### `extra-payment-tax-deduction-impact`

Use IRS sources that directly cover:

- Publication 936
- mortgage-interest deduction rules
- itemized-deduction context

Suggested sources:

- `https://www.irs.gov/forms-pubs/about-publication-936`
- `https://www.irs.gov/taxtopics/tc505`

### Routing cleanup

These pages should avoid leaning on weaker or older support-page routing when stronger active workflow pages already exist.

Prefer routing toward:

- `extra-mortgage-payments`
- `pay-off-mortgage-early-or-invest`
- `extra-payment-vs-refinance`
- `credit-card-payoff-strategy`
- `how-credit-card-interest-is-calculated`
- `how-to-use-apr-for-credit-cards`
- `extra-payment-calculator`
- `credit-card-payoff-calculator`
- `mortgage-payment-calculator`

### Copy boundary

This batch should not:

- change routes or canonical paths
- redesign layouts
- alter calculator logic
- widen into unrelated topic clusters

Allowed additions:

- add one role section near the top of each page
- add one `ReviewedByCard`
- add one small official references section
- tighten CTA and related-guide routing
- reshape the body enough to read like a stronger reviewed decision-support guide

### Test strategy

Add one regression block in `tests/seo.test.ts` for these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also lock in role phrases:

- `extra-payment-liquidity-reserve.astro` includes `Use this guide when liquidity risk is the main reason you hesitate to make extra mortgage payments`
- `extra-payment-priority-vs-other-debts.astro` includes `Use this guide when another debt payoff may deserve priority over extra mortgage principal`
- `extra-payment-tax-deduction-impact.astro` includes `Use this guide when tax assumptions are changing the after-tax value of extra mortgage payments`

And require each page's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- merge or delete support pages
- alter redirects or sitemap rules
