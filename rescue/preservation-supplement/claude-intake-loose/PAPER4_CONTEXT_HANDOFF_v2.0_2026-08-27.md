# Paper 4 — Context Handoff / Recovery Pack

**Version 2.0 — 2026-08-27**  
**Purpose:** lossless recovery point for a new context window.

## Canonical scientific state

Problem: construct a length-40 ternary coding \(H\) on the six-letter
Rao--Rosenfeld \(h_6\) core so that \(H(h_6^\omega(a))\) avoids all Abelian
squares of half-period at least 2.

Current target status:

- complete positive \(H\): `NOT FOUND`;
- Mäkelä problem: `OPEN`;
- novelty: `NOT_ESTABLISHED / NOVELTY_UNRESOLVED`;
- finite \(p=2,\ldots,40\) reduction: `PROVED + EXACT-CHECKED`;
- Gate T long-period architecture: `PROVED + EXACT-CHECKED`;
- fail-closed final H certifier exists;
- current exact F-role exclusion lower bound: **20786 distinct words**;
- strongest fully second-implementation replayed population core: **9693**;
- later increments to 20786 are exact-computed but need one consolidated
  second population replay before submission;
- current no-C local-search record: **31 violations** over the 12 actual
  no-C trigrams;
- exact ABDEF scaffold: `OPEN`.

## Immediate research priority

The single highest-priority event is

\[
\boxed{\text{first exact }ABDEF}.
\]

Search order:

\[
F\to\text{all exact }A\to E\to B\to D.
\]

D must be checked under all actual D-containing contexts simultaneously:

\[
D,\ AD,\ BD,\ DF,
\]

\[
ADF,\ BDF,\ DFA,\ DFB,\ EAD,\ EBD,\ FAD,\ FBD.
\]

If exact ABDEF is found:

1. stop F-ledger expansion;
2. enumerate C immediately under all remaining actual \(h_6\) contexts;
3. if \(ABCDEF=H\) exists, run the independent 22-trigram finite verifier;
4. only finite PASS proceeds to Gate T;
5. only finite PASS + Gate T PASS can support a solution claim.

## No-C actual trigram objective

\[
ADF,\ AFE,\ BDF,\ DFA,\ DFB,\ EAD,\ EAF,\ EBD,\ FAD,\ FAF,\ FBD,\ FEA.
\]

Current near-31 histogram:

- ADF 9
- AFE 1
- BDF 4
- DFA 4
- DFB 5
- EAD 0
- EAF 2
- EBD 1
- FAD 0
- FAF 1
- FBD 2
- FEA 2

This near-31 object is a heuristic search point only, not a certificate.

## Hard governance

- no h=8;
- no D40;
- no Git mutation unless the user explicitly requests it;
- never claim "solved" without an independently verified complete H passing
  finite gate and Gate T;
- use `NOVELTY_UNRESOLVED` until specialist database audit;
- all negative pruning predicates must come from an actual \(h_6\)
  bigram/trigram or a proved implication.

## Core exact factor language

Bigrams:
`ac ad af bc bd cb ce dc df ea eb fa fb fe`

Trigrams:
`ace adf afe bce bdc bdf cbc cbd cea ceb dcb dfa dfb eac ead eaf ebc ebd fad faf fbd fea`

## Current manuscript

`PAPER4_MANUSCRIPT_v0.27_2026-08-27.md`

It explicitly distinguishes:
- 9693 fully population-replayed core;
- later exact increments to 20786;
- no-C near-31 heuristic;
- exact ABDEF as the immediate breakthrough trigger.

## Recovery instruction for the next context

Read this file first, then the v0.27 manuscript, then the current audit
manifest / exact-union check.  Continue positive search immediately; do not
restart historical component analysis unless a certificate inconsistency is
found.
