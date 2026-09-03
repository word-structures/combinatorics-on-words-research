# RAW PRESERVATION ONLY — Paper 3 audit material

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> Whether Paper 3 is publishable or canonical is **not** decided here. Files
> named "theorem", "certifier" or "closure" carry their authors' labels, not a
> verdict from this branch.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `scratch/claude-intake/paper3-audit/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:17:48Z |
| Files preserved | **23 of 23** |
| Size | ~140 KB |
| Byte verification | path+hash listings compared: **identical, 23/23** |

## Uniqueness — measured

Same test as the other rescues: hashed as Git blobs against the blob set of
**eight** secured refs. **0 byte-identical matches, 23 unique.** Paper 3 had
no preservation branch of any kind before this commit.

## Contents, as found

| Group | Material |
|---|---|
| `00-canonical/` | `PAPER3_THEOREM_SKELETON_v0.1`, `PAPER3_MANUSCRIPT_v0.2` |
| `10-certificates-evidence/` | cyclic contact and nilpotency theorem, finite-depth curvature certifier |
| `30-source-verifiers/` | `36_PAPER3_SHORT_CONTACT_NILPOTENCY_RECHECK.py` |
| `antigravity/` | intake and dependency map, short-contact derivation, claim status matrix, hard-response theorem candidate, cleanroom audit sandbox report |
| `antigravity/xi-closure/` | xi-closure theorem, exact decomposition, sign criterion, status matrix, phase-A derivation, and five JS checkers (`check_c`, `check_d1`, `exact_eval`, `exact_eval2`, `numeric_check`) |

The `antigravity/` subtree records work from a **different assistant/tooling
context**. It is preserved as part of the provenance record; under
`EPISTEMIC_DISCIPLINE.md` §5 a second AI's analysis is corroboration, not an
independent verification channel, and nothing here is treated as verified.

## Omissions

**None.** No caches, binaries, archives, PDFs or third-party material present.

## Integrity

```bash
cd rescue/paper3-audit && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
