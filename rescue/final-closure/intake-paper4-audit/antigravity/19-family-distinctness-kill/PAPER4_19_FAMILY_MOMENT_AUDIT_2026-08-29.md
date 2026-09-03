# Phase 2: Depth-Moment Invariant Audit

**Date:** 2026-08-29
**Status:** PASS

## 1. Validity of the Invariant
For a reduced signature `sigma = sum alpha_i e_i`, the moment `mu(sigma) = sum i * alpha_i`.
The raw signature is `sigma_raw = chi_0 e_u - 2 chi_1 e_v + chi_2 e_w`.
The reduction map `red` applies the endpoint convention `e_0 = 0`.
When `u=0` (or `v=0`, `w=0`), the corresponding term drops out.
However, its contribution to the raw moment is `chi * 0 * (alpha) = 0`.
Therefore, `mu(sigma) = mu(sigma_raw) = chi_0 u - 2 chi_1 v + chi_2 w` exactly. The moment invariant is perfectly robust against zero-depth truncation and coefficient combining.

## 2. All-Active Families (A-type)
Mask 111. `mu = u - 2v + w`.
- **Z-A**: `u+w = 2v` => `mu = 0`. Correct.
- **P-A**: `u+w = 2v - L` => `mu = -L`. Correct.
- **M-A**: `u+w = 2v + L` => `mu = +L`. Correct.

## 3. Mixed Families (M-type)
Masks 011 and 110.
- **Z-M** (mask 011): `mu = -2v + w = -u`. `u` in `[0, L-1]`, so `mu` in `[-(L-1), 0]`.
- **P-M** (mask 011): `mu = -2v + w = -u - L`. In domain `P`, `u <= 2(L-1) - L = L-2`. Max `u = L-2` gives `-(L-2) - L = -2L + 2`. Min `u = 0` gives `-L`. Range `[-2L+2, -L]`. Correct.
- **M-M** (mask 011): `mu = -2v + w = L - u`. In domain `M`, `u >= 0 + L - (L-1) = 1`. Min `u = 1` gives `L - 1`. Max `u = L-1` gives `1`. Range `[1, L-1]`. Correct.

## 4. OO Families
Mask 101. `mu = u + w`.
- **Z-OO**: `u+w = 2v`. `v` in `[0, L-1]`. `mu` in `{0, 2, ..., 2L-2}`. Correct.
- **P-OO**: `u+w = 2v - L`. `v` in `[ceil(L/2), L-1]`. `mu` in `[0, L-2]`. Correct.
- **M-OO**: `u+w = 2v + L`. `v` in `[0, floor((L-2)/2)]`. `mu` in `[L, 2L-2]`. Correct.

## Conclusion
All claimed moment sets and ranges are exactly correct. Zero-depth reduction does not create any moment anomalies because `0 * alpha = 0`.
