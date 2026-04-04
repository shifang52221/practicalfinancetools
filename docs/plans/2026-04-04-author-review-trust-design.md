# Author And Review Trust System Design

## Goal

Strengthen AdSense-readiness and Google trust signals by replacing generic page-level review language with a more explicit responsibility system: clear site ownership, clearly scoped review roles, stronger page-level review summaries, and structured-data support on the highest-value pages.

## Context

The current site is stronger than it was earlier in the project:

- core workflow pages already include visible `ReviewedByCard` coverage
- the site now has complete trust pages like `About`, `Editorial Policy`, `Methodology`, `Privacy Policy`, and `Contact`
- page roles across calculators, guides, and topics are much clearer than before

However, the current trust layer still has a weak point:

- many pages still use the same generic reviewer identity: `Practical Finance Tools Editorial Team`
- the review system describes that pages are reviewed, but not *how responsibility is split*
- the site explains policies, but not yet with a strong, reusable public role model
- page schema still defaults to organization-level authorship without a clearer review chain on the pages we most want Google and AdSense to trust

For a personal-finance tool site, this creates a ceiling. The site can look maintained, but not yet fully accountable.

This batch should stay inside the approved operating rules:

- no fake expert bios
- no invented licenses or credentials
- no random framework restructuring
- no changes to the routing, redirect, sitemap, or consolidation strategy
- no broad rewrite of every page on the site

## Options

### Option 1: Keep the current generic team model and only deepen trust-page copy

Pros:

- very safe
- small editing surface
- no schema expansion required

Cons:

- limited improvement
- still too generic for finance trust-building
- does not create a reusable page-level authorship model

### Option 2: Add an honest role-based trust system anchored to the site brand

Pros:

- strongest safe option
- improves accountability without fabricating personal credentials
- creates a reusable pattern for core pages and future updates
- lets the site describe who owns product, methodology, and editorial review separately

Cons:

- requires component, layout, and page changes
- needs regression coverage to prevent drift

### Option 3: Add named human experts and expert-review claims across the site

Pros:

- potentially strongest trust impression
- closest to a classic editorial-author model

Cons:

- only appropriate if real, public, durable identities are available
- high integrity risk if details are thin or embellished
- easiest option to get wrong

## Recommendation

Choose **Option 2**.

The site should move from a generic `Editorial Team` label to an honest role-based system with explicit ownership and scoped review:

- `Practical Finance Tools Site Owner`
- `Practical Finance Tools Methodology Review`
- `Practical Finance Tools Editorial Review`

These are not fake people. They are public responsibility roles anchored to the site brand. The trust gain comes from clarity and consistency, not from invented prestige.

## Design

### Public responsibility model

Create a reusable trust-profile registry that defines a small set of public roles:

- site owner / product editor
- methodology review
- editorial standards review

Each role should include:

- display name
- public title
- short scope statement
- brief description of what that role is accountable for
- profile anchor path for trust-page linking
- schema type preference, defaulting to organization-backed entities rather than pretending these are named individuals

The language should stay plain and specific. Example responsibility boundaries:

- site owner = workflow ownership, product maintenance, correction triage
- methodology review = formula logic, assumptions, and regression fit
- editorial review = clarity, source use, and page-level educational framing

### Reviewed-by component upgrade

Upgrade the existing `ReviewedByCard` into a backward-compatible trust summary component.

The new component should support:

- optional `Written by`
- primary `Reviewed by`
- optional secondary review
- explicit review scope text
- correction contact
- links back to trust pages or responsibility anchors

Backward compatibility matters because many pages already use the current props. Existing pages should continue to render safely until they are migrated.

### Structured-data upgrade

Extend the layout layer so selected pages can attach stronger authorship and review metadata without affecting the whole site at once.

For the upgraded pages:

- `publisher` stays the site organization
- `author` can point to the site-owner role
- `reviewedBy` can point to methodology or editorial review roles
- calculator pages should expose the same trust chain in the `WebPage` and `WebApplication` data

This should be opt-in, not global. Pages that are not part of this batch can continue to use the current default organization-level schema until they are upgraded.

### Trust-page strengthening

Strengthen the four public trust pages:

- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/methodology.astro`
- `src/pages/contact.astro`

Add a shared responsibility section that makes the role split obvious and linkable.

Each page should reinforce a different trust angle:

- `About` = who runs the site and what the site is trying to do
- `Editorial Policy` = what editorial review means in practice
- `Methodology` = what methodology review checks before and after updates
- `Contact` = where corrections go and what happens after submission

### Core rollout boundary

Do not migrate every reviewed page in one batch.

Upgrade only the highest-leverage pages first:

- homepage
- trust pages
- topic hubs: APR, credit cards, mortgage payoff, refinance, debt-to-income, rent-vs-buy
- core calculators: APR, credit-card payoff, minimum payment payoff, mortgage payment, extra payment, biweekly mortgage, additional principal
- a small set of flagship guides if needed to validate the pattern

This keeps the editing surface manageable while ensuring that the pages most likely to matter for AdSense and Google quality evaluation carry the stronger trust model.

### Copy standards

The new trust copy must:

- stay honest about educational use and non-advice status
- avoid fake expertise language
- avoid hollow adjectives like `expert`, `professional`, or `certified` unless factually supportable
- explain review responsibility in concrete terms

The intended effect is:

- clearer accountability
- clearer maintenance signals
- clearer correction path
- less generic site quality posture

### Test strategy

Add regression coverage in `tests/seo.test.ts` for:

1. trust registry presence

- the trust-profile registry exists
- required public roles exist

2. component capability

- `ReviewedByCard` supports written-by and scoped-review language

3. trust-page coverage

- `About`, `Editorial Policy`, `Methodology`, and `Contact` include the responsibility model
- trust pages expose the expected role labels

4. core-page adoption

- selected homepage, topic, and calculator pages adopt the stronger trust props instead of the generic team-only model

5. layout/schema support

- `BaseLayout` and `CalculatorLayout` support author/reviewed-by inputs for upgraded pages

The purpose of the tests is not to prove that Google will approve the site. The purpose is to stop the trust system from drifting back to generic placeholders after this batch lands.

## Out Of Scope

This batch should not:

- invent personal identities or credentials
- rewrite the entire site into a person-authored publication
- change redirects, sitemap exclusions, or current consolidation targets
- redesign the UI beyond what is necessary for trust presentation
- add more ads or alter ad placement strategy
- push or submit anything before the post-change review
