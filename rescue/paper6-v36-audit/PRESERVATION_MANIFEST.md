# RAW PRESERVATION ONLY — Paper 6 v3.5 / v3.6 audit

> **PRESERVED != REVIEWED != CANONICAL != VERIFIED != CLAIM-APPROVED != MERGE-APPROVED**
>
> No certificate here has been checked and no theorem seed assessed.

## Why this is its own branch

This is **Paper 6 program material**, not miscellaneous residue, so it keeps
separate provenance instead of being folded into the residual rescue. It is
also **distinct from** `rescue/paper6-raw-artifacts-2026-09-03`: that branch
holds the v1.x/v2.x lineage from `scratch/claude-intake/paper6/`, while this
is the **v3.5/v3.6** lineage dated 2026-08-31, found separately in
`scratch/v36_audit/`. Zero blob overlap between them.

## Provenance

| Field | Value |
|---|---|
| Source path | `scratch/v36_audit/` |
| Source worktree | `C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25` |
| Source branch | `docs/paper6-negative-results-audit-final-2026-08-31` |
| Source HEAD | `452772b859f3c2c9d87465e4254a5846992148ef` |
| Rescue base (`origin/main`) | `892b8c62f55150ee3b7355fdc9d696b7bb177058` |
| Preservation timestamp (UTC) | 2026-09-03T17:22:26Z |
| Files preserved | **26 of 26** |
| Size | ~160 KB |
| Byte verification | path+hash listings compared: **identical, 26/26** |
| Uniqueness | hashed against all secured refs: **0 matches, 26 unique** |

## Contents

18 Markdown, 8 JSON, under `bundle/`:

- adversarial checkpoints **v3.5** and **v3.6**;
- theorem seeds — bounded-extension Parikh obstacle, Parikh-obstacle target
  transport;
- test certificates — abelian p-power response, long-period response
  saturation, Parikh prefix obstacle compiler, target transport hierarchy;
- a target-transport implementation audit;
- **preregistration documents** for the v3.5 experiments.

The preregistrations are the reason this cluster ranks as evidence rather than
notes: under `PAPER_LIFECYCLE.md` Gate 0 a written kill criterion recorded
*before* the supporting run is the artifact that makes a later result
interpretable. Losing a preregistration cannot be repaired by rerunning
anything.

## Omissions

**None.** No caches, binaries, PDFs or third-party material present.

## Integrity

```bash
cd rescue/paper6-v36-audit && sha256sum -c PRESERVATION_SHA256SUMS.txt
```
