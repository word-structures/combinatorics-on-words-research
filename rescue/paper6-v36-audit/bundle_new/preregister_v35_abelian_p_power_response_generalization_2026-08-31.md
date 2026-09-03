# PAPER 6 v3.5 — PREREGISTRATION: BOUNDED-EXTENSION ABELIAN p-POWER RESPONSE
**Date:** 2026-08-31
**Status:** preregistered before exhaustive tests; novelty unassessed

Generalize the square response-saturation theorem to Abelian p-powers.

For history `s`, extension word `x` of length `m`, exponent `p>=2`, root length
`k>=m`, and end offset `1<=j<=m`, a new p-power ending j symbols into x uses a
history suffix of length `pk-j`. Split it as

    X_1 ... X_{p-1} Y

with `|X_i|=k` and `|Y|=k-j`.

Prediction: such a p-power exists exactly when

    Psi(X_1)=...=Psi(X_{p-1}) = v

and

    Psi(pref_j(x)) = v-Psi(Y).

The target has coordinate sum j; if nonnegative it lies in the finite
composition layer of mass j. Therefore for any declared set of Abelian
exponents, all long-root (`k>=m`) current extension obstructions are still
unions of the same universal prefix-Parikh cylinders.

Tests frozen before implementation:
- exhaustive p=3 and p=4 direct-vs-target comparisons on binary small cases;
- ternary random tests;
- no novelty promotion from a passing test.
