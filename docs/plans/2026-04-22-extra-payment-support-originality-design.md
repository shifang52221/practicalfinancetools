# Extra Payment Support Originality Design

## Goal

Strengthen the originality and decision clarity of the indexable extra-payment support guides so they no longer read like interchangeable checklist leaves.

## Why This Change

The extra-payment cluster is one of the site's highest-value workflow areas, but several support pages still show a catalog-template pattern:

- repeated list sections with only light topical variation,
- weak differentiation between pages that should answer very different decisions,
- inconsistent trust coverage across indexable support pages.

That combination makes the cluster easier to mistake for a templated tool-support site rather than a set of distinct editorial decision pages.

## Target Pages

- `/guides/extra-payment-target-payoff-date`
- `/guides/extra-payment-accelerated-plan`
- `/guides/extra-payment-liquidity-reserve`
- `/guides/extra-payment-windfall-strategy`
- `/guides/extra-payment-priority-vs-other-debts`

## Desired Role by Page

### 1. Target payoff date

This page should answer: how do I reverse-engineer a payoff date without forcing a monthly extra that only works in a perfect month?

The page should emphasize:

- reverse-engineering the monthly extra,
- monthly ceiling discipline,
- whether the target survives interruptions.

### 2. Accelerated plan

This page should answer: is a paid third-party acceleration plan solving a real problem, or just repackaging the same annual dollars with fee drag?

The page should emphasize:

- third-party acceleration plan reality,
- same annual dollars on your own,
- fee drag and posting timing.

### 3. Liquidity reserve

This page should answer: when is extra principal the wrong move because the reserve floor is not healthy enough yet?

The page should emphasize:

- reserve floor first,
- extra principal is the wrong move in fragile cash situations,
- when to pause the extra payment plan.

### 4. Windfall strategy

This page should answer: how should a one-time bonus, inheritance, or cash event be split before it becomes a principal payment?

The page should emphasize:

- windfall split before it becomes a principal payment,
- tax bill, reserve rebuild, or near-term spending claims on the cash,
- lump sum versus staged extra payments.

### 5. Priority vs other debts

This page should answer: when should mortgage prepayment lose priority to higher-cost debt, reserve weakness, or short-horizon cash risk?

The page should emphasize:

- mortgage prepayment is not automatically the top priority,
- highest guaranteed return is not the only filter,
- revolving debt, reserve weakness, or near-term cash risk.

## Shared Structural Pattern

Each page should keep its own voice and decision role, but share a stronger trust-and-routing frame:

- hero that names the narrow decision job,
- one "use this page when..." or equivalent role section,
- one section showing when the strategy is the wrong move,
- one section clarifying next-step routing,
- `ReviewedByCard`,
- stronger author/reviewer metadata,
- visible `Last updated`,
- a compact References section where useful.

## Content Constraints

- Avoid repeating generic "inputs / checklist / common mistakes / related tools" stacks unless they materially advance the page's own decision job.
- Replace filler lists with scenario-specific judgment language.
- Preserve links to the strongest next pages in the mortgage-payoff cluster.
- Do not introduce redirect-source guide links.

## Test Strategy

Add one SEO regression test that verifies these five indexable support guides keep distinct role cues and stronger trust coverage.

The test should assert:

- page-specific differentiating phrases for each guide,
- `ReviewedByCard`,
- stronger author/reviewer metadata,
- matching visible `Last updated`.

## Expected Outcome

After this change, the extra-payment support cluster should look more like a set of distinct decision-support pages and less like repeated support templates with swapped nouns.
