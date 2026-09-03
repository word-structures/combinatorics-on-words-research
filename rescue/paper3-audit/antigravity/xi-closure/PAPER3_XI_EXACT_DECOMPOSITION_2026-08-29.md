# Paper 3: Exact Structural Decomposition of $\Xi_v$
**Date:** 2026-08-29

## 1. Structural Definition without Subtraction (Phase B)
The generating function $\phi_v(z,t) = \ell^T \mathcal{B}_v^{-1} m_v$ is driven by $\mathcal{B}_v = I + z O_1 + z^2 O_2 + E_v$.
Let the short-contact operator be $A_v = I + z O_1 + z^2 O_2$.
By the resolvent identity, $\mathcal{B}_v^{-1} = A_v^{-1} - A_v^{-1} E_v \mathcal{B}_v^{-1}$.
Thus, the generating function splits exactly:
$$ \phi_v = \phi_{short} + \phi_{return} $$
where $\phi_{short} = \ell^T A_v^{-1} m_v$ and $\phi_{return} = -\ell^T A_v^{-1} E_v \mathcal{B}_v^{-1} m_v$.
Since the curvature operator $\eta_v[\phi] = - \frac{z^2}{D_v F_z} \phi_{tt}$ is linear in $\phi_{tt}$, we define:
$$ \Xi_{short}(v) = \eta_v[\phi_{short}] + \frac{4}{3}B(v) $$
$$ \Xi_{return}(v) = \eta_v[\phi_{return}] $$
$$ \Xi_v = \Xi_{short}(v) + \Xi_{return}(v) $$
This defines $\Xi_v$ as a forward constructive object. It is NOT defined as $\eta_v + 4/3 B(v)$. It is defined by explicit operator partitioning.

## 2. Short-Contact Reduction (Phase C)
Since $A_v = I + N_v$ where $N_v = z O_1 + z^2 O_2$ has an acyclic support graph (Theorem C0.2), $A_v^{-1}$ is exactly the finite polynomial $\sum_{j=0}^d (-N_v)^j$.
This means $\phi_{short}$ is a strictly finite polynomial in $z$ and $t$.
Its second derivative $\phi_{short, tt}$ evaluates exactly to combinations of the raw shift-1 and shift-2 overlaps.
The exact evaluation of the $O_1$ and $O_2$ traces restricted to the same profile orbit reduces exclusively to the symmetric invariants:
- $B(v) = \sum (v_i - h/3)^2$
- $J(v) = \sum (v_i - h/3)^3$
- $U(v) = \sum_{v_i = v_j+1} v_i^2(v_i-1)v_j$
Thus $\Xi_{short}(v) = P_h(B, J, U)$, an exact rational function of the profile invariants.

## 3. Delayed Return Representation (Phase D)
$\Xi_{return}(v)$ encapsulates the infinite sum of centered returns beyond the overlap depth.
Using $\phi_{return} = -\ell^T A_v^{-1} E_v \mathcal{B}_v^{-1} m_v$, we extract the exact tail.
For any finite truncation depth $N$, let $E_v = E_{v, \le N} + Tail_N$.
$$ \Xi_{return}(v) = \sum_{n=3}^N R_n(v) + \eta_v[-\ell^T A_v^{-1} Tail_N \mathcal{B}_v^{-1} m_v] $$
where $R_n(v)$ are the exact algebraically computable finite-depth delayed returns.

## 4. Certified Tail (Phase E)
Assume a uniform complex-disc blocked contraction bound $\|Tail_N(z,t)\| \le \epsilon_N(v)$ for $|t| \le r$.
By the Banach-valued Cauchy estimates:
$$ \|\partial_t^2 Tail_N(0)\| \le \frac{2 \epsilon_N(v)}{r^2} $$
Applying the F9 perturbation bound on the truncated resolvent yields a rigorous error interval $\mathcal{E}_\phi$.
This immediately implies:
$$ \Xi_v \in \left[ \Xi_{short}(v) + \sum_{n=3}^N R_n(v) - \mathcal{E}_\phi, \Xi_{short}(v) + \sum_{n=3}^N R_n(v) + \mathcal{E}_\phi \right] $$
This provides a Level-2 exact independent representation and a Level-3 rigorous profile-specific sign certificate without floating-point errors.

