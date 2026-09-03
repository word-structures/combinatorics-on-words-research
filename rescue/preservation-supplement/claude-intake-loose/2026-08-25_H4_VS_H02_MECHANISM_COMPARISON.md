# H4 vs H02 mechanism comparison

**Date:** 2026-08-25  
**Status:** EXPLORATORY MECHANISM ANALYSIS / H01-H02 ARE NOW DESIGN SET  
**h=8:** NOT COMPUTED / NOT INSPECTED  
**Novelty:** NOT ESTABLISHED

## 1. Cases

### H4 design anomaly

Baseline:
\[
L_3.
\]

Target:
\[
h=4,\qquad v=(2,1,1),
\]
with no positional subpredicate.

Response:
\[
A'(0)\approx-0.00733732617.
\]

Target probability:
\[
q\approx0.08797229661.
\]

### H02 prospective-pilot target, now revealed

Baseline:
\[
L_5.
\]

Target:
\[
h=6,\qquad v=(3,2,1),
\]
plus
\[
x_0=x_1.
\]

Frozen PEX-3 prediction:
`INCONCLUSIVE`.

Revealed response:
\[
A'(0)\approx-0.00190580782233.
\]

Independent fourth-order finite-difference check:
\[
-0.00190580782602.
\]

Target probability:
\[
q\approx0.01498155497.
\]

H02 is therefore a negative-response target that the frozen PEX-3 certificate
failed to certify.

---

# 2. Lag anatomy is not identical

The two negative responses have different internal shapes.

## H4

Complete response through the target-window scale \(W-1=7\):

\[
S_7\approx+0.00900052652.
\]

Then:

\[
D_8\approx+0.00737713736,
\]

\[
D_9\approx-0.01834632745,
\]

\[
D_{10}\approx-0.01855698443.
\]

The cumulative response crosses below zero at lag 9.

At lags 9 and 10, the negative response is overwhelmingly one-endpoint:

- lag 9 one-endpoint:
  \[
  -0.01662331281;
  \]
- lag 10 one-endpoint:
  \[
  -0.01814518890.
  \]

This is the clean delayed-continuation anomaly.

## H02

Complete response through \(W-1=11\):

\[
S_{11}\approx+0.00087836118.
\]

The first fully nonlocal terms are:

\[
D_{12}\approx+0.00356171849,
\]

\[
D_{13}\approx-0.00128682938,
\]

\[
D_{14}\approx-0.00380428738.
\]

The cumulative response remains positive through lag 13 and crosses below
zero at lag 14.

At lag 13:

\[
D_{13}^{OE}\approx-0.000393863,
\]

\[
D_{13}^{between}\approx-0.000906195.
\]

At lag 14:

\[
D_{14}^{OE}\approx-0.002737661,
\]

\[
D_{14}^{between}\approx-0.001069555.
\]

Thus H02 has a real delayed one-endpoint contribution, but it is not as
dominant or as cleanly localized as in h4.

Moreover, H02 has large negative **within-window both-endpoint** terms:

\[
D_7\approx-0.01405822626,
\qquad
D_8\approx-0.01154331960,
\]

mostly caused by target placements containing both observed endpoints.

Those terms are later partially compensated before the nonlocal crossing.

### First structural conclusion

\[
\boxed{
\text{H02 is not simply a scaled copy of the h4 anatomy.}
}
\]

H4 is dominated by delayed one-endpoint memory.
H02 mixes within-window two-endpoint geometry with a weaker delayed
continuation effect.

---

# 3. Why PEX-3 succeeds on h4 and fails on H02

This is the sharpest comparison.

For the h4 lag-9/10 one-endpoint kernels:

- positive actual kernel placements: 13;
- positive PEX lower placements: 13;
- positive-kernel mass captured by PEX:
  \[
  \boxed{98.79\%}.
  \]

The PEX cell minimum is almost the actual conditional transition probability.

For H02 at the frozen lag-13/14 placement family:

- positive actual kernel placements:
  \[
  32/48;
  \]
- positive PEX-3 lower placements:
  \[
  2/48;
  \]
- positive-kernel mass captured:
  \[
  \boxed{19.98\%}.
  \]

The mean loss caused by replacing the actual conditional transition
probability with the PEX cell minimum is:

### h4
\[
0.0002974.
\]

### H02
\[
\boxed{0.0781860}.
\]

In H02, 62.5% of all placements have

\[
K_{\rm actual}>0
\quad\text{but}\quad
\underline K_{\rm PEX3}\le0.
\]

So PEX-3 is not missing the target event itself.

It is grouping together continuation states whose **immediate exclusion
signatures look the same but whose future continuation capacities are very
different**.

---

# 4. The missing variable: continuation capacity

For an allowed finite-state context \(s\), define

\[
N_m(s)
=
\#\{\text{admissible length-}m\text{ continuations from }s\}.
\]

This is purely combinatorial.

The design-set experiment refined every PEX-3 cell by adding

\[
\boxed{
\bigl(N_m(s),\,N_m(s_{\rm ref})\bigr),
}
\]

where \(s_{\rm ref}\) is the successor state obtained by appending the
reference color.

No response information enters these features.

For H02 the recovery is:

| depth \(m\) | positive-kernel mass captured |
|---:|---:|
| 0 / original PEX-3 | 19.98% |
| 1 | 42.35% |
| 2 | 77.25% |
| 3 | 93.04% |
| 4 | **98.42%** |
| 5 | 99.98% |
| 6 | 100.00% |

At \(m=4\), the H02 mechanism lower strength rises from

\[
0.00134443
\]

to

\[
\boxed{0.00662318}.
\]

At \(m=5\):

\[
0.00672843.
\]

The actual positive-kernel mechanism strength is approximately

\[
0.00672959.
\]

Thus finite continuation capacity explains essentially all of the information
that PEX-3 was losing.

---

# 5. Positive H01 control

The already-revealed positive pilot H01 is now also a design-set control.

H01:
\[
h=6,\quad v=(2,2,2),\quad x_0=x_1,
\]

with

\[
A'(0)\approx+0.00213766776.
\]

The same continuation-capacity refinement gives, at depth 4,

\[
\underline E_{\rm cap,4}
\approx
0.000489119.
\]

For negative H02:

\[
\underline E_{\rm cap,4}
\approx
0.00662318.
\]

So the capacity-refined negative mechanism is about

\[
\boxed{13.5\times}
\]

stronger in H02 than in H01.

This does not prove a sign classifier, but it is an encouraging design-set
discrimination.

---

# 6. Perron-Frobenius explanation

The continuation-capacity variable is not an arbitrary machine-learning
feature.

Let \(A\) be the primitive adjacency matrix of the baseline SFT and let

\[
r
\]

be its positive right Perron eigenvector:

\[
Ar=\lambda r.
\]

The Parry transition probability on an allowed edge \(i\to j\) is

\[
P_{ij}
=
\frac{r_j}{\lambda r_i}.
\]

Now define

\[
N_m=A^m\mathbf 1.
\]

Then Perron-Frobenius theory gives

\[
N_m
=
c\lambda^m r+o(\lambda^m).
\]

Therefore, for an allowed edge,

\[
\boxed{
Q_m(i,j)
=
\frac{N_m(j)}{N_{m+1}(i)}
\longrightarrow
P_{ij}.
}
\]

So finite continuation counts are a direct combinatorial approximation to the
Parry transition probability.

This explains the H4/H02 contrast:

- in L3/h4, the short exclusion/equality signature nearly determines the
  relevant future capacity already;
- in L5/H02, states with the same immediate PEX-3 signature can have very
  different longer future trees;
- the missing information is therefore **not another local forbidden-square
  flag**, but how much admissible future remains behind each choice.

---

# 7. Finite projective error lemma

Let

\[
u_m(s)=\frac{N_m(s)}{r_s}
\]

and define the projective spread

\[
R_m=
\frac{\max_s u_m(s)}{\min_s u_m(s)}.
\]

For an allowed edge \(i\to j\),

\[
\frac{Q_m(i,j)}{P_{ij}}
=
\frac{u_m(j)}
{\sum_{\ell}P_{i\ell}u_m(\ell)}.
\]

The denominator is a convex combination of the \(u_m(\ell)\).

Therefore

\[
\boxed{
\frac1{R_m}
\le
\frac{Q_m(i,j)}{P_{ij}}
\le
R_m.
}
\]

Equivalently,

\[
\boxed{
\frac{Q_m(i,j)}{R_m}
\le
P_{ij}
\le
R_m Q_m(i,j).
}
\]

Thus any rigorous projective upper bound on \(R_m\) converts finite
continuation counts into a rigorous transition-probability enclosure.

Birkhoff/Hilbert contraction, already used in the h4 interval certificate,
is a natural way to certify \(R_m\).

This supplies a clean bridge:

\[
\boxed{
\text{finite word-extension counts}
\to
\text{Parry transition bounds}
\to
\text{echo lower bounds}.
}
\]

---

# 8. Baseline convergence comparison

The raw finite-extension proxy

\[
Q_m(i,j)=N_m(j)/N_{m+1}(i)
\]

converges noticeably faster in L3 than in L5.

Mean absolute transition error:

| depth | L3 / h4 baseline | L5 / H02 baseline |
|---:|---:|---:|
| 0 | 0.0592 | 0.1020 |
| 2 | 0.0329 | 0.0657 |
| 3 | 0.0116 | 0.0460 |
| 5 | 0.00961 | 0.01934 |
| 8 | 0.00183 | 0.00882 |

This is consistent with the PEX-3 result:
the longer-memory L5 system retains more unresolved continuation-capacity
variation.

---

# 9. Revised mechanism picture

## H4

\[
\text{singleton/profile geometry}
\]

\[
\Downarrow
\]

\[
\text{K2/K3 exclusion inversion}
\]

\[
\Downarrow
\]

\[
\text{short signature already predicts continuation capacity}
\]

\[
\Downarrow
\]

\[
\text{strong one-endpoint echo}
\]

\[
\Downarrow
\]

\[
\text{sign reversal}.
\]

## H02

\[
\text{profile + positional event}
\]

\[
\Downarrow
\]

\[
\text{mixed within-window and delayed correlations}
\]

\[
\Downarrow
\]

\[
\text{PEX-3 aliases states with different future capacities}
\]

\[
\Downarrow
\]

\[
\text{weak certified echo despite a real negative response}.
\]

Adding finite continuation capacity resolves most of that aliasing.

---

# 10. Candidate next portable rule

The natural design successor is:

## PEX-C4

PEX-3 plus

\[
\boxed{
(N_4(s),N_4(s_{\rm ref})).
}
\]

Why depth 4?

- depth 3 already captures 93.0% of H02 positive-kernel mass;
- depth 4 captures 98.4%;
- deeper choices give diminishing returns;
- choosing depth 4 is now a **design-set decision** and must be frozen before a
  fresh holdout.

PEX-C4 is not claimed as a theorem of optimal depth.

A stronger analytic version would avoid exact cell refinement and instead
use the projective bound

\[
P_{ij}\ge Q_m(i,j)/R_m.
\]

That may ultimately be the cleaner paper theorem.

---

# 11. Epistemic consequence

The H02 pilot did not weaken the h4 mechanism result.

It exposed the exact weakness of PEX-3:

\[
\boxed{
\text{immediate exclusion state} \neq
\text{future continuation capacity}.
}
\]

That failure produced a useful new theoretical object rather than a
post-hoc feature patch.

The next prospective rule must be frozen under a new name and tested only on
fresh non-h8 targets.

No h=8.
