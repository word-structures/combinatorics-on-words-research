# PAPER 6 — PARIKH-LADDER NO-COMPRESSION THEOREM SEED v0.1
**Date:** 2026-08-29  
**Status:** theorem seed; not a manuscript

## 1. Setup

For a history suffix \(s\), define its suffix-Parikh ladder

\[
S_m(s)=\Psi(\operatorname{suf}_m(s)),
\qquad
S_0=0.
\]

For cutoff \(K\), the unified Abelian boundary equation is

\[
\Delta_{k,j}(s,b)
=
S_{2k-j}(s)
-
2S_{(k-j)_+}(s)
+
2P_{(j-k)_+}(b)
-
P_j(b),
\]

for

\[
2\le k\le K,
\qquad
1\le j\le\min(L,2k-1).
\]

The question is whether replacing the literal suffix by the exact
suffix-Parikh ladder gives a compressed exact state description.

The answer is no.

---

# 2. Theorem P6-NC1 — every suffix length occurs

Assume block length

\[
L\ge2.
\]

Across the family of boundary equations for half-periods

\[
2\le k\le K,
\]

the history-side expressions require every suffix-Parikh vector

\[
\boxed{
S_1,S_2,\ldots,S_{2K-1}.
}
\]

## Proof

For every odd length

\[
m=2k-1,
\qquad
3\le m\le2K-1,
\]

choose endpoint

\[
j=1.
\]

Then the first history term in \(\Delta_{k,1}\) is

\[
S_{2k-1}=S_m.
\]

For every even length

\[
m=2k-2,
\qquad
2\le m\le2K-2,
\]

choose endpoint

\[
j=2.
\]

Because \(L\ge2\), this endpoint is available, and

\[
S_{2k-2}=S_m
\]

appears.

Finally \(S_1\) appears already in the second history term of

\[
\Delta_{2,1},
\]

because

\[
(k-j)_+=1.
\]

Hence every \(S_m\), \(1\le m\le2K-1\), occurs. ∎

---

# 3. Theorem P6-NC2 — the complete Parikh ladder is injective

Let

\[
s=s_1s_2\cdots s_M
\]

be a word over a finite alphabet, written from oldest to newest symbol.

The complete suffix-Parikh ladder

\[
(S_1,S_2,\ldots,S_M)
\]

determines \(s\) uniquely.

Indeed,

\[
S_1
\]

is the one-hot Parikh vector of the last symbol.

For \(m\ge2\),

\[
\boxed{
S_m-S_{m-1}
}
\]

is the one-hot Parikh vector of the symbol located exactly \(m\) positions from
the end.

Thus all literal symbols are recovered successively.

Therefore

\[
\boxed{
s\longmapsto(S_1,\ldots,S_M)
}
\]

is injective. ∎

---

# 4. Corollary — raw Abelian geometry is a linearization, not a compression

For an exact finite half-period cutoff \(K\), the natural complete
history-side Parikh datum contains

\[
S_1,\ldots,S_{2K-1}.
\]

By Theorem P6-NC2 this contains exactly enough information to reconstruct the
literal length-\((2K-1)\) suffix.

Hence:

\[
\boxed{
\text{complete exact suffix-Parikh memory}
\equiv
\text{literal suffix memory}
}
\]

at the information level.

This explains the earlier machine observation that the complete affine
obstruction signature was injective on the reachable full-L4, Kmax=6 pilot.

---

# 5. What this theorem does NOT say

It does not prove that every exact algorithm must explicitly store a literal
suffix.

It proves only that the most direct geometric replacement

> “store all exact suffix-Parikh quantities used by the boundary equations”

cannot be a genuine state compression.

A smaller representation may still exist by identifying histories that have
the same **future semantics** even though their raw ladders differ.

That is exactly what the counting/Krylov experiments demonstrate.

---

# 6. Consequence for the Paper-6 architecture

The roles are now sharply separated.

### Paper-4-type geometry

Provides an exact linear/affine coordinate system for the physical
obstructions:

\[
\Delta_{k,j}=0.
\]

### But geometry alone

does not remove the information content of the suffix:

\[
(S_1,\ldots,S_{2K-1})
\leftrightarrow
\text{literal suffix}.
\]

### Paper 6

must perform a genuine semantic reduction:

\[
\text{raw obstruction coordinates}
\longrightarrow
\text{future-equivalence / invariant future space}.
\]

This makes the central research question unavoidable rather than optional:

> **Which functions of the raw obstruction coordinates form the smallest
> invariant space needed for future counting?**

---

# 7. Relation to the selected-library transfer theorem

For a selected block library,

\[
M_{B,K}
=
\sum_{w\in B}A_w.
\]

The no-compression theorem says that simply rewriting the exact character
safety states in complete Parikh-ladder coordinates will not reduce their
number.

Therefore scalable progress must come from at least one of:

1. semantic quotienting of histories;
2. low-dimensional invariant linear future spaces;
3. compressed selected-library recognition/evaluation;
4. Paper-5-style family calculations that evaluate many literal transitions
   collectively;
5. structural restrictions that make some raw coordinates provably irrelevant
   for a declared selected library.

The current evidence supports a combination of these rather than a single raw
coordinate compression.

---

## Current verdict

**Useful negative theorem.**

The affine boundary formulation remains valuable because it exposes the
mathematics and enables family/bitset compilation.

But:

\[
\boxed{
\textbf{linearizing the obstruction geometry is not the same as compressing
the future dynamics.}
}
\]

That distinction should be explicit in Paper 6.
