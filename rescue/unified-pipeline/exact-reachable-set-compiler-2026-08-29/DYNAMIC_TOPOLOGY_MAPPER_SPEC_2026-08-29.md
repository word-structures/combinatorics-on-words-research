# DYNAMIC TOPOLOGY MAPPER SPECIFICATION
**Date:** 2026-08-29

## 1. Goal
To provide a strictly geometry-first, exact mapping from a physical candidate window $W$ (defined by $start$ offset, half-length $K$, and literal block assignments) to a reduced abstract Paper-4 signature $\sigma(X)$ and an affine target Parikh vector $t$. 

## 2. Input
- `L`: block size.
- `start` ($u$): literal character offset of the start of the window in block 0.
- `K`: half-length of the abelian square in characters ($K \ge 2L$).
- `sourceRoles`: array of role identities for the target blocks (e.g., `['a', 'b', 'c', 'a', ...]`).
- `concreteBlocks`: array of actual literal strings for those blocks (to compute $t$).
- `unresolvedRole`: the role identity (e.g., `'a'`) currently being treated as the free variable.

## 3. Geometric Derivation
1. **Boundaries:**
   - Left half $W_{left} = [start, start+K-1]$
   - Right half $W_{right} = [start+K, start+2K-1]$
   - $u = start$
   - $v = (u + K) \bmod L$
   - $w = (u + 2K) \bmod L$
   - $m_1 = \lfloor (u+K)/L \rfloor$
   - $m_2 = \lfloor (u+2K)/L \rfloor$
   - Boundary blocks: $b_0 = 0$, $b_1 = m_1$, $b_2 = m_2$.

2. **Role Mask $\chi$:**
   - $\chi_0 = (sourceRoles[0] == unresolvedRole) ? 1 : 0$
   - $\chi_1 = (sourceRoles[m_1] == unresolvedRole) ? 1 : 0$
   - $\chi_2 = (sourceRoles[m_2] == unresolvedRole) ? 1 : 0$

3. **Algebraic Decomposition ($\sigma(X) + t = 0$):**
   We define the Parikh difference as $P(W_{left}) - P(W_{right})$.
   The raw fractional boundary terms are:
   - $-X_u$ from block 0
   - $+2X_v$ from block $m_1$
   - $-X_w$ from block $m_2$
   
   *Target $t$ Initialization (Bulk Full Blocks):*
   $t = \mathbf{0}$
   If $m_1 > 0$: $t += P(B_0) + \sum_{i=1}^{m_1-1} P(B_i)$
   If $m_2 > m_1$: $t -= P(B_{m_1}) + \sum_{i=m_1+1}^{m_2-1} P(B_i)$
   
   *Signature Reduction and Known-Fractional Absorption:*
   For each boundary $j \in \{0, 1, 2\}$ with depth $d_j \in \{u, v, w\}$, block index $b_j$, and coefficient $c_j \in \{-1, +2, -1\}$:
   - If $d_j == 0$, the prefix is empty, so it contributes nothing.
   - If $\chi_j == 1$, the prefix is unresolved. Add $(d_j, c_j)$ to the abstract signature $\sigma(X)$.
   - If $\chi_j == 0$, the prefix is KNOWN. Evaluate $c_j \cdot P(B_{b_j}[0 \dots d_j-1])$ and **add it to $t$**.
   
   *Signature Canonicalization:*
   - Sum coefficients for identical depths in $\sigma$.
   - Remove terms with coefficient 0.
   - Sort by depth ascending.
   - To match Paper 4's sign convention exactly, Paper 4 computes $P(W_{right}) - P(W_{left})$. So we must negate BOTH $\sigma$ and $t$ to output the canonical $\sigma_{P4}$ and $t_{P4}$. (This maintains $\sigma_{P4}(X) + t_{P4} = 0$).

## 4. Output
- `sigma`: the reduced, sorted signature array `[{d, a}]`.
- `t`: the integer Parikh vector target.
- `domain`: the literal Paper-4 domain name.
- `chi`: the literal role mask array.
