# Theorem 422 — proof/certificate outline

For the H8 canonical profile `v=(4,2,2)`, let `x=exp(-epsilon)` with `x=0` hard deletion and `x=1` the L7 baseline. Define

`C_422(x) = d_t^2 log q_422(t,x)|_{t=0}`.

The internal v3 certificate establishes `C_422(x)>0` for all `x in [0,1]`, subject to the common interval-roundoff and finite-to-infinite tail audit boundary.

## A. Exact finite context

Radius `L=220` gives 441 transfer steps. Exact max-plus enumeration proves the maximum target-edge degree is exactly 111. The GMP DP therefore allocates degree 111 with no truncation.

The exact symmetry polynomial is `G == 0`. Ten-piece exact rational Bernstein subdivision gives

`C_220(x) > 0.9272878857676629` on `[0,1]`.

An independent exact de Casteljau reconstruction reproduces every interval lower bound exactly. An outgoing-edge modular implementation reproduces `F,G,N0,D0` coefficientwise modulo four primes.

## B. Bidirectional mixing

The 44-step cover contains 90 adjacent intervals and both time directions, 180 records total. The observed minimum is the forward interval `[0,0.004]`:

`alpha_44 > 0.8910440039974096`.

The theorem uses only

`alpha=89/100`, `tau=11/100`.

The weakest interval was recomputed in float128 as `0.891044004940431`.

## C. Tail

Again `4 <= N_a <= 29` over 44 steps, so use `M=43/3`, `R=25`, `D=R/alpha`. Radius 220 contains five complete 44-step blocks per side. The packaged continuation inequality gives

`E_tail < 0.4552711467305119`.

Thus

`C_422(x) > 0.9272878857676629 - 0.4552711467305119 > 0.4720167390371510`.

Therefore `da/dx>0` for x>0 and the hard-deletion response is negative.

## Endpoint

The hard-deleted quotient has one cyclic Perron SCC of size 4782 and 27 transient singleton/no-internal-edge components. Tropical exponents in both directions are only `{0,1}`.

## Status

`COMPUTER_ASSISTED_THEOREM_PASS_INTERNAL / EXTERNAL_INTERVAL_AND_TAIL_AUDIT_PENDING`.
