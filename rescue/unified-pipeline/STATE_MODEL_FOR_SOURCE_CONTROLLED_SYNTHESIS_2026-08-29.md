# STATE MODEL FOR SOURCE-CONTROLLED SYNTHESIS (CORRECTED)
**Date:** 2026-08-29

## 1. Correction on Finite-State Impossibility
**Previous Claim:** "Any pure finite-state directed graph where nodes emit fixed blocks must eventually loop... Thus generating an infinite `aa2f` word via a pure finite-state automaton over blocks is impossible."
**Correction:** This is mathematically FALSE for general graphs. While a single fixed directed cycle repeated infinitely produces an ultimately periodic word (and thus ordinary squares), a finite graph with out-degree > 1 can be traversed aperiodically. The output is not forced to be ultimately periodic unless the graph is deterministic (out-degree 1) or we artificially force it to repeat one cycle. Therefore, a finite-state macro generation architecture is **NOT** strictly impossible. 

## 2. The Required External Controller
While a finite graph could theoretically be walked aperiodically, in practical constructive search, we require a deterministic mechanism to choose the path. This is the source word x in Gamma^omega (e.g., h6^omega(a)). The source generator itself can be non-uniform (e.g., h8); this does **NOT** break the uniform target grid of the block assignment G: Gamma -> Sigma^L, because every mapped letter still receives exactly L target characters.

## 3. The State Model for Dynamic Target Assignment
If we attempt dynamic block-by-block generation:
1. **The Source Controller State:** Pointer in source word x.
2. **The Local Finite Memory:** Sliding window of exactly 4L - 3 characters to verify K <= 2L - 1.
3. **The Global Arithmetic State:** Unbounded Parikh counters for K >= 2L.

Because dynamic generation requires unbounded counters, static morphism synthesis (where the unbounded state is replaced by static Paper-4 affine resolution) remains the most computationally viable path.
