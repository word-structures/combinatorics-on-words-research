# PAPER 6 — EXACT SPACE–TIME OBSERVABILITY SPECTRUM THEOREM v0.1
**Date:** 2026-08-30  
**Status:** exact finite-system main theorem for FULL-L4/Q2  
**Novelty boundary:** observability matrices/indices are classical linear-systems / weighted-automata machinery. The contribution claimed here is the exact Abelian selected-library spectrum and its structural consequences, not the general observability formalism.

---

# 0. Headline theorem

Consider the FULL-L4 aa2fr selected library at block range

\[
Q=2,\qquad K_{\max}=11.
\]

Let \(Q\) also denote the exact 2691-state weighted/equitable transition
operator, and define the exact statewise continuation-count future space

\[
V_{\rm cnt}
=
\operatorname{span}_{\mathbb Q}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}.
\]

Independently certified:

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=1179.
}
\]

For \(m=1,2,3,4\), let \(M_m\) be the raw-history family-sum measurement
defined by the \(m\) most recent recency-gauged, true-block-grid-aligned L4
Parikh profiles.

For \(t\ge1\), define the delayed observability stack on \(V_{\rm cnt}\)

\[
\mathcal O_{m,t}
=
\begin{bmatrix}
M_m\\
M_mQ\\
\vdots\\
M_mQ^{t-1}
\end{bmatrix}
\Bigg|_{V_{\rm cnt}}.
\]

Let

\[
\nu_m
=
\min\{
t:\operatorname{rank}_{\mathbb Q}\mathcal O_{m,t}=1179
\}
\]

be the exact observability index.

Then

\[
\boxed{
\nu_1=197,\qquad
\nu_2=24,\qquad
\nu_3=4,\qquad
\nu_4=2.
}
\]

This is the main exact space–time theorem.

---

# 1. Measurement-family sizes

The realized raw-history profile-family counts are:

\[
g_1=6,
\qquad
g_2=51,
\qquad
g_3=345,
\qquad
g_4=1796.
\]

Each time slice contributes at most \(g_m\) measurement rows.

Therefore every \(m\)-profile observation satisfies the elementary
information/rank lower bound

\[
\boxed{
\nu_m
\ge
\left\lceil\frac{1179}{g_m}\right\rceil.
}
\]

For the first three depths:

\[
\left\lceil\frac{1179}{6}\right\rceil=197,
\]

\[
\left\lceil\frac{1179}{51}\right\rceil=24,
\]

\[
\left\lceil\frac{1179}{345}\right\rceil=4.
\]

Thus the first three claimed indices attain the absolute row-count lower bound.

---

# 2. Theorem ST1 — one-profile time-optimal observability

For \(m=1\), there are only six realized profile families.

For \(t\le196\),

\[
\operatorname{rank}\mathcal O_{1,t}
\le
6t
\le
1176
<
1179.
\]

Hence

\[
\nu_1\ge197.
\]

A compiled finite-field elimination over

\[
\mathbb F_{65521}
\]

gives

\[
\operatorname{rank}_{65521}\mathcal O_{1,197}
=
1179.
\]

All entries arise from integer transition and family-aggregation matrices.
Therefore a nonzero \(1179\times1179\) minor modulo 65521 is a nonzero integer
minor, so

\[
\operatorname{rank}_{\mathbb Q}\mathcal O_{1,197}\ge1179.
\]

Since the exact domain \(V_{\rm cnt}\) has dimension 1179,

\[
\boxed{
\nu_1=197.
}
\]

Thus the one-profile measurement is **time-optimal** with respect to its row
count.

---

# 3. Theorem ST2 — two-profile time-optimal observability

For \(m=2\),

\[
g_2=51.
\]

For \(t\le23\),

\[
51t\le1173<1179.
\]

Hence

\[
\nu_2\ge24.
\]

The compiled rank calculation gives

\[
\operatorname{rank}_{65521}\mathcal O_{2,24}
=
1179.
\]

Consequently

\[
\boxed{
\nu_2=24.
}
\]

Again the lower bound is attained exactly.

---

# 4. Theorem ST3 — three-profile time-optimal observability

For \(m=3\),

\[
g_3=345.
\]

Three time slices provide at most

\[
3\cdot345=1035<1179
\]

rows, so

\[
\nu_3\ge4.
\]

The exact-modular rank staircase is

\[
329,\quad651,\quad973,\quad1179
\]

for one through four time slices over \(\mathbb F_{65521}\).

In particular,

\[
\operatorname{rank}_{65521}\mathcal O_{3,4}=1179,
\]

hence

\[
\boxed{
\nu_3=4.
}
\]

The three-profile measurement also attains its absolute row-count lower bound.

---

# 5. Theorem ST4 — four-profile one-step latent sector

For \(m=4\), the row-count lower bound alone would permit static
observability because

\[
g_4=1796>1179.
\]

But the true-grid measurement is exactly degenerate.

The post-referee exact rational certificate proves

\[
\boxed{
\operatorname{rank}_{\mathbb Q}M_4|_{V_{\rm cnt}}
=
1144.
}
\]

Therefore

\[
\nu_4>1.
\]

Let

\[
H_4
=
V_{\rm cnt}\cap\ker M_4.
\]

Then

\[
\boxed{
\dim_{\mathbb Q}H_4=1179-1144=35.
}
\]

The two-time observability stack satisfies

\[
\operatorname{rank}_{65521}
\begin{bmatrix}
M_4\\M_4Q
\end{bmatrix}
\Bigg|_{V_{\rm cnt}}
=
1179,
\]

and independently

\[
\operatorname{rank}_{65519}
\begin{bmatrix}
M_4\\M_4Q
\end{bmatrix}
\Bigg|_{V_{\rm cnt}}
=
1179.
\]

Hence

\[
\boxed{
\nu_4=2.
}
\]

Equivalently:

\[
\boxed{
H_4\cap\ker(M_4Q)=\{0\}.
}
\]

Thus every one of the 35 future directions that is invisible to the current
true-grid four-profile measurement becomes observable after exactly one
additional block step.

This is the exact **one-step latent-sector theorem**.

---

# 6. Static–dynamic repair duality

The static grid gap is exactly 35.

A static refinement that adds \(k\) independent measurement rows can increase
rank by at most \(k\).

Therefore every static repair requires

\[
k\ge35.
\]

The v2.4 certificate constructs 35 phase-contrast measurement rows for which

\[
\operatorname{rank}_{\mathbb Q}
\begin{bmatrix}
M_4\\R_{35}
\end{bmatrix}
=
1179.
\]

Hence 35 is the exact minimal static repair size.

The present theorem gives a second repair:

\[
\begin{bmatrix}
M_4\\M_4Q
\end{bmatrix}.
\]

On the hidden space \(H_4\),

\[
R_{35}|_{H_4}
\]

and

\[
M_4Q|_{H_4}
\]

are both injective maps out of the same 35-dimensional space.

Therefore a minimal 35-row static phase repair and a suitable 35-dimensional
coordinate extraction from the one-step delayed grid measurement are merely
two linear coordinate systems on the same latent future sector.

This is a **static–dynamic duality** for the exact Q2 calibration.

The underlying linear-algebra statement is classical; the exact Abelian
35-dimensional sector is the system-specific result.

---

# 7. Why the theorem is stronger than the v2.3 descriptor story

The v2.3 narrative attempted to identify a privileged static boundary
decoration.

The adversarial audit and v2.4 controls showed this is not justified:

- 15/16 natural phase-anchor window policies are already statically full rank;
- the true-grid policy is the unique failure in that class;
- random sufficiently rich refinements can also repair the hidden sector;
- \(S_2\) is sufficient but not necessary.

The new theorem does not privilege any static descriptor.

Instead it states an invariant dynamical fact:

\[
\boxed{
\text{the true-grid measurement hides exactly 35 future directions at time 0
and exposes all 35 at time 1}.
}
\]

That statement survives all descriptor counterexamples.

---

# 8. Space–time tradeoff

The exact spectrum is

\[
\boxed{
( g_m,\nu_m )
=
(6,197),
(51,24),
(345,4),
(1796,2).
}
\]

For \(m=1,2,3\),

\[
\boxed{
\nu_m
=
\left\lceil\frac{1179}{g_m}\right\rceil.
}
\]

Thus each delayed profile observation contributes essentially the maximum
possible new linear information until the full future space is observed.

The four-profile measurement is the unique anomaly in this sequence:

\[
\left\lceil1179/1796\right\rceil=1
\]

but

\[
\nu_4=2,
\]

because the true-grid profile aggregation has the independently exact
35-dimensional static degeneracy.

This makes the v2.4 grid-alignment phenomenon a sharply localized exception
inside an otherwise row-count-optimal space–time spectrum.

---

# 9. Supporting cutoff evidence

The same space–time behavior already appears below Q2 in the FULL-L4 cutoff
staircase over \(\mathbb F_{65521}\).

### K7

Three profiles are statically complete at the measured target rank 153.

### K8

Three profiles are statically complete at rank 241.

### K9

Three profiles:

\[
277
\longrightarrow
337
\]

after one delayed block measurement.

Four profiles are already static rank 337.

### K10

Three profiles:

\[
316
\longrightarrow
605
\]

after one delayed block measurement.

Four profiles are already static rank 605.

These K8--K10 target dimensions are supporting modular evidence unless
separately exact-certified. They are not required for the exact Q2 theorem.

The important pattern is that temporal observation can replace missing spatial
profile depth before the Q2 calibration as well.

---

# 10. General observability lemma

For any finite-dimensional \(Q\)-invariant future space \(V\) and linear
measurement \(M\), define

\[
H_t
=
V\cap
\bigcap_{j=0}^{t-1}\ker(MQ^j).
\]

Then

\[
\operatorname{rank}
\begin{bmatrix}
M\\MQ\\\vdots\\MQ^{t-1}
\end{bmatrix}\Big|_V
=
\dim V-\dim H_t.
\]

The observability index is the least \(t\) for which \(H_t=\{0\}\).

This is standard linear systems / observable-operator algebra and is included
only to organize the Abelian result.

For the Q2 four-profile measurement:

\[
\dim H_1=35,
\qquad
\dim H_2=0.
\]

For three profiles, the exact theorem yields

\[
H_4=0
\]

and row count proves \(H_3\ne0\).

---

# 11. Interpretation for the Paper-6 research question

The original question was:

> **How much of an Abelian-avoidance history must be remembered to preserve its
> future counting dynamics?**

The theorem gives a sharper answer than any static state descriptor.

A coarse structural observable may omit history information and still recover
the complete exact future if it is observed across time.

In the hardest current calibration:

- four recent block profiles miss 35 dimensions **now**;
- no extra static history coordinate is mathematically required if the same
  observable is available **one block later**;
- three profiles require four time slices;
- two profiles require 24;
- one profile requires 197.

Thus the relevant resource is not simply history depth.

It is a measurable **space–time budget**:

\[
\boxed{
\text{spatial structural detail}
\quad\leftrightarrow\quad
\text{temporal observation depth}.
}
\]

This is the central Paper-6 theorem-level interpretation.

---

# 12. What is classical and what is Paper-6-specific

## Classical infrastructure

Do not claim novelty for:

- observability matrices;
- observability indices;
- the row-count lower bound;
- finite-dimensional Hankel/Krylov future spaces;
- delayed linear measurements;
- static-vs-dynamic coordinate equivalence.

## Paper-6-specific exact results

The current contribution candidate is:

1. the exact selected-Abelian Q2 future dimension 1179;
2. the exact semantic hierarchy
   \[
   218298\to2691\to2689\to1179=12+1167;
   \]
3. the exact profile-observability spectrum
   \[
   \boxed{197,24,4,2};
   \]
4. exact time-optimality for profile depths 1--3;
5. the exact 35-dimensional true-grid latent sector;
6. its complete one-block activation;
7. exact 35-row minimal static repair;
8. the 15/16 static anchor-policy theorem;
9. latent persistent-injection counterexamples showing why naive static
   state interpretations fail.

---

# 13. Main-theorem package for the manuscript

A referee-facing paper can now state one coherent main result:

> **Main Theorem.**  
> For the full length-4 selected aa2fr library under the Q2 Abelian cutoff, the
> exact continuation future has dimension 1179. Measurements by the last
> \(m=1,2,3,4\) block Parikh profiles have exact observability indices
> \(197,24,4,2\), respectively. The first three attain the row-count lower
> bound. The four-profile observation has an exceptional exact 35-dimensional
> static kernel, but every hidden direction becomes visible after one block
> step. Equivalently, the true-grid static observation admits an exact minimal
> 35-row repair.

This is a complete exact finite-system theorem.

The next generalization problem is no longer required to make the present
paper mathematically coherent. It is the natural sequel:

> predict the space–time observability spectrum from \(L,Q,B\) and Abelian
> boundary geometry without constructing the full future space.
