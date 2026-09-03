# h=4, profile (2,1,1): lag-by-lag soft-response autopsy

**Date:** 2026-08-25  
**Status:** EXPLORATORY / POST-HOC / NOT A CANONICAL CLAIM  
**Scope:** exposed h=2,...,7 family only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Target quantity

For the centered fixed-letter observable \(f\), write the asymptotic variance under soft penalty \(\epsilon\) as

\[
a(\epsilon)=c_0(\epsilon)+2\sum_{k\ge1}c_k(\epsilon),
\qquad
c_k(\epsilon)=\operatorname{Cov}_\epsilon(f_0,f_k).
\]

The infinitesimal response is therefore

\[
a'(0)=c_0'(0)+2\sum_{k\ge1}c_k'(0).
\]

For each lag \(k\), define its variance-response contribution

\[
D_k=
\begin{cases}
c_0'(0),&k=0,\\
2c_k'(0),&k\ge1.
\end{cases}
\]

The derivative was estimated by a fourth-order symmetric stencil. Step sizes
0.005 and 0.0025 agree over the first 80 lag contributions to within about
\(7.9\times10^{-11}\) at worst.

The converged total is

\[
a'_{4,(2,1,1)}(0)\approx -0.00733732617.
\]

## 2. Local-vs-tail decomposition by lag

The target event occupies a window of length \(W=2h=8\). Let \(g_v\) be the
target-profile event and let \(q_v=P(g_v)\) in the baseline \(L_3\) Parry
measure.

For lag \(k<8\), the local contribution can be written as

\[
L_k
=
m_k q_v
\left[
(8-k)c_k
-
E\!\left(
\sum_{i=0}^{7-k} f_i f_{i+k}\mid g_v
\right)
\right],
\]

with multiplicity \(m_0=1\) and \(m_k=2\) for \(k\ge1\).

For \(k\ge8\), two letter observables cannot lie inside the same defining
8-letter target window, so the local contribution is zero.

Then

\[
L=\sum_k L_k,\qquad
T_k=D_k-L_k,\qquad
T=\sum_kT_k.
\]

Numerically,

\[
L\approx +0.04392388533,
\]

\[
T\approx -0.05126121149,
\]

and therefore

\[
L+T\approx -0.00733732617.
\]

This exactly reproduces the earlier local/tail decomposition at the level
of lag components.

## 3. The decisive shell

The lag decomposition isolates the sign reversal much more sharply:

| lag region | contribution to tail | \(L+\) cumulative tail |
|---|---:|---:|
| \(0\ldots7\) — target-window scale | -0.03492335881 | +0.00900052652 |
| \(8\ldots15\) — first fully nonlocal shell | -0.01831282507 | -0.00931229856 |
| \(16+\) — later tail | +0.00197497239 | -0.00733732617 |

This is the key result:

**The target-window-scale response alone does not reverse the sign.**

After all local terms and all lag-\(0\ldots7\) tail corrections,

\[
+0.04392388533-0.03492335881
=
+0.00900052652>0.
\]

The sign becomes negative only after the first fully nonlocal shell
\(k=8,\ldots,15\) is included.

So the h=4 anomaly is not merely a strong local correction. Its actual
sign reversal requires correlations beyond the 8-letter target window.

## 4. Dominant lags

The largest tail components are:

| lag | total response \(D_k\) | local \(L_k\) | tail \(T_k\) |
|---:|---:|---:|---:|
| 9 | -0.01834632745 | 0 | **-0.01834632745** |
| 10 | -0.01855698443 | 0 | **-0.01855698443** |
| 1 | +0.04672868140 | +0.06332931670 | -0.01660063530 |
| 12 | +0.01280037934 | 0 | +0.01280037934 |
| 7 | +0.03240052663 | +0.01960344798 | +0.01279707865 |
| 4 | -0.03677021690 | -0.02578867329 | -0.01098154360 |
| 3 | -0.02134731538 | -0.01094899830 | -0.01039831709 |
| 2 | +0.00523647307 | +0.01540936907 | -0.01017289600 |
| 6 | +0.01478112799 | +0.00466054534 | +0.01012058265 |
| 5 | -0.03202875029 | -0.02234112217 | -0.00968762813 |

The standout genuinely nonlocal pair is therefore **lags 9 and 10**.

Together they contribute

\[
T_9+T_{10}\approx -0.03690331188.
\]

That is about 72% of the final total nonlocal remainder

\[
|T|\approx0.05126121149,
\]

although other positive and negative lag terms substantially cancel.

## 5. Comparison with nearest balanced controls

The same decomposition was repeated for the nearest balanced/minimum-B
controls \(h=3,(1,1,1)\) and \(h=5,(2,2,1)\).

| case | local \(L\) | tail inside target scale | first nonlocal shell | later tail | final \(a'(0)\) |
|---|---:|---:|---:|---:|---:|
| h=3 (1,1,1) | +0.08233126 | -0.02005479 | -0.00065620 | -0.00161635 | +0.06000393 |
| **h=4 (2,1,1)** | **+0.04392389** | **-0.03492336** | **-0.01831283** | **+0.00197497** | **-0.00733733** |
| h=5 (2,2,1) | +0.02538394 | -0.01030110 | -0.00037664 | +0.00056825 | +0.01527445 |

The first fully nonlocal shell is therefore roughly:

- 28 times larger in magnitude for h=4 than for the h=3 control;
- 49 times larger in magnitude for h=4 than for the h=5 control.

This is not a scale-free theorem, but it is a strong finite-family
diagnostic: the h=4 anomaly is concentrated precisely where the response
first leaves the defining event window.

## 6. What is established computationally

Within this exploratory reconstruction:

1. \(a'_{4,(2,1,1)}(0)<0\) is numerically stable.
2. The local contribution is positive.
3. All lag contributions through lag 7 leave the cumulative response
   positive.
4. The first fully nonlocal shell makes the cumulative response negative.
5. Lags 9 and 10 are the strongest negative genuinely nonlocal terms.
6. Later lags partly repair the negative overshoot but do not restore the
   sign.
7. The same first-nonlocal-shell effect is tiny in the selected h=3 and h=5
   controls.

## 7. What is NOT yet established

This does **not** yet prove why lags 9 and 10 are large.

In particular, the present calculation does not justify claiming that they
come from:

- a specific graph motif;
- a target-event self-return;
- a single Perron eigenmode;
- a topological transition;
- a universal h=4 phenomenon.

Those are now discriminating hypotheses.

## 8. Next mechanism test

The next high-value calculation is narrower than another epsilon sweep:

**identify the structural source of the lag-9/10 terms.**

The cleanest candidates are:

1. an overlap/return classification of baseline paths contributing to
   \(T_9\) and \(T_{10}\);
2. a spectral-mode decomposition of the derivative correlation sequence;
3. comparison against h=3 and h=5 controls using the same decomposition.

A successful mechanism should explain *before looking at new holdout data*
why h=4 produces a large negative first-nonlocal shell while its nearby
controls do not.
