# PEX-C4 + L6 Certifier Prospective Battery H08-H11 — FROZEN BEFORE SCORE OR RESPONSE

**Freeze date:** 2026-08-25  
**Status:** PROSPECTIVE CERTIFICATION BATTERY  
**Design provenance:** PEX-C4 and the L6 residual-tail certifier were both completed before this battery was selected.  
**Absolute fence:** h=8 is forbidden and untouched.

## 1. Purpose

This is the first battery in which **both** components are frozen before the
target response is inspected:

1. the PEX-C4 continuation-capacity mechanism certificate;
2. the L6 rigorous residual-tail certificate candidate.

The battery will therefore allow an actual pre-reveal
`NEGATIVE_CERTIFIED` decision if the inequality closes.

## 2. Deterministic target selection

The previous h=7 battery used the positional predicate

\[
x_0=x_1.
\]

To obtain a fresh exact target without changing baseline half-length or
touching h=8, use the next simple same-color positional predicate in
lexicographic pair order:

\[
\boxed{x_0=x_2}.
\]

Use all four exposed h=7 profile classes in increasing imbalance order.

No target may be replaced after any score is seen.

## 3. Baseline

\[
X=L_6,
\]

the ternary shift avoiding Abelian squares of half-lengths

\[
2,3,4,5,6.
\]

Target width:

\[
W=14.
\]

## 4. Frozen targets

A target block \(x_0\dots x_{13}\) must be a 7-Abelian square with the
specified canonical half-profile and satisfy \(x_0=x_2\).

- **H08:** profile `(3,2,2)`, \(x_0=x_2\)
- **H09:** profile `(3,3,1)`, \(x_0=x_2\)
- **H10:** profile `(4,2,1)`, \(x_0=x_2\)
- **H11:** profile `(5,1,1)`, \(x_0=x_2\)

All targets are ternary-color-permutation invariant.

The predicate is not assumed reversal invariant; original and reversed target
orientations are treated explicitly.

## 5. Frozen PEX-C4 mechanism rule

Mechanism placements:

\[
k=W+1=15,\qquad k=W+2=16,
\]

all oriented one-endpoint placements.

Context signature:

1. complete append-color exclusion signature for K=2,3,4,5,6;
2. last-three equality pattern relative to the reference color;
3. fourth-from-last equals reference bit;
4. fourth-from-last equals third-from-last bit;
5. \(N_4(s)\);
6. \(N_4(s_{\rm ref})\), with fixed impossible sentinel if reference append is forbidden.

For every cell, use the minimum reference-color transition probability.

## 6. Frozen rigorous-candidate L6 certifier

Use the exact continuation-count proxy derived from the minimal L6 quotient:

- minimal L6 presentation: 10128 states;
- S3 quotient: 1688 states;
- exact \(Q^{23}>0\);
- continuation depth: 300;
- projective true-vs-proxy factor:
  \[
  E<1+3\times10^{-27};
  \]
- 40-step common mass:
  \[
  \alpha_{40}>0.988;
  \]
- Dobrushin:
  \[
  \tau(P^{40})<0.012;
  \]
- lag tail after 400:
  \[
  B_{>400}<1.462\times10^{-12}.
  \]

Frozen conservative numerical budgets:

\[
\boxed{\varepsilon_{\rm prefix}=7.5\times10^{-4}}
\]

for the complete lag-0,...,400 complement sensitivity,

\[
\boxed{\varepsilon_K=10^{-6}}
\]

subtracted from every credited positive PEX-C4 kernel lower bound, and

\[
\boxed{\varepsilon_q=10^{-10}}
\]

subtracted from the target probability.

These constants may not be tightened after a response is seen.

## 7. Prediction arithmetic

On the exact continuation-count proxy, compute:

\[
C_{\rm rest}^{(400)}
=
A'_{\rm proxy,[0,400]} + E_{\rm selected,actual,proxy},
\]

where the selected mechanism is exactly the set of placements whose frozen
PEX-C4 lower kernel is positive.

Then set

\[
C_{\rm rest}^{up}
=
C_{\rm rest}^{(400)}
+
7.5\times10^{-4}
+
1.462\times10^{-12}.
\]

For the mechanism lower bound use

\[
\underline E_{\rm safe}
=
\frac{2(q-10^{-10})_+}{3}
\sum_m
\max(\underline K_m-10^{-6},0).
\]

Prediction:

- **NEGATIVE_CERTIFIED** iff
  \[
  \underline E_{\rm safe}>C_{\rm rest}^{up};
  \]
- otherwise **INCONCLUSIVE**;
- **EMPTY_TARGET** if target mass is zero.

There is no positive certification rule.

## 8. Reveal order

1. Freeze this document and SHA-256.
2. Compute proxy PEX-C4 mechanism and residual certificate.
3. Freeze all predictions and artifact hashes.
4. Only then compute any full-response derivative for H08-H11.
5. Preserve every outcome and do not retune.

## 9. Epistemic note

The L6 certifier is currently an **internal rigorous certificate candidate**,
not yet independently audited by Claude/clean-room implementation.

Therefore a successful `NEGATIVE_CERTIFIED` result here would mean:

**prospectively certified under the frozen internal certificate architecture**,

not yet publication-grade independent proof.

No h=8.
