# RAW PRESERVATION ONLY — Paper 4 to record-hunt transfer

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> Whether this transfer work is correct or belongs in Paper 4 is **not**
> decided here. "Certificate", "audit" and "kill report" are their authors'
> labels.

## Provenance

| Field | Value |
|---|---|
| Source path | `scratch/paper4-to-recordhunt-transfer-2026-08-29/` |
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:22:26Z |
| Files preserved | **17 of 17** |
| Size | ~74 KB |
| Byte verification | path+hash listings compared: **identical, 17/17** |

## Uniqueness — measured

Hashed as Git blobs against the blob set of the secured refs: **16 unique, 1
already secured**. The one already-secured file is `test_word_400.txt`,
preserved earlier on
`rescue/paper4-structure-discovery-evidence-2026-09-03` because two Gate 0
scripts read it by hardcoded absolute path. It is **kept here too**, in its
original directory, so this transfer directory remains complete and
self-describing rather than depending on a cross-branch lookup.

## Contents

Three generators — `gen_word.js`, `macro_dfs.js`, `macro_prototype.js` — plus
eleven reports and a benchmark CSV:

| Report | Kind |
|---|---|
| `PAPER4_RECORD_STRUCTURE_DISCOVERY_REPORT` | discovery |
| `PAPER4_MACRO_RECORD_HUNTER_PROTOTYPE_REPORT` | prototype |
| `PAPER4_FUTURE_OBSTRUCTION_CERTIFICATE_AUDIT` | audit |
| `PAPER4_PREFIX_PRUNING_AUDIT` | audit |
| `PAPER4_SOLVER_ENCODING_COMPARISON` | comparison |
| `PAPER4_STATE_COMPRESSION_KILL_REPORT` | **negative result** |
| `PAPER4_TO_VEIKKO_SURVIVING_RESEARCH_PROGRAMME` | handoff |
| `PAPER4_TO_VEIKKO_TRANSFER_CORRECTION` | **correction** |
| `PAPER4_TO_VEIKKO_BENCHMARKS` | data |

The kill report and the transfer correction are the reason this directory was
not treated as regenerable helpers: a recorded kill and a recorded correction
are exactly the evidence this project's discipline says must not be lost.

## Omissions

**None.** No caches, binaries, PDFs or third-party material present.

## Integrity

```bash
cd rescue/paper4-recordhunt-transfer && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
