# Extra Payment Operational Support Trust Batch Design

## Goal

Upgrade the remaining legacy indexable extra-payment support guides that still look thin or outdated, and lightly refresh the main extra-payment entry page so these support guides are clearly routed inside the mortgage-payoff system.

The target pages in this batch are:

- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- `src/pages/guides/extra-payment-escrow-not-affected.astro`
- `src/pages/guides/extra-payment-windfall-strategy.astro`
- `src/pages/guides/extra-mortgage-payments.astro`

## Context

The extra-payment cluster is already much stronger in three areas:

- risk and cash-allocation decisions
- execution details such as target payoff dates and servicer posting
- topic-level routing through the refreshed mortgage-payoff hub

But four still-indexable support guides remain in an older state:

- no shared author/reviewer trust model
- no visible review coverage
- stale dates from February
- limited official references
- weak role framing

That creates an avoidable quality gap. The cluster already explains whether extra payments make sense and how to execute them. What it still underserves is the operational support layer:

- should you pay for an accelerated-payment service or just do it yourself?
- could extra payments trigger a penalty or restriction?
- why does escrow not fall when principal falls?
- how should a bonus or refund be split between reserves and a lump sum?

These are practical questions real users ask before acting. Leaving them thin weakens both SEO trust and manual-review quality.

## Options

### Option 1: Upgrade the four indexable support guides and refresh the extra-payment entry page

Pros:

- strongest topical coherence
- closes the most obvious remaining quality gap inside the mortgage-payoff cluster
- improves both user routing and manual-review credibility

Cons:

- touches five files instead of only three

### Option 2: Spend the next batch on the already-`noindex` amount-specific pages

Pros:

- many pages could be refreshed

Cons:

- weaker SEO payoff because those pages are intentionally not part of the main indexable layer
- does less to improve the quality of the core cluster

### Option 3: Merge or noindex more pages now instead of upgrading these support guides

Pros:

- reduces page count quickly

Cons:

- premature pruning risks losing useful support intent coverage
- does not strengthen the current entry-to-support workflow first

## Recommendation

Choose **Option 1**.

This is the safest and strongest next step because it improves pages that are still indexable, still useful, and still clearly below the trust standard already established elsewhere in the topic. It also avoids overreacting by pruning pages before the support layer has been given a fair chance to become genuinely strong.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- `src/pages/guides/extra-payment-escrow-not-affected.astro`
- `src/pages/guides/extra-payment-windfall-strategy.astro`

#### Entry page to refresh

- `src/pages/guides/extra-mortgage-payments.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules for the four support guides

Each support guide should:

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
- set `reviewedOn="2026-04-06"`
- set `const lastUpdated = "2026-04-06";`
- align the visible `Last updated:` line to `2026-04-06`
- add a strong top role section starting with `Use this guide when...`
- add a small official `References` section

### Page-level role framing and review scopes

#### `extra-payment-accelerated-plan`

Role phrase:

- `Use this guide when an accelerated payment plan sounds convenient, but you need to know whether it really beats a simple DIY extra-payment plan`

The `reviewScope` should explicitly cover:

- fee-based accelerated-payment programs versus DIY monthly extras
- posting timing and paid-ahead risk
- routing between biweekly, extra-payment, and principal-only workflows

#### `extra-payment-prepayment-penalty-checklist`

Role phrase:

- `Use this guide when you need to confirm that extra payments will not trigger a prepayment penalty or lender restriction`

The `reviewScope` should explicitly cover:

- prepayment-penalty interpretation
- partial-prepayment versus full-payoff questions
- routing between penalty checks, extra-payment modeling, and refinance alternatives

#### `extra-payment-escrow-not-affected`

Role phrase:

- `Use this guide when you expect extra principal to lower the total mortgage bill and need to separate principal from escrow`

The `reviewScope` should explicitly cover:

- principal-and-interest versus escrow separation
- PMI and escrow timing misconceptions
- routing between escrow, payment-structure, and extra-payment workflows

#### `extra-payment-windfall-strategy`

Role phrase:

- `Use this guide when a bonus, refund, or other windfall could become a mortgage lump sum but liquidity still matters`

The `reviewScope` should explicitly cover:

- reserve-first windfall allocation
- higher-priority debt and time-horizon checks
- routing between lump-sum, liquidity, and payoff-versus-investing workflows

### Entry-page refresh goals for `extra-mortgage-payments`

This page already has the stronger trust model, so the goal is not a rewrite. The goal is to make it a better organizer for the support pages above.

It should:

- update `const lastUpdated` and visible `Last updated:` to `2026-04-06`
- update `reviewedOn` to `2026-04-06`
- add a clear top role phrase:
  - `Use this guide when you want the main extra-payment workflow before choosing a specific decision or operational support path`
- add or strengthen a routing section that links readers to:
  - `extra-payment-accelerated-plan`
  - `extra-payment-prepayment-penalty-checklist`
  - `extra-payment-escrow-not-affected`
  - `extra-payment-windfall-strategy`

### References strategy

Use primary official sources only.

#### `extra-payment-accelerated-plan`

Suggested sources:

- `https://www.consumerfinance.gov/consumer-tools/mortgages/`
- `https://www.consumerfinance.gov/about-us/blog/your-mortgage-servicer-must-comply-with-federal-rules/`

#### `extra-payment-prepayment-penalty-checklist`

Suggested sources:

- `https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/`
- `https://www.consumerfinance.gov/consumer-tools/mortgages/`

#### `extra-payment-escrow-not-affected`

Suggested sources:

- `https://www.consumerfinance.gov/ask-cfpb/how-do-i-manage-my-monthly-mortgage-payment-en-1825/`
- `https://www.consumerfinance.gov/consumer-tools/mortgages/`

#### `extra-payment-windfall-strategy`

Suggested sources:

- `https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/`
- `https://www.consumerfinance.gov/consumer-tools/mortgages/`

### Routing cleanup

This batch should prefer routing toward the strongest current extra-payment system pages instead of scattering readers into weaker or tangential paths.

Prefer linking to:

- `extra-mortgage-payments`
- `extra-payment-liquidity-reserve`
- `extra-payment-lump-sum-vs-monthly`
- `extra-payment-priority-vs-other-debts`
- `extra-payment-servicer-posting-rules`
- `principal-only-extra-payments`
- `one-extra-mortgage-payment-per-year`
- `biweekly-vs-extra-principal`
- `mortgage-recast-vs-extra-payments`
- `extra-payment-calculator`
- `additional-principal-payment-calculator`
- `amortization-schedule-calculator`

### Copy boundary

This batch should not:

- change routes or canonical paths
- redesign page layouts
- alter calculator logic
- widen into the `noindex` amount-template pages
- merge or delete support pages

Allowed changes:

- add the shared trust model to the four support guides
- rewrite thin sections so each page reads like a reviewed operational guide
- add concise official references
- improve CTA and related-guide routing
- lightly refresh `extra-mortgage-payments` so it can route users into these support pages

### Test strategy

Add one regression block in `tests/seo.test.ts` for the four support guides.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`
- the exact role phrase for each page
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

Add one regression block for `extra-mortgage-payments.astro`.

Require:

- `Use this guide when you want the main extra-payment workflow before choosing a specific decision or operational support path`
- links to:
  - `href="/guides/extra-payment-accelerated-plan"`
  - `href="/guides/extra-payment-prepayment-penalty-checklist"`
  - `href="/guides/extra-payment-escrow-not-affected"`
  - `href="/guides/extra-payment-windfall-strategy"`
- `reviewedOn="2026-04-06"`
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into other topic clusters
- alter sitemap or redirect rules
