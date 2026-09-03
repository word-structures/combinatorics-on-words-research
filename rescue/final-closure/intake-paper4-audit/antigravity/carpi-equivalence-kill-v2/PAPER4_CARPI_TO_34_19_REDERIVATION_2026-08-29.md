# Phase D-F: Vector-Level Comparison and 34/19 Rederivation

**Date:** 2026-08-29
**Status:** ADVERSARIAL — Version 2

## Phase D: Vector-Level Comparison

Rewrite C3:
  (Psi(x_0) - delta_0 Psi(h(a_0))) - 2(Psi(x_1) - delta_1 Psi(h(a_1))) + (Psi(x_2) - delta_2 Psi(h(a_2))) = 0

Paper 4 decomposition:
  Q_0 - 2Q_1 + Q_2 = 0
  (S(b_0) + Psi(x_0)) - 2(S(b_1) + Psi(x_1)) + (S(b_2) + Psi(x_2)) = 0

What is shared?
1. The prefix second difference algebraic structure.
2. The scalar length curvature (-Delta L = D_C L).
3. The whole-block correction concept (S(b_j) acts as the whole-block accumulator; Carpi uses delta_j Psi(h(a_j)) to correct the boundary block).

What is NOT in Carpi?
- **Carry encoding:** Carpi corrects the boundary block based on a free boolean selector delta_j. Paper 4 partitions the geometric space using Euclidean carries c_j and q.
- **Role projection under partial assignment:** The occurrence mask chi(b) = 1 if block b has the unresolved role X.

## Phase E: Try Again to Derive 34

Even assuming the strongest connection (D_C = -Delta), can we derive 34?
To derive 34, we need 2 + 4 + 4 + 8 + 8 + 8.
This comes from the block-coincidence constraints on the occurrence mask chi(b).
- Z_s gives 2 because all 3 cutpoints are in the same block.
- P_t and M_t give 4 because 2 cutpoints are in the same block.
- Z, P, M give 8 because all 3 cutpoints are in distinct blocks.

Does Carpi contain enough information to enforce b_j = b_k => chi(b_j) = chi(b_k)?
**NO.** Carpi assumes a fully specified morphism. There is no chi. There is no concept of a "role" being resolved or unresolved. 
Occurrence-mask consistency is a genuinely new layer. The first definition required that is absent from Carpi is the occurrence mask chi(b) itself.

## Phase F: Try Again to Derive 19

Can we obtain sigma = red(chi(b_0)x_{i_0} - 2chi(b_1)x_{i_1} + chi(b_2)x_{i_2}) from Carpi?
**NO.** The variable chi(b_j) does not exist in Carpi's framework.

Can we obtain the 19 classes?
**NO.** The 19 classes are formed by taking the 34 geometric patterns and quotienting them by the equality of their COMPLETE reduced support sets (the sets of all valid sigma signatures).
Carpi's criterion does not produce a support signature, does not aggregate them into complete sets for a given domain, and does not define an equivalence relation on those sets.

**The exact first missing concept:** Partial assignment (the separation of known targets from an unknown occurrence mask chi).
