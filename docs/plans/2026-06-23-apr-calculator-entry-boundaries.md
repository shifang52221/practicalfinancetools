# APR Calculator Entry Boundaries Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the APR calculator so it clearly behaves like the quote-ready APR comparison entry point and routes non-matching intents to the correct next page.

**Architecture:** This is a copy-and-test change only. We will add regression coverage first, verify the test fails, then add minimal new sections and sentences in the APR calculator page to sharpen entry boundaries without changing calculation behavior.

**Tech Stack:** Astro, Node test runner, TypeScript-based SEO regression tests

---

### Task 1: Add the failing regression test

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused SEO test for `src/pages/calculators/apr-calculator.astro` that checks for:

- `This is the APR page for people who already have a real quote in hand.`
- `When not to start here`
- `If you still need to locate the official disclosed APR, start with how to find your APR instead.`
- `If the real issue is promo APR, balance transfer fees, or penalty APR risk, use the APR-for-balance-transfers guide or the APR topic hub first.`
- `What this calculator should send you to next`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/seo.test.ts`

Expected: FAIL with the new APR boundary phrases missing from `src/pages/calculators/apr-calculator.astro`

**Step 3: Commit**

Do not commit yet.

### Task 2: Add minimal APR boundary copy

**Files:**
- Modify: `src/pages/calculators/apr-calculator.astro`

**Step 1: Add minimal implementation**

Add:

- one short sentence near the top reinforcing quote-ready use
- one `When not to start here` section
- one `What this calculator should send you to next` section

Keep all existing calculations, trust blocks, and exact tested phrases intact.

**Step 2: Run test to verify it passes**

Run: `npm test -- tests/seo.test.ts`

Expected: PASS with the new APR test green and no regressions

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
git add docs/plans/2026-06-23-apr-calculator-entry-boundaries-design.md docs/plans/2026-06-23-apr-calculator-entry-boundaries.md tests/seo.test.ts src/pages/calculators/apr-calculator.astro
git commit -m "Strengthen APR calculator entry boundaries"
```
