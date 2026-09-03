# Paper 4 — Exact ABDEF Closure of 702 Known AF Pairs

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / FINITE RECORDED AF POPULATION`

## 1. Population

The input population contains

\[
\boxed{702}
\]

distinct recorded \((F,A)\) pairs.  Every pair is already exact-compatible
with the actual \(h_6\) contexts

\[
AF,\qquad FA,\qquad FAF.
\]

The population is the union of the currently retained sound AF families from
the closed/global-in-A F-component computations and the near-AFD component
searches.

Canonical input:

`PAPER4_KNOWN_EXACT_AF_PAIRS.tsv`.

## 2. Extension target

For each fixed \((A,F)\), the search asks whether there exist role-correct
\(E,B,D\) such that every actual \(h_6\) context not involving C is clean.

### E/B layer

\[
EA,\quad FE,\quad FB,\quad EB.
\]

### A/E/F trigrams

\[
AFE,\quad EAF,\quad FAF,\quad FEA.
\]

(`FAF` is already guaranteed by the AF input population and is retained as a
fail-closed regression condition in the direct generator.)

### D pairs and trigrams

\[
AD,\quad BD,\quad DF,
\]

and

\[
ADF,\quad BDF,\quad DFA,\quad DFB,\quad
EAD,\quad EBD,\quad FAD,\quad FBD.
\]

Every listed word is an actual bigram or trigram of \(h_6^\omega(a)\).

An extension passing all these constraints is called an ABDEF scaffold.

## 3. Two-orientation E closure

The first exhaustive/discovery implementation builds \(E\) from right to left,
so \(EA\) is incremental and \(FE\) is checked on complete E words.

At the standard node limits:
- 613 of the 702 AF pairs close with no cap;
- 89 pairs are retained for replay.

A separately oriented implementation builds \(E\) from left to right:
- \(FE\) is incremental;
- \(EA\) is checked on complete E words.

Of the 89 replay pairs:
- 69 close with no cap;
- 20 remain capped.

The remaining 20 are rerun in four five-pair chunks with a 20,000,000 E-node
limit.  All four chunks finish with

\[
\boxed{\text{CAPS}=0}
\]

and no ABDEF hit.

Therefore all 702 recorded AF pairs are exhaustively closed.

## 4. Result

\[
\boxed{
702\text{ exact }AF/FA/FAF\text{ pairs}
\longrightarrow
0\text{ ABDEF scaffolds}.
}
\]

This is a stronger obstruction than the earlier AFD-only or D-bridge gates:
the currently recorded AF population cannot be completed even to the
five-role no-C scaffold.

## 5. Epistemic boundary

This result does **not** prove that no ABDEF scaffold exists globally.

It proves nonextendability only for the 702 explicitly enumerated AF pairs in
the canonical input file.

A new AF pair outside this population can still extend.

Status:

\[
\boxed{\texttt{EXACT-CHECKED / RECORDED-POPULATION CLOSURE}}.
\]

Novelty:

\[
\boxed{\texttt{NOVELTY\_UNRESOLVED}}.
\]
