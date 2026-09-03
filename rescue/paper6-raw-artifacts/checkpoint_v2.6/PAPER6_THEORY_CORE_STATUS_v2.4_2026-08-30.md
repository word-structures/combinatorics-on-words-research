# PAPER 6 — THEORY CORE STATUS v2.4
**Date:** 2026-08-30  
**Status:** post-adversarial-audit correction; exact descriptor-degeneracy checkpoint

## Core exact results retained

FULL-L4/Q2:

\[
218298\to2691\to2689\to1179=12+1167.
\]

The 1179-dimensional statewise future space remains independently exact.

FT1/FT2 remain correct but are downgraded to geometry/transport lemmas.

## v2.3 interpretation retired

The claim that the Q2 \(S_2\)/adjacency bit is the canonical or necessary
structural observability decoration is false.

The adversarial audit exhibited an off-grid four-window descriptor with exact
full rank and no bit.

## New exact theorem G1

True-grid four-profile measurement:

\[
1796\text{ families},
\qquad
\boxed{\operatorname{rank}_{\mathbb Q}=1144}.
\]

Exact certificate:

- 652 independent rational row relations;
- exact arbitrary-precision verification on all 1179 future columns;
- modular lower bound 1144.

Therefore the hidden grid future has exact dimension

\[
\boxed{35}.
\]

## New exact theorem G2

For the 16 phase-anchor window policies

\[
(a_0,a_1)\in\{0,1,2,3\}^2,
\]

the unique failure is the true-grid policy

\[
(0,1).
\]

It has exact rank 1144.

Every other 15 policy has modular rank 1179 under an independent C++ rank
implementation and therefore exact rational rank 1179.

## Phase-aliasing invariant

Exactly 1228 grid families mix memory-origin phases 0 and 1.

The intersection of the grid families split by all 15 successful non-grid
policies is exactly this 1228-family phase-mixed set.

Adding the phase bit explicitly yields 3024 families and exact full rank 1179.

This is a sufficient explanation for the 15/16 anchor-policy pattern.

It is not a globally necessary coordinate.

## New exact theorem G3 — minimal repair

The grid gap is exactly 35, so any refinement must add at least 35 independent
measurement rows to reach 1179.

Thirty-five phase-mixed grid families were selected whose phase contrasts span
the hidden 35-space.

Splitting only these 35 families gives

\[
1796\to1831
\]

families and exact full rank

\[
1179.
\]

Thus 35 added family rows are necessary and sufficient: an exact minimal repair
inside refinement-by-added-measurements.

## Random-refinement warning

Natural raw-history random refinement is often full rank.

For 287 randomly selected grid families, random nonempty binary splits give
1179/1179 in 100/100 hidden-kernel trials and in direct C++ end-to-end seeds
1--5.

This does not reproduce the Claude report's 287-random-family control, which
reported 1144. The report does not specify its split protocol sufficiently to
resolve the discrepancy.

Therefore do not claim that the epsilon-selected family set is uniquely
special.

## Current best interpretation

The true-grid whole-block profile measurement is a nongeneric 35-dimensional
measurement degeneracy.

Boundary-straddling windows, phase separation, epsilon decoration, and many
random refinements are different ways of becoming transverse to that hidden
space.

The next research object is the hidden 35-dimensional grid-degeneracy space
itself, not a canonical boundary fragment.

## Next theorem target

Characterize the 35-space structurally and test whether analogous
grid-alignment degeneracies occur in Q1, L5 and asymmetric libraries.

A general theorem should predict hidden-dimension / phase-contrast structure,
not prescribe one privileged descriptor.
