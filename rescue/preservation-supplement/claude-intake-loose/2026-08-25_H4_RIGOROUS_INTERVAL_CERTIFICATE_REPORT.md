# h=4, profile (2,1,1): rigorous interval certificate candidate

**Date:** 2026-08-25  
**Status:** COMPUTER-ASSISTED PROOF CANDIDATE / INDEPENDENT AUDIT STILL REQUIRED  
**Scope:** soft initial response for the exposed h=4 profile (2,1,1) over the baseline L3 shift  
**h=8:** NOT COMPUTED / NOT INSPECTED

## Certified target

The target statement is

\[
\boxed{a'_{4,(2,1,1)}(0)<0.}
\]

The certificate does not infer this from an epsilon sweep. It combines a rigorously bounded finite lag prefix with a rigorously bounded infinite tail.

## Proof architecture

1. Construct the baseline L3 shift exactly.
2. Use the S3 action on the 162-state 5-block presentation to form an equitable 27-state quotient.
3. Verify the full baseline graph is strongly connected and aperiodic.
4. Verify exactly that the sixth power of the quotient matrix is strictly positive.
5. Compute the exact Birkhoff cross-ratio bound

\[
\Theta=8,
\]

so the projective contraction coefficient is strictly below 1/2.
6. Generate a 70-decimal approximate Perron vector and certify it *after the fact* using exact integer arithmetic. The resulting projective error implies

\[
E-1<3\times10^{-70}.
\]

7. Lift this to the 786-state 7-block presentation required by the h=4 target-edge potential. The true Parry transition probabilities and the rational approximate transition probabilities differ by less than the same projective multiplicative factor.
8. Use directed Decimal arithmetic to certify a common 15-step overlap mass

\[
\delta_{15}>0.791027824682557\ldots,
\]

which yields the deliberately rounded mixing bound

\[
\boxed{\tau(P^{15})\le0.209.}
\]

9. Differentiate the weighted Perron/Parry system analytically. With

\[
e_i=\sum_jP_{ij}g_{ij},\qquad q=\pi e,
\]

the right-eigenfunction derivative satisfies

\[
(I-P)u=q\mathbf1-e,
\]

and

\[
\dot P_{ij}=P_{ij}\bigl(-g_{ij}+u_j-u_i+q\bigr).
\]

The stationary derivative is

\[
\dot\pi=\sum_{n\ge0}(\pi\dot P)P^n.
\]

10. Evaluate the first 151 lag-response terms by directed interval arithmetic, truncating the auxiliary Poisson/stationary series at 450 steps and bounding those omitted tails with the 15-step contraction estimate.
11. Bound every lag after 150 using the Dobrushin inequality

\[
|D_k|\le A\tau_k+\alpha\beta\sum_{j=0}^{k-1}\tau_j\tau_{k-1-j},
\]

with

\[
\alpha=\frac49,\qquad A<0.200,\qquad \beta<1.201,
\]

and

\[
\tau_n\le0.209^{\lfloor n/15\rfloor}.
\]

## Finite certified prefix

Directed interval arithmetic gives

\[
S_{150}\in
[
-0.0073373261710930020479110390566442074830477786099995,
-0.0073373261710930020479110390566442074830477786090969
].
\]

The explicit perturbation bound between the exact Parry system and the rational certificate system is

\[
<1.024\times10^{-14}.
\]

## Infinite tail

The complete contribution of all lags after 150 is bounded by

\[
\boxed{B_{150}\le0.0006989956115298716348751361284066.}
\]

## Final inequality

Using the upper endpoint of the interval, the perturbation allowance, and the worst-case positive infinite tail,

\[
a'(0)
<
-0.007337326171093002\ldots
+1.024\times10^{-14}
+0.000698995611529872\ldots
\]

and therefore

\[
\boxed{
a'_{4,(2,1,1)}(0)
<
-0.006638330559552899\ldots
<0.
}
\]

The sign margin is about

\[
6.64\times10^{-3},
\]

far larger than the certified numerical uncertainty.

## Computational checks produced by the verifier

- minimal 5-block baseline states: 162
- h=4 7-block states: 786
- full 5-block baseline graph: strongly connected, period 1
- S3 quotient states: 27
- Q^6: strictly positive
- exact Birkhoff cross-ratio: 8
- Perron projective multiplicative error: < 3e-70
- directed 15-step common mass: 0.791027824682557276119469141425235311345069806485898612340196
- certified tau(P^15): <= 0.209
- stationary candidate residual upper: 1.930208277720268e-58
- beta approximate upper: 1.200293438241087912761997303
- A approximate upper: 0.1993078842905874233432487467
- finite-prefix exact-system perturbation bound: 1.0231233793716803e-14
- infinite tail bound: 0.0006989956115298716...
- final certified upper bound: -0.006638330559552899...
- h=8 touched: NO

## Epistemic status

This is substantially stronger than the earlier Float64 proof candidate: the supplied verifier uses exact integer/Fraction checks for the Perron projective certificate and directed Decimal arithmetic for the interval portions.

However, before promotion to a canonical mathematical claim or paper theorem, the proof and verifier should receive an independent clean-room audit. In particular, an independent checker should verify:

- the Birkhoff/Hilbert error argument;
- the lift from the S3 quotient to the 7-block Parry chain;
- the perturbation identities for u, dot-P and dot-pi;
- the finite-prefix sensitivity bound;
- the Dobrushin convolution tail inequality;
- the directed-rounding implementation.

If those checks pass, the result supports the wording **computer-assisted proof of a negative initial soft response for h=4, profile (2,1,1)**.

## Research significance

Together with the hidden-color continuation analysis, the result now separates two achievements:

1. **Mechanism:** singleton-deficit / short-square continuation constraints create a delayed hidden-color echo concentrated near lags 9 and 10.
2. **Sign theorem candidate:** a finite lag certificate plus a rigorous infinite-tail bound forces the initial soft response to be negative.

This is a credible paper-level core. Literature novelty remains NOT_ESTABLISHED and must be audited separately.
