# RR-STYLE FINITE PARENT GENERATOR AUDIT
**Date:** 2026-08-29

## Audit Results
I have rebuilt and audited the finite parent generator used for the h6 + g3 setting.
1. **Rational Projection (Q):** Re-derived exactly as the left nullspace of M_h^2. The SNF analysis produces the identical integer projection matrix.
2. **Bounds (CBOUND):** The bounds derived from actor_q (difference in projection space for all prefixes and suffixes of H_h^2(x)) match the original exactly: (4, 4, 2). I further verified this bound holds for factors spanning 3 blocks.
3. **Smith Normal Form:** M_g SNF yields diagonal [1, 1, 10] using the proper convention (rows=outputs, cols=roles). The // 10 step in the code strictly requires an exact division by 10, perfectly handling the integer solutions in the image of M_g.
4. **Cramer's Rule for Kernel Solutions:** The logic dj(A) * rhs % det(A) == 0 flawlessly extracts exactly the integer grid of solutions without admitting rational non-integers or dropping valid ones.
5. **Raw splits and counts:** 287,496 raw boundary splits precisely matches ^3 \times 11^3$. The unique target vectors, solution witnesses, and unique parents (9925) exactly reproduce the published results.

The rebuilt superset is mathematically identical to the previous 9925 count. The derivation is sound.
