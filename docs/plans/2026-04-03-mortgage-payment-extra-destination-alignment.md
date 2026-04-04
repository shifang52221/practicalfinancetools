# Mortgage Payment And Extra Payment Destination Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the mortgage-payment and extra-payment destination pages so the highest-leverage pages in those clusters carry clearer roles, stronger trust signals, and regression coverage.

**Architecture:** Keep the current Astro page structure and existing redirect map. Improve only the destination and comparison pages that already anchor these clusters, then add regression tests that lock review coverage, references, and role-signaling language so these pages keep absorbing nearby thin-intent traffic safely.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for mortgage-payment and extra-payment destination pages

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Require these pages to include:

- `ReviewedByCard`
- role-signaling language for when the page is the right starting point
- `References` section

Target pages:

- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/what-is-piti.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing trust or chooser coverage on the selected pages

### Task 2: Strengthen mortgage-payment destination pages

**Files:**
- Modify: `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- Modify: `src/pages/guides/what-is-piti.astro`
- Modify: `src/pages/guides/principal-and-interest-vs-escrow.astro`
- Modify: `src/pages/guides/mortgage-payment-affordability-checklist.astro`

**Step 1: Keep page roles distinct**

- payment math page = baseline formula and input structure
- PITI page = payment component breakdown
- escrow vs principal page = statement alignment and escrow-change interpretation
- affordability checklist = decision workflow and stress-testing

**Step 2: Add chooser language and trust signals**

Add short sections that tell users when to start on each page. Add `ReviewedByCard` and refresh visible update dates to the current batch date.

**Step 3: Preserve current destination behavior**

Do not change routes or redirect rules. The goal is to make the destination pages stronger, not to redesign cluster structure.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL if the extra-payment comparison page is not yet updated

### Task 3: Strengthen the indexable extra-payment comparison page

**Files:**
- Modify: `src/pages/guides/extra-payment-vs-refinance.astro`

**Step 1: Keep the role specific**

This page should clearly own the comparison between:

- faster payoff on the current loan
- refinance with closing-cost friction and time-horizon sensitivity

**Step 2: Add chooser language and trust signals**

Add:

- `ReviewedByCard`
- short “use this guide when...” language
- references section if needed
- refreshed visible update date

**Step 3: Re-run the targeted test**

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
