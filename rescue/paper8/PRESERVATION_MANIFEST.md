# RAW PRESERVATION ONLY — Paper 8 cluster

> **PRESERVED != REVIEWED != CANONICAL != CLAIM-APPROVED != MERGE-APPROVED**
>
> Nothing here has been read for correctness, compared for canonicity,
> accepted as a claim, or approved for merge. Whether Paper 8 is a valid
> paper, and whether any theorem in it survives, are untouched questions.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T16:17:05Z |
| Files preserved | 771 |
| Size | ~63 MB |
| Byte verification | full SHA-256 multiset comparison against source: identical, 771/771 |

All material was **untracked** in the source worktree. Nothing was modified,
moved or deleted at the source.

## What was preserved

| Destination | Contents |
|---|---|
| `paper8_intake/PAPER8_MASTER_AUDIT_BUNDLE_2026-09-03.zip` | the original 19 MB master audit bundle, byte-for-byte |
| `paper8_intake/extracted/` | the bundle's extracted tree, preserved alongside the archive rather than assumed redundant |
| `paper8_audit_332/` | the 332 audit: burn-bridge audit, directed-rounding certificate, kernel-tail audit, external audit report |
| `paper8_audit_332/bernstein_cert.py` + `run_full_cert*.py`, `reconstruct_cert.py`, `test_flint.py` | certificate generation/verification source |
| `paper8_audit_332/v2_raw/` | `PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03`, 541 files |
| `paper8_audit_332/v4/` | `PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03` |
| `paper8_audit_332/checkpoint/` | `PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03` |

Content types: 299 JSON, 152 log, 122 Python, 70 `.npz` arrays, 57 Markdown,
24 text, 15 C++, 15 binary, 6 zip. Raw results, logs and `.npz` arrays were
preserved, not filtered — a log is often the only record of what a run
actually did.

Four checkpoint directories carry their **own** `SHA256SUMS.txt`. Those are
preserved as evidence and are also listed in this directory's top-level
manifest.

## Deliberately not copied

| Item | Reason |
|---|---|
| `paper8_audit_332/__pycache__/` (2 `.pyc`) | Generated CPython bytecode, regenerated on import. Not evidence |

No file was excluded for being large, for being a log, for being binary, or
for looking unimportant. No third-party copyrighted material was present in
this cluster.

## Integrity

```bash
cd rescue/paper8 && sha256sum -c SHA256SUMS.txt
```
