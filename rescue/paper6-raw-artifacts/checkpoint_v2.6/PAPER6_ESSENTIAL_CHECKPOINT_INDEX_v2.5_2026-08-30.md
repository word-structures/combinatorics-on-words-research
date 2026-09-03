# PAPER 6 — ESSENTIAL CHECKPOINT INDEX v2.5
**Date:** 2026-08-30

## Read first

1. `PAPER6_THEORY_CORE_STATUS_v2.5_2026-08-30.md`
2. `PAPER6_EXACT_SPACETIME_OBSERVABILITY_SPECTRUM_THEOREM_v0.1_2026-08-30.md`
3. `P6_Q2_EXACT_SPACETIME_OBSERVABILITY_SPECTRUM_CERT_v0.1_2026-08-30.json`
4. `PAPER6_GRID_ALIGNMENT_DEGENERACY_AND_MINIMAL_REPAIR_v0.1_2026-08-30.md`
5. `PAPER6_LITERATURE_NOVELTY_AUDIT_v0.1_2026-08-30.md`

## Main theorem

For FULL-L4/Q2:

\[
\dim_{\mathbb Q}V_{\rm cnt}=1179
\]

and the exact recent-profile observability spectrum is

\[
\boxed{197,24,4,2}
\]

for profile depths \(m=1,2,3,4\).

Depths 1--3 attain the row-count lower bound exactly.

Depth 4 has an exact 35-dimensional static grid kernel but exposes every
hidden direction one block later.

## Exact supporting spine

- Q2 semantic hierarchy / vector Krylov certificate
- exact grid rank 1144
- exact 35-row minimal static repair
- 15/16 anchor-policy theorem
- signed-response and latent persistent-injection certificates
- fragment-transport lemmas retained only as geometry bookkeeping
- literature/novelty audit

## Replay

`p6_v25_spacetime_observability_replay.py`

rebuilds the profile descriptors from raw histories and verifies the four
certifying modular full ranks with the compiled C++ rank path.

The m=4 static exact rank 1144 is separately certified by the 652 exact
integer row relations already included in v2.4.
