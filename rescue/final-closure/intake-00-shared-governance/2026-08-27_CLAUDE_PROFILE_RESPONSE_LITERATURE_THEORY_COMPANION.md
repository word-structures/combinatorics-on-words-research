# Claude Companion Intake — Profile-Response Literature + Theory Delta

**Prepared:** 2026-08-25  
**Intended Claude session:** 2026-08-27  
**Project:** `word-structures/combinatorics-on-words-research`

## 0. Status and epistemic rules

This is a **companion intake**, not a claims ledger and not a substitute for `LITERATURE_COVERAGE.md` or `MATH_CLAIMS.md`.

Its purpose is to record:

1. literature that is especially relevant to the **new profile-response / variance-response mechanism**;
2. important references that are not yet named precisely enough in the repository audit queue;
3. new mathematical deductions and conjectures that Claude should **independently derive or attack**.

### Source-status rule

Every external source below is one of:

- **REPO-OPENED** — only if `LITERATURE_COVERAGE.md` already says the primary source was directly opened under repository standards;
- **WEB-LOCATED / AUDIT REQUIRED** — bibliographic identity and broad relevance were located externally, but this does **not** satisfy the repository's direct-primary-source audit standard.

Do not promote a WEB-LOCATED source to “opened”, “verified”, or claim authority without a direct audit and repository record.

**NOVELTY_STATUS = NOT_ESTABLISHED**

**H8_RUN = NO**  
**H8_BLINDNESS_BREACH = NO**

---

# A. What the repository already contains

Current documentation already has a good high-level profile-response audit queue:

- Bóna, Maga & Richey (2026)
- Guibas–Odlyzko
- Goulden–Jackson
- Parry / Perron
- Cheriyath / Agarwal / Tikekar
- Chandgotia / Marcus / Richey / Wu
- Markov pressure / Poisson / Green–Kubo sensitivity
- Drazin / group inverse
- multivariate pattern correlation / cumulants

The main Claude mechanism intake already separates:

- frozen h=2,...,7 computation,
- RUN2 / RUN3B / RUN3C correction history,
- asymptotic-variance formula,
- B and J as candidate invariants,
- local-composition vs temporal-correlation mechanism,
- novelty NOT_ESTABLISHED,
- no h=8.

That is a strong skeleton.

It is **not yet a sufficiently precise literature map for the new theory**, because several especially load-bearing sources are only represented by broad traditions, and several new literature directions arose after the latest theoretical synthesis.

---

# B. High-priority literature delta

## B1. Forbidden-pattern perturbation and correlation structure

### 1. D. A. Lind — *Perturbations of Shifts of Finite Type*

**Citation:** D. A. Lind, “Perturbations of Shifts of Finite Type,” *SIAM Journal on Discrete Mathematics* 2(3), 350–365 (1989).  
**DOI:** `10.1137/0402031`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0 — MUST AUDIT

Why this is load-bearing:

- directly studies an SFT after forbidding a word;
- derives spectral / zeta-function effects of the perturbation;
- correlation polynomial of the forbidden word appears explicitly;
- this is closer to our “perturb the Perron system by a forbidden local pattern” framework than a generic thermodynamic-formalism citation.

Claude must determine:

- which parts apply only to one forbidden word;
- whether Lind’s correlation-polynomial formulation has a direct multi-pattern / profile-orbit analogue;
- whether any derivative/statistical-response statement already appears there.

---

### 2. L. J. Guibas & A. M. Odlyzko — *String overlaps, pattern matching, and nontransitive games*

**Citation:** JCTA 30(2), 183–208 (1981).  
**DOI:** `10.1016/0097-3165(81)90005-4`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P1

Core relevance:

- introduces correlation of strings / overlaps;
- gives generating functions for words avoiding a finite set of patterns;
- foundational route for converting forbidden-pattern overlap structure into exact algebra.

Claude should identify whether our profile-orbit forbidden set can be encoded by a correlation matrix in a way that exposes the candidate dynamical correction term.

---

### 3. I. P. Goulden & D. M. Jackson — cluster method

**Primary article:** “An Inversion Theorem for Cluster Decompositions of Sequences with Distinguished Subsequences,” *Journal of the London Mathematical Society* s2-20(3), 567–576 (1979).  
**DOI:** `10.1112/jlms/s2-20.3.567`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P1

Core relevance:

- overlapping forbidden patterns are organized into clusters;
- potentially gives an alternative algebraic representation to the automaton / transfer-matrix route.

Claude should test whether the profile-orbit response can be expressed by a finite cluster/correlation object rather than only by a large graph resolvent.

---

## B2. Closest modern forbidden-pattern statistical response

### 4. M. Bóna, B. Maga & J. Richey — *Letter frequency in shifts of finite type with one forbidden word*

**arXiv:** `2606.06655` (2026)  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0 — MUST AUDIT

Broad externally located scope:

- binary alphabet;
- one forbidden word;
- response of average letter frequency;
- relevant combinatorial information encoded by a two-variable autocorrelation / border polynomial;
- classifies examples where forbidding a word raises, lowers, or leaves the frequency unchanged.

Why it matters:

This is probably the closest known modern analogue to our question:

> how does a local forbidden object change a statistical observable of the maximal-entropy / Perron system?

Critical difference to audit:

- their observable is a **first moment / mean frequency**;
- our S3-symmetric setting freezes the mean at 1/3, so the first non-trivial statistic is naturally **second-order fluctuation / asymptotic variance**;
- they use one binary forbidden word; we use a ternary **S3-orbit / profile class** of forbidden Abelian-square windows.

Claude must search the complete paper for:

`variance`, `asymptotic variance`, `pressure derivative`, `second derivative`, `ternary`, `Parikh`, `orbit`, `multiple forbidden patterns`.

Do not infer absence from the abstract alone.

---

### 5. N. Chandgotia, B. Marcus, J. Richey & C. Wu — *Shifts of finite type obtained by forbidding a single pattern*

**arXiv:** `2409.09024`  
**Published:** *Discrete & Continuous Dynamical Systems* 48 (2026), 538–576  
**DOI:** `10.3934/dcds.2025152`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0

Broad relevance:

- autocorrelation polynomial controls avoidance counts / invariants;
- finite-state labeled graph representation;
- Perron–Frobenius and probability methods;
- directly connects pattern structure with SFT structure.

Claude should compare their graph construction to our de Bruijn / higher-block presentation and ask whether our profile-orbit family has extra S3 quotient structure that can be exploited.

---

## B3. Multiple holes / cross-correlations

### 6. H. Cheriyath & N. Agarwal — *Subshifts of Finite Type with a Hole*

**arXiv:** `1905.11767`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0

Broad relevance:

- holes are unions of cylinders;
- escape rate depends on correlations between forbidden words;
- non-zero cross-correlations can destroy simple orderings.

This is important as a **red-team source** against “B alone determines the sign”.

Our profile class is not one word: it is a symmetry orbit / collection of local forbidden objects. Cross-correlation effects are therefore structurally unavoidable.

---

### 7. N. Agarwal, H. Cheriyath & S. N. Tikekar — *On Escape rate for subshift with Markov measure*

**arXiv:** `2401.05118` (2024)  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P1

Broad relevance:

- SFT with Markov measure;
- unions of cylinders as holes;
- spectral-radius and recurrence formulations.

Claude should determine whether their finite-matrix machinery offers an exact bridge between profile deletion and a correlation/return representation.

---

# C. Pressure derivatives and fluctuation response

## C1. Classical pressure / variance bridge

### 8. W. Parry & M. Pollicott — *Zeta Functions and the Periodic Orbit Structure of Hyperbolic Dynamics*

**Astérisque:** 187–188 (1990)  
**Status:** WEB-LOCATED / AUDIT REQUIRED for this profile-response use  
**Priority:** P1

The repository currently says “Parry / Perron” generically. That is too vague for Claude.

Claude should identify a precise classical theorem supporting:

\[
P''(0)=\text{asymptotic variance}
\]

for Hölder / locally constant observables on a mixing SFT, together with the hypotheses and normalization conventions.

---

## C2. Higher pressure derivatives — especially important for our candidate mixed third derivative

### 9. Liangang Ma & Mark Pollicott — *Rigidity of pressures of Hölder potentials and the fitting of analytic functions through them*

**Journal:** *Ergodic Theory and Dynamical Systems* 44(12), 3530–3564 (2024)  
**DOI:** `10.1017/etds.2024.9`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0 — MUST AUDIT

Why this was missing from the generic queue:

Our proposed infinitesimal variance response is a **mixed third pressure derivative**:

\[
\partial_\varepsilon \partial_t^2 P(t,\varepsilon).
\]

This paper explicitly studies **higher derivatives of pressure** on finite-symbol shift spaces and connects them to statistical quantities.

Claude must audit:

- exact third-derivative / cumulant formulas;
- multivariate or polarization versions needed for two observables \(f\) and \(g_v\);
- whether the mixed third derivative we need is already a standard corollary.

This source is likely more directly relevant to the new derivation than a generic “Green–Kubo” citation.

---

# D. Poisson equation, group inverse and asymptotic variance

## 10. C. D. Meyer Jr. — *The Role of the Group Generalized Inverse in the Theory of Finite Markov Chains*

**Journal:** *SIAM Review* 17 (1975), 443–464  
**DOI:** `10.1137/1017044`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P1

This is a classical finite-state foundation for the group inverse of \(I-P\).

---

## 11. Dan J. Spitzner & Thomas R. Boucher — *Asymptotic variance of functionals of discrete-time Markov chains via the Drazin inverse*

**Journal:** *Electronic Communications in Probability* 12 (2007), 120–133  
**DOI:** `10.1214/ECP.v12-1262`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0

This is a much more precise source than the current generic “Drazin / group inverse” queue entry.

Direct relevance:

- asymptotic variance;
- Drazin inverse of \(I-P\);
- sliding-window observables.

The sliding-window aspect is especially relevant because our deleted object is a local \(2h\)-window while the variance observable can be represented on a higher-block Markov chain.

Claude should compare the paper’s formula with the repository’s corrected Poisson formula:

\[
\sigma^2 = 2\langle f,g\rangle_\pi-\langle f,f\rangle_\pi,
\qquad
(I-P+\Pi)g=f.
\]

---

# E. Soft penalty → hard forbidden limit

This literature direction became important only after formulating the **soft-to-hard sign-persistence** idea.

## 12. J.-R. Chazottes, J.-M. Gambaudo & E. Ugalde — *Zero-temperature limit of one-dimensional Gibbs states via renormalization: the case of locally constant potentials*

**Journal:** *Ergodic Theory and Dynamical Systems* 31(4), 1109–1161 (2011)  
**DOI:** `10.1017/S014338571000026X`  
**arXiv:** `0903.1212`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P0 if the soft-to-hard conjecture remains central

Broad relevance:

- finite alphabet;
- locally constant potentials;
- Gibbs states as inverse temperature goes to infinity;
- limiting measure supported on an SFT.

Our soft penalty

\[
-\varepsilon g_v
\]

with \(\varepsilon\to\infty\) is a finite-range / locally constant zero-temperature-type limit.

Claude must determine:

- whether hard deletion is exactly captured by this framework under our presentation;
- what happens if the zeroed graph has multiple maximal components;
- whether asymptotic variance necessarily converges to the hard-deletion variance.

---

## 13. R. Leplaideur & J. K. Mengue — *On the selection of subaction and measure for perturbed potentials*

**Published:** *Ergodic Theory and Dynamical Systems* 46(3), 660–694 (2026)  
**DOI:** `10.1017/etds.2025.10255`  
**arXiv:** `2404.02182`  
**Status:** WEB-LOCATED / AUDIT REQUIRED  
**Priority:** P2 / contextual

Potentially useful if we need quantitative control of the \(\varepsilon\to\infty\) approach, but it should not displace the older locally-constant SFT literature.

---

# F. New theory delta — FOR CLAUDE TO RED-TEAM, NOT TO ACCEPT

Everything in this section is a **candidate derivation or new inference**, not a canonical project claim.

## F1. Ternary profile coordinates

Let

\[
v=(v_1,v_2,v_3),
\qquad
v_1+v_2+v_3=h,
\]

and set

\[
x_i=v_i-\frac h3.
\]

Then

\[
x_1+x_2+x_3=0.
\]

Canonical quadratic imbalance:

\[
B(v)=x_1^2+x_2^2+x_3^2.
\]

Elementary identity:

\[
B(v)=\frac{(v_1-v_2)^2+(v_2-v_3)^2+(v_3-v_1)^2}{3}.
\]

Candidate cubic invariant:

\[
J(v)=x_1x_2x_3.
\]

Because \(x_1+x_2+x_3=0\), the unordered centered profile is encoded by the cubic

\[
z^3-\frac{B}{2}z-J.
\]

Thus \((B,J)\) determines the profile up to letter permutation.

Also:

\[
\prod_{i<j}(v_i-v_j)^2=\frac{B^3}{2}-27J^2.
\]

These are classical algebraic identities, not novelty claims.

---

## F2. Why B should appear in a second-order statistic

Let a fixed-letter centered observable be

\[
f_i=\mathbf 1_{\{x_i=a\}}-\frac13.
\]

For an Abelian-square window of total length \(2h\) with half-profile \(v\), define

\[
F_W=\sum_{i\in W} f_i.
\]

The two halves have the same Parikh vector, hence for the letter that is mapped to profile coordinate \(v_a\),

\[
F_W=2\left(v_a-\frac h3\right).
\]

If the profile class is taken as its full \(S_3\)-orbit and the reference measure is \(S_3\)-symmetric, then candidate exact identity:

\[
\mathbb E(F_W^2\mid E_v)=\frac43 B(v).
\]

Likewise the cubic local moment suggests

\[
\mathbb E(F_W^3\mid E_v)=8J(v).
\]

Claude must verify all orbit-weighting and centering assumptions.

Interpretive hypothesis:

- \(B\) is naturally attached to **second-order fluctuation / variance response**;
- \(J\) is naturally attached to **third-order local fluctuation**.

This would explain why B is a more natural first classifier for `delta_a` than the sign of J.

---

## F3. Candidate pressure-response decomposition

Define a soft profile penalty by a locally constant indicator \(g_v\):

\[
P_v(t,\varepsilon)=P_X(tf-\varepsilon g_v).
\]

Let

\[
a_v(\varepsilon)=\partial_t^2P_v(0,\varepsilon).
\]

Then

\[
a'_v(0)=\partial_\varepsilon\partial_t^2P_v(0,0)
\]

is a mixed third pressure derivative.

Candidate decomposition:

\[
a'_v(0)
=
q_v\left(V_W-\frac43B(v)\right)-T_v,
\]

where

- \(q_v=\mu(E_v)\);
- \(V_W=\mathbb E_\mu(F_W^2)\) in the unperturbed system;
- \(T_v\) collects the temporal correlation/cumulant contribution involving indices outside the local forbidden window.

This is the mathematical version of:

\[
\text{variance response}
=
\text{local profile geometry}
+
\text{overlap/correlation dynamics}.
\]

### REQUIRED RED TEAM

Claude must independently derive the formula from pressure derivatives or finite-state eigenvalue perturbation.

Check specifically:

1. the sign from the potential \(-\varepsilon g_v\);
2. centering of \(g_v\);
3. whether the local term is exactly \(q_v(V_W-\frac43B)\);
4. whether all remaining terms can be collected in a convergent \(T_v\);
5. presentation invariance;
6. mixing / unique-dominant-component assumptions.

Do not cite this formula as established until that is done.

---

## F4. Full-shift candidate theorem

For the ternary full shift with uniform Bernoulli measure:

\[
V_W=\frac{4h}{9}
\]

and external correlation tails vanish.

Candidate exact formula:

\[
a'_v(0)
=
\frac{4q_v}{9}\left(h-3B(v)\right).
\]

Therefore the **local infinitesimal sign threshold** is:

\[
B(v)\lessgtr \frac h3.
\]

This is a more informative candidate mechanism than “minimum B vs nonminimum B”.

Claude should derive this from scratch.

---

# G. Existing h=2,...,7 data gives a new post-hoc structural clue

Using the canonical 15-profile baseline already in the repository, define

\[
S(v)=h-3B(v).
\]

Among the 15 frozen cases:

- 13 have \(S(v)\neq0\);
- all 13/13 hard-deletion `delta_a` signs agree with `sign(S(v))`;
- exactly 2 cases satisfy \(S(v)=0\).

The two local-critical profiles are:

- \(h=2,\ v=(1,1,0)\): hard `delta_a > 0`;
- \(h=6,\ v=(3,2,1)\): hard `delta_a < 0`.

Interpretation:

The local/full-shift term predicts no first-order sign at exactly these two cases, and the actual constrained SFT dynamics resolves them in opposite directions.

This is **post-hoc** and must not be called a preregistered result.

It is, however, a strong reason to test a local-term + correlation-tail decomposition.

---

# H. Refined conjecture

Do **not** make a universal conjecture over arbitrary SFTs; non-monotone response is plausible in general.

Use a restricted project conjecture:

## Restricted Profile Soft-to-Hard Sign-Persistence Conjecture

For the specific ternary profile-orbit deletion family arising from the transitions

\[
L_{h-1}\to L_h
\]

and the soft penalty path

\[
P_v(t,\varepsilon)=P_{L_{h-1}}(tf-\varepsilon g_v),
\]

if

\[
a'_v(0)\neq0,
\]

then the hard-deletion response has the same sign:

\[
\operatorname{sign}\bigl(a_v(\infty)-a_v(0)\bigr)
=
\operatorname{sign}a'_v(0).
\]

For critical cases \(a'_v(0)=0\), higher-order / correlation effects determine the sign.

**Status:** CONJECTURE ONLY.

### Falsification target before any h=8 work

Use only h=2,...,7 and predeclare a finite set of \(\varepsilon\)-values.

Ask:

- does \(a_v(\varepsilon)-a_v(0)\) ever cross zero?
- do the 13 noncritical cases preserve sign?
- how do the two critical cases emerge from zero?

---

# I. Novelty map — current best critical assessment

## Clearly known / should not be claimed as new

- forbidden-word overlap / correlation-polynomial machinery;
- generating functions for pattern avoidance;
- SFT perturbation by a forbidden word and spectral consequences;
- Perron / transfer-operator perturbation;
- pressure analyticity for finite-state / Hölder systems;
- pressure second derivative as asymptotic variance;
- higher pressure derivatives and cumulant-type structure;
- Poisson / Green–Kubo formulas for asymptotic variance;
- group / Drazin inverse methods for finite Markov chains;
- zero-temperature limits for locally constant one-dimensional potentials.

## Potentially project-specific, but novelty NOT established

1. **Ternary S3 profile-orbit deletion as a statistical-response problem.**
2. **Variance, rather than mean frequency, as the first nontrivial S3-symmetric response observable.**
3. The exact local identity
   \[
   \mathbb E(F_W^2\mid E_v)=\frac43B(v)
   \]
   used as the local term in a forbidden-profile response decomposition.
4. The candidate decomposition
   \[
   a'_v(0)=q_v(V_W-\tfrac43B)-T_v.
   \]
5. The full-shift threshold
   \[
   B=h/3
   \]
   as the local infinitesimal response boundary.
6. The frozen finite-family fact that all **13 noncritical** h=2,...,7 cases agree in sign with \(h-3B\), while the only two local-critical cases split in opposite directions.
7. A restricted soft-to-hard sign-persistence law for Abelian-square profile deletions.

Each item needs a direct novelty search before paper language.

---

# J. Exact primary-source audit order for Claude

Do not browse randomly. Use this order:

### P0 — first pass
1. Lind 1989.
2. Bóna–Maga–Richey 2026.
3. Ma–Pollicott 2024.
4. Chandgotia–Marcus–Richey–Wu 2024/2026.
5. Cheriyath–Agarwal 2019.
6. Spitzner–Boucher 2007.
7. Chazottes–Gambaudo–Ugalde 2011.

### P1 — structural completion
8. Guibas–Odlyzko 1981.
9. Goulden–Jackson 1979.
10. Parry–Pollicott 1990.
11. Meyer 1975.
12. Agarwal–Cheriyath–Tikekar 2024.

### P2 — only if needed
13. Leplaideur–Mengue 2026 and other zero-temperature perturbation literature.
14. More general linear-response / thermodynamic-formalism sources.

---

# K. Exact questions Claude must answer from the literature

For every relevant primary source, return:

- exact bibliographic identity;
- whether full primary text was actually opened;
- exact theorem/proposition/equation/page relevant to our problem;
- assumptions;
- what it proves;
- what it does **not** prove;
- whether it covers:
  - one forbidden word;
  - multiple forbidden words / cylinder unions;
  - mean response;
  - variance response;
  - pressure second derivatives;
  - mixed third derivatives;
  - correlation matrices;
  - soft penalties;
  - hard-deletion / zero-temperature limits;
  - S3 or profile/Parikh symmetry.

Then answer these literature questions:

1. Has anyone explicitly studied the **change in asymptotic variance** caused by forbidding a finite word/pattern in an SFT?
2. Has anyone derived a **mixed third pressure derivative** corresponding to the derivative of an asymptotic variance with respect to a local pattern penalty?
3. Is there an existing exact decomposition into a **local conditional second moment + correlation tail**?
4. Is a sign threshold analogous to \(B<h/3\) known in any forbidden-pattern model?
5. Is any monotonicity / sign-persistence theorem known from soft penalty to hard deletion?
6. Are there known counterexamples to such monotonicity?
7. Has an \(S_3\)-orbit of forbidden patterns, or a Parikh/profile class, been treated as the perturbation object?
8. Does existing cluster/correlation-polynomial machinery collapse our full profile orbit to a tractable finite invariant?

---

# L. Claude mathematical red-team tasks

Independently derive or refute:

1. \(B=\frac13\sum_{i<j}(v_i-v_j)^2\).
2. The \(B,J\) orbit parametrization.
3. \(\mathbb E(F_W^2\mid E_v)=4B/3\).
4. \(\mathbb E(F_W^3\mid E_v)=8J\).
5. The mixed pressure derivative formula for \(a'_v(0)\).
6. The local + correlation-tail decomposition.
7. The full-shift formula
   \[
   a'_v(0)=\frac{4q_v}{9}(h-3B).
   \]
8. The 13/13 noncritical sign comparison using only the frozen h=2,...,7 data.
9. Whether the restricted soft-to-hard sign-persistence conjecture is even plausible after searching for small counterexamples.

If any formula fails, report the smallest exact failure and stop downstream promotion.

---

# M. Paper decision gate

A paper becomes genuinely attractive if all of the following survive:

1. independent derivation of the local \(B\)-term;
2. correct mixed-pressure / correlation-tail formula;
3. a clean literature gap after the P0 audit;
4. a preregistered h=2,...,7 soft-path test;
5. no sign crossing in the noncritical cases, or a mathematically informative counterexample;
6. a precise statement separating known thermodynamic-formalism machinery from the project-specific Abelian-profile content.

Possible paper framing:

> **Symmetry-forced local geometry and correlation corrections in the fluctuation response of forbidden-profile shifts**

Do **not** make Mäkelä's conjecture resolution a requirement for this paper.

---

# N. Hard constraints

- No h=8 computation.
- No h=8 empirical inference.
- No novelty claim before direct primary-source audit.
- Do not mutate the repository during the Claude theory/literature session unless separately authorized.
- Preserve correction history and failed derivations.
- Treat the current 15-profile result as finite h=2,...,7 evidence only.
