# Mortgage Payoff Topic Refresh Design

## Goal

Refresh the mortgage-payoff topic hub so it reflects the strengthened extra-payment decision system, routes readers into the right decision or execution guide, and aligns its visible freshness signals with the newer work already completed in this cluster.

The target page in this batch is:

- `src/pages/topics/mortgage-payoff.astro`

## Context

The extra-payment cluster now has stronger pages for:

- overall extra-payment workflow
- liquidity and reserve risk
- higher-priority debt comparisons
- tax-adjusted payoff framing
- lump-sum versus monthly timing
- target payoff dates
- servicer posting rules
- principal-only verification

The topic hub still looks older by comparison:

- `lastUpdated` is still `2026-04-03`
- chooser language does not fully expose the new decision and execution layers
- the page still spends too much space on broad or secondary paths rather than the strongest extra-payment routes

That creates a mismatch: the cluster itself is stronger than the topic page that is supposed to organize it.

## Options

### Option 1: Refresh only the mortgage-payoff topic hub now

Pros:

- lowest-risk next step
- immediately improves internal routing and cluster coherence
- helps both crawlers and users understand the stronger topic structure

Cons:

- touches only one page

### Option 2: Keep editing more leaf guides before revisiting the hub

Pros:

- increases total page count touched

Cons:

- the hub continues to undersell the work already done
- strong guides remain less discoverable from the topic entry point

### Option 3: Do a full-site topic-hub sweep now

Pros:

- broad consistency

Cons:

- breaks current topic focus
- higher chance of spreading effort too thin

## Recommendation

Choose **Option 1**.

This is the cleanest next move because it lets the mortgage-payoff topic hub catch up to the stronger content already created beneath it. That improves SEO cohesion, user routing, and manual-review credibility without fragmenting the work.

## Design

### Scope

#### Page to refresh

- `src/pages/topics/mortgage-payoff.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Refresh goals

The topic hub should:

- keep its existing route and general topic purpose
- preserve `ReviewedByCard`, `authorProfile`, `reviewProfiles`, and the existing `Choose your mortgage payoff starting point` phrase
- update `const lastUpdated` and the visible `Last updated:` line to `2026-04-06`
- update `reviewedOn` to `2026-04-06`
- make the cluster feel like a complete system, not a loose list of links

### New structural emphasis

The page should more clearly separate three layers:

#### 1. Starting calculators

Keep a concise calculator-first entry path for:

- baseline payment
- amortization schedule
- extra-payment calculator
- additional principal calculator

#### 2. Decision guides

Add a stronger section that explicitly routes readers into the decision layer:

- `extra-payment-liquidity-reserve`
- `extra-payment-priority-vs-other-debts`
- `extra-payment-tax-deduction-impact`
- `pay-off-mortgage-early-or-invest`

Suggested heading phrase:

- `Choose the extra-payment decision guide`

#### 3. Execution guides

Add a stronger section that explicitly routes readers into the execution layer:

- `extra-payment-lump-sum-vs-monthly`
- `extra-payment-target-payoff-date`
- `extra-payment-servicer-posting-rules`
- `principal-only-extra-payments`
- `one-extra-mortgage-payment-per-year`

Suggested heading phrase:

- `Choose the extra-payment execution guide`

### Routing cleanup

The refreshed topic hub should prioritize the strongest current extra-payment paths and reduce emphasis on weaker or more tangential routes.

Prefer prominent routing toward:

- `extra-payment-calculator`
- `additional-principal-payment-calculator`
- `extra-mortgage-payments`
- `extra-payment-liquidity-reserve`
- `extra-payment-priority-vs-other-debts`
- `extra-payment-tax-deduction-impact`
- `extra-payment-lump-sum-vs-monthly`
- `extra-payment-target-payoff-date`
- `extra-payment-servicer-posting-rules`
- `principal-only-extra-payments`

### References strategy

Use official CFPB pages only, keeping the references short and directly relevant to mortgage payment management and prepayment questions.

Suggested sources:

- `https://www.consumerfinance.gov/consumer-tools/mortgages/`
- `https://www.consumerfinance.gov/ask-cfpb/how-do-i-manage-my-monthly-mortgage-payment-en-1825/`
- `https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/`

### Copy boundary

This batch should not:

- change routes or canonical paths
- redesign topic layout patterns
- rewrite unrelated topic hubs
- alter calculator logic

Allowed changes:

- update date and review freshness
- tighten hero copy and CTA routing
- add stronger decision and execution sections
- trim or compress weaker secondary sections

### Test strategy

Add one regression block in `tests/seo.test.ts` for the refreshed topic page.

Require:

- `Choose your mortgage payoff starting point`
- `Choose the extra-payment decision guide`
- `Choose the extra-payment execution guide`
- links to:
  - `extra-payment-liquidity-reserve`
  - `extra-payment-priority-vs-other-debts`
  - `extra-payment-tax-deduction-impact`
  - `extra-payment-lump-sum-vs-monthly`
  - `extra-payment-target-payoff-date`
  - `extra-payment-servicer-posting-rules`
- `reviewedOn="2026-04-06"`
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other topic hubs
- alter sitemap or redirect rules
