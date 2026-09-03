# PAPER 6 — MATRIX-FREE SELECTED-LIBRARY APPLY AUDIT v0.1
**Date:** 2026-08-29  
**Status:** exact algorithmic research result; not a manuscript  
**Gate:** P6-C6 partial

## Executive result

The exact selected-library action

\[
v\longmapsto M_{B,K}v
\]

can be evaluated **without constructing the block-transition matrix or the
state–block edge graph**.

Two exact routes were validated:

1. trie/DFA evaluation for an arbitrary finite selected library;
2. profile-coefficient dynamic programming for profile-defined selected
   libraries.

Both are direct consequences of

\[
M_{B,K}=\sum_{w\in B}A_w.
\]

This removes the number of literal selected blocks from the central transfer
representation whenever the library has reusable structure.

The remaining bottleneck is the character-level safety state space.

---

# 1. Trie/DFA matrix-free evaluation

Let a trie or acyclic DFA recognize the finite block library \(B\).

For a library-recognizer state \(q\), define a vector-valued function \(F_q(v)\)
recursively from the leaves backwards.

At a terminal node,

\[
F_q(v)
\supseteq v.
\]

For every outgoing recognizer edge

\[
q\xrightarrow{\sigma}q',
\]

add

\[
A_\sigma F_{q'}(v).
\]

At the root,

\[
\boxed{
F_{\rm root}(v)=M_{B,K}v.
}
\]

Thus common word prefixes/suffix-DAG structure is evaluated once rather than
once per literal block.

A minimized acyclic DFA can replace the trie without changing the principle.

---

# 2. Profile-selected matrix-free evaluation

For a library defined by allowed profiles, use

\[
\mathcal G_{L,K}(\mathbf x)
=
\left(
x_aA_a+x_bA_b+x_cA_c
\right)^L.
\]

To apply a selected set of coefficient operators to \(v\), dynamic-program
vector-valued coefficients by depth and partial profile.

No literal word needs to be generated.

For a ternary alphabet, the number of profile cells at depth \(i\) is at most

\[
\binom{i+2}{2}.
\]

A crude unpruned bound for all profile transitions through length \(L\) is

\[
3\sum_{i=0}^{L-1}\binom{i+2}{2}
=
3\binom{L+2}{3}.
\]

At \(L=40\),

\[
3\binom{42}{3}
=
34\,440
\]

character-operator applications.

This bound is independent of the potentially exponential number of literal
length-40 words.

For a small declared target-profile set, pruning can reduce the count
substantially.

---

# 3. Exact clean-room audits

A random integer test vector was used on the full-memory exact safety state
space. The matrix-free result was compared with direct literal selected-block
evaluation.

## BAL3 L4, Kmax=4

- safety states: 414
- selected blocks: 30
- trie nodes: 61
- trie edges: 60
- literal character steps if every block is evaluated independently:
  \(30\times4=120\)
- profile-DP character-operator applications: **36**
- trie result = explicit result: **yes**
- profile-DP result = explicit result: **yes**

## INTERIOR L5, Kmax=5

- safety states: 1146
- selected blocks: 90
- trie nodes: 178
- trie edges: 177
- literal character steps:
  \(90\times5=450\)
- profile-DP character-operator applications: **75**
- trie result = explicit result: **yes**
- profile-DP result = explicit result: **yes**

## HASH30 L4, Kmax=5

- safety states: 1146
- selected blocks: 30
- trie nodes: 62
- trie edges: 61
- literal character steps:
  \(30\times4=120\)
- trie result = explicit result: **yes**

HASH30 is deliberately asymmetric and not profile-defined, so the trie route is
the relevant control.

---

# 4. Composition with the black-box recurrence solver

The previous audit established that total survival dynamics can be recovered
from scalar samples

\[
A_n=\alpha^\top M^n\mathbf1
\]

using black-box recurrence recovery.

This note establishes that each application of \(M\) can itself be evaluated
from the selected-library representation without materializing block edges.

Together:

\[
\boxed{
\text{library representation}
\to
\text{matrix-free }Mv
\to
\text{scalar Krylov samples}
\to
\text{exact recurrence}.
}
\]

Neither a dense block matrix nor a minimized counting quotient is mandatory.

---

# 5. What has been eliminated

For the scalar Paper-6 survival problem, the current architecture can avoid:

- dense block contact matrices;
- explicit state × block transfer matrices;
- explicit block-edge graph storage;
- counting-equivalence partition refinement;
- literal block enumeration for profile-selected libraries.

For arbitrary finite libraries, trie/DFA size replaces raw word-list size in
the operator evaluation.

---

# 6. What has NOT been eliminated

The character-level finite-cutoff safety representation is still present.

At cutoff \(K\), the naive exact suffix memory is length

\[
2K-1.
\]

The Parikh-ladder no-compression theorem shows that simply replacing that suffix
by the complete exact suffix-Parikh ladder does not reduce its information
content.

Therefore the **single central remaining bottleneck** is now:

\[
\boxed{
\text{how to apply the character-level safety operators }
A_a,A_b,A_c
\text{ without enumerating all literal safety suffix states.}
}
\]

This is exactly where Paper-4 obstruction geometry and Paper-5 family/reachable
methods must enter.

---

# 7. Revised P6-C7 target

Construct a structural oracle

\[
\operatorname{ApplyChar}_\sigma
\]

that performs the action of \(A_\sigma\) or its family-aggregated equivalent on
a compressed structural representation.

Then the whole current pipeline survives unchanged:

### arbitrary selected library

\[
\text{trie/DFA}
+
\operatorname{ApplyChar}
\to
M_Bv;
\]

### profile-selected library

\[
\text{profile coefficient DP}
+
\operatorname{ApplyChar}
\to
M_Bv;
\]

### total survival

\[
M_Bv
\to
\text{black-box recurrence}
\to
\lambda_{B,K}.
\]

The cutoff hierarchy then supplies certified convergence toward the exact
selected-library survival growth.

---

## Current verdict

**P6-C6: PARTIAL PASS.**

Block-library explosion is no longer the fundamental obstruction.

The research problem has been narrowed to one precise object:

\[
\boxed{
\textbf{compressed exact character-safety operator action.}
}
\]

That is now the highest-value bridge to Papers 4 and 5.
