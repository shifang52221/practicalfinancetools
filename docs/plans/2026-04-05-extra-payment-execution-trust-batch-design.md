# Extra Payment Execution Trust Batch Design

## Goal

Upgrade the next three legacy extra-payment support guides in the execution layer to the stronger shared trust model while preserving their current routes and their role inside the mortgage-payoff workflow.

The target pages in this batch are:

- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-servicer-posting-rules.astro`

## Context

The extra-payment topic now has stronger pages for:

- overall mortgage prepayment framing
- liquidity and reserve risk
- debt-priority tradeoffs
- after-tax comparison
- principal-only posting concepts
- annual extra-payment timing

The next obvious trust gap is the execution layer: once a reader decides extra payments might make sense, the site still needs stronger support for:

- timing a lump sum versus recurring extras
- backing into a realistic payoff target
- making sure the servicer actually posts the payment the way the user expects

That makes this batch important for both SEO quality and user trust. It converts thin support pages into a coherent "how to execute the plan correctly" mini-system.

## Options

### Option 1: Upgrade the three execution pages as one cohesive batch

Pros:

- strongest topical continuity
- completes the practical "how to execute" layer after the risk-decision layer
- improves manual-review credibility because the site explains operational pitfalls, not just savings headlines

Cons:

- still limited to three pages

### Option 2: Spread effort into unrelated remaining pages

Pros:

- touches more directories at once

Cons:

- weaker topical system feel
- harder to show a complete mortgage-payoff workflow cluster

### Option 3: Leave these pages as light support notes

Pros:

- no rewrite effort

Cons:

- leaves obvious low-depth pages in a high-sensitivity finance topic
- weakens the site's ability to show accurate execution guidance

## Recommendation

Choose **Option 1**.

This is the safest and strongest next step because it turns the extra-payment cluster from "good theory plus scattered support pages" into a more complete decision-and-execution system. It also directly addresses low-value risk by showing details that real users need: timing, affordability realism, and servicer posting correctness.

## Design

### Scope

#### Pages to upgrade

- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-servicer-posting-rules.astro`

#### Regression coverage to extend

- `tests/seo.test.ts`

### Shared trust-model rules

Each page should:

- import `ReviewedByCard`
- import `TRUST_PROFILES` from `src/config/trust`
- add `authorProfile={TRUST_PROFILES.siteOwner}` to `BaseLayout`
- add `reviewProfiles={[TRUST_PROFILES.methodologyReview, TRUST_PROFILES.editorialReview]}` to `BaseLayout`
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

#### `extra-payment-lump-sum-vs-monthly`

Role phrase:

- `Use this guide when timing is the main reason a lump sum and recurring extra could produce different payoff results`

The `reviewScope` should explicitly cover:

- timing differences between early lump sums and recurring extras
- use of the correct calculator path for each scenario
- routing between annual-extra, principal-only, and broader extra-payment workflows

#### `extra-payment-target-payoff-date`

Role phrase:

- `Use this guide when you have a target mortgage-free date and need to back into a realistic extra-payment plan`

The `reviewScope` should explicitly cover:

- target-date payoff framing
- affordability and reserve checks before committing to a target
- routing between amortization, extra-payment, and broader payoff workflows

#### `extra-payment-servicer-posting-rules`

Role phrase:

- `Use this guide when servicer posting rules could prevent your extra payment from reducing principal the way you expect`

The `reviewScope` should explicitly cover:

- principal-only instructions
- paid-ahead risk and statement verification
- routing between principal-only, complaint, and extra-payment modeling workflows

### References strategy

Use primary official sources only.

#### `extra-payment-lump-sum-vs-monthly`

Use CFPB sources that directly support:

- general mortgage payment and payoff guidance
- prepayment-penalty checks before larger extras

Suggested sources:

- `https://www.consumerfinance.gov/consumer-tools/mortgages/`
- `https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/`

#### `extra-payment-target-payoff-date`

Use CFPB sources that directly support:

- monthly mortgage-payment management
- prepayment-penalty checks before aggressive payoff plans

Suggested sources:

- `https://www.consumerfinance.gov/ask-cfpb/how-do-i-manage-my-monthly-mortgage-payment-en-1825/`
- `https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/`

#### `extra-payment-servicer-posting-rules`

Use CFPB sources that directly support:

- mortgage servicing rules
- managing monthly mortgage payments and statement review

Suggested sources:

- `https://www.consumerfinance.gov/about-us/blog/your-mortgage-servicer-must-comply-with-federal-rules/`
- `https://www.consumerfinance.gov/ask-cfpb/how-do-i-manage-my-monthly-mortgage-payment-en-1825/`

### Routing cleanup

These pages should avoid older weak support-page routing when stronger current workflows already exist.

Prefer routing toward:

- `extra-mortgage-payments`
- `principal-only-extra-payments`
- `one-extra-mortgage-payment-per-year`
- `pay-off-mortgage-early-or-invest`
- `extra-payment-liquidity-reserve`
- `extra-payment-calculator`
- `additional-principal-payment-calculator`
- `amortization-schedule-calculator`
- `mortgage-payment-calculator`

### Copy boundary

This batch should not:

- change routes or canonical paths
- redesign layouts
- alter calculator logic
- widen into unrelated topic clusters

Allowed additions:

- add one role section near the top of each page
- add one `ReviewedByCard`
- add one small official references section
- tighten CTA and related-guide routing
- rewrite body copy enough to make each page read like a stronger execution guide

### Test strategy

Add one regression block in `tests/seo.test.ts` for these three pages.

Require:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also lock in role phrases:

- `extra-payment-lump-sum-vs-monthly.astro` includes `Use this guide when timing is the main reason a lump sum and recurring extra could produce different payoff results`
- `extra-payment-target-payoff-date.astro` includes `Use this guide when you have a target mortgage-free date and need to back into a realistic extra-payment plan`
- `extra-payment-servicer-posting-rules.astro` includes `Use this guide when servicer posting rules could prevent your extra payment from reducing principal the way you expect`

And require each page's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

## Out Of Scope

This batch should not:

- push or deploy anything
- clean unrelated local changes
- merge or delete support pages
- alter redirects or sitemap rules
