# High-Impression Entry Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the site's highest-impression entry pages so their visible maintenance dates and entry-role cues align with the site-level routing refresh completed on June 24, 2026.

**Architecture:** Keep each page's current workflow structure intact, then add one small maintenance cue and synchronize `lastUpdated` and review dates. The implementation uses one focused SEO regression test first, then minimal page edits across the six highest-impression workflow entry pages.

**Tech Stack:** Astro, TypeScript, Node test runner

---

### Task 1: Add regression coverage for the six high-impression entry pages

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one test covering:
- `src/pages/calculators/apr-calculator.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/extra-mortgage-payments.astro`

Assert that each page:
- uses `const lastUpdated = "2026-06-24"` or `lastUpdated="2026-06-24"` as applicable
- shows visible `Last updated: 2026-06-24`
- includes one phrase confirming the page is maintained as a high-impression entry path

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/seo.test.ts`

Expected:
- FAIL because the pages still show `2026-05-29` or `2026-04-03`
- FAIL because the new maintenance phrases are missing

### Task 2: Refresh the four calculator entry pages

**Files:**
- Modify: `src/pages/calculators/apr-calculator.astro`
- Modify: `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`

**Step 1: Write minimal implementation**

For each page:
- update `lastUpdated` to `2026-06-24`
- update the visible date
- update `ReviewedByCard` review date
- add one short maintenance section or sentence confirming the page is actively maintained as a high-impression first-entry page

**Step 2: Run test to verify partial progress**

Run: `npm test -- tests/seo.test.ts`

Expected:
- The new test still fails until the two guide entry pages are updated

### Task 3: Refresh the two guide entry pages

**Files:**
- Modify: `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`

**Step 1: Write minimal implementation**

For each page:
- update `lastUpdated` to `2026-06-24`
- update the visible date
- update `ReviewedByCard` review date
- add one short maintenance cue confirming the page is actively maintained as a high-impression entry page inside its cluster

**Step 2: Run the SEO test to verify it passes**

Run: `npm test -- tests/seo.test.ts`

Expected:
- PASS

### Task 4: Run full verification

**Files:**
- No code changes

**Step 1: Run project checks**

Run: `npm run check`

Expected:
- PASS

**Step 2: Run production build**

Run: `npm run build`

Expected:
- PASS
