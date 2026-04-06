# Mortgage Payoff Topic Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the mortgage-payoff topic hub so it routes into the strengthened extra-payment decision system and reflects the current freshness of the cluster.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the mortgage-payoff topic page, then make a small but meaningful refresh to the topic hub: update dates and review freshness, strengthen the hero and chooser structure, surface the new decision and execution guide paths, and trim emphasis on weaker secondary routes. Keep the page in the same topic-hub pattern while making it a better organizer for the stronger leaf pages underneath it.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the mortgage-payoff topic refresh

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/topics/mortgage-payoff.astro`

Require:

- `Choose your mortgage payoff starting point`
- `Choose the extra-payment decision guide`
- `Choose the extra-payment execution guide`
- links to:
  - `/guides/extra-payment-liquidity-reserve`
  - `/guides/extra-payment-priority-vs-other-debts`
  - `/guides/extra-payment-tax-deduction-impact`
  - `/guides/extra-payment-lump-sum-vs-monthly`
  - `/guides/extra-payment-target-payoff-date`
  - `/guides/extra-payment-servicer-posting-rules`

**Step 2: Lock date alignment**

Require:

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
- failure should come from stale dates or missing routing/chooser coverage

### Task 2: Refresh `mortgage-payoff.astro`

**Files:**
- Modify: `src/pages/topics/mortgage-payoff.astro`

**Step 1: Update freshness metadata**

Set:

- `const lastUpdated = "2026-04-06";`
- `reviewedOn="2026-04-06"`
- visible `Last updated: 2026-04-06`

**Step 2: Keep the current hub identity while tightening the hero**

Preserve:

- route
- canonical path
- reviewed-card pattern
- `Choose your mortgage payoff starting point`

But tighten the hero and top CTA set to better reflect the extra-payment workflow.

**Step 3: Add the decision layer chooser**

Add a section that includes:

- `Choose the extra-payment decision guide`

Route prominently to:

- `extra-payment-liquidity-reserve`
- `extra-payment-priority-vs-other-debts`
- `extra-payment-tax-deduction-impact`
- `pay-off-mortgage-early-or-invest`

**Step 4: Add the execution layer chooser**

Add a section that includes:

- `Choose the extra-payment execution guide`

Route prominently to:

- `extra-payment-lump-sum-vs-monthly`
- `extra-payment-target-payoff-date`
- `extra-payment-servicer-posting-rules`
- `principal-only-extra-payments`
- `one-extra-mortgage-payment-per-year`

**Step 5: Keep references concise and official**

Use short CFPB references relevant to:

- mortgage resources
- managing monthly mortgage payments
- prepayment penalties

**Step 6: Trim weak or tangential emphasis**

Compress older secondary sections that dilute the hub's main job as an organizer for the extra-payment cluster.

### Task 3: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/topics/mortgage-payoff.astro`

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 4: Verify the refresh locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Add: `docs/plans/2026-04-06-mortgage-payoff-topic-refresh-design.md`
- Add: `docs/plans/2026-04-06-mortgage-payoff-topic-refresh.md`

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
