# RAW PRESERVATION ONLY — Paper 7 cluster

> **PRESERVED != REVIEWED != CANONICAL != CLAIM-APPROVED != MERGE-APPROVED**
>
> This branch exists so that bytes which had no second copy anywhere now have
> one. Nothing here has been read for correctness, compared for canonicity,
> accepted as a claim, or approved for merge. The presence of a file on this
> branch asserts only that the file existed at the source below, with the
> hash recorded here.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Source status at capture | 329 entries (1 modified, 328 untracked) |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T16:09:36Z |
| Files preserved | 367 |
| Size | ~15 MB |
| Byte verification | 370 source/destination SHA-256 comparisons, 0 mismatches |

All material was **untracked** in the source worktree. Nothing was modified,
moved or deleted at the source.

## What was preserved

| Destination | Source | Notes |
|---|---|---|
| `P7_MAIN_THEOREM_RELEASE_v0.1/` | same | 13 files. Both releases preserved; **no canonicity decision made** |
| `P7_MAIN_THEOREM_RELEASE_v0.4/` | same | 13 files, incl. manuscript .md/.tex/.pdf, `G85.json`, cleanroom verifier |
| `P7_RELEASE_v0.2_audit_env/` | `audit_env/` | **Renamed for legibility only; contents byte-identical.** Despite the name, the source directory is not a build environment — it holds the P7 v0.2 release (manuscript .md/.tex/.pdf, release zip, red-team report, verifiers) |
| `CODEX_INDEPENDENT_AUDIT/` | same | External/cleanroom audit. **Excludes the tectonic toolchain — see omissions** |
| `p7_interactive/` | same | `index.html` |
| `root_P7_reports/` | root `P7_*.*` | 77 files, `P7_05`…`P7_32` reports and audits |
| `root_P7_verifiers/` | root | `verify_p7_main_theorem_v4.py`, `run_independent_oracle.py` |
| `scratch_p7_scripts/` | `scratch/p7_*` | P7 export/freeze/search scripts |
| `UNCLASSIFIED_root_tooling/` | root, non-`P7_*` | 100 files, 2.2 MB. **Not asserted to be Paper 7 material.** Packaging/hashing/manifest/verification scripts, run logs, literature JSONs and Paper 4 CSV/JSON found loose in the same worktree root. Preserved rather than triaged, because triage is a later phase and the cost of guessing wrong is loss |
| `PROPOSED_LEDGER_ROWS/` | `MATH_CLAIMS.md` | see below |

## P7-M1 … P7-M5 — proposed ledger rows, NOT promoted

The source worktree had five **uncommitted** rows added to `MATH_CLAIMS.md`,
dated 2026-09-03: rows 116–120, labelled P7-M1 … P7-M5.

**They have not been promoted into any canonical ledger, and this branch does
not add them to its own `MATH_CLAIMS.md`.** `MATH_CLAIMS.md` on this branch
is byte-identical to `origin/main`.

They are preserved in two complementary forms:

| File | Purpose |
|---|---|
| `P7_M1_M5_proposed_rows.patch` | exact `git diff` of the uncommitted change, against source HEAD `452772b`. Replays the five rows and their exact position/context |
| `MATH_CLAIMS.md.AS_FOUND_CONTEXT` | the full source file as found, so the rows can be read in place without applying anything |

```
7ab5062e16cf680a17e2e6e97e309ac1e58d1e29829d105bd41307c02b3426b7  P7_M1_M5_proposed_rows.patch
21c64d4fd90a562da103cbb0277475a402c408be4d559b410cf8e86052d1ff57  MATH_CLAIMS.md.AS_FOUND_CONTEXT
```

The second hash equals the SHA-256 of `MATH_CLAIMS.md` in the source worktree
at capture time, independently recorded during preflight.

The five rows carry `COMPUTED` / `LEVEL_1_INTERNAL_CHECKSUM` in their draft
form. Whether they survive the `AGENTS.md` claims protocol is an open question
this preservation does not touch.

## Deliberately not copied

| Item | Size | Reason |
|---|---|---|
| `CODEX_INDEPENDENT_AUDIT/tmp/tectonic-0.17.0/` | 70 MB | Downloaded LaTeX toolchain, incl. a 51 MB `tectonic.exe` and its 21 MB source zip. Third-party binary, freely re-downloadable, exceeds sane Git object size. **Not research evidence** |
| `CODEX_INDEPENDENT_AUDIT/tmp/tectonic-cache/` | 44 MB | Generated font/format cache of the above, incl. a 24 MB `.fmt`. Reproducible by running the toolchain |

| `CODEX_INDEPENDENT_AUDIT/literature/Shur_2008_primary.pdf` | 149 KB | **Third-party copyrighted literature.** `AGENTS.md` and the repository's rights policy forbid redistributing cited sources; the paper is cited by identifier, never carried in history. It remains present and untouched in the source worktree. SHA-256 `b31a2d78b6ff05ebac6869e3be4c6e47761cde41dbc93482f119e84bac011700` |

Everything else under `CODEX_INDEPENDENT_AUDIT/tmp/` **was** preserved —
`v04_rendered`, `pdfs`, `v02_baseline`, `v04_build` are rendered audit
outputs, not toolchain.

No file was excluded for being in `scratch/`, for being a script, or for
looking unimportant. The only content exclusions are the two toolchain
directories and the one third-party paper above.

## Integrity

`SHA256SUMS.txt` lists every preserved file. Verify with:

```bash
cd rescue/paper7 && sha256sum -c SHA256SUMS.txt
```
