# Paper 4 — Gate T Readiness and Outer-Parent Regression

**Version 0.1 — 2026-08-27**  
**Status:** outer-parent layer `EXACT STRUCTURAL PROTOTYPE`; full Gate T `OPEN`.

## 1. Goal

For a candidate
\[
H:\{a,b,c,d,e,f\}^*\to\{a,b,c\}^{40},
\]
the finite gate certifies periods
\[
2\le K\le40.
\]

The remaining theorem obligation is:

\[
K>40.
\]

Rao--Rosenfeld Proposition 10 states that this follows if **no parent by \(H\)**
of the Abelian-square template
\[
[\varepsilon,\varepsilon,\varepsilon,\mathbf0]
\]
is realizable by the source morphism \(h_6\).

Proposition 9 makes the outer-parent set finite under
\[
E_e(M_{h_6})\cap\ker M_H=\{0\}.
\]

## 2. What the repository already supplies

### Exact Smith normal form

`src/smith-normal-form.js` is explicitly written for the two Proposition-9
lattice tasks:

1. an integral basis of
   \[
   \ker(M_H)\cap\mathbb Z^6;
   \]
2. a particular integer solution of
   \[
   M_Hd=v.
   \]

It uses BigInt arithmetic and self-verifies the Smith decomposition.

**Status:** reusable.

### h6 parent/ancestor machinery

`src/get-parents.js` computes exact parents and ancestor closure under the
**source morphism \(h_6\)** once a valid finite ancestor box is supplied.

**Status:** reusable for the source-realizability half.

### h6 realizability machinery

`src/decide-realizability.js` implements the Proposition-8 finite-factor
comparison for the Abelian-square target \(t_0\).

However, it is currently hard-coded around \(t_0\); it is not a generic
function that accepts an arbitrary list of outer-parent templates.

**Status:** mathematical machinery exists; generic adapter still required.

## 3. A soundness gap found in the current Proposition-11 helper

`src/proposition11-targets.js` obtains a contracting bound using the helper
`ancestor-box.contractingBound`.

That helper is a bound on a **single factor coordinate**
\[
|r_i(\Psi(w))|.
\]

The Proposition-9 / Proposition-11 lattice vector is instead a factor
difference
\[
d=\Psi(u)-\Psi(v).
\]

The primary paper requires a bound on
\[
|r_i(\Psi(u)-\Psi(v))|.
\]

A bound for a single factor cannot be applied unchanged to the difference
without an additional argument.  The triangle inequality gives the safe
generic implication
\[
|r_i(\Psi(u)-\Psi(v))|
\le
|r_i(\Psi(u))|+|r_i(\Psi(v))|
\le2c_i.
\]

Therefore `proposition11-targets.js` should **not** be used as a soundness
dependency for Gate T in its current form until this point is repaired or an
independent tighter difference bound is proved.

This is a code-audit finding, not a claim that every numerical target set
previously produced by the file is wrong.

## 4. h6-specific exact replacement for the contracting lattice bound

For \(h_6\), let \(M=M_{h_6}\).  A primitive integer basis of the left
generalized zero-eigenspace is

\[
Q=
\begin{pmatrix}
0&2&-1&-1&0&0\\
1&-1&1&0&-1&0\\
1&1&-1&0&0&-1
\end{pmatrix}.
\]

Exact multiplication gives
\[
\boxed{QM^2=0.}
\]

Hence, after desubstitution at level \(h_6^2\), the \(Q\)-coordinate of any
factor receives no contribution from complete interior \(h_6^2\)-images.
Only the two boundary fragments remain.

Enumerating:

- every factor of a single \(h_6^2(x)\);
- every suffix of \(h_6^2(x)\) followed by every prefix of \(h_6^2(y)\);

gives the exact safe factor-coordinate ranges

\[
Q_1\Psi(w)\in[-2,2],
\qquad
Q_2\Psi(w)\in[-2,2],
\qquad
Q_3\Psi(w)\in[-1,1].
\]

Therefore every factor difference \(d=\Psi(u)-\Psi(v)\) satisfies

\[
\boxed{
|Q_1d|\le4,\qquad
|Q_2d|\le4,\qquad
|Q_3d|\le2.
}
\]

This is a finite exact bound with integer arithmetic only.

## 5. Outer-parent equation

For a square target, after fixing the three boundary decompositions

\[
H(a_i)=p_is_i
\]
(the target boundary letters are all \(\varepsilon\)), the parent vector
satisfies

\[
M_Hd
=
\Psi(s_1p_2)-\Psi(s_2p_3).
\]

Write the right-hand side as \(v\).

The h6-specific bounded parent problem is therefore

\[
M_Hd=v,
\qquad
|Qd|\le(4,4,2).
\]

## 6. Why the prescribed length-40 incidence makes this especially simple

All Paper-4 length-40 candidates have incidence matrix

\[
M_{40}=
\begin{pmatrix}
15&11&10&12&13&19\\
14&12&14&10&16&11\\
11&17&16&18&11&10
\end{pmatrix}.
\]

Stacking the two maps gives

\[
A_{40}=
\begin{pmatrix}
M_{40}\\
Q
\end{pmatrix}.
\]

Exact determinant:

\[
\boxed{\det A_{40}=19920\ne0.}
\]

Consequences:

1. the spectral-intersection condition is visible directly in this
   coordinate system;
2. for each correction \(v\) and each bounded integer value
   \[
   q=Qd\in[-4,4]\times[-4,4]\times[-2,2],
   \]
   there is **at most one** rational vector \(d\);
3. integer membership is decided by an exact adjugate/divisibility test.

The \(Q\)-box has only
\[
9\cdot9\cdot5=405
\]
points.

Thus the Rao--Rosenfeld ellipsoid enumeration collapses, in this special
fixed-incidence setting, to a very small exact integer enumeration.

## 7. g3 regression

The same construction was run with Rao--Rosenfeld's length-10 \(g_3\).

Exact results:

- boundary options per template position: 67;
- boundary triples: 300,763;
- distinct correction vectors \(v\): 9,418;
- correction classes with a bounded integer solution: 677;
- boundary triples with at least one bounded solution: 21,741;
- unique parent templates in the exact bounded superset:
  \[
  \boxed{11023}.
  \]

Rao--Rosenfeld report that the square target has **at most 16,214** parents
by \(g_3\) realizable by \(h_6\).

The two numbers need not agree: the coordinate system and finite supersets
are different.  The important regression facts are:

- the new procedure is finite;
- it is exact under its stated \(Q\)-bounds;
- its scale is compatible with the published computation;
- it does not explode beyond practical use.

**Not yet checked:** whether all 11,023 parent templates are non-realizable by
\(h_6\).

Files:

- `PAPER4_GATET_G3_OUTER_PARENT_PROTOTYPE_OUTPUT.json`
- `PAPER4_GATET_G3_PARENT_SUPERSET.tsv`

## 8. Length-40 performance regression

The generic H40 outer-parent generator was run on the first already-falsified
length-40 candidate.

This candidate is **not** a solution; it has a known period-6 finite-gate
violation.  The run was only a mechanism/performance test.

Results:

- boundary options per position: 247;
- boundary triples:
  \[
  247^3=15,069,223;
  \]
- unique correction vectors: 67,772;
- correction classes with bounded solutions: 1,140;
- unique outer-parent templates:
  \[
  \boxed{40,425};
  \]
- runtime in the recorded compiled run: approximately 0.36 seconds.

Thus outer-parent generation will not be the computational bottleneck for a
future finite-gate-zero H40 candidate.

Files:

- `PAPER4_GATET_H40_OUTER_PARENT_GENERATOR_v0.1.cpp`
- `PAPER4_GATET_H40_FALSIFIED_OUTER_PARENT_OUTPUT.txt`

## 9. Remaining Gate T blocker

The missing load-bearing module is now sharply isolated:

> Given a finite list of outer-parent templates, decide **in batch** whether
> any is realizable in \(\operatorname{Fact}^\infty(h_6)\).

The repository has the ingredients, but not a generic audited batch adapter.

The adapter must:

1. compute a sound ancestor box for nonzero target vectors;
2. take h6-parent closures of the whole target set;
3. compute the Proposition-8 length bound from the resulting ancestor set;
4. enumerate the complete h6 factor set to that length;
5. test direct template realization;
6. return either a concrete source-language witness or an exact empty result.

Crucially, target-dependent expanding bounds must be included.  Reusing the
zero-target ancestor box from the proof of \(h_6^\omega(a)\)'s
Abelian-square-freeness would be unsound for general outer parents.

## 10. Gate T readiness

| layer | status |
|---|---|
| prescribed \(M_H\) / kernel check | PROVED + EXACT |
| spectral-intersection coordinate test | EXACT |
| finite contracting difference bounds | PROVED + EXACT |
| outer boundary enumeration | EXACT |
| integer parent-vector solve | EXACT |
| g3 outer-parent regression | PASSED structurally |
| H40 outer-parent performance | PASSED |
| generic h6 source realizability | **OPEN IMPLEMENTATION/AUDIT** |
| Proposition 10 conclusion | blocked only by preceding row |

Overall:

\[
\boxed{\text{Gate T is now one audited source-realizability adapter away from executable closure.}}
\]
