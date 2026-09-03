# PAPER 6 v3.6 — PREREGISTRATION: PARIKH-OBSTACLE TARGET TRANSPORT HIERARCHY
**Date:** 2026-08-31
**Status:** preregistered before implementation tests; novelty unassessed

## Motivation

v3.5 proved that current bounded-extension response depends on finite target
layers `T_1,...,T_L`, but also found an exact safe selected-library
counterexample showing that these layers are not update-closed.

The next question is not to force finite-state closure. Instead test whether the
failure has an exact graded transport law.

## Generalized target coordinate

For integers `0 <= J <= k` with `2k-J <= |s|`, define

    R_{k,J}(s) = S_{2k-J}(s) - 2 S_{k-J}(s).

Its coordinate mass is `J`.

For fixed block length `L`, define generalized nonnegative target layers

    T_J(s) = {R_{k,J}(s) >= 0 : k >= max(L,J), 2k-J <= |s|}.

## Candidate transport identity

For any continuation `U` of length `qL` and any `(k,j)` satisfying
`k-j >= qL`, predict

    R_{k,j}(sU) = R_{k,j+qL}(s) - Psi(U).

This is a pointwise coefficient-free identity.

## Candidate exact one-block update for current response layers

Let `b` have length `L`, `p=Psi(b)`, and `1<=j<=L`.
Partition new long-root targets by `h=k-j`.

Far regime `h>=L`:

    transported targets = {u-p : u in T_{j+L}(s), u>=p coordinatewise}.

Near regime `L-j <= h <= L-1` (equivalently `L <= k < j+L`):

    N_j(s,b) = {
       p + S_{j+2h-L}(s) - 2 S_h(b)
       : h=L-j,...,L-1,
         result >=0
    }.

Prediction:

    T_j(sb) = N_j(s,b) union
              {u-p : u in T_{j+L}(s), u>=p}.

## Intended interpretation if true

The current finite response layer is not a Markov state because one block of
transport draws information from the next grade `j+L`. Appending blocks moves
old target information downward by `L` grades, translated by the Parikh vector
of the continuation, while a bounded near-boundary source injects new targets.

This would produce a semi-infinite graded obstruction system, not a finite-state
closure theorem.

## Frozen tests

1. Exact random pointwise transport tests for q=1,2,3 on binary/ternary words.
2. Exact one-block target-set update equality for random histories and L=2..6.
3. Selected FULL-L4 and INTERIOR-L5 sampled block histories.
4. Any mismatch kills the proposed hierarchy.

## Forbidden overclaims

- Do not infer finite-state regularity.
- Do not infer novelty from algebraic cleanliness.
- Do not connect this to the old 23/14/3 rank dimensions unless a separate
  theorem is proved.

## Novelty status

NOVELTY UNASSESSED.
