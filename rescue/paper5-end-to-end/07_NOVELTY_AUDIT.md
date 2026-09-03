# NOVELTY AUDIT
**Date:** 2026-08-29

## Literature Check

1. **Title:** A new approach to finding words avoiding abelian patterns
   **Authors:** Currie, J. D., & Rampersad, N.
   **Year:** 2014
   **arXiv:** 1409.1174
   **Section:** Section 2, Template generation
   **Exact Overlap:** Uses templates with variables to backtrack forward generation for pattern avoidance.
   **Exact Difference:** Applies to literal word generation (character by character), not to solving the parametric synthesis of target morphisms before enumeration.

2. **Title:** Abelian square-free words over four letters
   **Authors:** Rao, M., & Rosenfeld, M.
   **Year:** 2015
   **arXiv:** 1507.02581
   **Section:** Sections 3 & 4 (Parent graph / Ancestors)
   **Exact Overlap:** Establishes the exact algebraic parent condition (Q-projection, nullspaces, boundary adjustments) to verify whether a given fully specified morphism preserves pattern freeness.
   **Exact Difference:** Operates strictly sequentially: construct -> certify. The target images must be fully specified literals before the parent equations are generated.

3. **Title:** Balance properties of morphisms
   **Authors:** Adamczewski, B.
   **Year:** 2003
   **DOI:** 10.1016/S0304-3975(02)00827-X
   **Section:** Section 4 (Incidence matrices)
   **Exact Overlap:** Uses Parikh vector differences and spectral properties (incidence matrices) to bound the Abelian complexity of morphic words.
   **Exact Difference:** Focuses on macro-level Parikh vector growth and bounds, rather than local constraint synchronization for explicit target synthesis.

## Verdict

No matching construction was located in the searched sources. The formulation of Abelian-power parent templates for partially specified morphisms into a Minkowski-sum constraint evaluated during synthesis appears to be a distinct integration of existing concepts.
