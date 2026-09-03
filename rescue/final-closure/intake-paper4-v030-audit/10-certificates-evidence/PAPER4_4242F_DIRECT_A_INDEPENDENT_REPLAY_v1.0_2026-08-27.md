# Paper 4 — Full Independent Replay of the 4242-F Direct-A Population

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / FULL POPULATION INDEPENDENT REPLAY`

## Population

The population contains 4242 internally clean F-role words with prescribed
Parikh vector

\[
\Psi(F)=(19,11,10).
\]

It was constructed disjointly from the previous 5151-word exclusion union and
from the separate 300-F discovery population.

## Primary direct-A solver

For fixed F, the primary solver exhaustively searches the complete A-profile

\[
\Psi(A)=(15,14,11)
\]

subject to the exact necessary contexts

\[
A,\qquad AF,\qquad FA,\qquad FAF.
\]

After deepening all residual caps to 20M, 50M and finally one 100M-node replay,
the primary classification is

\[
\boxed{
4223F\text{ with }0A
\quad+\quad
19F\text{ with at least one }A.
}
\]

No cap remains.

## Independent exhaustive replay

A second implementation uses a different A traversal and pruning organization.
It was first regression-checked on F96, reproducing its known complete
50-A set exactly.

It was then run on every one of the 4242 F words.

Result:

\[
\boxed{4242/4242\text{ exact count matches}.}
\]

There are:
- 4223 F words with exactly 0 compatible A words;
- 19 F words with positive A counts;
- 87 compatible \((F,A)\) pairs in total.

No replay mismatch and no timeout occurred.

## Epistemic status

The 4223 zero-A words are globally impossible as \(H(f)\) under the prescribed
role vectors and actual \(h_6\) factor constraints.

The 19 positive-A words require a further ABDEF extension check; that closure
is certified separately.

**Label:** `EXACT-CHECKED / FULL POPULATION INDEPENDENT REPLAY`.
