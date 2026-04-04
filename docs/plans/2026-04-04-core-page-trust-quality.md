# Core Page Trust And Quality Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the remaining core calculators and core index pages to the site's stronger trust-and-quality standard so they present clearer ownership, better decision boundaries, and stronger Google/AdSense quality signals without changing site structure.

**Architecture:** Reuse the existing role-based trust registry and upgraded review-summary component, then migrate the remaining high-value calculators and navigation entry pages in a staged order. Strengthen page usefulness with boundary guidance, input-check guidance, and navigation-role language, and lock the rollout with regression tests that verify trust adoption across the full scoped set.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the second-phase trust-and-quality rollout

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write failing assertions for the remaining calculators**

Add a regression block that covers:

- `src/pages/calculators/debt-snowball-calculator.astro`
- `src/pages/calculators/debt-avalanche-calculator.astro`
- `src/pages/calculators/debt-to-income-calculator.astro`
- `src/pages/calculators/rent-vs-buy-calculator.astro`
- `src/pages/calculators/amortization-schedule-calculator.astro`

Require each file to include:

- `TRUST_PROFILES`
- `writtenBy=`
- `reviewScope=`

**Step 2: Write failing assertions for the three index pages**

Add a regression block that covers:

- `src/pages/calculators/index.astro`
- `src/pages/topics/index.astro`
- `src/pages/guides/index.astro`

Require each file to include:

- `TRUST_PROFILES`
- the upgraded `ReviewedByCard` trust props
- role-based layout metadata

**Step 3: Verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failures should point at the eight pages that still use the older pattern

### Task 2: Upgrade the highest interpretation-risk calculators

**Files:**
- Modify: `src/pages/calculators/debt-to-income-calculator.astro`
- Modify: `src/pages/calculators/rent-vs-buy-calculator.astro`
- Modify: `src/pages/calculators/amortization-schedule-calculator.astro`

**Step 1: Add trust metadata to the layouts**

For each file:

- import `TRUST_PROFILES`
- pass `authorProfile={TRUST_PROFILES.siteOwner}`
- pass `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}`

**Step 2: Add upgraded review summaries**

For each file:

- import `ReviewedByCard`
- replace any missing or legacy review block with the upgraded card
- use a page-specific `reviewScope=` that reflects the actual decision and interpretation risks on that page

**Step 3: Strengthen usage-boundary guidance**

Add or revise sections so each page clearly explains:

- what the tool helps decide
- what it does not decide
- the most likely interpretation mistakes

Focus areas:

- DTI: not an approval predictor
- rent-vs-buy: break-even is scenario output, not forecast
- amortization: note rate versus APR and P&I versus escrow

**Step 4: Strengthen input and scenario guidance**

Add or refine practical sections covering:

- where inputs should come from
- when to run comparison scenarios
- when to switch to a related tool or topic hub

**Step 5: Verify the targeted pages locally**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL because the paired debt-strategy calculators and index pages are not migrated yet

### Task 3: Upgrade the paired debt-strategy calculators as a matched set

**Files:**
- Modify: `src/pages/calculators/debt-snowball-calculator.astro`
- Modify: `src/pages/calculators/debt-avalanche-calculator.astro`

**Step 1: Add trust metadata and upgraded review summaries**

For both files:

- import `TRUST_PROFILES`
- pass the role-based author/review props into `CalculatorLayout`
- add the upgraded `ReviewedByCard`

**Step 2: Align decision-language across the pair**

Make sure both pages explain the tradeoff consistently:

- snowball: momentum and consistency benefits
- avalanche: interest-minimization benefits
- both: compare both methods if motivation and cost point in different directions

**Step 3: Strengthen tool-routing**

Add or refine guidance that points users to:

- the single-card payoff tools when modeling one balance
- the topic hub when choosing between strategy frameworks

**Step 4: Preserve and refine references**

If a page already has `References`, keep that section and tighten the surrounding explanation instead of replacing it with filler.

**Step 5: Verify incremental progress**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL only for the three index pages if calculator migration is complete

### Task 4: Upgrade the three core index pages into trust-aware navigation pages

**Files:**
- Modify: `src/pages/calculators/index.astro`
- Modify: `src/pages/topics/index.astro`
- Modify: `src/pages/guides/index.astro`

**Step 1: Add role-based layout metadata**

For each index page:

- import `TRUST_PROFILES`
- pass `authorProfile`
- pass `reviewProfiles`

**Step 2: Upgrade the visible review summary**

Use the upgraded `ReviewedByCard` with page-specific scope:

- calculators: task-based tool routing and selection guidance
- topics: workflow framing and path selection guidance
- guides: library curation and strongest-path surfacing guidance

**Step 3: Add concise page-role language**

Revise or add sections so each page explains:

- what job this page does
- when users should start here
- when users should bypass it and go directly to a core tool or topic

**Step 4: Add concise maintenance/quality framing**

Add short copy that explains:

- strongest pages are prioritized
- narrower pages are supporting assets
- users should start with the clearest path, then go deeper only if needed

Keep this short and useful. Avoid bloat.

### Task 5: Finalize regression coverage and verify GREEN

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Refine assertions if needed**

After the rollout is complete, make sure the regression checks:

- all eight scoped pages adopt the stronger trust model
- the three index pages do not remain in the generic legacy reviewer state
- the five calculators expose stronger role-based trust summary props

Do not assert long exact prose blocks.

**Step 2: Verify GREEN**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Run full project verification

**Files:**
- No source changes required unless verification exposes issues

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Run Astro diagnostics**

Run:

```bash
npm run check
```

Expected:

- 0 errors
- 0 warnings
- 0 hints

**Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected:

- successful build output

### Task 7: Review diff quality and hold for unified push

**Files:**
- Review the final diff only

**Step 1: Inspect the scoped diff**

Run:

```bash
git diff --stat
git diff -- src/pages/calculators/debt-to-income-calculator.astro src/pages/calculators/rent-vs-buy-calculator.astro src/pages/calculators/amortization-schedule-calculator.astro src/pages/calculators/debt-snowball-calculator.astro src/pages/calculators/debt-avalanche-calculator.astro src/pages/calculators/index.astro src/pages/topics/index.astro src/pages/guides/index.astro tests/seo.test.ts
```

Expected:

- only the scoped pages and related regression test changes appear

**Step 2: Do not push yet**

Keep this batch local until the full review is complete and the user is ready for another unified push.
