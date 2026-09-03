# PAPER 6 — THEORY CORE STATUS v2.3
**Date:** 2026-08-30  
**Status:** first geometry-derived structural-observability theorem checkpoint

## New theorem mechanism

The Q2 adjacency bit is no longer ad hoc.

Under the recency alphabet gauge,

\[
\varepsilon(s)=\mathbf1[s_{-1}=s_{-2}]
\]

is exactly the suffix-Parikh fragment

\[
S_2=
\begin{cases}
(2,0,0),&\varepsilon=1,\\
(1,1,0),&\varepsilon=0.
\end{cases}
\]

A general fragment-transport theorem proves that for

\[
k=qL+r,\qquad j=1,
\]

after \(q\) matched blocks the old-history affine requirement contains the
current fragment

\[
S_{r-1}
\]

with coefficient \(-2\).

For FULL L4 in the q=2 range:

\[
K=9\Rightarrow S_0,
\qquad
K=10\Rightarrow S_1,
\qquad
K=11\Rightarrow S_2.
\]

Recency gauge makes \(S_0\) and \(S_1\) trivial.

Therefore K11 is the first q=2 cutoff exposing a nontrivial normalized local
fragment, exactly matching the successful one-bit observability decoration.

## Exact Q2 theorem

Four recency-gauged recent block profiles plus \(S_2\) give exact rational:

\[
1179/1179
\]

full-future observability and

\[
1167/1167
\]

persistent observability.

## Rigor correction

The profile-only ranks

\[
1144,\qquad1138\text{ persistent}
\]

are currently replicated over two odd finite fields.

They are not yet an exact rational upper bound.

Therefore the exact theorem is sufficiency of the \(S_2\)-decorated
measurement, not yet rational minimality of the one-bit augmentation.

## Cutoff staircase

FULL L4 two-prime calibration:

- K7: 3 profiles sufficient;
- K8: 3 profiles sufficient;
- K9: 4 profiles sufficient;
- K10: 4 profiles sufficient;
- K11: 4 profiles + \(S_2\) give exact Q-observability.

This supports a profile-depth + residual-fragment staircase derived from
affine geometry.

## Next theorem target

Generalize the activation theorem into a sufficient structural-observability
criterion:

\[
G_B\text{-gauge}
+
\text{recent whole-block profiles}
+
\text{geometry-activated cut fragments}.
\]

The main missing step is to turn "can affect future legality" into "forms a
complete continuation-Hankel measurement family."
