# Credit Card Cluster Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the credit-card workflow cluster so the hub, parent guides, and support pages have clear roles, less overlap, and stronger routing toward the right calculator or guide.

**Architecture:** Keep the current Astro route structure intact and avoid broad URL changes. Strengthen the primary hub and parent guides first, then rewrite the surrounding support pages so they act as feeders instead of competing destinations. Add SEO regression coverage so the cluster keeps its new hierarchy and trust dates.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner, existing SEO assertions in `tests/seo.test.ts`

---

### Task 1: Add regression coverage for the credit-card cluster roles

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused test that checks the following pages for role separation:

- `src/pages/topics/credit-cards.astro`
- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/credit-card-apr-promo-vs-standard.astro`
- `src/pages/guides/credit-card-balance-transfer-fee.astro`
- `src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro`
- `src/pages/guides/credit-card-payoff-payment-target.astro`
- `src/pages/guides/credit-card-payoff-order.astro`

The test should assert that:

- the hub page describes itself as the primary credit-card topic router,
- the interest explainer stays focused on statement math,
- the payoff-strategy page owns the main payoff decision job,
- the smaller support pages hand off to the stronger parent page or calculator,
- the current June 24 trust-date pattern remains consistent on the pages we refresh.

**Step 2: Run the test to confirm it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL, because the current pages still contain some overlap and older trust dates.

### Task 2: Strengthen the hub and parent guides

**Files:**
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- Modify: `src/pages/guides/credit-card-payoff-strategy.astro`
- Modify: `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- Modify: `src/pages/guides/credit-card-balance-transfer-fee.astro`
- Modify: `src/pages/guides/credit-card-apr-promo-vs-standard.astro`
- Modify: `src/pages/guides/credit-card-penalty-apr.astro`

**Step 1: Make the minimal content changes**

For each page:

- keep the route and structure intact,
- make the role of the page explicit in the opening section,
- add a short maintenance note if needed,
- keep the page focused on one decision job,
- update trust dates only when the page is part of the refreshed cluster.

**Step 2: Run the SEO test to verify partial progress**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still red until the support pages are tightened.

### Task 3: Rewrite the support pages so they act like feeders

**Files:**
- Modify: `src/pages/guides/credit-card-apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/credit-card-interest-apr-vs-daily.astro`
- Modify: `src/pages/guides/credit-card-payoff-payment-target.astro`
- Modify: `src/pages/guides/credit-card-payoff-order.astro`
- Modify: `src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro`
- Modify: `src/pages/guides/0-apr-credit-card-payoff-plan.astro`
- Modify: `src/pages/guides/calculate-credit-card-payoff.astro`
- Modify: `src/pages/guides/credit-card-interest-calculator-payoff.astro`
- Modify: `src/pages/guides/credit-card-payment-payoff-calculator.astro`
- Modify: `src/pages/guides/credit-card-utilization-payoff.astro`
- Modify: `src/pages/guides/dti-credit-card-minimums.astro`

**Step 1: Remove duplicated long-form overlap**

Trim repeated explanations that are already covered by the hub or parent guides.

**Step 2: Add a clear handoff**

Each support page should point mainly to one stronger parent page or calculator.

**Step 3: Keep the support role narrow**

Each page should still solve a real micro-question, but it should not try to be a second hub.

### Task 4: Verify the cluster and finish

**Files:**
- No code changes

**Step 1: Run the SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

**Step 2: Run project checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected:

- PASS
