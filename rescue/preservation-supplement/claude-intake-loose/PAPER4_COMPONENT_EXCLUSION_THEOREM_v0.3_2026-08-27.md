# Paper 4 — Finite Component Exclusion Theorem and Certificate Specification

**Version 0.3 — 2026-08-27**  
**Status:** mathematical specification of the current exact search pipeline.

## 1. Fixed data

Let
\[
\Gamma=\{a,b,c,d,e,f\},\qquad \Delta=\{a,b,c\},
\]
and let \(h_6^\omega(a)\) be the fixed macro word.

Fix block length
\[
L=40
\]
and the six required Parikh vectors
\[
r_a=(15,14,11),\quad
r_b=(11,12,17),\quad
r_c=(10,14,16),
\]
\[
r_d=(12,10,18),\quad
r_e=(13,16,11),\quad
r_f=(19,11,10).
\]

A role block \(X_x\in\Delta^{40}\) is admissible only if
\[
\Psi(X_x)=r_x.
\]

For a finite word \(w\), write
\[
\operatorname{Clean}_{2:40}(w)
\]
when \(w\) contains no Abelian square of half-length \(K\in\{2,\ldots,40\}\).

For a single block of length 40, internal cleanliness requires only
\(K\le20\).

## 2. The A-swap graph

Define the graph \(G_A\) as follows.

### Vertices

A vertex is a word \(A\in\Delta^{40}\) such that

\[
\Psi(A)=r_a
\]
and
\[
\operatorname{Clean}_{2:20}(A).
\]

### Edges

Two vertices \(A,A'\) are adjacent if \(A'\) is obtained from \(A\) by
transposing two positions containing unequal letters.

The move preserves \(\Psi(A)\).  Both endpoints must independently satisfy
the vertex predicate.

A connected component \(C\subseteq G_A\) is **closed** when a BFS/DFS has
enumerated every vertex reachable from its seed under this exact edge rule.

## 3. Exact AF gate

For a fixed \(A\), enumerate every \(F\in\Delta^{40}\) satisfying
\[
\Psi(F)=r_f
\]
and
\[
\operatorname{Clean}_{2:40}(AF),
\quad
\operatorname{Clean}_{2:40}(FA),
\quad
\operatorname{Clean}_{2:40}(FAF).
\]

These are exactly the \(h_6\)-language contexts over the role set
\(\{a,f\}\) that are needed at this stage.

Let the resulting finite set be
\[
\mathcal F(A).
\]

The implementation may prune a partial F whenever appending its newest
letter creates a forbidden suffix square, because any extension retains
that already-created factor.

## 4. Exact AFD necessary gate

For each \((A,F)\), test whether there exists a role-correct D with
\[
\Psi(D)=r_d
\]
such that the D-containing contexts supported by \(\{a,d,f\}\) are clean.

A convenient necessary set is

\[
AD,\quad DF,\quad ADF,\quad DFA,\quad FAD.
\]

If no such D exists, then \((A,F)\) cannot extend to a complete coding.

Denote survival by
\[
\operatorname{AFD}(A,F)=1.
\]

The D found here is only a witness that the AF pair passes this necessary
gate.  It must **not** be assumed compatible with later B/C choices.

## 5. Exact ABCF necessary gate

For an AFD-surviving \((A,F)\), enumerate every role-correct B satisfying
\[
\Psi(B)=r_b,\qquad
\operatorname{Clean}_{2:40}(FB).
\]

For each such B, search all role-correct C with
\[
\Psi(C)=r_c
\]
under the necessary A/C and B/C constraints.

The actual macro language requires
\[
AC,\quad BC,\quad CB,\quad CBC.
\]

For a **negative certificate**, the implementation must not add any further
macro context unless a separate mathematical proof shows that the added
predicate is implied by the actual \(h_6\)-language constraints.

In particular, cyclic cleanliness of \(BC\) is not a valid default
replacement: it also imposes `BCB`, while
\[
bcb\notin\operatorname{Fact}_3(h_6^\omega(a)).
\]

If some B,C survive, write
\[
\operatorname{ABCF}(A,F)=1.
\]

## 6. Full D join

Separate survival of AFD and ABCF is not sufficient: the D witness used in
the AFD gate may fail against the selected B,C.

Therefore, for every surviving quadruple \(A,B,C,F\), D is re-enumerated
**from scratch** while simultaneously enforcing all D-containing
\(h_6\)-bigrams/trigrams that do not contain E.

For the current factor language these include

bigrams:
\[
AD,\quad BD,\quad DC,\quad DF,
\]

and trigrams:
\[
ADF,\ BDC,\ BDF,\ CBD,\ DCB,\ DFA,\ DFB,\ FAD,\ FBD.
\]

A quadruple is a genuine ABCDF survivor only if such a common D exists.

## 7. E gate and final finite certificate

Only an ABCDF survivor reaches E.

For every role-correct E, the final exact test evaluates all 22 length-3
factors of \(h_6^\omega(a)\) and all Abelian-square half-lengths
\[
2\le K\le40.
\]

A zero result is the complete finite-period certificate.

The separate Rao--Rosenfeld parent/template computation is then required for
all periods \(K>40\).

## 8. Component exclusion theorem

> **Theorem (finite component exclusion).**  
> Let \(C\) be a closed connected component of \(G_A\). Suppose the algorithm
> above exhaustively enumerates:
>
> 1. every \(A\in C\);
> 2. every \(F\in\mathcal F(A)\);
> 3. every required AFD, ABCF and full-D continuation;
> 4. E whenever an ABCDF core survives.
>
> If no six-role coding survives, then no complete length-40 coding
> \(H:\Gamma\to\Delta^{40}\) satisfying the prescribed role Parikh vectors and
> the period-\(2,\ldots,40\) \(h_6\)-language constraints can have
> \(H(a)\in C\).

### Proof

Assume for contradiction that a complete coding \(H\) exists with
\(H(a)=A\in C\).

Because \(C\) is closed, the algorithm enumerates this A.

Set
\[
F=H(f).
\]
A valid full coding makes every actual \(h_6\)-context clean through period
40, so in particular \(AF\), \(FA\), and \(FAF\) are clean.  Hence the exact
AF enumeration contains this F.

Likewise \(D=H(d)\) witnesses the AFD necessary gate, so the AF pair cannot
be discarded there.

Set
\[
B=H(b),\qquad C'=H(c).
\]
The full coding makes \(FB\), \(AC'\), and all actual B/C contexts clean.
Hence the exact ABCF enumeration contains the pair \(B,C'\).

When D is re-enumerated under the combined A/B/C/F constraints, the true
word \(H(d)\) is a valid witness and therefore cannot be discarded.

Finally \(H(e)\) is included in the exact E enumeration, and the complete
22-trigram finite certifier accepts the true coding.

Thus a valid full coding with \(H(a)\in C\) would survive every exhaustive
stage, contradicting the assumed empty survivor set.  Therefore no such
coding exists. \(\square\)


## 8A. Gate-trace soundness rule

Every pruning predicate used in a negative component certificate must be
traceable to one of:

1. an actual factor in
   \(\operatorname{Fact}_2(h_6^\omega(a))\) or
   \(\operatorname{Fact}_3(h_6^\omega(a))\); or
2. an explicitly proved implication from such actual factors.

The current gate words are:

\[
\begin{array}{c|l}
AF & af,\ fa,\ faf\\
AFD & ad,\ df,\ adf,\ dfa,\ fad\\
ABCF & fb,\ ac,\ bc,\ cb,\ cbc\\
\text{full D} &
ad,\ bd,\ dc,\ df,\ adf,\ bdc,\ bdf,\ cbd,\ dcb,\ dfa,\ dfb,\ fad,\ fbd
\end{array}
\]

Every listed word belongs to the exact 14-bigram / 22-trigram language.

The historical `bcb` condition fails this trace and is therefore excluded.


## 9. Certificate requirements

A publishable component certificate should contain:

- seed A;
- exact vertex predicate;
- edge rule;
- component vertex count;
- hash of the sorted component vertex list;
- AF-module count;
- AFD-survivor count;
- ABCF-survivor count;
- full-D survivor count;
- E survivor count if reached;
- explicit node caps and proof that no cap was hit;
- program source hash;
- compiler/interpreter version;
- exact command line;
- independent replay result.

## 10. Epistemic status

The **soundness theorem** is mathematical.

The claim that a specific component is excluded is
`EXACT-CHECKED` only after the corresponding finite enumerations and hashes
are independently replayed.

No finite collection of components implies global nonexistence unless the
components are separately proved to exhaust \(G_A\).


## 11. D-aware reordered gate theorem

The sound gate order may be strengthened computationally by enumerating all D
words before B/C.

For an AF module \((A,F)\), define the complete AFD-D set by the actual
contexts
\[
AD,\ DF,\ ADF,\ DFA,\ FAD.
\]

For each such D, enumerate B using exactly
\[
FB,\ BDF,\ DFB,\ FBD.
\]

Only after an ABDF pair survives, enumerate C using
\[
AC,\ BC,\ CB,\ DC,\ CBC,\ BDC,\ CBD,\ DCB.
\]

Every listed word belongs to the exact 14-bigram / 22-trigram factor language.

### Soundness

A hypothetical valid full coding supplies its true \(H(d)\), then its true
\(H(b)\), then its true \(H(c)\).  Since every gate condition is an actual
macro factor, none of these true images can be discarded.

Thus emptiness at any stage is a sound negative certificate.

### Current preferred pipeline

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
E
}
\]

The earlier AFD→ABCF→full-D order remains logically valid after the cyclic-BC
correction, but is computationally inferior on the current data.
