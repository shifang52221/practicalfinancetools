# Extra Payment Execution Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the three next-priority extra-payment execution guides to the stronger trust model while preserving their routes and their role inside the mortgage-payoff workflow.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the lump-sum-versus-monthly, target-payoff-date, and servicer-posting pages, then make the minimum Astro edits needed to normalize trust metadata, visible review coverage, role framing, official references, date alignment, and stronger routing toward current workflow pages. Keep the pages recognizable, but rewrite enough of the body so they read like trustworthy execution guidance rather than old support notes.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the extra-payment execution batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-servicer-posting-rules.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also require role phrases:

- `extra-payment-lump-sum-vs-monthly.astro` includes `Use this guide when timing is the main reason a lump sum and recurring extra could produce different payoff results`
- `extra-payment-target-payoff-date.astro` includes `Use this guide when you have a target mortgage-free date and need to back into a realistic extra-payment plan`
- `extra-payment-servicer-posting-rules.astro` includes `Use this guide when servicer posting rules could prevent your extra payment from reducing principal the way you expect`

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

### Task 2: Upgrade `extra-payment-lump-sum-vs-monthly`

**Files:**
- Modify: `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`

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

Add a top section that includes:

- `Use this guide when timing is the main reason a lump sum and recurring extra could produce different payoff results`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- mortgage payoff guidance
- prepayment-penalty checks before larger extras

**Step 5: Tighten routing**

Route toward stronger additional-principal, recurring-extra, annual-extra, and principal-only workflow pages.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `extra-payment-target-payoff-date`

**Files:**
- Modify: `src/pages/guides/extra-payment-target-payoff-date.astro`

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

Add a top section that includes:

- `Use this guide when you have a target mortgage-free date and need to back into a realistic extra-payment plan`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- monthly mortgage-payment management
- prepayment-penalty checks before aggressive payoff plans

**Step 5: Tighten routing**

Route toward stronger amortization, affordability, reserve, and broader extra-payment workflow pages.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `extra-payment-servicer-posting-rules`

**Files:**
- Modify: `src/pages/guides/extra-payment-servicer-posting-rules.astro`

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

Add a top section that includes:

- `Use this guide when servicer posting rules could prevent your extra payment from reducing principal the way you expect`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- mortgage servicing rules
- monthly mortgage-payment management and statement review

**Step 5: Tighten routing**

Route toward stronger principal-only, extra-payment, and statement-check workflow pages.

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
- Add: `docs/plans/2026-04-05-extra-payment-execution-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-extra-payment-execution-trust-batch.md`

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
