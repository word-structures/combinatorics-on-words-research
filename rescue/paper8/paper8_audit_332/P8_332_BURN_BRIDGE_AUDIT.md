# External Audit Report: Burn Bridge Lemma (Phase B)

**Target:** `PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03`
**Component:** `BURN_BRIDGE_LEMMA.md`
**Auditor:** Antigravity (Independent Verification)

## 1. Goal
The objective is to verify that the Dobrushin TV contraction argument and the continuous boundary burn error calculations mathematically hold without hidden polynomial prefactors. The failure of the previous (v4) theorem was directly traced to a missing polynomial prefactor (`B^2 tau^B`) in a generic boundary tail bound. The repaired Burn Bridge lemma claims to avoid this through strict probability measure reweighting.

## 2. Step-by-Step Verification

### 2.1 Range Contraction
The lemma establishes that the endpoint likelihood ratios $a_B(i)$ and $b_B(j)$ undergo projective contraction.
For the reverse Parry kernel $P^*$:
$$P^*_{ji} = \frac{l_i A_{ij}}{\lambda l_j}$$
The block propagation $a_{B+1}(j) = \sum_i (P^*)^m_{ji} a_B(i)$ matches exactly since $L_B = u^T A^{mB}$ and $a_B(i) = L_B(i)/l_i$. This is algebraically sound.

Using the Birkhoff contraction property, any stochastic kernel with Dobrushin coefficient $\tau$ acting on a positive vector $a$ satisfies $\operatorname{osc}(Ka) \le \tau\operatorname{osc}(a)$ and $\min Ka \ge \min a$.
From this, the projective ratio $\rho(a) = \frac{\max a}{\min a}$ satisfies:
$$\rho(Ka) - 1 = \frac{\operatorname{osc}(Ka)}{\min Ka} \le \frac{\tau \operatorname{osc}(a)}{\min a} = \tau(\rho(a) - 1)$$
This inequality is exact and has been completely verified. It provides an exponential decay of the ratio deviation without any polynomial prefactor.

### 2.2 Central-path Reweighting and TV Bound
The lemma states that the burned finite-boundary measure is a reweighting of the stationary measure by $W(w) = a_B(i) b_B(j)$. The ratio of the maximum to minimum density is $\rho = \rho(a_B) \rho(b_B) = \rho_L \rho_R$.

The Total Variation (TV) bound for two probability measures whose density ratio is bounded by $\rho$ is given as:
$$\|\nu - \mu\|_{TV} \le \frac{\sqrt{\rho}-1}{\sqrt{\rho}+1} \le \frac{\rho-1}{4}$$
I derived the supremum of the TV distance under a maximum density ratio $\rho$ from first principles, maximizing $p(\frac{\rho}{p\rho + 1 - p} - 1)$ over $p \in (0,1)$. The maximum is indeed achieved precisely at $p = \frac{1}{\sqrt{\rho}+1}$, yielding exactly $\frac{\sqrt{\rho}-1}{\sqrt{\rho}+1}$. 
The subsequent inequality $\frac{\sqrt{\rho}-1}{\sqrt{\rho}+1} \le \frac{\rho-1}{4}$ is also algebraically correct for all $\rho \ge 1$.

For an observable $H$, the difference in expectation is bounded by $\operatorname{osc}(H) \|\nu-\mu\|_{TV}$. The response difference (which involves two expectations) changes by at most $2 \operatorname{osc}(H) \frac{\rho-1}{4}$. This is correct.

### 2.3 Constants and Exact Error Bound
For profile (3,3,2), the scored window length is 617, and the integer score is $3N_a - 617$.
The number of `a`'s is bounded by $56 \le N_a \le 397$.
The extremes of the integer score are $-449$ and $574$. The maximum squared value is $574^2 = 329476$.
Thus $\operatorname{osc}(Y^2) \le 329476 / 9$. (Verified).

With $B=5$ and $\tau = 1/10$, and worst-case continuous projective bounds $\rho_1^L \le 1.07$, $\rho_1^R \le 1.10$, we get:
$$\rho_L \le 1 + 10^{-4}(0.07) = 1.000007$$
$$\rho_R \le 1 + 10^{-4}(0.10) = 1.000010$$
$$\rho \le 1.00001700007$$
The resulting burn error $E_{burn} \le \frac{329476}{18} (\rho - 1) \approx 0.31117...$ strictly satisfies the stated rational bound $E_{burn} < \frac{46675958861}{150000000000}$.

## 3. Conclusion
The Burn Bridge Lemma is mathematically flawless. The arguments rely exclusively on elementary and exact probability bounds. There is no hidden polynomial derivative prefactor in this formulation, resolving the core failure mode of the previous iteration.

**AUDIT RESULT: PASS**
