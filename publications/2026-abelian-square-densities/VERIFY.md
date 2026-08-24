# Verify the paper

Read the result.
Inspect the evidence.
Run the certificates.

The following table maps scientific claims to the available evidence artifacts and commands.

| CLAIM | EVIDENCE | HOW TO CHECK | WHAT IT ESTABLISHES | LIMITATION |
|---|---|---|---|---|
| Appendix C excursion/scissor certificate | ../../docs/evidence/h-family-collision-2026-08-24/certificates/excursion_cover_certificate.json | 
ode ../../docs/evidence/h-family-collision-2026-08-24/certificates/verify_scissor_and_symmetry.js | Establishes memory-9 valid states, boundary counts, conflict graph edge count, matching/vertex-cover quantities (size 102), and restricted-pool quantities. | Only verifies the specific h=5, K=5 ablation graph properties. Does not verify the generation of the states themselves. |
| Appendix D symmetry certificate | ../../docs/evidence/h-family-collision-2026-08-24/certificates/symmetry_orbits_certificate.json | 
ode ../../docs/evidence/h-family-collision-2026-08-24/certificates/verify_scissor_and_symmetry.js | Establishes S3 orbit counts/minimum/optima, and reversal-pair counts/minimum/optima. | Does not verify the generation of the states themselves. |
| Appendix A period/lattice certificates | N/A | Read appendix. | Certified the unimodular product lattice and graph period 1. | Historical checker scripts not preserved (see capsule status). |
| finite-n evidence / Appendix B | source/appendix_B_finite_n.tex | Read appendix. | Consistency with finite word counting. | Historical generator scripts missing. |
| provenance / reproducibility manifest | ../../docs/evidence/h-family-collision-2026-08-24/manuscript/REPRODUCIBILITY_MANIFEST.md | Read manifest. | Traceability of the findings. | CLOSED_WITH_DOCUMENTED_GAPS: 6 historical audit scripts were not recovered. |

## Verification Command

From the publications/2026-abelian-square-densities/ directory, you can run:

`ash
node ../../docs/evidence/h-family-collision-2026-08-24/certificates/verify_scissor_and_symmetry.js
`

This will run the preserved local verifier.

## Capsule Status

The underlying historical evidence capsule has the status: **CLOSED_WITH_DOCUMENTED_GAPS**.
Specifically, 14 intended payload files were successfully recovered with exact hashes, but 6 intended historical audit scripts were not recovered.

For more details, see:
- [CAPSULE.md](../../docs/evidence/h-family-collision-2026-08-24/CAPSULE.md)
- [REPRODUCIBILITY_MANIFEST.md](../../docs/evidence/h-family-collision-2026-08-24/manuscript/REPRODUCIBILITY_MANIFEST.md)
- [CORRECTION_NOTICE.md](../../docs/evidence/h-family-collision-2026-08-24/CORRECTION_NOTICE.md)

What the verifier DOES NOT verify:
- It does not verify the initial generation of the bounded-avoidance valid states.
- It does not verify the asymptotic calculation formulas.
- The six missing audit scripts cannot be run.
