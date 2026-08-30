# PAPER 4 HOSTILE REFEREE REPORT (GATE 7)

**Date**: 2026-08-30
**Artifact**: `papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md`

## 1. MATHEMATICAL/PROOF REFEREE
**Verdict:** ACCEPT

The mathematical claims in Theorem 5.1 (Theorem A) explicitly cover the domain bounds (6 physical carry domains), the physical occurrence pattern bounds (34 realizable patterns), and the stable equivalent classes of the unresolved-support sets (19 families).

- The proof properly isolates the q=0 versus q>=1 bounds.
- The q=0 / q>=1 split together with the carry geometry yields the six physical domains.
- The 34 realizable domain/mask patterns logically bound the cutpoints when considering the possible equality combinations among macro block bounds.
- The quotient yields exactly 19 complete support families for L>=5, proved symbolically without relying strictly on the finite length-40 search.
- The quotient contains exactly 19 classes under equality of complete reduced unresolved-support sets. No broader automaton-minimality or representation-minimality claim is made.
- Finite testing validates the theoretical counts, but is correctly not cited as a replacement for the proof.
- No false empirical assumptions or unstated assumptions were detected.

## 2. COMPUTATIONAL/REPRODUCIBILITY REFEREE
**Verdict:** ACCEPT

- The 4 canonical JavaScript checkers (`sixdomain_full.js`, `v032a_impl_semantics.js`, `rx_h_matched.js`, `afe_263_run.js`) ran cleanly against the theoretical definitions.
- The 6 domains, 34 masks, and 19 families were accurately regenerated for L>=5 using `sixdomain_full.js`.
- The 263 matched quotas were independently cross-checked and verified using `afe_263_run.js`, reproducing exactly the 86 AFE literal-witness results with 0 unresolved.
- The canonical reproducibility hashes in the manifest are pristine, and the `PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt` closure validates the PDF and the inputs/outputs.
- No dependencies leak into undocumented `scratch/` directories; `__dirname` relative paths encapsulate the tests.

## 3. SCOPE/NOVELTY REFEREE
**Verdict:** ACCEPT

- The manuscript clearly avoids claiming the 19 families are infinite-sequence automaton states.
- It rejects presenting the finite bounds as a global 19-period certificate or as a solution to Mäkelä's conjecture.
- L=40 is restricted to a case study of boundary geometry rather than being a hypothesis of Theorem A.
- The novelty statement is limited to the explicit role-projected 6 -> 34 -> 19 classification under partial uniform block assignment, without claiming generic priority for Parikh-difference or template machinery.
- Literature and prior art are distinguished from the proposed geometric reduction.

## CONCLUSION

**GATE 7 PASSED**
