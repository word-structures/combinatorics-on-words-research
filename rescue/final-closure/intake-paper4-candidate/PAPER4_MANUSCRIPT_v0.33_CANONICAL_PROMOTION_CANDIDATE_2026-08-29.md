# Paper 4 — Exact Occurrence Geometry for Staged Ternary Abelian-Square Avoidance

**Working manuscript v0.33 — canonical-promotion candidate — 2026-08-29**  
**Status:** sandbox integrated draft; not canonical; not submission-ready.  
**Editorial base:** sandbox v0.32a after independent referee audit; ultimately derived from `PAPER4_MANUSCRIPT_v0.30_2026-08-27.md`.  
**Problem status:** Mäkelä's ternary period-\(\ge 2\) Abelian-square problem remains **OPEN**.  
**Novelty status:** `NOVELTY_UNRESOLVED`.  
**Author(s):** [to be inserted]

---

## Abstract

We study staged uniform block synthesis for the open problem of constructing an
infinite ternary word that avoids every Abelian square \(UV\) with
\(|U|=|V|\ge2\). The macro language is the six-letter morphic fixed point used
by Rao and Rosenfeld, while its six letters are assigned ternary blocks of
length \(40\) with a rank-one lifted incidence profile compatible with their
long-period parent/template framework.

The main structural result is an exact compiler for Abelian-square constraints
under partial assignment. If one block role \(X\) remains unresolved and the
uniform block length is \(L\ge5\), Euclidean carry arithmetic partitions every
square occurrence into six geometric domains. These domains admit exactly
\(34\) physically realizable domain/occurrence patterns, whose complete reduced
\(X\)-support sets quotient to exactly \(19\) families with closed
cardinalities. Assigned blocks contribute only affine target values, separating
support geometry from instance data.

The same support/target architecture appears at the adjacent synthesis stages.
The \(E\to A\) compatibility problem is an exact fixed-profile prefix-path
system with a constant support skeleton and \(E\)-dependent targets. For the
\(A,E\to F\) AFE gate, feasibility is exact reachability in the fixed-profile
prefix language. First-hit bad prefixes form a prefix-free cylinder cover, and
an exact frontier-state quotient with multiplicities computes the weighted
first-hit distribution and yields independently checkable UNSAT certificates.

A preregistered exposure-matched finite computation locates the strongest
observed population separation at AFE existence: the tested RX population has
\(0\) AFE witnesses among \(137\) AF-positive pairs, while the quota-matched
canonical population has \(86\) among \(263\). These are finite deterministic
counts, not an impossibility theorem.

The present work does **not** solve Mäkelä's problem. It provides exact
partial-assignment geometry, complete subset gates, and certificate-oriented
reachability tools for continuing the construction search.

---

## 1. Introduction

An Abelian square is a word \(UV\) whose two consecutive halves have the same Parikh vector:
\[
\Psi(U)=\Psi(V).
\]
For the ternary alphabet
\[
\Sigma=\{a,b,c\},
\]
Mäkelä's question asks whether there exists an infinite word avoiding every Abelian square whose half-length is at least two. The length-two repetitions \(aa,bb,cc\) are therefore allowed, while every Abelian square \(UV\) with
\[
|U|=|V|\ge2
\]
must be absent.

Keränen proved that Abelian squares are avoidable over four letters. Rao and Rosenfeld later produced an infinite ternary word avoiding Abelian squares above a finite threshold by coding a six-letter morphic fixed point. Their construction is the natural starting point here. We retain their macro language and change the outer coding.

The project originally developed as a direct finite block search. That viewpoint produced many exact finite exclusion certificates, but it obscured the central mathematical structure: a partial block assignment already determines a large family of Abelian-square constraints. Those constraints should be exhausted **before** another role is added. This leads to the staged principle used throughout the present version:

> **Complete-subset principle.**  
> At each partial-assignment stage, exclude every Abelian square whose minimal macro support uses only roles that have already been assigned.

The principle has three consequences.

First, the actual factor language of the macro fixed point matters. A finite subset of roles may occur only in bounded macro runs, in which case every obstruction supported by that subset is covered by finitely many factor-maximal macro words.

Second, for a uniform block code the positions of the three cutpoints of an Abelian square obey rigid Euclidean carry arithmetic. When only one role remains unresolved, this arithmetic produces a finite exact catalogue of possible unresolved prefix supports.

Third, once the support is separated from the assigned target values, the remaining synthesis problem becomes a constrained path problem. This makes exact reachability and independently checkable UNSAT certificates available without identifying the search algorithm itself with the mathematics.

The paper is organized accordingly. Sections 2--4 set up the fixed morphic core, the rank-one incidence lift, and the finite/long-period certification architecture. Section 5 proves the finite subset-factor gate theorem. Sections 6--8 develop the carry geometry and the six-domain/19-family classification. Section 9 derives the upstream \(E\to A\) constraint system and a suffix obstruction. Sections 10--12 develop AFE reachability and cutset certificates. Section 13 reports the exposure-matched finite computation. Section 14 records mechanism tests that failed to separate the observed populations. The final sections delimit what is and is not established.

No result in this manuscript proves that the desired length-\(40\) six-block coding exists, and no finite negative population is interpreted as a global nonexistence theorem.

### 1.1 Contribution and scope

The mathematical spine is

\[
\boxed{
\text{bounded macro subset language}
\to
\text{carry occurrence geometry}
\to
\text{finite support families}
\to
\text{moving affine targets}
\to
\text{certified prefix reachability}.
}
\]

The first three arrows are theorem-level structural results. The target-loaded
H/RX separation remains a finite computational phenomenon whose mechanism is
not yet proved. Throughout the paper, Mäkelä remains open and novelty claims
remain deliberately unresolved pending specialist literature comparison.

---

## 2. The morphic core

Let
\[
\Gamma=\{a,b,c,d,e,f\}
\]
and define the \(3\)-uniform morphism
\[
h_6:
\begin{cases}
a\mapsto ace,\\
b\mapsto adf,\\
c\mapsto bdf,\\
d\mapsto bdc,\\
e\mapsto afe,\\
f\mapsto bce.
\end{cases}
\]
We work in the factor language
\[
\operatorname{Fact}(h_6^\omega(a)).
\]

The exact length-two factor set is
\[
\mathcal B_2=
\{ac,ad,af,bc,bd,cb,ce,dc,df,ea,eb,fa,fb,fe\}.
\]
The length-three factor set used by the direct period-\(2,\ldots,40\) certifier is
\[
\begin{aligned}
\mathcal B_3=\{&
ace,adf,afe,bce,bdc,bdf,cbc,cbd,cea,ceb,dcb,\\
&dfa,dfb,eac,ead,eaf,ebc,ebd,fad,faf,fbd,fea
\}.
\end{aligned}
\]

A successful outer coding
\[
H:\Gamma\to\Sigma^{40}
\]
would produce the infinite ternary word
\[
H(h_6^\omega(a)).
\]

The use of the fixed factor language is essential to the present construction strategy. We do not require, and do not claim, a universal morphism that preserves Abelian-square-freeness on every source word. Carpi's work gives strong general constraints on Abelian-power-free morphisms; the exact relationship of those criteria to the present six-to-three coding is treated as prior-art context rather than as a load-bearing theorem here. Our certification instead exploits the restricted, nonperiodic factor language of \(h_6^\omega(a)\).

---

## 3. Rank-one incidence lift and the six length-\(40\) profiles

Rao and Rosenfeld's length-\(10\) ternary coding has incidence matrix
\[
M_{g_3}=
\begin{pmatrix}
5&1&0&2&3&9\\
4&2&4&0&6&1\\
1&7&6&8&1&0
\end{pmatrix}.
\]

The following elementary observation is useful.

### Proposition 3.1 — kernel preservation under a rank-one lift

Let the columns of \(M\) have a common nonzero sum \(L\), and put
\[
M'=sM+u\mathbf 1^T,
\qquad s\ne0.
\]
If the new common column sum
\[
L'=sL+\mathbf1^Tu
\]
is nonzero, then
\[
\ker M'=\ker M.
\]

#### Proof

If \(Mx=0\), then summing coordinates of \(Mx\) gives
\[
L\,\mathbf1^Tx=0,
\]
so \(\mathbf1^Tx=0\). Hence
\[
M'x=sMx+u\mathbf1^Tx=0.
\]
Conversely, \(M'x=0\) gives \(L'\mathbf1^Tx=0\), hence \(\mathbf1^Tx=0\), after which \(sMx=0\). Since \(s\ne0\), \(Mx=0\). \(\square\)

For
\[
s=1,\qquad u=(10,10,10)^T,
\]
the new column length is \(40\), and the six target profiles are
\[
\begin{array}{c|ccc}
\text{role}&\#a&\#b&\#c\\
\hline
A&15&14&11\\
B&11&12&17\\
C&10&14&16\\
D&12&10&18\\
E&13&16&11\\
F&19&11&10.
\end{array}
\]
Thus
\[
\ker M_H=\ker M_{g_3}.
\]

Moreover, if \(d\) is the Parikh difference of two equal-length macro factors, then
\[
\mathbf1^Td=0,
\]
so for this lift
\[
M_Hd=M_{g_3}d.
\]
This is the algebraic reason that the length-\(40\) profile choice is compatible with the existing Rao--Rosenfeld long-period decision architecture. It does not by itself construct the six image words.

---

## 4. Finite and long-period certification

### 4.1 Direct finite gate

For block length \(40\), an Abelian square with half-period \(K\le40\) has total length at most \(80\), and therefore meets at most three consecutive macro blocks. Hence all periods
\[
2\le K\le40
\]
are certified exactly by checking the images
\[
H(xyz),\qquad xyz\in\mathcal B_3.
\]

This gives a finite exact gate on \(22\) macro trigrams.

### 4.2 Long-period gate

For periods above \(40\), the project uses the parent/template/ancestor method of the Rao--Rosenfeld framework. The rank-one lift preserves the kernel condition needed by that procedure. A complete six-block candidate is not a solution certificate unless it passes both

1. the direct period-\(2,\ldots,40\) gate, and
2. an independent fail-closed long-period template/ancestor certificate.

This separation between finite local certification and the long-period morphic certificate remains unchanged in the present manuscript.

---

## 5. Complete subset gates

The direct \(K\le40\) gate is exact only after all six roles are assigned. During staged synthesis we can do better by exploiting the actual macro factor language.

Let \(x\) be an infinite word over a macro alphabet \(\Gamma\), let
\[
H:\Gamma\to\Sigma^L
\]
be \(L\)-uniform, and let \(S\subseteq\Gamma\) be the set of roles currently assigned.

### Lemma 5.1 — finite subset-factor gate

Assume
\[
\operatorname{Fact}(x)\cap S^*
\]
has bounded word length. Let \(\mathcal C_S\) be its factor-maximal elements under contiguous-factor containment. Then every output factor of \(H(x)\) whose minimal macro support uses only letters of \(S\) occurs inside
\[
H(c)
\]
for some \(c\in\mathcal C_S\). Conversely every factor of every \(H(c)\), \(c\in\mathcal C_S\), is a genuine factor of \(H(x)\).

Consequently, absence of all \(S\)-supported Abelian squares is equivalent to checking the finitely many cover images \(H(c)\).

#### Proof

Let \(z\) be an output factor whose minimal supporting macro word is \(u\in \operatorname{Fact}(x)\cap S^*\). Because the \(S\)-only factor language is bounded, there is a factor-maximal \(c\in\operatorname{Fact}(x)\cap S^*\) containing \(u\). Uniform morphisms preserve aligned factor containment, so \(H(u)\) is a factor of \(H(c)\), and therefore \(z\) is a factor of \(H(c)\). The converse follows immediately from \(c\in\operatorname{Fact}(x)\). \(\square\)

The morphic or recurrent nature of \(x\) is not needed for the lemma; it is only one way to determine the finite factor language.

### Corollary 5.2 — natural half-period ceiling

If \(|c|=r\), then \(H(c)\) has length \(Lr\). Therefore every Abelian square contained in \(H(c)\) has half-period
\[
K\le\left\lfloor\frac{Lr}{2}\right\rfloor.
\]

For the current \(h_6\) language and \(L=40\), the independently regenerated factor-maximal covers are:

\[
\begin{array}{c|c|c|c}
S&\mathcal C_S&R_S&\text{global }K\text{ ceiling}\\
\hline
\{A,F\}&\{faf\}&3&60\\
\{A,E,F\}&\{eafea,fafea\}&5&100\\
\Gamma\setminus\{C\}&
\{eafea,\ bdfadfbdfafea,\ ebdfafeadfbdfafea\}
&17&340.
\end{array}
\]

The individual no-\(C\) cover-word ceilings are \(100,260,340\). The three cover words are pairwise non-containing, so all three belong to the canonical factor-maximal cover.

This leads to the preferred staged architecture
\[
F
\to AF_{\rm complete}
\to AEF_{\rm complete}
\to ABDEF_{\rm no-C,complete}
\to C
\to \text{finite all-role gate}
\to \text{long-period template/ancestor gate}.
\]

The order is a search-design choice, not a theorem. The mathematical content is that every stage can be made complete for the subset of roles already assigned.

---

## 6. Prefix second differences and unresolved support

Let \(P(t)\) be the Parikh vector of the coded prefix of length \(t\). A factor beginning at \(s\) with half-period \(K\) is an Abelian square exactly when
\[
P(s)-2P(s+K)+P(s+2K)=0.
\]
The second-difference form is classical and should not be treated as a novelty claim.

Suppose now that only one macro role \(X\) is unresolved. Write the three cutpoints as
\[
t_j=b_jL+i_j,\qquad 0\le i_j<L,\qquad j=0,1,2.
\]
Let
\[
x_i=\Psi(X[0..i)),\qquad x_0=0,
\]
and define the occurrence indicator
\[
\chi(b)=
\begin{cases}
1,&\text{if block }b\text{ is an }X\text{-occurrence},\\
0,&\text{otherwise}.
\end{cases}
\]

After all assigned-block contributions are moved to the target side, the unresolved support is
\[
\sigma=
\operatorname{red}\!\left(
\chi(b_0)x_{i_0}
-2\chi(b_1)x_{i_1}
+\chi(b_2)x_{i_2}
\right),
\]
where `red` removes \(x_0\), combines equal depths, and removes zero coefficients.

The zero signature is legitimate: it means the window is decided entirely by assigned data.

This separation is fundamental:

\[
\boxed{\text{support geometry}}
\quad+\quad
\boxed{\text{assigned affine target}}
\]

are distinct mathematical layers.

---

## 7. Carry geometry

Write
\[
K=qL+r,\qquad 0\le r<L.
\]
Define the carry bits
\[
c_j=\left\lfloor\frac{i_j+r}{L}\right\rfloor\in\{0,1\}.
\]
Then
\[
i_{j+1}=i_j+r-Lc_j
\]
and
\[
b_{j+1}-b_j=q+c_j.
\]

Put
\[
g_1=b_1-b_0,\qquad g_2=b_2-b_1.
\]
The macro curvature is
\[
\delta=g_2-g_1=c_1-c_0\in\{-1,0,+1\}.
\]

Equivalently, the absolute arithmetic-progression identity
\[
t_0-2t_1+t_2=0
\]
gives
\[
L(b_0-2b_1+b_2)+(i_0-2i_1+i_2)=0,
\]
hence
\[
i_0-2i_1+i_2=-\delta L.
\]

The carry sequence is the floor-difference coding of a rational rotation of slope \(r/L\), i.e. a rational mechanical word. This observation is useful but classical at the mechanical-word level; the present paper uses it only to organize the occurrence constraints.

---

## 8. Six-Domain Exact Support Classification

We now state the principal structural theorem.

### Theorem 8.1 — six domains, 34 realizable patterns, 19 support families

Let \(L\ge5\). In a uniform \(L\)-block system with one unresolved role \(X\), every Abelian-square support constraint with half-period \(K\ge2\) belongs to exactly one of six carry domains
\[
Z_s,\quad P_t,\quad M_t,\quad Z,\quad P,\quad M.
\]
Across arbitrary occurrence masks, these domains admit exactly \(34\) physically consistent domain/role patterns. Quotienting those patterns by equality of their complete reduced \(X\)-support sets yields exactly \(19\) distinct support families.

The assigned blocks affect only the target values; the theorem classifies the support layer.

#### Proof

Put
\[
a=i_0,\qquad h=i_1-i_0.
\]
From the curvature equation,
\[
i_2=a+2h-\delta L,
\]
and
\[
K=g_1L+h.
\]
Thus for fixed \(g_1,\delta\) the exact lattice domain is
\[
D_{g_1,\delta}(L)=
\left\{
(a,h):
0\le a,\ a+h,\ a+2h-\delta L<L,\quad
g_1L+h\ge2
\right\}.
\]

The carry pair \((c_0,c_1)\) and whether \(q=0\) or \(q\ge1\) give the six cases.

1. \(q=0\), carries \(00\): all three cutpoints lie in the same macro block. Since \(K=h\ge2\),
   \[
   Z_s=
   \{(a,h):h\ge2,\ 0\le a<a+h<a+2h<L\}.
   \]

2. \(q=0\), carries \(01\): \(b_0=b_1<b_2\), \(\delta=+1\). This is the truncated positive domain \(P_t\).

3. \(q=0\), carries \(10\): \(b_0<b_1=b_2\), \(\delta=-1\). This is the truncated negative domain \(M_t\).

4. Equal carries outside the same-block case give the full zero-curvature domain
   \[
   Z=\{(u,v,w):u+w=2v,\ 0\le u,v,w<L\}.
   \]

5. Positive curvature with distinct macro blocks gives
   \[
   P=\{(u,v,w):u+w=2v-L,\ 0\le u,v,w<L\}.
   \]

6. Negative curvature with distinct macro blocks gives
   \[
   M=\{(u,v,w):u+w=2v+L,\ 0\le u,v,w<L\}.
   \]

These cases are exhaustive because \(c_0,c_1\in\{0,1\}\).

Role consistency is now imposed. If two cutpoints lie in the same macro block, their occurrence indicators are the same because \(\chi\) is a function of the block, not of the cutpoint. Hence

- \(Z_s\) admits \(2\) occurrence patterns;
- \(P_t\) admits \(4\);
- \(M_t\) admits \(4\);
- each of \(Z,P,M\) admits \(8\).

Therefore the physical pattern count is
\[
2+4+4+8+8+8=34.
\]

For each of the \(34\) patterns, take the complete set of reduced support signatures realized over its domain. Exact equality of these complete sets produces the \(19\) classes listed in Table 1 below. The two truncated nonzero-curvature domains differ from their full domains by exactly one boundary lattice point:
\[
p^+=(L-2,L-1,0),\qquad
p^-=(L-1,0,1).
\]
After coefficient reduction, only one mixed family on each side is genuinely truncated. The remaining pattern equalities follow from outer symmetry and zero-depth reduction.

Pairwise distinctness of the resulting \(19\) sets follows from their coefficient-shape spectra together with their exact cardinalities. For the even and odd stable regimes, the few families sharing a coefficient-shape spectrum have different closed cardinalities; \(L=5\) is checked directly from the exact descriptions. Thus the quotient has exactly \(19\) classes. \(\square\)

### Table 1 — the 19 support families

| family | description | exact cardinality | \(L=40\) |
|---|---|---:|---:|
| \(E\) | empty support | \(1\) | 1 |
| \(Z_s\)-A | same-block zero-curvature, all active | \(\lfloor(L-3)^2/4\rfloor\) | 342 |
| Z-O | zero curvature, one outer \(X\) | \(L\) | 40 |
| Z-C | zero curvature, centre \(X\) | \(L\) | 40 |
| Z-M | zero curvature, centre + one outer | \(\lceil L^2/2\rceil\) | 800 |
| Z-OO | zero curvature, both outers | \(\lfloor(L+1)^2/4\rfloor\) | 420 |
| Z-A | zero curvature, all active | \(\lfloor(L-1)^2/4\rfloor+1\) | 381 |
| P-O | positive curvature, one outer | \(L-1\) | 39 |
| P-C | positive curvature, centre | \(\lfloor L/2\rfloor\) | 20 |
| P-M | positive curvature, mixed | \(\lfloor L^2/4\rfloor\) | 400 |
| P-OO | positive curvature, both outers | \(\binom{\lfloor L/2\rfloor+1}{2}\) | 210 |
| P-A | positive curvature, all active | \(\binom{\lfloor L/2\rfloor+1}{2}\) | 210 |
| \(P_t\)-M | truncated positive mixed | \(\lfloor L^2/4\rfloor-1\) | 399 |
| M-O | negative curvature, one outer | \(L-1\) | 39 |
| M-C | negative curvature, centre | \(\lfloor L/2\rfloor\) | 20 |
| M-M | negative curvature, mixed | \(\lfloor L^2/4\rfloor\) | 400 |
| M-OO | negative curvature, both outers | \(\binom{\lfloor L/2\rfloor+1}{2}\) | 210 |
| M-A | negative curvature, all active | \(\binom{\lfloor L/2\rfloor+1}{2}\) | 210 |
| \(M_t\)-M | truncated negative mixed | \(\lfloor L^2/4\rfloor-1\) | 399 |

The phrase “19 families are minimal” is used only in the following restricted sense:

> If cases are compressed **only** by equality of their complete reduced support sets, fewer than \(19\) classes are impossible for \(L\ge5\).

This is not a minimal-state theorem for an automaton or implementation.

### 8.1 Small-\(L\) boundary

Under the same semantics the family counts are
\[
9,\ 15,\ 19,\ 19,\ 19,\ 19
\]
for \(L=2,3,4,5,6,7\), respectively. At \(L=4\) the quotient already has \(19\) classes, but they are not yet the stable Table-1 family list: \(Z_s=\varnothing\), so the same-block class is the empty set of signatures rather than the nonempty family occurring from \(L=5\) onward. The first genuine same-block \(K\ge2\) configuration occurs at \(L=5\), so \(L\ge5\) is the natural stable statement.

### 8.2 Mechanical corollary

For equally spaced cutpoints
\[
t_j=s+jK,\qquad K=qL+r,
\]
the whole carry sequence is generated by the same rational rotation modulo \(L\). Thus the local curvature signs in longer Abelian-power chains are not independent. This observation is recorded here as a corollary and organizing principle; general \(k\)-power mechanical geometry is outside the core scope of this paper.

---

## 9. The upstream \(E\to A\) feasibility problem

The staged construction first has to determine whether a fixed \(E\)-block admits any compatible \(A\)-block of the required profile.

Fix
\[
\Psi(E)=(13,16,11),\qquad
\Psi(A)=(15,14,11),
\]
and write
\[
W=EA.
\]
Let
\[
p(i)=\Psi(E[0..i)),\qquad
x(j)=\Psi(A[0..j)),
\]
with
\[
x(0)=0,\qquad x(40)=(15,14,11).
\]
For \(r\ge0\), let
\[
\sigma_r=\Psi(\text{last }r\text{ letters of }E).
\]

Define \(Aset(E)\) to be the profile-correct \(A\)-words for which \(EA\) has no Abelian square of half-period \(2\le k\le40\) ending at a position \(41,\ldots,80\).

Put
\[
n=40+m.
\]
Directly splitting the square equation according to the locations of the two earlier cutpoints gives three exact support classes.

### Proposition 9.1 — exact \(E\to A\) constraint decomposition

The constraints are:

\[
\begin{array}{c|c|c}
\text{class}&\text{range}&\text{constraint}\\
\hline
\text{ternary}&2k\le m&
x(m)-2x(m-k)+x(m-2k)\ne0,\\[1mm]
\text{binary}&m<2k\le2m&
x(m)-2x(m-k)\ne p(40)-p(40+m-2k),\\[1mm]
\text{unary}&k>m&
x(m)\ne \sigma_{2k-m}-2\sigma_{k-m}.
\end{array}
\]

For \(L=40\) the support counts are
\[
\boxed{361\text{ ternary},\quad419\text{ binary},\quad380\text{ unary}.}
\]

The counts and support positions are independent of \(E\). The \(E\)-dependence appears only in the affine target values.

Two endpoint reductions are useful:

- if \(k=m\), then \(x(0)=0\) makes the nominal binary relation unary:
  \[
  x(m)\ne\sigma_m;
  \]
- at \(m=40\), the full profile \(x(40)\) is fixed, so twenty nominal binary relations reduce to unary relations at earlier depths.

Thus
\[
Aset(E)\ne\varnothing
\]
is exactly the existence of a monotone \(40\)-step path
\[
(0,0,0)\longrightarrow(15,14,11)
\]
avoiding a fixed support skeleton with \(E\)-dependent targets.

An independent implementation of the mathematical predicate and the derived constraint system agreed on \(13{,}800\) random profile-correct \(A\)-words across all \(69\) frozen \(E\)-words.

### 9.1 A closed-form depth-one obstruction

For \(k=2,\ldots,20\), define
\[
d_k(E)
=
\Psi(E[41-2k..41-k))
-
\Psi(E[41-k..40)).
\]
The first interval has length \(k\), the second length \(k-1\), hence the coordinate sum of \(d_k(E)\) is \(1\).

Put
\[
\operatorname{BLOCKED}(E)
=
\{\alpha\in\Sigma:
d_k(E)=e_\alpha
\text{ for some }2\le k\le20
\}.
\]

### Lemma 9.2 — suffix obstruction

If
\[
\operatorname{BLOCKED}(E)=\Sigma,
\]
then
\[
Aset(E)=\varnothing.
\]

#### Proof

For \(n=41\), the first half of a candidate Abelian square of half-period \(k\le20\) lies entirely in \(E\), while the second half is the last \(k-1\) letters of \(E\) followed by \(A[0]\). Equality of the two Parikh vectors is therefore equivalent to
\[
d_k(E)=e_{A[0]}.
\]
If every letter is in \(\operatorname{BLOCKED}(E)\), no first letter of \(A\) is possible. \(\square\)

The lemma is sufficient, not necessary. On the frozen random population it explains \(7\) of the \(24\) zero-\(Aset\) cases; in a separately frozen \(400\)-word adversarial sample it fired \(52\) times, all on zero-\(Aset\) instances. These checks test the implementation but are not part of the proof.

Propagation and singleton shaving provide sound finite certificates for many further zero-\(Aset\) instances, but no necessary-and-sufficient closed-form characterization has been obtained.

### 9.2 Selection effect in the canonical \(E\)-pool

The frozen random pool has
\[
24/60
\]
words with \(Aset(E)=\varnothing\). The nine canonical \(E\)-words all have nonempty \(Aset\), but this is not evidence of a new structural invariant: the canonical pools were extracted from historical compatible \((A,E,F)\) triples, and each canonical \(E\) already has a compatible canonical \(A\).

Therefore the upstream \(Aset\) phenomenon and the later H/RX AFE separation must be treated as distinct.

---

## 10. AFE as exact fixed-profile reachability

We now fix an \(A,E\) pair and treat the order of \(F\) as unresolved, with
\[
h=\Psi(F)=(19,11,10),\qquad |F|=40.
\]
For a candidate \(F=f_1\cdots f_{40}\), define prefix Parikh vectors
\[
X_i=\Psi(f_1\cdots f_i),\qquad X_0=0,\quad X_{40}=h.
\]

Each AFE Abelian-square window becomes an affine prefix condition of the form
\[
\sum_i\alpha_iX_i\in T,
\]
where the support coefficients come from the occurrence geometry and \(T\) is a finite forbidden target set determined by assigned data.

The empty support is included. If all unresolved-prefix coefficients cancel or no cutpoint lies in the unresolved role, the condition is an assigned-data condition represented by the empty affine sum. In the compiled \(L=40\) AFE system, 703 of the 3,081 raw windows are of this arity-zero type; a violated one makes the instance unsatisfiable before any letter of \(F\) is chosen.

Raw window counts are not the same as the number of effective compiled constraints. In the same \(L=40\) implementation audit, 1,238 unary windows aggregate to 443 distinct \((\text{depth},\text{target})\) pairs, and 652 further unary windows are discarded soundly because their targets are not legal prefix states. All later solver-level counts distinguish raw windows from these effective aggregated constraints.

The full fixed-profile prefix tree is
\[
\mathcal T_h=
\{u\in\Sigma^{\le40}:\Psi(u)\le h\},
\]
ordered by one-letter extension.

A constraint is **closed** at the largest prefix depth appearing in its support. A profile-admissible edge is blocked if the child prefix is the first prefix on that branch to violate a closed constraint.

### Theorem 10.1 — path equivalence

An \(F\)-word with profile \(h\) satisfies all AFE constraints if and only if its root-to-leaf path in \(\mathcal T_h\) contains no first-hit blocked edge.

#### Proof

Every constraint becomes decidable when its latest referenced prefix is known. If a violation first appears at depth \(d\), the entering edge to that depth is blocked. Conversely, if no entering edge ever closes a violated constraint, then all constraints are satisfied when the complete word is reached. \(\square\)

Hence AFE existence is an exact reachability problem, not a property of a particular DFS implementation.

---

## 11. What is an exact state?

A tempting compression is to identify a depth-\(d\) prefix only by its current Parikh vector \(X_d\). This is not correct in general because future constraints may refer to earlier prefix values.

### Lemma 11.1 — current Parikh insufficiency

There exist two prefixes with the same current Parikh vector and the same continuation word whose future legality differs.

#### Example

Take the two binary prefixes
\[
u=aba,\qquad v=baa,
\]
so
\[
X_3(u)=X_3(v)=(2,1).
\]
Append the **same** future word \(aa\) to both prefixes and consider the genuine half-period-\(2\) second-difference constraint
\[
X_1-2X_3+X_5=0.
\]
For \(abaaa\),
\[
X_1-2X_3+X_5=(1,-1)\ne0,
\]
whereas for \(baaaa\),
\[
X_1-2X_3+X_5=(0,0).
\]
Thus two prefixes with the same current Parikh vector can have different future legality under an identical continuation, even for a \(K=2\) Abelian-square support. The current vector \(X_d\) alone therefore does not determine the continuation language.

### Theorem 11.2 — frontier sufficiency

At depth \(d\), let \(A_d\) be the set of historical depths \(i\le d\) that appear in some constraint not yet closed. Define
\[
S_d(u)=
\left(
X_d(u),\,
(X_i(u))_{i\in A_d}
\right).
\]
If two legal prefixes \(u,v\) at depth \(d\) have
\[
S_d(u)=S_d(v),
\]
then they have identical legal continuation languages.

#### Proof

Every future constraint depends on the already constructed part only through the current prefix vector and the historical prefix values still referenced by an unclosed constraint. Equal frontier states therefore give equal affine evaluations under every common continuation. \(\square\)

This theorem gives an exact state quotient. We do **not** claim that the displayed frontier is minimal or that every stored historical vector is individually necessary in every instance.

---

## 12. First-hit cutsets and exact obstruction mass

### 12.1 First-hit antichain and cylinder partition

Let \(B\) be the set of bad prefixes whose parent is legal.

### Lemma 12.1 — first-hit antichain

The set \(B\) is prefix-free.

#### Proof

If \(u\in B\), then \(u\) is already bad. No strict descendant of \(u\) can have a legal parent path from the root, so no strict descendant belongs to the first-hit set. \(\square\)

Let
\[
\mathcal W_h=
\{f\in\Sigma^{40}:\Psi(f)=h\}.
\]
For a prefix \(u\), define its fixed-profile cylinder
\[
[u]_h=
\{f\in\mathcal W_h:u\preceq f\}.
\]

### Theorem 12.2 — first-hit cylinder partition

If \(\mathcal S\subseteq\mathcal W_h\) is the set of AFE-satisfying words, then
\[
\mathcal W_h
=
\mathcal S
\;\dot\cup\;
\bigdotcup_{u\in B}[u]_h.
\]

#### Proof

Every invalid complete word has a unique shortest invalid prefix. Conversely every word extending a first-hit bad prefix is invalid. Prefix-freeness makes the cylinders disjoint. \(\square\)

If
\[
p=\Psi(u),
\]
then
\[
|[u]_h|
=
\frac{(40-|u|)!}
{(19-p_a)!(11-p_b)!(10-p_c)!}.
\]

The full profile space has size
\[
|\mathcal W_h|
=
\frac{40!}{19!\,11!\,10!}
=
46\,305\,405\,961\,214\,400.
\]

### Corollary 12.3 — exact UNSAT mass identity

AFE is unsatisfiable if and only if
\[
\sum_{u\in B}|[u]_h|
=
46\,305\,405\,961\,214\,400.
\]

This suggests the normalized first-hit mass
\[
\mu_d=
\frac{1}{|\mathcal W_h|}
\sum_{\substack{u\in B\\|u|=d}}|[u]_h|
\]
and survival mass
\[
S_d=1-\sum_{j\le d}\mu_j.
\]
For an unsatisfiable instance,
\[
\sum_d\mu_d=1.
\]

These quantities are independent of DFS branch order.

### 12.2 Exact frontier-state quotient with multiplicities

The first-hit trie can be compressed without losing exact word counts.

For a legal frontier state \(s\) at depth \(d\), let
\[
N_d(s)
\]
be the number of distinct legal prefixes represented by that state. Frontier
sufficiency implies that all of those prefixes have the same legal/blocked
verdict under the same next letter and, for a legal transition, map to the same
next frontier state.

If a profile-admissible child has current Parikh vector \(p\), one particular
child prefix has
\[
C_h(p)
=
\frac{(40-|p|_1)!}
{(19-p_a)!(11-p_b)!(10-p_c)!}
\]
complete profile-compatible extensions.

### Theorem 12.4 — weighted frontier-DAG identity

Run the exact frontier-state DAG from the root. If a transition from state
\(s\) is first-hit blocked at depth \(d+1\), add
\[
N_d(s)\,C_h(p)
\]
to the blocked mass \(M_{d+1}\). If the transition is legal, add \(N_d(s)\) to
the multiplicity of the resulting next state.

Let \(Z\) be the total multiplicity of legal depth-\(40\) states. Then
\[
\boxed{
Z+\sum_{d=1}^{40}M_d
=
\frac{40!}{19!\,11!\,10!}.
}
\]
Moreover, \(Z\) is exactly the number of satisfying \(F\)-words, and \(M_d\) is
exactly the number of complete profile words whose first obstruction occurs at
depth \(d\).

#### Proof

A quotient state of multiplicity \(N\) represents \(N\) distinct legal prefix
words. Under a blocked next letter, the \(N\) child prefixes are distinct and
their fixed-profile cylinders are disjoint. They have the same current profile
and hence the same cylinder cardinality \(C_h(p)\). Under a legal next letter,
frontier sufficiency justifies merging their futures while adding
multiplicities. Induction over the layers therefore reproduces the full legal
prefix tree and its first-hit partition exactly. \(\square\)

The identity is exact for any constraint system, but its practical compression depends on the active frontier. For the compiled Paper-4 AFE system at \(L=40\), an implementation audit finds that the 342 ternary constraints alone force
\[
A_d=\{1,\ldots,d\}
\]
for 38 of the 40 depths, with \(\max_d|A_d|=38\). Since consecutive differences of \(X_1,\ldots,X_d\) recover the letters of the prefix, the frontier state determines the prefix word itself. Consequently every realized quotient-state multiplicity is \(1\): for this system the quotient DAG coincides with the full legal prefix trie. The AFE system is therefore **maximally history-dependent** in this precise sense. The weighted identity remains useful for canonical, branch-order-independent accounting, not for state compression.

### 12.3 Weighted survival geometry

Define
\[
\mu_d=\frac{M_d}{|\mathcal W_h|},
\qquad
S_d=1-\sum_{j=1}^{d}\mu_j,
\qquad S_0=1.
\]
For a uniformly chosen complete word of profile \(h\),
\[
\mu_d
=
\Pr(\text{first obstruction occurs at depth }d),
\]
and
\[
S_d
=
\Pr(\text{the word survives through depth }d).
\]

Let \(T\) be the first-hit depth, with \(T=40\) for a word that reaches the end
without an earlier hit. Then
\[
\boxed{
A_{\rm surv}:=\sum_{d=0}^{39}S_d=\mathbb E[T].
}
\]
Thus \(A_{\rm surv}\) is a profile-weighted mean first-hit depth, not a search
runtime statistic.

When \(S_{d-1}>0\), the conditional hazard
\[
\lambda_d=\frac{\mu_d}{S_{d-1}}
\]
is the fraction of still-surviving profile words eliminated when depth \(d\)
is exposed.

Depth mass also need not determine cover shape. If
\[
B_d=\{u\in B:|u|=d\},\qquad
q_u=\frac{|[u]_h|}{M_d},
\]
then
\[
N_{\rm eff}(d)
=
\frac{1}{\sum_{u\in B_d}q_u^2}
\]
is a canonical effective number of first-hit cylinders at depth \(d\). It can
be computed from quotient-state multiplicities because a blocked transition
group representing \(N\) prefixes of cylinder weight \(w\) contributes
\(Nw^2\), not \((Nw)^2\), to the prefix-level second moment.

These quantities are proposed mechanism observables; no H/RX separation claim
is made for them in this manuscript version.

### 12.4 Compressed UNSAT certificate

The quotient DAG also gives a compressed proof object. Each layered node stores
its exact frontier state and multiplicity, and every profile-admissible outgoing
letter is certified either as a legal transition to another frontier state or
as a blocked transition with a directly checkable affine killer. An independent
checker recomputes the transitions, multiplicities, blocked masses, and final
partition identity.

If
\[
Z=0,
\]
the checked quotient DAG certifies AFE-unsatisfiability. No minimality claim is
made for this certificate.

### 12.5 Atomic Abelian-square mass


For a pure internal Abelian-square event
\[
X_{i+2m}-2X_{i+m}+X_i=0,
\]
the number of fixed-profile words satisfying the equality depends on \(m\) but not on the starting position \(i\).

Write
\[
\binom{n}{p}=\frac{n!}{p_a!p_b!p_c!}
\]
for a multinomial coefficient. If the common half-profile is \(p\), then the two adjacent length-\(m\) blocks can be arranged in
\[
\binom{m}{p}^2
\]
ways. Summing over the unconstrained prefix and suffix by the multivariate Vandermonde identity gives

### Proposition 12.6 — translation-invariant pure-square mass

\[
M_h(m)
=
\sum_{\substack{p\in\mathbb Z_{\ge0}^3\\|p|_1=m\\2p\le h}}
\binom{m}{p}^2
\binom{40-2m}{h-2p}.
\]

The formula is independent of the start position \(i\).

This proposition concerns the zero-target pure internal Abelian-square event. Arbitrary AFE affine target conditions require the more general segment-Parikh counting formula and need not collapse to a function of \(m\) alone.

### 12.6 Union-bound existence certificate

Let \(V_c\subseteq\mathcal W_h\) be the words forbidden by atomic constraint \(c\), and let
\[
\omega(c)=|V_c|.
\]
If
\[
\sum_c\omega(c)<|\mathcal W_h|,
\]
then
\[
\left|\bigcup_cV_c\right|<|\mathcal W_h|,
\]
so at least one profile-correct word is legal.

Thus:

### Corollary 12.7

\[
\boxed{
\sum_c\omega(c)<|\mathcal W_h|
\quad\Longrightarrow\quad
AFE\_EXISTS.
}
\]

The converse is false in general because the atomic forbidden sets may overlap heavily.

### 12.7 Full-trie UNSAT certificate

An AFE-negative instance can be certified by a prefix trie. Every legal internal node records all profile-admissible next letters. Each child is either

1. another legal trie node, or
2. a blocked leaf carrying at least one directly checkable affine killer.

If every profile-admissible child is accounted for and no legal depth-\(40\) leaf remains, an independent checker proves UNSAT without replaying the original search order.

The canonical first-hit frontier should not be confused with

- a minimum ordinary edge cut,
- a minimum set of constraint labels,
- or a minimum UNSAT core.

The frontier is canonical; it is not claimed to be minimum in any of those other senses.


The full first-hit trie and the quotient-DAG certificate prove the same
language-level statement. The trie is canonical at the prefix level; the DAG
compresses exact future-equivalent prefixes and retains their multiplicities.
Neither object is asserted to be a minimum edge cut, minimum label cut, or
minimum UNSAT core.

---

## 13. Exposure-matched AFE experiment

The structural theory above does not by itself predict which \(A,E\) pairs admit an \(F\). We therefore separate theorem-level statements from the finite computation.

A preregistered exposure-matched experiment compared the frozen random-\(E\) population \(RX\) with the canonical \(H\) population. The random population used a capped deterministic quota
\[
Q=5000
\]
per \(E\), because \(24\) of the \(60\) frozen random \(E\)-words have \(Aset(E)=\varnothing\), making equal exposure over all \(60\) impossible.

The clean RX run evaluated exactly
\[
75{,}111
\]
\((E,A)\) trials, with \(36\) \(E\)-words represented. It produced
\[
137
\]
AF-positive pairs from
\[
17
\]
distinct \(E\)-words. All capped AF decisions were re-decided at a larger cap, leaving zero unresolved cases.

Applying the identical quota rule to the frozen canonical data gives:

| population | trials | \(E\) represented | AF-positive | AFE exists | joint AF/AFE | \(P40\) |
|---|---:|---:|---:|---:|---:|---:|
| RX, \(Q=5000\) | 75,111 | 36 | **137** | **0** | **0** | 0 |
| H, \(Q=5000\) | 31,775 | 9 | 263 | **86** | **44** | 34 |

The cleanest exact-equal-exposure strata are:

| stratum | \(E\) | trials | AF-positive | AFE exists | joint AF/AFE |
|---|---:|---:|---:|---:|---:|
| RX-5000-EQ | 10 | 50,000 | 63 | **0** | **0** |
| H-5000-EQ | 4 | 20,000 | 78 | 36 | 24 |
| RX-1000-EQ | 21 | 21,000 | 45 | **0** | **0** |
| H-1000-EQ | 8 | 8,000 | 40 | **19** | 0 |

In particular,
\[
45\to0
\qquad\text{versus}\qquad
40\to19
\]
at the AFE stage in the \(1000\)-per-\(E\) strata.

Both reported predicates have independent two-solver agreement on the quota-matched canonical H population.

The bucket-gate DFS and the independently written stage DFS agree on all
\[
263/263
\]
pairs for the joint predicate `AF_AND_AFE_EXISTS` (44 positive).

The `AFE_EXISTS` verdict was subsequently recomputed by a second, AFE-only solver — a distinct signature/target-bucket compilation with its own search, in which no FAF constraint is ever generated — on all \(263\) pairs. The two implementations agree on \(263/263\) cases, comprising all \(86\) AFE-positive and \(177\) AFE-negative pairs, with no capped or unresolved case. For each of the \(86\) positives one witness \(F\) was additionally verified directly from the literal word \(A\cdot F\cdot E\), confirming \(\Psi(F)=(19,11,10)\) and the absence of any Abelian square of half-period \(K\in[2,40]\); all \(86\) witnesses passed.

That the second route computes `AFE_EXISTS` and not the joint gate is established by the \(42\) pairs which are AFE-positive but `AF_AND_AFE_EXISTS`-negative: the AFE-only solver returns a witness on every one of them.

### 13.1 What this establishes

The finite observation originally phrased as a later AF/AFE intersection effect is more accurately located one stage earlier:
\[
\boxed{\text{AFE existence is the first strong observed separation.}}
\]

### 13.2 What this does not establish

The counts are exhaustive only for the declared frozen finite populations. They are not a sampling model, do not estimate an underlying probability, and do not show that a random-profile \(E\) can never yield an AFE-positive pair.

In particular,
\[
0/137
\]
is finite evidence, not an impossibility theorem.

---

## 14. What simple mechanisms do not explain

Three natural scalar or static explanations have failed to separate the frozen
populations cleanly.

The support skeleton is fixed by the occurrence geometry and does not itself
distinguish H from RX. Raw counts of target collisions overlap across the
populations. Maximum extinction depth also overlaps strongly: both populations
can survive to the deepest observed levels. Thus none of these quantities is a
sufficient explanation of the AFE separation.

One selected RX case illustrates why weighted geometry may be more informative.
At depth \(37\) the remaining profile is
\[
(0,3,0),
\]
so the continuation is forced to `bbb`; the next transition is forbidden. This
is a genuine deterministic corridor, but its fixed-profile cylinder has mass
\[
1.
\]
A visually dramatic late obstruction can therefore be globally negligible,
while an earlier blocked prefix may eliminate an enormous cylinder.

The upstream \(Aset(E)\) obstruction is also not an explanation of the
downstream AFE separation: zero-\(Aset\) \(E\)-words contribute no downstream
pairs, so the AFE comparison is already conditioned on surviving the upstream
stage.

The next predeclared mechanism test is consequently the exact weighted
first-hit geometry
\[
(\mu_d),\quad A_{\rm surv},\quad(\lambda_d),\quad N_{\rm eff}(d),
\]
computed from the frontier-state quotient. That test is not reported here.

---

## 15. Construction status and next gate

The complete-subset architecture used in the current search is
\[
F
\to AF_{\rm complete}
\to AEF_{\rm complete}
\to ABDEF_{\rm no-C,complete}
\to C
\to \text{finite all-role gate}
\to \text{long-period template/ancestor gate}.
\]

The \(ADEF_{\rm complete}\) stage appearing in earlier sandbox diagrams is omitted here because no factor-maximal ADEF cover has yet been promoted into the manuscript. The immediate research task is to characterize target-loaded AFE reachability and then continue only with subset stages whose finite covers have been explicitly generated and certified.

Historical finite exclusion ledgers and older \(K\le40\) ABFE scaffolds remain useful provenance and search evidence, but they are not the theorem spine of this version.

---

## 16. Relation to prior methods

The basic ingredients surrounding this work have substantial prior art.

- Prefix-Parikh second differences for Abelian-power constraints are classical and occur explicitly in Carpi's morphism criteria.
- Currie and Rampersad's template/parent framework provides finite boundary corrections and ancestor reductions for morphic fixed points.
- Rao and Rosenfeld provide the specific six-letter core and the long-period outer-coding decision framework used here.
- Recent template-sieve work further emphasizes structural pruning of parent/template systems.
- Rational mechanical words and their balance properties are classical.

Accordingly, this paper does **not** claim novelty for
\[
(+1,-2,+1)
\]
prefix algebra, Euclidean carries, mechanical words, finite-state paths with Parikh counters, first-hit prefix cuts, future-equivalence state quotients, layered weighted counting DAGs, or template sieving. These are generic tools; only their exact role in the present staged AFE construction is at issue.

The narrower candidate contribution is the exact role-projected **partial-assignment** structure:
\[
\text{actual macro occurrence mask}
\to
\text{six carry domains}
\to
\text{complete support-family quotient}
\to
\text{moving target sets}
\to
\text{certificate-oriented staged synthesis}.
\]

A targeted search has not yet established whether an equivalent six-domain/19-family quotient already appears in the literature under different terminology. Therefore
\[
\boxed{\text{NOVELTY\_UNRESOLVED}}
\]
remains the required status.

---

## 17. Reproducibility and proof status

The present draft deliberately separates proof from computation.

### 17.1 Proved from definitions

- rank-one kernel-preservation proposition;
- finite subset-factor gate theorem;
- factor-maximal cover lemma;
- Euclidean carry recurrence;
- six-domain completeness;
- \(34\) physically realizable role/domain patterns;
- \(E\to A\) unary/binary/ternary support decomposition;
- depth-one suffix obstruction;
- AFE path equivalence;
- current-Parikh insufficiency;
- frontier-state sufficiency;
- first-hit antichain and cylinder partition;
- multinomial cylinder mass;
- translation invariance of the pure internal Abelian-square mass;
- union-bound existence certificate;
- soundness of the complete prefix-trie UNSAT certificate.

The six-domain/19-family theorem, the Phase-I AFE cutset core, and the weighted frontier-DAG Phase-II theorem have each received separate independent reconstruction or clean-room audit. The Phase-II audit included forced-UNSAT coverage and verified the multiplicity identity, first-hit semantics, \(A_{\rm surv}=\mathbb E[T]\), prefix-level concentration accounting, and quotient-certificate soundness.

### 17.2 Exact statements whose manuscript proofs are currently outlines

The following statements have been independently reconstructed and exactly verified, but the present manuscript gives only the proof skeleton rather than the full derivations:

- the exact \(34\to19\) quotient of complete reduced support sets;
- the nineteen closed cardinality formulas in Table 1;
- pairwise distinctness of the nineteen stable families for \(L\ge5\).

These are retained as exact verified structural results in v0.33, while the full equality-class bookkeeping and cardinality derivations remain in the proof-closure supplement and should be incorporated into an appendix before submission.

### 17.3 Exact finite computations

- frozen \(E\to A\) predicate/constraint validation;
- frozen \(Aset(E)\) counts;
- propagation/shaving certificates on declared finite populations;
- exposure-matched RX/H counts;
- two-solver \(263/263\) agreement on the quota-matched H population for the joint `AF_AND_AFE_EXISTS` predicate;
- independent two-solver \(263/263\) agreement for `AFE_EXISTS` (86 positive, 177 negative, 0 unresolved), with literal-word validation of all 86 witnesses;
- earlier exact finite block-search ledgers retained in the project archive.

### 17.4 Not established

- a necessary-and-sufficient closed-form characterization of \(Aset(E)\);
- a theorem explaining the H/RX AFE separation;
- a complete \(H\) solving Mäkelä's problem;
- nonexistence of a complete coding in the length-\(40\) profile class;
- novelty of the six-domain/19-family role-projection framework.

---

## 18. Discussion

The central change in viewpoint is from **enumerating compatible block tuples** to **compiling the constraints induced by a partial assignment**.

The six-domain theorem says that, once one role is left unresolved, the possible prefix support geometry is not an uncontrolled collection of windows. It is a finite exact object governed by the carries of Euclidean division. The \(E\to A\) derivation shows the same support/target split one stage earlier. The AFE cutset theory then turns the target-loaded system into a language-cover problem.

This yields a coherent hierarchy:
\[
\boxed{
\text{macro factor language}
\to
\text{occurrence geometry}
\to
\text{support families}
\to
\text{affine targets}
\to
\text{reachable prefix language}
\to
\text{certified witness or cutset}.
}
\]

The hierarchy is useful independently of whether the present search ultimately finds a complete coding. It also identifies a precise next theoretical target. The exposure-matched experiment shows a strong finite separation at AFE existence, but simple static counts and death depth do not explain it. The weighted first-hit frontier is the natural next object because its exact mass, survival curve, and concentration are branch-order-independent. For the actual \(L=40\) AFE system the frontier quotient gives no state compression: the system is maximally history-dependent and the quotient coincides with the prefix trie.

One predeclared summary is
\[
A_{\rm surv}
=
\sum_{d=0}^{39}S_d,
\]
where \(S_d\) is the fraction of complete profile words not yet captured by a first-hit obstruction by depth \(d\). Whether this or another cutset invariant separates the frozen populations is a computational question and is not answered in the present manuscript version.

---

## 19. Conclusion

We have not solved Mäkelä's problem. We have replaced a substantial portion of the earlier block-search narrative by exact mathematics.

For uniform partial assignments, Abelian-square cutpoints obey a six-domain carry geometry. With one unresolved role this produces exactly \(19\) complete reduced support families from \(34\) physically realizable occurrence patterns. The fixed macro language turns assigned-role subsets into finite complete gates. At the upstream \(E\to A\) stage, the constraint system has a fixed \(361/419/380\) ternary/binary/unary support skeleton with moving targets. At the downstream AFE stage, feasibility is exactly reachability in a fixed-profile prefix language; first-hit obstruction cylinders give a canonical exact cover, while an exact frontier-state formulation with multiplicities gives weighted first-hit accounting and independently checkable UNSAT certificates. For the actual \(L=40\) AFE system this quotient does not compress the state space: the active history determines the full prefix.

The exposure-matched computation suggests that the principal finite bottleneck lies at AFE existence, not merely at a later joint gate. Why that bottleneck differs so sharply between the frozen canonical and random populations remains open.

The construction problem therefore remains alive at two levels:

\[
\textbf{mathematical: }
\text{understand target-loaded reachability},
\]
and
\[
\textbf{constructive: }
\text{use complete subset gates to reach a six-role coding}.
\]

Only a complete six-block witness that passes both the exact finite gate and the independent long-period certificate could change the status of Mäkelä's problem.

---

## References — working list

- A. Carpi, *On Abelian Power-Free Morphisms*, International Journal of Algebra and Computation 3(2) (1993), 151--168.
- J. D. Currie and N. Rampersad, *Fixed points avoiding Abelian \(k\)-powers*, Journal of Combinatorial Theory, Series A 119(5) (2012), 942--948, doi:10.1016/j.jcta.2012.01.006.
- S. Eyidoğan, H. Göral and N. Tanısalı, *Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the Template Method*, arXiv:2605.20504 (2026).
- G. Fici and M. Puzynina, *Abelian Combinatorics on Words: A Survey*, Computer Science Review 47 (2023), 100532.
- V. Keränen, *Abelian Squares Are Avoidable on 4 Letters*, in ICALP 1992, Lecture Notes in Computer Science 623, 41--52.
- M. Rao and M. Rosenfeld, *Avoiding Two Consecutive Blocks of Same Size and Same Sum over \(\mathbb Z^2\)*, SIAM Journal on Discrete Mathematics 32(4) (2018), 2381--2397, doi:10.1137/17M1149377.

---

## Appendix A. Epistemic ledger for v0.33

| item | status in this draft |
|---|---|
| Mäkelä problem | **OPEN** |
| complete six-block \(H\) | **NOT FOUND / OPEN** |
| rank-one kernel lift | **PROVED** |
| finite subset-factor gate theorem | **PROVED** |
| AF / AEF / no-C factor-maximal covers | **INDEPENDENTLY REGENERATED / EXACT** |
| six carry domains | **PROVED + CLEAN-ROOM RECONSTRUCTED** |
| 34 physical patterns | **PROVED + CLEAN-ROOM RECONSTRUCTED** |
| 19 exact support families | **EXACTLY VERIFIED + CLEAN-ROOM RECONSTRUCTED; manuscript proof currently an outline** |
| 19-family novelty | **NOVELTY_UNRESOLVED** |
| \(E\to A\) 361/419/380 decomposition | **DERIVED + INDEPENDENTLY PREDICATE-CHECKED** |
| depth-one suffix obstruction | **PROVED; sufficient only** |
| propagation/shaving certifier | **SOUND ON DERIVATION; INCOMPLETE** |
| AFE path equivalence | **PROVED + CLEAN-ROOM AUDITED** |
| current Parikh alone insufficient | **PROVED + CLEAN-ROOM AUDITED** |
| frontier state sufficient | **PROVED + CLEAN-ROOM AUDITED; no minimality claim** |
| first-hit antichain/cylinder partition | **PROVED + CLEAN-ROOM AUDITED** |
| weighted frontier-DAG mass identity | **PROVED + INDEPENDENT CLEAN-ROOM VERIFIED (including UNSAT coverage)** |
| survival-area identity \(A_{\rm surv}=E[T]\) | **PROVED + INDEPENDENT CLEAN-ROOM VERIFIED** |
| quotient-DAG UNSAT certificate | **PROVED SOUND + INDEPENDENT CLEAN-ROOM VERIFIED** |
| pure-square mass translation invariance | **PROVED + CLEAN-ROOM AUDITED** |
| union-bound AFE existence test | **PROVED** |
| prefix-trie UNSAT certificate | **PROVED SOUND; no minimum-core claim** |
| RX 137 AF+ \(\to0\) AFE | **EXACT FINITE-POPULATION RESULT** |
| H 263 AF+ \(\to86\) AFE | **EXACT FINITE-POPULATION RESULT** |
| H/RX separation theorem | **NOT ESTABLISHED** |
| length-\(40\) impossibility | **NOT ESTABLISHED** |
| manuscript novelty | **NOVELTY_UNRESOLVED** |

---

## Appendix B. Editorial changes through v0.33

This version intentionally changes the manuscript spine.

1. The \(38118\)-F exclusion ledger and long search chronology are no longer the abstract's organizing result. They remain archived finite evidence but are not the structural center of the paper.
2. The complete-subset architecture replaces the old \(K\le40\)-only staged interpretation.
3. The finite subset-factor theorem and exact AF/AEF/no-C covers are promoted into the mathematical setup of the sandbox draft.
4. The Six-Domain/19-Family theorem is inserted as the main occurrence-geometry result.
5. Carry/mechanical language is retained only as an organizing corollary, with classical status stated explicitly.
6. The \(E\to A\) exact \(361/419/380\) constraint decomposition and suffix obstruction are added.
7. The exposure-matched RX/H result replaces the earlier single-\(E\) R interpretation.
8. The first strong finite separation is stated at `AFE_EXISTS`, not at the downstream intersection.
9. AFE reachability, first-hit cutsets, multinomial cylinder mass, and trie certificates are added after independent clean-room audit.
10. Static support, raw target-collision count, and extinction depth are recorded as non-explanations rather than promoted mechanisms.
11. Canonical \(E\)-pool nonemptiness is explicitly identified as a selection effect.
12. No new novelty or Mäkelä claim is made.


---

## Appendix C. General affine atomic-mass formula

For a reduced atomic constraint with distinct nonzero support depths
\[
0<d_1<\cdots<d_m<40
\]
and coefficients \(\alpha_j\), define segment lengths
\[
\ell_1=d_1,\qquad \ell_s=d_s-d_{s-1},
\]
segment Parikh vectors
\[
Y_1=X_{d_1},\qquad Y_s=X_{d_s}-X_{d_{s-1}},
\]
and cumulative coefficients
\[
\beta_s=\sum_{j=s}^{m}\alpha_j.
\]
Then
\[
\sum_j\alpha_jX_{d_j}
=
\sum_s\beta_sY_s.
\]

For a forbidden target \(t\), the exact number of profile-\(h\) words satisfying
the affine equality is
\[
\omega(\alpha,t;h)
=
\sum_{\mathcal Y(t)}
\left(
\prod_{s=1}^{m}\binom{\ell_s}{Y_s}
\right)
\binom{40-d_m}{h-\sum_sY_s},
\]
where the finite sum ranges over nonnegative segment vectors satisfying
\[
|Y_s|_1=\ell_s,\qquad
\sum_s\beta_sY_s=t,\qquad
\sum_sY_s\le h.
\]

For a finite target set, the masses add because the affine expression takes one
unique vector value on each word. The pure internal Abelian-square formula in
Section 12 is the translation-invariant zero-target specialization.

A separate toy verifier compared this segment formula with direct enumeration
on \(150\) random small fixed-profile systems with zero disagreements. The
verification is a falsification layer, not part of the proof.


---

## Appendix D. v0.33 referee-repair record

The v0.33 pass incorporates the independent v0.32a referee audit without changing the central mathematical conclusions.

Repairs include:

1. the joint `263/263` two-solver agreement is attached to the `AF_AND_AFE_EXISTS` predicate it actually validates, and a separate independent `263/263` cross-check is recorded for `AFE_EXISTS`;
2. the weighted frontier theorem is retained, but the claimed compression benefit is removed: for the actual \(L=40\) AFE system the frontier remembers essentially the full prefix and every realized quotient multiplicity is \(1\);
3. the \(34\to19\) quotient, cardinalities, and distinctness are relabeled as exact independently verified statements whose full derivations remain in the proof-closure supplement;
4. the arity-zero AFE class and raw-window/effective-constraint distinction are stated explicitly;
5. the current-Parikh counterexample is replaced by a genuine \(K=2\) example;
6. the unstable \(L=4\) wording is corrected;
7. the undefined `Gate T` and unsupported ADEF stage are removed from the active architecture;
8. generic first-hit/frontier/DAG methods are explicitly excluded from novelty claims;
9. selected bibliography entries are corrected only where authoritative metadata was verified; uncertain entries are not silently completed.

Mäkelä remains **OPEN** and `NOVELTY_UNRESOLVED`.


---

## Appendix E. Final v0.33 promotion closure

A preregistered independent AFE-only cross-check was run on all \(263\) quota-matched canonical H pairs after the v0.32a referee audit. The second implementation returned exactly \(86\) AFE-positive and \(177\) AFE-negative verdicts, agreeing with the primary implementation on \(263/263\) cases with zero unresolved cases. A third, solver-free literal checker validated one \(F\) witness for each of the \(86\) positive pairs; all passed. Forty-two pairs are AFE-positive but joint-`AF_AND_AFE_EXISTS`-negative, providing a direct control that the second route is genuinely AFE-only.

This closes the final computational promotion gap identified by the referee audit. The remaining deferred issues are submission-level rather than canonical-v0.33 blockers: specialist novelty closure, full primary-source bibliography audit, incorporation of the complete 19-family cardinality derivations into the paper or supplement, and any future weighted-frontier H/RX mechanism experiment.

Mäkelä remains **OPEN**. `NOVELTY_UNRESOLVED`.
