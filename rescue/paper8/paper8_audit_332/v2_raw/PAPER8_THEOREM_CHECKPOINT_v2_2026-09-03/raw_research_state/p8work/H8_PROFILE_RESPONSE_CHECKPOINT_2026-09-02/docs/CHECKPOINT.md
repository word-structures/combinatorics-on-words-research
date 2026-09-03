# H8 profile-response research checkpoint — 2026-09-02

## Epistemic state

- H8 was intentionally opened for exploratory mechanism discovery.
- H8 is **not** an untouched holdout anymore.
- H9 has **not** been opened in this checkpoint.
- Novelty remains **NOT_ESTABLISHED**.
- No repository governance file was modified by this ChatGPT checkpoint.

## Canonical H8 family

Exactly four profiles occur in the dominant lifted L7 component:

1. (3,3,2)
2. (4,2,2)
3. (4,3,1)
4. (5,2,1)

Dominant-component target edge counts:

- (3,3,2): 4434
- (4,2,2): 516
- (4,3,1): 480
- (5,2,1): 72

## Graph checkpoint

- h = 8
- lifted memory = 15
- raw ternary states = 14,348,907
- valid states = 120,084
- all lifted baseline edges = 213,036
- SCC count = 15,565
- dominant SCC states = 104,520
- dominant SCC edges = 184,200

The compressed graph checkpoint is `data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz`.

## Baseline dynamics

- lambda(L7), lifted presentation = 1.7776384757455823
- asymptotic variance a(L7) = 0.08282382651723189
- V16 = 1.862298121616395
- dynamic threshold Bc(8) = 3 V16 / 4 = 1.3967235912122962

Approximate non-Perron eigenvalue modulus ratio from a sparse eigensolve:

- ~0.860938 for the largest observed subleading pair.

This is **not** by itself a rigorous mixing-norm bound because the chain is non-normal.

## Hard deletion results

| profile | hard delta_a |
|---|---:|
| (3,3,2) | +0.017262485154849835 |
| (4,2,2) | -0.002991888299664361 |
| (4,3,1) | -0.0049442132838203035 |
| (5,2,1) | -0.002181423292746676 |

Two independent variance methods had previously agreed to roughly 1e-11 or better.

## Exact-resolvent soft derivative at epsilon=0

| profile | local L | Gamma | total a'(0) | |Gamma|/|L| |
|---|---:|---:|---:|---:|
| (3,3,2) | +0.03237221375090959 | -0.013427443317538992 | +0.018944770433370596 | 0.4147829809 |
| (4,2,2) | -0.004377041475916327 | +0.0007795817808082372 | -0.00359745969510809 | 0.1781070125 |
| (4,3,1) | -0.010141450016857916 | +0.002775806461786416 | -0.0073656435550715 | 0.2737090315 |
| (5,2,1) | -0.0050566797937385485 | +0.0018047635057421955 | -0.003251916287996353 | 0.3569068202 |

All four satisfy numerically:

`abs(Gamma) < abs(local)`.

Thus all four infinitesimal soft signs are already forced by the local threshold plus the measured resolvent correction.

## Independent derivative check

Central finite difference at epsilon = +/- 1e-4 agrees with the exact-resolvent implementation:

- (3,3,2): abs diff ~5.86e-11
- (4,2,2): abs diff ~1.47e-11
- (4,3,1): abs diff ~4.97e-11
- (5,2,1): abs diff ~1.87e-11

## Soft-to-hard path

Grid: 0, 0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8.

For every H8 profile, every grid secant has the same sign as the hard response.
At epsilon=8 the response is already close to the hard deletion limit.

This is numerical evidence, not a proof that a'(epsilon) never changes sign between grid points.

## Current strongest mechanism statement

The response architecture is now:

1. Exact local finite-window term

   L_v = q_v [ V_2h(L_{h-1}) - (4/3) B(v) ].

2. Exact correlation correction

   Gamma_v = a'_v(0) - L_v,

   computable by sparse Poisson/resolvent solves.

3. Hard response

   Delta_v = integral_0^infinity a'_v(epsilon) d epsilon.

The empirical minimum-B split may be explained by the dynamic threshold Bc(h)=3V_2h/4 falling in the discrete B-gap between the minimum and the next possible profile imbalance.

## Next theorem-grade tasks

Priority 1:
Produce a rigorous bound for Gamma, either by a certified multi-mixing bound or by interval/residual-certified sparse resolvent solves.

Priority 2:
Certify sign preservation along the complete soft path epsilon in [0,infinity), preferably by adaptive interval subdivision plus a hard-tail estimate.

Priority 3:
Derive / audit an explicit profile-conditioned return-kernel representation and compare it with classical correlation-polynomial / pattern-overlap machinery.

Priority 4:
Literature kill: determine whether the exact local threshold formula and the particular variance-response decomposition are already standard consequences in the literature.

Do not open H9 before a future discriminating protocol is deliberately frozen.
