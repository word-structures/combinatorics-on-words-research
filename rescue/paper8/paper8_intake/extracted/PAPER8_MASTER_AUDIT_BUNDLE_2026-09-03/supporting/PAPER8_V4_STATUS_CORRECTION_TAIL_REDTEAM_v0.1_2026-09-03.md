# Paper 8 v4 status correction — finite-to-infinite tail red-team

**Date:** 2026-09-03  
**Scope:** theorem-status correction only; frozen v4 bytes are not modified.  
**H9:** NOT OPENED.  
**Novelty:** NOT ESTABLISHED.

## 1. Corrected theorem status

The frozen v4 package correctly preserves exact finite-context polynomials, modular cross-checks, finite-context monotonicity, bidirectional mixing covers, structural graph audits, and the conditional H8 susceptibility ordering calculation.

However, its infinite-volume promotion uses the common continuation estimate

\[
|C_\infty(x)-C_L(x)|\le 4K\tau^B.
\]

The package itself left the derivation of this inequality as an explicit independent-audit obligation. Red-team analysis after v4 found that the stated hypotheses are insufficient to imply a pure `tau^B` curvature error.

Therefore the current canonical epistemic status is

```text
exact finite-context H8 results:       PASS
bidirectional mixing computations:     PASS (interval-roundoff audit still external)
4 K tau^B continuation derivation:     NOT ESTABLISHED
H8 4/4 infinite-volume sign theorem:   CONDITIONAL_ON_TAIL_LEMMA
H8 infinite susceptibility ordering:   CONDITIONAL_ON_TAIL_LEMMA
```

No finite-context result is revoked.

## 2. Why the old tail form is unsafe as a generic lemma

Differentiating a subdominant boundary mode of size `tau^B` with respect to a tilt parameter can produce polynomial prefactors. In generic finite-state controls the first and second tilt derivatives can contain terms of order

\[
B\tau^B,\qquad B^2\tau^B.
\]

A symmetry-only rescue is insufficient: a finite positive Z2-symmetric control can be arranged with invariant boundaries, antisymmetric tilt and vanishing first derivative while the curvature boundary error still carries a polynomial prefactor. Thus S3 symmetry plus `G == 0` does not, by itself, prove the packaged `4 K tau^B` inequality.

This does **not** show that any H8 susceptibility sign is numerically wrong. It shows that the common rigorous bridge used to promote finite-context arithmetic to infinite volume is incomplete.

## 3. Independent evidence that the H8 numerical conclusions remain plausible

The direct finite-dimensional S3 resolvent formula preserved in the v2 raw state computes the true finite-state infinite-volume susceptibility without an infinite correlation truncation. Its values agree extremely closely with large exact finite-context calculations.

For example, profile `(5,2,1)` at `x=0.5`:

```text
direct S3 resolvent C(x):           6.048284711078591
stationary kernel truncation L=44:  6.060715087476853
L=88:                               6.048260791098967
L=132:                              6.048284724577425
L=176:                              6.048284711088469
L=220:                              6.048284711058297
L=264:                              6.048284711066850
```

The rapid convergence strongly supports the underlying sign/ordering phenomenon, but is not substituted for a theorem.

## 4. Two rigorous repair routes now under investigation

### Route A — direct finite-dimensional S3 resolvent certificate

Use the exact finite-state identity

\[
C_v(x)=\frac{2}{\lambda}\left(\frac{N_x}{q}-N\right),
\]

with

\[
N=l^T U(\lambda I-S)^{-1}Vr.
\]

The required Perron and linear solves are finite-dimensional. Existing forward/reverse minorization can be reused only as a residual-to-solution inverse bound,

\[
\|(I-P)^{-1}e\|_{\rm osc}\le \frac{m}{\alpha}\|e\|_{\rm osc},
\]

which does not differentiate a long `P^B` boundary mode and therefore is not exposed to the red-team `B^2 tau^B` failure mode.

The low-rank defect structure is especially favorable for `(5,2,1)`: trivial/standard target ranks are 8/16.

### Route B — stationary truncated return kernel + safe polynomial-prefactor tail

For the stationary chain,

\[
C_v(x)=\sum_{r,s\in\mathbb Z}K_v(r,s),
\]

where

\[
K_v(r,s)=E[f_rf_s\mid g_0]-E[f_rf_s].
\]

The finite stationary truncation is

\[
C_{v,R}=E\!\left[(\sum_{I_R}f)^2\mid g_0\right]
          -E\!\left[(\sum_{I_R}f)^2\right].
\]

This quantity can be computed without an infinite correlation sum. A safe tail derived directly from forward/reverse block mixing naturally has a polynomial shell count (`n tau^n`), rather than the disproved generic pure `tau^B` form.

For `(5,2,1)`, a direct stationary-DP replay at `x=0.5` converges to the S3 resolvent value as shown above.

## 5. Immediate research gate

Do **not** open H9 and do not restore theorem-PASS status merely from numerical agreement.

The next promotion requires one of:

1. a residual/interval-certified direct S3 resolvent enclosure on all `x in [0,1]`; or
2. a proved stationary-kernel / connected-correlation tail with explicit safe polynomial prefactor plus a rigorously enclosed finite stationary truncation.

Until one route closes, v4 is a computational checkpoint with conditional infinite-volume claims.
