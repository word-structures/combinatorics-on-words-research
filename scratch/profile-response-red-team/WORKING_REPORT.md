# PROFILE-RESPONSE MECHANISM: COMPUTATIONAL RED-TEAM PREPARATION
**Date:** 2026-08-25
**Status:** WORKING REPORT / POST-HOC AUDIT / NOT A CAMPAIGN

## A. Frozen-data audit
- Reconstructed canonical $B(v) = [3 sum v_i^2 - h^2]/3$ exactly.
- $S(v) = h - 3B(v)$.
- Number with $S > 0$: 5 (all 5 have positive $Delta_A$, so 5/5 positive)
- Number with $S < 0$: 8 (all 8 have negative $Delta_A$, so 8/8 negative)
- Number with $S = 0$: 2 (critical profiles)

**POST-HOC COMPUTATIONAL OBSERVATION:**
Among the frozen 15 $h=2...7$ canonical profile cases, 13 have $S(v)=h-3B(v) 
eq 0$.
For all 13/13: $mathrm{sign}(Delta_A) = mathrm{sign}(Delta_B) = mathrm{sign}(S)$.
Exactly two cases have $S=0$:
- $h=2 (1,1,0)$: $Delta_A approx +0.0349$
- $h=6 (3,2,1)$: $Delta_A approx -0.0115$
Their hard-deletion responses have opposite signs.

*Note: This is an observation of a finite data set, not a theorem, universal law, causal law, or preregistered result.*

## B. Exact algebra controls
- Identity $B(v) = [(v_1-v_2)^2 + (v_2-v_3)^2 + (v_3-v_1)^2] / 3$ checked exactly. All 15 matched.
- Identity $prod_{i<j} (v_i-v_j)^2 = B(v)^3 / 2 - 27 J(v)^2$ checked exactly. All 15 matched.

## C. Exploratory q-normalized diagnostics
**EXPLORATORY / POST-HOC / NOT A CLAIM**
For $R_v = Delta_A / q_v$ and $R'_v = Delta_B / q_v$ versus $S(v)$:
- **Pearson correlation:** 0.9750 (Method A)
- **Spearman correlation:** 0.9714
- **Linear fit:** $R_v approx 0.2368 cdot S + -0.3049$
- **$R^2$:** 0.9506

### Residual Table / Leave-one-out Sensitivity
| Excluded Control | LOO Slope |
| :--- | :--- |
| h=2 (1,1,0) | 0.2347 |
| h=2 (2,0,0) | 0.2376 |
| h=3 (1,1,1) | 0.2356 |
| h=3 (2,1,0) | 0.2368 |
| h=4 (2,1,1) | 0.2372 |
| h=5 (2,2,1) | 0.2349 |
| h=5 (3,1,1) | 0.2368 |
| h=5 (3,2,0) | 0.2446 |
| h=6 (2,2,2) | 0.2391 |
| h=6 (3,2,1) | 0.2365 |
| h=6 (4,1,1) | 0.2355 |
| h=7 (3,2,2) | 0.2400 |
| h=7 (3,3,1) | 0.2375 |
| h=7 (4,2,1) | 0.2327 |
| h=7 (5,1,1) | 0.2264 |

## D. Soft-engine architecture
- We construct the baseline language SFT $L_{h-1}$.
- Instead of strictly removing edges forming an Abelian square of half-length $h$ with profile $v$, we preserve them with a parametric weight multiplier $exp(-epsilon)$.
- Both Method A (Green-Kubo) and Method B (Exact-Moment DP) share the exact same soft-container graph construction, stationary Perron chain logic, and soft edge weights. They only differ in their final variance evaluation method (resolvent iteration vs moment DP).
- $epsilon = 0$ reproduces the baseline.
- A very large $epsilon$ (e.g. 100) approaches the canonical hard-deletion $L_h$ result (it is a numerical approximation, not literally $epsilon=infty$).

## E. Soft-Engine Controls & Component Audit

### Control: h=2 (1,1,0)
| Metric | $epsilon=0$ (Baseline) | $epsilon=100$ (Large $epsilon$) | Canonical Hard Result | Absolute Error |
| :--- | :--- | :--- | :--- | :--- |
| **$a$ (Variance)** | 0.22222222 | 0.25713073 | 0.25713073 | 1.0275e-13 |
| **$Delta$ (Impact)** | 0.00000000 | 0.03490851 | 0.03490851 | 1.0281e-13 |

**Method Independence Check:** Method A and B diff at $epsilon=100$ is 1.0284e-9.
**Component Audit (at $epsilon=100$):**
- **Valid States:** 27
- **Number of SCCs:** 1
- **Dominant SCC Size:** 27
- **Unique Dominant SCC?** true

### Control: h=3 (1,1,1)
| Metric | $epsilon=0$ (Baseline) | $epsilon=100$ (Large $epsilon$) | Canonical Hard Result | Absolute Error |
| :--- | :--- | :--- | :--- | :--- |
| **$a$ (Variance)** | 0.14898522 | 0.19443380 | 0.19443380 | 1.6337e-13 |
| **$Delta$ (Impact)** | 0.00000000 | 0.04544858 | 0.04544858 | 5.7565e-14 |

**Method Independence Check:** Method A and B diff at $epsilon=100$ is 4.7772e-9.
**Component Audit (at $epsilon=100$):**
- **Valid States:** 162
- **Number of SCCs:** 1
- **Dominant SCC Size:** 162
- **Unique Dominant SCC?** true

### Control: h=3 (2,1,0)
| Metric | $epsilon=0$ (Baseline) | $epsilon=100$ (Large $epsilon$) | Canonical Hard Result | Absolute Error |
| :--- | :--- | :--- | :--- | :--- |
| **$a$ (Variance)** | 0.14898522 | 0.11664191 | 0.11664191 | 7.8317e-13 |
| **$Delta$ (Impact)** | 0.00000000 | -0.03234331 | -0.03234331 | 1.0041e-12 |

**Method Independence Check:** Method A and B diff at $epsilon=100$ is 1.0015e-8.
**Component Audit (at $epsilon=100$):**
- **Valid States:** 162
- **Number of SCCs:** 1
- **Dominant SCC Size:** 162
- **Unique Dominant SCC?** true

### Control: h=5 (3,1,1)
| Metric | $epsilon=0$ (Baseline) | $epsilon=100$ (Large $epsilon$) | Canonical Hard Result | Absolute Error |
| :--- | :--- | :--- | :--- | :--- |
| **$a$ (Variance)** | 0.16141549 | 0.11951280 | 0.11951280 | 3.9409e-13 |
| **$Delta$ (Impact)** | 0.00000000 | -0.04190269 | -0.04190269 | 3.3680e-13 |

**Method Independence Check:** Method A and B diff at $epsilon=100$ is 8.2314e-9.
**Component Audit (at $epsilon=100$):**
- **Valid States:** 3114
- **Number of SCCs:** 271
- **Dominant SCC Size:** 2844
- **Unique Dominant SCC?** true

## F. Proposed preregistration draft
### DRAFT: Soft-Penalty Profile Response ($h in [2, 7]$)
**Question:** For each of the 15 frozen $h=2...7$ profiles, does $a_v(epsilon) - a_v(0)$ strictly change sign as $epsilon$ increases from $0$ to $infty$?
**Setup:** Compute $a_v(epsilon)$ for a fixed grid (e.g. $epsilon in {0, 0.1, 1, 10, 100}$) using the validated soft-engine. 

## G. Explicit statement that no h=8 computation occurred
**I explicitly confirm that no $h=8$ computation occurred during this audit.**
