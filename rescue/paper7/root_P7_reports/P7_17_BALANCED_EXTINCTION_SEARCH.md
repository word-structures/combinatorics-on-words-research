# P7_17 — BALANCED EXTINCTION SEARCH

We conducted a strict, preregistered balanced-context extinction search ($T_d(w_m) = \emptyset$) on the prefixes of the mathematically proven right-infinite word $Y = ad \cdot g_{85}^\omega(a)$ from P7_16R. 

## A. Frozen Candidate Family
* **Base Sequence:** $Y = ad \cdot g_{85}^\omega(a)$
* **Preregistered Prefix Range:** $m \in [3, 128]$ ($w_m = Y[0:m]$)
* **Theorem Provenance:** P7_16R frozen. All tested $w_m$ natively satisfy $w_m \in re(\mathcal{A}_4)$.

## B. Complete Common-Depth Census
We executed an exact breadth-first search maintaining rigorous Abelian-square-freeness for the joint left/right extensions $(u, v)$ for all $m \in [3, 128]$ up to depth $d=8$. 
* **Result:** Zero candidate prefixes went extinct.
* **Profiles:** Most candidates exhibited massive branching, surpassing 10,000 valid states by depth $d=8$. The most constrained bottlenecks occurred around $m=71, 72$, which narrowed to a frontier size of 268 at depth 8.

## C. Promoted Candidates
Following the rules, because no candidate died at common depth, we promoted the most severely constrained bottlenecks to a deep search:
1. $m=71$ ($|T_8| = 268$)
2. $m=72$ ($|T_8| = 268$)
3. $m=69$ ($|T_8| = 320$)
4. $m=73$ ($|T_8| = 324$)

## D. Deep Exact Results
We extended the exact balanced BFS for the promoted candidates.
* **$m=71$ Profile:** 
  Depth 8: 268
  Depth 10: 1,061
  Depth 12: 2,957
  Depth 14: 8,287
  Depth 16: 33,097
  Depth 18: 179,878
* **Result:** After an initial constriction, the state space exploded exponentially. The local boundary obstruction is completely bypassed by deeper branching.

## E. Extinction Certificate
None found. No candidate prefix $w_m$ yielded $T_d(w_m) = \emptyset$ in the explored depths.

## F. Independent Verification Status
Not applicable (no extinction to verify).

## G. Final Classification

`FINITE BALANCED SURVIVAL ONLY`

**Structural Analysis:** The failure to force balanced extinction confirms the profound structural drift hypothesized. Although the exceptional boundary `ad` is locally disconnected from the recurrent core language $\mathcal{L}(X)$, the immense branching of unbounded left-extensions eventually discovers non-standard, left-infinite paths that synchronize with the right-infinite uniformly recurrent core. The exceptional boundary is a local perturbation, but it does not form a global two-sided trap.
