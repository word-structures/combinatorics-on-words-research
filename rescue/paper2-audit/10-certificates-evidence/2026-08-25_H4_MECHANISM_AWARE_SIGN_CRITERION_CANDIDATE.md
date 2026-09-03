# h=4 (2,1,1): mechanism-aware sign criterion candidate

**Date:** 2026-08-25  
**Status:** MECHANISM-AWARE COMPUTER-ASSISTED PROOF CANDIDATE  
**Independent audit:** REQUIRED  
**Novelty:** NOT_ESTABLISHED  
**Scope:** exposed h=4 design set only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Result in one line

The current certificate architecture separates the initial variance response
into

\[
a'(0)
=
S_7
+
R_{\rm OE}
+
C_{\rm rest},
\]

where:

- \(S_7\) is the complete target-window-scale response through lag 7;
- \(R_{\rm OE}\) is the lag-9/10 one-endpoint continuation channel;
- \(C_{\rm rest}\) is everything else.

The structural continuation-exclusion rule supplies a prospective lower bound
on the magnitude of \(R_{\rm OE}\), while a separate interval certificate
bounds \(C_{\rm rest}\).

The resulting upper bound is

\[
\boxed{
a'_{4,(2,1,1)}(0)
<
-0.00608012783167
<0.
}
\]

This is a **mechanism-aware** sign certificate: a named continuation mechanism
is strong enough to force the sign even after every omitted effect is given a
separate conservative compensation budget.

---

## 2. Certified target-window prefix

The directed interval calculation gives

\[
S_7
\in
[
0.0090005265169566901336584702534,
0.0090005265169576127787763405746
].
\]

For the sufficient inequality use

\[
\boxed{
S_7^{\rm up}
=
0.0090005265169576127787763405746.
}
\]

---

## 3. Structural one-endpoint echo lower bound

A frozen design-set partition of target-conditioned continuation contexts uses
only:

1. the smaller-Abelian-square exclusion signature for appending each color;
2. the relative equality pattern of the last three symbols with respect to
   the reference color;
3. whether the fourth-from-last symbol is the reference color;
4. whether fourth-from-last equals third-from-last.

For h=4 the exclusion signature records K=2/K=3 blocking.

For every context cell \(A\),

\[
\mu_A=P(S\in A\mid G_v),
\qquad
p_A^-=\min_{s\in A}P(X_{\rm next}=C\mid s),
\]

so

\[
P(X_{\rm next}=C\mid G_v)
\ge
\sum_A\mu_Ap_A^-.
\]

Applying the **same frozen rule** to all eight one-endpoint placements at lags
9 and 10 gives, in the rational certificate chain,

\[
\widehat E_{\rm OE}^{\rm struct}
=
0.03421029898792621204350832330.
\]

There are 363 partition cells across lag 9 and 387 across lag 10, for 750
cells in total.

### Conservative transfer to the exact Parry chain

The parent certificate supplies:

- stationary-law \(\ell^1\) discrepancy of order \(10^{-28}\);
- transition-row discrepancy of order \(10^{-70}\).

For every finite path/cell expectation used here, a union/telescoping estimate
puts the true-vs-certificate discrepancy far below \(10^{-20}\), even after
summing all 750 cells and the baseline subtraction terms.

We therefore deliberately sacrifice many orders of magnitude and take

\[
\boxed{
E_{\rm OE}^{\rm struct}
>
0.034210298987926202
}
\]

as the current safe lower-bound candidate.

For a simpler paper-facing rounded constant one could use

\[
\boxed{
E_{\rm OE}^{\rm struct}>0.03420.
}
\]

No epsilon grid, \(a'(0)\), lag-response value, or hard-deletion result is
used to construct this lower bound.

### Epistemic caveat

The partition itself was designed **post hoc on the exposed h=4 design set**.
Its numerical certification does not make it prospectively validated.  The
rule must be frozen before any new holdout application.

---

## 4. Residual compensation bound

A separate derived interval certificate gives

\[
\boxed{
C_{\rm rest}
<
0.01912964463929169428653299702.
}
\]

This bound is obtained by:

1. certifying the total response from lag 8 through lag 150;
2. adding the parent certificate's rigorous infinite-tail bound after lag 150;
3. adding back an upper bound on the exact one-endpoint shell magnitude so
   that only the omitted residual remains.

The residual target

\[
C_{\rm rest}<0.02520977247
\]

is therefore closed with a margin of about \(0.00608\).

---

## 5. Mechanism-aware sufficient inequality

Combine the three independent roles:

\[
a'(0)
\le
S_7^{\rm up}
-
E_{\rm OE}^{\rm struct,low}
+
C_{\rm rest}^{\rm up}.
\]

Using the current bounds:

\[
a'(0)
<
0.0090005265169576128
-
0.034210298987926202
+
0.0191296446392916943.
\]

Therefore

\[
\boxed{
a'(0)
<
-0.006080127831676895
<0.
}
\]

The continuation-echo mechanism does not merely correlate with the sign: in
the current certificate architecture, its **certified lower strength exceeds
the local/short response plus the worst permitted compensation from all
remaining terms**.

---

## 6. Why this is scientifically different from the direct sign certificate

The earlier computer-assisted proof candidate established

\[
a'(0)<0
\]

by certifying a long finite response prefix and its infinite tail.

That establishes the sign but does not by itself identify which mathematical
mechanism is decisive.

The new architecture establishes the stronger explanatory statement:

\[
\boxed{
\text{short/local positive margin}
<
\text{certified one-endpoint continuation echo}
-
\text{worst residual compensation}.
}
\]

So the sign reversal is tied to an explicit target-conditioned continuation
channel.

This distinction matters for a paper:

- **direct certificate:** proves the phenomenon;
- **mechanism certificate:** explains why this pattern can force the
  phenomenon.

---

## 7. Relation to a possible general theorem

For a general finite-state forbidden-pattern system define:

\[
M_{\rm short}
\]

as a rigorously controlled short/local response,

\[
\underline E_{\mathcal M}
\]

as a combinatorial lower bound on a finite continuation mechanism, and

\[
C_{\rm rest}
\]

as a rigorous upper bound on all omitted compensation.

Then the elementary implication

\[
\boxed{
\underline E_{\mathcal M}
>
M_{\rm short}+C_{\rm rest}
\Longrightarrow
a'(0)<0
}
\]

is immediate.

The possible research contribution is **not** this algebra.

The potentially distinctive contribution is a portable rule that builds
\(\underline E_{\mathcal M}\) from forbidden-pattern continuation structure
without first computing the response sign.

The h=4 (2,1,1) case is now a concrete successful design-set instance.

---

## 8. Prior-art firewall

Current literature makes the following non-novel:

- pattern correlation matrices in Markov sequences;
- first/second pattern-frequency moments and covariance matrices;
- forbidden-word correlation polynomials;
- transfer-matrix and pressure perturbation;
- asymptotic-variance comparison/perturbation for Markov chains.

Therefore the paper must not claim invention of any of those tools.

The candidate project-specific bridge is narrower:

> profile-aware smaller-square continuation exclusions provide a compact,
> prospective lower certificate for a delayed target-conditioned echo; that
> certificate can be compared against local response and a rigorous residual
> budget to force the sign of an asymptotic-variance response.

Whether this bridge is genuinely new remains a primary-source audit question.

---

## 9. Current proof obligations

Before theorem promotion:

1. independently derive the one-endpoint response identity and reversal factor;
2. independently reconstruct the 750-cell structural lower bound;
3. make every structural lower-bound arithmetic operation explicitly
   interval/outward rounded or exact;
4. independently reproduce the residual certificate;
5. audit the parent Perron/Dobrushin interval certificate;
6. freeze the partition before any new holdout test;
7. complete the specialist novelty audit.

Only after these pass should the paper use the unqualified phrase
"computer-assisted proof".

---

## 10. Current interpretation

The h=4 evidence now supports a very specific mechanism candidate:

\[
\text{Abelian profile}
\to
\text{smaller-square continuation exclusions}
\to
\text{delayed one-endpoint echo}
\to
\text{echo exceeds short/local margin}
\to
\text{residual cannot compensate}
\to
a'(0)<0.
\]

This is stronger than "there is a surprising numerical crossing" and stronger
than "correlations matter".

It is the first current form in which the profile-response line plausibly
supports a reusable **Continuation-Echo Sign Criterion**.
