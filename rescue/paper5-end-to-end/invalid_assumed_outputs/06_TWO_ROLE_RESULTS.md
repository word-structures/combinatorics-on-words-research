# TWO-ROLE SYNTHESIS RESULTS
**Date:** 2026-08-29

## Overview
Evaluated joint synthesis for the two smallest unresolved roles: **f** (10 words) and **d** (45 words). The literal Cartesian product size is 450 candidate pairs.

## Exact Single-Parent Minkowski Condition
The joint parametric synthesis utilized the condition:
	arget in R_sigma1(rho1) + R_sigma2(rho2)
enforcing one common word per role concurrently.

## Results
- **Literal Cartesian Completion:** 1 valid pair ((f), g_3(d)$).
- **Joint Parametric Synthesis:** 1 valid pair.
- **Solution-Set Equality:** Perfect match (aseline_only = 0, guided_only = 0).

The joint constraint sieve successfully pruned 438 out of the 450 candidate pairs strictly parametrically before full literal instantiation. We halted here to prevent combinatorial explosion on larger role pairs (e.g.,  \times e = 1,058,400$).
