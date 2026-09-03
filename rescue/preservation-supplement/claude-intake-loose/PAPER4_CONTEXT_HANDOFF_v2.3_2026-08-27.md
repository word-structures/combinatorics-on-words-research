# Paper 4 — Context Handoff / Recovery Pack

**Version 2.3 — 2026-08-27**  
**Canonical manuscript:** `PAPER4_MANUSCRIPT_v0.30_2026-08-27.md`

## Canonical scientific state

- complete positive length-40 six-role coding \(H\): `NOT FOUND`;
- exact \(ABDEF\): `OPEN`;
- exact \(ABFE\): `EXISTS`;
- exact \(AEF\): `EXISTS`;
- Mäkelä problem: `OPEN`;
- novelty: `NOVELTY_UNRESOLVED / NOT_ESTABLISHED`;
- finite \(p=2,\ldots,40\) reduction: `PROVED + EXACT-CHECKED`;
- Gate T long-period architecture: `PROVED + EXACT-CHECKED`;
- one-command fail-closed final H certifier exists;
- current canonical F-role exclusion lower bound:
  \[
  \boxed{38118}.
  \]
- strongest fully second-implementation population core: **9693**.

## Major correction relative to v2.2 / manuscript v0.29

The AEF best-2 record is **not** an AEF existence barrier.

The revised full-no-C replay over the canonical 702 AF pairs exports

\[
\boxed{14266\text{ exact }ABFE\text{ scaffolds}},
\]

supported by

\[
15\text{ AF pairs},\quad 7\text{ F words},\quad 8\text{ A words}.
\]

Therefore exact AEF and ABFE existence are established.

The same population closes with

\[
\boxed{702AF\to14266ABFE\to0ABDEF}.
\]

The unresolved positive bottleneck is D-compatible fixed-core synthesis.

## Exact factorization

For fixed \(D,E,F\), the A-side and B-side existential problems are
independent because the actual no-C factor language contains no factor
involving both A and B.

A-side contexts:

\[
A,AF,FA,FAF,EA,AD,EAD,FAD,ADF,DFA,AFE,EAF,FEA.
\]

B-side contexts:

\[
B,FB,EB,BD,BDF,DFB,EBD,FBD.
\]

This permits

\[
(D,E,F)\to (\exists A)\ \&\ (\exists B).
\]

## BDF-first exact closures

The 12 old ABDF rows contain only three distinct BDF cores.

Discarding the old A and enumerating E exhaustively gives

\[
3BDF\to36BDEF.
\]

Independent complete A-existence testing gives

\[
\boxed{36BDEF\to0A}.
\]

A local D expansion around those three D words retains eight distinct
profile-preserving candidates with exact-clean \(D\) and \(DF\).  Complete
B enumeration gives five BDF cores; complete E enumeration gives

\[
5BDF\to74BDEF,
\]

and complete A-existence gives

\[
\boxed{74BDEF\to0A}.
\]

A separate finite grid of 8 D words times the first 100 exact \(E,FE\) words
gives

\[
\boxed{800DEF\to0A}.
\]

All three are finite exact closures, not global impossibility theorems.

## Incomplete branches — no negative inference

- unrestricted fixed-F D enumeration: too broad for current wall-clock budget;
- ADF-first E search: initial probes reached timeouts;
- larger DEF grids: not completed.

These remain `INCOMPLETE`, never negative certificates.

## Immediate positive-search priority

The preferred architecture is now fixed-core first:

\[
\boxed{D,E,F\to(\exists A)\ \&\ (\exists B)}.
\]

Useful search orders include

\[
D,F\to E\to(A\ \&\ B)
\]

or BDF-first generation followed by E and independent AExist.

Do not prioritize blind ABFE accumulation: ABFE is already abundant and
highly concentrated.

The breakthrough trigger remains

\[
\boxed{\text{FIRST EXACT }ABDEF}.
\]

If exact ABDEF is found:

1. stop ledger expansion;
2. enumerate C immediately under every remaining actual h6 context;
3. if \(ABCDEF=H\) exists, run the independent exact 22-trigram
   \(p=2,\ldots,40\) verifier;
4. only finite PASS proceeds to Gate T;
5. only finite PASS + Gate T PASS can support a solution claim.

## Governance

- no h=8;
- no D40;
- no Git mutation unless explicitly requested;
- caps/timeouts are unresolved, never negative;
- every pruning predicate must be an actual h6 factor or a proved
  consequence;
- never claim Mäkelä solved without independent finite-gate + Gate-T PASS;
- novelty remains unresolved pending specialist literature/database audit.

## Recovery order in a new context

1. read this handoff;
2. read manuscript v0.30;
3. read the v0.30 new-claims evidence matrix;
4. read the 702-ABFE census certificate;
5. read the BDF-first / DEF-factorized milestone;
6. read the 38118 union check;
7. continue fixed-core-first ABDEF search.

Older v0.29/v2.2 documents are historical and contain the now-corrected
statement that exact AEF was not known.
