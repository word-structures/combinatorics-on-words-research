# CLAUDE AUDIT MASTER — FINAL V3 — 2026-08-26

**This supersedes the V2 master for research-state handoff.**

Repository mutation: NONE.  
Do not compute h=8.  
Do not use D40.  
Novelty: NOT_ESTABLISHED.

---

<!-- BEGIN 28_V3_CANONICAL_RESEARCH_STATE_2026-08-26.md -->

# V3 Canonical Research State — 2026-08-26

**Project:** Word Structures / bounded Abelian-square research  
**Purpose:** canonical checkpoint after recovery from the broken conversation context.  
**Repository mutation:** NONE.  
**h=8:** DO NOT COMPUTE.  
**D40:** DO NOT USE.  
**Novelty:** NOT_ESTABLISHED unless explicitly stated otherwise.

This file supersedes the V2-level research-state descriptions for planning. It does not overwrite or silently promote any theorem into the repository.

---

## 1. Paper portfolio — canonical separation

### Paper 1 — Long-range Abelian collisions under bounded local avoidance

**Status:** mature independent manuscript line; keep separate from Papers 2 and 3.

Core chain:

\[
\text{bounded avoidance}
\to
\text{finite-state presentation}
\to
\text{folded/product process}
\to
\text{endpoint-uniform LLT}
\to
R_n^{(h)}\sim C_h/n.
\]

This line already has its own manuscript/referee history. No V3 hard-response material should be imported into it without a theorem-level reason.

### Paper 2 — Continuation capacity and delayed variance response in forbidden-pattern shifts

**Status:** working manuscript exists; current manuscript-level theorem claims remain the soft-response claims.

Object:

\[
A_\varepsilon=A_0e^{-\varepsilon g},
\qquad
 a'(0).
\]

Current spine:

\[
\text{local pattern geometry}
\to
\text{continuation capacity}
\to
\text{delayed correlation}
\to
\text{variance-response sign}.
\]

V3 adds a stronger interpretation but does not yet automatically change the manuscript theorem statements:

\[
\boxed{
\text{finite continuation depth}
\approx
\text{truncated centered return series}
}
\]

and, once a block contraction is certified,

\[
\boxed{
\text{finite continuation contribution}
+
\text{certified delayed tail}.
}
\]

The h4 sign reversal can therefore be interpreted as competition between direct/local terms and sufficiently deep return terms. This upgrade is **not yet manuscript-promoted**.

### Paper 3 — Abelian Profile Geometry and Hard Fluctuation Response

**Status:** strong active paper candidate; theorem skeleton now justified, but the main mechanism theorem remains open.

Object:

\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t),
\]

\[
\Delta a_v=-D_v''(0),
\qquad
\eta_v=\frac{\Delta a_v}{D_v(0)}.
\]

Central decomposition:

\[
\boxed{
\eta_v=-\frac43 B(v)+\Xi_v.
}
\]

The decisive V3 change is that the local Abelian mechanism is no longer only an algebraic invariant observation: it has an exact short-contact interpretation.

### Track 4 — Block Assembly / Abelian Contact Graphs / Mäkelä route

**Status:** active controlled search program, not a solved theorem and not yet a standalone paper.

The naive unrestricted finite contact-graph idea is insufficient globally. The refined architecture is:

\[
\boxed{
\text{finite local contact constraints}
+
\text{nonperiodic macro rule}
+
\text{finite affine-template certificate}.
}
\]

The current concrete macro core is the Rao–Rosenfeld \(h_6^\omega(a)\) construction with a six-role ternary length-40 coding target.

---

## 2. Paper 3 — exact V3 short-contact package

Fix a labeled half-Parikh profile

\[
v=(v_1,v_2,v_3),\qquad v_1+v_2+v_3=h,
\]

and centered profile invariants

\[
B(v)=\sum_i\left(v_i-\frac h3\right)^2,
\qquad
J(v)=\prod_i\left(v_i-\frac h3\right).
\]

### 2.1 Shift 1

The shifted length-\(2h\) window is again an Abelian square iff

\[
\boxed{x_0=x_h=x_{2h}.}
\]

Therefore the raw shift-1 contact graph satisfies

\[
\boxed{\deg^+O_1\le1,\qquad \deg^-O_1\le1.}
\]

For independent uniformly permuted halves with profile \(v\),

\[
\boxed{
d_1(v)=\frac13+\frac{B(v)}{h^2}.
}
\]

Equivalently,

\[
\boxed{
B(v)=h^2\left(d_1(v)-\frac13\right).
}
\]

**Interpretation:** \(B\) is exactly the one-step raw contact excess over the balanced ternary baseline.

### 2.2 Shift 2

Let \(F\) be the Parikh vector of the two removed symbols, \(M\) the two symbols crossing the old half boundary, and \(R\) the two appended symbols. Then

\[
R=2M-F.
\]

The only possibilities are:

**Type I**

\[
F=M=R,
\]

or, for distinct \(i,j\),

**Type II**

\[
F=2e_i,
\qquad
M=e_i+e_j,
\qquad
R=2e_j.
\]

Hence

\[
\boxed{\deg^+O_2\le2,\qquad \deg^-O_2\le2.}
\]

For Type II to remain in the same unordered profile orbit, the necessary and sufficient unit-transfer condition is

\[
\boxed{v_i=v_j+1.}
\]

Define

\[
U(v)=
\sum_{\substack{i\ne j\\v_i=v_j+1}}
v_i^2(v_i-1)v_j.
\]

The exact raw mean shift-2 contact count is

\[
\boxed{
d_2(v)
=
\frac{
45B^2+(12h^2-36h+18)B-(216h+108)J
+6h^4-4h^3+6h^2+36U(v)
}{
18h^2(h-1)^2
}.
}
\]

Thus the short-contact invariant hierarchy is

\[
\boxed{
\text{shift 1}\Rightarrow B,
\qquad
\text{shift 2}\Rightarrow B,J,U.
}
\]

### 2.3 Reproducibility status

`26_V3_STRUCTURAL_REPRODUCIBILITY.py` checks the short-contact identities for every labeled ternary profile with \(h=2,\ldots,7\), a total of **116 profiles**. The supplied output records PASS and explicitly states that no \(h=8\) profile was evaluated.

**Epistemic status:** exact/project-derived formulas + exact symbolic finite-family verification.  
**Novelty status:** NOT_ESTABLISHED; independent literature audit still required.

---

## 3. Paper 3 — weighted hard-response layer

The existing weighted Markov-hole recurrence can carry the project's analytic color tilt. Under the symmetry/regularity conditions used in the addendum,

\[
H_v(z_v(t),t)=0,
\qquad
z_v(t)=e^{D_v(t)},
\]

with \(z_v'(0)=0\), giving the candidate curvature formula

\[
\boxed{
\eta_v
=
\frac{H_{tt}}
{z_v(0)\log z_v(0)\,H_z}
\Big|_{(z_v(0),0)}.
}
\]

Independent numerical sanity checks in small cases agree with direct hard pressure-curvature calculations. This is not yet a clean-room theorem audit.

The scalar reduction and the candidate structural formula for \(\Xi_v\) remain theorem candidates, not promoted facts.

---

## 4. Paper 3 — blocked centered-return tail

Write

\[
P^T=\Pi+Q,
\qquad Q\Pi=\Pi Q=0.
\]

If for some block length \(b\),

\[
\kappa=\|z^bQ^b\|<1,
\]

then the centered-return tail has an explicit geometric enclosure. This supplies the rigorous architecture

\[
\boxed{
\text{finite return depth}
+
\text{certified centered-return tail}.
}
\]

The geometric-series lemma itself is standard and closed. The remaining project work is:

1. certify \(\kappa<1\) in the exact baseline representation;
2. propagate the interval through the weighted recurrence / scalar \(\phi_v\) formula;
3. enclose the first and second color derivatives required for \(\eta_v\).

---

## 5. The actual Paper 3 theorem gap

The old statement

> derive the shift-2 formula

is obsolete. That formula is already in the V3 package.

The current main gap is:

\[
\boxed{
\Xi_v
=
\Xi(\text{baseline-pruned Abelian contact geometry + all centered returns})
}
\]

with enough control to prove at least one genuinely Abelian-specific statement:

- a sign condition;
- an ordering condition;
- an explicit sufficient inequality;
- a certified finite-depth mechanism criterion;
- a soft-to-hard sign-reorganization criterion.

The target need **not** be a universal minimum-\(B\) law.

The correct research chain is now

\[
\boxed{
(B,J,U)\text{ raw contacts}
\to
\text{baseline admissibility pruning}
\to
\text{weighted centered returns}
\to
\Xi_v
\to
\text{hard-response theorem}.
}
\]

---

## 6. Track 4 — affine boundary-template reduction

For a constant-length ternary block coding \(H:\Gamma\to\Sigma^L\), an output Abelian square can be reduced exactly to

\[
\boxed{
M\bigl(\Psi_\Gamma(V)-\Psi_\Gamma(U)\bigr)+\beta=0,
}
\]

where \(U,V\) are adjacent equal-length macro factors and \(\beta\) belongs to a finite correction set determined by phases and boundary letters.

After dropping one redundant ternary coordinate, every output Abelian square corresponds to one of finitely many affine additive-square templates in \(\mathbb Z^2\).

This is closely related to established morphic template machinery and is not claimed as a new template theory.

### Bare contact-graph obstruction

A finite directed graph with semantics "every directed path is allowed" cannot globally enforce nontrivial Abelian-square-freedom on all infinite fixed-length assemblies: arbitrarily long paths force a directed cycle, repeating the cycle gives a periodic output, and a periodic output contains ordinary squares.

Therefore the refined architecture is necessarily more than a bare finite graph.

---

## 7. Track 4 — concrete h6 / length-40 role reduction

Use the Rao–Rosenfeld macro word \(h_6^\omega(a)\), whose allowed macro bigrams form a 14-element set.

Starting from their ternary length-10 coding \(g_3\), the affine incidence lift

\[
M'=M_{g_3}+u\mathbf1^T,
\qquad
u=(10,10,10)^T
\]

produces six length-40 Parikh roles:

\[
\begin{array}{c|ccc}
a&15&14&11\\
b&11&12&17\\
c&10&14&16\\
d&12&10&18\\
e&13&16&11\\
f&19&11&10
\end{array}
\]

and preserves the kernel of \(M_{g_3}\) exactly.

Since an Abelian square with half-length \(2\le K\le5\) has total length at most 10, it can meet at most two consecutive length-40 images. Therefore all small periods \(2,3,4,5\) can be checked locally on:

- six individual block images;
- the 14 allowed image seams.

The resulting search architecture is:

1. choose six ternary length-40 blocks with the prescribed Parikh roles;
2. certify period-2..5 safety on the six images and 14 seams;
3. inherit the kernel condition;
4. run the established long-template certifier for periods \(>5\).

If a coding passes all gates, its output would solve the ternary period-\(\ge2\) Mäkelä problem. **No such coding has been found in the current packet.**

---

## 8. Literature/governance correction that must remain frozen

The project must not treat the ambiguous Rao 2015 sentence as settling Mäkelä's ternary question. The safe current reading is that Rao–Rosenfeld prove the weaker positive threshold \(>5\), while the original period-\(\ge2\) ternary question is not marked solved by the current sources.

Governance constraints:

- no h=8 response/profile/Perron computation;
- no D40 search/use;
- no arbitrary predictor fitting to the exposed 15 signs;
- no novelty promotion from absence-of-hit searches;
- no Git mutation from this recovery/package work.

---

## 9. Immediate research order

### P3-1 — independent proof audit of the V3 short-contact package

Re-derive \(d_1\), the shift-2 classification, the unit-transfer condition, and the exact \(d_2(B,J,U)\) formula clean-room.

### P3-2 — exact weighted recurrence bookkeeping

Identify where the following enter the second color derivative:

- raw shift-1 \(B\)-contact;
- raw shift-2 \(B,J,U\)-contact;
- baseline admissibility pruning;
- centered returns.

### P3-3 — certify a blocked tail

Produce an exact block contraction certificate and propagate it through the response formula.

### P3-4 — theorem attempt

Prove or refute a nontrivial Abelian-specific sign/order/sufficient-condition theorem for \(\eta_v\) or \(\Xi_v\).

### BA-1 — audit the h6/40-role reduction

Independently verify the 14 macro bigrams, the incidence matrix, kernel-preserving lift, local small-period gate, and compatibility with the long-template theorem.

### BA-2 — only after the audit, formulate the six-role constraint search

No D40 use. Candidate methods may include SAT/CP-SAT, exact cover, seam-signature meet-in-the-middle, or stochastic generation followed by exact verification.

---

## 10. Canonical one-line checkpoint

\[
\boxed{
\text{Paper 3 has a real exact Abelian short-contact theorem package; the open core is certified control of }\Xi_v.
}
\]

\[
\boxed{
\text{Track 4 has a concrete six-role length-40 reduction; the missing breakthrough is an actual certified coding }H.
}
\]

<!-- END 28_V3_CANONICAL_RESEARCH_STATE_2026-08-26.md -->

---

<!-- BEGIN 29_PAPER_OPPORTUNITY_REGISTRY_V3_2026-08-26.md -->

# Paper Opportunity Registry — V3 — 2026-08-26

**Purpose:** preserve the three distinct scientific papers and the separate Mäkelä/Block-Assembly research track after the V3 recovery.

**Global constraints:** no Git mutation; no h=8 computation; no D40 use; novelty remains NOT_ESTABLISHED unless independently established.

---

## Paper 1 — Long-range Abelian collisions under bounded local avoidance

**Status:** mature manuscript line.

**Core contribution:** bounded local Abelian-square avoidance defines finite-type languages in which long adjacent equal-Parikh collisions have a \(C_h/n\) asymptotic; the certified finite family is non-monotone in the cutoff and has a structural turn at h=5.

**Current action:** editorial/canonical manuscript work only. Do not merge Paper 2/3 mechanism material into it.

---

## Paper 2 — Continuation Capacity and Delayed Variance Response in Forbidden-Pattern Shifts

**Status:** working manuscript; soft-response paper.

**Object:**

\[
A_\varepsilon=A_0e^{-\varepsilon g},\qquad a'(0).
\]

**Current manuscript spine:**

\[
\text{local pattern geometry}
\to
\text{continuation capacity}
\to
\text{delayed correlation}
\to
\text{variance-response sign}.
\]

**V3 analytic upgrade candidate:**

\[
\text{finite continuation depth}
\approx
\text{truncated centered return series},
\]

with a possible rigorous form

\[
\text{finite contribution}+\text{certified blocked tail}.
\]

**Important boundary:** the hard 15-profile phenomenon belongs to Paper 3, not Paper 2.

**Next manuscript decision:** after independent audit, either add a compact return/resolvent interpretation as theory, or leave it as future work if it does not materially sharpen the present theorem package.

---

## Paper 3 — Abelian Profile Geometry and Hard Fluctuation Response

**Status:** strong paper candidate; first theorem skeleton warranted; main mechanism theorem still open.

**Object:** complete hard exclusion of a profile orbit.

\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t),
\qquad
\eta_v=-\frac{D_v''(0)}{D_v(0)}.
\]

**Central decomposition:**

\[
\eta_v=-\frac43B(v)+\Xi_v.
\]

### Closed/project-derived V3 combinatorial layer

- shift-1 criterion \(x_0=x_h=x_{2h}\);
- \(O_1\) degree at most 1;
- \(d_1(v)=1/3+B/h^2\);
- exact shift-2 Type I/II classification;
- \(O_2\) degree at most 2;
- same-profile Type-II condition \(v_i=v_j+1\);
- exact raw mean shift-2 formula in \(h,B,J,U\);
- exact structural checks across all 116 labeled profiles with \(h=2,\ldots,7\).

### Still open / audit-required

- clean-room audit of the V3 derivations;
- novelty of the short-contact formulas;
- exact convention-level weighted specialization;
- scalar \(\phi_v\) reduction audit;
- non-tautological structural formula for \(\Xi_v\);
- certified centered-return tail in the exact representation;
- Abelian-specific sign/order/sufficient-condition theorem.

### Strongest paper-level target

\[
\boxed{
\text{short Abelian contact invariants}
+
\text{baseline-conditioned return geometry}
\Longrightarrow
\text{hard fluctuation-response criterion}.
}
\]

**Current assessment:** stronger than the previous V2 state because the local Abelian mechanism is now a theorem package rather than only an empirical/profile-invariant observation. Do not claim novelty until the targeted overlap literature audit is complete.

---

## Track 4 — Block Assembly / Abelian Contact Graphs / Mäkelä route

**Status:** active research program; not yet a paper manuscript and not a solution.

### What changed in V3

The correct architecture is no longer "huge contact graph whose every path is safe". A bare finite graph cannot globally certify all infinite paths because periodic cycles force squares.

Instead:

\[
\text{local seam graph}
+
\text{nonperiodic macro core}
+
\text{finite affine-template certificate}.
\]

### Concrete h6 / length-40 reduction

Use \(h_6^\omega(a)\) as the macro path, six length-40 ternary block roles, 14 allowed macro seams, prescribed Parikh columns preserving the known kernel condition, local certification for periods 2--5, and the Rao–Rosenfeld long-template procedure for periods \(>5\).

**Breakthrough condition:** find and certify one actual six-block coding \(H\). The reduction itself is not the breakthrough.

---

## Priority order — V3

1. Paper 3 clean-room short-contact audit.
2. Paper 3 weighted bookkeeping: raw contacts vs pruning vs centered returns.
3. Certified blocked-return tail and a nontrivial \(\Xi_v\) theorem attempt.
4. Decide Paper 3 manuscript readiness after the theorem attempt.
5. Upgrade Paper 2 only with audited return/tail material that genuinely sharpens it.
6. In parallel or immediately after P3 closure, audit and launch the six-role h6/40 search program.
7. No h=8 and no D40.

<!-- END 29_PAPER_OPPORTUNITY_REGISTRY_V3_2026-08-26.md -->

---

<!-- BEGIN 30_PAPER3_THEOREM_SKELETON_v0.1_2026-08-26.md -->

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

<!-- END 30_PAPER3_THEOREM_SKELETON_v0.1_2026-08-26.md -->

---

<!-- BEGIN 31_PAPER2_V3_INTEGRATION_NOTE_2026-08-26.md -->

# Paper 2 — V3 Integration Note

## Continuation Capacity and Delayed Variance Response in Forbidden-Pattern Shifts

**Date:** 2026-08-26  
**Status:** integration note only; do not silently rewrite/promote the manuscript from this file.  
**Novelty:** NOT_ESTABLISHED.

---

## 1. What remains the Paper 2 theorem problem

Paper 2 is the **soft-response** paper. Its object is

\[
A_\varepsilon=A_0e^{-\varepsilon g}
\]

near \(\varepsilon=0\), and the derivative of the asymptotic variance.

Its manuscript spine remains

\[
\text{local pattern geometry}
\to
\text{continuation capacity}
\to
\text{delayed correlation}
\to
\text{variance-response sign}.
\]

Do not replace this with Paper 3's hard-deletion 15-profile problem.

---

## 2. V3 interpretation of continuation capacity

The quantity

\[
N_m=A^m\mathbf1
\]

is not merely a heuristic future-volume feature. V3's centered-return viewpoint suggests the precise interpretation

\[
\boxed{
\text{finite continuation depth}
\approx
\text{finite truncation of the return/resolvent geometry}.
}
\]

The Perron limit already explains why continuation ratios converge to Parry transition probabilities. The new return viewpoint explains why increasingly deep continuation information recovers increasingly delayed correlation structure.

---

## 3. Possible rigorous upgrade

Using a blocked contraction of the centered operator, a future theorem can have the form

\[
\boxed{
\text{explicit finite continuation/return contribution}
+
\text{certified delayed tail interval}.
}
\]

This would sharpen the present qualitative statement that delayed continuations matter.

It would also give a cleaner analytic reading of the h4 sign reversal:

\[
\text{direct/local contribution}
+
\text{short continuation echo}
+
\text{deeper centered-return tail}.
\]

---

## 4. What should NOT yet be inserted into the manuscript as a theorem

- the candidate weighted hard-response scalar \(\phi_v\) formula;
- the hard decomposition \(\eta=-4B/3+\Xi\) as if it were a Paper 2 result;
- the 6/6 versus 9/9 hard-sign observation;
- exploratory block-contraction numerical values;
- any novelty claim for generic correlation/resolvent equivalences.

---

## 5. Recommended next manuscript edit after audit

If the return interpretation survives independent review, add one compact theory subsection along the following logical line:

1. define continuation capacity \(N_m\);
2. recall its Perron/Parry interpretation;
3. introduce the centered return operator;
4. state that finite continuation information is a finite-horizon approximation of the same return geometry;
5. if a blocked-tail certificate is available, state a finite-plus-tail proposition;
6. use h4 as the concrete mechanism example.

The manuscript should remain centered on the soft derivative and its sign-certification mechanism.

---

## 6. Paper 2 / Paper 3 boundary

**Paper 2 asks:** why can a soft local penalty have a variance response whose sign is controlled by delayed continuation geometry?

**Paper 3 asks:** how does complete hard exclusion of an Abelian profile orbit reorganize fluctuation response through short Abelian contacts plus all returns?

They share return/resolvent language but are not the same scientific result.

<!-- END 31_PAPER2_V3_INTEGRATION_NOTE_2026-08-26.md -->

---

<!-- BEGIN 06_QA_PRIOR_ART_TERMINOLOGY_AUDIT.md -->

# QA / Prior-Art / Terminology Audit — 2026-08-26

**Purpose:** adversarial review of the first audit packet before Claude sees it.  
**Repository mutation:** NONE.  
**Overall verdict:** the research direction remains strong, but several corrections and literature additions are required.

---

## 1. Critical correction: do not conflate pressure drop with escape rate without the normalization lemma

The quantity

\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t)
\]

is first and safest a **pressure drop** (or pressure loss).

It *does* equal an escape rate for the \(t\)-tilted Parry/Markov chain once the transfer matrix is normalized by its Perron eigenvector; this equality should be stated and proved explicitly rather than hidden in terminology.

See `07_PRESSURE_DROP_ESCAPE_RATE_LEMMA.md`.

Recommended terminology:

- `pressure drop` for the algebraic object \(D_v(t)\);
- `escape rate of the t-tilted Parry chain into the profile hole` only after invoking the normalization lemma;
- avoid using `escape cost` as if it were a standard technical term.

Primary support: Agarwal–Cheriyath–Tikekar, *Escape rate for shifts with Markov measure* (journal 2026), which gives escape rate both through a perturbed stochastic matrix and through pressure difference.

---

## 2. Critical correction: Theorem D and the h=3 factor use different presentations

The core Theorem D proof is written for **edge words in a fixed graph presentation**.

In the h=3 project sanity check:

- baseline \(L_2\) forbids words of length \(L=4\);
- its standard one-step context presentation has states of length \(L-1=3\);
- a target original word has length \(p=6\);
- therefore it becomes an edge-path of length
  \[
  r=p-L+1=3
  \]
  in the baseline context graph.

The direct Theorem D factor is therefore

\[
z^{-k(r-1)}=z^{-2k}.
\]

This was independently checked numerically:

- profile \((2,1,0)\), \(k=12\): exponent \(-24\);
- profile \((1,1,1)\), \(k=24\): exponent \(-48\).

The **full-letter conditioned correlation matrix** obtained by eliminating the baseline forbidden words is not literally the same matrix as the context-edge conditioned correlation matrix. In the h=3 case,

\[
\boxed{
C_{\rm symbol}(z)=z^{L-1}C_{\rm edge}(z)=z^3C_{\rm edge}(z)
}
\]

entrywise under the conventions used in the sanity check.

Hence

\[
\det C_{\rm symbol}
=
z^{3k}\det C_{\rm edge},
\]

and combining this with the direct Theorem D factor gives

\[
z^{-2k}z^{-3k}=z^{-5k}=z^{-k(p-1)}.
\]

Thus the observed factors \(z^{-60}\) and \(z^{-120}\) remain correct, but the first packet skipped the essential **presentation/re-coding factor**.

See `08_THEOREM_D_RECODING_CORRIGENDUM.md`.

---

## 3. Reducedness assumption needs correction

The first packet says in effect:

> target words are baseline-admissible, so \(\mathcal F\cup K\) is reduced.

This implication is not true in complete generality.

Baseline admissibility of \(K\) guarantees that no baseline forbidden word occurs *inside* a target word. It does not by itself rule out a target word being a factor of a longer word in \(\mathcal F\).

Correct assumption:

\[
\boxed{
\mathcal F\cup K\text{ is reduced}
}
\]

must either be assumed explicitly or proved from the length structure of the application.

For the bounded-Abelian application this is benign: baseline minimal forbidden words have length at most \(2(h-1)\), while profile targets have length \(2h\), so a target cannot be a factor of a baseline forbidden word.

---

## 4. `conditioned correlation matrix` and `return matrix` are descriptive project terms

The literature certainly contains:

- correlation polynomials/matrices;
- higher-block perturbation matrices;
- fundamental matrices / resolvents;
- Schur complements;
- weighted correlation polynomials.

But the exact phrases `conditioned correlation matrix` and `return matrix` should not be presented as standard nomenclature unless a source is identified.

Safer language:

> "the Schur complement / effective target correlation block (called the conditioned correlation matrix here)"

and

> "the finite-dimensional resolvent compression \(V^T(zI-A)^{-1}U\) (called the return matrix here)."

---

## 5. Major prior-art cluster missing from the first packet: Rukhin

This is the most important literature addition.

### Rukhin 2001
A. L. Rukhin, *Pattern correlation matrices and their properties*, Linear Algebra Appl. 327 (2001), 105–114.  
DOI: 10.1016/S0024-3795(00)00316-5.

The abstract explicitly says that the covariance matrix of joint pattern frequencies is expressed in terms of the pattern correlation matrix.

### Rukhin 2007
A. L. Rukhin, *Pattern Correlation Matrices for Markov Sequences and Tests of Randomness*, Theory Probab. Appl. 51(4) (2007), 663–679.  
DOI: 10.1137/S0040585X97982670.

This extends the pattern-correlation machinery to Markov sequences and first two moments.

### Rukhin 2010
A. L. Rukhin, *Joint Distribution of Pattern Frequencies and Multivariate Pólya–Aeppli Law*, Theory Probab. Appl. 54(2) (2010), 246–260.  
DOI: 10.1137/S0040585X97984115.

Crucially, the paper explicitly relates the pattern correlation matrix to the **fundamental matrix** of the Markov chain whose states are words of fixed length. It states

\[
Z=C(1)-(m-1)ep^T
\]

under its conventions and then expresses the limiting covariance matrix of pattern frequencies through this matrix.

**Consequence for novelty:**  
The generic bridge

\[
\text{pattern correlations}
\leftrightarrow
\text{Markov fundamental matrix/resolvent}
\leftrightarrow
\text{covariance}
\]

is definitely prior art. Paper 3 must not claim this general triangle as new.

The possible new contribution has to be more specific:

\[
\text{Abelian profile orbit}
+
\text{hard forbidden-profile perturbation}
+
\text{color-pressure / asymptotic-variance response}
+
\text{a structural sign/ordering theorem}.
\]

---

## 6. Other literature that should be added

### Nick Ramsey — multi-word perturbations

- *Perturbing subshifts of finite type: two words*, arXiv:1902.03352.
  The abstract explicitly says it introduces multi-word correlation polynomials and studies their determinant in the two-word case.

- *Entropy bounds for multi-word perturbations of subshifts*, Ergodic Theory Dynam. Systems 44 (2024), 665–673.  
  DOI: 10.1017/etds.2023.19.

These are direct prior art for multi-word hard perturbation.

### Chandgotia–Marcus–Richey–Wu

*Shifts of finite type obtained by forbidding a single pattern*, Discrete Contin. Dyn. Syst. 48 (2026), 538–576.  
DOI: 10.3934/dcds.2025152.

This is now a published 2026 source (early access October 2025), not merely an arXiv lead.

It connects forbidden-pattern combinatorics, graphical representations, Perron–Frobenius theory, Markov chains, entropy and conjugacy.

### Gheorghiciuc–Ward 2007

*On Correlation Polynomials and Subword Complexity*, DMTCS Proceedings AH (2007).  
DOI: 10.46298/dmtcs.3553.

It explicitly surveys:

- unweighted correlation polynomials;
- Bernoulli-weighted correlation polynomials;
- generalized multivariate correlation polynomials.

This is relevant before inventing any new `weighted correlation polynomial` notation.

### Bóna–Maga–Richey 2026

*Letter frequency in shifts of finite type with one forbidden word*, arXiv:2606.06655v1, submitted 4 June 2026.

This remains one of the closest *current* conceptual papers: it asks how combinatorial properties of a forbidden word control a statistical observable of the resulting SFT.

As of this QA pass, arXiv lists only v1.

---

## 7. The weighted bridge should NOT be re-proved from zero before reading the 2026 Markov-hole formulas

Agarwal–Cheriyath–Tikekar already provide:

- arbitrary finite Markov holes;
- higher-block representations;
- a spectral-radius formula;
- a thermodynamic pressure formulation;
- weighted correlation-polynomial recurrence formulas.

Therefore the next task should be phrased:

> **Specialize and differentiate the existing weighted Markov-hole formalism along the project's analytic color-tilt family.**

Only if that specialization fails to provide the needed object should a new weighted Theorem D be built.

This is an important anti-wheel-reinvention correction to the original audit checklist.

---

## 8. Regularity assumptions missing from the hard curvature statement

To use

\[
\eta_v
=
-\frac{D_v''(0)}{D_v(0)}
=
-(\log D_v)''(0),
\]

the document should state:

1. the baseline weighted transfer matrix has a simple Perron root near \(t=0\);
2. the hard survivor matrix has a locally isolated simple dominant eigenvalue near \(t=0\);
3. \(D_v(0)>0\);
4. the removed object is the full \(S_3\)-orbit \(G_v\), so \(D_v(t)\) is \(S_3\)-symmetric and \(D_v'(0)=0\);
5. the color observable/gauge is fixed consistently between baseline and hard systems.

The project's existing SCC/period audit strongly supports the needed \(t=0\) simplicity in the finite family, but the analytic-neighborhood argument should still be written.

---

## 9. Restrict \(\eta_v\) to occurring profile holes

If \(G_v\) is empty in the baseline language, then

\[
D_v(0)=0,
\]

so

\[
\eta_v=\Delta a_v/D_v
\]

is undefined.

This matters conceptually for equal-\(B\) examples such as the h=6 comparison between \((4,1,1)\) and the non-occurring \((3,3,0)\).

The paper should explicitly distinguish:

- algebraically possible half-Parikh profiles;
- profiles that actually occur as admissible Abelian-square targets in the baseline language.

---

## 10. Theorem D's strongest safe claim after prior-art subtraction

Recommended wording:

> For equal-length target edge-words in a fixed graph presentation, an elementary path-count decomposition gives an explicit identity between the finite-rank resolvent compression and the overlap-plus-endpoint-resolvent matrix. This closes a project-specific equivalence between two formulations already strongly represented in the literature.

Avoid:

> "We introduce a new return/correlation theory."

The path identity may still be pedagogically valuable and useful in proofs, but novelty is presently `UNRESOLVED / LIKELY_STANDARD_COROLLARY`.

---

# 11. What appears to remain genuinely promising

After subtracting the literature above, the strongest project-specific research candidates are:

### Candidate A — Abelian hard-response mechanism

A theorem explaining

\[
\eta_v=-\frac43B(v)+\Xi_v
\]

with \(\Xi_v\) expressed in a way that uses the special overlap geometry of admissible Abelian-square profile holes.

### Candidate B — a structural sign/ordering criterion

Not necessarily "minimum-B always wins", but an Abelian-specific inequality or curvature threshold explaining the observed finite h=2,...,7 ordering without fitted features.

### Candidate C — nonlinear soft-to-hard reorganization

A rigorous statement explaining when the sign of the infinitesimal soft response can differ from the complete hard response, with h4 as the motivating instance.

This is distinct from generic pressure perturbation if it can be tied to forbidden-profile continuation/return geometry.

---

# 12. Current literature freshness verdict

A targeted search through 2026-08-26 found the following current anchors:

- Agarwal–Cheriyath–Tikekar journal article, published online 20 Apr 2026;
- Bóna–Maga–Richey arXiv v1, 4 Jun 2026;
- Chandgotia–Marcus–Richey–Wu, 2026 journal volume / early access Oct 2025;
- Cheriyath 2025 multi-word perturbation preprint;
- Ramsey 2024 multi-word entropy perturbation;
- classical Lind / Guibas–Odlyzko / Rukhin literature.

No direct source was found in this targeted pass that states the project's exact **ternary Abelian-profile hard asymptotic-variance sign mechanism**.

That is not a proof of novelty. Specialist citation chasing is still required.

---

# 13. Required actions before any manuscript novelty claim

1. Audit Rukhin 2001/2007/2010 in detail.
2. Audit the full journal version of Agarwal–Cheriyath–Tikekar 2026, especially the recurrence matrices.
3. Audit Ramsey's two-word and multi-word perturbation papers.
4. Correct the Theorem D presentation/re-coding issue.
5. Prove the pressure-drop = tilted-Parry escape-rate lemma explicitly.
6. Derive \(\Xi_v\) by *specializing existing weighted machinery first*.
7. Only then assess whether Paper 3 contains a new theorem.

<!-- END 06_QA_PRIOR_ART_TERMINOLOGY_AUDIT.md -->

---

<!-- BEGIN 01_THEOREM_D_RETURN_CORRELATION_BRIDGE.md -->

# Theorem D — Fixed-Presentation Return/Correlation Bridge (QA-CORRECTED)

**Status:** proof candidate; independent audit required.  
**Novelty:** NOT ESTABLISHED; likely an explicit corollary/synthesis of established perturbation/correlation machinery.  
**Important:** this note uses notation chosen to avoid collisions with the profile-response paper.

---

# 1. Notation

Let \(A\) be the adjacency matrix of a finite directed graph \(X\).

Let

\[
\mathcal W=\{w_1,\ldots,w_k\}
\]

be \(k\) distinct allowed **edge words of one common edge length \(r\ge2\)**.

For

\[
w_i=e_{i,1}\cdots e_{i,r},
\]

write

- \(s_i\): source vertex of \(e_{i,1}\);
- \(t_i\): terminal vertex of \(e_{i,r}\);
- \(\alpha_i=e_{i,1}\cdots e_{i,r-1}\);
- \(\beta_i=e_{i,2}\cdots e_{i,r}\).

Let \(\widehat A=A^{[r]}\) be the higher-block adjacency matrix with states equal to allowed \((r-1)\)-edge words.

Each \(w_i\) is then one higher-block edge

\[
\alpha_i\to\beta_i.
\]

Define

\[
U=[e_{\alpha_1}\ \cdots\ e_{\alpha_k}],
\qquad
V=[e_{\beta_1}\ \cdots\ e_{\beta_k}].
\]

Hard deletion of these target edges gives

\[
\widehat A_{\setminus\mathcal W}
=
\widehat A-UV^T.
\tag{D.1}
\]

For \(z\notin\sigma(\widehat A)\), define the finite-dimensional resolvent compression

\[
\boxed{
R_{\mathcal W}(z)
=
V^T(zI-\widehat A)^{-1}U.
}
\tag{D.2}
\]

`Return matrix` may be used informally for \(R_{\mathcal W}\), but `resolvent compression` is the safer technical description.

---

# 2. Edge-word correlation and endpoint matrices

Define the oriented edge-word correlation matrix

\[
C^{\rm edge}_{ij}(z)
=
\sum_{\ell=1}^{r}
\mathbf1\{
\operatorname{suffix}_{\ell}(w_i)
=
\operatorname{prefix}_{\ell}(w_j)
\}
z^{\ell-1}.
\tag{D.3}
\]

Define the endpoint resolvent matrix

\[
E^{\rm end}_{ij}(z)
=
e_{t_i}^T(zI-A)^{-1}e_{s_j}.
\tag{D.4}
\]

The orientation of correlation matrices varies in the literature. Transposition changes the displayed matrix identity but not the determinant statements.

---

# 3. Theorem D

## Theorem D — fixed-presentation edge-word bridge

For every \(z\) for which the resolvents exist,

\[
\boxed{
z^{r-1}
\left(I+R_{\mathcal W}(z)\right)
=
C^{\rm edge}(z)+E^{\rm end}(z).
}
\tag{D.5}
\]

Equivalently,

\[
z^{r-1}
\left[
\delta_{ij}
+
e_{\beta_i}^T(zI-\widehat A)^{-1}e_{\alpha_j}
\right]
=
C^{\rm edge}_{ij}(z)
+
e_{t_i}^T(zI-A)^{-1}e_{s_j}.
\tag{D.6}
\]

---

# 4. Proof

For \(|z|>\rho(\widehat A)\),

\[
(zI-\widehat A)^{-1}
=
\sum_{n\ge0}z^{-n-1}\widehat A^n.
\]

Therefore

\[
(R_{\mathcal W})_{ij}
=
\sum_{n\ge0}
z^{-n-1}
(\widehat A^n)_{\beta_i,\alpha_j}.
\tag{D.7}
\]

Split at \(n=r-1\).

## 4.1 Short paths

For \(0\le n\le r-2\), a higher-block path of length \(n\) from \(\beta_i\) to \(\alpha_j\) is equivalent to an overlap of

\[
\ell=r-1-n
\]

edges between \(w_i\) and \(w_j\).

Moreover,

\[
z^{r-1}z^{-n-1}=z^{\ell-1}.
\]

The proper overlaps \(\ell=1,\ldots,r-1\) are therefore exactly the short-path terms, while

\[
\delta_{ij}z^{r-1}
\]

is the full-overlap term \(\ell=r\).

Thus

\[
z^{r-1}
\left[
\delta_{ij}
+
\sum_{n=0}^{r-2}
z^{-n-1}
(\widehat A^n)_{\beta_i,\alpha_j}
\right]
=
C^{\rm edge}_{ij}(z).
\tag{D.8}
\]

## 4.2 Long paths

For \(n\ge r-1\), the original \((r-1)\)-edge memory has completely left the higher-block state.

Such a path is equivalent to a base-graph walk of length

\[
m=n-(r-1)
\]

from \(t_i\) to \(s_j\). Hence

\[
(\widehat A^n)_{\beta_i,\alpha_j}
=
(A^{n-r+1})_{t_i,s_j}.
\tag{D.9}
\]

Therefore

\[
\begin{aligned}
z^{r-1}
\sum_{n=r-1}^{\infty}
z^{-n-1}
(\widehat A^n)_{\beta_i,\alpha_j}
&=
\sum_{m=0}^{\infty}
z^{-m-1}(A^m)_{t_i,s_j}
\\
&=
E^{\rm end}_{ij}(z).
\end{aligned}
\tag{D.10}
\]

Adding (D.8) and (D.10) proves (D.5) for \(|z|\) large. Both sides are rational matrix functions, so the identity extends wherever both sides are defined. \(\square\)

---

# 5. Determinant corollary

The matrix determinant lemma gives

\[
\frac{
\det(zI-\widehat A_{\setminus\mathcal W})
}{
\det(zI-\widehat A)
}
=
\det(I+R_{\mathcal W}(z)).
\tag{D.11}
\]

Taking determinants in (D.5),

\[
\boxed{
\det(I+R_{\mathcal W}(z))
=
z^{-k(r-1)}
\det\!\left(
C^{\rm edge}(z)+E^{\rm end}(z)
\right).
}
\tag{D.12}
\]

The exponent is governed by the **edge length \(r\) in this presentation**.

---

# 6. Symbol words versus edge words

Suppose the baseline symbolic SFT is represented by an \(m\)-symbol context graph.

An original symbol word of length \(p>m\) becomes an edge word of length

\[
\boxed{
r=p-m.
}
\tag{D.13}
\]

Hence Theorem D directly contributes

\[
z^{-k(p-m-1)}.
\]

A full-symbol Guibas–Odlyzko/Schur-complement representation is a different presentation and can contain an additional monomial recoding factor.

**Do not identify the two matrices without proving the presentation change.**

The QA note `08_THEOREM_D_RECODING_CORRIGENDUM.md` records the h=3 evidence and the general recoding theorem candidate.

---

# 7. h=3 sanity check after the correction

For baseline \(L_2\):

- context memory \(m=3\);
- target symbol length \(p=6\);
- target edge length \(r=3\).

Therefore the direct edge-presentation factor is

\[
z^{-2k}.
\]

The reproducibility script gives:

- profile \((2,1,0)\), \(k=12\): exponent \(-24\);
- profile \((1,1,1)\), \(k=24\): exponent \(-48\).

Independently, the full-symbol effective target block obeys numerically in this example

\[
C^{\rm symbol}(z)
=
z^3
\left(
C^{\rm edge}(z)+E^{\rm end}(z)
\right).
\]

Thus the full-symbol determinant has total factor

\[
z^{-5k}=z^{-k(p-1)},
\]

giving the previously observed \(-60\) and \(-120\).

The general presentation-scaling statement is **not yet proved**.

---

# 8. Separate full-symbol Schur algebra

Now use different notation for the classical/full-symbol correlation formulation.

Let

- \(\mathcal F\): a reduced baseline forbidden collection;
- \(\mathcal W\): the added target collection;
- assume explicitly that \(\mathcal F\cup\mathcal W\) is reduced.

Partition the correlation matrix as

\[
M_{\mathcal F\cup\mathcal W}
=
\begin{pmatrix}
M_{\mathcal F}
&
M_{\mathcal F,\mathcal W}
\\
M_{\mathcal W,\mathcal F}
&
M_{\mathcal W}
\end{pmatrix}.
\tag{D.14}
\]

Define the Schur complement

\[
S_{\mathcal W}
=
M_{\mathcal W}
-
M_{\mathcal W,\mathcal F}
M_{\mathcal F}^{-1}
M_{\mathcal F,\mathcal W}.
\tag{D.15}
\]

Define

\[
x_{\mathcal W}
=
\mathbf1_{\mathcal W}
-
M_{\mathcal W,\mathcal F}
M_{\mathcal F}^{-1}
\mathbf1_{\mathcal F},
\tag{D.16}
\]

\[
y_{\mathcal W}^T
=
\mathbf1_{\mathcal W}^T
-
\mathbf1_{\mathcal F}^T
M_{\mathcal F}^{-1}
M_{\mathcal F,\mathcal W}.
\tag{D.17}
\]

Let

\[
f_{\mathcal F}(z)
=
z-q+
\mathbf1_{\mathcal F}^T
M_{\mathcal F}^{-1}
\mathbf1_{\mathcal F},
\tag{D.18}
\]

with \(f_{\mathcal F\cup\mathcal W}\) defined analogously.

Block inversion gives

\[
\boxed{
f_{\mathcal F\cup\mathcal W}
=
f_{\mathcal F}
+
y_{\mathcal W}^T
S_{\mathcal W}^{-1}
x_{\mathcal W}.
}
\tag{D.19}
\]

The effective target block in this full-symbol recurrence is

\[
\boxed{
C^{\rm symbol}_{\mathcal W}
=
S_{\mathcal W}
+
\frac{
x_{\mathcal W}y_{\mathcal W}^T
}{
f_{\mathcal F}
}.
}
\tag{D.20}
\]

Thus

\[
\boxed{
\det C^{\rm symbol}_{\mathcal W}
=
\det S_{\mathcal W}
\frac{
f_{\mathcal F\cup\mathcal W}
}{
f_{\mathcal F}
}.
}
\tag{D.21}
\]

This is an algebraic Schur-complement identity.

It is **not** an assertion that \(C^{\rm symbol}_{\mathcal W}\) equals the edge-presentation matrix in (D.5) without an explicit recoding factor.

---

# 9. Reducedness in the bounded-Abelian application

Baseline admissibility of \(\mathcal W\) is not sufficient to imply reducedness in arbitrary systems.

In the bounded-Abelian application, reducedness follows from the additional length structure:

- baseline minimal forbidden words have lengths at most \(2(h-1)\);
- new profile targets have length \(2h\);
- target admissibility prevents baseline forbidden words from appearing inside targets;
- targets cannot be factors of shorter baseline forbidden words.

This application-specific argument should be stated explicitly.

---

# 10. Prior-art position

The generic machinery has substantial prior art:

- Lind (1989): higher-block word deletion and correlation polynomial;
- Rukhin (2001, 2007, 2010): pattern correlations, fundamental matrices/resolvents, first two moments/covariance;
- Ramsey (2019, 2024): multi-word perturbations;
- Cheriyath (2025): multi-word SFT recurrence block matrix;
- Agarwal–Cheriyath–Tikekar (2026): Markov holes, higher blocks, pressure and weighted correlation recurrences.

Therefore the safe status of Theorem D is:

\[
\boxed{\text{PROJECT-SPECIFIC EXPLICIT BRIDGE / LIKELY STANDARD COROLLARY}}
\]

until a specialist prior-art audit says otherwise.

---

# 11. Next research step after prior-art subtraction

Do not invent a generic weighted correlation theory.

Instead:

1. take the existing weighted Markov-hole formalism;
2. specialize it to the project's analytic centered color tilt;
3. differentiate the resulting pressure-drop/correlation expression twice;
4. match the result to
   \[
   \eta_v=-\frac43B(v)+\Xi_v;
   \]
5. identify whether the special Abelian-profile overlap geometry yields a new structural formula, inequality or sign criterion for \(\Xi_v\).

That downstream Abelian-specific step is the main Paper 3 theorem opportunity.

<!-- END 01_THEOREM_D_RETURN_CORRELATION_BRIDGE.md -->

---

<!-- BEGIN 08_THEOREM_D_RECODING_CORRIGENDUM.md -->

# Theorem D Presentation / Re-coding Corrigendum

**This document corrects an overcompressed step in the first audit packet.**

The core edge-shift path identity remains a valid theorem candidate.  
The application to the h=3 \(z^{-60}\) and \(z^{-120}\) factors needs an additional presentation-change lemma.

---

# 1. What was conflated

Theorem D is stated for targets that are **edge words of length \(r\)** in a fixed graph presentation.

The h=3 project calculation, however, uses:

- original ternary target words of symbol length \(p=6\);
- baseline \(L_2\), which is a finite-type language with memory \(L-1=3\) because its minimal new obstruction length is \(L=4\).

The standard context graph for the baseline has states given by allowed words of length \(3\).

A length-6 target symbol word

\[
w_1w_2w_3w_4w_5w_6
\]

becomes the 3-edge path

\[
(w_1w_2w_3)
\to
(w_2w_3w_4)
\to
(w_3w_4w_5)
\to
(w_4w_5w_6).
\]

Thus

\[
\boxed{
r=p-L+1=3.
}
\]

---

# 2. Direct Theorem D factor

For \(k\) targets, the direct edge-presentation identity gives

\[
\det(I+K_{\rm ret})
=
z^{-k(r-1)}
\det C_{\rm edge}.
\]

Here

\[
r-1=2.
\]

Therefore:

- \(k=12\): exponent \(-24\);
- \(k=24\): exponent \(-48\).

These values were independently reproduced in the QA pass.

---

# 3. Full-symbol conditioned correlation matrix

Let

\[
C_{\rm symbol}(z)
\]

denote the effective target block obtained by starting in the full 3-shift correlation system and eliminating the baseline forbidden collection via Schur complement.

Let

\[
C_{\rm edge}(z)
\]

denote the direct overlap-plus-endpoint-resolvent matrix for the target edge paths in the baseline context graph.

In the h=3 calculation, direct numerical evaluation at several independent \(z\)-values gives

\[
\boxed{
C_{\rm symbol}(z)
=
z^3C_{\rm edge}(z)
}
\]

entrywise to floating-point precision.

Hence

\[
\boxed{
\det C_{\rm symbol}(z)
=
z^{3k}
\det C_{\rm edge}(z).
}
\tag{R.1}
\]

Combining with the direct Theorem D factor,

\[
\det(I+K_{\rm ret})
=
z^{-2k}\det C_{\rm edge}
=
z^{-5k}\det C_{\rm symbol}.
\]

Since \(p=6\),

\[
5=p-1.
\]

Therefore

\[
\boxed{
\det(I+K_{\rm ret})
=
z^{-k(p-1)}
\det C_{\rm symbol}.
}
\tag{R.2}
\]

This recovers the previously observed:

- \(k=12\): \(z^{-60}\);
- \(k=24\): \(z^{-120}\).

---

# 4. General presentation-change lemma candidate

Let a symbolic SFT be presented as an \((L-1)\)-step context graph and let all target **symbol words** have common length \(p\ge L\).

Each target becomes an edge word of length

\[
r=p-L+1.
\]

Under compatible correlation conventions, the natural candidate is

\[
\boxed{
C_{\rm symbol}(z)
=
z^{L-1}C_{\rm edge}(z).
}
\tag{R.3}
\]

Then

\[
\det(I+K_{\rm ret})
=
z^{-k(r-1)}\det C_{\rm edge}
=
z^{-k(p-1)}\det C_{\rm symbol}.
\]

This candidate was also checked on an independent golden-mean example:

- baseline forbids `11`, so \(L=2\);
- length-3 targets;
- the equality
  \[
  C_{\rm symbol}=z\,C_{\rm edge}
  \]
  held numerically at multiple \(z\)-values.

---

# 5. What needs proof

Equation (R.3) should **not** yet be promoted as proved in general.

Claude should derive it from one of the following:

1. direct path/overlap counting in the context presentation;
2. associativity of Schur-complement elimination between the full-shift recurrence system and the context-graph recurrence system;
3. Lind's higher-block nilpotent decomposition.

The expected combinatorial reason is simple:

- an overlap of \(\ell\) context-graph edges corresponds to an overlap of \(\ell+L-1\) original symbols;
- correlation exponents therefore differ by \(L-1\);
- the same shift applies to long endpoint excursions.

But this must be written carefully, especially when the baseline minimal forbidden collection has mixed lengths.

---

# 6. Consequence for the original Theorem D note

The following sentence in the first packet is too strong without the recoding lemma:

> "Equivalently ... \(C_X=T_K+G_X\)" where \(C_X\) is the full-symbol Schur-complement object.

It should be replaced by a presentation-aware statement.

The full-symbol Schur-complement matrix and the context-edge overlap/resolvent matrix encode the same perturbation, but can differ by an explicit monomial presentation factor.

---

# 7. Epistemic status

| Item | Status |
|---|---|
| Core edge-shift Theorem D path proof | still plausible / audit required |
| direct h3 edge-presentation exponent \(-2k\) | independently reproduced |
| full-symbol h3 exponent \(-5k\) | independently reproduced |
| h3 matrix scaling \(C_{\rm symbol}=z^3C_{\rm edge}\) | independently reproduced |
| golden-mean scaling test | independently reproduced |
| general recoding formula \(z^{L-1}\) | strong theorem candidate, proof still required |
| novelty | not established; likely higher-block/correlation standard machinery |

This correction should be shown to Claude before asking for any novelty assessment.

<!-- END 08_THEOREM_D_RECODING_CORRIGENDUM.md -->

---

<!-- BEGIN 14_CLAIM_DEPENDENCY_AND_MISSING_ITEMS.md -->

# Claim Dependency Graph and Missing Items — 2026-08-26

This is the final "what could still be missing?" checklist from the adversarial QA pass.

---

# 1. Dependency graph for Paper 3

A safe proof architecture is:

\[
\text{finite profile hole }\mathcal G_v
\]

\[
\Downarrow
\]

### Layer A — established background

- SFT / Parry chain;
- hard hole as finite forbidden-word collection;
- higher-block killed matrix;
- pressure drop / escape rate;
- correlation matrices and weighted correlation polynomials;
- fundamental matrix / resolvent and covariance machinery.

\[
\Downarrow
\]

### Layer B — project-derived identities to audit independently

\[
D_v(t)=P_{\rm base}(t)-P_{\rm hard,v}(t),
\]

\[
\Delta a_v=-D_v''(0),
\]

\[
\eta_v=\frac{\Delta a_v}{D_v},
\]

\[
\eta_v=-\frac43B(v)+\Xi_v.
\]

\[
\Downarrow
\]

### Layer C — bridge / representation

- fixed-presentation edge-word Theorem D;
- full-symbol Schur formulation;
- explicit presentation/re-coding lemma;
- specialization of existing weighted Markov-hole recurrence to the color tilt.

\[
\Downarrow
\]

### Layer D — genuinely research-level target

Obtain a structural expression

\[
\boxed{
\Xi_v=\Xi(\text{Abelian profile overlap/return data})
}
\]

that is not merely a generic covariance formula.

\[
\Downarrow
\]

### Layer E — strongest desired theorem

One of:

1. sign criterion for \(\eta_v\) or \(\Delta a_v\);
2. ordering theorem across profile classes;
3. quantitative bound on the dynamical correction;
4. rigorous soft-to-hard sign-reorganization criterion.

The finite 6/6 versus 9/9 observation motivates this layer but does not itself prove it.

---

# 2. Missing proof items

## M1. General presentation/re-coding lemma

Needed to relate:

- full-symbol correlation/Schur recurrence;
- context-graph edge-word return/correlation formula.

Evidence exists for h=3 and a golden-mean control, but a proof is still missing.

## M2. Convention-level weighted specialization

Agarwal–Cheriyath–Tikekar already supply weighted Markov-hole recurrences.

What is missing is the exact specialization to the project's analytic centered color field, including:

- weight convention;
- gauge;
- source/terminal factors;
- \(t\)-analyticity;
- differentiation twice at \(t=0\).

## M3. Independent derivation of \(\eta=-4B/3+\Xi\)

This identity is central enough that Paper 3 should not rely on a single previous AI derivation.

Claude should derive it clean-room.

## M4. Structural formula for \(\Xi_v\)

This is the main mathematical gap.

Until this exists, Paper 3 has a strong observation and framework but not yet the desired mechanism theorem.

## M5. Abelian-specific inequality / criterion

Generic mixing or Perron theory cannot provide a universal fixed bound because resolvents can diverge near decomposability.

Any useful bound must exploit special Abelian profile/overlap structure.

## M6. Soft-to-hard path regularity

If Paper 3 uses thermodynamic integration, state conditions ensuring:

- a regular dominant component along the relevant penalty path;
- differentiability where used;
- convergence to the hard endpoint.

Alternatively avoid path integration by using endpoint pressure derivatives whenever possible.

---

# 3. Missing literature audits

## L1. Rukhin 2001 / 2007 / 2010

Highest-priority addition because these papers already link:

\[
\text{pattern correlations}
\leftrightarrow
\text{fundamental matrix/resolvent}
\leftrightarrow
\text{covariance / first two moments}.
\]

## L2. Full 2026 Markov-hole article

Read theorem statements and recurrence matrices convention-by-convention, not only the abstract.

## L3. Ramsey 2019 / 2024

Needed before any multi-word perturbation novelty claim.

## L4. Guibas–Odlyzko original theorem conventions

Needed for exact orientation/denominator formulas.

## L5. Thermodynamic linear-response / pressure-Hessian literature

Needed to calibrate any claim involving second or third pressure derivatives.

## L6. Direct search for "variance response to forbidden cylinders / holes"

The current search found close components but no exact Abelian-profile result. A specialist citation chase should still be done before submission.

---

# 4. Missing computational audits

These are **not** requests to compute h=8.

## C1. Independent exact/symbolic small cases

Retain h=2/h=3 as exact or high-precision golden tests.

## C2. Presentation invariance for the new formulas

Show that the same pressure/response object is obtained from:

- full-symbol recurrence;
- context graph;
- higher-block deletion.

## C3. Weighted derivative cross-check

For one small existing case, compare:

1. direct pressure finite difference / complex-step or symbolic derivative;
2. weighted correlation formula;
3. Poisson/Green–Kubo formula.

Agreement should be documented before scaling up.

## C4. Error control

Any computer-assisted sign theorem needs interval/rational/error bounds, not only floating-point agreement.

---

# 5. Missing paper-level documentation

Before a manuscript is declared ready, add:

1. **Notation table.**
2. **Assumption table** for every theorem.
3. **Claim-status table** (`known`, `derived`, `computed`, `hypothesis`, `novelty unresolved`).
4. **Dependency diagram** showing which claims use external theorems.
5. **Reproducibility appendix** with exact scripts, versions, commands, hashes and raw outputs.
6. **Primary-source bibliography audit** with DOI/arXiv version dates.
7. **Counterexample / failure section**:
   - B is not a complete causal descriptor;
   - generic \(8/3\) bound cannot be universal;
   - soft and hard signs can differ.
8. **Terminology first-use pass** inherited from the feedback on Paper 1.

---

# 6. Paper opportunity preservation

The following must remain separate in planning:

- **Paper 1:** folding / LLT / collision asymptotics.
- **Paper 2:** soft penalty / continuation capacity / delayed response.
- **Paper 3 candidate:** hard profile deletion / pressure-drop curvature / Abelian response mechanism.
- **Track 4:** Block Assembly / Abelian Contact Graphs / later FORBID4 work.

Do not merge Papers 2 and 3 merely because Theorem D gives them a common mathematical language.

---

# 7. Current strongest "new theorem" candidates after subtracting prior art

Ranked:

### 1. Abelian-profile hard-response mechanism theorem

A structural formula and criterion for

\[
\eta_v=-\frac43B(v)+\Xi_v
\]

where \(\Xi_v\) is explicitly controlled by admissible Abelian-profile return/overlap geometry.

### 2. Abelian-specific ordering/sign theorem

A theorem stronger than the 15-case observation but weaker and more realistic than a universal minimum-\(B\) law.

### 3. Soft-to-hard reorganization theorem

A rigorous criterion for when local/infinitesimal response and complete hard deletion have different signs because the survivor continuation geometry reorganizes along the deletion path.

Theorem D itself is **not** currently ranked as a novelty candidate.

---

# 8. Stop conditions

Do not:

- compute h=8;
- use D40;
- fit new arbitrary predictors to the exposed 15-profile signs;
- call a standard correlation/resolvent identity new;
- promote the general recoding formula before proof;
- claim Paper 3 novelty before the weighted prior-art audit.

The next information-rich task is the **weighted specialization + Xi derivation**, after Claude independently audits the identities above.

<!-- END 14_CLAIM_DEPENDENCY_AND_MISSING_ITEMS.md -->

---

<!-- BEGIN 16_LATE_EVENING_WEIGHTED_MECHANISM_ADDENDUM.md -->

# Late-Evening Weighted Mechanism Addendum — 2026-08-26

**Status:** research addendum produced after the first FINAL QA packet.  
**Repository mutation:** NONE.  
**h=8:** no response/Perron/profile computation performed; see separate incident note regarding one discarded structural side-test.  
**Novelty:** NOT ESTABLISHED.

This note records the research results obtained after the earlier audit packet was frozen.

---

# 1. Literature-first weighted specialization succeeded

The correct next move was **not** to invent a new weighted correlation theory.

The 2026 Markov-hole recurrence formalism already supplies a weighted recurrence matrix for finite collections of hole words. Specializing that machinery to the project's analytic centered color tilt gives an implicit escape/pressure root equation

\[
H_v(z_v(t),t)=0,
\qquad
z_v(t)=e^{D_v(t)},
\]

where

\[
D_v(t)
=
P_{\rm base}(t)-P_{\rm hard,v}(t).
\]

For the \(S_3\)-symmetric profile orbit,

\[
z_v'(0)=0.
\]

Implicit differentiation therefore gives

\[
z_v''(0)
=
-
\frac{H_{tt}}{H_z}
\Big|_{(z_v(0),0)}.
\]

Since

\[
D_v''(0)
=
\frac{z_v''(0)}{z_v(0)}
\]

at a symmetry point where \(z_v'(0)=0\), and

\[
\eta_v
=
-\frac{D_v''(0)}{D_v(0)},
\]

we obtain the exact candidate formula

\[
\boxed{
\eta_v
=
\frac{
H_{tt}
}{
z_v(0)\log z_v(0)\,H_z
}
\Big|_{(z_v(0),0)}.
}
\tag{W.1}
\]

This is not a novelty claim for the implicit-function calculation. Its importance is that the existing weighted pattern-recurrence machinery directly carries the project's hard second-order response.

---

# 2. Independent weighted sanity checks

A small independent implementation of the weighted recurrence machinery was compared against direct hard pressure curvature.

No Green–Kubo / Poisson response engine was used for the weighted recurrence side.

Observed agreement:

\[
\begin{array}{c|c}
(h,v) & \eta_v \\\hline
2,(1,1,0) & +0.23883\\
2,(2,0,0) & -2.03286\\
3,(1,1,1) & +0.77077\\
3,(2,1,0) & -1.24010
\end{array}
\]

The weighted recurrence and direct pressure-curvature evaluations agreed to the expected finite-difference precision (order \(10^{-6}\) in these exploratory checks).

**Status:** independent numerical sanity checks, not a certified theorem calculation.

---

# 3. Weighted overlap derivatives are continuation-potential derivatives

Let \(W_t\) be the tilted transfer matrix and \(P_t\) its Parry/Doob normalization.

For an allowed path

\[
\gamma:y_0\to y_1\to\cdots\to y_m,
\]

the tilted path probability has the exact form

\[
\prod_{r=0}^{m-1}P_t(y_r,y_{r+1})
=
\lambda_t^{-m}
e^{tS_\gamma F}
\frac{r_t(y_m)}{r_t(y_0)}.
\tag{W.2}
\]

Define

\[
\mu=(\log\lambda_t)'|_0,
\qquad
a=(\log\lambda_t)''|_0,
\]

\[
h(y)=\partial_t\log r_t(y)|_0,
\qquad
k(y)=\partial_t^2\log r_t(y)|_0.
\]

Then

\[
\boxed{
\partial_t\log \Pr_t(\gamma)\big|_0
=
S_\gamma F
-
m\mu
+
h(y_m)-h(y_0)
}
\tag{W.3}
\]

and

\[
\boxed{
\partial_t^2\log \Pr_t(\gamma)\big|_0
=
-ma
+
k(y_m)-k(y_0).
}
\tag{W.4}
\]

Interpretation:

- weighted correlation derivatives contain the local color/Parikh sum;
- the remaining terms are endpoint continuation potentials;
- continuation capacity and weighted-correlation curvature are therefore two representations of the same derivative structure.

This is a finite-state specialization of standard Perron/thermodynamic perturbation theory, not a new abstract theorem.

---

# 4. Crucial Abelian simplification: every new target is a 3-transition path

For the bounded transition

\[
L_{h-1}\to L_h,
\]

the baseline can be represented with symbol memory

\[
m=2h-3.
\]

A new \(h\)-Abelian-square target has original symbol length

\[
p=2h.
\]

In the \(m\)-symbol context presentation, that target becomes an edge path of length

\[
\boxed{
r=p-m=3.
}
\tag{W.5}
\]

Equivalently it is a hole word on four context states.

**This is independent of \(h\).**

Therefore, in the context-chain weighted recurrence, only two direct target-target overlap lengths exist before the long-return part:

- shift 1;
- shift 2.

Everything beyond them belongs to baseline continuation/return geometry.

This is a genuinely useful Abelian/bounded-family specialization of the generic finite-hole recurrence machinery.

---

# 5. Specialized recurrence structure

Under compatible conventions, the effective target recurrence matrix has the form

\[
\boxed{
\mathcal K_v(z,t)
=
I
+
zO_{1,v}(t)
+
z^2O_{2,v}(t)
+
z^3\Delta_v(t)
S_v
(I-zP_t^T)^{-1}
T_v.
}
\tag{W.6}
\]

Here:

- \(O_{1,v}\): direct one-shift target overlap;
- \(O_{2,v}\): direct two-shift target overlap;
- \(\Delta_v,S_v,T_v\): target path/source/terminal weighting blocks under the chosen convention;
- the resolvent term contains all longer returns through the baseline Parry chain.

**Audit warning:** the exact placement/transposition of \(\Delta,S,T\) depends on the 2026 paper's recurrence convention. Equation (W.6) records the structural form reached in the session and must be convention-audited before manuscript use.

---

# 6. Abelian shift-1 overlap lemma

Consider two length-\(2h\) Abelian-square windows starting one symbol apart.

Write the first relevant boundary symbols as

\[
x_0,\quad x_h,\quad x_{2h}.
\]

Subtracting the two Parikh-balance equations gives

\[
2e_{x_h}
=
e_{x_0}+e_{x_{2h}}.
\]

Since the \(e_x\) are standard basis vectors,

\[
\boxed{
x_0=x_h=x_{2h}.
}
\tag{W.7}
\]

Consequences:

1. the one-step shifted target is forced;
2. the shift-1 target overlap relation is a partial permutation relation;
3. hence its support satisfies

\[
\boxed{
\deg^+ O_{1,v}\le1,
\qquad
\deg^- O_{1,v}\le1.
}
\tag{W.8}
\]

This is Abelian-specific structure not supplied by generic Markov-hole theory.

---

# 7. Abelian shift-2 overlap lemma

For two \(h\)-Abelian-square windows starting two symbols apart, write the two-symbol Parikh vectors:

- \(F\): first pair;
- \(M\): middle pair;
- \(R\): appended pair.

Subtracting the two Abelian-square constraints gives

\[
\boxed{
R=2M-F.
}
\tag{W.9}
\]

Classifying length-2 Parikh vectors over a ternary alphabet yields exactly two possibilities:

### Type I

\[
\boxed{
F=M=R.
}
\tag{W.10}
\]

### Type II

For distinct letters \(i,j\),

\[
\boxed{
F=2e_i,
\qquad
M=e_i+e_j,
\qquad
R=2e_j.
}
\tag{W.11}
\]

Therefore each target has at most two shift-2 continuations:

\[
\boxed{
\deg^+ O_{2,v}\le2.
}
\tag{W.12}
\]

If the shifted target must remain in the same half-Parikh profile orbit, Type II additionally requires the relevant profile counts to satisfy

\[
\boxed{
v_i=v_j+1.
}
\tag{W.13}
\]

This is a second concrete Abelian-specific restriction on the recurrence matrix.

---

# 8. Stationary plus centered-return decomposition

Let

\[
P^T=\Pi+Q,
\]

where \(\Pi\) is the stationary rank-one projector and \(Q\) is the centered part.

Then

\[
(I-zP^T)^{-1}
=
\frac{\Pi}{1-z}
+
(I-zQ)^{-1}(I-\Pi).
\tag{W.14}
\]

Substituting into (W.6) separates the recurrence into

\[
\boxed{
\text{direct shift-1 overlap}
+
\text{direct shift-2 overlap}
+
\text{stationary target-mass term}
+
\text{centered delayed-return term}.
}
\tag{W.15}
\]

Whenever

\[
z\rho(Q)<1,
\]

the centered term has the convergent lag expansion

\[
\boxed{
(I-zQ)^{-1}(I-\Pi)
=
\sum_{n\ge0}z^nQ^n(I-\Pi).
}
\tag{W.16}
\]

Thus "delayed continuation" is literally a return-lag expansion in the hard-hole recurrence representation.

---

# 9. Family-wide exploratory convergence check for h=2,...,7

For a profile-specific hard hole,

\[
z_v
=
\frac{\lambda_{h-1}}
{\lambda_{{\rm hard},v}}.
\]

Deleting one profile class is weaker than deleting the entire new \(h\)-level, so

\[
z_v
\le
\frac{\lambda_{h-1}}{\lambda_h}.
\tag{W.17}
\]

Using the existing h≤7 baseline graphs, an exploratory spectral calculation gave

\[
\frac{\lambda_{h-1}}{\lambda_h}\theta_{h-1}
=
0,\;
0.6620,\;
0.8022,\;
0.8353,\;
0.8052,\;
0.8567
\]

for \(h=2,\ldots,7\), where \(\theta_{h-1}\) is the largest modulus of the nontrivial Parry spectrum in the chosen presentation.

Hence the exploratory bound is

\[
\boxed{
z_v\theta_{h-1}<0.857<1
}
\tag{W.18}
\]

throughout the existing 15-profile family.

**Status:** exploratory floating-point spectral check.  
**Required before theorem use:** residual/interval/certificate-level eigenvalue audit and presentation-invariance check.

---

# 10. Block-contraction exploratory check

One-step singular-value contraction is not useful in the window presentation because much of the state shifts deterministically.

After blocking two context-memory lengths, an exploratory weighted \(L^2(\pi)\) calculation gave

\[
z^{2m}\|Q^{2m}\|_{2,\pi}
\approx
0.186,\;
0.240,\;
0.216,\;
0.097,\;
0.153
\]

for \(h=3,\ldots,7\).

All were comfortably below one.

Interpretation:

- a quantitative delayed-return tail certificate appears realistic;
- the correct contraction object is a blocked operator, not the one-step window transition.

**Status:** exploratory numerical evidence only.

---

# 11. Independent h4 soft/hard sign revalidation

A common-memory bivariate pressure implementation was built independently from the definitions.

For the h4 target profile

\[
v=(2,1,1),
\]

the soft tangent was reproduced as approximately

\[
\boxed{
a'_4(0)\approx-0.00734,
}
\tag{W.19}
\]

consistent with the manuscript value.

The hard endpoint remains approximately

\[
\boxed{
\Delta a_4\approx+0.008014.
}
\tag{W.20}
\]

Therefore the sign mismatch is real at the current numerical evidence level:

\[
\boxed{
a'_4(0)<0,
\qquad
\Delta a_4>0.
}
\tag{W.21}
\]

Consequences:

- the soft tangent does not determine the hard endpoint sign;
- any unrestricted soft-to-hard sign-persistence conjecture is false;
- Paper 2 and Paper 3 remain mathematically distinct.

**Audit requirement:** Claude should independently reproduce both signs and inspect all sign conventions.

---

# 12. Scalar root reduction

After separating the stationary rank-one term, write schematically

\[
\mathcal B_v
=
I
+
zO_1
+
z^2O_2
+
z^3(\text{centered return term}).
\tag{W.22}
\]

Suppose \(\mathcal B_v\) is invertible at the relevant root and define

\[
\phi_v(z,t)
=
\mathbf1^T
\mathcal B_v(z,t)^{-1}
m_v(t),
\tag{W.23}
\]

where \(m_v(t)\) is the target stationary-mass vector under the chosen recurrence convention.

The matrix determinant lemma reduces the hard root equation to

\[
\boxed{
z-1=z^3\phi_v(z,t).
}
\tag{W.24}
\]

Equivalently, with \(z=e^D\),

\[
\phi_v(e^D,t)
=
e^{-2D}-e^{-3D}.
\tag{W.25}
\]

Let

\[
\psi(D)=e^{-2D}-e^{-3D}.
\]

At the symmetry point \(D_t(0)=0\). Differentiating twice gives the candidate curvature formula

\[
\boxed{
D_{tt}
=
\frac{
\phi_{tt}
}{
\psi'(D)-z\phi_z
}.
}
\tag{W.26}
\]

Therefore

\[
\boxed{
\eta_v
=
-
\frac{
\phi_{tt}
}{
D_v\,[\psi'(D_v)-z_v\phi_z]
}.
}
\tag{W.27}
\]

Combining with the internally derived project decomposition

\[
\eta_v=-\frac43B(v)+\Xi_v
\]

gives the candidate representation

\[
\boxed{
\Xi_v
=
\frac43B(v)
-
\frac{
\phi_{tt}
}{
D_v\,[\psi'(D_v)-z_v\phi_z]
}.
}
\tag{W.28}
\]

**Status:** theorem candidate / derived formula under invertibility and convention assumptions.  
**Critical audit tasks:**

1. verify the sign in (W.26);
2. verify the precise definition of \(m_v\);
3. verify invertibility of \(\mathcal B_v\) at the relevant root;
4. verify presentation/gauge invariance of the final scalar response;
5. compare with the 2026 recurrence determinant directly.

---

# 13. Presentation-factor invariance of the curvature ratio

Suppose two recurrence equations differ by a nonvanishing analytic factor:

\[
\widetilde H(z,t)=g(z,t)H(z,t),
\qquad
g(z_0,0)\ne0.
\]

At the root \(H=0\) and, by symmetry, \(H_t=0\).

Then

\[
\widetilde H_z=gH_z
\]

and

\[
\widetilde H_{tt}=gH_{tt}.
\]

Therefore

\[
\boxed{
\frac{\widetilde H_{tt}}{\widetilde H_z}
=
\frac{H_{tt}}{H_z}.
}
\tag{W.29}
\]

Thus monomial/nonvanishing presentation factors do not affect the hard curvature formula (W.1).

This means the unresolved general recoding lemma remains important for conceptual cleanliness and determinant identities, but it is not necessarily a blocker for the scalar hard-response curvature.

---

# 14. Best next theorem target

The previous crude target

\[
|\Xi_v-\Xi_w|<8/3
\]

is probably too coarse.

A more structurally faithful target is now:

> Bound or classify \(\phi_{tt}\) using:
>
> - \(O_1\) partial-permutation structure;
> - \(O_2\) degree at most 2 plus the \(v_i=v_j+1\) Type-II condition;
> - centered-return contraction / lag expansion.

The desired result is an Abelian-specific criterion for the sign or ordering of

\[
\eta_v
=
-\frac43B(v)+\Xi_v.
\]

That is currently the strongest candidate for a genuinely new Paper 3 theorem.

---

# 15. What this changes for Paper 2

The delayed-return expansion gives a precise interpretation of the continuation-capacity mechanism:

\[
\text{finite continuation depth}
\approx
\text{truncated centered return series}.
\]

This suggests a future analytic upgrade of Paper 2:

\[
\text{finite-depth continuation contribution}
+
\text{certified blocked tail}.
\]

The h4 sign reversal can then be described as a concrete competition between:

- direct local overlap/composition terms;
- sufficiently deep centered return terms.

This should not be inserted into the manuscript until independently audited.

---

# 16. Epistemic classification

| Item | Status |
|---|---|
| Weighted recurrence carries hard response | strong independent numerical sanity check |
| Implicit-root formula (W.1) | direct calculus consequence under regularity |
| Path derivative identities (W.3)-(W.4) | exact finite-state Perron calculus |
| 3-transition target simplification | exact structural observation |
| shift-1 Abelian overlap lemma | exact elementary proof |
| shift-2 Abelian overlap classification | exact elementary proof candidate; audit requested |
| family-wide \(z\theta<0.857\) | exploratory numerical bound |
| blocked contraction values | exploratory numerical evidence |
| h4 soft/hard sign mismatch | independently numerically revalidated |
| scalar \(\phi_v\) reduction | theorem candidate; audit assumptions required |
| formula (W.28) for \(\Xi_v\) | candidate structural representation |
| Paper 3 novelty | NOT ESTABLISHED |

---

# 17. Main audit request

Claude should now answer:

1. Does the 2026 weighted Markov-hole formalism specialize exactly to the recurrence structure claimed here?
2. Are the shift-1 and shift-2 Abelian overlap lemmas correct and complete?
3. Is the scalar \(\phi_v\) reduction algebraically correct?
4. Does (W.28) genuinely provide a clean structural representation of \(\Xi_v\), or is it only a tautological repackaging?
5. Can the Abelian sparsity + centered-return contraction yield a nontrivial sign/order theorem?
6. What part, after Rukhin/Ramsey/Cheriyath prior-art subtraction, remains genuinely new?

No h=8 computation.

<!-- END 16_LATE_EVENING_WEIGHTED_MECHANISM_ADDENDUM.md -->

---

<!-- BEGIN 17_H8_BLINDNESS_INCIDENT_NOTE.md -->

# H8 Blindness Incident Note — 2026-08-26

**Purpose:** preserve research-protocol transparency.

During the exploratory derivation of the short Abelian overlap structure, a small brute-force side test was accidentally allowed to evaluate structural obstruction checks for some \(h\ge8\) values before the project's `H8_RUN = NO` constraint was noticed.

## What was NOT done

No h=8:

- profile-response computation;
- hard-response computation;
- Perron-root/profile-hole computation;
- asymptotic-variance computation;
- 15-profile extension;
- sign-prediction test;
- h8 target-response experiment.

No h≥8 results from the accidental side test were retained as research evidence or used in any theorem inference.

## What the accidental test concerned

Only a structural brute-force check related to shorter Abelian-square obstructions / overlap behavior of length-\(2h\) words.

## Required treatment

Conservative project recommendation:

\[
\boxed{
\text{record as PARTIAL ACCIDENTAL BLINDNESS EXPOSURE}
}
\]

rather than silently treating the h8 blindness protocol as untouched.

Claude should:

1. determine whether project governance classifies this as an `H8_BLINDNESS_BREACH`;
2. specify exactly which future h8 hypotheses, if any, are contaminated;
3. keep all h≤7 mechanism research independent of the discarded h≥8 side-test output.

The current audit packet intentionally contains no h≥8 numerical result from that side test.

<!-- END 17_H8_BLINDNESS_INCIDENT_NOTE.md -->

---

<!-- BEGIN 20_PAPER3_SHORT_CONTACT_INVARIANTS.md -->

# Paper 3 Addendum — Short-Contact Invariants for Abelian Profile Holes

**Date:** 2026-08-26  
**Status:** project-derived exact combinatorial lemmas; novelty NOT_ESTABLISHED.  
**Scope:** no h=8 computation and no D40 data.

This note adds a purely combinatorial layer to the hard-response research track. It explains why the profile invariant

\[
B(v)=\sum_i\left(v_i-\frac h3\right)^2
\]

is naturally visible already at one-step overlap depth, and why the cubic invariant

\[
J(v)=\prod_i\left(v_i-\frac h3\right)
\]

appears at the next short-contact depth.

The formulas below concern the **unrestricted profile orbit** before the bounded-avoidance baseline prunes target words. They should not be confused with actual contact frequencies inside \(L_{h-1}\).

---

# 1. Setup

Let the ternary alphabet be \(\Sigma=\{1,2,3\}\).

Fix a labeled half-Parikh profile

\[
v=(v_1,v_2,v_3),
\qquad
v_1+v_2+v_3=h.
\]

Let

\[
\mathcal P_v
=
\{X\in\Sigma^h:\Psi(X)=v\}.
\]

Choose \(X,Y\) independently and uniformly from \(\mathcal P_v\).

Then

\[
W=XY
\]

is an Abelian square of half-length \(h\) with labeled profile \(v\).

The number of half-words is

\[
N_v=\frac{h!}{v_1!v_2!v_3!}.
\]

Define centered counts

\[
\delta_i=v_i-\frac h3
\]

and

\[
B(v)=\sum_i\delta_i^2,
\qquad
J(v)=\delta_1\delta_2\delta_3.
\]

---

# 2. Shift-1 overlap criterion

Append one symbol \(z\) to \(W\), and ask when the shifted length-\(2h\) window

\[
W' = W[2..2h]\,z
\]

is again an Abelian square of half-length \(h\).

Write the original symbols using zero-based positions

\[
x_0,x_1,\ldots,x_{2h-1},
\]

and let the appended symbol be \(x_{2h}\).

Original balance gives

\[
\sum_{j=0}^{h-1}e_{x_j}
=
\sum_{j=h}^{2h-1}e_{x_j}.
\]

Shifted balance gives

\[
\sum_{j=1}^{h}e_{x_j}
=
\sum_{j=h+1}^{2h}e_{x_j}.
\]

Subtracting yields

\[
2e_{x_h}=e_{x_0}+e_{x_{2h}}.
\]

Since the \(e_i\) are standard basis vectors,

\[
\boxed{
x_0=x_h=x_{2h}.
}
\tag{C1}
\]

Therefore a shift-1 successor exists iff the first letters of \(X\) and \(Y\) coincide, and if it exists the appended symbol is uniquely determined.

The new half-profile remains exactly \(v\), not merely its permutation orbit, because the removed and inserted letters are equal.

---

# 3. Theorem — B is exactly one-step contact excess

For a uniformly random word from \(\mathcal P_v\),

\[
\Pr[X_1=i]=\frac{v_i}{h}.
\]

Hence

\[
\begin{aligned}
d_1(v)
&:=
\Pr[X_1=Y_1]
\\
&=
\sum_i\left(\frac{v_i}{h}\right)^2.
\end{aligned}
\]

But

\[
\sum_i v_i^2
=
B(v)+\frac{h^2}{3}.
\]

Therefore

\[
\boxed{
d_1(v)
=
\frac13+\frac{B(v)}{h^2}.
}
\tag{C2}
\]

Equivalently,

\[
\boxed{
B(v)
=
h^2\left(d_1(v)-\frac13\right).
}
\tag{C3}
\]

Thus \(B\) is not merely an algebraic quadratic invariant. It is exactly the excess probability, above the balanced \(1/3\) baseline, that the two independently permuted equal-composition halves have the same letter at the corresponding boundary position.

A second equivalent interpretation follows by linearity:

\[
\boxed{
\mathbb E
\#\{j\in\{1,\ldots,h\}:X_j=Y_j\}
=
\frac h3+\frac{B(v)}h.
}
\tag{C4}
\]

---

# 4. Connection to the hard-response local term

The project hard-response decomposition is

\[
\eta_v
=
-\frac43B(v)+\Xi_v.
\]

By (C3),

\[
\boxed{
\eta_v
=
-\frac{4h^2}{3}
\left(d_1(v)-\frac13\right)
+
\Xi_v.
}
\tag{C5}
\]

This gives the local term a direct contact interpretation:

> the symmetry-forced local hard-response contribution is proportional to the negative excess one-step self-contact density of the profile orbit.

This identity does **not** show that one-step contacts cause the whole response. The entire global mechanism is still contained in \(\Xi_v\).

In particular, bounded-avoidance admissibility can prune the unrestricted contact graph in a profile-dependent way.

---

# 5. Shift-1 graph structure

Let the vertices be all unrestricted profile-\(v\) Abelian squares \(XY\).

Whenever condition (C1) holds, the unique successor is the one-symbol cyclic rotation of the \(2h\)-word.

Thus the raw shift-1 contact graph is a subgraph of the cyclic-rotation permutation.

Consequently:

\[
\boxed{
\deg^+\le1,\qquad \deg^-\le1.
}
\tag{C6}
\]

Every component is therefore a directed path or directed cycle.

A directed cycle can occur only if the required equality survives around the entire rotation orbit. In that case

\[
x_j=x_{j+h}
\]

for every \(j\), so the two halves are identical as words:

\[
W=XX.
\]

Thus raw shift-1 cycles are precisely rotation-orbits of ordinary squares that satisfy the profile condition.

After restriction to the baseline-admissible target subset, the same degree bounds remain valid, while cycles/paths may be broken by pruning.

---

# 6. Shift-2 overlap classification

Now append two symbols and ask when the window shifted by two positions is again an Abelian square.

Let

- \(F\) be the Parikh vector of the first two removed symbols;
- \(M\) the Parikh vector of the two symbols crossing the old half boundary;
- \(R\) the Parikh vector of the two appended symbols.

Subtracting the original and shifted half-balance equations gives

\[
\boxed{
R=2M-F.
}
\tag{C7}
\]

Each of \(F,M,R\) is a length-2 ternary Parikh vector.

The only ways that \(2M-F\) can remain a nonnegative length-2 Parikh vector are:

### Type I

\[
\boxed{
F=M=R.
}
\tag{C8}
\]

### Type II

For distinct letters \(i,j\),

\[
\boxed{
F=2e_i,\qquad
M=e_i+e_j,\qquad
R=2e_j.
}
\tag{C9}
\]

There are no other possibilities.

Hence every target has at most two shift-2 successors:

\[
\boxed{
\deg^+O_2\le2.
}
\tag{C10}
\]

By reversing the argument,

\[
\boxed{
\deg^-O_2\le2.
}
\tag{C11}
\]

---

# 7. Same-profile constraint for Type II

The shifted first half has profile

\[
v' = v-F+M.
\]

For Type II,

\[
v'
=
v-e_i+e_j.
\]

If \(v'\) is required to lie in the same **unordered profile orbit** as \(v\), then the multiset of counts must be unchanged after transferring one unit from coordinate \(i\) to coordinate \(j\).

This occurs iff

\[
\boxed{
v_i=v_j+1.
}
\tag{C12}
\]

Thus Type-II shift-2 contacts are allowed only on unit gaps in the profile.

This is a discrete resonance absent from the purely polynomial invariant \(B\).

---

# 8. Mean raw shift-2 outdegree

Let

\[
H=h(h-1).
\]

For two draws without replacement from a uniformly random half-word of profile \(v\),

\[
\Pr[F=2e_i]
=
\frac{v_i(v_i-1)}{H},
\]

while for \(i<j\),

\[
\Pr[F=e_i+e_j]
=
\frac{2v_iv_j}{H}.
\]

The first and second halves are independent, so \(F\) and \(M\) are independent with this distribution.

Counting the number of ordered appended pairs realizing \(R\), the mean number of same-profile-orbit shift-2 successors is

\[
\boxed{
d_2(v)
=
\frac{
\sum_i v_i^2(v_i-1)^2
+
8\sum_{i<j}v_i^2v_j^2
+
2\!\!\sum_{\substack{i\ne j\\v_i=v_j+1}}
v_i^2(v_i-1)v_j
}{
h^2(h-1)^2
}.
}
\tag{C13}
\]

Define the unit-transfer resonance

\[
\boxed{
U(v)
=
\sum_{\substack{i\ne j\\v_i=v_j+1}}
v_i^2(v_i-1)v_j.
}
\tag{C14}
\]

Then (C13) is

\[
d_2(v)
=
\frac{N_{\rm I}(v)+2U(v)}{h^2(h-1)^2},
\]

where \(N_{\rm I}\) is the Type-I contribution.

---

# 9. Invariant form of the Type-I contribution

The symmetric polynomial

\[
N_{\rm I}(v)
=
\sum_i v_i^2(v_i-1)^2
+
8\sum_{i<j}v_i^2v_j^2
\]

can be expressed in the fundamental centered \(S_3\)-invariants \(B,J\).

Direct symmetric-polynomial reduction gives

\[
\boxed{
N_{\rm I}(v)
=
\frac1{18}
\Big[
45B^2
+
(12h^2-36h+18)B
-
(216h+108)J
+
6h^4-4h^3+6h^2
\Big].
}
\tag{C15}
\]

Therefore

\[
\boxed{
d_2(v)
=
\frac{
45B^2
+
(12h^2-36h+18)B
-
(216h+108)J
+
6h^4-4h^3+6h^2
+
36U(v)
}{
18h^2(h-1)^2
}.
}
\tag{C16}
\]

This formula was algebraically reduced symbolically and independently checked by direct finite enumeration in small h cases.

---

# 10. Invariant hierarchy interpretation

Equations (C2) and (C16) yield a clean short-contact hierarchy:

\[
\boxed{
\text{shift 1}
\quad\Rightarrow\quad
B
}
\]

while

\[
\boxed{
\text{shift 2}
\quad\Rightarrow\quad
B,\;J,\;\text{unit-transfer resonance }U.
}
\]

This is consistent with invariant theory:

- \(B\) is the unique quadratic \(S_3\)-invariant on the centered profile plane;
- \(J\) is the next basic invariant, of degree 3.

The contact calculation gives these invariants a direct combinatorial meaning rather than merely an invariant-theory label.

---

# 11. What this DOES and DOES NOT establish

## Established by the derivation

- exact raw shift-1 contact criterion;
- exact formula \(d_1=1/3+B/h^2\);
- exact shift-2 classification;
- exact degree bounds for \(O_1,O_2\);
- exact same-profile Type-II unit-gap condition;
- exact raw shift-2 mean formula;
- symmetric-polynomial reduction to \(h,B,J,U\).

## Not established

- that raw \(d_1\) or \(d_2\) predicts the hard-response sign;
- that the baseline-admissible contact matrices have the same averages;
- that \(B\) is causal by itself;
- that the 15 exposed h≤7 signs follow from these local formulas;
- novelty relative to all overlap literature.

The actual hard-response theorem still requires control of the centered return / continuation term.

---

# 12. Paper 3 significance

This short-contact theorem package improves the Paper 3 narrative:

\[
\text{profile invariant theory}
\]

is no longer disconnected from

\[
\text{pattern overlap geometry}.
\]

Instead:

\[
\boxed{
B
=
\text{one-step raw contact excess},
}
\]

and

\[
\boxed{
(B,J,U)
=
\text{two-step raw contact geometry}.
}
\]

The remaining dynamical correction \(\Xi_v\) is therefore naturally interpreted as the difference between:

1. these short local contact propensities; and
2. the actual baseline-conditioned, all-return weighted geometry.

This is the cleanest current bridge between the combinatorics-on-words layer and the pressure/return layer.

---

# 13. Novelty audit request

A targeted literature search located extensive work on:

- Abelian square avoidance;
- Abelian periods;
- pattern correlation matrices;
- additive powers and templates;

but no direct source was found in that pass for the exact profile-orbit formulas (C2), (C13), or (C16).

That is **not** a proof of novelty.

Claude should specifically search for:

- overlap autocorrelation of Abelian squares;
- consecutive shifted Abelian-square windows;
- Parikh-conditioned overlap probabilities;
- contact graphs of Abelian powers.

Until then:

\[
\boxed{\text{NOVELTY = NOT_ESTABLISHED}.}
\]

<!-- END 20_PAPER3_SHORT_CONTACT_INVARIANTS.md -->

---

<!-- BEGIN 21_PAPER3_BLOCKED_RETURN_TAIL_LEMMA.md -->

# Paper 3 Addendum — Blocked Tail Bound for Centered Return Expansions

**Status:** standard operator-norm lemma specialized to the project; not a novelty claim.

The weighted recurrence decomposition contains a centered return series

\[
R_*(z)
=
\sum_{n\ge0}z^nQ^n(I-\Pi),
\]

where

\[
P^T=\Pi+Q,
\qquad
Q\Pi=\Pi Q=0.
\]

The one-step norm can be poor in a window presentation because the window shifts deterministically. A blocked contraction is therefore the natural certificate.

---

# Lemma — blocked geometric tail

Let \(\|\cdot\|\) be any submultiplicative operator norm.

Assume that for some positive integer \(b\),

\[
\boxed{
\kappa:=\|z^bQ^b\|<1.
}
\]

Define

\[
C_b
=
\sum_{r=0}^{b-1}
\|z^rQ^r(I-\Pi)\|.
\]

Then for every integer \(m\ge0\),

\[
\boxed{
\left\|
\sum_{n\ge mb}
z^nQ^n(I-\Pi)
\right\|
\le
\frac{C_b\,\kappa^m}{1-\kappa}.
}
\tag{T1}
\]

## Proof

Write every \(n\ge mb\) uniquely as

\[
n=jb+r,
\qquad
j\ge m,\quad 0\le r<b.
\]

Since all factors are powers of the same matrix \(Q\),

\[
z^{jb+r}Q^{jb+r}(I-\Pi)
=
(z^bQ^b)^j
z^rQ^r(I-\Pi).
\]

Therefore

\[
\begin{aligned}
\left\|
\sum_{n\ge mb}
z^nQ^n(I-\Pi)
\right\|
&\le
\sum_{j\ge m}
\sum_{r=0}^{b-1}
\|(z^bQ^b)^j\|
\,
\|z^rQ^r(I-\Pi)\|
\\
&\le
C_b\sum_{j\ge m}\kappa^j
\\
&=
\frac{C_b\kappa^m}{1-\kappa}.
\end{aligned}
\]

\(\square\)

---

# Consequence for Papers 2 and 3

Once a certified block contraction is available, any finite return-depth approximation can be supplemented by an explicit tail interval.

For Paper 2 this gives the desired form

\[
\text{finite continuation contribution}
+
\text{certified delayed tail}.
\]

For Paper 3 it gives a rigorous route to replacing the infinite centered-return term inside the weighted recurrence matrix by a finite matrix plus an error enclosure.

The remaining work is not the geometric-series argument. It is:

1. certify \(\kappa<1\) for the exact baseline representation;
2. propagate the tail enclosure through the inverse/determinant or scalar \(\phi_v\) formula;
3. bound the first and second color derivatives required for \(\eta_v\).

The exploratory h≤7 block-contraction calculations suggest this route is numerically plausible, but those values are not theorem evidence until independently certified.

<!-- END 21_PAPER3_BLOCKED_RETURN_TAIL_LEMMA.md -->

---

<!-- BEGIN 22_BLOCK_ASSEMBLY_BOUNDARY_TEMPLATE_THEORY.md -->

# Track 4 — Constant-Length Block Assembly as a Finite Affine-Template Problem

**Date:** 2026-08-26  
**Status:** exact project-derived decomposition; closely related to established template machinery; novelty NOT_ESTABLISHED.  
**D40:** not used.

This note formalizes Veikko Keränen's block-assembly idea after removing the biological implementation layer.

---

# 1. Constant-length block coding

Let

\[
\Gamma
\]

be a finite macro alphabet and

\[
\Sigma=\{a,b,c\}
\]

the ternary output alphabet.

Let

\[
H:\Gamma\to\Sigma^L
\]

be a constant-length block coding.

For \(x\in\Gamma\), define its block Parikh vector

\[
m(x)=\Psi(H(x))\in\mathbb Z_{\ge0}^3.
\]

Let

\[
M
\]

be the \(3\times|\Gamma|\) matrix whose \(x\)-column is \(m(x)\).

For \(0\le s\le L\), define the prefix potential

\[
p_x(s)
=
\Psi(H(x)[0:s]).
\tag{A1}
\]

Let the macro word be

\[
w=x_0x_1x_2\cdots
\]

and the assembled ternary word

\[
X=H(w).
\]

---

# 2. Exact cut-coordinate formula

A cut in \(X\) is specified by

- macro index \(i\);
- phase \(s\in\{0,\ldots,L-1\}\).

The cumulative Parikh vector at that cut is, up to an irrelevant global origin,

\[
C(i,s)
=
\sum_{j<i}m(x_j)
+
p_{x_i}(s).
\tag{A2}
\]

An output factor beginning at \((i,s)\) with half-length \(K\) is an Abelian square iff

\[
\boxed{
C(i_2,s_2)-2C(i_1,s_1)+C(i,s)=0,
}
\tag{A3}
\]

where \((i_1,s_1)\) and \((i_2,s_2)\) are the cuts after \(K\) and \(2K\) output symbols.

This second-difference form is the cleanest starting point for boundary analysis.

---

# 3. Boundary-correction decomposition theorem

Write

\[
K=qL+r,
\qquad
0\le r<L.
\]

Define

\[
\epsilon_1
=
\left\lfloor\frac{s+r}{L}\right\rfloor,
\qquad
s_1=s+r-\epsilon_1L,
\]

\[
\epsilon_2
=
\left\lfloor\frac{s+2r}{L}\right\rfloor,
\qquad
s_2=s+2r-\epsilon_2L,
\]

and macro offsets

\[
n_1=q+\epsilon_1,
\qquad
n_2=2q+\epsilon_2.
\]

Let

\[
A=x_i x_{i+1}\cdots x_{i+n_1-1},
\]

\[
B=x_{i+n_1}\cdots x_{i+n_2-1}.
\]

Then (A3) is exactly

\[
\boxed{
M\bigl(\Psi_\Gamma(B)-\Psi_\Gamma(A)\bigr)
+
\beta_0
=
0,
}
\tag{A4}
\]

where

\[
\boxed{
\beta_0
=
p_{x_{i+n_2}}(s_2)
-
2p_{x_{i+n_1}}(s_1)
+
p_{x_i}(s).
}
\tag{A5}
\]

This already separates:

- a long additive macro contribution;
- a finite boundary correction.

---

# 4. The two macro intervals differ in length by at most one

We have

\[
|A|=q+\epsilon_1,
\]

\[
|B|=q+\epsilon_2-\epsilon_1.
\]

Thus

\[
|B|-|A|
=
\epsilon_2-2\epsilon_1.
\]

A direct case split on \(\epsilon_1\in\{0,1\}\) gives

\[
\boxed{
|B|-|A|\in\{-1,0,1\}.
}
\tag{A6}
\]

Therefore one can always move at most one whole macro block into the boundary correction and obtain **adjacent equal-length macro blocks** \(U,V\).

---

# 5. Equal-core form

### Case 1: \(|A|=|B|\)

Set

\[
U=A,\qquad V=B,\qquad \beta=\beta_0.
\]

### Case 2: \(|B|=|A|+1\)

Write

\[
B=Vx
\]

with \(|V|=|A|\). Set

\[
U=A,
\qquad
\beta=\beta_0+m(x).
\]

### Case 3: \(|A|=|B|+1\)

Write

\[
A=xU
\]

with \(|U|=|B|\). Set

\[
V=B,
\qquad
\beta=\beta_0-m(x).
\]

In all cases \(U,V\) are adjacent equal-length macro factors and

\[
\boxed{
M\bigl(\Psi_\Gamma(V)-\Psi_\Gamma(U)\bigr)
+
\beta
=
0.
}
\tag{A7}
\]

The correction \(\beta\) depends only on:

- phases \(s,r\);
- a bounded number of boundary macro letters;
- prefix Parikh vectors of the block code.

Hence the possible correction set

\[
\mathcal B_H
\]

is finite.

A coarse finite bound is immediate from

\[
L^2
\]

phase/residue choices and finitely many boundary-letter choices.

---

# 6. Two-dimensional reduction

Because all output halves compared in an Abelian square have equal length, equality of ternary Parikh vectors is equivalent to equality of any two coordinates.

Let

\[
\pi:\mathbb Z^3\to\mathbb Z^2
\]

forget one coordinate and define

\[
\overline M=\pi M,
\qquad
\overline\beta=\pi\beta.
\]

Then (A7) is equivalent to

\[
\boxed{
\overline M
\bigl(\Psi_\Gamma(V)-\Psi_\Gamma(U)\bigr)
=
-\overline\beta.
}
\tag{A8}
\]

Thus every output Abelian square corresponds to one of finitely many **affine additive-square templates in \(\mathbb Z^2\)**.

---

# 7. Block-aligned squares

If the square begins at a block boundary and \(K\) is a multiple of \(L\),

\[
s=r=0,
\]

so

\[
\beta=0.
\]

Then

\[
\boxed{
\overline M\Psi_\Gamma(U)
=
\overline M\Psi_\Gamma(V),
\qquad
|U|=|V|.
}
\tag{A9}
\]

This is precisely an additive square in the macro vector sequence.

Rao–Rosenfeld proved that \(\mathbb Z^2\) is not uniformly 2-repetitive: there exists an infinite sequence over a finite subset of \(\mathbb Z^2\) with no two consecutive blocks of equal size and equal sum.

Therefore block-aligned Abelian squares are **not** the fundamental obstruction.

The hard part is the finite family of nonzero boundary corrections \(\beta\).

---

# 8. Relation to the template method

Equation (A8) has exactly the shape handled by Abelian/additive template methods:

\[
\Phi(V)-\Phi(U)=d
\]

for a finite set of correction vectors \(d\).

For a morphic macro word, the Rao–Rosenfeld / Currie–Rampersad template machinery is therefore the default existing theory.

This note does **not** claim a new morphic template method.

The useful project contribution is the explicit reduction of a fixed-length block assembly to:

\[
\boxed{
\text{finite phase/residue set}
+
\text{finite affine Parikh corrections}.
}
\]

---

# 9. A crucial negative result for a bare contact graph

Suppose a finite directed contact graph \(G\) is used with the semantics:

> every directed path is an allowed block assembly.

Assume \(G\) has arbitrarily long directed paths.

Since \(G\) is finite, it contains a directed cycle.

Repeating that cycle gives a periodic macro word. Under any nonempty fixed-length block coding, the output is periodic.

If its period length is \(T\), then two consecutive copies of any multiple of the period form an exact square:

\[
UU.
\]

Choosing a multiple with half-length at least \(2\) gives a nontrivial Abelian square.

Therefore:

\[
\boxed{
\text{No finite contact graph with unrestricted path semantics can make all infinite paths globally nontrivial-Abelian-square-free.}
}
\tag{A10}
\]

This is a standard periodic-point obstruction in finite-state symbolic dynamics, but it is essential for interpreting Veikko's proposal correctly.

A finite contact graph can:

- enforce local seam safety;
- count bounded-cutoff survival;
- prune candidate transitions;

but it cannot by itself be the global all-period certifier.

---

# 10. Correct refined architecture

The block-assembly architecture should therefore be

\[
\boxed{
\text{finite contact graph}
+
\text{nonperiodic macro path rule}
+
\text{finite affine-template certificate}.
}
\]

Candidate macro path rules include:

- a known morphic Abelian/additive-square-free word;
- a template-certified morphic fixed point;
- another non-sofic/nonperiodic symbolic rule.

This is a major refinement of the original "all paths in a huge contact matrix" interpretation.

---

# 11. Research status

### Exact in this note

- second-difference cut formula;
- boundary-correction decomposition;
- length mismatch at most one;
- finite affine-template reduction;
- finite-contact-graph periodicity obstruction.

### Established prior art used

- additive-square avoidance over a finite subset of \(\mathbb Z^2\);
- morphic/additive template methods;
- kernel-control criteria for morphic images.

### Open project questions

1. Can the boundary correction set be compressed dramatically using block signatures?
2. Can one choose a known morphic macro core and find ternary blocks making every affine boundary template impossible?
3. Is there a useful graph-directed extension beyond known morphic template methods?
4. Can Veikko's length-40 block idea be embedded into such a morphic core without using unresolved D40 data?

Novelty remains NOT_ESTABLISHED.

<!-- END 22_BLOCK_ASSEMBLY_BOUNDARY_TEMPLATE_THEORY.md -->

---

<!-- BEGIN 23_BLOCK_ASSEMBLY_H6_LENGTH40_REDUCTION.md -->

# Track 4 — A Concrete h6 / Length-40 Assembly Reduction

**Date:** 2026-08-26  
**Status:** exact algebraic reduction + research design; no D40 search performed.  
**Goal:** connect Veikko's length-40 block idea to the strongest known Rao–Rosenfeld morphic core.

---

# 1. Known macro core

Rao–Rosenfeld use the primitive 3-uniform morphism

\[
h_6:
\begin{cases}
a\mapsto ace,\\
b\mapsto adf,\\
c\mapsto bdf,\\
d\mapsto bdc,\\
e\mapsto afe,\\
f\mapsto bce.
\end{cases}
\]

They prove that

\[
h_6^\omega(a)
\]

is Abelian-square-free over the six-letter macro alphabet.

They also construct a ternary morphism \(g_3\) with images of length 10:

\[
\begin{cases}
a\mapsto \texttt{bbbaabaaac},\\
b\mapsto \texttt{bccacccbcc},\\
c\mapsto \texttt{ccccbbbcbc},\\
d\mapsto \texttt{ccccccccaa},\\
e\mapsto \texttt{bbbbbcabaa},\\
f\mapsto \texttt{aaaaaaabaa}.
\end{cases}
\]

and prove that

\[
g_3(h_6^\omega(a))
\]

avoids Abelian squares of period greater than 5.

Their general theorem says that if

\[
E_e(M_{h_6})\cap\ker(M_g)=\{0\},
\]

then avoidance of sufficiently long Abelian powers in \(g(h_6^\omega(a))\) is decidable by a finite template computation.

For \(g_3\), they explicitly use this kernel condition.

---

# 2. Exact incidence matrix of g3

Using output coordinates \((\#a,\#b,\#c)\), the incidence matrix is

\[
M_{g_3}
=
\begin{pmatrix}
5&1&0&2&3&9\\
4&2&4&0&6&1\\
1&7&6&8&1&0
\end{pmatrix}.
\tag{H1}
\]

Every column sums to 10.

Its rank is 3 and its kernel has dimension 3.

---

# 3. Kernel-preserving affine lift

Let \(M\) be any block-incidence matrix whose columns all have the same length \(L_0\).

Fix

\[
s\in\mathbb N_{>0}
\]

and a common nonnegative vector

\[
u\in\mathbb Z_{\ge0}^3.
\]

Define

\[
\boxed{
M'
=
sM+u\mathbf1^T.
}
\tag{H2}
\]

Every new column has common length

\[
L'=sL_0+\mathbf1^Tu.
\]

## Lemma

\[
\boxed{
\ker M'=\ker M.
}
\tag{H3}
\]

### Proof

If \(Mx=0\), then because every column of \(M\) has length \(L_0\),

\[
0=\mathbf1^TMx=L_0\mathbf1^Tx,
\]

hence

\[
\mathbf1^Tx=0.
\]

Therefore

\[
M'x=sMx+u\mathbf1^Tx=0.
\]

Conversely, if \(M'x=0\), then

\[
0=\mathbf1^TM'x=L'\mathbf1^Tx,
\]

so \(\mathbf1^Tx=0\), and therefore

\[
sMx=M'x-u\mathbf1^Tx=0.
\]

Since \(s>0\),

\[
Mx=0.
\]

\(\square\)

Thus the Rao–Rosenfeld expanding-space/kernel condition is preserved exactly by this affine lift.

---

# 4. A natural length-40 lift

Take

\[
s=1,
\qquad
u=(10,10,10)^T.
\]

Then

\[
L'=10+30=40.
\]

The six target block Parikh vectors become:

\[
\boxed{
\begin{array}{c|ccc}
\text{macro letter}&\#a&\#b&\#c\\
\hline
a&15&14&11\\
b&11&12&17\\
c&10&14&16\\
d&12&10&18\\
e&13&16&11\\
f&19&11&10
\end{array}}
\tag{H4}
\]

All entries are positive and every block has length 40.

The resulting matrix has exactly the same kernel as \(M_{g_3}\).

This gives a direct mathematically controlled bridge to Veikko's length-40 block scale without using any existing D40 list.

---

# 5. Stronger equal-length difference preservation

For equal-length macro factors \(U,V\),

\[
d=\Psi_\Gamma(U)-\Psi_\Gamma(V)
\]

satisfies

\[
\mathbf1^Td=0.
\]

Therefore

\[
M'd=sMd.
\tag{H5}
\]

Thus the affine lift preserves **all block-aligned Parikh collisions on equal-length macro factors**, up to the harmless positive scale \(s\).

So any block-aligned collision absent under \(M_{g_3}\) is also absent under \(M'\).

---

# 6. Only 14 macro bigrams need local seam checks

Direct factor closure of \(h_6^\omega(a)\) gives exactly the 14 allowed bigrams:

\[
\boxed{
\begin{aligned}
\mathcal B_2=\{
&ac,ad,af,bc,bd,cb,ce,dc,df,\\
&ea,eb,fa,fb,fe
\}.
\end{aligned}}
\tag{H6}
\]

The set stabilizes after three substitution iterations.

This is a dramatic reduction from an arbitrary \(6^2=36\) pair system.

---

# 7. Small-period locality at block length 40

To solve Mäkelä's ternary problem one must eliminate Abelian-square half-lengths

\[
K\ge2.
\]

Rao–Rosenfeld already supply a finite template procedure for the long-period part.

Suppose the new code has length

\[
L=40.
\]

Any Abelian square with half-length

\[
2\le K\le5
\]

has total factor length

\[
2K\le10<40.
\]

Therefore such a factor can intersect at most **two consecutive length-40 images**.

Hence all periods \(2,3,4,5\) can be excluded by finite local checks on:

1. each of the six individual codewords;
2. the 14 allowed concatenations
   \[
   H(x)H(y),
   \qquad xy\in\mathcal B_2.
   \]

No longer macro context is needed for the small-period gate.

---

# 8. Finite reduction to a candidate search + exact long certifier

This gives the following exact research architecture.

Find six ternary length-40 blocks

\[
H(a),\ldots,H(f)
\]

such that:

### Gate S — prescribed Parikh columns

\[
\Psi(H(x))
\]

equals the corresponding column of (H4).

### Gate L — local small-period safety

No Abelian square of half-length

\[
2,3,4,5
\]

occurs inside any required image or across any of the 14 allowed image boundaries.

### Gate K — kernel condition

Automatically inherited from \(g_3\) by (H3).

### Gate T — long template certificate

Apply the established Rao–Rosenfeld template decision procedure to \(H(h_6^\omega(a))\) and certify that there is no Abelian square of period greater than 5.

If all gates pass, then

\[
\boxed{
H(h_6^\omega(a))
}
\]

is an infinite ternary word avoiding every Abelian square of half-length at least 2.

That would solve Mäkelä's ternary problem.

This statement is a reduction, not a claim that such six blocks have been found.

---

# 9. Why this is a refined form of Veikko's proposal

Veikko proposed using many length-40 aa2f/aa2fr chunks and a sparse contact relation.

The refined architecture says:

- keep the length-40 local block/contact idea;
- do **not** allow arbitrary contact-graph paths;
- use the fixed nonperiodic macro path \(h_6^\omega(a)\);
- search only six block roles with 14 seam types;
- preserve the known kernel geometry by an affine lift;
- let existing template theory certify the long-range part.

Thus the problem becomes much smaller and theoretically controlled.

---

# 10. D40 governance

No D40 list was searched, compiled, filtered, or audited in deriving this reduction.

If D40 rights/provenance are later resolved, one possible use would be to ask whether the six profiles in (H4) have suitable candidate blocks in that dataset.

Until then this remains a theoretical target specification only.

---

# 11. Search-space observation

Keeping the exact \(g_3\) length-10 Parikh vectors but merely permuting their letters would give a huge finite search space.

The length-40 affine lift provides still greater boundary freedom while preserving the kernel.

The search should therefore be formulated as a constraint problem over six roles rather than as arbitrary path enumeration over trillions of blocks.

Potential methods after governance approval:

- CP-SAT / exact cover;
- SAT with local period-2..5 clauses;
- meet-in-the-middle seam signatures;
- stochastic search followed by exact verification.

Every surviving candidate must still pass the rigorous long-template certifier.

---

# 12. Current novelty assessment

The following components are established or elementary:

- \(h_6\), \(g_3\), and their long-square theorem: Rao–Rosenfeld;
- kernel criterion: Rao–Rosenfeld;
- affine kernel preservation: elementary linear algebra;
- small-period locality for \(L\ge10\): elementary;
- finite pair list: direct computation from \(h_6\).

The potentially original project contribution is the **specific synthesis into a length-40 role-constrained search architecture**, especially if it leads to a successful certified coding.

The actual mathematical breakthrough would be finding and certifying such an \(H\), not the reduction by itself.

Novelty remains NOT_ESTABLISHED.

<!-- END 23_BLOCK_ASSEMBLY_H6_LENGTH40_REDUCTION.md -->

---

<!-- BEGIN 24_LITERATURE_CORRECTION_MAKELA_RAO.md -->

# Literature Correction Note — Mäkelä / Rao–Rosenfeld

**Date:** 2026-08-26  
**Purpose:** prevent a misleading sentence in one source from corrupting project state.

---

# 1. Mäkelä's ternary question

The question is:

> Does there exist an infinite ternary word avoiding Abelian squares \(UV\) with half-length \(|U|\ge2\)?

Rao–Rosenfeld's 2018 SIAM paper states this as Problem 1 and says they prove a **weaker positive result** after replacing 2 by 6:

\[
\text{there exists an infinite ternary word avoiding Abelian squares of period greater than 5.}
\]

Their Theorem 10/11 gives the explicit morphic construction.

Therefore the 2018 paper does **not** claim to settle the original period-\(\ge2\) problem.

---

# 2. Misleading sentence in Rao 2015

Michaël Rao's 2015 paper *On some generalizations of abelian power avoidability* lists Mäkelä's two questions:

1. ternary Abelian squares of half-length at least 2;
2. binary Abelian cubes of block length at least 2.

It then says:

> "In [24], we answer negatively to (1)."

However its cited reference [24] is Rao–Rosenfeld, *Avoidability of long k-abelian repetitions*.

That work's abstract and introduction say the negative result is for the **binary Abelian-cube question**, while the ternary-square question receives only weaker long-period positive results.

The 2018 Rao–Rosenfeld paper likewise continues to state the ternary question as Problem 1.

Therefore the 2015 sentence is internally inconsistent with the cited work and later paper.

The safest project treatment is:

\[
\boxed{
\text{likely cross-reference/numbering typo; do not treat as a theorem.}
}
\]

A plausible intended text is "answer negatively to (2)".

---

# 3. A second suspicious threshold line

The 2018 paper and Rosenfeld's thesis ask for the smallest \(p\) such that one can avoid Abelian squares of period **more than \(p\)** over three letters, and print

\[
2\le p\le5.
\]

But the original Mäkelä question corresponds to \(p=1\) in the phrase "period more than \(p\)".

Since the same work explicitly presents the original question as unresolved and only proves the \(p=5\) upper bound, the printed lower-bound line should not be used as evidence that \(p=1\) is impossible without a separate source/proof.

This packet therefore treats the exact lower endpoint in that sentence as **source-ambiguous**.

---

# 4. Verified safe literature facts

The following are safe:

1. Rao–Rosenfeld prove an infinite ternary word avoiding Abelian squares of period \(>5\).
2. They prove \(\mathbb Z^2\) is not uniformly 2-repetitive.
3. Their morphic/template method decides long Abelian-power avoidance under the stated expanding-space/kernel condition.
4. Their \(g_3(h_6^\omega(a))\) construction is a strong starting point for a new outer coding.
5. Long finite ternary aa2f/aa2fr records do not by themselves settle infinite existence.

---

# 5. Audit recommendation

Claude should verify this source inconsistency independently.

Until then:

- do not mark Mäkelä/FORBID4 as solved;
- do not use the 2015 "negative to (1)" sentence;
- do not use the printed \(2\le p\le5\) lower bound to infer impossibility at period \(\ge2\).

The project should cite the explicit theorem statements and proofs, not ambiguous prose.

<!-- END 24_LITERATURE_CORRECTION_MAKELA_RAO.md -->

---

<!-- BEGIN 25_CLAUDE_V3_PAPER3_AND_ASSEMBLY_PROMPT.md -->

# Claude V3 Priority Prompt — Paper 3 Completion + Block Assembly

**Date:** 2026-08-26  
**Do not modify Git.**  
**Do not compute h=8.**  
**Do not use D40.**  
**Novelty starts as NOT_ESTABLISHED.**

This supersedes the earlier weighted-mechanism priority prompt.

---

# Part I — Paper 3 first

Read:

- `20_PAPER3_SHORT_CONTACT_INVARIANTS.md`
- `21_PAPER3_BLOCKED_RETURN_TAIL_LEMMA.md`
- `16_LATE_EVENING_WEIGHTED_MECHANISM_ADDENDUM.md`

## Task P3-A — clean-room proof audit

Independently prove or refute:

\[
d_1(v)=\frac13+\frac{B(v)}{h^2}.
\]

Then independently derive the shift-2 classification and

\[
d_2(v)
=
\frac{
45B^2+(12h^2-36h+18)B-(216h+108)J
+6h^4-4h^3+6h^2+36U(v)
}{
18h^2(h-1)^2
}.
\]

Check all factors 2, ordered/unordered-pair conventions, and the same-profile Type-II condition.

## Task P3-B — novelty audit

Search specifically for prior formulas on:

- overlaps of consecutive Abelian squares;
- Parikh-conditioned autocorrelation;
- shifted Abelian-square windows;
- profile contact graphs.

Classify the short-contact theorem as:

- `KNOWN`
- `ELEMENTARY_NEW_PRESENTATION`
- `POSSIBLY_NEW_LEMMA`
- `NOVELTY_UNRESOLVED`.

## Task P3-C — connect contact invariants to the weighted recurrence

Starting from the 2026 Markov-hole recurrence, identify exactly where:

- the raw shift-1 \(B\)-contact;
- the shift-2 \(B,J,U\) contact;
- baseline admissibility pruning;
- centered returns

enter the second color derivative.

Do not fit the exposed 15 response signs.

## Task P3-D — theorem target

Try to prove a nontrivial Abelian-specific statement controlling the hard response, using:

\[
O_1:\deg\le1,
\]

\[
O_2:\deg\le2,
\]

the unit-transfer condition, and a certified centered-return tail.

A useful result can be:

- a sign condition;
- an ordering condition;
- an explicit sufficient inequality;
- a certified finite-depth mechanism criterion.

A result need not prove a universal minimum-\(B\) law.

---

# Part II — Block Assembly after Paper 3

Read:

- `22_BLOCK_ASSEMBLY_BOUNDARY_TEMPLATE_THEORY.md`
- `23_BLOCK_ASSEMBLY_H6_LENGTH40_REDUCTION.md`
- `24_LITERATURE_CORRECTION_MAKELA_RAO.md`
- `26_V3_STRUCTURAL_REPRODUCIBILITY.py`
- `27_V3_STRUCTURAL_REPRODUCIBILITY_OUTPUT.txt`

## Task BA-A — boundary theorem

Audit the exact decomposition:

\[
M(\Psi(V)-\Psi(U))+\beta=0
\]

with adjacent equal-length macro cores \(U,V\) and finite boundary correction set.

Determine whether this is already explicitly contained in standard template formulations.

## Task BA-B — bare contact graph obstruction

Audit the claim:

> a finite contact graph with unrestricted path semantics cannot make all infinite fixed-length assemblies globally Abelian-square-free, because an infinite finite graph contains a repeatable directed cycle producing a periodic output.

Classify this as standard symbolic-dynamics observation vs useful project lemma.

## Task BA-C — h6 / length-40 reduction

Audit:

1. the 14 bigrams of \(h_6^\omega(a)\);
2. the \(g_3\) incidence matrix;
3. the kernel-preserving affine lift
   \[
   M'=M_{g_3}+u1^T,\qquad u=(10,10,10)^T;
   \]
4. the six length-40 Parikh roles;
5. the small-period locality claim for periods 2–5;
6. the claim that the Rao–Rosenfeld long-power decision theorem remains applicable because the kernel is unchanged.

## Task BA-D — assess the research route

The candidate route is:

\[
h_6^\omega(a)
\to
\text{six length-40 ternary images}
\to
\text{14 seam constraints for periods 2--5}
\to
\text{Rao--Rosenfeld long-template certificate}.
\]

If all checks passed for one coding \(H\), the output would solve Mäkelä's period-\(\ge2\) ternary problem.

Do not search D40.

Judge whether this route is:

- mathematically sound but computationally unrealistic;
- a serious search program;
- already essentially attempted in the literature;
- or blocked by an overlooked theorem.

## Task BA-E — current 2026 template literature

Compare against:

- Rao–Rosenfeld 2018;
- Currie–Rampersad template method;
- Eyidoğan–Göral–Tanısalı 2026 sieve technique.

Do not reinvent existing parent/ancestor machinery.

---

# Part III — literature correction

Audit the conflict documented in `24_LITERATURE_CORRECTION_MAKELA_RAO.md`.

In particular distinguish:

- the binary Abelian-cube question, which Rao–Rosenfeld answer negatively;
- the ternary Abelian-square period-\(\ge2\) question;
- the proven weak threshold \(>5\).

Do not mark FORBID4/Mäkelä solved from an ambiguous sentence.

---

# Required final verdict

Return:

### Paper 3
- strongest verified theorem;
- strongest possibly novel theorem;
- remaining blocker;
- score 1–10.

### Block Assembly
- mathematical soundness of the h6/40-role reduction;
- nearest prior art;
- whether it deserves active research status;
- three next computations/proofs **without h8 or D40**.

### Governance
- no Git changes;
- no h8 computation;
- no D40 use.

<!-- END 25_CLAUDE_V3_PAPER3_AND_ASSEMBLY_PROMPT.md -->

---

<!-- BEGIN 32_V3_PACKET_INTEGRITY_2026-08-26.md -->

# V3 Packet Integrity Check — 2026-08-26

| Check | Result |
|---|---|
| V3 canonical state added | PASS |
| V3 paper registry added | PASS |
| Paper 3 theorem skeleton added | PASS |
| Paper 2 integration note added | PASS |
| short-contact files 20/21 retained | PASS |
| Block Assembly files 22/23 retained | PASS |
| literature correction 24 retained | PASS |
| V3 Claude prompt 25 retained | PASS |
| V3 reproducibility code/output 26/27 retained | PASS |
| no Git mutation | PASS |
| no h=8 computation | PASS |
| no D40 use | PASS |
| novelty remains NOT_ESTABLISHED | PASS |
| shift-2 no longer mislabeled as future work | PASS |
| main Paper 3 gap recorded as Xi control | PASS |
| actual six-role coding H not claimed found | PASS |
| fresh rerun of V3 structural checker | PASS (116 profiles; h6/40 checks; EXIT_CODE=0) |

This is a package-state integrity check, not an independent mathematical proof audit.

<!-- END 32_V3_PACKET_INTEGRITY_2026-08-26.md -->

---

