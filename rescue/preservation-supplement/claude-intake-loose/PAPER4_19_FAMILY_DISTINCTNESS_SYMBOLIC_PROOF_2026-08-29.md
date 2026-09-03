# Paper 4 — symbolic distinctness of the 19 stable support families

**Date:** 2026-08-29  
**Status:** sandbox proof closure; no canonical/Git mutation.

## 1. Setup

Let \(e_i\) denote the formal prefix variable at depth \(i\), with the endpoint
convention \(e_0=0\). A reduced support signature is a finite integer
combination

\[
\sigma=\sum_{i=1}^{L-1}\alpha_i e_i.
\]

Define its **depth moment**

\[
\mu(\sigma)=\sum_{i=1}^{L-1} i\,\alpha_i.
\]

For the full domains

\[
Z:\quad u+w=2v,
\]

\[
P:\quad u+w=2v-L,
\]

\[
M:\quad u+w=2v+L,
\]

the role-mask support forms are:

\[
O:e_u,\qquad
C:-2e_v,\qquad
M:e_u-2e_v,
\]

\[
OO:e_u+e_w,\qquad
A:e_u-2e_v+e_w,
\]

up to outer swap, which leaves the complete family unchanged.

For the same-block short family \(Z_s\)-A,

\[
(u,v,w)=(a,a+h,a+2h),\qquad h\ge2.
\]

The already established truncation lemma gives

\[
P_t\text{-M}=P\text{-M}\setminus
\{e_{L-2}-2e_{L-1}\},
\tag{T+}
\]

and

\[
M_t\text{-M}=M\text{-M}\setminus\{e_1\}.
\tag{T-}
\]

We prove that the nineteen complete support sets are pairwise distinct for
every \(L\ge5\).

---

## 2. Exact one-coordinate families

The three outer-only families are

\[
Z\text{-O}=\{0,e_1,\ldots,e_{L-1}\},
\]

\[
P\text{-O}=\{0,e_1,\ldots,e_{L-2}\},
\]

\[
M\text{-O}=\{e_1,\ldots,e_{L-1}\}.
\]

Proof:

- in \(Z\), every outer depth \(0,\ldots,L-1\) occurs (take \(u=v=w\));
- in \(P\), an outer depth can be any \(0,\ldots,L-2\), because taking
  \(v=L-1\) gives \(u+w=L-2\), while \(L-1\) itself is impossible;
- in \(M\), an outer depth can be any \(1,\ldots,L-1\), because with \(v=0\)
  the equation is \(u+w=L\), while depth \(0\) is impossible.

Hence the three sets are distinct: \(Z\)-O contains both \(0\) and \(e_{L-1}\),
\(P\)-O contains \(0\) but not \(e_{L-1}\), and \(M\)-O contains
\(e_{L-1}\) but not \(0\).

Similarly,

\[
Z\text{-C}
=
\{0,-2e_1,\ldots,-2e_{L-1}\},
\]

\[
P\text{-C}
=
\{-2e_v:\lceil L/2\rceil\le v\le L-1\},
\]

\[
M\text{-C}
=
\{0\}\cup
\{-2e_v:1\le v\le\lfloor(L-2)/2\rfloor\}.
\]

Thus \(P\)-C is the only centre family not containing \(0\);
\(Z\)-C contains \(-2e_{L-1}\), while \(M\)-C does not.

No O-family can equal a C-family because every nonzero O signature has
coefficient \(+1\), whereas every nonzero C signature has coefficient \(-2\).

---

## 3. Mixed centre–outer families

For the zero-curvature mixed family,

\[
\sigma=e_u-2e_v
\]

and \(u+w=2v\). Therefore

\[
\mu(\sigma)=u-2v=-w.
\]

Since every outer depth \(w\in\{0,\ldots,L-1\}\) occurs in \(Z\),

\[
\mu(Z\text{-M})=\{-(L-1),\ldots,-1,0\}.
\tag{ZM}
\]

In particular \(Z\)-M contains \(-e_k\) for every \(1\le k<L\) by taking
\(u=v=w=k\). No other family produced by an O, C, OO, or A mask has this
mixed-family property.

For positive curvature,

\[
u+w=2v-L,
\]

hence

\[
\mu(e_u-2e_v)=-(L+w).
\]

Here \(0\le w\le L-2\), so

\[
\mu(P\text{-M})
=
\{-2L+2,\ldots,-L\}.
\tag{PM}
\]

The truncated family \(P_t\)-M has the same sign/orientation type, but by
(T+) it omits the canonical signature

\[
\tau_P=e_{L-2}-2e_{L-1}.
\]

Thus

\[
\tau_P\in P\text{-M},
\qquad
\tau_P\notin P_t\text{-M}.
\]

For negative curvature,

\[
u+w=2v+L,
\]

so

\[
\mu(e_u-2e_v)=L-w.
\]

Here \(1\le w\le L-1\), giving

\[
\mu(M\text{-M})=\{1,\ldots,L-1\}.
\tag{MM}
\]

The full family contains every positive unary signature \(e_j\), obtained from
\(v=0,\ u=j,\ w=L-j\). By (T-),

\[
e_1\in M\text{-M},
\qquad
e_1\notin M_t\text{-M}.
\]

Consequently the five mixed families are pairwise distinct:

- \(P\)-M and \(P_t\)-M have only moments \(\le-L\);
- \(Z\)-M has moments in \([-(L-1),0]\);
- \(M\)-M and \(M_t\)-M have only positive moments;
- the full/truncated pair on each side is separated by \(\tau_P\) or \(e_1\).

They are also distinct from the O and C families because for \(L\ge5\) each
mixed family contains a genuine two-depth signature with coefficients
\((+1,-2)\).

---

## 4. Both-outers families

For an OO signature,

\[
\sigma=e_u+e_w,
\qquad
\mu(\sigma)=u+w.
\]

Therefore

\[
\mu(Z\text{-OO})
=
\{0,2,4,\ldots,2L-2\},
\]

because \(u+w=2v\).

For \(P\),

\[
\mu(P\text{-OO})
=
\{2v-L:\lceil L/2\rceil\le v\le L-1\},
\]

hence every moment satisfies

\[
0\le\mu\le L-2.
\]

For \(M\),

\[
\mu(M\text{-OO})
=
\{2v+L:0\le v\le\lfloor(L-2)/2\rfloor\},
\]

hence every moment satisfies

\[
L\le\mu\le2L-2.
\]

Thus:

- \(P\)-OO has no signature with moment \(\ge L\);
- \(M\)-OO has no signature with moment \(<L\);
- \(Z\)-OO contains signatures on both sides of the threshold \(L\)
  (for \(L\ge5\), use \(v=0\) and \(v=L-1\)).

So the three OO families are pairwise distinct.

They cannot equal any O family because OO contains a coefficient \(+2\)
signature (take \(u=w=v>0\) in \(Z\), and the corresponding admissible diagonal
points in the nonzero-curvature cases whenever available; when parity removes a
particular diagonal, a genuine two-depth positive signature still separates the
set from the unary-only O families). They cannot equal C or mixed families
because OO signatures have no negative coefficients.

---

## 5. All-active families

For every all-active signature

\[
\sigma=e_u-2e_v+e_w,
\]

the moment is exactly the curvature equation:

\[
\mu(\sigma)=u-2v+w.
\]

Hence

\[
\mu(Z\text{-A})=\{0\},
\]

\[
\mu(P\text{-A})=\{-L\},
\]

\[
\mu(M\text{-A})=\{+L\}.
\]

For \(Z_s\)-A, the same-block progression has

\[
(u,v,w)=(a,a+h,a+2h),
\]

so again

\[
\mu(Z_s\text{-A})=\{0\}.
\]

The two zero-moment families are nevertheless different:

- \(0\in Z\)-A, because \(u=v=w\) is allowed in the full \(Z\) domain;
- \(0\notin Z_s\)-A, because \(h\ge2\) forces three distinct depths and the
  reduced signature is nonzero. For \(L\ge5\), the witness
  \[
  -2e_2+e_4
  \]
  comes from \((0,2,4)\), so \(Z_s\)-A is nonempty.

Also \(Z\)-A is not the empty family \(E=\{0\}\): for example
\((0,1,2)\in Z\) yields

\[
-2e_1+e_2\ne0.
\]

Therefore the four A-type families and \(E\) are mutually distinct.

They are distinct from the mixed families because the A-type moment is constant
on the entire family, whereas each mixed family has at least two moment values
for \(L\ge5\). They are distinct from O/C/OO families by coefficient/support
shape: a nonzero A family contains the second-difference coefficient structure,
not a purely unary or purely nonnegative OO structure.

---

## 6. Global pairwise distinctness

Partition the nineteen families into the following structural groups:

1. \(E\);
2. \(Z_s\)-A, Z-A, P-A, M-A;
3. Z-O, P-O, M-O;
4. Z-C, P-C, M-C;
5. Z-M, P-M, \(P_t\)-M, M-M, \(M_t\)-M;
6. Z-OO, P-OO, M-OO.

Sections 2–5 prove pairwise distinctness inside every group.

Across groups:

- E is the only singleton containing only the zero signature;
- O families contain only \(+1\) unary signatures (and possibly zero);
- C families contain only \(-2\) unary signatures (and possibly zero);
- mixed families contain genuine \((+1,-2)\) two-depth signatures and have the
  moment regimes (ZM), (PM), (MM);
- OO families have only nonnegative coefficients and contain multi-depth or
  doubled-positive signatures;
- nonzero A families have the all-active second-difference structure and a
  constant moment in \(\{0,-L,+L\}\), with the \(Z_s\)/Z distinction resolved by
  zero membership.

Hence no family in one group can equal a family in another.

Therefore:

\[
\boxed{
\text{For every }L\ge5,\text{ the nineteen stable complete reduced support
families are pairwise distinct.}
}
\]

This removes the previous finite-range shape-spectrum residue.

---

## 7. Falsification layer

The proof is symbolic. A machine enumeration should still be retained only as a
falsification layer:

- enumerate the six domains;
- construct each complete reduced support set;
- verify the diagnostic identities above;
- verify all \(19\choose2\) pairs are unequal.

The prior finite checks through \(L=60\) are consistent with this proof but are
not used as proof steps.
