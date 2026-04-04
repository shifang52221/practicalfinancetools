# Biweekly And Minimum-Payment Role Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sharpen the roles of the biweekly and credit-card payoff entry pages so Google and users can more clearly distinguish the best starting page for each intent.

**Architecture:** Keep the current Astro page structure and calculators. Add regression coverage for role-signaling language on the main entry pages, then strengthen only the selected calculators and topic hub with clearer chooser sections, comparison framing, and refreshed review metadata.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for page-role clarity

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Require these role-signaling patterns:

- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro` should explicitly compare biweekly vs monthly extra
- `src/pages/calculators/minimum-payment-payoff-calculator.astro` should explicitly say it is for statement-minimum modeling
- `src/pages/calculators/credit-card-payoff-calculator.astro` should explicitly say it is for fixed monthly payment planning
- `src/pages/topics/credit-cards.astro` should include a chooser section that routes users to the right calculator path

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing role-signaling sections

### Task 2: Strengthen the selected entry pages

**Files:**
- Modify: `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- Modify: `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- Modify: `src/pages/calculators/credit-card-payoff-calculator.astro`
- Modify: `src/pages/topics/credit-cards.astro`

**Step 1: Keep page roles distinct**

Preserve the current routing and core calculator behavior:

- biweekly page = biweekly vs monthly-extra decision page
- minimum-payment page = statement-minimum rule estimator
- credit-card payoff page = fixed-payment payoff planner
- credit-cards topic = chooser and workflow hub

**Step 2: Add explicit chooser language**

Use short sections, tables, or bullets that make the intended starting point obvious without redesigning the pages.

**Step 3: Refresh review metadata where touched**

If a page is materially updated, refresh its visible review date / last-updated metadata to the current batch date.

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
