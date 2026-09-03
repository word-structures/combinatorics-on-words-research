# Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

**Reader-first submission candidate v1.2 (pre-Claude) — 2026-08-29**  
**Author(s):** [to be inserted]

## Abstract

We study abelian-square avoidance under a constant-length block coding when the
images of all source letters but one have already been chosen.  The remaining
source letter is the **unresolved role**.  If the common block length is \(L\)
and a candidate abelian square has half-period \(K\), write
\(K=qL+r\), \(0\le r<L\).  The three equally spaced cutpoints induce two
binary carries.  Retaining both the carry pair and the distinction
\(q=0\) versus \(q\ge1\) yields six exact physical cutpoint domains.

Projecting the Parikh second-difference constraint onto the unresolved block
role, and enforcing consistency when two cutpoints lie in the same macro
block, gives exactly \(34\) realizable domain/occurrence patterns.  Quotienting
these patterns by equality of their complete reduced unresolved-support sets
gives exactly \(19\) stable support families for every \(L\ge5\).  We derive
closed cardinality formulas for all nineteen families and prove their pairwise
distinctness symbolically.  The assigned blocks enter only through affine
target values, so the construction separates support geometry from instance
data.

We also develop two tools for staged synthesis.  First, for a prescribed
Parikh profile of the unresolved block, every reduced support signature has an
exact finite set of reachable target values; membership gives an exact
profile-level feasibility test for a single target-loaded window.  Second,
bounded assigned-only factor languages give finite complete subset gates, and
after targets are loaded, fixed-profile completion becomes an exact
prefix-reachability problem whose first-hit bad prefixes provide independently
checkable certificates.  A length-\(40\) case study over a six-letter morphic
source illustrates the framework: an upstream compatibility stage has a fixed
\(361/419/380\) ternary/binary/unary support skeleton, and a downstream
completion stage admits exact two-solver and literal-witness verification.
The structural results are independent of that particular case study and
provide a finite support compiler for partial uniform Abelian-square
constraints.

---

## 1. Introduction

Two words are Abelian equivalent when they have the same Parikh vector.  An
**Abelian square** is a factor \(UV\) with

\[
|U|=|V|,
\qquad
\Psi(U)=\Psi(V).
\]

The standard direct way to certify a concrete finite word is to inspect all
candidate factors.  This is exact, but it hides a useful structure when the
word itself is produced by a uniform block coding and only part of that coding
has been chosen.

Suppose a source word over a finite macro alphabet is coded by blocks of a
common length \(L\).  During a staged construction, some block roles may
already be assigned while one role \(X\) remains unresolved.  Every candidate
Abelian square then gives a linear relation among three prefix Parikh vectors
at equally spaced cutpoints.  The assigned roles determine an affine target;
the unresolved role determines only the **support** of the equation.

The purpose of this paper is to classify that support layer exactly.

A reader can keep one model equation in mind throughout.  If the three
cutpoints meet the unresolved block at local depths \(i,j,k\), then after all
assigned-block contributions have been moved to the right-hand side, a window
has the schematic form

\[
x_i-2x_j+x_k = \text{assigned target},
\]

with some of the three terms absent when the corresponding cutpoint lies in an
already assigned block.  The paper classifies **which left-hand sides can
occur**, before asking whether a concrete target can be avoided.

The central result has the following form.

\[
\boxed{
\text{three cutpoints}
\longrightarrow
6\text{ physical carry domains}
\longrightarrow
34\text{ realizable role patterns}
\longrightarrow
19\text{ complete support families}.
}
\]

The number \(19\) is independent of the output alphabet and of the prescribed
Parikh profile of the unresolved block.  Those data enter only after the
support has been compiled.

This point of view leads naturally to staged synthesis.  Assigned-only macro
factors can be exhausted by finite factor-maximal covers whenever their source
language is bounded.  Once affine targets are inserted, completion of the
unresolved block is an exact path problem in a fixed-profile prefix tree.  The
result is a clean separation between

\[
\boxed{\text{occurrence geometry}}
\qquad\text{and}\qquad
\boxed{\text{target-loaded feasibility}}.
\]

The structural theorem is general.  We illustrate it on a length-\(40\)
ternary coding built over the six-letter morphic source used by Rao and
Rosenfeld.  That case study motivated the present formulation, but the theorem
and its proof do not depend on the surrounding open construction problem.

### 1.1 How to read the paper

Sections 2--5 contain the general theorem.  Section 2 fixes terminology and
notation; Section 3 derives the six carry domains; Section 4 performs the
role-projection and proves the \(34\to19\) quotient; Section 5 gives the
cardinalities and a symbolic distinctness certificate.  Section 6 positions
the result relative to earlier abelian-power machinery.  Sections 7--11 are
applications of the theorem to staged synthesis and may be read after the main
classification.

### 1.2 Contributions

The main contributions are:

1. an exact six-domain description of three equally spaced cutpoints in a
   uniform block system;
2. the role-consistency reduction from \(34\) physical domain/mask patterns to
   \(19\) complete reduced unresolved-support families;
3. closed cardinality formulas and a symbolic all-\(L\ge5\) distinctness proof;
4. an exact profile-level feasibility criterion for any compiled support
   signature under a prescribed Parikh profile;
5. a finite complete-subset gate for bounded assigned-only macro languages;
6. a support/target formulation of staged fixed-profile completion with
   first-hit certificates;
7. an exact length-\(40\) case study with independently replayed finite
   computations.

The proof of the main theorem is independent of the computational checkers.
The accompanying code is a falsification and reproducibility layer.

---

## 2. Preliminaries

Let \(\Gamma\) be a finite **source (macro) alphabet** and \(\Sigma\) a finite
**output alphabet**.  Let

\[
H:\Gamma\to\Sigma^L
\]

be an \(L\)-uniform coding.  We allow \(H\) to be only **partially assigned**:
all source letters except one role \(X\in\Gamma\) have fixed images, while the
word \(H(X)\) remains unresolved.

For a word \(w\), write \(\Psi(w)\) for its Parikh vector.  For the unresolved
block define formal prefix states

\[
x_i=\Psi(H(X)[0..i)),
\qquad
0\le i\le L,
\]

with

\[
x_0=0.
\]

Consider a candidate abelian square beginning at position \(s\) with
half-period \(K\).  Its cutpoints are

\[
t_0=s,\qquad t_1=s+K,\qquad t_2=s+2K.
\]

Write the unique uniform-block decomposition

\[
t_j=b_jL+i_j,
\qquad
0\le i_j<L.
\]

Let

\[
\chi(b)=
\begin{cases}
1,&\text{if macro block }b\text{ has role }X,\\
0,&\text{otherwise.}
\end{cases}
\]

The abelian-square condition is the prefix second difference

\[
P(t_0)-2P(t_1)+P(t_2)=0,
\]

where \(P(t)\) is the Parikh vector of the coded prefix of length \(t\).
Moving every assigned-block contribution to the target side leaves the
unresolved support

\[
\sigma
=
\operatorname{red}
\left(
\chi(b_0)x_{i_0}
-2\chi(b_1)x_{i_1}
+\chi(b_2)x_{i_2}
\right).
\tag{2.1}
\]

Here `red` removes \(x_0\), combines equal depths, and deletes zero
coefficients.  The zero signature is legitimate: it means that the candidate
window is decided entirely by assigned data.

A **support family** will mean the complete set of reduced signatures obtained
from one geometric domain and one physically consistent occurrence mask.

![Support compiler pipeline](FIG2_SUPPORT_COMPILER_PIPELINE.svg)

*Figure 1.  The conceptual compiler.  Geometry determines the support catalogue;
concrete assigned blocks supply the affine targets.*

---

## 3. Euclidean carry geometry

Write

\[
K=qL+r,
\qquad
0\le r<L.
\tag{3.1}
\]

Define the two carry bits

\[
c_j
=
\left\lfloor
\frac{i_j+r}{L}
\right\rfloor
\in\{0,1\},
\qquad j=0,1.
\tag{3.2}
\]

Then

\[
i_{j+1}=i_j+r-Lc_j
\tag{3.3}
\]

and

\[
b_{j+1}-b_j=q+c_j.
\tag{3.4}
\]

Thus \(q\) counts the complete block lengths in the half-period, while each
\(c_j\) records whether the remainder \(r\) crosses one additional block
boundary at the \(j\)-th step.  This separation is the reason the short
\(q=0\) cases must be kept distinct from their full-domain analogues.

Put

\[
g_1=b_1-b_0,
\qquad
g_2=b_2-b_1.
\]

The macro curvature is therefore

\[
\kappa=g_2-g_1=c_1-c_0\in\{-1,0,+1\}.
\tag{3.5}
\]

The absolute arithmetic-progression identity

\[
t_0-2t_1+t_2=0
\]

also gives

\[
i_0-2i_1+i_2=-\kappa L.
\tag{3.6}
\]

Setting

\[
a=i_0,
\qquad
\eta=i_1-i_0
\]

gives the local normal form

\[
i_0=a,
\qquad
i_1=a+\eta,
\qquad
i_2=a+2\eta-\kappa L,
\tag{3.7}
\]

together with

\[
K=g_1L+\eta.
\tag{3.8}
\]

No approximation is involved in these identities.

### Lemma 3.1 — six physical domains

For \(L\ge5\) and \(K\ge2\), every candidate square belongs to exactly one of

\[
Z_s,\qquad P_t,\qquad M_t,\qquad Z,\qquad P,\qquad M.
\]

The full local triple sets are

\[
Z=
\{(u,v,w):u+w=2v,\;0\le u,v,w<L\},
\tag{3.9}
\]

\[
P=
\{(u,v,w):u+w=2v-L,\;0\le u,v,w<L\},
\tag{3.10}
\]

\[
M=
\{(u,v,w):u+w=2v+L,\;0\le u,v,w<L\}.
\tag{3.11}
\]

The short same-block zero-curvature domain is

\[
Z_s
=
\{(a,a+\eta,a+2\eta):\eta\ge2,\;a+2\eta<L\}.
\tag{3.12}
\]

The domains \(P_t\) and \(M_t\) are respectively the \(q=0\) positive- and
negative-curvature cases.

#### Proof

The pair \((q,c_0c_1)\) exhausts all possibilities.  When \(q=0\) and
\(c_0c_1=00\), all cutpoints lie in the same block and \(K=\eta\ge2\), giving
\(Z_s\).  The cases \(q=0,01\) and \(q=0,10\) give the truncated positive and
negative domains.  Equal carries outside the same-block case give \(Z\).
Unequal carries give \(P\) or \(M\) according to the sign of
\(c_1-c_0\).  Equations (3.9)--(3.12) follow from (3.7).  \(\square\)

![Six carry domains](FIG1_SIX_CARRY_DOMAINS.svg)

*Figure 2.  The six physical domains.  The carry pair fixes the local curvature,
while the quotient regime distinguishes same/truncated cases from full ones.*

### Worked example

Take \(L=5\), \(K=2\), and let the first cut have local depth \(i_0=0\).
Then \(q=0\), \(r=2\), and the recurrence gives

\[
(i_0,i_1,i_2)=(0,2,4),\qquad(c_0,c_1)=(0,0).
\]

All three cutpoints lie in one macro block, so this is a \(Z_s\) window.  If
that block has the unresolved role, the raw support is

\[
x_0-2x_2+x_4,
\]

which reduces to \(-2x_2+x_4\) because \(x_0=0\).  This small example is
the simplest nonempty member of the stable same-block family.

### Lemma 3.2 — one-point truncation

The truncated nonzero-curvature domains differ from the corresponding full
domains by exactly one local triple:

\[
P_t
=
P\setminus\{(L-2,L-1,0)\},
\tag{3.13}
\]

\[
M_t
=
M\setminus\{(L-1,0,1)\}.
\tag{3.14}
\]

#### Proof

For \(P\), write \(i_1-i_0=\eta\).  The \(q=0\) condition gives
\(K=\eta\ge2\), whereas the full domain permits \(\eta=1\).  Substituting \(\eta=1\)
into the local inequalities forces \(a=L-2\), giving
\((L-2,L-1,0)\).

For \(M\), the smallest possible \(\eta\) is \(1-L\), realized only by
\((L-1,0,1)\).  In the \(q=0\) truncated realization the period condition is
\(L+\eta\ge2\), which removes precisely that point.  \(\square\)

---

## 4. Role projection: from 34 physical patterns to 19 support families

The three bits

\[
(\chi(b_0),\chi(b_1),\chi(b_2))
\]

are not always independent.  If two cutpoints lie in the same macro block,
their occurrence bits must agree.  This is the first place where **physical
placement** and **formal algebra** differ: one cannot assign an arbitrary
three-bit mask to cutpoints that actually refer to the same block.

### Lemma 4.1 — exactly 34 physically realizable patterns

For \(L\ge5\):

- \(Z_s\) admits \(2\) masks: \(000,111\);
- \(P_t\) admits \(4\): \(000,001,110,111\);
- \(M_t\) admits \(4\): \(000,100,011,111\);
- each of \(Z,P,M\) admits all \(8\) binary masks.

Hence the number of physically realizable domain/mask patterns is

\[
2+4+4+8+8+8=34.
\tag{4.1}
\]

Every one of the \(34\) patterns has a geometric realization for \(L\ge5\).

The number \(34\) counts physically possible **domain/mask cases**.  The
number \(19\), obtained below, counts algebraically distinct **complete
support sets**.  These are different objects, and the quotient from one to the
other is the main classification step.

### 4.1 Complete family images

For a mask \(\chi=(\chi_0,\chi_1,\chi_2)\), define

\[
\pi_\chi(u,v,w)
=
\operatorname{red}
\left(
\chi_0x_u-2\chi_1x_v+\chi_2x_w
\right).
\tag{4.2}
\]

The family associated with a domain/mask pair is the **complete image** of that
domain under \(\pi_\chi\).

All \(000\) patterns collapse to

\[
E=\{0\}.
\tag{4.3}
\]

Each full domain \(D\in\{Z,P,M\}\) is invariant under outer reversal
\((u,v,w)\mapsto(w,v,u)\).  Therefore

\[
\pi_{001}(D)=\pi_{100}(D),
\qquad
\pi_{011}(D)=\pi_{110}(D),
\tag{4.4}
\]

so each full domain has five nonempty role-orbits after the global empty family
is removed.

The one-point truncations are more delicate.  On the positive side the removed
point is

\[
p^+=(L-2,L-1,0).
\]

For masks \(001\) and \(111\), the deleted signature is reproduced elsewhere in
\(P_t\).  For mask \(110\), however,

\[
x_{L-2}-2x_{L-1}
\]

has no alternative realization, so

\[
P_t\text{-M}
=
P\text{-M}
\setminus
\{x_{L-2}-2x_{L-1}\}.
\tag{4.5}
\]

Similarly,

\[
M_t\text{-M}
=
M\text{-M}
\setminus
\{x_1\}.
\tag{4.6}
\]

Thus the truncated domains contribute exactly one genuinely new mixed family
each.

Counting complete family images gives

\[
1
+1
+5
+(5+1)
+(5+1)
=
19.
\tag{4.7}
\]

### Theorem 4.2 — exact support classification

Let \(L\ge5\).  In any uniform \(L\)-block system with one unresolved role
\(X\), every abelian-square support constraint of half-period \(K\ge2\)
belongs to one of six physical carry domains.  Across all occurrence masks
there are exactly \(34\) physically consistent domain/mask patterns.
Quotienting these patterns by equality of their complete reduced
\(X\)-support sets yields exactly \(19\) distinct support families.

The classification is independent of the output alphabet, the prescribed
Parikh profile of \(H(X)\), and the concrete assigned block words.  Those data
affect only the affine targets.

#### Proof

Lemma 3.1 gives the exhaustive six-domain partition.  Lemma 4.1 gives the
\(34\) physically realizable domain/mask cases.  Outer reversal identifies the
paired masks in each full domain; all-assigned masks give the single empty
family; and Lemma 3.2 together with (4.5)--(4.6) shows that each truncated
nonzero-curvature domain contributes exactly one additional family.  Equation
(4.7) therefore gives at most \(19\) families.  Section 5 proves that the
nineteen listed families are pairwise distinct, so the upper bound is attained.
\(\square\)

### 4.2 Exact profile-level feasibility

The support classification is independent of the concrete unresolved block,
but once a total Parikh profile is prescribed it yields an exact feasibility
test for each target-loaded window.

Fix

\[
\rho\in\mathbb N^{|\Sigma|},
\qquad
|\rho|_1=L,
\]

and let

\[
\sigma(x)=\sum_{j=1}^m a_jx_{d_j},
\qquad
0<d_1<\cdots<d_m<L,
\tag{4.8}
\]

be a reduced support signature.  Define its **reachable target set** at profile
\(\rho\) by

\[
\mathcal R_\sigma(\rho)
=
\left\{
\sum_{j=1}^m a_j\Psi(w[0..d_j)):
 w\in\Sigma^L,\ \Psi(w)=\rho
\right\}.
\tag{4.9}
\]

The definition ranges over concrete block words, but the set can be described
without enumerating those words.

### Lemma 4.3 — prefix-Parikh chain realizability

Let \(0<d_1<\cdots<d_m<L\).  Integer vectors
\(y_{d_1},\ldots,y_{d_m}\) occur as the Parikh vectors of prefixes of one
word \(w\in\Sigma^L\) with \(\Psi(w)=\rho\) if and only if

\[
|y_{d_j}|_1=d_j
\quad(1\le j\le m),
\tag{4.10}
\]

and

\[
0\le y_{d_1}\le y_{d_2}\le\cdots\le y_{d_m}\le\rho
\tag{4.11}
\]

componentwise.

#### Proof

Necessity is immediate from nested prefixes.  Conversely, the differences

\[
y_{d_1},\quad
y_{d_2}-y_{d_1},\quad\ldots,\quad
y_{d_m}-y_{d_{m-1}},\quad
\rho-y_{d_m}
\]

are nonnegative integer vectors whose coordinate sums are exactly the lengths
of the consecutive segments.  Choose any word with each of those segment
profiles and concatenate the segments.  The resulting length-\(L\) word has
profile \(\rho\) and the prescribed prefix Parikh vectors. \(\square\)

Thus \(\mathcal R_\sigma(\rho)\) can equivalently be computed by ranging
over the finite integer chains (4.10)--(4.11).

### Corollary 4.4 — exact target feasibility

Suppose a concrete candidate window with support signature \(\sigma\) reduces,
after all assigned contributions have been moved to the right-hand side, to

\[
\sigma(x)=\tau.
\tag{4.12}
\]

Among unresolved blocks with total profile \(\rho\), the window can be
completed to an Abelian square if and only if

\[
\tau\in\mathcal R_\sigma(\rho).
\tag{4.13}
\]

In particular,

\[
\tau\notin\mathcal R_\sigma(\rho)
\quad\Longrightarrow\quad
\text{the window is impossible for every ordering of profile }\rho.
\tag{4.14}
\]

#### Proof

By construction, (4.12) is exactly the Abelian-square Parikh equation after the
assigned terms have been absorbed into \(\tau\).  Definition (4.9) is exactly
the set of values attained by \(\sigma\) over all unresolved block words with
profile \(\rho\), so (4.13) is equivalent to the existence of such a
completion. \(\square\)

This is a single-window feasibility statement.  It neither certifies the whole
coding nor replaces the simultaneous target-loaded reachability problem studied
in Section 10.

---

## 5. The nineteen families and their cardinalities

Use the abbreviations

\[
O:x_u,\qquad
C:-2x_v,\qquad
M:x_u-2x_v,
\]

\[
OO:x_u+x_w,\qquad
A:x_u-2x_v+x_w,
\]

up to outer reversal.

| family | description | exact cardinality |
|---|---|---:|
| \(E\) | empty support | \(1\) |
| \(Z_s\)-A | same-block zero-curvature, all active | \(\lfloor(L-3)^2/4\rfloor\) |
| Z-O | zero curvature, one outer | \(L\) |
| Z-C | zero curvature, centre | \(L\) |
| Z-M | zero curvature, centre + one outer | \(\lceil L^2/2\rceil\) |
| Z-OO | zero curvature, both outers | \(\lfloor(L+1)^2/4\rfloor\) |
| Z-A | zero curvature, all active | \(\lfloor(L-1)^2/4\rfloor+1\) |
| P-O | positive curvature, one outer | \(L-1\) |
| P-C | positive curvature, centre | \(\lfloor L/2\rfloor\) |
| P-M | positive curvature, mixed | \(\lfloor L^2/4\rfloor\) |
| P-OO | positive curvature, both outers | \(\binom{\lfloor L/2\rfloor+1}{2}\) |
| P-A | positive curvature, all active | \(\binom{\lfloor L/2\rfloor+1}{2}\) |
| \(P_t\)-M | truncated positive mixed | \(\lfloor L^2/4\rfloor-1\) |
| M-O | negative curvature, one outer | \(L-1\) |
| M-C | negative curvature, centre | \(\lfloor L/2\rfloor\) |
| M-M | negative curvature, mixed | \(\lfloor L^2/4\rfloor\) |
| M-OO | negative curvature, both outers | \(\binom{\lfloor L/2\rfloor+1}{2}\) |
| M-A | negative curvature, all active | \(\binom{\lfloor L/2\rfloor+1}{2}\) |
| \(M_t\)-M | truncated negative mixed | \(\lfloor L^2/4\rfloor-1\) |

For \(L=40\), the corresponding cardinalities are

\[
1,342,40,40,800,420,381,39,20,400,210,210,399,
39,20,400,210,210,399.
\]

Appendix A derives every formula directly from integer lattice inequalities.

### 5.1 Symbolic pairwise distinctness

Cardinality alone does not separate all nineteen families.  We therefore use a
second invariant.  For a formal signature, its **depth moment** is the
coefficient-weighted sum of its prefix depths:

\[
\mu(\sigma)
=
\sum_{i=1}^{L-1} i\alpha_i
\qquad
\text{for }
\sigma=\sum_i\alpha_i x_i.
\tag{5.1}
\]

For the mixed families,

\[
\mu(Z\text{-M})
=
\{-(L-1),\ldots,0\},
\tag{5.2}
\]

\[
\mu(P\text{-M})
=
\{-2L+2,\ldots,-L\},
\tag{5.3}
\]

\[
\mu(M\text{-M})
=
\{1,\ldots,L-1\}.
\tag{5.4}
\]

The truncated/full pairs are separated by the missing witnesses in
(4.5)--(4.6).

For both-outer families,

\[
\mu(Z\text{-OO})
=
\{0,2,\ldots,2L-2\},
\tag{5.5}
\]

while every \(P\)-OO moment is at most \(L-2\), and every \(M\)-OO moment is at
least \(L\).

For all-active families,

\[
\mu(Z\text{-A})=\{0\},
\qquad
\mu(P\text{-A})=\{-L\},
\qquad
\mu(M\text{-A})=\{+L\}.
\tag{5.6}
\]

The same-block family \(Z_s\)-A also has zero moment, but

\[
0\notin Z_s\text{-A},
\qquad
0\in Z\text{-A}.
\tag{5.7}
\]

The one-coordinate families have exact descriptions

\[
Z\text{-O}=\{0,x_1,\ldots,x_{L-1}\},
\]

\[
P\text{-O}=\{0,x_1,\ldots,x_{L-2}\},
\]

\[
M\text{-O}=\{x_1,\ldots,x_{L-1}\},
\tag{5.8}
\]

and

\[
Z\text{-C}
=
\{0,-2x_1,\ldots,-2x_{L-1}\},
\]

\[
P\text{-C}
=
\{-2x_v:\lceil L/2\rceil\le v\le L-1\},
\]

\[
M\text{-C}
=
\{0\}\cup
\{-2x_v:1\le v\le\lfloor(L-2)/2\rfloor\}.
\tag{5.9}
\]

For the remaining cross-group comparisons, coefficient type gives an immediate
separation: O-families contain only positive unary signatures; C-families only
negative doubled unary signatures; mixed families contain genuine
\((+1,-2)\) two-depth signatures; OO-families contain no negative
coefficients; and nonzero A-families contain the second-difference
\((+1,-2,+1)\) structure.  The only zero-moment ambiguity, \(Z_s\)-A versus
Z-A, is already separated by (5.7).

Consequently no two of the nineteen complete support sets are equal.

### Corollary 5.1

For every \(L\ge5\), the nineteen stable support families are pairwise
distinct.  Hence \(19\) is minimal under the specific compression rule
“identify domain/mask cases exactly when their complete reduced support sets
are equal.”

This is **not** a minimal-automaton or optimal-implementation theorem.

### 5.2 Small \(L\)

The equality-class counts for \(L=2,3,4,5,6,7\) are

\[
9,15,19,19,19,19.
\]

At \(L=4\), however, \(Z_s\) is empty, so the nineteen classes are not yet the
stable family list above.  The first same-block \(K\ge2\) configuration occurs
at \(L=5\), which is the natural boundary of Theorem 4.2.

---

## 6. Relation to earlier Abelian-power machinery

The second-difference layer itself is not new.  Carpi's morphism criteria use
prefix Parikh second differences with binary whole-image correction selectors,
and the template method of Currie and Rampersad organizes Abelian-power
avoidance by finite boundary corrections.  Rational carry sequences arising
from Euclidean division are likewise standard mechanical-word objects.

The distinction made here is the following partial-assignment operation:

\[
\text{known block data}
\quad+\quad
\text{one unresolved occurrence mask}
\quad\longrightarrow\quad
\text{complete reduced unresolved-support family}.
\]

### 6.1 Exact comparison with Carpi's C3 condition

A modern restatement of Carpi's condition C3 asserts, for suitable proper
prefixes, the existence of binary selectors \(\delta_j\) satisfying a
whole-image corrected second-difference equation.  Under a uniform length
\(L\), applying the coordinate-sum functional to the three-cutpoint
specialization gives

\[
i_0-2i_1+i_2
=
L(\delta_0-2\delta_1+\delta_2).
\]

Combining this with (3.6) yields

\[
\boxed{
\delta_0-2\delta_1+\delta_2
=
c_0-c_1
=
-\delta.
}
\tag{6.1}
\]

Thus the scalar second-difference correction is shared prior-art territory.

However, C3 local data do not determine the quotient

\[
q=\left\lfloor K/L\right\rfloor.
\]

Fixing \(L,r,i_0\) fixes the local depths and carry pair independently of
\(q\), while changing \(q\) changes the number of complete macro blocks crossed
between cutpoints.  Hence the same local C3 instance can occur with \(q=0\) and
with \(q\ge1\).  In particular, local C3 data cannot recover the distinction

\[
Z_s\ \text{versus}\ Z,
\]

nor the analogous truncated/full nonzero-curvature split.

The six admissible C3 selector triples in the arithmetic-progression
specialization therefore do not constitute the six physical domains of
Theorem 4.2.

Our positioning is deliberately narrow.  We do not claim the
\((+1,-2,+1)\) algebra, whole-image correction, Euclidean carry arithmetic,
mechanical words, template sieving, or generic finite-state reachability.
The theorem established here is the explicit **role-projected
partial-assignment classification**: the six physical domains, the physically
consistent masks, the complete reduced support sets, and their exact
\(34\to19\) quotient.  Historical priority for broader surrounding
machinery is left to the cited literature rather than inferred from the form
of the present proof.

---

## 7. Complete subset gates

The support compiler is most useful inside a staged construction if already
assigned roles are certified completely before new roles are introduced.

Let \(w\in\Gamma^\omega\) be a fixed source word and let
\(S\subseteq\Gamma\) be the set of currently assigned roles.

### Lemma 7.1 — finite subset-factor gate

Assume that

\[
\operatorname{Fact}(w)\cap S^*
\]

has bounded word length.  Let \(\mathcal C_S\) be the factor-maximal elements
of this finite language under contiguous-factor containment.  Then every output
factor of \(H(w)\) whose **minimal macro support** uses only roles in \(S\), where the minimal
macro support is the shortest contiguous source factor whose coded image covers
that output factor occurs
inside \(H(c)\) for some \(c\in\mathcal C_S\).  Conversely every factor of
every \(H(c)\), \(c\in\mathcal C_S\), is a genuine factor of \(H(w)\).

Therefore absence of all \(S\)-supported Abelian squares is equivalent to
checking the finitely many cover images \(H(c)\).

#### Proof

If an output factor has minimal supporting macro factor \(u\in
\operatorname{Fact}(w)\cap S^*\), then \(u\) is contained in a
factor-maximal \(c\in\mathcal C_S\).  Uniform coding preserves aligned factor
containment, so the output factor occurs in \(H(c)\).  The converse is
immediate because each \(c\) is an actual source factor.  \(\square\)

If \(|c|=m\), then every square contained in \(H(c)\) has half-period at most

\[
\left\lfloor \frac{mL}{2}\right\rfloor.
\tag{7.1}
\]

This supplies a natural finite completion bound for each assigned-only stage.

---

## 8. A length-\(40\) case study

We now illustrate the structural theory on a concrete staged coding.  The
source alphabet is

\[
\Gamma=\{a,b,c,d,e,f\}
\]

with the \(3\)-uniform morphism

\[
h_6:
\quad
a\mapsto ace,\;
b\mapsto adf,\;
c\mapsto bdf,\;
d\mapsto bdc,\;
e\mapsto afe,\;
f\mapsto bce.
\tag{8.1}
\]

The source language is

\[
\operatorname{Fact}(h_6^\omega(a)).
\]

The application seeks ternary blocks of length \(40\).  The prescribed Parikh
profiles are

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
\tag{8.2}
\]

They arise from a rank-one lift of the incidence matrix of the shorter
Rao--Rosenfeld coding.

### Proposition 8.1 — kernel preservation under rank-one lifting

Suppose the columns of a matrix \(B\) have common nonzero sum \(L_0\), and let

\[
B'=sB+u\mathbf 1^T,
\qquad s\ne0.
\]

Here \(\mathbf 1\) denotes the all-ones column vector of the appropriate
dimension.  If the common column sum of \(B'\) is nonzero, then

\[
\ker B'=\ker B.
\]

#### Proof

If \(Bx=0\), summing coordinates gives \(\mathbf 1^Tx=0\), and hence
\(B'x=0\).  Conversely, \(B'x=0\) and the nonzero common column sum give
\(\mathbf 1^Tx=0\), after which \(sBx=0\).  \(\square\)

For the application, adding \((10,10,10)^T\) to every column raises the block
length from \(10\) to \(40\) while preserving the relevant kernel.

### 8.1 Factor-maximal subset covers

For the source language (8.1), independently regenerated maximal covers include

\[
\mathcal C_{\{A,F\}}=\{faf\},
\]

\[
\mathcal C_{\{A,E,F\}}
=
\{eafea,fafea\},
\]

and

\[
\mathcal C_{\Gamma\setminus\{C\}}
=
\{eafea,\;bdfadfbdfafea,\;ebdfafeadfbdfafea\}.
\]

At \(L=40\) their natural global half-period ceilings are respectively

\[
60,\qquad100,\qquad340.
\]

These finite gates are application-specific; Lemma 7.1 is the general
statement.

---

## 9. Upstream compatibility as a fixed support skeleton

Fix blocks \(E,A\) with profiles

\[
\Psi(E)=(13,16,11),
\qquad
\Psi(A)=(15,14,11).
\]

Let

\[
p(i)=\Psi(E[0..i)),
\qquad
x(j)=\Psi(A[0..j)).
\]

Examining square windows that end while the \(A\)-block is being exposed gives
three exact support classes.  The words **ternary**, **binary**, and **unary**
refer here to the number of unresolved prefix vectors of \(A\) that remain
after the fixed \(E\)-contribution is moved to the target side; they do not
refer to the size of the output alphabet.

### Proposition 9.1 — \(E\to A\) decomposition

For the endpoint \(n=40+m\), the constraints are

\[
\begin{array}{c|c|c}
\text{class}&\text{range}&\text{forbidden equality}\\
\hline
\text{ternary}&2k\le m&
x(m)-2x(m-k)+x(m-2k)=0,\\[1mm]
\text{binary}&m<2k\le2m&
x(m)-2x(m-k)=p(40)-p(40+m-2k),\\[1mm]
\text{unary}&k>m&
x(m)=\sigma_{2k-m}-2\sigma_{k-m},
\end{array}
\tag{9.1}
\]

where \(\sigma_r\) is the Parikh vector of the last \(r\) letters of \(E\).

For \(L=40\), the raw support counts are exactly

\[
\boxed{
361\text{ ternary},
\qquad
419\text{ binary},
\qquad
380\text{ unary}.
}
\tag{9.2}
\]

The support positions are independent of \(E\); only the affine targets move
with \(E\).

Thus compatibility is a monotone fixed-profile prefix-path problem

\[
(0,0,0)\longrightarrow(15,14,11).
\]

### Lemma 9.2 — depth-one suffix obstruction

For \(2\le k\le20\), define

\[
d_k(E)
=
\Psi(E[41-2k..41-k))
-
\Psi(E[41-k..40)).
\]

Let

\[
\operatorname{BLOCKED}(E)
=
\{\alpha\in\Sigma:
d_k(E)=e_\alpha
\text{ for some }2\le k\le20\}.
\]

If

\[
\operatorname{BLOCKED}(E)=\Sigma,
\]

then no compatible \(A\) exists.

The criterion is sufficient, not necessary.

---

## 10. Downstream fixed-profile reachability and certificates

Fix an \(A,E\) pair and leave the order of the \(F\)-block unresolved, with

\[
\rho=\Psi(F)=(19,11,10).
\]

For a candidate \(F=f_1\cdots f_{40}\), write

\[
X_i=\Psi(f_1\cdots f_i),
\qquad
X_0=0,
\qquad
X_{40}=\rho.
\]

Every candidate Abelian-square window becomes an affine forbidden condition

\[
\sum_i\alpha_iX_i\in T
\tag{10.1}
\]

for a finite target set \(T\) determined by assigned data.

The profile tree is

\[
\mathcal T_\rho
=
\{u\in\Sigma^{\le40}:\Psi(u)\le\rho\}.
\tag{10.2}
\]

A constraint is **closed** when its largest referenced prefix depth has been
reached.

### Theorem 10.1 — path equivalence

A profile-correct \(F\)-word satisfies all compiled constraints if and only if
its root-to-leaf path in \(\mathcal T_\rho\) never enters a first-hit blocked
edge.

Hence completion is an exact reachability problem, not a property of a
particular depth-first implementation.

![First-hit prefix tree](FIG3_FIRST_HIT_PREFIX_TREE.svg)

*Figure 3.  Schematic first-hit certificate.  A first-hit blocked prefix removes
the entire cylinder of profile-compatible complete words extending that prefix;
a satisfying word is a root-to-leaf path that avoids every blocked edge.*

### 10.1 First-hit certificate

Let \(B\) be the set of bad prefixes whose parents are legal.  Then \(B\) is
prefix-free.  If

\[
\mathcal W_\rho
=
\{F:\Psi(F)=h\}
\]

and

\[
[u]_\rho
=
\{F\in\mathcal W_\rho:u\preceq F\},
\]

then the satisfying set \(\mathcal S\) obeys the exact partition

\[
\mathcal W_\rho
=
\mathcal S
\;\dot\cup\;
\bigdotcup_{u\in B}[u]_\rho.
\tag{10.3}
\]

For \(p=\Psi(u)\),

\[
|[u]_\rho|
=
\frac{(40-|u|)!}
{(19-p_a)!(11-p_b)!(10-p_c)!}.
\tag{10.4}
\]

The total profile space is

\[
|\mathcal W_\rho|
=
\frac{40!}{19!\,11!\,10!}
=
46\,305\,405\,961\,214\,400.
\tag{10.5}
\]

An unsatisfiable instance can therefore be certified by a complete first-hit
trie whose blocked cylinders cover (10.5).  An independent checker need only
verify the profile-admissible transitions and the attached affine killers.

### 10.2 Frontier sufficiency, and what does not compress

At depth \(d\), let \(A_d\) be the historical prefix depths still referenced by
an unclosed constraint.  These are precisely the old prefix values that a
future affine condition may still need.  The **frontier state**

\[
S_d(u)
=
\left(
X_d(u),(X_i(u))_{i\in A_d}
\right)
\tag{10.6}
\]

is sufficient: equal frontier states have equal legal continuation languages.

This is a correctness quotient, not a minimality theorem.  In the actual
length-\(40\) system, an implementation audit finds

\[
A_d=\{1,\ldots,d\}
\]

for \(38\) of the \(40\) depths and

\[
\max_d|A_d|=38.
\]

Consecutive prefix differences recover the entire prefix word, so every
realized quotient multiplicity is \(1\).  In this concrete system the exact
frontier quotient therefore coincides with the legal prefix trie rather than
compressing it.

---

## 11. Secondary finite application

The structural theorem does not predict which assigned blocks admit a
completion.  The following finite computation is therefore an illustration of
the target-loaded feasibility problem, not evidence for the theorem itself.

For this section we use three explicit predicates.

- An \(A\)-block is **AF-compatible** if there exists a profile-correct
  \(F\)-block such that the complete \(\{A,F\}\) subset gate on the cover word
  `faf` is passed.
- An \((E,A)\) pair is **AFE-completable** if there exists a profile-correct
  \(F\)-block for which the coded factor `afe` contains no forbidden
  half-period \(K\in[2,40]\).
- An \((E,A)\) pair is **jointly completable** if the **same** \(F\)-block
  satisfies both conditions.

The labels \(RX\) and \(H\) refer to two frozen deterministic populations.
\(RX\) is the preregistered random-profile comparison population.  \(H\) is the
frozen canonical/historical comparison population assembled from earlier
compatible constructions.  Because the latter is selected by construction,
the two populations are not random samples from a common distribution.

A preregistered deterministic quota \(Q=5000\) per \(E\)-word was applied in
the persisted enumeration order.  The clean \(RX\) run evaluated

\[
75\,111
\]

\((E,A)\) trials, representing \(36\) \(E\)-words.  It produced \(137\)
AF-compatible pairs from \(17\) productive \(E\)-words, with zero unresolved
decisions.  None of those \(137\) pairs was AFE-completable.

Applying the identical quota rule to the frozen \(H\) population gives:

| population | trials | \(E\) represented | AF-compatible | AFE-completable | jointly completable |
|---|---:|---:|---:|---:|---:|
| \(RX\) | 75,111 | 36 | 137 | 0 | 0 |
| \(H\) | 31,775 | 9 | 263 | 86 | 44 |

The cleanest exact-equal-exposure strata are:

| stratum | \(E\) | trials | AF-compatible | AFE-completable | joint |
|---|---:|---:|---:|---:|---:|
| RX-5000-EQ | 10 | 50,000 | 63 | 0 | 0 |
| H-5000-EQ | 4 | 20,000 | 78 | 36 | 24 |
| RX-1000-EQ | 21 | 21,000 | 45 | 0 | 0 |
| H-1000-EQ | 8 | 8,000 | 40 | 19 | 0 |

The AFE-completability predicate was independently recomputed on all \(263\)
quota-matched \(H\) pairs.  Two implementations agreed on all \(263\) cases:
\(86\) positive, \(177\) negative, and \(0\) unresolved.  For every positive
case, a separate direct checker validated one literal \(F\)-word against the
substring Parikh condition; all \(86/86\) witnesses passed.  Forty-two pairs
are AFE-completable but not jointly completable, which is a direct control that
the second implementation computes the AFE predicate rather than silently
including the AF gate.

These counts are exhaustive only for the declared frozen finite populations.
They are not probability estimates, and the zero count in \(RX\) is not a
nonexistence theorem.

---

## 12. Reproducibility

The theorem proof and finite computations are separated in the accompanying
reproducibility package.

For the structural theorem, independent checkers:

- enumerate the six domains;
- verify the \(34\) physically realizable masks;
- verify the nineteen cardinality formulas over a large finite range;
- verify pairwise family inequality as a falsification layer.

The symbolic proof, not the enumeration, establishes the theorem.

For the case study, the package contains:

- the frozen input populations and the exact population-selection rule;
- SHA-256 hashes of scientific inputs, scripts, and replay outputs;
- exact replay commands and runtime environment;
- an independent implementation-semantics checker;
- the independent \(263\)-pair AFE-only route and literal witness checker;
- an explicit blacklist for a voided concurrent-writer run.

The final manifest self-check reports

\[
\texttt{hash\_mismatches}=0,\qquad
\texttt{missing\_files}=0,\qquad
\texttt{placeholder\_fields}=0,
\]

with the voided-run blacklist passing.

A public archival URL and release identifier will be inserted in the submitted
version.

---

## 13. Discussion

The main structural simplification is not a reduction in the number of possible
square periods.  It is a reduction in the number of **support schemas** that
partial assignment can create.

A raw finite search sees many individual windows.  The support compiler instead
separates each window into

\[
\text{one of 19 support families}
\quad+\quad
\text{an affine target determined by assigned data}.
\]

For a prescribed unresolved-block profile, this separation is already exact at
the level of one window: Corollary 4.4 tests whether its affine target belongs
to the reachable set of the corresponding reduced signature.  This is useful
in two complementary ways.  First, repeated geometric work can be compiled
once and reused across many target assignments.  Second, exact proof objects
can be designed around the target-loaded prefix language rather than around a
particular search order.

The theorem also clarifies several limits.

- The nineteen families are not nineteen automaton states.
- The theorem does not imply state compression for arbitrary target-loaded
  systems.
- It does not convert arbitrary abelian-square avoidance into nineteen
  inequalities; a family is a schema that may have many instantiated targets.
- The finite case-study population separation has no probabilistic
  interpretation.
- The general second-difference and template mechanisms belong to prior work;
  the contribution here is the role-projected partial-assignment
  classification.

A natural next theoretical direction is to extend the same physical-domain
view from three cutpoints to longer Abelian-power chains while retaining the
distinction between geometric support and affine target data.

---

## 14. Conclusion

For a uniform block system with one unresolved role, the geometry of an
Abelian-square constraint is finite and exact.  Euclidean division of the
half-period produces six physical cutpoint domains.  Repeated-block consistency
leaves \(34\) realizable domain/mask patterns, and equality of complete reduced
unresolved-support sets collapses them to exactly \(19\) stable families for
every \(L\ge5\).  All nineteen cardinalities are explicit, and the families
are pairwise distinct by a symbolic invariant argument.

This finite support geometry interfaces naturally with staged construction.
For a prescribed unresolved-block profile, each reduced signature has an exact
finite reachable-target set, giving a complete feasibility test for an
individual target-loaded window.  Bounded assigned-only source factors give
complete finite gates, while simultaneous target-loaded completion becomes
exact fixed-profile prefix reachability.  The length-\(40\) case study shows
how the abstract compiler can be connected to independently checkable finite
certificates without making the computation part of the theorem.

The broader lesson is that partial assignment need not be treated as an
incomplete brute-force search.  It already carries an exact combinatorial
geometry that can be isolated, classified, and reused.

---

# Appendix A. Cardinality derivations

We sketch all nineteen counts from the exact family descriptions.  Throughout,
\(x_0=0\).

## A.1 Same-block family

For \(Z_s\)-A, each step \(\eta\ge2\) allows

\[
0\le a\le L-1-2h,
\]

hence \(L-2\eta\) starts.  Therefore

\[
|Z_s\text{-A}|
=
\sum_{\eta=2}^{\lfloor(L-1)/2\rfloor}(L-2\eta)
=
\left\lfloor\frac{(L-3)^2}{4}\right\rfloor.
\]

The reduced signature determines \((a,h)\), so no further quotient occurs.

## A.2 Zero curvature

The diagonal \((d,d,d)\) exists for every \(0\le d<L\), giving

\[
|Z\text{-O}|=|Z\text{-C}|=L.
\]

For \(Z\)-M, at fixed centre \(v\),

\[
\max(0,2v-L+1)\le w\le\min(L-1,2v),
\]

so there are

\[
2\min(v,L-1-v)+1
\]

choices.  Summing gives

\[
|Z\text{-M}|
=
\left\lceil\frac{L^2}{2}\right\rceil.
\]

For \(Z\)-OO, the unordered outer pair has equal parity.  With

\[
e=\left\lceil\frac L2\right\rceil,
\qquad
o=\left\lfloor\frac L2\right\rfloor,
\]

the number of unordered pairs with repetition is

\[
\binom{e+1}{2}+\binom{o+1}{2}
=
\left\lfloor\frac{(L+1)^2}{4}\right\rfloor.
\]

For \(Z\)-A, every off-diagonal unordered outer pair gives a distinct
signature, while all \(L\) diagonal triples collapse to the zero signature.
Thus

\[
|Z\text{-A}|
=
|Z\text{-OO}|-L+1
=
\left\lfloor\frac{(L-1)^2}{4}\right\rfloor+1.
\]

## A.3 Positive curvature

The relation

\[
u+w=2v-L
\]

forces

\[
\left\lceil\frac L2\right\rceil\le v\le L-1,
\qquad
0\le u+w\le L-2.
\]

Every outer depth \(0,\ldots,L-2\) occurs, so

\[
|P\text{-O}|=L-1.
\]

The possible centre depths give

\[
|P\text{-C}|=\left\lfloor\frac L2\right\rfloor.
\]

At fixed \(v\), the mixed family has

\[
0\le w\le2v-L,
\]

and the projection is injective, hence

\[
|P\text{-M}|
=
\sum_{v=\lceil L/2\rceil}^{L-1}(2v-L+1)
=
\left\lfloor\frac{L^2}{4}\right\rfloor.
\]

Let \(n=\lfloor L/2\rfloor\).  The admissible unordered outer-pair sums have
the parity of \(L\) and range below \(L\).  Counting by sum gives

\[
|P\text{-OO}|
=
\sum_{j=0}^{n-1}(j+1)
=
\binom{n+1}{2}.
\]

The middle depth is uniquely determined by the outer pair, so the same count
holds for \(P\)-A:

\[
|P\text{-A}|
=
\binom{\lfloor L/2\rfloor+1}{2}.
\]

Finally, the positive truncation deletes exactly one mixed signature:

\[
|P_t\text{-M}|
=
\left\lfloor\frac{L^2}{4}\right\rfloor-1.
\]

## A.4 Negative curvature

The relation

\[
u+w=2v+L
\]

forces

\[
0\le v\le\left\lfloor\frac{L-2}{2}\right\rfloor,
\qquad
L\le u+w\le2L-2.
\]

No outer depth is \(0\), while every \(1,\ldots,L-1\) occurs, so

\[
|M\text{-O}|=L-1.
\]

The centre range, with depth \(0\) contributing the zero signature, gives

\[
|M\text{-C}|=\left\lfloor\frac L2\right\rfloor.
\]

For the mixed family,

\[
2v+1\le w\le L-1,
\]

and the projection is injective.  Therefore

\[
|M\text{-M}|
=
\sum_{v=0}^{\lfloor(L-2)/2\rfloor}(L-1-2v)
=
\left\lfloor\frac{L^2}{4}\right\rfloor.
\]

Reflection

\[
(u,w)\mapsto(L-1-u,L-1-w)
\]

maps the negative-curvature outer-pair set bijectively to the positive one,
hence

\[
|M\text{-OO}|
=
|M\text{-A}|
=
\binom{\lfloor L/2\rfloor+1}{2}.
\]

The negative truncation removes exactly the signature \(x_1\), so

\[
|M_t\text{-M}|
=
\left\lfloor\frac{L^2}{4}\right\rfloor-1.
\]

Together with \(|E|=1\), these are all nineteen formulas.

---

# Appendix B. Fixed-profile first-hit counting

For a fixed profile \(\rho=(\rho_1,\ldots,\rho_m)\), write

\[
\binom{n}{v}
=
\frac{n!}{\prod_j v_j!}
\]

for the multinomial coefficient when \(|v|_1=n\), where
\(|v|_1=\sum_j v_j\).  A first-hit bad prefix \(u\) with profile
\(p=\Psi(u)\) eliminates exactly

\[
C_\rho(p)
=
\binom{L-|p|_1}{\rho-p}
\]

complete profile words.

If \(B\) is the first-hit antichain and \(\mathcal S\) the satisfying set, then

\[
|\mathcal S|
+
\sum_{u\in B}C_\rho(\Psi(u))
=
\binom{L}{\rho}.
\tag{B.1}
\]

This identity is independent of search order.

More generally, if legal prefixes with identical future-relevant frontier data
are grouped into a state \(s\) of multiplicity \(N_d(s)\), then a first-hit
blocked transition to child profile \(p\) contributes

\[
N_d(s)C_\rho(p)
\]

to the blocked mass.  Summing legal-leaf multiplicity and blocked mass over all
layers reproduces \(\binom{L}{\rho}\).  This is an exact quotient-DAG accounting
identity.  It should not be interpreted as a guarantee of compression: in the
length-\(40\) application every realized quotient multiplicity is \(1\).

---

# References

1. A. Carpi, “On Abelian Power-Free Morphisms,” *International Journal of
   Algebra and Computation* **3**(2) (1993), 151–168.
   doi:10.1142/S0218196793000123.

2. J. D. Currie and N. Rampersad, “Fixed points avoiding Abelian
   \(k\)-powers,” *Journal of Combinatorial Theory, Series A* **119**(5)
   (2012), 942–948. doi:10.1016/j.jcta.2012.01.006.

3. S. Eyidoğan, H. Göral and N. Tanısalı, “Box Progressions, Abelian
   Power-Free Morphisms and A Sieve Technique for the Template Method,”
   arXiv:2605.20504 (2026).

4. G. Fici and S. Puzynina, “Abelian combinatorics on words: A survey,”
   *Computer Science Review* **47** (2023), 100532.
   doi:10.1016/j.cosrev.2022.100532.

5. V. Keränen, “Abelian squares are avoidable on 4 letters,” in
   *Automata, Languages and Programming*, LNCS **623** (1992), 41–52.
   doi:10.1007/3-540-55719-9_62.

6. M. Rao and M. Rosenfeld, “Avoiding Two Consecutive Blocks of Same Size and
   Same Sum over \(\mathbb Z^2\),” *SIAM Journal on Discrete Mathematics*
   **32**(4) (2018), 2381–2397. doi:10.1137/17M1149377.

7. L. B. Richmond and J. Shallit, “Counting Abelian Squares,”
   *Electronic Journal of Combinatorics* **16**(1) (2009), R72.
   doi:10.37236/161.
