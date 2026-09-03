# Paper 4 — Block Assembly for Ternary Abelian-Square Avoidance

**Working manuscript v0.30 — 2026-08-27**

**Status:** active research manuscript; theorem architecture established, final construction not yet found.  
**Problem status:** no solution to Mäkelä's ternary period-\(\ge 2\) Abelian-square question was found in the sources checked through 2026-08-27; the manuscript therefore treats the problem as open.  
**Novelty status:** NOT_ESTABLISHED.  
**Governance:** no h=8 computation; no D40 use; no Git mutation in this manuscript preparation.

## Working title

**Block Assembly over a Morphic Core for Ternary Abelian-Square Avoidance**

Alternative current non-breakthrough title:

**Exact Block-Synthesis Certificates over a Morphic Core for Ternary Abelian-Square Avoidance**

Alternative if the construction succeeds:

**An Infinite Ternary Word Avoiding Abelian Squares of Period at Least Two**

---

## Abstract — current non-breakthrough form

We develop a constant-length block-assembly framework for the problem of avoiding nontrivial Abelian squares over a ternary alphabet. Starting from the six-letter morphic fixed point \(h_6^\omega(a)\) of Rao and Rosenfeld, we replace their length-10 ternary coding by six length-40 ternary block roles whose incidence matrix is a rank-one incidence lift of the original coding matrix. The lift preserves the kernel relevant to the Rao–Rosenfeld long-power decision procedure.

For any constant-length coding, an output Abelian square admits an exact boundary-correction decomposition into an equal-length macro-factor difference plus a finite correction determined by the cut phases and boundary letters. This reduces the global obstruction to a finite family of Parikh templates over the fixed nonperiodic macro language. A bare finite contact graph is insufficient as a global certificate because repeatable graph cycles yield periodic coded words and therefore squares; the correct architecture combines finite local contact constraints, a nonperiodic macro core, and a finite template certificate.

A classical theorem of Carpi also explains why the fixed macro language is essential rather than optional: on a source alphabet of at least six letters, an Abelian-square-free morphism preserving all Abelian-square-free source words must be commutatively bijective. No morphism from six letters to a ternary alphabet can satisfy this rank condition. Thus the present program must exploit the restricted factor language of \(h_6^\omega(a)\), exactly as in the Rao--Rosenfeld outer-coding paradigm.

For the length-40 specialization, exact locality reduces every half-period \(2,\ldots,40\) obstruction to the 22 trigrams occurring in \(h_6^\omega(a)\).  The finite search is organized by sound certificate layers rather than by unconstrained six-block sampling.  On the A-role side, a 2138-state transposition component has been independently replayed end-to-end as
\[
2138A\to39AF\to5AFD\to0ABCF.
\]
On the F-role side, eight complete internally clean transposition components, containing
\[
\boxed{3040}
\]
distinct F-role states, have been globally excluded over the complete A-profile space.  Seven of these components arise from the original 17 fixed-F witnesses and give
\[
2761F
\to93\text{ AF-positive }F
\to476\text{ AF-A}
\to1701\text{ AFD-D}
\to672\text{ C-support records}
\to1662\text{ D-bridges}
\to0\text{ ABCDF}.
\]
The eighth is the independently replayed 279-state component
\[
279F\to24F^+\to470AF\text{-A}\to971D\to757C\text{-support}
\to325\text{ bridges}\to0ABCDF.
\]
Subsequent complete component closures, direct fixed-F A enumeration and
population-level independent replay establish a fully replayed core union of
\[
\boxed{9693}
\]
distinct length-40 F-role blocks globally excluded as \(H(f)\).

Further disjoint fresh-F, D-active and boundary-preserving populations are
then closed by exact complete A enumeration and fail-closed no-C extension
search.  These later increments raise the current exact exclusion ledger to
\[
\boxed{38118}
\]
distinct F-role words.  The 9693-word core has full independent population
replay; the later increments are exact-computed but do not yet all have a
second full population implementation.  The newest disjoint 5000-F
population closes as
\[
5000F\to22F^+\to64AF\to0ABDEF,
\]
with all 64 AF pairs independently clean-room checked and the revised
full-no-C extension terminating with zero caps.

The earlier recorded exact AF population contains 702 distinct \((A,F)\)
pairs satisfying \(AF,FA,FAF\), and a dual-orientation exhaustive extension
search proves
\[
702AF\to0ABDEF.
\]
A later disjoint 4242-F population is independently replayed in full:
4223 F words admit no compatible A at all, while the remaining 19 F words
admit exactly 87 A choices.  All 87 pairs pass a clean-room
\(A,F,AF,FA,FAF\) verifier and both E orientations independently give
\[
\boxed{87AF\to0ABDEF}.
\]
Thus every F word in the 4242-F population is globally excluded.

The positive search remains open.  The independently recomputed complete
six-role search record still has 146 period-\(2,\ldots,40\) violations and
fails the final finite gate.  A no-C local search reduces the 12 actual
no-C trigram violation count from 44 to
\[
\boxed{31},
\]
but exact two-swap neighborhood enumeration confirms that this record is a
rigid local minimum under the tested profile-preserving moves.

A further factorization of the no-C language separates the A- and B-side
existence problems once \(D,E,F\) are fixed.  The earlier AEF best-2 record
remains an exact rigid local-search diagnostic, but it is no longer an
existence barrier: the revised full-no-C extension explicitly produces exact
\(AEF\) and \(ABFE\) scaffolds.

Across the canonical 702 exact AF pairs, the complete revised full-no-C
replay yields
\[
\boxed{14266\text{ exact }ABFE\text{ scaffolds}}
\]
supported by only 15 AF pairs, 7 distinct F words and 8 distinct A words.
All corresponding D extensions close with zero ABDEF hits.  Thus exact AEF
and ABFE are established, while exact \(ABDEF\) and a complete \(H\) remain
open.  The data therefore relocate the positive bottleneck from AEF
existence to D-compatible fixed-core synthesis.  The first exact \(ABDEF\)
scaffold remains the breakthrough trigger for immediate C enumeration.

For periods above 40, a fail-closed Rao--Rosenfeld parent/ancestor certifier has
passed both a negative \(g_3\) regression and a positive-witness control.  A
one-command H40 certifier composes the profile/kernel gate, exact 22-trigram
period-\(2,\ldots,40\) gate and Gate T.  The complete six-block coding remains
open.

The generic template/parent/ancestor machinery and the ambient transposition graph are prior art.  The possible contribution of this work is the specific fixed-core rank-one-lift block synthesis, its sound component/fixed-role certificate decomposition, and—if found—the certified six-block coding solving Mäkelä's ternary problem.  Novelty of the present composition remains unresolved pending specialist citation audit.

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

Let \(M\) have common nonzero column sum \(L\), and define
\[
M'=sM+u\mathbf1^T,
\qquad s\ne0.
\]
If the new common column sum
\[
L'=sL+\mathbf1^Tu
\]
is also nonzero, then
\[
\boxed{\ker M'=\ker M.}
\]

Indeed, \(Mx=0\) implies \(L\mathbf1^Tx=0\), while
\(M'x=0\) implies \(L'\mathbf1^Tx=0\).  In either direction the
corresponding nonzero common column sum forces \(\mathbf1^Tx=0\), after
which the rank-one term vanishes.

For the natural length-40 lift,
\[
L=10,\qquad s=1,\qquad u=(10,10,10)^T,
\qquad L'=40,
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



### 8.11 Historical eighteen-component computation and soundness correction

A further fresh 6,000-A pool, excluding all twelve previously closed
components, produced six new AF-hit components.  Their complete sizes were

\[
10,\quad10,\quad10,\quad10,\quad89,\quad89,
\]

for 218 additional A-role states.

Exact AF screening over every vertex and complete F enumeration over every
hit A produced 76 exact AF modules.  The AFD gate eliminated all 76.

The historical computation produced the aggregate

\[
1071\ A\text{-states}
\to
451\ \text{AF modules}
\to
39\ \text{AFD modules}.
\]

A later soundness audit found that the historical ABCF implementation imposed
the additional `BCB` context through a cyclic-BC test, although `bcb` is not a
factor of \(h_6^\omega(a)\).  Therefore the four historical components that
reached ABCF (C1, C2, C5, C8) require corrected replay.

The fourteen components that died already at AFD remain exact:

\[
\boxed{
529\ A\text{-states}
\to
171\ \text{AF modules}
\to
0\ \text{AFD modules}.
}
\]

A corrected replay has now been completed for C1 and C2. Their component
sizes and AF/AFD counts reproduce the historical values exactly, and all 30
AFD modules are `EXACT_DEAD` under the corrected actual-language ABCF gate.

Thus the current historical status is:

\[
\boxed{
C_1,C_2,C_3,C_4,C_6,C_7,C_9,C_{10},C_{11},C_{12},C_{13}\ldots C_{18}
\text{ are soundly closed}.
}
\]

Only C5 and C8 still require corrected replay.

**Status:** sixteen historical components `EXACT-CHECKED`; C5/C8
`CORRECTED REPLAY REQUIRED`.



### 8.12 Finite component exclusion as a sound certificate method

The component computations can be separated from the particular search
history and stated as a finite soundness theorem.

Let \(G_A\) be the graph whose vertices are internally
period-\(2,\ldots,20\)-clean length-40 A-role blocks with prescribed Parikh
vector \((15,14,11)\), and whose edges are Parikh-preserving transpositions of
two unequal positions.

For a closed component \(C\), one sound exact ordering is

\[
A
\to
(AF,FA,FAF)
\to
\text{all AFD-compatible D}
\to
ABDF
\to
ABCDF
\to
E.
\]

The earlier corrected \(AFD\to ABCF\to\) full-D ordering is also logically
sound, but the D-aware order exposes the strongest observed obstruction
earlier.

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
checkable negative certificate.  The historical eighteen-component campaign
motivated the theorem, but after the cyclic-BC soundness correction only the
replayed/AFD-zero subset is used in publication-safe aggregate counts.  No
component-local ledger is a global nonexistence theorem.

A separate specification records the exact predicates, gate order, proof and
certificate fields.

**Status:** soundness `PROVED`; current component instances
`EXACT-CHECKED / COMPONENT-LOCAL`.



### 8.13 Gate T outer-parent layer

The \(K>40\) stage has now been separated into an outer-parent layer and a
source-realizability layer.

For \(h_6\), an integer matrix
\[
Q=
\begin{pmatrix}
0&2&-1&-1&0&0\\
1&-1&1&0&-1&0\\
1&1&-1&0&0&-1
\end{pmatrix}
\]
satisfies
\[
QM_{h_6}^2=0.
\]
An exact finite boundary enumeration at the \(h_6^2\) level gives the
factor-difference bounds
\[
|Qd|\le(4,4,2).
\]

For the prescribed length-40 incidence matrix \(M_{40}\),
\[
\det
\begin{pmatrix}
M_{40}\\ Q
\end{pmatrix}
=19920\ne0.
\]
Thus each outer-parent correction \(v\) and each of the 405 possible bounded
integer values of \(Qd\) determines at most one parent vector \(d\), with
integrality checked exactly.

A regression on Rao--Rosenfeld's \(g_3\) gives 11,023 unique parent templates
in this exact finite superset, compared with their published statement that at
most 16,214 parents by \(g_3\) are realizable by \(h_6\).  The sets need not
coincide because the finite supersets and coordinate bounds differ.

A performance run on an already-falsified length-40 candidate enumerated all
15,069,223 boundary triples and produced 40,425 unique outer-parent templates
in under one second in the recorded optimized C++ run.

Consequently the outer-parent layer is no longer an implementation blocker.
The remaining Gate-T obligation is a generic audited batch decision of whether
any of these parents is realizable in \(\operatorname{Fact}^\infty(h_6)\).

**Status at this stage of the development:** outer-parent layer `EXACT STRUCTURAL PROTOTYPE`; the remaining source-realizability obligation is closed in §8.14.



### 8.14 Fail-closed Gate T regression closure

The source-realizability layer has now been made candidate-dependent and
fail-closed.

Instead of assuming a fixed expanding-coordinate envelope, the implementation
computes exact integer ceilings from the actual outer-parent list.  Exhaustive
\(h_6\)-boundary enumeration gives parent-correction thresholds

\[
3,\qquad46,\qquad9
\]

for the eigen-coordinates \(3,+\sqrt3,-\sqrt3\), respectively.  These are
combined with the actual initial maxima to obtain a sound invariant ancestor
box.

The resulting certifier passes both required controls.

For Rao--Rosenfeld's \(g_3\):

\[
11023\ \text{outer parents}
\to
45720\ \text{ancestor templates}
\to
0\ \text{realizable parents}.
\]

For the already-falsified first H40 candidate, the same program finds the
source-language witness

\[
\texttt{cbce},
\qquad
[\varepsilon,b,e,(0,0,0,0,0,0)],
\]

and rejects the candidate.

Thus the long-period mechanism is operational before a finite-gate-zero H40
candidate has been found.

**Status:** Gate T mechanism `EXACT-CHECKED BY TWO-SIDED REGRESSION`; positive
H40 construction `OPEN`.



### 8.15 Prior-art boundary for component search

The A-role component search should be placed inside existing graph and
computer-search traditions rather than presented as a new graph concept.

The ambient fixed-content graph is classical.  Chase's transposition graph
\(G(p_1,\ldots,p_k)\) has as vertices all sequences with prescribed symbol
multiplicities and joins two vertices when one is obtained from the other by
transposing two unequal symbols.  Thus the Paper-4 A-role graph is the induced
subgraph of

\[
G(15,14,11)
\]

on internally period-\(2,\ldots,20\)-clean ternary words.

The use of exhaustive finite branch searches to establish exact negative
conclusions in Abelian-square avoidance also has clear precedent in Keränen's
work on **unfavourable factors**: an Abelian-square-free factor is extended in
all possible ways, and total collapse of the extension tree gives a certified
negative conclusion.

Related word-graph component methods also occur in the literature under
different local moves, for example square reduction and duplication.

Accordingly, the present project does **not** claim novelty for:

- transposition graphs;
- connected-component analysis of finite-word graphs;
- exhaustive finite negative search;
- the general notion of extendability of a factorial language.

The potentially project-specific object is the composition

\[
\boxed{
\text{clean fixed-content role components}
+
\text{actual-language compatibility gates}
+
\text{global fixed-role D-bridge exclusion}
+
\text{morphic-core block synthesis}
}
\]

together with independently checkable component and fixed-role certificates.

**Status:** `NOVELTY_UNRESOLVED`.



### 8.16 Corrected ABCF gate and new exact component attack

A soundness audit of the historical ABCF code found that the cyclic-80 BC
predicate also required `BCB` to be clean.  Since

\[
bcb\notin\operatorname{Fact}_3(h_6^\omega(a)),
\]

this extra condition cannot be used as an unproved necessary pruning
predicate.

The corrected ABCF gate checks only the actual relevant contexts

\[
FB,\quad AC,\quad BC,\quad CB,\quad CBC,
\]

with \(AF,FA,FAF\) already certified upstream.

A new random screening run found seven components of sizes

\[
2,\ 55,\ 60,\ 4,\ 1,\ 162,\ 108.
\]

Complete exact enumeration yielded

\[
392\ A
\to
250\ AF
\to
5\ AFD.
\]

The five AFD modules all came from the 162-state component.  Under the
corrected ABCF gate all five survived:

\[
5\ AFD\to5\ ABCF.
\]

Re-enumerating D from scratch against all known A/B/C/F contexts then gave

\[
\boxed{5\ ABCF\to0\ ABCDF.}
\]

Each D tree contained only two nodes and no complete D word.  An independent
Python implementation reproduced this result.

Six of the seven component sizes were not present in the historical ledger
and are therefore definitely new; the new size-4 component is distinct from
historical C11 but has not yet been compared with C12.

**Status:** `EXACT-CHECKED UNDER CORRECTED GATES`.



### 8.17 Corrected replay of historical C1 and C2

The two largest historical ABCF-dependent components were reconstructed from
their original A seeds and replayed from the beginning.

The reconstructed component sizes were

\[
|C_1|=26,\qquad |C_2|=475.
\]

Complete AF/AFD enumeration exactly reproduced the historical counts:

\[
C_1:\quad 26\ A\to209\ AF\to14\ AFD,
\]
\[
C_2:\quad 475\ A\to24\ AF\to16\ AFD.
\]

All 30 AFD modules were then tested with the corrected actual-language ABCF
gate

\[
FB,\quad AC,\quad BC,\quad CB,\quad CBC,
\]

with no `BCB` condition.

The result was

\[
\boxed{30/30\ \text{corrected ABCF-dead}.}
\]

Hence C1 and C2 are restored to `EXACT-CHECKED` status.

The only historical components still awaiting corrected replay are C5 and C8:

\[
C_5:\ 16\ A,\ 20\ AF,\ 6\ AFD,
\qquad
C_8:\ 25\ A,\ 27\ AF,\ 3\ AFD.
\]

**Status:** `EXACT-CHECKED` for C1/C2; `OPEN REPLAY` for C5/C8.



### 8.18 Largest corrected component closure

A second independent corrected search run produced four new swap components
of sizes

\[
2138,\quad5,\quad9,\quad5.
\]

All four sizes are new relative to the historical component ledger and the
definitely-new components from the preceding corrected run.

The 2138-state component is the largest single component closed so far under
the corrected gate sequence.

Exact first-hit/no-hit AF screening found only

\[
29
\]

AF-hit A vertices among its 2138 states.  Complete F enumeration on those 29
vertices yielded

\[
39
\]

exact AF modules, of which

\[
5
\]

passed the AFD gate.

All five were then tested under the corrected actual-language ABCF gate

\[
FB,\quad AC,\quad BC,\quad CB,\quad CBC,
\]

and all five were exact ABCF-dead.

The three smaller components contributed 7 further AF modules and zero AFD
survivors.

Thus the whole second corrected attack gives

\[
\boxed{
2157\ A
\to
46\ AF
\to
5\ AFD
\to
0\ ABCF.
}
\]

**Status:** `EXACT-CHECKED / CORRECTED GATES`.

### 8.19 Publication-safe corrected component ledger

After the cyclic-BC correction, component counts are reported only when both
soundness and component distinctness are established.

The current publication-safe lower bound is

\[
\boxed{
26\text{ distinct sound closed components}
}
\]

containing

\[
\boxed{
3575\text{ distinct A-role states}.
}
\]

Across these components the exact staged count is

\[
\boxed{
3575\ A
\to
699\ AF
\to
40\ AFD
\to
5\ ABCF
\to
0\ ABCDF.
}
\]

This lower bound excludes:
- historical C5 and C8, which still await corrected ABCF replay;
- one sound new size-4 component whose identity relative to historical C12
  has not yet been resolved.

The count is deliberately conservative.

**Status:** `EXACT-CHECKED LOWER BOUND`; global length-40 problem `OPEN`.



### 8.20 Cross-run component regression and further closures

A third corrected search run produced eight soundly closed components of sizes

\[
118,\ 1,\ 1,\ 23,\ 21,\ 55,\ 2,\ 10.
\]

Every exact AF module in the run was eliminated at the AFD gate.

The size-55 component is exactly the same vertex set as a size-55 component
found in the first corrected attack.  Both independent runs reproduce

\[
55\ A\to10\ AF\to0\ AFD,
\]

providing a direct cross-run reproducibility check.

Five components are definitely new by vertex-set/size comparison and contribute

\[
48\ A\to20\ AF\to0\ AFD.
\]

The publication-safe unique-component lower bound therefore becomes

\[
\boxed{
31\text{ components},\qquad3623\ A\text{-states}.
}
\]

Across them,

\[
\boxed{
3623\ A\to719\ AF\to40\ AFD\to5\ ABCF\to0\ ABCDF.
}
\]

Two additional sound components from the run are omitted from the unique count
because historical raw component sets of the same sizes are unavailable for
deduplication.

**Status:** `EXACT-CHECKED LOWER BOUND`.



### 8.21 Independent replay of the 2138-state certificate

The largest corrected component certificate has now been independently
replayed end-to-end.

A separately written Python BFS reproduces exactly the same 2138-vertex
component and the same sorted SHA256.  A separate AF scanner reproduces
exactly the same 29 AF-hit A states and proves the other 2109 states AF-dead.
Complete F enumeration then gives the same 39 AF modules and the same 5 AFD
pairs.

Finally, an independently written corrected ABCF implementation checks all
five AFD modules and again obtains

\[
\boxed{0/5\ \text{ABCF survivors}.}
\]

Thus the certificate

\[
2138A\to39AF\to5AFD\to0ABCF
\]

is independently reproduced at every load-bearing stage.

**Status:** `EXACT-CHECKED + INDEPENDENTLY REPLAYED`.

### 8.22 D-aware gate reordering

The finite search can be reorganized to expose the strongest observed
obstruction earlier.

For every exact AF module, enumerate the complete AFD-compatible D set using

\[
AD,\ DF,\ ADF,\ DFA,\ FAD.
\]

Then retain only B,D pairs satisfying

\[
FB,\ BDF,\ DFB,\ FBD.
\]

Only surviving ABDF pairs are sent to C, where the remaining actual contexts
are

\[
AC,\ BC,\ CB,\ DC,\ CBC,\ BDC,\ CBD,\ DCB.
\]

Every gate word is an actual factor of \(h_6^\omega(a)\), so the reordering is
sound.

Across all 40 sound AFD modules currently available in the corrected ledger:

\[
407\text{ AFD-compatible D words}
\]

and

\[
1,120,209\text{ module-counted FB-compatible B words}
\]

collapse to only

\[
\boxed{2\text{ ABDF pairs}.}
\]

A reverse D→B implementation independently finds exactly the same two pairs.

Both remaining pairs have zero C extensions; independent Python replay gives
the same zero result.

Hence

\[
\boxed{
40\ AFD
\to
2\ ABDF
\to
0\ ABCDF.
}
\]

The preferred finite synthesis order is therefore now

\[
\boxed{
AF
\to
\text{all AFD-D}
\to
ABDF
\to
ABCDF
\to
E.
}
\]

**Status:** gate soundness `PROVED`; finite 40-module result
`EXACT-CHECKED + INDEPENDENT REPLAY`.



### 8.23 Fourth corrected attack and current conservative ledger

A fourth corrected search independently rediscovered the previously known
55-state and 2138-state components, providing another cross-run
reproducibility check.

Six other components were classified.  All their exact AF modules die at the
AFD gate.

Five components are definitely new, of sizes

\[
73,\quad8,\quad30,\quad1,\quad157,
\]

and contribute

\[
269A\to147AF\to0AFD.
\]

The current publication-safe conservative lower bound is therefore

\[
\boxed{
36\text{ distinct sound components}
}
\]

containing

\[
\boxed{
3892\text{ A-role states}.
}
\]

Under the preferred D-aware gate order, their current staged ledger is

\[
\boxed{
3892A
\to866AF
\to40AFD
\to2ABDF
\to0ABCDF.
}
\]

This remains a lower bound because several sound components are omitted when
historical raw vertex sets are unavailable for deduplication.

**Status:** `EXACT-CHECKED LOWER BOUND`; global length-40 problem `OPEN`.



### 8.24 D-bridge obstruction

A complete coding requires the same D image to support both sides of the
remaining construction.

For a fixed AF module, define C-support by existence of a role-correct C
satisfying

\[
AC,\quad DC,
\]

and B-support by existence of a role-correct B satisfying

\[
FB,\quad BDF,\quad DFB,\quad FBD.
\]

A valid coding therefore requires a **D-bridge** lying in both support sets.

Across the 40 sound AFD modules previously classified, 101 D records have
C-support and two have B-support, but their intersection is empty.

The D-bridge condition is a necessary gate using only actual
\(h_6\)-language factors.

### 8.25 Global exclusion of 17 F-role blocks

The D-bridge viewpoint allows a stronger certificate that no longer depends
on the A-swap component.

The 40 sound AFD modules represented in the current ledger use 17 distinct F
blocks.  For each fixed F, the full A-role profile space was exhaustively
searched for every A satisfying

\[
AF,\quad FA,\quad FAF.
\]

All AFD-compatible D words were then enumerated.  D records with C-support
were retained and subjected to the exact B-support search.

Across the 17 fixed-F families:

\[
200\text{ family-counted AF-compatible A}
\to
892\text{ AFD-D}
\to
424\text{ C-supporting D}
\to
\boxed{0\text{ D-bridges}}.
\]

The B-support stage traversed

\[
142\,482\,657
\]

B-DFS nodes.

Consequently each of the 17 concrete F words is globally excluded as a
possible value of \(H(f)\), regardless of which A-swap component contains
\(H(a)\).

This is strictly stronger than the corresponding component-local exclusions
for those particular F blocks.

**Status:** `EXACT-CHECKED / GLOBAL-IN-A FOR FIXED F`.



### 8.26 Global exclusion of 41 F-role blocks

The fixed-F D-bridge protocol has now been extended from the original 17
AFD-derived F blocks to 24 additional AF-witness F blocks obtained in later
independent discovery runs.

All 41 distinct F blocks are globally excluded.

Across the complete fixed-F families:

\[
\boxed{
465\text{ family-counted AF-compatible A}
\to
976\text{ AFD-D}
\to
468\text{ C-supporting D}
\to
0\text{ D-bridges}.
}
\]

The B-support stage traversed

\[
178\,289\,853
\]

B-DFS nodes.

Twenty-three of the 24 newly tested F blocks are globally AFD-empty.  The
remaining new family has

\[
83\ AF\text{-A}
\to84\ AFD\text{-D}
\to44\ C\text{-supporting D}
\to0\text{ D-bridges}.
\]

Thus each of these 41 concrete F blocks is impossible as \(H(f)\), regardless
of the A-swap component.

**Status:** `EXACT-CHECKED / GLOBAL-IN-A FOR FIXED F`.



### 8.27 Global exclusion of a 279-state F-swap component

The fixed-F theorem can be lifted from individual F words to an exhaustively
enumerated component of the internally clean F-role transposition graph.

For the seed

```text
bbaacccaaabaaacaaabbcaabbbaaabbcacbcccaa
```

the complete F-role component contains

\[
\boxed{279}
\]

vertices, 1792 directed adjacency incidences, and maximum degree 12.  A
separately written C++ BFS reproduces exactly the same sorted component SHA256

```text
d472bc85fb1a4a383a8e90d7cde919a949a84503ab267678f2eb58ef5e10e8c6
```

as the primary enumeration.

Every one of the 279 F words was then classified globally over the full A-role
profile space.

\[
\boxed{255/279}
\]

are AF-empty.  The remaining 24 fixed-F families give

\[
\boxed{
470\text{ AF-A}
\to
971\text{ AFD-D}
\to
757\text{ C-support records}.
}
\]

Twenty-three families have no D-bridge.

The unique bridge-bearing family is

```text
bbaacccaaabaaacaaabbcaabbbaaabbccaaacccb
```

and gives

\[
50\text{ AF-A}
\to371\text{ AFD-D}
\to344\text{ C-support records}
\to325\text{ D-bridge records}.
\]

F96 has now been independently replayed at every load-bearing layer.
A separate C++ A enumerator reproduces the exact 50-word global A set; an
independent D enumerator reproduces the exact 371-record AFD-D set; and an
independent C-support implementation reproduces the exact 344-record
\((A,D)\) support set.

A separately written reverse-order B implementation then reproduces the exact
same 325-record bridge set.  Complete C search leaves 48 role-correct C words
after the simultaneous \(AC,BC,DC\) prefix gates, but none satisfies \(CB\).
An independent Python replay reproduces

\[
50A\to371D\to344\text{ C-support}\to325\text{ bridges}
\to48\text{ prefix-complete C}\to0\text{ CB pass}.
\]

Hence

\[
\boxed{
279F
\to24\text{ AF-positive }F
\to470\text{ AF-A}
\to971\text{ AFD-D}
\to757\text{ C-support}
\to325\text{ bridges}
\to0\text{ ABCDF}.
}
\]

No valid prescribed-role coding can therefore have its F-image in this entire
279-state component.

**Status:** `EXACT-CHECKED`; component BFS independently replayed and the unique bridge-bearing F96 family independently replayed end-to-end.

### 8.28 Earlier 320-word global F-role ledger (superseded)

The earlier 41-word fixed-F ledger and the 279-state F component intersect in
exactly one F word.  A later independent discovery run contributes one further
fixed-F family outside both sets, and that family is globally AFD-empty.

At that stage the conservative union contained

\[
\boxed{320}
\]

distinct length-40 F-role blocks globally impossible as \(H(f)\).

This was an exact lower bound and is retained as a historical milestone.  It
is superseded by the component-union result of §8.30.

**Status:** `EXACT-CHECKED HISTORICAL MILESTONE`.



### 8.29 Seven globally excluded F-components from the original 17 witnesses

The 17 fixed-F blocks of §8.25 lie in seven pairwise disjoint connected
components of the internally clean F-role transposition graph.  Their complete
sizes are

\[
1273,\quad1076,\quad242,\quad106,\quad60,\quad2,\quad2.
\]

A second, separately written BFS implementation reproduces the exact vertex
set of all seven components.

Every F state was then classified globally over the complete A-role profile
space using the current actual-language pipeline.

\[
\begin{array}{c|r|r|r|r|r|r|r}
 & F & F^+ & AF\text{-}A & AFD\text{-}D & C\text{-support} & D\text{-bridges} & ABCDF\\
\hline
C_{1273}&1273&17&58&154&0&0&0\\
C_{1076}&1076&18&61&158&56&0&0\\
C_{242}&242&22&104&18&8&0&0\\
C_{106}&106&30&204&657&214&1662&0\\
C_{60}&60&2&6&81&31&0&0\\
C_{2a}&2&2&8&142&46&0&0\\
C_{2b}&2&2&35&491&317&0&0
\end{array}
\]

Thus

\[
\boxed{
2761F
\to93F^+
\to476AF\text{-}A
\to1701AFD\text{-}D
\to672C\text{-support}
\to1662D\text{-bridges}
\to0ABCDF.
}
\]

The largest component, of size 1273, dies before B construction:

\[
1273F\to17F^+\to58AF\text{-}A\to154D\to0C\text{-support}.
\]

The 106-state component is bridge-rich, but all 1662 bridge records fail the
full C gate; no prefix-complete C word is produced.

**Status:** `EXACT-CHECKED / GLOBAL-IN-A`; all seven component vertex sets have
independent alternative-BFS replay.

### 8.30 Conservative global F-role ledger: 3064 words

The seven components of §8.29 contain 2761 distinct F states.  The 279-state
component of §8.27 is disjoint from all seven, so eight complete globally
excluded F-components contain

\[
\boxed{3040}
\]

distinct F-role states.

The earlier 320-word fixed-F ledger contributes exactly 24 further globally
excluded F words outside these eight component sets.

Therefore the current conservative union is

\[
\boxed{
3064
}
\]

distinct length-40 F-role words globally impossible as \(H(f)\).

The count is obtained from exact set union, not by adding potentially
overlapping headline counts.

**Status:** `EXACT-CHECKED LOWER BOUND`.

### 8.31 One-command fail-closed H40 certifier

The finite and long-period proof layers are now composed into one executable
front end,

```text
PAPER4_H40_FINAL_CERTIFIER_v1.0.py
```

with pipeline

\[
\boxed{
\text{role profile + affine-lift kernel}
\to
22\text{ actual }h_6\text{ trigrams},\ p=2,\ldots,40
\to
\text{outer parents}
\to
\text{fail-closed source realizability}.
}
\]

Its regression suite passes four controls:

1. malformed role profile is rejected;
2. the known finite-fail H40 reproduces the exact witness
   `ace`, start 4, half-period 6, factor `acbbabbbcaab`;
3. forced Gate-T execution on the same H40 produces 40425 outer parents and
   the realizable witness `cbce`;
4. the Rao--Rosenfeld \(g_3\) positive-control parent set is certified
   nonrealizable.

Thus the orchestration is fail-closed on both mathematical failure layers,
while the Gate-T engine has a positive PASS control.  No genuine H40 has yet
reached final `CERTIFIED`, because no candidate currently passes both the
finite and long gates.

**Status:** `EXECUTABLE / SELFTEST PASS`.



### 8.32 Historical global F-role ledger: 5151 words

After the 3064-word milestone of §8.30, eighteen further complete F-role
components were classified exactly.  Relative to the existing union, the
component sizes and newly contributed states are

\[
\begin{array}{r|r}
\text{component size} & \text{new states}\\
\hline
22&21\\
6&5\\
38&37\\
20&19\\
109&108\\
12&11\\
20&19\\
4&3\\
42&41\\
272&271\\
2&1\\
83&82\\
14&13\\
2&1\\
18&17\\
23&22\\
828&827\\
590&589
\end{array}
\]

The exact set union gives

\[
\boxed{5151}
\]

distinct length-40 F-role blocks globally impossible as \(H(f)\).

The count is a lower bound, not a classification of all internally clean
F-role words.  It is superseded by the 9693-word ledger of §8.38.

**Status:** `EXACT-CHECKED HISTORICAL MILESTONE`.

### 8.33 Exact ABDEF closure of the 702 recorded AF pairs

The currently retained exact AF population contains 702 distinct pairs
\((A,F)\), each satisfying

\[
AF,\qquad FA,\qquad FAF.
\]

For each pair we ask whether there exist role-correct \(E,B,D\) satisfying all
actual \(h_6\) contexts not involving C.

The E/B layer requires

\[
EA,\quad FE,\quad FB,\quad EB,
\]

and the known A/E/F trigrams

\[
AFE,\quad EAF,\quad FAF,\quad FEA.
\]

The D layer requires

\[
AD,\quad BD,\quad DF
\]

and

\[
ADF,\quad BDF,\quad DFA,\quad DFB,\quad
EAD,\quad EBD,\quad FAD,\quad FBD.
\]

The search was executed in two independent E orientations.  A right-to-left E
enumerator closes 613 pairs without a cap and identifies 89 replay pairs.
A left-to-right E enumerator, which makes \(FE\) incremental instead of
\(EA\), closes 69 of those 89.  The final 20 are rerun in four five-pair
chunks with a 20,000,000 E-node bound; all four complete with `CAPS=0`.

No ABDEF scaffold exists in the recorded population:

\[
\boxed{
702\text{ exact AF pairs}\to0\text{ ABDEF}.
}
\]

This is not a global nonexistence theorem: a new AF pair outside the recorded
population can still extend.

**Status:** `EXACT-CHECKED / RECORDED-POPULATION CLOSURE`.

### 8.34 Positive finite-gate search record

A separate positive search operates directly on complete six-role codings.
An early incremental local-search implementation reported a false zero because
a cached swap normalization reversed the symbol-update sign when the sampled
indices occurred in descending order.  The independent final certifier
immediately falsified that candidate.  The bug was corrected and every later
incremental run is guarded by periodic full recomputation of all 67,782
finite windows.

The corrected search was then restricted to role blocks that are themselves
internally free of half-period \(2,\ldots,20\) Abelian squares.  Pool-based
coordinate, pair and triple moves reduced the independently recomputed finite
violation count through

\[
2174\to390\to361\to345\to217\to182\to169\to161\to149\to146.
\]

The current record has

\[
\boxed{146}
\]

violating windows over the 22 actual \(h_6\) trigrams, with zero internal
block violations.

It is explicitly **not** a successful H.  The one-command final certifier
checks its incidence/kernel conditions and rejects it at the finite gate with

```text
trigram     ace
start       37
half-period 2
factor      baba
```

Therefore

\[
\boxed{\text{finite-zero H remains OPEN}.}
\]

**Status:** `EXACT-CHECKED SEARCH RECORD / FAILING CANDIDATE`.

### 8.35 Pair-CSP diagnostics and the E obstruction

As a complementary positive search, internally clean role pools were joined
using only the 14 actual \(h_6\) bigram relations.

With 2500 words per role, the exact pair construction performs

\[
87\,500\,000
\]

pair checks and finds 10,898 compatible directed pairs.  Arc consistency
nevertheless empties the C domain.

With 3000 words per role,

\[
126\,000\,000
\]

pair checks yield 16,396 compatible pairs, but the C domain again becomes
empty.

These are finite-pool diagnostics, not nonexistence theorems.

The next structural observation is stronger.  The first bridge-rich ABDF
families were tested for E support under

\[
EA,\quad EB,\quad FE.
\]

The 106-state bridge-rich F component contains 1662 bridge records and 554
unique \((A,B,F)\) triples; none admits E support.  The independently replayed
F96 family contains 325 bridge records and 241 unique \((A,B,F)\) triples;
again none admits E support.

This explains why E must be introduced early in a positive synthesis rather
than treated as a terminal appendage.

**Status:** `EXACT-CHECKED FOR THE RECORDED BRIDGE POPULATIONS`.



### 8.36 Full independent replay of the 4242-F direct-A population

A disjoint population of 4242 internally clean F-role words was searched over
the complete prescribed A-profile

\[
\Psi(A)=(15,14,11)
\]

under the exact necessary contexts

\[
A,\qquad AF,\qquad FA,\qquad FAF.
\]

The primary alternating-end constraint DFS is exact and fail-closed.  All
residual node caps were successively deepened to 20M and 50M nodes; the final
single residual F word closed at 72,033,723 nodes under a 100M bound.

The resulting classification is

\[
\boxed{
4223F\text{ with }0A
\quad+\quad
19F\text{ with }A>0.
}
\]

A second, separately organized left-to-right exhaustive A enumerator was
first regression-checked on F96, reproducing its known complete 50-A set.
It was then run on all 4242 F words.

The independent population replay gives

\[
\boxed{4242/4242\text{ exact A-count matches}.}
\]

The 19 positive F words admit exactly 87 compatible A words in total.

**Status:** `EXACT-CHECKED / FULL POPULATION INDEPENDENT REPLAY`.

### 8.37 Dual-orientation closure of the 19 positive F words

The 87 exact \((F,A)\) pairs from §8.36 were separately checked by a
clean-room verifier for

\[
\Psi(F)=(19,11,10),\qquad
\Psi(A)=(15,14,11),
\]

internal A/F cleanliness, and exact cleanliness of

\[
AF,\qquad FA,\qquad FAF.
\]

All 87 pass.

For every pair, role-correct \(E,B,D\) were then exhaustively searched under
all actual \(h_6\) bigram/trigram contexts not involving C.

In the forward-E orientation the combined search gives

\[
3\,033\,535\ E\text{-completions},
\]

\[
489\,057\ B\text{-completions},
\]

\[
1\,614\ D\text{-completions},
\]

and

\[
0\text{ ABDEF}.
\]

The reverse-E implementation independently replays the same population.  It
uses a complementary incremental E seam and gives different E-level counts,
but exactly the same

\[
489\,057\ B\text{-completions}
\]

and

\[
1\,614\ D\text{-completions},
\]

again with

\[
\boxed{0\text{ ABDEF}}
\]

and no node cap.

Hence all 19 positive-A F words are globally impossible as \(H(f)\).

**Status:** `EXACT-CHECKED / DUAL-ORIENTATION POPULATION CLOSURE`.

### 8.38 Conservative global F-role ledger: 9693 words

The current F-role exclusion ledger is the exact pairwise-disjoint union

\[
5151\;\dot\cup\;300\;\dot\cup\;4242.
\]

The 5151-word historical union is certified by the component/fixed-F
calculations above.

The separate 300-F discovery population is disjoint from it.  The primary
direct-A search gives zero A words for every F, and the second exhaustive
fixed-F A enumerator independently reproduces

\[
\boxed{300/300\to0A}.
\]

The 4242-F population is disjoint from both earlier sets and is globally
excluded by §§8.36--8.37.

The exact pairwise intersections are all zero.  Therefore

\[
\boxed{
9693
}
\]

distinct length-40 F-role words are globally impossible as \(H(f)\).

The current generated internally clean F pool contains 4544 distinct words,
and

\[
\boxed{4544/4544}
\]

belong to this exclusion union.  Thus the present F pool is completely
exhausted for positive construction; any further positive search must
generate genuinely new F words outside the union.

This is a lower bound on the global F-role profile space, not a global
nonexistence theorem.

**Status:** `EXACT-CHECKED LOWER BOUND / INDEPENDENT REPLAY`.



### 8.39 Expansion beyond the independently replayed 9693-word core

The 9693-word ledger of §8.38 remains the strongest population for which a
full second implementation has replayed the complete fixed-F A counts.

Subsequent search generated several pairwise-disjoint populations outside the
then-current exclusion union.  Each F word was internally checked, every
compatible A word was exhaustively enumerated under

\[
A,\qquad AF,\qquad FA,\qquad FAF,
\]

and each resulting AF family was closed by the fail-closed no-C
\(E,B,D\)-extension search.  The successive exact set unions now include

\[
9693\to15995\to16995\to17444\to17519\to17587
\to18672\to20672\to20786\to23786\to26309\to29712
\to32126\to33118\to38118.
\]

After the 20786-word checkpoint, a fresh 3000-F population closes exactly,
raising the union to 23786.  A first D-active meta700 neighborhood contributes
2523 further disjoint F words and closes as 120 exact AF pairs with
\(0ABDEF\), giving 26309.

A second D-active meta700 neighborhood contains 3411 clean states, of which
3403 are outside the 26309-word union.  Complete A enumeration gives

\[
3403F\to77F^+\to325AF.
\]

All 325 AF pairs pass an independent clean-room verifier.  Eight extension
cases initially hit a node cap and were therefore left unresolved; each was
then rerun with larger exact limits and terminated with zero caps and zero
ABDEF scaffolds.  Hence

\[
\boxed{3403F\to77F^+\to325AF\to0ABDEF}.
\]

Two further D-active frontiers then close exactly:

\[
2414F\to15F^+\to25AF\to0ABDEF,
\]

and

\[
992F\to38F^+\to139AF\to0ABDEF.
\]

The second population requires enlarged exact limits for eight initially
capped AF extensions; all eight terminate with zero caps and zero ABDEF
scaffolds.  These increments raise the exact union to 33118.

Finally, a disjoint fresh population of 5000 internally clean F-role words
gives

\[
5000F\to22F^+\to64AF.
\]

All 64 AF pairs pass the independent clean-room verifier.  The revised
full-no-C search checks the actual \(AFE,EAF,FEA\) constraints before B/D
extension and terminates as

\[
\boxed{64AF\to0ABDEF}
\]

with zero caps.  Exact set intersection with the previous union is zero, and
the canonical union check therefore gives

\[
\boxed{38118}
\]

distinct length-40 F-role words globally impossible as \(H(f)\).

The epistemic distinction is important:

- the 9693-word core has full independent population replay;
- the later increments are exact exhaustive computations with clean-room
  checks where AF pairs occur;
- a second full implementation has not yet replayed every later increment.

Thus 38118 is recorded as an exact lower bound, but not yet as a
two-implementation population theorem for all later increments.

**Status:** `EXACT-CHECKED LOWER BOUND / FULL SECOND REPLAY PENDING FOR LATER INCREMENTS`.

### 8.40 D-aware no-C search and the near-31 record

The positive search was reorganized around the actual no-C trigrams

\[
ADF,\ AFE,\ BDF,\ DFA,\ DFB,\ EAD,\ EAF,\ EBD,\ FAD,\ FAF,\ FBD,\ FEA.
\]

This removes C entirely from the objective and asks first for an exact
five-role scaffold \(ABDEF\).

Starting from a D-active recorded family, the no-C local-search violation
count was reduced

\[
44\to\boxed{31}.
\]

A full recomputation attributes the 31 violations as

\[
\begin{array}{c|rrrrrrrrrrrr}
t&ADF&AFE&BDF&DFA&DFB&EAD&EAF&EBD&FAD&FAF&FBD&FEA\\
\hline
N_t&9&1&4&4&5&0&2&1&0&1&2&2
\end{array}
\]

so the residual obstruction is strongly concentrated in D-facing seams.

This search record is not an ABDEF scaffold and is not used in any negative
certificate.  Exact exhaustive extension of nearby D-active AF populations
still gives zero ABDEF hits.

To avoid treating left-prefix completion as a proxy for true D compatibility,
a direct fixed-\(A,B,E,F\) D constraint solver was also implemented.  It
encodes all actual D contexts simultaneously:

\[
D,\ AD,\ BD,\ DF,
\]

\[
ADF,\ BDF,\ DFA,\ DFB,\ EAD,\ EBD,\ FAD,\ FBD.
\]

The first exact ABDEF hit from this or any other search path is the trigger
for immediate C enumeration.

**Status:** `EXACT-CHECKED SEARCH DIAGNOSTICS / ABDEF OPEN`.



### 8.41 Exact no-C factorization over fixed \(D,E,F\)

The actual no-C factor language contains no bigram or trigram involving both
roles \(A\) and \(B\).  Consequently, after fixing \(D,E,F\), the remaining
A-side and B-side compatibility tests decouple.

For fixed \(D,E,F\), the A-side contexts are

\[
A,\ AF,\ FA,\ FAF,\ EA,\ AFE,\ EAF,\ FEA,
\]

together with the D-containing contexts

\[
AD,\ EAD,\ FAD,\ ADF,\ DFA.
\]

The B-side contexts are

\[
B,\ FB,\ EB,
\]

together with

\[
BD,\ BDF,\ DFB,\ EBD,\ FBD.
\]

Thus, conditional on the fixed-only \(D,E,F\) contexts being clean, existence
of an \(ABDEF\) scaffold can be tested as two independent existential role
problems over the same fixed \(D,E,F\) core:

\[
\exists A\quad\text{and}\quad\exists B.
\]

This factorization is exact for the recorded no-C factor language; it is not a
heuristic decomposition.

A revised extension implementation also moves the actual A/E/F trigrams

\[
AFE,\quad EAF,\quad FEA
\]

into the E gate before B and D are searched.  On the previously recorded
87-pair regression this reduces the extension tail to

\[
690327\ E\text{-completions}\to13B\to0ABDEF,
\]

and on the new 64-AF Fresh10 population to

\[
378133\ E\text{-completions}\to0B.
\]

This regression initially suggested A/E/F compatibility as a strong
bottleneck.  The larger 702-pair replay below refines that conclusion:
exact AEF and ABFE scaffolds exist abundantly in a highly concentrated
subpopulation, and the unresolved bottleneck is their compatibility with D.

**Status:** `PROVED FACTORIZATION + EXACT-CHECKED REGRESSION`.

### 8.42 AEF subproblem and the exact best-2 record

Motivated by §8.41, the positive search isolates the actual A/E/F trigrams

\[
AFE,\quad EAF,\quad FAF,\quad FEA.
\]

Under the prescribed A-, E- and F-role Parikh profiles, a dedicated local
search finds an internally clean record with exactly two violating windows.
A fresh recomputation gives

\[
\boxed{N_{\mathrm{AEF}}=2}.
\]

Both violations lie in \(FEA\).  Using zero-based start indices in the
120-symbol concatenation \(H(F)H(E)H(A)\), they are

\[
(st,p)=(38,23)
\]

and

\[
(st,p)=(37,24).
\]

The corresponding Abelian-square factors are explicitly recorded in the
search artifact.  The other three actual A/E/F trigrams \(AFE,EAF,FAF\)
are clean for half-periods \(2,\ldots,40\).

The two equations overlap strongly.  Subtracting their Parikh equalities for
this particular best-2 record yields the coordinate relation

\[
\Psi(F[37])=\Psi(A[4]),
\]

equivalently \(F[37]=A[4]\), with zero-based role-block indexing.

This is a diagnostic identity of the recorded best-2 obstruction, not a
general theorem about all AEF candidates.

**Status:** `EXACT-CHECKED LOCAL SEARCH RECORD / AEF EXISTENCE KNOWN`.

### 8.43 Exact two-swap rigidity of the AEF best-2 record

To distinguish a genuine local barrier from annealing failure, the complete
profile-preserving two-swap neighborhood of the best-2 AEF record was
enumerated.  The enumeration permits an internally bad intermediate
one-swap state provided the final two-swap state is internally clean.

It checks

\[
1565
\]

first swaps and

\[
828133
\]

second-swap continuations, of which

\[
2027
\]

produce internally clean final states.

No final state improves the objective:

\[
\boxed{2\to2}.
\]

Therefore the best-2 AEF record is an exact two-swap local minimum for the
tested role set \(A,E,F\).  This does not exclude more distant candidates;
the next positive search should use coordinated higher-order
profile-preserving cycles or a global constraint solver rather than ordinary
one- or two-swap descent.

**Status:** `EXACT-CHECKED LOCAL RIGIDITY / NOT AN AEF EXISTENCE BARRIER`.



### 8.44 Explicit AEF/ABFE existence in the 702-pair population

The revised full-no-C implementation was replayed over the complete canonical
set of 702 exact AF pairs.  The 702 rows were processed in 50-row chunks.
One chunk, covering global rows 151--200, exceeded the first wall-clock
budget and was therefore left unresolved rather than treated as negative.
It was subsequently split into ten exact five-row runs; all ten terminate
with zero caps and zero ABFE completions.  Hence the full 702-pair replay is
closed fail-safely.

The replay exports every B completion only after E has passed the complete
A/E/F no-C gate, including

\[
AFE,\quad EAF,\quad FEA.
\]

Consequently every exported record is an exact no-C \(ABFE\) scaffold.
The complete census is

\[
\boxed{14266\text{ exact }ABFE\text{ scaffolds}}.
\]

These scaffolds are extremely concentrated:

\[
\boxed{15\text{ AF pairs}},
\qquad
\boxed{7\text{ distinct F words}},
\qquad
\boxed{8\text{ distinct A words}}.
\]

The richest individual AF pairs produce 1146, 987, 979 and 822 ABFE
scaffolds.  Thus exact AEF existence is established a fortiori, and ABFE is
not intrinsically rare once the search enters the correct basin.

The same exhaustive extension replay produces no ABDEF hit.  Therefore,
within this canonical 702-AF population,

\[
\boxed{702AF\to14266ABFE\to0ABDEF}.
\]

This refines the interpretation of the AEF best-2 record in §§8.42--8.43:
that record is a rigid local minimum of one search basin, but AEF existence
itself is already known.

**Status:** `EXACT-CHECKED POPULATION CENSUS / ABFE EXISTS / ABDEF OPEN`.

### 8.45 Exact BDF-first and DEF-factorized attacks

The factorization of §8.41 permits the search order to be reversed.  Instead
of constructing \(ABFE\) and inserting D last, one may first construct a
D-compatible core and then solve the A and B existential problems
independently.

A first exact BDF-first experiment starts from the previously recorded
12 ABDF rows.  Those rows contain only three distinct \((B,D,F)\) cores.
The old A is discarded.  For each distinct BDF core, E is enumerated
exhaustively under exactly

\[
E,\ FE,\ EB,\ EBD.
\]

Each of the three BDF cores admits exactly 12 E words, giving

\[
\boxed{3BDF\to36BDEF}.
\]

For every resulting \((D,E,F)\) core, the complete A-side existential solver
is then run independently using

\[
A,\ AF,\ FA,\ FAF,\ EA,\ AD,\ EAD,\ FAD,\ ADF,\ DFA,\ AFE,\ EAF,\ FEA.
\]

All 36 cores are A-empty:

\[
\boxed{36BDEF\to0A}.
\]

A controlled local D expansion was then performed around the three recorded
D words.  All profile-preserving modifications supported on at most four
positions were generated and retained only if both \(D\) and \(DF\) remain
exactly clean.  Their union contains eight distinct D candidates.  Complete
B enumeration under

\[
B,\ FB,\ BD,\ BDF,\ DFB,\ FBD
\]

gives five BDF cores.  Complete E enumeration then gives

\[
\boxed{5BDF\to74BDEF},
\]

and independent A-existence testing again gives

\[
\boxed{74BDEF\to0A}.
\]

As a separate finite diagnostic, the first 100 E words from an exact
\(E,FE\)-only pool were crossed with the eight local D candidates.  All

\[
\boxed{800}
\]

resulting fixed \(D,E,F\) cores were checked by the complete A-side solver,
with zero A hits.  This is an exact result for that finite grid, not an
exhaustive statement about the global DEF space.

A raw unrestricted \(F\to D\) enumeration proved too broad for the current
wall-clock budget, and an ADF-first E search reached time limits in its first
probes.  Those branches are therefore recorded only as
`INCOMPLETE / NO NEGATIVE INFERENCE`.

These computations support a sharper search conclusion: ABFE abundance does
not by itself predict D compatibility, and the next positive synthesis
should construct or learn D-compatible \(D,E,F\) cores directly rather than
continue blind ABFE accumulation.

**Status:** `EXACT-CHECKED FINITE BDF/DEF CLOSURES / GLOBAL ABDEF OPEN`.


## 9. Search architecture from here

The positive construction program is now organized around one unambiguous
milestone:

\[
\boxed{\text{first exact }ABDEF}.
\]

### 9.1 Negative certification

The current exact F-role lower bound is

\[
\boxed{38118}.
\]

The 9693-word core has full second-implementation population replay.  The
later disjoint increments are exact-computed and should receive a consolidated
second replay before submission.

Further negative computation is useful when it either expands the canonical
union with genuinely new F words or produces a reusable structural
obstruction.

### 9.2 Positive synthesis

The positive hierarchy is now evidence-driven.

Exact AEF existence is known, and exact ABFE is abundant in a sharply
localized part of the 702-AF population:

\[
\boxed{14266\ ABFE}.
\]

The unresolved milestone is therefore not AEF but

\[
\boxed{ABDEF}.
\]

The preferred factorized search is now:

1. construct a fixed \(D,E,F\) core that is clean in all fixed-only contexts;
2. solve the complete A-side existential problem for that core;
3. solve the complete B-side existential problem independently for the same
   core;
4. combine the two witnesses only when both exist;
5. verify the resulting \(ABDEF\) scaffold against the complete no-C factor
   language;
6. enumerate C immediately;
7. if \(ABCDEF=H\) exists, run the independent 22-trigram finite
   \(p=2,\ldots,40\) verifier;
8. only a finite-gate PASS proceeds to Gate T.

Useful construction orders include

\[
D,F\to E\to(A\ \&\ B)
\]

and BDF-first searches in which E is enumerated before the independent
AExist test.  The exact finite closures in §8.45 show that the first small
BDF families are A-empty, so future D-first work should diversify the
\(D,E,F\) core rather than merely enumerate more E around the same three D
words.

The no-C near-31 and AEF best-2 records remain search diagnostics.  Neither
is an existence barrier and neither may be used as a global negative
certificate.

### 9.3 Immediate breakthrough trigger

The first exact result

\[
\boxed{ABDEF}
\]

changes the search phase immediately.  No further F-ledger expansion has
priority over that event: C search starts at once.

If C succeeds,

\[
ABCDEF
\to
\text{finite }p=2,\ldots,40\text{ verifier}
\to
\text{Gate T}.
\]

Only the final fail-closed chain may support a solution claim.

The global existence problem remains open.

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

If no coding is found, the project now has a plausible standalone structural/computational route, but publication value still depends on novelty audit and on presenting sufficiently strong exact results such as:

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
   searches the actual image words through exact AF/AFD, D-bridge,
   reciprocal B/C and A/F transposition-component constraints.  No source checked in the present audit has
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
\text{fixed-content A/F transposition components}
+
\text{global fixed-F D-bridge certificates}
+
\text{Rao--Rosenfeld long certificate}
\]
and any new exact theorem or successful coding obtained from it.

A targeted 2024--2026 freshness search on 2026-08-27 found no source
claiming a solution of the exact ternary \(00,11,22\)-only conjecture.  Recent
adjacent work includes Currie--Mol--Rampersad--Shallit (2024) on algorithmic
avoidance in a class of morphic sequences, Eyidoğan--Göral--Tanısalı (2026)
on template sieving, and Filimonova--Puzynina (2026) on Abelian periodicity of
purely morphic words.  None of these sources, as checked, contains the present
fixed-F transposition-component/D-bridge architecture.

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
- the one-command fail-closed H40 front end and its regression self-test;
- commands, hashes and outputs;
- precise search-space declarations for every negative computation;
- literature/novelty audit with source-specific wording.

No empirical survivor is a theorem until an exact verifier passes.

---

## References — working list

- P. J. Chase, *Transposition Graphs*, SIAM Journal on Computing 2(2) (1973), 128–133. DOI: 10.1137/0202011.
- V. Keränen, *Combinatorics on Words — Suppression of Unfavorable Factors in Pattern Avoidance*, The Mathematica Journal 11 (2010). DOI: 10.3888/tmj.11.3-4.
- A. M. Shur, *Comparing Complexity Functions of a Language and Its Extendable Part*, RAIRO Theor. Inf. Appl. 42(3) (2008), 647–655. DOI: 10.1051/ita:2008021.
- J. Grytczuk and S. Stankiewicz, *Square-free reducts of words*, arXiv:2011.12822 (2020).

- V. Keränen, *Abelian squares are avoidable on 4 letters*, ICALP 1992.
- A. Carpi, *On Abelian power-free morphisms*, International Journal of Algebra and Computation 3 (1993), 151–168.
- J. D. Currie and N. Rampersad, *Fixed points avoiding Abelian k-powers*, Journal of Combinatorial Theory A 119 (2012), 942–948. DOI 10.1016/j.jcta.2012.01.006. Consult published errata.
- M. Rao, *On some generalizations of abelian power avoidability*, Theoretical Computer Science 601 (2015), 39–46.
- M. Rao and M. Rosenfeld, *Avoiding Two Consecutive Blocks of Same Size and Same Sum over Z^2*, SIAM Journal on Discrete Mathematics 32 (2018), 2381–2397. DOI 10.1137/17M1149377.
- G. Fici and M. Puzynina, *Abelian Combinatorics on Words: A Survey*, Computer Science Review 47 (2023), 100532.
- S. Eyidoğan, H. Göral and N. Tanısalı, *Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the Template Method*, arXiv:2605.20504 (2026); Mathematics of Computation, DOI 10.1090/mcom/4246.

- J. D. Currie, L. Mol, N. Rampersad and J. Shallit, *Extending Dekking's Construction of an Infinite Binary Word Avoiding Abelian 4-Powers*, SIAM J. Discrete Math. 38(4) (2024), 2913–2925. DOI 10.1137/23M1558513.
- A. Filimonova and S. Puzynina, *On abelian periodicity of purely morphic words*, arXiv:2605.30306 (2026).
