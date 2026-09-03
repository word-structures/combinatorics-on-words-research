# RAW PRESERVATION ONLY — Paper 4 Gate 0 structure-discovery evidence

> **PRESERVED != REVIEWED != CANONICAL != CLAIM-APPROVED != MERGE-APPROVED**
>
> This branch preserves evidence bytes. It does **not** judge whether Gate 0
> is scientifically satisfied, and it does **not** edit any canonical Paper 4
> file. Integration is a later decision.

## Why this directory is unusually important

Paper 4 is canonically promoted on `main`. Its canonical status document
cites this directory as the evidence closing **Gate 0**, and the directory was
**untracked** — present in exactly one dirty worktree, in no other worktree,
and nowhere in `origin/main`'s history.

Exact canonical reference, quoted verbatim from
`papers/paper4/PAPER_STATUS.md` at `origin/main`
(`892b8c62f55150ee3b7355fdc9d696b7bb177058`), line 28:

```
| 0 | Discovery | **PASS** | scratch/structure-discovery-2026-08-29/ |
```

So a **PASS** on a canonical gate pointed at a path that existed only in one
person's working directory. That is a provenance gap, not a mathematical
problem, and this branch closes only the preservation half of it. The
canonical file is deliberately left untouched — **the path in it was not
rewritten** to point here.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `scratch/structure-discovery-2026-08-29/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:09:43Z |
| Files preserved | 6 evidence + 1 external dependency = **7** |
| Size | ~29 KB |
| Byte verification | source/destination path+hash listings **identical, 6/6**; dependency hash matches |

## Contents

| File | Role |
|---|---|
| `find_macro_alphabet.js` | derives the macro alphabet |
| `macro_alphabet.json` | its output |
| `extract_transition_dag.js` | extracts the transition DAG |
| `transition_dag.json` | its output |
| `compile_to_paper4_algebra.js` | compiles to the Paper 4 algebra |
| `paper4_compiled_system.json` | its output |

Three generators and their three outputs — the discovery chain the Gate 0 row
refers to.

## External dependency, preserved

Both `extract_transition_dag.js` and `find_macro_alphabet.js` read an input
by **hardcoded absolute path**:

```
C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-to-recordhunt-transfer-2026-08-29/test_word_400.txt
```

That file is 400 bytes, untracked, and **not** in `origin/main`. Without it
the evidence is not reproducible, so it is preserved under
`_EXTERNAL_DEPENDENCY/`, at its original relative path so the reference stays
reconstructible:

```
f1302159fbbe52eb056eb7e6c8c90de74a49846466fe34b5b770b8a652a10093  test_word_400.txt
```

**The scripts were not edited** to change that absolute path. Rewriting a
hardcoded path would alter evidence; recording the dependency does not.

Only the referenced file was taken. The remaining 16 files of
`scratch/paper4-to-recordhunt-transfer-2026-08-29/` (74 KB total) are **not**
preserved here — they are unique and untracked, and are reported as a
remaining candidate rather than swept in without authorisation.

## Omissions

**None** within the evidence directory. No caches, binaries, third-party or
copyrighted material were present.

## Integrity

```bash
cd rescue/paper4-structure-discovery-evidence && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
