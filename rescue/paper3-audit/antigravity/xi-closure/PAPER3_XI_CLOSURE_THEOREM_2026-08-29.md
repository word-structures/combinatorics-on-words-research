# Paper 3: Hard Fluctuation Exact Decomposition Theorem
**Date:** 2026-08-29

## Theorem Candidacy
Let $D_v(t) = P_{base}(t) - P_{hard,v}(t)$ be the pressure drop associated with the Abelian-square hole $\mathcal{T}_v$. Let $\eta_v = -D_v""(0)/D_v(0)$ be its curvature response.
Then $\eta_v$ admits the exact independent decomposition:
$$ \eta_v = \eta_{short}(v) + \eta_{return}(v) $$
where:
1. $\eta_{short}(v)$ is exactly computed from the strictly nilpotent short-contact operator $A_v = I + z O_1 + z^2 O_2$. It reduces algebraically to a rational function of the invariants $B(v), J(v), U(v)$.
2. $\eta_{return}(v)$ is exactly computed from the delayed-return tail $E_v = \mathcal{B}_v - A_v$.
3. For any truncation depth $N$, $\eta_v$ is bounded by a rigorous certifier:
   $$ \eta_v \in \left[ \eta_{short} + \sum_{n=3}^N R_n - \mathcal{E}_\phi, \eta_{short} + \sum_{n=3}^N R_n + \mathcal{E}_\phi \right] $$

## Refutation / Amendment of the $-4/3 B(v)$ baseline
The candidate relation $\eta_v = -4/3 B(v) + \Xi_v$ posited that the $O_1$ overlap extracts EXACTLY $-4/3 B(v)$ under scaling.
**Finding:** Exact algebraic evaluation of the scalar recurrence $H_{tt}$ shows that $O_1$ overlap terms produce cross-terms proportional to $P_3 = \sum v_c^3$ and structural scaling factors $h$. The term $-4/3 B(v)$ is an approximation or requires an unstated scalar normalization convention.
**Resolution:** By defining $\Xi_v$ structurally through $A_v$ and $E_v$ operators rather than subtraction, we completely bypass the algebraic discrepancy. The exact short-contact operator intrinsically computes the correct unified baseline penalty.

