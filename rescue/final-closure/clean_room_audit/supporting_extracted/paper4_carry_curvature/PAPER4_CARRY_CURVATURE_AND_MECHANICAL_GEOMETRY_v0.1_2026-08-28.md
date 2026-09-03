# Paper 4 — Carry–Curvature and Mechanical Geometry

**Version:** v0.1  
**Date:** 2026-08-28  
**Status:** exploratory theorem package; no canonical promotion.  
**Novelty:** `NOVELTY_UNRESOLVED`.

## Executive result

The `{-1,0,+1}` curvature phenomenon from Occurrence Geometry has a simpler hidden source.

Let uniform macro blocks have length `L`, and let equally spaced absolute cutpoints be

\[
t_j=s+jK.
\]

Write

\[
K=qL+r,\qquad 0\le r<L,
\]

and

\[
t_j=b_jL+i_j,\qquad 0\le i_j<L.
\]

Define the carry bit

\[
c_j=
\left\lfloor\frac{i_j+r}{L}\right\rfloor\in\{0,1\}.
\]

Then exactly

\[
\boxed{i_{j+1}=i_j+r-Lc_j}
\]

and

\[
\boxed{b_{j+1}-b_j=q+c_j.}
\]

Therefore the macro curvature is

\[
\boxed{
b_j-2b_{j+1}+b_{j+2}
=
c_{j+1}-c_j.
}
\]

This immediately explains

\[
\delta_j\in\{-1,0,+1\}.
\]

The three curvature branches are simply the four binary carry transitions:

\[
00,11\mapsto0,\qquad
01\mapsto+1,\qquad
10\mapsto-1.
\]

So the curvature theorem is the **discrete derivative of a binary carry process**.

## 1. The carry word is a rational mechanical word

Iterating the recurrence gives

\[
i_j\equiv i_0+jr\pmod L.
\]

Moreover,

\[
\boxed{
c_j
=
\left\lfloor
\frac{i_0+(j+1)r}{L}
\right\rfloor
-
\left\lfloor
\frac{i_0+jr}{L}
\right\rfloor.
}
\]

Thus \(c_0c_1c_2\ldots\) is precisely a lower rational mechanical word of slope

\[
\alpha=\frac rL
\]

and intercept \(i_0/L\).

Mechanical words are classical. Rational mechanical words are periodic and balanced; irrational mechanical words lead to Sturmian words. The Paper-4-specific observation is the identification of **macro-block carry geometry of Abelian cutpoints** with this classical object.

## 2. Macro-gap Balance Theorem

Let

\[
g_j=b_{j+1}-b_j.
\]

Then

\[
\boxed{g_j\in\{q,q+1\}}
\]

and \(g_j-q=c_j\).

Because rational mechanical words are balanced, equal-length factors of the macro-gap sequence have total macro displacement differing by at most one block.

This is stronger than the local curvature statement

\[
g_{j+1}-g_j\in\{-1,0,+1\}.
\]

The entire macro-gap sequence is globally balanced: equally spaced physical cutpoints trace a digital straight line through the block grid.

## 3. Exact period structure

Let

\[
g=\gcd(L,r).
\]

For \(r>0\), the carry word has period

\[
\boxed{p=L/g}
\]

and exactly

\[
\boxed{r/g}
\]

ones per period.

Over one cyclic period the number of carry transitions is

\[
\boxed{
2\min\left(r/g,(L-r)/g\right).
}
\]

Hence the same formula counts nonzero curvature events per full carry period.

Positive and negative curvature events occur equally often over a full period.

## 4. Curvature chains are far from arbitrary

Since

\[
\delta_j=c_{j+1}-c_j
\]

with binary \(c_j\), nonzero curvature signs must alternate.

Thus a chain such as

\[
+1,+1
\]

cannot occur without an intervening \(-1\); likewise for two \(-1\)'s. Over a full carry period,

\[
\sum_j\delta_j=0.
\]

For Abelian \(k\)-powers, this strengthens the previous local theorem: the overlapping curvature motifs are not arbitrary elements of `{-1,0,+1}`. They are the derivative of one **balanced binary mechanical word**.

## 5. Abelian k-power geometry becomes one rotation-driven motif chain

For an Abelian \(k\)-power,

\[
Q_j=P(s+jK),\qquad j=0,\ldots,k,
\]

and

\[
Q_j-2Q_{j+1}+Q_{j+2}=0,
\qquad j=0,\ldots,k-2.
\]

All these equations share the same physical half-period \(K\), hence the same

\[
q=\lfloor K/L\rfloor,\qquad r=K\bmod L,
\]

and the same carry word.

Therefore a \(k\)-power is not merely an arbitrary chain of three-cutpoint motifs. Its full cutpoint geometry is determined by

\[
\boxed{(q,r,i_0)}
\]

together with the macro role mask.

The local residue dynamics are just the finite rotation

\[
\boxed{i\mapsto i+r\pmod L.}
\]

This is a substantially smaller structural description than independently choosing curvature branches at each adjacent triple.

## 6. Reinterpretation of `C_-`, `C_0`, `C_+`

For a square only two carry bits are needed:

- `00` or `11`: equal macro gaps, hence \(C_0\);
- `01`: second macro gap one block longer, hence \(C_{+1}\);
- `10`: second macro gap one block shorter, hence \(C_{-1}\).

The three curvature families are therefore exactly the transition graph of a one-bit carry state.

Midpoint routing can likewise be derived from the pair of gap values \(q+c_0,q+c_1\), rather than treated as unrelated casework.

## 7. Mechanical Occurrence Compiler

The geometry suggests an alternative exact compiler.

For each relevant

\[
K=qL+r
\]

and start residue \(i_0\):

1. generate the rational mechanical carry word of slope \(r/L\);
2. generate macro gaps \(q+c_j\);
3. walk through the macro role mask;
4. emit the corresponding colored second-difference motifs.

For fixed `L`, the residue automaton has only `L` states.

No speed claim is made. The significance is structural: the full cutpoint geometry is parameterized by a finite rational rotation rather than by an unconstrained sequence of motif choices.

## 8. Connection to classical combinatorics on words

The mechanical-word layer is established classical theory, so Paper 4 must not claim novelty for mechanical words, balance, Sturmian coding, or digital-line geometry themselves.

This connection is useful precisely because it imports mature structure:

- rational slopes -> periodic mechanical words;
- balance -> globally controlled macro-gap discrepancy;
- curvature -> derivative of carry coding.

A targeted web check found standard sources defining lower mechanical words by floor differences and noting that rational mechanical words are balanced. This supports the terminology and the classical-status warning.

The potential Paper-4 contribution, if novel, is the use of this carry/mechanical representation to organize **staged Abelian-repetition occurrence constraints**.

## 9. Why this is more than pretty notation

The chain

\[
\boxed{
\text{uniform block partition}
\to
\text{Euclidean division }K=qL+r
\to
\text{rotation mod }L
\to
\text{mechanical carry word}
\to
\text{balanced macro gaps}
\to
\text{curvature motifs}
}
\]

explains several previously separate discoveries in one stroke.

It also suggests a stronger future theorem:

> **Mechanical Occurrence Compiler Theorem:** characterize exactly the finite colored motif chains realizable for fixed `L` as those generated by rational mechanical carry words walking through the macro role mask.

That would turn occurrence geometry from a catalogue of cases into a finite-language theorem.

## 10. Verification

The verifier performs three independent classes of checks:

1. direct absolute-coordinate decomposition vs carry/mechanical formulas;
2. period, ones-count, cyclic transition count, and balance for many rational slopes/intercepts;
3. alternation and telescoping properties of curvature chains.

All checks in the supplied finite suites return zero failures.

## 11. Epistemic ledger

| Claim | Status |
|---|---|
| carry recurrence | **PROVED FROM DEFINITIONS** |
| carry word equals rational mechanical floor coding | **PROVED FROM DEFINITIONS / classical object** |
| macro gaps are `q` or `q+1` | **PROVED FROM DEFINITIONS** |
| curvature = derivative of carry | **PROVED FROM DEFINITIONS** |
| rational mechanical balance | **CLASSICAL** |
| exact period / density | **CLASSICAL + direct derivation** |
| transition-count formula | **DIRECT DERIVATION + finite checks** |
| nonzero curvature signs alternate | **PROVED FROM binary carry representation** |
| k-power motif chain driven by one rotation | **PROVED FROM DEFINITIONS** |
| computational speedup | **NOT ESTABLISHED** |
| novelty of the Abelian-constraint application | **NOVELTY_UNRESOLVED** |
