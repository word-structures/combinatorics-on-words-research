# Gamma correction: exact resolvent and return-kernel formulas

## Scope

This note derives the finite-state soft-response formula used for the H8 profile-response mechanism study.
It is a mathematical derivation for a primitive finite transfer matrix / Parry chain. It does **not** by itself establish a universal hard-deletion sign theorem.

Let

\[
T_\varepsilon(i,j)=T(i,j)e^{-\varepsilon g_{ij}}
\]

be a nonnegative primitive transfer matrix with a target-edge indicator \(g_{ij}\in\{0,1\}\).
Let \(\lambda_\varepsilon\) be its Perron root, and use the Doob-normalized Markov chain

\[
P_{ij}=\frac{T_{ij}r_j}{\lambda r_i},
\qquad
\pi_i=l_i r_i,
\qquad l^Tr=1.
\]

Let \(f\) be the centered letter observable. In the H8 computation,

\[
f(i)=1_{\{\text{last symbol of state }i=a\}}-\frac13.
\]

By S3 symmetry, \(\pi f=0\) throughout the symmetric soft profile penalty.

Define

\[
\Pi={\bf 1}\pi^T,
\qquad
Z=(I-P+\Pi)^{-1}.
\]

For centered vectors, \(Z\) is the Poisson/resolvent operator.

---

## 1. Baseline asymptotic variance

Let

\[
u=Zf.
\]

Then

\[
(I-P+\Pi)u=f
\]

and the asymptotic variance rate is

\[
\boxed{
 a=2\langle f,u\rangle_\pi-\langle f,f\rangle_\pi.
}
\]

This is the corrected Poisson / Green--Kubo formula used in the durable h=2,...,7 audit.

---

## 2. Derivative of the Parry transition matrix under the soft penalty

Define the row-conditional target probability

\[
\bar g_i=\sum_jP_{ij}g_{ij}
\]

and the stationary target mass

\[
q=\sum_i\pi_i\bar g_i
 =\sum_{ij}\pi_iP_{ij}g_{ij}.
\]

Since

\[
\frac{d}{d\varepsilon}\log\lambda_\varepsilon\Big|_0=-q,
\]

write

\[
\psi_i=\frac{r_i'}{r_i}.
\]

Differentiating the Perron equation gives

\[
\boxed{
(I-P)\psi=q{\bf1}-\bar g,
\qquad \pi\psi=0,
}
\]

hence

\[
\psi=Z(q{\bf1}-\bar g).
\]

The derivative of the Doob transition matrix is therefore

\[
\boxed{
P'_{ij}=P_{ij}d_{ij}
}
\]

with

\[
\boxed{
d_{ij}=-g_{ij}+q+\psi_j-\psi_i.
}
\]

The row sums vanish exactly:

\[
\sum_jP'_{ij}=0.
\]

The stationary derivative is characterized by

\[
\pi'(I-P)=\pi P',
\qquad
\pi'{\bf1}=0,
\]

so that

\[
\boxed{
\pi'=\pi P'Z.
}
\]

---

## 3. Exact resolvent formula for the soft variance derivative

Differentiate

\[
a=2\langle f,Zf\rangle_\pi-\langle f,f\rangle_\pi.
\]

Because S3 symmetry keeps \(f\) centered and unchanged, no observable-centering derivative is required.

Let

\[
H=2f\odot u-f\odot f,
\qquad
v=Z\bigl(H-(\pi H){\bf1}\bigr).
\]

Let \(Z^*\) denote the adjoint of \(Z\) in \(L^2(\pi)\), and define

\[
w=Z^*f.
\]

Then

\[
\boxed{
 a'(0)=\pi P'v+2\langle w,P'u\rangle_\pi.
}
\]

Equivalently, substituting \(P'_{ij}=P_{ij}d_{ij}\),

\[
\boxed{
 a'(0)=
 \sum_{ij}\pi_iP_{ij}d_{ij}
 \left(v_j+2w_i u_j\right).
}
\]

This is a sparse finite-state formula: it contains no infinite correlation sum and no dense inverse is required. Each appearance of \(Z\) can be evaluated by a Poisson solve.

### H8 numerical verification

For all four h=8 profiles, this resolvent derivative was independently checked by the central finite difference

\[
\frac{a(10^{-4})-a(-10^{-4})}{2\cdot10^{-4}}.
\]

Absolute disagreements were between approximately \(1.5\times10^{-11}\) and \(5.9\times10^{-11}\).

---

## 4. Exact profile-conditioned return kernel

There is a second, more conceptual representation.
Let the target profile event at time 0 be \(g_0\), and define the two-index profile-conditioned covariance kernel

\[
\boxed{
K_v(r,s)
=
\mathbb E[f_r f_s\mid g_0=1]
-
\mathbb E[f_r f_s].
}
\]

For an S3-invariant target event and S3-invariant equilibrium,

\[
\mathbb E f_r=0,
\qquad
\mathbb E[g_0f_r]=0.
\]

Hence the relevant third cumulant reduces to

\[
\kappa(g_0,f_r,f_s)
=q_v K_v(r,s).
\]

Under absolute summability of the mixed correlations,

\[
\boxed{
 a'_v(0)
 =-q_v\sum_{r,s\in\mathbb Z}K_v(r,s).
}
\]

This is the exact return/correlation-kernel interpretation of the soft response.

---

## 5. Exact local term and Gamma

Let \(I\) be the \(2h\)-letter support of the profile event and

\[
F_I=\sum_{k\in I}f_k.
\]

Define the baseline finite-block variance

\[
V_{2h}=\operatorname{Var}(F_I).
\]

For a canonical half-Parikh profile \(v=(v_1,v_2,v_3)\), S3 symmetry implies

\[
\mathbb E(F_I^2\mid g_0=1)=\frac43B(v),
\]

where

\[
B(v)=\sum_{i=1}^3\left(v_i-\frac h3\right)^2.
\]

Therefore the part of the mixed kernel with both tilt insertions inside the target support is exactly

\[
\boxed{
L_v
=-\operatorname{Cov}(g_0,F_I^2)
=q_v\left(V_{2h}-\frac43B(v)\right).
}
\]

Define

\[
\boxed{
\Gamma_v=a'_v(0)-L_v.
}
\]

In kernel form,

\[
\boxed{
\Gamma_v
=-q_v
\sum_{(r,s)\notin I^2}K_v(r,s).
}
\]

Thus \(\Gamma_v\) is precisely the cross-boundary / outside-support response correction.

The dynamic local threshold is

\[
\boxed{
B_c(h)=\frac34V_{2h}(L_{h-1}).
}
\]

and

\[
\operatorname{sign}L_v
=
\operatorname{sign}(B_c(h)-B(v)).
\]

---

## 6. H8 Gamma values

For the h=8 baseline \(L_7\),

\[
V_{16}=1.862298121616395,
\qquad
B_c(8)=1.396723591212296.
\]

The exact-resolvent numerical decomposition at \(\varepsilon=0\) is:

| profile | local \(L_v\) | total \(a'_v(0)\) | \(\Gamma_v\) | \(|\Gamma|/|L|\) |
|---|---:|---:|---:|---:|
| (3,3,2) | +0.032372213751 | +0.018944770433 | -0.013427443318 | 0.414783 |
| (4,2,2) | -0.004377041476 | -0.003597459695 | +0.000779581781 | 0.178107 |
| (4,3,1) | -0.010141450017 | -0.007365643555 | +0.002775806462 | 0.273709 |
| (5,2,1) | -0.005056679794 | -0.003251916288 | +0.001804763506 | 0.356907 |

For all four profiles,

\[
\boxed{|\Gamma_v|<|L_v|}
\]

numerically, and therefore the exact-resolvent soft derivative has the same sign as the local threshold prediction.

This is a **numerical H8 dominance certificate**, not yet a rigorous interval-arithmetic proof.

---

## 7. A usable tail-bound theorem template

For a rigorous theorem, define the expanded interval \(I_R\) obtained by adding \(R\) sites on each side of \(I\), and the truncated correction

\[
\Gamma_{v,R}
=-q_v\sum_{(r,s)\in I_R^2\setminus I^2}K_v(r,s).
\]

Assume a certified third-order/mixed-correlation decay estimate of the form

\[
|K_v(r,s)|
\le C_3\|f\|_\infty^2\rho^{\tau(r,s)},
\qquad 0<\rho<1,
\]

where

\[
\tau(r,s)=\max\{d(r,I),d(s,I)\}.
\]

For an event support of size \(m=2h\), the number of ordered pairs whose maximum distance from \(I\) is exactly \(n\ge1\) is

\[
(m+2n)^2-(m+2n-2)^2
=4(m+2n-1).
\]

Therefore

\[
\boxed{
|\Gamma_v-\Gamma_{v,R}|
\le
4q_v C_3\|f\|_\infty^2
\sum_{n=R+1}^{\infty}(m+2n-1)\rho^n.
}
\]

The geometric sum is explicit:

\[
\boxed{
|\Gamma_v-\Gamma_{v,R}|
\le
4q_v C_3\|f\|_\infty^2\rho^{R+1}
\left[
\frac{m-1}{1-\rho}
+
\frac{2((R+1)-R\rho)}{(1-\rho)^2}
\right].
}
\]

For the ternary centered letter indicator,

\[
\|f\|_\infty=\frac23.
\]

### What remains to make this a rigorous H8 sign certificate

One must still produce a certified pair \((C_3,\rho)\) for the H8 Parry chain or an equivalent block-mixing certificate. A practical route is:

1. choose a block length \(b\);
2. rigorously bound the mean-zero operator norm of \(P^b\) below 1;
3. convert that to an exponential mixing estimate;
4. evaluate \(\Gamma_{v,R}\) for a finite buffer;
5. show
   \[
   |\Gamma_{v,R}|+\text{tail bound}<|L_v|.
   \]

That would promote the current floating-point H8 dominance observation into a rigorous computer-assisted inequality.

---

## 8. Soft-to-hard sign preservation

The hard deletion satisfies formally/analytically along the simple Perron branch

\[
\Delta_v
=a_v(\infty)-a_v(0)
=\int_0^\infty a'_v(\varepsilon)\,d\varepsilon.
\]

The H8 soft-path grid

\[
\varepsilon=0,.05,.1,.25,.5,1,2,4,8
\]

has the correct sign on every secant for all four profiles and converges closely to the hard-deletion values.

This is strong numerical evidence for sign preservation, but a theorem still needs either:

- a sign bound on \(a'_v(\varepsilon)\) for all \(\varepsilon\ge0\), or
- interval subdivision plus a certified tail to \(\varepsilon=\infty\).

This is the next natural computer-assisted theorem target.
