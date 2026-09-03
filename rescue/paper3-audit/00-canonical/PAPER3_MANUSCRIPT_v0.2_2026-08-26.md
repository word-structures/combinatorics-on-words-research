# Abelian Profile Geometry and Hard Fluctuation Response

**Research manuscript v0.2 — 2026-08-26**

**Status:** scientifically consolidated draft for independent audit; not yet submission-ready.  
**Novelty status:** NOT_ESTABLISHED.  
**Computational scope:** only the frozen \(h=2,\ldots,7\) family. No \(h=8\) computation.  
**Governance:** no D40 use; no Git mutation in this preparation.

## Abstract

We study the change in asymptotic color-count fluctuations caused by hard exclusion of a complete orbit of Abelian-square targets inside a bounded Abelian-avoidance shift.  For a half-Parikh profile \(v=(v_1,v_2,v_3)\), let
\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t)
\]
be the pressure drop under a centered analytic color tilt and define
\[
\eta_v=-\frac{D_v''(0)}{D_v(0)}.
\]
A previously audited finite family with \(h=2,\ldots,7\) exhibits a sharp sign pattern: all six occurring minimum-imbalance profile classes have positive hard response, while all nine other occurring classes have negative response.  The finite observation is not used as a fitted law.

We derive an Abelian-specific short-contact theory.  Consecutive target windows shifted by one symbol satisfy the rigidity condition
\[
x_0=x_h=x_{2h},
\]
so the shift-one contact relation is a partial permutation and its mean contact density is
\[
d_1(v)=\frac13+\frac{B(v)}{h^2},
\qquad
B(v)=\sum_i\left(v_i-\frac h3\right)^2.
\]
For a shift by two symbols, the complete balance classification has only two types.  In the nontrivial type a same-orbit successor is possible exactly under the unit-transfer resonance \(v_i=v_j+1\).  The exact mean shift-two contact density reduces to the profile invariants \(B\), the centered cubic invariant
\[
J(v)=\prod_i\left(v_i-\frac h3\right),
\]
and a discrete resonance statistic \(U(v)\).

The weighted Markov-hole recurrence separates the hard response into direct shift-one and shift-two contacts and longer baseline-conditioned returns.  We prove a finite-depth certification theorem: a rigorous enclosure of the second color derivative of a finite recurrence together with a certified centered-return tail determines the sign of \(\eta_v\).  In the frozen \(h=6,7\) family, exact enumeration further shows that the combined baseline-pruned shift-one/shift-two support is acyclic for every occurring profile class.  Hence the entire weighted short-contact block is nilpotent and its inverse is an exact finite polynomial; all infinite uncertainty is pushed into the centered-return tail.

The generic correlation, resolvent, escape-rate and perturbation machinery is established prior art.  The possible contribution of this paper is the Abelian-specific reduction
\[
(B,J,U)\text{ short contacts}
+\text{ baseline pruning}
+\text{ certified returns}
\longrightarrow
\text{hard fluctuation-response certification}.
\]

---

## 1. Introduction

Forbidden-pattern perturbations of a finite-state symbolic system are governed by two very different kinds of structure.  The first is local: how a forbidden word overlaps itself and the other forbidden words.  The second is dynamical: how the surviving baseline system can leave a target neighborhood and later return to it.

For ordinary words these structures are encoded by correlation polynomials, Markov fundamental matrices, resolvents, and recurrence systems.  These general objects are well established.  Our question is more specific.

The newly forbidden words are not arbitrary.  They are precisely the length-\(2h\) Abelian squares whose two halves have a prescribed Parikh profile orbit.  This symmetry forces unexpectedly rigid short-overlap geometry.  The purpose of this paper is to expose that geometry and connect it to the second pressure derivative of the hard-deleted system.

The guiding chain is
\[
\boxed{
\text{profile geometry}
\to
\text{short Abelian contacts}
\to
\text{baseline-conditioned returns}
\to
\text{hard fluctuation response}.
}
\]

The paper does **not** claim a universal minimum-\(B\) sign law.

---

## 2. Baseline shifts and hard profile holes

Let \(\Sigma=\{a,b,c\}\).  For \(h\ge2\), let \(L_{h-1}\) denote the finite-type language obtained by forbidding Abelian squares of half-length
\[
2,3,\ldots,h-1.
\]
(For the smallest cases the evident empty-range convention is used.)

Fix a half-Parikh profile
\[
v=(v_1,v_2,v_3),
\qquad v_1+v_2+v_3=h,
\]
and let \(\mathcal G_v\) be the union of baseline-admissible length-\(2h\) target cylinders whose two halves have equal Parikh vector lying in the \(S_3\)-orbit of \(v\).

Let \(P_{\rm base}(t)\) and \(P_{\rm hard,v}(t)\) denote the pressures of the baseline and the hard-deleted system under a centered analytic color tilt \(t\).  Define
\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t).
\]
At \(t=0\),
\[
D_v(0)>0
\]
for a nonempty effective hole.

Let
\[
\Delta a_v=a_{\rm hard,v}-a_{\rm base}.
\]
Since asymptotic variance is the second pressure derivative,
\[
\Delta a_v=-D_v''(0).
\]
We normalize by the hard pressure cost:
\[
\boxed{
\eta_v=\frac{\Delta a_v}{D_v(0)}
      =-\frac{D_v''(0)}{D_v(0)}.
}
\]

The \(S_3\)-symmetric baseline and complete profile orbit imply
\[
D_v'(0)=0.
\]

---

## 3. Profile invariants

Define
\[
B(v)=\sum_{i=1}^3\left(v_i-\frac h3\right)^2
\]
and
\[
J(v)=\prod_{i=1}^3\left(v_i-\frac h3\right).
\]

The project decomposition, independently to be rechecked from the pressure path, is
\[
\eta_v=-\frac43B(v)+\Xi_v,
\]
where \(\Xi_v\) records the dynamical correction.  The main point of the next sections is that \(B\), and then \(B,J\) together with a discrete resonance invariant, arise directly from target overlap geometry.

---

## 4. Shift-one rigidity

Consider two length-\(2h\) Abelian-square windows beginning one position apart.  Subtracting their two Parikh-balance equations gives
\[
2e_{x_h}=e_{x_0}+e_{x_{2h}}.
\]
Since the \(e_x\) are standard basis vectors,
\[
\boxed{x_0=x_h=x_{2h}.}
\]

### Theorem 4.1 — shift-one contact graph

For any fixed profile orbit, the raw shift-one target contact graph \(O_1\) satisfies
\[
\boxed{\deg^+O_1\le1,\qquad \deg^-O_1\le1.}
\]

Thus \(O_1\) is a disjoint union of directed paths and directed cycles.

### Theorem 4.2 — exact mean shift-one contact

Let the two halves be independently uniformly permuted words with labeled profile \(v\).  Then
\[
d_1(v)
=
\Pr[X_1=Y_1]
=
\sum_i\left(\frac{v_i}{h}\right)^2.
\]
Hence
\[
\boxed{
d_1(v)=\frac13+\frac{B(v)}{h^2}
}
\]
and equivalently
\[
\boxed{
B(v)=h^2\left(d_1(v)-\frac13\right).
}
\]

Thus the quadratic imbalance invariant \(B\) is exactly the excess one-step Abelian contact density above the balanced ternary value \(1/3\).

---

## 5. Shift-two classification

Shift a target window by two symbols.  Let

- \(F\) be the Parikh vector of the two removed symbols,
- \(M\) the Parikh vector of the two symbols crossing the old half boundary,
- \(R\) the Parikh vector of the two appended symbols.

Subtracting the two balance constraints gives
\[
\boxed{R=2M-F.}
\]

A length-two Parikh vector over a ternary alphabet is either \(2e_i\) or \(e_i+e_j\), \(i\ne j\).  The nonnegativity condition on \(R\) leaves only the following possibilities.

### Type I
\[
\boxed{F=M=R.}
\]

### Type II
For distinct \(i,j\),
\[
\boxed{
F=2e_i,\qquad
M=e_i+e_j,\qquad
R=2e_j.
}
\]

Therefore
\[
\boxed{
\deg^+O_2\le2,\qquad
\deg^-O_2\le2.
}
\]

### Theorem 5.1 — unit-transfer resonance

A Type-II shifted target remains in the same unordered half-profile orbit if and only if
\[
\boxed{v_i=v_j+1.}
\]

Indeed the shifted first-half profile is \(v-e_i+e_j\); its multiset of coordinates equals that of \(v\) exactly when the two affected coordinates are consecutive integers in the indicated direction.

---

## 6. Exact mean shift-two contact

Define
\[
U(v)=
\sum_{\substack{i\ne j\\v_i=v_j+1}}
v_i^2(v_i-1)v_j.
\]

Direct counting of ordered shift-two continuations gives
\[
d_2(v)
=
\frac{
\sum_i v_i^2(v_i-1)^2
+
8\sum_{i<j}v_i^2v_j^2
+
2U(v)
}{
h^2(h-1)^2
}.
\]

Reducing the symmetric polynomial part to \(B\) and \(J\) yields:

### Theorem 6.1 — invariant shift-two formula
\[
\boxed{
d_2(v)
=
\frac{
45B^2
+(12h^2-36h+18)B
-(216h+108)J
+6h^4-4h^3+6h^2
+36U(v)
}{
18h^2(h-1)^2
}.
}
\]

Hence the short-contact hierarchy is
\[
\boxed{
\text{shift 1}\Rightarrow B,
\qquad
\text{shift 2}\Rightarrow(B,J,U).
}
\]

The formulas have been independently exhaustively checked for all 116 labeled profiles with \(h=2,\ldots,7\).  This computation is a verification of the formulas, not evidence for larger \(h\).

---

## 7. Weighted Markov-hole recurrence

A length-\(2h\) target becomes a path of exactly three transitions in the natural \((2h-3)\)-memory baseline presentation.  Therefore, before the baseline return part, only two direct target-target overlap depths exist:

- shift 1,
- shift 2.

All longer interactions are returns through the baseline dynamics.

For a Markov hole determined by a finite reduced collection of allowed words, the weighted recurrence framework of Agarwal, Cheriyath and Tikekar expresses the survival generating functions through a finite linear system built from the baseline Markov matrix and weighted correlation polynomials.  Equivalently, after elimination, the pressure-drop root is a zero of a finite analytic determinant.

We write this convention-independently as
\[
\boxed{
H_v(z_v(t),t)=0,
\qquad
z_v(t)=e^{D_v(t)}.
}
\]

The generic recurrence machinery is prior art.  The Abelian specialization is that the direct correlation part contains only the exact \(O_1\) and \(O_2\) layers above, followed by baseline-conditioned returns.

---

## 8. Hard curvature from the recurrence determinant

At the symmetric point,
\[
z_v'(0)=0.
\]
Differentiate
\[
H_v(z_v(t),t)=0
\]
twice:
\[
H_z z_v''+H_{tt}=0.
\]
Hence
\[
z_v''(0)=-\frac{H_{tt}}{H_z}.
\]

Since \(D_v=\log z_v\) and \(z_v'(0)=0\),
\[
D_v''(0)=\frac{z_v''(0)}{z_v(0)}.
\]
Therefore:

### Theorem 8.1 — recurrence-curvature identity

If the hard root is simple,
\[
H_z(z_v(0),0)\ne0,
\]
then
\[
\boxed{
\eta_v
=
\frac{
H_{tt}
}{
z_v(0)\log z_v(0)\,H_z
}
\Bigg|_{(z_v(0),0)}.
}
\]

This identity is invariant under multiplying \(H_v\) by any nonvanishing analytic factor.

---

## 9. Centered-return decomposition and blocked tail

Let \(P\) be the baseline Parry/Doob transition matrix in a fixed compatible presentation and write
\[
P^T=\Pi+Q,
\]
where \(\Pi\) is the stationary rank-one projector and \(Q\) is centered:
\[
Q\Pi=\Pi Q=0.
\]

Then
\[
(I-zP^T)^{-1}
=
\frac{\Pi}{1-z}
+
(I-zQ)^{-1}(I-\Pi).
\]

Whenever the centered series converges,
\[
(I-zQ)^{-1}(I-\Pi)
=
\sum_{n\ge0}z^nQ^n(I-\Pi).
\]

### Lemma 9.1 — blocked geometric tail

Let \(\|\cdot\|\) be submultiplicative.  If for some block length \(b\),
\[
\kappa=\|z^bQ^b\|<1,
\]
and
\[
C_b=\sum_{r=0}^{b-1}\|z^rQ^r(I-\Pi)\|,
\]
then for every \(m\ge0\),
\[
\boxed{
\left\|
\sum_{n\ge mb}z^nQ^n(I-\Pi)
\right\|
\le
\frac{C_b\kappa^m}{1-\kappa}.
}
\]

This is a standard blocked geometric-series estimate; its role here is to convert an infinite baseline return series into a finite return prefix plus an explicit enclosure.

---

## 10. Finite-depth curvature certification

Let the exact recurrence matrix, determinant or Schur-complement representation be separated into

\[
\text{explicit finite part}
+
\text{centered-return tail}.
\]

Assume the tail is analytic on a complex color disc \(|t|\le r\) and has uniform norm bound
\[
\sup_{|t|\le r}\|E(t)\|\le\epsilon.
\]
Cauchy estimates imply
\[
\|E_t(0)\|\le\frac{\epsilon}{r},
\qquad
\|E_{tt}(0)\|\le\frac{2\epsilon}{r^2}.
\]

For an inverse-compressed scalar
\[
\phi(t)=\ell^TB(t)^{-1}m(t),
\]
the exact second derivative is
\[
\phi_{tt}
=
\ell^T
\left[
2GB_tGB_tGm
-
GB_{tt}Gm
-
2GB_tGm_t
+
Gm_{tt}
\right],
\qquad G=B^{-1}.
\]

The Banach perturbation lemma and the resolvent identity therefore give an explicit computable interval
\[
H_{tt}\in
[\widetilde H_{tt}-\mathcal E,
 \widetilde H_{tt}+\mathcal E]
\]
from a finite calculation, provided the finite inverse margin dominates the tail norm.

This yields the paper's main certification statement.

### Theorem 10.1 — finite-depth Abelian hard-response criterion

Fix an Abelian profile hole \(\mathcal G_v\).  Suppose:

1. the weighted Markov-hole recurrence is evaluated in a compatible finite presentation;
2. the relevant hard root \(z_v>1\) is simple;
3. a finite direct-contact/return computation gives intervals for \(H_z\) and \(H_{tt}\);
4. the omitted centered-return contribution and its first two color derivatives are enclosed by a certified blocked analytic tail;
5. the resulting intervals exclude zero:
   \[
   0\notin[H_z^-,H_z^+],
   \qquad
   0\notin[H_{tt}^-,H_{tt}^+].
   \]

Then the sign of the hard fluctuation response is rigorously determined by
\[
\boxed{
\operatorname{sgn}\eta_v
=
\operatorname{sgn}
\left(
\frac{H_{tt}}{H_z}
\right),
}
\]
because \(z_v\log z_v>0\).

Thus a finite-depth Abelian mechanism calculation whose margin exceeds the certified return tail is a complete computer-assisted sign proof.

This theorem is deliberately weaker than a universal minimum-\(B\) law and stronger than a bare finite numerical sign observation.

---

## 11. Short-contact nilpotency in the frozen \(h=6,7\) family

Let
\[
G_{\rm short,v}
=
\operatorname{supp}(O_{1,v})
\cup
\operatorname{supp}(O_{2,v}).
\]

Exact exhaustive enumeration of the baseline-admissible target sets gives:

| \(h\) | profile | target count | short edges | longest directed path |
|---:|---|---:|---:|---:|
| 6 | \((4,1,1)\) | 90 | 78 | 5 |
| 6 | \((3,2,1)\) | 720 | 372 | 11 |
| 6 | \((2,2,2)\) | 126 | 30 | 1 |
| 7 | \((5,1,1)\) | 12 | 6 | 1 |
| 7 | \((4,2,1)\) | 180 | 54 | 1 |
| 7 | \((3,3,1)\) | 756 | 360 | 3 |
| 7 | \((3,2,2)\) | 1344 | 402 | 7 |

Every one of these seven combined short-contact graphs is acyclic.

Let
\[
N_v(z,t)=zO_{1,v}(t)+z^2O_{2,v}(t).
\]

### Theorem 11.1 — exact short-block nilpotency

If the support graph has longest directed path \(d\), then
\[
\boxed{N_v^{d+1}=0}
\]
for every analytic choice of edge weights on the same support.

Consequently
\[
\boxed{
(I+N_v)^{-1}
=
\sum_{j=0}^{d}(-N_v)^j.
}
\]

For the seven frozen \(h=6,7\) profile classes the nilpotency exponents \(d+1\) are
\[
6,\ 12,\ 2,\ 2,\ 2,\ 4,\ 8.
\]

This is a decisive simplification: the whole direct Abelian overlap inverse is finite and exact; only the baseline-conditioned centered-return block requires an infinite-tail certificate.

The analogous combined graph is **not** acyclic throughout the smaller \(h\) family, so no universal-in-\(h\) acyclicity claim is made.

---

## 12. Cyclic interpretation of shift-one cycles

A shift-one edge is a one-position cyclic rotation.  Therefore a directed \(O_1\)-cycle corresponds to a target \(XX\) whose rotation orbit remains baseline admissible.  Equivalently, the half-word \(X\) is cyclically Abelian-square-free below its own length in the sense of cyclic Abelian-power avoidance.

This connects the overlap graph to the cyclic avoidance framework of Peltomäki and Whiteland.  The cyclic-avoidance notion is prior art; the use here is as an interpretation of a recurrence contact cycle.

Exact ternary enumeration gives zero such half-words at lengths \(5,6,7\), while smaller lengths do contain them.  These counts are supporting finite-family structure, not an asymptotic theorem.

---

## 13. Frozen finite-family evidence

The durable \(h=2,\ldots,7\) profile-response evidence contains exactly fifteen occurring canonical profile classes:
\[
[2,2,1,3,3,4]
\]
classes at \(h=2,3,4,5,6,7\), respectively.

Using
\[
B(v)=\sum_i(v_i-h/3)^2,
\]
the observed hard-response signs satisfy:

- all \(6/6\) occurring minimum-\(B\) profile classes have \(\Delta a_v>0\);
- all \(9/9\) other occurring profile classes have \(\Delta a_v<0\).

The hard responses were checked by independent numerical variance methods in the durable package, with selected pressure-curvature spot checks.

This section is **evidence**, not the proof of Theorem 10.1 and not a universal law.

---

## 14. Interpretation of the dynamic correction

The internal decomposition
\[
\eta_v=-\frac43B(v)+\Xi_v
\]
should be read as follows.

The first short layer has exact mean
\[
d_1(v)-\frac13=\frac{B(v)}{h^2},
\]
so the quadratic profile term has an explicit one-step contact interpretation.

The second short layer introduces
\[
B,\quad J,\quad U.
\]

The remaining quantity \(\Xi_v\) is the difference between these short raw contact propensities and the actual baseline-conditioned, all-return, weighted geometry.

Thus the right causal object is not \(B\) alone:
\[
\boxed{
(B,J,U)
+
\text{baseline admissibility}
+
\text{returns}.
}
\]

---

## 15. Prior art and novelty boundary

The following ingredients are not claimed as new:

- correlation and autocorrelation polynomials for words;
- multi-word correlation matrices;
- Markov weighted correlation polynomials;
- higher-block presentations;
- SFT perturbations by forbidden words;
- escape rates as spectral radii / pressure drops;
- Markov fundamental matrices and resolvents;
- covariance/first-two-moment formulas in terms of pattern correlation matrices;
- Banach/Neumann perturbation estimates;
- Cauchy derivative bounds;
- cyclic Abelian-power avoidance as a notion.

Relevant prior-art clusters include Guibas--Odlyzko, Rukhin, Ramsey, Agarwal--Cheriyath--Tikekar, Bonanno--Cristadoro--Lenci, and Peltomäki--Whiteland.

The potentially new part is the **combination specific to Abelian profile holes**:

1. exact shift-one rigidity and contact-excess identity;
2. exact shift-two Type I/II classification;
3. unit-transfer resonance;
4. exact \(B,J,U\) mean contact formula;
5. finite-depth hard-response certification after Abelian short-contact reduction;
6. exact nilpotency of the combined short block in the frozen \(h=6,7\) profile family.

A targeted literature search performed during manuscript consolidation found extensive work on Abelian repetitions, correlation matrices, Markov holes, and cyclic Abelian avoidance, but no direct source for the exact profile-orbit formulas above.  This absence is **not** a proof of novelty.

\[
\boxed{\text{NOVELTY STATUS = NOT\_ESTABLISHED}.}
\]

---

## 16. What is proved, checked, and still external-audit dependent

### Exact mathematical derivations in this manuscript

- shift-one rigidity;
- \(O_1\) degree bounds;
- \(d_1=1/3+B/h^2\);
- complete shift-two classification;
- \(O_2\) degree bounds;
- unit-transfer resonance;
- exact \(d_2(h,B,J,U)\) formula;
- recurrence-curvature identity under a simple root;
- blocked geometric tail;
- finite-depth sign criterion;
- acyclic-support \(\Rightarrow\) nilpotent short block.

### Exact finite computations

- direct/invariant short-contact agreement for all 116 labeled profiles at \(h=2,\ldots,7\);
- baseline-pruned \(O_1\cup O_2\) acyclicity for every occurring \(h=6,7\) profile class;
- the table of target counts, edge counts and longest path lengths above.

### Durable numerical evidence

- fifteen occurring canonical hard-response profile classes;
- \(6/6\) minimum-\(B\) positive and \(9/9\) other negative;
- independent variance-method agreement and selected pressure-curvature checks in the frozen evidence package.

### Required before submission

- clean-room audit of the shift-two counting algebra and the \(d_2\) invariant reduction;
- convention-by-convention implementation audit when Theorem 10.1 is used for a concrete certified sign;
- specialist novelty audit;
- reproduction appendix with hashes/commands from the durable profile-response package;
- independent review of any future interval implementation of Theorem 10.1.

These are audit and packaging tasks, not missing conceptual pieces of the manuscript.

---

## 17. Conclusion

Hard exclusion of an Abelian profile orbit has a natural hierarchy.

At one shift, the only profile statistic that appears is the quadratic imbalance \(B\).  At two shifts, the geometry necessarily expands to \(B,J\) and the discrete unit-transfer resonance \(U\).  Beyond two shifts, all interactions are baseline-conditioned returns.

This yields the structural decomposition
\[
\boxed{
\text{short Abelian geometry}
+
\text{conditioned return geometry}
=
\text{hard fluctuation response}.
}
\]

The finite-depth certification theorem turns this picture into a rigorous proof architecture: compute the exact short and finite-return part, enclose the centered tail, and use the recurrence curvature identity to certify the sign.  In the frozen \(h=6,7\) family, short-contact acyclicity makes the direct Abelian component especially rigid: it is nilpotent and therefore exactly finite.

The observed \(6/6\) versus \(9/9\) sign split remains a motivating finite phenomenon rather than a universal conjecture.  The paper's mathematical claim is the mechanism and certification architecture that explains how such sign behavior can be decided from Abelian contact structure plus returns.

---

## References

1. N. Agarwal, H. Cheriyath, S. N. Tikekar, *Escape Rate for Shifts with Markov Measure*, Journal of the Australian Mathematical Society 121 (2026), 1--27. DOI: 10.1017/S144678872610158X.

2. A. L. Rukhin, *Pattern Correlation Matrices and Their Properties*, Linear Algebra and its Applications 327 (2001), 105--114. DOI: 10.1016/S0024-3795(00)00316-5.

3. A. L. Rukhin, *Pattern Correlation Matrices for Markov Sequences and Tests of Randomness*, Theory of Probability and Its Applications 51 (2007), 663--679. DOI: 10.1137/S0040585X97982670.

4. A. L. Rukhin, *Joint Distribution of Pattern Frequencies and Multivariate Pólya--Aeppli Law*, Theory of Probability and Its Applications 54 (2010), 246--260. DOI: 10.1137/S0040585X97984115.

5. N. Ramsey, *Perturbing Subshifts of Finite Type: Two Words*, arXiv:1902.03352 (2019).

6. N. Ramsey, *Entropy Bounds for Multi-word Perturbations of Subshifts*, Ergodic Theory and Dynamical Systems 44 (2024), 665--673. DOI: 10.1017/etds.2023.19.

7. J. Peltomäki, M. A. Whiteland, *Avoiding Abelian Powers Cyclically*, Advances in Applied Mathematics 121 (2020), 102095. DOI: 10.1016/j.aam.2020.102095.

8. G. Fici, M. Puzynina, *Abelian Combinatorics on Words: A Survey*, Computer Science Review 47 (2023), 100532.
