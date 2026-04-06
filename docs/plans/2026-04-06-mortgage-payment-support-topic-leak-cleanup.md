# Mortgage Payment Support Topic Leak Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the clearest rent-vs-buy topic leakage from four mortgage payment support guides and replace it with stronger in-cluster mortgage payment routing.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that forbids rent-vs-buy routing on the four target pages, verify the new assertions fail, then make the minimum link substitutions needed to keep each page inside the mortgage payment workflow. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for mortgage payment topic leakage

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`

Require:

- none of the four files includes `href="/calculators/rent-vs-buy-calculator"`
- `mortgage-payment-down-payment-impact.astro` does not include `href="/guides/rent-vs-buy-costs-to-include"`
- each file still includes at least one intended mortgage-payment destination

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new topic-leak assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted off-topic links.

### Task 2: Make the minimum guide-link fixes

**Files:**
- Modify: `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- Modify: `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-escrow-shortage.astro`

**Step 1: Tighten the down-payment support page**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`
- `href="/guides/rent-vs-buy-costs-to-include"`

Replace them with:

- `href="/guides/mortgage-payment-affordability-checklist"`
- `href="/guides/what-is-piti"`

**Step 2: Tighten the property-tax support page**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`

Replace it with:

- `href="/guides/what-is-piti"`

**Step 3: Tighten the insurance support page**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`

Replace it with:

- `href="/guides/what-is-piti"`

**Step 4: Tighten the escrow-shortage support page**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`

Replace it with:

- `href="/guides/principal-and-interest-vs-escrow"`

**Step 5: Keep scope tight**

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

- which four mortgage payment support pages were tightened
- which regression was added
- fresh verification evidence

Do not commit, push, or deploy in this batch.
