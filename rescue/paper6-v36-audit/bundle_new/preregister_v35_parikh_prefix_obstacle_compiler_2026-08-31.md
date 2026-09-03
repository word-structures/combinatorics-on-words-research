# PAPER 6 v3.5 — PREREGISTRATION: PARIKH-PREFIX OBSTACLE COMPILER
**Date:** 2026-08-31
**Status:** preregistered before compiler validation; novelty unassessed

## Starting exact fact

The independently preregistered long-period response-saturation formula reduces
all new Abelian squares of half-period `k >= L` created by appending a length-L
block to history-dependent target sets

    T_j(s) subset {u in N^d : |u|_1=j},  j=1,...,L,

where a candidate block `b` is long-period safe exactly when

    Psi(pref_j(b)) notin T_j(s) for all j.

## Candidate compiler theorem

Let `A_a` be arbitrary noncommuting linear operators attached to letters
`a in Sigma`. For each prefix length `j` and Parikh vector `u` of mass `j`,
define recursively

    H_0(0) = I,

    H_j(u) = 0                                  if u in T_j(s),

    H_j(u) = sum_a H_{j-1}(u-e_a) A_a           otherwise,

with nonexistent predecessor states interpreted as zero.

Prediction:

    sum_{|u|=L} H_L(u)

is exactly the sum of word operators `A_b=A_{b_1}...A_{b_L}` over all length-L
blocks `b` that create no new Abelian square with half-period >= L.

Thus, once the target sets are known, the complete long-period response
operator is compiled on the Parikh-prefix composition DAG using only

    sum_{j=0}^L binom(j+d-1,d-1) = binom(L+d,d)

profile vertices and at most `d` incoming transitions per vertex, rather than
enumerating `d^L` literal candidate blocks.

For fixed alphabet size `d`, the response-operator compilation stage is
polynomial in `L` in the number of coefficient states. This is NOT a claim
that computing the history target sets, the entire infinite language, or the
full avoidance problem is polynomial-time.

## Generalizations allowed if proof is direct

- intersect with a regular selected block language by taking a product with its
  DFA/trie state;
- sum only terminal profile classes satisfying a declared profile condition;
- use scalar, matrix, or exact transfer-operator weights.

## Validation tests frozen before implementation

1. Scalar DP count versus literal enumeration on random histories for ternary
   L=2,...,6.
2. Noncommutative 2x2 integer-matrix DP versus literal operator sum for small
   binary/ternary cases. Equality must hold entrywise exactly.
3. Selected-library validation: intersect with the actual aa2fr L4 and
   INTERIOR-L5 libraries and compare exact legal-block counts with direct
   literal testing on sampled histories.
4. Preserve a negative test showing the current response descriptor is not
   update-closed/Markov even for block-aligned safe histories; the compiler
   theorem is current-response only.

## Kill conditions

- Any matrix entry mismatch -> operator theorem FAIL.
- Any need to enumerate half-periods while traversing candidate block letters ->
  compiler claim must be demoted.
- Any claim that this yields a finite-state representation of the unbounded
  language without an update theorem -> prohibited.
- Any prior-art theorem directly giving this bounded-extension Parikh-prefix
  obstacle compiler or a stronger equivalent result -> novelty demotion.

## Novelty status

NOVELTY UNASSESSED.
