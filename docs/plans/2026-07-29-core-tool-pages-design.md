# Core Tool Pages Quality Upgrade Design

**Date:** 2026-07-29

**Goal:** Strengthen three high-value calculator pages so each page has a distinct decision role, clearer user guidance, stronger trust signals, and better internal routing without changing URLs, formulas, or the current indexation strategy.

## Scope

The batch covers:

- `/calculators/additional-principal-payment-calculator`
- `/calculators/credit-card-payoff-calculator`
- `/calculators/debt-snowball-calculator`

The work will not:

- Change calculator formulas or client-side behavior.
- Change canonical URLs or trailing-slash policy.
- Add new pages.
- Expand the current `noindex, follow` set.
- Remove existing pages.
- Change `vercel.json` redirects.
- Rewrite the already-consolidated guide clusters.

## Page Roles

### Additional Principal Payment Calculator

This is the focused tool for a one-time lump sum, recurring principal-only payments, or a comparison between the two. It must clearly distinguish principal reduction from escrow, paid-ahead treatment, and mortgage recasting. Its next-step routes are the broad extra-payment calculator, recast guidance, and lender-posting guidance where appropriate.

### Credit Card Payoff Calculator

This is the fixed-payment payoff tool for a user who already knows or can choose a sustainable monthly payment. It must remain distinct from the minimum-payment calculator, which models statement minimum rules, and the interest guide, which explains statement-level interest calculations.

### Debt Snowball Calculator

This is the multi-debt ordering tool for users managing several balances. It must explain that snowball prioritizes the smallest balance for behavioral momentum, while avalanche prioritizes the highest APR for interest minimization. It should not compete with single-card payoff pages.

## Shared Improvements

Each page will receive only changes that improve independent usefulness:

- More precise title and meta description wording where needed.
- A concise first-screen statement of who should use the page.
- A clear distinction from adjacent calculators and guides.
- One or more worked scenarios that expose the page's actual decision logic.
- Explicit assumptions and limitations tied to the calculator's model.
- Trust and review information that describes the scope of review rather than making generic authority claims.
- Contextual internal links to the parent topic, adjacent calculator, and the next decision step.
- A truthful update date reflecting the implementation date.

## SEO Safety

The batch preserves the current architecture:

```text
Homepage
├── Calculators
│   ├── Additional principal payment
│   ├── Credit card payoff
│   └── Debt snowball
├── Topics
│   ├── Mortgage payoff
│   └── Credit cards
└── Guides
    ├── How credit card interest works
    └── Credit card payoff strategy
```

No new competing guide targets will be created. Existing supporting pages remain governed by the current redirect, sitemap, and `noindex, follow` rules.

## Verification

Before any push:

- Add static SEO regression assertions for the three page roles, key routing links, review dates, and assumptions.
- Run the targeted SEO test suite.
- Run `npm run check`.
- Run `npm run build`.
- Review the final diff for formula, route, redirect, and indexation changes.
- Run the local SEO audit if the preview tooling is available.

The batch is ready for a single unified commit only when all checks pass and no unrelated files are changed.
