# RAW PRESERVATION ONLY — residual research artifacts

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**

Four clusters that are individually modest and did not belong to any single
paper program. **Each keeps its own source path and its own provenance row** —
they are stored side by side, not merged. Paper 2, Paper 3 and Paper 6
material was deliberately **not** placed here; those have their own branches.

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:22:57Z |
| Total files | **149** |

## Cluster 1 — `unified-pipeline/`

| | |
|---|---|
| Source | `scratch/unified-pipeline/` |
| Files | 113 preserved (1 `.pyc` dropped) · ~2.9 MB |
| Verification | **identical, 113/113** |
| Uniqueness | **0 secured matches, 114 unique** |
| Classification | **UNIQUE RESEARCH ARTIFACT** |

40 JS, 32 Markdown, 18 JSON, 15 Python, 6 text, 2 CSV. A staged pipeline
(`1_build_3L_states`, `2_build_transitions`, `3_find_cycle`,
`3_find_morphism`), an `exact-reachable-set-compiler-2026-08-29/` subtree
with its own cleanroom audit, and record words `aa2f15796`, `aa2f25379`,
`aa2fr3268`.

Those record-word files matter independently of the pipeline: under
`AGENTS.md` rule 17 a claimed record must be validated by an independent
post-check, which requires the word itself.

## Cluster 2 — `90-uncertain/`

| | |
|---|---|
| Source | `scratch/claude-intake/90-uncertain/` |
| Files | 21 · ~444 KB |
| Verification | **identical, 21/21** |
| Uniqueness | **0 secured matches, 21 unique** |
| Classification | **UNIQUE RESEARCH ARTIFACT** |

15 Markdown, 5 JSON, 1 CSV: L6 minimal-chain minorisation and residual-tail
certificates, and the **PEX3 / PEXC4 preregistration set** — holdout battery
freezes, frozen prediction JSONs, a prospective holdout protocol, pilot
summary, design freeze, and the first prospective certified successes.

The directory name records that whoever filed it was unsure of its
disposition. That is a reason to preserve it, not to discard it — and frozen
predictions are precisely the artifact that cannot be reconstructed after the
fact.

## Cluster 3 — `paper4-repro-capture-2026-08-29/`

| | |
|---|---|
| Source | `scratch/paper4-repro-capture-2026-08-29/` |
| Files | 2 · ~52 KB |
| Verification | **identical, 2/2** |
| Uniqueness | **0 secured matches, 2 unique** |
| Classification | **UNIQUE RESEARCH ARTIFACT** (provenance) |

`PAPER4_LOCAL_REPRO_CAPTURE.json` and its `SHA256SUMS` — a local
reproducibility capture for the canonically promoted Paper 4.

## Cluster 4 — `paper4-repro-replay-2026-08-29/`

| | |
|---|---|
| Source | `scratch/paper4-repro-replay-2026-08-29/` |
| Files | 13 preserved · ~54 KB |
| Verification | **identical, 13/13** |
| Uniqueness | **3 already secured, 10 unique** |
| Classification | **UNIQUE RESEARCH ARTIFACT** (partially duplicated) |

Three files are byte-identical to material already on `origin/main` under
`papers/paper4/reproducibility/`. They are **kept in place** so the replay
directory stays internally complete rather than depending on a cross-branch
lookup; the duplication is recorded rather than resolved.

The unique remainder is the actual run evidence — `afe_263_run_output.txt`,
`impl_semantics_output.txt`, `rx_h_matched_output.txt`,
`sixdomain_full_output.txt`, a manifest self-check, and two manifest updaters.
Raw stdout of a run is not regenerable once the environment moves on.

## Omissions

One `__pycache__` under `unified-pipeline/` (1 `.pyc`), regenerated on
import. Nothing else. No third-party or copyrighted material in any cluster.

## Integrity

Each cluster carries its own `PRESERVATION_SHA256SUMS.txt`.
