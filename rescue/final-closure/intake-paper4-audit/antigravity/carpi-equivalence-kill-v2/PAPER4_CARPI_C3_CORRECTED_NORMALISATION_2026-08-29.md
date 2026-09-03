# Phase 0 & A: Corrected Normalisation of Carpi C3

**Date:** 2026-08-29
**Status:** ADVERSARIAL — Version 2 (Corrected C3)

## Phase 0: Freeze the Corrected Input

The corrected Carpi C3 equation (modern restatement) is an equality of Parikh vectors for proper prefixes x_j of the block images h(a_j):

  Psi(x_0) - 2 Psi(x_1) + Psi(x_2) = delta_0 Psi(h(a_0)) - 2 delta_1 Psi(h(a_1)) + delta_2 Psi(h(a_2))

where delta_j in {0,1}.

Applying the L_1 norm (length) to both sides, since |x_j| = i_j and |Psi(h(a_j))| = L, we get:
  i_0 - 2i_1 + i_2 = L(delta_0 - 2delta_1 + delta_2)

Paper 4's equal-spacing constraint t_0 - 2t_1 + t_2 = 0 yields:
  i_0 - 2i_1 + i_2 = -L(b_0 - 2b_1 + b_2) = -L Delta

where the macro curvature is Delta = c_1 - c_0.

Equating the two expressions for i_0 - 2i_1 + i_2:
  -L Delta = L(delta_0 - 2delta_1 + delta_2)
  delta_0 - 2delta_1 + delta_2 = -Delta = c_0 - c_1

**Verification:** The indexing and signs are algebraically correct. The equation holds exactly. The scalar mapping is validated.

## Phase A: What are Carpi's delta_j really?

1. **What object does delta_j select?**
   delta_j is a binary scalar that selects whether the full block Parikh vector Psi(h(a_j)) is added to the right-hand side of the C3 equation. It acts as a whole-image boundary correction term.

2. **Is delta_j associated with a cutpoint, prefix, whole image, or boundary correction?**
   It is a whole-image correction coefficient for the block a_j.

3. **Is any boundary/interior interpretation justified?**
   No. In the modern restatement, delta_j is a free boolean parameter in the quantifier block ("For all delta_j..."). It is not a geometric indicator of where the cutpoint falls.

4. **Can delta_j be legitimately identified with a Paper-4 carry c_j?**
   **NO.**
   - There are THREE delta_j variables (delta_0, delta_1, delta_2) but only TWO carry variables (c_0, c_1).
   - The carries c_j = floor((i_j+r)/L) are uniquely determined by the geometric depths i_j and the rotation remainder r = K mod L.
   - The parameters delta_j are free boolean variables in Carpi's criterion, bound only by the linear combination D_C = delta_0 - 2delta_1 + delta_2 = c_0 - c_1.
   - Any individual delta_j cannot equal c_j because they belong to different index spaces (3 vs 2) and have different dependency structures.

**Classification:**
The relationship is **Type 3: Only their differences correspond.**
The linear combinations match (D_C = -Delta), but the underlying variables are different mathematical objects.
