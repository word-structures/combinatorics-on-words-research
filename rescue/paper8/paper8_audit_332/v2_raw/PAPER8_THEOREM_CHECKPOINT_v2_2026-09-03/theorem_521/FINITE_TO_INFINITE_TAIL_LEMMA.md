# Finite-to-infinite tail lemma used in Theorem 521

This file records the exact quantitative lemma instantiated by the certificate. It is intentionally separated from the machine arithmetic so it can be independently red-teamed.

Let a 36-step forward and reverse Markov block satisfy the common-minorization contraction

\[
\operatorname{osc}(P^{36}g)\le \tau\,\operatorname{osc}(g)
\]

uniformly in the soft parameter and in both time directions, with

\[
\tau=11/100.
\]

For the centered 36-step letter score `Y`, deterministic path enumeration gives

\[
-9\le Y\le12.
\]

Set

\[
M=12,\qquad R=21,\qquad \alpha=1-\tau=89/100,
\]

and the conservative Poisson/coboundary envelope

\[
D=R/\alpha.
\]

The certificate uses

\[
K=\frac{(M+D)^2}{\alpha}
  +\frac{2(M+D)D}{\alpha}
  +3D^2.
\]

The L=180 symmetric context contains five full 36-step contraction blocks on each side of the target. The retained conservative continuation estimate is

\[
E_{tail}=4K\tau^5.
\]

With the exact rational constants above,

\[
E_{tail}
=\frac{1413887826681}{4406056250000}
\approx0.3208964539844447.
\]

This is combined with the exact finite-context lower bound to obtain a strictly positive infinite-volume margin.

## Audit note

The package's arithmetic verifier confirms this exact calculation. A future independent audit should separately check the derivation of the `4 K tau^5` continuation inequality from the chosen forward/reverse coboundary decomposition and boundary replacement argument. Until then the theorem is labeled computer-assisted with external audit pending.
