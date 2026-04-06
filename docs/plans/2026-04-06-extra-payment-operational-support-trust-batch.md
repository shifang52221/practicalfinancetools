# Extra Payment Operational Support Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the remaining legacy indexable extra-payment support guides and refresh the extra-payment entry page so the operational-support layer is trustworthy, routed, and current.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the four support guides and one focused regression block for the main extra-payment entry page. Then upgrade the four support guides to the shared trust model and lightly refresh `extra-mortgage-payments.astro` so it routes readers into those stronger operational support pages. Keep routes and layout patterns intact while tightening trust signals, role framing, references, dates, and internal routing.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the operational-support batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test for the four support guides**

Cover:

- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- `src/pages/guides/extra-payment-escrow-not-affected.astro`
- `src/pages/guides/extra-payment-windfall-strategy.astro`

Require for each page:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`
- exact role phrase
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

Use these exact role phrases:

- `Use this guide when an accelerated payment plan sounds convenient, but you need to know whether it really beats a simple DIY extra-payment plan`
- `Use this guide when you need to confirm that extra payments will not trigger a prepayment penalty or lender restriction`
- `Use this guide when you expect extra principal to lower the total mortgage bill and need to separate principal from escrow`
- `Use this guide when a bonus, refund, or other windfall could become a mortgage lump sum but liquidity still matters`

**Step 2: Write the failing regression test for `extra-mortgage-payments.astro`**

Require:

- `Use this guide when you want the main extra-payment workflow before choosing a specific decision or operational support path`
- links to:
  - `href="/guides/extra-payment-accelerated-plan"`
  - `href="/guides/extra-payment-prepayment-penalty-checklist"`
  - `href="/guides/extra-payment-escrow-not-affected"`
  - `href="/guides/extra-payment-windfall-strategy"`
- `reviewedOn="2026-04-06"`
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust coverage, missing routing, or stale dates

### Task 2: Upgrade the four operational support guides

**Files:**
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- Modify: `src/pages/guides/extra-payment-escrow-not-affected.astro`
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`

**Step 1: Add the shared trust model**

For each page:

- import `ReviewedByCard`
- import `TRUST_PROFILES`
- add `authorProfile`
- add `reviewProfiles`
- add `ReviewedByCard`
- set `reviewedOn="2026-04-06"`
- set `const lastUpdated = "2026-04-06";`
- align the visible `Last updated:` line

**Step 2: Add strong role framing near the top**

Use the exact required role phrase for each page and make the section clearly explain when the page is the right next step.

**Step 3: Rewrite the bodies to strengthen operational usefulness**

Keep each page focused on its specific job:

- accelerated plan: fees, posting behavior, DIY comparison, annual-dollar equivalence
- prepayment penalty: partial versus full-prepayment checks, penalty window, lender questions
- escrow not affected: principal-and-interest versus escrow separation, why total payment may not fall, PMI nuance
- windfall strategy: reserve-first allocation, competing priorities, target split choices

**Step 4: Add concise official references**

Use the official-source pairs defined in the design doc and keep the references section small.

**Step 5: Tighten routing**

Prefer current strong paths such as:

- `extra-mortgage-payments`
- `extra-payment-liquidity-reserve`
- `extra-payment-lump-sum-vs-monthly`
- `extra-payment-priority-vs-other-debts`
- `extra-payment-servicer-posting-rules`
- `principal-only-extra-payments`
- `biweekly-vs-extra-principal`
- `additional-principal-payment-calculator`
- `extra-payment-calculator`

### Task 3: Refresh `extra-mortgage-payments.astro` as the operational-support entry

**Files:**
- Modify: `src/pages/guides/extra-mortgage-payments.astro`

**Step 1: Update freshness metadata**

Set:

- `const lastUpdated = "2026-04-06";`
- `reviewedOn="2026-04-06"`
- visible `Last updated: 2026-04-06`

**Step 2: Add the top role phrase**

Include:

- `Use this guide when you want the main extra-payment workflow before choosing a specific decision or operational support path`

**Step 3: Add routing for the support layer**

Add or refresh a section that clearly links to:

- `extra-payment-accelerated-plan`
- `extra-payment-prepayment-penalty-checklist`
- `extra-payment-escrow-not-affected`
- `extra-payment-windfall-strategy`

**Step 4: Keep the page focused**

Do not rewrite the page from scratch. Preserve its role as the main extra-payment guide while making it better at handing readers off to specialized support pages.

### Task 4: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- Modify: `src/pages/guides/extra-payment-escrow-not-affected.astro`
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 5: Verify the batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- Modify: `src/pages/guides/extra-payment-escrow-not-affected.astro`
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`
- Add: `docs/plans/2026-04-06-extra-payment-operational-support-trust-batch-design.md`
- Add: `docs/plans/2026-04-06-extra-payment-operational-support-trust-batch.md`

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Run static checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected:

- PASS, with only already-known non-blocking warnings

**Step 4: Review the working tree**

Run:

```bash
git status --short
```

Expected:

- this batch's files are modified
- prior local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything.
