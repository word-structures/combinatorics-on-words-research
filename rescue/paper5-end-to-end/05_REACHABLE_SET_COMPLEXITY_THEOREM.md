# REACHABLE SET COMPLEXITY THEOREM
**Date:** 2026-08-29

## Theorem: Complexity of a Single Support-Signature Reachable Set \sigma(\rho)$
**Statement:** For a fixed output alphabet size $ and fixed support arity $, enumerating the prefix-Parikh reachable set \sigma(\rho)$ for a fixed target Parikh profile $\rho$ of length $ requires time polynomial in $, bounded by $\mathcal{O}(m L^{2(k-1)})$.

**Proof:**
1. A Parikh vector over an alphabet of size $ that sums to a depth  \le L$ has exactly $\binom{d+k-1}{k-1} \in \mathcal{O}(L^{k-1})$ possible states.
2. A support signature $\sigma$ requires evaluating prefix-Parikh states at $ specific depths  < d_2 < \dots < d_m$.
3. The valid prefix-Parikh chains can be computed using dynamic programming across these $ depths. The transition between depth $ and {i+1}$ requires checking componentwise inequalities ( \le y_{i+1}$).
4. The maximum number of state transitions is bounded by $|V_{d_i}| \times |V_{d_{i+1}}| \in \mathcal{O}(L^{2(k-1)})$.
5. Summing over all $ steps, the enumeration time complexity is bounded by $\mathcal{O}(m L^{2(k-1)})$.

## Note on Representation and Output-Size Complexity
The output size of \sigma(\rho)$ is bounded by the number of valid Minkowski sum combinations, which is at most $\mathcal{O}(L^{m(k-1)})$. Enumerating the set is strictly polynomial, but representing the full joint Minkowski sums across many independent support signatures can grow rapidly in $ and $.

## Asymptotic Impact on Synthesis
The total number of Rao-Rosenfeld parent constraints grows polynomially in $ ONLY IF the number of factorizing boundaries (the template arity) and the maximum length of the parent templates are strictly fixed.

While exact parametric parent feasibility gives a massive factor reduction for rejecting single unworkable constraints, it does not guarantee that the overall synthesis process is polynomial. Resolving the shared-word constraints across overlapping local profiles remains a computationally intensive Constraint Satisfaction Problem.
