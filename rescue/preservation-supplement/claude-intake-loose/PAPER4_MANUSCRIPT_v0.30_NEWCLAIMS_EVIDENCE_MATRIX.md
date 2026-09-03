# Paper 4 v0.30 — New-Claims Evidence Matrix

**Date:** 2026-08-27

| Claim | Primary evidence | Label |
|---|---|---|
| Canonical F exclusion lower bound = 38118 | `PAPER4_GLOBAL_F_UNION_38118_CHECK.txt` | `EXACT-CHECKED LOWER BOUND` |
| 702-AF revised full-no-C replay is completely closed | `PAPER4_702_CHUNK_RESULTS.json` + `PAPER4_702_151_200_SUB_RESULTS.json` | `EXACT-CHECKED` |
| Exact ABFE census = 14266 | `PAPER4_702_FULLNOC_ALL_ABFE_14266.tsv` + `PAPER4_702_ABFE_DISTRIBUTION.txt` | `EXACT-CHECKED POPULATION CENSUS` |
| ABFE supported by 15 AF pairs / 7 F / 8 A | `PAPER4_702_ABFE_DISTRIBUTION.txt` | `EXACT-CHECKED` |
| Exact AEF exists | follows directly from any exported exact ABFE scaffold | `EXACT-CHECKED COROLLARY` |
| Exact ABFE exists | `PAPER4_702_FULLNOC_ALL_ABFE_14266.tsv` | `EXACT-CHECKED` |
| 702AF -> 14266ABFE -> 0ABDEF | revised chunk replay + prior 702 closure | `EXACT-CHECKED` |
| 13 explicit ABFE in the 87-pair regression | `PAPER4_FULLNOC_87_ABFE_SCAFFOLDS.tsv` | `EXACT-CHECKED` |
| 13 ABFE -> 0 direct D for that regression sample | `PAPER4_ABFE13_DIRECTD_RESULTS.json` | `EXACT-CHECKED SAMPLE` |
| Old 12 ABDF rows contain 3 distinct BDF cores | `PAPER4_FIXED_F_GLOBAL_ABDF_PAIRS.tsv` | `EXACT-CHECKED` |
| 3 BDF -> 36 BDEF -> 0 A | `PAPER4_BDFFIRST_CORE1_E100_OUTPUT.txt`, `PAPER4_BDFFIRST_CORE1_E100_A_RESULTS.json`, `PAPER4_BDFFIRST_UNIQ_CORE23_E_RESULTS.json`, `PAPER4_BDFFIRST_UNIQ_CORE23_A_RESULTS.json` | `EXACT-CHECKED FINITE CLOSURE` |
| local D union contains 8 exact-clean D/DF candidates | `PAPER4_DF_H4_DPOOL_RESULTS.json` + D pool files | `EXACT-CHECKED LOCAL ENUMERATION` |
| 8 D -> 5 BDF -> 74 BDEF -> 0 A | `PAPER4_DLOCAL_B_RESULTS.json`, `PAPER4_DLOCAL_BDF_E_RESULTS.json`, `PAPER4_DLOCAL_BDEF_A_RESULTS.json` | `EXACT-CHECKED FINITE CLOSURE` |
| 8x100 DEF grid -> 0 A | `PAPER4_DEFGRID_8x100_OUTPUT.txt` | `EXACT-CHECKED FINITE GRID` |
| unrestricted D-first global enumeration is negative | **not established** | `INCOMPLETE` |
| ADF-first E branch is negative | **not established** | `INCOMPLETE / TIMEOUT-BOUND` |
| exact ABDEF exists | **not established** | `OPEN` |
| complete H exists in this L=40 family | **not established** | `OPEN` |
| Mäkelä solved | **not established** | `OPEN` |
