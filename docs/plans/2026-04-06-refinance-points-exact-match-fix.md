# Refinance Points Exact-Match Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Correct one exact-title misroute on the refinance points support page so the visible label points to the existing exact-match destination.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that catches the exact-title mismatch on `refinance-points-break-even`, verify the assertion fails, then make the minimum route correction needed to pass. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for the refinance points exact-match route

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/refinance-points-break-even.astro`

Require:

- the page includes `href="/guides/apr-and-points-break-even">APR and points break-even</a>`
- the page does not include `href="/guides/discount-points-vs-lender-credits">APR and points break-even</a>`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new exact-match routing assertion

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted wrong destination.

### Task 2: Make the minimum guide-link fix

**Files:**
- Modify: `src/pages/guides/refinance-points-break-even.astro`

**Step 1: Repoint the exact-match label**

Replace:

- `href="/guides/discount-points-vs-lender-credits">APR and points break-even</a>`

With:

- `href="/guides/apr-and-points-break-even">APR and points break-even</a>`

**Step 2: Keep scope tight**

Do not:

- rewrite unrelated copy
- add new sections
- change other links unless the test requires it
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

- which refinance points route was corrected
- which regression was added
- fresh verification evidence

Do not commit, push, or deploy in this batch.
