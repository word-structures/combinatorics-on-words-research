# RAW PRESERVATION ONLY — Paper 6 research artifacts

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> No certificate here has been checked, no theorem assessed, no claim accepted.
> Filenames asserting exactness or certification are **descriptions written by
> their authors**, not findings of this branch.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `scratch/claude-intake/paper6/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:16:03Z |
| Files preserved | **337 of 339** |
| Size | ~28 MB |
| Byte verification | source/destination path+hash listings compared: **identical, 337/337** |

## Uniqueness — measured, not assumed

Every file was hashed as a Git blob and tested against the complete blob set
of **seven** secured refs: `origin/main`,
`origin/docs/negative-results-harvest-2026-08-31`, and all five existing
rescue branches (paper7, paper8, paper5, paper4-repro-harness,
paper4-structure-discovery).

```
secured blob SHAs compared against : 1492
paper6 files                       : 339
byte-identical to something secured:   0
genuinely unique                   : 339
```

**Not one file of this cluster had a second copy anywhere.** The Paper 6 audit
*documents* were merged to main via PR #63; the **raw research artifacts were
not**, and this branch is the first time they enter Git history.

## Structure preserved as found

| Path | Size | Contents |
|---|---|---|
| `checkpoint_v2.6/` | 6.8 MB | v2.6 checkpoint: raw states, observability/linear certificates |
| `_audit26/` | 6.8 MB | audit working set |
| `_audit_2026-08-30/` | 6.2 MB | dated audit, incl. `v23/` |
| `theory_bundle/` | 277 KB | theory core material |
| `unpacked/` | 49 KB | unpacked bundle content |
| 26 loose files | ~7 MB | THEORY_CORE bundles v1.4/v1.8, ESSENTIAL_RESEARCH_CHECKPOINT v2.3/v2.6 (zips), certificates, depth/hierarchy tables, theorem seeds |

Types: 119 JSON, 113 Markdown, 66 Python, 10 `.npy`, 9 zip, 6 `.npz`, 6 CSV,
3 C++, 2 HTML, 1 text, 1 log, 1 JS.

Certificates, seeds, checkpoints, verifier source, raw `.npy`/`.npz` results,
audit records, theorem/proof inputs and negative evidence were **all**
preserved. Archives were kept as archives *and* their unpacked forms retained
where both existed.

`P6_Q2_RAW_STATES_S21.npy` (4.6 MB) appears three times — in
`checkpoint_v2.6/`, `_audit26/` and `_audit_2026-08-30/v23/` — and all three
are byte-identical (`8e6103c3…`). Kept in all three places because source
layout is itself evidence of what each audit actually ran against.

## Omissions

| Item | Reason |
|---|---|
| `__pycache__/` (2 `.pyc`) | Generated CPython bytecode, regenerated on import |

Nothing else. No node_modules, virtualenv, toolchain, PDF, executable or
third-party copyrighted material was present in this cluster.

## External dependencies

Cross-reference scan found **no absolute paths and no references outside the
directory**. Python imports are stdlib plus `numpy`, `scipy`, `sympy` —
recreatable PyPI dependencies, not preserved here.

## Integrity

```bash
cd rescue/paper6-raw-artifacts && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
