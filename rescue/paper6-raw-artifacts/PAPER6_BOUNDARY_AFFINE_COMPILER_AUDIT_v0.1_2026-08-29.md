# PAPER 6 — BOUNDARY-AFFINE COMPILER AUDIT v0.1
**Date:** 2026-08-29  
**Status:** clean-room research result; not a manuscript  
**Gate:** P6-C3 — can profile responses be compiled from Abelian obstruction geometry?

## Executive verdict

**PASS at the one-step structural layer; recursive construction remains open.**

For a safe history suffix `s`, a safe equal-length block `b`, and a finite
half-period cutoff `Kmax`, every *new* Abelian square created by appending `b`
and crossing the block boundary is detected by a finite family of affine
Parikh-vector equations.

For `L=4`, `Kmax=6` there are only

\[
\boxed{19}
\]

such Abelian boundary geometries.

The fixed aa2fr `FORBID4` condition adds only the three possible length-4
factors straddling the boundary.

A clean-room implementation of these affine tests agreed with the brute-force
aa2fr checker on **all**

\[
\boxed{3402\times60=204\,120}
\]

state–block pairs of the full `L=4`, `Kmax=6` automaton:

\[
\boxed{0\text{ mismatches}.}
\]

This gives the first exact bridge from Paper-4-style cutpoint geometry to the
Paper-6 profile response operators.

---

# 1. Boundary-affine obstruction theorem seed

Let:

- `s` be a previously safe history suffix;
- `b` be a safe block of length `L`;
- `Kmax` be a finite Abelian half-period cutoff;
- `1 <= j <= L` be the position in the new block at which a newly created
  Abelian square ends;
- `2 <= k <= Kmax` be its half-period.

A new square crossing the old/new boundary must satisfy

\[
j<2k.
\]

Hence the possible geometries are exactly

\[
(k,j),
\qquad
2\le k\le K_{\max},
\quad
1\le j\le\min(L,2k-1).
\]

For each such pair, only `2k-j` old characters are needed.

---

## Case A — `j <= k`

Let

\[
u=\operatorname{suf}_{2k-j}(s)
\]

and split

\[
u=AC,
\qquad
|A|=k,\quad |C|=k-j.
\]

Let

\[
P=\operatorname{pref}_j(b).
\]

The crossing window is

\[
ACP
\]

and its two halves are `A` and `CP`.

It is an Abelian square exactly when

\[
\Psi(A)=\Psi(C)+\Psi(P),
\]

equivalently

\[
\boxed{
\Psi(P)=\Psi(A)-\Psi(C).
}
\]

Thus the history contributes a fixed Parikh-difference vector and the new
block is rejected when its length-`j` prefix hits that vector.

---

## Case B — `k < j < 2k`

Let

\[
u=\operatorname{suf}_{2k-j}(s).
\]

Split the new prefix of length `j` as

\[
\operatorname{pref}_j(b)=XY,
\qquad
|X|=j-k,\quad |Y|=k.
\]

The crossing window is

\[
uXY
\]

and its halves are `uX` and `Y`.

It is an Abelian square exactly when

\[
\Psi(u)+\Psi(X)=\Psi(Y),
\]

or

\[
\boxed{
\Psi(Y)-\Psi(X)=\Psi(u).
}
\]

Equivalently, using prefix Parikh vectors,

\[
\boxed{
\Psi(\operatorname{pref}_j b)
-
2\Psi(\operatorname{pref}_{j-k} b)
=
\Psi(u).
}
\]

Again this is an affine integer-vector test.

---

# 2. Completeness of the boundary test

If `s` is already safe and `b` is internally safe, any newly created forbidden
Abelian square must cross the old/new boundary.

Every crossing square ends at some new-block position `j` and has some
half-period `k`, hence appears in one of the two cases above.

Conversely, satisfaction of one of the displayed equations is exactly the
Parikh equality of the two adjacent halves of that crossing window.

Therefore the finite family of affine equations is complete for new
cutoff-Abelian-square creation.

For aa2fr, add the finite literal boundary masks for the six fixed length-4
forbidden factors.

---

# 3. Exact machine validation

Three independent validation sets were checked:

| library | Kmax | states | blocks | checked state–block pairs | mismatches |
|---|---:|---:|---:|---:|---:|
| BAL3 L4 aa2fr | 4 | 78 | 30 | 2,340 | 0 |
| BAL3 L4 aa2fr | 6 | 210 | 30 | 6,300 | 0 |
| ALL L4 aa2fr | 6 | 3,402 | 60 | 204,120 | **0** |

The affine predictor did not call the general Abelian-square search for the
state–block decision.

---

# 4. Bitset family compiler

For each geometry `(k,j)` and each attainable affine value `r`, precompute a
bitset

\[
H_{k,j,r}
=
\{b\in B:
b\text{ satisfies that boundary equation}\}.
\]

For a history state `s`, compute its required value `r_{k,j}(s)` and form

\[
H(s)
=
\bigcup_{k,j}H_{k,j,r_{k,j}(s)}
\]

together with the fixed FORBID4 boundary mask.

Then

\[
B_{\rm legal}(s)=B\setminus H(s).
\]

For each block profile `p`, with precomputed profile mask `B_p`,

\[
d_p(s)
=
|B_{\rm legal}(s)\cap B_p|
\]

is the exact number of legal next blocks of profile `p`.

Thus the first Paper-6 profile-response vector

\[
D_0(s)=(d_p(s))_{p\in P}
\]

is compiled by bitset unions and population counts after geometry-specific
precomputation.

### Clean-room benchmark

On the small full `L=4`, `Kmax=6` calibration, computing all one-step profile
response vectors by direct repeated safety checking took about `2.36 s` in the
Python research implementation, versus about `0.10 s` with the compiled
bitsets, approximately `23x` faster.

This timing is **illustrative only**, not a manuscript performance claim.
The exactness result, not the Python speed ratio, is the important point.

---

# 5. How much structure is already present in one-step profile response?

Let

\[
D_0(s)
=
(\#\text{ legal next blocks of each profile}).
\]

Then recursively refine by recording, for every next profile, how many
transitions enter each current response class.

This is the profile-coloured weighted refinement.

The observed refinement histories are strikingly shallow.

## Full L4 aa2fr

| Kmax | raw states | `D0` types | profile refinement | exact profile classes |
|---:|---:|---:|---|---:|
| 2 | 27 | 18 | `18` | 18 |
| 3 | 186 | 78 | `78` | 78 |
| 4 | 474 | 174 | `174 -> 186` | 186 |
| 5 | 1788 | 319 | `319 -> 433` | 433 |
| 6 | 3402 | 575 | `575 -> 907` | 907 |

At `Kmax=6`, the entire exact recursively stable profile-state semantics is
reached after **one successor-response refinement** of the local affine/profile
count vector.

## Selected INTERIOR L5 library

At `Kmax=5`:

\[
\boxed{
438
\to
133
\to
193
}
\]

for raw states, local profile-response types, and exact recursively stable
profile classes.

Again one recursive refinement suffices.

## BAL3

BAL3 needs slightly more recursion at the larger cutoffs:

\[
K=5:\quad16\to40\to46,
\]

\[
K=6:\quad19\to76\to91.
\]

Thus no universal one-refinement theorem should be claimed, but the response
depth is still very small in all present pilots.

---

# 6. Important negative control — strong state merging is library-dependent

To test whether the spectacular counting-state compression was merely being
caused by highly symmetric libraries, define an intentionally asymmetric but
reproducible selected library:

> `HASH30_L4_AA2FR` = the 30 full-L4 aa2fr blocks with the lexicographically
> smallest SHA-256 digest of their literal word.

This selection uses no continuation-count information.

Results:

| Kmax | raw | exact profile/future classes | exact total-count classes | exact unary linear rank |
|---:|---:|---:|---:|---:|
| 2 | 18 | 16 | 16 | 13 |
| 3 | 79 | 32 | 32 | 29 |
| 4 | 130 | 54 | 54 | 38 |
| 5 | 323 | 76 | 76 | **47** |

At `Kmax=5`:

\[
\boxed{
323\to76\to76\to47.
}
\]

The profile/future state classes no longer collapse to a much smaller
total-count partition: every tested profile/future class remains a distinct
total-count class.

But the exact linear counting dimension still falls

\[
76\to47.
\]

### Consequence

We should **not** formulate Paper 6 around a universal claim that
Abelian-avoidance states always merge massively under counting equivalence.

That phenomenon depends materially on the selected block library.

The more robust candidate phenomenon is:

> even when state equivalence gives little additional merging, future counting
> can live in a substantially lower-dimensional exact linear space.

This shifts theoretical emphasis toward the obstruction-generated linear
future space rather than merely toward quotient class counts.

---

# 7. Revised structural hierarchy

The evidence now supports the following architecture:

\[
\text{literal suffix histories}
\]

\[
\downarrow\quad\text{finite affine boundary equations}
\]

\[
\text{local profile response }D_0
\]

\[
\downarrow\quad\text{shallow weighted profile refinement}
\]

\[
\text{profile-conditioned future system}
\]

\[
\downarrow\quad\text{erase profile labels}
\]

\[
\text{total-count transition system}
\]

\[
\downarrow\quad\text{linear realization}
\]

\[
\text{Krylov/Hankel counting space}.
\]

The first arrow is now exact and explicitly compiled.

The last arrow is exact and already certified in the previous semantics audit.

The central open bridge is the middle one:

> can the recursively stable profile system be constructed directly from
> structural history families, without enumerating every literal suffix state?

---

# 8. Why this is directly connected to Paper 4 and Paper 5

The boundary equations depend only on:

- half-period `k`;
- cut position `j`;
- a Parikh-difference constant extracted from the old suffix;
- a short prefix/slice Parikh expression in the new block.

This is precisely the kind of cutpoint/carry geometry that Paper 4 is meant to
organize.

For a fixed profile family `B_p`, Paper 5-style reachable-family machinery can
in principle answer:

- how many literal completions hit a required affine vector;
- how many avoid the union of active obstruction equations;
- how surviving completions distribute among next structural response classes.

Thus the new target is not to use Paper 4/5 as a guessed final quotient.

It is to use them as an **exact compiler for the profile-conditioned weighted
operators**.

---

# 9. Next gate — P6-C4: remove literal suffixes from the construction

P6-C4 should attempt to replace a literal history state `s` by a structural
boundary datum `G(s)`.

A successful `G` must support two exact operations:

### Query

For each block profile `p`, compute

\[
d_p(G)
=
\#\{b\in B_p:G+b\text{ is safe}\}.
\]

### Update distribution

For each profile `p` and structural target datum `G'`, compute

\[
W_p(G,G')
=
\#\{b\in B_p:
G+b\text{ is safe and updates to }G'\}.
\]

If these two operations can be performed without expanding every literal
history/block pair, then `W_p` is the desired profile-conditioned Paper-6
operator.

The natural first candidate for `G` is not the entire suffix string but the
collection of **active boundary Parikh-difference requirements**, quotiented by
irrelevant/unattainable values and augmented only by the short literal memory
needed for FORBID4.

The kill test must determine whether that datum updates autonomously.

---

## Current verdict

**P6-C3 strengthens the theory pivot.**

We now have an exact finite affine description of the boundary physics and an
exact family-bitset compiler for one-step profile responses.

At the same time the asymmetric-library control prevents an overclaim:
counting-equivalence state merging itself is not universally dramatic.

The highest-value next question is therefore:

\[
\boxed{
\text{Can the low-dimensional future dynamics be generated directly from
boundary-obstruction data?}
}
\]

That is the route from “post-hoc compression” to a genuinely universal
construction.
