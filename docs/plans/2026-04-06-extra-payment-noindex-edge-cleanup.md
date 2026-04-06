# Extra Payment Noindex Edge Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean the remaining `noindex` extra-payment edge pages so they stop reinforcing each other and instead feed readers into the stronger mortgage-payoff calculators and guides.

**Architecture:** Extend `tests/seo.test.ts` with focused noindex-edge routing regressions, then clean the monthly-extra pages, lump-sum pages, and alias-style noindex entry pages in place. Keep their `noindex` status and routes intact while removing weak cross-linking and replacing it with links to strong calculators, guide destinations, and the mortgage-payoff hub.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for noindex edge cleanup

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test for amount-specific noindex pages**

Cover:

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

Require:

- `robots="noindex, follow"` remains present
- no page links to any other `pay-$X` page
- no page links to the other lump-sum amount page

**Step 2: Write the failing regression test for alias-style noindex entry pages**

Cover:

- `src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro`
- `src/pages/guides/mortgage-extra-principal-calculator.astro`
- `src/pages/guides/extra-mortgage-payment-calculator.astro`

Require:

- `robots="noindex, follow"` remains present
- none of these pages links to the other alias-style pages
- none of these pages links to `pay-$X` pages
- none of these pages links to `mortgage-lump-sum-5000` or `mortgage-lump-sum-10000`
- each page still links to at least one intended strong calculator destination

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from current weak interlinking between noindex edge pages

### Task 2: Clean the amount-specific noindex pages

**Files:**
- Modify: `src/pages/guides/pay-50-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-100-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-150-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-200-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-250-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-300-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-400-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-500-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-1000-extra-on-mortgage.astro`

**Step 1: Remove weak sibling-page links**

Remove links from these pages to:

- other `pay-$X` pages
- `mortgage-lump-sum-5000`
- `mortgage-lump-sum-10000`

**Step 2: Replace with strong destination links**

Prefer links to:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/guides/extra-mortgage-payments`
- `/guides/amortization-with-extra-payments`
- `/guides/principal-only-extra-payments`
- `/guides/one-extra-mortgage-payment-per-year`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/topics/mortgage-payoff`

**Step 3: Keep noindex intact**

Do not change:

- canonical paths
- `robots="noindex, follow"`
- the general “this is a scenario example” role of these pages

### Task 3: Clean the lump-sum amount pages

**Files:**
- Modify: `src/pages/guides/mortgage-lump-sum-5000.astro`
- Modify: `src/pages/guides/mortgage-lump-sum-10000.astro`

**Step 1: Remove mutual cross-linking**

Remove links from these two pages to each other.

**Step 2: Route toward strong lump-sum destinations**

Prefer links to:

- `/calculators/additional-principal-payment-calculator`
- `/calculators/extra-payment-calculator`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/guides/extra-payment-windfall-strategy`
- `/guides/principal-only-extra-payments`
- `/guides/extra-payment-prepayment-penalty-checklist`
- `/topics/mortgage-payoff`

### Task 4: Clean the alias-style noindex entry pages

**Files:**
- Modify: `src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro`
- Modify: `src/pages/guides/mortgage-extra-principal-calculator.astro`
- Modify: `src/pages/guides/extra-mortgage-payment-calculator.astro`

**Step 1: Remove cross-links between alias pages**

These three pages should not link to each other.

**Step 2: Replace with strong destinations**

Prefer links to:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/guides/extra-mortgage-payments`
- `/guides/amortization-with-extra-payments`
- `/guides/principal-only-extra-payments`
- `/guides/extra-payment-lump-sum-vs-monthly`
- `/topics/mortgage-payoff`

**Step 3: Preserve consolidation behavior**

Do not change:

- `robots="noindex, follow"`
- canonical paths
- existing redirect expectations already covered in `tests/seo.test.ts`

### Task 5: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the 14 guide files in this batch

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Verify the cleanup locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the 14 guide files in this batch
- Add: `docs/plans/2026-04-06-extra-payment-noindex-edge-cleanup-design.md`
- Add: `docs/plans/2026-04-06-extra-payment-noindex-edge-cleanup.md`

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Run static checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected:

- PASS, with only already-known non-blocking warnings

**Step 4: Review the working tree**

Run:

```bash
git status --short
```

Expected:

- this batch’s files are modified
- prior local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything.
