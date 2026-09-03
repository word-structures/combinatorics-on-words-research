# REACHABLE-SET SAFE-ELISION COROLLARY

## 1. Theorem Statement

Let $W$ be a candidate abelian square window of half-length $K \ge 2L$. Let $t$ be the affine bulk target Parikh vector defined by the fully resolved source blocks in $W$, and let $\sigma(X)$ be the formal reduced signature representing the fractional contributions of the unresolved source blocks, such that $P(W_{left}) - P(W_{right}) = \sigma(X) + t$.

Let $\rho$ be a prescribed total Parikh profile for the unresolved blocks.
Define the Reachable Set:
$$ \mathcal{R}_\sigma(\rho) = \{ \sigma(X) \mid X \text{ is a realizable prefix-Parikh chain of a word with profile } \rho \} $$

**Corollary (Safe Elision):**
If $-t \notin \mathcal{R}_\sigma(\rho)$, then no ordering of the unresolved block with profile $\rho$ can complete $W$ into an abelian square.

## 2. Proof

1. By definition, a window $W$ is an abelian square if and only if $P(W_{left}) - P(W_{right}) = \mathbf{0}$.
2. Under the exact domain decomposition, this Parikh difference partitions exactly into the fractional boundary components and the full-block bulk components.
3. Because the roles of the resolved blocks are fixed, their fractional components and full-block components are invariant and absorb completely into $t$.
4. The remaining variance depends strictly on the prefix-Parikh vectors $X$ of the unresolved blocks at the cutpoints.
5. Therefore, the square condition reduces exactly to $\sigma(X) + t = \mathbf{0}$, or equivalently $\sigma(X) = -t$.
6. If $-t$ is not in the set of all possible evaluations of $\sigma(X)$ over valid words of profile $\rho$ (i.e., $\mathcal{R}_\sigma(\rho)$), then the equation $\sigma(X) + t = \mathbf{0}$ has no solutions.
7. Consequently, no word of profile $\rho$ can satisfy the abelian square condition.

## 3. Dependency on Existing Paper-4 Results

This corollary relies directly on:
- **Phase 1 (Cutpoint Algebra):** The fractional-bulk decomposition.
- **Phase 3 (Topological Classification):** The compilation of $\sigma(X)$ into a finite catalogue of formal signatures across all physical configurations.
- **Phase 4 (Prefix-Parikh Chain Sets):** The exhaustive precomputation of $\mathcal{R}_\sigma(\rho)$ via the dynamic programming lattice.

## 4. Recommendation

**Verdict:** **INCLUDE IN PAPER 4**

**Reasoning:** 
A. **Nontriviality:** It completely formalizes how the abstract $u, v, w$ fractional bounds mechanically translate into an operational Safe-Elision rule.
B. **Clarity:** It improves the conceptual interface of the paper by providing a crisp, mathematically sound bridge between the theoretical topology classes and practical computational pruning, without requiring any heuristic component-wise bounds.
C. **Independence:** It makes no mention of record hunting, implementation details, or benchmarks. It is a pure language-theoretic corollary of the geometric decomposition.
D. **Placement:** Best placed immediately following the definition of the Reachable Sets (Section 4/5), acting as the capstone operational theorem that proves the utility of the 19 families.
