# Rent vs Buy Calculator Entry Boundaries Design

**Date:** 2026-06-23

**Goal**

Keep the rent-vs-buy calculator as the full scenario-comparison entry point for users who are ready to model both sides with a realistic holding period and cost assumptions, while making it clearer when a narrower rent-vs-buy support page should be the first stop.

**Problem**

The calculator currently behaves like a broad comparison page, but it does not clearly tell users when they should branch away first. Three boundary risks stand out:

1. Users who only need break-even timing or hold-period guidance
2. Users who are still assembling the ownership-cost assumptions before a full comparison
3. Users who need a decision checklist rather than a scenario model

Without those boundaries, the calculator can look like a generic catch-all page instead of a scenario-entry page with a defined job.

**Recommended Approach**

Use a narrow copy-only refinement on the calculator page plus one regression test.

- Add a sentence near the top that defines the page as the full scenario-comparison entry point.
- Add a `When not to start here` section that identifies break-even-only, cost-setup, and checklist-first users.
- Add a `What this calculator should send you to next` section that routes users to break-even, costs-to-include, checklist, and mortgage-payment follow-ups.
- Protect the wording with a focused SEO test.

This keeps all model logic and page architecture untouched.

**Alternatives Considered**

1. Add more modeling depth or examples

This could improve content richness, but it would not solve the role ambiguity as directly as clearer entry boundaries.

2. Split the calculator into more specialized variants

This would create more fragmentation and likely weaken the site’s current routing model.

3. Focus on the topic page instead

The topic page is already stronger as a router. The calculator has the bigger role-clarity gap right now.

**Chosen Design**

The safest design is a wording refinement that makes the calculator’s job explicit:

- full scenario comparison
- not the first stop for narrow sub-questions
- clear next-step routing after the first scenario run

**Files Expected**

- Modify: `src/pages/calculators/rent-vs-buy-calculator.astro`
- Modify: `tests/seo.test.ts`

**Validation**

- Add a regression test that fails before the copy is added.
- Run `npm test -- tests/seo.test.ts`
- Run `npm run check`
- Run `npm run build`

**Non-Goals**

- No formula changes
- No component refactors
- No route changes
- No redirect or sitemap updates
