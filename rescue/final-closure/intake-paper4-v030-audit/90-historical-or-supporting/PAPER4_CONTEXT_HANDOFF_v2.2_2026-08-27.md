# Paper 4 — Context Handoff / Recovery Pack

**Version 2.2 — 2026-08-27**  
**Purpose:** canonical recovery point after the AEF factorization milestone.

## Canonical scientific state

Problem: seek a prescribed-profile length-40 ternary coding \(H\) on the
six-letter Rao--Rosenfeld \(h_6\) core such that
\(H(h_6^\omega(a))\) avoids all nontrivial Abelian squares.

Current status:

- complete positive \(H\): `NOT FOUND`;
- exact \(ABDEF\): `OPEN`;
- exact \(AEF\): `OPEN`;
- Mäkelä problem: `OPEN`;
- novelty: `NOVELTY_UNRESOLVED / NOT_ESTABLISHED`;
- finite \(p=2,\ldots,40\) reduction: `PROVED + EXACT-CHECKED`;
- Gate T long-period architecture: `PROVED + EXACT-CHECKED`;
- one-command fail-closed final H certifier exists;
- current canonical F-role exclusion lower bound:
  \[
  \boxed{38118}.
  \]
- strongest fully second-implementation population core: **9693**;
- later increments through 38118 are exact-computed but do not yet all have a
  consolidated independent second population replay.

## Latest exact negative milestone

Fresh10 is disjoint from the previous 33118-word union:

\[
5000F\to22F^+\to64AF.
\]

All 64 AF pairs pass clean-room verification and the revised full no-C
extension terminates as

\[
\boxed{64AF\to0ABDEF},
\qquad 0\text{ caps}.
\]

Hence

\[
\boxed{33118+5000=38118}.
\]

## New exact no-C factorization

The actual no-C factor language contains no factor involving both A and B.
For fixed \(D,E,F\), the remaining A and B existential searches therefore
decouple exactly.

A-side contexts:

\[
A,\ AF,\ FA,\ FAF,\ EA,\ AFE,\ EAF,\ FEA,
\]

and

\[
AD,\ EAD,\ FAD,\ ADF,\ DFA.
\]

B-side contexts:

\[
B,\ FB,\ EB,
\]

and

\[
BD,\ BDF,\ DFB,\ EBD,\ FBD.
\]

This is a structural factorization, not a heuristic.

The revised full-no-C extension checks \(AFE,EAF,FEA\) before B/D search.
On the old 87-pair regression:

\[
690327E\to13B\to0ABDEF.
\]

On Fresh10:

\[
378133E\to0B.
\]

This shifts the practical positive bottleneck toward A/E/F compatibility.

## Positive AEF milestone

The actual A/E/F trigrams are

\[
AFE,\quad EAF,\quad FAF,\quad FEA.
\]

A dedicated search has an internally clean prescribed-profile record with

\[
\boxed{2}
\]

remaining finite violations, both in \(FEA\):

- zero-based \((st,p)=(38,23)\);
- zero-based \((st,p)=(37,24)\).

The complete profile-preserving two-swap neighborhood was enumerated:

\[
1565\text{ first swaps},
\]

\[
828133\text{ second continuations},
\]

\[
2027\text{ internally clean final states},
\]

and no improvement exists:

\[
\boxed{2\to2}.
\]

Thus this record is an exact two-swap local minimum, but global AEF remains
open.

For this best-2 record, subtracting the two overlapping \(FEA\) Parikh
equalities gives the diagnostic relation

\[
F[37]=A[4]
\]

with zero-based block indices.

## Immediate research priority

Do not return to blind F-ledger growth as the default.

Primary positive line:

\[
\boxed{\text{AEF best-2}}
\to
\text{coordinated 3-/4-cycle or global constraint attack}
\to
AEF=0?
\]

If exact AEF is found:

1. add B under the actual no-C B contexts;
2. solve D under all actual D-containing contexts;
3. verify the complete no-C \(ABDEF\) scaffold.

The breakthrough trigger remains

\[
\boxed{\text{FIRST EXACT }ABDEF}.
\]

If exact ABDEF is found:

1. stop all ledger expansion;
2. enumerate C immediately;
3. if \(ABCDEF=H\) exists, run the independent 22-trigram finite
   \(p=2,\ldots,40\) verifier;
4. only finite PASS proceeds to Gate T;
5. only finite PASS + Gate T PASS can support a solution claim.

## Hard governance

- no \(h=8\);
- no D40;
- no Git mutation unless explicitly requested;
- caps are unresolved, never negative certificates;
- every negative pruning predicate must come from an actual \(h_6\)
  bigram/trigram or a proved implication;
- never claim solved without independent finite-gate + Gate-T PASS;
- novelty remains unresolved until specialist literature/database audit.

## Canonical current manuscript

`PAPER4_MANUSCRIPT_v0.29_2026-08-27.md`

Its consistency check is PASS.

## Recovery order in a new context

1. read this handoff;
2. read manuscript v0.29;
3. read `PAPER4_GLOBAL_F_UNION_38118_CHECK.txt`;
4. read `PAPER4_MANUSCRIPT_v0.29_NEWCLAIMS_EVIDENCE_MATRIX.md`;
5. inspect the AEF best-2 and exact two-swap artifacts;
6. continue the positive AEF attack immediately.

Do not reconstruct project state from older v0.28/v2.1 documents except for
historical comparison.
