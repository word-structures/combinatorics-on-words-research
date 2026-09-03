# PAPER 6 — ESSENTIAL RESEARCH CHECKPOINT v1.9
**Date:** 2026-08-30

## Headline

The current Paper-6 target is no longer a compressed deterministic history
state.

It is an exact **observable linear realization**.

At Q2:

\[
218298\to2691\to2689\to1179=12+1167.
\]

The newest result shows that 1434 aggregate measurements indexed only by the
ordered profiles of the last four complete blocks observe the complete
1179-dimensional future space exactly.

Four is the first possible recent-profile window and it succeeds.

## Read first

1. `PAPER6_THEORY_CORE_STATUS_v1.8_2026-08-30.md`
2. `PAPER6_PROFILE_FAMILY_OBSERVABILITY_THEOREM_SEED_v0.1_2026-08-30.md`
3. `PAPER6_PARTITION_LINEAR_SEMANTICS_GAP_THEOREM_SEED_v0.1_2026-08-30.md`
4. `PAPER6_SIGNED_RESPONSE_COCYCLE_SEMANTICS_v0.1_2026-08-30.md`
5. `PAPER6_LATENT_CARRIER_PERSISTENT_INJECTION_THEOREM_SEED_v0.1_2026-08-30.md`

## New exact certificates

- `P6_Q2_LAST4_PROFILE_OBSERVABILITY_EXACT_CERT_v0.2_2026-08-30.json`
- `P6_Q2_VECTOR_KRYLOV_EXACT_CERT_v0.1_2026-08-30.json`
- `P6_Q1_STRUCTURAL_OBSERVABILITY_ODDPRIME_v0.1_2026-08-30.json`

## Replay / verification

- `p6_q2_last4_profile_observability_cert.py`
- `p6_q2_profile_window_measurement_modp.py`
- `rank_mod_u16.cpp`
- `p6_q1_structural_observability_oddprime.py`

## Critical interpretation

Do not say:

> last four profiles determine a state's future.

They do not.

Say:

> sums of the future-count function over last-four-profile fibers form a
> complete set of linear measurements on the Q2 future space.

This is a dual observability statement.
