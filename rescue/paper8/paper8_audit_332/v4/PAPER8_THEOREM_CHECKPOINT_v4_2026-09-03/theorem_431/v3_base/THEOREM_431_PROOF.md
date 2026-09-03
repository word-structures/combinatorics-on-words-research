# Theorem 431 — proof/certificate outline

For the H8 canonical profile `v=(4,3,1)`, let `x=exp(-epsilon)` with `x=0` hard deletion and `x=1` the L7 baseline. Define

`C_431(x) = d_t^2 log q_431(t,x)|_{t=0}`.

The internal v3 certificate establishes `C_431(x)>0` for all `x in [0,1]`, subject to the common interval-roundoff and finite-to-infinite tail audit boundary.

## A. Exact finite context

Radius `L=176` gives 353 transfer steps. Exact max-plus enumeration proves the maximum target-edge degree is exactly 158, and the GMP DP allocates degree 158. No truncation occurs.

The exact first-derivative symmetry polynomial is `G == 0`. A 10-piece rational Bernstein certificate gives

`C_176(x) > 1.9643001993601346` on `[0,1]`.

A second exact implementation converts the global power-basis polynomial to Bernstein form and uses sequential exact de Casteljau subdivision; all ten rational lower bounds match exactly. An outgoing-edge modular DP independently matches `F,G,N0,D0` coefficientwise modulo four primes.

## B. Bidirectional mixing

A tropical-scaled 44-step quotient cover contains 90 adjacent x-intervals and both time directions, 180 records total. The observed minimum stored lower bound is

`alpha_44 > 0.913352001287192`.

The theorem deliberately uses only

`alpha = 91/100`, `tau = 9/100`.

The three weakest reverse intervals were independently recomputed with float128 and a much smaller relative pad; the minimum was `0.9133520022387972`.

## C. Tail

Deterministic 44-step enumeration gives `4 <= N_a <= 29`. Thus centered block score `Y=N_a-44/3` lies in `[-32/3,43/3]`; use `M=43/3`, oscillation `R=25`, and `D=R/alpha`.

With four complete 44-step blocks per side, the packaged continuation inequality gives

`E_tail < 1.7607113665520568`.

Therefore

`C_431(x) > 1.9643001993601346 - 1.7607113665520568 > 0.2035888328080777`.

Since `d log(lambda)/dx > 0` for `x>0`, `da/dx>0`, hence `a(0)<a(1)` and the hard-deletion response is negative.

## Endpoint

At x=0 the target-deleted quotient has one cyclic Perron SCC of size 4416; all 198 other SCCs are transient singleton/no-internal-edge components. Forward and reverse tropical exponents are nonnegative and lie in `{0,1,2,3}`.

## Status

`COMPUTER_ASSISTED_THEOREM_PASS_INTERNAL / EXTERNAL_INTERVAL_AND_TAIL_AUDIT_PENDING`.
