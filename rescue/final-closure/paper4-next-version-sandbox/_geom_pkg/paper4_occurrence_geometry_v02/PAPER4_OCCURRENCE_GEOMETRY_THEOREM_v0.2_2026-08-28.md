# Paper 4 — Occurrence Geometry Theorem

**Version:** v0.2  
**Date:** 2026-08-28  
**Status:** sandbox theorem package; no canonical/Git promotion implied.  
**Novelty:** `NOVELTY_UNRESOLVED`.

## 0. Correction to exploratory v0.1

The v0.1 irregular-spacing probe compared different ambient lengths. That mixed the effect of the added X occurrence with additional context. v0.2 fixes the experiment by holding the ambient at six macro blocks.

For `L=10`:
- baseline X positions `{0,2}`;
- irregular X positions `{0,2,5}`;
- same six-block ambient.

Exact result:
- support 141 -> 151;
- exactly **10** new signatures;
- 0 lost;
- the 10 new signatures are exactly the `+1` curvature family.

So the qualitative conclusion survives, but the correct count is 10, not 51.

# 1. Arbitrary-mask Cutpoint Motif Theorem

Partition the output into uniform blocks of length `L`. Let one role `X` remain unresolved and let `χ(b)` indicate whether macro block `b` is an X occurrence.

For a candidate Abelian square, let

\[
t_q=s+qK,\quad q=0,1,2,
\]

and write

\[
t_q=b_qL+i_q,\qquad 0\le i_q<L.
\]

With free X-prefix states \(x_i=P_X(i)\), \(1\le i<L\), the unresolved-role part of the square equation is

\[
\boxed{
\Lambda=
\sum_{q=0}^2 (1,-2,1)_q\,
\chi(b_q)\,\mathbf 1_{i_q\ne0}\,x_{i_q},
}
\]

after equal-depth coefficients are combined. Endpoint states are fixed and go into the affine target.

Hence **every single Abelian-square constraint can see at most three X incidences**. This gives an exact finite motif compiler for an arbitrary occurrence mask.

An independently coded macro/local compiler agrees with direct `(s,K)` enumeration on every tested mask (`L=4..9`, 2..6 macro blocks): zero disagreements.

# 2. Universal curvature law

Since the three absolute cutpoints form an arithmetic progression,

\[
t_0-2t_1+t_2=0.
\]

Therefore

\[
\boxed{
L(b_0-2b_1+b_2)+(i_0-2i_1+i_2)=0.
}
\]

Set

\[
\delta=b_0-2b_1+b_2.
\]

Because \(0\le i_q<L\),

\[
\boxed{\delta\in\{-1,0,+1\}.}
\]

If \(g_1=b_1-b_0\) and \(g_2=b_2-b_1\), then

\[
\delta=g_2-g_1.
\]

So three cutpoints can hit three distinct X copies only when the two successive macro gaps are equal or differ by exactly one block.

# 3. Exact three-distinct-occurrence classification

Let \(B\) be the set of macro positions occupied by X and define

\[
\mathrm{Curv}(B)=
\{b_0-2b_1+b_2:
b_0<b_1<b_2,\ b_q\in B\}\cap\{-1,0,1\}.
\]

For each \(\delta\), define \(C_\delta(L)\) as the nonzero signatures

\[
x_{i_0}-2x_{i_1}+x_{i_2}
\]

satisfying

\[
i_0-2i_1+i_2=-\delta L,\qquad
1\le i_0,i_1,i_2<L.
\]

Then

\[
\boxed{
T_3(B,L)=
\bigcup_{\delta\in\mathrm{Curv}(B)} C_\delta(L).
}
\]

Thus, once the curvature class of a macro triple is known, its exact distances no longer affect the free-prefix support family.

This identity was checked exhaustively over all tested masks (`L=4..12`, 3..7 blocks): zero failures.

# 4. Closed curvature families

For \(\delta=0\),

\[
i_0+i_2=2i_1,
\]

so local offsets form an arithmetic progression and

\[
\boxed{|C_0(L)|=\left\lfloor\frac{(L-2)^2}{4}\right\rfloor.}
\]

For \(\delta=+1\),

\[
2i_1=i_0+i_2+L,
\]

so the middle local offset is later than both outer offsets. For \(\delta=-1\),

\[
2i_1=i_0+i_2-L,
\]

so it is earlier than both outer offsets. In both cases,

\[
\boxed{
|C_{+1}(L)|=|C_{-1}(L)|
=\binom{\lfloor L/2\rfloor}{2}.
}
\]

The three nonzero families are pairwise disjoint.

The formulas were checked for `L=4..100`, with zero failures.

At `L=40`:

\[
|C_0|=361,\qquad
|C_{+1}|=|C_{-1}|=190.
\]

# 5. Midpoint-Routing Theorem for two outer X copies

Let X occur at macro positions \(a<c\), with gap \(d=c-a\ge2\). Suppose the first and third square cutpoints hit free depths \(i,j\) in those copies.

## Even d

The middle cutpoint lies in the unique central block

\[
m=(a+c)/2,
\]

with

\[
i\equiv j\pmod2,\qquad r=(i+j)/2.
\]

- If `m` is assigned: support is \(x_i+x_j\).
- If `m` is X: support is \(x_i-2x_r+x_j\in C_0(L)\).

The assigned-centre bridge family has exactly

\[
\boxed{\lfloor L^2/4\rfloor}
\]

supports.

## Odd d

The macro midpoint lies between

\[
m_\ell=\lfloor(a+c)/2\rfloor,\qquad m_r=m_\ell+1.
\]

The sum \(i+j\) routes the midpoint:

- `i+j<L`: midpoint lies late in \(m_\ell\). Assigned gives a binary bridge; X gives \(C_{+1}\).
- `i+j=L`: midpoint is exactly a block boundary; the middle free prefix vanishes.
- `i+j>L`: midpoint lies early in \(m_r\). Assigned gives a binary bridge; X gives \(C_{-1}\).

With \(n=\lfloor L/2\rfloor\), the allowed unordered depth pairs split as

\[
\boxed{\binom n2+n+\binom n2=n^2}
\]

into low / boundary / high branches.

This routing theorem was checked exhaustively over all tested masks and all eligible outer-X pairs (`L=4..10`, 3..7 blocks): zero failures.

# 6. FAF–AFE becomes a special case

In FAF the two F copies are at macro positions 0 and 2, so the gap is even and the unique central block is assigned A.

Therefore the extra FAF support consists exactly of

\[
x_i+x_j,\qquad i\equiv j\pmod2,
\]

with

\[
\boxed{\lfloor L^2/4\rfloor}
\]

members.

At \(L=40\), this is exactly 400.

Thus the old FAF–AFE midpoint-excess theorem is the **even-gap / assigned-centre branch** of a more general midpoint-routing theorem.

# 7. Arithmetic-progression saturation — theorem in the correct scope

Suppose X occurrences lie in a macro arithmetic progression

\[
a,a+d,a+2d,\ldots,\qquad d\ge2.
\]

For any three such occurrence positions, their macro curvature is divisible by `d`. But every realizable cutpoint triple has curvature only in \(\{-1,0,1\}\). Therefore the only possible class is

\[
\delta=0.
\]

If at least one three-term macro AP is present, every \(C_0(L)\) signature is realizable. Hence the family of constraints whose three cutpoints hit **three distinct X copies** satisfies

\[
\boxed{T_3(B,L)=C_0(L).}
\]

Additional equally spaced copies cannot enlarge this three-distinct-interaction family.

This also shows how a locally allowed period-1 second-difference shape can be lifted to a long physical half-period by a macro three-term AP. There are exactly

\[
L-3
\]

such `h=1` shapes; at \(L=40\), 37.

# 8. Correct irregular-spacing falsification

The statement “three X copies never add support beyond two” is false.

In the fixed six-block ambient example at `L=10`,

\[
B_0=\{0,2\},\qquad B_1=\{0,2,5\},
\]

the added macro triple has curvature

\[
0-2\cdot2+5=+1.
\]

Exactly 10 new signatures appear, and they are precisely \(C_{+1}(10)\).

So irregular macro spacing activates a genuinely new curvature family.

# 9. Occurrence Geometry Theorem — compact interpretation

For a uniform staged Abelian-square problem with one unresolved role X:

1. every constraint depends on at most three X-prefix incidences;
2. every cutpoint triple has curvature `-1,0,+1`;
3. three-distinct-X interactions are completely classified by which curvature classes occur in the macro occurrence set;
4. two-outer-X interactions are routed by gap parity and the role of the central block(s);
5. assigned word contents do not change this support geometry — they change affine target values.

In short,

\[
\boxed{
\text{occurrence mask}
\to
\text{curvature/midpoint motifs}
\to
\text{support skeleton}
}
\]

and only afterwards

\[
\boxed{
\text{assigned word data}
\to
\text{forbidden targets}.
}
\]

# 10. Consequence for H/R

The identical H/R support skeleton observed in Report 8 is no longer mysterious. Under a fixed occurrence geometry, the skeleton is structurally fixed. Therefore H/R selectivity must lie in target values, target multiplicities/collisions, or their interaction with prefix-path feasibility — not in raw support topology.

# 11. Literature position

Classical Carpi/template machinery already contains prefix-Parikh second differences, boundary corrections, and arithmetic-progression structure in prefix data. Rao–Rosenfeld supplies the projected-morphic `h6/g3` ancestry, and the 2026 template-sieve literature makes arithmetic-progressions-in-prefix-data an explicit theme.

So the candidate novelty is **not** the raw second-difference algebra.

The narrower candidate is the exact staged **occurrence-mask support classification**, especially:
- the three curvature support families;
- the midpoint-routing theorem;
- the identification of FAF–AFE as one exact branch.

No exact equivalent was located in the targeted search. `NOVELTY_UNRESOLVED`.

# 12. Epistemic ledger

| Claim | Status |
|---|---|
| arbitrary-mask cutpoint motif compiler | **PROVED FROM DEFINITIONS** |
| curvature restricted to `-1,0,+1` | **PROVED FROM DEFINITIONS** |
| exact three-distinct curvature classification | **PROVED FROM DEFINITIONS** |
| closed counts for \(C_0,C_+,C_-\) | **PROVED FROM DEFINITIONS** |
| pairwise disjoint curvature families | **PROVED FROM DEFINITIONS** |
| midpoint-routing theorem for gap \(d\ge2\) | **PROVED FROM DEFINITIONS** |
| FAF midpoint excess as special case | **PROVED FROM DEFINITIONS** |
| AP saturation for three-distinct interactions | **PROVED FROM DEFINITIONS** |
| arbitrary repetition saturation | **FALSIFIED** |
| novelty | **NOVELTY_UNRESOLVED** |

## Next theorem question

The best next mathematical target is a **minimal motif basis** theorem:

\[
\text{one-copy local motifs}
+
\text{outer-pair routing motifs}
+
\text{three-distinct curvature motifs}.
\]

If these form a complete and redundancy-minimal basis for an arbitrary occurrence mask, Paper 4 would have a very clean general theorem architecture rather than a list of special cases.
