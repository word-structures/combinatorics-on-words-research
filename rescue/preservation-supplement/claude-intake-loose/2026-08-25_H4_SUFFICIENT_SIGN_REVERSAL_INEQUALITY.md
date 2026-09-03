# Sufficient sign-reversal inequality for h=4, profile (2,1,1)

**Date:** 2026-08-25  
**Status:** THEORY DEVELOPMENT / COMPUTER-ASSISTED PROOF CANDIDATE / NOT YET CANONICAL  
**Scope:** exposed h=2,...,7 profile-response data only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Setup

Let \(P_\epsilon\) be the Parry transition matrix of the finite soft-penalty
system for h=4, profile (2,1,1), and let \(\pi_\epsilon\) be its stationary
distribution.  The target-profile orbit is invariant under the ternary
letter-permutation group \(S_3\), so the one-letter marginal remains exactly
uniform:

\[
\pi_\epsilon(f)=0
\]

for the fixed centered letter observable

\[
f = 1_{\{a\}}-\frac13.
\]

Write \(F=\operatorname{diag}(f)\).  The asymptotic variance is

\[
a(\epsilon)
=
c_0(\epsilon)+2\sum_{k\ge1}c_k(\epsilon),
\qquad
c_k(\epsilon)=\pi_\epsilon F P_\epsilon^k f.
\]

Hence

\[
a'(0)=\sum_{k\ge0}D_k,
\]

where \(D_0=c_0'(0)\) and \(D_k=2c_k'(0)\) for \(k\ge1\).

## 2. Exact derivative identity

Put

\[
P=P_0,\quad
\dot P=\left.\frac{dP_\epsilon}{d\epsilon}\right|_0,\quad
\pi=\pi_0,\quad
\dot\pi=\left.\frac{d\pi_\epsilon}{d\epsilon}\right|_0.
\]

Then

\[
c_k'
=
\dot\pi\,F P^k f
+
\sum_{j=0}^{k-1}
\pi F P^j \dot P P^{k-1-j}f.
\]

This replaces the earlier finite-difference derivative by a direct
finite-dimensional perturbation formula.

The Perron derivatives were obtained from the differentiated eigenvector
equations for the weighted adjacency matrix \(A_\epsilon\), with

\[
\dot A=-G_v
\]

on target edges.

The resulting lag derivatives agree with the earlier fourth-order symmetric
finite-difference reconstruction to numerical precision.

## 3. General Dobrushin tail lemma

For a row-stochastic matrix \(P\), let

\[
\tau_n=\tau(P^n)
\]

be the Dobrushin contraction coefficient.

For any zero-mass signed row vector \(\mu\),

\[
\|\mu P^n\|_1\le\tau_n\|\mu\|_1.
\]

For any vector \(u\),

\[
|\mu u|
\le
\frac12\|\mu\|_1\,\operatorname{osc}(u).
\]

Since \(\operatorname{osc}(f)=1\), define

\[
\alpha=\|\pi F\|_1,
\qquad
A=\|\dot\pi F\|_1,
\qquad
\beta=\max_i\sum_j|\dot P_{ij}|.
\]

By \(S_3\) symmetry,

\[
\pi f=0,\qquad \dot\pi f=0,
\]

and because \(P_\epsilon\mathbf 1=\mathbf1\),

\[
\dot P\mathbf1=0.
\]

Therefore

\[
\boxed{
|D_k|
\le
A\tau_k
+
\alpha\beta
\sum_{j=0}^{k-1}
\tau_j\tau_{k-1-j}
}
\qquad(k\ge1).
\]

Consequently, after an explicitly computed finite prefix through lag \(N\),

\[
S_N=\sum_{k=0}^{N}D_k,
\]

the uncomputed tail obeys

\[
\boxed{
|R_N|
\le
A\sum_{k>N}\tau_k
+
\alpha\beta
\sum_{k>N}
\sum_{j=0}^{k-1}
\tau_j\tau_{k-1-j}.
}
\]

### Sufficient sign-reversal criterion

If

\[
\boxed{
S_N+B_N<0,
}
\]

where \(B_N\) is the right-hand side of the tail bound, then

\[
\boxed{a'(0)<0.}
\]

This is a genuine sufficient inequality.  It does not assume monotonicity of
the soft path.

## 4. h=4 numerical certificate candidate

For h=4, profile (2,1,1), the analytic perturbation calculation gives

\[
\alpha=\frac49=0.4444444444\dots,
\]

\[
A\approx0.19930788429,
\]

\[
\beta\approx1.20029343824.
\]

The directly evaluated Dobrushin coefficients satisfy

\[
\begin{array}{c|c}
n & \tau(P^n)\\
\hline
9 & 0.6910881731\\
10 & 0.4283278390\\
11 & 0.2824250004\\
12 & 0.2124095884\\
13 & 0.1698592503\\
14 & 0.1294962053\\
15 & 0.08354075515
\end{array}
\]

and \(\tau(P^n)\le1\) trivially for smaller \(n\).

For a deliberately outward-rounded certificate candidate, use

\[
A\le0.200,\qquad
\beta\le1.201,
\]

and

\[
\begin{array}{c|ccccccc}
n&9&10&11&12&13&14&15\\
\hline
\bar\tau_n&
0.692&0.429&0.283&0.213&0.170&0.130&0.084.
\end{array}
\]

By submultiplicativity,

\[
\tau(P^{15b+r})
\le
0.084^b\,\bar\tau_r.
\]

## 5. Finite prefix

Using the analytic derivative recurrence

\[
v_{k+1}=Pv_k,\qquad
u_{k+1}=\dot P\,v_k+Pu_k,
\]

with \(v_0=f,u_0=0\), the directly computed prefix through lag 80 is

\[
\boxed{
S_{80}\approx-0.00733732605900.
}
\]

For reference:

\[
S_{10}\approx-0.0205256480019,
\]

\[
S_{15}\approx-0.00931229855904,
\]

\[
S_{40}\approx-0.00733188407910.
\]

The sequence has already essentially converged by lag 80.

## 6. Explicit tail bound after lag 80

Using the rounded Dobrushin bounds above in the general tail inequality gives

\[
\boxed{
B_{80}\le0.002169750081.
}
\]

Therefore

\[
S_{80}+B_{80}
<
-0.007337326059
+
0.002169750081
\]

and hence

\[
\boxed{
S_{80}+B_{80}
<
-0.005167575978
<
0.
}
\]

Thus, **if the displayed Perron/Dobrushin numerical upper bounds are
certified with outward-rounded arithmetic**, the sufficient criterion proves

\[
\boxed{
a'_{4,(2,1,1)}(0)<0.
}
\]

The safety margin is about

\[
5.17\times10^{-3},
\]

which is large relative to ordinary floating-point roundoff.

## 7. Epistemic status

The mathematical tail lemma and sufficient inequality are analytic.

The h=4 instantiation is currently a **computer-assisted proof candidate**,
not yet a formal certified proof, because the Perron derivatives and
Dobrushin coefficients were evaluated in ordinary Float64 arithmetic.

The remaining closure task is narrow:

1. compute rigorous interval enclosures for the baseline Perron data;
2. propagate them to \(P,\dot P,\dot\pi\);
3. certify the rounded bounds
   \(A\le0.200\), \(\beta\le1.201\), and the displayed \(\bar\tau_n\);
4. certify \(S_{80}\) with an interval whose upper endpoint remains below
   \(-0.002169750081\).

No new epsilon sweep is needed.

## 8. Why this matters

This converts the sign reversal from an empirical curve feature into a
finite verification problem:

\[
\boxed{
\text{80 explicit lag derivatives}
+
\text{finite-state mixing bound}
\Longrightarrow
a'(0)<0.
}
\]

The proof architecture is independent of the later hard endpoint and does not
use h=8.

Combined with the hidden-color continuation lemmas, this gives a plausible
paper-level structure:

- exact local composition decomposition;
- exact boundary and singleton-deficit lemmas;
- hidden-color continuation kernel;
- short-lag structural mechanism;
- Dobrushin sufficient sign criterion;
- rigorously certifiable h=4 sign reversal;
- h=3/h=5 controls showing why the effect need not cross elsewhere.

Novelty relative to the literature remains NOT ESTABLISHED.
