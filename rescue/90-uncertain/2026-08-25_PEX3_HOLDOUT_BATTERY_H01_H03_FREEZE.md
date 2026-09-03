# PEX-3 Prospective Holdout Battery H01–H03 — frozen before any response reveal

**Freeze date:** 2026-08-25  
**Status:** PROSPECTIVE PILOT BATTERY  
**h=8:** FORBIDDEN / UNTOUCHED

This battery is frozen before the response of H01, H02, or H03 is computed.

All three targets use:

- baseline \(L_5\);
- h=6 target width \(W=12\);
- positional predicate \(x_0=x_1\);
- frozen PEX-3;
- all oriented one-endpoint placements at lags 13 and 14;
- the same decision rule:
  `NEGATIVE_CERTIFIED` iff the certified PEX lower strength exceeds the
  certified residual upper bound; otherwise `INCONCLUSIVE`.

Targets are fixed in increasing imbalance order:

- **H01:** profile `(2,2,2)`, \(x_0=x_1\);
- **H02:** profile `(3,2,1)`, \(x_0=x_1\);
- **H03:** profile `(4,1,1)`, \(x_0=x_1\).

No target may be replaced because its PEX score is weak or its later response
is inconvenient.

The parent full-profile response signs are already part of the exposed
historical dataset.  Therefore this is a **prospective subtarget battery**, not
a fully independent new-family benchmark.

For each H0i:
1. mechanism-only artifact;
2. frozen prediction;
3. only then response reveal.

No h=8.
