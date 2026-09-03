# Hidden-color continuation kernel: analytic reduction and h=4 mechanism

**Date:** 2026-08-25  
**Status:** EXPLORATORY / POST-HOC / THEORY DEVELOPMENT — NOT A CANONICAL CLAIM  
**Scope:** exposed h=2,...,7 profile-response family only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. The object

Let \(X=L_{h-1}\) be the ternary finite-type shift avoiding Abelian squares of
half-length \(2,\dots,h-1\), equipped with its Parry measure \(\mu\).

Let \(G_v\) be the event that positions \(0,\dots,2h-1\) form an
h-Abelian-square whose half-profile lies in the \(S_3\)-orbit of \(v\). Put

\[
C=X_0.
\]

Define the hidden-color continuation kernel

\[
K_v(d)
=
\mu(X_{2h-1+d}=C\mid G_v)
-
\mu(X_{2h-1+d}=X_0),
\qquad d\ge1.
\]

The second term is the ordinary baseline same-letter correlation probability
at the corresponding lag.

For h=4, profile (2,1,1):

\[
K(1)\approx-0.0233710,
\qquad
K(2)\approx+0.0755269,
\qquad
K(3)\approx+0.1001333.
\]

Thus the target event first suppresses its initial color, then produces a
large two- and three-step delayed rebound.

## 2. Exact finite-state representation

Let \(P\) be the Parry transition matrix of \(L_{h-1}\).  Attach the frozen
reference color \(C\) to the terminal state after the target event.  If
\(\nu_v(s,c)\) is the target-conditioned distribution of terminal states and
their hidden first color, and

\[
\phi(s,c)=1_{\{\text{last symbol of }s=c\}},
\]

then exactly

\[
\mu(X_{2h-1+d}=C\mid G_v)
=
\sum_{s,c}\nu_v(s,c)\,(P^d\phi_c)(s).
\]

Equivalently, on the color-lifted chain \(\widehat P=P\otimes I_3\),

\[
\mu(X_{2h-1+d}=C\mid G_v)
=
\nu_v\widehat P^d\phi.
\]

So the kernel is not an informal metaphor: it is a standard finite-state
linear-response/continuation object.  \(S_3\)-symmetry permits quotienting by
relative color labels.

## 3. Exact boundary lemma

### Lemma 1 — first and last colors differ

If

\[
x_0x_1\dots x_{2h-1}
\]

is an \(L_{h-1}\)-admissible h-Abelian-square, then

\[
\boxed{x_0\ne x_{2h-1}}.
\]

**Proof.**  If \(x_0=x_{2h-1}\), subtract that common unit vector from the
equal Parikh vectors of the two h-halves:

\[
\Psi(x_1\dots x_{h-1})
=
\Psi(x_h\dots x_{2h-2}).
\]

The middle \(2(h-1)\)-block would therefore be an Abelian square of
half-length \(h-1\), contradicting \(L_{h-1}\)-admissibility. \(\square\)

This is a genuine combinatorial fact, independent of Perron eigenvectors or
numerical weighting.

## 4. Exact singleton-deficit lemma for h=4 (2,1,1)

Let the first color be \(c\), and suppose \(c\) is a singleton in the
half-profile (2,1,1).

Then:

- \(x_0=c\);
- \(c\) does not occur in \(x_1,x_2,x_3\);
- the second half contains \(c\) exactly once;
- by Lemma 1, \(x_7\ne c\).

Therefore the minimal \(L_3\) terminal memory

\[
x_3x_4x_5x_6x_7
\]

contains the hidden first color \(c\) **exactly once**.

So the dominant h=4 target subfamily leaves the continuation dynamics in a
five-symbol state with a one-count deficit for the hidden color.

This is not sufficient by itself to explain the echo, but it provides the
state variable on which the next constraints act.

## 5. Exact one-step forbidden conditions

For an \(L_3\) word, appending a candidate symbol \(z\) can fail only because
the new suffix creates a half-length-2 or half-length-3 Abelian square:

\[
\Psi(u_1u_2)=\Psi(u_3z)
\]

or

\[
\Psi(v_1v_2v_3)=\Psi(v_4v_5z).
\]

For the h=4 target write the two halves as

\[
A=(c,a_1,a_2,a_3),\qquad
B=(b_0,b_1,b_2,b_3),
\]

where \(c\) is a singleton, \(d\) is the doubled color and \(e\) is the
other singleton.

### Lemma 2 — immediate K=3 blocking of the hidden color

Appending \(c\) immediately after the target creates a K=3 Abelian square
iff

\[
\boxed{
a_3=e
\quad\text{and}\quad
\{b_2,b_3\}=\{d,e\}.
}
\]

**Derivation.**

K=3 blocking is

\[
\Psi(a_3b_0b_1)=\Psi(b_2b_3c).
\]

Since

\[
\Psi(B)=e_c+2e_d+e_e,
\]

substitution gives

\[
2e_d+e_e+e_{a_3}
=
2(e_{b_2}+e_{b_3}).
\]

The right side has even coordinates, so \(a_3=e\), after which equality is
equivalent to \(\{b_2,b_3\}=\{d,e\}\).  The converse is immediate.

All 24 h=4 singleton-start target words found computationally to have this
K=3 block satisfy precisely this criterion.

### Lemma 3 — immediate K=2 blocking of the hidden color

Appending \(c\) creates a K=2 square iff

\[
\boxed{
c\in\{b_1,b_2\}
\quad\text{and the other member of }\{b_1,b_2\}\text{ equals }b_3.
}
\]

There are 6 such singleton-start target words in the finite h=4 target
family.

Thus the initial suppression of the hidden color has an explicit smaller-
square origin.

## 6. Constraint inversion

The delayed rebound appears when the smaller-square constraints switch from
hitting the hidden color disproportionately to hitting the two competing
colors disproportionately.

For the h=4 singleton-start target family, using the target-conditioned
Parry mass:

| continuation step | hidden color forbidden | expected number of forbidden competitor colors | competitor rate per color |
|---:|---:|---:|---:|
| 1 | 0.250840 | 0.148258 | 0.074129 |
| 2 | 0.173990 | 0.718395 | 0.359197 |
| 3 | 0.119172 | 0.756859 | 0.378429 |

At step 1 the hidden color is about **3.38× more likely to be blocked** than
an individual competitor.

At step 2 it is only about **0.48× as likely**.

At step 3 only about **0.31× as likely**.

That is the concrete constraint inversion behind the rebound.

The same phenomenon is visible without Perron weighting in exact support
counts:

| step | valid target/path nodes | hidden blocks | competitor blocks out of \(2N\) |
|---:|---:|---:|---:|
| 1 | 102 | 30 | 24 / 204 |
| 2 | 252 | 48 | 192 / 504 |
| 3 | 516 | 90 | 408 / 1032 |

At step 2, most competitor blocking is already caused by K=2 avoidance;
at step 3 both K=2 and K=3 contribute strongly.

So the delayed hidden-color echo is not a delicate eigenvector accident.
It is already encoded in the admissible continuation support.

## 7. Singleton-start channel dominates h=4 K(2) and K(3)

Under the h=4 target event:

\[
P(\text{singleton-start}\mid G_{211})
\approx0.697464.
\]

The continuation probabilities split as:

| h=4 subfamily | target mass | \(P(C\text{ at }d=1)\) | \(d=2\) | \(d=3\) |
|---|---:|---:|---:|---:|
| singleton-start | 0.697464 | 0.254082 | 0.419872 | 0.449610 |
| double-start | 0.302536 | 0.346861 | 0.321596 | 0.412977 |

The ordinary baseline same-letter probabilities are

\[
B(2)\approx0.314613,\qquad B(3)\approx0.338394.
\]

Consequently:

- **97.2% of \(K(2)\)** comes from the singleton-start subfamily;
- **77.5% of \(K(3)\)** comes from the singleton-start subfamily.

Thus the "singleton-deficit → constraint inversion → delayed return" channel
is quantitatively the dominant source of the h=4 echo.

## 8. Why the controls do not give the same crossing

### h=3 (1,1,1)

All starts are singleton, but the constraint inversion is weaker:

- no hidden-color block at the first continuation step;
- at step 2 the hidden forbidden mass is about 0.151 while the expected
  competitor-block count is only about 0.441;
- the resulting kernel peaks are
  \(K(2)\approx0.0547\), \(K(3)\approx0.0486\).

The local positive response margin is also much larger than in h=4.

### h=5 (2,2,1)

The h=5 kernel has a strong \(d=3\) echo:

\[
K(3)\approx0.0947,
\]

so the echo motif is not unique to h=4.

But only about

\[
0.2893
\]

of h=5 target mass is singleton-start.

At \(d=2\), 92.2% of the h=5 uplift comes from singleton-start paths, but at
\(d=3\) the mechanism changes: about 65.9% of the uplift comes from
double-start paths.

Moreover the h=5 target event itself is much rarer:

\[
q_{h=5}\approx0.02696
\]

versus

\[
q_{h=4}\approx0.08797,
\]

and h=5 has a much larger positive local response per target event.

Hence h=5 can show a large hidden-color echo without crossing zero.

## 9. Robustness: the echo survives removal of Parry weighting

As a deliberately different diagnostic, replace the Parry transition rule
by a row-uniform random walk on the same admissible baseline graph.

For h=4 (2,1,1):

\[
K_{\rm uniform}(2)\approx+0.05085,
\qquad
K_{\rm uniform}(3)\approx+0.08226.
\]

The Parry values are

\[
+0.07553,\qquad +0.10013.
\]

So Perron/Parry weighting amplifies the effect, but does not create it.

This strongly supports a **combinatorial continuation-constraint** origin.

## 10. Mechanism status

The strongest current mechanism statement is:

\[
\boxed{
\begin{array}{c}
\text{h=4 target profile }(2,1,1)\\[2mm]
\Downarrow\\
\text{large singleton-start target mass}\\
\Downarrow\\
\text{hidden first color appears once in terminal }L_3\text{ memory}\\
\Downarrow\\
\text{immediate K=2/K=3 suppression}\\
\Downarrow\\
\text{constraint inversion after 1--2 continuation steps}\\
\Downarrow\\
\text{hidden-color rebound }K(2),K(3)>0\\
\Downarrow\\
\text{large negative lag-9/10 soft-response terms}\\
\Downarrow\\
\text{tail exceeds the unusually thin positive local margin}\\
\Downarrow\\
a'_{4,(2,1,1)}(0)<0.
\end{array}
}
\]

The first several arrows now have either exact combinatorial proofs or
finite exhaustive support checks.

The final quantitative crossing still uses the Parry-measure response
calculation and is not yet a purely combinatorial theorem.

## 11. What remains to prove

The next theory target is no longer "why is there a bump?"

It is:

> Can one bound \(K_v(2)\) and \(K_v(3)\) from the target-profile
> multiplicities and the K=2/K=3 continuation exclusions strongly enough to
> predict whether the correlation tail can exceed the local margin?

A plausible theorem template would separate

\[
\text{target boundary composition}
+
\text{short continuation exclusion}
+
\text{event frequency}
\]

from the remaining longer-range spectral correction.

If such a bound predicts the h=4 sign reversal without using the observed
soft curve, it would turn the present mechanism from a post-hoc explanation
into a genuinely predictive result.
