# Mortgage Payment Calculator Entry Boundaries Design

**Date:** 2026-06-23

**Goal**

Keep the mortgage payment calculator as the quote-ready full housing-payment entry point for users who already have house price, down payment, rate, and escrow assumptions, while making it obvious when a user should branch to a support guide first.

**Problem**

The page already covers principal, interest, taxes, insurance, HOA, and PMI, but it still reads like a general overview in places. That can blur three decision boundaries:

1. Users who still need the tax / insurance breakdown before comparing scenarios
2. Users who need to separate principal & interest from escrow before trusting the payment
3. Users who should move to DTI or affordability instead of staying on the payment page

When those boundaries are fuzzy, the page becomes less useful as a primary landing page and more like a generic explainer.

**Recommended Approach**

Use a narrow copy-only refinement on the calculator page plus a regression test.

- Add one explicit quote-ready sentence near the top.
- Add a short `When not to start here` section that identifies the upstream decisions.
- Add a `What this calculator should send you to next` section that routes to PITI, principal vs escrow, DTI, and affordability.
- Protect the wording with a focused SEO test.

This keeps calculation behavior, layout, and routing structure unchanged.

**Alternatives Considered**

1. Add more calculator detail and examples

This would increase depth, but it would blur the role of the calculator versus the support guides.

2. Split the page into multiple calculator variants

This would create more precision, but it would risk unnecessary fragmentation and maintenance overhead.

3. Leave the page as-is

This avoids work, but it misses a clear chance to improve role clarity on one of the site’s most important pages.

**Chosen Design**

The safest and strongest design is a wording refinement that clarifies:

- who should start on the page
- which questions belong elsewhere first
- where the next step should go

**Files Expected**

- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`
- Modify: `tests/seo.test.ts`

**Validation**

- Add a regression test that fails before the copy is added.
- Run `npm test -- tests/seo.test.ts`
- Run `npm run check`
- Run `npm run build`

**Non-Goals**

- No formula changes
- No component refactors
- No new routes
- No sitemap or redirect changes
