# PAPER 6 — BOUNDED-DEFECT BLOCK TEMPLATE THEOREM SEED v0.1
**Date:** 2026-08-30  
**Status:** proved theorem seed + exhaustive validation; not a manuscript novelty claim

## 0. Purpose

This note formalizes the exact long-period decomposition that had only been
stated informally in the previous Paper-6 checkpoint.

The main result is:

> every character-level Abelian square of half-period at least one block length
> induces two adjacent equal-length runs of whole blocks whose aggregate Parikh
> vectors differ by a uniformly bounded zero-sum defect.

The defect bound depends only on the block length, not on the half-period.

---

# 1. Setup

Let

\[
w=b_0b_1b_2\cdots
\]

be a concatenation of blocks of common length \(L\), over alphabet \(\Sigma\).

Write

\[
p_t=\Psi(b_t).
\]

For a block \(b_t\), let

\[
X_t(i)=\Psi(\operatorname{pref}_i(b_t)),
\qquad 0\le i\le L.
\]

Let

\[
F(n)=\Psi(w[0:n])
\]

be the character-prefix Parikh vector.

A factor of length \(2K\) starting at character position \(s\) is an Abelian
square exactly when

\[
\boxed{
F(s)-2F(s+K)+F(s+2K)=0.
}
\]

Assume from now on

\[
K\ge L.
\]

Write

\[
K=qL+r,
\qquad
q\ge1,\quad 0\le r<L.
\]

For \(h=0,1,2\), write

\[
s+hK=m_hL+i_h,
\qquad
0\le i_h<L.
\]

Define the two carries

\[
c_0=m_1-m_0-q,
\qquad
c_1=m_2-m_1-q.
\]

Since \(0\le r<L\),

\[
c_0,c_1\in\{0,1\}.
\]

---

# 2. Theorem BD1 — exact bulk + boundary decomposition

Define the **bulk profile difference**

\[
\boxed{
D_q
=
\sum_{t=m_1}^{m_1+q-1}p_t
-
\sum_{t=m_1-q}^{m_1-1}p_t.
}
\]

Thus \(D_q\) compares the two adjacent \(q\)-block runs immediately to the
right and left of the block boundary indexed by \(m_1\).

Define the **boundary defect**

\[
\boxed{
E
=
c_1p_{m_1+q}
-
c_0p_{m_0}
+
X_{m_0}(i_0)
-
2X_{m_1}(i_1)
+
X_{m_2}(i_2),
}
\]

with the convention \(X_t(0)=0\), so a block beyond the end need not exist when
the prefix length is zero.

Then

\[
\boxed{
F(s)-2F(s+K)+F(s+2K)=D_q+E.
}
\]

Consequently the character factor is an Abelian square if and only if

\[
\boxed{
D_q=-E.
}
\]

## Proof

Let

\[
C_m=\sum_{t<m}p_t.
\]

Then

\[
F(mL+i)=C_m+X_m(i).
\]

Also

\[
D_q
=
C_{m_1+q}-2C_{m_1}+C_{m_1-q}.
\]

Because

\[
m_0=m_1-q-c_0,
\]

we have

\[
C_{m_0}=C_{m_1-q}-c_0p_{m_0}.
\]

Because

\[
m_2=m_1+q+c_1,
\]

we have

\[
C_{m_2}=C_{m_1+q}+c_1p_{m_1+q}.
\]

Substituting these identities into

\[
F(s)-2F(s+K)+F(s+2K)
\]

gives exactly \(D_q+E\). ∎

---

# 3. Theorem BD2 — zero-sum defect

For every such window,

\[
\boxed{
\sum_{\sigma\in\Sigma}E_\sigma=0.
}
\]

## Proof

Both character halves have length \(K\), hence the coordinate sum of

\[
F(s)-2F(s+K)+F(s+2K)
\]

is zero.

The two bulk runs both contain \(qL\) characters, so the coordinate sum of
\(D_q\) is also zero.

Therefore the coordinate sum of \(E\) is zero. ∎

A direct calculation gives the same result from

\[
i_1=i_0+r-c_0L,
\qquad
i_2=i_1+r-c_1L.
\]

---

# 4. Theorem BD3 — uniform sharp defect bound

For every alphabet coordinate,

\[
\boxed{
|E_\sigma|\le 2L-2.
}
\]

Hence

\[
\boxed{
\|E\|_\infty\le2L-2.
}
\]

The bound is independent of \(q\) and therefore independent of the size of the
character half-period \(K\).

## Proof

### Case 1: \(c_0=0\)

Then

\[
E
=
c_1p_{m_1+q}
+
X_{m_0}(i_0)
+
X_{m_2}(i_2)
-
2X_{m_1}(i_1).
\]

All terms before the last one are nonnegative Parikh vectors. Their total
coordinate mass equals the mass of \(2X_{m_1}(i_1)\), namely

\[
2i_1.
\]

Since

\[
0\le i_1\le L-1,
\]

both the positive and negative masses are at most

\[
2L-2.
\]

No single coordinate can exceed that mass in absolute value.

### Case 2: \(c_0=1\)

Combine

\[
X_{m_0}(i_0)-p_{m_0}
\]

as the negative Parikh vector of the suffix of \(b_{m_0}\) of length
\(L-i_0\).

Thus the positive mass in \(E\) is

\[
c_1L+i_2.
\]

If \(c_1=0\), this is at most \(L-1\).

If \(c_1=1\), then

\[
i_2=i_1+r-L.
\]

Since \(i_1,r\le L-1\),

\[
i_2\le L-2,
\]

so

\[
L+i_2\le2L-2.
\]

Because \(E\) is zero-sum, the negative mass is the same. Hence every coordinate
has absolute value at most \(2L-2\). ∎

---

# 5. Sharpness

The bound \(2L-2\) is best possible for alphabets with at least two letters.

Take \(K=L\), so \(q=1,r=0\), and choose a square-window start offset

\[
i_0=i_1=i_2=L-1.
\]

Choose the three relevant block prefixes of length \(L-1\) to be

\[
a^{L-1},\qquad b^{L-1},\qquad a^{L-1}.
\]

Then \(c_0=c_1=0\) and

\[
E
=
2(L-1)(e_a-e_b),
\]

so

\[
\|E\|_\infty=2L-2.
\]

The bound is attained even inside the full ternary L4 aa2fr block library:

```text
aaab | bbba | aaab
```

with start offset \(s=3\) and \(K=4\), where

\[
E=(6,-6,0).
\]

---

# 6. Corollary BD4 — finite defect alphabet

Let

\[
R=2L-2.
\]

Every boundary defect lies in

\[
\mathcal H_{\Sigma,L}
=
\left\{
e\in\mathbb Z^{|\Sigma|}:
\sum_\sigma e_\sigma=0,\;
\|e\|_\infty\le R
\right\}.
\]

This set is finite and independent of \(K\).

For a ternary alphabet, it is the radius-\(R\) hexagon in the \(A_2\) lattice
and has exactly

\[
\boxed{
1+3R(R+1)
}
\]

integer points.

Therefore for \(L=40\),

\[
R=78
\]

and

\[
\boxed{
|\mathcal H_{3,40}|
=
1+3\cdot78\cdot79
=
18\,487.
}
\]

A particular block library normally realizes only a subset of this universal
defect alphabet.

---

# 7. Corollary BD5 — bounded-defect additive collision

Let

\[
P_j=\sum_{t<j}p_t
\]

be the prefix-sum walk of block profiles.

Then

\[
D_q
=
P_{m_1+q}-2P_{m_1}+P_{m_1-q}.
\]

Thus every character-level Abelian square with \(K\ge L\) forces

\[
\boxed{
P_{m+q}-2P_m+P_{m-q}
\in
-\mathcal H_{\Sigma,L}
}
\]

for the relevant block boundary \(m=m_1\).

Equivalently:

> long character-level Abelian squares can occur only at **bounded-defect
> additive collisions** in the block-profile process.

In particular, if

\[
\left\|
P_{m+q}-2P_m+P_{m-q}
\right\|_\infty
>
2L-2,
\]

then no choice of character cutpoints with that \(m,q\) can produce an Abelian
square.

This is a rigorous global profile-level filter.

---

# 8. Exactness versus the coarse defect ball

Membership in the universal ball

\[
D_q\in-\mathcal H_{\Sigma,L}
\]

is necessary but not sufficient.

For exactness one must use the actual boundary defect

\[
E
=
E(i_0,r;\text{local boundary blocks}),
\]

or an equivalent finite boundary-geometry descriptor.

Thus the exact structure is

\[
\boxed{
\text{long-range additive profile difference}
+
\text{finite local boundary defect}
=0.
}
\]

This is precisely the separation Paper 6 needs:

- \(q\) may be arbitrarily large;
- the boundary data remain finite for fixed \(L\).

---

# 9. Uniform morphism / template interpretation

Let \(\Gamma\) be a source alphabet indexing the literal blocks and define the
uniform morphism

\[
h:\Gamma^*\to\Sigma^*,
\qquad
h(\gamma)=b_\gamma.
\]

Then a block assembly is simply \(h(u)\).

The block-profile map is the linear Parikh map induced by the incidence matrix
of \(h\).

In this language, Theorem BD1 is a one-level uniform-morphism specialization
of the classical Abelian-template mechanism:

- a long source-factor difference supplies the bulk term;
- prefixes and suffixes of block images supply a bounded boundary correction.

Therefore **BD1 should not currently be advertised as a wholly new abstract
mechanism**. Its value for Paper 6 is the explicit selected-library formulation,
sharp uniform defect bound, and its integration with counting/transfer
dynamics.

---

# 10. Paper-6 consequence

For long periods, the exact character problem is transformed into

\[
\boxed{
\text{adjacent equal-length block-profile sums}
}
\]

tested against

\[
\boxed{
\text{a finite boundary-defect catalogue}.
}
\]

This removes the half-period \(K\) from the size of the boundary state.

The remaining unbounded difficulty is the additive/profile prefix-sum process.

That is now the correct global object for the next Paper-6 theory gate.
