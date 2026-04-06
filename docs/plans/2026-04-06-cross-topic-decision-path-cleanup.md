# Cross-Topic Decision Path Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the clearest `rent-vs-buy` topic leakage from one mortgage-payoff page, one refinance page, and one DTI page while replacing each leak with a stronger same-cluster next step.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that forbids `rent-vs-buy` routing on the three target pages, verify the new assertions fail, then make the minimum link substitutions needed to keep each page inside its own native cluster. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for cross-topic decision-path leakage

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- `src/pages/guides/refinance-cash-in-lower-rate.astro`
- `src/pages/guides/how-to-improve-dti.astro`

Require:

- `pay-off-mortgage-early-or-invest.astro` does not include `href="/calculators/rent-vs-buy-calculator"` and does include `href="/calculators/amortization-schedule-calculator"`
- `refinance-cash-in-lower-rate.astro` does not include `href="/guides/rent-vs-buy-break-even"` and does include `href="/guides/refinance-break-even"`
- `how-to-improve-dti.astro` does not include `href="/guides/rent-vs-buy-break-even"` and does include `href="/guides/dti-calculation-step-by-step"`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new cross-topic leak assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted off-topic links.

### Task 2: Make the minimum guide-link fixes

**Files:**
- Modify: `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- Modify: `src/pages/guides/refinance-cash-in-lower-rate.astro`
- Modify: `src/pages/guides/how-to-improve-dti.astro`

**Step 1: Tighten the mortgage-payoff comparison page**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`

Replace it with:

- `href="/calculators/amortization-schedule-calculator"`

**Step 2: Tighten the refinance support page**

Remove:

- `href="/guides/rent-vs-buy-break-even"`

Replace it with:

- `href="/guides/refinance-break-even"`

**Step 3: Tighten the DTI improvement page**

Remove:

- `href="/guides/rent-vs-buy-break-even"`

Replace it with:

- `href="/guides/dti-calculation-step-by-step"`

**Step 4: Keep scope tight**

Do not:

- rewrite unrelated copy
- add new sections
- change layout structure
- touch routes, canonicals, or robots directives

### Task 3: Verify GREEN on the targeted regression

**Files:**
- Test: `tests/seo.test.ts`

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 4: Run full verification for the current local worktree state

**Files:**
- Verify whole worktree

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS with zero failing tests

**Step 2: Run Astro checks**

Run:

```bash
npm run check
```

Expected:

- `0 errors`
- `0 warnings`
- `0 hints`

**Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

- successful static build

### Task 5: Review the resulting local state

**Files:**
- Review only

**Step 1: Inspect worktree status**

Run:

```bash
git status --short
```

Expected:

- only additive local changes from this batch
- no revert of unrelated accepted work

**Step 2: Hold changes locally**

Report:

- which three pages were tightened
- which regression was added
- fresh verification evidence

Do not commit, push, or deploy in this batch.
