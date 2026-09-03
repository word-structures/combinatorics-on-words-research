# RAW PRESERVATION ONLY — `C:\abc` working-tree unique deltas

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> **This branch does NOT apply these edits to current governance.** It is a
> forensic capture of an old working tree. Nothing here has been merged into
> `AGENTS.md`, `EPISTEMIC_DISCIPLINE.md`, `LITERATURE_COVERAGE.md` or any
> other canonical document on this branch — all of those remain byte-identical
> to `origin/main`.

## Why this is a delta capture and not a tree copy

The source is `C:\abc` on `dummy_branch` at `1541ed5`, **76 commits behind
`origin/main`**, with uncommitted modifications on top. Committing that tree
wholesale would silently revert 76 commits of governance. So each item is
preserved three ways instead — as-found bytes, an exact patch against its own
base, and provenance metadata — and **nothing is applied**.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:\abc` |
| Source branch | `dummy_branch` |
| Source HEAD | `1541ed561a4a1e1e873344815f53a91e807d4c42` |
| Source position | 76 commits behind `origin/main`, 0 ahead |
| Source status at capture | 432 entries (11 modified, 421 untracked) |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:20:00Z |
| Files preserved | 24 |
| Byte verification | 15 direct source/destination comparisons, **0 mismatches** |

## Layout

| Directory | What it holds |
|---|---|
| `untracked_documents/` | Research documents that exist **nowhere in `origin/main`**, byte-identical |
| `as_found_context/` | The full modified tracked files exactly as they sit in `C:\abc`, at their original relative paths |
| `patches_vs_dummy_branch_base/` | `git diff HEAD` for each modified file, i.e. the exact change against its **own** base `1541ed5` — not against current main |

Reading a change requires both: the patch says what was altered relative to the
old base, the context copy says what the file actually contained.

## Unique untracked documents

| File | Size |
|---|---|
| `REFEREE_LOOP_METHOD.md` | 12 KB |
| `STRUCTURAL_CONJECTURE_THEOREM_HUNT_HANDOFF_2026-08-15.md` | 28 KB |
| `WORD_STRUCTURES_STRUCTURAL_CONJECTURE_DISCOVERY_REPORT_2026-08-15.md` | 48 KB |
| `structural-2026-08-16/` | 32 KB — MANIFEST plus `aa2f_measurement.js` and its `.out` |

## Modified tracked files — real deltas vs **current** `origin/main`

Line-ending churn suppressed (`--ignore-cr-at-eol`); raw diffs were up to 40×
larger and almost entirely CRLF noise.

| File | Real delta | Note |
|---|---|---|
| `docs/research/CONJECTURE_GARDEN_V0.md` | **+41 / −0** | Pure addition. A "Literature Gate" research-process rule (6-stage lifecycle, orientation and novelty-audit checkpoints) plus an active question, *Regime-B Residual State Compression* |
| `LITERATURE_COVERAGE.md` | +21 / −88 | Adds **FORBID4 primary-source orientations** — Currie & Rampersad (arXiv:1106.1842) recorded as *opened via direct arXiv LaTeX download*, Eyidoğan–Göral–Tanışalı, Keränen 2010. The −88 is current main's §6 novelty section, which this old tree predates |
| `CURRENT_FOCUS.md` | +58 / −51 | An older (2026-08-16) research direction: Route-C L=6 closure, Gate Lemma, m=1 eliminator |
| `NEGATIVE_RESULTS.md` | +13 / −20 | §27 under an older title; main carries the same result under a different heading |
| `RESEARCH_CONTEXT.md` | +10 / −13 | Older pipeline description |
| `MATH_CLAIMS.md` | +7 / −21 | Contains the DERIVED / LEVEL_1P draft — **already secured separately** on `research/derived-level1p-rescue-2026-08-31` (`037cb89`) |
| `EPISTEMIC_DISCIPLINE.md` | +9 / −94 | Mostly *behind* main; the DERIVED §12 draft is likewise already secured |
| `package.json` / `package-lock.json` | +2/−1, +36/−1 | Adds a `pdf-parse@^1.1.1` dependency |

**A direction warning for Phase 2:** several of these deltas are *older* than
current main, not newer. `CURRENT_FOCUS.md` is dated 2026-08-16 while main's
is 2026-08-25. A "+" line here means "present in the old tree", **not**
"an improvement over main". Each must be judged individually.

The **FORBID4 orientations** are the item most likely to be a genuine gain:
current `LITERATURE_COVERAGE.md` on main still records Currie & Rampersad's
internal content as **UNVERIFIED**, noting the only full-text read was an
AI-mediated extraction. If this draft really was a direct LaTeX-source read,
it may be a Level-2 upgrade. **That determination is Phase 2 semantic work and
is deliberately not made here**, and it must satisfy `AGENTS.md` rule 1.

## Omissions

The other 417 untracked entries in `C:\abc` are not preserved here: root
build noise (`cpp_bench.exe`, `.obj`, `.pdb`), one-off root scripts, worker
checkpoints, and `scratch/` one-offs. They are reported in the phase report as
residual, not swept in without authorisation. Material already secured
elsewhere (DERIVED, the h-family evidence capsule duplicate) was not
re-preserved.

## Integrity

```bash
cd rescue/cabc-unique-deltas && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
