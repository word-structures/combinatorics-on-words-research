# PAPER 4 — Full `eafea` long-band projection audit

**Version:** v0.2  
**Date:** 2026-08-28  
**Status:** INDEPENDENT MATHEMATICAL / COMPUTATIONAL AUDIT — NOT CANONICAL EVIDENCE

## 1. Strengthening over v0.1

The v0.1 package projected only the 380 no-carry `EAF` windows with `K=41..59`.

A stronger exact statement holds. The macro cover `eafea` contains role `F` exactly once. For `K>40`, the three cut points `s`, `s+K`, `s+2K` are pairwise more than one block apart. Therefore at most one cut point can lie inside the unique `F` block. Crossed complete F blocks contribute only the fixed profile `m(F)=(19,11,10)`.

Hence, after fixing profile-correct E and A, every Abelian-square equation in `H(eafea)` for `K=41..100` is either:

1. independent of F's internal ordering, or
2. equivalent to forbidding one specific prefix-Parikh state `p_F(j)`.

There are exactly **3,600** `(K,start)` windows in that complete long band.

## 2. Single-occurrence role projection lemma

Let H be L-uniform and let a finite macro cover word v contain a distinguished role X exactly once. Fix every other block word and fix the total Parikh profile m(X). For half-period K>L, at most one of the three cut points can lie inside H(X). Thus every Abelian-square second-difference equation is either X-order-independent or has the form

`c p_X(j) + C = 0`, with `c in {1,-2}`.

It therefore either:
- is inactive for every ordering of X;
- is unavoidable for every ordering of X; or
- forbids a single prefix-Parikh state of X.

The union over all windows yields an exact finite forbidden-state DAG.

## 3. Paper-4 specialization

For `v=eafea`, `L=40`, `K=41..100`:
- windows: **3600**;
- complete prefix-state universe for F is bounded by
  `(19+1)(11+1)(10+1) = 2640` vectors;
- each vector belongs to exactly one depth given by its coordinate sum.

So the complete `eafea` long-band existence problem for F at fixed `(E,A)` is a tiny exact DAG problem rather than a raw enumeration over length-40 words.

## 4. Exactness regression

```json
{
  "seed": 20260828,
  "trials": 80,
  "comparisons": 288000,
  "genuine_squares_seen": 3369,
  "status": "PASS"
}
```

Every compiled window agreed with direct substring Parikh equality.

## 5. Exact scope

For fixed `(E,A)`, the DP decides exactly whether there exists a profile-correct F whose **ordering** avoids every Abelian square in `H(eafea)` with `K=41..100`.

This is still only a necessary filter for complete-AEF, because the full problem also includes:
- K<=40 constraints;
- `fafea`;
- complete-AF requirements not implied by this long-band projection.

Thus:
- DP empty => rigorous rejection of `(E,A)` for complete-AEF;
- DP nonempty => not a complete-AEF hit.

## 6. Synthetic price test — not evidence

100 random profile-correct `(E,A)` pairs were used only to price the filter:

```json
{
  "status": "SYNTHETIC EXPLORATORY PROBE \u2014 NOT PAPER-4 EVIDENCE",
  "random_profile_correct_EA_pairs": 100,
  "DP_empty": 27,
  "F_order_independent_unavoidable": 27,
  "forbidden_states_min": 201,
  "forbidden_states_median": 348.5,
  "forbidden_states_max": 550
}
```

These are not Claude's gated populations, so no Paper-4 scientific inference is drawn from them.

## 7. Next extension

`fafea` contains F twice, so long-band equations can couple two prefix states of the same F word. The natural next formulation is a small prefix-state CSP / augmented automaton, not an assumption that the simple 2640-state DAG extends unchanged.

## 8. Epistemic status

**PROVED / EXACT HERE**
- single-occurrence-role projection lemma;
- exact full `eafea`, K=41..100 compilation;
- finite DAG equivalence for that cover/range;
- 3600-window count and 2640-state-universe bound;
- randomized direct-vs-compiled regression.

**EXPLORATORY ONLY**
- synthetic 100-pair price test.

**NOT ESTABLISHED**
- whether this filter explains Claude's historical/random-E contrast;
- complete-AEF existence/nonexistence;
- novelty.
