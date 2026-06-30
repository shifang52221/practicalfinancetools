# Topic Hub Routing Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the four core topic hubs so their maintenance dates, review dates, and topic-entry role cues align with the June 24, 2026 trust-and-routing refresh already applied to site skeleton pages and the highest-impression entry pages.

**Architecture:** Keep the existing topic-hub tables, branch structure, and links intact. Apply only minimal changes: synchronize `lastUpdated`, visible update text, and `ReviewedByCard` review dates; then add one short maintenance section per topic hub that clarifies the page's role as the primary cluster router. Tighten the mortgage-payoff hub so its next-step framing stays inside the payoff cluster unless users truly need to branch away.

**Tech Stack:** Astro, TypeScript, Node test runner

---

### Task 1: Add regression coverage for the four core topic hubs

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one focused test covering:
- `src/pages/topics/apr.astro`
- `src/pages/topics/credit-cards.astro`
- `src/pages/topics/mortgage-payoff.astro`
- `src/pages/topics/rent-vs-buy.astro`

Assert that each page:
- uses `const lastUpdated = "2026-06-24"`
- sets `reviewedOn="2026-06-24"` in `ReviewedByCard`
- shows visible `Last updated: 2026-06-24`
- includes one phrase confirming the page is actively maintained as the primary topic hub for its cluster

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/seo.test.ts`

Expected:
- FAIL because the pages still show April dates
- FAIL because the new maintenance phrases are missing

### Task 2: Refresh the four core topic hubs

**Files:**
- Modify: `src/pages/topics/apr.astro`
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Modify: `src/pages/topics/rent-vs-buy.astro`

**Step 1: Write minimal implementation**

For each page:
- update `lastUpdated` to `2026-06-24`
- update the visible date
- update the `ReviewedByCard` review date
- add one short maintenance section confirming the page is the primary topic-entry layer for that workflow cluster

For `mortgage-payoff.astro` specifically:
- keep the route and branch table intact
- tighten any broad cross-cluster next steps so the page stays centered on the mortgage-payoff cluster

**Step 2: Run the SEO test to verify it passes**

Run: `npm test -- tests/seo.test.ts`

Expected:
- PASS

### Task 3: Run full verification

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
