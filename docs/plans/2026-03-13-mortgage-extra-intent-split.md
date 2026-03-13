# Mortgage Extra Intent Split Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce self-competition between the two mortgage extra-payment calculator pages by clarifying page intent and tightening a few high-signal internal links, without changing URLs or canonicals.

**Architecture:** Keep both calculator URLs indexable. Make the broad calculator page explicitly serve general extra-payment workflows, make the support page explicitly serve additional-principal and lump-sum workflows, and reinforce that distinction through a small set of high-intent guide links plus a regression test.

**Tech Stack:** Astro, Node.js built-in test runner, TypeScript

---

### Task 1: Add a focused SEO intent-link regression test

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one test that checks these intent-specific guides link to the intended calculator page:

- `src/pages/guides/extra-payment-windfall-strategy.astro` -> `/calculators/additional-principal-payment-calculator`
- `src/pages/guides/principal-only-extra-payments.astro` -> `/calculators/additional-principal-payment-calculator`
- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro` -> `/calculators/additional-principal-payment-calculator`
- `src/pages/guides/extra-mortgage-payments.astro` -> keeps both calculators with distinct roles

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should mention the first three guides still pointing only to the broad calculator

**Step 3: Write minimal test implementation**

Use small file-content assertions rather than snapshots.

**Step 4: Re-run to keep the test red**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL until Task 2 and Task 3 are complete

### Task 2: Clarify the broad calculator page without changing its core SEO target

**Files:**
- Modify: `src/pages/calculators/extra-payment-calculator.astro`

**Step 1: Update copy**

Make only light changes:

- keep broad title direction intact
- keep monthly-extra and general-payoff framing intact
- add a short “use the additional principal calculator for lump sums / principal-only workflows” handoff near the top and in related tools

**Step 2: Preserve broad internal-link language**

Make sure this page still reads like the main entry point for:

- extra mortgage payment calculator
- extra payment calculator
- one extra payment per year

**Step 3: Run targeted test file**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL until support-page and guide changes are done

### Task 3: Narrow the support calculator page to additional-principal intent

**Files:**
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`

**Step 1: Update the front-of-page intent**

Revise the intro and early sections so they emphasize:

- additional principal
- lump sum timing
- principal-only application
- paid ahead vs principal-only

**Step 2: Add a clear handoff back to the broad page**

Include concise language for users who want recurring monthly extra-payment planning, pointing them to `/calculators/extra-payment-calculator`.

**Step 3: Keep the page self-canonical**

Do not change:

- `canonicalPath`
- slug
- indexability

**Step 4: Run targeted test file**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL until guide links are updated

### Task 4: Update the highest-signal guide links

**Files:**
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`
- Modify: `src/pages/guides/principal-only-extra-payments.astro`
- Modify: `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`

**Step 1: Move lump-sum and principal-only entry links**

Update the first three guides so their primary calculator CTA points to:

```text
/calculators/additional-principal-payment-calculator
```

**Step 2: Keep broad guidance intact**

In `extra-mortgage-payments.astro`, preserve both calculators but make their labels distinct:

- broad monthly / general payoff scenarios -> `/calculators/extra-payment-calculator`
- monthly vs lump sum / principal-only scenarios -> `/calculators/additional-principal-payment-calculator`

**Step 3: Run the SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 5: Full verification

**Files:**
- Verify only

**Step 1: Run full test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Review diff**

Confirm only the expected calculator pages, selected guide pages, SEO test file, and plan docs changed.
