# Paper 4 — Six-Domain / 19-Family Proof Closure

**Version:** v1.1  
**Date:** 2026-08-28  
**Status:** sandbox proof closure; **complete written proof with explicit pairwise-distinctness certificate, pending independent clean-room audit before canonical promotion**.  
**Scope:** one unresolved role, uniform block length \(L\), Abelian squares with half-period \(K\ge2\).  
**Novelty:** not addressed here; remains `NOVELTY_UNRESOLVED`.

---

## 0. Closure claim

This document closes the mathematical proof obligations for the current Six-Domain / 19-Family theorem candidate.

The proof itself does **not** rely on the supplied verifier. The verifier is only a falsification layer.

The main theorem proved below is:

> **Six-Domain Exact Support Classification.**  
> Let \(L\ge5\). In a uniform \(L\)-block system with one unresolved role \(X\), every Abelian-square support constraint belongs to exactly one of six geometric carry domains. Across all possible occurrence masks these domains allow 34 physically realizable domain/role patterns. Quotienting those patterns by equality of their complete reduced \(X\)-support sets gives exactly **19** distinct support families. Their cardinalities are the closed formulas in Table 1.

The theorem concerns the **support layer** only. Assigned blocks contribute affine target values and are intentionally outside this classification.

---

# 1. Definitions

Let the three cutpoints of a candidate Abelian square be

\[
t_0=s,\qquad t_1=s+K,\qquad t_2=s+2K,
\]

where \(K\ge2\).

Every cutpoint has a unique uniform-block decomposition

\[
t_j=b_jL+i_j,\qquad 0\le i_j<L.
\]

Let

\[
\chi(b)=
\begin{cases}
1,&\text{if macro block }b\text{ is an unresolved }X\text{-block},\\
0,&\text{if it is assigned}.
\end{cases}
\]

Let \(x_i=P_X(i)\) denote the unresolved prefix state at local depth \(i\). We treat

\[
x_0=0
\]

as fixed and move it into the affine target.

The unresolved support signature of the square equation is therefore

\[
\sigma=
\operatorname{red}\left(
\chi(b_0)x_{i_0}
-2\chi(b_1)x_{i_1}
+\chi(b_2)x_{i_2}
\right),
\]

where `red` removes \(x_0\), combines equal depths, and deletes zero coefficients.

This definition handles the **zero signature** explicitly:

\[
\sigma=0
\]

is a legitimate support object. It means that the candidate constraint is decided entirely by assigned target data.

---

# 2. Lemma 1 — carry normal form

Write

\[
K=qL+r,\qquad 0\le r<L.
\]

Define

\[
c_j=
\left\lfloor\frac{i_j+r}{L}\right\rfloor.
\]

Because \(0\le i_j,r<L\),

\[
c_j\in\{0,1\}.
\]

Then

\[
t_{j+1}
=t_j+K
=(b_j+q)L+(i_j+r),
\]

so

\[
\boxed{i_{j+1}=i_j+r-Lc_j}
\]

and

\[
\boxed{b_{j+1}-b_j=q+c_j.}
\]

For a square only \(c_0,c_1\) are needed. Put

\[
g_1=b_1-b_0,\qquad g_2=b_2-b_1.
\]

Then

\[
g_1=q+c_0,\qquad g_2=q+c_1.
\]

Hence

\[
\boxed{\delta:=g_2-g_1=c_1-c_0\in\{-1,0,+1\}.}
\]

This proves the curvature trichotomy directly from Euclidean carry arithmetic.

---

# 3. Lemma 2 — local lattice normal form

Put

\[
a=i_0,\qquad h=i_1-i_0.
\]

Since

\[
t_0-2t_1+t_2=0,
\]

we have

\[
L(b_0-2b_1+b_2)+(i_0-2i_1+i_2)=0.
\]

But

\[
b_0-2b_1+b_2=g_2-g_1=\delta.
\]

Therefore

\[
i_0-2i_1+i_2=-\delta L,
\]

so

\[
\boxed{
i_0=a,\qquad
i_1=a+h,\qquad
i_2=a+2h-\delta L.
}
\]

Also

\[
K=t_1-t_0=g_1L+h.
\]

Thus, for fixed \(g_1,\delta\), the exact local domain is

\[
D_{g_1,\delta}(L)=
\left\{
(a,h):
0\le a,a+h,a+2h-\delta L<L,\;
g_1L+h\ge2
\right\}.
\]

No approximation has been made.

---

# 4. The Six-Domain Theorem

The pair \((q,c_0c_1)\) gives all possibilities.

### Case 1: \(q=0,\;c_0c_1=00\)

Then

\[
g_1=g_2=0,\qquad \delta=0.
\]

All three cutpoints lie in the same macro block. Since \(K=h\ge2\), the domain is

\[
Z_s=
\{(a,h):h\ge2,\;0\le a<a+h<a+2h<L\}.
\]

### Case 2: \(q=0,\;01\)

Then

\[
g_1=0,\quad g_2=1,\quad\delta=+1.
\]

This is the **truncated positive** domain \(P_t\).

### Case 3: \(q=0,\;10\)

Then

\[
g_1=1,\quad g_2=0,\quad\delta=-1.
\]

This is the **truncated negative** domain \(M_t\).

### Case 4: zero curvature outside \(Z_s\)

If \(c_0=c_1\) and the case is not \(q=0,00\), then

\[
\delta=0
\]

and the full local domain is

\[
Z=\{(u,v,w):u+w=2v,\;0\le u,v,w<L\}.
\]

The \(K\ge2\) threshold is automatic for \(L\ge5\): in the only potentially small representative \(g_1=1\), the local relation bounds
\[
h\ge-\left\lfloor\frac{L-1}{2}\right\rfloor,
\]
hence
\[
K=L+h\ge\left\lceil\frac{L+1}{2}\right\rceil\ge3.
\]

### Case 5: full positive curvature

For \(\delta=+1\) with \(g_1\ge1\), the full local triple set is

\[
P=
\{(u,v,w):u+w=2v-L,\;0\le u,v,w<L\}.
\]

Here \(h\ge1\), so already for \(g_1=1\),

\[
K=L+h\ge L+1.
\]

### Case 6: full negative curvature

For \(\delta=-1\) outside the truncated \(g_1=1\) case, we have \(g_1\ge2\), and

\[
M=
\{(u,v,w):u+w=2v+L,\;0\le u,v,w<L\}.
\]

Since \(h\ge1-L\),

\[
K=2L+h\ge L+1.
\]

Thus every square belongs to exactly one of

\[
\boxed{Z_s,\;P_t,\;M_t,\;Z,\;P,\;M.}
\]

That proves completeness of the six-domain classification.

---

# 5. Lemma 3 — the two truncated domains differ by one point

## Positive side

In \(P\),

\[
i_2=a+2h-L\ge0
\]

forces \(h\ge1\).

The truncated domain \(P_t\) has \(g_1=0\), so

\[
K=h\ge2.
\]

Therefore \(P_t\) removes exactly the \(h=1\) part of \(P\).

If \(h=1\), then

\[
a+2-L\ge0\quad\Rightarrow\quad a\ge L-2,
\]

while

\[
a+1<L\quad\Rightarrow\quad a\le L-2.
\]

Hence \(a=L-2\), giving the single triple

\[
\boxed{p^+=(L-2,L-1,0).}
\]

Thus

\[
\boxed{P_t=P\setminus\{p^+\}.}
\]

## Negative side

In \(M\), the smallest possible \(h\) is \(1-L\), realized only when

\[
a=L-1,
\]

which gives

\[
\boxed{p^-=(L-1,0,1).}
\]

The truncated domain \(M_t\) has \(g_1=1\), so

\[
K=L+h\ge2\quad\Longleftrightarrow\quad h\ge2-L.
\]

Therefore

\[
\boxed{M_t=M\setminus\{p^-\}.}
\]

This proves the one-point truncation lemma.

---

# 6. Lemma 4 — exactly 34 physically realizable domain/role patterns

The three role bits are not independent when two cutpoints lie in the same macro block.

### \(Z_s\)

Here

\[
b_0=b_1=b_2,
\]

so only

\[
000,\quad111
\]

are possible: **2** patterns.

### \(P_t\)

Here

\[
b_0=b_1,
\]

hence

\[
\chi_0=\chi_1.
\]

The possible patterns are

\[
000,\;001,\;110,\;111:
\]

**4** patterns.

### \(M_t\)

Here

\[
b_1=b_2,
\]

so

\[
\chi_1=\chi_2.
\]

The possible patterns are

\[
000,\;100,\;011,\;111:
\]

**4** patterns.

### Full \(Z,P,M\)

The three macro blocks are distinct, so all eight binary role patterns are possible in each domain.

Therefore

\[
\boxed{2+4+4+8+8+8=34.}
\]

For \(L\ge5\), every one of these 34 patterns has a geometric realization; a global occurrence mask can assign the finitely many involved blocks arbitrarily subject to the equal-block consistency above.

---

# 7. Lemma 5 — the exact 34→19 quotient

Define the projection

\[
\pi_\chi(u,v,w)
=
\operatorname{red}
\left(
\chi_0x_u-2\chi_1x_v+\chi_2x_w
\right).
\]

A **family** is the complete image of one domain/role pattern under \(\pi_\chi\).

## 7.1 All-assigned patterns

For \(\chi=000\),

\[
\pi_{000}=0
\]

in every domain. All six all-assigned patterns therefore give one global family

\[
E=\{0\}.
\]

## 7.2 Outer reversal in full domains

Each of \(Z,P,M\) is invariant under

\[
(u,v,w)\mapsto(w,v,u).
\]

The two outer coefficients are both \(+1\). Hence

\[
\pi_{001}(D)=\pi_{100}(D),
\]

and

\[
\pi_{011}(D)=\pi_{110}(D)
\]

for \(D\in\{Z,P,M\}\).

Thus each full domain has exactly the six role-orbits

\[
000,\quad
001/100,\quad
010,\quad
011/110,\quad
101,\quad
111.
\]

After removing the already-global \(000\) family, each full domain contributes at most five new families.

## 7.3 Positive truncation

The deleted point is

\[
p^+=(L-2,L-1,0).
\]

The realizable \(P_t\) role patterns are \(000,001,110,111\).

### Pattern 001

At \(p^+\),

\[
\pi_{001}(p^+)=x_0=0.
\]

But \(0\) is already realized inside \(P_t\), for example at

\[
(L-4,L-2,0)
\]

using \(h=2\). Therefore

\[
\pi_{001}(P_t)=\pi_{001}(P).
\]

### Pattern 111

At \(p^+\),

\[
\pi_{111}(p^+)=x_{L-2}-2x_{L-1}.
\]

The reversed triple

\[
(0,L-1,L-2)
\]

belongs to \(P_t\) for \(L\ge5\) and gives exactly the same reduced signature. Hence

\[
\pi_{111}(P_t)=\pi_{111}(P).
\]

### Pattern 110

At \(p^+\),

\[
\pi_{110}(p^+)=x_{L-2}-2x_{L-1}.
\]

For a \(110\) projection the coefficient \(-2\) uniquely fixes \(v=L-1\), and the coefficient \(+1\) uniquely fixes \(u=L-2\). Therefore any realization of this signature must have

\[
h=v-u=1,
\]

which is precisely the excluded point. Hence this signature is not present in \(P_t\).

Therefore

\[
\boxed{
\pi_{110}(P_t)
=
\pi_{110}(P)
\setminus
\{x_{L-2}-2x_{L-1}\}.
}
\]

So \(P_t\) contributes **exactly one** genuinely new family.

## 7.4 Negative truncation

The deleted point is

\[
p^-=(L-1,0,1).
\]

The realizable patterns are \(000,100,011,111\).

### Pattern 100

At \(p^-\),

\[
\pi_{100}(p^-)=x_{L-1}.
\]

This is already realized in \(M_t\) by

\[
(L-1,1,3),
\]

which is valid for every \(L\ge5\) and corresponds to \(K=2\). Therefore

\[
\pi_{100}(M_t)=\pi_{100}(M).
\]

### Pattern 111

At \(p^-\),

\[
\pi_{111}(p^-)=x_{L-1}+x_1.
\]

The reversed triple

\[
(1,0,L-1)
\]

belongs to \(M_t\) and has the same signature. Hence

\[
\pi_{111}(M_t)=\pi_{111}(M).
\]

### Pattern 011

At \(p^-\),

\[
\pi_{011}(p^-)=x_1.
\]

For a \(011\) projection, obtaining the singleton \(+x_1\) forces the middle depth to be \(0\) and the final depth to be \(1\). The equation

\[
u+1=L
\]

then forces \(u=L-1\), i.e. the deleted point itself.

Therefore

\[
\boxed{
\pi_{011}(M_t)
=
\pi_{011}(M)
\setminus
\{x_1\}.
}
\]

So \(M_t\) also contributes exactly one genuinely new family.

## 7.5 Upper count

We have therefore reduced the 34 patterns to at most

\[
1
+1
+5
+(5+1)
+(5+1)
=
\boxed{19}
\]

families:

- one global empty family;
- one nonempty \(Z_s\) family;
- five nonempty full-\(Z\) families;
- five nonempty full-\(P\) families plus one truncated-\(P\) mixed family;
- five nonempty full-\(M\) families plus one truncated-\(M\) mixed family.

It remains only to prove that these 19 are pairwise distinct.

---

# 8. Exact descriptions of the 19 families

Use \(x_0=0\) throughout.

For the three full domains, write:

\[
Z:\quad u+w=2v,
\]

\[
P:\quad u+w=2v-L,
\]

\[
M:\quad u+w=2v+L.
\]

The canonical 19 families are:

### Global
\[
E=\{0\}.
\]

### Same-block zero curvature
\[
Z_s\!-\!A=
\{
x_a-2x_{a+h}+x_{a+2h}:
h\ge2,\;a+2h<L
\}.
\]

### Full zero curvature
\[
Z\!-\!O=\{x_w:(u,v,w)\in Z\},
\]

\[
Z\!-\!C=\{-2x_v:(u,v,w)\in Z\},
\]

\[
Z\!-\!M=\{-2x_v+x_w:(u,v,w)\in Z\},
\]

\[
Z\!-\!OO=\{x_u+x_w:(u,v,w)\in Z\},
\]

\[
Z\!-\!A=\{x_u-2x_v+x_w:(u,v,w)\in Z\}.
\]

### Full positive curvature
\[
P\!-\!O=\{x_w:(u,v,w)\in P\},
\]

\[
P\!-\!C=\{-2x_v:(u,v,w)\in P\},
\]

\[
P\!-\!M=\{-2x_v+x_w:(u,v,w)\in P\},
\]

\[
P\!-\!OO=\{x_u+x_w:(u,v,w)\in P\},
\]

\[
P\!-\!A=\{x_u-2x_v+x_w:(u,v,w)\in P\}.
\]

The truncated positive mixed family is

\[
Pt\!-\!M
=
P\!-\!M
\setminus
\{x_{L-2}-2x_{L-1}\}.
\]

### Full negative curvature
\[
M\!-\!O=\{x_u:(u,v,w)\in M\},
\]

\[
M\!-\!C=\{-2x_v:(u,v,w)\in M\},
\]

\[
M\!-\!M=\{-2x_v+x_w:(u,v,w)\in M\},
\]

\[
M\!-\!OO=\{x_u+x_w:(u,v,w)\in M\},
\]

\[
M\!-\!A=\{x_u-2x_v+x_w:(u,v,w)\in M\}.
\]

Finally,

\[
Mt\!-\!M
=
M\!-\!M
\setminus
\{x_1\}.
\]

These descriptions already contain the zero-signature cases correctly via \(x_0=0\) and coefficient reduction.

---

# 9. Cardinality theorem

## Table 1

| family | description | exact cardinality | \(L=40\) |
|---|---|---:|---:|
| `E` | empty support | 1 | 1 |
| `Zs-A` | same-block, zero-curvature, all-active | ⌊(L−3)²/4⌋ | 342 |
| `Z-O` | full zero-curvature, one outer X | L | 40 |
| `Z-C` | full zero-curvature, centre X | L | 40 |
| `Z-M` | full zero-curvature, centre+one outer X | ⌈L²/2⌉ | 800 |
| `Z-OO` | full zero-curvature, both outer X | ⌊(L+1)²/4⌋ | 420 |
| `Z-A` | full zero-curvature, all-active | ⌊(L−1)²/4⌋+1 | 381 |
| `P-O` | full positive-curvature, one outer X | L−1 | 39 |
| `P-C` | full positive-curvature, centre X | ⌊L/2⌋ | 20 |
| `P-M` | full positive-curvature, centre+one outer X | ⌊L²/4⌋ | 400 |
| `P-OO` | full positive-curvature, both outer X | C(⌊L/2⌋+1,2) | 210 |
| `P-A` | full positive-curvature, all-active | C(⌊L/2⌋+1,2) | 210 |
| `Pt-M` | short positive-curvature truncated mixed family | ⌊L²/4⌋−1 | 399 |
| `M-O` | full negative-curvature, one outer X | L−1 | 39 |
| `M-C` | full negative-curvature, centre X | ⌊L/2⌋ | 20 |
| `M-M` | full negative-curvature, centre+one outer X | ⌊L²/4⌋ | 400 |
| `M-OO` | full negative-curvature, both outer X | C(⌊L/2⌋+1,2) | 210 |
| `M-A` | full negative-curvature, all-active | C(⌊L/2⌋+1,2) | 210 |
| `Mt-M` | short negative-curvature truncated mixed family | ⌊L²/4⌋−1 | 399 |

We now prove the formulas.

---

## 9.1 \(E\)

Immediate:

\[
|E|=1.
\]

---

## 9.2 \(Z_s-A\)

For each step \(h\ge2\), the start \(a\) has

\[
0\le a\le L-1-2h,
\]

so there are \(L-2h\) choices.

Therefore

\[
|Z_s-A|
=
\sum_{h=2}^{\lfloor(L-1)/2\rfloor}(L-2h).
\]

Evaluating separately for even and odd \(L\), or by a standard arithmetic-series identity,

\[
\boxed{
|Z_s-A|
=
\left\lfloor\frac{(L-3)^2}{4}\right\rfloor.
}
\]

The map \((a,h)\mapsto\) reduced signature is injective: the middle coefficient \(-2\) identifies \(a+h\), the final \(+1\) identifies \(a+2h\), and if the first \(+1\) is absent then \(a=0\). Thus the domain-point count is the family cardinality.

---

## 9.3 \(Z-O\) and \(Z-C\)

The diagonal triple

\[
(d,d,d)
\]

exists for every \(0\le d<L\).

Hence

\[
Z-O=\{0,x_1,\ldots,x_{L-1}\},
\]

and

\[
Z-C=\{0,-2x_1,\ldots,-2x_{L-1}\}.
\]

Therefore

\[
\boxed{|Z-O|=|Z-C|=L.}
\]

---

## 9.4 \(Z-M\)

For fixed middle depth \(v\), the final depth \(w\) must satisfy

\[
0\le 2v-w<L.
\]

Thus

\[
\max(0,2v-L+1)\le w\le\min(L-1,2v).
\]

The number of choices is

\[
2\min(v,L-1-v)+1.
\]

The reduced form \(-2x_v+x_w\) uniquely recovers \((v,w)\): if \(v=w>0\) it is \(-x_v\); if \(w=0\) it is \(-2x_v\); otherwise the two coefficients identify both depths. The only zero case is \(v=w=0\).

Hence

\[
|Z-M|
=
\sum_{v=0}^{L-1}
\bigl(2\min(v,L-1-v)+1\bigr)
=
\boxed{\left\lceil\frac{L^2}{2}\right\rceil}.
\]

---

## 9.5 \(Z-OO\)

The midpoint condition says that the unordered outer pair \(\{u,w\}\) has equal parity.

Let

\[
e=\left\lceil\frac L2\right\rceil,\qquad
o=\left\lfloor\frac L2\right\rfloor
\]

be the numbers of even and odd local depths.

The number of unordered pairs with repetition within the two parity classes is

\[
\binom{e+1}{2}+\binom{o+1}{2}
=
\boxed{
\left\lfloor\frac{(L+1)^2}{4}\right\rfloor.
}
\]

The projection \(x_u+x_w\) is injective on unordered pairs after \(x_0=0\): a diagonal gives coefficient \(2\), two positive distinct depths give two \(+1\) terms, and a pair \(\{0,w\}\) gives the unique singleton \(x_w\).

Thus this pair count is exactly \(|Z-OO|\).

---

## 9.6 \(Z-A\)

For an off-diagonal outer pair \(u<w\), the midpoint is strictly between them, so the coefficient \(-2\) identifies the midpoint and the \(+1\) coefficient(s) recover the endpoints. Hence all off-diagonal unordered pairs give distinct signatures.

All \(L\) diagonal pairs

\[
u=v=w
\]

collapse to the same zero signature.

Therefore

\[
|Z-A|
=
|Z-OO|-L+1
\]

and thus

\[
\boxed{
|Z-A|
=
\left\lfloor\frac{(L-1)^2}{4}\right\rfloor+1.
}
\]

This is the place where the zero signature is load-bearing: it replaces \(L\) diagonal raw configurations by one reduced family element.

---

# 10. Positive-curvature cardinalities

The equation is

\[
u+w=2v-L.
\]

It forces

\[
v\ge\left\lceil\frac L2\right\rceil
\]

and

\[
0\le u+w\le L-2.
\]

## 10.1 \(P-O\)

Every \(w\in\{0,\ldots,L-2\}\) occurs: choose \(v=L-1\) and

\[
u=L-2-w.
\]

No \(w=L-1\) is possible because \(u+w\le L-2\).

Hence

\[
P-O=\{0,x_1,\ldots,x_{L-2}\},
\]

so

\[
\boxed{|P-O|=L-1.}
\]

## 10.2 \(P-C\)

The possible middle depths are exactly

\[
v=\left\lceil\frac L2\right\rceil,\ldots,L-1.
\]

Therefore

\[
\boxed{|P-C|=\left\lfloor\frac L2\right\rfloor.}
\]

## 10.3 \(P-M\)

For fixed \(v\),

\[
0\le w\le2v-L.
\]

Moreover \(w<v\), so no same-depth coefficient cancellation is possible. The form \(-2x_v+x_w\) uniquely identifies \((v,w)\).

Thus

\[
|P-M|
=
\sum_{v=\lceil L/2\rceil}^{L-1}(2v-L+1)
=
\boxed{\left\lfloor\frac{L^2}{4}\right\rfloor}.
\]

## 10.4 \(P-OO\)

The unordered outer pair satisfies

\[
u+w\le L-2
\]

and

\[
u+w\equiv L\pmod 2.
\]

Let \(n=\lfloor L/2\rfloor\).

For even \(L=2n\), the possible sums are

\[
0,2,\ldots,2n-2,
\]

and the number of unordered pairs at sum \(2j\) is \(j+1\).

For odd \(L=2n+1\), the possible sums are

\[
1,3,\ldots,2n-1,
\]

and again the number at the \(j\)-th sum is \(j+1\).

Therefore

\[
\boxed{
|P-OO|
=
\sum_{j=0}^{n-1}(j+1)
=
\binom{n+1}{2}.
}
\]

## 10.5 \(P-A\)

For every admissible unordered outer pair, the middle depth

\[
v=\frac{u+w+L}{2}
\]

is uniquely determined.

If \(u\ne w\), the reduced signature identifies the two outer depths and the \(-2\) midpoint. If \(u=w\), then \(v=u+L/2\), which can occur only for even \(L\), and the reduced form is \(2x_u-2x_v\), still uniquely identifying the pair.

Hence the projection is injective on admissible unordered pairs, and

\[
\boxed{
|P-A|
=
\binom{\lfloor L/2\rfloor+1}{2}.
}
\]

## 10.6 \(Pt-M\)

By Lemma 5,

\[
Pt-M
=
P-M\setminus
\{x_{L-2}-2x_{L-1}\}.
\]

Therefore

\[
\boxed{
|Pt-M|
=
\left\lfloor\frac{L^2}{4}\right\rfloor-1.
}
\]

---

# 11. Negative-curvature cardinalities

The equation is

\[
u+w=2v+L.
\]

It forces

\[
0\le v\le\left\lfloor\frac{L-2}{2}\right\rfloor
\]

and

\[
L\le u+w\le2L-2.
\]

## 11.1 \(M-O\)

No outer depth can be \(0\). Conversely every \(u\in\{1,\ldots,L-1\}\) occurs: choose

\[
v=0,\qquad w=L-u.
\]

Thus

\[
M-O=\{x_1,\ldots,x_{L-1}\},
\]

so

\[
\boxed{|M-O|=L-1.}
\]

## 11.2 \(M-C\)

The middle depths are

\[
0,\ldots,\left\lfloor\frac{L-2}{2}\right\rfloor.
\]

Depth \(0\) gives the zero signature. Hence the number of distinct signatures is

\[
\left\lfloor\frac{L-2}{2}\right\rfloor+1
=
\boxed{\left\lfloor\frac L2\right\rfloor}.
\]

## 11.3 \(M-M\)

For fixed \(v\),

\[
2v+1\le w\le L-1.
\]

The projection \(-2x_v+x_w\) is injective on these pairs: for \(v=0\) it gives the singleton \(x_w\), while for \(v>0\) the two signed coefficients identify the depths.

Therefore

\[
|M-M|
=
\sum_{v=0}^{\lfloor(L-2)/2\rfloor}(L-1-2v)
=
\boxed{\left\lfloor\frac{L^2}{4}\right\rfloor}.
\]

## 11.4 \(M-OO\)

The unordered outer pairs satisfy

\[
u+w\ge L,\qquad u+w\equiv L\pmod2.
\]

Reflection

\[
(u,w)\mapsto(L-1-u,L-1-w)
\]

is a bijection onto the positive-curvature low-sum pairs. Therefore

\[
\boxed{
|M-OO|
=
\binom{\lfloor L/2\rfloor+1}{2}.
}
\]

## 11.5 \(M-A\)

The same reflection/count applies, and the all-active projection is injective on the admissible unordered outer pairs exactly as in the positive case.

Thus

\[
\boxed{
|M-A|
=
\binom{\lfloor L/2\rfloor+1}{2}.
}
\]

## 11.6 \(Mt-M\)

By Lemma 5,

\[
Mt-M=M-M\setminus\{x_1\}.
\]

Therefore

\[
\boxed{
|Mt-M|
=
\left\lfloor\frac{L^2}{4}\right\rfloor-1.
}
\]

This completes all 19 cardinality proofs.

---

# 12. Lemma 6 — the 19 families are pairwise distinct

The explicit descriptions above already give structural separation. A compact certificate is obtained from two invariants:

1. the set of **coefficient-shape multisets** occurring in a family after reduction;
2. the exact cardinality from Table 1.

For even \(L\ge6\), the only pairs sharing the same coefficient-shape spectrum are:

- \(P-O\) and \(Z-O\), with sizes \(L-1\) and \(L\);
- \(Pt-M\) and \(P-M\), differing by exactly one;
- \(Mt-M\) and \(M-M\), differing by exactly one;
- \(Z-C\) and \(M-C\), with sizes \(L\) and \(L/2\);
- \(Z-OO\) and \(P-OO\), with sizes
  \[
  \frac{L}{2}\left(\frac{L}{2}+1\right)
  \quad\text{and}\quad
  \frac12\frac{L}{2}\left(\frac{L}{2}+1\right).
  \]

All are distinct.

For odd \(L=2n+1\ge7\), the only additional same-spectrum pair is \(Z_s-A\) versus \(P-A\). Their sizes are

\[
(n-1)^2
\]

and

\[
\frac{n(n+1)}2.
\]

Equality would imply

\[
n^2-5n+2=0,
\]

whose discriminant \(17\) is not a square, so no integer \(n\) solves it.

All other same-spectrum pairs are separated exactly as above.

The boundary case \(L=5\) is finite and can be read directly from the exact descriptions:

- \(E\): size \(1\), only zero;
- \(Z_s-A\): size \(1\), nonzero mixed signature;
- \(P-O\): size \(4\), zero/+1 singletons;
- \(M-O\): size \(4\), +1 singletons but no zero;
- the remaining families are separated by their signed coefficient shapes and the Table-1 sizes.

Thus no two of the 19 canonical families are equal for any \(L\ge5\).

Combined with the upper bound of 19 from Lemma 5, this proves that the quotient has **exactly 19** classes.

---

# 13. Main theorem

Combining Lemmas 1–6:

> ## Theorem — Six-Domain Exact Support Classification
>
> Let \(L\ge5\), and consider Abelian-square candidates of half-period \(K\ge2\) in a uniform \(L\)-block system with one unresolved role \(X\).
>
> 1. Every candidate belongs to exactly one of six carry domains
>    \[
>    Z_s,\;P_t,\;M_t,\;Z,\;P,\;M.
>    \]
> 2. Across arbitrary occurrence masks, these domains admit exactly 34 physically consistent domain/role patterns.
> 3. Under equality of complete reduced \(X\)-support sets, the 34 patterns have exactly **19** equivalence classes.
> 4. The 19 classes are precisely those in Table 1 and have the stated closed cardinalities.
> 5. The zero signature is included explicitly and is responsible for the diagonal collapse in \(Z-A\).
> 6. The only \(K\ge2\) truncations of the full nonzero-curvature domains are the two single boundary triples
>    \[
>    p^+=(L-2,L-1,0),\qquad
>    p^-=(L-1,0,1).
>    \]

No computational assumption enters the proof.

---

# 14. Small-\(L\) boundary

The exact realizable family counts under the same semantics are:

| \(L\) | number of realizable equality classes |
|---:|---:|
| 2 | 9 |
| 3 | 15 |
| 4 | 19 |
| 5 | 19 |
| 6 | 19 |
| 7 | 19 |

Thus \(L=2,3\) are genuinely more degenerate.

At \(L=4\), the numerical count has already reached 19, but the stable \(L\ge5\) partition has not: \(Z_s\) is still empty because no within-block half-period \(h\ge2\) fits.

At \(L=5\), the first \(Z_s\) window appears:

\[
(a,h)=(0,2),
\]

and the stable 19-family theorem begins.

The condition \(L\ge5\) is therefore natural rather than cosmetic.

---

# 15. What “minimal” is now proved to mean

The theorem proves:

> **Minimal under exact family-set equality.**  
> Any catalogue whose only compression rule is “identify two domain/role cases when their complete reduced support sets are equal” needs at least 19 entries for \(L\ge5\).

It does **not** prove:

- a 19-state minimal automaton;
- a 19-branch optimal implementation;
- a minimal theorem presentation;
- a complexity lower bound.

Indeed, the six-domain theorem is conceptually smaller than the 19-entry catalogue.

---

# 16. Verification layer

The supplied checker is intentionally separate from the proof.

It performs:

- all 19 cardinality checks for \(L=5,\ldots,100,128,160,200\);
- pairwise family distinctness checks on the same range;
- exact six-domain and one-point-truncation checks;
- the critical four truncation-equality checks used in the 34→19 proof;
- a direct absolute-window attack over every binary mask of six blocks for \(L=5,\ldots,10\), classifying each square window independently through Euclidean carries and checking that its signature belongs to the theorem-predicted family.

Delivered result:

\[
\boxed{\texttt{PASS}}
\]

with no detected mismatch.

The computation is supporting evidence only; the theorem has already been proved above from the definitions.

---


# Appendix A — explicit distinctness certificate

For a reduced signature, let its **coefficient shape** be the multiset of nonzero coefficients after forgetting the prefix depths. For example,

\[
x_i-2x_j+x_k
\]

has shape \((+1,-2,+1)\), while a zero signature has shape \(\varnothing\).

The exact family descriptions in Sections 8–11 give the following spectra. Every listed shape is realized throughout the stated parity range.

## A.1 Even \(L\ge6\)

| family | coefficient-shape spectrum | cardinality |
|---|---|---:|
| `E` | ∅ | 1 |
| `Zs-A` | (-2,+1) (-2,+1,+1) | ⌊(L−3)²/4⌋ |
| `Z-O` | ∅ (+1) | L |
| `Z-C` | ∅ (-2) | L |
| `Z-M` | ∅ (-2) (-2,+1) (-1) | ⌈L²/2⌉ |
| `Z-OO` | ∅ (+1) (+1,+1) (+2) | ⌊(L+1)²/4⌋ |
| `Z-A` | ∅ (-2,+1) (-2,+1,+1) | ⌊(L−1)²/4⌋+1 |
| `P-O` | ∅ (+1) | L−1 |
| `P-C` | (-2) | ⌊L/2⌋ |
| `P-M` | (-2) (-2,+1) | ⌊L²/4⌋ |
| `P-OO` | ∅ (+1) (+1,+1) (+2) | C(⌊L/2⌋+1,2) |
| `P-A` | (-2) (-2,+1) (-2,+1,+1) (-2,+2) | C(⌊L/2⌋+1,2) |
| `Pt-M` | (-2) (-2,+1) | ⌊L²/4⌋−1 |
| `M-O` | (+1) | L−1 |
| `M-C` | ∅ (-2) | ⌊L/2⌋ |
| `M-M` | (-2,+1) (+1) | ⌊L²/4⌋ |
| `M-OO` | (+1,+1) (+2) | C(⌊L/2⌋+1,2) |
| `M-A` | (-2,+1,+1) (-2,+2) (+1,+1) (+2) | C(⌊L/2⌋+1,2) |
| `Mt-M` | (-2,+1) (+1) | ⌊L²/4⌋−1 |

Inspection now has a precise meaning: the only repeated spectra are

\[
(P-O,Z-O),\quad
(Pt-M,P-M),\quad
(Mt-M,M-M),\quad
(Z-C,M-C),\quad
(Z-OO,P-OO).
\]

Their sizes are respectively

\[
(L-1,L),\quad
(\lfloor L^2/4\rfloor-1,\lfloor L^2/4\rfloor),
\]

\[
(\lfloor L^2/4\rfloor-1,\lfloor L^2/4\rfloor),
\quad
(L,L/2),
\]

and, writing \(L=2n\),

\[
(n(n+1),\,n(n+1)/2).
\]

Each pair is unequal for \(L\ge6\). Therefore all 19 families are pairwise distinct for even \(L\ge6\).

## A.2 Odd \(L\ge7\)

| family | coefficient-shape spectrum | cardinality |
|---|---|---:|
| `E` | ∅ | 1 |
| `Zs-A` | (-2,+1) (-2,+1,+1) | ⌊(L−3)²/4⌋ |
| `Z-O` | ∅ (+1) | L |
| `Z-C` | ∅ (-2) | L |
| `Z-M` | ∅ (-2) (-2,+1) (-1) | ⌈L²/2⌉ |
| `Z-OO` | ∅ (+1) (+1,+1) (+2) | ⌊(L+1)²/4⌋ |
| `Z-A` | ∅ (-2,+1) (-2,+1,+1) | ⌊(L−1)²/4⌋+1 |
| `P-O` | ∅ (+1) | L−1 |
| `P-C` | (-2) | ⌊L/2⌋ |
| `P-M` | (-2) (-2,+1) | ⌊L²/4⌋ |
| `P-OO` | (+1) (+1,+1) | C(⌊L/2⌋+1,2) |
| `P-A` | (-2,+1) (-2,+1,+1) | C(⌊L/2⌋+1,2) |
| `Pt-M` | (-2) (-2,+1) | ⌊L²/4⌋−1 |
| `M-O` | (+1) | L−1 |
| `M-C` | ∅ (-2) | ⌊L/2⌋ |
| `M-M` | (-2,+1) (+1) | ⌊L²/4⌋ |
| `M-OO` | (+1,+1) | C(⌊L/2⌋+1,2) |
| `M-A` | (-2,+1,+1) (+1,+1) | C(⌊L/2⌋+1,2) |
| `Mt-M` | (-2,+1) (+1) | ⌊L²/4⌋−1 |

The repeated spectra are the same four obvious truncation/projection pairs as above, plus

\[
(Z_s-A,P-A).
\]

Writing \(L=2n+1\), their sizes are

\[
|Z_s-A|=(n-1)^2,
\qquad
|P-A|=\frac{n(n+1)}2.
\]

Equality would imply

\[
2(n-1)^2=n(n+1)
\]

or

\[
n^2-5n+2=0.
\]

The discriminant is \(17\), so there is no integer solution. Thus all 19 families are pairwise distinct for odd \(L\ge7\).

## A.3 Boundary value \(L=5\)

| family | coefficient-shape spectrum | exact size |
|---|---|---:|
| `E` | ∅ | 1 |
| `Zs-A` | (-2,+1) | 1 |
| `Z-O` | ∅ (+1) | 5 |
| `Z-C` | ∅ (-2) | 5 |
| `Z-M` | ∅ (-2) (-2,+1) (-1) | 13 |
| `Z-OO` | ∅ (+1) (+1,+1) (+2) | 9 |
| `Z-A` | ∅ (-2,+1) (-2,+1,+1) | 5 |
| `P-O` | ∅ (+1) | 4 |
| `P-C` | (-2) | 2 |
| `P-M` | (-2) (-2,+1) | 6 |
| `P-OO` | (+1) (+1,+1) | 3 |
| `P-A` | (-2,+1) (-2,+1,+1) | 3 |
| `Pt-M` | (-2) (-2,+1) | 5 |
| `M-O` | (+1) | 4 |
| `M-C` | ∅ (-2) | 2 |
| `M-M` | (-2,+1) (+1) | 6 |
| `M-OO` | (+1,+1) | 3 |
| `M-A` | (-2,+1,+1) (+1,+1) | 3 |
| `Mt-M` | (-2,+1) (+1) | 5 |

No two rows have both the same spectrum and the same size. Hence the 19 sets are pairwise distinct also at \(L=5\).

This replaces any remaining informal “inspection” step in Lemma 6 with an explicit finite certificate derived from the exact family descriptions. The proof of distinctness is therefore complete for every \(L\ge5\).


# 17. Promotion status

### Mathematically closed in this sandbox

- carry normal form;
- six-domain completeness;
- exact \(K\ge2\) boundary handling;
- role-consistency count \(34\);
- exact 34→19 quotient;
- all 19 closed cardinality formulas;
- pairwise distinctness;
- zero-signature handling;
- natural \(L\ge5\) theorem boundary.

### Still required before canonical promotion

1. **independent clean-room proof audit** by Claude/another route;
2. literature/novelty comparison separately;
3. terminology decision (`positive/negative curvature` sign convention must match the manuscript consistently).

### Not implied

Nothing here proves:

- existence of a complete AEF;
- impossibility at \(L=40\);
- Mäkelä's conjecture;
- novelty.

`Mäkelä = OPEN` and `NOVELTY_UNRESOLVED` remain unchanged.
