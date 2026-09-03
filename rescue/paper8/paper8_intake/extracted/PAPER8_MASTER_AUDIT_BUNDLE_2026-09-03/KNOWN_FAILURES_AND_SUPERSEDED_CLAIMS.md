# Known failures, corrections, and superseded claims

## 1. Rejected v4 continuation lemma

The historical v4 package uses a common finite-to-infinite estimate of the form

`|C_infty-C_L| <= 4 K tau^B`.

Post-v4 red-team found that this is not implied by the documented generic hypotheses.  Differentiation of a decaying boundary mode can produce polynomial factors (`B tau^B`, `B^2 tau^B`).  A finite positive symmetric control model with invariant boundaries and vanishing first derivative still violates the proposed generic bound.

**Treatment:** retain v4 unchanged as provenance/computational evidence; do not use the common continuation lemma in a current proof.

## 2. Symmetry alone does not rescue the rejected lemma

`S3` symmetry and exact `G == 0` are valuable structural facts but are insufficient by themselves to remove every polynomial prefactor in a generic curvature boundary error.

## 3. 332 repaired architecture

The repaired 332 checkpoint avoids the failure mode by separating:

- unscored burn zones, where ordinary projective/Dobrushin contraction controls boundary likelihood ratios; and
- a fixed scored central window, whose omitted stationary correlations are bounded with an explicit polynomial shell count.

The tilt derivatives therefore do not act on an arbitrarily long burn propagation.

## 4. Directed-rounding audit still open

The one-block projective interval generator is internally stress-tested and has percent-level slack relative to the theorem constants, but it is not yet replayed with independently implemented directed rounding / interval / ball arithmetic.

## 5. No universal B-law claimed

The finite H2--H8 minimum-B split and H8 susceptibility ordering are discovery/structural observations.  They are not a universal theorem.  No H9 result exists.

## 6. Novelty remains open

Correctness and reproducibility should be audited before novelty.  No claim in this bundle establishes that the mathematical statements are new relative to thermodynamic formalism, Markov-hole, pattern-avoidance, or forbidden-pattern literature.
