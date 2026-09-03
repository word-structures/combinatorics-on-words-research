# Paper 3 Addendum — Finite-Depth Curvature Certification for the Scalar Hard-Response Recurrence

**Date:** 2026-08-26  
**Status:** exact matrix-analysis lemmas specialized to the Paper 3 scalar recurrence; Paper 3 novelty NOT_ESTABLISHED.  
**Governance:** no Git mutation; no h=8 computation; no D40 use.

## 1. Purpose

The V3 blocked-tail lemma controls the norm of a centered return tail, but Paper 3 needs a **second color derivative**, not only a zeroth-order resolvent bound.

This note closes that abstract propagation step.

The result is a rigorous conditional mechanism certificate of the form

\[
\boxed{
\text{finite short/return computation}
+
\text{certified analytic tail}
\Longrightarrow
\text{certified interval for }\phi_{tt}
\Longrightarrow
\text{hard-response sign}.
}
\]

The matrix perturbation estimates themselves are standard analysis. The Paper 3-specific content is their composition with:

- the 3-transition Abelian-hole reduction;
- the \(O_1/O_2\) contact structure;
- the h=6,7 short-contact nilpotency certificate;
- the scalar hard-response root equation.

---

## 2. Scalar recurrence and curvature identity

Assume the convention-audited scalar recurrence has the form

\[
z-1=z^3\phi_v(z,t),
\qquad
z=e^{D_v(t)}.
\]

Define

\[
\psi(D)=e^{-2D}-e^{-3D}.
\]

Then

\[
\phi_v(e^D,t)=\psi(D).
\]

At the \(S_3\)-symmetric point,

\[
D_t(0)=0.
\]

Differentiating twice at fixed profile \(v\) gives

\[
\phi_{tt}+z\phi_zD_{tt}
=
\psi'(D)D_{tt},
\]

hence

\[
\boxed{
D_{tt}
=
\frac{\phi_{tt}}
{\psi'(D)-z\phi_z}.
}
\tag{F1}
\]

Since

\[
\eta_v=-\frac{D_{tt}}{D_v},
\]

we obtain

\[
\boxed{
\eta_v
=
-\frac{\phi_{tt}}
{D_v[\psi'(D_v)-z_v\phi_z]}.
}
\tag{F2}
\]

This re-derives the sign in the V3 candidate formula directly.

---

## 3. Root-slope identity

Let

\[
F_v(z,t)=z-1-z^3\phi_v(z,t).
\]

At a root,

\[
\phi_v(z,t)=\frac{z-1}{z^3}.
\]

Also

\[
\psi'(D)
=
-2z^{-2}+3z^{-3}
=
\frac{3-2z}{z^3}.
\]

A direct calculation gives

\[
F_z
=
1-3z^2\phi-z^3\phi_z
=
\frac{3-2z-z^4\phi_z}{z}.
\]

Therefore

\[
\boxed{
\psi'(D)-z\phi_z
=
\frac{F_z}{z^2}.
}
\tag{F3}
\]

Consequently

\[
\boxed{
\eta_v
=
-\frac{z_v^2\,\phi_{tt}}
{D_v\,F_z}.
}
\tag{F4}
\]

This is useful for certification: the denominator is controlled by the slope of the scalar root equation rather than by two separately evaluated derivative terms.

A simple-root certificate

\[
0\notin [F_z^-,F_z^+]
\]

therefore gives the denominator sign.

---

## 4. Exact second derivative of the inverse-compressed scalar

Let

\[
B(t)
\]

be an analytic square matrix, invertible near \(t=0\), and let

\[
G(t)=B(t)^{-1}.
\]

Let \(m(t)\) be an analytic vector and let \(\ell^T\) be fixed. Define

\[
\phi(t)=\ell^T G(t)m(t).
\]

The inverse derivatives are

\[
G_t=-GB_tG
\]

and

\[
G_{tt}
=
2GB_tGB_tG-GB_{tt}G.
\]

Hence

\[
\boxed{
\phi_{tt}
=
\ell^T
\left[
2GB_tGB_tGm
-
GB_{tt}Gm
-
2GB_tGm_t
+
Gm_{tt}
\right].
}
\tag{F5}
\]

This identity is exact.

For Paper 3,

\[
\ell=\mathbf1,
\qquad
B=\mathcal B_v,
\qquad
\phi=\phi_v.
\]

---

## 5. Finite approximation plus analytic tail

Write

\[
B(t)=A(t)+E(t),
\]

where:

- \(A(t)\) is the explicitly retained finite short/return block;
- \(E(t)\) is the omitted centered-return tail.

Let

\[
H=A(0)^{-1},
\qquad
M=\|H\|.
\]

Suppose certified bounds at \(t=0\) are available:

\[
\|E\|\le\epsilon_0,
\qquad
\|E_t\|\le\epsilon_1,
\qquad
\|E_{tt}\|\le\epsilon_2,
\]

with

\[
M\epsilon_0<1.
\]

Define

\[
\Gamma
=
\frac{M}{1-M\epsilon_0}.
\tag{F6}
\]

Then the Banach lemma gives

\[
\|B^{-1}\|\le\Gamma.
\]

The resolvent identity gives

\[
\|B^{-1}-A^{-1}\|
\le
M\Gamma\epsilon_0.
\]

Define

\[
\delta=M\Gamma\epsilon_0.
\tag{F7}
\]

Also set

\[
s_1=\|A_t\|,
\qquad
s_2=\|A_{tt}\|,
\]

\[
b=s_1+\epsilon_1,
\qquad
c=s_2+\epsilon_2,
\]

and

\[
\mu_j=\|m^{(j)}(0)\|,
\qquad
L=\|\ell\|_*.
\]

---

## 6. Theorem — explicit curvature-tail error bound

Let

\[
\widetilde\phi_{tt}
\]

be the expression (F5) computed with \(A\), \(A^{-1}\), \(A_t\), and \(A_{tt}\) in place of \(B\), \(B^{-1}\), \(B_t\), and \(B_{tt}\), while keeping the exact \(m,m_t,m_{tt}\).

Then

\[
\boxed{
|\phi_{tt}-\widetilde\phi_{tt}|
\le
\mathcal E_\phi
}
\tag{F8}
\]

with

\[
\boxed{
\begin{aligned}
\mathcal E_\phi
=
L\Big[
&
6\mu_0\delta b^2\Gamma^2
+
4\mu_0\epsilon_1\Gamma^3 b
\\
&
+
2\mu_0\delta c\Gamma
+
\mu_0\epsilon_2\Gamma^2
\\
&
+
4\mu_1\delta b\Gamma
+
2\mu_1\epsilon_1\Gamma^2
+
\mu_2\delta
\Big].
\end{aligned}
}
\tag{F9}
\]

### Proof

Apply (F5) to the full and truncated systems and subtract term by term.

For

\[
2GB_tGB_tGm,
\]

telescope over the three inverse factors and the two \(B_t\) factors. The inverse replacements contribute at most

\[
6\mu_0\delta b^2\Gamma^2,
\]

and the derivative-matrix replacements contribute at most

\[
4\mu_0\epsilon_1\Gamma^3b.
\]

For

\[
-GB_{tt}Gm,
\]

the two inverse replacements contribute

\[
2\mu_0\delta c\Gamma,
\]

and the \(B_{tt}\) replacement contributes

\[
\mu_0\epsilon_2\Gamma^2.
\]

For

\[
-2GB_tGm_t,
\]

the two inverse replacements contribute

\[
4\mu_1\delta b\Gamma,
\]

and the \(B_t\) replacement contributes

\[
2\mu_1\epsilon_1\Gamma^2.
\]

Finally,

\[
Gm_{tt}-Hm_{tt}
\]

is bounded by

\[
\mu_2\delta.
\]

Multiplying by the dual norm \(L=\|\ell\|_*\) yields (F9). \(\square\)

---

## 7. Turning a blocked tail into derivative bounds

The V3 blocked-tail lemma gives zeroth-order control. To control \(E_t\) and \(E_{tt}\) cleanly, use analyticity.

Assume \(E(t)\) is analytic for complex

\[
|t|\le r
\]

and satisfies the uniform bound

\[
\sup_{|t|\le r}\|E(t)\|\le\epsilon.
\]

The Banach-valued Cauchy estimates give

\[
\boxed{
\epsilon_0=\epsilon,
\qquad
\epsilon_1\le\frac{\epsilon}{r},
\qquad
\epsilon_2\le\frac{2\epsilon}{r^2}.
}
\tag{F10}
\]

Thus it is enough to certify a **uniform complex-disc blocked contraction**.

For example, if throughout \(|t|\le r\),

\[
\|z^bQ_t^b\|\le\kappa<1
\]

and the finite remainder/prefactor norms give a uniform constant \(C\), then after \(m\) blocks the omitted tail satisfies schematically

\[
\boxed{
\epsilon
\le
\frac{C\kappa^m}{1-\kappa}.
}
\tag{F11}
\]

Substitution into (F10) and then (F9) produces a certified second-color-derivative error.

This is the missing abstract propagation step between the existing blocked-return lemma and \(\phi_{tt}\).

---

## 8. Corollary — finite-depth hard-response sign certificate

Suppose:

1. the scalar recurrence (F1)–(F4) has been convention-audited;
2. a finite computation gives \(\widetilde\phi_{tt}\);
3. (F9) gives a rigorous error \(\mathcal E_\phi\);
4. the simple-root slope has a certified interval
   \[
   F_z\in[F_z^-,F_z^+]
   \]
   with \(0\notin[F_z^-,F_z^+]\);
5. \(D_v>0\).

Then

\[
\phi_{tt}
\in
[
\widetilde\phi_{tt}-\mathcal E_\phi,
\widetilde\phi_{tt}+\mathcal E_\phi
].
\]

If this interval excludes zero, the sign of \(\eta_v\) is determined by (F4).

For example, if

\[
F_z>0
\]

and

\[
\widetilde\phi_{tt}-\mathcal E_\phi>0,
\]

then

\[
\boxed{\eta_v<0.}
\]

If

\[
F_z>0
\]

and

\[
\widetilde\phi_{tt}+\mathcal E_\phi<0,
\]

then

\[
\boxed{\eta_v>0.}
\]

The inequalities reverse when \(F_z<0\).

This is an exact **finite-depth mechanism criterion**. It does not rely on fitting the exposed 15 response signs.

---

## 9. Abelian specialization when the short graph is acyclic

For the h=6,7 profile classes certified in

`34_PAPER3_CYCLIC_CONTACT_AND_NILPOTENCY_THEOREM.md`,

write

\[
B_v(t)
=
I+N_v(t)+E_v(t),
\]

where

\[
N_v=zO_{1,v}+z^2O_{2,v}.
\]

The support graph of \(N_v\) is acyclic. Hence

\[
N_v^{d+1}=0
\]

for a known finite \(d\), and

\[
\boxed{
A_v^{-1}
=
(I+N_v)^{-1}
=
\sum_{j=0}^d(-N_v)^j.
}
\tag{F12}
\]

Thus:

- the entire direct Abelian overlap part is evaluated **exactly**;
- there is no convergence approximation inside the short-contact inverse;
- all infinite uncertainty is pushed into the centered-return tail \(E_v\);
- invertibility of the full \(\mathcal B_v\) follows whenever
  \[
  \|A_v^{-1}E_v\|<1.
  \]

This is the strongest current route from Abelian contact geometry to a rigorous \(\Xi_v\)/hard-response certificate.

---

## 10. Relation to \(\Xi_v\)

Once the independent decomposition

\[
\eta_v=-\frac43B(v)+\Xi_v
\]

is clean-room verified, any certified interval for \(\eta_v\) immediately gives

\[
\boxed{
\Xi_v
\in
\eta_v+\frac43B(v).
}
\]

More structurally, the finite approximation can be partitioned so that:

- direct \(O_1\) terms expose the one-step \(B\)-contact;
- direct \(O_2\) terms expose \(B,J,U\);
- a finite number of centered returns are evaluated explicitly;
- only the blocked tail is enclosed by (F9)–(F11).

This is preferable to treating (W.28) merely as a tautological definition of \(\Xi_v\).

---

## 11. What is now proved and what remains

### Closed abstract mathematics

- sign in the scalar second-derivative formula, conditional on the scalar recurrence;
- root-slope identity (F3);
- exact inverse-compressed second derivative (F5);
- explicit perturbation bound (F9);
- Cauchy conversion from analytic tail size to first/second derivative bounds;
- finite-depth sign criterion.

### Still required for an actual Paper 3 hard-response theorem

1. convention-level audit of the weighted Markov-hole scalar reduction;
2. certified \(m_v(t)\) convention and its derivatives;
3. uniform complex-disc blocked contraction for the exact baseline representation;
4. interval evaluation of \(F_z\);
5. actual finite-depth evaluation for one or more profile classes;
6. independent derivation of
   \[
   \eta_v=-\frac43B(v)+\Xi_v;
   \]
7. prior-art audit of the final **combined Abelian-specific theorem**, not of the generic matrix lemmas.

---

## 12. Novelty boundary

The perturbation, inverse-derivative, Banach-lemma and Cauchy-estimate ingredients are standard and should not be advertised as new.

The potentially publishable Paper 3 statement would instead be a theorem of the form

\[
\boxed{
\text{Abelian }(B,J,U)\text{ short-contact structure}
+
\text{certified finite return geometry}
+
\text{blocked analytic tail}
\Longrightarrow
\text{hard-response sign/order}.
}
\]

That combined theorem remains the novelty target.
