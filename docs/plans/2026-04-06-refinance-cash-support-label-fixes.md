# Refinance Cash Support Label Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the clearest remaining generic closing-cost routing from two refinance cash-structure support pages and replace it with exact-match refinance support destinations.

**Architecture:** This is a content-only internal-link hardening batch. Extend `tests/seo.test.ts` with a focused regression that catches generic closing-cost routing under specific refinance support labels, verify the assertions fail, then make the minimum link substitutions needed to align the cash-in and cash-out pages. No redirects, routes, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for refinance cash-support label alignment

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused regression that covers:

- `src/pages/guides/refinance-cash-in-lower-rate.astro`
- `src/pages/guides/refinance-cash-out-vs-rate-term.astro`

Require:

- `refinance-cash-in-lower-rate.astro` includes `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
- `refinance-cash-in-lower-rate.astro` does not include `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
- `refinance-cash-out-vs-rate-term.astro` includes:
  - `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`
  - `href="/guides/refinance-no-closing-costs-myth">No closing cost refinance</a>`
  - `href="/guides/refinance-checklist">Refinance checklist</a>`
- `refinance-cash-out-vs-rate-term.astro` does not include:
  - `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`
  - `href="/guides/refinance-closing-costs">No closing cost refinance</a>`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new cash-support label-alignment assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the targeted mismatched links.

### Task 2: Make the minimum guide-link fixes

**Files:**
- Modify: `src/pages/guides/refinance-cash-in-lower-rate.astro`
- Modify: `src/pages/guides/refinance-cash-out-vs-rate-term.astro`

**Step 1: Tighten `refinance-cash-in-lower-rate`**

Replace:

- `href="/guides/refinance-closing-costs">Rolling costs into the loan</a>`

With:

- `href="/guides/refinance-rolling-costs-into-loan">Rolling costs into the loan</a>`

**Step 2: Tighten `refinance-cash-out-vs-rate-term`**

Replace the mismatched related-guide exits so the page routes into:

- `Rolling costs into the loan` -> `/guides/refinance-rolling-costs-into-loan`
- `No closing cost refinance` -> `/guides/refinance-no-closing-costs-myth`
- `Refinance checklist` -> `/guides/refinance-checklist`

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

- which refinance cash-support pages were tightened
- which regression was added
- fresh verification evidence

Do not commit, push, or deploy in this batch.
