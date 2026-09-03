# Paper 3 Theorem Skeleton v0.1

## Abelian Profile Geometry and Hard Fluctuation Response

**Date:** 2026-08-26  
**Status:** theorem skeleton / research manuscript precursor; not submission-ready.  
**Novelty:** NOT_ESTABLISHED.  
**Scope:** h≤7 evidence only; no h=8 computation.

---

## 1. Proposed paper question

How do symmetry-forced Parikh-profile curvature and the overlap/return geometry of a finite Abelian profile hole jointly determine the change in asymptotic letter-count fluctuations under hard exclusion?

The paper should not be organized around the finite 6/6 versus 9/9 sign observation alone. The target mechanism is

\[
\boxed{
\text{profile geometry}
\to
\text{short Abelian contacts}
\to
\text{baseline-conditioned return geometry}
\to
\text{hard fluctuation response}.
}
\]

---

## 2. Setup

Let \(L_{h-1}\) be the baseline finite-type language avoiding Abelian squares of half-lengths below \(h\). Let \(\mathcal G_v\) be the union of newly completed length-\(2h\) target cylinders whose half-Parikh profile lies in the \(S_3\)-orbit of \(v\).

For an analytic centered color tilt \(t\), define

\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t).
\]

At the symmetry point,

\[
\Delta a_v=-D_v''(0),
\qquad
\eta_v=\frac{\Delta a_v}{D_v(0)}.
\]

The project decomposition to be independently re-derived is

\[
\boxed{
\eta_v=-\frac43B(v)+\Xi_v.
}
\]

---

## 3. Theorem package A — one-step Abelian contacts

### Theorem A1 — shift-1 rigidity

If two length-\(2h\) Abelian-square windows begin one symbol apart, then

\[
\boxed{x_0=x_h=x_{2h}.}
\]

Consequently the raw shift-1 contact graph satisfies

\[
\deg^+,\deg^-\le1.
\]

### Theorem A2 — exact contact-excess identity

For a labeled half-profile \(v\),

\[
\boxed{
d_1(v)=\frac13+\frac{B(v)}{h^2}.
}
\]

Hence

\[
\boxed{
B(v)=h^2\left(d_1(v)-\frac13\right).
}
\]

**Interpretive corollary:** the local term \(-4B/3\) is proportional to negative one-step contact excess.

**Status:** exact project-derived theorem package; novelty audit required.

---

## 4. Theorem package B — two-step Abelian contacts

### Theorem B1 — complete shift-2 classification

Let \(F,M,R\) be the length-2 Parikh vectors of the removed, middle-boundary and appended pairs. Then

\[
R=2M-F.
\]

The only possibilities are

\[
F=M=R
\]

or

\[
F=2e_i,\qquad M=e_i+e_j,\qquad R=2e_j,
\qquad i\ne j.
\]

Therefore

\[
\boxed{\deg^+O_2\le2,\qquad\deg^-O_2\le2.}
\]

### Theorem B2 — unit-transfer resonance

A Type-II successor remains in the same unordered profile orbit iff

\[
\boxed{v_i=v_j+1.}
\]

### Theorem B3 — exact mean shift-2 contact formula

Define

\[
U(v)=\sum_{\substack{i\ne j\\v_i=v_j+1}}v_i^2(v_i-1)v_j.
\]

Then

\[
\boxed{
d_2(v)
=
\frac{
45B^2+(12h^2-36h+18)B-(216h+108)J
+6h^4-4h^3+6h^2+36U(v)
}{18h^2(h-1)^2}.
}
\]

Thus the first two raw contact layers are controlled by

\[
B
\quad\text{and}\quad
(B,J,U).
\]

**Status:** exact project-derived formula; symbolic checks pass for all labeled h=2..7 profiles; clean-room proof/literature audit still required.

---

## 5. Weighted recurrence layer

Existing weighted Markov-hole machinery should be specialized rather than reinvented.

The hard pressure-drop root satisfies a recurrence equation of the form

\[
H_v(z_v(t),t)=0,
\qquad z_v(t)=e^{D_v(t)}.
\]

At symmetry \(z_v'(0)=0\), implicit differentiation gives the candidate exact curvature expression

\[
\eta_v
=
\frac{H_{tt}}
{z_v(0)\log z_v(0)H_z}
\Big|_{(z_v(0),0)}.
\]

The paper must explicitly identify how the following pieces enter \(H_{tt}\):

1. raw shift-1 contact block \(O_1\);
2. raw shift-2 block \(O_2\);
3. baseline admissibility pruning;
4. centered returns beyond the short overlap depths.

No fitting to the exposed 15 signs is permitted in this derivation.

---

## 6. Centered-return certification

Let

\[
P^T=\Pi+Q.
\]

A blocked contraction certificate

\[
\kappa=\|z^bQ^b\|<1
\]

gives an explicit geometric tail enclosure.

This should be used to turn an infinite return expansion into

\[
\boxed{
\text{finite explicitly evaluated return block}
+
\text{rigorous tail interval}.
}
\]

The main technical work is derivative propagation through the weighted scalar/matrix recurrence, not the geometric-series lemma itself.

---

## 7. Main theorem target C — currently OPEN

A successful Paper 3 needs at least one theorem stronger than the finite 15-case observation and genuinely using Abelian structure.

Preferred forms:

### C1 — sufficient sign inequality

A computable inequality in terms of short contacts, baseline pruning and a certified return tail that implies

\[
\eta_v>0
\quad\text{or}\quad
\eta_v<0.
\]

### C2 — profile ordering theorem

For a specified class of profiles \(v,w\), prove

\[
\eta_v<\eta_w
\]

from an Abelian contact/return domination relation.

### C3 — finite-depth mechanism criterion

Show that if the certified finite-depth contribution has margin larger than the tail enclosure, the hard-response sign is fixed.

### C4 — soft-to-hard reorganization theorem

Give a rigorous criterion explaining when local/soft and hard responses have different signs because the surviving continuation geometry reorganizes.

A universal minimum-\(B\) law is **not required**.

---

## 8. Evidence section — discovery only, not theorem proof

Across the existing audited h=2..7 profile family:

- six minimum-\(B\) classes have positive hard response;
- nine remaining classes have negative hard response.

This finite-family pattern motivates the theory but may not be used to fit arbitrary features or to infer a universal law.

---

## 9. Novelty boundary

Generic ingredients already have substantial prior art:

- finite-word correlation matrices;
- Markov/SFT perturbations;
- resolvents/fundamental matrices;
- weighted correlation polynomials;
- pressure/escape-rate machinery;
- covariance and pressure Hessians.

The strongest possible project novelty lies instead in the **Abelian-specific specialization**:

\[
\boxed{
(B,J,U)\text{ short-contact geometry}
+
\text{baseline-conditioned returns}
\to
\text{hard fluctuation-response theorem}.
}
\]

The exact novelty of Theorems A/B is unresolved pending a targeted search for shifted/consecutive Abelian-square overlap formulas.

---

## 10. Required audit before manuscript promotion

1. Clean-room derivation of A1–B3.
2. Convention-by-convention weighted recurrence audit.
3. Independent derivation of \(\eta=-4B/3+\Xi\).
4. Audit whether the scalar \(\phi_v\)/\(\Xi_v\) representation is structurally informative or tautological.
5. Certified blocked-tail implementation in the exact baseline representation.
6. Targeted Abelian-overlap novelty search.
7. Specialist audit of second pressure derivatives under finite forbidden-profile holes.

---

## 11. Current paper verdict

**PAPER3_STATUS = STRONG_CANDIDATE_WITH_OPEN_THEOREM_CORE**

The paper now has an exact Abelian combinatorial mechanism layer. The remaining blocker is a nontrivial theorem controlling the baseline-conditioned dynamical correction \(\Xi_v\).
