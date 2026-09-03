# Repaired continuum sign certificate for H8 profile (3,3,2)

Let `x in [0,1]` be the target-edge restoration parameter, with `x=0` hard deletion and `x=1` the L7 baseline. Let `C_332(x)` denote the stationary susceptibility curvature entering

`da/dx = C_332(x) * d log(lambda)/dx`.

## A. Exact burned scored-window certificate

Use giant-SCC-supported boundary vectors, unscored burn length 220 on each side, and scored radius 308 around the target insertion. The exact integer/GMP DP produces the polynomial file `data/BURNED_L220_R308_POLY.txt`.

The first-derivative control polynomial is identically zero. Define the exact threshold polynomial corresponding to `-C_burn - 1/2`. Under the power-to-Bernstein Möbius identity, all 1410 Bernstein numerator coefficients are strictly positive. Therefore

`-C_burn(x) > 1/2`

for every `x in [0,1]`.

## B. Boundary burn comparison

For the left and right endpoint likelihood ratios relative to the Parry eigenvectors, one 44-step block has conservative projective bounds

`rho_1^L <= 1.07`, `rho_1^R <= 1.10`.

The normalized ratios evolve under reverse/forward 44-step Parry Markov kernels. With Dobrushin contraction `tau <= 0.1`,

`rho_B - 1 <= tau^(B-1) (rho_1 - 1)`.

For five blocks this yields the stored total-density and TV bounds. With the exact score-square oscillation envelope, the resulting burn error is

`E_burn < 46675958861/150000000000`.

## C. Stationary kernel tail

The scored window omits correlations outside radius 308. Forward/reverse contraction is applied separately to event-to-point and point-to-point distances. Same-side, inside/outside, and left/right cross terms are enumerated with the shell/pair-count polynomial factor explicit. This yields

`E_kernel < 1770821092673/24300000000000`.

No pure `tau^B` continuation lemma is used.

## D. Final sign

By the triangle inequality,

`C_332(x) <= C_burn(x) + E_burn + E_kernel`.

Hence

`C_332(x) < -1/2 + 1866465285631/4860000000000`

`= -563534714369/4860000000000 < 0`.

The internal theorem certificate therefore gives the positive hard-deletion variance response for `(3,3,2)`.

## Audit boundary

The exact polynomial, exact Bernstein sign step, modular crosscheck, rational burn algebra, and rational kernel-tail sum are discrete/replayable. The one-block projective interval certificate inherits the project's outstanding directed-rounding/interval-generator audit item. Accordingly this package labels the theorem INTERNAL COMPUTER-ASSISTED PASS, not externally audited proof.
