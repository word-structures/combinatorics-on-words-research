# One-Endpoint Echo Shell — mechanism-gap closure

**Date:** 2026-08-25  
**Status:** EXPLORATORY / POST-HOC DESIGN-SET RESULT / NOT A CANONICAL THEOREM  
**Novelty status:** NOT_ESTABLISHED  
**Scope:** exposed h=3,4,5 controls; h=4 profile (2,1,1) is the design target  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Question

The previous continuation-exclusion certificate used only two boundary-anchored
hidden-color echoes and supplied a negative-response magnitude lower bound

\[
E_{\rm boundary}\ge 0.0067371368282.
\]

The positive response margin remaining after the target-window-scale part was

\[
M_{\rm pre}\approx0.0090005265165,
\]

leaving a mechanism gap of roughly

\[
0.0022633896883.
\]

The next target was:

> Can a small, response-independent continuation rule certify enough
> **non-boundary one-endpoint** response to close that gap?

The answer on the exposed h=4 design set is **yes**.

---

## 2. One-endpoint kernels

Let the target window have length

\[
W=2h.
\]

Suppose one observed letter lies at target position \(r\in\{0,\dots,W-1\}\)
and the second observed letter lies after the target window.

Let \(C_r=X_r\) be the color of the observed target position, and define

\[
K_{v,r}(d)
=
P(X_{W-1+d}=C_r\mid G_v)
-
P(X_{W-1+d-r}=X_0).
\]

The second term is the ordinary baseline same-letter probability at the same
pair separation.

Under the ternary \(S_3\)-symmetry, a left-placement and its time-reversed
right-placement contribute the candidate pair response

\[
\boxed{
D^{\rm pair}_{r,d}
=
-\frac{4q_v}{3}K_{v,r}(d).
}
\]

The time-reversal step relies on reversal invariance of the baseline
avoidance shift and target event and must be checked independently in the
clean-room audit.

---

## 3. Frozen structural partition rule

To avoid simply encoding the whole Markov state, the continuation contexts
were grouped using the following **small structural signature**.

At the context immediately before the future output, record:

1. **exclusion signature:** for the hidden/reference color and the two
   competitor colors, which smaller Abelian-square lengths
   \(K=2,\ldots,h-1\) would be created by appending that color;
2. the relative equality pattern of the **last three** symbols with respect
   to the reference color;
3. whether the **fourth-from-last** symbol equals the reference color;
4. whether the fourth-from-last and third-from-last symbols are equal.

For h=4, the exclusion signature is exactly a K2/K3 continuation signature.

For each cell \(A\),

\[
\mu_A=P(S\in A\mid G_v)
\]

and

\[
p_A^-=
\min_{s\in A}
P(X_{\rm next}=C_r\mid S=s)
\]

give

\[
P(X_{\rm next}=C_r\mid G_v)
\ge
\sum_A\mu_Ap_A^-.
\]

Hence each cell partition gives a baseline-only lower bound

\[
K_{v,r}(d)\ge \underline K_{v,r}(d).
\]

No epsilon sweep or variance-response derivative is used in the construction
of these lower bounds.

### Epistemic warning

The precise structural signature above was discovered **post hoc on the
already exposed h=4 design set** while trying to close the mechanism gap.

Therefore:
- it is a **design-set rule**, not independently validated;
- h=3 and h=5 checks below are also already-exposed controls, not holdouts;
- the rule should now be frozen before application to any genuinely new
  pattern family or holdout.

---

# 4. h=4: the first two fully nonlocal lags

For h=4, \(W=8\).  The relevant lags are

\[
k=9=W+1,\qquad k=10=W+2.
\]

Summing the structural lower bounds over **all eight** possible positions
\(r=0,\ldots,7\) of the observed target letter gives:

### lag 9

\[
\sum_r \underline K_{r,9}
=
\boxed{0.1388901829333865}.
\]

The direct baseline continuation calculation gives

\[
\sum_r K_{r,9}
\approx0.1417205766900502.
\]

Therefore the one-endpoint lag-9 response satisfies

\[
\boxed{
D^{\rm OE}_9
\le
-0.0162913178255648.
}
\]

Direct diagnostic value:

\[
D^{\rm OE}_9\approx-0.0166233128110090.
\]

### lag 10

\[
\sum_r \underline K_{r,10}
=
\boxed{0.1527666821227995}.
\]

Direct continuation value:

\[
\sum_r K_{r,10}
\approx0.1546951961364497.
\]

Hence

\[
\boxed{
D^{\rm OE}_{10}
\le
-0.0179189811623562.
}
\]

Direct diagnostic value:

\[
D^{\rm OE}_{10}\approx-0.0181451889047889.
\]

---

# 5. Mechanism-gap closure

Combining the two lags,

\[
\boxed{
D^{\rm OE}_{9}+D^{\rm OE}_{10}
\le
-0.0342102989879210.
}
\]

The direct one-endpoint value is approximately

\[
-0.0347685017157979.
\]

Thus the structural certificate captures about

\[
98.4\%
\]

of the actual one-endpoint negative mass at lags 9 and 10.

Most importantly,

\[
0.0342102989879210
>
0.00900052651649684.
\]

The structural one-endpoint echo bound is therefore about

\[
\boxed{3.80\times}
\]

the positive pre-nonlocal margin.

Equivalently, after paying the full pre-nonlocal margin, the mechanism leaves
a residual positive-compensation budget

\[
\boxed{
C_{\rm budget}
=
0.0252097724714242.
}
\]

So a sufficient-sign theorem now only needs to prove that **all omitted
response terms together contribute less than about \(+0.02521\)**.

This is a much easier residual target than the earlier \(0.0022634\) gap.

---

# 6. Smallest additional non-boundary placement

A particularly natural non-boundary placement is:

- lag \(9\);
- target position \(r=3=h-1\), i.e. the observed target symbol is the
  **last symbol of the first half**;
- post-target continuation distance \(d=5=h+1\).

For this single time-reversal pair, the frozen structural rule gives

\[
\underline K_{r=3}(5)
=
\boxed{0.0261605906409472}.
\]

Therefore its pair response alone obeys

\[
D^{\rm pair}_{3,5}
\le
-\boxed{0.003068\text{ (approximately)}}.
\]

Together with the earlier two boundary anchors, this already exceeds the
old \(0.00900053\) mechanism margin.

Thus **one additional non-boundary pair is enough** on the h=4 design set.

The all-one-endpoint-shell bound above is preferable for a theorem candidate,
because it has a much larger safety margin.

---

# 7. Same-rule exposed controls

The **same frozen structural rule** was applied to the nearest balanced
controls.

## h=3, profile (1,1,1)

For the analogous first two fully nonlocal lags \(7,8\):

\[
D^{\rm OE}_{7:8}
\le
-0.0181847102496067.
\]

The h=3 positive pre-nonlocal margin is approximately

\[
0.06227647.
\]

Thus the certified one-endpoint echo is only about

\[
\boxed{29.2\%}
\]

of the amount needed to overturn the margin.

Echo exists, but the structural certificate does **not** predict a crossing.

## h=5, profile (2,2,1)

For the analogous lags \(11,12\), the same coarse partition gives a lower
bound too weak to certify a negative one-endpoint response at all.

The direct diagnostic response is negative, but the certificate is
insufficient.

This is useful:
- the rule is **sufficient**, not necessary;
- it does not mechanically reconstruct every positive echo;
- h=4 is distinguished by **echo strength relative to its thin margin**, not
  simply by the existence of continuation memory.

---

# 8. Candidate general diagnostic

Define the one-endpoint echo strength

\[
\mathcal E_{\rm OE}(v)
=
\frac{4q_v}{3}
\sum_{k\in\{W+1,W+2\}}
\sum_{r=0}^{W-1}
\underline K_{v,r}(d_{k,r}).
\]

For the current exposed cases:

\[
\mathcal E_{\rm OE}(h=4,(2,1,1))
\ge
0.03421030.
\]

The natural theorem template becomes

\[
a'_v(0)
\le
M_{\rm pre}
-
\mathcal E_{\rm OE}
+
C_{\rm rest}.
\]

Hence

\[
\boxed{
\mathcal E_{\rm OE}
>
M_{\rm pre}+C_{\rm rest}
\Longrightarrow
a'_v(0)<0.
}
\]

This is not yet a final general theorem because:
- \(M_{\rm pre}\) currently contains response-derived short-lag information;
- \(C_{\rm rest}\) still needs a response-independent or rigorously certified
  upper bound;
- the partition rule was designed post hoc.

The immediate next theorem target is therefore a **residual upper bound**

\[
C_{\rm rest}<0.02520977247
\]

for h=4.

---

# 9. Novelty firewall

The structural partition and its use in a sign criterion must not be confused
with invention of pattern-correlation machinery.

Established literature already includes:
- correlation polynomials for forbidden-word SFT perturbations;
- pattern correlation matrices and fundamental-matrix formulas in Markov
  sequences;
- exact pattern-overlap calculations in Markov/HMM sources;
- expectation, variance and covariance of word-occurrence counts;
- higher transfer-operator/pressure derivatives;
- generic asymptotic-variance perturbation theory.

The candidate project-specific contribution is narrower:

> a **profile-aware continuation-exclusion lower bound**, built from the
> smaller-Abelian-square continuation constraints of an already constrained
> SFT, that captures enough delayed one-endpoint correlation response to
> challenge or overturn a local fluctuation margin.

Whether this exact bridge is new remains **NOT_ESTABLISHED**.

---

# 10. Next task

The mechanism gap is now closed.

The next target is:

\[
\boxed{
C_{\rm rest}<0.02520977247.
}
\]

There are two preferred routes:

1. derive a conservative operator/mixing upper bound on all response terms
   not included in the certified one-endpoint shell;
2. interval-certify a finite residual prefix and bound only its infinite tail
   abstractly.

If either route succeeds independently of the observed final sign, the h=4
application will fit the general continuation-echo criterion rather than
being only an anatomy of a computed anomaly.
