# Phase C: Attempt an Explicit Bijection (Six vs Six)

**Date:** 2026-08-29
**Status:** ADVERSARIAL — Version 2

## The Attempt

We try to construct a bijection:
  Carpi selector triple -> (q-regime, c_0, c_1) -> Paper-4 domain.

Let D_C = delta_0 - 2delta_1 + delta_2.
Let Delta = c_1 - c_0.
We know D_C = -Delta.

Consider Delta = 0.
Paper 4 has TWO domains for Delta = 0:
1. Z_s: q = 0, c_0 = 0, c_1 = 0
2. Z: q >= 1, c_0 = 0, c_1 = 0 (and c_0 = 1, c_1 = 1)

Carpi has TWO triples for D_C = 0:
1. 000
2. 111

Does 000 map to Z_s and 111 map to Z?
Suppose a configuration falls in Z_s (q=0, c_0=0, c_1=0).
Then all three cutpoints fall in the SAME macro block: b_0 = b_1 = b_2.
Let a = a_0 = a_1 = a_2. The block is h(a).
The prefix vectors x_0, x_1, x_2 are prefixes of the SAME block.
The Carpi C3 condition must hold.
If we test the 000 triple:
  Psi(x_0) - 2Psi(x_1) + Psi(x_2) = 0.
If we test the 111 triple:
  Psi(x_0) - 2Psi(x_1) + Psi(x_2) = 1*Psi(h(a)) - 2*1*Psi(h(a)) + 1*Psi(h(a)) = 0.

For the Z_s domain, BOTH the 000 and 111 selector triples yield the EXACT SAME algebraic constraint. They are algebraically degenerate. You cannot map 000 uniquely to Z_s because 111 is functionally identical in this regime.

Now consider Delta = 1 (Domain P_t and P). D_C = -1.
Paper 4 has TWO domains for Delta = 1:
1. P_t: q = 0, c_0 = 0, c_1 = 1
2. P: q >= 1, c_0 = 0, c_1 = 1

Carpi has TWO triples for D_C = -1:
1. 011
2. 110

Consider a configuration in the P domain (q >= 1).
The cutpoints are in distinct blocks.
The constraint is Psi(x_0) - 2Psi(x_1) + Psi(x_2) = - (S(b_0) - 2S(b_1) + S(b_2)).
The right-hand side depends on the specific sequence of macro blocks assigned (the target values).
Carpi's C3 requires this to equal either:
(011): -2Psi(h(a_1)) + Psi(h(a_2))
or
(110): Psi(h(a_0)) - 2Psi(h(a_1))

Depending on the specific assignment of blocks (a_0, a_1, a_2), a single geometric configuration in domain P might satisfy the 011 equation, or the 110 equation, or neither (if it's not an abelian power).
The Carpi selector triple is determined by the TARGET DATA (which letters are assigned), NOT by the SUPPORT GEOMETRY (q, c_0, c_1).

## Counterexample to Bijection

**Counterexample:**
Take L=10, K=14 (q=1, r=4).
Cutpoints: i_0 = 2.
i_1 = 2 + 4 - 0 = 6 (c_0 = 0).
i_2 = 6 + 4 - 10 = 0 (c_1 = 1).
Geometry: q=1, c_0=0, c_1=1 -> Domain P.
Delta = 1, so D_C = -1.

Depending on the underlying word, this geometric configuration might satisfy C3 with (011) or (110).
Therefore, a single Paper 4 domain maps to MULTIPLE Carpi triples depending on affine targets.
Conversely, the 110 triple can be satisfied by a configuration in P_t (if q=0) or P (if q>=1).

## Conclusion

There is NO BIJECTION between the six Carpi triples and the six Paper-4 domains.
The relationship is **many-to-many**.
- Carpi's triples classify the AFFINE TARGET combinations required to satisfy the equation.
- Paper 4's domains classify the GEOMETRIC SUPPORT of the prefix differences.

The common number six is a superficial coincidence.
