# PAPER4_TRANSFER_CANDIDATE_RULES_2026-08-29

## Evaluated Rules
1. **Prefix-Local Support Projection**
   - *Hypothesis*: Given a prefix, map it to the 19 support families and determine if the required affine target profile is unreachable.
   - *Result*: FAILED. In a character DFS, the future blocks are completely unconstrained, providing enough degrees of freedom to satisfy any affine target. No branch can be proved doomed purely from the algebraic equations without micro-combinatorial exploration.

2. **Future-Obstruction Certificates**
   - *Hypothesis*: Pre-calculate an unavoidable future collision horizon.
   - *Result*: FAILED. Generating a finite certificate for an unconstrained letter DFS requires evaluating the Parikh vectors of all valid future strings, which is computationally equivalent to just running the DFS lookahead.

## Summary
No prefix-local exact pruning rules survived Track A/B correctness evaluation for the production letter DFS.
