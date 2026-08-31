# Paper 4: Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

**Thesis:** The paper classifies the carry geometry of Abelian-square constraints in an L-uniform coding with exactly one unresolved source role.

**Main theorem:** For every L >= 5, with exactly one unresolved source role:
- exactly 6 physical carry domains;
- exactly 34 physically realizable domain/mask patterns;
- exactly 19 equivalence classes of complete reduced unresolved-support sets.

**Important:** L = 40 is an application/case study, NOT a hypothesis of the theorem.

**Strongest safe novelty statement:** "To date, the project's literature searches have not found a direct counterpart to the explicit role-projected 6 -> 34 -> 19 classification under partial uniform block assignment."

**Explicit non-claims:**
- the 19 families are not automaton states;
- not a global 19-period certificate;
- does not solve Mäkelä's conjecture;
- "19" is minimal only under equality of complete reduced unresolved-support sets, not a general automaton or representation-minimality claim.

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
| 5 | Reproducibility | **PASS** | papers/paper4/reproducibility/ canonical capsule |
| 6 | Manuscript Architecture | **PASS** | papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md |
| 7 | Hostile Referee | **PASS** | papers/paper4/audit/PAPER4_GATE_7_HOSTILE_REFEREE_REPORT.md |
| 8 | Artifact Closure | **PASS** | papers/paper4/audit/PAPER4_V1.1_SUBMISSION_AUDIT.md |
| 9 | Owner Promotion | **PENDING OWNER PROMOTION** | Awaiting owner merge and release. |

**Remaining blockers:**
- Gate 9 owner promotion only.
