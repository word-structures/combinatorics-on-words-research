# Paper 4 — reproducibility gate: fail-closed gap report

**Date:** 2026-08-29  
**Status:** sandbox planning artifact; not a completed reproduction package.

The theorem/provenance work has advanced far enough that reproducibility is now
the active submission gate. The current Git `main` does not expose the Paper-4
scratch artifacts used by the recent audits, so exact commands and hashes must
be captured from the local worktree rather than invented.

## Gate rule

A row is submission-ready only when it contains all of:

1. exact input paths;
2. SHA256 of every scientific input;
3. exact script revision/hash;
4. exact command line;
5. runtime environment/version;
6. raw output path + SHA256;
7. expected headline;
8. fail-closed semantics;
9. independent checker route.

No audit prose may substitute for these fields.

## Already frozen anchors

- Paper-4 v0.33 promotion candidate manuscript SHA256:
  `bf06dea9c8f10f7c4afb6da0cb69aa949e9d51f5c7dafa229dbdb04aa4a0e82d`.
- AFE_EXISTS 263-pair preregistration protocol SHA256:
  `e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641`.
- Independent Carpi non-identifiability lemma SHA256:
  `e397ef3285187aabb6bbd4a5fec4e51c056294cba400249ebc88053a8ad829dd`.
- Symbolic 19-family distinctness proof SHA256:
  `efc5d5ec9bd1b51fb7814c7f76dee99b0b13328b6e1f8866a2d929ceb427f856`.

## Highest-value local capture task

On the local Paper-4 scratch worktree, build one machine-readable manifest by
walking only the artifacts actually cited by the manuscript/audits. For each
row in `PAPER4_REPRODUCIBILITY_GAP_MATRIX_2026-08-29.csv`, fill the missing
hashes, commands and versions from the real files and raw logs.

Do **not** regenerate old results merely to manufacture cleaner provenance if
the original evidence still exists. Preserve the original run, then add a
fresh replay separately.

The voided `afexRX` run must remain explicitly blacklisted; only `afexRX2`
belongs to the clean RX evidence chain.
