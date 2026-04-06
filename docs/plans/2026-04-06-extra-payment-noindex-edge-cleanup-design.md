# Extra Payment Noindex Edge Cleanup Design

## Goal

Tighten the structure of the remaining `noindex` extra-payment edge pages so they stop behaving like a loose secondary content cluster and instead act as controlled feeder pages into the strengthened mortgage-payoff system.

The target pages in this batch are:

- `src/pages/guides/pay-50-extra-on-mortgage.astro`
- `src/pages/guides/pay-100-extra-on-mortgage.astro`
- `src/pages/guides/pay-150-extra-on-mortgage.astro`
- `src/pages/guides/pay-200-extra-on-mortgage.astro`
- `src/pages/guides/pay-250-extra-on-mortgage.astro`
- `src/pages/guides/pay-300-extra-on-mortgage.astro`
- `src/pages/guides/pay-400-extra-on-mortgage.astro`
- `src/pages/guides/pay-500-extra-on-mortgage.astro`
- `src/pages/guides/pay-1000-extra-on-mortgage.astro`
- `src/pages/guides/mortgage-lump-sum-5000.astro`
- `src/pages/guides/mortgage-lump-sum-10000.astro`
- `src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro`
- `src/pages/guides/mortgage-extra-principal-calculator.astro`
- `src/pages/guides/extra-mortgage-payment-calculator.astro`

## Context

The indexable extra-payment cluster is now much stronger:

- core workflow framing
- decision-layer guides
- execution-layer guides
- operational support guides
- topic-level routing

The remaining quality risk is concentrated in the `noindex` edge layer.

These pages are not meant to carry the topic, but they still matter because they can:

- create unnecessary internal-link noise
- keep routing users into old alias pages instead of strong destinations
- make the site feel more templated than the main cluster really is

The current issues are concentrated in three patterns:

### 1. Amount-specific monthly-extra pages

The `pay-$X-extra-on-mortgage` pages are mostly old template variants. They remain `noindex`, but several still link to each other.

That makes them behave like a small alternate cluster even though they are not supposed to be a core destination layer.

### 2. Lump-sum amount pages

`mortgage-lump-sum-5000` and `mortgage-lump-sum-10000` are somewhat stronger than the `pay-$X` pages because they contain worked examples, but they are still parameter variants rather than the best canonical explanation pages.

They should feed into stronger lump-sum and principal-only workflows rather than reinforce each other as a mini-cluster.

### 3. Old alias-style workflow pages

These pages:

- `calculate-mortgage-payoff-with-additional-principal-payments`
- `mortgage-extra-principal-calculator`
- `extra-mortgage-payment-calculator`

already sit behind `noindex` and are part of existing consolidation logic, but they still act like semi-independent entry pages. Some of them still point at each other.

That weakens the consolidation work already done elsewhere.

## Options

### Option 1: Keep the pages, keep `noindex`, and clean the structure

Pros:

- lowest risk
- preserves useful long-tail landing coverage without elevating these pages
- reduces internal-link noise and aligns them with the stronger cluster

Cons:

- leaves the pages in place for now

### Option 2: Start redirecting and deleting the pages immediately

Pros:

- fastest path to a smaller page set

Cons:

- higher coordination risk
- more likely to disturb accepted local work and link assumptions
- premature before the internal routing is fully cleaned

### Option 3: Upgrade the edge pages into stronger standalone content

Pros:

- more polished individual pages

Cons:

- poor ROI
- repeats content that the stronger indexable cluster already covers
- works against the goal of reducing low-value structural noise

## Recommendation

Choose **Option 1**.

This is the safest and strongest next move because it preserves useful coverage while stopping the edge layer from acting like a shadow content system. It cleans the site architecture without forcing aggressive redirect or merge decisions before the structure is fully tidy.

## Design

### Scope

#### Monthly-extra amount pages

- `pay-50-extra-on-mortgage`
- `pay-100-extra-on-mortgage`
- `pay-150-extra-on-mortgage`
- `pay-200-extra-on-mortgage`
- `pay-250-extra-on-mortgage`
- `pay-300-extra-on-mortgage`
- `pay-400-extra-on-mortgage`
- `pay-500-extra-on-mortgage`
- `pay-1000-extra-on-mortgage`

#### Lump-sum amount pages

- `mortgage-lump-sum-5000`
- `mortgage-lump-sum-10000`

#### Alias-style noindex entry pages

- `calculate-mortgage-payoff-with-additional-principal-payments`
- `mortgage-extra-principal-calculator`
- `extra-mortgage-payment-calculator`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Structural rules for this batch

These pages should:

- remain `robots="noindex, follow"`
- keep their existing canonical paths for now
- stop linking to other `noindex` siblings in the same weak layer unless the link is to the same page
- route readers toward stronger destinations instead

This batch is about routing hygiene, not content expansion.

### Allowed destination patterns

#### For `pay-$X` pages

Prefer routing only toward:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/guides/extra-mortgage-payments`
- `/guides/amortization-with-extra-payments`
- `/guides/principal-only-extra-payments`
- `/guides/one-extra-mortgage-payment-per-year`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/topics/mortgage-payoff`

Avoid linking to:

- other `pay-$X` pages
- `mortgage-lump-sum-*` pages

#### For lump-sum pages

Prefer routing only toward:

- `/calculators/additional-principal-payment-calculator`
- `/calculators/extra-payment-calculator`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/guides/extra-payment-windfall-strategy`
- `/guides/principal-only-extra-payments`
- `/guides/extra-payment-prepayment-penalty-checklist`
- `/topics/mortgage-payoff`

Avoid linking to:

- each other
- `pay-$X` pages

#### For alias-style noindex entry pages

Prefer routing only toward:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/guides/extra-mortgage-payments`
- `/guides/amortization-with-extra-payments`
- `/guides/principal-only-extra-payments`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/topics/mortgage-payoff`

Avoid linking to:

- the other alias-style noindex entry pages
- `pay-$X` pages
- `mortgage-lump-sum-*` pages

### Copy boundary

This batch should not:

- change routes or canonical paths
- add trust widgets to these edge pages
- widen into new redirects
- redesign the pages
- change the main indexable cluster

Allowed changes:

- remove weak interlinking
- replace weak interlinking with links to strong calculators and guides
- tighten CTA rows and related-guide sections
- update copy only where needed to support cleaner routing

### Test strategy

Add one regression block for the monthly-extra and lump-sum pages.

Require:

- every target page still contains `robots="noindex, follow"`
- no target page links to another `pay-$X` page
- no target page links to a `mortgage-lump-sum-*` page unless it is the same file's own canonical path

Add one regression block for the alias-style noindex entry pages.

Require:

- every target page still contains `robots="noindex, follow"`
- none of the three alias-style pages links to the other alias-style pages
- none of the three alias-style pages links to `pay-$X` pages or `mortgage-lump-sum-*` pages
- each page still links to at least one intended strong calculator destination

## Out Of Scope

This batch should not:

- push or deploy anything
- remove the pages entirely
- add new redirects
- merge pages into new destinations
- change sitemap rules beyond what already exists
