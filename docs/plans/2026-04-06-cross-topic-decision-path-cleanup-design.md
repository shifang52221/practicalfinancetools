# Cross-Topic Decision Path Cleanup Design

## Goal

Tighten three already-strong decision/support pages so they stop leaking readers into the `rent-vs-buy` cluster when the page intent is clearly mortgage payoff, refinance, or DTI workflow support.

This batch is intentionally conservative:

- no new pages
- no route changes
- no redirect changes
- no `noindex` changes
- no framework changes

The work is limited to internal-link focus, CTA hygiene, and regression coverage.

## Context

Recent batches already improved:

- mortgage payment support-page focus
- mortgage payoff routing
- refinance cluster consolidation
- DTI trust and support coverage

The next highest-confidence cleanup is smaller and more surgical.

Three pages still leak into the `rent-vs-buy` cluster even though their own user intent is already strong:

- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- `src/pages/guides/refinance-cash-in-lower-rate.astro`
- `src/pages/guides/how-to-improve-dti.astro`

This is not a structural emergency, but it does weaken topical clarity:

- mortgage payoff users should stay inside mortgage payoff calculators and support guides
- refinance users should stay inside refinance comparison and closing-cost workflows
- DTI users should stay inside DTI interpretation and improvement workflows

When these pages still point into `rent-vs-buy`, the site looks less curated and more template-driven.

## In-Scope Pages

- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- `src/pages/guides/refinance-cash-in-lower-rate.astro`
- `src/pages/guides/how-to-improve-dti.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Remove the off-topic links only

Pros:

- lowest risk
- improves topical focus immediately
- easy to protect with a regression test

Cons:

- leaves a weaker user journey after removal

### Option 2: Replace the off-topic links with same-cluster destinations

Pros:

- still low risk
- improves both topical focus and next-step quality
- keeps each page inside its own native topic path

Cons:

- slightly broader than pure removal

### Option 3: Sweep all remaining cross-topic links across the site

Pros:

- broader architecture cleanup

Cons:

- too much scope for one batch
- higher chance of touching contextually valid cross-topic links
- worse fit for the current conservative workflow

## Recommendation

Choose **Option 2**.

This is the safest strong move because it removes the off-topic leak and replaces it with a more useful next step inside the correct cluster.

## Design

### Routing rule

Pages in this batch should route readers toward their own native workflow:

- mortgage payoff pages -> mortgage payoff calculators, amortization, extra-payment guides, topic hub
- refinance pages -> refinance break-even, checklist, closing-cost, topic hub
- DTI pages -> DTI calculator, calculation workflow, interpretation pages, topic hub

Avoid routing these pages toward:

- `rent-vs-buy` calculators
- `rent-vs-buy` guides

This rule applies only to the three in-scope pages.

### Replacement strategy

#### `pay-off-mortgage-early-or-invest`

Remove:

- `/calculators/rent-vs-buy-calculator`

Replace with:

- `/calculators/amortization-schedule-calculator`

Reason:

- the surrounding sentence is about running payoff scenarios
- amortization timing is directly relevant
- it keeps the user inside the mortgage payoff decision path

#### `refinance-cash-in-lower-rate`

Remove:

- `/guides/rent-vs-buy-break-even`

Replace with:

- `/guides/refinance-break-even`

Reason:

- the page is already part of the refinance cluster
- break-even is the most central adjacent refinance decision page
- duplication with `Next steps` is acceptable here because the destination is highly relevant and trusted

#### `how-to-improve-dti`

Remove:

- `/guides/rent-vs-buy-break-even`

Replace with:

- `/guides/dti-calculation-step-by-step`

Reason:

- the page is about improving DTI and knowing when to rerun it
- a calculation walkthrough is a better next step than a housing-choice comparison
- it deepens the DTI workflow instead of leaving the topic cluster

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- `pay-off-mortgage-early-or-invest` does not include `href="/calculators/rent-vs-buy-calculator"` and does include `href="/calculators/amortization-schedule-calculator"`
- `refinance-cash-in-lower-rate` does not include `href="/guides/rent-vs-buy-break-even"` and still includes `href="/guides/refinance-break-even"`
- `how-to-improve-dti` does not include `href="/guides/rent-vs-buy-break-even"` and does include `href="/guides/dti-calculation-step-by-step"`

This keeps the regression narrow and prevents reintroduction of the same cross-topic leak.

## Out of Scope

- changing routes or canonicals
- changing redirects
- changing sitemap rules
- changing indexability
- rewriting page structure
- sitewide cross-topic cleanup beyond these three files
- pushing, deploying, or committing
