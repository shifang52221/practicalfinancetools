# Refinance Support Label Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove obvious label-to-destination mismatch from three refinance support pages and replace the weak exits with exact-match refinance destinations.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that catches mismatched refinance support labels, verify the assertions fail, then make the minimum link substitutions needed to keep the cluster curated and label-aligned. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for refinance support label alignment

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/refinance-no-closing-costs-myth.astro`
- `src/pages/guides/refinance-rolling-costs-into-loan.astro`
- `src/pages/guides/refinance-offer-comparison-checklist.astro`

Require:

- `refinance-no-closing-costs-myth.astro` includes `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
- `refinance-no-closing-costs-myth.astro` does not include `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
- `refinance-rolling-costs-into-loan.astro` includes:
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-closing-costs">Refinance closing costs</a>`
  - `href="/guides/refinance-checklist">Refinance checklist</a>`
- `refinance-rolling-costs-into-loan.astro` does not include `href="/guides/apr-with-origination-fee">APR when fees are financed</a>`
- `refinance-offer-comparison-checklist.astro` includes:
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
  - `href="/guides/refinance-points-break-even">Points break-even</a>`
- `refinance-offer-comparison-checklist.astro` does not include:
  - `href="/guides/refinance-closing-costs">No closing cost refinance</a>`
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
  - `href="/guides/refinance-break-even">Points break-even</a>`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new label-alignment assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted mismatched links.

### Task 2: Make the minimum guide-link fixes

**Files:**
- Modify: `src/pages/guides/refinance-no-closing-costs-myth.astro`
- Modify: `src/pages/guides/refinance-rolling-costs-into-loan.astro`
- Modify: `src/pages/guides/refinance-offer-comparison-checklist.astro`

**Step 1: Tighten `refinance-no-closing-costs-myth`**

Replace:

- `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`

With:

- `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`

**Step 2: Tighten `refinance-rolling-costs-into-loan`**

Replace the off-cluster APR-style related-guide exit with refinance-native support destinations:

- `No closing cost refinance`
- `Refinance closing costs`
- `Refinance checklist`

**Step 3: Tighten `refinance-offer-comparison-checklist`**

Replace the templated related-guides block so each label points to its exact-match refinance support page:

- `No closing cost refinance` -> `/guides/refinance-no-closing-costs-myth`
- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`
- `Points break-even` -> `/guides/refinance-points-break-even`

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

- which refinance support pages were tightened
- which regression was added
- fresh verification evidence

Do not commit, push, or deploy in this batch.
