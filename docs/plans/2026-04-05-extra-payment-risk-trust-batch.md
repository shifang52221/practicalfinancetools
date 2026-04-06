# Extra Payment Risk Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the three highest-priority legacy extra-payment risk guides to the stronger trust model while preserving their routes and their role inside the mortgage-payoff workflow.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the liquidity, debt-priority, and tax-impact pages, then make the smallest Astro edits needed to normalize trust metadata, visible review coverage, role framing, official references, date alignment, and stronger routing toward current destination pages. Keep the pages recognizable, but rewrite enough of the body so they read like reviewed decision-support guides rather than thin support notes.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the extra-payment risk batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- `src/pages/guides/extra-payment-tax-deduction-impact.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also require role phrases:

- `extra-payment-liquidity-reserve.astro` includes `Use this guide when liquidity risk is the main reason you hesitate to make extra mortgage payments`
- `extra-payment-priority-vs-other-debts.astro` includes `Use this guide when another debt payoff may deserve priority over extra mortgage principal`
- `extra-payment-tax-deduction-impact.astro` includes `Use this guide when tax assumptions are changing the after-tax value of extra mortgage payments`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, missing review cards, missing role sections, missing references, or stale dates

### Task 2: Upgrade `extra-payment-liquidity-reserve`

**Files:**
- Modify: `src/pages/guides/extra-payment-liquidity-reserve.astro`

**Step 1: Add trust imports and layout metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the visible review summary**

Add a `ReviewedByCard` using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add the role section**

Add a top support-page section that includes:

- `Use this guide when liquidity risk is the main reason you hesitate to make extra mortgage payments`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- emergency savings
- liquidity for unplanned repairs or income loss
- avoiding debt dependence for financial shocks

**Step 5: Tighten routing**

Route toward the active payoff workflow pages and away from weaker legacy branches.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `extra-payment-priority-vs-other-debts`

**Files:**
- Modify: `src/pages/guides/extra-payment-priority-vs-other-debts.astro`

**Step 1: Add trust imports and layout metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the visible review summary**

Add a `ReviewedByCard` using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add the role section**

Add a top support-page section that includes:

- `Use this guide when another debt payoff may deserve priority over extra mortgage principal`

**Step 4: Add a short references section**

Use official FTC / consumer.gov sources relevant to:

- debt problems and repayment planning
- credit-card APR costs
- credit-history and borrowing-cost impacts

**Step 5: Tighten routing**

Route toward stronger credit-card payoff, APR, and payoff workflow pages.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `extra-payment-tax-deduction-impact`

**Files:**
- Modify: `src/pages/guides/extra-payment-tax-deduction-impact.astro`

**Step 1: Add trust imports and layout metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the visible review summary**

Add a `ReviewedByCard` using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add the role section**

Add a top support-page section that includes:

- `Use this guide when tax assumptions are changing the after-tax value of extra mortgage payments`

**Step 4: Add a short references section**

Use IRS sources relevant to:

- Publication 936
- mortgage-interest deduction rules
- interest-expense and itemized-deduction context

**Step 5: Tighten routing**

Route toward stronger payoff-versus-investing, refinance, and extra-payment workflow pages.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 5: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the three guide pages above

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
- Modify: the three guide pages above
- Add: `docs/plans/2026-04-05-extra-payment-risk-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-extra-payment-risk-trust-batch.md`

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
- prior local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything.
