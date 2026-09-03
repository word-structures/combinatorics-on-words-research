# Paper 3 Addendum — Cyclic Shift-1 Contacts and Short-Contact Nilpotency

**Date:** 2026-08-26  
**Status:** exact project-derived structural lemma + exact finite-family computation; novelty NOT_ESTABLISHED.  
**Governance:** no Git mutation; no h=8 computation; no D40 use.

## 1. Purpose

The V3 short-contact package already proves that a shift-1 successor, when it exists, is unique and that the raw shift-1 contact graph \(O_1\) has in/out degree at most one. This addendum sharpens that statement in two ways:

1. it identifies **exactly** what a directed cycle in the baseline-pruned \(O_1\) graph means;
2. it shows by exhaustive exact enumeration that for every existing \(h=6,7\) profile class the **combined** short-contact support \(O_1\cup O_2\) is acyclic.

The second point is especially useful for Paper 3, because acyclicity makes the weighted short-contact matrix nilpotent. Its inverse is then a finite polynomial, leaving only the centered-return block as an infinite object.

---

## 2. Setup

Fix \(h\ge 3\). Let \(L_{h-1}\) be the ternary baseline language avoiding Abelian squares of half-lengths

\[
2,\ldots,h-1.
\]

For an unordered half-Parikh profile orbit \(v\), let \(\mathcal T_v\) be the set of baseline-admissible length-\(2h\) Abelian-square targets in that orbit.

The shift-1 contact graph \(O_{1,v}\) has vertex set \(\mathcal T_v\). There is a directed edge \(W\to W'\) when \(W'\) is the length-\(2h\) target obtained after shifting the target window by one symbol.

Write \(\rho\) for left cyclic rotation by one symbol.

---

## 3. Theorem — shift-1 cycles are cyclic Abelian-square-free half-words

### Theorem C0.1

For \(h\ge3\), a target \(W\in\mathcal T_v\) lies on a directed cycle of \(O_{1,v}\) if and only if

\[
W=XX
\]

for a word \(X\in\{a,b,c\}^h\) such that \(X^\omega\) contains no Abelian square of period

\[
1\le k<h.
\]

Equivalently, \(X\) avoids Abelian squares cyclically in the standard sense: every Abelian square occurring in \(X^\omega\) has period at least \(|X|=h\).

### Proof

The shift-1 overlap lemma gives

\[
x_0=x_h=x_{2h}.
\]

Hence, whenever a shift-1 successor exists, the appended symbol equals the removed symbol. Therefore

\[
W'=\rho(W).
\]

So every \(O_1\)-edge is a one-step cyclic rotation.

Suppose \(W\) lies on a directed cycle. Repeated shift-1 edges traverse a finite rotation orbit. At each traversed position the overlap condition gives

\[
x_j=x_{j+h}.
\]

If the rotation orbit closes after a proper divisor of \(2h\), periodicity propagates these equalities to every residue class. Thus

\[
x_j=x_{j+h}\qquad\text{for all }j,
\]

and consequently

\[
W=XX.
\]

Every rotation appearing on the cycle is a baseline-admissible target. Since \(W=XX\), these rotations are exactly the length-\(2h\) windows of \(X^\omega\) beginning at the cyclic starting positions of \(X\). Baseline admissibility of all these rotations is therefore equivalent to the absence in \(X^\omega\) of Abelian squares of every half-length

\[
2\le k<h.
\]

It remains only to account for \(k=1\). Suppose \(X^\omega\) contains two equal adjacent letters. Two consecutive cyclic blocks of length \(h-1\) can then be chosen so that the first omits one of these equal letters and the second omits the other. Their Parikh vectors are equal, so \(X^\omega\) contains an Abelian square of period \(h-1\). Since \(h\ge3\), this period belongs to \(2,\ldots,h-1\), contradicting baseline admissibility.

Thus periods \(2,\ldots,h-1\) are absent if and only if all periods \(1,\ldots,h-1\) are absent.

Conversely, if \(X^\omega\) has no Abelian square of period below \(h\), then every cyclic rotation of \(XX\) is baseline-admissible, is again an \(h\)-Abelian square, and satisfies the shift-1 overlap criterion. The rotation orbit therefore forms an \(O_1\)-cycle. \(\square\)

---

## 4. Literature relation

Peltomäki and Whiteland introduced the explicit notion of **cyclic avoidance of Abelian powers**: a finite word \(w\) avoids Abelian \(N\)-powers cyclically when every Abelian \(N\)-power in \(w^\omega\) has period at least \(|w|\).

Theorem C0.1 therefore does not invent a new cyclic-avoidance notion. Its project-specific content is the exact identification

\[
\boxed{
O_1\text{-cycle}
\iff
\text{cyclically Abelian-square-free half-word}.
}
\]

This provides a direct bridge between Paper 3's weighted hole-overlap graph and the cyclic Abelian-avoidance literature.

Reference:

J. Peltomäki and M. A. Whiteland, *Avoiding abelian powers cyclically*, Advances in Applied Mathematics 121 (2020), 102095, DOI 10.1016/j.aam.2020.102095.

**Novelty status:** NOT_ESTABLISHED. The bridge may be a useful project lemma even if regarded as an elementary reformulation.

---

## 5. Exact h≤7 cyclic check

The independent script

`36_PAPER3_SHORT_CONTACT_NILPOTENCY_RECHECK.py`

enumerates only \(h=2,\ldots,7\).

For cyclic Abelian-square-free ternary half-words it finds:

| \(h\) | count |
|---:|---:|
| 3 | 6 |
| 4 | 12 |
| 5 | 0 |
| 6 | 0 |
| 7 | 0 |

Consequently, within the existing permitted family, baseline-pruned \(O_1\) has directed cycles only in the \(h=3,4\) cases compatible with these cyclic words. The \(h=2\) baseline is a special degenerate case and is intentionally kept outside Theorem C0.1.

No statement is made about \(h\ge8\).

---

## 6. Combined short-contact graph

Let

\[
G_{\mathrm{short},v}
=
\operatorname{supp}(O_{1,v})\cup
\operatorname{supp}(O_{2,v}).
\]

The exact enumeration gives the following for \(h=6,7\).

| \(h\) | profile | targets | \(E(O_1\cup O_2)\) | longest directed path |
|---:|---|---:|---:|---:|
| 6 | \((4,1,1)\) | 90 | 78 | 5 |
| 6 | \((3,2,1)\) | 720 | 372 | 11 |
| 6 | \((2,2,2)\) | 126 | 30 | 1 |
| 7 | \((5,1,1)\) | 12 | 6 | 1 |
| 7 | \((4,2,1)\) | 180 | 54 | 1 |
| 7 | \((3,3,1)\) | 756 | 360 | 3 |
| 7 | \((3,2,2)\) | 1344 | 402 | 7 |

Every one of these seven combined graphs is acyclic.

This is **not** true throughout the smaller family. In particular, combined short-contact cycles remain at \(h=5\), so the result should not be promoted into a universal-in-\(h\) conjecture from present evidence.

---

## 7. Corollary — exact nilpotency of the weighted short block

Let

\[
N_v(z,t)
=
z\,O_{1,v}(t)+z^2O_{2,v}(t),
\]

where the entries may carry arbitrary analytic weights but have support contained in the exact short-contact graph.

### Corollary C0.2

If \(G_{\mathrm{short},v}\) is acyclic with longest directed path length \(d\), then

\[
\boxed{
N_v(z,t)^{d+1}=0
}
\]

for every choice of weights.

Therefore

\[
\boxed{
(I+N_v)^{-1}
=
\sum_{j=0}^{d}(-N_v)^j.
}
\]

### Proof

A nonzero entry of \(N_v^k\) requires a directed walk of length \(k\) in the support graph. An acyclic graph whose longest directed path has length \(d\) has no directed walk of length \(d+1\). Hence \(N_v^{d+1}=0\). The finite inverse follows from the geometric identity for a nilpotent matrix. \(\square\)

For the exact \(h=6,7\) profiles above, the nilpotency exponents \(d+1\) are respectively

\[
6,\;12,\;2,\;2,\;2,\;4,\;8.
\]

---

## 8. Consequence for the Paper 3 scalar recurrence

The V3 scalar reduction uses

\[
\mathcal B_v
=
I+N_v+E_v,
\]

where \(E_v\) is the centered delayed-return block.

For the certified acyclic \(h=6,7\) short graphs, define

\[
A_v=I+N_v.
\]

Then \(A_v^{-1}\) is known exactly as the finite polynomial above. If

\[
\|A_v^{-1}E_v\|<1,
\]

the Banach/Neumann lemma gives

\[
\mathcal B_v^{-1}
=
(I+A_v^{-1}E_v)^{-1}A_v^{-1}
\]

and proves invertibility of \(\mathcal B_v\).

Thus one of the scalar-reduction audit assumptions can be converted into an explicit certificate:

\[
\boxed{
\text{finite Abelian short-contact polynomial}
+
\text{norm-controlled centered return}.
}
\]

This is stronger than using only the degree bounds
\(\deg O_1\le1\), \(\deg O_2\le2\).

---

## 9. Epistemic classification

| Statement | Status |
|---|---|
| shift-1 edge is cyclic rotation | exact consequence of the shift-1 lemma |
| \(O_1\)-cycle \(\leftrightarrow\) cyclically Abelian-square-free half-word | exact proof in this note |
| cyclic-avoidance terminology | established prior art |
| cyclic counts for \(h=3,\ldots,7\) | exact exhaustive computation |
| combined \(O_1\cup O_2\) acyclic for all existing \(h=6,7\) profiles | exact exhaustive computation |
| nilpotent weighted short block on an acyclic support | standard graph/matrix corollary |
| Paper 3 novelty from this alone | NOT_ESTABLISHED |
| universal acyclicity for larger \(h\) | NOT CLAIMED |

The scientific value is not the generic nilpotency fact. It is that the Abelian overlap classification reduces the short recurrence to a graph whose support is exactly certifiably acyclic in the current \(h=6,7\) hard-response family.
