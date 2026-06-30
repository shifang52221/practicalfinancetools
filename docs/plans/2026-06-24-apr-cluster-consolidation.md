# APR Cluster Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the APR workflow cluster so the hub, discovery gate, parent guides, and final-check pages have distinct roles, stronger routing, and less overlap.

**Architecture:** Keep the current Astro routes intact and preserve the existing redirect and noindex structure. Strengthen the APR hub and parent guides first, then refine discovery and validation pages so each page solves one clear job and hands off to the right next step. Add regression tests to lock in these boundaries and trust signals.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner, existing SEO assertions in `tests/seo.test.ts`

---

### Task 1: Add APR cluster regression coverage

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a focused APR-cluster test that checks the following pages:

- `src/pages/topics/apr.astro`
- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-by-loan-type.astro`
- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/apr-comparison-checklist.astro`

The test should assert that:

- the topic page clearly acts as the main APR routing hub,
- the source-finding page clearly acts as a disclosure/discovery gate,
- each parent guide owns a distinct comparison branch,
- the checklist page clearly acts as a final comparison check,
- refreshed pages expose aligned trust-date patterns.

**Step 2: Run the test to confirm it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL, because the current pages still mix some roles and keep older trust dates.

### Task 2: Refresh the discovery and validation gates

**Files:**
- Modify: `src/pages/guides/how-to-find-your-apr.astro`
- Modify: `src/pages/guides/apr-comparison-checklist.astro`

**Step 1: Make the minimal content changes**

For each page:

- keep the route intact,
- make the page role explicit in the opening section,
- tighten the next-step language so readers know where to go after this page,
- align trust dates if the page is materially refreshed.

**Step 2: Run the SEO test to verify partial progress**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still red until the parent-guide pages are fully aligned.

### Task 3: Strengthen the APR parent guides

**Files:**
- Modify: `src/pages/guides/apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/apr-with-origination-fee.astro`
- Modify: `src/pages/guides/apr-by-loan-type.astro`
- Modify: `src/pages/guides/how-to-use-apr-for-credit-cards.astro`

**Step 1: Keep each guide focused on one branch**

For each page:

- make the branch ownership explicit near the top,
- prevent it from reading like a second APR hub,
- add or tighten handoffs back to the source guide, topic hub, or calculator where appropriate,
- align trust dates only where the page is genuinely refreshed.

**Step 2: Preserve absorbed-intent coverage**

- keep the currently tested absorbed phrases so the guides still cover the narrower intent that was consolidated into them,
- avoid removing helpful route cues that support redirect-source pages.

### Task 4: Verify the cluster and finish

**Files:**
- No code changes

**Step 1: Run the SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

**Step 2: Run project checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected:

- PASS
