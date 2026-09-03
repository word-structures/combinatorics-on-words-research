# PAPER 6 — PROFILE-FAMILY OBSERVABILITY THEOREM SEED v0.1
**Date:** 2026-08-30  
**Status:** exact Q1/Q2 theorem seed + classical observability boundary

## Executive result

The main structural lesson of Paper 6 has changed.

A coarse block-profile descriptor may be too weak to serve as a predictive
history state and yet be strong enough to serve as a **complete linear
measurement system** for the exact future-count function space.

For the full L4 aa2fr Q2 system:

\[
\boxed{
\dim_{\mathbb Q}V_{\rm cnt}=1179.
}
\]

Partition the 2691 weighted semantic states by the ordered Parikh profiles of
their four most recent complete blocks.

There are

\[
\boxed{1434}
\]

realized profile fibers.

For each fiber \(G\), define the aggregate measurement

\[
\boxed{
\ell_G(v)=\sum_{s\in G}v(s).
}
\]

Then the combined measurement map

\[
\mathcal M_4:
V_{\rm cnt}\to\mathbb Q^{1434},
\qquad
v\mapsto(\ell_G(v))_G
\]

is injective.

Thus the complete all-state continuation-count future can be represented
exactly by structural **family measurements**, even though the family label is
not a valid predictive state.

---

# 1. General measurement lemma

Let

\[
V\subseteq\mathbb Q^N
\]

be an \(r\)-dimensional linear future space.

Let \(F\in\mathbb Z^{N\times m}\) have columns equal to indicator vectors (or
more general integer-valued structural observables).

The measurement map is

\[
\mathcal M(v)=F^\top v.
\]

If

\[
\operatorname{rank}_{\mathbb Q}(F^\top K)=r
\]

for one basis matrix \(K\) of \(V\), then

\[
\boxed{\mathcal M|_V\text{ is injective}.}
\]

Consequently:

1. every future vector \(v\in V\) is uniquely determined by its structural
   measurements;
2. any \(r\) measurement rows giving a nonsingular minor form exact
   coordinates on \(V\);
3. because \(V\) is invariant under the future operator, there exists a unique
   induced linear update on the measurement image.

This is classical finite-dimensional observability / Hankel-basis linear
algebra. It is not a Paper-6 novelty claim.

---

# 2. Q2 exact future space

For full L4 aa2fr at

\[
Q=2,\qquad K_{\max}=11,
\]

the independently certified exact hierarchy is

\[
218298
\to
2691
\to
2689
\to
1179
=
12+1167.
\]

Here 1179 is the exact rational dimension of

\[
V_{\rm cnt}
=
\operatorname{span}
\{
\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots
\}.
\]

The degree-1179 integer recurrence polynomial annihilates the complete
2691-coordinate vector future.

The persistent image after the nilpotent part is removed has exact dimension

\[
\boxed{1167}.
\]

---

# 3. Ordered recent-profile measurements

For each weighted state \(s\), let

\[
R_k(s)
=
\big(
\Psi(b_{-k+1}),\ldots,\Psi(b_0)
\big)
\]

be the ordered profiles of its \(k\) most recent complete blocks, with short
initial histories marked separately.

For each realized value \(\gamma\) of \(R_k\), define the fiber

\[
G_\gamma=\{s:R_k(s)=\gamma\}
\]

and its aggregate measurement

\[
\ell_\gamma(v)
=
\sum_{s\in G_\gamma}v(s).
\]

These measurements use no literal internal block order.

---

# 4. Exact Q2 window threshold

Modulo the prime 65521, the measurement ranks are:

| recent profile window | realized fibers | full future rank | persistent rank |
|---:|---:|---:|---:|
| 1 | 12 | 12 | 12 |
| 2 | 130 | 130 | 130 |
| 3 | 711 | 701 | 697 |
| **4** | **1434** | **1179** | **1167** |

The last-four result independently repeats modulo

\[
65519:
\qquad
1179,\ 1167.
\]

Because the matrices have integer entries, one full-rank modular minor is
already an exact rational lower-bound certificate.

The independently known rational upper bounds are 1179 and 1167.

Therefore:

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
(\mathcal M_4|_{V_{\rm cnt}})
=
1179
}
\]

and

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
(\mathcal M_4|_{V_{\rm pers}})
=
1167.
}
\]

This is an exact rational result.

---

# 5. Minimality within the recent-profile-window family

For \(k=1,2,3\), the number of realized fibers is respectively

\[
12,\quad130,\quad711.
\]

All are strictly less than

\[
1179.
\]

No measurement system with only one aggregate value per such fiber can be
injective on the 1179-dimensional full future space.

At \(k=4\), there are 1434 fibers and the rank is exactly 1179.

Hence:

\[
\boxed{
k=4
}
\]

is the **first possible and first successful** recent-profile window in this Q2
calibration.

This is an exact finite-system minimality statement, not an asymptotic theorem
in Q or L.

---

# 6. Explicit coordinate subset

Gaussian elimination modulo 65521 selects

\[
\boxed{1179}
\]

of the 1434 last-four-profile fibers whose 1179×1179 measurement minor is
nonsingular.

Its determinant is therefore nonzero modulo 65521 and hence nonzero over the
integers.

These 1179 concrete profile-family sums form an exact rational coordinate
system for the complete Q2 continuation-count future.

A machine-readable list of the selected profile fibers is included in the
certificate.

---

# 7. Primal/dual separation

This result does **not** say:

> the last four block profiles determine the future of an individual history.

That statement is false.

Paper 6 already has exact counterexamples where histories share:

- the exact current legal literal block set;
- even the ordered profiles of the last five complete blocks;

yet have different persistent continuation counts.

Thus the profile partition is not a predictive-state partition.

What is true is dual:

\[
\boxed{
\text{individual profile label: not state-sufficient}
}
\]

but

\[
\boxed{
\text{aggregate sums over profile fibers: future-space sufficient}.
}
\]

There is no contradiction.

A collection of coarse fiber-sum functionals can separate a low-dimensional
linear function space even though the fibers themselves contain histories with
different futures.

This primal/dual distinction is one of the clearest conceptual results in the
current Paper-6 program.

---

# 8. Q1 independent replication

At Q1 the exact rational dimensions are

\[
153=7+146.
\]

Two independent odd primes 65521 and 65519 give:

### Exact current legal-response fibers

\[
\boxed{
153/153
}
\]

for the full future and

\[
\boxed{
146/146
}
\]

for the persistent future.

### Twisted response + \(D_1\)

With 225 structural fibers:

\[
\boxed{
153/153,\qquad146/146.
}
\]

### Last-four profiles alone

Only

\[
144/153,\qquad141/146.
\]

Thus the general **measurement principle** replicates at Q1, but the simplest
complete measurement family changes with the block-range level.

No universal fixed descriptor should yet be claimed.

---

# 9. Relation to classical theory

The abstract framework is classical.

Weighted-automata theory describes minimal realizations via forward/backward
spaces and Hankel rank.

Observable operator models and predictive state representations likewise use
linear measurements/predictions rather than hidden Markov state labels.

Therefore Paper 6 must not claim the general principle

> “a low-dimensional future can be represented by a sufficient family of
> linear measurements”

as new.

The Abelian-specific research content is instead:

1. physically meaningful measurements arising from block profiles,
   obstruction geometry and selected-library response families;
2. exact certificates that such simple measurements are complete for the
   selected-library survival future;
3. a route to computing those measurements by Paper-4/Paper-5 family
   compilers rather than literal state enumeration;
4. integration with the certified block-range limit and survival entropy.

---

# 10. Algorithmic meaning

The theorem suggests a new target.

Do not construct a structural Markov state.

Construct the family measurements directly.

For Q2:

\[
y_n(\gamma)
=
\sum_{s:R_4(s)=\gamma}
(Q^n\mathbf1)(s).
\]

The 1434-dimensional vector \(y_n\) contains enough information to reconstruct
the exact 1179-dimensional future vector within \(V_{\rm cnt}\).

The next question is therefore:

> can \(y_{n+1}\) be computed directly from cut-profile / selected-library
> family operations without first expanding the 2691 semantic states?

If yes, Paper 4/5 supply the measurement compiler and Paper 6 supplies the
minimal observable realization.

---

# 11. Next gate

Construct an **observable-operator realization** using structural family sums.

Concrete tasks:

1. use the explicit 1179 selected last-four-profile measurements as
   coordinates;
2. construct the induced update operator on these coordinates;
3. measure its sparsity / block structure / profile-shift structure;
4. attempt to compute the coordinate update from profile and boundary-family
   tensors directly;
5. replay the Q2 recurrence and Perron root from this representation;
6. then lift the construction to Q3 without first building the literal suffix
   automaton.

---

## Verdict

**Major positive result.**

The failed search for a compressed deterministic history state has produced a
better object:

\[
\boxed{
\textbf{a structurally meaningful complete measurement system for the exact
linear future space.}
}
\]

At Q2, four recent block profiles are too weak as a state but exactly strong
enough, when used as family aggregates, to observe the entire future-count
dynamics.
