# R3 CORRECTNESS KILL REPORT
**Date:** 2026-08-29
**Verdict:** CORE ARCHITECTURE UNSOUND (CURRENT R3 INTERPRETATION)

## 1. LONG_PERIOD_TRUNCATION_CLAIM = FALSE / UNPROVED
**Status:** KILLED
The assertion that "Paper 4 eliminates all $K \ge 2L$ squares" independently is mathematically false in the current pipeline.
Paper 4 provides:
- A. classification of possible support forms.
- B. checking all instantiated affine targets.
It does **NOT** provide:
- D. certifying arbitrarily long periods without an external structure.
The earlier architecture explicitly relied on a separate long-period parent/template/ancestor certificate to bound the structural generation. The 19 families are necessary but not a standalone universal satisfiability certificate. This claim is stripped from the pipeline.

## 2. CYCLE SANITY THEOREM
**Status:** KILLED
**Lemma:** Let $G$ be a finite directed graph where states emit finite block words. If $G$ contains a directed cycle emitting a nonempty word $W$, repeating this cycle infinitely produces the word $W W W \dots$. This output contains the ordinary square $WW$, which has an abelian square of half-period $|W|$.
**Consequence:** A repeated directed cycle **CANNOT** itself be an infinite `aa2f` solution. The R3 architecture assuming that finding a macro-DFS cycle solves the conjecture is **UNSOUND**. Infinite `aa2f` words are not ultimately periodic.

## 3. FIX AA2FR CHECKER SEMANTICS
**Status:** DRIFT CORRECTED
The exploratory transition checker (`3_find_morphism.js`) explicitly skipped boundary pure-repetition rules. Its graph edges do not represent exact `aa2fr` transitions. The script is frozen. A canonical predicate identical to the production checker is required before any graph can be scientifically utilized.

## 4. CORRECT ROLE OF PAPER 4
**Status:** RECLASSIFIED
Paper 4 is a finite compiler of support schemas and affine target loading under partial assignment. It is **NOT** a replacement for all long-period certification.
**Corrected Architecture:**
`Candidate block system` -> `Exact source-language local gate` -> `Paper-4 support/target compiler` -> `Independent global parent/template certificate`.
