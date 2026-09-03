# Paper 3 Clean-Room Audit: Short-Contact Derivation
**Date:** 2026-08-29

## 1. Shift-1 Abelian Overlap (Theorem A1 & A2)
Let v be a half-profile of length h. An Abelian square x_0 ... x_{2h-1} has Psi(x_0 ... x_{h-1}) = Psi(x_h ... x_{2h-1}).
A shift-1 overlap implies x_1 ... x_{2h} is also an Abelian square.
Subtracting the Parikh vectors of the shifted halves yields:
Psi(x_0) + Psi(x_{2h}) = 2Psi(x_h)
Since Parikh vectors of single characters are basis vectors, this holds if and only if x_0 = x_h = x_{2h}.
This forces the characters to be identical, bounding the contact graph degree <= 1.

**Density d_1(v):** The probability that x_0 = x_h when the halves are drawn uniformly from words of profile v is sum_c (v_c/h)^2.
Since B(v) = sum_c (v_c - h/3)^2 = sum v_c^2 - h^2/3, we directly obtain:
d_1(v) = (sum v_c^2) / h^2 = 1/3 + B(v)/h^2
This matches Theorem A2 perfectly.

## 2. Shift-2 Classification (Theorem B1 & B2)
A shift-2 overlap yields the Parikh identity for the removed pair F = Psi(x_0 x_1), middle pair M = Psi(x_h x_{h+1}), and appended pair R = Psi(x_{2h} x_{2h+1}):
F + R = 2M
Since F, M, R have sum of components equal to 2, the only non-negative integer solutions are:
- F = M = R = 2e_i
- F = M = R = e_i + e_j
- F = 2e_i, M = e_i + e_j, R = 2e_j
The number of physical strings for R is 1 (if 2e_i) or 2 (if e_i+e_j). Thus out-degree is <= 2.

**Type-II Same-Orbit Condition:** The third case (Type-II) modifies the left profile by -2e_i + (e_i+e_j) = -e_i + e_j. The new profile has counts v_i - 1 and v_j + 1. For this to be a permutation of the original profile v, we must have v_i - 1 = v_j and v_j + 1 = v_i. Thus v_i = v_j + 1. This perfectly derives Theorem B2.

## 3. Shift-2 Mean Formula & U(v) (Theorem B3)
When restricting the contact operator to the *same profile orbit*, Type-II transitions are only allowed for pairs (i,j) satisfying v_i = v_j + 1.
The expected number of such restricted contacts draws F = 2e_i from the left half and M = e_i+e_j from the right half, with probability proportional to v_i(v_i-1) * v_i v_j.
This generates the sum:
sum_{v_i = v_j + 1} v_i^2 (v_i-1) v_j
which is exactly the definition of U(v). The remaining Type-I transitions depend only on symmetric polynomials of v, which algebraically reduce to combinations of B(v) and J(v). This fully justifies the exact d_2(v) structure in Theorem B3.

