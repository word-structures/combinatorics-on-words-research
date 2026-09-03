# PAPER4_DLOCAL_BDF — Reconstruction Certificate v1

**FRESH DETERMINISTIC RECONSTRUCTION — NOT A RECOVERED ORIGINAL.**

This document certifies `PAPER4_DLOCAL_BDF_RECONSTRUCTED_v1.tsv`, produced
2026-08-27 during Stage 1E of the Paper-4 evidence audit. It is a
newly-generated file, mechanically extracted from preserved raw solver
output already present in `paper4-v030-audit/`. It is **not** the missing
original file `PAPER4_DLOCAL_BDF.tsv`, whose own byte content is unknown
and unrecoverable from this material — only the *data it must have
contained* (the 5 BDF triples) is independently re-derivable, exactly and
uniquely, from two independent downstream files that already reference it.

## Source files used (exact filenames, as located in this audit tree)

| File | Path | SHA256 |
|---|---|---|
| `PAPER4_DLOCAL_B_RESULTS.json` | `paper4-v030-audit/20-data-outputs/` | `ed248630c34cebd30b698b5da1bca45ef72103f7c3d3c17d71085c4203853395` |
| `PAPER4_DLOCAL_BDF_E_RESULTS.json` | `paper4-v030-audit/20-data-outputs/` | `1ff6ada66f4670a525d5aa648b4f5e877aedeca2e56cedd214f74b351fc636e0` |
| `PAPER4_DLOCAL_BDEF_A_RESULTS.json` | `paper4-v030-audit/20-data-outputs/` | `b43e8d4427850f787c8ebd4e5212a48fc3af8aa5e7f33a5d88ed2ee2c53f5e40` |
| `PAPER4_DF_H4_DPOOL_RESULTS.json` | `paper4-v030-audit/20-data-outputs/` | `04c0011b5488cd1d8e5380a2ec020ec3831422e07022014113a8d64361002910` |
| `PAPER4_BDFFIRST_DEF_FACTORIZED_MILESTONE_v1.0_2026-08-27.md` | `paper4-v030-audit/10-certificates-evidence/` | `36c786a7973c9136103db740a129b881f35db242ae8ec845b88af9f87431d529` |

## What each source file established

- `PAPER4_BDFFIRST_DEF_FACTORIZED_MILESTONE_v1.0_2026-08-27.md` (prose, used
  only to identify which step is being reconstructed — no field values were
  taken from prose): states the "Local D expansion" narrative operates
  under a single fixed F throughout, giving `8D → 5BDF → 74BDEF → 0A`.
- `PAPER4_DF_H4_DPOOL_RESULTS.json`: three parallel-search "core" runs
  against the same fixed-F local-D-expansion, pool sizes 8/7/7 — core 1's
  pool size of 8 matches the D-count actually enumerated in
  `PAPER4_DLOCAL_B_RESULTS.json`, corroborating that the D pool is size 8
  (used only as a corroborating count, not as a data source for any row).
- `PAPER4_DLOCAL_B_RESULTS.json`: the 8 D-candidate exhaustive B-search
  results. `B_count` per D: `[0,2,0,0,0,1,1,1]`, summing to **5**.
- `PAPER4_DLOCAL_BDF_E_RESULTS.json`: **the actual source of every field in
  the reconstructed TSV.** Contains exactly 5 entries (`k=1..5`), each an
  explicit `(B, D, F)` triple plus its exhaustive E-candidate list. `didx`
  in each entry cross-references the D index in `PAPER4_DLOCAL_B_RESULTS.json`.
- `PAPER4_DLOCAL_BDEF_A_RESULTS.json`: 74 explicit `(B,D,E,F)` quadruples,
  each with an A-search result, used only to *verify* the reconstruction
  (see checks below), not to supply the BDF rows themselves.

## Reconstruction algorithm

1. Read `PAPER4_DLOCAL_BDF_E_RESULTS.json`.
2. For each of its 5 array entries, extract `(k, didx, D, B, F)` verbatim —
   no field is inferred, computed, or taken from prose.
3. Write one TSV row per entry, header `k\tdidx\tD\tB\tF`.

No transformation, filtering, sorting, or interpretation was applied. This
is a field-projection of an already-existing structured file, not a
re-derivation from raw search logs.

## Row count

**5** data rows (+ 1 header row). Matches the milestone document's `8D →
5BDF` claim and the `PAPER4_DLOCAL_B_RESULTS.json` B_count sum (0+2+0+0+0+1+1+1 = 5).

## Output file

- `PAPER4_DLOCAL_BDF_RECONSTRUCTED_v1.tsv`
- SHA256: `df076dc0558445d93c4a8c198fbdafad39290a16c9019385f83279388ec6626a`

## Consistency checks performed (all passed)

| Check | Result |
|---|---|
| Exactly 5 distinct (B,D,F) triples in the E-results source | 5 — PASS |
| Exactly 1 distinct F value across the 5 triples | 1 — PASS |
| Every B/D/F string is a 40-letter ternary (a/b/c) word | PASS |
| Sum of per-triple E-candidate counts | 19+19+12+12+12 = **74** — PASS (matches milestone's `5BDF→74BDEF`) |
| Every one of the 74 `(B,D,E,F)` entries in the A-results file has a `(B,D,F)` matching one of the 5 reconstructed triples | 0 mismatches out of 74 — PASS |
| Total entries in the A-results file | 74 — PASS |
| Per-triple E-set exact match between the E-results source and the A-results file | PASS, no discrepancy |
| No duplicate E within any single triple's E-list | PASS |
| A-field value across all 74 BDEF entries | 74/74 `null` — confirms milestone's `74BDEF→0A` claim is internally consistent with the raw data (this certificate does NOT independently re-run the A-search; it only confirms the preserved raw output is self-consistent) |

## Explicit limitations

- This certificate confirms **internal consistency** of the preserved
  files with each other and with the milestone document's counts. It does
  **not** independently re-verify that the A-side solver's `null` results
  are mathematically correct (that would be Stage-2 mathematical auditing,
  out of scope here).
- It does not verify that `PAPER4_DLOCAL_B_RESULTS.json`'s B-search or
  `PAPER4_DLOCAL_BDF_E_RESULTS.json`'s E-search were themselves exhaustive
  in fact — only that their `status: EXHAUSTED` self-report is consistent
  across files.
- This reconstruction cannot certify byte-identity with whatever the
  original `PAPER4_DLOCAL_BDF.tsv` actually contained (e.g. column order,
  extra annotation columns, or formatting choices are unknown). It
  certifies that the same 5 BDF triples are recoverable, uniquely, from
  independently preserved primary data.
