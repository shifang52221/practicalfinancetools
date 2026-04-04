# Mortgage Payment Estimation And Entry Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the mortgage-payment tax/insurance estimation guides and the main calculator entry page with trust signals, role clarity, and tighter internal linking.

**Architecture:** Keep the existing calculator and guide structure intact. Add regression coverage first in `tests/seo.test.ts`, then strengthen the three selected pages in place using the same visible trust pattern established in the previous batches.

**Tech Stack:** Astro, TypeScript-based Node tests, existing SEO regression suite

---

### Task 1: Add failing regression coverage for the estimation-entry batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a new SEO regression block for:

- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/calculators/mortgage-payment-calculator.astro`

Require:

- `ReviewedByCard`
- a role-signaling phrase for each page
- a `References` section
- matching visible update dates where applicable

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL on missing review coverage, chooser language, references, or stale dates.

### Task 2: Strengthen the two estimation guides

**Files:**
- Modify: `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- Modify: `src/pages/guides/how-to-estimate-property-taxes.astro`

**Step 1: Add trust structure**

Add `ReviewedByCard`, refresh `lastUpdated`, add chooser language, and add `References`.

**Step 2: Clarify page ownership**

Make the pages clearly own:

- building realistic insurance inputs before payment modeling
- building realistic property-tax inputs before payment modeling

**Step 3: Strengthen internal links**

Ensure both pages point back to:

- `src/pages/calculators/mortgage-payment-calculator.astro`
- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/what-is-piti.astro`
- the aligned escrow/trust pages when appropriate

**Step 4: Verify**

Run: `npm test`

Expected: the estimation-guide assertions pass.

### Task 3: Strengthen the mortgage payment calculator entry page

**Files:**
- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`

**Step 1: Add trust structure**

Add `ReviewedByCard`, refresh `lastUpdated`, add chooser language, and add `References`.

**Step 2: Clarify entry role**

Position the calculator as the main starting point for:

- total monthly housing payment
- PITI plus HOA plus PMI
- scenario comparison across taxes, insurance, down payment, and rate

**Step 3: Tighten related links**

Point the calculator toward the strengthened estimation and mortgage-payment workflow pages instead of weaker or less aligned neighboring pages where possible.

**Step 4: Verify**

Run: `npm test`

Expected: the calculator assertions pass.

### Task 4: Full verification

**Files:**
- Modify: selected `src/pages/guides/*.astro`
- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`
- Modify: `tests/seo.test.ts`

**Step 1: Run project checks**

Run: `npm run check`

Expected: PASS

**Step 2: Run tests**

Run: `npm test`

Expected: PASS

**Step 3: Run build**

Run: `npm run build`

Expected: PASS, except any already-known non-blocking warning.

**Step 4: Keep local**

Do not commit or push yet.
