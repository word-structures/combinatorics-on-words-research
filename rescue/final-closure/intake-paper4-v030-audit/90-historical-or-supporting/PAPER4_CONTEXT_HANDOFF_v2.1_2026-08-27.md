# Paper 4 — Context Handoff / Recovery Pack

**Version 2.1 — 2026-08-27**

## Canonical state

- complete positive H: `NOT FOUND`;
- Mäkelä: `OPEN`;
- novelty: `NOVELTY_UNRESOLVED / NOT_ESTABLISHED`;
- finite p=2..40 reduction: `PROVED + EXACT-CHECKED`;
- Gate T: `PROVED + EXACT-CHECKED`;
- current exact F-role exclusion lower bound: **29712**;
- strongest fully second-implementation population core: **9693**;
- newest exact basin:
  \[
  3403F\to77F^+\to325AF\to0ABDEF.
  \]
- all 325 AF pairs clean-room PASS;
- eight initially capped ABDEF searches were rerun at larger limits and all
  terminate with zero caps and zero ABDEF;
- current no-C heuristic record: 31 violations;
- exact ABDEF: `OPEN`.

## Immediate research priority

\[
\boxed{\text{FIRST EXACT }ABDEF}
\]

If found:
1. stop F-ledger expansion;
2. enumerate C immediately;
3. if ABCDEF exists, run exact 22-trigram finite p=2..40 verifier;
4. only finite PASS proceeds to Gate T;
5. only finite PASS + Gate T PASS supports a solution claim.

## Current manuscript

`PAPER4_MANUSCRIPT_v0.28_2026-08-27.md`

## Governance

- no h=8;
- no D40;
- no Git mutation unless explicitly requested;
- every negative pruning predicate must be an actual h6 factor or proved
  implication;
- caps are unresolved, never negative certificates;
- novelty remains unresolved until specialist literature/database audit.
