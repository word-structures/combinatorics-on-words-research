# Paper 4: Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

**Thesis:** The exponential state explosion in local Abelian-square avoidance can be precisely factored into a finite block-assembly geometry bounded by 34 realizable patterns over 6 carry domains, yielding exactly 19 complete support families for  \ge 5$.

**Main theorem:** For every  \ge 5$, under the prescribed length-40 uniform block assignment, there are exactly 6 physical carry domains, 34 physically realizable domain/mask patterns, and exactly 19 equivalence classes of complete reduced unresolved-support sets, with exactly one unresolved source role.

**Strongest safe novelty statement:** We present the first exact geometric classification of local carry constraints for length-40 Abelian-square-free block assemblies, completely characterizing the 19 realizable equivalence classes of unresolved suffix boundaries.

**Explicit non-claims:**
- The 19 families are not automaton states for an infinite sequence.
- This is not a 19-period global certificate or a solution to Mkel's conjecture.
- The length-40 construction is a case study of boundary geometry, not the main theorem itself.

**Hashes:**
- **Current source SHA-256:** 71B185E10E2014AD3B88C1789695EEA1A5434089121D0EE221269AB16B85995E (PAPER4_PREPRINT_v1.1_2026-08-29.md)
- **Current PDF SHA-256:** BAD59A391FE81AEF370C296CC03F2515ABBAD58FAF5F2D8F2B056D08B3CD1BD8 (PAPER4_PREPRINT_v1.1_2026-08-29.pdf)

## Lifecycle Gates

| Gate | Name | Status | Evidence |
|---|---|---|---|
| 0 | Discovery | **PASS** | scratch/structure-discovery-2026-08-29/ |
| 1 | Claim Freeze | **PASS** | Claim 6 -> 34 -> 19 frozen in MATH_CLAIMS.md |
| 2 | Proof Closure | **PASS** | PAPER4_SIX_DOMAIN_19_FAMILY_FULL_PROOF_2026-08-29.md (historical capture) |
| 3 | Independent Kill | **PASS** | 19-family distinctness kill audit completed, zero failures |
| 4 | Novelty Kill | **PASS** | Prior art (Rao & Rosenfeld) properly cited and distinguished |
| 5 | Reproducibility | **PASS** | eproducibility/ canonical capsule |
| 6 | Manuscript Architecture | **PASS** | manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md |
| 7 | Hostile Referee | **EXPLICITLY UNSATISFIED** | Proof/Computational referees have not completed a hostile audit. |
| 8 | Artifact Closure | **PASS** | udit/PAPER4_V1.1_SUBMISSION_AUDIT.md |
| 9 | Owner Promotion | **PENDING OWNER PROMOTION** | Awaiting owner merge and release. |

**Remaining blockers:**
- Gate 7 (Hostile Referee) requires independent adversarial review by a specialist/proof/computational referee.
- Gate 9 (Owner Promotion) requires owner approval to merge and release.
