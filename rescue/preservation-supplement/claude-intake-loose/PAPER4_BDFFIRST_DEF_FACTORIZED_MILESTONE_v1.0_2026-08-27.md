# Paper 4 — BDF-first / DEF-factorized Milestone

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED FINITE CLOSURES`

## Old BDF family, A removed

The 12 previously recorded ABDF rows contain only three distinct BDF cores.
For each distinct BDF core, E is enumerated exhaustively under

\[
E,\ FE,\ EB,\ EBD.
\]

Each admits exactly 12 E words:

\[
\boxed{3BDF\to36BDEF}.
\]

The old A is discarded.  For every resulting fixed \((D,E,F)\) core, the
complete independent A-side solver is run under

\[
A,AF,FA,FAF,EA,AD,EAD,FAD,ADF,DFA,AFE,EAF,FEA.
\]

All are A-empty:

\[
\boxed{36BDEF\to0A}.
\]

## Local D expansion

Around the three D words, all profile-preserving modifications supported on
at most four positions are generated.  Candidates are retained only when
both \(D\) and \(DF\) are exact-clean.  The union contains eight distinct D
words.

Complete B search yields

\[
8D\to5BDF.
\]

Complete E enumeration gives

\[
\boxed{5BDF\to74BDEF},
\]

and complete A-existence testing gives

\[
\boxed{74BDEF\to0A}.
\]

## DEF finite grid diagnostic

An exact \(E,FE\)-only generator produced 2000 E words for the fixed F.
The first 100 were crossed with the eight local D words.  All 800 fixed
\((D,E,F)\) cores were checked by the complete A-side solver:

\[
\boxed{800DEF\to0A}.
\]

This is exact only for the tested finite grid.

## Incomplete branches

A raw unrestricted fixed-F D enumeration did not complete within the current
wall-clock budget.  An ADF-first E search likewise reached time limits in its
initial probes.  No negative inference is drawn from either branch.

**Epistemic label:** `EXACT-CHECKED FINITE CLOSURES / GLOBAL ABDEF OPEN`.
