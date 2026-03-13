# SEO Redirect Internal Link Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove active-page internal links that point to redirected guide URLs and add a regression test to prevent them from returning.

**Architecture:** Extend the existing SEO test file with one redirect-aware internal-link check. Then replace each confirmed redirect-hop link with the final destination URL so active pages link directly to the canonical target.

**Tech Stack:** Astro, Node.js built-in test runner, TypeScript

---

### Task 1: Add redirect-link regression test

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that:

- reads `vercel.json`
- extracts static `/guides/...` redirect source paths
- scans `.astro` files in `src/pages`
- skips files whose own route is a redirect source
- fails when an active page includes `href="redirect-source"`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failures should mention the three active pages still linking to redirected guide URLs

**Step 3: Write minimal implementation**

Use the existing helper style in `tests/seo.test.ts` so the new check shares the same file collection and route-derivation logic.

**Step 4: Run test to verify it passes after code changes**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL until Task 2 is finished

### Task 2: Replace redirect-hop internal links

**Files:**
- Modify: `src/pages/guides/pay-1000-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-150-extra-on-mortgage.astro`
- Modify: `src/pages/guides/pay-250-extra-on-mortgage.astro`

**Step 1: Update links**

Replace these hrefs:

- `/guides/calculate-mortgage-payoff-with-additional-principal-payments`
- `/guides/extra-mortgage-payment-calculator`

With:

- `/calculators/extra-payment-calculator`

**Step 2: Run targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 3: Verify no regressions in current test set

**Files:**
- Verify only

**Step 1: Run full current test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Review diff**

Confirm only the expected test file, three guide files, and plan docs changed.
