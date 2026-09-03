# Paper 4 — Clean-Room Proof Audit of the Finite Reduction

**Version 0.1 — 2026-08-27**  
**Status:** mathematical audit; independent of the stochastic/component search.  
**Scope:** the four project-side lemmas that carry the finite reduction.

## 1. Uniform-cut boundary lemma

Let
\[
H:\Gamma^*\to\Delta^*
\]
be an \(L\)-uniform morphism, and let
\[
x=x_0x_1x_2\cdots\in\Gamma^\mathbb N.
\]

Write \(m(y)=\Psi(H(y))\) for the incidence column of a macro letter \(y\),
and let
\[
p_y(s)=\Psi(H(y)[0:s]),\qquad 0\le s<L,
\]
be the Parikh vector of the length-\(s\) prefix of \(H(y)\).

Represent an output cut by
\[
(i,s),\qquad 0\le s<L,
\]
meaning the cut after \(i\) complete macro images and \(s\) symbols of
\(H(x_i)\).  Its cumulative Parikh vector is
\[
C(i,s)
=
M_H\Psi(x_0\cdots x_{i-1})+p_{x_i}(s).
\]

Consider three output cuts
\[
(i_0,s_0),\quad(i_1,s_1),\quad(i_2,s_2)
\]
whose consecutive distances are the same integer \(K>0\).

The factor between the first two cuts and the factor between the second and
third cuts are Abelian equivalent if and only if
\[
C(i_2,s_2)-2C(i_1,s_1)+C(i_0,s_0)=0.
\]

### Proof

The Parikh vectors of the two consecutive factors are respectively
\[
C(i_1,s_1)-C(i_0,s_0)
\]
and
\[
C(i_2,s_2)-C(i_1,s_1).
\]
They are equal exactly when their difference is zero, giving the displayed
second-difference equation. \(\square\)

Now write
\[
K=qL+r,\qquad0\le r<L.
\]
For \(j=1,2\), let
\[
\varepsilon_j=
\begin{cases}
1,&s_{j-1}+r\ge L,\\
0,&s_{j-1}+r<L.
\end{cases}
\]
Then
\[
s_j\equiv s_{j-1}+r\pmod L,
\qquad
i_j-i_{j-1}=q+\varepsilon_j.
\]

Define the consecutive macro intervals
\[
U=x_{i_0}\cdots x_{i_1-1},
\qquad
V=x_{i_1}\cdots x_{i_2-1}.
\]
Direct substitution gives
\[
\boxed{
M_H(\Psi(V)-\Psi(U))
+
p_{x_{i_2}}(s_2)-2p_{x_{i_1}}(s_1)+p_{x_{i_0}}(s_0)
=0.
}
\]

Moreover,
\[
|U|,|V|\in\{q,q+1\},
\]
so
\[
\bigl||U|-|V|\bigr|\le1.
\]

If \(|U|=|V|\), the displayed equation already has equal-length adjacent
macro cores.

If \(|V|=|U|+1\), remove the last letter \(y\) of \(V\).  Writing
\(V=V'y\),
\[
M_H(\Psi(V')-\Psi(U))
+
\beta+m(y)=0,
\]
where
\[
\beta=p_{x_{i_2}}(s_2)-2p_{x_{i_1}}(s_1)+p_{x_{i_0}}(s_0).
\]
The words \(U,V'\) are adjacent and have equal length.

If \(|U|=|V|+1\), remove the first letter \(y\) of \(U\), say \(U=yU'\).
Then
\[
M_H(\Psi(V)-\Psi(U'))
+
\beta-m(y)=0,
\]
and \(U',V\) are adjacent and have equal length.

Hence every output Abelian square gives an equation
\[
\boxed{
M_H(\Psi(V_0)-\Psi(U_0))+\beta'=0
}
\]
for adjacent equal-length macro factors \(U_0,V_0\), where \(\beta'\) belongs
to a **finite** set determined only by:

- the two phase carries \(\varepsilon_1,\varepsilon_2\);
- the three cut phases \(s_0,s_1,s_2\);
- the macro letters meeting the cuts;
- at most one additional macro letter moved from a longer macro interval.

This is the exact finite boundary-correction reduction.

### Audit verdict

`PROVED`.

### Novelty boundary

The formula is project-derived, but its role is close to the standard
template/parent formalism of Currie--Rampersad and Rao--Rosenfeld.  The paper
should claim the explicit specialization/reduction, not invention of the
general template principle.

---

## 2. Kernel-preserving rank-one incidence lemma

Let
\[
M\in\mathbb R^{d\times n}
\]
have common column sum \(L\ne0\):
\[
\mathbf1_d^TM=L\mathbf1_n^T.
\]

Let
\[
M'=sM+u\mathbf1_n^T,
\]
where \(s\ne0\), \(u\in\mathbb R^d\), and assume
\[
L':=sL+\mathbf1_d^Tu\ne0.
\]

Then
\[
\boxed{\ker M'=\ker M.}
\]

### Proof

First let \(x\in\ker M\).  Multiplying \(Mx=0\) by \(\mathbf1_d^T\) gives
\[
L\mathbf1_n^Tx=0.
\]
Since \(L\ne0\),
\[
\mathbf1_n^Tx=0.
\]
Therefore
\[
M'x=sMx+u\mathbf1_n^Tx=0,
\]
so
\[
\ker M\subseteq\ker M'.
\]

Conversely let \(x\in\ker M'\).  Multiply \(M'x=0\) by \(\mathbf1_d^T\):
\[
0
=
sL\mathbf1_n^Tx
+
(\mathbf1_d^Tu)\mathbf1_n^Tx
=
L'\mathbf1_n^Tx.
\]
Because \(L'\ne0\),
\[
\mathbf1_n^Tx=0.
\]
Then
\[
0=M'x=sMx.
\]
Since \(s\ne0\),
\[
Mx=0.
\]
Thus
\[
\ker M'\subseteq\ker M.
\]
The kernels are equal. \(\square\)

### Specialization

For \(M=M_{g_3}\),
\[
L=10,\qquad s=1,\qquad u=(10,10,10)^T,
\]
hence
\[
L'=10+30=40\ne0.
\]
Therefore
\[
\ker M_H=\ker M_{g_3}.
\]

For every macro Parikh difference \(d\) of two equal-length macro factors,
\[
\mathbf1^Td=0,
\]
and hence
\[
M_Hd
=
(M_{g_3}+u\mathbf1^T)d
=
M_{g_3}d.
\]

### Audit verdict

`PROVED`, with one correction to the earlier manuscript:
the nonzero new column-sum assumption \(L'\ne0\) must be stated.

---

## 3. Three-block locality lemma

Let \(H\) be \(L\)-uniform and let \(x\in\Gamma^\mathbb N\).

Any factor of \(H(x)\) of length at most \(2L\) is contained in
\[
H(x_ix_{i+1}x_{i+2})
\]
for some \(i\).

### Proof

Let the factor begin at offset \(s\in\{0,\ldots,L-1\}\) inside \(H(x_i)\).
From that starting point through the end of \(H(x_{i+2})\) there are
\[
(L-s)+L+L=3L-s
\]
symbols.  More directly, a length-\(2L\) interval beginning at offset \(s\)
uses at most

- the suffix of \(H(x_i)\),
- all of \(H(x_{i+1})\),
- a prefix of \(H(x_{i+2})\).

It cannot enter \(H(x_{i+3})\), because doing so would require more than
\[
(L-s)+L+s=2L
\]
symbols before the fourth block begins.  Hence at most three consecutive
images are met. \(\square\)

### Corollary for \(L=40\)

An Abelian square of half-length
\[
K\le40
\]
has total length \(2K\le80=2L\).  Hence every such square lies in the image of
some length-3 macro factor.

### Audit verdict

`PROVED`.

---

## 4. Exact 22-trigram finite-gate theorem

Let
\[
x=h_6^\omega(a)
\]
and let
\[
\mathcal B_3=\operatorname{Fact}_3(x)
\]
be its set of length-3 factors.

For any 40-uniform morphism
\[
H:\Gamma^*\to\{a,b,c\}^*,
\]
the infinite word \(H(x)\) contains no Abelian square of half-length
\(2\le K\le40\) **if and only if**
every finite word
\[
H(t),\qquad t\in\mathcal B_3,
\]
contains no such square.

### Proof

If some \(H(t)\) contains such a square and \(t\in\operatorname{Fact}_3(x)\),
then \(H(t)\) occurs in \(H(x)\), so the infinite word contains the square.

Conversely, suppose \(H(x)\) contains a square of half-length \(K\le40\).
By the three-block locality lemma its length-\(2K\) factor is contained in
\(H(x_ix_{i+1}x_{i+2})\).  The macro trigram
\[
x_ix_{i+1}x_{i+2}
\]
belongs to \(\mathcal B_3\), so the corresponding finite check detects the
square. \(\square\)

### Exact factor language

A clean-room factor-language recheck gives

\[
\operatorname{Fact}_2(h_6^\omega(a))
=
\{
ac,ad,af,bc,bd,cb,ce,dc,df,ea,eb,fa,fb,fe
\}
\]
and
\[
|\operatorname{Fact}_3(h_6^\omega(a))|=22,
\]
with
\[
\begin{aligned}
\mathcal B_3=\{&
ace,adf,afe,bce,bdc,bdf,cbc,cbd,cea,ceb,dcb,\\
&dfa,dfb,eac,ead,eaf,ebc,ebd,fad,faf,fbd,fea
\}.
\end{aligned}
\]

The recheck does not rely only on empirical stabilization: all listed factors
occur in a finite iterate, and the factor sets are closed under the
length-3-uniform morphism.  Since every output bigram/trigram in a further
iterate is generated inside one image or across an allowed source bigram,
closure proves that no new factor can appear later.

### Audit verdict

`PROVED + EXACT-CHECKED`.

---

## 5. Referee-facing theorem stack after audit

The finite half of Paper 4 can now be presented as:

1. **Uniform-cut boundary lemma** — `PROVED`.
2. **Rank-one incidence kernel lemma** — `PROVED`, corrected hypothesis.
3. **Carpi barrier** — `KNOWN COROLLARY`, external prior art.
4. **Three-block locality lemma** — `PROVED`.
5. **22-trigram finite-gate theorem** — `PROVED + EXACT-CHECKED`.
6. **Finite component exclusion theorem** — `PROVED` soundness theorem.
7. Concrete component closures — `EXACT-CHECKED / COMPONENT-LOCAL`.

The search code should appear only after this theorem stack, as a producer of
finite certificates rather than as the source of mathematical definitions.

## 6. Remaining proof-audit tasks

Before submission:

- independent algebra read of the boundary-correction signs;
- independent reimplementation of the 22-trigram factor-language check;
- exact source locator for the Carpi necessity theorem;
- convention audit for incidence-matrix orientation;
- ensure Rao--Rosenfeld's \(E_e(M_{h_6})\cap\ker(M_H)=\{0\}\) is verified
  directly for the manuscript convention, not inherited only verbally from
  “same kernel as \(g_3\)”.
