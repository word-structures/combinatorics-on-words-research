# CLAUDE MAX — FOCUSED AUDIT OF PAPER 6 MAIN THEOREM v2.6

You are auditing ONE theorem package only.

Do not redo the entire Paper-6 project and do not continue the research until
the theorem has been independently attacked.

Use maximal reasoning.

## Inputs to read first

1. `PAPER6_EXACT_SPACETIME_OBSERVABILITY_SPECTRUM_THEOREM_v0.1_2026-08-30.md`
2. `P6_Q2_EXACT_SPACETIME_OBSERVABILITY_SPECTRUM_CERT_v0.1_2026-08-30.json`
3. `PAPER6_CROSS_INSTANCE_SPACETIME_OBSERVABILITY_THEOREM_v0.1_2026-08-30.md`
4. `P6_SPACETIME_OBSERVABILITY_CROSS_INSTANCE_EXACT_CERT_v0.1_2026-08-30.json`
5. `PAPER6_GRID_ALIGNMENT_DEGENERACY_AND_MINIMAL_REPAIR_v0.1_2026-08-30.md`
6. `P6_Q2_PROFILE_ONLY_EXACT_RATIONAL_RANK_CERT_v0.1_2026-08-30.json`
7. the exact vector-dimension certificates
8. the v2.6 replay scripts.

The previous broad adversarial audit is provenance only. Do not simply repeat
its conclusions.

---

## A. Audit the mathematical definition

The future space is

\[
V_{\rm cnt}
=
\operatorname{span}_{\mathbb Q}
\{\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots\}.
\]

For a structural measurement \(M_m\),

\[
\mathcal O_{m,t}
=
[M_m;M_mQ;\ldots;M_mQ^{t-1}]|_{V_{\rm cnt}}.
\]

Verify carefully that the implementation's left/right conventions really
correspond to this definition.

Check whether the generated numerical matrix is mathematically
\(\mathcal O_{m,t}\), or a transpose/shifted variant whose rank happens to be
the same.

PASS/FAIL this explicitly.

---

## B. Audit exact target dimensions

Independently verify the logical certificates for:

- BAL3 L4 Q1: \(d=4\);
- FULL L4 Q1: \(d=153\);
- INTERIOR L5 Q1: \(d=72\);
- HASH30 L4 K5: \(d=47\);
- FULL L4 Q2: \(d=1179\).

For FULL L4 Q1 specifically check the new short proof:

1. scalar Hankel rank exactly 153 gives \(d\ge153\);
2. the degree-153 polynomial annihilates the complete vector \(Q^n1\);
3. therefore \(d\le153\).

Do not accept an exact label merely because it appeared in an older status
document.

---

## C. Audit the observability indices

The main claims are:

### BAL3 L4 Q1
\[
\nu_1=2,\quad\nu_2=1.
\]

### FULL L4 Q1
\[
\nu_1=26,\quad\nu_2=3,\quad\nu_3=1.
\]

### INTERIOR L5 Q1
\[
\nu_1=15,\quad\nu_2=3,\quad\nu_3=1.
\]

### HASH30 L4 K5, fixed alphabet orientation
\[
\nu_1=5,\quad\nu_2=1.
\]

### FULL L4 Q2
\[
\nu_1=197,\quad\nu_2=24,\quad\nu_3=4,\quad\nu_4=2.
\]

For every claim:

1. verify the realized family count \(g_m\);
2. verify the row-count lower bound;
3. reproduce the certifying full rank using an independent rank
   implementation if practical;
4. check that modular full rank plus exact rational target dimension really
   proves the rational upper side;
5. check the immediately previous time slice whenever it is not already
   ruled out solely by row count.

---

## D. Try to destroy the “row-count optimality” interpretation

The observed pattern is that 14/15 tested profile-depth pairs attain

\[
\nu_m=\lceil d/g_m\rceil,
\]

with the sole exception FULL-L4/Q2 \(m=4\).

Look for confounds:

- Is the result automatic from the cyclicity of \(V_{\rm cnt}\)?
- Is it automatic for a generic measurement matrix and therefore scientifically
  uninteresting?
- Are profile-family rows secretly close to random rows after quotienting?
- Does recency canonicalization artificially maximize row independence?
- Does the same result hold for completely random partitions with the same
  family-size distribution?
- Does the profile-time rank grow because of initialization/transient effects
  rather than persistent future dynamics?
- Is the fixed-orientation HASH30 control actually comparable?
- Are there other natural structural measurements that fail badly?

Classify the claim as:

**NONTRIVIAL ABELIAN STRUCTURE / GENERIC LINEAR ALGEBRA EFFECT / MIXTURE /
NOT YET DISTINGUISHED.**

This classification is important.

---

## E. Audit the unique Q2 four-profile exception

The exact facts are claimed to be:

\[
\operatorname{rank}_{\mathbb Q}M_4=1144,
\qquad
\dim V_{\rm cnt}=1179,
\]

so

\[
\dim(V_{\rm cnt}\cap\ker M_4)=35.
\]

And

\[
\operatorname{rank}[M_4;M_4Q]=1179.
\]

Verify that this genuinely implies

\[
H_4\cap\ker(M_4Q)=\{0\}.
\]

Then audit the relationship between:

- one-step dynamic repair;
- the exact minimal 35-row static phase repair;
- the 15/16 anchor-policy result.

Determine whether “static–dynamic duality” is a useful theorem-level statement
or merely a linear-algebra restatement.

---

## F. Persistent-space version

The paper has an independently exact persistent dimension 1167 in Q2.

Ask whether the space–time spectrum should be stated for:

1. the full 1179-dimensional future;
2. the persistent 1167-dimensional future;
3. both.

If the persistent spectrum differs materially, identify it.

Do not let a transient-only effect masquerade as the main phenomenon.

---

## G. Literature/novelty boundary

Do NOT allow novelty claims for:

- observability matrices;
- observability index;
- row-count lower bounds;
- Krylov/Hankel dimension;
- delayed measurements;
- generic full-rank/transversality.

The novelty question is narrower:

> Is an exact, near-row-count-optimal space–time observability spectrum for
> coarse Parikh-profile measurements of selected Abelian-avoidance futures a
> meaningful new combinatorial phenomenon, or just an application of generic
> observability to one finite system?

Use the literature audit as a starting point, but independently challenge the
positioning.

---

## H. Referee verdict

Return:

### 1. PASS / FAIL / NEEDS CLOSURE
for the v2.5 Q2 theorem.

### 2. PASS / FAIL / NEEDS CLOSURE
for the v2.6 cross-instance theorem.

### 3. Strongest manuscript-safe Main Theorem
written exactly as you would permit it to appear.

### 4. Strongest objection
that a skeptical combinatorics-on-words referee could still make.

### 5. One next mathematical experiment/theorem
that most efficiently decides whether this is a genuinely general Abelian
phenomenon.

Do not optimize for a positive result.
