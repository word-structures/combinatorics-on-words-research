# Paper 4 v0.29 — New-Claims Evidence Matrix

**Date:** 2026-08-27

| Claim added in v0.29 | Evidence artifact | Epistemic label |
|---|---|---|
| 38118 distinct F-role words excluded | `PAPER4_GLOBAL_F_UNION_38118_CHECK.txt` | `EXACT-CHECKED LOWER BOUND` |
| Fresh10: 5000F -> 22 F+ -> 64 AF | `PAPER4_FRESH10_AF_PAIRS_NOIDX.tsv` + complete fixed-F outputs | `EXACT-CHECKED` |
| Fresh10 64/64 AF clean-room PASS | `PAPER4_FRESH10_AF_CLEANROOM.txt` | `EXACT-CHECKED` |
| Fresh10: 64AF -> 0ABDEF, zero caps | `PAPER4_FRESH10_FULLNOC_ABDEF_OUTPUT.txt` | `EXACT-CHECKED` |
| Exact A/B decoupling over fixed D,E,F | actual no-C factor language + `PAPER4_FIXED_DEF_SINGLE_ROLE_SOLVER_FULL_v2.cpp` | `PROVED FACTORIZATION` |
| Full-no-C revised E gate | `PAPER4_AF_TO_ABDEF_FULL_NOC_v2.cpp` | `IMPLEMENTED + REGRESSION-CHECKED` |
| 87-pair revised regression: 690327 E -> 13 B -> 0ABDEF | `PAPER4_FULLNOC_REGRESSION_87_OUTPUT.txt` | `EXACT-CHECKED` |
| AEF record with exactly 2 violations | `PAPER4_AEF_LOCAL_R1_BEST_H.txt`, `PAPER4_AEF_BEST2_EXACT_VIOLATIONS.txt` | `EXACT-CHECKED SEARCH RECORD` |
| Both AEF violations are in FEA at (38,23),(37,24) | `PAPER4_AEF_BEST2_EXACT_VIOLATIONS.txt` | `EXACT-CHECKED` |
| AEF best-2 exact two-swap local rigidity | `PAPER4_AEF_EXACT2_OUTPUT.txt` | `EXACT-CHECKED LOCAL RIGIDITY` |
| Exact AEF exists | **not established** | `OPEN` |
| Exact ABDEF exists | **not established** | `OPEN` |
| Complete H exists in prescribed L=40 family | **not established** | `OPEN` |
