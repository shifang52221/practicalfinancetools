# Transparency Pages Trust Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `/about`, `/editorial-policy`, `/methodology`, and `/contact` so they function as a coherent public trust center for the site without changing URL structure or indexability strategy.

**Architecture:** This is a trust-layer content and component hardening batch. First extend `tests/seo.test.ts` with a focused regression that protects the public-accountability structure, verify the new assertions fail, then add one small shared trust-navigation component and refresh the four trust pages to make ownership, review boundaries, correction handling, and policy/methodology navigation clearer. Keep the work limited to these pages and supporting components.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for the trust-center structure

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one focused regression covering:

- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/methodology.astro`
- `src/pages/contact.astro`

Require:

- `about`, `editorial-policy`, and `methodology` still include `ReviewedByCard`
- all four trust pages include `TrustRoles`
- all four trust pages include links to the shared trust-center destinations:
  - `/about`
  - `/editorial-policy`
  - `/methodology`
  - `/contact`
- `editorial-policy` includes phrases for:
  - source hierarchy or references
  - automation boundaries
  - advertising or independence
- `methodology` includes phrases for:
  - validation or verification
  - limitations or model boundaries
- `contact` includes phrases for:
  - correction requests
  - privacy or sensitive information guidance
- `about` includes phrases for:
  - maintenance or updates
  - advertising or independence

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the new trust-center assertions

**Step 3: Confirm the failure reason**

Do not change production files until the failure is clearly caused by the missing trust-center structure or wording.

### Task 2: Add a shared trust-center navigation component

**Files:**
- Create: `src/components/TrustPolicyLinks.astro`

**Step 1: Add the new component**

Build one small card/grid component that links:

- `/about`
- `/editorial-policy`
- `/methodology`
- `/contact`

Each entry should include:

- page label
- short role description

**Step 2: Keep the component lightweight**

Do not:

- introduce new styling systems
- add icons or decorative complexity
- add new schema or tracking behavior

### Task 3: Refresh the public trust pages

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/editorial-policy.astro`
- Modify: `src/pages/methodology.astro`
- Modify: `src/pages/contact.astro`

**Step 1: Refresh `about.astro`**

Tighten the page so it clearly explains:

- what the site publishes
- who it serves
- how updates and corrections are handled
- how advertising fits without changing outputs
- where users should go for policy, methodology, and contact details

Include the shared trust-navigation component.

**Step 2: Refresh `editorial-policy.astro`**

Tighten the page so it clearly explains:

- publishing criteria
- source hierarchy and references
- automation boundaries
- correction handling expectations
- advertising and independence

Include the shared trust-navigation component.

**Step 3: Refresh `methodology.astro`**

Tighten the page so it clearly explains:

- model boundaries
- validation approach
- formula/assumption update flow
- what readers should verify against their documents

Include the shared trust-navigation component.

**Step 4: Refresh `contact.astro`**

Tighten the page so it clearly explains:

- what reports belong here
- what information helps reproduce an issue
- how corrections are prioritized
- what not to send
- privacy expectations for email

Include the shared trust-navigation component.

**Step 5: Keep scope tight**

Do not:

- add new public routes
- change `robots` settings
- change sitemap inclusion
- alter calculator logic or guide routing

### Task 4: Tighten supporting trust component copy if needed

**Files:**
- Modify: `src/components/ReviewedByCard.astro` (only if needed)
- Modify: `src/components/TrustRoles.astro` (only if needed)

**Step 1: Make minimal supporting copy adjustments**

If the refreshed page copy reveals weak or repetitive helper text, make the smallest possible wording adjustment so the shared trust components align with the stronger public-accountability model.

**Step 2: Avoid broad component churn**

Do not turn this into a site-wide redesign of all trust surfaces.

### Task 5: Verify GREEN on the targeted regression

**Files:**
- Test: `tests/seo.test.ts`

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Run full verification for the local worktree state

**Files:**
- Verify whole worktree

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS with zero failing tests

**Step 2: Run Astro checks**

Run:

```bash
npm run check
```

Expected:

- `0 errors`
- `0 warnings`
- `0 hints`

**Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

- successful static build

### Task 7: Review the resulting local state

**Files:**
- Review only

**Step 1: Inspect worktree status**

Run:

```bash
git status --short
```

Expected:

- only additive local changes from this batch
- no revert of unrelated accepted work

**Step 2: Hold changes locally**

Report:

- which trust pages were strengthened
- whether the new shared trust-navigation component was added
- what regression was added
- fresh verification evidence

Do not push until the user asks for it.
