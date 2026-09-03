# PAPER 6 — RECENCY-FRAME ONE-BIT OBSERVABILITY THEOREM SEED v0.1
**Date:** 2026-08-30  
**Status:** exact Q2 theorem/certificate; general observability framework is classical

## Executive result

For the full L4 aa2fr block-range Q2 system, the complete exact statewise
continuation-count future can be measured injectively by a remarkably small
raw-history structural label:

\[
\boxed{
\text{four most recent complete block profiles}
+
\text{recency alphabet frame}
+
\text{one adjacency bit}.
}
\]

The additional bit is

\[
\boxed{
\varepsilon(s)=\mathbf 1[s_{-1}=s_{-2}].
}
\]

No unbounded age counter is needed.

The resulting family-sum measurement map has full rank on:

\[
\boxed{1179/1179}
\]

dimensions of the exact full future space and

\[
\boxed{1167/1167}
\]

dimensions of the persistent future space.

The result replicates independently modulo the odd primes

\[
65521
\quad\text{and}\quad
65519.
\]

Because the measurement and future matrices have integer entries, one
full-rank modular minor already certifies the corresponding rational rank.

---

# 1. Q2 exact future space

For the full L4 aa2fr selected library at

\[
Q=2,\qquad K_{\max}=11,
\]

the stable weighted quotient has

\[
2691
\]

classes.

The exact statewise continuation-count Krylov space is

\[
V_{\rm cnt}
=
\operatorname{span}_{\mathbb Q}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}
\]

with exact dimension

\[
\boxed{1179}.
\]

The scalar transient factor is \(x^{12}\), so the persistent cyclic future has
dimension

\[
\boxed{1167}.
\]

---

# 2. Recency alphabet frame

For a raw history \(s\), scan the characters from newest to oldest and record
the three distinct letters in order of most recent occurrence.

Map them canonically to

\[
a,\ b,\ c.
\]

Thus:

- the most recently occurring alphabet symbol is renamed \(a\);
- the second-most recently occurring distinct symbol is renamed \(b\);
- the third is renamed \(c\).

This defines a dynamic alphabet frame with at most

\[
\boxed{6}
\]

possible permutations.

After canonicalization, extract the Parikh profiles of the four most recent
complete L4 blocks.

Call this profile label

\[
R_4(s).
\]

---

# 3. Why recency-profile alone is insufficient

Using only \(R_4(s)\), the 218,298 reachable raw Q2 histories form

\[
\boxed{1796}
\]

measurement families.

The family-sum measurement rank is

\[
\boxed{1144/1179}
\]

modulo 65521 and also

\[
\boxed{1144/1179}
\]

modulo 65519.

Thus the recency-frame profile measurement misses exactly

\[
\boxed{35}
\]

directions of the exact full future space.

So:

\[
\boxed{
\text{recency frame + four profiles is not sufficient}.
}
\]

---

# 4. The age variable collapses to one bit

Let \(age_b(s)\) be the distance from the current end of the history to the
most recent occurrence of the symbol that is second in the recency order.

On the reachable Q2 raw histories,

\[
\boxed{
age_b\in\{1,2,3\}.
}
\]

Moreover,

\[
age_b=1
\]

if and only if the two most recent literal characters are different.

Hence the capped variable

\[
\min(age_b,2)
\]

contains exactly one bit of information:

\[
\boxed{
\varepsilon(s)=\mathbf1[s_{-1}=s_{-2}].
}
\]

Equivalently:

- \(\varepsilon=0\): the last two characters are different;
- \(\varepsilon=1\): the last two characters are equal.

The distinction between \(age_b=2\) and \(age_b=3\) is not needed for
observability.

---

# 5. One-bit structural measurement

Define the raw-history family label

\[
\boxed{
G(s)=\big(R_4(s),\varepsilon(s)\big).
}
\]

This produces

\[
\boxed{2083}
\]

nonempty raw-history families.

For a family \(g\), define the aggregate future measurement

\[
y_g(v)
=
\sum_{s\in g}v(s),
\]

where histories with the same exact equitable class contribute with their
raw multiplicity.

Let \(M_G\) be the resulting family-to-equitable-class integer aggregation
matrix.

---

# 6. Exact full-future observability certificate

Let

\[
K_{1179}
=
\left[
\mathbf1,Q\mathbf1,\ldots,Q^{1178}\mathbf1
\right].
\]

The measurement matrix is

\[
A_G=M_GK_{1179}.
\]

Exact modular elimination gives:

### Modulo 65521

\[
\boxed{
\operatorname{rank}(A_G)=1179.
}
\]

### Modulo 65519

\[
\boxed{
\operatorname{rank}(A_G)=1179.
}
\]

Since \(A_G\) has integer entries, a nonzero 1179-by-1179 minor modulo either
prime is a nonzero integer determinant.

Therefore

\[
\operatorname{rank}_{\mathbb Q}(A_G)\ge1179.
\]

But the exact rational future dimension is already known to be 1179.

Hence

\[
\boxed{
\operatorname{rank}_{\mathbb Q}(A_G)=1179.
}
\]

So the one-bit recency-profile family sums determine every vector in the exact
statewise future space uniquely.

---

# 7. Persistent observability

Use the shifted persistent Krylov block

\[
K_{\rm pers}
=
\left[
Q^{12}\mathbf1,
Q^{13}\mathbf1,
\ldots,
Q^{1178}\mathbf1
\right],
\]

which spans the exact 1167-dimensional persistent future.

The same 2083 structural family sums give:

### Modulo 65521

\[
\boxed{1167/1167}.
\]

### Modulo 65519

\[
\boxed{1167/1167}.
\]

Therefore they are also a complete rational measurement system for the
persistent future space.

---

# 8. Minimality inside this natural augmentation family

Within the specific structural family

\[
\text{recency-frame four-profile label}
+
\text{capped }age_b,
\]

there are three natural levels:

### No age information

\[
1796\text{ groups},
\qquad
\operatorname{rank}=1144.
\]

### One-bit cap

\[
\min(age_b,2)
\]

gives

\[
2083\text{ groups},
\qquad
\operatorname{rank}=1179.
\]

### Full age

\[
age_b\in\{1,2,3\}
\]

gives

\[
2226\text{ groups},
\qquad
\operatorname{rank}=1179.
\]

Therefore:

\[
\boxed{
0\text{ extra bits is insufficient;}
\quad
1\text{ bit is sufficient}.
}
\]

This is a minimality statement **within this recency-frame augmentation
scheme**. It is not a claim that no completely different structural
measurement system could use fewer total coordinates.

---

# 9. Primal/dual interpretation

This result must not be confused with a Markov-state theorem.

Earlier exact counterexamples show that recent profile data and current
response can fail to determine the future of an individual history.

The present theorem is dual:

> aggregate sums over structurally defined raw-history families are
> sufficient measurements of the exact linear future space.

Thus:

\[
\boxed{
\text{predictive state}
\neq
\text{complete observable coordinate system}.
}
\]

The family label need not define an autonomous history quotient in order for
its aggregate measurements to determine all future-count vectors.

This distinction is central to the current Paper-6 architecture.

---

# 10. Why the result is structurally interesting

The full raw Q2 history memory has

\[
218\,298
\]

reachable states.

The exact stable weighted quotient has

\[
2691
\]

classes.

The exact future space has dimension

\[
1179.
\]

Yet a raw-history measurement system built from:

- four block Parikh profiles;
- a six-state alphabet recency frame;
- one literal adjacency bit;

already observes the entire 1179-dimensional exact future.

The structural label is far smaller in descriptive complexity than the raw
literal suffix, even though its number of realized aggregate families is 2083.

---

# 11. What is NOT proved

This theorem does not yet prove that the one-bit profile label is an
autonomous update state.

It does not yet give a sparse local observable operator.

It does not prove that the same four-profile-plus-bit construction works for
all \(Q\), all block lengths, or all selected libraries.

It does not establish novelty relative to predictive-state, observable-operator,
weighted-automata, or combinatorics-on-words literature.

Those questions belong to the next theory and literature gates.

---

# 12. Immediate next gate

The next structural question is:

> Can the one-bit recency-profile measurements be updated or compiled from
> Paper-4/Paper-5 family data without enumerating the 2691 semantic states?

In parallel, the next literature review should explicitly search for prior
work on:

1. observable / dual representations of weighted automata;
2. predictive state representations and observable operator models;
3. Hankel bases chosen from coarse combinatorial feature families;
4. Abelian/additive template automata with weighted counting;
5. symmetry gauges / canonical alphabet relabellings in word combinatorics;
6. selected-block or codebook survival entropy under repetition constraints.

The literature audit should distinguish the classical observable framework
from the Abelian-specific one-bit structural measurement phenomenon.

---

## Current verdict

**Exact Q2 observability theorem.**

The cleanest current raw-history measurement label is

\[
\boxed{
\text{four recent block profiles}
+
\text{recency frame}
+
\text{one adjacency bit}.
}
\]

It is not yet a compressed Markov state.

It is, however, an exact complete measurement system for the full and
persistent Q2 continuation-count future spaces.
