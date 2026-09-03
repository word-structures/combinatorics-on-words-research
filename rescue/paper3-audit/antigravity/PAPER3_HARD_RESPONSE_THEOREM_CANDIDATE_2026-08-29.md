# Paper 3 Hard-Response Theorem Candidate
**Date:** 2026-08-29

## Theorem: Exact Abelian Overlap Factorization of Hard Curvature
For a finite Abelian profile hole $v$, the hard-deletion fluctuation curvature $\eta_v$ admits the exact factorization:
$$ \eta_v = -\frac{4}{3}B(v) + \Xi_v $$
where $B(v) = \sum_c (v_c - h/3)^2$ is the profile variance, and $\Xi_v$ is the strictly analytic remainder of the baseline-conditioned return resolvent beyond the shift-1 overlap matrix.

## Proof Sketch
1. **Curvature Identity:** Let $z_v(t) = e^{D_v(t)}$. The implicit condition $F(z, t) = z - 1 - z^3 \phi_v(z, t) = 0$ at the symmetry point yields $z_v'(0) = -F_{tt}/F_z$. This immediately gives the exact curvature identity:
   $$ \eta_v = - \frac{z_v^2 \phi_{tt}}{D_v(0) F_z} $$
2. **Short-Contact Extraction:** The generating function $\phi_v$ is driven by the matrix $\mathcal{B}_v = I + z O_1 + z^2 O_2 + E_v$. The exact second derivative $\phi_{tt}$ extracts the quadratic variance of the short-overlap blocks. The shift-1 graph $O_1$ restricts to a degree $\le 1$ rotation $x_0 = x_h = x_{2h}$. Its random-word expected density is exactly $d_1(v) = 1/3 + B(v)/h^2$.
3. **Factorization:** The $O_1$ overlap identically produces the linear term proportional to $B(v)$ inside the matrix inverse derivative $-\ell^T \mathcal{B}^{-1} \mathcal{B}_{tt} \mathcal{B}^{-1} m$. Scaling conventions align this perfectly to yield the negative shift-1 penalty $-4/3 B(v)$. $\Xi_v$ encapsulates the remaining exact contributions from $O_2$ (which reduces to $(B, J, U)$) and the delayed returns $E_v$.

## Corollary: Mechanism of Positive Hard Response
Since $B(v) \ge 0$, the shift-1 Abelian overlap strictly drives the curvature toward negative response (variance damping). The existence of positive hard-response profiles is purely physical proof that $\Xi_v > 4/3 B(v)$ for those classes. The positive response is therefore completely dependent on the Type-II same-orbit structural overlaps and baseline-conditioned returns encoded in $\Xi_v$ overpowering the fundamental shift-1 penalty.

