# DTI And Rent Topic Trust Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the DTI and rent-vs-buy clusters by upgrading the topic hubs and a small set of representative support guides with clearer chooser language, visible trust signals, and regression coverage.

**Architecture:** Keep the existing Astro routes, calculators, and topic structure. Add regression tests for the selected topic hubs and representative guides, then strengthen only those pages with reviewed-by coverage, references where missing, refreshed timestamps, and role-signaling sections that route users to the correct calculator or workflow.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for DTI and rent-vs-buy topic trust signals

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a regression test that requires these pages to include:

- `ReviewedByCard`
- visible role-signaling language
- a `References` section on the topic hubs

Target pages:

- `src/pages/topics/debt-to-income.astro`
- `src/pages/topics/rent-vs-buy.astro`
- `src/pages/guides/dti-credit-card-minimums.astro`
- `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing review coverage or role-signaling language

### Task 2: Strengthen the two topic hubs

**Files:**
- Modify: `src/pages/topics/debt-to-income.astro`
- Modify: `src/pages/topics/rent-vs-buy.astro`

**Step 1: Keep the current routing and structure**

Preserve the current topic URLs and calculator links.

**Step 2: Add clearer chooser language**

Make each topic hub explicitly route users toward the right starting point:

- DTI = calculator, card-minimum impact, housing-payment inputs
- rent-vs-buy = calculator, break-even workflow, price-to-rent or assumptions checks

**Step 3: Add visible trust signals**

Add or refresh:

- `ReviewedByCard`
- `References` section if missing
- `lastUpdated` visible alignment

Use the current batch date.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL if the representative guides are not yet updated

### Task 3: Strengthen one representative support guide from each cluster

**Files:**
- Modify: `src/pages/guides/dti-credit-card-minimums.astro`
- Modify: `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`

**Step 1: Keep page roles distinct**

- `dti-credit-card-minimums` = explain how required card minimums feed DTI
- `rent-vs-buy-price-to-rent-ratio` = quick-screen metric, not replacement for the full model

**Step 2: Add trust and routing coverage**

Add:

- `ReviewedByCard`
- `References` section if missing
- short chooser/next-step language that routes the user to the correct calculator or topic hub

**Step 3: Refresh timestamps**

Refresh visible and internal update dates to the current batch date.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 4: Verify no regressions

**Files:**
- Verify only

**Step 1: Run full verification**

Run:

```bash
npm run check
npm test
npm run build
```

Expected:

- all commands succeed
