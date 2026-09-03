# Paper 4 — general FAF–AFE support theorem

**Version:** v0.1  
**Date:** 2026-08-28  
**Scope:** sandbox theorem candidate, proved from definitions. No Paper-4 search population used.  
**Novelty:** `NOVELTY_UNRESOLVED`.

## 1. Setup

Fix a block length `L >= 4`. Let `A,F,E` be length-L blocks and treat only the internal
ordering of `F` as unresolved.

Write

`x_j = Parikh(F[0:j])`, `0 <= j <= L`,

with fixed endpoints `x_0 = 0` and `x_L = m(F)`.

For a square window with start `s` and half-period `K`, use

`D(s,K) = P(s+2K) - 2P(s+K) + P(s)`.

After substituting complete block profiles and the fixed endpoints, the remaining
F-dependent part is an affine linear form in the free variables
`x_1,...,x_(L-1)`.

The **reduced F-signature** records only the depth/coefficient pairs of those free
variables.

Define:

- `S_AFE(L)`: signatures from `H(AFE)` for `2 <= K <= L`;
- `S_FAF(L)`: signatures from `H(FAF)` for
  `2 <= K <= floor(3L/2)`.

## 2. Theorem — support inheritance and midpoint excess

For every `L >= 4`,

`S_AFE(L) subseteq S_FAF(L)`.

Moreover,

`S_FAF(L) \ S_AFE(L) = M_L`,

where `M_L` consists exactly of

- unary doubled-prefix signatures `2 x_i`, `1 <= i <= L-1`;
- binary same-parity signatures `x_i + x_j`,
  `1 <= i < j <= L-1`, `i == j (mod 2)`.

Therefore

`|M_L| = floor(L^2/4)`.

The full affine equation for an extra midpoint contact is

`x_i + x_j - 2 p_A((i+j)/2) + m(A) - m(F) = 0`.

For `i=j` this reads

`2x_i - 2p_A(i) + m(A) - m(F) = 0`.

## 3. Proof of S_AFE subseteq S_FAF

Let the equally spaced cut positions be

`t_0=s`, `t_1=s+K`, `t_2=s+2K`

with coefficients `(+1,-2,+1)`.

In `AFE`, the unique F block occupies `[L,2L]`.

### Case 1: t_0 >= L

Translate all cuts by `-L`.

The AFE middle F becomes the first F of FAF, the following E block becomes the
middle A block, and all cuts remain inside `[0,2L]`. Local F depths and their
coefficients are unchanged.

### Case 2: t_2 <= 2L

Translate all cuts by `+L`.

The AFE middle F becomes the second F of FAF and all cuts remain inside
`[L,3L]`. Again the reduced F-signature is unchanged.

### Case 3: t_0 < L and t_2 > 2L

Because `t_1=(t_0+t_2)/2`, one has `L < t_1 < 2L`. Thus only the middle cut is
inside F and the signature is `-2x_i`, where `i=t_1-L`.

Every such unary signature occurs in FAF:

- if `2i >= L`, take `s=0`, `K=i`;
- if `2i < L`, take `s=L+2i`, `K=L-i`.

The constructed half-periods are at least 2 because `L>=4`.

Hence every AFE signature occurs in FAF.

## 4. Two-F-block FAF windows are exactly midpoint contacts

Suppose a FAF signature contains free variables from both copies of F.

Then necessarily

`t_0=i` in the first F and `t_2=2L+j` in the second F,

with `1 <= i,j <= L-1`.

Equal spacing gives

`t_1 = (t_0+t_2)/2 = L + (i+j)/2`.

Thus `i+j` is even, so `i` and `j` have the same parity, and the middle cut lies
in A. The reduced signature is therefore `x_i+x_j`; if `i=j`, the two terms
combine to `2x_i`.

Conversely, for every same-parity pair `1 <= i <= j <= L-1`, set

`t_0=i`,
`t_1=L+(i+j)/2`,
`t_2=2L+j`.

The half-period is

`K = L + (j-i)/2 <= floor(3L/2)`,

so this is a valid FAF window. Hence every midpoint signature occurs.

The affine equation follows from

`P(t_0)=x_i`,
`P(t_1)=m(F)+p_A((i+j)/2)`,
`P(t_2)=m(F)+m(A)+x_j`.

Substitution into the second difference gives

`x_i+x_j-2p_A((i+j)/2)+m(A)-m(F)=0`.

## 5. Midpoint signatures cannot occur in AFE

AFE contains only one F interval.

If both outer cuts `t_0,t_2` lie in that F block, then their midpoint `t_1` also
lies in it. Therefore the middle coefficient `-2` must also occur.

Thus AFE cannot produce a signature with two `+1` terms and no `-2`, nor can two
distinct cuts in one block have the same local depth. Hence AFE cannot produce
`x_i+x_j` of the midpoint family or `2x_i`.

Therefore `M_L` is disjoint from `S_AFE(L)`.

## 6. FAF signatures outside the midpoint family are already in AFE

Consider a FAF window not using free variables from both F copies.

If `K <= L`, all free variables come from at most one F copy. Translating by `+L`
(first F to the AFE middle F) or by `-L` (second F to the AFE middle F) reproduces
the same signature.

If `K > L`, two consecutive cuts are farther apart than one block length, so no
two cuts can lie in the same F block. If both F copies contribute, we are in the
midpoint family. Otherwise there is at most one free F variable, giving only
`+x_i`, `-2x_i`, or the zero signature.

All of these occur in AFE:

- zero: a short window entirely inside A;
- `-2x_i`: the construction in Section 3, Case 3;
- `+x_i`:
  - for `i <= L-2`, take `s=L+i`, `K=L-i`;
  - for `i=L-1`, take `s=1`, `K=L-1`.

Thus every FAF signature outside `M_L` is already in AFE.

Combining the previous sections proves

`S_FAF(L) \ S_AFE(L) = M_L`.

## 7. Count of the excess family

Among internal depths `1,...,L-1`, let `o` and `e` be the counts of odd and even
depths. Same-parity unordered pairs with repetition give

`|M_L| = C(o+1,2) + C(e+1,2)`.

If `L=2m`, then `(o,e)=(m,m-1)` and the count is `m^2=L^2/4`.

If `L=2m+1`, then `(o,e)=(m,m)` and the count is `m(m+1)=(L^2-1)/4`.

Therefore

`|M_L| = floor(L^2/4)`.

For Paper 4, `L=40`, the excess is exactly `400`.

## 8. Corollary — one shared target-bucket skeleton

For a signature `sigma=((j_1,c_1),...,(j_r,c_r))`, define

`L_sigma(x)=sum c_i x_(j_i)`.

Every concrete FAF or AFE window is a forbidden equality

`L_sigma(x)=T`

for a target vector `T`.

Since every AFE signature already occurs in FAF, the combined gate can be stored
on one FAF signature skeleton:

`L_sigma(x) notin T_FAF(sigma;A) union T_AFE(sigma;A,E)`.

So AFE adds new forbidden target values on existing FAF supports; it does not add
a new family of supports.

## 9. Corollary — exact raw primal graph

After endpoint elimination the free variables are `x_1,...,x_(L-1)`.

For any non-adjacent pair `1 <= i < j <= L-1` with `j-i >= 2`, choose the AFE
window

`s=L+i`, `K=j-i`.

Its first two cuts lie in F at depths `i` and `j`, so one affine constraint
contains both variables.

Conversely, two free depths in one window differ by `K` or `2K`, and `K>=2`.
Therefore adjacent depths never share an AFE affine constraint.

Hence the AFE affine primal graph is `K_(L-1)` minus the adjacent path edges.

The prefix path itself imposes

`x_(j+1)-x_j in {e_a,e_b,e_c}`,

adding exactly those missing edges. The full raw prefix-variable primal graph is
therefore

`K_(L-1)`,

with exact treewidth

`L-2`.

For `L=40`, the treewidth is `38`.

This rules out width reduction for a generic tree-decomposition DP on the raw
prefix variables. It does not rule out algebraic compression in another
representation.

## 10. Machine verification

The attached verifier directly enumerates reduced signatures from cut positions
and checks:

1. `S_AFE subseteq S_FAF`;
2. `S_FAF \ S_AFE = M_L`;
3. `|M_L| = floor(L^2/4)`;
4. `M_L` is disjoint from AFE;
5. AFE and FAF have the same affine primal graph;
6. that graph contains exactly all non-adjacent internal pairs;
7. unit-step edges complete it to `K_(L-1)`.

The packaged regression checks every `L=4..200` and reports zero failures.

This is a regression check; Sections 3–9 are the proof.

## 11. Paper-4 interpretation

This theorem is independent of the current preregistered H/R replication.

If `AF_AND_AFE_EXISTS` remains selective, the mechanism cannot be that AFE creates
a new interaction topology. The next object is the compatibility of the target
sets

`T_FAF(sigma;A)` and `T_AFE(sigma;A,E)`

on the common signature skeleton.

If the empirical separation disappears, the theorem still stands as structural
mathematics, but should not be presented as the explanation of the search
selectivity.

## 12. Epistemic status

**PROVED FROM DEFINITIONS**
- `S_AFE(L) subseteq S_FAF(L)` for `L>=4`;
- exact midpoint characterization of the difference;
- midpoint affine equation;
- excess count `floor(L^2/4)`;
- shared-support / enlarged-target-set corollary;
- complete raw primal graph after unit steps;
- treewidth `L-2`.

**MACHINE-CHECKED**
- all structural identities for every `L=4..200`.

**NOT ESTABLISHED**
- novelty;
- that target-set incompatibility explains the H/R separation;
- a production-solver speedup;
- complete-AEF existence at L=40;
- L=40 impossibility.

Mäkelä remains open.
