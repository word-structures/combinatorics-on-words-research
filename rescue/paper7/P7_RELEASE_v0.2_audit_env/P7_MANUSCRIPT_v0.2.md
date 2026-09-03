# One-Sided Extendability in the Four-Letter Abelian-Square-Free Language

**Authors:** [author placeholders]  
**Draft:** v0.2, September 2026

## Abstract

Let \(\mathcal A_4\) be the language of finite Abelian-square-free words over a four-letter alphabet. We exhibit the explicit word

\[
s=\texttt{abacabadc}
\]

which cannot be extended by even one letter to the left while remaining Abelian-square-free, but which is a prefix of a right-infinite Abelian-square-free word. Thus

\[
s\in re(\mathcal A_4)\setminus le(\mathcal A_4),
\]

and in particular \(re(\mathcal A_4)\setminus e(\mathcal A_4)\neq\varnothing\). The negative half of the proof is elementary. For the positive half we iterate an affine operation built from Keränen's 85-uniform Abelian-square-free endomorphism. Boundary safety is reduced to an exact finite residual system consisting of 35 states and 17 recursive transition rows, together with a fixed 190-letter base certificate. A standalone exact verifier accompanies the proof. In the primary sources located, the corresponding one-sided-extension phenomenon was posed as open; we found no later equivalent resolution in the literature searched through 3 September 2026, so the novelty assessment remains provisional.

---

## 1. Introduction

An **Abelian square** is a word \(uv\) with \(|u|=|v|>0\) in which \(u\) and \(v\) have the same Parikh vector. Erdős asked whether an infinite word over four letters can avoid Abelian squares. Keränen answered this affirmatively by constructing an 85-uniform morphism \(g\) which is itself Abelian-square-free: if \(w\) is Abelian-square-free, then so is \(g(w)\) [Keränen 1992].

The existence of infinite Abelian-square-free words does not imply that every finite Abelian-square-free word has an infinite continuation. Keränen later studied **unfavourable factors**, finite Abelian-square-free words which cannot occur as proper factors of an infinite Abelian-square-free word. In the 2010 account he noted that such a factor might nevertheless be extendable without bound in one direction, and stated that the existence of such factors remained open at that time [Keränen 2010].

We prove the following concrete asymmetric phenomenon.

> **Main theorem.** The word
> \[
> s=\texttt{abacabadc}
> \]
> is a prefix of a right-infinite Abelian-square-free word, but no letter can be prepended to \(s\) without creating an Abelian square.

In the notation for extendable parts of factorial languages used by Shur [Shur 2008], this gives

\[
\boxed{s\in re(\mathcal A_4)\setminus le(\mathcal A_4)}.
\]

Consequently,

\[
\boxed{re(\mathcal A_4)\setminus e(\mathcal A_4)\neq\varnothing}.
\]

The proof has deliberately asymmetric difficulty. Left unextendability is checked by four short Abelian squares. Right infinite extendability is obtained from a nested construction

\[
C,\quad Cg(C),\quad Cg(C)g^2(C),\quad\ldots,
\]

where \(C=\texttt{abacabadcdb}\). The only nonclassical issue is to prevent new Abelian squares at the repeatedly introduced prefix boundary. We reduce this issue to a finite exact residual certificate.

No claim of minimality is made for the length-9 witness. The historical novelty statement is also kept separate from correctness: in the sources we located the one-sided-extension question was posed as open, but the absence of a later resolution is not itself a proof of novelty.

---

## 2. Preliminaries

Let

\[
\Sigma_4=\{a,b,c,d\}.
\]

For a finite word \(u\), write

\[
P(u)=(|u|_a,|u|_b,|u|_c,|u|_d)
\]

for its Parikh vector. Words \(u,v\) are **Abelian equivalent** if \(P(u)=P(v)\). An **Abelian square** is a factor \(uv\) with \(|u|=|v|>0\) and \(P(u)=P(v)\). Let \(\mathcal A_4\) denote the factorial language of finite words over \(\Sigma_4\) containing no Abelian square.

Following Shur [Shur 2008], the right-, left-, and two-sided extendable parts of a language \(L\) consist of words having infinitely many corresponding extensions in \(L\). Equivalently, for our finite alphabet,

\[
\begin{aligned}
w\in re(L)&\iff \forall n\ \exists v,\ |v|\ge n,\ wv\in L,\\
w\in le(L)&\iff \forall n\ \exists u,\ |u|\ge n,\ uw\in L,\\
w\in e(L)&\iff \forall n\ \exists u,v,\ |u|,|v|\ge n,\ uwv\in L.
\end{aligned}
\]

For a factorial language, the last condition immediately implies the first two, so

\[
e(L)\subseteq re(L)\cap le(L).
\]

When a nested infinite right extension is explicitly constructed, membership in \(re(L)\) is immediate. Conversely, over a finite alphabet, arbitrarily long compatible finite right extensions yield a one-sided infinite extension by the usual finitely branching tree argument.

---

## 3. A word which is dead on the left

Set

\[
s=\texttt{abacabadc}.
\]

A direct check shows that \(s\in\mathcal A_4\). More importantly, every one-letter left extension is forbidden.

### Lemma 3.1

No letter in \(\Sigma_4\) can be prepended to \(s\) while preserving Abelian-square-freeness.

### Proof

The following Abelian squares occur in the four possible extensions.

| prepended letter | forbidden factor | half-period | common Parikh vector |
|---|---|---:|---|
| \(a\) | \(a\mid a\) | 1 | \((1,0,0,0)\) |
| \(b\) | \(ba\mid ba\) | 2 | \((1,1,0,0)\) |
| \(c\) | \(caba\mid caba\) | 4 | \((2,1,1,0)\) |
| \(d\) | \(dabac\mid abadc\) | 5 | \((2,1,1,1)\) |

Thus no length-1 left extension belongs to \(\mathcal A_4\), and hence

\[
s\notin le(\mathcal A_4).\qquad\square
\]

---

## 4. Keränen's morphism and the right-infinite construction

We use Keränen's 85-uniform Abelian-square-free endomorphism \(g\) [Keränen 1992]. Its four images are given in Appendix A. The classical property used here is

\[
w\in\mathcal A_4\quad\Longrightarrow\quad g(w)\in\mathcal A_4.
\tag{4.1}
\]

Let

\[
C=\texttt{abacabadcdb}
\]

and define

\[
F(V)=C\,g(V).
\]

Starting from \(W_0=C\), put

\[
W_{n+1}=F(W_n)=C\,g(W_n).
\]

Since \(g\) is a morphism,

\[
W_n=C\,g(C)\,g^2(C)\cdots g^n(C),
\tag{4.2}
\]

so \(W_n\) is a prefix of \(W_{n+1}\). Hence the limit

\[
W_\infty=C\,g(C)\,g^2(C)\cdots
\tag{4.3}
\]

is well-defined. We will prove that every \(W_n\) is Abelian-square-free. The only possible new squares under \(F\) are those meeting the prefix \(C\), because factors wholly contained in \(g(V)\) are covered by (4.1).

---

## 5. Residual states

We use row Parikh vectors. Let \(M\) be the incidence matrix of \(g\): the row indexed by \(x\) is \(P(g(x))\). Directly from the four images,

\[
M=
\begin{pmatrix}
19&21&27&18\\
18&19&21&27\\
27&18&19&21\\
21&27&18&19
\end{pmatrix},
\qquad
\det M=43435\ne0.
\tag{5.1}
\]

Thus \(qM=r\) has at most one rational solution \(q\), and integrality can be checked exactly.

### Definition 5.1 (residual occurrence)

For \(q\in\mathbb Z^4\) and \(x,y\in\Sigma_4\), a residual state \(R(q,x,y)\) **occurs** in a word \(V\) if

\[
V=A\,x\,B\,y\,D
\tag{5.2}
\]

for some words \(A,B,D\), with the displayed occurrences of \(x\) and \(y\) distinct and in this order, and

\[
P(A)-P(B)=q.
\tag{5.3}
\]

We next define a finite set \(Q\) of such states by exact boundary geometry.

### 5.1 States forced by a large crossing square

Suppose an Abelian square in \(F(V)=Cg(V)\) is not contained wholly in \(g(V)\). Its start is at a position

\[
i\in\{0,\ldots,10\}
\]

of \(C\). Let its half-period be \(K\ge85\). The midpoint and the end are then separated by at least one full image length, so we may write the relevant part of the source word as

\[
V=A\,x\,B\,y\,D,
\]

where the midpoint lies at offset \(r\in\{0,\ldots,84\}\) of \(g(x)\), and the end lies at offset \(t\in\{0,\ldots,84\}\) of \(g(y)\). An end exactly at the final boundary of an image may additionally be represented by \(t=85\); the exact audit below shows that this case yields no additional integral state.

The two halves have Parikh vectors

\[
P(C[i:])+P(A)M+P(g(x)[:r])
\]

and

\[
P(g(x)[r:])+P(B)M+P(g(y)[:t]).
\]

Their equality implies

\[
qM=
P(g(x)[r:])+P(g(y)[:t])
-P(C[i:])-P(g(x)[:r]),
\tag{5.4}
\]

where

\[
q=P(A)-P(B).
\]

We define \(Q\) to be the set of all integral triples \((q,x,y)\) obtained from (5.4) as \(i,x,r,y,t\) range over the finite possibilities. Exact integer inversion of (5.4) gives 99 valid parameter rows collapsing to

\[
|Q|=35
\tag{5.5}
\]

unique residual states. Their complete list is supplied in `P7_V2_RESIDUAL_STATES.csv`, while the 99 geometric rows are supplied in `P7_V2_SEED_ROWS.csv`.

### Lemma 5.2 (large crossing-square reduction)

If \(V\) is Abelian-square-free and \(Cg(V)\) contains an Abelian square meeting \(C\) with half-period at least 85, then \(V\) contains a residual state from \(Q\).

### Proof

Choose \(i,x,r,y,t\) from the actual square as above and set \(q=P(A)-P(B)\). Equation (5.4) holds. Since \(q\in\mathbb Z^4\), this actual configuration is among the exact integral cases used to define \(Q\). Hence \(R(q,x,y)\) occurs in \(V\). \(\square\)

---

## 6. Recursive closure of the residual states

The second finite calculation shows that a residual occurrence in \(Cg(V)\), unless it lies in a fixed short prefix, desubstitutes to a residual occurrence in \(V\).

Suppose \(R(q,x,y)\in Q\) occurs in \(Cg(V)\) and the two marked target letters lie in distinct image blocks \(g(h)\) and \(g(k)\), at offsets \(r\) and \(t\), respectively. Write the corresponding source factorization as

\[
V=A\,h\,B\,k\,D,
\]

and set \(q'=P(A)-P(B)\). Expanding the target prefix and gap in Definition 5.1 gives

\[
q'M=
q-P(C)-P(g(h)[:r])+P(g(h)[r+1:])+P(g(k)[:t]).
\tag{6.1}
\]

The omission of the marked target letter itself explains the suffix \(g(h)[r+1:]\).

Exact inversion of (6.1), over every state in \(Q\) and every compatible choice of \(h,r,k,t\), produces exactly 17 integral parameter rows. Every source triple \((q',h,k)\) belongs again to \(Q\). The full rows are listed in `P7_V2_RECURSIVE_TRANSITIONS.csv`.

### Lemma 6.1 (recursive residual closure)

If a state from \(Q\) occurs in \(Cg(V)\) with its marked letters in distinct image blocks beyond \(C\), then a state from \(Q\) occurs in \(V\).

### Proof

For an actual occurrence, the source vector \(q'=P(A)-P(B)\) is integral and satisfies (6.1). The exact finite inversion therefore includes the actual alignment; every integral source state produced by that enumeration lies in \(Q\). \(\square\)

---

## 7. Base cases and strict descent

The finite residual system closes only after the remaining short configurations are bounded explicitly.

### Lemma 7.1 (fixed base window)

Every crossing Abelian square of half-period \(K<85\), and every residual occurrence from \(Q\) which does not fall under Lemma 6.1, is contained in the first 190 letters of \(Cg(V)\), provided that \(V\) begins with \(C\).

### Proof

A crossing square starts at \(i<11\). If \(K<85\), it ends before position

\[
11+2\cdot84<190.
\]

Now consider a residual occurrence

\[
Cg(V)=A\,x\,B\,y\,D
\]

with marked positions \(j<k\). From \(q=P(A)-P(B)\), taking coordinate sums gives

\[
\sum q=j-(k-j-1)=2j+1-k,
\]

so

\[
k=2j+1-\sum q.
\tag{7.1}
\]

The 35-state certificate satisfies

\[
\sum q\in\{-1,0,1\}
\tag{7.2}
\]

for every \(q\) in \(Q\). If the first marked letter lies in \(C\), then \(j<11\), and (7.1) gives \(k\le22\). If the first mark lies beyond \(C\) but both marks lie in the same 85-letter image block, then \(k-j\le84\). Combining this with (7.1) and (7.2) gives \(j\le84\) and \(k\le170\). These are precisely the cases not handled by Lemma 6.1. Hence a 190-letter prefix is a safe common base window. \(\square\)

Because the invariant below requires \(V\) to begin with \(C\), the first 190 letters of \(Cg(V)\) are independent of the rest of \(V\): they equal the first 190 letters of

\[
W_1=Cg(C).
\]

The exact verifier checks that this fixed word is Abelian-square-free and contains no state from \(Q\).

The recursive step is also well-founded without a floating-point or asymptotic estimate. If the first marked position in a recursive target occurrence is \(j\ge11\), its containing source letter occurs at position

\[
a=\left\lfloor\frac{j-11}{85}\right\rfloor
\]

of \(V\). Therefore

\[
a<j.
\tag{7.3}
\]

Thus recursive desubstitution strictly decreases a nonnegative integer position and cannot continue indefinitely.

---

## 8. The invariant and the infinite word

Define

\[
\mathcal C^*=
\{V:\ C\text{ is a prefix of }V,\ V\in\mathcal A_4,\text{ and }V\text{ contains no state from }Q\}.
\tag{8.1}
\]

The fixed-prefix condition is essential: it is what makes all short cases in Lemma 7.1 reduce to one fixed base window.

### Proposition 8.1 (invariance)

If \(V\in\mathcal C^*\), then

\[
Cg(V)\in\mathcal C^*.
\]

### Proof

First, \(Cg(V)\) begins with \(C\).

Since \(V\) is Abelian-square-free, (4.1) implies that \(g(V)\) is Abelian-square-free. Therefore any Abelian square in \(Cg(V)\) must meet \(C\). If its half-period is below 85, Lemma 7.1 places it in the fixed 190-letter base window, which the certificate verifies to be Abelian-square-free. If its half-period is at least 85, Lemma 5.2 would force a state from \(Q\) in \(V\), contrary to \(V\in\mathcal C^*\). Hence \(Cg(V)\) is Abelian-square-free.

It remains to exclude states from \(Q\) in \(Cg(V)\). A nonrecursive occurrence lies in the fixed base window by Lemma 7.1 and is excluded by the certificate. A recursive occurrence would, by Lemma 6.1, force a state from \(Q\) in \(V\), again a contradiction. Thus \(Cg(V)\) contains no state from \(Q\), and belongs to \(\mathcal C^*\). \(\square\)

### Proposition 8.2

The word \(C\) belongs to \(\mathcal C^*\).

### Proof

The exact finite verifier checks directly that \(C\) is Abelian-square-free and contains none of the 35 states from \(Q\). \(\square\)

### Corollary 8.3

Every \(W_n\) is Abelian-square-free, and the limit \(W_\infty\) in (4.3) is a right-infinite Abelian-square-free word.

### Proof

Propositions 8.1 and 8.2 imply \(W_n\in\mathcal C^*\subseteq\mathcal A_4\) for all \(n\). Any finite factor of the nested limit \(W_\infty\) occurs in some \(W_n\), so the limit contains no Abelian square. \(\square\)

---

## 9. Main result

### Theorem 9.1

For

\[
s=\texttt{abacabadc},
\]

one has

\[
\boxed{s\in re(\mathcal A_4)\setminus le(\mathcal A_4)}.
\]

### Proof

The word \(s\) is a prefix of \(C\), hence a prefix of the right-infinite Abelian-square-free word \(W_\infty\) from Corollary 8.3. Thus \(s\in re(\mathcal A_4)\). Lemma 3.1 gives \(s\notin le(\mathcal A_4)\). \(\square\)

### Corollary 9.2

\[
re(\mathcal A_4)\setminus e(\mathcal A_4)\ne\varnothing.
\]

### Proof

Since \(e(\mathcal A_4)\subseteq le(\mathcal A_4)\), Theorem 9.1 gives the claim. \(\square\)

---

## 10. Computer-assisted part and reproducibility

The proof uses one classical external input, Keränen's theorem (4.1), and one finite exact computation specific to the boundary \(C\).

The accompanying script `verify_p7_main_theorem_v2.py` recomputes from the displayed formulas:

1. the four immediate left-death witnesses;
2. the incidence matrix \(M\) and its exact integer inverse test;
3. the 99 large-square seed alignments;
4. the 35 unique residual states \(Q\);
5. the 17 integral recursive transition rows and closure back into \(Q\);
6. the bound \(\sum q\in\{-1,0,1\}\);
7. absence of Abelian squares and residual states in the fixed 190-letter base window;
8. membership of \(C\) in the invariant.

It also performs direct regression checks on \(W_1\) and on boundary-crossing squares in \(W_2\). These finite long-word checks are **not** used as extrapolation in the proof.

A representative successful run reports:

```text
P7 V2 CERTIFICATE: PASS
left death: 4/4
seed parameter rows: 99
residual states: 35
recursive transition rows: 17
base window: 190 letters — ASF and residual-free
W1: 946 ASF
W2: 80421 no crossing square (interior protected by Keranen endomorphism)
```

The exact state and transition tables are supplied as machine-readable supplementary files.

---

## 11. Relation to previous work

Keränen's 1992 construction established an Abelian-square-free endomorphism on four letters and therefore infinite four-letter Abelian-square-free words [Keränen 1992]. Carpi later showed, among other results, exponential growth in the number of four-letter Abelian-square-free words [Carpi 1998].

The finite extension problem has a distinct literature. Cummings and Mays constructed finite maximal Abelian-square-free words [Cummings--Mays 2001]; Korn gave short maximal constructions and bounds [Korn 2003], later improved by Bullock [Bullock 2004]. Those results concern words blocked on both sides and do not provide the asymmetric combination used here.

Keränen's later work on unfavourable factors is closer to the present question. In the 2010 primary source located for this audit, he explicitly observed that an unfavourable factor might still be extendable without bound in one direction and stated that the existence of such factors remained open at that time [Keränen 2010]. Theorem 9.1 realizes that phenomenon in a stronger form: the witness has a right-infinite continuation while admitting no legal one-letter extension on the left.

Shur's framework makes the set-theoretic consequence transparent: despite general results comparing growth rates of extendable parts of factorial languages, the actual sets \(re(\mathcal A_4)\) and \(e(\mathcal A_4)\) need not coincide [Shur 2008].

We found no later result equivalent to Theorem 9.1 in the literature searched through 3 September 2026. This is a provisional literature conclusion, not a mathematical part of the theorem.

---

## 12. Discussion

The witness is small and its obstruction is completely local on the left, whereas the proof of infinite survival on the right is global and computer-assisted. This separation suggests several questions which we do not pursue here:

- What is the minimum length of a word in \(re(\mathcal A_4)\setminus le(\mathcal A_4)\)?
- Can all left-unextendable/right-infinite four-letter Abelian-square-free words be characterized structurally?
- Is there a substantially shorter human proof of the right-infinite construction?
- Which other factorial avoidance languages exhibit the same extreme one-sided asymmetry?

No minimality or uniqueness claim is made for \(s\), \(C\), or the construction.

---

## Appendix A. The 85-uniform morphism

\[
\begin{aligned}
g(a)={}&\texttt{abcacdcbcdcadcdbdabacabadbabcbdbcbacbcdcacbabdabacadcbcdcacdbcbacbcdcacdcbdcdadbdcbca},\\
g(b)={}&\texttt{bcdbdadcdadbadacabcbdbcbacbcdcacdcbdcdadbdcbcabcbdbadcdadbdacdcbdcdadbdadcadabacadcdb},\\
g(c)={}&\texttt{cdacabadabacbabdbcdcacdcbdcdadbdadcadabacadcdbcdcacbadabacabdadcadabacabadbabcbdbadac},\\
g(d)={}&\texttt{dabdbcbabcbdcbcacdadbdadcadabacabadbabcbdbadacdadbdcbabcbdbcabadbabcbdbcbacbcdcacbabd}.
\end{aligned}
\]

The proof uses Keränen's theorem that this morphism maps every Abelian-square-free finite word to an Abelian-square-free word.

---

## Appendix B. Finite certificate files

The supplementary proof data are:

- `P7_V2_RESIDUAL_STATES.csv` — 35 unique states \(R(q,x,y)\);
- `P7_V2_SEED_ROWS.csv` — 99 valid crossing-square alignment rows;
- `P7_V2_RECURSIVE_TRANSITIONS.csv` — 17 exact recursive rows;
- `verify_p7_main_theorem_v2.py` — exact verifier/reconstructor.

The certificate is intentionally separated from the historical v0.1 package, whose residual-state semantics were found to be defective during red-team review.

---

## References

**[Bullock 2004]** E. M. Bullock, *Improved Bounds on the Length of Maximal Abelian Square-Free Words*, Electronic Journal of Combinatorics 11(1), R17 (2004). DOI: 10.37236/1770.

**[Carpi 1998]** A. Carpi, *On the Number of Abelian Square-Free Words on Four Letters*, Discrete Applied Mathematics 81 (1998), 155–167. DOI: 10.1016/S0166-218X(97)88002-X.

**[Cummings--Mays 2001]** L. J. Cummings and M. Mays, *A One-Sided Zimin Construction*, Electronic Journal of Combinatorics 8(1), R27 (2001). DOI: 10.37236/1571.

**[Keränen 1992]** V. Keränen, *Abelian Squares Are Avoidable on 4 Letters*, in W. Kuich (ed.), ICALP '92, Lecture Notes in Computer Science 623, Springer, pp. 41–52 (1992). DOI: 10.1007/3-540-55719-9_62.

**[Keränen 2010]** V. Keränen, *Combinatorics on Words: Suppression of Unfavorable Factors in Pattern Avoidance*, The Mathematica Journal 11(3) (2010). DOI: 10.3888/tmj.11.3-4.

**[Korn 2003]** M. Korn, *Maximal Abelian Square-Free Words of Short Length*, Journal of Combinatorial Theory, Series A 102(1) (2003), 207–211. DOI: 10.1016/S0097-3165(03)00016-5.

**[Shur 2008]** A. M. Shur, *Comparing Complexity Functions of a Language and Its Extendable Part*, RAIRO - Theoretical Informatics and Applications 42(3) (2008), 647–655. DOI: 10.1051/ita:2008021.
