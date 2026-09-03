# h=4 (2,1,1): residual-compensation certificate

**Date:** 2026-08-25  
**Status:** DERIVED RIGOROUS-CERTIFICATE CANDIDATE / INDEPENDENT AUDIT REQUIRED  
**Scope:** exposed h=4 profile-response system only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Target

After the one-endpoint continuation mechanism was certified strongly enough to
close the earlier mechanism gap, the next target was to prove that every
response contribution **outside** that one-endpoint shell cannot compensate by
more than

\[
C_{\rm rest}<0.02520977247.
\]

This target is achieved with a substantially stronger bound:

\[
\boxed{
C_{\rm rest}
<
0.01912964464.
}
\]

The resulting safety margin is about

\[
0.00608.
\]

This is a derived certificate: it reuses the parent h=4 interval certificate's
already certified mixing/Perron constants and finite-prefix interval through
lag 150.

---

## 2. Decomposition

Let

\[
S_7=\sum_{k=0}^{7}D_k
\]

be the complete response through the target-window scale.

Let

\[
R_{\rm OE}
\]

be the exact lag-9/10 response from target windows containing exactly one of
the two observed letters.

Define

\[
C_{\rm rest}
=
\sum_{k\ge8}D_k-R_{\rm OE}.
\]

Because \(R_{\rm OE}<0\), write

\[
E_{\rm OE}=-R_{\rm OE}>0.
\]

Then

\[
C_{\rm rest}
=
\sum_{k\ge8}D_k+E_{\rm OE}.
\]

So it is enough to obtain:

1. a rigorous upper bound on the total response from lag 8 onward;
2. a rigorous upper bound on the magnitude \(E_{\rm OE}\).

---

## 3. Certified target-window prefix

A new directed-interval calculation through lag 7 gives, after including the
same exact-system sensitivity allowance used by the parent certificate,

\[
\boxed{
S_7
\in
[
0.0090005265169566901336584702534,
0.0090005265169576127787763405746
].
}
\]

This replaces the earlier exploratory rounded value
\(0.0090005265165\) with a certified enclosure candidate.

---

## 4. Total response after lag 7

The parent interval certificate supplied

\[
S_{150}^{\rm approx,up}
=
-0.0073373261710930020479110390566\ldots
\]

and a true-vs-rational finite-prefix sensitivity allowance

\[
\varepsilon_{150}
=
1.0231233793716803\times10^{-14}.
\]

Using the **lower endpoint** of the new \(S_7\) enclosure gives

\[
\sum_{k=8}^{150}D_k
<
\boxed{
-0.0163378526880394609477757925071.
}
\]

The complete infinite tail after lag 150 is already bounded by

\[
B_{150}
\le
0.0006989956115298716348751361284.
\]

Therefore

\[
\boxed{
\sum_{k\ge8}D_k
<
-0.0156388570765095893129006563787.
}
\]

This is useful by itself: after the target-window scale, the **entire**
remaining response is rigorously negative under the parent certificate
assumptions.

---

## 5. Exact one-endpoint shell magnitude

The lag-9/10 one-endpoint response can be expressed using baseline path
probabilities rather than a soft-response derivative.

For target position \(r\), define

\[
K_{r,k}
=
P(X_{\rm future}=X_r\mid G_v)
-
P(X_k=X_0).
\]

Under the ternary symmetry and reversal pairing used in the mechanism
decomposition,

\[
R_{\rm OE}
=
-\frac{4q_v}{3}
\sum_{k\in\{9,10\}}
\sum_{r=0}^{7}K_{r,k}.
\]

The verifier evaluates this more stably without dividing by \(q_v\):

\[
q_vK_{r,k}
=
P(G_v\cap\{X_{\rm future}=X_r\})
-
q_vP(X_k=X_0).
\]

For the rational certificate chain:

\[
q_v
\approx
0.08797229660957203336,
\]

\[
P(X_9=X_0)
\approx
0.31461332154778229292,
\]

\[
P(X_{10}=X_0)
\approx
0.33839384914979557060.
\]

The resulting one-endpoint magnitude is

\[
E_{\rm OE}^{\rm approx}
=
0.03476850171580128359943364045\ldots
\]

The parent certificate gives an \(\ell^1\) stationary-law error of order
\(10^{-28}\) and a row transition error of order \(10^{-70}\).
A deliberately coarse path-expectation propagation gives

\[
\varepsilon_{\rm OE}
<
1.3\times10^{-26}.
\]

Hence

\[
\boxed{
E_{\rm OE}
<
0.03476850171580128359943365340.
}
\]

---

## 6. Residual bound

Combining the previous two certified upper bounds:

\[
C_{\rm rest}
=
\sum_{k\ge8}D_k+E_{\rm OE}
\]

gives

\[
C_{\rm rest}
<
-0.01563885707650958931290065638
+
0.03476850171580128359943365340.
\]

Therefore

\[
\boxed{
C_{\rm rest}
<
0.01912964463929169428653299702.
}
\]

In particular,

\[
\boxed{
C_{\rm rest}<0.02520<0.02520977247.
}
\]

So the residual-compensation target is closed with room to spare.

---

## 7. What this means for the continuation-echo criterion

The current design-set structural one-endpoint certificate gives

\[
\underline E_{\rm OE}
\approx
0.0342102989879210.
\]

Using the certified upper endpoint for the target-window prefix,

\[
S_7^{\rm up}
<
0.009000526516957613,
\]

and the new residual upper bound,

\[
C_{\rm rest}^{\rm up}
<
0.019129644639291695,
\]

one obtains the mechanism-based inequality candidate

\[
S_7^{\rm up}
-
\underline E_{\rm OE}
+
C_{\rm rest}^{\rm up}
<
-0.00608012783167.
\]

Thus, **once the structural lower bound
\(\underline E_{\rm OE}\) itself is interval-certified and the one-endpoint
identity is independently audited**, the continuation mechanism alone fits a
strict sufficient sign criterion with a margin of about

\[
6.08\times10^{-3}.
\]

This is close to the direct parent-certificate sign margin.

---

## 8. Why this is stronger than the previous proof architecture

The earlier rigorous certificate proved the sign by bounding the full lag
series.

The present decomposition says more:

\[
\boxed{
\text{target-window response}
-
\text{certified continuation echo}
+
\text{bounded everything else}
<0.
}
\]

That is a mechanism-aware proof architecture.

The negative sign is no longer supported only by a black-box total finite
prefix.  A large named piece of the negative response is supplied by the
one-endpoint continuation channel, while all other effects are placed inside
a separate compensation budget.

---

## 9. Epistemic status and audit obligations

This is **not yet an independently verified theorem**.

The residual certificate depends on the parent interval certificate for:

- projective Perron enclosure;
- \(\tau(P^{15})\le0.209\);
- finite-prefix sensitivity constants;
- \(S_{150}\) interval;
- infinite-tail bound.

It additionally depends on:

- correct one-endpoint placement indexing;
- the factor \(4q_v/3\);
- the time-reversal pairing;
- correct baseline path-expectation propagation.

The strongest current status is therefore:

**MECHANISM-AWARE COMPUTER-ASSISTED PROOF CANDIDATE — RESIDUAL TARGET PASSES —
INDEPENDENT CLEAN-ROOM AUDIT REQUIRED.**

The next proof closure should be:

1. interval-certify the **structural lower bound**
   \(\underline E_{\rm OE}\ge0.03420\);
2. independently derive the one-endpoint identity;
3. independently reproduce the residual bound;
4. only then combine them into a theorem statement.

---

## 10. Research significance

The numerical situation is now favorable:

\[
\underline E_{\rm OE}
\approx0.03421,
\]

while

\[
S_7^{\rm up}+C_{\rm rest}^{\rm up}
\approx0.02813.
\]

The continuation mechanism therefore has a structural margin of roughly

\[
0.00608.
\]

That means the project no longer needs an extremely sharp residual estimate.
A comparatively conservative independently derived bound can still close the
sign.

This materially increases the plausibility of a reusable
**Continuation-Echo Sign Criterion** rather than an h=4-only numerical
anatomy.
