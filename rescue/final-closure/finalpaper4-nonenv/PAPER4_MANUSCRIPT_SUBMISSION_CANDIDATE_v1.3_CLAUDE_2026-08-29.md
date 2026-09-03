# Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

**Submission candidate v1.3 — 2026-08-29**
**Author(s):** [to be inserted]

## Abstract

Let a word over an output alphabet \(\Sigma\) be produced from a source word by
a coding that sends every source letter to a block of a fixed length \(L\).
Suppose all block images but one have been chosen; call the remaining source
letter the *unresolved role*. Every candidate Abelian square in the output then
imposes a linear relation among three prefix Parikh vectors of the unresolved
block, taken at equally spaced cutpoints. The already assigned blocks contribute
only a constant, so each such relation splits into a *support*, carried by the
unresolved role, and an *affine target*, carried by the assigned data.

We classify the support layer exactly. Writing the half-period as \(K=qL+r\)
with \(0\le r<L\), the three cutpoints induce two binary carries; retaining the
carry pair together with the distinction \(q=0\) versus \(q\ge1\) yields six
physical cutpoint domains. Projecting onto the unresolved role, and enforcing
the constraint that two cutpoints lying in the same block must carry the same
occurrence bit, leaves exactly \(34\) realizable domain/mask patterns.
Quotienting these by equality of their complete reduced support sets yields
exactly \(19\) support families for every \(L\ge5\). We give closed cardinality
formulas for all nineteen and prove pairwise distinctness by an invariant
argument valid for all \(L\ge5\). The classification is independent of
\(\Sigma\), of the prescribed Parikh profile of the unresolved block, and of the
concrete assigned words.

We then show that once a profile is prescribed, each reduced signature has an
exact finite set of reachable target values, giving a decidable feasibility
criterion for an individual target-loaded window. A length-\(40\) ternary coding
over a six-letter morphic source illustrates the framework.

---

## 1. Introduction

Two words are *Abelian equivalent* when they have the same Parikh vector. An
**Abelian square** is a factor \(UV\) with \(|U|=|V|\) and
\(\Psi(U)=\Psi(V)\). Deciding whether a given finite word contains one is
routine: inspect the candidate factors. That direct view, however, discards
structure whenever the word is not arbitrary but is produced by a uniform block
coding whose images are being chosen one at a time.

Consider a source word over a macro alphabet, coded blockwise by a map sending
each source letter to a block of common length \(L\). In a staged construction
one fixes some block images and leaves others open. Suppose exactly one role
\(X\) is still unresolved. A candidate Abelian square with cutpoints
\(t_0,t_1,t_2\) in arithmetic progression then yields

\[
P(t_0)-2P(t_1)+P(t_2)=0 ,
\]

where \(P(t)\) is the Parikh vector of the coded prefix of length \(t\). Each
cutpoint lands in some block. Cutpoints in assigned blocks contribute known
vectors; cutpoints in occurrences of \(X\) contribute prefix vectors of the
unknown word. Moving the known part to the right-hand side leaves a relation of
the schematic form

\[
x_i-2x_j+x_k=\text{(target determined by assigned data)},
\]

where \(x_i\) denotes the Parikh vector of the length-\(i\) prefix of the
unresolved block, and where a term is absent when the corresponding cutpoint
lies in an assigned block.

**This paper classifies the possible left-hand sides.** The question is prior to
any search: before asking whether a particular target can be avoided, one may
ask which linear forms can arise at all.

### 1.1 The main theorem

The answer is a finite chain of exact reductions.

> **Theorem A (classification; proved as Theorem 5.1).**
> Let \(L\ge5\) and consider a uniform \(L\)-block coding with exactly one
> unresolved role \(X\). Every Abelian-square constraint of half-period
> \(K\ge2\) lies in exactly one of **six** physical carry domains. Across all
> occurrence masks there are exactly **34** physically realizable domain/mask
> patterns. Identifying two patterns when their complete reduced \(X\)-support
> sets coincide leaves exactly **19** support families. Each family has a closed
> cardinality (Table 2), and the nineteen are pairwise distinct for every
> \(L\ge5\).

Schematically,

\[
\boxed{
\text{three cutpoints}
\longrightarrow
6\text{ carry domains}
\longrightarrow
34\text{ realizable patterns}
\longrightarrow
19\text{ support families}.
}
\]

Three features are worth emphasizing at the outset.

*The number \(19\) does not depend on the data.* It is independent of the output
alphabet, of the prescribed Parikh profile of the unresolved block, and of the
concrete assigned words. Those enter only through the affine targets.

*The three numbers count different objects.* Six counts geometric domains, \(34\)
counts physically possible domain/mask cases, and \(19\) counts equality classes
of complete support sets. The passage from \(34\) to \(19\) is the substantive
step, and it is not a symmetry argument alone: two of the six domains are
one-point truncations of others, and we show precisely which masks feel that
truncation and which do not.

*The classification is a statement about supports, not about feasibility.* A
family is a schema, not a constraint; a single family may be instantiated with
many different targets.

### 1.2 The support/target interface

Separating support from target is useful because the two layers can be handled
by different means. Section 7 makes the interface exact in one direction: once a
Parikh profile \(\rho\) is prescribed for the unresolved block, every reduced
signature \(\sigma\) has an exact finite set \(\mathcal R_\sigma(\rho)\) of
target values it can attain, and a target-loaded window is completable precisely
when its target lies in that set. This is a criterion for one window under one
profile; it is not a certificate for the whole coding, and it does not address
long periods.

### 1.3 Positioning

The ingredients around this result are classical. Prefix Parikh second
differences appear in Carpi's criteria for Abelian power-free morphisms, with
binary whole-image correction selectors; the template method of Currie and
Rampersad organizes Abelian-power avoidance through finite boundary corrections;
and carry sequences arising from Euclidean division are standard objects in the
theory of mechanical words. We claim none of that machinery. What is proved here
is the role-projected partial-assignment classification itself: the six physical
domains, the physically consistent masks, the complete reduced support sets, and
their exact \(34\to19\) quotient. Section 10 makes the comparison with Carpi's
condition explicit, including a precise statement of what the local data of that
condition does and does not determine.

### 1.4 Organization

Sections 2–6 are the general theory and are self-contained: Section 2 fixes
terminology, Section 3 derives the six domains, Section 4 performs the role
projection, Section 5 proves Theorem A, and Section 6 gives the cardinalities
and the distinctness argument. Section 7 develops the profile-level feasibility
criterion. Sections 8 and 9 apply the framework to staged synthesis and to a
concrete length-\(40\) coding. Section 10 discusses earlier work and Section 11
closes with limitations. Appendix A derives the cardinality formulas; Appendix B
records the counting identity used in Section 9.

The proof of Theorem A is symbolic and does not depend on the accompanying
software, which serves as a falsification and reproducibility layer.

---

## 2. Setting and notation

A **word** over a finite alphabet is a finite sequence of letters; \(w[i..j)\)
denotes the factor from position \(i\) inclusive to \(j\) exclusive, and a
**prefix** is a factor \(w[0..j)\). A **factor** of \(w\) is any \(w[i..j)\), and
\(\operatorname{Fact}(w)\) is the set of all factors of \(w\). The **Parikh
vector** \(\Psi(w)\in\mathbb N^{|\Sigma|}\) records the number of occurrences of
each letter; \(e_\alpha\) denotes the standard basis vector of the letter
\(\alpha\), and \(|v|_1\) the coordinate sum of \(v\).

Let \(\Gamma\) be a finite **source alphabet**, \(\Sigma\) a finite **output
alphabet**, and

\[
H:\Gamma\to\Sigma^L
\]

an **\(L\)-uniform coding**: every source letter is sent to a block of the same
length \(L\). The coding is **partially assigned** when the images of all source
letters but one are fixed; the exceptional letter \(X\in\Gamma\) is the
**unresolved role**, and \(H(X)\) is unknown.

For the unresolved block define the formal **prefix states**

\[
x_i=\Psi\bigl(H(X)[0..i)\bigr),
\qquad 0\le i\le L,
\qquad x_0=0 .
\]

We treat \(x_1,\dots,x_{L-1}\) as formal symbols; \(x_0\) and \(x_L\) are known
(\(x_0=0\), and \(x_L\) is the prescribed profile when one is fixed).

Consider a candidate Abelian square starting at position \(s\) with half-period
\(K\ge2\). Its **cutpoints** are

\[
t_0=s,\qquad t_1=s+K,\qquad t_2=s+2K,
\]

and each has a unique uniform-block decomposition

\[
t_j=b_jL+i_j,\qquad 0\le i_j<L ,
\]

in which \(b_j\) is the **block index** and \(i_j\) the **local depth**. The
**occurrence mask** of the window is the triple
\(\chi=(\chi(b_0),\chi(b_1),\chi(b_2))\in\{0,1\}^3\), where

\[
\chi(b)=
\begin{cases}
1,&\text{if block }b\text{ is an occurrence of }X,\\
0,&\text{otherwise.}
\end{cases}
\]

The Abelian-square condition is the prefix second difference
\(P(t_0)-2P(t_1)+P(t_2)=0\). Moving all assigned-block contributions to the
right leaves the **reduced support signature**

\[
\sigma
=
\operatorname{red}\bigl(
\chi(b_0)\,x_{i_0}
-2\chi(b_1)\,x_{i_1}
+\chi(b_2)\,x_{i_2}
\bigr),
\tag{2.1}
\]

where \(\operatorname{red}\) deletes terms with \(i=0\) (since \(x_0=0\)),
combines terms of equal depth, and deletes zero coefficients. The **empty
signature** \(0\) is legitimate: it means the window is decided entirely by
assigned data. The constant that was moved to the right is the window's
**affine target**.

A **support family** is the complete set of reduced signatures obtained from one
geometric domain under one physically consistent occurrence mask. Two families
are equal when these sets are equal.

---

## 3. Cutpoint geometry: the six carry domains

Write the half-period by Euclidean division,

\[
K=qL+r,\qquad 0\le r<L ,
\tag{3.1}
\]

and define the two **carry bits**

\[
c_j=\Bigl\lfloor\frac{i_j+r}{L}\Bigr\rfloor\in\{0,1\},\qquad j=0,1 .
\tag{3.2}
\]

Since \(0\le i_j<L\) and \(0\le r<L\) we have \(0\le i_j+r<2L\), so \(c_j\) is
indeed binary, and

\[
i_{j+1}=i_j+r-Lc_j,
\qquad
b_{j+1}-b_j=q+c_j .
\tag{3.3}
\]

Thus \(q\) counts the whole blocks traversed by the half-period, while \(c_j\)
records whether the remainder \(r\) crosses one further block boundary at step
\(j\). **These two pieces of information are independent**, and keeping them
apart is what produces six domains rather than three: the local depths and
carries can be identical while \(q\) differs, and then the cutpoints occupy a
different number of distinct blocks.

Put \(g_1=b_1-b_0\) and \(g_2=b_2-b_1\). The **macro curvature** is

\[
\kappa=g_2-g_1=c_1-c_0\in\{-1,0,+1\} .
\tag{3.4}
\]

Because \(t_0-2t_1+t_2=0\) identically, we also have
\(L(b_0-2b_1+b_2)+(i_0-2i_1+i_2)=0\), that is,

\[
i_0-2i_1+i_2=-\kappa L .
\tag{3.5}
\]

Writing \(a=i_0\) and \(\eta=i_1-i_0\) gives the local normal form

\[
i_0=a,\qquad i_1=a+\eta,\qquad i_2=a+2\eta-\kappa L,
\qquad K=g_1L+\eta .
\tag{3.6}
\]

All of these identities are exact.

### Lemma 3.1 (six physical domains)

For \(K\ge2\), every candidate window lies in exactly one of the six domains
determined by the pair \(\bigl(q\in\{0\}\text{ or }q\ge1,\ (c_0,c_1)\bigr)\),
as follows.

| domain | regime | block relation | \(\kappa\) |
|---|---|---|---:|
| \(Z_s\) | \(q=0\), \((c_0,c_1)=(0,0)\) | \(b_0=b_1=b_2\) | \(0\) |
| \(P_t\) | \(q=0\), \((0,1)\) | \(b_0=b_1<b_2\) | \(+1\) |
| \(M_t\) | \(q=0\), \((1,0)\) | \(b_0<b_1=b_2\) | \(-1\) |
| \(Z\) | \(q=0,(1,1)\) or \(q\ge1,\ c_0=c_1\) | \(b_0<b_1<b_2\) | \(0\) |
| \(P\) | \(q\ge1\), \((0,1)\) | \(b_0<b_1<b_2\) | \(+1\) |
| \(M\) | \(q\ge1\), \((1,0)\) | \(b_0<b_1<b_2\) | \(-1\) |

*Table 1. The six domains. The carry pair fixes the curvature; the regime
\(q=0\) versus \(q\ge1\) fixes how many distinct blocks the cutpoints occupy.*

As sets of local triples \((i_0,i_1,i_2)=(u,v,w)\),

\[
Z=\{(u,v,w):u+w=2v\},\quad
P=\{(u,v,w):u+w=2v-L\},\quad
M=\{(u,v,w):u+w=2v+L\},
\tag{3.7}
\]

each subject to \(0\le u,v,w<L\), and

\[
Z_s=\{(a,a+\eta,a+2\eta):\eta\ge2,\ a\ge0,\ a+2\eta\le L-1\},
\tag{3.8}
\]

\[
P_t=\{(a,a+\eta,a+2\eta-L):\eta\ge2,\ a+\eta\le L-1,\ a+2\eta\ge L\},
\tag{3.9}
\]

\[
M_t=\{(a,a+\eta-L,a+2\eta-L):\eta\ge2,\ a+\eta\ge L,\ a+2\eta\le 2L-1\}.
\tag{3.10}
\]

#### Proof

The pair \(\bigl(q,(c_0,c_1)\bigr)\) is exhaustive, and by (3.3) the block gaps
are \(g_1=q+c_0\), \(g_2=q+c_1\). If \(q=0\) and \(c_0=c_1=0\) both gaps vanish,
so all three cutpoints lie in one block; here \(K=r=\eta\ge2\), giving (3.8). If
\(q=0\) with \((c_0,c_1)=(0,1)\) then \(g_1=0<g_2\), and (3.6) with
\(\kappa=+1\) gives (3.9); the case \((1,0)\) is symmetric and gives (3.10). In
every remaining case both gaps are positive, so the three blocks are distinct,
and (3.5) gives the three lattice conditions (3.7) according to
\(\kappa\in\{0,+1,-1\}\).

Conversely each lattice point of \(Z\), \(P\), \(M\) is realized with three
distinct blocks: given \((u,v,w)\), set \(c_0=c_1=0\) and \(r=v-u\) if \(v\ge u\),
otherwise \(c_0=c_1=1\) and \(r=v-u+L\in[1,L-1]\), for \(Z\); take
\((c_0,c_1)=(0,1)\) for \(P\) and \((1,0)\) for \(M\); then choose any \(q\ge1\),
which gives \(K\ge L\ge2\) and \(g_1,g_2\ge1\). \(\square\)

**Worked example.** Let \(L=5\), \(K=2\), \(i_0=0\). Then \(q=0\), \(r=2\), and
(3.3) gives \((i_0,i_1,i_2)=(0,2,4)\) with \((c_0,c_1)=(0,0)\). All three
cutpoints lie in one block, so this is a \(Z_s\) window. If that block is an
occurrence of \(X\), the raw support is \(x_0-2x_2+x_4\), which reduces to
\(-2x_2+x_4\) because \(x_0=0\). This is the smallest nonempty same-block
signature, and it is the reason \(L\ge5\) is the natural hypothesis: for
\(L\le4\) the conditions \(\eta\ge2\) and \(a+2\eta\le L-1\) are incompatible, so
\(Z_s=\varnothing\).

### Lemma 3.2 (one-point truncation)

For \(L\ge4\),

\[
P_t=P\setminus\{p^+\},\quad p^+=(L-2,\,L-1,\,0),
\qquad
M_t=M\setminus\{p^-\},\quad p^-=(L-1,\,0,\,1).
\tag{3.11}
\]

#### Proof

A point of \(P\) is realizable with \(q=0\) exactly when the half-period
\(K=\eta=v-u\) satisfies \(\eta\ge2\); so \(P\setminus P_t\) consists of the
points of \(P\) with \(v-u\le1\). Using \(w=2v-L-u\):

- if \(v-u=1\) then \(w=v+1-L\), and \(w\ge0\) forces \(v\ge L-1\), hence
  \(v=L-1\), \(w=0\), \(u=L-2\), which is \(p^+\);
- if \(v-u=0\) then \(w=v-L<0\), impossible;
- if \(v-u<0\) then \(w=v+(v-u)-L<v-L<0\), impossible.

For \(M\), realizability with \(q=0\) requires \(K=\eta+L=v-u+L\in[2,L-1]\), i.e.
\(v-u\le-1\) and \(v-u\ge2-L\). Using \(w=2v+L-u\): if \(v-u\ge0\) then
\(w\ge L\), impossible; if \(v-u=1-L\) then \(u=v+L-1\le L-1\) forces \(v=0\),
\(u=L-1\), \(w=1\), which is \(p^-\); and \(v-u<1-L\) forces \(u>L-1\),
impossible. \(\square\)

![Six carry domains](FIG1_SIX_CARRY_DOMAINS.pdf)

*Figure 1. The six physical domains of Lemma 3.1. The carry pair determines the
curvature; the regime \(q=0\) versus \(q\ge1\) separates the same-block and
truncated domains from their full analogues.*

---

## 4. Partial assignment: role projection and support reduction

The occurrence mask \(\chi=(\chi_0,\chi_1,\chi_2)\) is not free. If two
cutpoints lie in the same macro block, they refer to the same occurrence, so
their bits must agree. This is where physical placement and formal algebra
diverge: one may not attach an arbitrary three-bit mask to cutpoints that are
not in three distinct blocks.

### Lemma 4.1 (exactly 34 realizable patterns)

For \(L\ge5\) the physically consistent domain/mask pairs are:

- \(Z_s\) (one block, \(\chi_0=\chi_1=\chi_2\)): the \(2\) masks \(000,111\);
- \(P_t\) (\(b_0=b_1<b_2\), \(\chi_0=\chi_1\)): the \(4\) masks
  \(000,001,110,111\);
- \(M_t\) (\(b_0<b_1=b_2\), \(\chi_1=\chi_2\)): the \(4\) masks
  \(000,100,011,111\);
- \(Z\), \(P\), \(M\) (three distinct blocks): all \(8\) masks each.

Hence the number of realizable domain/mask patterns is

\[
2+4+4+8+8+8=34 .
\tag{4.1}
\]

Every one of the \(34\) is geometrically realized for \(L\ge5\): each domain is
nonempty by Lemma 3.1 and the worked example, and on distinct blocks the
occurrence bits may be prescribed independently by choosing the source word.

For a mask \(\chi\) define the projection

\[
\pi_\chi(u,v,w)=\operatorname{red}\bigl(\chi_0x_u-2\chi_1x_v+\chi_2x_w\bigr),
\tag{4.2}
\]

and let the family of a domain/mask pair \((D,\chi)\) be the complete image
\(\pi_\chi(D)\).

Three mechanisms identify families, and it is worth naming them separately
because only the third is delicate.

**(i) Trivial mask.** For \(\chi=000\) every point yields the empty signature, so
all six \(000\) patterns give the same family

\[
E=\{0\} .
\tag{4.3}
\]

**(ii) Outer reversal.** The outer coefficients in (4.2) are both \(+1\), so
\(\pi_\chi\) is invariant under simultaneously swapping \(u\leftrightarrow w\)
and \(\chi_0\leftrightarrow\chi_2\). Each full domain \(Z,P,M\) is invariant as a
set under \((u,v,w)\mapsto(w,v,u)\), since its defining equation in (3.7) is
symmetric in \(u\) and \(w\). Hence for \(D\in\{Z,P,M\}\)

\[
\pi_{001}(D)=\pi_{100}(D),
\qquad
\pi_{011}(D)=\pi_{110}(D).
\tag{4.4}
\]

So each full domain contributes five families besides \(E\), namely those of the
masks \(001\!\sim\!100\), \(010\), \(011\!\sim\!110\), \(101\), \(111\).

**(iii) Truncation transfer.** By Lemma 3.2 the truncated domains omit one point
each. Whether a family changes depends on whether the omitted point's signature
is produced by some *other* point of the truncated domain. It is, for three of
the four masks, and the exceptions are exactly one on each side.

### Lemma 4.2 (which masks feel the truncation)

Let \(L\ge5\). On the positive side, \(\pi_\chi(P_t)=\pi_\chi(P)\) for
\(\chi\in\{000,001,111\}\), while

\[
\pi_{110}(P_t)=\pi_{110}(P)\setminus\{x_{L-2}-2x_{L-1}\} .
\tag{4.5}
\]

On the negative side, \(\pi_\chi(M_t)=\pi_\chi(M)\) for
\(\chi\in\{000,100,111\}\), while

\[
\pi_{011}(M_t)=\pi_{011}(M)\setminus\{x_1\} .
\tag{4.6}
\]

#### Proof

Consider \(p^+=(L-2,L-1,0)\), whose last coordinate is \(0\) and therefore always
deleted by \(\operatorname{red}\).

For \(\chi=000\) both families are \(E\). For \(\chi=001\) only the third
cutpoint is active and \(\pi_{001}(p^+)=\operatorname{red}(x_0)=0\); the same
value is produced by any point of \(P_t\) with \(w=0\), for instance
\((2v-L,\,v,\,0)\) with \(\lceil L/2\rceil\le v\le L-2\), which satisfies
\(v-u=L-v\ge2\) and exists for \(L\ge4\). So no signature is lost.

For \(\chi=110\) we get \(\pi_{110}(p^+)=x_{L-2}-2x_{L-1}\). A reduced signature
with coefficient pattern \((+1,-2)\) determines both of its depths, so any point
of \(P\) with this image has \(u=L-2\) and \(v=L-1\); then
\(w=2v-L-u=0\) forces the point to be \(p^+\) itself. Hence exactly this one
signature is lost, giving (4.5).

For \(\chi=111\) we again get \(\pi_{111}(p^+)=x_{L-2}-2x_{L-1}\), because
\(w=0\) is deleted. But now the point

\[
(0,\;L-1,\;L-2)
\]

lies in \(P_t\) — take \(a=0\), \(\eta=L-1\ge2\), so that \(a+\eta=L-1\le L-1\)
and \(a+2\eta-L=L-2\) — and its *first* coordinate is \(0\), so
\(\pi_{111}(0,L-1,L-2)=-2x_{L-1}+x_{L-2}\), the same reduced form. The signature
therefore survives, and no family changes.

The negative side is symmetric. For \(p^-=(L-1,0,1)\) the middle coordinate is
\(0\). Under \(\chi=011\) we get \(\pi_{011}(p^-)=x_1\), which requires a point
with \(v=0\) and \(w=1\); then \(u=2v+L-w=L-1\) forces \(p^-\), so this signature
is lost, giving (4.6). Under \(\chi=111\) we get
\(\pi_{111}(p^-)=x_{L-1}+x_1\), which is also produced by
\((1,0,L-1)\in M_t\); under \(\chi=100\) we get \(x_{L-1}\), produced by other
points. \(\square\)

The reason for the asymmetry between masks \(110\) and \(111\) is worth stating
plainly, since it is the one step that a symmetry argument would miss: the two
masks assign the *same* reduced form to \(p^+\), because the deleted
zero-depth term makes the third coefficient invisible; but only under \(111\)
is there a second point of \(P_t\) whose *own* zero-depth deletion produces that
same form. Truncation is felt exactly when no such alternative witness exists.

---

## 5. The classification theorem

### Theorem 5.1 (exact support classification)

Let \(L\ge5\), and consider a uniform \(L\)-block coding with one unresolved role
\(X\). Every Abelian-square support constraint of half-period \(K\ge2\) belongs
to exactly one of the six physical carry domains of Lemma 3.1. Across all
occurrence masks there are exactly \(34\) physically realizable domain/mask
patterns. Quotienting by equality of complete reduced \(X\)-support sets yields
exactly \(19\) support families, listed with their cardinalities in Table 2.

The classification depends on neither the output alphabet, nor the prescribed
Parikh profile of \(H(X)\), nor the concrete assigned block words; these affect
only the affine targets.

#### Proof

Lemma 3.1 gives the exhaustive six-domain partition and Lemma 4.1 the \(34\)
realizable patterns. We count the families.

The six masks \(000\) give the single family \(E\), contributing \(1\).

The domain \(Z_s\) has only the further mask \(111\), contributing \(1\).

Each full domain \(Z,P,M\) contributes five families besides \(E\), by outer
reversal (4.4): that is \(5\) each.

By Lemma 4.2 the truncated domain \(P_t\) reproduces the families of \(P\) for
masks \(000,001,111\) and contributes exactly one new family, namely
\(\pi_{110}(P_t)\); similarly \(M_t\) contributes exactly one new family
\(\pi_{011}(M_t)\).

Hence the number of families is at most

\[
\underbrace{1}_{E}
+\underbrace{1}_{Z_s}
+\underbrace{5}_{Z}
+\underbrace{5+1}_{P,\,P_t}
+\underbrace{5+1}_{M,\,M_t}
=19 .
\tag{5.1}
\]

Theorem 6.2 shows that the nineteen listed families are pairwise distinct for
every \(L\ge5\), so the bound is attained. \(\square\)

**Small \(L\).** The equality-class counts for \(L=2,3,4,5,6,7\) are
\(9,15,19,19,19,19\). The value \(19\) is already reached at \(L=4\), but the
classes there are *not* the stable list of Table 2: by the worked example
\(Z_s=\varnothing\) for \(L\le4\), so the same-block class is the empty set of
signatures rather than the nonempty family occurring from \(L=5\) on. The first
same-block window with \(K\ge2\) exists exactly when \(L\ge5\), which is
therefore the natural hypothesis of Theorem 5.1.

---

## 6. The nineteen families

We name a family by its domain and by the shape of its mask, using

\[
\mathrm O:\;x_u,
\qquad
\mathrm C:\;-2x_v,
\qquad
\mathrm{CO}:\;x_u-2x_v,
\qquad
\mathrm{OO}:\;x_u+x_w,
\qquad
\mathrm A:\;x_u-2x_v+x_w,
\]

up to outer reversal; thus \(\mathrm O\) is the one-outer mask, \(\mathrm C\) the
centre mask, \(\mathrm{CO}\) centre-plus-one-outer, \(\mathrm{OO}\) both outers,
and \(\mathrm A\) all three active. (These labels describe the mask, not the
reduced signature: deletion of a zero-depth term can shorten a signature.)

| family | domain and mask | cardinality | \(L=40\) |
|---|---|---:|---:|
| \(E\) | any domain, mask \(000\) | \(1\) | \(1\) |
| \(Z_s\)-A | \(Z_s\), \(111\) | \(\lfloor(L-3)^2/4\rfloor\) | \(342\) |
| \(Z\)-O | \(Z\), \(001\!\sim\!100\) | \(L\) | \(40\) |
| \(Z\)-C | \(Z\), \(010\) | \(L\) | \(40\) |
| \(Z\)-CO | \(Z\), \(011\!\sim\!110\) | \(\lceil L^2/2\rceil\) | \(800\) |
| \(Z\)-OO | \(Z\), \(101\) | \(\lfloor(L+1)^2/4\rfloor\) | \(420\) |
| \(Z\)-A | \(Z\), \(111\) | \(\lfloor(L-1)^2/4\rfloor+1\) | \(381\) |
| \(P\)-O | \(P\), \(001\!\sim\!100\) | \(L-1\) | \(39\) |
| \(P\)-C | \(P\), \(010\) | \(\lfloor L/2\rfloor\) | \(20\) |
| \(P\)-CO | \(P\), \(011\!\sim\!110\) | \(\lfloor L^2/4\rfloor\) | \(400\) |
| \(P\)-OO | \(P\), \(101\) | \(\binom{\lfloor L/2\rfloor+1}{2}\) | \(210\) |
| \(P\)-A | \(P\), \(111\) | \(\binom{\lfloor L/2\rfloor+1}{2}\) | \(210\) |
| \(P_t\)-CO | \(P_t\), \(110\) | \(\lfloor L^2/4\rfloor-1\) | \(399\) |
| \(M\)-O | \(M\), \(001\!\sim\!100\) | \(L-1\) | \(39\) |
| \(M\)-C | \(M\), \(010\) | \(\lfloor L/2\rfloor\) | \(20\) |
| \(M\)-CO | \(M\), \(011\!\sim\!110\) | \(\lfloor L^2/4\rfloor\) | \(400\) |
| \(M\)-OO | \(M\), \(101\) | \(\binom{\lfloor L/2\rfloor+1}{2}\) | \(210\) |
| \(M\)-A | \(M\), \(111\) | \(\binom{\lfloor L/2\rfloor+1}{2}\) | \(210\) |
| \(M_t\)-CO | \(M_t\), \(011\) | \(\lfloor L^2/4\rfloor-1\) | \(399\) |

*Table 2. The nineteen support families. Derivations are in Appendix A.*

### 6.1 Structural facts

The following consequences of (3.7) are used repeatedly and are immediate from
\(0\le u,v,w\le L-1\).

\[
\text{In }P:\quad v\ge\lceil L/2\rceil\ge1,
\qquad u,w\le L-2 ;
\tag{6.1}
\]

\[
\text{In }M:\quad u,w\ge1,
\qquad v\le\lfloor L/2\rfloor-1 .
\tag{6.2}
\]

Indeed \(u+w=2v-L\ge0\) forces \(v\ge L/2\), and \(w=2v-L-u\le2(L-1)-L=L-2\);
dually \(u=2v+L-w\ge L-(L-1)=1\) and \(2v+L=u+w\le2L-2\). In \(Z\) all three
coordinates attain \(0\), since \((0,0,0)\in Z\).

### 6.2 Pairwise distinctness

Cardinality alone does not separate the nineteen families: for instance
\(P\)-OO, \(P\)-A, \(M\)-OO and \(M\)-A share the cardinality
\(\binom{\lfloor L/2\rfloor+1}{2}\). We use two further invariants.

The first is the **coefficient shape**: the multiset of coefficients occurring in
a reduced signature, one of
\(\varnothing,\ (1),\ (-2),\ (2),\ (1,1),\ (1,-2),\ (1,-2,1)\).

The second is the **depth moment** of a signature
\(\sigma=\sum_i\alpha_ix_i\),

\[
\mu(\sigma)=\sum_{i=1}^{L-1}i\,\alpha_i .
\tag{6.3}
\]

By (3.5), a family's moments are constrained by its curvature: an \(\mathrm A\)
signature with all depths nonzero has \(\mu=u-2v+w=-\kappa L\).

### Theorem 6.2 (distinctness)

For every \(L\ge5\) the nineteen families of Table 2 are pairwise distinct.

#### Proof

Group the families by the coefficient shapes they contain. This already
separates the groups from one another: \(E\) contains only \(\varnothing\);
\(\mathrm O\)-families contain \((1)\) and no negative coefficient;
\(\mathrm C\)-families contain \((-2)\) and no positive coefficient;
\(\mathrm{CO}\)-families contain a two-depth \((1,-2)\) signature;
\(\mathrm{OO}\)-families contain \((1,1)\) or \((2)\) and no negative
coefficient; and the \(\mathrm A\)-families contain a three-depth
\((1,-2,1)\) signature, which no other group does. It remains to separate within
each group.

*Within \(\mathrm O\).* By (5.8) below, \(Z\)-O \(=\{0,x_1,\dots,x_{L-1}\}\),
\(P\)-O \(=\{0,x_1,\dots,x_{L-2}\}\), and \(M\)-O \(=\{x_1,\dots,x_{L-1}\}\).
These are distinct: \(M\)-O omits the empty signature, by (6.2), whereas the
other two contain it; and \(Z\)-O contains \(x_{L-1}\) while \(P\)-O does not,
by (6.1).

*Within \(\mathrm C\).* Similarly \(Z\)-C \(=\{0,-2x_1,\dots,-2x_{L-1}\}\)
contains the empty signature and every depth; \(P\)-C
\(=\{-2x_v:\lceil L/2\rceil\le v\le L-1\}\) omits the empty signature by (6.1);
and \(M\)-C \(=\{0\}\cup\{-2x_v:1\le v\le\lfloor L/2\rfloor-1\}\) contains it but
has all depths below \(L/2\), by (6.2). All three differ.

*Within \(\mathrm{CO}\).* The moments are disjoint. For \(Z\)-CO,
\(\mu=-2v+w\in[-(L-1),0]\); for \(P\)-CO, \(\mu=u-2v\in[-2L+2,-L]\); for
\(M\)-CO, \(\mu=-2v+w\in[1,L-1]\) by (6.2). Since \(L\ge5\) these three ranges
are pairwise disjoint. Each truncated family differs from its full counterpart
by exactly the one signature identified in Lemma 4.2, hence differs from it and,
having the same moment range, from the other two as well.

*Within \(\mathrm{OO}\).* Here \(\mu=u+w\). By (6.1) every \(P\)-OO moment is at
most \(L-2\), and by (6.2) every \(M\)-OO moment is at least \(L\); these two
families therefore have disjoint moment sets, which is what is needed since they
share the cardinality \(\binom{\lfloor L/2\rfloor+1}{2}\). Both differ from
\(Z\)-OO by cardinality instead: \(\lfloor(L+1)^2/4\rfloor\) is strictly larger
than \(\binom{\lfloor L/2\rfloor+1}{2}\) for every \(L\ge2\), as one sees by
comparing \(m(m+1)\) with \(m(m+1)/2\) for \(L=2m\) and \((m+1)^2\) with
\(m(m+1)/2\) for \(L=2m+1\). (Moment alone would not suffice here: for even
\(L\) the sets \(\mu(Z\text{-OO})\) and \(\mu(M\text{-OO})\) overlap, both
attaining the maximum \(2L-2\).)

*Within \(\mathrm A\).* For the full domains \(\mu\) is constant on signatures
with all depths nonzero: \(\mu(Z\text{-A})=0\), \(\mu(P\text{-A})=-L\),
\(\mu(M\text{-A})=+L\), separating the three. The same-block family
\(Z_s\)-A also has moment \(0\), but \(Z_s\)-A does **not** contain the empty
signature — its points have \(\eta\ge2\), so \(u,v,w\) are distinct and the
signature is never zero — whereas \(Z\)-A does, since \((d,d,d)\in Z\) reduces to
\(0\). Hence \(Z_s\)-A \(\ne\) \(Z\)-A.

Finally \(E\) is distinct from all others, since every other family contains a
nonempty signature. \(\square\)

For reference, the one-coordinate families used above are

\[
Z\text{-O}=\{0,x_1,\dots,x_{L-1}\},
\quad
P\text{-O}=\{0,x_1,\dots,x_{L-2}\},
\quad
M\text{-O}=\{x_1,\dots,x_{L-1}\}.
\tag{5.8}
\]

### Corollary 6.3

For every \(L\ge5\), \(19\) is the exact number of classes under the compression
rule "identify two domain/mask cases when their complete reduced support sets
are equal."

This is a statement about that specific equivalence. It is **not** a
minimal-automaton theorem, and the nineteen families are not nineteen states of
any implementation.

---

## 7. Profile-level target feasibility

Theorem 5.1 classifies supports without reference to the unresolved block. Once a
total Parikh profile is prescribed, the target side becomes exactly decidable for
an individual window.

Fix \(\rho\in\mathbb N^{|\Sigma|}\) with \(|\rho|_1=L\), and let

\[
\sigma(x)=\sum_{j=1}^m a_jx_{d_j},
\qquad
0<d_1<\dots<d_m<L,
\tag{7.1}
\]

be a reduced support signature. Its **reachable target set** at profile \(\rho\)
is

\[
\mathcal R_\sigma(\rho)
=
\Bigl\{\textstyle\sum_{j}a_j\Psi\bigl(y[0..d_j)\bigr)\;:\;
y\in\Sigma^L,\ \Psi(y)=\rho\Bigr\}.
\tag{7.2}
\]

### Corollary 7.1 (exact single-window feasibility)

Let a candidate window with support signature \(\sigma\) reduce, after all
assigned contributions have been moved to the right-hand side, to
\(\sigma(x)=\tau\). Then some ordering of the unresolved block with profile
\(\rho\) makes that window an Abelian square if and only if

\[
\tau\in\mathcal R_\sigma(\rho).
\tag{7.3}
\]

In particular \(\tau\notin\mathcal R_\sigma(\rho)\) rules the window out for every
ordering of \(\rho\). Moreover \(\mathcal R_\sigma(\rho)\) can be computed
without enumerating block words: it is the set of values
\(\sum_ja_jy_{d_j}\) taken over integer vectors satisfying

\[
|y_{d_j}|_1=d_j\ (1\le j\le m),
\qquad
0\le y_{d_1}\le y_{d_2}\le\dots\le y_{d_m}\le\rho
\tag{7.4}
\]

componentwise.

#### Proof

Equation (7.3) is immediate from (7.2), since the left side of the window
equation is by construction the value of \(\sigma\) on the chosen block.

For the reformulation it suffices to show that integer vectors
\(y_{d_1},\dots,y_{d_m}\) arise as prefix Parikh vectors of a single word
\(y\in\Sigma^L\) with \(\Psi(y)=\rho\) exactly when (7.4) holds. Necessity is
clear, since prefixes are nested and their coordinate sums are their lengths.
Conversely, given (7.4), the consecutive differences

\[
y_{d_1},\quad y_{d_2}-y_{d_1},\quad\dots,\quad
y_{d_m}-y_{d_{m-1}},\quad \rho-y_{d_m}
\]

are nonnegative integer vectors whose coordinate sums are the lengths of the
corresponding segments. Choosing any word with each segment profile and
concatenating yields a word of length \(L\) and profile \(\rho\) with exactly the
prescribed prefix vectors. \(\square\)

**Scope.** Corollary 7.1 concerns *one* declared window and *one* fixed profile.
It does not certify a coding or a morphism, does not address other windows
simultaneously, does not bound long periods, and does not by itself imply that a
candidate survives any other constraint. The simultaneous problem is the subject
of Section 9.2.

---

## 8. Staged synthesis: complete subset gates

The compiler is most useful inside a staged construction if the roles already
assigned are certified completely before a new role is introduced. Let
\(w\in\Gamma^\omega\) be a fixed source word and \(S\subseteq\Gamma\) the set of
currently assigned roles. Call a factor of \(H(w)\) **\(S\)-supported** if the
shortest contiguous source factor whose coded image contains it uses only
letters of \(S\); that source factor is its **minimal macro support**. Write
\(S^*\) for the set of finite words over \(S\), and call \(c\) **factor-maximal**
in a finite language if no other word of that language contains \(c\) as a
contiguous factor.

### Lemma 8.1 (finite subset-factor gate)

Suppose \(\operatorname{Fact}(w)\cap S^*\) has bounded word length, and let
\(\mathcal C_S\) be its factor-maximal elements. Then every \(S\)-supported
factor of \(H(w)\) occurs inside \(H(c)\) for some \(c\in\mathcal C_S\);
conversely every factor of every \(H(c)\), \(c\in\mathcal C_S\), is a factor of
\(H(w)\). Consequently, the absence of all \(S\)-supported Abelian squares is
equivalent to checking the finitely many words \(H(c)\).

#### Proof

If an \(S\)-supported factor has minimal macro support
\(u\in\operatorname{Fact}(w)\cap S^*\), then by boundedness \(u\) is contained in
some factor-maximal \(c\in\mathcal C_S\). A uniform coding preserves aligned
factor containment, so \(H(u)\) is a factor of \(H(c)\) and hence so is the
original factor. The converse holds because each \(c\) is itself a factor of
\(w\). \(\square\)

If \(|c|=m\) then every Abelian square inside \(H(c)\) has half-period at most
\(\lfloor mL/2\rfloor\), which gives a finite completion bound for each
assigned-only stage.

**Scope.** Lemma 8.1 certifies only those squares whose minimal macro support
lies in \(S\). Squares whose support requires an unassigned role, and in
particular long periods spanning many blocks, are not addressed by it and remain
the subject of a separate certificate.

---

## 9. A length-\(40\) case study

We illustrate the framework on a concrete staged coding. Nothing in Sections 3–7
depends on this section.

Let \(\Gamma=\{a,b,c,d,e,f\}\) and let

\[
h_6:\;
a\mapsto ace,\;
b\mapsto adf,\;
c\mapsto bdf,\;
d\mapsto bdc,\;
e\mapsto afe,\;
f\mapsto bce
\tag{9.1}
\]

be the \(3\)-uniform morphism whose fixed point supplies the source language
\(\operatorname{Fact}(h_6^\omega(a))\). We seek ternary blocks of length \(40\)
with the prescribed profiles

\[
\begin{array}{c|ccc}
\text{role}&\#a&\#b&\#c\\\hline
A&15&14&11\\
B&11&12&17\\
C&10&14&16\\
D&12&10&18\\
E&13&16&11\\
F&19&11&10 .
\end{array}
\tag{9.2}
\]

These arise from a rank-one lift of the incidence matrix of a shorter coding of
the same source, using the following elementary fact. Here \(\mathbf 1\) denotes
the all-ones column vector of the appropriate dimension.

### Proposition 9.1 (kernel preservation under rank-one lifting)

Let the columns of \(B\) have common nonzero sum, let \(s\ne0\), and put
\(B'=sB+u\mathbf 1^{T}\). If the common column sum of \(B'\) is nonzero, then
\(\ker B'=\ker B\).

#### Proof

If \(Bx=0\) then summing coordinates gives \(\mathbf 1^{T}x=0\), whence
\(B'x=sBx+u\mathbf 1^{T}x=0\). Conversely \(B'x=0\) gives
\(\mathbf 1^{T}x=0\) from the nonzero common column sum, and then \(sBx=0\), so
\(Bx=0\). \(\square\)

Adding \((10,10,10)^{T}\) to every column of the shorter incidence matrix raises
the block length from \(10\) to \(40\) while preserving the relevant kernel.

**Subset covers.** For the source language of (9.1), independently regenerated
factor-maximal covers include

\[
\mathcal C_{\{A,F\}}=\{faf\},
\qquad
\mathcal C_{\{A,E,F\}}=\{eafea,\;fafea\},
\]
\[
\mathcal C_{\Gamma\setminus\{C\}}
=\{eafea,\;bdfadfbdfafea,\;ebdfafeadfbdfafea\},
\]

with half-period ceilings \(60\), \(100\) and \(340\) respectively at \(L=40\),
by Lemma 8.1.

### 9.1 A fixed support skeleton upstream

Fix blocks \(E\) and \(A\) with the profiles of (9.2), and write
\(p(i)=\Psi(E[0..i))\), \(x(j)=\Psi(A[0..j))\), and \(\lambda_r\) for the Parikh
vector of the last \(r\) letters of \(E\). Consider windows ending while the
\(A\)-block is being exposed, at endpoint \(n=40+m\). Splitting by the positions
of the two earlier cutpoints gives three classes, named by the number of
*unresolved* prefix vectors of \(A\) they retain — not by the size of the output
alphabet:

\[
\begin{array}{c|c|c}
\text{class}&\text{range}&\text{forbidden equality}\\\hline
\text{ternary}&2k\le m& x(m)-2x(m-k)+x(m-2k)=0\\
\text{binary}&m<2k\le2m& x(m)-2x(m-k)=p(40)-p(40+m-2k)\\
\text{unary}&k>m& x(m)=\lambda_{2k-m}-2\lambda_{k-m}
\end{array}
\tag{9.3}
\]

For \(L=40\) the raw window counts are exactly \(361\) ternary, \(419\) binary
and \(380\) unary. The supports are the same for every \(E\); only the targets
move. Compatibility is thus a monotone prefix-path problem from \((0,0,0)\) to
\((15,14,11)\) avoiding a fixed skeleton of forbidden values — an instance of the
support/target separation, one stage upstream of the classification.

A simple sufficient obstruction follows. For \(2\le k\le20\) put
\(\theta_k(E)=\Psi(E[41-2k..41-k))-\Psi(E[41-k..40))\) and
\(\operatorname{BLOCKED}(E)=\{\alpha\in\Sigma:\theta_k(E)=e_\alpha
\text{ for some }k\}\). If \(\operatorname{BLOCKED}(E)=\Sigma\) then no
compatible \(A\) exists, since the first letter of \(A\) would have to avoid every
letter of \(\Sigma\). The criterion is sufficient, not necessary.

### 9.2 Simultaneous completion as prefix reachability

Now fix \(A\) and \(E\) and leave the order of the \(F\)-block unresolved, with
\(\rho=\Psi(F)=(19,11,10)\). For a candidate \(F=f_1\cdots f_{40}\) write
\(X_i=\Psi(f_1\cdots f_i)\), so \(X_0=0\) and \(X_{40}=\rho\). Every compiled
window becomes an affine forbidden condition \(\sum_i\alpha_iX_i\in T\) for a
finite target set \(T\) determined by the assigned data. Working in the profile
tree \(\mathcal T_\rho=\{u\in\Sigma^{\le40}:\Psi(u)\le\rho\}\), call a constraint
**closed** once its largest referenced depth has been reached, and call an edge
**first-hit blocked** when the child is the first prefix on its branch to violate
a closed constraint.

A profile-correct \(F\) satisfies all constraints if and only if its
root-to-leaf path avoids every first-hit blocked edge; completion is therefore an
exact reachability question rather than a property of a particular search order.
Writing \(B\) for the set of first-hit blocked prefixes — a prefix-free set — and
\([u]_\rho\) for the set of profile-correct words extending \(u\), the satisfying
set \(\mathcal S\) obeys the exact partition

\[
\mathcal W_\rho=\mathcal S\;\dot\cup\;\bigdotcup_{u\in B}[u]_\rho,
\qquad
\mathcal W_\rho=\{F:\Psi(F)=\rho\},
\tag{9.4}
\]

with \(|[u]_\rho|\) given by the multinomial coefficient of the remaining profile
and \(|\mathcal W_\rho|=\binom{40}{19,11,10}=46\,305\,405\,961\,214\,400\). An
unsatisfiable instance can thus be certified by a first-hit trie whose blocked
cylinders exhaust \(\mathcal W_\rho\); an independent checker need only verify the
profile-admissible transitions and the attached affine killers. Appendix B
records the corresponding counting identity.

![First-hit prefix tree](FIG3_FIRST_HIT_PREFIX_TREE.pdf)

*Figure 2. A first-hit certificate. A blocked prefix removes the entire cylinder
of profile-compatible completions extending it; a satisfying word is a
root-to-leaf path avoiding every blocked edge.*

One caution is worth recording, because it limits an otherwise natural
optimization. At depth \(d\) let \(A_d\) be the set of earlier depths still
referenced by an unclosed constraint; the pair \(\bigl(X_d,(X_i)_{i\in
A_d}\bigr)\) is a sufficient state, in the sense that two prefixes agreeing on it
have the same legal continuations. This is a correctness statement, not a
compression theorem. In the present length-\(40\) system an implementation audit
finds \(A_d=\{1,\dots,d\}\) for \(38\) of the \(40\) depths, with
\(\max_d|A_d|=38\); since consecutive prefix differences recover the whole prefix,
every realized state has multiplicity \(1\), and the quotient coincides with the
prefix trie instead of compressing it.

### 9.3 A finite completability computation

The structural theorem does not predict which assigned pairs admit a completion.
The following finite computation illustrates the target-loaded problem; it is not
evidence for the theorem.

Three predicates are used. An \(A\)-block is **AF-compatible** if some
profile-correct \(F\) passes the complete \(\{A,F\}\) subset gate on the cover
word \(faf\). A pair \((E,A)\) is **AFE-completable** if some profile-correct
\(F\) makes the coded factor \(afe\) free of Abelian squares with half-period
\(K\in[2,40]\). It is **jointly completable** if a *single* \(F\) does both.

Two frozen deterministic populations are compared under a preregistered quota of
\(Q=5000\) per source block in a fixed enumeration order. Population \(RX\) is a
random-profile comparison population; population \(H\) was assembled from
earlier compatible constructions and is therefore selected by construction. The
two are not random samples from a common distribution, and the counts below are
exhaustive for these declared finite populations only.

| population | trials | blocks represented | AF-compatible | AFE-completable | jointly completable |
|---|---:|---:|---:|---:|---:|
| \(RX\) | \(75\,111\) | \(36\) | \(137\) | \(0\) | \(0\) |
| \(H\) | \(31\,775\) | \(9\) | \(263\) | \(86\) | \(44\) |

Under exact-equal exposure the same pattern persists: with \(1000\) trials per
block, \(45\) AF-compatible pairs in \(RX\) yield no AFE-completable pair, while
\(40\) in \(H\) yield \(19\); with \(5000\) per block the figures are \(63\to0\)
and \(78\to36\).

The AFE-completability verdicts on all \(263\) quota-matched \(H\) pairs were
recomputed by a second, independent implementation; the two agree on all \(263\)
cases (\(86\) positive, \(177\) negative, none unresolved), and for each positive
case a separate checker validated one literal \(F\)-word directly against the
Parikh condition, all \(86\) passing. That \(42\) pairs are AFE-completable but
not jointly completable confirms that the second implementation computes the
intended predicate rather than silently including the other gate.

These are finite counts, not probability estimates, and the zero count in \(RX\)
is not a nonexistence theorem.

**Reproducibility.** The accompanying package separates the theorem from the
computation. For the classification it supplies independent checkers that
enumerate the six domains, verify the \(34\) masks, and confirm the nineteen
cardinality formulas over a large finite range; these are a falsification layer,
since the proof is symbolic. For the case study it supplies the frozen
populations and selection rule, hashes of inputs, scripts and outputs, exact
replay commands, an implementation-semantics checker, the independent
\(263\)-pair route with its literal-witness checker, and an explicit blacklist
for one voided run. The manifest self-check reports no hash mismatches, no
missing files and no placeholder fields.

---

## 10. Relation to earlier work

The second-difference layer is not new. Carpi's criteria for Abelian power-free
morphisms are stated in terms of prefix Parikh second differences corrected by
whole-image selectors; the template method of Currie and Rampersad organizes
Abelian-power avoidance by finite boundary corrections and ancestor reductions;
and carry sequences produced by Euclidean division are classical in the study of
mechanical words. We claim none of these.

What is added here is a specific operation on *partially assigned* codings:

\[
\text{assigned block data}
\;+\;
\text{one unresolved occurrence mask}
\;\longrightarrow\;
\text{complete reduced support family}.
\]

### 10.1 Comparison with Carpi's condition C3

A modern restatement of Carpi's condition C3 asserts, for suitable tuples of
proper prefixes of the images, the existence of binary selectors
\(\delta_j\in\{0,1\}\) satisfying a whole-image-corrected second-difference
equation. Specializing to three cutpoints under a uniform length \(L\) and
applying the coordinate-sum functional gives
\(i_0-2i_1+i_2=L(\delta_0-2\delta_1+\delta_2)\), which combined with (3.5) yields

\[
\delta_0-2\delta_1+\delta_2=c_0-c_1=-\kappa .
\tag{10.1}
\]

So the scalar second-difference correction is shared territory, and the selectors
\(\delta_j\) play a role analogous to the carry bits \(c_j\) rather than to the
curvature \(\kappa\), which is a derived quantity.

The two settings nevertheless differ in an essential way. Carpi's condition
quantifies over prefixes of images that are all *known*: it is a test applied to
a given morphism. The present classification is about the opposite situation, in
which one image is unknown and one asks which linear forms in its prefix states
can occur.

There is also a concrete structural gap. The local data of C3 does not determine
the quotient \(q=\lfloor K/L\rfloor\): fixing \(L\), \(r\) and \(i_0\) fixes the
local depths and the carry pair regardless of \(q\), while changing \(q\) changes
the number of complete blocks between cutpoints. Hence the same local instance
occurs both with \(q=0\) and with \(q\ge1\), and the local data cannot recover the
distinction between \(Z_s\) and \(Z\), nor the corresponding truncated/full split
in the nonzero-curvature cases. The admissible selector triples in the
arithmetic-progression specialization are therefore not the six physical domains
of Lemma 3.1.

Our positioning is deliberately narrow. We do not claim the \((+1,-2,+1)\)
algebra, whole-image correction, Euclidean carry arithmetic, mechanical words,
template sieving, or generic finite-state reachability. The theorem established
here is the role-projected partial-assignment classification: the six physical
domains, the physically consistent masks, the complete reduced support sets, and
their exact \(34\to19\) quotient.

---

## 11. Discussion and limitations

The simplification obtained here is not a reduction in the number of possible
half-periods. It is a reduction in the number of *support schemas* that a partial
assignment can create. A raw search sees many individual windows; the compiler
splits each into one of nineteen families together with an affine target
determined by the assigned data. The geometric work is done once and reused
across all target assignments, and Corollary 7.1 makes the target side exactly
decidable for a single window under a prescribed profile.

Several limitations deserve explicit statement.

- The nineteen families are schemas, not constraints and not automaton states. A
  single family may be instantiated with many distinct targets, so the
  classification does not reduce Abelian-square avoidance to nineteen
  inequalities.
- Corollary 7.1 concerns one window and one profile. It certifies neither a
  coding nor a morphism, and it says nothing about other windows.
- **Long periods are not addressed.** Passing all nineteen families does not
  certify half-periods spanning many blocks; complete subset gates cover only
  squares whose minimal macro support lies in the assigned set. Long-period
  certification remains a logically separate problem.
- The exact frontier quotient of Section 9.2 is a correctness statement, not a
  compression theorem; in the length-\(40\) system it compresses nothing.
- The finite counts of Section 9.3 have no probabilistic interpretation, and a
  zero count is not a nonexistence result.
- The surrounding second-difference and template machinery belongs to earlier
  work; the contribution here is the partial-assignment classification.

A natural next question is whether the same physical-domain analysis extends from
three cutpoints to longer Abelian-power chains. There the carry pair is replaced
by a carry vector, and the corresponding classification, if finite, would again
be independent of the assigned data.

**Conclusion.** For a uniform block system with one unresolved role, the geometry
of an Abelian-square constraint is finite and exact: Euclidean division of the
half-period yields six physical domains, block-coincidence leaves \(34\)
realizable domain/mask patterns, and equality of complete reduced support sets
collapses them to exactly \(19\) families for every \(L\ge5\), with explicit
cardinalities and pairwise distinctness. Partial assignment need not be treated
as an unfinished search: it already carries an exact combinatorial geometry that
can be isolated, classified and reused.

---

# Appendix A. Cardinality derivations

Throughout \(x_0=0\), and \(e=\lceil L/2\rceil\), \(o=\lfloor L/2\rfloor\) denote
the numbers of even and odd values in \([0,L-1]\).

**\(E\).** The mask \(000\) gives the single empty signature, so \(|E|=1\).

**\(Z_s\)-A.** For each step \(\eta\ge2\) the start satisfies
\(0\le a\le L-1-2\eta\), giving \(L-2\eta\) choices. Distinct \((a,\eta)\) give
distinct signatures: for \(a\ge1\) the three depths are distinct and determine
\((a,\eta)\); for \(a=0\) the reduced form is \(-2x_\eta+x_{2\eta}\), which
determines \(\eta\); and two- and three-term forms never coincide. Hence

\[
|Z_s\text{-A}|=\sum_{\eta\ge2}(L-2\eta)
=\Bigl\lfloor\frac{(L-3)^2}{4}\Bigr\rfloor ,
\]

by summing \(2(m-1)+2(m-2)+\dots\) for \(L=2m\) and the odd numbers
\(1,3,\dots,2m-3\) for \(L=2m+1\).

**\(Z\)-O and \(Z\)-C.** The diagonal \((d,d,d)\) lies in \(Z\) for every
\(0\le d<L\), so both the outer depth and the centre depth range over all of
\([0,L-1]\), with \(d=0\) giving the empty signature. Hence
\(|Z\text{-O}|=|Z\text{-C}|=1+(L-1)=L\).

**\(Z\)-CO.** With \(\sigma=\operatorname{red}(-2x_v+x_w)\) the constraint is
\(0\le u=2v-w\le L-1\), so at fixed \(v\) there are
\(2\min(v,L-1-v)+1\) admissible \(w\). Distinct \((v,w)\) give distinct
signatures, so summing over \(v\) gives \(\lceil L^2/2\rceil\).

**\(Z\)-OO.** Here \(\sigma=\operatorname{red}(x_u+x_w)\) with \(u+w=2v\), i.e.
\(u\equiv w\pmod 2\); conversely any same-parity pair is realizable since
\(v=(u+w)/2\le L-1\) automatically. The signature depends only on the unordered
pair, and distinct pairs give distinct signatures (\((0,0)\mapsto0\),
\((0,w)\mapsto x_w\), \((u,u)\mapsto2x_u\), otherwise \(x_u+x_w\)). Counting
unordered same-parity pairs with repetition,

\[
|Z\text{-OO}|=\binom{e+1}{2}+\binom{o+1}{2}
=\Bigl\lfloor\frac{(L+1)^2}{4}\Bigr\rfloor .
\]

**\(Z\)-A.** If two of \(u,v,w\) coincide then all three do, since \(u=w\) with
\(u+w=2v\) forces \(u=v\); those \(L\) diagonal triples all reduce to the empty
signature. Every other unordered same-parity pair gives a distinct three-depth
or two-depth signature. Hence
\(|Z\text{-A}|=|Z\text{-OO}|-L+1=\lfloor(L-1)^2/4\rfloor+1\).

**\(P\)-O.** By (6.1) the outer depths satisfy \(w\le L-2\), and every value in
\([0,L-2]\) occurs, so \(|P\text{-O}|=1+(L-2)=L-1\). The bound \(L-2\) rather
than \(L-1\) is exactly what makes this family one smaller than \(Z\)-O.

**\(P\)-C.** By (6.1) the centre satisfies \(\lceil L/2\rceil\le v\le L-1\) and
never vanishes, so the empty signature does not occur and
\(|P\text{-C}|=L-\lceil L/2\rceil=\lfloor L/2\rfloor\).

**\(P\)-CO.** At fixed \(v\ge\lceil L/2\rceil\) the admissible \(u\) satisfy
\(0\le u\le 2v-L\), and distinct \((u,v)\) give distinct signatures, so

\[
|P\text{-CO}|=\sum_{v=\lceil L/2\rceil}^{L-1}(2v-L+1)
=\Bigl\lfloor\frac{L^2}{4}\Bigr\rfloor .
\]

**\(P\)-OO and \(P\)-A.** The outer pair satisfies \(u+w=2v-L\), so its sum has
the parity of \(L\) and is at most \(L-2\); conversely every such pair is
realizable. Counting unordered pairs with repetition by their sum gives
\(\sum_{j=0}^{n-1}(j+1)=\binom{n+1}{2}\) with \(n=\lfloor L/2\rfloor\). For
\(P\)-A the centre is determined by the outer pair, so the same index set applies
and the cardinality agrees, though the signature sets differ.

**\(P_t\)-CO.** By Lemma 4.2 exactly one signature is removed, so
\(|P_t\text{-CO}|=\lfloor L^2/4\rfloor-1\).

**Negative curvature.** By (6.2) no outer depth is \(0\) while every value in
\([1,L-1]\) occurs, giving \(|M\text{-O}|=L-1\); the centre satisfies
\(0\le v\le\lfloor L/2\rfloor-1\) with \(v=0\) contributing the empty signature,
giving \(|M\text{-C}|=\lfloor L/2\rfloor\). For the mixed family
\(2v+1\le w\le L-1\) with injective projection, so

\[
|M\text{-CO}|=\sum_{v=0}^{\lfloor L/2\rfloor-1}(L-1-2v)
=\Bigl\lfloor\frac{L^2}{4}\Bigr\rfloor .
\]

The reflection \((u,v,w)\mapsto(L-1-u,\,L-1-v,\,L-1-w)\) is a bijection from
\(P\) to \(M\): it sends \(u+w=2v-L\) to
\((L-1-u)+(L-1-w)=2(L-1-v)+L\), and preserves the coordinate ranges. It matches
the outer-pair sets, giving
\(|M\text{-OO}|=|M\text{-A}|=\binom{\lfloor L/2\rfloor+1}{2}\); and
\(|M_t\text{-CO}|=\lfloor L^2/4\rfloor-1\) by Lemma 4.2.

Together with \(|E|=1\) these are the nineteen formulas of Table 2.

---

# Appendix B. Fixed-profile first-hit counting

For a profile \(\rho\) write \(\binom{n}{v}=n!/\prod_jv_j!\) for the multinomial
coefficient when \(|v|_1=n\). A first-hit blocked prefix \(u\) with
\(p=\Psi(u)\) eliminates exactly

\[
C_\rho(p)=\binom{L-|p|_1}{\rho-p}
\]

complete profile words. If \(B\) is the first-hit antichain of (9.4) and
\(\mathcal S\) the satisfying set, then

\[
|\mathcal S|+\sum_{u\in B}C_\rho(\Psi(u))=\binom{L}{\rho},
\tag{B.1}
\]

independently of any search order.

More generally, if legal prefixes sharing the same future-relevant state are
grouped into a state \(s\) of multiplicity \(N_d(s)\), a first-hit blocked
transition to a child of profile \(p\) contributes \(N_d(s)\,C_\rho(p)\) to the
blocked mass, and summing legal-leaf multiplicity and blocked mass over all
layers again reproduces \(\binom{L}{\rho}\). This is an exact accounting
identity. It is not a guarantee of compression: as noted in Section 9.2, every
realized multiplicity equals \(1\) in the length-\(40\) system.

---

# References

1. A. Carpi, "On Abelian Power-Free Morphisms," *International Journal of
   Algebra and Computation* **3**(2) (1993), 151–167.
   doi:10.1142/S0218196793000123.

2. J. D. Currie and N. Rampersad, "Fixed points avoiding Abelian
   \(k\)-powers," *Journal of Combinatorial Theory, Series A* **119**(5)
   (2012), 942–948. doi:10.1016/j.jcta.2012.01.006.

3. S. Eyidoğan, H. Göral and N. Tanısalı, "Box Progressions, Abelian
   Power-Free Morphisms and A Sieve Technique for the Template Method,"
   arXiv:2605.20504 (2026).

4. G. Fici and S. Puzynina, "Abelian combinatorics on words: A survey,"
   *Computer Science Review* **47** (2023), 100532.
   doi:10.1016/j.cosrev.2022.100532.

5. V. Keränen, "Abelian squares are avoidable on 4 letters," in
   *Automata, Languages and Programming*, LNCS **623** (1992), 41–52.
   doi:10.1007/3-540-55719-9_62.

6. M. Rao and M. Rosenfeld, "Avoiding Two Consecutive Blocks of Same Size and
   Same Sum over \(\mathbb Z^2\)," *SIAM Journal on Discrete Mathematics*
   **32**(4) (2018), 2381–2397. doi:10.1137/17M1149377.

7. L. B. Richmond and J. Shallit, "Counting Abelian Squares,"
   *Electronic Journal of Combinatorics* **16**(1) (2009), R72.
   doi:10.37236/161.
