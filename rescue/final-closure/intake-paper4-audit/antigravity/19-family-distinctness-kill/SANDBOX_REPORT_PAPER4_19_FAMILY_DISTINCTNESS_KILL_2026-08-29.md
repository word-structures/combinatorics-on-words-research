# SANDBOX REPORT: Paper 4 19-Family Distinctness Independent Kill Audit

**Date:** 2026-08-29
**Role:** Independent adversarial combinatorics referee
**Task:** Determine whether the 19 stable complete reduced support families are pairwise distinct for L >= 5.

## PHASE 1 — CLEAN-ROOM RECONSTRUCTION
The exact domain inequalities, reduction rules, and 19 family definitions were independently reconstructed and frozen in `CLEANROOM_19_FAMILY_DEFINITIONS_2026-08-29.md`. The list contains exactly 19 objects representing complete support sets.

## PHASE 2 — DEPTH-MOMENT INVARIANT AUDIT
The depth moment invariant `mu(sigma) = sum_i i * alpha_i` was attacked and verified from first principles.
The zero-depth reduction convention `e_0 = 0` was proven not to violate the moment equality, because `mu(0) = 0 * alpha_0 = 0`.
All claimed moments for A-type, M-type, and OO-type families were strictly verified. Zero-depth removal creates no collisions. See `PAPER4_19_FAMILY_MOMENT_AUDIT_2026-08-29.md`.

## PHASE 3 — O AND C FAMILY DESCRIPTIONS
The O and C family explicit descriptions were verified against the geometric domains.
Z-O spans [1, L-1]. P-O caps at L-2 because `u+w = 2v-L` with `w=L-1` forces `u < 0`. M-O lacks 0 because `w=0` forces `u=L > L-1`.
C-family centre-depth ranges derived from the inequalities perfectly match the proof candidate.

## PHASE 4 — FULL/TRUNCATED SEPARATIONS
The truncation witnesses `tau_P = e_{L-2} - 2e_{L-1}` and `e_1` were verified.
Because coefficients (-2, +1) and (+1) uniquely determine the non-zero depths, no alternative lattice points can regenerate these signatures under the respective masks. Zero-depth removal cannot indirectly create them from 3-term signatures under a 2-term mask.

## PHASE 5 — Zs-A vs Z-A
Both families share the constant moment `mu = 0`.
The Zs domain requires `r >= 2`, meaning the three depths are strictly distinct. A 3-term signature with distinct non-zero depths cannot sum to 0. If one depth is 0, the remaining 2-term signature (e.g. `-2e_r + e_{2r}`) cannot sum to 0 due to unmatched coefficients. Thus `0` is never in Zs-A.
Z-A allows `u=v=w=1`, which reduces to `0`. Thus `0 in Z-A`. The witness `-2e_2 + e_4` correctly proves Zs-A is non-empty for L=5.

## PHASE 6 — CROSS-GROUP DISTINCTNESS
The 171 pairwise comparisons were generated and separated logically using rigorous, L-independent invariants: depth moment ranges, coefficient shapes (unary vs mixed vs non-negative), and zero-membership. The matrix is saved in `PAPER4_171_PAIR_DISTINCTNESS_MATRIX_2026-08-29.csv`.

## PHASE 7 — EXHAUSTIVE FALSIFICATION
An independent JavaScript enumerator (`PAPER4_19_FAMILY_DISTINCTNESS_INDEPENDENT_CHECKER.js`) constructed the 19 complete support sets from their fundamental definitions and checked all pairs for equality for L = 5 to 100.
**0 failures.** The 19 families are pairwise distinct for all tested L.

## PHASE 8 & 9 — PROOF VALIDITY
The theorem is mathematically true. The symbolic proof candidate is logically complete, accurately tracking the reduction map anomalies, bounding the depth moments, and isolating the zero-depth endpoints.

### FINAL VERDICT
A. PASS — THE SYMBOLIC PROOF IS COMPLETE FOR ALL L >= 5.
