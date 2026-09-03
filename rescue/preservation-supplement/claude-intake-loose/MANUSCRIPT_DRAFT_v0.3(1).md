# Continuation capacity and delayed variance response in forbidden-pattern shifts

**Manuscript draft v0.2 — 2026-08-25**  
**Status:** working research manuscript; theorem/certificate promotion pending independent audit  
**Author:** Joonas Huhta — Word Structures project  
**Scope:** finite-state bounded Abelian-square avoidance; no \(h=8\) computation  
**Novelty status:** NOT_ESTABLISHED

---

## Abstract

We study how a soft penalty on a finite pattern event changes the asymptotic variance of a centered letter-count observable in a mixing shift of finite type.  For
\[
A_\varepsilon(i,j)=A_0(i,j)e^{-\varepsilon g(i,j)},
\]
let \(a(\varepsilon)\) denote the asymptotic variance under the corresponding Parry measure.  In ternary bounded Abelian-square shifts, a local profile contribution can have the opposite sign from the full response: for \(h=4\), profile \((2,1,1)\), the local term is positive while \(a'(0)<0\).

We derive an exact one-endpoint response identity and introduce **continuation capacity**
\[
N_m=A^m\mathbf1.
\]
The ratio \(N_m(j)/N_{m+1}(i)\) converges to the Parry transition probability and admits a finite projective enclosure.  This converts forbidden-continuation combinatorics into lower bounds on delayed correlation contributions.  Combined with a residual budget, it yields a mechanism-aware sufficient criterion for negative variance response.

An \(h=4\) computer-assisted certificate and a scalable \(L_6\) residual-tail certificate currently pass internally.  With both procedures frozen, two prospectively specified exact \(h=7\) positional subtargets received negative internal certificates before a separate reference evaluation; both were confirmed negative.  The mechanism lower bound is response-blind, but the residual certificate evaluates finite linear-response terms, so the full procedure is sign certification rather than a purely combinatorial predictor.  Independent proof and literature audits remain required.

---

## 1. Introduction

A forbidden pattern changes more than the number of admissible words.  It changes the maximal-entropy measure on the surviving shift, hence the frequencies, correlations, and fluctuations of observables.  A classical line of work relates word overlaps and correlation polynomials to enumeration and spectral data of forbidden-word shifts; another line relates pressure derivatives, Poisson equations, and Green--Kubo sums to fluctuations in finite-state dynamical systems.  The question here is whether a finite combinatorial description of *what continuations a pattern suppresses* can certify the sign of a fluctuation response.

The motivating laboratory comes from ternary Abelian-square avoidance.  An Abelian square is a word \(UV\) with \(|U|=|V|\) and
\[
\Psi(U)=\Psi(V),
\]
where \(\Psi\) is the Parikh vector.  Let \(L_{h-1}\) be the ternary shift avoiding Abelian squares of half-lengths \(2,\ldots,h-1\).  A newly completed \(2h\)-window may itself be an \(h\)-Abelian square.  Such a target event can be grouped by the common half-profile
\[
v=(v_1,v_2,v_3),\qquad v_1+v_2+v_3=h.
\]

We penalize a chosen target event \(G\) by the factor \(e^{-\varepsilon}\) rather than deleting its edges.  The support is unchanged for every finite \(\varepsilon\).  Thus the object is a smooth statistical response inside one finite-state system, not a finite-\(\varepsilon\) topological phase transition.  The observable is the centered count of one fixed letter,
\[
f=1_{\{a\}}-\frac13,
\]
and the response variable is its asymptotic variance
\[
a(\varepsilon)
=
\lim_{n\to\infty}
\frac1n
\operatorname{Var}_{\mu_\varepsilon}
\left(\sum_{t=0}^{n-1}f(X_t)\right).
\]

The initial discovery was a sign reversal.  For \(h=4\), profile \(v=(2,1,1)\), a natural target-window contribution is positive, but the full derivative is
\[
a'(0)\approx -0.00733732617.
\]
A lag decomposition localizes the reversal to delayed correlations beyond the defining target window, especially a one-endpoint continuation channel at lags \(9\) and \(10\).

That case led to a broader object.  For a finite-state context \(s\), define its \(m\)-step **continuation capacity**
\[
N_m(s)=\#\{\text{admissible length-}m\text{ continuations from }s\}
      =(A^m\mathbf1)_s.
\]
On an allowed edge \(i\to j\), the ratio
\[
Q_m(i,j)=\frac{N_m(j)}{N_{m+1}(i)}
\]
converges to the Parry transition probability.  Consequently finite continuation trees can be used not merely as qualitative motifs but as quantitatively certifiable proxies for the equilibrium dynamics.

The paper has one intended spine:

\[
\boxed{
\text{local pattern geometry}
\;\longrightarrow\;
\text{continuation capacity}
\;\longrightarrow\;
\text{delayed correlation}
\;\longrightarrow\;
\text{variance-response sign}.
}
\]

The detailed \(h=4\) case explains why the delayed term can overturn the local one.  The continuation-capacity lemmas then abstract the relevant part of that mechanism.  Finally, finite-prefix and mixing-tail certificates show how a named negative mechanism can dominate all remaining response terms.

### 1.1 Contributions and status

The intended contributions are:

1. **One-endpoint response identity.**  Under color symmetry, the response contribution of a target placement containing exactly one of two observed sites is determined by a target-conditioned same-color continuation kernel.

2. **Continuation-exclusion lower bounds.**  A finite partition of target-conditioned continuation contexts converts forbidden-continuation information into a rigorous lower bound on that kernel.

3. **Continuation capacity.**  Finite continuation counts \(N_m=A^m\mathbf1\) provide a direct finite approximation to Parry transition probabilities, with an explicit projective enclosure.

4. **Mechanism-aware sign criterion.**  A certified negative continuation channel plus an upper bound on all remaining response terms gives a sufficient condition for \(a'(0)<0\).

5. **Computer-assisted Abelian-square applications.**  The \(h=4,(2,1,1)\) case has an internally passing mechanism-aware certificate.  A scalable \(L_6\) tail certificate has also been constructed.

6. **Prospectively frozen exact-subtarget applications.**  After the mechanism rule and \(L_6\) certifier were frozen, two \(h=7\) positional subtargets received negative internal certificates before a separate reference evaluation; both reference derivatives were negative.

Items 4--6 are currently **certificate candidates**, not publication-grade theorems.  The analytic identities and all computer-assisted bounds are being prepared for an independent clean-room audit.

### 1.2 What is not claimed

We do not claim:

- that profile imbalance alone causally determines the response;
- a universal sign law over forbidden patterns;
- a complete classifier of negative responses;
- a positive-response certificate;
- a topological phase transition at finite penalty;
- a solution or direct implication for Mäkelä's conjecture;
- novelty or priority before a primary-source literature audit.

The hard-deletion profile experiments that motivated this line are discovery context only.  The results below concern the soft path \(A_\varepsilon=A_0e^{-\varepsilon g}\) unless explicitly stated otherwise.

---

## 2. Finite-state response setup

Let \(X\) be a topologically mixing shift of finite type represented by a primitive \(0\)-\(1\) adjacency matrix \(A\).  Let \(g(i,j)\in\{0,1\}\) indicate a finite pattern event in a sufficiently high-block presentation.  For \(\varepsilon\) in a neighborhood of zero define
\[
A_\varepsilon(i,j)
=
A(i,j)e^{-\varepsilon g(i,j)}.
\]
Let \(\lambda_\varepsilon\) be the Perron root and \(r_\varepsilon,\ell_\varepsilon\) positive right and left Perron vectors, normalized by
\[
\ell_\varepsilon^T r_\varepsilon=1.
\]
The Parry transition matrix and stationary law are
\[
P_\varepsilon(i,j)
=
\frac{A_\varepsilon(i,j)r_\varepsilon(j)}
{\lambda_\varepsilon r_\varepsilon(i)},
\qquad
\pi_\varepsilon(i)=\ell_\varepsilon(i)r_\varepsilon(i).
\]

For a state or edge observable \(f\), recode if necessary so that one convention is used throughout.  In the Abelian applications we use the centered fixed-letter observable
\[
f=1_{\{a\}}-\frac13.
\]
Because both the baseline and the target event are invariant under all ternary color permutations, the one-letter marginal remains \(1/3\) along the soft path.  Thus no \(\varepsilon\)-dependent re-centering term is needed in this symmetric setting.  This symmetry assertion is one of the explicit audit obligations.

The asymptotic variance is
\[
a(\varepsilon)
=
c_0(\varepsilon)+2\sum_{k\ge1}c_k(\varepsilon),
\qquad
c_k(\varepsilon)
=
\operatorname{Cov}_{\pi_\varepsilon}(f_0,f_k).
\]
For a finite primitive chain the sum converges absolutely.

Equivalently, introduce the two-parameter pressure
\[
\mathcal P(t,\varepsilon)
=
\log\rho\!\left(
A(i,j)e^{tF(i,j)-\varepsilon g(i,j)}
\right),
\]
where \(F\) is a consistent edge representation of the letter observable.  With the present sign convention,
\[
a(\varepsilon)=\partial_t^2\mathcal P(0,\varepsilon),
\qquad
a'(0)=\partial_\varepsilon\partial_t^2\mathcal P(0,0).
\]
Thus \(a'(0)<0\) means that *infinitesimally suppressing the target event decreases the asymptotic letter-count variance*.

### 2.1 Poisson representation

At \(\varepsilon=0\) write \(P=P_0\), \(\pi=\pi_0\), and let
\[
(I-P+\Pi)u=f,\qquad
\Pi=\mathbf1\pi.
\]
Then the standard finite-chain Poisson formula is
\[
a(0)=2\langle f,u\rangle_\pi-\langle f,f\rangle_\pi.
\]
This is used computationally, but no novelty is claimed for it.

Differentiating \(c_k=\pi F P^k f\) gives
\[
\boxed{
c_k'
=
\dot\pi F P^k f
+
\sum_{j=0}^{k-1}
\pi F P^j\dot P P^{k-1-j}f.
}
\tag{2.1}
\]
The corresponding lag-response terms are
\[
D_0=c_0'(0),\qquad
D_k=2c_k'(0)\quad(k\ge1),
\]
so
\[
a'(0)=\sum_{k\ge0}D_k.
\]

For a target-edge indicator the internal derivation gives
\[
\dot P_{ij}
=
P_{ij}\bigl[-g_{ij}+u_j^{(g)}-u_i^{(g)}+q\bigr],
\tag{2.2}
\]
where \(q=E_\pi g\) and \(u^{(g)}\) is the appropriate Perron/Poisson derivative potential.  Formula (2.2), normalization conventions, and the relation between the matrix derivative and thermodynamic linear response are to be re-derived independently in the referee pass.

### 2.2 Mixed-cumulant and susceptibility interpretation

The two-field transfer matrix also gives a direct statistical interpretation of the response.  For a finite path of length \(m\), set
\[
Z_m(t,\varepsilon)
=
\mathbf1^T A_{t,\varepsilon}^{\,m}\mathbf1,
\qquad
A_{t,\varepsilon}(i,j)
=
A(i,j)e^{tF(i,j)-\varepsilon g(i,j)}.
\]
The derivatives of \(\log Z_m\) are joint cumulants under the finite-volume path ensemble.  Hence
\[
\partial_\varepsilon\partial_t^2\log Z_m(0,0)
=
-\operatorname{Cum}(S_mF,S_mF,S_mG).
\]
Exponential Perron convergence gives
\[
\boxed{
a'(0)
=
-\lim_{m\to\infty}
\frac1m
\operatorname{Cum}(S_mF,S_mF,S_mG).
}
\tag{2.3}
\]

Thus \(a'(0)\) is a mixed third-order susceptibility.  Negative \(a'(0)\) means that penalizing the target event decreases the long-run fluctuation variance, equivalently that target occurrence is positively associated, in this asymptotic third-cumulant sense, with squared letter-count fluctuations.

For the h4 sign-reversal case this yields a useful verbal distinction: the target is **locally variance-damping but globally variance-amplifying**.  Its defining window has smaller fixed-letter fluctuation than the baseline window ensemble, but its delayed continuation geometry produces enough long-range fluctuation to reverse the complete response.

As a numerical cross-check, a direct \(5\times5\) finite-difference evaluation of
\[
\partial_\varepsilon\partial_t^2\log\rho(A_{t,\varepsilon})
\]
on the independently rebuilt 786-state h4 transfer matrix gives
\[
-0.00733732491790,
\]
within \(1.3\times10^{-9}\) of the interval-certificate value.  A finite-word calculation using
\[
m^{-1}\partial_\varepsilon\partial_t^2\log Z_m
\]
at \(m=320,640\), followed by the observed \(1/m\) boundary extrapolation, gives
\[
-0.00733732403.
\]
These checks are not substitutes for the interval certificate; they are independent formulations of the same thermodynamic derivative.

### 2.3 Representation invariance

The same process may be presented by different high-block graphs.  The \(h=7\) target is convenient on a \(13\)-block graph, whereas mixing of the \(L_6\) baseline is most efficiently certified on its \(11\)-block memory presentation.  The final paper requires an explicit recoding proposition:

> **Recoding proposition candidate.**  If two finite presentations are conjugate high-block presentations of the same mixing SFT, and the potential and observable are transported consistently, then pressure, the equilibrium process, \(a(\varepsilon)\), and \(a'(0)\) are invariant.

This is standard symbolic-dynamics machinery, but it is load-bearing for the certificate architecture and should not be left implicit.

---

## 3. Local profile geometry and the \(h=4\) sign reversal

Let \(G_v\) be the event that a newly completed \(2h\)-window is an \(h\)-Abelian square whose common half-profile lies in the \(S_3\)-orbit of
\[
v=(v_1,v_2,v_3).
\]
Define the centered profile coordinates
\[
x_i=v_i-\frac h3,
\qquad
x_1+x_2+x_3=0,
\]
and the quadratic imbalance
\[
B(v)=x_1^2+x_2^2+x_3^2.
\]
Equivalently,
\[
B(v)
=
\frac{
(v_1-v_2)^2+(v_2-v_3)^2+(v_3-v_1)^2
}{3}.
\]

For the target window \(W=2h\), let
\[
F_W
=
\sum_{r=0}^{W-1}
\left(1_{\{X_r=a\}}-\frac13\right).
\]
Color symmetry gives the exact orbit identity
\[
\boxed{
E(F_W^2\mid G_v)=\frac43 B(v).
}
\tag{3.1}
\]
Let
\[
V_h=E(F_W^2)
\]
under the unpenalized \(L_{h-1}\) Parry measure and
\[
q_v=P(G_v).
\]
The baseline-aware target-local term is
\[
\boxed{
L_v=q_v\left(V_h-\frac43B(v)\right).
}
\tag{3.2}
\]
This is a local composition quantity.  It is not, in general, the full derivative.

For
\[
h=4,\qquad v=(2,1,1),
\]
the reconstructed values are
\[
L_v\approx +0.0439238853,
\]
whereas
\[
\boxed{
a'_v(0)\approx -0.00733732617.
}
\tag{3.3}
\]
Thus the delayed part
\[
T_v=a'_v(0)-L_v
\]
is approximately
\[
-0.0512612115
\]
and reverses the local sign.

This is the motivating phenomenon of the paper.  The broader exposed profile family is not used to prove (3.3); it is retained in supplementary material as discovery context.

### 3.1 Lag localization

For \(h=4\), \(W=8\).  The complete response through lag \(7\) remains positive:
\[
\sum_{k=0}^{7}D_k
\approx
+0.00900052652.
\tag{3.4}
\]
The largest first fully nonlocal terms are
\[
D_9\approx-0.01834632745,
\qquad
D_{10}\approx-0.01855698443.
\tag{3.5}
\]
Their combined negative mass is large enough to move the cumulative response below zero.

A placement decomposition shows that approximately \(94.2\%\) of the combined lag-\(9/10\) negative contribution comes from target windows containing **exactly one** of the two observed letters.  This is the clue that turns the lag anomaly into a continuation problem.

### 3.2 Boundary and hidden-color structure

If
\[
x_0x_1\cdots x_{2h-1}
\]
is an \(L_{h-1}\)-admissible \(h\)-Abelian square, then
\[
\boxed{x_0\ne x_{2h-1}.}
\tag{3.6}
\]
Indeed, if the endpoints agreed, subtracting their common color from the equal Parikh vectors of the two halves would produce an \((h-1)\)-Abelian square in the middle \(2(h-1)\) symbols, forbidden in \(L_{h-1}\).

Although \(x_0\) eventually leaves explicit finite memory, on \(G_v\) its color \(C\) is reconstructible from the target:
\[
\Psi(x_0)
=
\Psi(x_h\cdots x_{2h-1})
-
\Psi(x_1\cdots x_{h-1}).
\tag{3.7}
\]
This motivates a lifted continuation kernel.

---

## 4. One-endpoint continuation response

The next proposition isolates the generic algebra behind the h4 lag-\(9/10\) effect.

### Proposition 4.1 — one-endpoint covariance identity

Let \(X\) be a mixing finite-state shift over \(q\) colors, invariant under the full color-permutation group \(S_q\).  Let \(G\) be an \(S_q\)-invariant finite-window event with probability
\[
p_G=P(G).
\]
Let
\[
f(x)=1_{\{x=a\}}-\frac1q.
\]
Consider an oriented placement of \(G\) that contains exactly one of the two sites in
\[
H_k=f_0f_k.
\]
Let \(C\) be the color at the observed site inside \(G\) and \(Y\) the color at the other observed site.  Define
\[
K
=
P(Y=C\mid G)-P(Y=C).
\tag{4.1}
\]
Then
\[
\boxed{
\operatorname{Cov}(H_k,1_G)=\frac{p_G}{q}K.
}
\tag{4.2}
\]

#### Proof

For any \(S_q\)-invariant joint law of two colors,
\[
P(X=a,Y=a)=\frac1q P(X=Y).
\]
Hence
\[
E[f(X)f(Y)]
=
\frac1q\left(P(X=Y)-\frac1q\right).
\]
The same identity holds conditionally on the \(S_q\)-invariant event \(G\).  Subtraction gives
\[
E[H_k\mid G]-E[H_k]=\frac Kq,
\]
and multiplication by \(P(G)\) yields (4.2). \(\square\)

Under the soft potential \(-\varepsilon g\), linear response inserts a minus sign:
\[
\frac{d}{d\varepsilon}E_\varepsilon H_k\bigg|_0
=
-\sum_j
\operatorname{Cov}(H_k,g\circ\sigma^j).
\tag{4.3}
\]
Therefore one oriented one-endpoint placement contributes
\[
-\frac{2p_G}{q}K
\tag{4.4}
\]
to \(D_k=2c_k'(0)\).

No time-reversal symmetry is required.  If a reversal-invariant system lets two orientations be paired with the same kernel, their combined contribution is
\[
-\frac{4p_G}{q}K.
\tag{4.5}
\]
For the ternary case this becomes \(-4p_GK/3\).

### 4.2 Finite continuation partitions

Let \(S\) be a finite context immediately before the outside observed symbol, retaining the target reference color \(C\) as a label.  Partition the target-conditioned lifted contexts into cells
\[
\mathcal P=\{B\}.
\]
For each cell set
\[
\mu_B=P((S,C)\in B\mid G),
\]
and
\[
p_B^-=
\inf_{(s,c)\in B}P(Y=c\mid S=s).
\]
Then
\[
P(Y=C\mid G)\ge\sum_B\mu_Bp_B^-.
\]
If
\[
b=P(Y=C)
\]
is the baseline same-color probability at the required separation, define
\[
\boxed{
\underline K
=
\sum_B\mu_Bp_B^- - b.
}
\tag{4.6}
\]
Thus
\[
K\ge\underline K.
\tag{4.7}
\]

The inequality is elementary.  The research problem is to construct a small partition from forbidden-pattern structure for which \(\underline K\) remains positive and quantitatively useful.

### 4.3 What was learned from PEX-3

An initial frozen partition rule, PEX-3, used:

- append-color exclusion signatures for the smaller forbidden square lengths;
- the equality pattern of the last three symbols relative to \(C\);
- two additional boundary-equality bits.

On the \(h=4\) design case, this short signature captured approximately \(98.8\%\) of the positive one-endpoint kernel mass.  In a later prospectively frozen \(h=6\) positional target H02, the same rule captured only about \(20.0\%\).  H02's final derivative was negative, but PEX-3 correctly returned `INCONCLUSIVE`.

This failure is retained because it identifies the missing quantity: contexts with identical immediate exclusion signatures may have very different admissible future trees.

---

## 5. Continuation capacity

Let \(A\) be the primitive adjacency matrix of a finite-state shift.  Define
\[
N_m=A^m\mathbf1.
\tag{5.1}
\]
Thus \(N_m(i)\) is the number of admissible length-\(m\) continuations from state \(i\).

Let \(\lambda\) be the Perron root and \(r>0\) a right Perron eigenvector.  The Parry transition on an allowed edge \(i\to j\) is
\[
P_{ij}=\frac{r_j}{\lambda r_i}.
\tag{5.2}
\]

### Proposition 5.1 — finite continuation ratios

For an allowed edge \(i\to j\), define
\[
Q_m(i,j)
=
\frac{N_m(j)}{N_{m+1}(i)}.
\tag{5.3}
\]
Then
\[
\boxed{
Q_m(i,j)\longrightarrow P_{ij}.
}
\tag{5.4}
\]

#### Proof

Perron--Frobenius theory gives
\[
A^m\mathbf1
=
c\lambda^m r+o(\lambda^m)
\]
for some \(c>0\).  Substitution in (5.3) gives (5.4). \(\square\)

This limit is standard Perron--Frobenius theory; we do not claim it as new.

### Proposition 5.2 — finite projective enclosure

Set
\[
u_m(i)=\frac{N_m(i)}{r_i},
\qquad
R_m=\frac{\max_i u_m(i)}{\min_i u_m(i)}.
\tag{5.5}
\]
Then for every allowed edge \(i\to j\),
\[
\boxed{
\frac{Q_m(i,j)}{R_m}
\le
P_{ij}
\le
R_mQ_m(i,j).
}
\tag{5.6}
\]

#### Proof

Using \(N_m(j)=u_m(j)r_j\) and
\[
N_{m+1}(i)
=
\sum_\ell A_{i\ell}N_m(\ell)
=
\lambda r_i
\sum_\ell P_{i\ell}u_m(\ell),
\]
we obtain
\[
\frac{Q_m(i,j)}{P_{ij}}
=
\frac{u_m(j)}
{\sum_\ell P_{i\ell}u_m(\ell)}.
\]
The denominator is a convex combination of the \(u_m(\ell)\), hence lies between their minimum and maximum.  Inequality (5.6) follows. \(\square\)

This gives the bridge used by the computer-assisted certificates:
\[
\boxed{
\text{finite continuation counts}
\to
\text{Parry transition enclosure}
\to
\text{continuation-kernel lower bound}.
}
\tag{5.7}
\]

### 5.3 PEX-C4

After the PEX-3 failure, the design rule was frozen as PEX-C4: retain the PEX-3 signature and append exactly
\[
\bigl(N_4(s),N_4(s_{\rm ref})\bigr),
\tag{5.8}
\]
where \(s_{\rm ref}\) is the successor after appending the target reference color, with a fixed sentinel if that append is forbidden.

The choice \(m=4\) is a design-set choice, not a theorem of optimality.  On exposed H02 design data, the fraction of positive kernel mass captured by the refinement rose from about \(20\%\) for PEX-3 to about \(98.4\%\) for PEX-C4.  These design data must not be reused as prospective validation.

---

## 6. A continuation-echo sign criterion

Let \(\mathcal M\) be a finite set of oriented one-endpoint target placements.  For each \(m\in\mathcal M\), let
\[
K_m\ge\underline K_m.
\]
Only positive certified lower bounds need be credited:
\[
\underline K_m^+=\max(\underline K_m,0).
\]
Define
\[
\boxed{
\underline E_{\mathcal M}
=
\frac{2p_G}{q}
\sum_{m\in\mathcal M}
\underline K_m^+.
}
\tag{6.1}
\]

Write the full response as
\[
a'(0)=R_{\mathcal M}+R_{\rm rest},
\tag{6.2}
\]
where \(R_{\mathcal M}\) contains exactly the selected oriented placements.

By Proposition 4.1,
\[
R_{\mathcal M}
\le
-\underline E_{\mathcal M}.
\tag{6.3}
\]
If independently
\[
R_{\rm rest}\le C_{\rm rest},
\tag{6.4}
\]
then
\[
\boxed{
a'(0)
\le
C_{\rm rest}-\underline E_{\mathcal M}.
}
\tag{6.5}
\]

### Theorem 6.1 — continuation-echo sufficient criterion

Under the assumptions above,
\[
\boxed{
\underline E_{\mathcal M}>C_{\rm rest}
\quad\Longrightarrow\quad
a'(0)<0.
}
\tag{6.6}
\]

The algebra of Theorem 6.1 is deliberately simple.  The substantive questions are:

1. can \(\underline E_{\mathcal M}\) be obtained from interpretable forbidden-continuation structure; and
2. can \(C_{\rm rest}\) be bounded sharply enough to leave a sign margin?

### 6.1 Important distinction: mechanism certificate versus predictor

The continuation lower bound \(\underline E_{\mathcal M}\) is computed from the unperturbed baseline and target-conditioned continuation structure; it does not use the final response sign.

The current \(C_{\rm rest}\) implementation, however, **does evaluate finite linear-response contributions** and then certifies an infinite remainder.  Therefore the complete procedure is not a purely combinatorial or response-free predictor.

The correct language is:

> **prospective mechanism-aware sign certification**

rather than

> response-blind prediction of the response sign.

The prospective element is that the target, mechanism rule, numerical budgets, and sign criterion are frozen before a separate reference evaluation of the derivative.  The mathematical certificate itself is allowed to compute response terms because the object being certified is a response inequality.

This distinction is essential to the claims of Section 9.

---

## 7. The \(h=4,(2,1,1)\) mechanism-aware certificate candidate

For the \(h=4\) target, \(W=8\).  Let
\[
S_7=\sum_{k=0}^{7}D_k.
\]
A directed interval calculation gives the candidate enclosure
\[
S_7
\in
[
0.0090005265169566901,\,
0.0090005265169576128
].
\tag{7.1}
\]

A structural continuation partition over all one-endpoint positions at lags \(9\) and \(10\) gives
\[
\boxed{
\underline E_{\rm OE}
>
0.034210298987926202.
}
\tag{7.2}
\]
The exact one-endpoint diagnostic magnitude is approximately
\[
0.0347685017158,
\]
so the structural partition captures nearly all of that channel.

A separate residual calculation yields
\[
\boxed{
C_{\rm post}
<
0.0191296446393,
}
\tag{7.3}
\]
where \(C_{\rm post}\) denotes all compensation outside the selected one-endpoint shell after the lag-\(0,\ldots,7\) prefix is separated.

Combining (7.1)--(7.3),
\[
a'(0)
\le
S_7^{\rm up}
-
\underline E_{\rm OE}
+
C_{\rm post}^{\rm up}
<
-0.00608012783167.
\tag{7.4}
\]

### Candidate Theorem 7.1 — h4 mechanism-aware sign reversal

Subject to independent audit of the interval certificate, one-endpoint indexing, and structural lower-bound arithmetic,
\[
\boxed{
a'_{4,(2,1,1)}(0)<0.
}
\tag{7.5}
\]

The computed derivative is approximately
\[
-0.00733732617.
\tag{7.6}
\]

The significance of (7.4) is stronger than merely evaluating (7.6): the named delayed continuation channel is quantitatively strong enough to force the sign even after all other contributions receive a separate conservative compensation budget.

### 7.1 The combinatorial h4 picture

For profile \((2,1,1)\), conditioning on the first target color being a singleton forces a deficit pattern in the terminal memory.  Smaller-square exclusions initially suppress that hidden color, but after one step the competing colors become more strongly constrained.  The target-conditioned hidden-color kernel therefore shows a suppress--rebound pattern:
\[
K(1)<0,\qquad K(2)>0,\qquad K(3)>0.
\]
In the lag-response convention, the positive continuation kernel produces a negative response contribution through (4.4).

The detailed \(K=2\) and \(K=3\) append criteria, singleton-deficit lemma, and exhaustive finite checks belong in an appendix.  They explain why the h4 partition is interpretable, but the general criterion does not depend on those exact motifs.

---

## 8. Scalable residual certification on \(L_6\)

The h7 positional targets are naturally represented on a \(13\)-block graph, but the \(L_6\) baseline only requires memory \(11\) to decide whether an appended symbol creates a forbidden square of half-length \(2,\ldots,6\).  The minimal dominant presentation has
\[
10128
\]
states and
\[
18774
\]
edges.

Color symmetry reduces this to an exact \(S_3\) quotient with
\[
1688
\]
orbits.

### 8.1 Exact continuation-count Perron proxy

Let \(Q\) be the integer quotient adjacency.  The current exact computation gives
\[
Q^{23}>0
\]
entrywise, with entries between \(1\) and \(5981\).  For
\[
x=Q^{300}\mathbf1,
\]
the projective residual under \(Q^{23}\) is approximately
\[
6.99\times10^{-31}.
\]
Using a Birkhoff/Hilbert contraction argument, the current certificate uses the safe projective factor
\[
E<1+3\times10^{-27}.
\tag{8.1}
\]
Thus the continuation-ratio proxy \(\widehat P\) satisfies
\[
E^{-1}\widehat P_{ij}
\le
P_{ij}
\le
E\widehat P_{ij}
\tag{8.2}
\]
on every allowed edge.

### 8.2 Mixing certificate candidate

A directed-down \(40\)-step common-mass computation gives
\[
\alpha_{40}>0.988257\ldots,
\]
weakened in the certificate to
\[
\boxed{\alpha_{40}>0.988.}
\tag{8.3}
\]
Hence
\[
\boxed{\tau(P^{40})<0.012.}
\tag{8.4}
\]

The \(13\)-block target presentation is a deterministic finite recoding of the same process.  The current certificate uses
\[
\tau_{13}(n)\le\tau_{11}(n-2),\qquad n\ge2.
\tag{8.5}
\]
This lift is load-bearing and is an explicit clean-room audit target.

From (8.4)--(8.5), conservative universal perturbation bounds yield an exact rational upper bound on the response tail after lag \(400\):
\[
\boxed{
\sum_{k>400}|D_k|
<
1.462\times10^{-12}.
}
\tag{8.6}
\]

The finite prefix is evaluated on the rational continuation-count proxy and surrounded by deliberately coarse error budgets.  The present blanket prefix budget is
\[
7.5\times10^{-4}.
\tag{8.7}
\]
This is several orders of magnitude larger than observed solver residuals.

### 8.3 Certificate status

The L6 construction is presently:

> **INTERNAL RIGOROUS CERTIFICATE CANDIDATE — ARITHMETIC PASSES — INDEPENDENT AUDIT REQUIRED.**

In particular, (8.1), (8.3), the directed-rounding implementation, the finite-prefix sensitivity bound, and the recoding inequality (8.5) must be reproduced independently before publication-grade use of the word *rigorous*.

---

## 9. Falsification, design revision, and prospective exact-subtarget applications

The validation history matters because the final PEX-C4 rule was not chosen in one step.

### 9.1 PEX-3 pilot: preserved failure to certify

The first prospective pilot used h6 positional subtargets with predicate \(x_0=x_1\).  The frozen PEX-3 outputs were:

- H01 \((2,2,2)\): `INCONCLUSIVE`; later derivative \(+0.00213766776\);
- H02 \((3,2,1)\): `INCONCLUSIVE`; later derivative \(-0.00190580782\);
- H03 \((4,1,1)\): empty target.

PEX-3 made no false certified sign call, but it also failed to certify the negative H02 case.  H01/H02 were therefore moved permanently into the design set.

Comparing h4 with H02 showed why: h4's short exclusion signature captured about \(98.8\%\) of positive continuation-kernel mass, whereas H02's PEX-3 cells captured only about \(20.0\%\).  Refining by finite continuation capacity recovered approximately \(98.4\%\) at depth four, motivating PEX-C4.

### 9.2 First PEX-C4 h7 battery

A battery with predicate \(x_0=x_1\) was frozen after PEX-C4 but before the scalable L6 residual certificate had been completed.  Its formal labels remained `INCONCLUSIVE`.  After reference evaluation, the three nonempty derivatives were one positive and two negative.  Pre-reveal numerical residual diagnostics separated those signs, but this is not counted as a prospective certified success because the rigorous-candidate residual procedure was completed afterward.

These cases are design/supporting evidence for the L6 certifier, not validation data for subsequent rule tuning.

### 9.3 H08--H11: first complete prospective internal-certification battery

The next exact subtargets used the deterministic next positional predicate
\[
x_0=x_2
\]
on the same exposed h7 profile classes.  At this point **both PEX-C4 and the L6 certificate budgets were frozen**.

This is not a fully independent new-family benchmark: the h7 baseline and profile classes had already been studied, and only the exact positional subevents were new.  We therefore call these **prospectively frozen exact subtargets within an exposed family**.

Before the separate reference evaluation, the frozen internal certifier produced:

| target | profile | frozen output | certificate upper bound |
|---|---:|---|---:|
| H08 | \((3,2,2)\) | INCONCLUSIVE | \(+0.00325602338\) |
| H09 | \((3,3,1)\) | **NEGATIVE_CERTIFIED** | \(-0.00408145183\) |
| H10 | \((4,2,1)\) | **NEGATIVE_CERTIFIED** | \(-0.00205569069\) |
| H11 | \((5,1,1)\) | INCONCLUSIVE | \(+0.00035244291\) |

The frozen prediction artifact was hashed before the reference derivatives were evaluated.

The subsequent true-Parry-chain calculations gave:

| target | reference derivative | distinct finite-difference cross-check |
|---|---:|---:|
| H08 | \(+0.002461503859\) | \(+0.002461505942\) |
| H09 | \(-0.004873281438\) | \(-0.004873287322\) |
| H10 | \(-0.002813950628\) | \(-0.002813954153\) |
| H11 | \(-0.000397723137\) | \(-0.000397724020\) |

Thus both frozen negative certificates agreed with the later reference sign.  H11 shows that the procedure is incomplete: a negative derivative may remain `INCONCLUSIVE`.

There is an important limitation.  These h7 exact-subtarget applications do **not** reproduce the h4 local-to-global sign reversal.  For all four H08--H11 profiles, the sign of the reference derivative agrees with the sign of the profile-local term \(q(V_7-	frac43B(v))\).  Moreover, the pre-reveal residual upper bounds for H09 and H10 were already negative before the selected PEX-C4 continuation term was credited.  Consequently H09/H10 validate the frozen **sign-certification architecture**, but they do not establish that continuation capacity was necessary to force those two signs.  A stronger prospective mechanism test would require a positive local/residual margin that is overturned solely by the certified continuation channel.

The finite-difference calculations are a **distinct numerical formulation**, not a clean-room independent implementation; they share the finite-state support construction.

### 9.4 What the prospective experiment establishes

The narrow evidence statement is:

> With PEX-C4 and the internal L6 certificate architecture frozen in advance, two previously unrevealed exact h7 positional subtargets received negative sign certificates, and both later reference derivatives were negative.

We do **not** infer a population precision of \(100\%\), a universal recall rate, or a general predictive law from a two-certificate battery.

---

## 10. Related work, interpretation, and limitations

### 10.1 Forbidden-word perturbations and overlap structure

Guibas--Odlyzko correlation polynomials and later forbidden-word work encode how overlaps of a word control enumeration.  Lind studied perturbations of shifts of finite type produced by forbidding a word and connected spectral changes to correlation polynomials.  Cheriyath--Agarwal relate forbidden-word correlations to Perron roots, eigenvectors, and Parry measure.  Chandgotia--Marcus--Richey--Wu revisit one-pattern SFTs from a modern symbolic-dynamics viewpoint.

These works make it especially important not to market continuation counts, Perron eigenvectors, or word-overlap structure themselves as new.

### 10.2 Pattern-frequency covariance

Rukhin's pattern-correlation matrices and related work treat first and second moments and covariance matrices of overlapping pattern frequencies in Markov sequences.  Bassino--Clément--Fayolle--Nicodème give multivariate generating functions and variance/covariance formulas for occurrences of finite word sets.  Thus “pattern correlations affect variance” is established background.

Our narrower question is different: can an interpretable **target-conditioned continuation lower bound** be isolated as a sign-forcing component of the derivative of an asymptotic variance under a forbidden-pattern penalty?

### 10.3 Local statistics under forbidden patterns

Bóna--Maga--Richey study how the combinatorial structure of a single binary forbidden word controls the direction of the mean letter-frequency change.  Their paper is close in spirit to the present program and must be treated as central related work, not merely a peripheral citation.

The present statistic is a second-order fluctuation quantity rather than a mean frequency, the target is a color-orbit family rather than one binary word, and the proposed certificate separates a delayed continuation channel from a bounded residual.  Whether this exact bridge is genuinely absent from prior literature remains **NOT_ESTABLISHED**.

### 10.4 Thermodynamic and Markov-chain background

Analytic pressure, equilibrium states, pressure derivatives, variance, and central limit theory for mixing finite-type shifts are standard thermodynamic formalism.  Poisson equations and Green--Kubo formulas for asymptotic variance are standard finite-state Markov-chain tools.  Dobrushin contraction and Perron--Frobenius projective arguments are also established machinery.

The paper should therefore distinguish the following:

- **known machinery:** transfer operators, Parry measure, Poisson equations, pattern correlation, projective contraction;
- **elementary new-to-this-paper organization:** one-endpoint decomposition and sufficient sign inequality;
- **candidate substantive contribution:** a profile-aware continuation-exclusion/capacity certificate that is strong enough to isolate a delayed sign-forcing response mechanism in the Abelian-square systems considered here;
- **computer-assisted evidence:** h4 and L6 certificate instances and prospectively frozen exact-subtarget applications.

### 10.5 Relation to Mäkelä's conjecture

The bounded languages \(L_h\) are motivated by the broader ternary Abelian-square avoidance problem, but no result here proves or disproves the existence of an infinite ternary word avoiding every nontrivial Abelian square.  The present work is about statistical response inside finite-state bounded-avoidance systems.

### 10.6 Limitations

Several limitations are mathematically important.

First, PEX-C4 is only a sufficient certificate and may return `INCONCLUSIVE` on genuinely negative responses, as H11 demonstrates.

Second, the PEX-C4 depth \(4\), suffix features, and placement lags \(W+1,W+2\) were selected on exposed design data.  Their usefulness beyond the tested family is an empirical question, not a theorem.

Third, the prospective h7 exact subtargets are nested inside an already exposed baseline/profile family.  They are stronger evidence than post-hoc examples but weaker than a genuinely new-family holdout.

Fourth, the complete sign certificate is not response-free: \(C_{\rm rest}\) is a linear-response quantity.  The combinatorial mechanism bound is response-blind; the full certificate is not.

Fifth, the present finite-prefix error budget is absolute rather than target-scale adaptive.  This matters for rare events.  In H11 the pre-reveal proxy complement was already negative, but the universal \(7.5	imes10^{-4}\) prefix allowance exceeded the entire response scale because the target probability was only about \(2.67	imes10^{-5}\).  A target-specific perturbation bound that scales with \(q\), \(\|\pi\dot P\|\), or another certified influence norm is a natural next certificate improvement.

Sixth, all computer-assisted theorem claims remain conditional on independent verification of the finite-state construction, interval/projective bounds, and certificate arithmetic.

---

## 11. Discussion

The h4 sign reversal can be summarized as a competition between two effects.  The target profile imposes an immediate composition geometry, captured by the local term (3.2).  The same target also changes which futures remain accessible.  That delayed continuation geometry is invisible to \(B(v)\) alone and can reverse the sign.

Continuation capacity
\[
N_m=A^m\mathbf1
\]
is useful because it lives exactly at the interface between combinatorics and equilibrium dynamics.  It counts finite admissible future trees, while its normalized edge ratios converge to the Parry transition probabilities.  In the h4 system a short exclusion signature already almost determines the relevant future capacity.  In H02 it does not; adding \(N_4\) resolves most of the hidden variation.  The failure of PEX-3 therefore produced a principled mathematical refinement rather than an arbitrary feature patch.

The prospective H09/H10 applications add a second kind of evidence.  They do not establish a universal predictor, but they show that the frozen mechanism-plus-residual architecture can issue a sign certificate on exact targets whose reference derivative has not yet been evaluated.  That is the intended use of a sufficient certificate.

There is also a standard maximum-entropy-path interpretation of the Perron geometry.  The Parry transition
\[
P_{ij}=A_{ij}\frac{r_j}{\lambda r_i}
\]
is the maximal-entropy random walk on the presentation graph: a next step is biased toward states with greater asymptotic path accessibility.  In this language, the finite continuation count \(N_m(s)\) is a finite-horizon approximation to the entropic potential carried by \(r(s)\).  This connection is established background in maximal-entropy random-walk theory; its value here is interpretive rather than a novelty claim.

The h4 tail also has a spectral interpretation that may deserve future development.  Its leading nontrivial complex Parry mode is numerically
\[
\lambda_*
\approx
0.31106913037+0.67564829301\,i,
\qquad
|\lambda_*|\approx0.74381759842,
\]
with an oscillation period of about \(5.51\) lags.  For lags \(20,\ldots,59\), the ordinary letter autocovariance is reproduced to relative error below \(5\times10^{-4}\) by a single \(\operatorname{Re}(C\lambda_*^k)\) mode, while the response tail is reproduced to relative error below \(8\times10^{-4}\) by
\[
\operatorname{Re}\bigl((A+Bk)\lambda_*^k\bigr).
\]
The factor \(k\) is the coefficient behavior expected from differentiating a resolvent term, since the response contains
\[
(I-zP)^{-1}\dot P(I-zP)^{-1}.
\]
This suggests a precise future notion of **continuation resonance**: not merely slow mixing, but strong target coupling to a persistent transfer-operator mode with a sign-relevant phase.  We do not use this spectral fit in any theorem.

A second future extension is to replace zeroth-order continuation volume by a weighted continuation hierarchy.  For
\[
Z_m(s;t)=(A_t^m\mathbf1)_s,
\]
the derivatives \(\partial_t\log Z_m(s;t)|_0\) and \(\partial_t^2\log Z_m(s;t)|_0\) encode the mean composition and fluctuation variance of finite futures from \(s\).  Perron asymptotics show that their state-dependent parts converge to derivatives of \(\log r_t(s)\).  Thus raw continuation capacity is only the zeroth-order member of a hierarchy
\[
\text{future volume}\to\text{future composition}\to\text{future fluctuation capacity}\to\cdots.
\]
This may eventually provide a more analytic substitute for hand-designed context partitions.

The strongest future mathematical upgrade would be to reduce the remaining implementation-specific context partition.  One possible direction is to replace exact capacity labels by analytic inequalities involving
\[
Q_m(i,j)=\frac{N_m(j)}{N_{m+1}(i)}
\]
and a directly certified projective spread.  This would turn PEX-C4 from a finite partition rule into a cleaner symbolic-dynamical continuation theorem.

A second upgrade would be a residual bound that uses only coarse response-independent operator norms rather than an interval evaluation of a long finite response prefix.  That would support a stronger “structural predictor” interpretation.  The present paper should not claim that stronger result.

---

## 12. Reproducibility and epistemic status

Every load-bearing computer-assisted statement should be accompanied by:

- the finite-state construction specification;
- a machine-readable result file;
- hashes of frozen target/protocol/prediction artifacts;
- a minimal verifier;
- the exact numerical budgets used in the certificate;
- a statement of what the verifier does **not** establish;
- an independent clean-room audit report before canonical theorem promotion.

The prospective sequence must remain historically visible:
\[
\text{freeze}\to\text{certificate}\to\text{frozen label}\to\text{reference evaluation}.
\]
Failed and inconclusive cases are evidence and must not be removed.

The current status is:

| statement | status |
|---|---|
| one-endpoint covariance identity | direct proof candidate |
| continuation partition lower bound | elementary/direct |
| continuation-capacity ratio and projective enclosure | PF consequence/direct proof |
| generic sign criterion | direct proof candidate |
| h4 negative derivative | internal computer-assisted certificate PASS; independent audit required |
| h4 named mechanism forces sign | internal mechanism-aware certificate PASS; independent audit required |
| L6 mixing/tail certificate | internal computer-assisted certificate PASS; independent audit required |
| H09/H10 negative labels before reference evaluation | preserved prospective internal-certificate evidence |
| broad PEX-C4 effectiveness | not established |
| novelty/priority | NOT_ESTABLISHED |

---

## 13. Conclusion

A local forbidden-pattern event has both an immediate composition effect and a delayed continuation effect.  In the \(h=4\) Abelian-square system the latter is strong enough to overturn the former.  The continuation effect can be expressed through target-conditioned same-color kernels and bounded from finite continuation structure.  Finite continuation counts in turn approximate the Parry dynamics with explicit projective control.

This yields a mechanism-aware sign-certification architecture:
\[
\text{continuation lower bound}
+
\text{residual upper bound}
\Longrightarrow
\text{variance-response sign}.
\]
The current h4 and L6 certificates pass internally, and two prospectively frozen exact h7 subtargets were negatively certified before a separate reference evaluation and later confirmed negative.  The mathematical and computational architecture now warrants a clean-room proof audit and a specialist literature review.  Those audits, rather than additional target hunting, are the next gate to a submission-level paper.

---

# Appendices planned for the submission draft

## Appendix A. Finite-state presentations and recoding
- exact \(L_{h-1}\) high-block definitions;
- emitted-letter convention;
- 11-block/13-block equivalence;
- proof of response invariance under recoding.

## Appendix B. Pressure and perturbation identities
- analytic Perron family;
- \(\dot P\), \(\dot\pi\);
- equation (2.1);
- pressure mixed-derivative formulation;
- centering under \(S_q\).

## Appendix C. h4 combinatorial mechanism
- boundary lemma;
- singleton-deficit lemma;
- exact \(K=2,K=3\) append criteria;
- hidden-color lifted chain;
- lag placement indexing.

## Appendix D. h4 interval certificate
- quotient construction;
- Perron enclosure;
- finite prefix;
- Dobrushin tail;
- mechanism/residual split.

## Appendix E. Continuation-capacity certificates
- proof of Propositions 5.1--5.2;
- PEX-3 and PEX-C4 signatures;
- H4/H02 capture comparison;
- design provenance.

## Appendix F. L6 residual certificate
- 1688-orbit quotient;
- \(Q^{23}\) positivity certificate;
- \(Q^{300}\mathbf1\);
- directed 40-step minorization;
- 11-block/13-block lift;
- exact tail summation;
- finite-prefix sensitivity.

## Appendix G. Prospective protocol artifacts
- H01--H03 PEX-3 pilot;
- H04--H07 PEX-C4 pilot;
- H08--H11 complete frozen-certifier battery;
- hashes and reveal order.

## Appendix H. Full exploratory tables
- 15 exposed profile results;
- local/tail decomposition;
- clearly labeled nonconfirmatory discovery evidence.

## Appendix I. Verification guide
- claim-to-artifact map;
- commands;
- expected outputs;
- known limitations.

---

# Working references

The bibliography below is intentionally conservative and should be replaced by a fully primary-source-audited `.bib` file before submission.

1. Bassino, F.; Clément, J.; Fayolle, J.; Nicodème, P. *Counting Occurrences for a Finite Set of Words: Combinatorial Methods*. ACM Transactions on Algorithms (2012).
2. Bóna, M.; Maga, B.; Richey, J. *Letter frequency in shifts of finite type with one forbidden word*. arXiv:2606.06655 (2026).
3. Chandgotia, N.; Marcus, B.; Richey, J.; Wu, C. *Shifts of finite type obtained by forbidding a single pattern*. Discrete and Continuous Dynamical Systems 48 (2026), 538--576.
4. Cheriyath, H.; Agarwal, N. *On the Perron root and eigenvectors associated with a subshift of finite type*. Linear Algebra and its Applications 633 (2022), 42--70.
5. Guibas, L. J.; Odlyzko, A. M. *String overlaps, pattern matching, and nontransitive games*. Journal of Combinatorial Theory, Series A 30 (1981), 183--208.
6. Lind, D. A. *Perturbations of Shifts of Finite Type*. SIAM Journal on Discrete Mathematics 2 (1989), 350--365.
7. Parry, W.; Pollicott, M. *Zeta Functions and the Periodic Orbit Structure of Hyperbolic Dynamics*. Astérisque 187--188 (1990).
8. Rukhin, A. L. *Pattern correlation matrices and their properties*. Linear Algebra and its Applications 327 (2001), 105--114.
9. Rukhin, A. L. *Pattern Correlation Matrices for Markov Sequences and Tests of Randomness*. Theory of Probability and Its Applications 51 (2007), 663--679.
10. Whitt, W. *Asymptotic Formulas for Markov Processes with Applications to Simulation*. Operations Research 40 (1992), 279--291.
