# PAPER 6 — FRAGMENT TRANSPORT AND ACTIVATION THEOREM SEED v0.1
**Date:** 2026-08-30  
**Status:** exact algebraic theorem + exact Q2 observability corollary + modular cutoff-staircase evidence  
**Novelty caution:** the general Parikh/template algebra is close to classical template machinery; the selected-library structural-observability corollary is the Paper-6-specific content.

---

## 0. Why this theorem matters

The FULL-L4/Q2 structural measurement theorem originally appeared to require an
ad hoc extra bit

\[
\varepsilon(s)=\mathbf1[s_{-1}=s_{-2}].
\]

The present theorem identifies that bit as an exact Abelian boundary object.

After canonicalizing the alphabet by recency,

\[
\boxed{
\varepsilon
\quad\Longleftrightarrow\quad
S_2=\Psi(\operatorname{suf}_2(s)).
}
\]

Thus the Q2 measurement is not

> "four profiles plus a mysterious Boolean feature",

but

\[
\boxed{
\text{four whole-block Parikh profiles}
+
\text{the first nontrivial recency-gauged suffix-Parikh fragment}.
}
\]

The reason such a fragment can become future-relevant follows directly from
the block-shift geometry of the affine Abelian obstruction equations.

---

# 1. Setup

Let blocks have common length \(L\).

For a history \(s\), define the suffix-Parikh ladder

\[
S_m(s)=\Psi(\operatorname{suf}_m(s)),
\qquad S_0(s)=0.
\]

For two histories \(s,t\), define

\[
\delta_m(s,t)=S_m(s)-S_m(t).
\]

For a crossing Abelian-square test with half-period \(k\) ending after the
first character of an appended block (\(j=1\)), the old-history affine
requirement is

\[
\boxed{
R_{k,1}(s)=S_{2k-1}(s)-2S_{k-1}(s).
}
\]

This follows directly from the general Paper-6 boundary-affine formula.

---

# 2. Theorem FT1 — matched-block fragment transport

Let \(U\) be any common continuation of exactly \(q\) full blocks, hence

\[
|U|=qL.
\]

Then for every \(m\),

\[
\boxed{
\delta_m(sU,tU)=
\begin{cases}
0,&m\le qL,\\[1mm]
\delta_{m-qL}(s,t),&m>qL.
\end{cases}
}
\]

## Proof

If \(m\le qL\), the final \(m\) symbols lie entirely inside the identical
continuation \(U\), so the suffixes are equal.

If \(m>qL\), the final \(m\) symbols consist of the same \(qL\)-symbol
continuation preceded by the final \(m-qL\) symbols of the original histories.
The common continuation cancels in the Parikh difference. ∎

This is the exact "latent carrier" shift law.

---

# 3. Theorem FT2 — remainder-fragment activation

Let

\[
k=qL+r,
\qquad
q\ge1,
\qquad
1\le r<L.
\]

Append the same \(q\)-block continuation \(U\) to histories \(s,t\).

Then the difference of their \(j=1\) affine requirements is

\[
\boxed{
R_{k,1}(sU)-R_{k,1}(tU)
=
\delta_{qL+2r-1}(s,t)
-
2\delta_{r-1}(s,t).
}
\]

## Proof

By definition,

\[
R_{k,1}=S_{2k-1}-2S_{k-1}.
\]

Now

\[
2k-1=2qL+2r-1>qL,
\]

so FT1 gives

\[
\delta_{2k-1}(sU,tU)
=
\delta_{qL+2r-1}(s,t).
\]

Also

\[
k-1=qL+r-1.
\]

Since \(r\ge1\),

\[
k-1\ge qL,
\]

and FT1 gives

\[
\delta_{k-1}(sU,tU)
=
\delta_{r-1}(s,t),
\]

with \(r=1\) yielding \(S_0=0\).

Substitution proves the identity. ∎

---

# 4. Interpretation of FT2

FT2 exposes a direct future-activation channel:

\[
\boxed{
\text{current suffix fragment }S_{r-1}
\longrightarrow
\text{future }(k=qL+r,j=1)\text{ obstruction}.
}
\]

It enters with coefficient \(-2\).

Therefore a fragment that is currently invisible to a coarse block-profile
description need not be future-irrelevant.

This is the algebraic mechanism behind the earlier latent-memory and persistent
injection counterexamples.

FT2 does **not** say that every such fragment must be stored in every minimal
representation. Signed cancellations or aggregate observability can still make
a fragment redundant.

It says that the fragment is a genuine geometric input channel and cannot be
discarded merely because it is not currently active.

---

# 5. Recency gauge and the first nontrivial fragment

Assume a ternary selected system invariant under the full alphabet permutation
group \(S_3\).

Canonicalize each nonempty history by recency:

- most recently occurring symbol \(\mapsto a\);
- second-most recent distinct symbol \(\mapsto b\);
- third \(\mapsto c\).

Then

\[
\boxed{
S_1=(1,0,0)
}
\]

for every canonicalized history.

Thus \(S_1\) carries no state information.

For length two there are exactly two possibilities:

\[
\boxed{
S_2=
\begin{cases}
(2,0,0),&\text{last two literal symbols are equal},\\
(1,1,0),&\text{last two literal symbols are different}.
\end{cases}
}
\]

Hence the entire recency-gauged \(S_2\) coordinate is encoded by one bit:

\[
\boxed{
\varepsilon(s)=\mathbf1[s_{-1}=s_{-2}].
}
\]

This is an exact identity, not an empirical observation.

---

# 6. Corollary FT3 — the FULL-L4 second-range fragment staircase

Let \(L=4\) and consider the new half-periods in the \(q=2\) range:

\[
k=2L+r=8+r.
\]

For the \(j=1\) activation channel, FT2 gives the current fragment depth

\[
r-1.
\]

Therefore:

### \(k=9=2L+1\)

\[
r-1=0.
\]

The activated local fragment is

\[
S_0=0,
\]

so there is no new local fragment degree of freedom.

### \(k=10=2L+2\)

\[
r-1=1.
\]

The activated fragment is \(S_1\), but the recency gauge fixes

\[
S_1=(1,0,0).
\]

Again no new local fragment degree of freedom remains.

### \(k=11=2L+3\)

\[
r-1=2.
\]

The activated fragment is \(S_2\), which is the first nonconstant
recency-gauged suffix-Parikh coordinate.

It is exactly the adjacency bit \(\varepsilon\).

Thus:

\[
\boxed{
k=11
}
\]

is the first half-period in the \(q=2\) range at which FT2 exposes a
nontrivial recency-gauged local fragment channel.

This predicts the **location and nature** of the one-bit boundary decoration
seen in the Q2 observability audit.

---

# 7. Independent cutoff-staircase evidence

For the FULL L4 library, two independent odd-prime computations give:

| cutoff | future rank | profile-only measurement | + \(S_2\) |
|---:|---:|---:|---:|
| \(K=7\) | 153 | 3 profiles: **153** | 153 |
| \(K=8\) | 241 | 3 profiles: **241** | 241 |
| \(K=9\) | 337 | 3 profiles: 277; 4 profiles: **337** | 3 profiles + \(S_2\): 294 |
| \(K=10\) | 605 | 3 profiles: 316; 4 profiles: **605** | 3 profiles + \(S_2\): 355 |
| \(K=11\) | exact \(1179\) | 4 profiles: 1144 mod both primes | 4 profiles + \(S_2\): **1179** |

The K7--K10 target ranks in this table are replicated modular ranks, not yet
claimed as exact rational dimensions.

The K11 target dimension is independently exact over \(\mathbb Q\).

The staircase shows two distinct structural events:

1. at K9, a fourth whole-block profile layer becomes necessary in the tested
   profile family;
2. at K11, the first nontrivial recency-gauged fragment \(S_2\) becomes the
   successful boundary decoration.

This is precisely the division suggested by the affine geometry:

\[
\text{whole-block bulk depth}
+
\text{residual cut fragment}.
\]

---

# 8. Theorem FT4 — exact FULL-L4/Q2 structural observability

For FULL L4, \(Q=2\), \(K_{\max}=11\), define the raw-history structural label

\[
\Lambda(s)
=
\left(
\Psi(b_{-4}),
\Psi(b_{-3}),
\Psi(b_{-2}),
\Psi(b_{-1}),
S_2(s)
\right)
\]

after recency-gauge canonicalization.

Equivalently, replace \(S_2\) by the adjacency bit

\[
\varepsilon(s)=\mathbf1[s_{-1}=s_{-2}].
\]

Let \(M_\Lambda\) be the integer aggregation matrix summing raw histories in
each \(\Lambda\)-family onto the 2691-state exact weighted quotient.

Let

\[
V_{\rm cnt}
=
\operatorname{span}_{\mathbb Q}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}.
\]

The exact rational dimension is

\[
\dim_{\mathbb Q}V_{\rm cnt}=1179.
\]

The family measurement map is injective on \(V_{\rm cnt}\):

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
\left(
M_\Lambda|_{V_{\rm cnt}}
\right)
=
1179.
}
\]

Likewise, on the exact persistent cyclic future space,

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
\left(
M_\Lambda|_{V_{\rm pers}}
\right)
=
1167.
}
\]

## Certificate

Modulo both primes

\[
65521,\qquad65519,
\]

the measured full-future matrix has rank 1179, and the measured persistent
matrix has rank 1167.

All matrices are integer matrices.

A full-rank modular minor is therefore a nonzero integer minor, giving the
rational lower bound. The independently exact rational future dimensions give
the matching upper bounds.

Hence both ranks are exact over \(\mathbb Q\). ∎

---

# 9. What is exact about the "one bit" statement?

The following statement is exact:

> **four recency-gauged block profiles plus \(S_2\) are sufficient for complete
> Q2 future observability.**

The identification

\[
S_2\leftrightarrow\varepsilon
\]

is also exact.

The current evidence that four profiles **without** \(S_2\) have rank exactly
1144 is slightly weaker:

\[
1144
\]

is reproduced modulo both 65521 and 65519, and the persistent measurement rank
is 1138 modulo both primes.

That does **not by itself prove** that the rational profile-only rank is
exactly 1144/1138, because modular rank is a lower bound on rational rank.

Therefore the manuscript-safe wording at this checkpoint is:

> profile-only measurements are strongly rank-deficient in two independent
> modular reductions, while adding the geometrically predicted \(S_2\)
> fragment yields exact rational full observability.

An exact rational upper certificate for the profile-only measurement remains a
useful optional closure task.

---

# 10. General theorem direction

FT2 suggests a natural family of structural measurements for arbitrary block
range:

\[
\boxed{
G_B\text{-symmetry gauge}
+
\text{recent whole-block Parikh profiles}
+
\text{selected suffix/cut Parikh fragments}.
}
\]

The fragment depths should not be guessed ad hoc.

For a newly admitted half-period

\[
k=qL+r,
\]

the \(j=1\) activation theorem exposes \(S_{r-1}\) as a direct future input
channel after \(q\) matched blocks.

This gives a geometry-derived candidate set of boundary decorations.

The remaining open theorem is to prove when such a family is **complete for
the continuation-Hankel space**, rather than merely geometrically capable of
affecting legality.

---

# 11. Conjecture — symmetry-gauged profile-fragment observability

Let \(B\subseteq\Sigma^L\) be a finite selected library and \(G_B\) its exact
alphabet symmetry group.

For a finite block-range cutoff \(Q\), there should exist:

- a recent profile depth \(m=m(B,L,Q)\);
- a finite set of fragment depths
  \[
  R=R(B,L,Q)\subseteq\{1,\ldots,L-1\};
  \]
- a \(G_B\)-compatible canonical gauge;

such that family sums indexed by

\[
\boxed{
\big(
\text{last }m\text{ block profiles},
\{S_r:r\in R\},
G_B\text{-gauge}
\big)
}
\]

are injective on the exact continuation-count Krylov space.

The present cross-instance evidence supports the form of this conjecture, not
a universal formula for \(m\) or \(R\).

In FULL L4/Q2:

\[
m=4,\qquad R=\{2\}.
\]

The fragment \(S_2\) is predicted directly by FT2.

---

## Verdict

This theorem seed supplies the missing geometric explanation for the one-bit
Q2 result:

\[
\boxed{
\text{the bit is a transported cut-profile fragment}.
}
\]

The new Paper-6 target is no longer "find a lucky extra feature".

It is:

> derive the complete structural measurement family from the activated
> whole-profile and boundary-fragment channels of the Abelian geometry.
