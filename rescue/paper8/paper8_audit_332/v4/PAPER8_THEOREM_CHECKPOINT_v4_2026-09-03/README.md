# Paper 8 theorem checkpoint v4 — 2026-09-03

## Status

This checkpoint preserves the first internally closed H8 **4/4 continuum-sign package** and a stronger computer-assisted **uniform susceptibility-ordering certificate** for the four canonical H8 profiles.

All claims remain subject to the common audit boundary stated below. Novelty is **NOT ESTABLISHED**. H9 was **NOT RUN**.

## Main certified statements inside the audited transfer-matrix setup

Let `x in [0,1]` be the soft restoration parameter (`x=0` hard deletion, `x=1` the L7 baseline) and

`C_v(x) = d_t^2 log q_v(t,x)|_{t=0}`.

The internal certificate chain gives, uniformly in `x`,

- `C_332(x) < 0`, hence hard-deletion `Delta_a = a(0)-a(1) > 0`;
- `C_422(x) > 0`, hence `Delta_a < 0`;
- `C_431(x) > 0`, hence `Delta_a < 0`;
- `C_521(x) > 0`, hence `Delta_a < 0`.

More strongly, the uniform finite-to-infinite envelopes are pairwise disjoint and certify

`C_332(x) < C_422(x) < C_431(x) < C_521(x)`

for every `x in [0,1]`, under the common finite-to-infinite tail lemma.

The certified envelope bounds are approximately:

| profile | infinite susceptibility envelope |
|---|---:|
| (3,3,2) | [-0.932223, -0.294270] |
| (4,2,2) | [0.689183, 1.846948] |
| (4,3,1) | [2.160198, 3.325038] |
| (5,2,1) | [5.650905, 6.554564] |

The smallest separation is the `(4,2,2) -> (4,3,1)` gap, > 0.31325.

## New structural observation

For the selected exact finite-context radii,

`d C_v^(L)(x) / dx > 0`

on the full interval for all four H8 profiles. This is exact integer/Bernstein arithmetic. **This checkpoint does not claim that the infinite-context susceptibility itself is monotone in x.** The infinite ordering above is instead obtained by separated uniform error envelopes.

## Read / replay order

1. `PAPER8_STATE.md`
2. `PAPER8_CLAIM_LEDGER.md`
3. `theorem_332/THEOREM_332_PROOF.md`
4. `common/H8_FINITE_CONTEXT_MONOTONICITY_REPORT.md`
5. `common/H8_ORDERING_PROOF.md`
6. Run `python3 RUN_PAPER8_V4_VERIFY.py`
7. Run `python3 VERIFY_HASHES.py`

## Provenance

- Parent theorem checkpoint v2 SHA-256:
  `5b8a4881b3aa29534f0208fd1a78daaa316f9cd9d727db2cb23afaeb7988935c`
- Parent theorem checkpoint v3 SHA-256:
  `97982664d1c1c491994118421e7b9d2f7995ad6fccfec9b2516836a4b1314ab1`

V4 does not mutate those parent artifacts.

## Audit boundary

The internal arithmetic and cross-checks are strong, but two common proof-engineering obligations remain external-audit items:

1. independent derivation/review of the packaged `4 K tau^B` finite-to-infinite continuation inequality;
2. a fully directed-rounding / ball-arithmetic replay of the floating interval-cover generator.

The interval computations use conservative padding and theorem-level truncation margins, and selected stress/replay checks are preserved, but these are not presented as a substitute for a formally directed-rounding implementation.

Therefore the correct project label is:

`COMPUTER_ASSISTED_THEOREM_PASS / INDEPENDENT_EXTERNAL_AUDIT_PENDING`.
