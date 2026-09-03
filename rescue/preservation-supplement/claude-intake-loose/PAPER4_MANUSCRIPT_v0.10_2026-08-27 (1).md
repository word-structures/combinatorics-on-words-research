# Paper 4 — Block Assembly for Ternary Abelian-Square Avoidance

**Working manuscript v0.10 — 2026-08-27**

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

We develop a constant-length block-assembly framework for the problem of avoiding nontrivial Abelian squares over a ternary alphabet. Starting from the six-letter morphic fixed point \(h_6^\omega(a)\) of Rao and Rosenfeld, we replace their length-10 ternary coding by six length-40 ternary block roles whose incidence matrix is an rank-one incidence lift of the original coding matrix. The lift preserves the kernel relevant to the Rao–Rosenfeld long-power decision procedure.

For any constant-length coding, an output Abelian square admits an exact boundary-correction decomposition into an equal-length macro-factor difference plus a finite correction determined by the cut phases and boundary letters. This reduces the global obstruction to a finite family of Parikh templates over the fixed nonperiodic macro language. A bare finite contact graph is insufficient as a global certificate because repeatable graph cycles yield periodic coded words and therefore squares; the correct architecture combines finite local contact constraints, a nonperiodic macro core, and a finite template certificate.

A classical theorem of Carpi also explains why the fixed macro language is essential rather than optional: on a source alphabet of at least six letters, an Abelian-square-free morphism preserving all Abelian-square-free source words must be commutatively bijective. No morphism from six letters to a ternary alphabet can satisfy this rank condition. Thus the present program must exploit the restricted factor language of \(h_6^\omega(a)\), exactly as in the Rao--Rosenfeld outer-coding paradigm.

For the length-40 specialization, the six block Parikh vectors are fixed and only factors occurring in \(h_6^\omega(a)\) need be considered. Current exact computation has produced nontrivial compatible two-role modules and has ruled out one complete BC-module family as extendable to an ABCF partial coding under the period-\(2,\ldots,40\) constraints. The complete six-block coding remains open.

The generic template/parent/ancestor machinery is prior art. The possible contribution of this work is the specific rank-one-lift/block-assembly reduction, its exact finite-language decomposition, and—if found—the certified six-block coding solving Mäkelä's ternary problem.

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

Thus every output Abelian square belongs to a finite family of boundary-corrected Parikh templates.

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

## 5. Why the fixed morphic core is essential


### 5.1 Carpi's global-preservation barrier

A morphism \(q:\Sigma^*\to\Delta^*\) is Abelian-square-free in the strong
preservation sense if \(q(w)\) is Abelian-square-free for every
Abelian-square-free word \(w\in\Sigma^*\).

Carpi's characterization of Abelian power-free morphisms implies the following
when the source alphabet has at least six letters: every such preserving
morphism must be **commutatively bijective**. Equivalently, the Parikh vectors
of the letter images
\[
\{\Psi(q(x)):x\in\Sigma\}
\]
must be linearly independent.

For the present alphabets,
\[
|\Sigma|=6,\qquad |\Delta|=3.
\]
The six image-Parikh vectors lie in \(\mathbb Z^3\), and hence cannot be
linearly independent. Therefore:

> **Corollary 5.1 (known consequence of Carpi).**  
> There is no morphism from a six-letter alphabet to a ternary alphabet that
> preserves Abelian-square-freeness for all Abelian-square-free source words.

This observation sharply separates the present problem from the classical
search for Abelian-square-free morphisms. A successful ternary coding \(H\)
cannot work universally. It can only work because the source is restricted to
the special nonperiodic factor language
\[
\operatorname{Fact}(h_6^\omega(a)).
\]

Rao--Rosenfeld's \(g_3\) already exhibits this fixed-core phenomenon: its
incidence matrix has nontrivial kernel, yet its image of the special fixed point
avoids all Abelian squares above a finite threshold. Proposition 10 / Theorem 3
of Rao--Rosenfeld is therefore the correct long-period framework.

**Status:** `KNOWN COROLLARY / STRUCTURAL FRAMING`, not a new theorem claim.

### 5.2 Kernel-preserving rank-one incidence lift

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

Because the rank-one incidence lift preserves the relevant kernel, the current \(H\)-roles retain that algebraic precondition.

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



### 8.6 Exact classification of a 30,000-A finite search pool

A larger finite experiment was then closed exactly rather than reported as a
first-hit search.

Four disjoint recorded pools supplied 30,000 internally clean A-role blocks.
The three fresh pools were generated while excluding all earlier A blocks.
Across the full union, the first-stage AF search identified 22 A blocks that
admitted at least one F witness. Every no-hit A had its complete fixed-Parikh
F continuation tree exhausted.

Because the first-stage search stopped at the first successful F for a hit A,
all 22 hit A blocks were subsequently re-run with a fully exhaustive F
enumerator. This yielded exactly

\[
134
\]

AF modules satisfying the required \(AF\), \(FA\), and \(FAF\)
period-\(2,\ldots,40\) constraints.

Every one of the 134 modules was then classified by the exact ABCF extension
procedure. The result was

\[
133\ \text{ABCF-dead modules}
\quad+\quad
1\ \text{ABCF survivor}
\quad+\quad
0\ \text{inconclusive cap hits}.
\]

The unique ABCF survivor was

\[
\begin{aligned}
A={}&\texttt{ccbcccaaacbaaccbbaacbabbbcbbbaacaaabbbaa},\\
B={}&\texttt{ccbbbcccacccbcccaaacccbbaacaaabbbaaccbbb},\\
C={}&\texttt{cccaaacbcccacccbbaccbbbabbbcbbbaaacccbba},\\
F={}&\texttt{cccbbaaacccaaabaaacaaabbbaaacccbbaaabbba}.
\end{aligned}
\]

An independently written Python verifier checked all \(h_6\) bigram and
trigram contexts supported entirely on \(\{A,B,C,F\}\) and found zero
period-\(2,\ldots,40\) violations.

For this fixed ABCF core, D was then constructed under the simultaneously
necessary prefix contexts

\[
AD,\quad BD,\quad CBD,\quad FAD,\quad FBD.
\]

The exact D tree terminated after 129 nodes with no complete D block.
A separate Python implementation reproduced the same 129-node,
zero-completion result.

Consequently,

\[
\boxed{
30,000\ A
\longrightarrow
134\ \text{complete AF modules}
\longrightarrow
1\ ABCF\ core
\longrightarrow
0\ D\ extensions.
}
\]

This is an exact finite-pool result only. The 30,000 A blocks are sampled
search objects, not the complete set of admissible A-role blocks. No
nonexistence claim for the full length-40 architecture follows.

**Status:** `EXACT-CHECKED / FINITE-POOL ONLY`.

A separate reproducibility certificate records pool hashes, seeds, programs,
range coverage, and the independent D recheck.



### 8.7 Early AFD gate and 36,000-A extension

The finite search was extended by another disjoint 6,000-A pool, bringing the
recorded total to 36,000 A-role blocks.

The new pool contributed 14 exact AF modules after complete second-pass F
enumeration.  All 14 were eliminated by an early D gate before any ABCF
search was required.

This motivated reordering the finite constraints.  For any full solution, an
AF module must admit a D satisfying the genuine \(h_6\) contexts

\[
AD,\quad DF,\quad ADF,\quad DFA,\quad FAD.
\]

Applying this AFD gate to all 134 AF modules from the first 30,000-A pool gave

\[
121\ \text{AFD-dead}
\quad+\quad
13\ \text{AFD-survivors}.
\]

The previous full ABCF classification of the same 134 modules had one ABCF
survivor, module 97.  Mechanical comparison showed

\[
\{\text{AFD survivors}\}
\cap
\{\text{ABCF survivors}\}
=\varnothing.
\]

The additional 6,000-A pool contributed 14 AF modules and zero AFD survivors.
Hence across the full recorded 36,000-A union:

\[
\boxed{
36,000\ A
\longrightarrow
148\ \text{complete AF modules}
\longrightarrow
13\ \text{AFD-survivors},
}
\]

and all 13 AFD survivors are ABCF-dead.

Thus no A in the recorded finite pool can occur in a complete six-role coding.

The computationally preferred order is now

\[
\boxed{
AF\to AFD\to ABCF\to E.
}
\]

On the first 30,000-A pool the early AFD gate discards approximately 90.3% of
AF modules before the expensive B/C join; on the additional 6,000-A pool it
discarded all of them.

**Status:** `EXACT-CHECKED / FINITE-POOL ONLY`.



### 8.8 Exact closure of six one-swap A-components

The search was then reorganized around connected components of the internally
clean A-role state graph.  Two A words are adjacent when one is obtained from
the other by swapping two unequal positions, preserving the prescribed A
Parikh vector.

Six complete connected components containing AF/AFD seeds were enumerated.
Their sizes were

\[
26,\quad475,\quad118,\quad118,\quad16,\quad16,
\]

for a total of

\[
\boxed{769}
\]

A-role states.

Each component was closed by complete AF enumeration followed by the necessary
AFD and ABCF gates.

The exact component summary is:

\[
\begin{array}{c|r|r|r|l}
 & \#A & \#AF & \#AFD & \text{terminal gate}\\
\hline
C_1&26&209&14&0/14\ \text{ABCF}\\
C_2&475&24&16&0/16\ \text{ABCF}\\
C_3&118&8&0&\text{AFD}\\
C_4&118&8&0&\text{AFD}\\
C_5&16&20&6&\text{full D join}\\
C_6&16&20&0&\text{AFD}
\end{array}
\]

Component \(C_5\) was especially informative.  Six AF modules passed both the
separate AFD gate and the ABCF gate.  However, their stored first D witnesses
were incompatible with the B/C core.  Re-enumerating D from scratch under the
simultaneous A/B/C/F constraints caused each D tree to terminate after only
635 nodes, with no complete D word.

Thus every vertex in all six components is exactly excluded from a full
length-40 coding.

This motivates a component-discovery strategy rather than continued isolated
random sampling:

\[
\boxed{
\text{unseen A seed}
\to
\text{AF/AFD detection}
\to
\text{full swap-component enumeration}
\to
\text{exact component closure}.
}
\]

**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`.



### 8.9 Ten closed A-swap components

The component-discovery search was continued in a fresh A pool excluding all
previously closed components.  Four further components were found, of sizes

\[
25,\quad25,\quad13,\quad13.
\]

Their exact classifications were

\[
\begin{array}{c|r|r|r|l}
 & \#A & \#AF & \#AFD & \text{terminal gate}\\
\hline
C_7&25&27&0&\text{AFD}\\
C_8&25&27&3&0/3\ \text{ABCF}\\
C_9&13&4&0&\text{AFD}\\
C_{10}&13&4&0&\text{AFD}.
\end{array}
\]

Together with the first six components, the current exact component-local
ledger is

\[
\boxed{
845\ A\text{-states}
\to
351\ \text{AF modules}
\to
39\ \text{AFD modules}
\to
0\ \text{full candidates}.
}
\]

The global length-40 question remains open because the ten components are not
known to exhaust the clean A-role state graph.

**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`.



### 8.10 Twelve closed A-swap components

A further fresh 6,000-A pool, excluding all ten previously closed components,
produced two new AF-hit seeds.  Their complete one-swap components each had
only four vertices.

All eight vertices had AF continuations.  Complete F enumeration yielded

\[
24
\]

exact AF modules, twelve per component.  The AFD gate eliminated all 24, so no
ABCF extension was required.

The current component-local ledger is therefore

\[
\boxed{
853\ A\text{-states}
\to
375\ \text{AF modules}
\to
39\ \text{AFD modules}
\to
0\ \text{full candidates}.
}
\]

The twelve components are completely classified, but they are not known to
exhaust the clean A-role state graph.

**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`.



### 8.11 Eighteen closed A-swap components

A further fresh 6,000-A pool, excluding all twelve previously closed
components, produced six new AF-hit components.  Their complete sizes were

\[
10,\quad10,\quad10,\quad10,\quad89,\quad89,
\]

for 218 additional A-role states.

Exact AF screening over every vertex and complete F enumeration over every
hit A produced 76 exact AF modules.  The AFD gate eliminated all 76.

The current exact component-local ledger is therefore

\[
\boxed{
1071\ A\text{-states}
\to
451\ \text{AF modules}
\to
39\ \text{AFD modules}
\to
0\ \text{full candidates}.
}
\]

All eighteen enumerated one-swap components are completely classified.

**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`.



### 8.12 Finite component exclusion as a sound certificate method

The component computations can be separated from the particular search
history and stated as a finite soundness theorem.

Let \(G_A\) be the graph whose vertices are internally
period-\(2,\ldots,20\)-clean length-40 A-role blocks with prescribed Parikh
vector \((15,14,11)\), and whose edges are Parikh-preserving transpositions of
two unequal positions.

For a closed component \(C\), perform exact enumeration in the order

\[
A
\to
(AF,FA,FAF)
\to
AFD
\to
ABCF
\to
\text{full simultaneous D join}
\to
E.
\]

Every gate uses only necessary contexts from the exact \(h_6\) factor
language, and the final E stage is checked by the complete 22-trigram
period-\(2,\ldots,40\) certifier.

> **Finite component exclusion theorem.**  
> If all vertices and all continuations at every gate are exhaustively
> enumerated and no six-role coding survives, then no valid length-40 coding
> satisfying the prescribed role Parikh vectors and the finite-period
> \(h_6\)-language constraints can have its A-image in \(C\).

The proof is by inclusion of the hypothetical true images
\(H(f),H(d),H(b),H(c),H(e)\) in the corresponding exhaustive enumerations.
Thus every valid full coding whose A-block belongs to the component would
survive every necessary gate and the final exact certifier.

This theorem turns each closed swap component into an independently
checkable negative certificate.  The current 18-component result is an
instance of this general finite method, not a global nonexistence theorem.

A separate specification records the exact predicates, gate order, proof and
certificate fields.

**Status:** soundness `PROVED`; current component instances
`EXACT-CHECKED / COMPONENT-LOCAL`.


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

- an exact nonexistence theorem for a mathematically natural length-40 rank-one-lift class;
- a new finite boundary/template reduction with demonstrated computational consequences not already subsumed by standard template machinery;
- a substantial exact classification of admissible block modules;
- a provably stronger search/sieve theorem for this fixed morphic-core setting.

The reduction alone is not yet assumed publishable.

---


## 10A. Literature-positioning consequences

The literature comparison now separates three mathematically different notions
that should not be conflated.

1. **Universal morphism preservation.**  Dekking and Carpi study conditions
   ensuring that a morphism maps every Abelian-power-free source word to an
   Abelian-power-free image.  By Carpi's necessary condition for source
   alphabets of size at least six, the present six-to-three setting is excluded
   from this universal class.

2. **Fixed-point / fixed-language avoidance.**  Currie--Rampersad and
   Rao--Rosenfeld provide template and parent/ancestor machinery for proving
   avoidance in a specific morphic factor language and, in Rao--Rosenfeld,
   after an outer morphism.  This is the correct prior-art layer for the long
   certificate in Paper 4.

3. **Finite block synthesis.**  The current search fixes six length-40 Parikh
   roles, enforces only the bigram/trigram language of \(h_6^\omega(a)\), and
   searches the actual image words through exact seam, AFD, ABCF and
   swap-component constraints.  No source checked in the present audit has
   been found to give this exact synthesis architecture.

The phrase **rank-one incidence lift** is used here instead of “affine
morphism”.  The latter terminology is already used in recent additive-power
work (e.g. Andrade--Mol) for a different structural condition on image lengths
and sums.

`NOVELTY_UNRESOLVED` remains the required label for the finite synthesis
architecture until a specialist citation audit is complete.


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
\text{length-40 rank-one-lift roles}
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
