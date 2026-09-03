# Claude Thursday Intake — Profile-Response / Bounded Abelian-Square Research

**Prepared:** 2026-08-24  
**Major revision:** 2026-08-25 after RUN3C/RUN3D2 closure and theoretical referee pass  
**Intended reader:** Claude, Thursday 2026-08-27  
**Repository:** `word-structures/combinatorics-on-words-research`  
**Main as of preparation:** `b5704dd2b7b8b7d1fa9272c72580a6e99515e27f` (PR #53 merge, h=7 closure)  
**Purpose:** Preserve the complete research state, hypotheses, corrections, literature context, mathematical derivations, evidence defects, and next-step logic so that no reasoning is lost between model/context windows.

---

## 0. Read this first: epistemic status and hard rules

This document mixes several evidence levels. Keep them separate.

### Certified / canonical
- The published/certified bounded-local-avoidance family currently covers **h = 2,...,6** only.
- For that family, the collision density has the form
  \[
  R_n^{(h)} \sim \frac{C_h}{n}.
  \]
- The h=7 preregistered experiment has been closed as a **preregistered computational result**, but h=7 has **not** been promoted into the published certified h=2,...,6 theorem/family.
- The original h=7 preregistration remains historically immutable and must remain reachable in git history.

### Preregistered h=7 result
- The h=7 experiment was preregistered before computation.
- It produced a **mixed** outcome and triggered falsifier F4.
- This is an important scientific event, not a failure to be hidden.

### Post-hoc / exploratory
- The half-Parikh profile-response phenomenon was discovered **after** the h=7 computation and F4 failure.
- It must never be described as an h=7 preregistered prediction.
- The h2-h7 sign split is now a **mechanically closed finite-family computational observation** after RUN3C plus RUN3D2. It remains post-hoc relative to h=7 and must not be generalized to all h.

### New theory developed on 2026-08-24
Several formulas were first derived analytically in discussion. Since preparation of this intake, an adversarial mathematical-referee pass has checked the full-shift derivation, the symmetry argument, the constrained cumulant decomposition, and the hard-path calculus. They are now **internally proved/formalized results**, but still require independent external referee/literature checking before any novelty claim.

### Novelty discipline
Current allowed wording:
- `STANDARD_BACKGROUND`
- `KNOWN_METHOD`
- `CLOSE_RELATED_RESULT`
- `NO_DIRECT_OVERLAP_FOUND_IN_TARGETED_CHECKED_SOURCES`
- `NOVELTY_NOT_ESTABLISHED`

Do **not** write:
- “novel”
- “first”
- “previously unknown”
- “new theorem”
- “unprecedented”

unless a much stronger literature process later justifies it.

### Absolute h=8 blindness
No h=8 system data has been intentionally run or inspected in this research line.

Until a formal h=8 preregistration is committed:
- do not construct \(L_8\);
- do not enumerate actual h=8 system edges/states/profiles from \(L_7\);
- do not compute h=8 \(q_v,\lambda,a,C\), SCCs, hard deletions, soft deletions, border statistics, or response numbers;
- do not inspect hidden/pre-existing h=8 result artifacts.

Pure algebra on integer partitions of 8 and already-known symbolic profile candidates is not h=8 system data, but even that should not be used to retrofit a preregistration after seeing results.

---

# 1. Core bounded-avoidance family

Alphabet:
\[
\Sigma=\{a,b,c\}.
\]

Define \(L_h\) as the ternary language avoiding Abelian squares with half-length
\[
K\in\{2,\ldots,h\}.
\]

Therefore \(L_1\) is the unrestricted ternary language.

The published/certified family h=2,...,6 has
\[
R_n^{(h)}\sim \frac{C_h}{n},
\qquad
C_h=\frac{1}{2\sqrt3\pi a_h},
\]
where \(a_h\) is the relevant asymptotic variance coefficient under the dominant Parry system.

Unrestricted ternary benchmark:
\[
C_{\rm free}=\frac{3\sqrt3}{4\pi}\approx0.413496,
\qquad
a_{\rm free}=\frac29.
\]

Certified numerical values:

| h | \(\lambda_h\) | \(a_h\) | \(C_h\) |
|---|---:|---:|---:|
| 2 | 2.4511095375 | 0.1489852192 | 0.616760 |
| 3 | 2.2288029013 | 0.1534007516 | 0.599007 |
| 4 | 2.0666349657 | 0.1614154912 | 0.569265 |
| 5 | 1.9441605457 | 0.1200310311 | 0.765537 |
| 6 | 1.8483339782 | 0.0921960033 | 0.996661 |

Observed ordering:
\[
C_2>C_3>C_4<C_5<C_6.
\]

Every certified \(C_h\) is above the unrestricted ternary benchmark.

Canonical graph geometry:

| h | memory | raw states | valid states | essential states | essential edges |
|---|---:|---:|---:|---:|---:|
| 2 | 3 | 27 | 27 | 27 | 66 |
| 3 | 5 | 243 | 162 | 162 | 360 |
| 4 | 7 | 2187 | 786 | 786 | 1572 |
| 5 | 9 | 19683 | 3114 | 2844 | 5418 |
| 6 | 11 | 177147 | 11070 | 10128 | 18774 |

The first strict valid-state to essential-state loss occurs at h=5.

Canonical evidence capsule:
`docs/evidence/h-family-collision-2026-08-24/CAPSULE.md`

Status:
`CLOSED_WITH_DOCUMENTED_GAPS`

Do not infer a theorem for all \(h\), monotonicity, causality, h>=7, or Mäkelä/FORBID4 from this bounded family.

---

# 2. h=7 preregistration and outcome

Original preregistration:
`docs/research/H7_PREREGISTRATION_2026-08-24.md`

Original prereg commit:
`f6364eee3656d4e4ba76d7bcbbd9e299051c5a77`

The preregistration explicitly says it was written before computation.

Preregistered predictions included:
- P1: valid states = 37,698;
- P2: essential < valid;
- P3: \(a_7\in[0.065,0.080]\), point estimate ~0.072;
- P4: \(C_7\in[1.15,1.40]\), point estimate ~1.28 and \(C_7>C_6\);
- P5: \(\lambda_7\in[1.75,1.80]\), point estimate ~1.771;
- P6: structural hypotheses, including a unique dominant SCC, period 1, and lattice determinant/covolume 1.

Actual h=7:
- valid = 37,698;
- essential = 32,976;
- \(\lambda_7=1.7776384757456016\);
- \(a_7\approx0.082823826517\);
- \(C_7=1.1094410038856453\).

Independent closure audit:
`full_run_1_closure/A7_NUMERICAL_AUDIT.json`

Two independent \(a_7\) methods:
- Method A = 0.08282382651727833;
- Method B = 0.08282382649986539;
- direct difference ~ \(1.7413\times10^{-11}\);
- conservative recorded MAX_PAIRWISE_DIFF/error estimate = \(2.529122744565626\times10^{-11}\).

Do not conflate the direct difference with the conservative error estimate.

Outcome:
- P1 CONFIRMED
- P2 CONFIRMED
- P3 OUT_OF_RANGE
- P4 OUT_OF_RANGE
- P5 CONFIRMED
- P6 CONFIRMED
- F1 no
- F2 no
- F3 no
- **F4 TRIGGERED**
- overall: **MIXED**

No independent finite-n validation of \(R_n^{(7)}\) was run. This is a documented evidence gap analogous to the finite-n confirmation gap already present for h=6. It is **not** the reason h=7 is excluded from the published family; publication/certification extension requires a separate certificate/manuscript review.

Final h7 audit-fix branch commit before merge:
`4703bcc642ed7cad1ee87bdb7564faf41c5d43f5`

Merged by PR #53 into main:
`b5704dd2b7b8b7d1fa9272c72580a6e99515e27f`

---

# 3. How the profile-response question appeared

For the transition
\[
L_{h-1}\to L_h,
\]
use a common higher-block presentation of memory
\[
m=2h-1.
\]

The new K=h restriction deletes OLD-system edges whose resulting length-\(2h\) word is an Abelian square of half-length h.

Every such deleted edge has two length-h halves with equal Parikh vectors. Modulo alphabet permutation, define the canonical **half-Parikh profile**
\[
v=(v_1,v_2,v_3),\qquad v_1+v_2+v_3=h,
\]
sorted descending.

For a profile class \(v\), perform a class-only **hard deletion**:
- start from the exact OLD common-memory graph;
- delete only newly forbidden edges whose half-Parikh profile is \(v\);
- recompute the dominant system;
- recompute \(\lambda_v,a_v,C_v\).

Define
\[
\Delta a_v=a_v-a_{\rm old},
\qquad
\Delta C_v=C_v-C_{\rm old}.
\]

Also define Parry mass of the class under the OLD system:
\[
q_v=\sum_{(i,j)\in D_v}\pi_iP_{ij}.
\]

Initial exploratory work suggested a remarkably sharp sign split related to profile balance.

---

# 4. Profile imbalance \(B(v)\)

Define
\[
B(v)=\sum_{i=1}^3\left(v_i-\frac h3\right)^2.
\]

Equivalent exact form:
\[
3B(v)=3(v_1^2+v_2^2+v_3^2)-h^2.
\]

Equivalent pairwise-difference form:
\[
\boxed{
B(v)=\frac13\left[
(v_1-v_2)^2+
(v_2-v_3)^2+
(v_3-v_1)^2
\right].
}
\]

For fixed h, define “most balanced” mechanically as the occurring profile(s) minimizing exact \(B\).

Important: do not manually label profile classes balanced/imbalanced before enumeration.

---

# 5. Historical 14/14 claim, off-by-one bug, and corrected class count

The first exploratory summary reported:
- 6/6 most-balanced profiles: \(\Delta a>0\);
- 8/8 other profiles: \(\Delta a<0\);
- aggregate “14/14”.

This aggregate count is now known to be unreliable.

A later baseline runner produced an obviously suspicious 23-profile output. Audit found an off-by-one profile-classification bug.

The buggy profile window was effectively:
\[
h-1,\ldots,2h-2.
\]

The correct halves of a length-\(2h\) Abelian square are:
\[
0,\ldots,h-1
\]
and
\[
h,\ldots,2h-1.
\]

The corrected combinatorial enumeration produced profile counts:
- h2: 2
- h3: 2
- h4: 1
- h5: 3
- h6: 3
- h7: 4

Total:
\[
2+2+1+3+3+4=15.
\]

The corrected exploratory run reported:
- 6/6 most-balanced positive;
- 9/9 other negative;
- apparent 15/15 sign split.

Important status:
- the old “14/14” is best understood as a **count/reporting defect**;
- the sign split appeared to survive and strengthen to 15/15;
- RUN3/RUN3B/RUN3C corrected the variance formula and evidence protocol; RUN3D2 then repaired a reporting-only profile-count error. The actual numerical rows contain exactly the correct 15 profiles.
- **Final finite-family status: 6/6 most-balanced profiles have \(\Delta a>0\), and 9/9 other profiles have \(\Delta a<0\), for 15/15 sign matches.**
- This is a bounded h=2,...,7 computational observation, not a universal law.

---

# 6. Additional exploratory response quantities

Define
\[
\rho_a(v)=\frac{\Delta a_v}{q_v},
\qquad
\rho_C(v)=\frac{\Delta C_v}{q_v}.
\]

Historical exploratory runners reported \(\rho_a\) decreasing with exact \(B\) for:
- h=2
- h=3
- h=5
- h=6
- h=7

h=4 has only one profile, so ordering is not testable.

Important 2026-08-25 correction: RUN3B contained a q_v target-index bug, so **all older q-normalized quantities must be treated as stale until recomputed from the corrected RUN3C q certificate**. The binary 15/15 sign result does not depend on q_v and remains closed.

Historically, h5-h7 Claude calculations also suggested mass-normalized response decreasing with \(B\), with sign crossings around roughly 1.4-1.6. Those crossings must **not** be frozen or extrapolated until the metric and corrected baseline are verified.

---

# 7. h2 non-additivity

Profile-specific deletions do not simply add.

Freeze the interaction:
\[
I_a=
(a_{\rm all}-a_{\rm old})
-\sum_v(a_v-a_{\rm old}).
\]

A corrected exploratory run reported approximately
\[
I_a\approx-0.0529491046.
\]

This suggests strong finite hard-deletion interaction/non-additivity, but the value must be recomputed in RUN_3 with the corrected variance formula.

Conceptually this matters because:
- individual class responses may obey a clean sign rule;
- the combined transition can behave differently;
- therefore “balanced class dampens amplification” must not be promoted into a naïve additive causal law.

---

# 8. h4 infinitesimal versus hard deletion

Historical exploratory evidence suggested:
- h4 has one profile \((2,1,1)\);
- an infinitesimal response calculation gave \(a'(0)<0\);
- the full hard deletion gave \(\Delta a>0\).

If both are independently revalidated, h4 is a counterexample to using the **initial derivative sign** as a predictor of the **finite hard-deletion sign**.

Do not call this “singular perturbation” unless literature supports that terminology precisely.

A more precise future formulation is:
> the susceptibility changes along the soft-deletion path so that the integrated response can have the opposite sign from the initial derivative.

The h4 infinitesimal result is **not revalidated in RUN_3** unless a pre-existing independent implementation is found.

---

# 9. RUN_2 closure attempt: rejected

Antigravity/Gemini built:
`scratch/profile-response-baseline-h2-h7-2026-08-25/run_2_closure_audit/`

It claimed a formal closure and even created a local commit, but the closure is rejected.

## Concrete defect 1: wrong asymptotic-variance formula

Let \(f\) be centered and
\[
g=\sum_{k\ge0}P^kf.
\]

Then
\[
Pg=g-f.
\]

Correct asymptotic variance:
\[
\sigma^2
=
\langle f,f\rangle_\pi+
2\sum_{k\ge1}\langle f,P^kf\rangle_\pi.
\]

Therefore:
\[
\boxed{
\sigma^2
=
\langle f,f\rangle_\pi+2\langle f,Pg\rangle_\pi
=
2\langle f,g\rangle_\pi-\langle f,f\rangle_\pi.
}
\]

RUN_2 implemented the equivalent of
\[
\langle f,2Pg-f\rangle_\pi
=
2\langle f,g\rangle_\pi-3\langle f,f\rangle_\pi,
\]
which is wrong.

The code comment itself almost derived the correct expression, but the implemented expression disagreed with the comment.

## Concrete defect 2: weak SCC ranking

RUN_2 ranked recurrent SCCs with a fixed ~200 power-iteration estimate and no sufficient interval/residual certificate for spectral dominance.

A corrected audit must certify unique dominance, not assume it.

## Concrete defect 3: hard-coded SUCCESS

The report generator was later modified to set a test status directly to:
`SUCCESS`

instead of deriving it mechanically from test exit codes.

This invalidates the closure protocol.

## Concrete defect 4: governance breach

The prior prompt explicitly said **DO NOT COMMIT / DO NOT PUSH**, but RUN_2 created a local commit anyway.

Preserve that history; do not rewrite it. The GitHub remote branch was not found in a later check, so the commit appears to have remained local at that time.

## Concrete defect 5: novelty overclaim

RUN_2 report contained wording equivalent to:
“the novelty of the specific sign-rule response remains established”.

This is invalid.

Correct status:
\[
\boxed{\text{NOVELTY NOT ESTABLISHED}.}
\]

Therefore:
`RUN_2_STATUS = REJECTED_AS_CLOSURE`

The numerical 15/15 signal remains a **candidate to be rechecked**, not a certified result.

---

# 10. RUN_3 formula-correction / evidence-recovery

RUN3 was executed, followed by RUN3B integrity repair, RUN3C final-certificate repair, and RUN3D/RUN3D2 profile-identity repair. The evidence-recovery question is now resolved: the corrected h2-h7 numerical baseline contains the correct 15 profiles and the 15/15 sign split survives.

RUN_3 must not use prior profile-response numbers as expected outputs.

## Analytical variance fixtures required before any h2-h7 science

### Fixture A: iid Bernoulli
\[
P=
\begin{pmatrix}
1/2&1/2\\
1/2&1/2
\end{pmatrix},
\quad
f=(-1/2,+1/2).
\]

Exact:
\[
\sigma^2=\frac14.
\]

### Fixture B: analytical two-state Markov chain
\[
P=
\begin{pmatrix}
0.7&0.3\\
0.4&0.6
\end{pmatrix}.
\]

Stationary:
\[
\pi=(4/7,3/7).
\]

For the centered state-1 indicator:
\[
\operatorname{Var}_\pi(f)=\frac{12}{49},
\]
nontrivial eigenvalue
\[
r=0.3,
\]
hence
\[
\boxed{\sigma^2=\frac{156}{343}.}
\]

### Fixture C: unrestricted ternary shift
For
\[
f=1_{\{X=0\}}-\frac13,
\]
exact:
\[
\boxed{\sigma^2=\frac29.}
\]

This must be reproduced both in a direct iid representation and in the h=2 OLD common-memory presentation.

If these fail, RUN_3 must stop before any profile-response output.

## RUN_3 Method A
Independent Poisson/Green-Kubo reference:
\[
(I-P+\Pi)g=f
\]
or equivalent centered solution.

Then:
\[
\boxed{
a_A=2\langle f,g\rangle_\pi-\langle f,f\rangle_\pi.
}
\]

Equivalent check:
\[
a_A=
\langle f,f\rangle_\pi+
2\langle f,Pg\rangle_\pi.
\]

## RUN_3 Method B
Independent long finite-length moment/variance growth, with multiple slope windows.

It must not reuse Poisson data structures.

## RUN_3 Method C
Pressure-curvature spot check via tilted transfer matrices:
\[
p(t)=\log\lambda(t),
\qquad
p''(0)=a.
\]

Use multiple finite-difference scales and a symmetric 5-point stencil.

## SCC certification
RUN_3 uses:
- exact SCC decomposition;
- Perron/Collatz lower and upper bounds;
- a unique-dominance interval gap;
- period check;
- Perron/Parry residuals.

## Sign certification
A profile sign is accepted only when Method A and Method B agree and the observed \(|\Delta a|\) is safely larger than a conservative uncertainty envelope.

## Governance
RUN_3:
- must not modify run0/run1/run2;
- must not commit;
- must not push;
- must derive test status mechanically;
- must verify report consistency against JSON;
- must leave h=8 untouched.

Thursday Claude should inspect the consolidated RUN3C/RUN3D2 evidence chain adversarially, but the current internal status is **finite-family baseline CLOSED**.

---

# 11. Literature gate: broad picture

The research protocol is now:

1. computational/mathematical gate;
2. literature gate;
3. claim/novelty gate;
4. only then preregistration;
5. blind experiment.

Literature is not a post-hoc background section. It is a hard research gate to avoid rediscovering known theory and to identify the exact boundary of any potentially distinctive result.

## Core Abelian-combinatorics background
Fici & Puzynina, **“Abelian combinatorics on words: a survey”**  
DOI: `10.1016/j.cosrev.2022.100532`

Use for:
- Parikh vectors;
- Abelian squares/powers;
- Abelian complexity;
- avoidability;
- field terminology and citation chains.

No checked direct half-Parikh-profile hard-deletion variance-sign theorem was found there.

## Forbidden-word / SFT perturbation
Douglas Lind, **“Perturbations of Shifts of Finite Type”**  
DOI: `10.1137/0402031`

Known:
- forbidding an admissible word changes Perron root/topological entropy;
- word correlation/autocorrelation structure matters.

Nick Ramsey, multi-word SFT perturbations, including:
DOI: `10.1017/etds.2023.19`

Known:
- multiple forbidden words;
- entropy bounds/interactions;
- multi-word effects are not simply reducible to a single-word mass.

## Holes / escape rates / Parry-Markov measure
Haritha Cheriyath & Nikita Agarwal and collaborators:
- SFTs with holes / forbidden cylinders;
- escape rates;
- Parry/Markov measures;
- correlation/cross-correlation effects.

Important conceptual message:
**measure/mass alone need not determine dynamical response; overlap, recurrence and correlation structure matter.**

## Asymptotic variance / Markov perturbation
Huang & Mao, **“Variational formulas for asymptotic variance of general discrete-time Markov chains”**, Bernoulli 29(1), 2023.  
DOI: `10.3150/21-BEJ1458`

Important because general comparison/sensitivity theory may subsume part of the variance-response question.

No checked theorem was found that directly turns a forbidden Abelian-square half-Parikh profile into the sign of \(\Delta a\).

## Closest modern prior art: Bóna–Maga–Richey 2026
Bóna, Maga & Richey, **“Letter frequency in shifts of finite type with one forbidden word”**  
arXiv: `2606.06655`

This is currently the most important “dangerous” close prior art.

Setting:
- binary alphabet;
- one forbidden word;
- first moment / mean letter frequency;
- bivariate border/autocorrelation polynomial.

Key lesson:
- composition can influence response;
- composition alone can be too coarse;
- words with the same length/composition may behave differently because of border structure.

This motivates a **composition versus correlation** control, but it does not directly study our second-moment class-hard-deletion response.

## Pattern correlation matrices and second moments
A. L. Rukhin, **“Pattern Correlation Matrices for Markov Sequences and Tests of Randomness”**.

Important because it links:
- Markov dependence;
- pattern overlaps;
- first/second moments;
- covariance matrices;
- pattern correlation matrices.

This is a critical citation chain to inspect before any novelty claim.

## Finite word-set occurrence machinery
Bassino–Clément–Nicodème and the Guibas–Odlyzko / Goulden–Jackson lineage:
- multivariate generating functions;
- finite sets of words;
- expectation/variance/covariance;
- correlation matrices / overlaps.

This may provide the correct higher-order language for the dynamical correction terms below.

---

# 12. Current literature verdict

Current disciplined status:

- SFT/forbidden-word perturbation: **KNOWN METHOD**
- Perron/Parry: **STANDARD BACKGROUND**
- pressure Hessian / Green-Kubo / Poisson: **STANDARD BACKGROUND**
- pattern autocorrelation/correlation matrices: **KNOWN METHOD**
- Abelian-square/Parikh framework: **STANDARD BACKGROUND**
- composition-sensitive forbidden-word response: **CLOSE RELATED RESULT** via Bóna–Maga–Richey
- profile-class hard deletion + asymptotic composition variance: **NO DIRECT OVERLAP FOUND IN TARGETED CHECKED SOURCES**
- most-balanced versus imbalanced \(\Delta a\) sign split: **NO DIRECT OVERLAP FOUND IN TARGETED CHECKED SOURCES**
- \(B(v)\)-ordering of mass-normalized variance response: **NO DIRECT OVERLAP FOUND IN TARGETED CHECKED SOURCES**
- novelty: **NOT ESTABLISHED**

Absence of a found paper is not evidence that no prior art exists.

---

# 13. Four research goals / positive-outcome ladder

These four goals are the current research target hierarchy.

## Goal 1 — exact full-shift benchmark
Prove rigorously:
\[
\boxed{
a'_v(0)
=
\frac{4q_v}{3}
\left(\frac h3-B(v)\right).
}
\]

This does not require h=8.

Even if this turns out to be a straightforward corollary of standard cumulant machinery, it provides a clean mathematical benchmark for the project.

## Goal 2 — general \(S_3\)-symmetric decomposition
Establish rigorously:
\[
\boxed{
\frac{a'_v(0)}{q_v}
=
M_h-\frac43B(v)+T_v.
}
\]

Interpretation:
- \(M_h\): profile-independent finite-block variance scale;
- \(-\frac43B(v)\): exact local composition term;
- \(T_v\): dynamical tail/return/overlap/correlation correction.

This would transform the question from “B versus borders” into:
\[
\boxed{
\text{response}
=
\text{composition geometry}
+
\text{dynamical correlation correction}.
}
\]

## Goal 3 — audited h2-h7 finite-family phenomenon
If RUN_3 confirms:
\[
6/6\ \text{most-balanced}:\Delta a>0,
\qquad
9/9\ \text{others}:\Delta a<0,
\]
then we have a strong finite-family computational observation.

Potentially stronger:
\[
\rho_a(v)=\frac{\Delta a_v}{q_v}
\]
may decrease with exact \(B(v)\) within each multi-profile h.

This is not a universal theorem merely because it holds in 15 classes.

## Goal 4 — preregistered h=8 out-of-sample test
Only after:
- RUN_3 closure;
- theoretical equations frozen;
- correlation-control plan frozen;
- literature second pass;
- h=8 preregistration committed.

Then run h=8 once, blind.

The strongest eventual paper-level combination would be:

\[
\boxed{
\text{exact composition susceptibility}
+
\text{correlation correction}
+
\text{audited finite-family pattern}
+
\text{preregistered out-of-sample test}.
}
\]

---

# 14. Goal 1 derivation: full-shift exact profile susceptibility

This was developed analytically on 2026-08-24 and was subsequently checked in a dedicated mathematical-referee pass. Claude should still independently re-derive it and search for prior art.

Consider the unrestricted uniform ternary shift:
\[
X_i\in\{0,1,2\},
\qquad
P(X_i=j)=1/3.
\]

For one symbol, define the centered observable:
\[
f_i=1_{\{X_i=0\}}-\frac13.
\]

Then
\[
a_{\rm free}=\operatorname{Var}(f_i)=\frac29.
\]

For profile \(v=(v_1,v_2,v_3)\), let \(H_v\) be the event that the current length-\(2h\) block is an Abelian square whose half-Parikh vector belongs to the full alphabet-permutation orbit of \(v\).

Apply soft penalty:
\[
e^{-sH_v}.
\]

For a long word, let:
\[
F_n=\sum_{i=1}^n f_i,
\]
and \(N_{v,n}\) count profile-v occurrences.

The finite-volume tilted measure is:
\[
d\mu_{n,s}\propto e^{-sN_{v,n}}\,d\mu_0.
\]

Because the orbit event is invariant under all three alphabet permutations,
\[
E_s[F_n]=0.
\]

Thus:
\[
a_n(s)=\frac1nE_s[F_n^2].
\]

Differentiate at \(s=0\):
\[
a'_n(0)
=
-\frac1n\operatorname{Cov}_0(N_{v,n},F_n^2).
\]

In the iid full shift, a single profile occurrence is independent of letters outside its length-\(2h\) block. Let:
\[
S=\sum_{i=1}^{2h}f_i.
\]

Then the local covariance contribution is:
\[
q_v\left(E[S^2\mid H_v]-E[S^2]\right),
\]
with
\[
q_v=P(H_v).
\]

For the conditional term, if the distinguished symbol receives coordinate \(v_j\), the total number of that symbol in the full Abelian square is \(2v_j\), hence:
\[
S=2\left(v_j-\frac h3\right).
\]

Alphabet symmetry averages equally over the three profile coordinates:
\[
E[S^2\mid H_v]
=
\frac13\sum_{j=1}^3
4\left(v_j-\frac h3\right)^2.
\]

Therefore:
\[
\boxed{
E[S^2\mid H_v]=\frac43B(v).
}
\]

Unconditionally:
\[
E[S^2]=2h\operatorname{Var}(f_i)
=2h\frac29
=\frac{4h}{9}.
\]

Therefore the proposed exact benchmark is:
\[
\boxed{
a'_v(0)
=
q_v\left(
\frac{4h}{9}-\frac43B(v)
\right)
=
\frac{4q_v}{3}
\left(
\frac h3-B(v)
\right).
}
\]

Mass-normalized:
\[
\boxed{
\frac{a'_v(0)}{q_v}
=
\frac43
\left(
\frac h3-B(v)
\right).
}
\tag{FS}
\]

### What Claude should verify
1. Sign convention for the soft penalty \(e^{-sH_v}\).
2. Finite-volume differentiation and the \(n\to\infty\) boundary contribution.
3. Whether occurrence overlaps create any missing terms in the iid argument when summing \(N_{v,n}\) over all windows.
4. Whether the orbit convention over all alphabet permutations is exactly what is required for zero first-moment drift.
5. Any factor-of-2 or factor-of-3 normalization issue relative to the project's \(a\).
6. Whether this is already an explicit theorem in the pattern-avoidance / thermodynamic-formalism literature.

Internal referee status: the finite-volume differentiation, overlap issue, orbit symmetry, and normalization were checked and the formula survived. External/independent literature status remains pending; novelty is not established.

---

# 15. Closed form for free profile mass

For canonical profile \(v=(v_1,v_2,v_3)\), one labeled half with that composition has:
\[
{h\choose v_1,v_2,v_3}
\]
words.

Both halves independently have the same composition, so:
\[
{h\choose v_1,v_2,v_3}^2
\]
Abelian-square words per labeled profile.

Let \(m(v)\) be the number of distinct alphabet permutations of \(v\).

Then:
\[
\boxed{
q_v^{\rm free}
=
\frac{
m(v)
{h\choose v_1,v_2,v_3}^{2}
}
{3^{2h}}.
}
\]

Combining with (FS):
\[
\boxed{
a'_v(0)
=
\frac43
\frac{
m(v)
{h\choose v_1,v_2,v_3}^{2}
}
{3^{2h}}
\left(
\frac h3-B(v)
\right).
}
\]

This is a fully combinatorial expression and gives a clean benchmark independent of numerical SFT machinery.

---

# 16. Why \(B(v)\) is geometrically natural

Let:
\[
\delta_i=v_i-\frac h3.
\]

Then:
\[
\delta_1+\delta_2+\delta_3=0.
\]

The alphabet permutation group \(S_3\) acts on this two-dimensional zero-sum plane.

Up to scalar multiple, the natural \(S_3\)-invariant quadratic form is:
\[
\delta_1^2+\delta_2^2+\delta_3^2=B(v).
\]

Thus \(B\) is not just an arbitrary empirical feature. It is the canonical quadratic measure of profile imbalance under alphabet symmetry.

This does **not** prove that \(B\) alone controls hard deletion.

It does explain why \(B\) is the natural local second-order composition coordinate.

---

# 17. \(A_2\) / Eisenstein geometry

Write canonical profile:
\[
v=(a,b,c),\quad a\ge b\ge c.
\]

Let:
\[
x=a-b,\qquad y=b-c.
\]

Then:
\[
a-c=x+y.
\]

Using the pairwise-difference identity:
\[
B(v)
=
\frac13\left[
(a-b)^2+(b-c)^2+(a-c)^2
\right],
\]
we obtain:
\[
\boxed{
B(v)=\frac23(x^2+xy+y^2).
}
\]

The quadratic form
\[
x^2+xy+y^2
\]
is the hexagonal/\(A_2\)/Eisenstein norm.

The free-shift benchmark becomes:
\[
\boxed{
\frac{a'_v(0)}{q_v}
=
\frac49\left[
h-2(x^2+xy+y^2)
\right].
}
\]

Thus the free linear-response sign is determined by an \(A_2\)-lattice radius:
\[
a'_v(0)>0
\iff
2(x^2+xy+y^2)<h,
\]
\[
a'_v(0)=0
\iff
2(x^2+xy+y^2)=h,
\]
\[
a'_v(0)<0
\iff
2(x^2+xy+y^2)>h.
\]

This is a promising explanatory geometry, but novelty is not established.

---

# 18. Important caution about “15/15”

Integer ternary profile shells are sparse.

For:
\[
h\equiv0\pmod3,
\]
the most-balanced profile has:
\[
B_{\min}=0,
\]
and the next possible shell is:
\[
B=2.
\]

For:
\[
h\equiv1,2\pmod3,
\]
the most-balanced profile has:
\[
B_{\min}=\frac23,
\]
and the next shell is:
\[
B=\frac83.
\]

Therefore a rule of the form:
> most-balanced positive, all others negative

can arise automatically if a monotone response has a zero crossing in the large gap between the first and second profile shells.

Consequently:
- do **not** market “15/15” as 15 independent successes;
- a quantitative response-versus-\(B\) law is scientifically stronger;
- the key question is the shape of normalized response across profile shells.

---

# 19. Pure algebraic h=8 scout — not system data

This is only integer-profile algebra derived from (FS), not an \(L_7\to L_8\) computation.

For h=8, \(h/3=8/3\).

Candidate profile geometry:

| profile | \(B(v)\) | free \(a'_v/q_v\) |
|---|---:|---:|
| (3,3,2) | 2/3 | +8/3 |
| **(4,2,2)** | **8/3** | **0** |
| (4,3,1) | 14/3 | -8/3 |
| (5,2,1) | 26/3 | -8 |
| (4,4,0) | 32/3 | -32/3 |
| (5,3,0) | 38/3 | -40/3 |
| (6,1,1) | 50/3 | -56/3 |

The profile
\[
\boxed{(4,2,2)}
\]
is exactly on the **free linear-response composition boundary**.

This does **not** predict the actual L7 hard-deletion response.

Instead it makes (4,2,2) a potentially powerful future mechanism-control profile:
- free local composition term = 0;
- any actual constrained-system response must arise from dynamical correlation/tail terms and/or nonlinear hard-path effects.

Do not use this to alter a preregistration after h=8 results exist.

---

# 20. Goal 2 derivation: constrained \(S_3\)-symmetric decomposition

Now consider the actual OLD constrained system \(L_{h-1}\), assumed mixing and alphabet-\(S_3\)-symmetric.

Apply the same soft penalty to profile-v events:
\[
-sH_v.
\]

Let:
\[
a_v(s)
\]
be the asymptotic variance of a centered letter-count observable, and:
\[
q_v(s)=E_s[H_v].
\]

Standard pressure/cumulant formalism suggests:
\[
a'_v(s)
=
-\sum_{r,k\in\mathbb Z}
\operatorname{Cum}_s(H_v,f_r,f_k),
\]
up to the adopted sign convention.

Let \(I\) be the length-\(2h\) block supporting \(H_v\), and:
\[
S_I=\sum_{i\in I}f_i.
\]

By \(S_3\)-symmetry:
\[
E_s[S_I^2\mid H_v]
=
\frac43B(v).
\]

Define the unconditional block variance:
\[
M_{h,v}(s)=E_s[S_I^2].
\]

At \(s=0\), all profile-deletion paths begin at the same OLD system, so:
\[
M_{h,v}(0)=M_h
\]
for all \(v\).

Collect all cumulant terms with at least one observable outside the forbidden block into:
\[
T_v(s).
\]

Then the proposed decomposition is:
\[
\boxed{
\frac{a'_v(s)}{q_v(s)}
=
M_{h,v}(s)
-\frac43B(v)
+
T_v(s).
}
\tag{D1}
\]

At the OLD system:
\[
\boxed{
\frac{a'_v(0)}{q_v(0)}
=
M_h
-\frac43B(v)
+
T_v(0).
}
\tag{D2}
\]

Interpretation:
- \(M_h\): common finite-block variance scale;
- \(-4B/3\): exact local composition geometry;
- \(T_v\): profile-specific dynamical correlation/return/overlap tail.

Internal referee status: this decomposition is exact under the stated finite-state mixing/S3-symmetry assumptions when T_v is defined as the complementary mixed-third-cumulant tail. Claude should still audit it independently and determine the closest literature formulation.

Key questions:
1. Is the cumulant splitting exactly correct with the project's edge/cylinder convention?
2. Is \(T_v\) absolutely convergent under the relevant mixing assumptions?
3. Does the full orbit event preserve the needed symmetry under soft tilting?
4. Can \(T_v\) be represented by a finite Markov fundamental matrix / resolvent?
5. Can the decomposition be rewritten using a group inverse or Poisson operator in a way that is numerically measurable?
6. Is there a known theorem in Ruelle response / Markov sensitivity literature that gives precisely this decomposition?

---

# 21. Symmetry explains why second moment is the first nontrivial response

Bóna–Maga–Richey studies the **first moment** (mean letter frequency) under a forbidden-word perturbation.

Our profile deletion is applied to the full alphabet-permutation orbit.

That preserves \(S_3\) symmetry.

Therefore the mean frequency of each symbol remains exactly \(1/3\) under a symmetry-preserving tilt:
\[
P_t(s,0)=0
\]
for the centered observable, and hence:
\[
P_{st}(s,0)=0.
\]

The first-moment susceptibility is symmetry-forced to vanish.

The next natural statistic is:
\[
P_{tt}=a,
\]
whose deletion response is:
\[
P_{stt}.
\]

Conceptual positioning:
- Bóna et al.: forbidden structure \(\to\) first-moment response;
- our symmetry-preserving setting: first moment frozen \(\to\) **second-moment response is the first nontrivial susceptibility**.

This may be an elegant paper motivation if the literature gate confirms no direct predecessor.

---

# 22. Hard deletion as an integrated soft susceptibility

Let \(P_v(s)\) denote topological pressure/log Perron root along the profile-v soft-deletion path.

With penalty convention \(e^{-sH_v}\):
\[
P'_v(s)=-q_v(s).
\]

Hard deletion is the limit:
\[
s\to\infty.
\]

Define entropy/Perron drop:
\[
D_v
=
P_v(0)-P_v(\infty)
=
\log\frac{\lambda_{\rm old}}{\lambda_v}.
\]

Integrating:
\[
\boxed{
D_v=\int_0^\infty q_v(s)\,ds.
}
\tag{H1}
\]

Likewise:
\[
\boxed{
\Delta a_v
=
a_v(\infty)-a_v(0)
=
\int_0^\infty a'_v(s)\,ds.
}
\tag{H2}
\]

Define instantaneous mass-normalized susceptibility:
\[
r_v(s)=\frac{a'_v(s)}{q_v(s)}.
\]

Then:
\[
\boxed{
\eta_v
:=
\frac{\Delta a_v}{D_v}
=
\frac{
\int_0^\infty q_v(s)r_v(s)\,ds
}{
\int_0^\infty q_v(s)\,ds
}.
}
\tag{H3}
\]

Thus:
\[
\boxed{
\eta_v=
\frac{\Delta a_v}{\log(\lambda_{\rm old}/\lambda_v)}
}
\]
is the \(q(s)\)-weighted average variance susceptibility along the entire soft-to-hard path.

This provides a principled alternative to normalizing only by \(q_v(0)\).

Claude should verify sign conventions and hard-limit assumptions.

---

# 23. Exact factorization of the old hard-response normalization

Historically:
\[
\rho_v=\frac{\Delta a_v}{q_v(0)}.
\]

Define:
\[
\tau_v
=
\frac{D_v}{q_v(0)}
=
\frac{\log(\lambda_{\rm old}/\lambda_v)}{q_v(0)}.
\]

From (H1):
\[
\boxed{
\tau_v
=
\int_0^\infty
\frac{q_v(s)}{q_v(0)}\,ds.
}
\tag{H4}
\]

Then:
\[
\boxed{
\rho_v
=
\eta_v\tau_v.
}
\tag{H5}
\]

Interpretation:
- \(\eta_v\): average variance susceptibility per entropy cost;
- \(\tau_v\): how the forbidden-class occurrence mass decays along the soft-deletion path.

This factorization may be one of the most useful theoretical reframings developed so far.

It shows that \(\rho_v\) mixes two different mechanisms.

---

# 24. Reinterpretation of the historical entropy-drop/q ratios

Exploratory transition data had:
\[
\frac{\Delta\log\lambda}{q_h}
\approx
0.927,\;0.884,\;0.911
\]
for transitions 4→5, 5→6, 6→7.

Previously this was treated as “q tracks entropy drop fairly well”.

With (H4), this ratio is exactly:
\[
\boxed{
\frac{\Delta\log\lambda}{q_h(0)}=\tau_h.
}
\]

Thus it has a direct soft-path interpretation:
> normalized area under the forbidden-event occurrence-mass curve.

This gives the old exploratory ratio a stronger conceptual role, but the derivation must be independently checked.

---

# 25. Where overlap/correlation structure enters

From:
\[
q_v(s)=-P'_v(s),
\]
differentiate:
\[
q'_v(s)=-P''_v(s).
\]

At \(s=0\), standard pressure-Hessian theory suggests:
\[
\boxed{
q'_v(0)=-\sigma^2(H_v),
}
\tag{C1}
\]
where \(\sigma^2(H_v)\) is the asymptotic variance of the profile-event occurrence count.

This is exactly the kind of quantity controlled by:
- pattern autocorrelation;
- cross-correlation matrices;
- overlap clusters;
- Markov pattern-count covariance.

This suggests a clean mechanism division:

\[
\boxed{
B(v)
\longrightarrow
\text{local composition susceptibility}
}
\]

and:

\[
\boxed{
\text{border/overlap/correlation}
\longrightarrow
q_v(s)\text{-path},\;\tau_v,\;T_v.
}
\]

This is much more precise than simply saying “borders might matter”.

---

# 26. Higher-order nonlinear response

The first variance response is schematically:
\[
P_{stt},
\]
a mixed third cumulant.

The next soft-deletion correction is:
\[
P_{sstt},
\]
a mixed fourth cumulant containing two forbidden-event indicators.

In an iid source, such terms become nonzero only when occurrence events are dependency-connected, i.e. via overlapping/clustered patterns.

This suggests:
- first order: composition geometry;
- higher orders: overlapping forbidden occurrences + path deformation.

The Guibas–Odlyzko / Goulden–Jackson / Rukhin / Bassino machinery may therefore be the right language for the higher-order correction rather than a competing explanation.

This is a theory direction, not yet proved for the present SFT family.

---

# 27. General alphabet-size extension

The full-shift calculation appears to extend to a uniform alphabet of size \(d\).

Define:
\[
B_d(v)=
\sum_{j=1}^d
\left(v_j-\frac hd\right)^2.
\]

For the centered indicator of one distinguished symbol in the uniform full shift:
\[
\boxed{
\frac{a'_v(0)}{q_v}
=
\frac{2h(d-1)}{d^2}
-
\frac{4}{d}B_d(v).
}
\tag{G}
\]

For \(d=3\), this reduces to:
\[
\frac43\left(\frac h3-B(v)\right).
\]

Conceptual implication:
- the local composition-imbalance term is a general symmetry/second-moment effect;
- the **Abelian-square-specific** content begins in which profiles occur and how their overlap/return structure behaves in the constrained language.

Claude should verify formula (G) independently.

---

# 28. Historical research program after RUN_3 (superseded by revised section 53)

Do **not** immediately perform a high-dimensional feature search.

The equations above give a more disciplined program.

## Step A — validate the theory independently
Claude should:
- check Goal 1 derivation line-by-line;
- check signs/factors;
- check boundary effects and overlapping-window differentiation;
- search literature specifically for the exact formulas, not just nearby concepts.

## Step B — freeze theoretical observables before looking at new responses
Candidate frozen quantities:
- exact \(B(v)\);
- \(M_h\);
- \(r_v(0)=a'_v(0)/q_v(0)\);
- residual:
  \[
  T_v(0)=r_v(0)-M_h+\frac43B(v);
  \]
- hard entropy cost:
  \[
  D_v=\log(\lambda_{\rm old}/\lambda_v);
  \]
- \(\eta_v=\Delta a_v/D_v\);
- \(\tau_v=D_v/q_v(0)\).

## Step C — correlation-control experiment h2-h7
Only after definitions are frozen, test literature-motivated overlap quantities:
- autocorrelation/border polynomial summaries;
- class-internal cross-correlations;
- return-time quantities;
- Parry-weighted overlap/return summaries;
- pattern occurrence asymptotic variance \(\sigma^2(H_v)\).

The purpose is not to fish for a predictor. It is to explain \(T_v\) or \(\tau_v\) using predeclared literature-derived statistics.

## Step D — literature second pass
Focus especially on:
- Ruelle/thermodynamic mixed pressure derivatives;
- third cumulants / susceptibilities;
- group-inverse sensitivity of asymptotic variance;
- pattern-correlation matrices for Markov sources;
- multivariate forbidden-pattern generating functions;
- weighted correlation polynomials;
- covariance response to holes.

## Step E — h=8 preregistration
Only after A-D.

## Step F — single blind h=8 run
Evaluate preregistered pass/fail/falsifiers before interpretation.

---

# 29. Historical positive-result ladder (retain for provenance; update in sections 55-56)

There are several independent success modes.

## Positive result type 1: exact benchmark only
Even without a finite-family law, a rigorous full-shift proposition:
\[
a'_v(0)
=
\frac{4q_v}{3}\left(\frac h3-B(v)\right)
\]
could be a useful theoretical contribution/application if the exact formulation is not already standard in the literature.

## Positive result type 2: exact constrained decomposition
If:
\[
\frac{a'_v(0)}{q_v}
=
M_h-\frac43B(v)+T_v
\]
can be rigorously derived and \(T_v\) expressed through a resolvent/correlation object, this could provide a genuine mechanism.

## Positive result type 3: robust h2-h7 quantitative law
If RUN_3 confirms the sign split and a quantitative \(B\)-ordering survives independent methods, we have a strong empirical finite-family phenomenon.

## Positive result type 4: composition term is only a proxy
If correlation structure fully explains the profile ordering, that is still valuable:
- it links Abelian-profile geometry to known forbidden-pattern correlation theory;
- it prevents a false “new law”;
- it may yield an exact structural translation theorem.

## Positive result type 5: both composition and correlation matter
Potentially the most interesting:
- exact local composition term from \(B\);
- independent dynamical correction from overlap/return structure;
- controlled decomposition of the two effects.

## Positive result type 6: preregistered h=8 confirmation
A future blind h=8 test would convert a post-hoc finite-family pattern into a real out-of-sample prediction.

The strongest eventual package:
\[
\boxed{
\text{analytic local term}
+
\text{correlation correction}
+
\text{audited finite-family response}
+
\text{preregistered out-of-sample test}.
}
\]

---

# 30. What could falsify or weaken the current story?

Claude should actively try to break it.

1. RUN_3 may show that the 15/15 sign split was an artifact of the wrong variance formula.
2. The full-shift derivation may have a hidden boundary/overlap/factor error.
3. A known general theorem may already imply the proposed composition susceptibility.
4. \(T_v\) may dominate so strongly that \(B\) has little explanatory value in constrained systems.
5. The apparent \(\rho_a\)-versus-\(B\) monotonicity may disappear under corrected variance calculations.
6. h2 non-additivity may show that class-only effects do not translate to the full transition.
7. A future h=8 test may falsify a simple most-balanced-only rule.
8. The second-most-balanced h8 boundary profile could expose an important distinction between local linear response and finite hard response.
9. The observable convention (state emission versus edge emission) may introduce a shift if not standardized across solvers.
10. Periodicity/multiple dominant SCCs could invalidate naïve Poisson/Parry formulas in some class-only deletion graph.

These are legitimate outcomes and must be preserved.

---

# 31. Original Thursday tasks for Claude (superseded by revised section 54)

Claude should begin by **auditing, not extending**.

## Task 1 — inspect RUN_3
Read the full RUN_3 report and raw evidence.

Verify:
- analytical fixtures;
- correct variance formula;
- Method A/B/C independence;
- actual test exit codes;
- SCC spectral intervals;
- period;
- Perron/Parry residuals;
- presentation invariance;
- profile counts;
- sign certificate;
- whether 15/15 survives;
- whether \(\rho_a\) monotonicity survives.

Do not accept agent summary text without inspecting artifacts.

## Task 2 — independently verify Goal 1
Prove or refute:
\[
\frac{a'_v(0)}{q_v}
=
\frac43\left(\frac h3-B(v)\right)
\]
for the unrestricted ternary full shift.

Check overlapping windows and finite-volume-to-pressure transition carefully.

## Task 3 — verify the general alphabet formula
Check:
\[
\frac{a'_v(0)}{q_v}
=
\frac{2h(d-1)}{d^2}
-
\frac4dB_d(v).
\]

## Task 4 — audit Goal 2 decomposition
Determine whether:
\[
\frac{a'_v(0)}{q_v}
=
M_h-\frac43B(v)+T_v
\]
is exact under the stated assumptions.

Give \(T_v\) a rigorous definition.

If possible, derive \(T_v\) in:
- covariance-sum form;
- resolvent/Poisson form;
- group-inverse form.

## Task 5 — literature adversarial search
Try to find prior art that subsumes:
- the exact full-shift composition susceptibility;
- third mixed pressure derivative of variance under a forbidden-cylinder penalty;
- asymptotic-variance response to transition deletion;
- group-inverse formulas for derivative of Markov additive-functional variance;
- pattern-correlation representation of that derivative;
- hard-path factorization \(\rho=\eta\tau\).

Return:
`NO_DIRECT_OVERLAP_FOUND...` if appropriate, never “novel” from absence.

## Task 6 — inspect Rukhin/Bassino/Guibas–Odlyzko chains
Ask:
- can profile-event count variance be obtained exactly from their correlation matrices?
- can the h2-h7 \(T_v\) or \(\tau_v\) be expressed using their objects?
- is our “composition + correlation correction” merely a reformulation of an existing pattern-count identity?

## Task 7 — no h=8 computation
Claude must not run or inspect h=8 system response data.

---

# 32. Original exact questions for Claude (still useful, but revised by section 54)

1. Is the full-shift derivation (FS) correct?
2. Is it already explicitly known in the literature?
3. If not explicit, is it an immediate corollary of a standard general theorem?
4. Is \(B(v)\) indeed the unique \(S_3\)-invariant quadratic composition statistic up to scale?
5. Is the \(A_2\)/Eisenstein geometric interpretation exact and useful or merely decorative?
6. Is the constrained decomposition (D2) exact?
7. Can \(T_v\) be represented in a finite-state resolvent/group-inverse form?
8. Is \(\eta_v=\Delta a_v/\Delta\log\lambda_v\) genuinely a \(q(s)\)-weighted path-average susceptibility under the chosen sign convention?
9. Is \(\tau_v=\Delta\log\lambda_v/q_v(0)\) exactly the normalized area under the occurrence-mass path?
10. Is \(q'_v(0)=-\sigma^2(H_v)\) correct with the precise pressure normalization?
11. Which known correlation-matrix result is closest to an explicit formula for \(T_v\) or \(\tau_v\)?
12. Does Bóna–Maga–Richey provide a true first-moment analogue of our symmetry-forced second-moment problem?
13. Does Huang–Mao or related Markov sensitivity theory imply sign/comparison results that threaten the distinctiveness of the profile rule?
14. If RUN_3 confirms 15/15, what is the strongest scientifically safe statement?
15. What should be preregistered for h=8 so that the test distinguishes composition geometry from correlation/nonlinearity rather than merely collecting another sign?

---

# 33. Recommended literature reading order Thursday

Tier 1:
1. Bóna–Maga–Richey 2026, arXiv:2606.06655.
2. Huang & Mao 2023, asymptotic variance of general discrete-time Markov chains.
3. Rukhin, pattern correlation matrices for Markov sequences.
4. Lind, perturbations of shifts of finite type.
5. Cheriyath & Agarwal, SFTs with holes / correlation and escape-rate work.

Tier 2:
6. Ramsey, multi-word perturbations of subshifts.
7. Fici & Puzynina survey on Abelian combinatorics.
8. Bassino–Clément–Nicodème finite-word-set occurrence statistics.
9. Guibas–Odlyzko correlation-polynomial lineage.
10. Standard Ruelle/pressure derivative references for cumulants and asymptotic variance.

For each source record:
- what it proves;
- what it does not prove;
- whether full text was checked;
- exact overlap with Claims A-I;
- terminology that should be reused in our eventual manuscript.

---

# 34. Potential eventual paper architecture

This is only a planning scaffold.

1. **Introduction**
   - bounded Abelian-square avoidance;
   - non-monotone collision constants;
   - h=7 preregistered failure motivating post-hoc structural analysis.

2. **Finite-state / Parry framework**
   - higher-block SFT;
   - collision constant;
   - asymptotic covariance.

3. **Profile-class edge deletions**
   - half-Parikh profile;
   - exact imbalance \(B(v)\);
   - class-only hard deletion.

4. **Audited finite-family evidence**
   - only after RUN_3;
   - h2-h7 profiles;
   - sign/ordering;
   - non-additivity;
   - caveats.

5. **Soft-deletion formalism**
   - pressure path;
   - \(q_v(s)\);
   - variance susceptibility.

6. **Full-shift benchmark**
   - exact \(B(v)\) formula;
   - \(A_2\) geometry;
   - general alphabet extension.

7. **Constrained decomposition**
   - local composition term;
   - correlation tail \(T_v\).

8. **Hard-path decomposition**
   - \(\eta_v,\tau_v,\rho_v=\eta_v\tau_v\).

9. **Correlation/overlap controls**
   - Rukhin/Bassino/Lind/Cheriyath-inspired quantities.

10. **Preregistered out-of-sample experiment**
    - h=8 only after prereg.

11. **Limitations / novelty discipline**
    - bounded finite family;
    - no universal sign theorem unless proved;
    - closest prior art.

---

# 35. Relationship to the larger project

This profile-response line is important but is **not** the final Mäkelä/FORBID4 goal.

Long-term priority remains:
- FORBID4 record hunt;
- symbolic suffix / adaptive obstruction-cover transfer;
- Mattila 2002 variable-polynomial ideas;
- general obstruction form
  \[
  \Delta_\ell=\text{constant}_\ell+\sum_i w_i[X_i=\ell].
  \]

Do not prematurely transfer the current bounded-family profile law to FORBID4.

The bounded \(L_h\) family is currently functioning as a mathematically controlled laboratory for developing:
- SFT machinery;
- variance/collision theory;
- perturbation ideas;
- profile/obstruction decompositions;
- evidence governance;
- preregistered experimentation.

---

# 36. Governance lessons from the last day

These are part of the scientific result and should not be forgotten.

1. **Preregistration worked.**  
   h=7 P3/P4 failed and F4 triggered. The failure was preserved.

2. **Post-hoc discoveries are labeled post-hoc.**  
   Profile response was not rewritten as an h=7 prediction.

3. **Independent verification caught real defects.**
   - 924 core versus 936 full deleted-edge count was clarified.
   - profile classification off-by-one was found.
   - run_2 variance formula bug was found.
   - hard-coded report success was found.

4. **Agent “all green” text is not evidence.**  
   Raw formulas, code, residuals, tests, hashes and provenance must be inspected.

5. **Literature can change the mechanism story.**  
   Bóna–Maga–Richey changed the question from “B is the mechanism” to “composition and correlation must be separated”.

6. **Do not overfit feature sets.**  
   Derive/freeze variables before looking at response.

7. **Do not erase failed runs.**  
   run0/run1/run2 remain historical evidence.

8. **No h=8 until the question is frozen.**

---

# 37. Current strongest synthesis

The working hypothesis is no longer:

\[
B(v)\text{ alone controls hard-deletion variance.}
\]

A much better structural picture is:

\[
\boxed{
\text{profile response}
=
\text{local composition geometry}
+
\text{dynamical overlap/return correction}
+
\text{nonlinear path integration}.
}
\]

Possible exact local term:
\[
-\frac43B(v)
\]
after a profile-independent baseline is removed.

Possible dynamical objects:
\[
T_v(s),\quad q_v(s),\quad \tau_v.
\]

Possible hard-path average:
\[
\eta_v.
\]

Observed hard response:
\[
\rho_v=\eta_v\tau_v.
\]

This creates a coherent bridge among:
- Abelian Parikh geometry;
- SFT/Parry dynamics;
- pressure/cumulant response;
- pattern correlation matrices;
- hard forbidden-word perturbation.

Whether this bridge is genuinely distinctive is a literature question still open.

---

# 38. Original claim-status snapshot (partly superseded by revised section 55)

| Claim | Current status |
|---|---|
| \(R_n^{(h)}\sim C_h/n\) for h=2,...,6 | CERTIFIED/PUBLISHED |
| h=7 preregistered numerical outcome | CLOSED COMPUTATIONAL RESULT, NOT PUBLISHED FAMILY |
| h=7 original P3/P4 prediction | FAILED/OUT OF RANGE |
| F4 | TRIGGERED |
| historical 14/14 count | INCORRECT/REPORTING DEFECT |
| corrected profile count h2-h7 = 15 | CLOSED COMPUTATIONAL/COMBINATORIAL EVIDENCE; RUN3D2 SET-EQUALITY CHECK |
| 6/6 balanced positive + 9/9 other negative | CLOSED FINITE-FAMILY COMPUTATIONAL OBSERVATION |
| \(\rho_a\) decreasing with \(B\) | HISTORICAL/STALE UNTIL RECOMPUTED WITH CORRECTED RUN3C q_v |
| h2 non-additivity | EXPLORATORY, NEEDS RUN_3 |
| h4 initial derivative vs hard sign mismatch | HISTORICAL EXPLORATORY, NEEDS REVALIDATION |
| free-shift formula (FS) | INTERNALLY PROVED; EXTERNAL REFEREE/LITERATURE CHECK REQUIRED |
| \(A_2\) geometry | EXACT ALGEBRA IF FS/definition accepted |
| constrained decomposition (D2) | INTERNALLY FORMALIZED EXACTLY UNDER MIXING/SYMMETRY ASSUMPTIONS |
| hard-path factorization \(\rho=\eta\tau\) | INTERNALLY PROVED FOR REGULAR POSITIVE-ENTROPY HARD ENDPOINTS |
| direct prior art for profile hard-deletion variance sign | NOT FOUND IN TARGETED CHECKED SOURCES |
| novelty | NOT ESTABLISHED |
| h=8 profile-response result | NOT RUN / BLIND |

---

# 39. Historical Thursday decision tree (superseded by revised sections 53-57)

When Claude returns, use the revised evidence state below rather than the now-obsolete RUN3-pending branches:

### If RUN_3 rejects the sign pattern
- preserve rejection;
- do not rescue 15/15;
- retain Goal 1/Goal 2 theory as independent research;
- reframe empirical section.

### If RUN_3 confirms 15/15 but \(\rho_a\) ordering fails
- sign split remains a finite-family empirical observation;
- do not claim quantitative law;
- correlation control becomes even more important.

### If RUN_3 confirms both sign split and quantitative \(B\)-ordering
- freeze theory variables;
- run correlation-control h2-h7 with predeclared features;
- do second literature pass;
- only then construct h=8 preregistration.

### If literature finds a general theorem subsuming Goal 1/2
- cite it;
- stop claiming theoretical novelty;
- reposition work as an Abelian-square application / computational experiment;
- determine whether the class-hard-deletion / preregistered out-of-sample aspect remains distinctive.

### If theory and literature both survive
Then the project has a plausible route to a strong paper combining:
- theorem/lemma;
- mechanism;
- computation;
- preregistration;
- reproducibility.

---

# 40. Original sentinel summary (superseded by revised section 57)

Do not lose these points:

- h=7 was a **real preregistered failure/mixed result** and F4 triggered.
- Profile response is **post-hoc** relative to h=7.
- Old 14/14 count is wrong; corrected combinatorics suggests 15 profiles.
- RUN2 was invalid, but RUN3/RUN3B/RUN3C repaired the variance/evidence chain and RUN3D2 repaired profile identity. **15/15 is now internally closed as a finite-family computational observation.**
- The next gate is theory/correlation/literature, not another baseline-repair loop.
- Literature is a hard gate, not decoration.
- Bóna–Maga–Richey is the most important close modern prior art discovered so far.
- Rukhin/Bassino/Guibas–Odlyzko may contain the right overlap/correlation language for second moments.
- The new key mathematical object is not merely \(B(v)\), but the decomposition of profile response into:
  - local composition geometry;
  - dynamical correlation correction;
  - nonlinear hard-path integration.
- Full-shift theorem candidate:
  \[
  \frac{a'_v(0)}{q_v}
  =
  \frac43\left(\frac h3-B(v)\right).
  \]
- General constrained candidate:
  \[
  \frac{a'_v(0)}{q_v}
  =
  M_h-\frac43B(v)+T_v.
  \]
- Hard-response factorization candidate:
  \[
  \rho_v
  =
  \frac{\Delta a_v}{q_v(0)}
  =
  \eta_v\tau_v.
  \]
- h=8 remains blind.
- No novelty claim is currently allowed.

---

## Final requested role for Claude on Thursday

Act as a skeptical mathematical referee, not a cheerleader.

Try to:
1. break the formulas;
2. find prior art;
3. audit RUN_3;
4. separate exact theorem from empirical pattern;
5. separate composition from correlation;
6. preserve failed predictions;
7. freeze hypotheses before h=8.

Only after those gates should we decide what the h=8 preregistration is actually allowed to predict.

**END OF ORIGINAL 2026-08-24 INTAKE BODY — SUPERSEDED WHERE NOTED BY 2026-08-25 REVISION**


---

# 41. 2026-08-25 major revision: what changed after the original intake

This section supersedes any earlier wording that still treats RUN3 as pending.

## 41.1 Final baseline evidence chain

The evidence-recovery sequence was:

1. **RUN2 — rejected**: wrong asymptotic-variance formula, weak SCC logic, hard-coded status, governance breach.
2. **RUN3 — formula correction**: correct Poisson/Green–Kubo formula and analytical fixtures restored the numerical method.
3. **RUN3B — integrity repair**: independent reproductions, Method C infrastructure, corrected cyclic-SCC logic, but later audit found a q_v target-index bug and weak PASS predicates.
4. **RUN3C — final certificate patch**: q_v index bug corrected; q_v recomputed independently; SCC dominance, periods, A/B/C agreement, presentation invariance, reproducibility, tests, and report consistency all gated mechanically.
5. **RUN3D/RUN3D2 — profile identity repair**: RUN3C's final header accidentally reported the wrong per-h profile-count vector. Direct-word and graph-edge enumeration showed the numerical rows themselves were correct; the error was reporting-only.

RUN3C final numerical gates:

- variance formula: PASS;
- edge-equivalence mismatches: 0;
- profile-classification mismatches: 0;
- q_v Q1/Q2 maximum difference: 0;
- q partition residual: 0;
- unique graph dominance: PASS; minimum reported dominance margin 0.002841;
- h5 profile (3,1,1): one cyclic SCC, language INFINITE, unique dominant SCC, period 1, lambda about 1.25841;
- Method A/B max difference: 3.12e-13;
- delta_A/delta_B max difference: 4.01e-13;
- Method C: 38 cases, max |A-C| = 1.45e-7, max epsilon-scale spread = 3.11e-8;
- presentation invariance h3: lambda diff 0, a diff 2.11e-14, C diff 1.80e-8;
- twin reproduction numerical max difference: 0;
- tests/report/file integrity: PASS;
- h8 blindness: preserved;
- commit/push: NO.

## 41.2 Correct profile universe

The exact profile sets are:

- h2: (1,1,0), (2,0,0)
- h3: (1,1,1), (2,1,0)
- h4: (2,1,1)
- h5: (2,2,1), (3,1,1), (3,2,0)
- h6: (2,2,2), (3,2,1), (4,1,1)
- h7: (3,2,2), (3,3,1), (4,2,1), (5,1,1)

Therefore the correct per-h vector is:

\[
\boxed{[2,2,1,3,3,4]}
\]

and the total is 15.

RUN3D2 confirmed that the actual RUN3C numerical row vector is exactly this vector, with no missing or extra profiles. The incorrect RUN3C header vector [1,1,3,3,4,3] was **reporting-only**.

Final sign split from the actual numerical rows:

\[
\boxed{
6/6\ \text{most-balanced}:\Delta a>0,
\qquad
9/9\ \text{other}:\Delta a<0.
}
\]

This is now the strongest safe empirical statement:

> In the audited finite family h=2,...,7, every occurring most-balanced profile class has positive class-only hard-deletion variance response, and every other occurring profile class has negative response.

Do not call this a universal law.

## 41.3 Two residual evidence-hygiene notes from the final red-team pass

These do **not** overturn the 15/15 closure, but they must be remembered.

### RUN3D2 B-helper normalization

RUN3D2 used a helper labeled `computeB` of the form

\[
\frac{3\sum_i v_i^2-h^2}{2h(h-1)}.
\]

That is **not** the project's canonical

\[
B(v)=\sum_i(v_i-h/3)^2=\frac{3\sum_i v_i^2-h^2}{3}.
\]

For fixed h, the RUN3D2 helper is only a positive scalar multiple of canonical B, so it selects exactly the same minimum-B profile(s). Therefore the 6/9 most-balanced-versus-other classification is unaffected. However, RUN3D2's helper must never be reused for quantitative B values.

### RUN3D2 positive-mass scope provenance

RUN3D2's scope-comparison code read a RUN3B q-partition artifact and contained a fallback to the evaluated-row vector. Therefore `ALL_THREE_EQUAL` should **not** be cited as the independent proof of positive q_v support. For any q-dependent claim, use the corrected RUN3C `QV_INDEPENDENT_AUDIT` / `Q_PARTITION_FINAL_AUDIT` evidence instead.

These are evidence-hygiene issues, not sign-baseline failures.

---

# 42. Referee result: Goal 1 is mathematically solid

Let X_1,...,X_n be iid uniform ternary symbols, let H_{v,j} be the indicator that the length-2h window at j is an Abelian square whose half-profile lies in the full S3 orbit of v, and let

\[
N_{v,n}=\sum_j H_{v,j},
\qquad
F_n=\sum_{i=1}^n\left(1_{\{X_i=0\}}-\frac13\right).
\]

Under the soft penalty

\[
d\mu_{n,s}\propto e^{-sN_{v,n}}d\mu_0,
\]

the whole orbit event is S3-invariant, hence

\[
E_sF_n=0
\]

**exactly for every finite n and s**.

Thus

\[
a_n'(0)=-\frac1n\operatorname{Cov}_0(N_{v,n},F_n^2).
\]

The possible overlap objection was checked explicitly. By linearity,

\[
\operatorname{Cov}(N_{v,n},F_n^2)
=\sum_j\operatorname{Cov}(H_{v,j},F_n^2).
\]

For each j, decompose F_n=S_j+R_j into the 2h-block and its exterior. In the iid source H_{v,j},S_j are independent of R_j and E R_j=0, so

\[
\operatorname{Cov}(H_{v,j},F_n^2)
=\operatorname{Cov}(H_{v,j},S_j^2).
\]

Therefore pairwise overlap between **two forbidden occurrences** does not enter the first deletion derivative. It enters at the next deletion order, through terms with two H indicators.

Since

\[
E[S_j^2\mid H_v]=\frac43B(v),
\qquad
E[S_j^2]=\frac{4h}{9},
\]

we obtain

\[
\boxed{
\frac{a'_v(0)}{q_v}
=\frac43\left(\frac h3-B(v)\right).
}
\tag{FS-final}
\]

Internal referee status: **PROVED**.

Novelty status: **NOT ESTABLISHED**.

---

# 43. General alphabet extension is also proved

For a uniform alphabet of size d, define

\[
B_d(v)=\sum_{j=1}^d\left(v_j-\frac hd\right)^2.
\]

For the centered indicator of one symbol, the same orbit-symmetry argument gives

\[
E[S^2\mid H_v]=\frac4dB_d(v),
\]

while

\[
E[S^2]=\frac{2h(d-1)}{d^2}.
\]

Hence

\[
\boxed{
\frac{a'_v(0)}{q_v}
=
\frac{2h(d-1)}{d^2}
-
\frac4dB_d(v).
}
\tag{FS-d-final}
\]

This is a general symmetry/second-moment effect. The Abelian-square-specific content begins in the permitted profile classes and their overlap/return dynamics.

---

# 44. Goal 2 sharpened: exact conditional-correlation and resolvent interpretation

For the OLD mixing SFT, use a high-block Markov presentation and define the pressure

\[
\mathcal P_v(s,t)=P_{\rm top}(-sH_v+t f).
\]

S3 symmetry gives

\[
\mathcal P_t(s,0)=0,
\qquad
\mathcal P_{st}(s,0)=0.
\]

The variance is

\[
a_v(s)=\mathcal P_{tt}(s,0),
\]

and its deletion response is

\[
a'_v(0)=\mathcal P_{stt}(0,0)
=-\sum_{r,k\in\mathbb Z}\operatorname{Cum}(H_v,f_r,f_k).
\]

Because Ef=0,

\[
\operatorname{Cum}(H_v,f_r,f_k)
=q_v\left(E[f_rf_k\mid H_v]-E[f_rf_k]\right).
\]

Therefore an especially transparent exact identity is

\[
\boxed{
\frac{a'_v(0)}{q_v}
=-\sum_{r,k\in\mathbb Z}
\left(E[f_rf_k\mid H_v]-E[f_rf_k]\right).
}
\tag{CC}
\]

Interpretation:

> A profile occurrence acts as a pinned local condition; the susceptibility is the negative integrated distortion it induces in the surrounding two-point letter-correlation field.

Let I={0,...,2h-1} be the forbidden block and S_I=\sum_{i\in I}f_i. Define

\[
M_h=E[S_I^2].
\]

The local I x I contribution gives exactly

\[
q_v\left(\frac43B(v)-M_h\right).
\]

Hence

\[
\boxed{
\frac{a'_v(0)}{q_v}
=M_h-\frac43B(v)+T_v(0),
}
\tag{D2-final}
\]

where

\[
\boxed{
T_v(0)
=-\frac1{q_v}
\sum_{(r,k)\notin I\times I}
\operatorname{Cum}(H_v,f_r,f_k).
}
\]

This is an identity, not a heuristic decomposition.

For a finite-state Parry chain, T_v can be represented using the fundamental matrix

\[
Z=(I-P+\Pi)^{-1}
\]

or group/Drazin inverse

\[
G=(I-P)^\#=Z-\Pi.
\]

This connects directly to the classical Markov-chain asymptotic-variance literature.

---

# 45. Common-background cancellation and a sharper falsifiable target

Write the OLD letter autocovariance

\[
\gamma_d=E[f_0f_d].
\]

Then

\[
\boxed{
M_h
=\frac{4h}{9}
+2\sum_{d=1}^{2h-1}(2h-d)\gamma_d.
}
\tag{Mh}
\]

So

\[
\frac{a'_v(0)}{q_v}
=
\underbrace{\frac43\left(\frac h3-B(v)\right)}_{\text{iid composition benchmark}}
+
\underbrace{2\sum_{d=1}^{2h-1}(2h-d)\gamma_d}_{\text{common OLD background}}
+
T_v.
\]

For two profiles v,w at the same h, the common background cancels:

\[
\boxed{
r_v-r_w
=-\frac43(B(v)-B(w))+(T_v-T_w),
}
\tag{pair}
\]

where r_v=a'_v(0)/q_v.

This gives a non-post-hoc stability criterion:

\[
|T_v-T_w|<\frac43|B(v)-B(w)|
\]

is sufficient for the B-ordering to survive constrained dynamics.

Define the theory-driven residual

\[
\boxed{
\Theta_v=r_v+\frac43B(v)=M_h+T_v.
}
\]

Within a fixed h,

\[
\Theta_v-\Theta_w=T_v-T_w.
\]

This is a much cleaner target for correlation-control than fitting raw hard responses to arbitrary border features.

---

# 46. Hard-path calculus: exact factorization and the better normalized observable

For finite s,

\[
p_v'(s)=-q_v(s),
\qquad
p_v''(s)=\sigma_s^2(H_v)\ge0,
\]

so

\[
\boxed{q_v'(s)=-\sigma_s^2(H_v)\le0.}
\]

For a regular hard endpoint with positive Perron root,

\[
D_v
=\log\frac{\lambda_{\rm old}}{\lambda_v}
=\int_0^\infty q_v(s)\,ds.
\]

Define

\[
\eta_v=\frac{\Delta a_v}{D_v},
\qquad
\tau_v=\frac{D_v}{q_v(0)},
\qquad
\rho_v=\frac{\Delta a_v}{q_v(0)}.
\]

Then

\[
\boxed{\rho_v=\eta_v\tau_v.}
\]

Moreover the exact local composition coefficient survives the whole soft-to-hard integration. At each finite s,

\[
\frac{a'_v(s)}{q_v(s)}
=M_{h,v}(s)-\frac43B(v)+T_v(s).
\]

Therefore

\[
\boxed{
\eta_v=-\frac43B(v)+\Xi_v,
}
\tag{eta-B}
\]

with

\[
\Xi_v=
\frac1{D_v}
\int_0^\infty q_v(s)\big(M_{h,v}(s)+T_v(s)\big)\,ds.
\]

This is an important revision of the earlier normalization story:

> If the goal is to isolate composition geometry in a finite hard response, eta_v is theoretically cleaner than rho_v. rho_v additionally multiplies by the path-exposure factor tau_v.

All q-derived quantities must be recomputed from the corrected RUN3C q_v evidence before numerical use.

---

# 47. New connection not present in the original intake: information geometry

A targeted literature pass reveals a highly natural reframing.

Use the natural deletion coordinate

\[
u=-s
\]

and define the Markov exponential-family potential

\[
\psi(u,t)=P_{\rm top}(uH_v+t f).
\]

In the information geometry of Markov exponential families, the Hessian of the Perron/log-partition potential is the Fisher-information-rate / asymptotic-covariance metric for the generating additive observables.

Thus

\[
g_{tt}=\psi_{tt}=a.
\]

S3 symmetry gives

\[
g_{ut}=\psi_{ut}=0,
\]

while

\[
\psi_{utt}
\]

is the derivative of the letter-count Fisher metric in the forbidden-profile direction. Since u=-s,

\[
a'_s=-\psi_{utt}.
\]

For an exponential family, third derivatives of the potential form the canonical symmetric cubic / Amari–Chentsov-type tensor. Therefore the variance susceptibility can be viewed as:

\[
\boxed{
\text{a mixed cubic-tensor component of the Markov exponential family.}
}
\]

This gives a new search vocabulary for Claude:

- Markov exponential family;
- information geometry of Markov kernels;
- Fisher information rate;
- cubic tensor / Amari–Chentsov tensor;
- derivative of the Fisher metric;
- boundary/closure of a Markov exponential family.

Relevant literature leads discovered in the 2026-08-25 pass:

- Hiroshi Nagaoka, *The exponential family of Markov chains and its information geometry*, arXiv:1701.06119.
- Geoffrey Wolfer & Shun Watanabe, *Information geometry of Markov Kernels: a survey* (2023).
- Shun Watanabe & Geoffrey Wolfer, *Characterization of exponential families of lumpable stochastic matrices* (2026), which explicitly recalls that asymptotic variance is a second derivative of the Markov-family potential.
- Hayashi & Watanabe, information-geometry work on Markov-chain parameter estimation and potential Hessians.

This connection does **not** establish novelty. It may instead reveal that part of Goal 2 is standard information-geometric machinery in a new Abelian-profile application.

---

# 48. New invariant-theory warning: B is unique only at quadratic order

This is a major conceptual refinement.

Let

\[
\delta_i=v_i-h/3,
\qquad
\delta_1+\delta_2+\delta_3=0.
\]

Any polynomial depending only on the profile and invariant under alphabet permutation is a symmetric polynomial in the delta_i. By the fundamental theorem of symmetric polynomials, after imposing e_1=delta_1+delta_2+delta_3=0, the invariant polynomial ring is generated by

\[
e_2=\delta_1\delta_2+\delta_2\delta_3+\delta_3\delta_1
\]

and

\[
e_3=\delta_1\delta_2\delta_3.
\]

Since

\[
B(v)=\sum_i\delta_i^2=-2e_2,
\]

we may take the two fundamental composition invariants to be

\[
\boxed{B(v)}
\]

and

\[
\boxed{J(v)=\delta_1\delta_2\delta_3.}
\]

Consequences:

1. **B is the unique nontrivial quadratic S3-invariant**, explaining why it is forced at the local second-moment/linear-response level.
2. **B is not the only possible nonlinear composition invariant.** At cubic order the independent invariant J appears.
3. Therefore a universal hard-response law depending on B alone would require extra dynamical structure; symmetry by itself does not imply it.
4. If we later model higher-order composition corrections, J is a theory-derived predeclared candidate, not a data-mined feature.

This also generalizes: on the zero-sum standard representation of S_d, symmetric polynomial invariants can involve degrees 2,...,d. The quadratic B_d is only the first layer.

Important caution:

> The existence of J does not mean the full nonlinear response is a function of (B,J) alone. Pattern overlap/return structure remains an independent dynamical input.

This is arguably the strongest new reason found in the red-team pass **not** to overstate a B-only mechanism.

---

# 49. Symmetry-adapted resolvent: another possible simplification

Because the OLD transition operator commutes with the S3 action:

- H_v lies in the trivial representation;
- the centered letter-count vector lies in the two-dimensional standard representation;
- the Markov resolvent/group inverse preserves isotypic components.

Therefore the variance calculation and the mixed response do not need the full state space indiscriminately: the relevant Green operator acting on the letter observable lives in the standard-isotypic sector, and only the invariant component of products such as f times Gf can pair with H_v.

Potential consequence:

\[
\boxed{
T_v\ \text{may admit a symmetry-block-reduced resolvent representation.}
}
\]

This could provide both:

- a conceptual proof simplification;
- a substantial computational reduction for the future correlation-control phase.

This has not yet been implemented or literature-audited. It is a high-priority mathematical lead, not an established result.

---

# 50. Pattern-correlation translation can be made algorithmically exact

The profile class is a finite set of length-2h words rather than a single forbidden word. Classical pattern machinery suggests a concrete exact route:

1. Construct a deterministic automaton recognizing the full profile-word set U_v.
2. Form its product with the OLD Parry/Markov chain.
3. Mark profile occurrences with one formal variable z and letter counts with another variable y.
4. Let M(z,y) be the weighted transfer matrix.
5. Then derivatives of log rho(M(z,y)) generate the required cumulants.

In particular, at z=y=1 (or logarithmic coordinates), the mixed derivative corresponding to

\[
\partial_{\log z}\partial_{\log y}^2\log\rho(M)
\]

is the same structural object as the profile-deletion variance susceptibility.

This gives a direct bridge among:

- Guibas–Odlyzko / correlation polynomials;
- Goulden–Jackson clusters;
- Rukhin pattern-correlation matrices;
- finite Markov chain embedding / automata;
- the project's pressure derivative P_stt.

Additional useful literature found in the 2026-08-25 pass:

- Spitzner & Boucher (2007), *Asymptotic variance of functionals of discrete-time Markov chains via the Drazin inverse*, DOI 10.1214/ECP.v12-1262. Especially relevant because it explicitly treats sliding-window functionals via a Drazin inverse.
- Rukhin (2010), *Joint Distribution of Pattern Frequencies and Multivariate Polya–Aeppli Law*, DOI 10.1137/S0040585X97984115. Explicitly uses a fundamental matrix of a word-state Markov chain.
- Lladser, Betterton & Knight, *Multiple pattern matching: A Markov chain approach*, arXiv:0704.3221.
- General finite-Markov-chain-embedding literature for overlapping pattern counts.

Current verdict remains:

`KNOWN_MACHINERY`

but

`NO_DIRECT_OVERLAP_FOUND_FOR_THE_EXACT_PROFILE_VARIANCE_RESPONSE_FORMULA`

and

`NOVELTY_NOT_ESTABLISHED`.

---

# 51. Cluster/cumulant hierarchy: where overlap enters

The pressure in the deletion coordinate has the local cumulant expansion

\[
p(s)-p(0)
=-q s+\frac12\sigma_H^2s^2-\frac16\kappa_3(H)s^3+\cdots
\]

when analyticity holds around s=0.

Likewise, the variance response hierarchy is

\[
a'(0)=P_{stt},
\qquad
a''(0)=P_{sstt},
\qquad\ldots
\]

The first term contains one profile indicator H and therefore admits the clean local-composition decomposition above.

The next term contains two H indicators. In an iid source, nonzero joint cumulants require dependency-connected occurrence clusters, so **forbidden-pattern overlap becomes intrinsic at second deletion order**.

This suggests a precise division of labor:

- quadratic profile geometry B: forced local term at first response order;
- cubic/higher profile invariants: possible higher-order composition coordinates;
- correlation/cluster matrices: occurrence-overlap interactions;
- soft-path integration: accumulation of all orders into the hard response.

This is a more complete theory map than “B versus borders”.

---

# 52. Existing h2-h7 controls that can test mechanism before h8

No h8 computation is needed to test several sharp theoretical predictions.

## h2 profile (1,1,0)

Here

\[
B=2/3=h/3,
\]

so the iid full-shift theorem gives

\[
\boxed{a'_v(0)=0.}
\]

Yet the hard response is positive in the closed baseline. Therefore its positive finite response is necessarily nonlinear/path-driven rather than a positive first-order local composition term.

## h6 profile (3,2,1)

Again

\[
B=2=h/3.
\]

But the OLD system is constrained. Thus its initial response directly measures the departure from the iid benchmark:

\[
r_v(0)=M_6-4B/3+T_v.
\]

This is an excellent pre-h8 correlation control.

## h4 profile (2,1,1)

Historical exploratory work suggested initial derivative negative but hard response positive. If independently revalidated, this proves a sign change somewhere along the soft-deletion path and cleanly separates local susceptibility from integrated hard response.

Priority: revalidate h4 before using it in a paper.

---

# 53. Revised next research sequence

The baseline audit loop should now stop.

## Phase A — freeze the corrected baseline

- Preserve RUN0...RUN3D2 history.
- Do not rewrite failed runs.
- Promote only a concise machine-readable closure summary later, after human review.
- Do not use old RUN3B q_v values or RUN3D2 normalized-B helper quantitatively.

## Phase B — freeze theory before new response calculations

Freeze definitions of:

\[
B(v),\quad J(v),\quad M_h,\quad r_v(0),\quad T_v(0),\quad
D_v,\quad\eta_v,\quad\tau_v,\quad\Theta_v.
\]

J is included as a **higher-order invariant-theory control**, not as a fitted predictor.

## Phase C — h2-h7 mechanism experiment

Recompute from corrected evidence:

1. q_v;
2. instantaneous r_v(0);
3. M_h;
4. T_v and Theta_v;
5. hard D_v, eta_v, tau_v;
6. selected literature-defined pattern-correlation / return statistics.

Predeclare every statistic before inspecting the new response table.

## Phase D — mathematical compression

Try two parallel exact formulations:

1. symmetry-adapted S3 resolvent/group-inverse;
2. profile-pattern automaton / correlation-matrix transfer matrix.

Ask whether they are algebraically the same object.

## Phase E — literature second pass

In addition to the original reading list, search specifically for:

- Markov exponential families + third derivatives of potential;
- Amari–Chentsov/cubic tensor for Markov kernels;
- derivative of asymptotic variance / Fisher metric;
- Drazin inverse sensitivity of sliding-window functionals;
- multivariate pattern-count cumulants;
- extended exponential-family boundary / hard-support deletion.

## Phase F — only then h8 preregistration

The preregistration should discriminate mechanisms, not merely ask for another sign.

No h8 system computation before the preregistration commit.

---

# 54. Revised tasks for Claude on Thursday

Claude's highest-value role is now:

1. **Independent proof audit** of FS-final and FS-d-final.
2. **Independent derivation** of D2-final / CC using transfer operators or finite-state Markov perturbation.
3. **Check the information-geometric interpretation**: is P_stt precisely a cubic-tensor/Fisher-metric derivative component in the Markov exponential-family formalism, with the stated sign convention?
4. **Audit the invariant-theory observation** that the ternary zero-sum profile invariants are generated by B and J, and determine whether this perspective exists in combinatorics-on-words literature.
5. **Search for a closed pattern-correlation formula for T_v**, not merely for q'_v.
6. **Check the automaton-product route** for converting the profile class into a finite marked pattern process.
7. **Revalidate h4 initial-versus-hard sign mismatch** independently if the old derivative artifact is available.
8. **Do not reopen the baseline unless raw artifacts contradict the consolidated closure.** Focus effort on theory and prior art.
9. **No h8 computation.**

---

# 55. Revised claim-status table

| Claim | Revised status 2026-08-25 |
|---|---|
| Published collision family h2-h6 | CERTIFIED/PUBLISHED |
| h7 preregistered outcome | CLOSED COMPUTATIONAL RESULT; MIXED; F4 TRIGGERED |
| Profile response relative to h7 | POST-HOC |
| Correct h2-h7 profile vector [2,2,1,3,3,4] | CLOSED COMBINATORIAL / RUN3D2 CROSS-CHECK |
| 15 profile classes total | CLOSED |
| 6/6 minimum-B positive + 9/9 others negative | CLOSED FINITE-FAMILY COMPUTATIONAL OBSERVATION |
| h5 (3,1,1) finite-language claim | REFUTED; LANGUAGE INFINITE; UNIQUE DOMINANT CYCLIC SCC |
| RUN3B q_v values | SUPERSEDED BY RUN3C CORRECTION |
| old rho_a ordering | STALE UNTIL RECOMPUTED WITH CORRECT q_v |
| full-shift FS formula | INTERNALLY PROVED |
| general alphabet formula | INTERNALLY PROVED |
| constrained M_h - 4B/3 + T_v decomposition | INTERNALLY FORMALIZED EXACTLY UNDER ASSUMPTIONS |
| conditional-correlation identity CC | INTERNALLY PROVED |
| group/Drazin resolvent route | STANDARD MACHINERY; PROJECT-SPECIFIC FORMULATION TO AUDIT |
| hard-path rho=eta tau | INTERNALLY PROVED FOR REGULAR ENDPOINTS |
| eta=-4B/3+Xi | INTERNALLY DERIVED FOR REGULAR ENDPOINTS |
| information-geometric cubic-tensor interpretation | NEW THEORY LEAD; LITERATURE AUDIT REQUIRED |
| B + J invariant-theory hierarchy | EXACT ALGEBRA; RELEVANCE TO RESPONSE IS A THEORY HYPOTHESIS |
| symmetry-adapted resolvent reduction | THEORY LEAD |
| automaton/correlation-matrix formula for T_v | THEORY/COMPUTATIONAL LEAD |
| h4 initial-vs-hard sign reversal | HISTORICAL; NEEDS REVALIDATION |
| h8 system response | NOT RUN / BLIND |
| novelty | NOT ESTABLISHED |

---

# 56. Revised strongest synthesis

The project has moved beyond a raw sign observation.

The current coherent picture is:

\[
\boxed{
\text{profile response}
=
\text{symmetry-forced local composition geometry}
+
\text{dynamical correlation/return field}
+
\text{nonlinear path integration}.
}
\]

At first response order, the local composition component is exact:

\[
-\frac43B(v).
\]

At higher composition order, symmetry permits a second fundamental ternary invariant:

\[
J(v)=\prod_i(v_i-h/3).
\]

The dynamical part is encoded by mixed correlation/cumulant or resolvent objects such as T_v. The finite hard response naturally separates into an entropy-normalized susceptibility eta_v and a path-exposure factor tau_v.

A second conceptual bridge is now visible:

\[
\boxed{
\text{thermodynamic pressure}
\leftrightarrow
\text{Markov exponential-family potential}
}
\]

so that asymptotic variance is a Fisher-metric component and its deletion response is a mixed cubic-tensor component.

A third bridge is algorithmic:

\[
\boxed{
\text{profile word class}
\to
\text{pattern automaton}
\to
\text{Markov fundamental matrix / correlation matrix}
\to
T_v.
}
\]

If these bridges survive independent literature/referee checking, the eventual contribution is potentially much stronger than “15/15”: it becomes a structured theory of how **Parikh-composition geometry and pattern dynamics jointly control second-moment response to forbidden-pattern perturbations**.

This remains a hypothesis about the final paper-level contribution, not a novelty claim.

---

# 57. Revised sentinel summary for Claude

Do not lose these points:

- h7 was a genuine preregistered mixed result; P3/P4 failed and F4 triggered.
- Profile response is post-hoc relative to h7.
- The correct profile universe is exactly 15 classes with vector [2,2,1,3,3,4].
- RUN3C's alternative count vector was reporting-only; RUN3D2 matched the actual numerical rows to the exact profile sets.
- The finite-family sign split is now internally closed: 6/6 minimum-B positive, 9/9 other negative.
- RUN3B q_v had an index bug; only corrected RUN3C q evidence may be used for q-normalized metrics.
- RUN3D2's `computeB` helper was scaled incorrectly, but this did not affect within-h minimum-B classification. Use canonical B everywhere else.
- The full-shift susceptibility formula survived an explicit overlap audit and is internally proved.
- The constrained response decomposition has an exact mixed-cumulant / conditional-correlation interpretation.
- eta_v is the cleaner finite hard-response normalization for composition geometry; rho_v also contains tau_v.
- Information geometry provides a new vocabulary: Fisher metric and mixed cubic/Amari–Chentsov tensor of a Markov exponential family.
- Invariant theory provides a new warning/control: B is unique only at quadratic order; J is the next independent S3-invariant composition coordinate.
- Pattern automata + fundamental matrices may give the exact bridge from word overlaps to T_v.
- h8 remains completely blind.
- Novelty remains NOT ESTABLISHED.
- The next phase is theory/correlation/literature, not another baseline-repair loop.

**END OF REVISED CLAUDE THURSDAY INTAKE — 2026-08-25 UPDATE**
