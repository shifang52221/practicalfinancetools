# Mortgage Payment Calculator Entry Boundaries Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the mortgage payment calculator so it clearly acts as the quote-ready full housing-payment entry point and routes earlier decision questions to the right support pages.

**Architecture:** This is a copy-and-test change only. We will first add a regression test for the new entry boundary language, verify that it fails, then update the calculator page with minimal new copy blocks that sharpen the page role without touching the mortgage math or page structure.

**Tech Stack:** Astro, Node test runner, TypeScript-based SEO regression tests

---

### Task 1: Add the failing regression test

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused SEO test for `src/pages/calculators/mortgage-payment-calculator.astro` that checks for:

- `This is the full housing-payment page for people who already have the loan and escrow inputs lined up.`
- `When not to start here`
- `If taxes or insurance are still the weak point, move next to What is PITI? first.`
- `If your real question is lender qualification, move next to the DTI calculator.`
- `What this calculator should send you to next`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/seo.test.ts`

Expected: FAIL with the new mortgage-payment boundary phrases missing from `src/pages/calculators/mortgage-payment-calculator.astro`

**Step 3: Commit**

Do not commit yet.

### Task 2: Add minimal mortgage-payment boundary copy

**Files:**
- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`

**Step 1: Add minimal implementation**

Add:

- one short quote-ready sentence near the top
- one `When not to start here` section
- one `What this calculator should send you to next` section

Keep the existing calculator structure, trust card, and existing role cues intact.

**Step 2: Run test to verify it passes**

Run: `npm test -- tests/seo.test.ts`

Expected: PASS with the new mortgage-payment test green and no regressions

**Step 3: Refactor lightly if needed**

Only adjust line wrapping or wording placement if required to satisfy exact-string tests.

### Task 3: Full verification

**Files:**
- Verify only

**Step 1: Run static checks**

Run: `npm run check`

Expected: `0 errors`, `0 warnings`, `0 hints`

**Step 2: Run production build**

Run: `npm run build`

Expected: exit code `0`

**Step 3: Commit**

```bash
git add docs/plans/2026-06-23-mortgage-payment-entry-boundaries-design.md docs/plans/2026-06-23-mortgage-payment-entry-boundaries.md tests/seo.test.ts src/pages/calculators/mortgage-payment-calculator.astro
git commit -m "Strengthen mortgage payment calculator entry boundaries"
```
