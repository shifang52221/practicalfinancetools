# Priority Guide Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the next three highest-priority legacy active guides to the stronger trust model and clearer decision-role pattern without changing site architecture.

**Architecture:** Keep each page's current route, structure, and core body content. First add a failing SEO regression that locks the desired trust and role pattern, then update the three guide pages with the minimum code and copy needed to satisfy that pattern, and finally run full local verification.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the next trust-upgrade batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Add a new test block for:

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

Require for each page:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require:

- `how-credit-card-interest-is-calculated.astro` includes a role phrase about understanding daily-interest mechanics before trusting a payoff estimate
- `why-minimum-payments-take-so-long.astro` includes a role phrase about understanding why minimum rules barely reduce principal
- `one-extra-mortgage-payment-per-year.astro` keeps its existing role phrase about the one-extra-payment-per-year effect without guesswork

**Step 2: Lock date alignment**

Require each page's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should be caused by missing stronger trust-model fields or the missing new role phrase expectations

**Step 4: Keep the assertions fixed**

Do not weaken the test after the red run unless a file path or expectation is factually wrong.

### Task 2: Upgrade `how-credit-card-interest-is-calculated`

**Files:**
- Modify: `src/pages/guides/how-credit-card-interest-is-calculated.astro`

**Step 1: Add stronger metadata trust coverage**

Add:

- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Replace legacy review-card props**

Keep `ReviewedByCard`, but switch to:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top that clearly positions the page for:

- daily-interest-mechanics questions
- statement-versus-simple-estimate confusion
- routing toward the correct calculator next

**Step 4: Align dates**

Set both:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `why-minimum-payments-take-so-long`

**Files:**
- Modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 1: Add stronger metadata trust coverage**

Add:

- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Replace legacy review-card props**

Keep `ReviewedByCard`, but switch to:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top that clearly positions the page for:

- understanding why minimum rules barely reduce principal
- comparing the statement-minimum path with a fixed-payment path
- routing toward the correct calculator next

Keep the existing calculator chooser section if it still reads cleanly after the new role section is added.

**Step 4: Align dates**

Set both:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `one-extra-mortgage-payment-per-year`

**Files:**
- Modify: `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

**Step 1: Add stronger metadata trust coverage**

Add:

- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Replace legacy review-card props**

Keep `ReviewedByCard`, but switch to:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Preserve the current role section**

Keep the existing "Use this guide when you want the one-extra-payment-per-year effect without guesswork" section intact unless only a minor wording adjustment is needed for consistency.

**Step 4: Align dates**

Set both:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 5: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the three guide files above

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the three guide files above
- Add: `docs/plans/2026-04-05-priority-guide-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-priority-guide-trust-batch.md`

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

- PASS, with only any already-known non-blocking warnings

**Step 4: Review the working tree**

Run:

```bash
git status --short
```

Expected:

- this batch's files are modified
- prior accepted local work remains intact

**Step 5: Hold changes locally**

Do not commit or push anything.
