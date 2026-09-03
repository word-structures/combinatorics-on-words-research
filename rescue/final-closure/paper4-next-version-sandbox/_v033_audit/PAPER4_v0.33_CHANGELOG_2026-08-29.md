# Paper 4 v0.33 referee repair pass

**Date:** 2026-08-29
**Base:** v0.32a audited manuscript
**Status:** sandbox only; no canonical/Git mutation.

## Applied referee repairs

- Corrected the 263/263 two-solver attribution.
- Removed the false state-compression benefit and added the exact maximal-history-dependence finding.
- Relabeled 34→19/cardinality/distinctness proof status to match the manuscript's actual proof detail.
- Added arity-zero and raw-vs-effective AFE constraint semantics.
- Replaced the out-of-scope K=1 example with a K=2 example.
- Corrected the L=4 boundary wording.
- Removed the unsupported ADEF stage and undefined Gate T from the active architecture.
- Explicitly disclaimed generic cutset/frontier/DAG novelty.
- Corrected only bibliography entries supported by authoritative metadata.

## Still open before submission

- full in-manuscript derivations for all 19 cardinalities and pairwise distinctness;
- specialist novelty audit of the exact six-domain/19-family quotient;
- full primary-source bibliography audit;
- optional AFE weighted-frontier population mechanism test.

## Post-pass precision update

Claude's independent v0.32a referee audit also clean-room verified Phase II with genuine UNSAT coverage. v0.33 therefore updates the Phase-II audit status from pending to passed, while simultaneously recording the crucial implementation finding that the actual L=40 frontier quotient gives no state compression (multiplicity 1).
