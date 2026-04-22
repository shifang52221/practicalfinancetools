# Cluster Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce intent overlap in the strongest mortgage and credit-card clusters by consolidating weak support pages and preserving the pages that now act as primary workflow hubs.

**Architecture:** Keep the upgraded workflow hubs indexable and route more narrowly scoped diagnostic pages into support-only roles. Implement a light consolidation first by applying `noindex, follow`, excluding those pages from the sitemap, and making their support-only role explicit in the content.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO regression tests

---

### Task 1: Save the consolidation design and plan

**Files:**
- Create: `docs/plans/2026-04-22-cluster-consolidation-design.md`
- Create: `docs/plans/2026-04-22-cluster-consolidation.md`

**Step 1: Save the approved cluster classification**

Document:
- keep-and-strengthen pages,
- support-only pages,
- first-round consolidation candidates.

**Step 2: Save the plan**

Create this implementation file so the consolidation rules are explicit and repeatable.

**Step 3: Commit**

```bash
git add docs/plans/2026-04-22-cluster-consolidation-design.md docs/plans/2026-04-22-cluster-consolidation.md
git commit -m "docs: add cluster consolidation plan"
```

### Task 2: Add a failing consolidation regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `astro.config.mjs`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts these extra-payment support pages are treated as support-only pages:

- `src/pages/guides/extra-payment-escrow-not-affected.astro`
- `src/pages/guides/extra-payment-tax-deduction-impact.astro`
- `src/pages/guides/extra-payment-servicer-posting-rules.astro`
- `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`

The test should require:
- `robots="noindex, follow"`
- sitemap exclusion entries in `astro.config.mjs`
- role text that makes the support-only purpose explicit

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because those pages are currently indexable and not excluded from the sitemap.

**Step 3: Write minimal implementation**

Update `astro.config.mjs` and the four guide pages so they match the support-only consolidation role.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: the new consolidation regression test passes.

**Step 5: Commit**

```bash
git add tests/seo.test.ts astro.config.mjs src/pages/guides/extra-payment-escrow-not-affected.astro src/pages/guides/extra-payment-tax-deduction-impact.astro src/pages/guides/extra-payment-servicer-posting-rules.astro src/pages/guides/extra-payment-prepayment-penalty-checklist.astro
git commit -m "fix: consolidate weak extra-payment support pages"
```

### Task 3: Reinforce routing from strong hubs into the surviving support structure

**Files:**
- Modify: `src/pages/guides/extra-mortgage-payments.astro`
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add or extend test coverage so the main extra-payment hub pages still point to the intended strong destinations after consolidation.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL if the hub pages do not contain the new routing cues.

**Step 3: Write minimal implementation**

Adjust hub-page routing copy so users are pointed toward:
- target payoff date,
- liquidity reserve,
- extra payments vs refinance,
- principal-only extra payments,
- plus support-only leaves when operational detail is needed.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: hub-routing tests pass and the older extra-payment workflow tests stay green.

**Step 5: Commit**

```bash
git add src/pages/guides/extra-mortgage-payments.astro src/pages/calculators/extra-payment-calculator.astro tests/seo.test.ts
git commit -m "feat: tighten extra-payment hub routing after consolidation"
```

### Task 4: Verify the full consolidation batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize the new cluster shape**

Document:
- which pages remain primary,
- which pages remain support-only,
- which pages now use `noindex, follow`.

**Step 3: Commit**

```bash
git add .
git commit -m "chore: verify cluster consolidation batch"
```
