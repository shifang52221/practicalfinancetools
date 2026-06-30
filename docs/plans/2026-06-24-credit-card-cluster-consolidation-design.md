# Credit Card Cluster Consolidation Design

## Goal

Reduce low-value overlap inside the credit-card workflow cluster by keeping the existing URLs intact while making the page roles much clearer:

- `topics/credit-cards` stays the main cluster hub.
- `how-credit-card-interest-is-calculated` stays the strongest statement-math entry.
- `credit-card-payoff-strategy` becomes the main payoff decision hub.
- the surrounding APR / promo / payment-target / fixed-vs-minimum pages become narrow feeders instead of peer destinations.

The outcome we want is not fewer URLs. We want fewer pages competing for the same search job.

## Context

Search Console already shows that the site is being surfaced, but most queries still sit far from the top results. In the credit-card cluster, that usually means the pages are relevant enough to be seen, but the cluster boundary is too soft:

- too many pages answer almost the same question,
- some pages still read like second main pages instead of support pages,
- the hub and parent guides are not yet clearly dominant enough.

This is a soft-consolidation change:

- keep routes,
- keep trust scaffolding,
- keep the existing calculator framework,
- avoid a destructive redirect or deletion wave,
- reduce overlap through clearer page roles and tighter internal routing.

## Recommended Approach

### Option A: Soft consolidation with role tightening

This is the recommended path.

- Preserve the URLs.
- Tighten the strongest parent pages so they absorb the real decision jobs.
- Rewrite weaker pages so they explicitly hand off to the stronger parent or calculator.
- Use regression tests to keep the cluster from drifting back into overlap.

Trade-off: slower than a hard merge, but much safer for a live site that already has some search visibility.

### Option B: Soft consolidation plus selective `noindex`

This would go a step further by downgrading a few weakest leaves earlier.

Trade-off: safer against overlap, but more risk of over-correcting before we fully see which pages are still useful support pages.

### Option C: Aggressive merge and redirect

This would collapse many weaker pages into the parent pages immediately.

Trade-off: simplest long-term shape, but highest short-term risk. Not recommended yet because the site still needs stable search signals and a careful trust ramp.

## Decision

Proceed with Option A.

The first pass should:

- strengthen `topics/credit-cards`,
- strengthen `how-credit-card-interest-is-calculated`,
- strengthen `credit-card-payoff-strategy`,
- narrow the adjacent APR / promo / payment-target / payoff-order pages,
- keep the cluster readable as one workflow, not many competing standalone guides.

## Success Criteria

- The credit-card hub clearly points to the right next step for each user question.
- Parent guides own the main decision jobs.
- Support pages remain useful but do not read like peer landing pages.
- Search regression tests lock in the role separation.
- Existing URLs remain stable.
