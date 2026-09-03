# RAW PRESERVATION ONLY — preservation supplement

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**

Closes a gap found by the final closure sweep, plus the loose files no
earlier cluster covered.

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:44:11Z |
| Files preserved | **210** |
| Size | ~3.6 MB |
| Byte verification | 210 source/destination SHA-256 comparisons, **0 mismatches** |

## The gap this closes

`scratch/p7/` — a **Paper 7 oracle working directory** — was missed by the
Phase 1.5 Paper 7 rescue. That pass globbed `scratch/p7_*`, which matches
*files* named `p7_…` but never matches the *directory* `scratch/p7/`. The
error was found only by hashing every untracked file in the worktree against
the full secured blob set, which is why that sweep was run rather than trusted
to earlier inventories.

| Directory | Source | Files |
|---|---|---|
| `paper7-oracle-worktree/` | `scratch/p7/` | 41 |
| `claude-intake-loose/` | loose files at `scratch/claude-intake/` + `negative_results/` | 156 |
| `scratch-loose/` | loose files at `scratch/` | 13 |

`paper7-oracle-worktree/` holds the oracle sources (`p7-oracle-a`, `-b`,
`-c-anatomy` in C++ and JS), node validators, frontier dumps for lengths
23–32, terminal kill-mask counts, witness-profile counts, a minimal mask
antichain, a minimum scale cover, trajectory and tracker output, and the
monster run log.

`claude-intake-loose/` includes the Paper 4 reproducibility spec and gap
matrix, the v0.33 canonical promotion candidate and referee repair sandbox
archives, the Carpi v2 review handoff, the negative-results harvest, the
research-paper pipeline proposal and refinement, and the adversarial
AI-assisted research manual.

## Deliberately not copied

| Item | Size | Reason |
|---|---|---|
| `P7_117_FRONTIER.bin` | **251,741,529 bytes (240 MB)** | **Exceeds GitHub's hard 100 MB per-file limit — Git cannot hold it.** Not a judgement about value. SHA-256 `6d3cd2a23e5bba7e1cda91794994225502074f698dc7426d38d5d5ddb964aada`. It remains at `scratch/p7/P7_117_FRONTIER.bin` in the source worktree and **has no second copy anywhere.** See the phase report: this needs an owner decision (Git LFS, or archival outside Git) |
| 19 `.obj` / `.pdb` / `.exe` / `.ilk` | ~5 MB | MSVC build artifacts, regenerable from the `.cpp` sources preserved here |

## Integrity

```bash
cd rescue/preservation-supplement && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
