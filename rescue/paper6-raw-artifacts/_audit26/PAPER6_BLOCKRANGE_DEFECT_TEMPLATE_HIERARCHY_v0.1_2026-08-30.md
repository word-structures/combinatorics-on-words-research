# PAPER 6 — BLOCK-RANGE DEFECT-TEMPLATE HIERARCHY v0.1
**Date:** 2026-08-30  
**Status:** proved theorem seed + exact finite-Q calibration; not a manuscript novelty claim

## 0. Why change from character cutoff K to block range Q?

For equal block length \(L\), every long half-period has a unique Euclidean
decomposition

\[
K=qL+r,
\qquad
q\ge1,\quad0\le r<L.
\]

The previous Paper-6 results show that:

- \(q\) carries the unbounded long-range profile dynamics;
- \(r\), together with the cutpoint offset, selects one of only \(L^2\) local
  boundary geometries;
- the local defect is supplied by the finite cut-profile family compiler.

This makes \(q\), not \(K\), the natural long-range scale.

---

# 1. Definition — block-range cutoff Q

Fix a selected equal-length block library \(B\subseteq\Sigma^L\).

For \(Q\ge0\), call a block assembly **Q-template-safe** when:

1. all fixed local forbidden factors, such as FORBID4, are absent;
2. every Abelian square with
   \[
   2\le K<L
   \]
   is absent;
3. for every
   \[
   1\le q\le Q,\qquad 0\le r<L,
   \]
   every valid cutpoint window with
   \[
   K=qL+r
   \]
   satisfies
   \[
   D_q+A-2B+C\ne0.
   \]

Here \(D_q\) is the adjacent \(q\)-block profile second difference and
\(A,B,C\) are supplied by the finite boundary cut-profile data.

---

# 2. Theorem BR1 — exact equivalence with character cutoff

Define

\[
\boxed{
K_{\max}(Q)=(Q+1)L-1.
}
\]

Then a block assembly is Q-template-safe if and only if its concatenated
character word contains no Abelian square with

\[
2\le K\le K_{\max}(Q)
\]

and satisfies the same fixed local restrictions.

Thus

\[
\boxed{
\mathcal L_Q^{\rm template}
=
\mathcal L_{K_{\max}=(Q+1)L-1}^{\rm character}.
}
\]

## Proof

Every half-period \(K\ge L\) has a unique form

\[
K=qL+r,\qquad q\ge1,\quad0\le r<L.
\]

The inequalities

\[
K\le(Q+1)L-1
\]

and

\[
q\le Q
\]

are equivalent.

For \(K<L\), the short-period clause handles the remaining half-periods.

For \(K\ge L\), the bounded-defect theorem gives the exact identity

\[
F(s)-2F(s+K)+F(s+2K)
=
D_q+A-2B+C.
\]

Hence the template test is exactly the character Abelian-square test for every
half-period in the declared range. ∎

---

# 3. Corollary BR2 — monotone exact hierarchy

Let

\[
\lambda_Q
\]

be the selected-library block growth rate under Q-template safety.

Then

\[
\boxed{
\lambda_0\ge\lambda_1\ge\lambda_2\ge\cdots\ge\lambda_{\rm exact}
}
\]

and

\[
\boxed{
\lambda_Q\downarrow\lambda_{\rm exact}.
}
\]

This is exactly the previously established half-period-cutoff hierarchy,
sampled at the natural block endpoints

\[
K_{\max}=(Q+1)L-1.
\]

The conceptual gain is that increasing \(Q\) adds only longer additive-profile
comparisons.

It does **not** add new local cutpoint geometries.

---

# 4. Corollary BR3 — the boundary catalogue saturates at fixed L

For every \(Q\), long-period character geometry uses the same

\[
\boxed{L^2}
\]

cutpoint geometries.

The same cut-profile descriptor families and the same bounded defect alphabet
are reused for all \(q=1,2,\ldots,Q\).

Therefore:

\[
\boxed{
\text{increasing long-range cutoff}
=
\text{extend additive range only}.
}
\]

This sharply separates the two sources of difficulty:

\[
\text{local character geometry: finite at fixed }L,
\]

\[
\text{long-range profile dynamics: unbounded in }Q.
\]

---

# 5. Independent exhaustive equivalence replay

A separate implementation compared:

- direct character-level half-period checking through
  \[
  K_{\max}=(Q+1)L-1;
  \]
- short-period checking plus the bounded-defect block-template formula.

Results:

| alphabet | L | blocks in assembly | Q | Kmax | assemblies | mismatches |
|---|---:|---:|---:|---:|---:|---:|
| binary | 2 | 6 | 2 | 5 | 4,096 | 0 |
| ternary | 2 | 5 | 2 | 5 | 59,049 | 0 |
| binary | 3 | 6 | 2 | 8 | 262,144 | 0 |
| ternary | 3 | 4 | 1 | 5 | 531,441 | 0 |

Total assemblies checked:

\[
\boxed{856\,730}
\]

with

\[
\boxed{0\text{ mismatches}.}
\]

This replay is independent of the earlier bounded-defect exhaustive test.

---

# 6. First complete full-L4 block-range checkpoint: Q=1

For the full L4 aa2fr selected library,

\[
Q=1
\]

is exactly

\[
K_{\max}=7.
\]

The exact finite transfer system has:

\[
\boxed{
10\,782
\text{ raw block-boundary states}
}
\]

\[
\to
\boxed{
1\,507
\text{ exact future-language classes}
}
\]

\[
\to
\boxed{
252
\text{ stable weighted counting classes}.
}
\]

The all-horizon counting partition is reached from finite count prefixes by

\[
\boxed{
1\to21\to180\to250\to252.
}
\]

Thus the first complete long-period block-range layer does not destroy the
semantic-compression phenomenon.

---

# 7. Exact scalar future dimension at Q=1

The total selected-library assembly-count sequence was generated exactly from
the 252-class weighted quotient.

Its prefix is

\[
60,\ 696,\ 4350,\ 22806,\ 108612,\ 546942,\ 2711034,\ 13526964,\ldots
\]

A quotient-independent modular Berlekamp--Massey discovery gave recurrence
degree

\[
153
\]

over three independent exploratory primes.

A separate CRT certification then reconstructed an exact integer recurrence of
order

\[
\boxed{153}.
\]

## Exact minimality certificate

A \(153\times153\) Hankel matrix built from the exact count sequence has rank

\[
153
\]

modulo \(1\,000\,000\,009\).

Therefore the corresponding integer Hankel minor is nonzero and

\[
\operatorname{rank}_{\mathbb Q}\ge153.
\]

The reconstructed order-153 integer recurrence holds on all 700 exact generated
terms, giving

\[
\operatorname{rank}_{\mathbb Q}\le153.
\]

Hence

\[
\boxed{
\text{scalar Hankel rank}=153.
}
\]

This is an exact result.

---

# 8. Persistent versus transient future dynamics

The exact recurrence polynomial contains the factor

\[
\boxed{x^7}.
\]

Therefore

\[
\boxed{
153=7+146
}
\]

splits into:

- 7 nilpotent/transient scalar dimensions;
- 146 persistent scalar future dimensions.

For comparison, at the preceding character cutoff \(K_{\max}=6\),

\[
97=4+93.
\]

So the first complete block-range step gives:

\[
\boxed{
K_{\max}=6:\ 97=4+93
}
\]

\[
\boxed{
Q=1,\ K_{\max}=7:\ 153=7+146.
}
\]

The future dimension grows, but remains tiny relative to the 10,782 raw
history states.

---

# 9. Numerical growth checkpoint

The weighted 252-class quotient has numerical Perron root approximately

\[
\boxed{
\lambda_{Q=1}\approx4.98153744.
}
\]

For the 60-block independent-choice denominator this gives the root survival
upper bound

\[
\boxed{
\lambda_{Q=1}/60
\approx0.0830256.
}
\]

This is a numerical calibration, not the main theorem.

It continues the monotone tightening from the earlier Kmax=6 value.

---

# 10. What this changes conceptually

The exact hierarchy can now be written as

\[
\boxed{
\text{short finite character geometry}
}
\]

\[
+
\]

\[
\boxed{
\text{fixed finite cut-profile/defect compiler}
}
\]

\[
+
\]

\[
\boxed{
q=1,2,3,\ldots
\text{ additive profile comparisons}
}.
\]

The local side does not grow with \(Q\).

The infinite limit is entirely a problem about the block-profile prefix-sum
walk decorated by a finite boundary response.

This is the cleanest formulation of the Paper-6 infinite difficulty obtained
so far.

---

# 11. Literature boundary

The following surrounding facts are classical:

- Abelian/additive template machinery for morphic words;
- counting and exponential growth of repetition-avoiding languages;
- linear recurrence / Hankel / weighted-automata theory;
- Berlekamp--Massey and black-box minimal-polynomial methods.

Recent work by Currie, Mol, Rampersad and Shallit also combines additive-power
decision methods with exponential lower bounds for the number of abelian
4-power-free binary words.

Therefore Paper 6 must not claim novelty merely for:

- counting repetition-free words;
- proving exponential growth exists;
- using templates;
- or recovering a recurrence.

The candidate contribution remains the **selected-library survival system**:

\[
\text{finite block selection}
+
\text{exact decorated Abelian templates}
+
\text{weighted continuation dynamics}
+
\text{relative survival entropy}.
\]

---

# 12. Next gate — P6-C7d

The next target is now entirely on the long-range side.

For the block-profile prefix walk

\[
P_m=\sum_{t<m}\Psi(b_t),
\]

study the decorated second-difference conditions

\[
\boxed{
P_{m+q}-2P_m+P_{m-q}=-E_g.
}
\]

Questions:

1. Can the weighted \(q\)-range transfer action be built directly from
   profile/cut-profile family states rather than character suffix states?
2. How does exact scalar future dimension grow with \(Q\)?
3. Is there a structural recurrence or invariant-observable closure that
   bounds this growth?
4. Can classical additive-template machinery be adapted from decision problems
   to selected-library **weighted counting**?
5. Can the L40 problem be attacked through this block-range hierarchy before
   constructing a literal character-cutoff automaton?

The character-boundary problem is no longer the main unknown.

The main unknown is now the weighted decorated additive process itself.
