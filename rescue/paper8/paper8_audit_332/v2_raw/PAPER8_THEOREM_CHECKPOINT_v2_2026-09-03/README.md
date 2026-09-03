# Paper 8 theorem checkpoint v2 — 2026-09-03

## Identity

Working paper line: **Profile Geometry, Return Kernels, and Variance Response under Abelian-Square Deletion**.

This package is a durable research checkpoint for the Paper 8 candidate. It supersedes the earlier H8-only checkpoints as the preferred resume point.

## Strongest current result

For the H8 canonical profile `v=(5,2,1)`, the package contains an internally completed computer-assisted continuum-sign certificate for

\[
C_{521}(x)>0\qquad (0\le x\le1),
\]

where `x=exp(-epsilon)` parametrizes soft deletion from hard deletion `x=0` to the L7 baseline `x=1`.

Consequently, within the audited transfer-matrix setup,

\[
a_{\rm hard}<a_{\rm baseline},\qquad \Delta_a(5,2,1)<0.
\]

**Epistemic status:** `COMPUTER_ASSISTED_THEOREM_PASS / INDEPENDENT_EXTERNAL_AUDIT_PENDING`.

This is not a novelty claim. `NOVELTY_STATUS = NOT_ESTABLISHED`.

## Certificate spine

1. Exact finite-context arithmetic at `L=180` using GMP/integer polynomial arithmetic.
2. Exact Bernstein positivity on 20 rational subintervals, giving
   `C_180(x) > 5.499062597288395` uniformly.
3. Bidirectional 36-step interval minorization cover over all `x in [0,1]`:
   200 forward intervals + 260 reverse intervals.
4. Certified observed global lower bound `alpha_36 > 0.8905641208011343`, deliberately weakened in the theorem to `alpha=89/100` and `tau=11/100`.
5. Finite-to-infinite tail lemma with the deliberately conservative exact bound
   `E_tail < 0.3208964539844447`.
6. Resulting lower bound
   `C_521(x) > 5.178166143303951` uniformly.

## Verification

Run:

```bash
bash RUN_THEOREM_521_VERIFY.sh
```

A successful run prints:

`THEOREM_521_CHECKPOINT_VERIFICATION = PASS`

The verifier checks artifact integrity, exact rational inequalities, interval-cover completeness, minimum alpha, and the final tail arithmetic. It does **not** substitute for an independent audit of the mathematical tail lemma or the interval-generation source code.

## Layout

- `theorem_521/` — curated theorem certificate, proof notes, data, calculators, verifier.
- `paper8_state/` — current research state, claim ledger, next-plan and handoff.
- `reports/` — H8 discovery/mechanism reports and machine results.
- `raw_research_state/` — complete current `h8cp` and `p8work` working state.
- `prior_checkpoint/` — previous Paper 8 master ZIP and hash for provenance.
- `SHA256SUMS.txt` — hashes for every package file except itself.

## Boundaries

- H8 was intentionally opened as exploratory discovery data; it is not an untouched holdout.
- H9 has not been opened in this research line.
- The other H8 profiles `(3,3,2)`, `(4,2,2)`, `(4,3,1)` remain open at the same full continuum theorem level.
- The finite H2–H8 19/19 sign pattern is evidence, not a universal theorem.
- Novelty remains unestablished until a dedicated literature audit is completed.
