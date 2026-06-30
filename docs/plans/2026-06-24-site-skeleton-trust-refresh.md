# Site Skeleton Trust Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the site's five skeleton pages so the main trust and routing layer matches the stronger workflow pages shipped on May 29, 2026.

**Architecture:** This change stays inside the existing Astro page structure. We will add one focused SEO regression test for the skeleton pages first, watch it fail, then make minimal content and `lastUpdated` changes to the site-level routing and trust pages so the site's top layer presents a synchronized maintenance signal.

**Tech Stack:** Astro, TypeScript, Node test runner

---

### Task 1: Add skeleton-page trust freshness regression coverage

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts:
- `src/pages/topics/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/calculators/index.astro`
- `src/pages/about.astro`
- `src/pages/methodology.astro`

all:
- expose a `const lastUpdated = "2026-06-24"`
- include a visible `Last updated: 2026-06-24`
- include one phrase confirming the site-level refresh purpose

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/seo.test.ts`

Expected:
- FAIL because the current pages still show `2026-04-22` or `2026-04-06`
- FAIL because the new refresh phrases are not yet present

**Step 3: Commit**

Do not commit yet. Proceed directly to Task 2 after the red test is confirmed.

### Task 2: Refresh the three routing index pages

**Files:**
- Modify: `src/pages/topics/index.astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/calculators/index.astro`

**Step 1: Write minimal implementation**

Update each page to:
- set `lastUpdated` to `2026-06-24`
- keep existing routing structure intact
- add one short section or sentence clarifying that the page is maintained as the primary entry layer for the cluster
- keep visible update text aligned with the constant

**Step 2: Run test to verify partial progress**

Run: `npm test -- tests/seo.test.ts`

Expected:
- The new skeleton-page freshness test still fails until trust pages are updated
- Existing SEO tests remain green except for the new expected failures

### Task 3: Refresh the two trust pages

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/methodology.astro`

**Step 1: Write minimal implementation**

Update each page to:
- set `lastUpdated` to `2026-06-24`
- keep the trust structure intact
- add one short section or sentence clarifying that the page is reviewed to keep site-wide trust, maintenance, and methodology aligned with the active calculator workflows
- keep visible update text aligned with the constant

**Step 2: Run the SEO test to verify it passes**

Run: `npm test -- tests/seo.test.ts`

Expected:
- PASS

### Task 4: Run full verification

**Files:**
- No code changes

**Step 1: Run project checks**

Run: `npm run check`

Expected:
- PASS

**Step 2: Run production build**

Run: `npm run build`

Expected:
- PASS

**Step 3: Commit**

```bash
git add tests/seo.test.ts src/pages/topics/index.astro src/pages/guides/index.astro src/pages/calculators/index.astro src/pages/about.astro src/pages/methodology.astro docs/plans/2026-06-24-site-skeleton-trust-refresh.md
git commit -m "Refresh site skeleton trust and routing pages"
```
