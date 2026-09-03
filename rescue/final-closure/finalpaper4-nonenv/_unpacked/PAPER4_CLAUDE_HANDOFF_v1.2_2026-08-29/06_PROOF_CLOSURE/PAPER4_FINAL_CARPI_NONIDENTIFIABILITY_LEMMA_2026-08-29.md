# Paper 4 — Final Carpi non-identifiability lemma

**Date:** 2026-08-29  
**Status:** independent mathematical closure note; sandbox only.

## 1. Primary-source restatement used

Eyidoğan–Göral–Tanısalı (2026), Theorem 2.6, explicitly restates Carpi
[1993, Proposition 1]. Condition C3 quantifies over a tuple of proper prefixes
\(x_j\in\operatorname{Pref}(h(a_j))\setminus\{h(a_j)\}\), and, when the relevant
second differences lie in the image subgroup \(G_h\), asserts the **existence**
of a tuple

\[
(\delta_0,\ldots,\delta_n)\in\{0,1\}^{n+1}
\]

such that

\[
\Psi(x_{j+1})-2\Psi(x_j)+\Psi(x_{j-1})
=
\delta_{j+1}\Psi(h(a_{j+1}))
-2\delta_j\Psi(h(a_j))
+\delta_{j-1}\Psi(h(a_{j-1})).
\tag{C3}
\]

For the Abelian-square / three-cutpoint specialization, use \(j=1\).

## 2. Uniform scalar projection

Assume \(h\) is uniform of length \(L\). Let the three proper prefixes have local
depths \(i_0,i_1,i_2\), so that

\[
|\Psi(x_j)|_1=i_j,\qquad |\Psi(h(a_j))|_1=L.
\]

Applying the length functional to C3 yields

\[
i_0-2i_1+i_2
=
L(\delta_0-2\delta_1+\delta_2).
\tag{1}
\]

For three equally spaced cutpoints in Paper 4,

\[
t_j=b_jL+i_j,\qquad
K=qL+r,\qquad 0\le r<L.
\]

Define

\[
c_j=\left\lfloor\frac{i_j+r}{L}\right\rfloor,
\]

so

\[
i_{j+1}=i_j+r-Lc_j,\qquad
b_{j+1}-b_j=q+c_j.
\]

Therefore

\[
\Delta=b_0-2b_1+b_2=c_1-c_0
\]

and equal spacing gives

\[
i_0-2i_1+i_2=-L\Delta.
\tag{2}
\]

Combining (1) and (2),

\[
\boxed{
\delta_0-2\delta_1+\delta_2
=
-\Delta
=
c_0-c_1.
}
\tag{3}
\]

Equation (3) is the exact scalar overlap between Carpi C3 and Paper 4.

## 3. Lemma — Carpi C3 local data do not determine the Paper-4 \(q\)-regime

### Lemma

Fix \(L\), \(r\), an initial local depth \(i_0\), and hence the recursively
determined local-depth triple \((i_0,i_1,i_2)\) and carry pair \((c_0,c_1)\).
For every integer \(q\ge0\), define

\[
K_q=qL+r
\]

and, for an arbitrary starting macro index \(b_0\),

\[
b_1=b_0+q+c_0,\qquad
b_2=b_1+q+c_1.
\]

Then the resulting cutpoints

\[
t_j=b_jL+i_j
\]

are equally spaced with gap \(K_q\), while the following data are independent
of \(q\):

\[
L,\ r,\ i_0,i_1,i_2,\ c_0,c_1,\ \Delta.
\]

Moreover, a Carpi-C3 local instance

\[
(a_0,a_1,a_2;x_0,x_1,x_2)
\]

depends on the block images and their proper prefixes, not on the absolute macro
indices \(b_j\), the gap quotient \(q\), or the number of complete macro blocks
between cutpoints.

Consequently, the C3 local instance together with its set of selector solutions

\[
\mathcal D_{\rm C3}
=
\left\{
(\delta_0,\delta_1,\delta_2)\in\{0,1\}^3:
\text{C3 holds}
\right\}
\]

does not, in general, determine whether \(q=0\) or \(q\ge1\).

### Proof

The recurrence

\[
i_{j+1}=i_j+r-Lc_j
\]

contains \(r\) and \(c_j\), but not \(q\). Therefore fixing \(L,r,i_0\) fixes
all local depths and carries independently of \(q\).

For each \(q\), the macro-index recurrence

\[
b_{j+1}-b_j=q+c_j
\]

changes only the number of complete macro blocks crossed between cutpoints.
Substitution gives

\[
t_{j+1}-t_j
=
L(q+c_j)+(i_{j+1}-i_j)
=
L(q+c_j)+r-Lc_j
=
qL+r
=
K_q,
\]

so every \(q\) produces a valid equally spaced triple with the same local data.

Carpi C3, however, is formulated solely from the chosen source letters
\(a_j\), their images \(h(a_j)\), and the proper prefixes \(x_j\). Neither
\(q\) nor any absolute block index occurs in C3. Thus two embeddings with the
same local C3 tuple but different \(q\) give the same vector equation and the
same selector-solution set \(\mathcal D_{\rm C3}\).

Hence \(q\) is not recoverable from the C3 local solution object. ∎

## 4. Corollary — C3 cannot determine Paper 4's six-domain partition

Paper 4 distinguishes truncated \(q=0\) domains from their \(q\ge1\)
counterparts. For example, choose

\[
L=10,\qquad r=2,\qquad i_0=1.
\]

Then

\[
i_1=3,\qquad i_2=5,\qquad c_0=c_1=0,\qquad \Delta=0.
\]

For \(q=0\),

\[
K=2,\qquad b_0=b_1=b_2,
\]

which is the same-block short zero-curvature regime \(Z_s\).

For \(q=1\),

\[
K=12,\qquad b_1=b_0+1,\qquad b_2=b_0+2,
\]

which lies in the full zero-curvature regime \(Z\).

The local depths, carry pair, curvature, and any fixed C3 prefix/image tuple are
unchanged; only \(q\) and the absolute macro spacing differ.

Therefore no function of the local Carpi-C3 instance and its selector-solution
set can recover the distinction

\[
Z_s\quad\text{versus}\quad Z.
\]

The same construction applies to the nonzero-curvature pairs.

For example, take

\[
L=10,\qquad r=6,\qquad i_0=1.
\]

Then

\[
i_1=7,\qquad c_0=0,
\]

\[
i_2=3,\qquad c_1=1.
\]

With \(q=0\), the macro gaps are \(0,1\), giving the truncated domain
corresponding to carry pair \(01\). With \(q=1\), the macro gaps are \(1,2\),
giving the full domain with the same carry pair. Again the local C3 data are
unchanged.

Thus the six Paper-4 domains contain information — the Euclidean gap quotient
regime — that C3 does not retain.

## 5. Consequence for the apparent "six vs six"

For a C3 selector triple,

\[
D_C=\delta_0-2\delta_1+\delta_2.
\]

The eight binary triples give second differences

\[
0,+1,-2,-1,+1,+2,-1,0.
\]

Under the Paper-4 AP specialization, equation (3) excludes \(D_C=\pm2\), so six
selector triples remain algebraically possible.

This does **not** turn them into six geometric Carpi classes. C3 asserts the
existence of selector tuples solving a vector equation. Paper 4's six domains,
by contrast, retain the \(q\)-regime and carry geometry. The lemma above shows
that the C3 local solution object forgets information needed to distinguish at
least \(Z_s\) from \(Z\), and analogously the truncated/full nonzero-curvature
pairs.

Therefore the numerical equality

\[
6\text{ admissible selector triples}
\qquad\text{vs.}\qquad
6\text{ Paper-4 domains}
\]

is not an equivalence of classifications.

## 6. Where the candidate Paper-4 contribution begins

The strongest safe boundary is:

### Prior-art / classical layer

- Parikh-vector second differences;
- Carpi C3 whole-image corrections;
- the scalar three-valued whole-block curvature;
- Euclidean carry arithmetic itself.

### Paper-4 candidate contribution

- the exact physical domain organization retaining \(q=0\) versus \(q\ge1\);
- partial assignment via the unresolved-role occurrence mask \(\chi\);
- block-coincidence consistency for \(\chi\);
- exactly 34 realizable domain/mask patterns;
- complete reduced unresolved-support sets;
- their quotient into exactly 19 stable families;
- closed cardinalities and the support/target compiler.

## 7. Epistemic status

This closes the specific logical question:

> Does Carpi C3's local selector-solution object determine the Paper-4
> six-domain geometry?

**No.** The \(q\)-regime is absent from the C3 local data and can be varied
without changing the local prefix/carry data.

This does **not** prove global historical novelty of the 6/34/19 theorem.
Novelty remains a literature-positioning claim, not a theorem of absence.

It does remove the specific Carpi-C3 equivalence concern that motivated the
v2 equivalence-kill audit.
