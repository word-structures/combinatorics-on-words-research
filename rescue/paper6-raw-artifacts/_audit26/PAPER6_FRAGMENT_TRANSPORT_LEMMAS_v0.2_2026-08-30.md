# PAPER 6 — FRAGMENT TRANSPORT LEMMAS v0.2
**Date:** 2026-08-30  
**Status:** corrected post-referee formulation; geometry lemmas only, no observability necessity claim

## Conventions

For a word \(w\), define \(\operatorname{suf}_m(w)\) with saturation:

\[
\operatorname{suf}_m(w)=w
\quad\text{when }m\ge|w|.
\]

Let

\[
S_m(w)=\Psi(\operatorname{suf}_m(w)),
\qquad S_0=0.
\]

For recency canonicalization, unseen alphabet symbols are appended using the
fixed deterministic fallback order `a,b,c`. This matters for longer profile
descriptors, although not for \(S_1\) or \(S_2\).

## General crossing formula specialized to \(j=1\)

The general affine crossing expression is

\[
\Delta_{k,j}
=
S_{2k-j}
-2S_{(k-j)_+}
+2P_{(j-k)_+}
-P_j.
\]

For \(k\ge2\) and \(j=1\),

\[
(k-1)_+=k-1,
\qquad
(1-k)_+=0,
\qquad
P_0=0.
\]

Therefore

\[
\boxed{
\Delta_{k,1}
=
S_{2k-1}
-2S_{k-1}
-P_1(b).
}
\]

Define the old-history side

\[
\boxed{
R_{k,1}(s)
=
S_{2k-1}(s)-2S_{k-1}(s).
}
\]

Then the \(j=1\) crossing Abelian-square condition is

\[
\boxed{
R_{k,1}(s)=P_1(b).
}
\]

This is the derivation missing from the v2.3 checkpoint.

## Lemma 1 — matched continuation transport

If histories \(s,t\) receive the same continuation \(U\) of length \(qL\), then

\[
\delta_m(sU,tU)=
\begin{cases}
0,&m\le qL,\\
\delta_{m-qL}(s,t),&m>qL.
\end{cases}
\]

## Lemma 2 — \(j=1\) remainder-fragment activation

For

\[
k=qL+r,\qquad r\ge1,
\]

after the common \(qL\)-symbol continuation,

\[
R_{k,1}(sU)-R_{k,1}(tU)
=
\delta_{qL+2r-1}(s,t)
-
2\delta_{r-1}(s,t).
\]

This identifies \(S_{r-1}\) as an **available geometric input channel**.

It does **not** imply that \(S_{r-1}\) is necessary, unique, canonical, or
minimal for any observable representation.

## Recency-gauge \(S_2\)

For ternary recency canonicalization,

\[
S_1=(1,0,0),
\]

and

\[
S_2=
\begin{cases}
(2,0,0),&s_{-1}=s_{-2},\\
(1,1,0),&s_{-1}\ne s_{-2}.
\end{cases}
\]

Thus \(S_2\) is equivalent to the adjacency bit.

This remains an exact identity.

## Post-audit interpretation

The v2.3 claim that the activation staircase explains the required
observability decoration is withdrawn.

An off-grid four-window descriptor attains complete observability without
\(S_2\), and a 16-policy sweep shows that the true-grid descriptor is the
unique incomplete anchor policy in that class.

The lemmas remain useful Abelian boundary bookkeeping and latent-memory
transport identities.
