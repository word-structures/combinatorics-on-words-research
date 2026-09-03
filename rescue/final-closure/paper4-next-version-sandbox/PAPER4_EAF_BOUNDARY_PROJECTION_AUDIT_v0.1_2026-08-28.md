# PAPER 4 — Independent EAF boundary projection audit

**Version:** v0.1  
**Date:** 2026-08-28  
**Status:** INDEPENDENT MATHEMATICAL / COMPUTATIONAL AUDIT — NOT CANONICAL PAPER-4 EVIDENCE  
**Scope:** boundary algebra and an exact finite-state relaxation for the `EAF` long-band obstruction  
**No Claude search artifacts were required or used. No Git or canonical manuscript mutation was performed.**

## 1. Main result

For `eafea = E A F E A`, take a half-period

`K = 40 + r`, with `1 <= r <= 19`,

starting at offset `t` inside the first `E`, in the no-carry regime

`0 <= t` and `t + 2r < 40`.

Let `p_X(j)` be the Parikh vector of the prefix `X[0:j]`.

Direct expansion of

`P(s+2K) - 2 P(s+K) + P(s) = 0`

gives exactly

`p_E(t) - 2 p_A(t+r) + p_F(t+2r) = m(E) - m(A)`.

For the Paper-4 profiles,

`m(E) - m(A) = (-2, 2, 0)`.

Put `j = t + 2r`. Then the square exists iff

`p_F(j) = T_{j,r}(E,A)`

with

`T_{j,r}(E,A) = m(E)-m(A) - p_E(j-2r) + 2 p_A(j-r)`,

for

`2 <= j <= 39`, `1 <= r <= floor(j/2)`.

There are exactly **380** such equations.

Therefore, for fixed `(E,A)`, the complete no-carry `EAF` obstruction family for `K=41..59` becomes a finite collection of forbidden prefix-Parikh states for `F`.

## 2. General carry-aware boundary decomposition

For a cover role word `v`, write

`s = 40q+t`, `s+K = 40q1+u1`, `s+2K = 40q2+u2`.

Then the direct second difference is exactly

`D = p_{v_q}(t) - 2 p_{v_q1}(u1) + p_{v_q2}(u2) + M(q,q1,q2)`

where

`M = sum_{i=q}^{q2-1} m(v_i) - 2 sum_{i=q}^{q1-1} m(v_i)`.

This is the carry-aware formula; no carry case is a specialization.

Randomized direct-vs-symbolic self-test:
```json
{
  "seed": 20260828,
  "trials": 60,
  "symbolic_direct_comparisons": 432000,
  "genuine_direct_squares_seen": 4862,
  "status": "PASS"
}
```

## 3. Exact regime structure of `eafea`

| |M|₁ | roles | macro M | K range | windows |
|---:|---|---|---|---:|---:|
| 4 | `eaf` | `(2, -2, 0)` | 41–59 | 380 |
| 8 | `afe` | `(4, -3, -1)` | 41–59 | 380 |
| 8 | `efa` | `(4, -3, -1)` | 61–99 | 800 |
| 12 | `fea` | `(-6, 5, 1)` | 41–59 | 380 |
| 12 | `aeEND` | `(-6, 5, 1)` | 61–80 | 20 |
| 40 | `aea` | `(-21, -9, -10)` | 41–79 | 400 |
| 40 | `afa` | `(17, 13, 10)` | 41–79 | 400 |
| 40 | `eae` | `(21, 9, 10)` | 41–79 | 400 |
| 40 | `efe` | `(-9, -19, -12)` | 41–79 | 400 |
| 40 | `feEND` | `(9, 19, 12)` | 41–60 | 20 |
| 40 | `efEND` | `(19, 11, 10)` | 81–100 | 20 |

The crucial early regime is:

`roles = EAF`, `macro M = (2,-2,0)`, `K = 41..59`.

It contains exactly **380** possible `(K,start)` windows. Its boundary side must equal `-M = (-2,2,0) = m(E)-m(A)`, giving the projected identity above.

## 4. Exact comparison with `fafea`

| |M|₁ | roles | macro M | K range | windows |
|---:|---|---|---|---:|---:|
| 4 | `ffa` | `(-2, 2, 0)` | 61–99 | 800 |
| 8 | `afe` | `(4, -3, -1)` | 41–59 | 380 |
| 8 | `faf` | `(-4, 3, 1)` | 41–59 | 380 |
| 12 | `fea` | `(-6, 5, 1)` | 41–59 | 380 |
| 12 | `aeEND` | `(-6, 5, 1)` | 61–80 | 20 |
| 40 | `aea` | `(-21, -9, -10)` | 41–79 | 400 |
| 40 | `afa` | `(17, 13, 10)` | 41–79 | 400 |
| 40 | `fae` | `(15, 14, 11)` | 41–79 | 400 |
| 40 | `feEND` | `(9, 19, 12)` | 41–60 | 20 |
| 40 | `ffe` | `(-15, -14, -11)` | 41–79 | 400 |
| 40 | `ffEND` | `(13, 16, 11)` | 81–100 | 20 |

The corresponding first-block no-carry regime for `fafea` is:

`roles = FAF`, `macro M = (-4,3,1)`, `K = 41..59`.

That entire three-block window is `H(faf)`, hence already covered by the complete-AF gate through `K<=60`.

The first `fafea` regime with `|M|_1 = 4` is instead:

`roles = FFA`, `macro M = (-2,2,0)`, `K = 61..99`.

This independently supports the structural distinction: in `K=41..59`, `eafea` exposes a genuinely new `EAF` constraint, while the analogous block-0 `fafea` constraint is an already-certified `FAF` constraint.

No claim is made that small `|M|_1` alone predicts collisions.

## 5. Projected EAF prefix-state lemma

For fixed profile-correct `E,A`, define at each depth `j` the set of feasible forbidden target states

`F_j(E,A) = { T_{j,r}(E,A) : 1 <= r <= floor(j/2) }`

after discarding vectors that cannot be prefixes of an `F` with total profile `(19,11,10)`.

Build a DAG whose depth-`j` nodes are Parikh vectors `x=(xa,xb,xc)` with coordinate sum `j` and `0 <= x <= (19,11,10)`, except the states in `F_j(E,A)`. Add an edge by incrementing one coordinate.

**Lemma.** There exists a length-40 word `F` of profile `(19,11,10)` avoiding every no-carry `EAF` Abelian square with `K=41..59` iff this DAG has a path from `(0,0,0)` to `(19,11,10)`.

**Proof.** Each `F` corresponds bijectively to its prefix-Parikh lattice path. By the 380 exact identities, a projected `EAF` square occurs exactly when the path visits one forbidden state. Conversely every allowed lattice path spells a unique ternary word. QED.

This is exact for the projected family.

## 6. Critical limitation

The DAG is a **sound necessary relaxation** for complete-AEF, not a sufficient complete-AEF test.

It currently ignores:

- internal squares inside `F`;
- other complete-AF `FAF` constraints;
- carry regimes in `eafea`;
- other `eafea` windows;
- `fafea`;
- periods `K>=60`.

Therefore:

- `DP empty` => rigorous rejection of that fixed `(E,A)` for complete-AEF;
- `DP nonempty` => only survival of this necessary filter.

## 7. Immediate use when Claude returns

For every persisted `(E,A)` pair, compute:

1. number of distinct feasible forbidden F-prefix states;
2. distribution by prefix depth;
3. relaxed-DAG empty/nonempty;
4. reachable state count by depth;
5. exact path count through the relaxed DAG;
6. earliest depth of extinction, when empty.

Then compare historical/productive `(E,A)` pairs with random/nonproductive pairs.

This directly attacks the observed `E -> many A -> zero F` selectivity using boundary-derived exact states rather than arbitrary statistical features.

If the relaxed DAG is already empty for many negative pairs, it becomes an exact, cheap search pruner. If it stays nonempty almost everywhere, that falsifies this layer as the main discriminator and tells us exactly which omitted constraints must be projected next.

## 8. Epistemic status

**PROVED FROM DEFINITIONS HERE**
- general carry-aware boundary decomposition;
- exact 380-equation no-carry EAF projection;
- finite prefix-state DAG equivalence for that projected family.

**INDEPENDENT EXACT COMPUTATION**
- `eafea` / `fafea` macro-regime enumeration for `K=41..100`;
- `EAF, M=(2,-2,0)` regime exactly at `K=41..59`;
- `FAF` block-0 regime exactly at `K=41..59`;
- `fafea` `FFA, |M|_1=4` regime exactly at `K=61..99`;
- randomized direct/symbolic regression with zero disagreements.

**NOT ESTABLISHED**
- that this projected DP explains the historical/random-E contrast;
- sufficiency for complete-AEF;
- any L=40 impossibility;
- novelty.

Complete-AEF existence remains unresolved. Mäkelä remains open.
