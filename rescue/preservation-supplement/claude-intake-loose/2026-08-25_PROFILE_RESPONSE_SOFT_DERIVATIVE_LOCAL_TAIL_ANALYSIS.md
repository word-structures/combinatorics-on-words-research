# Profile-response soft derivative analysis — exploratory scratch note

**Date:** 2026-08-25  
**Scope:** exposed h=2,...,7 profile family only.  
**Status:** EXPLORATORY / POST-HOC / NOT A CANONICAL CLAIM.  
**h=8:** not computed or inspected.

## Question

Estimate the infinitesimal soft-penalty response

\[
D_v := a'_v(0)
\]

and separate a finite-window local composition contribution from the remaining nonlocal response.

The soft penalty is the current repository model: target-profile h-square edges receive weight \(e^{-\epsilon}\).

## Independent computational path

I reconstructed the h=2,...,7 finite-state graphs independently in Python from the repository's mathematical graph specification. The asymptotic variance was evaluated from Perron left/right eigenvectors, the induced Parry chain, and a Poisson-equation solve.

The derivative \(a'_v(0)\) was estimated with a fourth-order symmetric stencil using both step sizes 0.01 and 0.005. The two estimates agreed to about 4e-9 or better over the whole 15-profile family. Selected cases were repeated at step 0.0025; for h=4 (2,1,1) the 0.005 and 0.0025 estimates differed by about 7.7e-11.

As a separate validation, the reconstructed target-event probabilities q_v agree with the repository's frozen q_v values to roughly 1e-13 or better.

## Local-window decomposition candidate

Let f be the centered indicator of one fixed letter and let W be the 2h-letter window defining the target h-square event g_v. Define

\[
F_W = \sum_{r\in W} f_r,
\qquad
V_h = E(F_W^2)
\]

under the baseline L_{h-1} Parry measure.

For an h-square whose half-profile belongs to the S3 orbit of v,

\[
E(F_W^2\mid g_v)=\frac{4}{3}B(v).
\]

This identity was numerically verified for all 15 profiles to floating-point error.

Splitting the mixed pressure-response sum into terms where both f-observables lie inside the defining 2h-window and all remaining terms gives the candidate decomposition

\[
a'_v(0) = L_v + T_v,
\qquad
L_v = q_v\left(V_h-\frac{4}{3}B(v)\right),
\]

where T_v is the remaining nonlocal/correlation-tail contribution.

The pressure/linear-response derivation should still receive a clean formal audit before this identity is promoted to a theorem-level statement.

## Results

| h | profile | B(v) | q_v | V_h | local L_v | derivative D_v | tail T_v | T_v/L_v |
|---:|:---:|---:|---:|---:|---:|---:|---:|---:|
| 2 | (1,1,0) | 0.666667 | 0.148148148 | 0.888888889 | -3.29e-17 | +3.1953e-11 | +3.1953e-11 | — |
| 2 | (2,0,0) | 2.66667 | 0.037037037 | 0.888888889 | -0.0987654321 | -0.0987654318 | +2.72e-10 | -0.000 |
| 3 | (1,1,1) | 0 | 0.081837981 | 1.00602755 | +0.0823312628 | +0.0600039329 | -0.0223273299 | -0.271 |
| 3 | (2,1,0) | 2 | 0.029062227 | 1.00602755 | -0.0482618704 | -0.0433706989 | +0.00489117142 | -0.101 |
| 4 | (2,1,1) | 0.666667 | 0.087972297 | 1.38818113 | +0.0439238853 | -0.00733732606 | -0.0512612114 | -1.167 |
| 5 | (2,2,1) | 0.666667 | 0.026961883 | 1.83036406 | +0.0253839432 | +0.0152744528 | -0.0101094905 | -0.398 |
| 5 | (3,1,1) | 2.66667 | 0.035386184 | 1.83036406 | -0.061047944 | -0.0666860224 | -0.00563807843 | +0.092 |
| 5 | (3,2,0) | 4.66667 | 0.003587751 | 1.83036406 | -0.0157568925 | -0.00941984925 | +0.00633704327 | -0.402 |
| 6 | (2,2,2) | 0 | 0.006799319 | 1.79777451 | +0.0122236416 | +0.00783695807 | -0.00438668351 | -0.359 |
| 6 | (3,2,1) | 2 | 0.046384484 | 1.79777451 | -0.0403031144 | -0.0199767322 | +0.0203263822 | -0.504 |
| 6 | (4,1,1) | 6 | 0.003976067 | 1.79777451 | -0.0246604651 | -0.0250045755 | -0.000344110434 | +0.014 |
| 7 | (3,2,2) | 0.666667 | 0.024060971 | 1.7650251 | +0.0210806881 | +0.0144445298 | -0.00663615833 | -0.315 |
| 7 | (3,3,1) | 2.66667 | 0.016571609 | 1.7650251 | -0.0296719704 | -0.0194290653 | +0.0102429052 | -0.345 |
| 7 | (4,2,1) | 4.66667 | 0.002102173 | 1.7650251 | -0.00936979722 | -0.00805098727 | +0.00131880995 | -0.141 |
| 7 | (5,1,1) | 10.6667 | 5.3328e-05 | 1.7650251 | -0.000664316951 | -0.000795446269 | -0.000131129317 | +0.197 |

## Main observation

The baseline-aware local term has the same sign as the measured infinitesimal response in every case except h=4, profile (2,1,1), treating h=2 (1,1,0) as the exact zero/local-critical case.

For h=4 (2,1,1):

\[
L_v \approx +0.0439238853,
\]

but

\[
T_v \approx -0.0512612114,
\]

so

\[
a'_v(0) \approx -0.00733732614.
\]

Thus the nonlocal remainder is about 116.7% of the local contribution in the opposite direction, and it overturns the local sign.

No other nonzero-local case in the frozen family has |T_v/L_v| above about 0.505.

This makes h=4 (2,1,1) structurally special in a much sharper sense than merely being the only sampled soft-path sign crossing.

## Important correction to the earlier S(v) heuristic

The full-shift expression

\[
\frac{4q_v}{9}(h-3B(v))
\]

uses \(V_h=4h/9\), which is correct for the unconstrained ternary full shift. It is not the correct baseline-local term once the baseline is L_{h-1}.

The measured baseline window variances are:

- h=2: 0.888888889
- h=3: 1.006027547
- h=4: 1.388181132
- h=5: 1.830364065
- h=6: 1.797774506
- h=7: 1.765025100

This matters especially at h=6, profile (3,2,1). Although S(v)=0, the baseline-aware local contribution is already negative:

\[
L_v\approx -0.0403031144.
\]

So its negative infinitesimal response does not need to be attributed wholly to a correlation tail.

## Current interpretation

The strongest working mechanism is now:

1. profile geometry fixes the conditional local window fluctuation \(4B(v)/3\);
2. the constrained baseline supplies the comparison scale V_h;
3. q_v sets the event-frequency scale;
4. nonlocal dynamical correlations add T_v;
5. h=4 (2,1,1) is the only frozen case where T_v is large enough to reverse the local sign.

This is a substantially more precise hypothesis than monotonicity or a support-graph phase-transition explanation.

## Next discriminating task

The next useful analysis is a lag-resolved decomposition of T_v, starting with h=4 (2,1,1) and a small set of controls, to identify which overlap/return lags create the negative excess response.
