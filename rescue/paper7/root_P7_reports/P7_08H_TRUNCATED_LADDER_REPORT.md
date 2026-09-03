# P7_08H — TRUNCATED-MEMORY LADDER AND RIGHT-EXTENDABILITY FOR $w_K$

We investigated the finite-state seeded languages $\mathcal{A}_4^{(\le h)}$ for the Keränen seed $w_K$ as $h$ increases, modeling the property of avoiding Abelian squares up to half-period $h$.

## 1. Exact Future-Complete Finite State Representation
For any fixed $h$, the exact future-complete state for testing right-extensions in $\mathcal{A}_4^{(\le h)}$ is strictly the suffix of the current string of length $2h-1$. At any step, appending a character only requires checking the last $2h$ characters to rule out $K \le h$. The directed graph over these length $2h-1$ states perfectly represents the $h$-truncated right-extension dynamics.

## 2. Reachable States and SCCs from $w_K$
We computed the exact state space from $h=1$ to $h=7$:

| Scale $h$ | State Length ($2h-1$) | Reachable States from $w_K$ | Total SCCs | Recurrent SCCs | Size of Recurrent Core ($C_h$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 4 | 1 | 1 | 4 |
| 2 | 3 | 36 | 1 | 1 | 36 |
| 3 | 5 | 264 | 1 | 1 | 264 |
| 4 | 7 | 1,584 | 1 | 1 | 1,584 |
| 5 | 9 | 7,560 | 289 | 1 | 7,272 |
| 6 | 11 | 25,968 | 2,017 | 1 | 23,952 |
| 7 | 13 | 80,136 | 6,745 | 1 | 73,392 |

**Key Findings on Reachability:**
*   For every $h \le 7$, there is exactly **ONE giant recurrent SCC** reachable from $w_K$.
*   $w_K$ **does** have an infinite right continuation in the truncated language $\mathcal{A}_4^{(\le h)}$ for all tested $h$.
*   The single giant component $C_h$ exclusively supports all such infinite right continuations.

## 3. What Changes Passing from $h$ to $h+1$ (Nesting and Pruning)
To understand stabilization, we mapped the structural projection of the surviving recurrent core $C_{h+1}$ down to the core $C_h$ (by truncating the 2 oldest prefix characters of the state):

*   **$h=1 \to 4$**: The projection is strictly surjective. $C_{h+1}$ covers every state in $C_h$.
*   **$h=5 \to 6$**: Pruning begins. The core $C_6$ projects onto only 7,128 states in $C_5$. **144 states are missing**.
*   **$h=6 \to 7$**: Pruning accelerates. The core $C_7$ projects onto only 22,656 states in $C_6$. **1,296 states are missing**.

### Implications for Future-Completeness
This exactly confirms the "Local versus long-range effects" hypothesis. 
A state in $C_5$ is infinitely right-extendable if we only care about scales $K \le 5$. However, 144 of those states are completely annihilated when scale $K=6$ is activated. All of their locally valid infinite continuations inevitably cross into a long-range Abelian square at $K=6$. 
**Local truncated viability ($C_h$) is repeatedly and strictly pruned by long-range corrections ($C_{h+1}$).** 

## 4. Final Verdict

Because the recurrent core size expands exponentially rather than stabilizing into a finite repeating block structure, and because long-range pruning continuously shears the core at higher scales, computations at finitely many $h$ values do not yield an exact inductive stabilization or mechanism. The ladder exposes the structure but does not naturally close into an infinity proof.

**STATUS:** `FINITE-H STRUCTURE ONLY`
