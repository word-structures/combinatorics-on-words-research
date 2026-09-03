# PAPER 6 — SIGNED RESPONSE-COCYCLE SEMANTICS v0.1
**Date:** 2026-08-30  
**Status:** theorem seed + exact Q1/Q2 audits; general linear part is classical

## Executive result

Paper 6 now has a precise answer to the question:

> What should replace literal-response bisimulation when the scientific output
> is future continuation counts?

The correct object is a **signed response defect**.

A current response relation generates candidate state pairs.

The signed defect produced by their matched successor branches is then tested
against the future-count Krylov space.

This gives:

\[
\boxed{
\text{response candidate}
\to
\text{signed defect}
\to
\text{future moments}
\to
\text{exact count semantics}.
}
\]

It is fundamentally different from ordinary positive bisimulation.

---

# 1. Twisted response relation

Let \(Q\) be the weighted block transition operator.

For a state \(s\), let \(L(s)\) be its legal literal next-block set.

Suppose an alphabet permutation \(\pi\) gives

\[
\boxed{
L(t)=\pi L(s).
}
\]

Pair block \(b\in L(s)\) with \(\pi b\in L(t)\).

Define

\[
\tau(s,b)
\]

as the successor history state.

---

# 2. Signed response cocycle

Define

\[
\boxed{
\Delta_{s,t,\pi}
=
\sum_{b\in L(s)}
\left(
e_{\tau(s,b)}
-
e_{\tau(t,\pi b)}
\right).
}
\]

For the unlabelled weighted operator,

\[
\boxed{
\Delta_{s,t,\pi}
=
(e_s-e_t)Q.
}
\]

Because \(\pi\) is a bijection of current legal block sets,

\[
|L(s)|=|L(t)|
\]

and therefore the one-step continuation totals agree automatically.

For \(n\ge1\),

\[
\boxed{
c_{n+1}(s)-c_{n+1}(t)
=
\Delta_{s,t,\pi}Q^{n-1}\mathbf1.
}
\]

Thus the entire future count difference is the scalar future action of one
signed response-defect vector.

---

# 3. Exact count-equivalence criterion

Let

\[
V_{\rm cnt}
=
\operatorname{span}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}.
\]

Then a twisted-response pair is all-horizon count equivalent if and only if

\[
\boxed{
\Delta_{s,t,\pi}
\in
V_{\rm cnt}^{\perp}.
}
\]

Equivalently,

\[
\boxed{
\Delta_{s,t,\pi}Q^k\mathbf1=0
\quad
\text{for all }k\ge0.
}
\]

For a finite \(N\)-state representation it is enough, by Cayley--Hamilton, to
check

\[
k=0,\ldots,N-1.
\]

This general criterion is ordinary finite-dimensional linear algebra and should
not be claimed as a new weighted-automata theorem.

The Paper-6 content is the structural production of \(\Delta\) from Abelian
response geometry and the behavior of these defects in selected block
languages.

---

# 4. Q2 candidate sieve

For the full L4 aa2fr Q2 system:

\[
2691
\]

equitable classes form

\[
422
\]

twisted-response orbits.

These contain

\[
\boxed{28\,670}
\]

candidate class pairs.

All automatically have equal \(c_1\).

Successive exact scalar moment tests give:

\[
\boxed{
28670
\overset{c_2}{\longrightarrow}
2457
\overset{c_3}{\longrightarrow}
102
\overset{c_4}{\longrightarrow}
3
\overset{c_5}{\longrightarrow}
2.
}
\]

The final two are exactly the independently certified all-horizon count merges:

\[
\boxed{
(224,1021),
\qquad
(1645,2244).
}
\]

Thus, in this finite system, current response symmetry plus four additional
scalar future moments isolates the exact count-equivalent pairs.

---

# 5. The unique Q2 near miss

The third pair surviving through horizon four is

\[
\boxed{
(363,1593).
}
\]

Its counts agree as

\[
1,\ 4,\ 9,\ 45
\]

through horizon four, but then split:

\[
\boxed{
183\ne244.
}
\]

This is a clean warning against stopping after an apparently stable short
prefix.

---

# 6. Q1 independent replay

At Q1:

- 252 equitable classes;
- 135 twisted-response orbits;
- 257 candidate pairs.

The same filter gives

\[
\boxed{
257
\overset{c_2}{\longrightarrow}
22
\overset{c_3}{\longrightarrow}
1
\overset{c_4}{\longrightarrow}
0.
}
\]

There are no Q1 count merges.

The last near miss has counts

\[
2,\ 27,\ 104
\]

before splitting at horizon four:

\[
\boxed{
594\ne572.
}
\]

This independently confirms the candidate-sieve role of response structure.

---

# 7. Why ordinary response-tree refinement is the wrong semantics

An exact labelled future-response tree was constructed on the Q2 equitable
representatives.

The number of response-tree types is:

| response depth | types |
|---:|---:|
| 0 | 1094 |
| 1 | 2432 |
| 2 | 2676 |
| 3 | **2691** |

At depths 0--2, the partition is too coarse and merges states with different
exact future counts.

At depth 3, it becomes the entire equitable quotient:

\[
\boxed{2691}.
\]

But exact count semantics has only

\[
\boxed{2689}
\]

classes.

Therefore no response-tree depth in this system equals exact count semantics:

\[
\boxed{
\text{depth }\le2:\ \text{too coarse},
}
\]

\[
\boxed{
\text{depth }\ge3:\ \text{too fine}.
}
\]

The two exact count merges are separated by the positive response tree even
though their signed branch defects cancel.

---

# 8. Maximal depth-2 counterexamples

There are exactly

\[
\boxed{15}
\]

depth-2 response-tree groups that still merge distinct count classes.

Every one is a pair.

Every one has identical continuation counts through horizon three and diverges
at the first possible next horizon:

\[
\boxed{h=4}.
\]

Thus these are sharp finite-depth counterexamples.

A representative example is

```text
aaabaaacaaabbbcabcccb
aaabaaacaaabbbcbacccb
```

with

\[
1,2,4,12,55,\ldots
\]

versus

\[
1,2,4,12,58,\ldots
\]

despite identical exact labelled response trees through depth two.

---

# 9. Ordinary synchronous bisimulation also fails

Among all 28,670 twisted-response pairs, require the **same alphabet
permutation** to match every corresponding successor response recursively.

The number of pairs surviving is:

\[
\boxed{
28670
\to
970
\to
39
\to
0
}
\]

for synchronous depths

\[
0,1,2,3.
\]

So there is no nontrivial depth-3 same-permutation response bisimulation among
the candidate quotient pairs.

Crucially, neither exact count merge even survives synchronous depth one.

Their equality comes from signed leak cancellation, not from a positive future
bijection.

---

# 10. The two exact count merges

For pair \((224,1021)\),

\[
\Delta
=
e_{930}+e_{933}-e_{1508}-e_{2033}.
\]

The successor row defects are

\[
Q_{930,*}-Q_{2033,*}=e_4,
\]

\[
Q_{933,*}-Q_{1508,*}=-e_4.
\]

Hence

\[
\Delta Q=0
\]

and therefore

\[
(e_{224}-e_{1021})Q^2=0.
\]

The second exact pair has the same opposite-sterile-impulse mechanism.

These are signed cancellations that no positive response refinement can
capture.

---

# 11. Response defects are NOT a small scalar future space

The candidate relation is useful as a sieve, but it does not by itself produce
a low-dimensional counting representation.

Over GF(2), using 1300 scalar horizons:

### Full Q2 state future behavior

\[
\operatorname{rank}=1179.
\]

### Twisted-response difference behaviors

\[
\boxed{
\operatorname{rank}=1177.
}
\]

### Exact-current-response difference behaviors

\[
\boxed{
\operatorname{rank}=1176.
}
\]

Thus response-defect scalar sequences span almost the entire Q2 scalar future
space.

So:

\[
\boxed{
\text{response cocycle is an excellent candidate/equivalence test}
}
\]

but

\[
\boxed{
\text{it is not a small persistent compression space}.
}
\]

---

# 12. Exact-current-response differences are usually persistent

There are 1094 exact current legal-response types and 1597 independent
within-response pair differences.

Their exact integer scalar counts first diverge as follows:

| first divergence | basis pairs |
|---:|---:|
| \(h=2\) | 1399 |
| \(h=3\) | 188 |
| \(h=4\) | 10 |

No basis pair remains equal beyond horizon four.

In GF(2) distribution dynamics, only 12 of the 1597 basis differences vanish
within four steps; 1585 remain nonzero after entering the stable image.

Therefore current response redundancy is overwhelmingly **not** future
irrelevance.

---

# 13. Field-specific rank caution

A GF(2) audit showed a stable rank 1166 for exact-response difference
distributions versus 1167 for the full stable image.

This initially suggested a codimension-one invariant.

An independent odd-prime random-right sketch modulo 65521 gives rank 1167 for
both the full \(Q^{12}\) image and the exact-response-defect image.

Therefore the GF(2) codimension-one drop is field-specific and must not be
promoted to a rational theorem.

This is retained as an explicit negative-control result.

---

# 14. Revised Paper-4 / Paper-5 / Paper-6 architecture

The division of labour is now precise.

## Paper 4
Produce exact physical obstruction and latent-fringe coordinates.

## Paper 5
Produce response-family relations and candidate correspondences.

## Paper 6
Turn each correspondence into a signed response cocycle

\[
\Delta
\]

and test/project it against the future-count semantics.

The response relation is not the quotient.

It is the **generator of structured defect vectors**.

---

# 15. What remains to be compressed

The signed response-cocycle space itself is almost as rich as the complete
scalar future space.

Therefore the remaining Paper-6 compression problem is not solved by response
relations.

The next target remains the persistent decorated additive block-profile
operator:

\[
\boxed{
P_{m+q}-2P_m+P_{m-q}=-E_g.
}
\]

The response cocycle should be retained as a front-end candidate sieve and a
certificate mechanism, not as the persistent state representation.

---

## Verdict

**The semantics question is now cleanly separated.**

Positive future-language / bisimulation structure is the wrong equivalence.

Exact count equivalence is a signed linear annihilator condition.

Paper-5-style response structure is highly valuable because it generates a
small, physically meaningful candidate set, but the final decision belongs to
Paper-6 future linear semantics.
