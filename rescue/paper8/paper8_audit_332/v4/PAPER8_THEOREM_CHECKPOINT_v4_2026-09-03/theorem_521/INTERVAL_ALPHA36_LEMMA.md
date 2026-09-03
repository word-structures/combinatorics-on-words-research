# 36-step interval minorization lemma — certificate description

The interval cover uses a tropical-scaled nonnegative matrix family for the `(5,2,1)` soft-deletion quotient. For each parameter interval `[a,b]` it stores a certified lower bound for the 36-step Parry-chain common minorization.

The computation uses:

1. a positive midpoint comparison vector;
2. Collatz–Wielandt row-sum bounds over the whole interval;
3. a row-normalized surrogate 36-step kernel;
4. an entrywise common-minorization lower bound;
5. a projective enclosure transferring the surrogate bound to the true Perron/Parry chain;
6. outward padding in nonnegative sparse recurrences.

The cover is run in both forward and reverse time.

Coverage:

- forward: 200 adjacent intervals of width 0.005 on `[0,1]`;
- reverse: 100 intervals of width 0.002 on `[0,0.2]`, then 160 intervals of width 0.005 on `[0.2,1]`;
- total: 460 intervals.

Stored minima:

\[
\alpha^{fwd}_{36}\ge0.9039531922234946,
\]

\[
\alpha^{rev}_{36}\ge0.8905641208011343.
\]

The theorem uses only the deliberately weaker exact value

\[
\alpha_{36}\ge89/100.
\]

The verifier re-checks that the intervals cover `[0,1]` without gaps and that every stored `alphaP_lower` exceeds 0.89.

Independent audit target: re-run the interval generator with a separate interval/ball arithmetic implementation.
