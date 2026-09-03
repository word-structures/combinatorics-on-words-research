# RAW PRESERVATION ONLY — Paper 4 reproducibility harness

> **PRESERVED != REVIEWED != CANONICAL != CLAIM-APPROVED != MERGE-APPROVED**
>
> Paper 4 is already canonically promoted on `main` under `papers/paper4/`,
> with frozen manuscript and PDF hashes. **This branch does not touch that
> package.** It preserves uncommitted harness material found beside it, at a
> deliberately non-canonical path, so that promoting it later stays an
> explicit decision rather than a side effect of preservation.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `papers/paper4/reproducibility/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T16:19:07Z |
| Files preserved | 25 |
| Size | ~3.5 MB |
| Byte verification | full SHA-256 multiset comparison against source: identical, 25/25 |

## Non-destructive placement, and why

`origin/main` already tracks **six** files under
`papers/paper4/reproducibility/`:

```
PAPER4_REPLAY_COMMANDS_2026-08-29.md
PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json
PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt
PAPER4_VOIDED_RUNS_2026-08-29.md
README.md
SANDBOX_REPORT_PAPER4_REPRODUCIBILITY_CLOSURE_2026-08-29.md
```

Those six were compared before any copy: **none is modified at the source**,
and **none collides** with the preserved material. Nothing canonical was
overwritten, and nothing on `main` is altered by this branch.

The preserved material is placed at `rescue/paper4-repro-harness/` rather
than at `papers/paper4/reproducibility/` precisely so that it cannot be
mistaken for an accepted extension of the canonical package.

## What was preserved

| Item | Files | Notes |
|---|---|---|
| `PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv` | 1 | the 34-pattern to 19-family table |
| `checkers/` | 4 | verification code |
| `expected/` | 6 | expected-output fixtures |
| `fixtures/` | 1 | test input |
| `lib/` | 5 | shared harness library |
| `runs/` | 8 | recorded run outputs |

Nothing was excluded. No third-party or copyrighted material was present.

## Relationship to the canonical package

The canonical Paper 4 artifacts on `main` remain frozen and untouched:

```
71b185e10e2014ad3b88c1789695eea1a5434089121d0ee221269ab16b85995e  PAPER4_PREPRINT_v1.1_2026-08-29.md
bad59a391fe81aef370c296cc03f2515abbad58faf5f2d8f2b056d08b3cd1bd8  PAPER4_PREPRINT_v1.1_2026-08-29.pdf
```

Whether this harness belongs inside the canonical package, and whether it
reproduces what it claims to, are **open questions for a later phase**.

## Integrity

```bash
cd rescue/paper4-repro-harness && sha256sum -c SHA256SUMS.txt
```
