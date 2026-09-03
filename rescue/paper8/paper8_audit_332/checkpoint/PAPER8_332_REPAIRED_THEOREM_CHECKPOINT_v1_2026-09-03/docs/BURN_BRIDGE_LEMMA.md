# Burn bridge lemma — tail-repair route

**Status:** proof-level algebraic lemma; numerical hypotheses are supplied by the
stored block-minorization and one-block projective certificates.  Directed-rounding
replay of the numerical interval generator remains an external audit item.

## Setup

Fix a nonnegative transfer matrix `A=A(x)` with Perron root `lambda`, positive
left/right Perron vectors `l,r` on the dominant support, and the associated
forward and reverse Parry kernels

\[
P_{ij}=\frac{A_{ij}r_j}{\lambda r_i},
\qquad
P^*_{ji}=\frac{l_iA_{ij}}{\lambda l_j}.
\]

Let `m=44`.  Assume both `P^m` and `(P^*)^m` have Dobrushin coefficient at most
`tau`.  In Paper 8 we use `tau=1/10`.

Choose nonnegative left/right boundary vectors supported on the hard-endpoint
dominant SCC.  After `B` blocks define

\[
L_B^T=u^T A^{mB},\qquad R_B=A^{mB}v,
\]

and endpoint likelihood ratios

\[
a_B(i)=\frac{L_B(i)}{l_i},\qquad b_B(j)=\frac{R_B(j)}{r_j}.
\]

The tropical-scaled formulation supplies the continuous hard-endpoint limits.

## 1. Range contraction

Using the reverse Parry kernel,

\[
\frac{a_{B+1}(j)}{\lambda^m}
=\sum_i (P^*)^m_{ji}a_B(i).
\]

Similarly,

\[
\frac{b_{B+1}(i)}{\lambda^m}
=\sum_j P^m_{ij}b_B(j).
\]

The common factor `lambda^m` has no effect on projective ratios.  If

\[
\rho(a)=\frac{\max a}{\min a},
\]

then a stochastic kernel with Dobrushin coefficient at most `tau` satisfies

\[
\operatorname{osc}(Ka)\le \tau\operatorname{osc}(a),
\qquad
\min Ka\ge\min a.
\]

Hence

\[
\boxed{\rho(a_{B})-1\le\tau^{B-1}(\rho(a_1)-1)},
\]

and identically for `b_B`.

## 2. Central-path reweighting

For a central path `w=(i,\ldots,j)`, the stationary path weight is proportional to

\[
l_i\,A(w)\,r_j.
\]

The burned finite-boundary weight is proportional to

\[
L_B(i)\,A(w)\,R_B(j).
\]

Therefore the finite measure is the stationary measure reweighted by

\[
W(w)=a_B(i)b_B(j).
\]

If

\[
\rho_L=\rho(a_B),\qquad \rho_R=\rho(b_B),\qquad
\rho=\rho_L\rho_R,
\]

then `max W/min W <= rho`.  The same statement remains true after restricting
both measures to any event `g` contained in the scored central window, because
restriction does not enlarge the range of `W`.

For any probability measure reweighted by a positive density whose max/min ratio
is at most `rho`,

\[
\|\nu-\mu\|_{TV}
\le \frac{\sqrt\rho-1}{\sqrt\rho+1}
\le \frac{\rho-1}{4}.
\]

Thus for an observable `H` of oscillation `osc(H)`, both the baseline and the
`g`-conditioned expectation change by at most

\[
\operatorname{osc}(H)\frac{\rho-1}{4}.
\]

Consequently the response difference

\[
E(H\mid g)-E(H)
\]

changes by at most

\[
\boxed{E_{burn}\le
2\operatorname{osc}(H)\frac{\rho-1}{4}}.
\]

No derivative is taken through the burn propagation.  Therefore this lemma has
no `B tau^B` or `B^2 tau^B` derivative-prefactor mechanism.

## 3. H8 profile (3,3,2) constants

For the 617-transition scored window,

\[
56\le N_a\le397.
\]

With centered ternary score `f=1_{a}-1/3`, equivalently using integer score
`3N_a-617`,

\[
\operatorname{osc}(Y^2)\le \frac{329476}{9}.
\]

The one-block interval projective computation is below the deliberately weakened
bounds

\[
\rho^L_1\le\frac{107}{100},
\qquad
\rho^R_1\le\frac{11}{10}.
\]

For `B=5`, `tau=1/10`,

\[
\rho_L\le1+10^{-4}(0.07)=1.000007,
\]

\[
\rho_R\le1+10^{-4}(0.10)=1.00001,
\]

so

\[
\rho\le1.00001700007.
\]

The resulting rational burn bound is combined with the separately derived
polynomial-prefactor stationary kernel tail in `BURN_ERROR_332_CERT.json`.
