# H8 Profile-Response Mechanism Report v2 — 2026-09-02

## Status

**EXPLORATORY DISCOVERY ONLY**

This report supersedes the simpler mechanism interpretation in the first H8 discovery note.
No novelty claim is made. H8 is no longer an untouched holdout.

---

# 1. Exact soft-interpolation identity

Let

\[
M(t,\varepsilon)_{ij}
=
A_{ij}\exp\!\bigl(t f_{ij}-\varepsilon g_{ij}\bigr),
\]

where:

- \(A\) is the baseline SFT adjacency matrix,
- \(f\) is the letter-\(a\) observable,
- \(g\) is the indicator of the target profile-deletion edge family,
- \(P(t,\varepsilon)=\log\rho(M(t,\varepsilon))\).

For finite \(\varepsilon\), under the usual simple-Perron-eigenvalue/mixing assumptions,

\[
\partial_\varepsilon P(t,\varepsilon)
=
-\mu_{t,\varepsilon}(g).
\]

The asymptotic letter-count variance rate is

\[
a(\varepsilon)=\partial_t^2P(0,\varepsilon).
\]

Hence exactly,

\[
\boxed{
a'(\varepsilon)
=
-\left.
\partial_t^2\mu_{t,\varepsilon}(g)
\right|_{t=0}
}.
\]

If the hard-deletion limit exists on the same Perron branch,

\[
\boxed{
a(\infty)-a(0)
=
-\int_0^\infty
\left.
\partial_t^2\mu_{t,\varepsilon}(g)
\right|_{t=0}
\,d\varepsilon .
}
\]

This gives the rigorous conceptual bridge from hard deletion to a continuum of soft responses.

---

# 2. Mixed-cumulant / correlation representation

Let \(f_k\) denote the centered letter observable at time \(k\), and let \(g_0\) denote a target profile event.

For an S3-symmetric mixing equilibrium state, the profile event is S3-invariant while \(f\) lies in the nontrivial standard representation, so first mixed moments vanish.

The second tilt derivative may therefore be written as a third-cumulant susceptibility:

\[
\partial_t^2\mu_t(g)\big|_{t=0}
=
\sum_{r,s\in\mathbb Z}
\kappa(g_0,f_r,f_s).
\]

Equivalently, under summable correlations,

\[
\boxed{
a'(0)
=
-\lim_{R\to\infty}
\operatorname{Cov}\!\left(
g_0,
\left(\sum_{|k|\le R} f_k\right)^2
\right).
}
\]

This identity was also used as an independent Monte Carlo estimator in the background-constraint experiment below.

---

# 3. Exact constrained finite-window local term

Let \(I\) be the \(2h\)-letter support of the profile event and define

\[
F_I=\sum_{k\in I} f_k.
\]

Let

\[
V_{2h}
=
\operatorname{Var}_\mu(F_I)
\]

under the unperturbed baseline SFT measure.

Conditioned on the S3-invariant profile event \(g=1\), the number of \(a\)'s in the \(2h\)-block is one of \(2v_1,2v_2,2v_3\), symmetrically over the three coordinates. Therefore

\[
\mathbb E(F_I^2\mid g=1)
=
\frac{4}{3}B(v).
\]

Thus the contribution obtained by restricting both tilt insertions to the event support is exactly

\[
\boxed{
L_h(v)
=
-\operatorname{Cov}(g,F_I^2)
=
q_v
\left(
V_{2h}
-
\frac{4}{3}B(v)
\right).
}
\]

Define the dynamic local threshold

\[
\boxed{
B_c(h)
=
\frac34 V_{2h}(L_{h-1}).
}
\]

Then

\[
\operatorname{sign} L_h(v)
=
\operatorname{sign}\bigl(B_c(h)-B(v)\bigr).
\]

This is a sharper constrained-SFT statement than the earlier full-shift \(S=h-3B\) formula.

---

# 4. Full shift is the special case

In the full ternary shift,

\[
V_{2h}
=
2h\operatorname{Var}(1_{\{a\}})
=
\frac{4h}{9}.
\]

Therefore

\[
B_c^{\rm full}(h)
=
\frac{h}{3},
\]

and

\[
L_h(v)
=
q_v
\left(
\frac{4h}{9}-\frac{4B(v)}{3}
\right)
=
\boxed{
\frac49 q_v(h-3B(v))
}.
\]

So the previously derived \(S=h-3B\) law is the full-shift specialization of a more general constrained variance-threshold formula.

---

# 5. H8 deterministic baseline threshold

For H8 the baseline is \(L_7\).

A deterministic Perron-Parry correlation calculation on the native \(L_7\) presentation gives

\[
\lambda(L_7)
\approx
1.7776384757456,
\]

and for a 16-letter block

\[
\boxed{
V_{16}(L_7)
\approx
1.86229812161646.
}
\]

Therefore

\[
\boxed{
B_c(8)
=
\frac34V_{16}
\approx
1.39672359121234.
}
\]

The H8 profile B-values are

\[
\frac23,\quad
\frac83,\quad
\frac{14}{3},\quad
\frac{26}{3}.
\]

Hence the threshold lies strictly between the minimum-B profile and every other H8 profile:

\[
\frac23
<
1.3967
<
\frac83.
\]

Thus the exact finite-window local term predicts:

- (3,3,2): positive
- (4,2,2): negative
- (4,3,1): negative
- (5,2,1): negative

including the formerly mysterious \(S=0\) profile (4,2,2).

---

# 6. H8 local terms

Using the independently computed H8 Parry masses:

| profile | B | q_v | exact finite-window local term \(L_h(v)\) |
|---|---:|---:|---:|
| (3,3,2) | 2/3 | 0.0332565304114 | +0.03237221375 |
| (4,2,2) | 8/3 | 0.00258498287867 | **-0.00437704148** |
| (4,3,1) | 14/3 | 0.00232606113841 | -0.01014145002 |
| (5,2,1) | 26/3 | 0.000521669813084 | -0.00505667979 |

All four local signs equal the observed hard-deletion signs.

This does not itself prove preservation of sign along the full soft-to-hard path.

---

# 7. Critical H8 profile: local versus correlation tail

For

\[
v=(4,2,2),
\qquad
B=\frac83,
\qquad
S=0,
\]

the exact constrained local term is

\[
L_8(4,2,2)
\approx
-0.00437704148.
\]

The independently estimated full infinitesimal soft response is

\[
a'(0)
\approx
-0.00359760.
\]

Therefore the contribution from cross-boundary / outside-support correlations is approximately

\[
\boxed{
\Gamma
=
a'(0)-L
\approx
+0.00077944.
}
\]

So the longer-range correlation correction is **positive** here.

It weakens the negative local response by roughly 18%; it does not create the negative sign.

This corrects the earlier oversimplified interpretation that the negative H8 sign was primarily generated by a long correlation tail.

The dominant mechanism is instead:

\[
\text{short/medium-range variance suppression by }L_7
\quad\Rightarrow\quad
V_{16}<\frac{32}{9}
\quad\Rightarrow\quad
L<0.
\]

---

# 8. Background-constraint ladder for the same H8 critical profile

Keep fixed:

- h=8,
- profile (4,2,2),
- B=8/3,
- S=0,
- J=16/27,
- the same K=8 target event.

Only change the background language.

Deterministic finite-block variances:

| baseline | \(V_{16}\) | local threshold \(3V_{16}/4\) | local sign for (4,2,2) |
|---|---:|---:|---|
| full shift | 3.55555556 | 2.66666667 | 0 |
| L2 | 2.49878586 | 1.87408940 | negative |
| L3 | 2.60391436 | 1.95293577 | negative |
| L4 | 2.78401177 | 2.08800883 | negative |
| L5 | 2.27088651 | 1.70316488 | negative |
| L6 | 1.95577954 | 1.46683465 | negative |
| L7 | 1.86229812 | 1.39672359 | negative |

Thus **the same algebraic profile changes from zero local response in the full shift to negative local response as soon as the K=2 constraint is imposed**.

Independent mixed-cumulant Monte Carlo estimates of the total soft derivative were also negative for every constrained background L2,...,L7. For L7 they agree with the independently obtained soft derivative of approximately -0.00360.

This is direct evidence against any claim that B, S, or J alone determines the constrained response.

---

# 9. Full-shift target self-overlap at second order

For the H8 critical profile (4,2,2), the full-shift first soft derivative vanishes exactly:

\[
a_\varepsilon(0)=0.
\]

An exact enumeration of overlaps between the 529,200 length-16 target words gives

\[
\boxed{
a_{\varepsilon\varepsilon}(0)
\approx
+0.014181336276.
}
\]

Therefore near epsilon=0 in the full shift,

\[
a(\varepsilon)-a(0)
=
\frac12(0.014181336276)\varepsilon^2
+O(\varepsilon^3),
\]

which initially moves **positive**.

This is highly informative:

- target-event self-overlap alone does not explain the negative L7 response;
- the target family initially pushes the full-shift critical response positive at second order;
- the pre-existing Abelian-square constraints change the situation more strongly, producing a negative first-order response.

For comparison, the h=2 critical profile has exact full-shift second derivative

\[
a_{\varepsilon\varepsilon}(0)=\frac{16}{243}>0.
\]

---

# 10. Dynamic threshold across h=2,...,8

The baseline block variances and thresholds are:

| target h | baseline | \(V_{2h}\) | \(B_c(h)=3V_{2h}/4\) | minimum B | next possible B |
|---:|---|---:|---:|---:|---:|
| 2 | full shift | 0.88888889 | 0.66666667 | 2/3 | 8/3 |
| 3 | L2 | 1.00602755 | 0.75452066 | 0 | 2 |
| 4 | L3 | 1.38818113 | 1.04113585 | 2/3 | 8/3 |
| 5 | L4 | 1.83036407 | 1.37277305 | 2/3 | 8/3 |
| 6 | L5 | 1.79777451 | 1.34833088 | 0 | 2 |
| 7 | L6 | 1.76502510 | 1.32376882 | 2/3 | 8/3 |
| 8 | L7 | 1.86229812 | 1.39672359 | 2/3 | 8/3 |

For every h=3,...,8,

\[
\boxed{
B_{\min}(h)<B_c(h)<B_{\rm next}(h).
}
\]

At h=2,

\[
B_c=B_{\min}.
\]

Thus the exact constrained finite-window local term classifies the minimum-B profile versus all other integer profiles for every h=3,...,8, before the hard-deletion response is examined.

This may be the structural reason the finite hard-deletion minimum-B split looks so clean.

It is not yet proved that the remaining correlation correction or the finite soft-to-hard path cannot reverse this local sign.

---

# 11. Revised mechanism architecture

The strongest current mechanism candidate is now:

\[
\boxed{
a'_v(0)
=
q_v
\left(
V_{2h}(L_{h-1})-\frac43B(v)
\right)
+
\Gamma_v
}
\]

where:

- the first term is an exact S3-symmetric finite-window contribution;
- \(\Gamma_v\) is an exact cross-boundary / outside-support correlation correction.

The full-shift formula

\[
\frac49q_v(h-3B)
\]

is recovered because

\[
V_{2h}^{\rm full}=\frac{4h}{9},
\qquad
\Gamma_v^{\rm full}=0.
\]

The hard deletion is then

\[
\Delta_v
=
\int_0^\infty a'_v(\varepsilon)\,d\varepsilon.
\]

The next theorem problem is to control:

1. \(\Gamma_v(\varepsilon)\),
2. motion of the threshold along epsilon,
3. whether the sign of the integrand can change,
4. whether the integrated hard response preserves the initial/local sign.

---

# 12. Implication for future discriminating tests

A future h-level should not merely test minimum-B versus \(S=h-3B\).

The new mechanism predicts that the relevant infinitesimal constrained threshold is

\[
B_c(h)=\frac34 V_{2h}(L_{h-1}),
\]

which is response-independent and can in principle be computed before revealing target profile responses.

This creates a much stronger preregistration strategy:

1. compute/freeze baseline \(V_{2h}\);
2. derive \(B_c(h)\);
3. freeze profile-sign predictions from the threshold;
4. only then reveal target hard responses.

No future h-level was opened in producing this report.

---

# Epistemic boundary

Strongly supported / derived:

- exact soft-interpolation identity in finite transfer-matrix form;
- mixed-cumulant representation under standard mixing assumptions;
- exact S3 finite-window local term \(q(V_{2h}-4B/3)\);
- full-shift specialization \((4/9)q(h-3B)\);
- deterministic H8 \(V_{16}\) and \(B_c(8)\);
- exact positive full-shift second-order overlap curvature for the H8 critical profile;
- H8 background-constraint ladder showing local sign becomes negative under L2,...,L7.

Still open:

- a uniform bound on \(\Gamma\);
- sign preservation along the entire soft-to-hard path;
- a theorem explaining the observed hard-deletion 19/19 split;
- asymptotic behavior of \(B_c(h)\);
- novelty relative to existing thermodynamic-formalism / forbidden-pattern literature.
