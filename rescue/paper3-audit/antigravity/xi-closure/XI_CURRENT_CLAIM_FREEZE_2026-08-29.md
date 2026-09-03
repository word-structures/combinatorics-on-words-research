# Paper 3: Xi_v Current Claim Freeze
**Date:** 2026-08-29

## Exact Definitions
1. **Response parameters:**
   - $D_v(t) = P_{base}(t) - P_{hard,v}(t)$
   - Curvature $\eta_v = -D_v""(0)/D_v(0)$
   - $z_v(t) = e^{D_v(t)}$
2. **Scalar recurrence:**
   - $F(z,t) = z - 1 - z^3 \phi_v(z,t) = 0$
   - $\phi_v(z,t) = \ell^T \mathcal{B}_v(z,t)^{-1} m_v(t)$
   - $\mathcal{B}_v(z,t) = I + z O_1(t) + z^2 O_2(t) + E_v(z,t)$
3. **Current candidate factorization:**
   - $\eta_v = -(4/3)B(v) + \Xi_v$
   - $B(v) = \sum_c (v_c - h/3)^2 = h^2(d_1(v) - 1/3)$

## Status
- **Proved:** Abelian overlap invariants (A1, A2, B1, B2, B3), exact mean shift formulas ($d_1$, $d_2$), and the implicit curvature identity $\eta_v = -z_v^2 \phi_{tt} / (D_v F_z)$. The finite-depth certifier error bound $\mathcal{E}_\phi$ is rigorously proved via Banach-valued Cauchy estimates.
- **Interpretation / Open:** The exact analytic derivation of the $-4/3 B(v)$ term from the $O_1$ operator has not yet been traced identically with all scaling conventions explicitly verified. $\Xi_v$ is defined conceptually as "everything else", but has not been defined independently (structurally) from $O_2$ and $E_v$ without relying on subtraction. The structural necessity of Type-II overlaps and delayed returns to produce a positive sign is hypothesized but not structurally proven.

