# PAPER 6 — THEORY CORE STATUS v2.6
**Date:** 2026-08-30  
**Status:** main theorem cross-instance replicated; focused referee audit ready

## Exact main theorem remains

FULL L4 / Q2:

\[
\dim_{\mathbb Q}V_{\rm cnt}=1179
\]

with exact profile-observability indices

\[
\boxed{
197,\ 24,\ 4,\ 2
}
\]

for profile depths \(m=1,2,3,4\).

## New cross-instance exact replication

### BAL3 L4 / Q1

\[
d=4,
\qquad
\nu_1=2,\quad\nu_2=1.
\]

### FULL L4 / Q1

A new exact vector annihilation certificate closes

\[
d=153.
\]

Then

\[
\boxed{
\nu_1=26,\quad
\nu_2=3,\quad
\nu_3=1.
}
\]

### INTERIOR L5 / Q1

\[
d=72,
\qquad
\boxed{
\nu_1=15,\quad
\nu_2=3,\quad
\nu_3=1.
}
\]

### asymmetric HASH30 / K5

Using fixed alphabet orientation because the library has trivial alphabet
symmetry:

\[
d=47,
\qquad
\boxed{
\nu_1=5,\quad
\nu_2=1.
}
\]

## Cross-instance pattern

Across 15 exact tested profile-depth pairs,

\[
\boxed{14/15}
\]

attain the elementary row-count lower bound

\[
\nu_m
=
\left\lceil
\frac{d}{g_m}
\right\rceil.
\]

The only exception is FULL-L4/Q2 at depth four.

That exception is independently understood:

\[
\operatorname{rank}_{\mathbb Q}M_4=1144
\]

inside a 1179-dimensional future space, producing an exact 35-dimensional
true-grid hidden sector.

One delayed block observation removes the entire gap.

## Interpretation

This materially strengthens the v2.5 main theorem.

The row-count-optimal space–time phenomenon now survives:

- a small balanced L4 library;
- the full L4 library at Q1;
- a different block length L5;
- an asymmetric L4 library with no alphabet quotient;
- the full L4/Q2 main case.

It is no longer reasonable to treat the v2.5 spectrum as isolated numerology.

It is still NOT a universal theorem.

The emerging conjecture is a profile-time transversality law with structured
alias/kernel exceptions.

## Replay correction

The packaged v2.5 replay contained an artifact-only bug: the prime variable
`P=65521` was shadowed by a later Parikh helper `P(w)`.

The theorem calculations were unaffected, but the replay itself crashed.

v2.6 includes a corrected replay that passes from a clean unpacked workspace.

## Next gate

1. Run the focused Claude theorem audit included in this checkpoint.
2. In parallel, test whether the persistent future spaces show the same
   row-count-optimal indices.
3. If the focused audit passes, target a general sufficient condition for
   \[
   \operatorname{rank}\mathcal O_{m,t}=\min(d,tg_m).
   \]
4. Characterize structured failures such as the exact Q2 four-profile
   35-dimensional grid degeneracy.
