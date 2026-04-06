# Mortgage Payment Support Topic Leak Cleanup Design

## Goal

Tighten the mortgage payment support cluster so core support pages stop leaking readers into the rent-vs-buy topic when the user intent is still clearly inside the mortgage payment workflow.

This batch is intentionally conservative:

- no new pages
- no route changes
- no redirect changes
- no `noindex` changes
- no framework changes

The work is limited to internal-link focus, CTA hygiene, and regression coverage.

## Context

Recent batches already strengthened this area with:

- trust and review signals
- clearer role phrases
- stronger mortgage payment support coverage
- tighter mortgage payoff routing on nearby strong pages

The next high-confidence issue is topic leakage inside a few support pages that otherwise fit the mortgage payment cluster well.

Four support pages still point users toward `rent-vs-buy` destinations:

- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`

That is not a catastrophic issue, but it is structurally weak for this site state:

- the site is still proving topical depth to Google
- these pages are meant to support mortgage payment understanding, not branch into a separate decision cluster
- end-of-page off-topic links make the section feel less curated and more template-driven

## In-Scope Pages

- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Remove the off-topic links only

Pros:

- lowest implementation risk
- improves topical focus immediately
- easy to protect with a regression test

Cons:

- misses the chance to replace weak exits with stronger in-cluster routes

### Option 2: Replace the off-topic links with stronger mortgage payment destinations

Pros:

- still low risk
- improves both topical focus and user-path continuity
- keeps readers inside the mortgage payment workflow without changing structure

Cons:

- slightly broader than pure removal

### Option 3: Perform a wider cross-topic cleanup across all mortgage payment pages

Pros:

- broader architecture cleanup

Cons:

- unnecessary scope for the current issue
- higher risk of touching contextually valid cross-topic links
- worse fit for the current conservative batch strategy

## Recommendation

Choose **Option 2**.

This is the safest strong move because it removes the clearest off-topic leak while improving the user journey on the exact pages where the topic intent is already strong.

## Design

### Routing rule

Mortgage payment support pages in this batch should route readers toward:

- mortgage payment calculation
- PITI / escrow explanations
- down payment, PMI, property tax, insurance, and reserve planning pages
- affordability guidance when directly connected to monthly payment setup

Avoid routing these pages toward:

- `rent-vs-buy` calculators
- `rent-vs-buy` support guides

This rule is intentionally narrow. It applies only to the four in-scope pages.

### Replacement strategy

#### `mortgage-payment-down-payment-impact`

Remove:

- `/calculators/rent-vs-buy-calculator`
- `/guides/rent-vs-buy-costs-to-include`

Replace with stronger mortgage payment destinations that reinforce the page's real decision path:

- `/guides/mortgage-payment-affordability-checklist`
- `/guides/what-is-piti`

Keep the existing PMI and reserve support links.

#### `mortgage-payment-property-tax-assumptions`

Remove:

- `/calculators/rent-vs-buy-calculator`

Replace with a stronger mortgage payment support destination:

- `/guides/what-is-piti`

Keep the existing property-tax, escrow, and reserve links.

#### `mortgage-payment-insurance-assumptions`

Remove:

- `/calculators/rent-vs-buy-calculator`

Replace with a stronger mortgage payment support destination:

- `/guides/what-is-piti`

Keep the existing insurance, escrow, and reserve links.

#### `mortgage-payment-escrow-shortage`

Remove:

- `/calculators/rent-vs-buy-calculator`

Replace with a stronger escrow/payment explanation destination:

- `/guides/principal-and-interest-vs-escrow`

Keep the existing escrow shortage support links.

### Test strategy

Add one focused regression in `tests/seo.test.ts`.

Require:

- each of the four in-scope pages does not include `href="/calculators/rent-vs-buy-calculator"`
- `mortgage-payment-down-payment-impact` also does not include `href="/guides/rent-vs-buy-costs-to-include"`
- each page still links to at least one intended mortgage payment support destination appropriate to that page

This keeps the test aligned with the batch goal and prevents accidental reintroduction of the same topic leak.

## Out of Scope

- changing routes or canonicals
- changing sitemap rules
- changing `noindex` / `index` rules
- rewriting page structure
- broad rent-vs-buy cleanup outside these four files
- pushing, deploying, or committing
