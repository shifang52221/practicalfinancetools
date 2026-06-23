# APR Calculator Entry Boundaries Design

**Date:** 2026-06-23

**Goal**

Keep the APR calculator as the strongest quote-ready entry page for users who already have rate, term, loan amount, and fee inputs, while making it clearer when a different APR page should be the first stop.

**Problem**

The APR calculator already has strong trust and comparison content, but its boundaries can still blur in three common situations:

1. Users who do not yet know where to locate the disclosed APR
2. Users whose real question is card promo APR, balance transfer fee, or penalty APR behavior
3. Users who are making a short-hold refinance or fee-timing decision and need a broader break-even frame, not just an APR estimate

When those boundaries are fuzzy, the calculator risks behaving like a general explainer instead of a quote-ready decision page.

**Recommended Approach**

Use a narrow copy-only refinement on the calculator page plus one regression test.

- Add an explicit entry-role sentence near the top that reinforces "quote-ready" usage.
- Add a "When not to start here" section that names the off-page decision types.
- Add a "What this calculator should send you to next" section that routes each off-page intent to the correct guide or topic.
- Protect the behavior with one SEO regression test that checks the strongest new phrases.

This keeps the existing architecture, routing model, and calculator logic untouched.

**Alternatives Considered**

1. Expand the calculator with more APR explainer content

This would increase page depth, but it would also dilute the role of the APR topic hub and raise the risk of overlap with support guides.

2. Change the calculator logic or inputs

This is unnecessary for the current quality goal and would create avoidable regression risk.

3. Move more content to topic pages only

This would keep the calculator cleaner, but it would miss the opportunity to make entry boundaries obvious at the exact moment users land on the tool.

**Chosen Design**

The safest and strongest design is a copy refinement that clarifies:

- who should start on the APR calculator
- who should branch away before using it
- where those users should go next

**Files Expected**

- Modify: `src/pages/calculators/apr-calculator.astro`
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
- No redirect or sitemap changes
