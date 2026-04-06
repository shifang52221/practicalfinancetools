# Site Closeout Header Brand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close the remaining weak public-page gaps and ship a stronger full-width header and logo system in one verified release.

**Architecture:** Keep the current routing, sitemap, and consolidation strategy intact. First add regression coverage for the remaining public weak pages and the new global header contract, then normalize the lagging content pages, then upgrade the shared layout and brand assets, and finally run full verification before push.

**Tech Stack:** Astro, TypeScript, CSS, Vitest, SVG assets, Vercel deployment via `master`

---

### Task 1: Add failing regression coverage for the closeout pages and header contract

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing content-closeout assertions**

Add a focused regression block that covers:

- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-for-balance-transfers.astro`
- `src/pages/guides/apr-vs-apy-loans.astro`
- `src/pages/guides/debt-snowball-vs-avalanche.astro`
- `src/pages/guides/dti-housing-payment-piti-includes.astro`

Require each page to include:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`
- `Use this guide when`
- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

**Step 2: Write the failing policy-page assertions**

Add a regression block for:

- `src/pages/privacy-policy.astro`
- `src/pages/terms.astro`

Require:

- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`
- stronger maintained-document language such as operational wording around site use, data, ads, or calculator limitations

**Step 3: Write the failing header/brand assertions**

Add a regression block for `src/layouts/BaseLayout.astro` requiring:

- `Trust Center`
- `Start With Calculators`
- `US finance calculators and decision guides`
- no `Privacy` item inside the main primary-nav markup group

**Step 4: Run the targeted test file and verify failure**

Run: `npm test -- --runInBand tests/seo.test.ts`

Expected: FAIL with the new closeout/header assertions.

**Step 5: Commit the failing-test scaffold**

```bash
git add tests/seo.test.ts
git commit -m "Add closeout page and header regression coverage"
```

### Task 2: Upgrade the five remaining indexable guide pages to the current trust standard

**Files:**
- Modify: `src/pages/guides/how-to-find-your-apr.astro`
- Modify: `src/pages/guides/apr-for-balance-transfers.astro`
- Modify: `src/pages/guides/apr-vs-apy-loans.astro`
- Modify: `src/pages/guides/debt-snowball-vs-avalanche.astro`
- Modify: `src/pages/guides/dti-housing-payment-piti-includes.astro`

**Step 1: Normalize imports and BaseLayout trust props**

For each page:

- import `ReviewedByCard`
- import `TRUST_PROFILES`
- add `authorProfile={TRUST_PROFILES.siteOwner}`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}`

**Step 2: Add visible review coverage**

For each page, render a `ReviewedByCard` using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-06"`

**Step 3: Strengthen page-role framing**

Ensure each page includes a direct `Use this guide when...` role statement that matches the page's real intent:

- finding APR from disclosures
- evaluating balance-transfer APR tradeoffs
- separating APR from APY on loan math
- choosing snowball versus avalanche payoff method
- understanding whether PITI belongs in the housing-payment part of DTI

**Step 4: Add references and routing**

Add a concise `References` section to each page using primary or authoritative sources only, and strengthen internal links to the most relevant calculators, topic hubs, and next-step guides.

**Step 5: Refresh page dates**

Set:

- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

**Step 6: Run the targeted test file and verify progress**

Run: `npm test -- --runInBand tests/seo.test.ts`

Expected: remaining failures should be limited to the policy/header work if this guide batch is complete.

**Step 7: Commit the guide closeout batch**

```bash
git add src/pages/guides/how-to-find-your-apr.astro src/pages/guides/apr-for-balance-transfers.astro src/pages/guides/apr-vs-apy-loans.astro src/pages/guides/debt-snowball-vs-avalanche.astro src/pages/guides/dti-housing-payment-piti-includes.astro tests/seo.test.ts
git commit -m "Upgrade remaining indexable guide trust pages"
```

### Task 3: Upgrade the privacy and terms pages into stronger maintained public documents

**Files:**
- Modify: `src/pages/privacy-policy.astro`
- Modify: `src/pages/terms.astro`

**Step 1: Refresh dates and maintained-document framing**

Set:

- `const lastUpdated = "2026-04-06";`
- visible `Last updated: 2026-04-06`

Make each page read like a current maintained document instead of a thin placeholder.

**Step 2: Strengthen privacy-policy**

Clarify:

- analytics and measurement use
- consent handling
- advertising-related behavior
- cookies or local-storage controls
- how users can contact the site about privacy issues

Keep the writing practical and plainspoken.

**Step 3: Strengthen terms**

Clarify:

- educational-use-only positioning
- calculator limitations and assumption boundaries
- acceptable site use
- ownership and service-availability language

Keep it specific to this site rather than generic legal filler.

**Step 4: Run the targeted test file and verify progress**

Run: `npm test -- --runInBand tests/seo.test.ts`

Expected: remaining failures should now be header/brand-related only.

**Step 5: Commit the policy-page refresh**

```bash
git add src/pages/privacy-policy.astro src/pages/terms.astro tests/seo.test.ts
git commit -m "Refresh public policy pages for trust readiness"
```

### Task 4: Redesign the global header, nav grouping, and brand lockup

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

**Step 1: Refactor BaseLayout header markup**

Change the header to a full-width top-chrome structure that separates:

- brand lockup
- main navigation
- secondary trust/utility actions
- one restrained CTA

Move `Privacy` out of the main nav group.

Add:

- `Trust Center` link that routes to the public trust pages area
- `Start With Calculators` CTA
- brand sublabel `US finance calculators and decision guides`

**Step 2: Implement the new nav behavior in CSS**

Update `src/styles/global.css` so the header:

- spans the full viewport width
- keeps interior content aligned to the current max width
- looks more deliberate and premium than the current simple topbar
- uses stronger active states and better spacing
- remains robust on mobile

**Step 3: Keep accessibility intact**

Verify:

- primary navigation still uses proper `<nav aria-label="Primary">`
- focus styles remain visible
- CTA remains keyboard reachable
- mobile layout does not hide critical links

**Step 4: Run the targeted test file and verify it passes**

Run: `npm test -- --runInBand tests/seo.test.ts`

Expected: PASS for the new closeout and header regression blocks.

**Step 5: Commit the shared-header upgrade**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css tests/seo.test.ts
git commit -m "Redesign global header and trust navigation"
```

### Task 5: Replace the badge brand assets with a coherent SVG logo system

**Files:**
- Modify: `public/favicon.svg`
- Modify: `public/og.svg`

**Step 1: Redesign favicon.svg**

Replace the current simple circle mark with a stronger geometric finance-tools symbol that matches the approved direction:

- rounded container
- measured analytical shapes
- no cliché dollar sign
- visually legible at small size

**Step 2: Redesign og.svg**

Update the large social image so it uses the same mark, brand tone, and stronger headline hierarchy as the new header identity.

**Step 3: Confirm asset consistency**

Check that:

- the mark style matches the header lockup
- colors stay inside the current dark-site palette
- the assets remain lightweight and static

**Step 4: Commit the brand assets**

```bash
git add public/favicon.svg public/og.svg
git commit -m "Refresh brand mark across favicon and og assets"
```

### Task 6: Run full project verification and prepare the push

**Files:**
- Review only unless fixes are needed

**Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 2: Run Astro checks**

Run: `npm run check`

Expected: `0 errors`, `0 warnings`, `0 hints`

**Step 3: Run production build**

Run: `npm run build`

Expected: successful build with no regressions

**Step 4: Do local spot checks**

Check representative pages:

- `/`
- one calculator page
- one guide page
- one topic page
- `/about`
- `/privacy-policy`
- `/terms`

Verify:

- header is full-width and stable
- logo appears correctly
- CTA and nav links work
- no obvious layout breakage on desktop or mobile widths

**Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "Polish closeout release verification fixes"
```

Only create this commit if verification uncovered real issues that required edits.

### Task 7: Push and verify live

**Files:**
- No code changes unless live fixes are required

**Step 1: Push the branch to production**

Run: `git push origin HEAD:master`

Expected: successful push to `master`

**Step 2: Verify representative live pages**

Check:

- home page header and CTA
- one calculator page
- one guide page
- one topic page
- `/about`
- `/privacy-policy`
- `/terms`

Verify:

- new header structure is live
- brand mark is live
- favicon and OG assets resolve
- strengthened pages show updated dates and trust content

**Step 3: If live regressions appear, fix them before closing**

Use the smallest safe fix and re-run verification locally before any follow-up push.
