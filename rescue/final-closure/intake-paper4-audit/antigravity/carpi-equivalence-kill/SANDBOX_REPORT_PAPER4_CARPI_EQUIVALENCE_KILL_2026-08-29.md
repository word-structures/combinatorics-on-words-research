# SANDBOX REPORT: Paper 4 Carpi Equivalence-Kill Audit

**Date:** 2026-08-29
**Role:** Independent mathematical adversary
**Task:** Destroy the 6/34/19 novelty claim by deriving it from Carpi 1993
**Result:** KILL FAILED — novelty provisionally supported

---

## Executive Summary

I attempted to derive Paper 4's six-domain/34-pattern/19-family classification from Carpi's 1993 abelian-power-free morphism criteria. The attempt failed at every level. The two frameworks solve fundamentally different mathematical problems and the key Paper 4 concepts (partial assignment, occurrence mask, carry-domain partition, support-family quotient) have no counterpart in Carpi's theory.

---

## Phase-by-Phase Results

### Phase A — Normalisation

Carpi's binary parameter delta_j = 1[i_j > 0] (boundary vs interior indicator) is a DIFFERENT mathematical object from Paper 4's carry bit c_j = floor((i_j+r)/L). The critical distinction: Carpi's delta does not depend on K mod L; Paper 4's carry depends entirely on it. These are different partitions of the same configuration space.

### Phase B — Six Domain Derivation Attempt

FAILED. Carpi's boundary classification gives a partition by (delta_0, delta_1, delta_2) in {0,1}^3 (up to 8 types). Paper 4's six domains are classified by carry pairs (c_0, c_1) and whether q = 0. These are cross-classifications: configurations in the SAME Carpi class can fall into DIFFERENT Paper 4 domains. Neither refines the other.

The six-domain partition is an elementary consequence of Euclidean division applied to the AP constraint, but it is NOT a corollary of Carpi's theorem.

### Phase C — 34 Pattern Derivation Attempt

FAILED. The 34-pattern count requires three concepts absent from Carpi:
1. Partial assignment (one block role unresolved).
2. The occurrence mask chi(b) — a binary indicator of which blocks are X-occurrences.
3. Block-coincidence consistency (chi is a function of the block, not the cutpoint).

Carpi assumes a fully specified morphism. There is no "unresolved role" and hence no occurrence mask.

### Phase D — 19 Family Derivation Attempt

FAILED. The 19-family quotient requires:
1. The reduced support signature sigma (depends on chi — absent from Carpi).
2. Complete-set equality as an equivalence relation (a new definition).
3. Exhaustive enumeration over each domain's lattice (depends on carry classification — absent from Carpi).

None of these exist in Carpi's framework.

### Phase E — Theorem Type Comparison

The two theorems answer DIFFERENT QUESTIONS:
- Carpi: "Is morphism h abelian power-free?" (Boolean criterion for fully specified morphism)
- Paper 4: "What are the constraint-support types under partial assignment?" (Finite catalogue)

These are INCOMPARABLE SPECIALIZATIONS of the same general Parikh algebra. Neither is a corollary of the other.

### Phase F — Terminology Search

No equivalent classification found in:
- Carpi 1993 (boundary types, not support families)
- Currie-Rampersad 2012 (parent templates, not support families)
- Eyidogan-Goral-Tanisali 2026 (sieve on Carpi-type boundary, not carry domains)
- Fici-Puzynina 2023 survey (no partial-assignment classification)

### Phase G — Final Verdict

**VERDICT C:**
CARRY/SECOND-DIFFERENCE ALGEBRA IS PRIOR ART, BUT ROLE-PROJECTED SUPPORT CLASSIFICATION IS NOT DERIVED FROM IT.

The classical shared algebra:
- (+1, -2, +1) Parikh prefix second difference
- Delta in {-1, 0, +1} macro curvature
- Euclidean division K = qL + r

The new Paper 4 content:
- Carry-pair domain partition (6 cases)
- Partial-assignment occurrence mask chi
- Block-coincidence consistency constraint
- 34 physically realizable patterns
- Complete reduced support-set equivalence
- 19 support families with closed cardinalities
- Support/target separation principle

### Epistemic Qualification

This verdict is issued WITHOUT full primary-source access to Carpi 1993 (DOI 10.1142/S021819679300010X — paywalled). If the primary source reveals partial-assignment machinery, this verdict must be revised. All available secondary evidence indicates this is unlikely.

---

## Outputs Produced

1. PAPER4_CARPI_NORMALISATION_MAP_2026-08-29.md
2. PAPER4_CARPI_TO_SIXDOMAIN_DERIVATION_ATTEMPT_2026-08-29.md
3. PAPER4_CARPI_34_19_DERIVATION_ATTEMPT_2026-08-29.md (Phases C-D)
4. PAPER4_CARPI_34_19_EQUIVALENCE_MATRIX_2026-08-29.csv
5. PAPER4_CARPI_PHASES_E_G_VERDICT_2026-08-29.md

No prior-art collision document produced (kill failed).
No manuscript modifications made.
No Git mutations.
