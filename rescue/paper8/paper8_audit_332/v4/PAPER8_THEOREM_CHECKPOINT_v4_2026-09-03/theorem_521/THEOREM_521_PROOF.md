# Theorem 521 — proof/certificate outline

## Statement

For the H8 canonical profile `v=(5,2,1)`, let `x=exp(-epsilon) in [0,1]` be the soft-deletion parameter, with `x=0` hard deletion and `x=1` the L7 baseline. In the audited finite-state transfer-matrix model, define

\[
C_{521}(x)=\partial_t^2\log q_{521}(t,x)\big|_{t=0}.
\]

The certificate establishes

\[
C_{521}(x)>0\quad\text{for all }x\in[0,1].
\]

Since `d log(lambda)/dx > 0` for `x>0` (restoring positive target-edge weight increases the Perron root), the identity

\[
\frac{da}{dx}=C_{521}(x)\frac{d\log\lambda}{dx}
\]

implies `da/dx>0` on `(0,1]`. Therefore

\[
a(0)<a(1),
\]

so the hard-deletion response is negative.

## Step A — exact finite-context certificate

An independently cross-validated GMP/integer DP constructs the symmetric finite-context susceptibility at radius `L=180`. Exact Bernstein arithmetic and a 20-piece rational subdivision of `[0,1]` give

\[
C_{180}(x)>5.499062597288395\qquad\forall x\in[0,1].
\]

No floating-point sign decision is used in this step. See:

- `data/finite_context_exact_pid4_L180_bernstein.json`
- `data/L180_exact_subdivision_20.json`

## Step B — uniform bidirectional mixing certificate

The tropical-scaled quotient regularizes the hard endpoint. A Collatz–Wielandt/common-minorization interval calculation covers the entire parameter interval in both time directions.

The stored cover contains 200 forward and 260 reverse intervals. The weakest certified lower bound is

\[
\alpha_{36}>0.8905641208011343.
\]

The theorem deliberately discards precision and uses only

\[
\alpha=\frac{89}{100},\qquad \tau=1-\alpha=\frac{11}{100}.
\]

See `data/ALPHA36_BIDIRECTIONAL_INTERVAL_COVER.json` and the raw chunk files.

## Step C — finite-to-infinite tail

For a 36-step block, deterministic enumeration gives `3 <= N_a <= 24`; with centered letter score this is `-9 <= Y <= 12`. Thus use

\[
M=12,\qquad R=21.
\]

With the bidirectional contraction `tau=11/100`, the packaged tail lemma gives

\[
|C_{521}(x)-C_{180}(x)|\le E_{tail}
<0.3208964539844447
\]

uniformly. The exact rational computation is reproduced by the verifier.

Consequently

\[
C_{521}(x)
>5.499062597288395-0.3208964539844447
>5.178166143303951>0.
\]

## Endpoint

The hard-deletion graph has one dominant Perron SCC and only transient singleton/no-internal-edge nondominant SCCs for this profile. The tropical-scaled formulation supplies the regular hard limit used in the interval cover. See `data/hard_endpoint_structure.json`.

## Audit boundary

`RUN_THEOREM_521_VERIFY.py` verifies the exact rational arithmetic, cover completeness, stored certified lower bounds and final margin. It does not independently prove the tail lemma from first principles and does not independently re-run all interval-generation floating-point recurrences. Those are the next red-team targets.

Therefore the correct status is:

`COMPUTER_ASSISTED_THEOREM_PASS / INDEPENDENT_EXTERNAL_AUDIT_PENDING`.
