# Paper 4 — F-Conditioned Global Exclusion Theorem and 17-F Certificate

**Version 1.0 — 2026-08-27**  
**Status:** theorem `PROVED`; 17-family computation `EXACT-CHECKED`.

## 1. Purpose

Component exclusion is local in the A-swap graph.

The present result is stronger in a different direction: fix the entire
F-role block
\[
F\in\{a,b,c\}^{40},
\qquad
\Psi(F)=(19,11,10),
\]
and exhaust **all** A-role words in the full profile space that can coexist
with that F.

This removes any dependence on the A-swap component in which \(H(a)\) lies.

## 2. Fixed-F AF family

For a fixed role-correct F, define

\[
\mathcal A(F)
=
\left\{
A:
\Psi(A)=(15,14,11),
\ AF,\ FA,\ FAF
\text{ are period-}2,\ldots,40\text{ clean}
\right\}.
\]

Internal cleanliness of A is included in the exact enumeration.

The set \(\mathcal A(F)\) is enumerated exhaustively over the full A-profile
space.

## 3. Complete AFD-D family

For every \(A\in\mathcal A(F)\), define

\[
\mathcal D(A,F)
\]

as every role-correct D satisfying the actual \(h_6\) contexts

\[
AD,\quad DF,\quad ADF,\quad DFA,\quad FAD.
\]

This is the complete AFD-compatible D set.

## 4. C-support and B-support of a D

A D can occur in a complete coding only if it supports both the C and B
branches.

### C-support

Define

\[
D\in\mathcal D_C(A,F)
\]

when \(D\in\mathcal D(A,F)\) and there exists at least one role-correct C such
that

\[
AC,\quad DC
\]

are clean.

These two bigrams are actual factors of \(h_6^\omega(a)\), so C-support is a
necessary condition.

### B-support

Define

\[
D\in\mathcal D_B(A,F)
\]

when \(D\in\mathcal D(A,F)\) and there exists a role-correct B satisfying

\[
FB,\quad BDF,\quad DFB,\quad FBD.
\]

These are actual \(h_6\) factors.

A **D-bridge** is a D in the intersection

\[
\mathcal D_C(A,F)\cap\mathcal D_B(A,F).
\]

## 5. Fixed-F global exclusion theorem

> **Theorem.**  
> Let F be a fixed role-correct length-40 word.  Suppose the exhaustive
> computation over the full A-profile space finds
> \[
> \mathcal D_C(A,F)\cap\mathcal D_B(A,F)=\varnothing
> \]
> for every \(A\in\mathcal A(F)\).
> Then no complete six-role coding H satisfying the prescribed role Parikh
> vectors and the period-\(2,\ldots,40\) \(h_6\)-language constraints can have
> \[
> H(f)=F.
> \]

### Proof

Assume a valid full coding H has \(H(f)=F\). Set

\[
A=H(a),\quad D=H(d),\quad B=H(b),\quad C=H(c).
\]

Because \(af,fa,faf\) are actual macro factors, the true A belongs to
\(\mathcal A(F)\).

Because \(ad,df,adf,dfa,fad\) are actual factors, the true D belongs to
\(\mathcal D(A,F)\).

Because \(ac,dc\) are actual factors, the true C witnesses

\[
D\in\mathcal D_C(A,F).
\]

Because \(fb,bdf,dfb,fbd\) are actual factors, the true B witnesses

\[
D\in\mathcal D_B(A,F).
\]

Thus the true D belongs to the intersection, contradicting its exhaustive
emptiness.  Hence no valid coding can have \(H(f)=F\). \(\square\)

## 6. The 17 F blocks

The 40 sound AFD modules currently represented in the corrected ledger use

\[
\boxed{17}
\]

distinct F-role blocks.

Each of these 17 blocks was subjected to the **global** fixed-F protocol above.

The family totals are:

\[
\boxed{
200\text{ AF-compatible A words}
}
\]

across the 17 fixed-F families,

\[
\boxed{
892\text{ complete AFD-compatible D records},
}
\]

of which

\[
\boxed{
424
}
\]

have C-support.

Exact B-support search over those 424 C-supporting D records traversed

\[
\boxed{
142\,482\,657
}
\]

B-DFS nodes.

Result:

\[
\boxed{
0\text{ D-bridges}.
}
\]

Therefore every one of the 17 concrete F blocks is globally excluded:

\[
\boxed{
H(f)\notin\{F_1,\ldots,F_{17}\}
}
\]

for every complete solution H of the prescribed length-40 role system.

## 7. Family table

| family | AF-compatible A | AFD-D | C-supporting D | D-bridges |
|---:|---:|---:|---:|---:|
| F1 | 15 | 40 | 0 | 0 |
| F2 | 15 | 98 | 0 | 0 |
| F3 | 5 | 82 | 33 | 0 |
| F4 | 3 | 60 | 13 | 0 |
| F5 | 3 | 80 | 31 | 0 |
| F6 | 8 | 2 | 0 | 0 |
| F7 | 17 | 2 | 2 | 0 |
| F8 | 17 | 2 | 2 | 0 |
| F9 | 22 | 3 | 3 | 0 |
| F10 | 17 | 5 | 5 | 0 |
| F11 | 17 | 5 | 5 | 0 |
| F12 | 17 | 5 | 5 | 0 |
| F13 | 17 | 114 | 70 | 0 |
| F14 | 18 | 377 | 247 | 0 |
| F15 | 3 | 8 | 4 | 0 |
| F16 | 3 | 8 | 4 | 0 |
| F17 | 3 | 1 | 0 | 0 |
| **total** | **200** | **892** | **424** | **0** |

The A totals are family-counted; the theorem is applied separately to each
fixed F.

## 8. Strongest individual family

F14 is

```text
cbbbabbcaaabaacccbbaaacccaaabaaacaaabbca
```

and has the largest conditioned family:

\[
18\ A
\to
377\ D
\to
247\text{ C-supporting D}.
\]

A separate unfiltered ABDF search over all 377 D records found 12 ABDF
\((A,D)\) pairs, but their intersection with the 247 C-supporting pairs is
empty.

Thus F14 has been attacked from both sides:

\[
\mathcal D_C\cap\mathcal D_B=\varnothing.
\]

## 9. Provenance

Aggregate:
- `PAPER4_DBRIDGE_17F_AGGREGATE.tsv`

For each \(i=1,\ldots,17\):
- `PAPER4_DBRIDGE_Fi_A_OUTPUT.txt`
- `PAPER4_DBRIDGE_Fi_D_OUTPUT.txt`
- `PAPER4_DBRIDGE_Fi_ACD_OUTPUT.txt`
- `PAPER4_DBRIDGE_Fi_BRIDGE_OUTPUT.txt`
- corresponding AF-A / AFD-D / ACD-D / bridge TSV files where materialized.

F14 cross-check:
- `RAREF_PAPER4_FIXED_F_GLOBAL_D_TO_B_OUTPUT.txt`
- `RAREF_PAPER4_FIXED_F_GLOBAL_ABDF_PAIRS.tsv`
- `RAREF_PAPER4_FIXED_F_GLOBAL_DBRIDGE_INTERSECTION.txt`

## 10. Epistemic boundary

This theorem excludes **17 exact F blocks**, not all possible F-role words.

It does not establish:
- finiteness of the set of possible F blocks;
- global nonexistence of a length-40 coding;
- a positive Mäkelä solution.

Status:

\[
\boxed{\texttt{EXACT-CHECKED / GLOBAL-IN-A FOR FIXED F}}
\]

Novelty:

\[
\boxed{\texttt{NOVELTY\_UNRESOLVED}}.
\]
