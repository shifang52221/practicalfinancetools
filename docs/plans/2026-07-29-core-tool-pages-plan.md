# Core Calculator Pages Quality Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve the independent usefulness, trust framing, and internal routing of three high-impression calculator pages without changing formulas, URLs, redirects, or indexation tiers.

**Architecture:** Keep the existing Astro page and calculator component architecture. Changes stay in the three route files plus static SEO regression tests, with one narrowly scoped `CalculatorLayout` schema improvement so calculator pages expose their existing `lastUpdated` value as `dateModified`. Calculation functions and calculator behavior remain unchanged. The pages continue to use the existing `CalculatorLayout`, `ReviewedByCard`, trust profiles, and topic/guide routing.

**Tech Stack:** Astro 5, TypeScript, Node test runner, existing `tests/seo.test.ts`, Astro check/build.

---

### Task 1: Add failing regression coverage for the three page roles

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing assertions**

Add one focused test that reads the three page sources and asserts:

- `additional-principal-payment-calculator.astro` identifies lump-sum/principal-only use, distinguishes escrow or recast boundaries, links to the broad extra-payment calculator, and uses the implementation review date.
- `credit-card-payoff-calculator.astro` identifies fixed-payment use, links to the minimum-payment calculator and interest guide, and states that the model assumes no new purchases or fixed APR.
- `debt-snowball-calculator.astro` identifies multi-debt ordering, explains snowball versus avalanche, links to the avalanche calculator, and uses the implementation review date.

Use the same source-reading and issue-collection style already used elsewhere in `tests/seo.test.ts`. Keep the assertions tied to durable page roles, not exact paragraph wording.

**Step 2: Run the focused test to verify it fails**

Run:

```powershell
npm test -- tests/seo.test.ts
```

Expected: the existing suite fails only on the new role assertions because the stale pages do not yet contain the required current-date and routing cues.

### Task 2: Strengthen the additional-principal calculator page

**Files:**
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`

**Step 1: Update page metadata and review date**

Keep the canonical path unchanged. Make the title and description explicitly distinguish additional principal/lump-sum planning from broad recurring extra-payment planning. Update `lastUpdated` and the visible date to `2026-07-29` only because this task makes a substantive page update.

**Step 2: Clarify the decision role**

Improve the opening section so users can tell this is for:

- One-time lump sums.
- Principal-only payments.
- Comparing a lump sum with recurring extras.

State that escrow is outside the model, recast is a separate outcome, and servicer posting rules can change the result.

**Step 3: Add a decision-focused example and routing**

Retain the current calculator output and add or refine a compact scenario that compares early lump sum versus recurring monthly extra. Link to:

- `/calculators/extra-payment-calculator`
- `/guides/mortgage-recast-vs-extra-payments`
- `/topics/mortgage-payoff`

Do not link to redirected guide URLs.

**Step 4: Run the role test**

Run:

```powershell
npm test -- tests/seo.test.ts
```

Expected: the additional-principal assertions pass; remaining new assertions may still fail.

### Task 3: Strengthen the credit-card payoff calculator page

**Files:**
- Modify: `src/pages/calculators/credit-card-payoff-calculator.astro`

**Step 1: Update page metadata and review date**

Keep the canonical path and calculator component unchanged. Refresh the title/description only if needed to make fixed-payment intent explicit. Update `lastUpdated`, visible date, and review date to `2026-07-29`.

**Step 2: Make the page boundary explicit**

State that this page is for a known or chosen fixed monthly payment. Contrast it with:

- `/calculators/minimum-payment-payoff-calculator` for issuer minimum rules.
- `/guides/how-credit-card-interest-is-calculated` for statement-interest mechanics.

Keep the no-new-purchases and fixed-APR assumptions visible near the primary explanation.

**Step 3: Improve the practical decision path**

Add or refine a small payment-target comparison and a concise “if your situation is different” route block. Avoid repeating the minimum-payment page’s full formula explanation.

**Step 4: Run the role test**

Run:

```powershell
npm test -- tests/seo.test.ts
```

Expected: the credit-card payoff assertions pass.

### Task 4: Strengthen the debt snowball calculator page

**Files:**
- Modify: `src/pages/calculators/debt-snowball-calculator.astro`

**Step 1: Update page metadata and review date**

Keep the canonical path and calculator component unchanged. Update `lastUpdated`, visible date, and review date to `2026-07-29`.

**Step 2: Clarify multi-debt scope**

Make the first explanation explicitly state that the page models several debts together and prioritizes the smallest balance while minimums continue on other debts.

**Step 3: Explain the snowball/avalanche trade-off**

Use a short comparison that distinguishes behavioral momentum from interest minimization. Link to `/calculators/debt-avalanche-calculator` and keep the language educational rather than prescriptive.

**Step 4: Run the role test**

Run:

```powershell
npm test -- tests/seo.test.ts
```

Expected: all new role assertions pass.

### Task 5: Review the unified diff and protect architecture

**Files:**
- Review: `src/pages/calculators/additional-principal-payment-calculator.astro`
- Review: `src/pages/calculators/credit-card-payoff-calculator.astro`
- Review: `src/pages/calculators/debt-snowball-calculator.astro`
- Review: `tests/seo.test.ts`

**Step 1: Check for unintended routing or formula changes**

Run:

```powershell
git diff --check
git diff --stat
git diff -- src/pages/calculators tests/seo.test.ts
```

Confirm that no calculator library, canonical path, redirect configuration, sitemap filter, or `robots="noindex, follow"` rule changed.

**Step 2: Check internal links**

Use the existing redirected-guide test and inspect any new guide links manually. No active page may link to a URL listed as a redirect source.

### Task 6: Run full verification

**Files:**
- Verify: all modified files

**Step 1: Run the full test suite**

Run:

```powershell
npm test
```

Expected: all tests pass with zero failures.

**Step 2: Run Astro checks**

Run:

```powershell
npm run check
```

Expected: zero errors, warnings, and hints.

**Step 3: Build the production site**

Run:

```powershell
npm run build
```

Expected: the production build completes successfully and produces the expected static routes.

**Step 4: Review final status**

Run:

```powershell
git status --short
git diff --check
```

Expected: only the planned page files, SEO test, and plan/design documents are changed; no generated or unrelated files are included.

### Task 7: Create one unified implementation commit

**Files:**
- Commit: all planned changes only

**Step 1: Stage the reviewed batch**

```powershell
git add src/pages/calculators/additional-principal-payment-calculator.astro src/pages/calculators/credit-card-payoff-calculator.astro src/pages/calculators/debt-snowball-calculator.astro tests/seo.test.ts docs/plans/2026-07-29-core-tool-pages-plan.md
```

**Step 2: Commit once**

```powershell
git commit -m "Strengthen core calculator page roles"
```

Do not push until the final diff, tests, check, and build have all been reviewed. The remote push should remain a separate user-visible decision after verification.
