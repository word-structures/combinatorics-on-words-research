# PAPER 4 FRACTIONAL BOUNDARY BENCHMARK (PHASE 7 REVISED)
**Date:** 2026-08-29

## 1. Experimental Correction
As correctly noted in the review:
1. The previous POC tested the "trivial block-aligned Parikh kill" rather than the actual Paper 4 fractional boundary constraint ($> L$).
2. The previous POC tested disparate predicates ($K \le 7$ vs $K \ge 8$).
3. The parity test was a simple length check, not a strict set equality check.

## 2. Revised Benchmark (POC3)
We isolated the global period check ($K \ge 8$, which evaluates source factors of length $6 \dots 12$) to ensure both solvers evaluate the EXACT same predicate space, omitting the local check ($K \le 7$) entirely.

**The Three Tiers of Filtering:**
1. **Trivial Block-Aligned Gate:** If the bulk profile difference is strictly $(0,0,0)$, it is an instant kill.
2. **Paper 4 Fractional Gate:** If any component of the bulk profile difference is strictly $> L$, the boundary offsets (which are bounded by $L$) CANNOT geometrically close the gap. The assignment is mathematically safe (Fractional Kill).
3. **The Danger Zone:** If the bulk difference is non-zero but $\le L$, the boundaries might close the gap. The exact letter permutation must be checked.

## 3. Results (h6, L=4, Pool=6)
| Metric | Baseline | Paper-4 Solver |
|--------|----------|----------------|
| **Candidates Examined** | 46,656 | 46,656 |
| **Exact Character Checks** | 49,872 | 40,198 |
| **Trivial Parikh Kills** | 0 | 9,674 |
| **Paper-4 Fractional Safe** | 0 | 0 |
| **Solution Set Parity** | 100% Exact Match | 100% Exact Match |

## 4. Analysis of the Zero Fractional Kills
The Paper 4 gate registered exactly **0** fractional kills on this specific test set. 
Why? Because with $L=4$ and a tiny test pool of only 6 target blocks, the Parikh profiles of the blocks do not have enough variance to push the bulk difference across multiple source blocks over the $> L$ threshold without first triggering an exact abelian square in the exact character check. 

**Conclusion:** 
The block-aligned Parikh gate is highly effective (eliminating ~20% of character checks). However, the specific fractional boundary compiler ($6 \to 34 \to 19$) did not demonstrate operational pruning on this tiny toy scale. To prove Paper 4's specific transfer value, it must be benchmarked on a larger pool where the Parikh variance exceeds the $L$ threshold, allowing the fractional equations to algebraically isolate safe branches.

STATUS: **PAPER 4 OPERATIONAL TRANSFER UNPROVEN ON SMALL SCALE.**
