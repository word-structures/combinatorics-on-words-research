# Phase B: Attempt to Derive Six Domains from Carpi

**Date:** 2026-08-29
**Status:** ADVERSARIAL

## Setup

Starting from Carpi's framework. Add Paper 4's hypotheses:
1. Uniform block length L.
2. Three equally spaced cutpoints: t_0, t_1 = t_0+K, t_2 = t_0+2K.
3. One unresolved block role X.

## Attempt

### Step 1: Can Carpi produce the six domains Z_s, P_t, M_t, Z, P, M?

Carpi's conditions classify boundary configurations by the prefix/suffix decomposition at each cutpoint. For a uniform morphism with cutpoints t_j = b_j L + i_j, Carpi considers:
- How many complete blocks lie between consecutive cutpoints.
- What prefix of h(a_{b_j}) precedes cutpoint j.
- What suffix of h(a_{b_j}) follows cutpoint j.

The key structural insight Carpi uses: given the block length L and the starting offset i_0, the number of boundary types is determined by the possible values of (i_0, i_1, i_2) subject to the arithmetic progression constraint.

**The arithmetic progression constraint:**
Since t_0, t_1, t_2 are equally spaced with gap K:
  t_0 - 2t_1 + t_2 = 0
  L(b_0 - 2b_1 + b_2) + (i_0 - 2i_1 + i_2) = 0

This gives:
  i_0 - 2i_1 + i_2 = -Delta * L

where Delta = b_0 - 2b_1 + b_2 = (b_2 - b_1) - (b_1 - b_0) = g_2 - g_1.

Since 0 <= i_j < L, we have:
  -2(L-1) <= i_0 - 2i_1 + i_2 <= 2(L-1)

so Delta in {-1, 0, +1} for L >= 3.

### Step 2: Does Carpi's theory produce this three-way split?

Carpi's boundary/interior classification gives a DIFFERENT partition.
Carpi classifies by whether each i_j equals 0 or not: the triple (delta_0, delta_1, delta_2) in {0,1}^3.

This gives up to 8 boundary types.

Paper 4's six domains are classified by (q, c_0, c_1) where q = floor(K/L) and c_j = floor((i_j+r)/L).

**Key structural difference:**
- Carpi's 8 types come from (is-boundary, is-boundary, is-boundary).
- Paper 4's 6 types come from (is-same-block-case, carry_0, carry_1).

### Step 3: Can Carpi's partition REFINE to Paper 4's partition?

NO. They are cross-classifications.

For example, consider i_0 = 3, i_1 = 7, i_2 = 11, L = 20, r = 4.
- Carpi: delta = (1, 1, 1) — all interior. One Carpi class.
- Paper 4: c_0 = floor((3+4)/20) = 0, c_1 = floor((7+4)/20) = 0. Domain Z.

Now consider i_0 = 3, i_1 = 17, i_2 = 11, L = 20, r = 14.
- Carpi: delta = (1, 1, 1) — still all interior. Same Carpi class.
- Paper 4: c_0 = floor((3+14)/20) = 0, c_1 = floor((17+14)/20) = 1. Domain P.

So two instances in the SAME Carpi boundary class belong to DIFFERENT Paper 4 domains.

**CONCLUSION:** Paper 4's six-domain partition CANNOT be derived as a refinement or coarsening of Carpi's boundary classification.

### Step 4: What would be needed?

To recover the six domains from Carpi, one would need:
1. The AP constraint i_0 - 2i_1 + i_2 = -Delta L (this is implicit in Carpi but not organized as a classification axis).
2. The distinction q = 0 vs q >= 1 (same-block vs distinct-block cases).
3. The carry-pair (c_0, c_1) as the primary classifier.

Items 2 and 3 require knowing K mod L and organizing by it. Carpi's conditions do not parametrize by K mod L in this way — they parametrize by boundary/interior type.

### Step 5: Is the six-domain split "routine" given the AP constraint?

The AP constraint is classical. The observation that Delta in {-1, 0, +1} is elementary.
But the refinement into exactly six cases using carries is NOT trivially classical.

It requires:
- Recognizing that (c_0, c_1) governs which blocks the cutpoints fall into.
- Separating q = 0 (same-block possible) from q >= 1 (all-distinct blocks guaranteed for c_j varying).
- The specific truncation effect at q = 0 with c_0 != c_1.

This is Euclidean division applied to the AP constraint. The mathematical content is elementary but the specific partition is not stated in Carpi.

**VERDICT ON SIX DOMAINS:**
The six-domain partition is NOT derivable from Carpi's conditions.
It uses the same underlying Parikh algebra but organizes it along a different axis (carry-pair vs boundary-type).
The partition itself is elementary given the Euclidean setup, but it is NOT a corollary of Carpi's theorem.
Classification: ROUTINE GIVEN EUCLIDEAN DIVISION, but NOT A CARPI COROLLARY.
