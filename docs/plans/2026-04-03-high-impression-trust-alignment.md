# High-Impression Trust Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen trust and quality signals on high-impression support pages without changing the site's URL strategy or framework structure.

**Architecture:** Keep the current Astro layouts and page roles. Add regression coverage that requires visible review coverage and source references on selected high-impression support pages, then update only those pages with concise trust and reference sections that fit the existing content hierarchy.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for selected high-impression support pages

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Require these pages to include both `ReviewedByCard` and a visible references section:

- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/calculators/additional-principal-payment-calculator.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-by-loan-type.astro`

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing review coverage and/or references

### Task 2: Add trust and source coverage to the selected pages

**Files:**
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`
- Modify: `src/pages/guides/apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/apr-by-loan-type.astro`

**Step 1: Add visible review coverage**

Use `ReviewedByCard` on each selected page.

**Step 2: Add concise references**

Add a visible references section that cites primary consumer-finance sources appropriate to the page topic.

**Step 3: Keep page roles sharp**

Do not broaden these pages into general hubs. Keep:

- `extra-payment-calculator` focused on recurring extra-payment planning
- `additional-principal-payment-calculator` focused on principal-only and lump-sum scenarios
- `apr-vs-interest-rate` focused on the core APR-vs-rate distinction
- `apr-by-loan-type` focused on cross-product APR comparison rules

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 3: Verify no regressions

**Files:**
- Verify only

**Step 1: Run full project verification**

Run:

```bash
npm run check
npm test
npm run build
```

Expected:

- all commands succeed
