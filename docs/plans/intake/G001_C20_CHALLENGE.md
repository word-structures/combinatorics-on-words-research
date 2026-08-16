# G001-C20 Challenge: Deception Depth

**WARNING: PREREG DRAFT ONLY.**
**NOT YET RUN.** No result exists. All numerical budgets are provisional until an implementation audit. 
**CRITICAL:** Do not assume the existing factor-complexity DFS already computes $\delta(w)$ correctly under censoring rules. The first implementation must explicitly audit that assumption before running.

## Current Challenge: G001-C20
Every doomed aa2f word $w$ satisfies $\delta(w) \le 20$.
(Where $\delta(w)$ is the max additional aa2f extension length from $w$).

## Counterexample Criteria
To refute this challenge, the search must produce a word $w$ that satisfies ALL of the following:
1. $w$ is aa2f.
2. A valid continuation of at least 21 letters exists from $w$.
3. The *complete* continuation subtree rooted at $w$ is nevertheless finite.
4. Exhaustive traversal establishes the exact finite $\delta(w) > 20$.

## Implementation Audit Requirement
Before executing this challenge, the DFS must be audited for strict handling of **SEARCH CUTOFF / BUDGET CENSORING**.
*   If a descendant reaches the depth/budget cutoff, $\delta(w)$ is **UNKNOWN / RIGHT-CENSORED**.
*   The word $w$ must not be classified as doomed and cannot be used as a counterexample.
