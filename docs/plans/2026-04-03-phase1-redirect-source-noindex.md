# Redirect Source Noindex Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the `mortgage-payment` and `credit-card` redirect-source guide clusters with `robots="noindex, follow"` and add the minimum destination-page trust refresh needed for safe consolidation.

**Architecture:** Keep the current Astro page structure, redirects, canonicals, and sitemap exclusions intact. First add failing regression tests for the Phase 1 source-page clusters, then apply the smallest source-page `noindex` edits needed, and finally refresh `how-credit-card-interest-is-calculated` so the affected destination set has consistent trust coverage.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite, Vercel redirects

---

### Task 1: Add failing regression coverage for Phase 1 redirect-source cleanup

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a Phase 1 regression block for these `mortgage-payment` source pages:

- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/hoa-fees-and-mortgage-payment.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`
- `src/pages/guides/mortgage-payment-dti-housing-payment.astro`

Add the same structural assertions for these `credit-card` source pages:

- `src/pages/guides/credit-card-balance-transfer-fee.astro`
- `src/pages/guides/balance-transfer-payoff-timeline.astro`
- `src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro`
- `src/pages/guides/credit-card-payoff-payment-target.astro`
- `src/pages/guides/credit-card-payoff-timeline.astro`
- `src/pages/guides/credit-card-payoff-order.astro`
- `src/pages/guides/credit-card-utilization-payoff.astro`
- `src/pages/guides/average-daily-balance-interest.astro`
- `src/pages/guides/credit-card-interest-calculator-payoff.astro`
- `src/pages/guides/credit-card-minimum-payment-formula.astro`
- `src/pages/guides/calculate-credit-card-payoff.astro`
- `src/pages/guides/credit-card-payment-payoff-calculator.astro`

Also add one destination-page trust assertion for:

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`

Require:

- `ReviewedByCard`
- `References`
- matching `lastUpdated` and visible `Last updated:`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the selected source pages are still missing `robots="noindex, follow"` and `how-credit-card-interest-is-calculated.astro` is still missing trust coverage.

**Step 3: Keep the expectations fixed**

Do not weaken the assertions after the red run unless a file-path or destination mapping is factually wrong.

**Step 4: Re-run later**

Run: `npm test`

Expected: PASS once Tasks 2-4 are complete.

### Task 2: Add source-page `noindex` to the Phase 1 mortgage-payment cluster

**Files:**
- Modify: `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- Modify: `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- Modify: `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- Modify: `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`
- Modify: `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- Modify: `src/pages/guides/how-to-estimate-property-taxes.astro`
- Modify: `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- Modify: `src/pages/guides/hoa-fees-and-mortgage-payment.astro`
- Modify: `src/pages/guides/mortgage-payment-escrow-account.astro`
- Modify: `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- Modify: `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`
- Modify: `src/pages/guides/mortgage-payment-dti-housing-payment.astro`

**Step 1: Add the minimal source-page guard**

For each page, add `robots="noindex, follow"` to the existing `BaseLayout` call.

**Step 2: Preserve structure**

Do not change:

- `canonicalPath`
- redirect destinations
- page copy beyond what is needed for the layout prop

**Step 3: Run tests**

Run: `npm test`

Expected: the mortgage-payment portion of the new regression turns green while the credit-card and destination-page assertions may still fail.

### Task 3: Add source-page `noindex` to the Phase 1 credit-card cluster

**Files:**
- Modify: `src/pages/guides/credit-card-balance-transfer-fee.astro`
- Modify: `src/pages/guides/balance-transfer-payoff-timeline.astro`
- Modify: `src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro`
- Modify: `src/pages/guides/credit-card-payoff-payment-target.astro`
- Modify: `src/pages/guides/credit-card-payoff-timeline.astro`
- Modify: `src/pages/guides/credit-card-payoff-order.astro`
- Modify: `src/pages/guides/credit-card-utilization-payoff.astro`
- Modify: `src/pages/guides/average-daily-balance-interest.astro`
- Modify: `src/pages/guides/credit-card-interest-calculator-payoff.astro`
- Modify: `src/pages/guides/credit-card-minimum-payment-formula.astro`
- Modify: `src/pages/guides/calculate-credit-card-payoff.astro`
- Modify: `src/pages/guides/credit-card-payment-payoff-calculator.astro`

**Step 1: Add the minimal source-page guard**

For each page, add `robots="noindex, follow"` to the existing `BaseLayout` call.

**Step 2: Preserve structure**

Do not change:

- `canonicalPath`
- redirect behavior
- content beyond the layout prop

**Step 3: Run tests**

Run: `npm test`

Expected: the credit-card source-page assertions turn green, while the destination-page trust assertion may still fail.

### Task 4: Refresh trust coverage on `how-credit-card-interest-is-calculated`

**Files:**
- Modify: `src/pages/guides/how-credit-card-interest-is-calculated.astro`

**Step 1: Add the trust bundle**

Add:

- `ReviewedByCard`
- refreshed `lastUpdated` set to `2026-04-03`
- visible `Last updated: 2026-04-03`

Keep the existing `References` section.

**Step 2: Keep the page role stable**

Do not redesign the page. Keep it focused on how average daily balance and statement interest are computed, since that is the destination it now absorbs.

**Step 3: Run tests**

Run: `npm test`

Expected: the new destination-page trust assertion passes and the full suite returns green.

### Task 5: Verify the whole Phase 1 batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: selected `src/pages/guides/*.astro` files from Tasks 2-4

**Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 2: Run static checks**

Run: `npm run check`

Expected: PASS

**Step 3: Run a production build**

Run: `npm run build`

Expected: PASS, with only any already-known non-blocking warnings.

**Step 4: Review working tree**

Run: `git status --short`

Expected: only the intended local Phase 1 files plus previously accepted local work.

**Step 5: Hold changes locally**

Do not commit or push. Keep the Phase 1 batch local for the later unified review and submission decision.
