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

