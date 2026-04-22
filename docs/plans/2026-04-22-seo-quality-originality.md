# SEO Quality and Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Repair sitemap and trust gaps while rewriting key workflow pages to reduce templating and improve originality.

**Architecture:** Keep the existing Astro layouts and trust system, but finish the missing trust/profile rollout and correct sitemap filtering for indexable `extra-payment` guides. Rewrite a focused set of pages so each one has a unique decision-making role and cleaner internal routing rather than repeated checklist sections.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the approved design context

**Files:**
- Create: `docs/plans/2026-04-22-seo-quality-originality-design.md`
- Create: `docs/plans/2026-04-22-seo-quality-originality.md`

**Step 1: Confirm the approved scope**

Approved scope:
- fix sitemap inclusion for intended `extra-payment` support guides,
- complete missing trust coverage on remaining calculators and index pages,
- deeply rewrite the highest-leverage calculator/index/guide pages.

**Step 2: Save the design doc**

Create the design file with:
- goal,
- scope,
- constraints,
- target pages,
- verification strategy.

**Step 3: Save the implementation plan**

Create this plan file so the work can be executed in a controlled sequence.

**Step 4: Commit**

```bash
git add docs/plans/2026-04-22-seo-quality-originality-design.md docs/plans/2026-04-22-seo-quality-originality.md
git commit -m "docs: add SEO quality and originality plan"
```

### Task 2: Add a failing sitemap regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `astro.config.mjs`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused test that asserts these support pages are not excluded from the sitemap filter:

```ts
[
  "/guides/extra-payment-accelerated-plan",
  "/guides/extra-payment-liquidity-reserve",
  "/guides/extra-payment-target-payoff-date",
  "/guides/extra-payment-vs-refinance"
]
```

The test should fail against the current `astro.config.mjs` because `/^\\/guides\\/extra-payment-/` excludes them.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL with a message showing the extra-payment support guides are wrongly excluded from the sitemap.

**Step 3: Write minimal implementation**

Adjust the sitemap filter in `astro.config.mjs` so it excludes only intentionally consolidated/noindex pages, not every `/guides/extra-payment-*` page.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: the new sitemap regression test passes.

**Step 5: Commit**

```bash
git add tests/seo.test.ts astro.config.mjs
git commit -m "fix: include indexable extra-payment guides in sitemap"
```

### Task 3: Make the remaining trust rollout tests pass

**Files:**
- Modify: `src/pages/calculators/debt-snowball-calculator.astro`
- Modify: `src/pages/calculators/debt-avalanche-calculator.astro`
- Modify: `src/pages/calculators/debt-to-income-calculator.astro`
- Modify: `src/pages/calculators/rent-vs-buy-calculator.astro`
- Modify: `src/pages/calculators/amortization-schedule-calculator.astro`
- Modify: `src/pages/calculators/index.astro`
- Modify: `src/pages/topics/index.astro`
- Modify: `src/pages/guides/index.astro`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Use the existing failing trust tests as the red state:
- `SEO: remaining calculators should adopt the phase-2 trust model`
- `SEO: calculators/topics/guides index pages should expose the stronger trust navigation model`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL on those trust tests with missing `TRUST_PROFILES`, `writtenBy`, `reviewScope`, `authorProfile`, or `reviewProfiles` messages.

**Step 3: Write minimal implementation**

Update each missing page to use the same trust/profile pattern already used by strong calculator and topic pages.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: the trust rollout tests pass.

**Step 5: Commit**

```bash
git add src/pages/calculators/debt-snowball-calculator.astro src/pages/calculators/debt-avalanche-calculator.astro src/pages/calculators/debt-to-income-calculator.astro src/pages/calculators/rent-vs-buy-calculator.astro src/pages/calculators/amortization-schedule-calculator.astro src/pages/calculators/index.astro src/pages/topics/index.astro src/pages/guides/index.astro
git commit -m "feat: complete trust rollout on remaining workflow pages"
```

### Task 4: Rewrite the core originality pages

**Files:**
- Modify: `src/pages/calculators/index.astro`
- Modify: `src/pages/calculators/debt-snowball-calculator.astro`
- Modify: `src/pages/calculators/debt-avalanche-calculator.astro`
- Modify: `src/pages/calculators/debt-to-income-calculator.astro`
- Modify: `src/pages/calculators/rent-vs-buy-calculator.astro`
- Modify: `src/pages/calculators/amortization-schedule-calculator.astro`
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-liquidity-reserve.astro`
- Modify: `src/pages/guides/extra-payment-target-payoff-date.astro`
- Modify: `src/pages/guides/extra-payment-vs-refinance.astro`

**Step 1: Write the failing test**

Use content-quality expectations defined by scope, not a giant prose snapshot:
- pages must have page-specific role framing,
- pages must route to the right next step,
- pages must avoid collapsing back into the same generic checklist skeleton.

If needed, add narrow string-based assertions for new role cues on the rewritten guides.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL if the new page-role expectations are missing.

**Step 3: Write minimal implementation**

Rewrite each page with:
- a clearer decision framing,
- fewer repeated boilerplate sections,
- more specific examples or interpretation notes,
- more intentional next-step routing.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: the new content-role assertions pass and existing SEO tests remain green.

**Step 5: Commit**

```bash
git add src/pages/calculators/index.astro src/pages/calculators/debt-snowball-calculator.astro src/pages/calculators/debt-avalanche-calculator.astro src/pages/calculators/debt-to-income-calculator.astro src/pages/calculators/rent-vs-buy-calculator.astro src/pages/calculators/amortization-schedule-calculator.astro src/pages/guides/extra-payment-accelerated-plan.astro src/pages/guides/extra-payment-liquidity-reserve.astro src/pages/guides/extra-payment-target-payoff-date.astro src/pages/guides/extra-payment-vs-refinance.astro
git commit -m "feat: de-template core workflow pages"
```

### Task 5: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Spot-check production-facing outputs**

Review:
- sitemap inclusion behavior,
- trust summary presence,
- rewritten page structure and routing.

**Step 3: Summarize impact**

Document:
- which sitemap pages were restored,
- which trust gaps were closed,
- which pages were rewritten to reduce templating.

**Step 4: Commit**

```bash
git add .
git commit -m "chore: verify SEO quality and originality batch"
```
