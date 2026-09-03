# SANDBOX PHASE 3: CONSTRUCTIVE PREFIX PRUNING (MATHEMATICAL FORMULATION)

## 1. The Core Insight: Cutpoint-First Synthesis
Traditional solvers generate morphic blocks character by character. 
However, for an Abelian square to form, the exact character sequence does not matter—only the **Parikh vectors at the exact boundary cutpoints** ($d_1, d_2, d_3$) matter.

By separating the sequence generation from the cutpoint Parikh vectors, we can construct a solver that operates entirely in the Parikh space before a single string is formed.

## 2. The Linear Constraint System
For a given unresolved block with profile $\rho$ and length $L$, any candidate window intersecting this block defines cutpoints $d_1 < d_2 < d_3 < L$. 
Let the Parikh vectors at these prefixes be $P_1, P_2, P_3$.

**Structural Constraints (True for any string):**
1. $0 \le P_1 \le P_2 \le P_3 \le \rho$ (component-wise)
2. $|P_1| = d_1$, $|P_2| = d_2$, $|P_3| = d_3$

**Danger Zone Constraints (Forbidden states from overlapping windows):**
Every active window $W_j$ intersecting the block imposes a forbidden linear equation:
$\sigma_j(P_1, P_2, P_3) \neq -t_j$

Because multiple windows overlap the same block simultaneously, they impose a **system of forbidden hyperplanes** on the variables $(P_1, P_2, P_3)$.

## 3. The New Solver Architecture
Instead of depth-first search on characters, the solver runs depth-first search on **Boundary Parikh Vectors**:
1. Identify all active cutpoints $d_i$ inside the block from all Danger Zone windows.
2. Iterate through valid integer Parikh vectors $P_i$ at these cutpoints that satisfy the structural constraints.
3. Immediately prune any $(P_1, \dots, P_k)$ assignment that falls onto a forbidden hyperplane (i.e. forms a square for any window).
4. If a valid Parikh sequence survives ALL windows, only then use a standard backtracking algorithm to find a literal string that perfectly passes through those Parikh waypoints.

## 4. Why this is a Breakthrough
- **Decoupling:** It decouples the length of the string $L$ from the complexity of the square check. 
- **Waypoint Routing:** Finding a string that passes through known safe Parikh waypoints is a simple, highly constrained subproblem. The heavy lifting (square avoidance) is resolved purely mathematically in the integer vector space.
