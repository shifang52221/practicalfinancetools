# Refinance Consolidation Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the refinance consolidation strategy so the redirected support URLs stay intentionally consolidated while the three destination guides absorb the missing topic depth.

**Architecture:** Keep the existing Astro page structure and Vercel redirect strategy. Add regression coverage that locks down the redirect map and requires stronger topic absorption on the three destination guides, then strengthen only those destination guides with focused sections that cover the redirected support themes.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add regression coverage for refinance consolidation

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add assertions that require the three refinance destination guides to explicitly absorb the support topics:

- `src/pages/guides/refinance-break-even.astro`
- `src/pages/guides/refinance-checklist.astro`
- `src/pages/guides/refinance-closing-costs.astro`

Also add a regression check that the redirected refinance support URLs remain listed in `vercel.json` and excluded from the sitemap.

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing topic absorption on at least one destination guide

### Task 2: Strengthen the three refinance destination guides

**Files:**
- Modify: `src/pages/guides/refinance-break-even.astro`
- Modify: `src/pages/guides/refinance-checklist.astro`
- Modify: `src/pages/guides/refinance-closing-costs.astro`

**Step 1: Keep the current URL strategy**

Do not remove or change the current Vercel redirects for the refinance support URLs.

**Step 2: Absorb missing support topics**

Update the three destination guides so they explicitly cover the support topics they are meant to absorb:

- `refinance-break-even` should cover term reset, when not to refinance, and cash-in tradeoffs
- `refinance-checklist` should cover offer comparison and rate-lock review
- `refinance-closing-costs` should cover rolling costs and no-closing-cost claims

**Step 3: Keep the changes tight**

Do not redesign page structure. Use concise sections, bullets, or checklist framing that fits the existing layout and trust pattern.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 3: Verify no regressions

**Files:**
- Verify only

**Step 1: Run full project verification**

Run:

```bash
npm run check
npm test
npm run build
```

Expected:

- all commands succeed

**Step 2: Review git diff**

Confirm the changes stay limited to the refinance consolidation guardrails and the three destination guides.
