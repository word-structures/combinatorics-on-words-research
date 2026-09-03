# CLEAN-ROOM PARTIAL-TARGET PARENT PROTOTYPE — P0–P4
**Date:** 2026-08-29  
**Status:** independent prototype; Paper 4 untouched  
**Source factor language:** exact `h6^6(a)` prefix, 729 source blocks

## Executive result

The Partial-Target Parent bridge survived the first clean-room parent-witness test,
but the run found an important scope correction.

For **macro-separated cuts** (`q >= 1`), the published Rao–Rosenfeld parent
equation, direct literal target Parikh difference, and the Paper-4-style
`constant + support-signature` decomposition agree exactly.

For `q=0`, cases where two cutpoints lie in the **same source-block occurrence**
are not ordinary Rao–Rosenfeld parent witnesses. A naive reuse of the
three-parent-letter equation fails on precisely those same-occurrence cases.
Therefore the bridge theorem must be stated for a genuine outer-parent witness
with distinct boundary occurrences. Paper 4's short-period domains remain a
separate direct-local layer.

## P0 — algebra/sign oracle

| L | comparisons | mismatches |
|---:|---:|---:|
| 5 | 1100 | 0 |
| 6 | 1560 | 0 |
| 8 | 2720 | 0 |

Total: **5380 vector comparisons, 0 mismatches.**

Sign convention verified:

`Parikh(right) - Parikh(left) = M_H d + Psi(s2 p3) - Psi(s1 p2)`.

For uniform blocks the boundary term expands to:

`rho(b1) - rho(b0) + P0 - 2 P1 + P2`.

That is the exact algebraic location of the Paper-4 support signature.

## P0 adversarial control — q=0

### L=5

- cases: `{"all_same_occurrence": 10, "same_01": 50, "same_12": 50, "three_distinct_occurrences": 40}`
- algebra mismatches: `{"same_01": 50, "same_12": 50}`

### L=6

- cases: `{"all_same_occurrence": 20, "same_01": 80, "same_12": 80, "three_distinct_occurrences": 60}`
- algebra mismatches: `{"same_01": 80, "same_12": 80}`

### L=8

- cases: `{"all_same_occurrence": 60, "same_01": 150, "same_12": 150, "three_distinct_occurrences": 120}`
- algebra mismatches: `{"same_01": 150, "same_12": 150}`

Every `same_01` and `same_12` case mismatched in this control.
This confirms that same-occurrence short-period geometry must not be described
as one ordinary RR parent step.

**Theorem repair:** state the bridge only for a genuine outer-parent witness;
every uniform `q >= 1` equal-half-period window satisfies this scope.

## P1/P2 — one unresolved target role

| L | profile words | witnesses | literal possible | parametric possible | missing | spurious | excluded |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 5 | 30 | 1650 | 250 | 250 | 0 | 0 | 84.85% |
| 6 | 90 | 2340 | 461 | 461 | 0 | 0 | 80.30% |
| 8 | 560 | 4080 | 838 | 838 | 0 | 0 | 79.46% |

Across all three preregistered lengths, the literal possible-witness set equals
the parametric reachable-set possible-witness set exactly.

### Candidate-evaluation counts

These are not runtime speedups; they show repeated literal enumeration that can
be replaced by signature precomputation plus membership queries.

| L | literal witness×word pairs | unique exact signatures | reachable precompute evaluations | membership queries |
|---:|---:|---:|---:|---:|
| 5 | 49500 | 35 | 1050 | 1650 |
| 6 | 210600 | 45 | 4050 | 2340 |
| 8 | 2284800 | 80 | 44800 | 4080 |

At L=8 the baseline contains **2,284,800** witness×literal-word candidate pairs, while the parametric oracle reuses **80** signatures and performs **4080** membership queries after precomputation.

This is evidence for **constraint reuse during synthesis**, not state-space compression.

## P3 — two unresolved roles

- L: 5
- roles: ['a', 'b']
- literal words each: {'a': 30, 'b': 30}
- Cartesian completions per witness: 900
- witnesses: 660
- literal possible witnesses: 130
- Minkowski-sum possible witnesses: 130
- missing: **0**
- spurious: **0**

The single-parent multi-role Minkowski-sum criterion survived the exact Cartesian-product oracle.

## P4 — shared-word control

- initial words: 30
- jointly active constraints: 4
- literal common-word survivors: 3
- parametric common-word survivors: 3
- symmetric difference: **0**

This checks the important rule that several parent constraints must share one
common unresolved target word. It is not a state-compression result.

## What remains

The full Rao–Rosenfeld finite ancestor/realizable-parent generator has not yet
been implemented here. Source witnesses were drawn from an actual h6 factor,
so they are realizable by construction, but the prototype has not yet compared
the complete finite RR parent superset against the partial-target filtered set.

That is the next decisive gate.

## Verdict

**A- — THE PARTIAL-TARGET PARENT BRIDGE SURVIVED P0–P4, WITH ONE NECESSARY SCOPE CORRECTION.**

The scope correction makes the bridge more credible: it identifies exactly
where Paper 4's short-period physical geometry is broader than one ordinary
template-parent desubstitution step.
