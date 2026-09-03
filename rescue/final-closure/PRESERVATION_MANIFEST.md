# RAW PRESERVATION ONLY — final closure artifacts

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**

The last sweep of unique, non-regenerable research material found by a
full-tree blob comparison against **fifteen** secured refs.

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:38:03Z |
| Files preserved | **1007** |
| Size | ~58 MB |
| Byte verification | every cluster compared path-by-path and hash-by-hash: **all OK** |

## Clusters, each with its own source path

| Directory here | Source path | Files |
|---|---|---|
| `paper4-next-version-sandbox/` | `scratch/claude-intake/_paper4-next-version-sandbox/` | 346 |
| `profile-response-baseline/` | `scratch/profile-response-baseline-h2-h7-2026-08-25/` | 261 |
| `intake-paper4-v030-audit/` | `scratch/claude-intake/paper4-v030-audit/` | 172 |
| `finalpaper4-nonenv/` | `scratch/claude-intake/finalpaper4/` **minus `node_modules`** | 124 |
| `clean_room_audit/` | `scratch/clean_room_audit/` | 22 |
| `intake-paper4-audit/` | `scratch/claude-intake/paper4-audit/` | 18 |
| `intake-_paper4-recovery-temp/` | `scratch/claude-intake/_paper4-recovery-temp/` | 17 |
| `intake-_paper4-master-closure-2026-08-29/` | same under `claude-intake/` | 15 |
| `intake-_profile_guided_synthesis/` | same under `claude-intake/` | 11 |
| `intake-00-shared-governance/` | same under `claude-intake/` | 8 |
| `intake-temp_proof_closure/` | same under `claude-intake/` | 6 |
| `intake-paper4-candidate/` | same under `claude-intake/` | 3 |
| `intake-humanreadability/` | same under `claude-intake/` | 2 |
| `intake-paper5/` | same under `claude-intake/` | 2 |

## Why the sandbox was not treated as scratch

`_paper4-next-version-sandbox/` reads like disposable exploration from its
name. It is not. It contains **six preregistration documents** (AF/AFE
replication, exposure-matched R, target-value census), **two preregistration
deviation notes**, a `FROZEN_RECORD_2026-08-28.sha256`, fourteen numbered
sandbox reports, an ASET-E obstruction theorem candidate, novelty and
literature audits, a Paper 2/3/4 cross-paper transfer audit, v0.32a and v0.33
claim-audit matrices with their required-patch lists, and ~11 MB of raw run
output.

A preregistration, a deviation note and a frozen record are the three things
that **cannot be reconstructed after the fact** — rerunning the computation
does not recreate what was predicted beforehand, or what changed, or what the
state was when it was frozen.

The same logic applies to `profile-response-baseline/`, whose `run_0` …
`run_3d2` chain records `previous_unaccepted`, `formula_correction`,
`integrity_audit`, `durable_recovery`, `certificate_repair` and
`profile_identity_crosscheck` — a **correction lineage**, not a result set —
and to `clean_room_audit/`, which carries `phaseA`, `phaseA_corrected` and
`phaseA_final` side by side.

## Omissions, with reasons

| Item | Size | Reason |
|---|---|---|
| `finalpaper4/_final_audit_2026-08-29/tools/node_modules/` | ~147 MB, 815 files | Recreatable npm dependency tree (vendored pdfjs; 168 `.bcmap` character maps). Not research evidence |
| `__pycache__` directories | small | Generated CPython bytecode |

Everything else in every listed cluster was preserved. The seven PDFs included
are all **the project's own** Paper 4 artifacts (v1.0, v1.1, FIG1/2/3,
baseline rebuild) — no third-party literature is redistributed by this branch.

## Integrity

```bash
cd rescue/final-closure && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
