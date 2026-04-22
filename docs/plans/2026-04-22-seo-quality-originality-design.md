# SEO Quality and Originality Design

## Goal

Repair the technical signals that are slowing Google's understanding of the site, complete the trust model rollout on the remaining calculator and index pages, and rewrite the most important workflow pages so they read like distinct decision guides instead of lightly varied templates.

## Scope

- Restore indexable `extra-payment-*` support guides to the sitemap when they are intended to rank.
- Finish the phase-2 trust rollout on the remaining calculator pages and the calculators/topics/guides index pages.
- Rewrite a focused set of high-leverage pages so each page has a specific job, unique framing, and clearer handoff points.
- Keep existing strong redirects, canonical rules, and noindex clustering intact for pages that are intentionally consolidated.

## Constraints

- Do not reopen broad redirect patterns that previously swallowed `extra-payment` support pages.
- Preserve the current page-routing strategy: strong destination pages should still absorb intentionally weak redirect-source pages.
- Avoid replacing one rigid template with another. Rewritten pages need distinct sections, examples, and next-step routing based on page intent.
- Do not claim success without test evidence.

## Design Decisions

### 1. Treat this as both a technical and content-quality problem

Search Console shows the site is receiving impressions, but average rankings are still far from page one. That means the fix is not "get indexed at all costs"; it is "help Google understand which pages are worth surfacing and why they are different."

### 2. Re-include only the extra-payment support pages that are meant to rank

The current sitemap filter excludes all `/guides/extra-payment-*` pages, including the new support pages added in the April 5-6 batch. Those pages are now intended as indexable support assets, so they should be in the sitemap. Redirect-source pages that are intentionally noindexed will remain excluded.

### 3. Finish trust deployment on the remaining holes

The test suite already identifies the unfinished pages. The cleanest path is to extend the existing `TRUST_PROFILES` + `ReviewedByCard` pattern rather than inventing a second trust system.

### 4. Deepen originality by changing page roles, not just phrasing

The highest-risk pages currently repeat the same section skeleton: generic hero, checklist, mistakes, inputs, decision notes, related links. Rewrites will instead make each page answer a distinct decision:

- `extra-payment-accelerated-plan`: fee-based plan vs DIY extra payments.
- `extra-payment-liquidity-reserve`: when extra payments should pause because cash reserves are the real constraint.
- `extra-payment-target-payoff-date`: how to back into an achievable target date without breaking the monthly budget.
- `extra-payment-vs-refinance`: compare current-loan acceleration vs replacing the loan over the same horizon.
- `calculators/index`: route users based on starting question, not just category.
- Remaining calculator pages: reduce generic helper text and add page-specific interpretation guidance.

## Target Pages

- `src/pages/calculators/index.astro`
- `src/pages/calculators/debt-snowball-calculator.astro`
- `src/pages/calculators/debt-avalanche-calculator.astro`
- `src/pages/calculators/debt-to-income-calculator.astro`
- `src/pages/calculators/rent-vs-buy-calculator.astro`
- `src/pages/calculators/amortization-schedule-calculator.astro`
- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`

## Verification Strategy

- Add or update tests to confirm indexable `extra-payment` support pages are present in the sitemap filter.
- Use the existing SEO trust tests as the guardrail for remaining calculators and index pages.
- Run the full project test suite after implementation.

## Expected Outcome

This batch should not be judged by immediate clicks in a few days. The immediate success criteria are:

- sitemap reflects intended indexable support pages,
- trust rollout tests pass,
- rewritten pages are structurally differentiated and less templated,
- internal routing across the mortgage payoff cluster is clearer and more intentional.
