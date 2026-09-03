# Paper 8 MASTER AUDIT BUNDLE — READ THIS FIRST

**Date:** 2026-09-03  
**Purpose:** handoff package for independent mathematical/code/computational audit of Paper 8.  
**H9:** NOT RUN.  
**Novelty:** NOT ESTABLISHED.  

## Canonical warning

Do **not** read the historical v2/v3/v4 `PASS` labels as the current final theorem status.

After v4, the common finite-to-infinite continuation estimate

`|C_infty(x)-C_L(x)| <= 4 K tau^B`

was red-teamed and rejected as a generic argument.  A symmetric finite-state control model shows that curvature boundary errors can carry polynomial prefactors such as `B^2 tau^B` even when the first derivative vanishes.  The frozen historical archives are intentionally preserved unchanged for provenance.

The only H8 continuum-sign theorem currently repaired by a proof chain that **does not use the rejected v4 tail lemma** is profile `(3,3,2)` in:

`archives/PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03.zip`

Its status is:

`INTERNAL COMPUTER-ASSISTED THEOREM PASS; external directed-rounding / ball-arithmetic audit pending.`

The repaired architecture has **not yet** been propagated to `(4,2,2)`, `(4,3,1)`, or `(5,2,1)`.  Their numerical / exact finite-context evidence remains strong, but their old v2/v3/v4 infinite-volume promotions must be treated as conditional until repaired.

## What is included

This master bundle contains the complete preserved checkpoint lineage currently available for Paper 8:

1. **v2 theorem checkpoint** — includes the large prior profile-geometry/variance-response checkpoint, raw research state, H8 discovery data, direct finite-dimensional S3-resolvent computations, soft paths, return-kernel derivations, and the original 521 theorem chain.
2. **v3 checkpoint** — adds 431 and 422 exact finite-context/mixing certificates and independent cross-checks.
3. **v4 checkpoint** — adds the original 332 4/4/ordering work, 431 L220 upgrade, 521 modular upgrade, common monotonicity/ordering work, and the now-rejected common continuation step.
4. **repaired 332 checkpoint** — replaces the rejected continuation step for `(3,3,2)` with giant-SCC boundary regularization, an exact burned scored-window polynomial, projective burn comparison, and a stationary kernel tail with explicit polynomial shell factors.
5. Human-readable discovery/mechanism/status-correction reports and audit navigation documents.

The historical ZIPs are copied **byte-for-byte** and identified by SHA-256.  They are not silently rewritten to match the later status correction.

## Recommended audit order

Read:

1. `CURRENT_CANONICAL_STATUS.md`
2. `KNOWN_FAILURES_AND_SUPERSEDED_CLAIMS.md`
3. `AUDIT_ROUTE.md`
4. `supporting/H8_PROFILE_RESPONSE_DISCOVERY_REPORT_2026-09-02.md`
5. `supporting/H8_PROFILE_RESPONSE_MECHANISM_REPORT_v2_2026-09-02.md`
6. v2 checkpoint state/claim ledger and the direct S3-resolvent material
7. v4 ordering material **as computational evidence only**
8. `supporting/PAPER8_V4_STATUS_CORRECTION_TAIL_REDTEAM_v0.1_2026-09-03.md`
9. repaired 332 checkpoint, especially `docs/THEOREM_332_REPAIRED_PROOF.md`, `docs/BURN_BRIDGE_LEMMA.md`, `docs/ONE_BLOCK_PROJECTIVE_CERTIFICATE.md`, and `docs/KERNEL_TAIL_LEMMA.md`

Run `python3 RUN_MASTER_AUDIT.py` for the fast preserved-evidence replay.

## External audit priority

The highest-value independent audit is **not** another numerical curve plot.  It is:

1. independent directed-rounding / interval / ball-arithmetic replay of the one-block projective certificate;
2. line-by-line proof audit of the repaired burn bridge and stationary kernel-tail lemmas;
3. independent rebuild/replay of the exact burned 332 polynomial and modular cross-check;
4. only after that, propagate the repaired architecture to 422/431/521;
5. novelty/prior-art audit after mathematical correctness is stable.
