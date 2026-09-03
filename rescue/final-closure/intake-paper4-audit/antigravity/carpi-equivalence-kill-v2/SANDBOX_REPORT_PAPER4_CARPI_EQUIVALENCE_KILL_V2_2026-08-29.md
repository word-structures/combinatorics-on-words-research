# SANDBOX REPORT: Paper 4 Carpi Equivalence-Kill Audit v2 (Corrected C3)

**Date:** 2026-08-29
**Role:** Independent mathematical adversary
**Task:** Destroy the 6/34/19 novelty claim by deriving it from the corrected Carpi 1993 C3 condition
**Result:** KILL FAILED — novelty provisionally supported (Level C)

---

## Executive Summary

The audit was redone using the corrected modern restatement of Carpi's C3 condition, where delta_j in {0,1} are whole-image selector variables, not merely boundary/interior indicators. 

Even with the correct starting equation, the attempt to derive Paper 4's 6/34/19 classification failed completely. The "six vs six" correspondence between Carpi's admissible selector triples and Paper 4's carry domains was proven to be a combinatorial coincidence, not a bijection. The 34-pattern count and 19-family quotient remain structurally impossible to derive from Carpi without introducing entirely new concepts (partial assignment, occurrence masks, and complete-set equivalence).

---

## Phase-by-Phase Results

### Phase A — The True Nature of delta_j
The corrected equation yields D_C = delta_0 - 2delta_1 + delta_2 = -Delta = c_0 - c_1. 
While their linear combinations match exactly, the variables themselves are distinct. delta_j are three free boolean parameters selecting affine targets; c_j are two Euclidean carries partitioning geometric support. (Classification: Type 3 - only differences correspond).

### Phase B & C — The "Six vs Six" Coincidence
There are exactly six admissible Carpi triples (000, 111, 011, 110, 001, 100).
There are exactly six Paper-4 carry domains (Z_s, Z, P_t, P, M_t, M).
An explicit bijection attempt **failed**. 
A single Paper 4 domain (e.g., P) contains geometric configurations that, depending on the assigned word, could satisfy different Carpi triples (e.g., 011 or 110). Conversely, for the Z_s domain, the Carpi triples 000 and 111 become algebraically degenerate and yield the exact same constraint.
The common number six is a superficial coincidence arising because both frameworks must resolve the same three-valued curvature (-1, 0, 1) through different combinatorial reductions (8-2=6 vs 8-2=6).

### Phase D-F — The 34/19 Derivation
Both frameworks share the Parikh prefix second-difference algebra and scalar length curvature. However, Carpi's framework assumes a fully specified morphism. It cannot produce the 34 patterns because it lacks the concept of partial assignment (the occurrence mask chi) and block-coincidence constraints. It cannot produce the 19 families because it lacks the reduced support signature sigma and the complete-set equivalence quotient. 

### Phase G — Final Classification

**VERDICT C:**
CARPI CONTAINS THE WHOLE-BLOCK / CURVATURE ALGEBRA, BUT THE SIX PAPER-4 DOMAINS REQUIRE ADDITIONAL EUCLIDEAN GAP GEOMETRY, AND 34/19 REQUIRE PARTIAL ASSIGNMENT.

The 6/34/19 theorem is not a corollary of Carpi C3. They are incomparable specializations: Carpi provides a boolean criterion for a fully specified morphism, whereas Paper 4 provides an algebraic classification of constraint supports under partial assignment.

---

## Outputs Produced

1. PAPER4_CARPI_C3_CORRECTED_NORMALISATION_2026-08-29.md
2. PAPER4_CARPI_SIX_SELECTOR_TRIPLES_2026-08-29.md
3. PAPER4_CARPI_SIX_VS_SIX_BIJECTION_TEST_2026-08-29.md
4. PAPER4_CARPI_TO_34_19_REDERIVATION_2026-08-29.md
5. SANDBOX_REPORT_PAPER4_CARPI_EQUIVALENCE_KILL_V2_2026-08-29.md

No manuscript edits. No Git mutation.
