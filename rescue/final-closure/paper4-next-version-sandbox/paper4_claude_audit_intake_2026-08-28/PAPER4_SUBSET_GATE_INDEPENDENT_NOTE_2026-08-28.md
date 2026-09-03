# Paper 4 — Independent subset-gate verification note

**Date:** 2026-08-28  
**Status:** EXPLORATORY INDEPENDENT CHECK — NOT CANONICAL PAPER-4 EVIDENCE  
**Purpose:** give a second auditor a small reproducible lead package.

## Result

Using the exact factor language of the 3-uniform morphism

- a -> ace
- b -> adf
- c -> bdf
- d -> bdc
- e -> afe
- f -> bce

the exact maximal factor covers for role subsets are:

| Assigned roles | Exact maximal S-only factor cover | Longest macro factor | Natural complete half-period ceiling at L=40 |
|---|---|---:|---:|
| AF | `faf` | 3 | 60 |
| AEF | `eafea`, `fafea` | 5 | 100 |
| ABDEF (no C) | `eafea`, `bdfadfbdfafea`, `ebdfafeadfbdfafea` | 17 | 340 |

The verifier also confirms there is no AF-only factor of length 4, no AEF-only
factor of length 6, and no no-C factor of length 18.

## Candidate general proposition

Let x be a uniformly recurrent infinite word over Gamma and let S be a proper
subset of Gamma. Assume at least one symbol outside S occurs with bounded gaps
(which holds for every occurring symbol in a primitive morphic fixed point).
Then S-only factors have bounded length. Hence the set of maximal S-only
factors, modulo factor containment, is finite.

For a constant-length coding H of length L, every output factor whose entire
intersected macro support lies in S is contained in H(v) for one of those
maximal S-only factors v. Therefore checking every H(v) for Abelian squares up
to half-period floor(L*|v|/2) is complete for all Abelian squares decidable
using only the assigned roles S.

This is an elementary structural proposition / audit target, not a novelty
claim.

## Audit instructions

Do not trust this note as evidence. Re-run `verify_paper4_subset_covers.py`
from scratch or reimplement the factor-language recursion independently.
Check especially:

1. the exact-factor recursion for a 3-uniform morphism;
2. the maximal-factor antichain logic;
3. the no-C cover of lengths 5, 13, 17;
4. the logical step from bounded S-only factors to a complete subset gate;
5. whether "macro support" is defined consistently with boundary-intersected
   blocks in the manuscript.

Do not promote to the manuscript or claim ledger until independently audited.
