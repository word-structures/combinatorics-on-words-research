# PAPER 6 — ASYMPTOTIC FUTURE DECOMPOSITION v0.1
**Date:** 2026-08-29  
**Status:** exact linear-algebra research result; not a manuscript

## 1. The cyclic future polynomial

Let \(Q\) be an exact finite weighted counting quotient and let

\[
v=\mathbf1.
\]

The future-count Krylov space is

\[
V(v)=\operatorname{span}\{v,Qv,Q^2v,\ldots\}.
\]

Let the minimal polynomial of the cyclic vector \(v\) be

\[
m_v(x)=x^a g(x),
\qquad g(0)\neq0.
\]

Because \(x^a\) and \(g\) are coprime, the cyclic module splits into a
nilpotent and an invertible part.

For a cyclic module:

\[
\dim V(v)=\deg m_v=a+\deg g.
\]

Moreover,

\[
\dim\operatorname{span}\{Q^a v,Q^{a+1}v,\ldots\}
=
\deg g.
\]

This gives a precise separation between:

- a finite nilpotent/transient counting component of dimension \(a\);
- the persistent long-term future component of dimension \(\deg g\).

The word *transient* here refers to the cyclic linear representation. It is not
identical to the number of transient graph states.

---

## 2. Exact pilot decompositions

| library | Kmax | exact counting classes | exact Krylov rank | \(a\) | persistent future dimension |
|---|---:|---:|---:|---:|---:|
| BAL3 L4 | 6 | 16 | 7 | 2 | 5 |
| INTERIOR L5 | 5 | 34 | 27 | 3 | 24 |
| HASH30 L4 | 5 | 76 | 47 | 5 | 42 |
| ALL L4 | 5 | 73 | 53 | 3 | 50 |
| ALL L4 | 6 | 152 | 97 | 4 | 93 |

For full L4, \(K_{\max}=6\),

\[
\boxed{97=4+93}.
\]

The exact recurrence polynomial has an \(x^4\) factor.
After removing that factor, the remaining degree-93 polynomial factors over
\(\mathbb Q\) as

\[
(x-1)\,h_{92}(x),
\]

where \(h_{92}\) is irreducible in the exact factorization returned by the
current computation.

The ranks of powers of the 152-state quotient are

\[
116,\ 104,\ 98,\ 96,\ 96,\ldots
\]

for \(Q,Q^2,Q^3,Q^4,Q^5,\ldots\).

The persistent cyclic future space has dimension 93; the stable image of the
whole quotient has dimension 96. Thus the all-histories operator contains
three persistent directions that are not reached from the specific terminal
observable \(\mathbf1\).

This distinction is important:

\[
\text{operator state complexity}
\neq
\text{future-count complexity from }\mathbf1.
\]

---

## 3. Complete-library recoding control

For complete aa2fr block libraries, the persistent future dimensions show
substantial stability across block lengths, but not universal invariance.

For \(K_{\max}=2,3,4\), all tested block lengths \(L=4,5,6\) give persistent
dimensions

\[
4,\ 13,\ 29.
\]

For \(K_{\max}=5\):

- \(L=4\): \(53=3+50\)
- \(L=5\): \(52=2+50\)
- \(L=6\): \(52=2+50\)

The persistent component is 50 in all three recodings, while the nilpotent
initialization component changes.

At \(K_{\max}=6\) the persistent dimensions are no longer identical:

- \(L=4\): 93
- \(L=5\): 95
- \(L=6\): 94

Therefore no blanket “block-length-invariant dimension” claim should be made.

The correct explanation is the operator recoding theorem in the companion
library-polynomial note: complete libraries evaluate powers of the
character-level safety operator. Minimal polynomials of matrix powers can
change through accessibility and eigenvalue collisions.

---

## 4. Research implication

Paper 6 should distinguish three complexities:

\[
N_{\rm state},
\qquad
r_{\rm persistent},
\qquad
a_{\rm transient}.
\]

For asymptotic survival entropy, the persistent component is the structurally
relevant one.

For exact short-length enumeration, both components matter.

This separation prevents recoding/initialization artefacts from being confused
with the intrinsic long-term survival dynamics.
