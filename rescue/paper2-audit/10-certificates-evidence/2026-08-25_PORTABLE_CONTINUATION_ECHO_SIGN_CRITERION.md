# Portable Continuation-Echo Sign Criterion

**Date:** 2026-08-25  
**Status:** GENERAL THEOREM CANDIDATE / PROOF WRITTEN / NOVELTY NOT ESTABLISHED  
**Application status:** h=4 design-set instance closes internally; independent audit required  
**Holdout status:** NOT YET PROSPECTIVELY VALIDATED  
**h=8:** NOT COMPUTED / NOT INSPECTED

---

# 1. Purpose

The h=4 calculation should not become a "theorem" merely by renaming its
already-observed negative tail.

The goal is a portable criterion that can be frozen **before the response sign
of a new target is inspected**.

The criterion has two parts:

1. a **combinatorial continuation certificate** that lower-bounds a selected
   delayed correlation mechanism from the unperturbed baseline system;
2. a standard rigorous upper bound on every response contribution outside
   that mechanism.

If the certified mechanism is stronger than the worst possible compensation
from everything else, the response sign is forced.

---

# 2. Setting

Let \(X\) be a mixing shift of finite type over an alphabet

\[
\mathcal A,\qquad |\mathcal A|=q.
\]

Assume the full color-permutation group \(S_q\) acts on \(X\) and preserves
the baseline potential.

Let \(G\) be a finite-window target event of width \(W\), invariant under
\(S_q\).  Write

\[
g=1_G.
\]

Introduce the soft penalty

\[
\phi_\epsilon=\phi_0-\epsilon g,
\]

and let \(\mu_\epsilon\) be the corresponding equilibrium/Parry measure.

Fix a letter \(a\in\mathcal A\) and the centered observable

\[
f(x)=1_{\{x_0=a\}}-\frac1q.
\]

By color symmetry,

\[
\mu_\epsilon(f)=0.
\]

Define the asymptotic variance

\[
A(\epsilon)
=
\sum_{k\in\mathbb Z}
\operatorname{Cov}_{\mu_\epsilon}(f_0,f_k),
\]

equivalently

\[
A(\epsilon)
=
c_0(\epsilon)+2\sum_{k\ge1}c_k(\epsilon).
\]

Exponential mixing implies convergence and differentiability near
\(\epsilon=0\).

The target quantity is

\[
A'(0).
\]

---

# 3. Linear-response decomposition

For \(k\ge1\), put

\[
H_k=f_0f_k.
\]

The standard equilibrium linear-response identity for the soft potential
\(-\epsilon g\) gives

\[
\left.\frac{d}{d\epsilon}\mu_\epsilon(H_k)\right|_{\epsilon=0}
=
-\sum_{j\in\mathbb Z}
\operatorname{Cov}_{\mu_0}
\left(H_k,g\circ\sigma^j\right).
\]

Hence

\[
A'(0)
=
D_0
-
2\sum_{k\ge1}
\sum_{j\in\mathbb Z}
\operatorname{Cov}_{\mu_0}
\left(H_k,g\circ\sigma^j\right),
\]

with the analogous \(k=0\) term collected in \(D_0\).

This formula only organizes the response; it is not proposed as new.

---

# 4. One-endpoint covariance identity

Consider one oriented placement \(m=(k,j)\) with \(k\ge1\) such that the
window of \(G\circ\sigma^j\) contains **exactly one** of the sites
\(\{0,k\}\).

Let

\[
p_G=\mu_0(G).
\]

Let \(C_m\) be the color at the observed site lying inside the target window,
and let \(Y_m\) be the color at the other observed site.

Define

\[
K_m
=
P(Y_m=C_m\mid G\circ\sigma^j)
-
P(Y_m=C_m).
\]

## Lemma 1 — symmetry conversion

Under \(S_q\)-symmetry,

\[
\boxed{
\operatorname{Cov}(H_k,g\circ\sigma^j)
=
\frac{p_G}{q}K_m.
}
\]

### Proof

For any \(S_q\)-invariant joint distribution of two colors,

\[
P(X=a,Y=a)=\frac1qP(X=Y).
\]

Therefore

\[
E[f(X)f(Y)]
=
\frac1q\left(P(X=Y)-\frac1q\right).
\]

The same identity holds conditionally on the \(S_q\)-invariant event \(G\).
Thus

\[
E[H_k\mid G]-E[H_k]
=
\frac{K_m}{q}.
\]

Multiplying by \(P(G)=p_G\) gives the covariance identity. \(\square\)

Because \(A'(0)\) contains \(2c_k'(0)\), this oriented placement contributes

\[
\boxed{
-\frac{2p_G}{q}K_m
}
\]

to the asymptotic-variance response.

No time-reversal assumption is needed for the general theorem.

If the system and target are reversal invariant, a matched left/right pair
with equal kernels contributes

\[
-\frac{4p_G}{q}K_m.
\]

For \(q=3\), this recovers the h=4 factor \(4p_G/3\).

---

# 5. Portable continuation lower bound

For a selected oriented placement \(m\), let \(S_m\) be a finite predecessor
context immediately before the outside observed symbol \(Y_m\), and retain
the target reference color \(C_m\) as a label.

Choose any finite partition

\[
\mathcal P_m=\{B\}
\]

of the target-conditioned lifted contexts \((S_m,C_m)\).

Define

\[
\mu_B
=
P((S_m,C_m)\in B\mid G)
\]

and

\[
p_B^-
=
\inf_{(s,c)\in B}
P(Y_m=c\mid S_m=s).
\]

Then

\[
P(Y_m=C_m\mid G)
\ge
\sum_{B\in\mathcal P_m}\mu_Bp_B^-.
\]

Let

\[
b_m=P(Y_m=C_m)
\]

be the ordinary baseline same-color probability at the relevant separation.

Define

\[
\boxed{
\underline K_m
=
\sum_B\mu_Bp_B^- - b_m.
}
\]

## Lemma 2 — continuation certificate

\[
\boxed{
K_m\ge\underline K_m.
}
\]

This is a direct conditioning inequality.

Again, the inequality itself is elementary.  The nontrivial task is to
construct a **small portable partition from the forbidden-pattern
combinatorics** for which \(\underline K_m\) is useful.

---

# 6. A frozen portable partition rule

The following rule is proposed for future holdouts.

It must be frozen before any holdout response is computed.

## PEX signature — Pattern-Exclusion / Equality signature

Fix a small suffix depth \(r\) in advance.

For a lifted context \((s,C)\), record:

### A. Exclusion signature

For every candidate next color \(x\in\mathcal A\), record which baseline
forbidden-pattern classes would be completed by appending \(x\).

For Abelian-square avoidance \(L_H\), this is

\[
\operatorname{Excl}(s,x)
=
\left(
1_{\{\text{append }x\text{ creates a }K\text{-Abelian square}\}}
\right)_{K=2}^{H}.
\]

### B. Relative suffix equality signature

Canonicalize the last \(r\) context symbols relative to the reference color
\(C\):

- whether each equals \(C\);
- equality relations among those suffix symbols.

### C. One boundary relation layer

Record:

- whether the preceding symbol \(s_{-r-1}\) equals \(C\);
- whether \(s_{-r-1}=s_{-r}\).

For the current h=4 design calculation, \(r=3\), giving exactly the structural
type used in the 750-cell mechanism certificate.

The proposed **future portable rule is PEX-3**:

\[
\boxed{r=3\text{ is frozen.}}
\]

No refinement is permitted on a holdout after seeing its response.

If a target has insufficient state memory for these fields, the unavailable
fields are omitted by a predeclared deterministic convention.

---

# 7. Mechanism set chosen before response

For a target width \(W\), freeze the mechanism placement family

\[
\boxed{
\mathcal M_W
=
\{\text{all oriented one-endpoint placements at separations }
W+1\text{ and }W+2\}.
}
\]

Thus the rule does **not** inspect which lag turns out largest.

For every \(m\in\mathcal M_W\), compute the PEX-3 lower bound
\(\underline K_m\).

Only positive certified lower bounds are credited:

\[
\underline K_m^+=\max(\underline K_m,0).
\]

Define the portable echo strength

\[
\boxed{
\underline E_{\rm PEX}
=
\frac{2p_G}{q}
\sum_{m\in\mathcal M_W}
\underline K_m^+.
}
\]

If reversal symmetry is certified and the computation uses only one
orientation, the equivalent paired form may be used.

This quantity is entirely baseline/target based.

It does not require \(A'(0)\).

---

# 8. General sign theorem

## Theorem — Portable Continuation-Echo Sign Criterion

Assume:

1. \(X\) is a mixing finite-state shift and the soft family is differentiable;
2. the baseline and target event are \(S_q\)-invariant;
3. the mechanism family \(\mathcal M_W\) and PEX-3 partition rule are frozen
   before the target response sign is inspected;
4. for every selected placement,
   \(K_m\ge\underline K_m\);
5. all response terms outside the selected certified mechanism have a rigorous
   upper bound
   \[
   R_{\rm rest}\le C_{\rm rest}.
   \]

Then

\[
\boxed{
A'(0)
\le
C_{\rm rest}
-
\underline E_{\rm PEX}.
}
\]

Consequently,

\[
\boxed{
\underline E_{\rm PEX}>C_{\rm rest}
\quad\Longrightarrow\quad
A'(0)<0.
}
\]

### Proof

Split the absolutely convergent linear-response series into the selected
one-endpoint placements and its complement:

\[
A'(0)=R_{\mathcal M}+R_{\rm rest}.
\]

By Lemma 1, each selected oriented placement contributes

\[
-\frac{2p_G}{q}K_m.
\]

By Lemma 2,

\[
K_m\ge\underline K_m.
\]

Crediting only cells with positive certified lower kernel cannot make the
negative mechanism stronger than the true selected response, so

\[
R_{\mathcal M}
\le
-\frac{2p_G}{q}
\sum_{m\in\mathcal M_W}
\underline K_m^+
=
-\underline E_{\rm PEX}.
\]

By assumption,

\[
R_{\rm rest}\le C_{\rm rest}.
\]

Therefore

\[
A'(0)
\le
C_{\rm rest}-\underline E_{\rm PEX}.
\]

If \(\underline E_{\rm PEX}>C_{\rm rest}\), the right-hand side is strictly
negative. \(\square\)

---

# 9. Practical residual certificate

The theorem does not require a novel residual method.

A portable rigorous route is:

1. interval-compute every omitted finite response term through lag \(N\);
2. upper-bound the uncomputed tail using a standard contraction coefficient.

For example, if

\[
\tau_n=\tau(P^n),
\]

and

\[
\alpha=\|\pi F\|_1,\quad
A_1=\|\dot\pi F\|_1,\quad
\beta=\max_i\sum_j|\dot P_{ij}|,
\]

then the already-derived generic lag bound is

\[
|D_k|
\le
A_1\tau_k
+
\alpha\beta
\sum_{j=0}^{k-1}\tau_j\tau_{k-1-j}.
\]

This gives a standard rigorous upper bound on the infinite omitted tail.

The possible novelty is not in Dobrushin contraction.

---

# 10. h=4 design-set instance

For

\[
h=4,\qquad v=(2,1,1),\qquad q=3,\qquad W=8,
\]

the frozen h=4 design calculation gives the structural one-endpoint lower
strength

\[
\underline E_{\rm PEX}
>
0.034210298987926202.
\]

The mechanism-aware residual certificate gives

\[
C_{\rm rest}
<
0.028130171156249307
\]

if the complete target-window prefix is included inside the complement.

Equivalently, using the previously separated notation,

\[
S_7^{up}
+
C_{\rm post}^{up}
<
0.009000526516957613
+
0.019129644639291695
=
0.028130171156249308.
\]

Hence

\[
\underline E_{\rm PEX}
-
C_{\rm rest}
>
0.006080127831676894.
\]

Therefore the current internal h=4 instance satisfies

\[
\boxed{
A'(0)
<
-0.006080127831676894
<0.
}
\]

This is still a **design-set computer-assisted proof candidate** until the
structural lower bound, residual bound, and linear-response placement
identity receive independent clean-room audit.

---

# 11. Why this is genuinely portable

For a new target the procedure is now fixed:

1. specify baseline SFT \(X\);
2. specify an \(S_q\)-invariant finite target event \(G\) of width \(W\);
3. do **not** compute the response sign;
4. enumerate \(\mathcal M_W\): all one-endpoint placements at \(W+1,W+2\);
5. partition their contexts by the frozen PEX-3 rule;
6. compute interval lower bounds \(\underline K_m\);
7. obtain \(\underline E_{\rm PEX}\);
8. separately obtain a rigorous upper bound \(C_{\rm rest}\);
9. reveal only the inequality
   \[
   \underline E_{\rm PEX}\stackrel{?}{>}C_{\rm rest};
   \]
10. only after this prediction is frozen, compute the full response as an
    independent check.

This is a prospective protocol.

It can fail by returning "INCONCLUSIVE"; failure to certify is not evidence
that the response is positive.

---

# 12. What is and is not claimed as new

## Established machinery

Current literature confirms that the following are established:

- forbidden-word SFT perturbations and correlation polynomials;
- pattern correlation matrices for Markov sequences;
- first/second moments and covariance matrices of pattern frequencies;
- transfer/fundamental-matrix formulas for pattern occurrence statistics;
- thermodynamic linear response and pressure derivatives;
- generic asymptotic-variance comparison/perturbation;
- Dobrushin contraction.

Therefore none of those is a novelty claim.

For example, Rukhin expresses covariance matrices of Markov pattern
frequencies via pattern correlation/fundamental matrices, while Lind relates
forbidden-word SFT perturbations to correlation polynomials.  Bóna, Maga and
Richey study the sign of a letter-frequency change from the combinatorics of a
single forbidden word.

## Candidate distinct contribution

The current candidate is narrower:

> **A response-blind, profile-aware continuation-exclusion certificate that
> lower-bounds a delayed one-endpoint mechanism and, together with a rigorous
> residual budget, forces the sign of an asymptotic-variance response.**

Whether this exact criterion or an equivalent result already exists remains
**NOT_ESTABLISHED** and must be audited against primary literature.

---

# 13. Epistemic limitation

There is an important distinction:

- the **theorem statement and proof** above are general;
- the **PEX-3 rule** was abstracted from an exposed h=4 design process.

Therefore we currently possess a portable theorem **candidate**, but not yet
prospective evidence that PEX-3 is broadly effective.

The first genuinely new holdout must be chosen and preregistered without
touching h=8.

A failed/inconclusive holdout would not invalidate the theorem, but it would
weaken claims that PEX-3 is a useful general predictor.

---

# 14. Next scientific upgrade

Three levels should be distinguished.

### Level 1 — proved criterion

The implication

\[
\underline E_{\rm PEX}>C_{\rm rest}
\Longrightarrow A'(0)<0.
\]

### Level 2 — useful portable certificate

PEX-3 succeeds prospectively on multiple target families.

### Level 3 — combinatorial classification

Derive simpler analytic conditions on profile multiplicities and exclusion
patterns that guarantee

\[
\underline E_{\rm PEX}>C_{\rm rest}
\]

without enumerating hundreds of context cells.

Level 3 would be the strongest paper-level generalization.
