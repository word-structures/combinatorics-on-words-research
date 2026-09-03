# Paper 4 — Block Assembly for Ternary Abelian-Square Avoidance

**Working manuscript v0.2 — 2026-08-27**

**Status:** active research manuscript; theorem architecture established, final construction not yet found.  
**Problem status:** Mäkelä's ternary period-\(\ge 2\) Abelian-square question is treated as open.  
**Novelty status:** NOT_ESTABLISHED.  
**Governance:** no h=8 computation; no D40 use; no Git mutation in this manuscript preparation.

## Working title

**Block Assembly over a Morphic Core for Ternary Abelian-Square Avoidance**

Alternative if the construction succeeds:

**An Infinite Ternary Word Avoiding Abelian Squares of Period at Least Two**

---

## Abstract — current non-breakthrough form

We develop a constant-length block-assembly framework for the problem of avoiding nontrivial Abelian squares over a ternary alphabet. Starting from the six-letter morphic fixed point \(h_6^\omega(a)\) of Rao and Rosenfeld, we replace their length-10 ternary coding by six length-40 ternary block roles whose incidence matrix is an affine lift of the original coding matrix. The lift preserves the kernel relevant to the Rao–Rosenfeld long-power decision procedure.

For any constant-length coding, an output Abelian square admits an exact boundary-correction decomposition into an equal-length macro-factor difference plus a finite correction determined by the cut phases and boundary letters. This reduces the global obstruction to a finite family of affine Parikh templates over the fixed nonperiodic macro language. A bare finite contact graph is insufficient as a global certificate because repeatable graph cycles yield periodic coded words and therefore squares; the correct architecture combines finite local contact constraints, a nonperiodic macro core, and a finite template certificate.

For the length-40 specialization, the six block Parikh vectors are fixed and only factors occurring in \(h_6^\omega(a)\) need be considered. Current exact computation has produced nontrivial compatible two-role modules and has ruled out one complete BC-module family as extendable to an ABCF partial coding under the period-\(2,\ldots,40\) constraints. The complete six-block coding remains open.

The generic template/parent/ancestor machinery is prior art. The possible contribution of this work is the specific affine-lift/block-assembly reduction, its exact finite-language decomposition, and—if found—the certified six-block coding solving Mäkelä's ternary problem.

---

## 1. Problem and scope

An Abelian square is a factor \(UV\) with equal Parikh vectors:
\[
\Psi(U)=\Psi(V).
\]

The target question is whether there exists an infinite ternary word avoiding every Abelian square whose half-length satisfies
\[
|U|\ge 2.
\]

Rao and Rosenfeld proved the weaker threshold result: an infinite ternary word exists avoiding Abelian squares of period greater than \(5\). Their construction is
\[
g_3(h_6^\omega(a)).
\]

This manuscript keeps the same six-letter macro core \(h_6^\omega(a)\) and searches for a new ternary coding \(H\).

---

## 2. The macro core

Use
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

The fixed point \(h_6^\omega(a)\) is Abelian-square-free over the six-letter macro alphabet in the Rao–Rosenfeld construction.

The exact length-2 macro factor set is
\[
\mathcal B_2=
\{ac,ad,af,bc,bd,cb,ce,dc,df,ea,eb,fa,fb,fe\}.
\]

The exact length-3 factor set used by the current finite period-\(2,\ldots,40\) certifier has 22 elements:
\[
\begin{aligned}
\mathcal B_3=\{&
ace,adf,afe,bce,bdc,bdf,cbc,cbd,cea,ceb,dcb,\\
&dfa,dfb,eac,ead,eaf,ebc,ebd,fad,faf,fbd,fea
\}.
\end{aligned}
\]

---

## 3. Constant-length boundary decomposition

Let
\[
H:\Gamma\to\{a,b,c\}^L
\]
be constant length and let \(M_H\) be its incidence matrix.

For a cut coordinate \((i,s)\), write the cumulative Parikh vector as
\[
C(i,s)=\sum_{j<i}m(x_j)+p_{x_i}(s).
\]

A factor with half-length \(K\) is an Abelian square exactly when the three relevant cuts satisfy
\[
C(i_2,s_2)-2C(i_1,s_1)+C(i,s)=0.
\]

Writing \(K=qL+r\), the equation can be reorganized as
\[
\boxed{
M_H\bigl(\Psi_\Gamma(V)-\Psi_\Gamma(U)\bigr)+\beta=0,
}
\]
where \(U,V\) are adjacent equal-length macro cores after moving at most one macro symbol into the boundary correction, and \(\beta\) belongs to a finite set determined by phases, residues, boundary macro letters and block-prefix Parikh vectors.

After projection to two ternary Parikh coordinates,
\[
\overline M_H\bigl(\Psi(V)-\Psi(U)\bigr)=-\overline\beta.
\]

Thus every output Abelian square belongs to a finite family of affine additive-square templates.

**Epistemic status:** project-derived exact reduction; relation to standard template formulations must be stated conservatively.

---

## 4. Why a bare contact graph cannot be the global proof

Suppose a finite directed graph is interpreted so that every directed path is an admissible block assembly and arbitrarily long paths exist.

The graph then contains a directed cycle. Repeating the cycle produces a periodic macro word. Any nonempty constant-length coding of this word is periodic. A periodic output contains ordinary squares, hence Abelian squares.

Therefore a finite contact graph can be used for local compatibility and pruning, but not as the sole global all-period certificate.

The required architecture is
\[
\boxed{
\text{local contact constraints}
+
\text{nonperiodic macro core}
+
\text{finite template certificate}.
}
\]

---

## 5. Kernel-preserving affine lift

Rao–Rosenfeld's length-10 ternary coding \(g_3\) has incidence matrix
\[
M_{g_3}=
\begin{pmatrix}
5&1&0&2&3&9\\
4&2&4&0&6&1\\
1&7&6&8&1&0
\end{pmatrix}.
\]

For an equal-column-length matrix \(M\), define
\[
M'=sM+u\mathbf1^T,
\qquad s>0.
\]

Then
\[
\boxed{\ker M'=\ker M.}
\]

For the natural length-40 lift
\[
s=1,\qquad u=(10,10,10)^T,
\]
the required block Parikh roles are
\[
\boxed{
\begin{array}{c|ccc}
x&\#a&\#b&\#c\\
\hline
a&15&14&11\\
b&11&12&17\\
c&10&14&16\\
d&12&10&18\\
e&13&16&11\\
f&19&11&10
\end{array}}
\]

and
\[
\ker M_H=\ker M_{g_3}.
\]

For equal-length macro factors with difference vector \(d\),
\[
\mathbf1^Td=0
\]
and therefore
\[
M_Hd=M_{g_3}d
\]
for this \(s=1\) lift.

---

## 6. Exact finite-period reduction for \(L=40\)

For a period \(K\le40\), an Abelian square has total length at most \(80\). Hence it intersects at most three consecutive length-40 macro images.

Therefore avoidance of every Abelian square with
\[
2\le K\le40
\]
is certified exactly by checking
\[
H(xyz)
\]
for every
\[
xyz\in\mathcal B_3.
\]

This is stronger than the earlier period-\(2,\ldots,5\) seam gate and is the current search gate.

**Exact finite certifier:** 22 macro trigrams, periods \(2,\ldots,40\).

---

## 7. Long-period certificate

Rao–Rosenfeld Proposition 10 / Theorem 3 gives a finite decision route for
\[
H(h_6^\omega(a))
\]
provided the expanding-space/kernel condition holds.

Because the affine lift preserves the relevant kernel, the current \(H\)-roles retain that algebraic precondition.

Once a candidate passes every period \(2,\ldots,40\), the remaining task is to prove absence of periods \(>40\) using the parent/template decision procedure. The project repository already contains an in-house implementation of the Rao–Rosenfeld parent/ancestor and realizability machinery, previously regression-tested against their \(h_6/g_3\) construction.

No candidate may be called a solution until both the finite gate and the long-template gate pass independently.

---

## 8. Current exact search evidence

### 8.1 A nontrivial AF module

A length-40 pair with the required A and F Parikh roles has been independently checked with zero Abelian-square violations for all relevant AF/FA/FAF factors and all periods \(2,\ldots,40\):

\[
\begin{aligned}
A={}&\texttt{abccacccbbaccbbbacbbaaabccaaacbbaaabbbaa},\\
F={}&\texttt{cbbaaacaaabaaacccaabcccbbaaabbbacbbaaaca}.
\end{aligned}
\]

Status: **EXACT-CHECKED finite module**, not a full coding.

### 8.2 A nontrivial BC module

A separate B/C pair has been found that passes the BC/CB/BCB/CBC period-\(2,\ldots,40\) constraints.

Status: **EXACT-CHECKED finite module**, not a full coding.

### 8.3 Compatibility obstruction for the first BC module

For the fixed current C block, exact backtracking reduced the set of A blocks satisfying the required AC period-\(2,\ldots,40\) condition to 279 candidates.

Across those A candidates, 1,975,141 complete profile-correct F continuations were enumerated under the remaining local constraints. No ABCF partial coding passed all required conditions. The best residual score was 7, localized to FA in the best witness.

Status: **EXACT-CHECKED negative result for this fixed BC module only.**

It is not an impossibility theorem for the length-40 architecture.

---


### 8.4 Exact elimination of the first AF module

The first exact AF module was
\[
\begin{aligned}
A={}&\texttt{abccacccbbaccbbbacbbaaabccaaacbbaaabbbaa},\\
F={}&\texttt{cbbaaacaaabaaacccaabcccbbaaabbbacbbaaaca}.
\end{aligned}
\]

It satisfies the required \(A/F\)-only finite-language conditions through period \(40\).
To determine whether it can occur in any full solution, we used only three further
**necessary** macro-bigram conditions:
\[
FB,\qquad AC,\qquad BC.
\]

For this fixed \(F\), exhaustive fixed-Parikh backtracking enumerated exactly
\[
4636
\]
length-40 B-blocks for which \(FB\) contains no Abelian square of period
\(2,\ldots,40\). The B enumeration closed after 300,261 search nodes.

For every such B, a second exact backtracking search attempted to construct a
profile-correct C while maintaining both \(AC\) and \(BC\) free of period-\(2,\ldots,40\)
Abelian squares at every extension. Across all 4,636 B candidates the C searches
visited only 19,407 nodes in total and **no complete length-40 C was possible**.
No C search reached its safety node cap.

Hence:

> **Exact negative lemma (finite computational).**  
> The displayed AF module cannot be extended to any \(A,B,C,F\) partial coding
> satisfying the necessary \(FB\), \(AC\), and \(BC\) period-\(2,\ldots,40\) conditions.

This is a statement about this fixed AF module only. It is not an impossibility
result for the length-40 architecture.

**Status:** `EXACT-CHECKED`; independent clean-room reproduction still required
before publication.

### 8.5 Search-landscape observations

A BC compatibility relation was explored using the stronger cyclic 80-symbol
condition on \(BC\), which is sufficient for all \(BC/CB/BCB/CBC\) factors through
period 40. From one exact C-block, a bounded exact search found 23 B-neighbours;
the reverse search from the seed B found three C-neighbours. This confirms that
exact pair modules are sparse and strongly anisotropic in the raw search tree.

A separate AF local-search candidate reached an apparent context-count score of 3,
but all three counts represented one internal period-2 defect `bbbb` in A.
The complete one-swap neighbourhood (529 profile-preserving swaps) and complete
two-swap A-neighbourhood (266,669 evaluated two-swap moves) contained no
improvement. This candidate is therefore not used as a module.

A local search that enforced block-internal cleanliness as a hard invariant also
performed poorly (best cross-context score 28 in the recorded run). It is retained
only as negative algorithm-engineering evidence, not mathematical evidence.

These observations motivate conditional exact generation and constraint-directed
module joins rather than unconstrained simulated annealing.


## 9. Search architecture from here

The search is factorized into exact compatibility modules rather than six unconstrained words.

A useful representation is
\[
\boxed{
\{\text{BC modules}\}
\bowtie_{AC,FB}
\{\text{AF modules}\},
}
\]
followed by insertion of the D and E roles and final verification on all 22 macro trigrams.

The next implementation should:

1. generate **new** exact AF modules; the first AF module is now eliminated;
2. use conditional exact generation rather than independent Cartesian block pools;
3. for each AF module, enumerate \(FB\)-compatible B candidates and construct C
   under simultaneous \(AC\) and \(BC\) pruning;
4. retain only surviving \(A,B,C,F\) cores;
5. add D/E through the remaining \(h_6\) factor constraints;
6. run the exact 22-trigram period-\(2,\ldots,40\) certifier;
7. send any zero candidate to the long parent/template certifier.

All negative statements must specify the exact finite search space exhausted.

---

## 10. Two possible paper outcomes

### Outcome A — breakthrough construction

If a six-block \(H\) passes the finite gate and the long template certificate, then
\[
H(h_6^\omega(a))
\]
is an infinite ternary word avoiding Abelian squares of half-length at least 2.

This is the strongest manuscript and would settle Mäkelä's question.

### Outcome B — structural / computational paper

If no coding is found, the project may still support a standalone paper only if it obtains a sufficiently strong result such as:

- an exact nonexistence theorem for a mathematically natural length-40 affine-lift class;
- a new finite boundary/template reduction with demonstrated computational consequences not already subsumed by standard template machinery;
- a substantial exact classification of admissible block modules;
- a provably stronger search/sieve theorem for this fixed morphic-core setting.

The reduction alone is not yet assumed publishable.

---

## 11. Novelty boundary

### Established prior art

- Abelian-square-free words on four letters: Keränen.
- Abelian power-free morphism criteria: Dekking / Carpi.
- template, parent, ancestor and decidability machinery: Currie–Rampersad.
- long-period ternary construction \(g_3(h_6^\omega(a))\): Rao–Rosenfeld.
- modern template sieve acceleration: Eyidoğan–Göral–Tanısalı (2026).

### Elementary / project-specific but not automatically novel

- affine kernel-preserving lift;
- finite factor sets of \(h_6^\omega(a)\);
- locality of a bounded-period test under a uniform block code;
- periodic-cycle obstruction for a bare finite contact graph.

### Potentially original contribution

The specific synthesis
\[
h_6^\omega(a)
+
\text{length-40 affine-lift roles}
+
\text{exact local module factorization}
+
\text{Rao--Rosenfeld long certificate}
\]
and any new exact theorem or successful coding obtained from it.

\[
\boxed{\text{NOVELTY = NOT\_ESTABLISHED}}
\]

---

## 12. Reproducibility requirements before submission

A final paper must archive:

- exact six block strings if a construction is found;
- their six Parikh vectors;
- exact \(h_6\) bigram/trigram factor sets and stabilization proof/check;
- period-\(2,\ldots,40\) exhaustive verifier;
- independent verifier written separately;
- parent/template long-period certifier;
- commands, hashes and outputs;
- precise search-space declarations for every negative computation;
- literature/novelty audit with source-specific wording.

No empirical survivor is a theorem until an exact verifier passes.

---

## References — working list

- V. Keränen, *Abelian squares are avoidable on 4 letters*, ICALP 1992.
- A. Carpi, *On Abelian power-free morphisms*, International Journal of Algebra and Computation 3 (1993), 151–168.
- J. D. Currie and N. Rampersad, *Fixed points avoiding Abelian k-powers*, Journal of Combinatorial Theory A 119 (2012), 942–948. DOI 10.1016/j.jcta.2012.01.006. Consult published errata.
- M. Rao, *On some generalizations of abelian power avoidability*, Theoretical Computer Science 601 (2015), 39–46.
- M. Rao and M. Rosenfeld, *Avoiding Two Consecutive Blocks of Same Size and Same Sum over Z^2*, SIAM Journal on Discrete Mathematics 32 (2018), 2381–2397. DOI 10.1137/17M1149377.
- G. Fici and M. Puzynina, *Abelian Combinatorics on Words: A Survey*, Computer Science Review 47 (2023), 100532.
- S. Eyidoğan, H. Göral and N. Tanısalı, *Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the Template Method*, arXiv:2605.20504 (2026); to appear / accepted in Mathematics of Computation according to authors' current public information.
