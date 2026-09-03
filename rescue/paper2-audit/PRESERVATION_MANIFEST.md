# RAW PRESERVATION ONLY — Paper 2 audit material

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> Whether Paper 2 is publishable or canonical is **not** decided here. Files
> named "certificate", "lemma" or "criterion" carry their authors' labels, not
> a verdict from this branch.

## Provenance

| Field | Value |
|---|---|
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source path | `scratch/claude-intake/paper2-audit/` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:17:48Z |
| Files preserved | **33 of 33** |
| Size | ~374 KB |
| Byte verification | path+hash listings compared: **identical, 33/33** |

## Uniqueness — measured

Every file hashed as a Git blob and tested against the blob set of **eight**
secured refs (`origin/main`, the negative-results-harvest branch, and the six
rescue branches for papers 4/5/6/7/8 and structure-discovery):
**0 byte-identical matches, 33 unique.** Paper 2 had no preservation branch of
any kind before this commit.

## Contents, as found

| Group | Material |
|---|---|
| `00-canonical/` | `MANUSCRIPT_DRAFT_v0.2` and `v0.3`, `CLAIMS_EVIDENCE_MATRIX.md`, `PAPER_GAP_AUDIT.md`, V3 integration note |
| `10-certificates-evidence/` | continuation capacity lemma, continuation exclusion lower bound, H4 lag-by-lag autopsy, H4 structural path analysis, mechanism-aware sign criterion, residual compensation certificate, rigorous interval certificate, sufficient sign-reversal inequality, H4-vs-H02 mechanism comparison, hidden-colour kernel analytic derivation, one-endpoint echo-shell mechanism closure, portable continuation echo sign criterion, soft-derivative local tail analysis |
| `20-data-outputs/` | echo-shell control summary and related CSV data |

Two files carry `(1)` duplicate-download suffixes in their names
(`…HIDDEN_COLOR_KERNEL_ANALYTIC_DERIVATION (1).md`,
`…PORTABLE_CONTINUATION_ECHO_SIGN_CRITERION (1).md`). Both were preserved
**exactly as named**; whether they differ from their unsuffixed siblings is a
Phase 2 question, not a preservation one.

## Omissions

**None.** No caches, binaries, archives, PDFs or third-party material present.

## Integrity

```bash
cd rescue/paper2-audit && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
