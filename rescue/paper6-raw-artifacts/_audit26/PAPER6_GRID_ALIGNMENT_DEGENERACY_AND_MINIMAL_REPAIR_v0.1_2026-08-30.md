# PAPER 6 — GRID-ALIGNMENT DEGENERACY AND MINIMAL REPAIR v0.1
**Date:** 2026-08-30  
**Status:** exact finite-system theorem package for FULL-L4/Q2; interpretation deliberately narrower than v2.3

## 0. Why v2.3 had to pivot

The adversarial Claude audit independently confirmed the core exact mathematics:

- FT1/FT2 are algebraically correct;
- the exact Q2 hierarchy and \(1179=12+1167\) future dimension are sound;
- raw-history aggregation fixes the earlier quotient-representative gauge problem.

But the audit found a decisive counterexample to the v2.3 narrative:

> a simple four-window descriptor anchored off the true block grid has exact
> full observability without the \(S_2\)/adjacency decoration.

Therefore \(S_2\) is a valid future input channel and a sufficient decoration,
but it is **not canonical and not necessary** for observability.

The correct target became descriptor degeneracy/invariance.

---

# 1. Exact coarse-grid rank theorem

Let \(V_{\rm cnt}\) be the exact FULL-L4/Q2 statewise future space.

Independently certified:

\[
\boxed{\dim_{\mathbb Q}V_{\rm cnt}=1179.}
\]

Define \(M_{\rm grid}\) by aggregating the 218,298 raw Q2 histories according
to the four most recent recency-gauged **true-grid-aligned** L4 block Parikh
profiles.

There are

\[
\boxed{1796}
\]

nonempty grid families.

## Theorem G1

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
(M_{\rm grid}|_{V_{\rm cnt}})
=
1144.
}
\]

Hence the hidden future subspace has exact dimension

\[
\boxed{
\dim \ker(M_{\rm grid}|_{V_{\rm cnt}})
=
1179-1144
=
35.
}
\]

## Exact upper certificate

A fixed set of 1144 grid-family rows was selected as a modular independent
basis.

Every one of the remaining 652 grid-family rows was reconstructed as a
rational linear combination of those 1144 rows using CRT and rational
reconstruction over six primes.

After primitive integer normalization:

- 652 independent row relations;
- 3433 total nonzero family coefficients;
- maximum coefficient length: 27 decimal digits.

Each relation contains its own unique dependent family row and otherwise only
the fixed 1144 pivot rows, so the 652 relations are linearly independent over
\(\mathbb Q\).

All 652 relations were then checked directly against

\[
\mathbf1,Q\mathbf1,\ldots,Q^{1178}\mathbf1
\]

using Python arbitrary-precision integer arithmetic.

Result:

\[
\boxed{\text{nonzero exact residuals}=0.}
\]

Thus

\[
\operatorname{rank}_{\mathbb Q}\le1796-652=1144.
\]

A modular rank 1144 provides the opposite inequality, proving G1.

This closes the major rigor gap identified in the v2.3 referee audit.

---

# 2. Sixteen phase-anchor policies

The raw Q2 histories occur in memory-origin phases

\[
|s|\bmod4\in\{0,1\}.
\]

For

\[
(a_0,a_1)\in\{0,1,2,3\}^2,
\]

define a four-window measurement policy:

- if \(|s|\equiv0\pmod4\), use anchor \(a_0\);
- if \(|s|\equiv1\pmod4\), use anchor \(a_1\);
- from that anchor form consecutive length-4 character windows;
- retain the Parikh vectors of the last four complete windows;
- left-pad missing early windows.

The true-grid policy is

\[
\boxed{(a_0,a_1)=(0,1)}.
\]

All ranks were recomputed with a compiled C++ finite-field elimination path,
separate from the Python `rank_mod` function shared by earlier replays.

## Theorem G2 — unique grid-alignment failure

Among all 16 policies:

\[
\boxed{
15/16
}
\]

have modular rank 1179 over \(\mathbb F_{65521}\).

Since the rational target space has exact dimension 1179, each is therefore
exactly full rank over \(\mathbb Q\).

The unique exception is the true-grid policy

\[
\boxed{(0,1)},
\]

whose exact rational rank is 1144 by Theorem G1.

Thus, in this natural 16-policy class,

\[
\boxed{
\text{the only incomplete descriptor is the descriptor that follows the true
block grid at both memory-origin phases}.
}
\]

This is a finite-system theorem. It is **not** yet a universal Abelian theorem.

---

# 3. The common invariant across the 15 successful policies

Exactly

\[
\boxed{1228}
\]

of the 1796 grid-profile families contain raw histories from both memory-origin
phases \(0\) and \(1\).

Call these the **phase-mixed grid families**.

For every one of the 15 non-grid anchor policies:

> the policy splits every one of these 1228 phase-mixed grid families.

Moreover, the intersection of the sets of grid families split by all 15
successful policies is **exactly** this 1228-family phase-mixed set.

Therefore a common property of the successful anchor policies is:

\[
\boxed{
\text{they resolve every phase aliasing present in the grid-profile
partition}.
}
\]

This explains the 15/16 pattern inside this policy class much more directly
than the v2.3 \(S_2\)-activation story.

It still does not prove phase resolution is necessary among *all possible*
measurement families.

---

# 4. Phase augmentation is sufficient

Augment the grid label with

\[
\phi(s)=|s|\bmod4.
\]

In the present raw state set, \(\phi=1\) exactly for the saturated 21-character
memory states; all shorter reachable histories have phase 0.

The phase-augmented grid measurement has

\[
\boxed{3024}
\]

families and modular rank

\[
\boxed{1179}.
\]

Therefore:

\[
\boxed{
\operatorname{rank}_{\mathbb Q}
(M_{\rm grid+\phi}|_{V_{\rm cnt}})
=
1179.
}
\]

Since it is injective on the whole future space, it is automatically injective
on the persistent subspace as well.

Thus memory-origin/block-grid phase is a simple exact repair of the grid
descriptor.

It is a **sufficient repair**, not a globally necessary coordinate.

---

# 5. Exact minimal repair size

The exact grid gap is 35.

Adding one binary split to one existing measurement family can add at most one
new measurement row and hence increase rank by at most one.

Therefore any refinement of the 1796-family grid descriptor that reaches full
rank 1179 must add at least

\[
\boxed{35}
\]

new measurement rows/families.

The phase contrasts of the 1228 phase-mixed grid families span the complete
35-dimensional hidden grid kernel.

A modular row-basis calculation selected 35 phase-mixed families whose phase
contrast vectors are independent on the hidden space.

Split **only those 35 grid families** by phase and leave every other grid family
unchanged.

The refined measurement then has

\[
1796+35=\boxed{1831}
\]

families and C++ modular rank

\[
\boxed{1179}.
\]

Since the exact target dimension is 1179, this is exact over \(\mathbb Q\).

## Theorem G3 — minimal binary-refinement repair

Within refinements of the grid measurement counted by added family rows:

\[
\boxed{
35
}
\]

is the exact minimum number of added rows required for full future
observability.

A phase-based 35-family refinement attains the lower bound.

This is the sharpest structural statement obtained in the post-v2.3 audit.

---

# 6. What happened to the adjacency bit?

The v2.3 measurement

\[
4\text{ grid profiles}+\varepsilon,
\qquad
\varepsilon=\mathbf1[s_{-1}=s_{-2}],
\]

remains a correct exact full-rank measurement.

FT1, FT2 and

\[
S_2\leftrightarrow\varepsilon
\]

remain correct identities.

What failed was the interpretation that \(S_2\) is the uniquely required or
canonical observability decoration.

It is one of many possible repairs.

In particular:

- 15 alternative anchor policies work without a separate bit;
- phase augmentation works;
- a minimal 35-family phase refinement works;
- sufficiently rich random refinements often work.

Therefore FT2 should be retained as Abelian boundary bookkeeping / an available
future channel, not used to derive a necessity theorem for the measurement
basis.

---

# 7. Random-refinement controls and the Claude protocol ambiguity

The Claude audit reported:

> arbitrary splits of 287 randomly chosen grid families, five seeds, 2083
> groups, rank 1144 every time.

The report does not define the selection/splitting protocol precisely enough
to reproduce it uniquely.

A direct reconstruction using the most natural raw-history interpretation was
performed:

1. choose 287 of the 1796 grid families uniformly without replacement;
2. inside each chosen family randomly divide its raw-history members into two
   nonempty subsets;
3. keep all other families intact.

With the same 2083 final family count, independent C++ rank computation gives:

\[
\boxed{
1179,1179,1179,1179,1179
}
\]

for seeds 1--5.

Using exactly the 287 families on which \(\varepsilon\) varies, but assigning
arbitrary random nonempty raw-history splits, also gives rank 1179 for seeds
11--13.

A third protocol — choose 287 random families but use the actual epsilon bit
inside them — does **not** produce 2083 groups because epsilon is constant in
many selected families; it gives about 1840 groups and ranks around 1150.

Hence the Claude control and the present raw-history control are not the same
experiment.

Until the original control code is available, the discrepancy should remain
an explicit protocol-ambiguity item, not be resolved by assertion.

---

# 8. Generic transversality evidence

Because Theorem G1 gives an exact 35-dimensional hidden grid future, random
refinement can be tested cheaply on that hidden space.

Protocol:

- select \(k\) grid families uniformly;
- make a random nonempty raw-history binary split in each;
- measure the rank contributed on the 35-dimensional hidden grid kernel.

100 trials per \(k\) give:

| split families | mean hidden rank | full 35/35 trials |
|---:|---:|---:|
| 25 | 5.36 | 0/100 |
| 50 | 10.54 | 0/100 |
| 75 | 15.45 | 0/100 |
| 100 | 19.85 | 0/100 |
| 125 | 24.60 | 3/100 |
| 150 | 28.56 | 7/100 |
| 175 | 32.67 | 46/100 |
| 200 | 34.01 | 68/100 |
| 225 | 34.78 | 90/100 |
| 250 | 34.98 | 99/100 |
| 287 | 35.00 | 100/100 |

This makes a crucial interpretation point:

\[
\boxed{
\text{full observability after refinement is not, by itself, evidence for a
special Abelian boundary coordinate}.
}
\]

The grid partition is a 35-dimensional degeneracy, and fairly generic raw
refinements become transverse to that hidden space.

This table is computational evidence over \(\mathbb F_{65521}\), not a
probabilistic theorem.

---

# 9. Correct theorem hierarchy after the audit

## Keep as exact core

\[
218298\to2691\to2689\to1179=12+1167.
\]

Keep the exact count/equitable separation, statewise linear future dimension,
and latent persistent-injection witnesses.

## Keep as elementary geometry lemmas

FT1, FT2, and the recency-gauge \(S_2\) identity.

Add the missing conventions:

- suffixes saturate when requested depth exceeds history length;
- the recency gauge uses a deterministic `abc` fallback for unseen symbols.

For \(k\ge2,j=1\), derive explicitly from the general affine formula:

\[
\Delta_{k,1}
=
S_{2k-1}-2S_{k-1}-P_1(b).
\]

Thus define

\[
R_{k,1}:=S_{2k-1}-2S_{k-1},
\]

and the crossing-square condition is \(R_{k,1}=P_1(b)\).

This closes the missing derivation noted by the referee.

## Replace the v2.3 observability narrative

Do not claim:

> geometry predicts the required \(S_2\) decoration.

The exact finite-system statement is instead:

> the true-grid four-profile measurement is a uniquely degenerate member of a
> natural 16-policy window class; it loses exactly 35 future dimensions, and
> 35 additional independent measurement rows are necessary and sufficient to
> repair it.

---

# 10. New research target

The next theorem should characterize the exact 35-dimensional hidden space and
the algebraic reason that the grid-profile measurement annihilates it.

Promising questions:

1. Does the 35-space carry a clean representation under alphabet symmetry?
2. Is it generated by phase-contrast modes between unsaturated and saturated
   memory-origin histories?
3. Can its dimension be predicted from \(L,K\) without computing the full
   1179-dimensional Krylov space?
4. Does an analogous "grid-alignment degeneracy" appear in FULL-L4/Q1,
   INTERIOR-L5/Q1, or other selected libraries?
5. Can one derive a direct bound on the number of phase contrasts required?

That is now a better-motivated route to a general Paper-6 theorem than trying
to prove a canonical profile-fragment descriptor.

---

## Verdict

The Claude audit caused a real and productive pivot.

The v2.3 **interpretation** is retired.

The exact mathematics is stronger after repair:

\[
\boxed{
\operatorname{rank}_{\mathbb Q}M_{\rm grid}=1144,
\qquad
\dim V_{\rm cnt}=1179,
\qquad
\text{minimal repair}=35.
}
\]

And in the natural 16-anchor policy class:

\[
\boxed{
15/16\text{ are exactly full rank;}
\quad
\text{the unique failure is the true-grid policy.}
}
\]

The next object is the 35-dimensional hidden grid-degeneracy space.
