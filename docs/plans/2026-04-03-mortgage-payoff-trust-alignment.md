# Mortgage Payoff Trust Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the mortgage-payoff and minimum-payment workflow pages with clearer entry-point routing, fresher trust signals, and regression coverage for review/update consistency.

**Architecture:** Keep the current Astro page structure, calculators, and topic hubs. Add regression tests that lock visible trust signals and workflow-role language on the selected priority pages, then strengthen only the chosen topic and guide pages with reviewed-by coverage, updated timestamps, and clearer chooser copy that separates biweekly, monthly extra, and fixed-vs-minimum payment intents.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for trust-signal consistency on the priority workflow pages

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a regression test that requires the selected priority pages to:

- include `ReviewedByCard` coverage where that trust signal is now expected
- expose a visible `Last updated:` date that matches the page's `lastUpdated` constant
- keep the mortgage payoff topic hub aligned as the workflow chooser for extra-payment, biweekly, and lump-sum intents

Target pages:

- `src/pages/topics/mortgage-payoff.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing trust or update-alignment coverage on the selected pages

### Task 2: Strengthen the mortgage-payoff topic hub as the workflow chooser

**Files:**
- Modify: `src/pages/topics/mortgage-payoff.astro`

**Step 1: Keep the current architecture**

Preserve the existing topic route and calculator links.

**Step 2: Add clearer chooser language**

Make the topic hub explicitly route users toward:

- monthly extra / lump-sum payoff work
- biweekly vs monthly-extra comparison
- statement and servicer verification steps

Use short sections or bullets so the best starting page is obvious without redesigning the layout.

**Step 3: Refresh visible trust metadata**

Refresh:

- `lastUpdated`
- `ReviewedByCard reviewedOn`
- visible `Last updated:` copy

Use the current batch date.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL if the guide pages have not yet been updated

### Task 3: Strengthen the biweekly support guides and fix stale review/update drift

**Files:**
- Modify: `src/pages/guides/biweekly-vs-extra-principal.astro`
- Modify: `src/pages/guides/biweekly-mortgage-program-fees.astro`
- Modify: `src/pages/guides/one-extra-mortgage-payment-per-year.astro`
- Modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 1: Add trust coverage where needed**

Add `ReviewedByCard` to the selected mortgage guides that do not already include it.

**Step 2: Keep roles distinct**

Preserve current route intent:

- `biweekly-vs-extra-principal` = compare true biweekly to monthly extra / principal-only logic
- `biweekly-mortgage-program-fees` = fee and posting-risk sanity check
- `one-extra-mortgage-payment-per-year` = monthly-extra vs annual-lump-sum timing guide
- `why-minimum-payments-take-so-long` = explanatory guide supporting minimum-payment intent

**Step 3: Refresh visible trust metadata**

For each touched page:

- refresh the `lastUpdated` constant
- refresh visible `Last updated:` text
- refresh `ReviewedByCard reviewedOn` when the card exists or is newly added

**Step 4: Add short workflow-routing copy**

Add short role-signaling sections that make the next step obvious:

- from biweekly guides to the correct calculator and topic hub
- from the minimum-payment explainer to the right calculator depending on statement-minimum vs fixed-payment intent

**Step 5: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 4: Verify no regressions

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
