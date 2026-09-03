# RAW PRESERVATION ONLY — Paper 5 end-to-end cluster

> **PRESERVED != REVIEWED != CANONICAL != CLAIM-APPROVED != MERGE-APPROVED**
>
> No theorem here has been assessed, no claim accepted, no canonicity decided.
> The presence of a file on this branch asserts only that it existed at the
> source below with the hash recorded here.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `scratch/paper5-end-to-end-2026-08-29/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:08:27Z |
| Files preserved | **50 of 50** |
| Size | ~4.5 MB |
| Byte verification | path+hash listings of source and destination compared: **identical, 50/50** |

The directory was **untracked** at the source and exists in **no other
worktree and nowhere in `origin/main`'s history**. Before this branch it had
no second copy.

## Contents

18 Python, 13 Markdown, 13 JSON, 5 text, 1 CSV. No binaries, archives, PDFs
or caches of any kind were present.

| Group | Files |
|---|---|
| Intake / verification | `00_INTAKE_MANIFEST.md`, `00_SHA256_VERIFICATION.json`, `SHA256SUMS.txt` |
| Reproduction | `01_REPRODUCTION_MACHINE.json`, `01_REPRODUCTION_REPORT.md` |
| RR parent generator audit | `02_RR_PARENT_GENERATOR_AUDIT.md`, `02_RR_PARENT_GENERATOR_MACHINE.json`, `run_rr_audit.py` |
| Theorem material | `05_REACHABLE_SET_COMPLEXITY_THEOREM.md` |
| Novelty | `07_NOVELTY_AUDIT.md` |
| Status | `PAPER5_CLAIM_FREEZE_CANDIDATE.md`, `PAPER5_RESEARCH_VERDICT.md` |
| Task machines | `TASK_A_ROLE_d/f`, `TASK_B_ROLE_d/f`, `TASK_D` `_MACHINE.json` |
| Executable code | `e2e.py`, `e2e_lib.py`, `task_a*.py`, `task_b*.py`, `task_d.py`, `check_d.py`, `check_v.py`, `fast_v.py`, `precompute_parents.py`, `test_g3.py`, `test_short.py` |
| Data | `parents.txt` (4.4 MB — the bulk of the directory) |
| `intake_unpacked/` | 12 files under `CLEANROOM/` and `FULL_RR/` |
| `invalid_assumed_outputs/` | 5 files. **Preserved deliberately** — outputs recorded as invalid are negative-result evidence, not waste |

## Note on the directory's own `SHA256SUMS.txt`

Running the source directory's own integrity file at capture time gives
**32 OK, 1 FAILED, 1 improperly formatted line**, and it covers **34 entries
against 47 non-manifest files present**.

Examined rather than repaired:

- the single `FAILED` entry is **`SHA256SUMS.txt` itself** — the manifest
  lists its own name, which can never hash to its own recorded value. A
  self-reference artifact, **not a corrupted research file**;
- 13 files present are not covered by that manifest at all, consistent with
  content having been added after it was written.

**Nothing was corrected, regenerated or normalised.** The file is preserved
exactly as found, because an integrity file's actual state is itself evidence.
`PRESERVATION_SHA256SUMS.txt` is a *separate*, complete listing of all 50
preserved files, added alongside rather than replacing the original.

## Omissions

**None.** No file was excluded. No third-party copyrighted material, toolchain
or cache was present in this directory.

## External dependencies

Source-level cross-reference scan found **no references to paths outside this
directory**. Python imports are stdlib only, except **`sympy`** — a
recreatable external dependency (PyPI), not preserved here.

## Integrity

```bash
cd rescue/paper5-end-to-end && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
