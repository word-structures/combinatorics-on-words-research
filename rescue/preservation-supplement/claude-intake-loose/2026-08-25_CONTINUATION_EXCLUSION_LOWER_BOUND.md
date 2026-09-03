# Continuation-Exclusion Lower Bound for the hidden-color echo

**Date:** 2026-08-25  
**Status:** THEORY DEVELOPMENT / EXPLORATORY NUMERICAL INSTANTIATION  
**Novelty:** NOT ESTABLISHED  
**Scope:** h=4, profile (2,1,1), exposed baseline only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Goal

Construct a **non-tautological** lower bound on the hidden-color continuation
kernel

\[
K_v(d)
=
P(X_{2h-1+d}=C\mid G_v)
-
P(X_{2h-1+d}=X_0),
\]

without computing the soft response \(a'_v(0)\).

The key requirement is that the lower bound use only:

1. the unperturbed baseline Parry chain;
2. target-conditioned finite continuation contexts;
3. combinatorial allowed/forbidden-color information induced by the
   smaller-Abelian-square constraints;
4. conservative lower bounds on the probability of choosing the hidden color
   when it is allowed.

Thus the construction can be evaluated **before any epsilon sweep or
variance-response computation**.

---

## 2. General continuation-exclusion lemma

Let \(G\) be a target event and let \(C\) be a target-measurable hidden label
(color).

At the context immediately before the future output of interest, partition
the target-conditioned context space into finitely many cells
\(\mathcal P=\{A\}\).

For each cell define

\[
\mu_A
=
P(S\in A\mid G),
\]

and

\[
p^-_A
=
\inf_{s\in A}
P(X_{\mathrm{next}}=C\mid S=s).
\]

If the cell forces \(C\), take \(p^-_A=1\); if \(C\) is forbidden, take
\(p^-_A=0\).

Then trivially but usefully,

\[
\boxed{
P(X_{\mathrm{next}}=C\mid G)
\ge
\sum_{A\in\mathcal P}\mu_A p^-_A.
}
\]

Therefore, if \(b_d\) is the corresponding ordinary baseline same-color
probability,

\[
\boxed{
K_v(d)
\ge
\sum_A\mu_A p^-_A-b_d.
}
\]

The lemma itself is elementary.  The potential research content is in finding
a **small, pattern-combinatorial partition** for which the right-hand side is
positive and useful.

This is intentionally different from defining \(E=-T\) after the response is
already known.

---

## 3. h=4 target setup

For \(h=4\), \(v=(2,1,1)\), the target window has length 8.

The first target color is classified as:

- **singleton-start** if it occurs once in each half-profile;
- **double-start** if it is the doubled color.

Under the baseline target-conditioned Parry measure,

\[
P(\text{singleton-start}\mid G)
\approx 0.6974644791189133,
\]

\[
P(\text{double-start}\mid G)
\approx 0.3025355208810862.
\]

These are baseline quantities; no soft response is used.

---

# 4. First lower bound: \(K(2)>0\)

The future symbol for \(d=2\) is \(X_9\) when the target occupies
\(X_0,\ldots,X_7\).

At the state immediately before \(X_9\), classify each context by:

1. start multiplicity (singleton/double);
2. number of allowed competitor colors;
3. whether the current last symbol equals the hidden color.

All of these are finite continuation-state properties.  Allowed colors are
determined by K=2/K=3 Abelian-square exclusions.

Using, in each cell, the **minimum** baseline Parry probability of choosing
the hidden color gives the conservative bound

\[
P(X_9=C\mid G)
\ge
\boxed{0.3424740576482585}.
\]

The ordinary baseline same-color probability at lag 9 is

\[
b_2
=
P(X_9=X_0)
\approx
0.3146133215477813.
\]

Hence

\[
\boxed{
K(2)
\ge
0.0278607361004772
>0.
}
\]

The actual baseline continuation value from direct evaluation is

\[
K(2)\approx0.0755268896438214,
\]

but the actual value is **not used** in the lower-bound proof candidate.

Thus the sign of the first strong hidden-color rebound is already predicted by
a finite continuation-exclusion certificate.

---

# 5. Second lower bound: \(K(3)>0\)

For \(d=3\), the future symbol is \(X_{10}\).

A slightly richer but still structural partition was used:

1. start multiplicity;
2. hidden-color count in the relevant finite memory;
3. number of allowed competitor colors;
4. whether the current last symbol equals the hidden color;
5. whether the previous symbol equals the hidden color.

Again, each cell is determined before evaluating the final transition.

Using the minimum hidden-color transition probability in each cell gives

\[
P(X_{10}=C\mid G)
\ge
\boxed{0.3679699746055735}.
\]

The ordinary baseline same-color probability at lag 10 is

\[
b_3
=
P(X_{10}=X_0)
\approx
0.3383938491497947.
\]

Therefore

\[
\boxed{
K(3)
\ge
0.0295761254557788
>0.
}
\]

The directly evaluated value is

\[
K(3)\approx0.100133325423055,
\]

again not needed to establish the lower-bound sign.

---

# 6. Consequence for the boundary-anchored response

For the symmetric ternary target event, the previously derived
boundary-anchored contribution has the form

\[
D^{\mathrm{anch}}_{2h-1+d}
=
-\frac{4q_v}{3}K_v(d).
\]

For h=4,

\[
q_v\approx0.0879722966095722.
\]

Combining only the conservative lower bounds above gives

\[
\underline K(2)+\underline K(3)
\approx
0.0574368615562560.
\]

Hence the two anchored contributions alone satisfy the candidate bound

\[
\boxed{
D^{\mathrm{anch}}_9+D^{\mathrm{anch}}_{10}
\le
-0.00673713682819985.
}
\]

This number was obtained **without the soft-response derivative**.

For comparison, the positive response margin remaining after the entire
target-window-scale part of the h=4 decomposition was

\[
M_{\mathrm{pre}}
\approx
0.00900052651649684.
\]

Thus the currently certified-by-structure anchored echo explains at least

\[
\boxed{74.85\%}
\]

of the amount required to overturn that remaining positive margin.

This does **not yet prove the full sign reversal from combinatorics alone**.
It does show that a substantial majority of the required negative mechanism
can be forced from baseline continuation structure without reading the soft
response.

---

# 7. Why this is non-tautological

The quantities used in the bound are:

- target baseline mass;
- target start-multiplicity class;
- finite continuation contexts;
- K=2/K=3 allowed-color structure;
- baseline Parry transition lower floors;
- ordinary same-color baseline correlations.

None requires:

- an epsilon grid;
- \(a'_v(0)\);
- the lag-response \(D_k\);
- the local/tail residual \(T_v\);
- the hard deletion result.

Thus the inequality can be evaluated prospectively on another exposed
finite-state target before computing its variance response.

This is the property needed if it is to become a predictive criterion rather
than a reformulation of a known answer.

---

# 8. What is still missing for a general sign theorem

The two boundary anchors alone do not yet exceed the full positive
pre-nonlocal margin.

The gap is approximately

\[
0.00900052651649684
-
0.00673713682819985
=
\boxed{0.00226338968829699}.
\]

There are at least two possible ways to close it:

### Route A — add more one-endpoint placements

The earlier lag-9/10 placement audit found that one-endpoint-overlap
placements contribute much more than the boundary anchors alone.

Construct analogous continuation-exclusion lower bounds for selected
non-boundary target positions.

If only a small number of additional placements can rigorously supply more
than \(0.0022634\), the finite mechanism itself can cross the local margin.

### Route B — theorem with a residual operator bound

Let \(\mathcal M\) contain the two boundary anchors plus selected finite
continuation placements.

Prove

\[
R_{\mathcal M}\le-E
\]

from continuation-exclusion bounds, and use a Dobrushin/operator estimate for
all omitted terms:

\[
R_{\mathrm{out}}\le C.
\]

Then

\[
E>L+C
\Longrightarrow
a'(0)<0.
\]

---

# 9. Important prior-art firewall

The following ideas are **not** candidates for novelty:

1. Pattern correlation matrices for Markov sequences are established.
   Rukhin (2006/2007) expresses covariance matrices of pattern-frequency
   distributions through pattern correlation matrices and Markov-chain
   fundamental matrices.

2. Bassino–Clément–Nicodème and related Goulden–Jackson work gives
   multivariate generating functions and formulas for expectation, variance,
   and covariance of occurrences of arbitrary finite word sets.

3. Higher cumulants and derivatives of tilted Markov/transfer operators are
   established techniques.

4. Generic Markov-chain asymptotic-variance perturbation/comparison theorems
   are established.

Therefore this work should **not** claim:
- invention of pattern correlation matrices;
- invention of word-occurrence covariance;
- invention of transfer-matrix variance;
- invention of asymptotic-variance perturbation bounds.

The current plausible new object/contribution is narrower:

> a **profile-aware continuation-exclusion certificate** that converts
> forbidden-word continuation structure into a prospective lower bound for a
> target-conditioned echo, and then uses that echo to certify the sign of a
> higher fluctuation response.

Whether that specific bridge is new remains to be established by specialist
literature audit.

---

# 10. Immediate next target

The present structural lower bounds reach about 74.85% of the h=4
pre-nonlocal margin.

The next best calculation is therefore **not** another epsilon sweep.

It is:

> Find the smallest additional set of one-endpoint target placements whose
> continuation-exclusion lower bounds close the remaining
> \(0.0022633897\) gap.

If that succeeds with a compact combinatorial description, we obtain the
first serious candidate for a reusable **Continuation-Echo Sign Criterion**.


---

# 11. Same-rule controls

The same continuation-partition rule was applied to the nearest balanced
controls, without changing the rule after looking at their response.

## h=3, profile (1,1,1)

The same structural partitions give

\[
K(2)\ge0.0512999370526965,
\]

\[
K(3)\ge0.0379712439936457.
\]

Thus a delayed first-color echo is certified here too.

With

\[
q_v\approx0.0818379805500463,
\]

the two anchored lower-bound contributions have magnitude at least

\[
0.00974103090420028.
\]

However the positive pre-nonlocal margin is approximately

\[
0.06227647,
\]

so this explains only about

\[
15.6\%
\]

of the amount required for a sign reversal.

This is useful: **echo existence alone is not enough**.

## h=5, profile (2,2,1)

With the same coarse structural partition, the resulting lower bounds are too
weak even to certify \(K(2)>0\) or \(K(3)>0\), although the directly evaluated
kernels are positive.

This demonstrates that the continuation-exclusion rule is a **sufficient
certificate, not an exact representation or necessary condition**.

It also guards against overclaiming that the partition simply reconstructs
every positive echo.

---

# 12. Overfitting guard

A finer partition that records the relative suffix pattern of the continuation
state can reproduce the h=4 kernel much more tightly, and at suffix length four
the exploratory partition recovers the direct K(2)/K(3) values essentially
exactly.

That observation is **not proposed as novelty**.

It is close in spirit to established finite-automaton / pattern-correlation
machinery: refine the state sufficiently and the conditional continuation
probability becomes an ordinary finite-state calculation.

For a publishable general criterion, the preferred partition should remain:

- small;
- interpretable from profile multiplicity and exclusion structure;
- chosen independently of the response sign;
- portable across several pattern classes.

This is why the coarser lower bounds above are scientifically more interesting
than simply encoding the entire continuation automaton.
