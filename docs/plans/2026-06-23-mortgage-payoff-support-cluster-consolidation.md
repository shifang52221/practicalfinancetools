# Mortgage Payoff Support Cluster Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fold seven borderline mortgage-payoff support pages into stronger parent pages so the mortgage-payoff cluster becomes more focused, less repetitive, and easier for search engines to understand.

**Architecture:** Keep the URL structure and trust framework intact, then rewrite the seven support pages so they act as narrow feeders into the stronger mortgage-payoff guides. Expand the parent pages to absorb the useful material removed from the weak leaves, and add SEO regressions to prevent sibling-page overlap from creeping back in.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Add failing regression coverage for the support-cluster consolidation

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test for the seven support pages**

Cover:

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- `src/pages/guides/extra-payment-windfall-strategy.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`

Require:

- each page still exists at its canonical path,
- each page still has a clear parent handoff,
- no page behaves like a sibling-first destination,
- the pages do not cross-link in a way that creates a loose mini-cluster.

**Step 2: Write the failing regression test for the parent pages**

Cover:

- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/what-is-piti.astro`

Require:

- the absorbed content topics are present in the stronger parent pages,
- the parent pages contain the newly centralized decision framing,
- the parent pages remain the obvious first-stop destinations.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from the current overlap and weak routing.

### Task 2: Rewrite the seven support pages into narrow feeders

**Files:**
- Modify: `src/pages/guides/biweekly-mortgage-program-fees.astro`
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-liquidity-reserve.astro`
- Modify: `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`
- Modify: `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- Modify: `src/pages/guides/principal-and-interest-vs-escrow.astro`

**Step 1: Remove duplicated long-form overlap**

Strip repeated explanation that is already covered in the parent pages.

**Step 2: Keep one clear parent CTA**

Each page should point mainly to:

- `biweekly-vs-extra-principal`
- `extra-mortgage-payments`
- `extra-payment-lump-sum-vs-monthly`
- `pay-off-mortgage-early-or-invest`
- `how-mortgage-payments-are-calculated`
- `what-is-piti`

**Step 3: Keep the support role narrow**

Each page should still solve a real micro-question, but not try to compete with the parent page.

### Task 3: Expand the parent pages so they absorb the useful material

**Files:**
- Modify: `src/pages/guides/biweekly-vs-extra-principal.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`
- Modify: `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- Modify: `src/pages/guides/pay-off-mortgage-early-or-invest.astro`
- Modify: `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- Modify: `src/pages/guides/what-is-piti.astro`

**Step 1: Add the absorbed decision sections**

Add the content blocks that were removed from the weak pages:

- biweekly program fees and fee drag,
- accelerated-plan vs DIY logic,
- reserve-floor logic,
- mortgage prepayment versus other cash uses,
- windfall handling,
- affordability versus payment math,
- P&I versus escrow interpretation.

**Step 2: Strengthen the handoff structure**

Make the parent pages the obvious next step from the topic hub and homepage.

**Step 3: Remove parent-page ambiguity**

Each parent page should own one job cleanly and not feel like a duplicate of its feeder pages.

### Task 4: Clean the internal links so the cluster reads as a hierarchy

**Files:**
- Modify: the seven support pages in this batch
- Modify: the six parent pages in this batch
- Modify: any homepage or topic hub link rows that currently promote the weak pages too heavily

**Step 1: Remove sibling-first routing**

Weak pages should not point to each other as peers.

**Step 2: Prioritize parent routing**

The main links should point upward to the parent or hub page.

**Step 3: Keep only useful calculator links**

Use calculator links only when they advance the decision, not to fill space.

### Task 5: Verify the consolidation

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the 13 guide files in this batch

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Verify the site still builds cleanly

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the 13 guide files in this batch
- Add: `docs/plans/2026-06-23-mortgage-payoff-support-cluster-consolidation-design.md`
- Add: `docs/plans/2026-06-23-mortgage-payoff-support-cluster-consolidation.md`

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

- this batch’s files are modified,
- earlier unrelated work remains untouched.

**Step 5: Hold changes locally**

Do not commit or push anything yet.
