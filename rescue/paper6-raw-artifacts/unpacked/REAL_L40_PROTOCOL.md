# Protocol for Veikko's real length-40 data

## Required data

1. The exact block list `B`, one word per line.
2. Label: aa2f, aa2fr, or mixed.
3. Whether the list is:
   - all length-40 words,
   - symmetry representatives,
   - extendable/trimmed words,
   - or another selected subset.
4. The probability/assembly model:
   - M0: iid uniform choice from B;
   - M1: a directed contact graph;
   - M2: weighted/non-uniform block choices;
   - another explicit mechanism.
5. If complementarity is used computationally, the exact combinatorial
   compatibility rule after stripping the biological analogy.

Without item 4, "probability" is not mathematically defined.

## Gate R0 — provenance

- SHA256 of raw list.
- line count;
- duplicate count;
- alphabet check;
- length check;
- canonical sort hash.

## Gate R1 — independent block verification

For every block:

- aa2f definition-level scan for every start and every K>=2;
- aa2fr FORBID4 scan if relevant;
- profile histogram;
- mirror/permutation orbit statistics.

Any invalid input is reported, never silently removed.

## Gate R2 — exact two-block operator

For every admissible ordered pair `(u,v)`, test the whole `uv` word.

Do not build a dense boolean matrix unless it fits.
Stream edges to a sparse representation.

Outputs:

- number of vertices;
- number of directed edges;
- degree distribution;
- SCC decomposition;
- spectral radius of accessible recurrent components;
- rigorous root upper bound
      limsup P_n^(1/n) <= rho(A2)/lambda_all.

For iid uniform blocks `lambda_all=|B|`.

## Gate R3 — offset / three-block closure

The pair graph misses factors that begin inside one block and finish in a third.

Compile all 3-block constraints.  This is where Paper-4 physical cut geometry
should be used as a normalization / deduplication layer.

Compare:

- literal triple test;
- Paper-4 compiled test.

Require exact parity on a large random sample, then on the full feasible set if
computationally possible.

Compute the 3-block SFT spectral upper bound.

## Gate R4 — response-class compression

Group blocks only when equality of future counting behaviour is proved or
verified under a declared finite window.

Candidates:

- exact profile;
- exact Paper-4 support-response vector;
- prefix-Parikh response signature;
- symmetry orbit.

Never merge states merely because they "look similar".

Measure:

- literal states;
- quotient states;
- edge count;
- spectral-radius equality;
- counting equality through n=6 or further.

## Gate R5 — bounded-period hierarchy

For Kmax = 10, 20, 40, ... as feasible, compute exact finite-memory upper
bounds.  Report them as upper bounds, not estimates of the true rate.

## Final target quantity

For iid uniform assembly:

    r = lambda_safe / |B|,

and per character:

    r_char = r^(1/40).

The desired theorem-shaped statement is of the form

    P_n = exp(-D n + o(n))

with

    D = log(|B|/lambda_safe),

or rigorous upper/lower bounds on `D`.

## Stop rules

- If B is actually all length-40 aa2f words, stop the "new invariant" claim:
  this collapses to the global aa2f growth problem on a length-40 subsequence.
- If pair/triple operators are too large, do not sample them and call the
  sample a probability theorem.  Move to exact quotient/streaming methods.
- If a quotient changes spectral radius or finite counts, reject the quotient.
