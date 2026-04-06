# Refinance Support Destination Dedup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove duplicate `refinance-break-even` destination repeats from two refinance support pages and replace them with a cleaner, label-aligned refinance destination mix.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that catches over-repetition of `refinance-break-even` and label-to-destination mismatch on the two target pages, verify the assertions fail, then make the minimum link and label substitutions needed to pass. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for refinance support-page destination repetition

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/refinance-when-not-to-refinance.astro`
- `src/pages/guides/refinance-reset-amortization.astro`

Require:

- each file includes:
  - `href="/guides/refinance-break-even"`
  - `href="/guides/refinance-checklist"`
  - `href="/guides/refinance-closing-costs"`
- each file contains no more than three occurrences of `href="/guides/refinance-break-even"`
- `refinance-reset-amortization.astro` does not include `href="/guides/refinance-break-even">Rate vs term tradeoff</a>`
- `refinance-when-not-to-refinance.astro` does not include:
  - `href="/guides/refinance-break-even">Rate vs term tradeoff</a>`
  - `href="/guides/refinance-break-even">Reset amortization</a>`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new duplicate-destination and label-mismatch assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted repeated `refinance-break-even` routing.

### Task 2: Make the minimum guide-link fixes

**Files:**
- Modify: `src/pages/guides/refinance-when-not-to-refinance.astro`
- Modify: `src/pages/guides/refinance-reset-amortization.astro`

**Step 1: Tighten `refinance-when-not-to-refinance`**

Replace repeated `refinance-break-even` links in the related-guides block so the group becomes:

- `Refinance break-even`
- `Refinance closing costs`
- `Refinance checklist`

**Step 2: Tighten `refinance-reset-amortization`**

Align the hero button label to its destination and replace repeated `refinance-break-even` links in the related-guides block so the page routes toward:

- `Refinance break-even`
- `Refinance closing costs`
- `Refinance checklist`

**Step 3: Keep scope tight**

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
