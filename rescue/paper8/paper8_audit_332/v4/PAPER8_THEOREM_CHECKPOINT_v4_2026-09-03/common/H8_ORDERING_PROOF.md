# H8 uniform susceptibility ordering — certificate outline

## Statement

For the four canonical H8 profiles, the stored finite-context monotonicity certificates and uniform finite-to-infinite tail bounds imply, for every `x in [0,1]`,

`C_332(x) < C_422(x) < C_431(x) < C_521(x)`.

## Method

For each profile, exact finite-context monotonicity gives the finite range from the exact endpoint values `C_L(0)` and `C_L(1)`. The corresponding theorem's absolute tail bound `E_v` gives

`C_v(x) in [C_L(0)-E_v, C_L(1)+E_v]`.

The exact rational envelopes are pairwise disjoint. Numerically they are:

- 332: `[-0.93222267335, -0.29426964132]`
- 422: `[0.68918303802, 1.84694755775]`
- 431: `[2.16019843574, 3.32503752073]`
- 521: `[5.65090510425, 6.55456420024]`

Exact rational gap checks give positive separations approximately:

- 332 -> 422: `0.98345267935`
- 422 -> 431: `0.31325087799`
- 431 -> 521: `2.32586758351`

The result therefore does not depend on point sampling or curve fitting.

## Important nonclaim

This proof does **not** infer infinite-context monotonicity from finite-context monotonicity. It only uses finite monotonicity to bound each finite curve between its endpoints, then enlarges that interval by a separately certified absolute tail.

The ordering coincides with the four B-values `2/3 < 8/3 < 14/3 < 26/3`, but no universal B-order theorem is asserted.
