# Theorem 332 — proof/certificate outline

For profile `v=(3,3,2)`, define `C_332(x)` as in the checkpoint README.

## Claim

`C_332(x)<0` for every `x in [0,1]` in the audited H8 finite-state setup. Hence `da/dx<0` on `(0,1]`, so `a(0)>a(1)` and hard-deletion `Delta_a=a(0)-a(1)>0`.

## Exact finite-context part

At symmetric radius `L=220`, the exact GMP polynomial has target degree cap 294 and `G=0` exactly. Independent outgoing-edge modular DPs agree coefficient-by-coefficient for four primes, and a separate dense-resolvent comparison agrees to <2e-9.

Let `Q_L=-C_L`. Exact global Bernstein arithmetic proves `Q_L` is strictly decreasing on `[0,1]`. Therefore

`Q_L(x) >= Q_L(1) = 0.5696556495537533...`.

An independent integer Bernstein identity cross-check gives the same positivity conclusion.

## Uniform mixing part

A fixed 302-interval partition of `[0,1]` is checked in both time directions, giving 604 records. Every 44-step common-minorization lower bound exceeds 0.90; the weakest stored value is

`0.9039882776677982`.

The theorem deliberately truncates to `alpha=9/10`, `tau=1/10`.

For 44 steps, deterministic score enumeration gives `4 <= N_a <= 29`, hence `M=43/3`, oscillation `R=25`.

## Tail

With five complete 44-step contraction blocks per side, the common continuation lemma gives exactly

`E_tail = 167297 / 607500 = 0.2753860082304527...`.

Thus

`-C_332(x) > 0.5696556495537533 - 0.2753860082304527 = 0.2942696413233006 > 0`.

## Roundoff audit boundary

The weakest interval remains above 0.90 under deliberately inflated padding through 5e-4 (stored stress minimum about 0.901623). This is a robustness diagnostic, not a formal replacement for directed rounding. Fully directed-rounding / ball-arithmetic replay remains open.

The common `4 K tau^B` tail derivation also remains an independent external-audit target.
