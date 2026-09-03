# Paper 4 — Gate T Fail-Closed Milestone

**Version 0.2 — 2026-08-27**  
**Status:** `EXACT-CHECKED STRUCTURAL CERTIFIER`; final use still requires a finite-gate-zero H40 candidate.

## 1. Milestone

The long-period layer is now implemented as a fail-closed two-stage exact
certificate:

\[
H
\longrightarrow
\{\text{outer parents by }H\}
\longrightarrow
\text{source realizability in }\operatorname{Fact}^\infty(h_6).
\]

The first stage enumerates every bounded outer-parent template under the exact
\(h_6\)-specific contracting coordinates.  The second stage computes a sound
ancestor closure under \(h_6\), derives the Proposition-8 factor-length bound,
enumerates the complete factor language to that bound, and checks realization.

## 2. Exact dynamic expanding bounds

The source-realizability stage no longer relies on one preselected universal
H40 envelope.

For the actual finite list of outer parents, it computes exact integer ceilings

\[
B_3^{(0)},\qquad B_+^{(0)},\qquad B_-^{(0)}
\]

for the expanding coordinates

\[
r_3,\qquad r_{+\sqrt3},\qquad r_{-\sqrt3}.
\]

An exhaustive enumeration of all \(h_6\)-parent boundary corrections gives the
exact worst cases

\[
|r_3(c)|\le 6,
\]
\[
|r_{+\sqrt3}(c)|\le18+9\sqrt3,
\]
\[
|r_{-\sqrt3}(c)|\le-1+4\sqrt3.
\]

Therefore parenthood preserves the integer envelopes

\[
\boxed{
B_3=\max(B_3^{(0)},3),\quad
B_+=\max(B_+^{(0)},46),\quad
B_-=\max(B_-^{(0)},9).
}
\]

The thresholds follow from

\[
\frac6{3-1}=3,
\]

\[
\frac{18+9\sqrt3}{\sqrt3-1}
=
\frac{45+27\sqrt3}{2}
<46,
\]

and

\[
\frac{-1+4\sqrt3}{\sqrt3-1}
=
\frac{11+3\sqrt3}{2}
<9.
\]

All comparisons in the implementation use exact arithmetic in
\(\mathbb Q(\sqrt3)\), not floating-point decisions.

## 3. Sound finite integer box

Let

\[
T=
\begin{pmatrix}
Q\\
r_3\\
r_{+\sqrt3}\\
r_{-\sqrt3}
\end{pmatrix}.
\]

The inverse \(T^{-1}\) is explicit over \(\mathbb Q(\sqrt3)\).  Every
coefficient multiplying a \(Q\)-coordinate has absolute value at most \(1/3\),
the \(r_3\) coefficient has absolute value \(1/6\), and every coefficient
multiplying \(r_+\) or \(r_-\) has absolute value less than \(1/2\).

Since

\[
|Qd|\le(4,4,2),
\]

every coordinate of an ancestor vector satisfies

\[
|d_i|
<
\frac{10}{3}+\frac{B_3}{6}+\frac{B_++B_-}{2}.
\]

The certifier therefore takes

\[
N=
\left\lceil
\frac{10}{3}+\frac{B_3}{6}+\frac{B_++B_-}{2}
\right\rceil
\]

and enumerates only the finite free-variable cube \([-N,N]^3\), followed by
exact algebraic membership tests.

This makes the finite ancestor box candidate-dependent and fail-closed.

## 4. Negative control: Rao--Rosenfeld \(g_3\)

Input outer parents:
\[
11023.
\]

Dynamic target bounds:
\[
B_3^{(0)}=2,\qquad
B_+^{(0)}=23,\qquad
B_-^{(0)}=4.
\]

Invariant ancestor bounds:
\[
(3,46,9).
\]

Results:

- finite ancestor vector box: 25,173;
- source ancestor closure: 45,720 templates;
- \(\Delta=12\);
- finite factor-length bound: 21;
- exact factors of length \(\le21\): 1,705;
- realization decompositions checked: 161,156;
- realizable outer parent: **none**.

Thus the new implementation independently reproduces the long-period
conclusion needed for Rao--Rosenfeld Theorem 10.

Status:
\[
\boxed{\texttt{REGRESSION PASS}.}
\]

## 5. Positive control: already-falsified H40 candidate

The first historical H40 candidate is known to fail the finite
period-\(2,\ldots,40\) gate.  It is therefore useful only as a positive control
for Gate T.

Outer parents:
\[
40425.
\]

Dynamic target bounds:
\[
B_3^{(0)}=2,\qquad
B_+^{(0)}=27,\qquad
B_-^{(0)}=5.
\]

The source-realizability stage finds the concrete witness

```text
word     = cbce
template = [eps, b, e], d=(0,0,0,0,0,0)
```

and rejects the candidate.

Status:
\[
\boxed{\texttt{POSITIVE WITNESS CONTROL PASS}.}
\]

## 6. Consequence

Gate T no longer has an unknown proof method waiting after the finite search.

For any future H40 candidate satisfying the fixed role incidence:

1. run the exact 22-trigram \(K=2,\ldots,40\) gate;
2. if zero, enumerate its exact outer-parent set;
3. run the fail-closed source-realizability certificate;
4. if no parent is realizable, Rao--Rosenfeld Proposition 10 certifies every
   period \(K>40\).

A candidate passing both stages is a complete positive solution of the
target avoidance problem, subject to final independent replay and literature
status verification.

## 7. Current epistemic status

- finite-gate theorem stack: `PROVED + EXACT-CHECKED`;
- outer-parent generation: `EXACT-CHECKED`;
- source-realizability mechanism: `EXACT-CHECKED` by two-sided regression;
- final H40 positive construction: `OPEN`;
- novelty of this h6-specific coordinate implementation:
  `NOVELTY_UNRESOLVED`.

