# PAPER 4 LAYER C SIGN CONVENTION
**Date:** 2026-08-29

## 1. The Fixed Algebraic Convention
For any candidate window testing for an abelian square, the condition $P(W_{left}) = P(W_{right})$ is decomposed into a known constant bulk contribution $t$ (from the fully resolved block profiles) and an unresolved fractional boundary contribution $\sigma(X)$ (from the exact letter prefixes).

**Convention:**
$$ \sigma(X) + t = 0 $$

Where:
- $X_d$ represents the Parikh vector of the prefix of length $d$ of a specific unresolved block.
- $\sigma(X) = \sum \alpha_d X_d$ is the reduced Paper-4 signature (the linear combination of prefix variables).
- $t = \Delta_{bulk}$ is the affine target representing the net Parikh difference of the resolved bulk blocks.

Therefore the required boundary correction is:
$$ \sigma(X) = -t $$

If $-t \notin \mathcal{R}_\sigma(\rho)$, the window is **ALGEBRAICALLY SAFE**.

## 2. Hand-Worked Window Examples

### Example 1: Domain Zs (No wrap-around)
**Topology:** Square of length $2K$. $W_{left}$ starts at offset $u$ in block $B_0$. $W_{left}$ ends at offset $v$ in block $B_m$. $W_{right}$ ends at offset $w$ in block $B_{2m}$. No blocks wrap around ($u \le v \le w$).
**Parikh Equation:**
$P(W_{left}) = (P(B_0) - X_u) + \sum_{i=1}^{m-1} P(B_i) + X_v$
$P(W_{right}) = (P(B_m) - X_v) + \sum_{i=m+1}^{2m-1} P(B_i) + X_w$
**Difference:**
$P(W_{left}) - P(W_{right}) = (P(B_0) + \sum_{i=1}^{m-1} P(B_i) - P(B_m) - \sum_{i=m+1}^{2m-1} P(B_i)) - X_u + 2X_v - X_w = 0$
Let the constant bulk term be $t = \Delta_{bulk}$.
$t - X_u + 2X_v - X_w = 0$
**Convention Alignment:**
$\sigma(X) = -X_u + 2X_v - X_w$
$\sigma(X) + t = 0 \implies \sigma(X) = -t$.

### Example 2: Domain Pt (Partial Wrap)
**Topology:** $W_{left}$ ends at $v$ in $B_m$, $W_{right}$ wraps around $B_{2m}$ and ends at $w$ in $B_{2m+1}$, with $v \le u$ and $w < v$.
**Parikh Equation:**
$P(W_{left}) = (P(B_0) - X_u) + \dots + X_v$
$P(W_{right}) = (P(B_m) - X_v) + \dots + P(B_{2m}) + X_w$
**Difference:**
$t - X_u + 2X_v - X_w = 0$
$\sigma(X) = -X_u + 2X_v - X_w$
$\sigma(X) + t = 0 \implies \sigma(X) = -t$.

### Example 3: Single-Block Prefix Square (Trivial short period)
**Topology:** $W_{left}$ starts at $0$ and ends at $v$ in $B_0$. $W_{right}$ starts at $v$ and ends at $2v$ in $B_0$.
**Difference:**
$X_v - (X_{2v} - X_v) = 2X_v - X_{2v} = 0$
$t = 0$
$\sigma(X) = 2X_v - X_{2v}$
$\sigma(X) + t = 0 \implies \sigma(X) = -t$.

This confirms that the convention $\sigma(X) + t = 0$ is mathematically natural and perfectly aligns with checking $-t \in \mathcal{R}_\sigma(\rho)$.
