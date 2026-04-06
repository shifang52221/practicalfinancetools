# Transparency Pages Trust Upgrade Design

## Goal

Upgrade the public trust pages so they read less like generic policy placeholders and more like a maintained finance publisher's operating system.

This batch stays intentionally conservative:

- no new indexable URLs
- no route changes
- no redirect changes
- no sitemap changes
- no `noindex` changes
- no calculator logic changes
- no schema-type invention or fake credentials

The work is limited to strengthening the existing trust pages and adding regression coverage that protects the improved public-accountability model.

## Context

The site now has stronger topic hubs, calculator pages, and support-guide routing than before. The next gap is not basic SEO hygiene but public trust depth.

Current strengths:

- `/about`, `/editorial-policy`, `/methodology`, and `/contact` already exist
- updated pages already show `Written by`, `Reviewed by`, `Secondary review`, and `Last updated`
- the site already exposes a responsibility model through `TrustRoles`
- the latest local SEO audit produced no canonical, robots, sitemap, thin-content, or orphan-page issues

Current weakness:

- the trust pages still feel somewhat generic and repetitive
- they do not yet present a strong "how this site is run" narrative
- they do not create a tight, reusable trust-center loop between ownership, editorial review, methodology, and correction intake
- they are good enough for baseline trust, but not yet strong enough for the site's next quality stage

## In-Scope Files

- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/methodology.astro`
- `src/pages/contact.astro`
- `src/components/ReviewedByCard.astro`
- `src/components/TrustRoles.astro`
- `tests/seo.test.ts`

If needed for consistency:

- `src/components/TrustPolicyLinks.astro` (new)

## Options

### Option 1: Copy-only refresh inside each page

Pros:

- lowest implementation risk
- no new components
- easiest to ship quickly

Cons:

- keeps trust navigation inconsistent
- encourages repeated blocks and wording drift
- does not create a stronger shared trust-center structure

### Option 2: Page refresh plus one small shared trust-navigation component

Pros:

- still low risk
- keeps existing URLs and architecture
- creates clearer connections between ownership, policy, methodology, and contact
- reduces repetitive page-level CTA markup
- makes the trust layer feel intentionally designed instead of loosely assembled

Cons:

- slightly broader than copy-only work
- requires a focused regression so the structure does not drift later

### Option 3: Add a new dedicated trust-center page

Pros:

- could centralize the full accountability story in one place
- would create a single page for AdSense-review handoffs

Cons:

- adds another URL to maintain
- risks spreading trust content away from the pages users already reach
- broader scope than needed for the current phase

## Recommendation

Choose **Option 2**.

It is the safest strong move:

- it preserves the existing page architecture
- it strengthens the public trust layer without reopening the indexing strategy
- it improves consistency across all four trust pages
- it avoids introducing a new low-utility URL

## Design

### Core principle

These pages should explain four things clearly:

1. who owns the site and updates it
2. how editorial and methodology review are separated
3. how corrections, policy changes, and calculator changes flow through the site
4. where a user should go next when they need policy detail, methodology detail, or help

### Shared trust-center navigation

Add one small shared component that links the four public trust pages together:

- `About`
- `Editorial policy`
- `Methodology`
- `Contact`

Each card/link should explain the page's role in one sentence, for example:

- ownership and maintenance
- publishing and review standards
- formulas and assumptions
- corrections and support intake

This component should appear on each trust page so the section reads like a coherent public trust center rather than disconnected policy pages.

### About page changes

Shift `/about` from a broad site summary to a clearer publisher-introduction page.

Strengthen:

- who the site serves
- what the site publishes
- how the team decides what gets built or updated
- what maintenance and correction handling look like
- how advertising fits without changing outputs

Avoid:

- invented credentials
- vague "expert" language
- filler sections that do not add accountability

### Editorial policy changes

Make `/editorial-policy` the clearest explanation of publishing standards.

Strengthen:

- publishing criteria for new pages
- source hierarchy and how references are used
- how automation may assist but not replace review
- correction response expectations
- ad and independence language
- how material changes affect page updates

This page should read like a real operational policy, not just a general content promise.

### Methodology changes

Make `/methodology` the public explanation of model boundaries and validation approach.

Strengthen:

- which formulas or assumptions are standardized
- where model boundaries exist
- how validation is performed
- when supporting pages and methodology must be updated together
- what users should verify against statements or disclosures

The page should stay plain-language and not become a technical appendix.

### Contact changes

Make `/contact` a clearer intake page for correction requests, bug reports, and methodology questions.

Strengthen:

- what type of reports belong here
- what information speeds up a correction review
- how reports are prioritized
- what the site cannot do
- privacy expectations for emailed information

This page should reinforce that the site is maintained and reachable, without sounding like a support desk for personalized advice.

### Reviewed-by component adjustment

Keep the existing trust card structure, but tighten the supporting copy so it better reinforces:

- where policy and methodology live
- how to report corrections
- why the responsibility chain matters

Do not add extra decorative copy or duplicate responsibilities already shown in `TrustRoles`.

### Regression strategy

Add one focused regression in `tests/seo.test.ts` that ensures the trust pages keep the stronger public-accountability model.

Require the trust-page set to keep:

- `TrustRoles`
- `ReviewedByCard` on `about`, `editorial-policy`, and `methodology`
- links to the trust-center pages
- visible accountability phrases such as correction handling, methodology/policy cross-links, or response expectations

The test should guard the shared structure, not freeze every sentence.

## Out of Scope

- revealing private personal identity that the user has not approved for publication
- changing structured data from organization-style role entities to named individuals
- adding a new trust-center route
- changing calculator logic
- changing topic/guides routing
- changing indexability or sitemap inclusion
- pushing or deploying during the design phase
