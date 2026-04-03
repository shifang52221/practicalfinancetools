# Site Quality Overhaul Design

## Goal

Raise the perceived quality, usability, and search performance of Practical Finance Tools by turning the site from a broad catalog of lightly differentiated finance pages into a smaller set of stronger decision pages and better-supported core calculators.

This pass is intentionally designed to solve three connected problems at the same time:

- user experience friction
- low-quality or low-value site signals
- weak SEO performance despite growing impressions

## Current Diagnosis

### Search Console Signals

The latest 28-day export covers `2026-03-04` through `2026-03-31`.

- clicks: `1`
- impressions: `6723`
- weighted average position: `73.84`

The site is no longer invisible. Google is discovering and testing the site, but most valuable queries still rank in the `40-90` range.

The strongest impression clusters are:

- minimum payment / credit card minimum payment
- APR calculator / APR calculation
- biweekly mortgage calculator
- extra principal payment calculator

This means the main bottleneck is no longer crawlability. It is site-level trust, page differentiation, and intent satisfaction.

### Structural Signals

- the repo currently contains `169` Astro pages
- `140` of them are guide pages
- only a small minority of pages carry strong visible trust blocks such as `ReviewedByCard`
- many guides are short, highly specific, and structurally similar
- several topic pages already act like consolidation hubs, but the corresponding thin guide pages still remain indexable

### UX Signals

The site has good raw building blocks:

- calculators with working tools
- topic hubs
- methodology and editorial-policy pages
- FAQ and schema coverage

However, the experience still feels catalog-first instead of decision-first:

- the home page spreads attention across too many entry points
- `/guides` is still primarily a large list page
- `/topics` is closer to the right direction but is not yet the dominant workflow layer
- calculator pages use a shared template that is functional but still somewhat generic

For finance content, that combination can make the site feel assembled rather than authored.

## Core Principle

Do not try to win by adding more URLs.

Win by making fewer pages feel more complete, more trustworthy, and more obviously useful.

The site should behave like this:

- calculators are the product pages
- topic pages are the workflow pages
- selected guide pages are the deep-answer pages
- thin variants either feed stronger pages or eventually stop competing for indexation

## Recommended Direction

Use a "strengthen first, then consolidate" rollout.

This is the safest and strongest path because it improves quality signals before any aggressive de-indexing or redirect cleanup.

### Why This Is Better Than A Hard Cleanup First

- it avoids sudden large-scale index turbulence
- it preserves URLs that may still be collecting weak-but-useful query testing
- it lets stronger hub pages absorb intent naturally before weaker pages are restricted
- it reduces the risk of breaking the site's current internal-link framework

## Architecture

### Layer 1: Core Calculators

Core calculators should be treated as the site's main commercial and search assets.

Priority calculators:

- `/calculators/minimum-payment-payoff-calculator`
- `/calculators/apr-calculator`
- `/calculators/biweekly-mortgage-payment-calculator`
- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/calculators/debt-snowball-calculator`

Each core calculator should clearly show:

- what problem it solves
- what inputs the user needs
- what assumptions the model uses
- when the calculator is reliable
- what common mistakes or boundary cases to check
- who reviewed the page
- which deeper guides support the decision

### Layer 2: Topic Hubs

Topic pages should become the dominant organizing layer.

Priority topic hubs:

- `/topics/credit-cards`
- `/topics/apr`
- `/topics/mortgage-payoff`
- `/topics/refinance`

Each topic page should:

- define the main user job to be done
- route users to the right calculator first
- consolidate overlapping guide intent
- surface only the strongest supporting deep dives
- visibly explain how to compare scenarios safely

The topic hub should become the cluster homepage, not a secondary page.

### Layer 3: Deep Guides

Not every guide needs to be a standalone search target.

The strongest guide pages should remain indexable and become deeper, more reference-worthy answers. These are pages like:

- `/guides/extra-mortgage-payments`
- `/guides/credit-card-payoff-strategy`
- `/guides/why-minimum-payments-take-so-long`
- `/guides/apr-vs-interest-rate`
- `/guides/refinance-break-even`

These pages should be reinforced with:

- reviewed-by trust block
- source-backed references
- clearer "when to use this page" framing
- better handoffs to calculators and topic hubs

### Layer 4: Thin Support Pages

Thin and highly overlapping guides should stop behaving like independent stars.

There are three supported outcomes for these pages:

- strengthen and keep indexable if they serve distinct intent
- merge their best insights into a stronger hub page and later add `noindex, follow`
- keep temporarily but demote internally until the cluster cleanup is complete

This pass should prefer merge-and-demote over immediate redirecting.

## Cluster Strategy

### Cluster A: Minimum Payment

This is the largest opportunity cluster by impressions.

Primary targets:

- `/calculators/minimum-payment-payoff-calculator`
- `/topics/credit-cards`
- `/guides/credit-card-payoff-strategy`
- `/guides/why-minimum-payments-take-so-long`

Goals:

- make the minimum-payment calculator the obvious answer for minimum-payment queries
- make the credit-cards topic page the cluster hub
- route related credit-card variants into fewer stronger support pages

### Cluster B: APR

APR has broad query diversity but still weak authority signals.

Primary targets:

- `/calculators/apr-calculator`
- `/topics/apr`
- `/guides/apr-vs-interest-rate`
- `/guides/apr-by-loan-type`

Goals:

- make the APR calculator page more authoritative and less generic
- tighten the supporting guide set around a few stronger comparison pages
- reduce the need for many lightly differentiated APR variants to stand alone

### Cluster C: Mortgage Payoff / Biweekly / Extra Principal

This is the nearest-term ranking opportunity because biweekly queries already sit closer to page 4 to page 5 positions.

Primary targets:

- `/calculators/biweekly-mortgage-payment-calculator`
- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/topics/mortgage-payoff`
- `/guides/extra-mortgage-payments`

Goals:

- make the biweekly calculator easier to trust and easier to choose
- keep broad extra-payment and principal-only intent clearly separated
- make the topic hub the cluster center rather than the guide index

### Cluster D: Refinance Consolidation

Refinance is the clearest area where topic-level consolidation is ahead of page-level cleanup.

Primary targets:

- `/topics/refinance`
- `/guides/refinance-break-even`
- `/guides/refinance-closing-costs`
- `/guides/refinance-checklist`

Support pages to demote or absorb later include:

- `/guides/refinance-offer-comparison-checklist`
- `/guides/refinance-points-break-even`
- `/guides/refinance-rate-lock`
- `/guides/refinance-rate-vs-term-tradeoff`
- `/guides/refinance-reset-amortization`
- `/guides/refinance-rolling-costs-into-loan`
- `/guides/refinance-when-not-to-refinance`
- `/guides/refinance-cash-in-lower-rate`
- `/guides/refinance-cash-out-vs-rate-term`
- `/guides/refinance-no-closing-costs-myth`

The goal is not to delete refinance content. The goal is to stop asking Google to rank so many near-neighbor refinance pages independently.

## UX Changes

### Home Page

The home page should stop acting like a broad catalog and start acting like a guided entry page.

It should:

- highlight the three highest-value workflows
- show stronger trust and methodology cues
- reduce duplicated links
- make calculators, topics, and supporting guides feel intentionally ordered

### Guides Index

The guides index should become a guided directory, not a search-engine dump.

It should:

- lead with key clusters and their best pages
- clearly separate "start here" pages from long-tail support content
- reduce the feeling that all guides are equally important
- avoid linking thin pages as peers to stronger pages when they are not peers

### Base Layout

The current layout is solid but visually generic.

This pass should improve trust without breaking the framework by:

- making page headers and trust areas clearer
- increasing visible editorial and methodology cues
- reducing template sameness where possible
- keeping layout and typography consistent enough to avoid churn

## Trust And Quality Signals

Finance is a YMYL-adjacent subject, so visible trust matters.

This pass should expand trust signals across core pages by:

- using `ReviewedByCard` on all priority calculators, topics, and deep guides
- tightening references on priority pages
- ensuring `lastUpdated` is current on pages we actively strengthen
- making methodology links more visible in the key decision flow

This does not require fake personas or inflated claims. It requires clearer editorial accountability.

## SEO Changes

### Keep

- current URL structure
- current framework and page architecture
- existing calculator logic
- canonical self-reference behavior

### Improve

- internal-link hierarchy
- title and description precision on priority pages
- stronger cluster center pages
- less diluted guide indexing pressure
- higher consistency between topic pages and guide cleanup

### Delay

Do not do aggressive redirects in this pass except where already established and safe.

For weaker overlapping pages, prefer:

- content absorption
- internal-link demotion
- selective `noindex, follow` after stronger parent pages are updated

## Verification Strategy

Verification should include both code-level and content-structure checks.

Add or expand tests for:

- core self-canonical behavior
- redirected guide-link hygiene
- cluster-specific internal-link expectations where we intentionally consolidate
- presence of trust blocks on selected priority pages if practical and durable

Run:

- `npm run check`
- `npm test`
- `npm run build`

## Rollout Order

1. Strengthen shared trust and navigation scaffolding.
2. Rework home, guides, and topics to reflect the new hierarchy.
3. Upgrade the minimum-payment, APR, and mortgage-payoff core clusters.
4. Start refinance consolidation and selective demotion of thin refinance pages.
5. Verify, review diff boundaries, and push as one batch.

## Success Signals

Watch Search Console for `14-28` days after release.

Primary signals:

- more impressions concentrated on core calculators and topic hubs
- rising positions in the biweekly cluster first
- improved position and click testing in minimum-payment queries
- fewer weak guide pages appearing as top tested landing pages

Secondary signals:

- better distribution of internal-link authority toward core pages
- fewer thin pages competing with consolidated cluster pages
