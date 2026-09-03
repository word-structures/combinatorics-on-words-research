# PAPER 6 — PARIKH-OBSTACLE TARGET TRANSPORT THEOREM SEED v0.1
**Date:** 2026-08-31  
**Status:** proved theorem seed + preregistered validation; novelty unassessed

## 0. Why this theorem was attempted

The v3.5 bounded-extension theorem proved that the current legal response to
all long Abelian-square periods is determined by finite target layers

\[
T_1(s),\ldots,T_L(s).
\]

A direct selected-library counterexample also proved that those layers are not
update-closed.

Rather than repair that failure by adding fitted finite decorations, this note
asks what information is **actually transported** when a block is appended.

The answer is an exact graded shift law.

---

# 1. Generalized target coordinates

For a word \(s\), integers \(0\le J\le k\), and

\[
2k-J\le |s|,
\]

define

\[
\boxed{
R_{k,J}(s)
=
S_{2k-J}(s)-2S_{k-J}(s),
}
\]

where \(S_n(s)=\Psi(\operatorname{suf}_n s)\).

Its coordinate mass is

\[
\boxed{
\|R_{k,J}(s)\|_1^{\rm signed}=J.
}
\]

For fixed block length \(L\), define the nonnegative generalized target layer

\[
\boxed{
T_J(s)
=
\left\{
R_{k,J}(s):
 k\ge\max(L,J),
 2k-J\le|s|,
 R_{k,J}(s)\ge0
\right\}.
}
\]

Thus

\[
T_J(s)\subseteq\mathcal C_J(d).
\]

For \(1\le J\le L\), these are exactly the long-period response target layers
from v3.5.

---

# 2. Theorem TT1 — q-block pointwise transport

Let \(U\) be any continuation whose length is a multiple of the block length,

\[
|U|=qL.
\]

Let \(1\le j\le L\). If

\[
k-j\ge qL
\]

and the corresponding suffixes exist, then

\[
\boxed{
R_{k,j}(sU)
=
R_{k,j+qL}(s)-\Psi(U).
}
\]

## Proof

Because \(k-j\ge qL\), both suffixes in \(R_{k,j}(sU)\) extend through all of
\(U\). Hence

\[
S_{2k-j}(sU)
=
\Psi(U)+S_{2k-j-qL}(s),
\]

and

\[
S_{k-j}(sU)
=
\Psi(U)+S_{k-j-qL}(s).
\]

Therefore

\[
\begin{aligned}
R_{k,j}(sU)
&=S_{2k-j-qL}(s)-2S_{k-j-qL}(s)-\Psi(U)\\
&=R_{k,j+qL}(s)-\Psi(U).
\end{aligned}
\]

The old coordinate is well-defined because

\[
j+qL\le k.
\]

∎

### Interpretation

A deep old obstruction coordinate at grade \(j+qL\) is transported downward to
grade \(j\) after \(q\) block shifts and translated by the Parikh vector of the
intervening continuation.

No rank, quotient, observability, or coefficient fitting appears in this
identity.

---

# 3. Theorem TT2 — exact one-block target-layer update

Let \(b\in\Sigma^L\), and put

\[
p=\Psi(b).
\]

For each current response grade \(1\le j\le L\), define the finite near-source
set

\[
\boxed{
N_j(s,b)
=
\left\{
 p+S_{j+2h-L}(s)-2S_h(b):
 h=L-j,\ldots,L-1,
 j+2h-L\le |s|,
 \text{result}\ge0
\right\}.
}
\]

Then

\[
\boxed{
T_j(sb)
=
N_j(s,b)
\cup
\left\{
 u-p:
 u\in T_{j+L}(s),
 u\ge p
\right\}.
}
\]

## Proof

Every new target in \(T_j(sb)\) is indexed by a root length \(k\ge L\). Put

\[
h=k-j.
\]

There are two disjoint cases.

### Far case: \(h\ge L\)

Then TT1 with \(q=1\) gives

\[
R_{k,j}(sb)
=
R_{k,j+L}(s)-p.
\]

Because the new target is nonnegative and \(p\ge0\), the old target is itself
nonnegative, so it belongs to \(T_{j+L}(s)\). Conversely every old target
\(u\in T_{j+L}(s)\) with \(u\ge p\) produces the nonnegative new target
\(u-p\).

### Near case: \(0\le h<L\)

The condition \(k=j+h\ge L\) is equivalent to

\[
h\ge L-j.
\]

The shorter suffix lies completely inside the appended block:

\[
S_{k-j}(sb)=S_h(b).
\]

The longer suffix has length

\[
2k-j=j+2h.
\]

After removing the final block, the amount reaching into \(s\) is

\[
j+2h-L.
\]

When this quantity fits in \(s\),

\[
S_{2k-j}(sb)
=p+S_{j+2h-L}(s).
\]

Therefore

\[
R_{k,j}(sb)
=p+S_{j+2h-L}(s)-2S_h(b),
\]

which is exactly the near-source formula. These are all remaining root lengths.
∎

---

# 4. Corollary TT3 — exact reason v3.5 is not update-closed

The current response signature uses only grades

\[
1,\ldots,L.
\]

But TT2 shows that after one block its far component requires the old grades

\[
L+1,\ldots,2L.
\]

Therefore the failure of \((T_1,\ldots,T_L)\) to be a Markov state is not an
accident requiring an ad hoc bit. It is the first level of a graded transport
hierarchy:

\[
\boxed{
\text{future grade }j
\leftarrow
\text{old grade }j+L
+
\text{bounded local source}.
}
\]

The selected-library counterexample from v3.5 is consistent with, and now
explained structurally by, this missing higher-grade information.

This is an explanation of non-closure, not a finite-state repair.

---

# 5. Corollary TT4 — finite-horizon depth versus target grade

TT1 shows more generally that after a fixed continuation of \(q\) blocks, the
far contribution to response grade \(j\) comes from old grade

\[
\boxed{j+qL.}
\]

Thus increasing observation/continuation depth does not create a mysterious
new family of variables: it transports progressively deeper grades of the same
Parikh-obstacle hierarchy toward the active response window.

For fixed horizon \(q\), only finitely many grades are relevant. For unbounded
future horizons, arbitrarily deep grades may matter.

This is precisely compatible with the negative v3.5 update-closure result.

---

# 6. Relation to bounded-defect / cut-profile theory

The bounded-defect theorem describes a long Abelian-square condition around a
block midpoint as

\[
D_q+E=0,
\]

where \(D_q\) is the unbounded block-profile component and \(E\) comes from a
finite cut catalogue.

The v3.5 obstacle theorem describes the candidate-extension side as a finite
prefix-profile hit.

TT1--TT2 connect successive response times:

\[
\boxed{
\text{deep old target}
\xrightarrow{\text{block continuation}}
\text{translated active target}
}
\]

plus a bounded local source.

This creates a coefficient-free architecture:

\[
\text{block-profile/cut generation}
\to
\text{graded target hierarchy}
\to
\text{finite Parikh-prefix response compiler}.
\]

Whether this architecture produces a useful globally compressed solver remains
open.

---

# 7. Preregistered validation

The implementation tests were frozen before execution.

## TT1 pointwise q-block transport

Random exact tests for \(q=1,2,3\) on binary and ternary alphabets, with block
lengths \(L=2,3,4,5\), checked tens of thousands of valid coordinates with zero
mismatches.

## TT2 one-block target-set update

Random exact target-set equality tests:

- binary \(L=2,3\): 5,000 histories each;
- ternary \(L=2,3,4\): 5,000 each;
- ternary \(L=5\): 3,000;
- ternary \(L=6\): 2,000;

with every response grade tested and zero mismatches.

Selected-library tests:

- FULL-L4 aa2fr: 500 sampled block histories, zero mismatches;
- INTERIOR-L5 aa2fr: 500 sampled block histories, zero mismatches.

Certificate:

`P6_V36_TARGET_TRANSPORT_HIERARCHY_TEST_CERT_v0.1_2026-08-31.json`

The first implementation run stopped on a startup-history bounds assertion
before reporting any theorem result. The missing factor-existence guard was
added without changing the preregistered formula or success criteria.

Audit:

`P6_V36_TARGET_TRANSPORT_IMPLEMENTATION_AUDIT_2026-08-31.md`

---

# 8. Novelty boundary

The algebraic suffix identity itself is elementary once the correct target
coordinate is defined. It must not be advertised as a new general principle of
linear algebra or formal languages.

The potential Paper-6 contribution is the combined Abelian-specific statement:

1. all unbounded long-root current extension obstructions live in finite
   prefix-Parikh target layers;
2. those layers admit the exact graded transport law TT1--TT2;
3. bounded extension operators can be compiled on the polynomial-size
   Parikh-prefix DAG from v3.5;
4. finite current response and unbounded update memory are separated exactly.

No searched source has yet been shown to contain this combined theorem, but the
novelty search is not exhaustive.

Current status:

\[
\boxed{\text{PROVED STRUCTURAL THEOREM SEED — NOVELTY UNASSESSED}.}
\]

---

# 9. Next kill gate

Do not immediately call the semi-infinite hierarchy the Paper-6 main theorem.

The next adversarial question is whether the graded target hierarchy is merely
a reparameterization of classical Abelian-template ancestors, or whether its
bounded-extension response/compiler consequences add genuinely new content.

Before manuscript promotion:

1. perform a stronger-template-theorem equivalence search;
2. compare TT1--TT2 against Currie--Rampersad parent/ancestor recurrences and
   Carpi-style prefix/suffix corrections;
3. test whether the hierarchy yields a new algorithmic bound or compression
   that those frameworks do not already imply.
