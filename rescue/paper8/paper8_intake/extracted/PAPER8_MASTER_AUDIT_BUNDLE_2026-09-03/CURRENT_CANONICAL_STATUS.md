# Paper 8 — current canonical status for audit

## Main objects

H8 canonical profiles:

`(3,3,2), (4,2,2), (4,3,1), (5,2,1)`.

The project studies the susceptibility curvature `C_v(x)` along the soft restoration parameter `x in [0,1]` and the induced asymptotic-variance response.

## Current status table

| Claim | Current status | Audit note |
|---|---|---|
| H8 profile family and hard-response numerical signs `+,-,-,-` | COMPUTATIONALLY AUDITED | Two independent numerical methods in the discovery checkpoint. |
| Exact finite-context polynomials for H8 profiles | PASS | GMP/integer arithmetic plus modular/independent checks in later checkpoints. |
| `G == 0` first-derivative symmetry control in the exact polynomial models | PASS in preserved calculations | Exact coefficient identity. |
| Finite-context monotonicity of the selected H8 curvature polynomials | PASS | Exact global Bernstein/integer checks. |
| Bidirectional block-mixing covers | INTERNAL CERTIFICATE PASS | Independent directed-rounding/ball-arithmetic audit remains open. |
| v4 generic `4 K tau^B` curvature continuation lemma | **REJECTED / NOT USED** | Red-team counterexample shows stated generic hypotheses are insufficient. |
| v4 H8 4/4 infinite-volume sign theorem | CONDITIONAL / SUPERSEDED AS A PROOF | Numerical conclusion remains plausible; common proof bridge is invalid. |
| v4 infinite-volume susceptibility ordering | CONDITIONAL / SUPERSEDED AS A PROOF | Same common-tail issue. |
| repaired `(3,3,2)` continuum sign `C_332(x)<0` | **INTERNAL COMPUTER-ASSISTED THEOREM PASS** | Uses repaired burn + polynomial-kernel-tail architecture; directed-rounding audit pending. |
| repaired `(4,2,2)` | OPEN | Repair architecture not yet propagated. |
| repaired `(4,3,1)` | OPEN | Repair architecture not yet propagated. |
| repaired `(5,2,1)` | OPEN | Repair architecture not yet propagated. |
| repaired H8 4/4 ordering | OPEN | Do not infer from v4 as theorem. |
| H9 | NOT RUN | Preserve holdout until deliberate protocol. |
| Novelty / prior-art | NOT ESTABLISHED | Separate literature audit required. |

## Repaired 332 certified statement

The repaired checkpoint certifies internally

`-C_burn(x) > 1/2` for every `x in [0,1]`,

and bounds the difference to the stationary susceptibility by the sum of:

- a five-block boundary burn comparison; and
- a stationary kernel tail with the polynomial shell factor explicit.

The stored exact rational conclusion is

`C_332(x) < -563534714369 / 4860000000000 < 0`.

The old pure `tau^B` continuation lemma is not used.

## Remaining common risk

The repaired 332 proof still uses an internally generated one-block projective interval certificate.  Its theorem bounds have substantial slack, but the interval generator uses IEEE arithmetic with explicit outward padding, not an independently implemented directed-rounding or ball-arithmetic package.  This is the most important remaining external rigor gate for 332.
