# Beyond the current paper: pressure, resonance, continuation cumulants, and a certifier audit

**Date:** 2026-08-26  
**Status:** exploratory extension + adversarial paper audit  
**h=8:** untouched  
**Novelty:** NOT ESTABLISHED

## 1. Independent h4 mixed-pressure cross-check

Rebuild the h4 / L3 system directly: 786 states, 1728 edges, and 156 target edges of profile (2,1,1).

With
\[
A_{t,\varepsilon}(i,j)=A(i,j)e^{tF_{ij}-\varepsilon G_{ij}},
\qquad
P(t,\varepsilon)=\log\rho(A_{t,\varepsilon}),
\]
the derivative is
\[
a'(0)=\partial_\varepsilon\partial_t^2P(0,0).
\]

A 5x5 mixed finite-difference stencil (step 0.01) gives
\[
\boxed{a'(0)\approx -0.00733732589288},
\]
versus the interval-certificate value
\[
-0.00733732617109.
\]
Absolute discrepancy: **2.782e-10**.

This is conceptually independent of the Poisson/lag formula: it only uses the weighted Perron root.

## 2. Finite admissible words already contain the response

Define
\[
Z_m(t,\varepsilon)=\mathbf1^T A_{t,\varepsilon}^m\mathbf1.
\]
Then
\[
\frac1m\partial_\varepsilon\partial_t^2\log Z_m
\longrightarrow a'(0).
\]

Numerically:
- m=320: **-0.006930805322**
- m=640: **-0.007134064677**

The leading boundary correction is essentially 1/m.  Richardson extrapolation
\[
2R_{640}-R_{320}
\]
gives
\[
\boxed{-0.007337324032},
\]
only **2.139e-09** from the certificate value.

This opens a very direct finite-word interpretation of the infinite response.

## 3. Mixed third-cumulant interpretation

Since path weights are
\[
e^{tS_mF-\varepsilon S_mG},
\]
derivatives of \(\log Z_m\) are cumulants.  Under the standard analyticity/interchange step,
\[
\boxed{
a'(0)=
-\lim_{m\to\infty}
\frac1m\operatorname{Cum}(S_mF,S_mF,S_mG).
}
\]

So the object being certified is a **mixed third-order susceptibility**: whether target occurrences are associated with unusually large or small long-run squared letter fluctuations.

For h4 this gives a striking interpretation:

> the target is locally variance-damping, but globally variance-amplifying through delayed continuation dynamics.

## 4. “Resonance” is visible in the spectrum

The leading nontrivial complex h4 Parry eigenmode is
\[
\lambda_*=0.311069130370+0.675648293013i,
\]
with
\[
|\lambda_*|=0.743817598421,
\qquad
\text{oscillation period}\approx 5.5148\text{ lags}.
\]

For lags 20--59:

- ordinary letter autocovariance is fitted by \(\operatorname{Re}(C\lambda_*^k)\)
  with relative residual **4.953e-04**, R² **0.999999755**;
- the response tail is fitted by
  \[
  \operatorname{Re}((A+Bk)\lambda_*^k)
  \]
  with relative residual **7.016e-04**, R² **0.999999499**.

The factor \(k\) is exactly the form created when differentiating \(P^k\): the insertion sum behaves like a double resolvent pole / \(k\lambda^k\) mode.

**Exploratory interpretation:** h4 looks like a mode-selective spectral resonance, not merely “slow mixing.”  The target couples strongly, with the right phase, to an oscillatory color-fluctuation mode.

## 5. Continuation capacity has a natural higher-order hierarchy

PEX-C4 uses zeroth-order future volume
\[
N_m(s)=(A^m\mathbf1)_s.
\]

Define instead
\[
Z_m(s;t)=(A_t^m\mathbf1)_s,
\qquad
A_t(i,j)=A(i,j)e^{tF_{ij}}.
\]

Then:
- \(\partial_t\log Z_m(s;t)|_0\) = mean future composition bias among m-step continuations;
- \(\partial_t^2\log Z_m(s;t)|_0\) = future fluctuation variance.

Perron--Frobenius gives
\[
\log Z_m(s;t)=mP(t)+\log r_t(s)+c(t)+o(1).
\]

At horizon m=30 in h4:
- centered first continuation cumulant vs. centered \(\partial_t\log r_t(s)|_0\):
  correlation **0.999999996701**, max discrepancy **8.165e-05**;
- second continuation cumulant after subtracting \(30a(0)\) vs. centered \(\partial_t^2\log r_t(s)|_0\):
  correlation **0.999999777382**, max discrepancy **2.508e-04**.

This suggests a future hierarchy:
\[
\boxed{
\text{future volume}
\to
\text{future composition}
\to
\text{future fluctuation capacity}
\to\cdots
}
\]

Raw continuation capacity is only the zeroth-order member.

## 6. Important correction: what H09/H10 really validate

The H08--H11 prospective battery did **not** reproduce the h4 local-to-global sign reversal.

Using
\[
L/q=V_7-\frac43B(v),
\qquad
V_7\approx 1.765025099642,
\]
we obtain:

| target | profile | local L/q | full a'(0)/q | sign reversal? |
|---|---|---:|---:|---|
| H08 | (3, 2, 2) | +0.876136 | +0.573139 | no |
| H09 | (3, 3, 1) | -1.790530 | -1.129653 | no |
| H10 | (4, 2, 1) | -4.457197 | -3.621780 | no |
| H11 | (5, 1, 1) | -12.457197 | -14.916119 | no |

Thus all four reference signs agree with the local profile sign.

More importantly, for H09 and H10 the pre-reveal residual upper bound was already negative even before crediting the PEX-C4 echo term.  Therefore their successful `NEGATIVE_CERTIFIED` calls validate the **complete sign-certifier chronology**, but they do not show that continuation capacity was necessary to force those signs.

A much stronger future mechanism test would require, before reveal,
\[
\boxed{
L>0,\qquad
C_{rest}^{up}>0,\qquad
\underline E_{continuation}>C_{rest}^{up},
}
\]
followed by a negative reference derivative.

That would be a genuinely prospective continuation-driven sign reversal.

## 7. H11 points to certificate scale, not obviously to a missing PEX feature

For H11,
\[
q\approx2.67\times10^{-5},
\]
and the pre-reveal proxy complement was already about
\[
-3.61\times10^{-4}.
\]
But the frozen universal finite-prefix budget was
\[
7.5\times10^{-4},
\]
which erased the sign margin.

So H11's `INCONCLUSIVE` result does not by itself argue for a richer PEX-C5.  A more natural next theorem is a **target-scale-adaptive finite-prefix certificate**, with error proportional to target perturbation size rather than a fixed absolute blanket budget.

## 8. What opens beyond the present paper

1. **Standard-representation reduction.**  
   With S3-invariant baseline and target, fixed-letter fluctuations live in the standard color representation.  The relevant response may be certifiable in that sector alone, giving much sharper mixing bounds than full-chain Dobrushin estimates.

2. **Spectral continuation resonance.**  
   The response generating function contains
   \[
   (I-zP)^{-1}\dot P(I-zP)^{-1},
   \]
   making eigenmode coupling and double poles a precise version of “resonance.”

3. **Weighted continuation capacity.**  
   Multivariate future generating functions can retain not only the number of futures but their Parikh-distribution geometry.

4. **Rare-event leverage.**  
   Separate frequency \(q\) from conditional influence \(a'(0)/q\).  Rare patterns can be weak in frequency but strong per occurrence.

5. **Memory beyond explicit Markov order.**  
   Finite state memory does not imply finite influence memory.  Information about an earlier pattern can survive in the distribution over present states and decay through spectral modes after the original symbols have left the explicit window.

## 9. Paper recommendation before Claude

Add to the current manuscript:
- the mixed-pressure / third-cumulant interpretation;
- a short “maximum-entropy path / future accessibility” interpretation;
- the correction that H09/H10 validate sign certification, **not** prospective continuation-driven sign reversal;
- H11 as evidence that the absolute finite-prefix budget is too coarse for rare targets.

Keep the spectral-resonance and weighted-continuation hierarchy mostly in Discussion/future work until independently developed.

No h8 analysis was performed.
