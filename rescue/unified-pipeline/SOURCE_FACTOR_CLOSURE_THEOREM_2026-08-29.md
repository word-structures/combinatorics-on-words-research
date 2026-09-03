# SOURCE FACTOR CLOSURE THEOREM CANDIDATE
**Date:** 2026-08-29

## 1. The Proposition
Let x = h6^omega(a).
Let F_m(x) be the set of all finite factors of length m occurring in x.
**Hypothesis:** |F_5(x)| = 38.

## 2. Theoretical Closure Requirement
The previous empirical stabilization (S_n = S_{n-1}) is mathematically insufficient to claim the complete factor set is found.
To rigorously establish |F_5(x)| = 38, we must prove the set S of 38 factors is closed under the generating morphism h6 combined with boundary extraction.

**Closure Condition:**
For any factor w in S, applying h6(w) generates a string of length 3|w|.
If we extract all factors of length 5 from h6(w) (and across the boundaries of h6(u)h6(v) for all length-2 overlaps uv in F_2), they must all be contained within S.
Since h6 is 3-uniform, any new length-5 factor must emerge from the h6 image of a source factor of length at most ceil((5-1)/3) + 1 = 3.
Therefore, if we extract all length-5 substrings from the h6 images of all 22 known trigrams in F_3, and no new length-5 factor appears, the set F_5 is mathematically closed and exhaustively bounded.
