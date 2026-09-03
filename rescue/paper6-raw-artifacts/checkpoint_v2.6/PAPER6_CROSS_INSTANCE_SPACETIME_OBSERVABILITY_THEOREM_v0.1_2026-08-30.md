# PAPER 6 — CROSS-INSTANCE SPACE–TIME PROFILE OBSERVABILITY THEOREM v0.1
**Date:** 2026-08-30  
**Status:** exact finite-instance generalization of the v2.5 main theorem  
**Scope:** five independently defined selected-library calibrations  
**Novelty warning:** generic observability-index theory and the row-count lower bound are classical. The Paper-6 result is the exact Abelian selected-library pattern and its single identified structural exception.

---

# 1. Executive theorem

For each finite selected-library Abelian-avoidance system below, let

\[
V_{\rm cnt}
=
\operatorname{span}_{\mathbb Q}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}
\]

be the exact statewise continuation-count future space.

For a profile depth \(m\), let \(M_m\) aggregate raw histories according to
the \(m\) most recent complete block Parikh profiles, using only alphabet
symmetries that the selected library genuinely possesses.

Define

\[
\mathcal O_{m,t}
=
\begin{bmatrix}
M_m\\
M_mQ\\
\vdots\\
M_mQ^{t-1}
\end{bmatrix}\Big|_{V_{\rm cnt}}
\]

and

\[
\nu_m
=
\min\{
t:\operatorname{rank}_{\mathbb Q}\mathcal O_{m,t}
=
\dim_{\mathbb Q}V_{\rm cnt}
\}.
\]

If \(g_m\) is the number of realized measurement families, then necessarily

\[
\boxed{
\nu_m\ge
\left\lceil
\frac{\dim V_{\rm cnt}}{g_m}
\right\rceil.
}
\]

Across the five exact calibrations and fifteen tested profile-depth pairs in
this audit, **fourteen attain this lower bound exactly**.

The only exception is the already independently certified
FULL-L4/Q2 four-profile true-grid measurement, whose static rank has an exact
35-dimensional deficit and whose observability index is 2 instead of the
row-count lower bound 1.

---

# 2. BAL3 L4 / Q1

Selected library:

- block length \(L=4\);
- 30 aa2fr blocks containing all three letters;
- full \(S_3\) alphabet symmetry.

Exact future dimension:

\[
\boxed{\dim_{\mathbb Q}V_{\rm cnt}=4}.
\]

## One profile

There are

\[
g_1=3
\]

realized recency-gauged profile families.

Thus

\[
\nu_1\ge\lceil4/3\rceil=2.
\]

Ranks over both 65521 and 65519:

\[
3\to4
\]

for one and two time slices.

Hence

\[
\boxed{\nu_1=2}.
\]

## Two profiles

\[
g_2=8>4,
\]

and the static measurement already has full rank 4 over both primes.

Therefore

\[
\boxed{\nu_2=1}.
\]

The row-count lower bound is attained at both tested depths.

---

# 3. FULL L4 / Q1

Selected library:

- all 60 length-4 aa2fr blocks;
- full \(S_3\) symmetry;
- \(K_{\max}=7\).

A new compact exact vector certificate closes the target dimension:

- exact scalar Hankel rank \(=153\);
- the same degree-153 recurrence polynomial satisfies
  \[
  p(Q)\mathbf1=0
  \]
  in all 252 weighted-state coordinates using exact integer arithmetic.

Therefore

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=153.
}
\]

## One profile

\[
g_1=6,
\qquad
\lceil153/6\rceil=26.
\]

Ranks:

\[
t=25:\ 150,
\qquad
t=26:\ 153
\]

over both 65521 and 65519.

Hence

\[
\boxed{\nu_1=26}.
\]

## Two profiles

\[
g_2=51,
\qquad
\lceil153/51\rceil=3.
\]

Ranks:

\[
51,\ 102,\ 153
\]

for \(t=1,2,3\) over both primes.

Therefore

\[
\boxed{\nu_2=3}.
\]

## Three profiles

\[
g_3=345>153
\]

and the static measurement has rank 153 over both primes.

Thus

\[
\boxed{\nu_3=1}.
\]

All three depths attain the row-count lower bound exactly.

---

# 4. INTERIOR L5 / Q1

Selected library:

- block length \(L=5\);
- 90 internally aa2fr blocks containing all three letters;
- full \(S_3\) symmetry.

Independently exact-certified:

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=72.
}
\]

## One profile

\[
g_1=5,
\qquad
\lceil72/5\rceil=15.
\]

Ranks:

\[
t=14:\ 70,
\qquad
t=15:\ 72
\]

over both odd primes.

Therefore

\[
\boxed{\nu_1=15}.
\]

## Two profiles

\[
g_2=26,
\qquad
\lceil72/26\rceil=3.
\]

Ranks:

\[
26,\ 51,\ 72
\]

for the first three slices.

Hence

\[
\boxed{\nu_2=3}.
\]

## Three profiles

\[
g_3=98>72
\]

and static rank is already 72.

Thus

\[
\boxed{\nu_3=1}.
\]

Again every tested depth is row-count optimal.

This is the key cross-block-length replication.

---

# 5. Asymmetric HASH30 / K5

This control deliberately breaks the alphabet symmetry.

The selected library is the 30 full-L4 aa2fr blocks with lexicographically
smallest SHA-256 digest.

Its exact alphabet symmetry group is trivial.

Therefore the correct profile observation keeps fixed \(a,b,c\) orientation;
the \(S_3\) recency gauge is not applied.

Independently exact-certified:

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=47.
}
\]

## One oriented profile

There are

\[
g_1=11
\]

realized families.

The lower bound is

\[
\lceil47/11\rceil=5.
\]

The C++ finite-field rank calculation gives

\[
t=4:\ 44,
\qquad
t=5:\ 47.
\]

Hence

\[
\boxed{\nu_1=5}.
\]

## Two oriented profiles

\[
g_2=71>47,
\]

and the static measurement already has full rank 47.

Therefore

\[
\boxed{\nu_2=1}.
\]

Thus row-count optimality persists in an asymmetric selected library when the
measurement respects the library's actual symmetry group.

---

# 6. FULL L4 / Q2 main calibration

The v2.5 main theorem gives

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=1179
}
\]

and exact indices

\[
\boxed{
\nu_1=197,\qquad
\nu_2=24,\qquad
\nu_3=4,\qquad
\nu_4=2.
}
\]

The family counts are

\[
6,\quad51,\quad345,\quad1796.
\]

Therefore

\[
\lceil1179/6\rceil=197,
\]

\[
\lceil1179/51\rceil=24,
\]

\[
\lceil1179/345\rceil=4.
\]

Depths 1--3 again attain the row-count lower bound exactly.

Depth 4 is the unique exception in the present cross-instance dataset:

\[
\lceil1179/1796\rceil=1
\]

but

\[
\nu_4=2.
\]

This exception is not unexplained noise.

The static four-profile measurement has independently exact rational rank

\[
1144
\]

and therefore an exact

\[
35
\]

dimensional hidden sector.

All 35 hidden directions become visible after one block step.

---

# 7. Combined exact pattern

The tested profile-depth pairs are:

| system | \(m\) | \(d=\dim V_{\rm cnt}\) | families \(g_m\) | lower bound | exact \(\nu_m\) |
|---|---:|---:|---:|---:|---:|
| BAL3 L4 Q1 | 1 | 4 | 3 | 2 | **2** |
| BAL3 L4 Q1 | 2 | 4 | 8 | 1 | **1** |
| BAL3 L4 Q1 | 3 | 4 | 16 | 1 | **1** |
| FULL L4 Q1 | 1 | 153 | 6 | 26 | **26** |
| FULL L4 Q1 | 2 | 153 | 51 | 3 | **3** |
| FULL L4 Q1 | 3 | 153 | 345 | 1 | **1** |
| INTERIOR L5 Q1 | 1 | 72 | 5 | 15 | **15** |
| INTERIOR L5 Q1 | 2 | 72 | 26 | 3 | **3** |
| INTERIOR L5 Q1 | 3 | 72 | 98 | 1 | **1** |
| HASH30 L4 K5 | 1 | 47 | 11 | 5 | **5** |
| HASH30 L4 K5 | 2 | 47 | 71 | 1 | **1** |
| FULL L4 Q2 | 1 | 1179 | 6 | 197 | **197** |
| FULL L4 Q2 | 2 | 1179 | 51 | 24 | **24** |
| FULL L4 Q2 | 3 | 1179 | 345 | 4 | **4** |
| FULL L4 Q2 | 4 | 1179 | 1796 | 1 | **2** |

Thus:

\[
\boxed{
14/15
}
\]

tested pairs attain the elementary row-count lower bound.

The only failure is the already structurally identified 35-dimensional
FULL-L4/Q2 true-grid degeneracy.

---

# 8. What this does and does not prove

## Exact theorem

The table above is an exact finite-system theorem because:

1. each target future dimension is independently exact-certified;
2. row count gives an exact lower bound on the index;
3. a full-rank integer-minor reduction modulo an odd prime gives an exact
   rational full-rank upper certificate at the claimed time;
4. the FULL-L4/Q2 \(m=4\) static rank 1144 has an independent exact rational
   upper/lower certificate.

## Not yet a universal theorem

The data do **not** prove:

\[
\nu_m=
\left\lceil d/g_m\right\rceil
\]

for every selected library, block length, cutoff and profile depth.

That is now a sharply motivated conjecture with one known structured
exception in the present dataset.

---

# 9. Conjecture — generic profile-time transversality

The strongest current general hypothesis is:

> After quotienting only genuine library symmetries, delayed recent-profile
> measurement rows are generically transverse to the continuation-future
> space, so the observability index reaches the row-count lower bound unless a
> structured measurement alias/kernel intervenes.

In symbols, generically one expects

\[
\boxed{
\nu_m=
\left\lceil
\frac{d}{g_m}
\right\rceil
}
\]

until a structural degeneracy causes a larger index.

FULL-L4/Q2 \(m=4\) is the first exact detected degeneracy:

\[
g_4>d
\]

but static rank is only

\[
1144=d-35.
\]

One delayed block step removes it.

This is a conjectural structural law, not yet a theorem.

---

# 10. Why this strengthens Paper 6

The v2.5 result could still have been interpreted as numerology of one large
finite automaton.

The present audit provides:

- a much smaller symmetric library (BAL3);
- the same FULL library at lower block range (Q1);
- a different block length (INTERIOR L5);
- an asymmetric selected library (HASH30);
- the hard FULL-L4/Q2 main calibration.

The row-count-optimal space–time behavior survives all four independent
controls.

The only exception is already explained by an exact, independently certified
35-dimensional measurement degeneracy.

This makes the main-theorem phenomenon substantially more credible as a
reusable selected-Abelian principle.

---

# 11. Next theorem target

The next mathematical step should no longer be another arbitrary descriptor
sweep.

The precise target is:

> **Profile-time transversality theorem.** Give sufficient Abelian/combinatorial
> conditions under which
> \[
> \operatorname{rank}
> \begin{bmatrix}
> M_m\\M_mQ\\\cdots\\M_mQ^{t-1}
> \end{bmatrix}
> =
> \min(d,tg_m)
> \]
> for all \(t\) up to saturation.

A second theorem should characterize the obstruction:

> when can a structural alias such as the FULL-L4/Q2 true-grid 35-space make
> the rank strictly smaller?

Those two statements would convert the exact finite spectrum into a genuinely
general Paper-6 theory.
