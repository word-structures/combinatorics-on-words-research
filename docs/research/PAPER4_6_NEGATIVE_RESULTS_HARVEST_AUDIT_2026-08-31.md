# PAPER 4-6 NEGATIVE RESULTS HARVEST AUDIT
**Date:** 2026-08-31

## Baseline
- **SHA:** f6f16ce04319844f0d5ace2968f62e095a8e6362
- **Harvest Source:** scratch/claude-intake/negative_results/PAPER4_6_NEGATIVE_RESULTS_HARVEST_2026-08-31.md
- **Evidence Searched:** Worktree sandbox reports (Phase A/B, AFE Cutset), Claude-intake Paper 6 checkpoints (v2.6, v3.5, v3.6 bundle), True Grid randomizations, Observability Index comparisons, Novelty kill reports.

## Candidate Reviews

| Candidate | Proposed Hypothesis | Audit Decision | Finality | Canonicalize? |
|-----------|---------------------|----------------|----------|---------------|
| 5.1 Future-count dimension | Large exact rank implies new combinatorial theorem | Accepted. Subsumed by linear algebra/Hankel rank. | CONTEXTUAL | Yes (§25) |
| 5.2 Near-optimal observability | Observability indices are a special Abelian property | Accepted. Killed by random partition controls. | NECESSARY | Yes (§26) |
| 5.3 35-dim static hidden sector | Startup/transient artifact | Accepted. Saturated Q2 rank deficiency is even larger (326 dims). | NECESSARY | Yes (§27) |
| 5.4 Profile-incidence collapse | Static profile incidence provides the full direct mechanism | Accepted. Collapse is real but semantic explanation was too strong. | CONTEXTUAL | Yes (§28) |
| 5.6 Small L5 identities | Simple exact relations generalize to universal obstruction laws | Accepted. Perturbations and FULL-L5 broke the universality. | NECESSARY | Yes (§29) |
| 5.7 One-step response aliasing | One-step legal continuation fully explains future equivalence | Accepted. One-step kernel is much larger than the true semantic kernel. | NECESSARY | Yes (§30) |
| 5.9 Local coarse-to-fine | Fiberwise rank-1 refinement | Accepted. FULL-L4/Q2 produced rank-2 fibers. | NECESSARY | Yes (§31) |
| 5.11 Bounded Parikh hierarchy | Novel combinatorial theorem in itself | Accepted. Novelty demoted due to classical parent-template literature. | CONTEXTUAL | Yes (§32) |
| 5.12 Polynomial Parikh-DP | Novel algorithmic compiler | Accepted. Standard weighted-automata/DP on commutative paths. | CONTEXTUAL | Yes (§33) |
| 5.13 Binary obstacle reachability | Sufficiently strong Paper 6 main theorem | Accepted. Result is exact but impact is too small. | CONTEXTUAL | Yes (§34) |
| 5.14 Ternary single-layer | Ternary restricts subsets like binary | Accepted. Completely falsified; T2 layer is fully realizable. | NECESSARY | Yes (§35) |
| 5.15 Ternary cross-layer | 21 missing subsets implies impossibility | Rejected/Blocked. Not found != impossible. | N/A | No |

## Unresolved / Blocked
- **5.15 (Ternary cross-layer reachability):** Explicitly excluded from canonicalization. Bounded search exhaustion (491/512) does not support a necessary mathematical impossibility result.
- **5.5 & 5.8 & 5.10:** Merged or omitted for clarity. 5.10 (True-grid rank neutrality) is subsumed by the random controls lesson in 5.2. 5.5/5.8 are variations of the semantic/one-step mechanism failures logged in 5.4 and 5.7.

