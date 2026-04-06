# Rent vs Buy Upfront Cash Trust Batch Design

## Goal

Upgrade the last two legacy rent-vs-buy support guides in the upfront-cash layer to the stronger shared trust model while preserving their current routes, `noindex` posture, and supporting role inside the rent-vs-buy decision system.

The target pages in this batch are:

- `src/pages/guides/rent-vs-buy-down-payment.astro`
- `src/pages/guides/rent-vs-buy-closing-costs.astro`

## Context

The rent-vs-buy cluster now has stronger destination pages and stronger supporting guides across:

- break-even
- checklist
- costs to include
- time horizon
- appreciation
- rent growth
- investment return
- mortgage-rate sensitivity
- maintenance
- HOA
- PMI
- price-to-rent ratio

The remaining obviously older support pages in this topic cluster are now concentrated in the upfront-cash layer:

- `rent-vs-buy-down-payment`
- `rent-vs-buy-closing-costs`

That makes this the cleanest possible finishing batch for the topic. Once these two pages are upgraded, the cluster will cover:

- upfront cash
- ongoing ownership costs
- timing
- financing sensitivity
- opportunity cost

in one consistent trust and UX pattern.

## Options

### Option 1: Finish the upfront-cash pair now

Pros:

- strongest topical continuity
- completes the remaining obvious legacy pages inside the same topic cluster
- improves the system feel of the rent-vs-buy topic before moving to broader review

Cons:

- keeps the work narrowly focused on only two pages

### Option 2: Pause page upgrades and switch to full-site review

Pros:

- good for risk control before deploy
- useful for link, layout, and consistency checks

Cons:

- leaves two visibly older rent-vs-buy pages in place
- weakens the coherence of the current topic-level cleanup

### Option 3: Jump to another topic cluster

Pros:

- expands improvements across the site

Cons:

- breaks the current rent-vs-buy cleanup arc
- increases the chance of topic fragmentation

## Recommendation

Choose **Option 1**.

This is the safest and strongest next move because it closes the last obvious trust-model gap in a topic cluster we have already heavily strengthened. It also improves both SEO consistency and manual-review quality signals by making the topic look like a complete decision-support system instead of a mixture of old and new support pages.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/rent-vs-buy-down-payment.astro`
- `src/pages/guides/rent-vs-buy-closing-costs.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `ReviewedByCard`
- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
- keep `robots="noindex, follow"` unchanged
- add a visible `ReviewedByCard`
- use:
  - `writtenBy`
  - `reviewedBy`
  - `secondaryReview`
  - `reviewScope`
- set `reviewedOn="2026-04-05"`
- set `const lastUpdated = "2026-04-05";`
- align the visible `Last updated:` line to `2026-04-05`
- add a strong top role section starting with `Use this guide when...`
- add a small official references section

### Page-level role framing and review scopes

#### `rent-vs-buy-down-payment`

Role phrase:

- `Use this guide when the down payment decision is changing both your monthly payment and your opportunity-cost assumptions`

The `reviewScope` should explicitly cover:

- down-payment tradeoffs inside the rent-versus-buy model
- PMI and liquidity framing
- routing between costs-to-include, investment-return, PMI, and break-even workflows

#### `rent-vs-buy-closing-costs`

Role phrase:

- `Use this guide when upfront and exit costs are the reason a short-horizon buy case stops making sense`

The `reviewScope` should explicitly cover:

- buyer and seller closing-cost treatment
- short-horizon sensitivity
- routing between costs-to-include, time-horizon, checklist, and break-even workflows

### References strategy

Use primary official sources only.

#### `rent-vs-buy-down-payment`

Use CFPB pages that directly cover:

- determining a down payment
- how down payment affects mortgage insurance
- how down payment and closing costs fit into home-buying prep

Suggested sources:

- `https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/`
- `https://www.consumerfinance.gov/consumer-tools/mortgages/ready-to-buy-a-home/`

#### `rent-vs-buy-closing-costs`

Use CFPB pages that directly cover:

- Loan Estimate vs Closing Disclosure
- review of closing documents and closing-cost comparisons

Suggested sources:

- `https://www.consumerfinance.gov/ask-cfpb/will-i-receive-the-new-know-before-you-owe-disclosures-when-i-shop-for-a-mortgage-en-2009/`
- `https://www.consumerfinance.gov/owning-a-home/close/review-documents-before-closing/`

### Routing cleanup

These pages should avoid leaning on weaker or older support-page routing when stronger active destination pages already exist.

Prefer routing toward:

- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-break-even`
- `rent-vs-buy-checklist`
- `rent-vs-buy-investment-return`
- `rent-vs-buy-pmi-assumptions`
- `rent-vs-buy-time-horizon`
- `rent-vs-buy-calculator`

### Copy boundary

This batch should not:

- change routes or canonical paths
- change `robots`
- redesign layouts
- rewrite full article bodies
- alter calculator logic

Allowed additions:

- add one role section near the top of each page
- add one `ReviewedByCard`
- add a small official references section
- tighten CTA and related-guide routing

### Test strategy

Add one regression block in `tests/seo.test.ts` for these two pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also lock in:

- `rent-vs-buy-down-payment.astro` includes `Use this guide when the down payment decision is changing both your monthly payment and your opportunity-cost assumptions`
- `rent-vs-buy-closing-costs.astro` includes `Use this guide when upfront and exit costs are the reason a short-horizon buy case stops making sense`
- each page's `lastUpdated` and visible `Last updated:` line equals `2026-04-05`

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- widen into new topic clusters
- alter redirect or sitemap rules
