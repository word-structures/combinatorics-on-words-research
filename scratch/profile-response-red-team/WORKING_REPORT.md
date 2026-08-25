# PROFILE-RESPONSE MECHANISM: COMPUTATIONAL RED-TEAM PREPARATION
**Date:** 2026-08-25
**Status:** WORKING REPORT / POST-HOC AUDIT / NOT A CAMPAIGN

## A. Frozen-data audit
- Reconstructed canonical $B(v) = [3 \sum v_i^2 - h^2]/3$ exactly.
- $S(v) = h - 3B(v)$.
- Number with $S > 0$: 5 (all 5 have positive $\Delta_A$, so 5/5 positive)
- Number with $S < 0$: 8 (all 8 have negative $\Delta_A$, so 8/8 negative)
- Number with $S = 0$: 2 (critical profiles)

**POST-HOC COMPUTATIONAL OBSERVATION:**
Among the frozen 15 $h=2...7$ canonical profile cases, 13 have $S(v)=h-3B(v) \neq 0$.
For all 13/13: $\mathrm{sign}(\Delta_A) = \mathrm{sign}(\Delta_B) = \mathrm{sign}(S)$.
Exactly two cases have $S=0$:
- $h=2 (1,1,0)$: $\Delta_A \approx +0.0349$
- $h=6 (3,2,1)$: $\Delta_A \approx -0.0115$
Their hard-deletion responses have opposite signs.

*Note: This is an observation of a finite data set, not a theorem, universal law, causal law, or preregistered result.*

## B. Exact algebra controls
- Identity $B(v) = [(v_1-v_2)^2 + (v_2-v_3)^2 + (v_3-v_1)^2] / 3$ checked exactly. All 15 matched.
- Identity $\prod_{i<j} (v_i-v_j)^2 = B(v)^3 / 2 - 27 J(v)^2$ checked exactly. All 15 matched.

## C. Exploratory q-normalized diagnostics
**EXPLORATORY / POST-HOC / NOT A CLAIM**
For $R_v = \Delta_A / q_v$ and $R'_v = \Delta_B / q_v$ versus $S(v)$:
- **Pearson correlation:** 0.97498 (Method A)
- **Spearman correlation:** 0.97583 (Tie-corrected)
- **Linear fit:** $R_v \approx 0.2368 \cdot S + -0.3049$
- **$R^2$:** 0.9506

### Residual Table
| Profile | S(v) | R_v | Fitted R_v | Residual |
| :--- | :--- | :--- | :--- | :--- |
| h=2 (1,1,0) | 0 | 0.2356 | -0.3049 | 0.5405 |
| h=2 (2,0,0) | -6 | -1.4903 | -1.7254 | 0.2351 |
| h=3 (1,1,1) | 3 | 0.5553 | 0.4053 | 0.1500 |
| h=3 (2,1,0) | -3 | -1.1129 | -1.0152 | -0.0977 |
| h=4 (2,1,1) | 2 | 0.0911 | 0.1686 | -0.0775 |
| h=5 (2,2,1) | 3 | 0.6388 | 0.4053 | 0.2334 |
| h=5 (3,1,1) | -3 | -1.1842 | -1.0152 | -0.1690 |
| h=5 (3,2,0) | -9 | -1.3774 | -2.4357 | 1.0583 |
| h=6 (2,2,2) | 6 | 0.9273 | 1.1156 | -0.1883 |
| h=6 (3,2,1) | 0 | -0.2479 | -0.3049 | 0.0570 |
| h=6 (4,1,1) | -12 | -3.2527 | -3.1460 | -0.1067 |
| h=7 (3,2,2) | 5 | 0.5769 | 0.8789 | -0.3020 |
| h=7 (3,3,1) | -1 | -0.8472 | -0.5417 | -0.3055 |
| h=7 (4,2,1) | -7 | -2.8233 | -1.9622 | -0.8611 |
| h=7 (5,1,1) | -25 | -6.3904 | -6.2238 | -0.1666 |

### Leave-one-out Sensitivity
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
- Instead of strictly removing edges forming an Abelian square of half-length $h$ with profile $v$, we preserve them with a parametric weight multiplier $\exp(-\epsilon)$.
- Finite soft graphs explicitly retain ALL mathematically positive edges without thresholding.
- The hard-deletion system is constructed separately by explicit edge removal, rather than by weight thresholding.
- Method A (Poisson/Green-Kubo) and Method B (Finite-horizon moment recurrence) share the EXACT same container graph construction, stationary Perron chain logic, and soft edge weights. The boundary of independence lies strictly at the variance evaluation step (resolvent iteration versus exact transition moment tracking over 4000 steps).

## E. Soft-Engine Controls & Component Audit

### Control: h=2 (1,1,0)
| Metric | $\epsilon=0$ (Baseline) | $\epsilon=100$ (Large $\epsilon$) | Hard-Deletion System | Canonical Baseline/Hard | Abs Error ($\epsilon=100$ vs Hard) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\lambda$** | 3.00000000 | 2.59205279 | 2.59205279 | - | 0.0000e+0 |
| **$a$** | 0.22222222 | 0.25713073 | 0.25713073 | 0.25713073 (hard) | 0.0000e+0 |
| **$\Delta$** | 0.00000000 | 0.03490851 | 0.03490851 | 0.03490851 (hard) | 1.0247e-13 |

**Variance Method Independence:**
Method A vs Finite-horizon moment recurrence diff at $\epsilon=100$ is 1.0284e-9.

**Stationary Centering:**
Mean raw observable $E[I(isA)]$ at $\epsilon=100$: 0.33333333. Center residual: 1.1102e-16.

**Component Audit (at $\epsilon=100$):**
- **Cyclic SCC Count:** 1
- **Dominant SCC Spectral Radius:** 2.59205279
- **Dominance Margin:** 2.5921e+0
- **Unique Dominant SCC?** true
- **Period of Dominant SCC:** 1

### Control: h=3 (1,1,1)
| Metric | $\epsilon=0$ (Baseline) | $\epsilon=100$ (Large $\epsilon$) | Hard-Deletion System | Canonical Baseline/Hard | Abs Error ($\epsilon=100$ vs Hard) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\lambda$** | 2.45110954 | 2.31075801 | 2.31075801 | - | 0.0000e+0 |
| **$a$** | 0.14898522 | 0.19443380 | 0.19443380 | 0.19443380 (hard) | 0.0000e+0 |
| **$\Delta$** | 0.00000000 | 0.04544858 | 0.04544858 | 0.04544858 (hard) | 5.7732e-14 |

**Variance Method Independence:**
Method A vs Finite-horizon moment recurrence diff at $\epsilon=100$ is 4.7772e-9.

**Stationary Centering:**
Mean raw observable $E[I(isA)]$ at $\epsilon=100$: 0.33333333. Center residual: 0.0000e+0.

**Component Audit (at $\epsilon=100$):**
- **Cyclic SCC Count:** 1
- **Dominant SCC Spectral Radius:** 2.31075801
- **Dominance Margin:** 2.3108e+0
- **Unique Dominant SCC?** true
- **Period of Dominant SCC:** 1

### Control: h=3 (2,1,0)
| Metric | $\epsilon=0$ (Baseline) | $\epsilon=100$ (Large $\epsilon$) | Hard-Deletion System | Canonical Baseline/Hard | Abs Error ($\epsilon=100$ vs Hard) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\lambda$** | 2.45110954 | 2.38800821 | 2.38800821 | - | 0.0000e+0 |
| **$a$** | 0.14898522 | 0.11664191 | 0.11664191 | 0.11664191 (hard) | 0.0000e+0 |
| **$\Delta$** | 0.00000000 | -0.03234331 | -0.03234331 | -0.03234331 (hard) | 1.0039e-12 |

**Variance Method Independence:**
Method A vs Finite-horizon moment recurrence diff at $\epsilon=100$ is 1.0015e-8.

**Stationary Centering:**
Mean raw observable $E[I(isA)]$ at $\epsilon=100$: 0.33333333. Center residual: 2.2204e-16.

**Component Audit (at $\epsilon=100$):**
- **Cyclic SCC Count:** 1
- **Dominant SCC Spectral Radius:** 2.38800821
- **Dominance Margin:** 2.3880e+0
- **Unique Dominant SCC?** true
- **Period of Dominant SCC:** 1

### Control: h=5 (3,1,1)
| Metric | $\epsilon=0$ (Baseline) | $\epsilon=100$ (Large $\epsilon$) | Hard-Deletion System | Canonical Baseline/Hard | Abs Error ($\epsilon=100$ vs Hard) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\lambda$** | 2.06663497 | 2.00872079 | 2.00872079 | - | 4.4409e-16 |
| **$a$** | 0.16141549 | 0.11951280 | 0.11951280 | 0.11951280 (hard) | 1.3878e-16 |
| **$\Delta$** | 0.00000000 | -0.04190269 | -0.04190269 | -0.04190269 (hard) | 3.3820e-13 |

**Variance Method Independence:**
Method A vs Finite-horizon moment recurrence diff at $\epsilon=100$ is 2.1338e-8.

**Stationary Centering:**
Mean raw observable $E[I(isA)]$ at $\epsilon=100$: 0.33333333. Center residual: 1.7208e-15.

**Component Audit (at $\epsilon=100$):**
- **Cyclic SCC Count:** 1
- **Dominant SCC Spectral Radius:** 2.00872079
- **Dominance Margin:** 2.0087e+0
- **Unique Dominant SCC?** true
- **Period of Dominant SCC:** 1

## F. Proposed preregistration draft
### DRAFT: Soft-Penalty Profile Response ($h \in [2, 7]$)
**Question:** For each of the 15 frozen $h=2...7$ profiles, does $a_v(\epsilon) - a_v(0)$ strictly change sign as $\epsilon$ increases from $0$ to $\infty$?
**Setup:** Compute $a_v(\epsilon)$ for a fixed grid (e.g. $\epsilon \in \{0, 0.1, 1, 10, 100\}$) using the validated soft-engine. 

## G. Explicit statement that no h=8 computation occurred
**I explicitly confirm that no $h=8$ computation occurred during this audit.**
