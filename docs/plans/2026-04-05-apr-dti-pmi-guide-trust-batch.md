# APR DTI PMI Guide Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three still-legacy high-value guides to the stronger trust model and clearer decision-role pattern without changing site structure.

**Architecture:** Keep each Astro route and main body structure intact. First add a failing SEO regression for the selected pages, then apply the minimum trust and role edits needed to satisfy that regression, and finally run full local verification.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the APR DTI PMI guide trust batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/what-counts-in-dti.astro`
- `src/pages/guides/pmi-removal-vs-extra-principal.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `how-to-use-apr-for-credit-cards.astro` includes `Use this guide when you are comparing credit card APR types, promo windows, and fee-heavy payoff choices`
- `what-counts-in-dti.astro` includes `Use this guide when you are deciding which debts, income sources, and documentation actually count in DTI`
- `pmi-removal-vs-extra-principal.astro` includes `Use this guide when you need to decide whether faster PMI removal should change your extra-principal strategy`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, missing role phrases, or stale dates

### Task 2: Upgrade `how-to-use-apr-for-credit-cards`

**Files:**
- Modify: `src/pages/guides/how-to-use-apr-for-credit-cards.astro`

**Step 1: Add trust imports and metadata**

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

**Step 3: Strengthen the role section**

Replace the generic heading and text with a clearer "Use this guide when..." section that includes the exact role phrase from Task 1 and routes readers toward the right next tool.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `what-counts-in-dti`

**Files:**
- Modify: `src/pages/guides/what-counts-in-dti.astro`

**Step 1: Add trust imports and metadata**

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

Keep the existing role heading because it is already strong, unless only a minor wording adjustment is needed for consistency.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `pmi-removal-vs-extra-principal`

**Files:**
- Modify: `src/pages/guides/pmi-removal-vs-extra-principal.astro`

**Step 1: Add trust imports and metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the review card**

Add `ReviewedByCard` near the top of the page using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top with the exact role phrase from Task 1 and supporting bullets about PMI thresholds, appraisal rules, and choosing whether extra principal should prioritize PMI removal first.

**Step 4: Align dates**

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
- Add: `docs/plans/2026-04-05-apr-dti-pmi-guide-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-apr-dti-pmi-guide-trust-batch.md`

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
