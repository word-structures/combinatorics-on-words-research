# Paper 8 — repaired theorem checkpoint for H8 profile (3,3,2)

**Date:** 2026-09-03  
**Scope:** repaired continuum-sign certificate for H8 profile `(3,3,2)` only.  
**Status:** INTERNAL COMPUTER-ASSISTED THEOREM PASS; external interval/directed-rounding audit pending.  
**Old v4 pure-tail lemma:** REJECTED / NOT USED.  
**H9:** NOT RUN.  
**Novelty:** NOT ESTABLISHED.

This checkpoint replaces the invalid finite-to-infinite promotion step `4 K tau^B` for profile `(3,3,2)` by two separate bounds:

1. an unscored burn-in/burn-out boundary comparison using 44-step Dobrushin contraction;
2. a stationary scored-window kernel tail with the polynomial shell factor explicit.

The binding exact burned-window computation uses giant-SCC-supported boundary vectors, burn `220 = 5*44`, scored radius `308 = 7*44`, `Dmid=558`, and `Dfull=705`.

The exact finite-window certificate proves

`-C_burn(x) > 1/2` for every `x in [0,1]`.

The repaired error budget is

- burn error `< 46675958861 / 150000000000`,
- kernel tail `< 1770821092673 / 24300000000000`,
- combined error `< 1866465285631 / 4860000000000`.

Therefore

`C_332(x) < -563534714369 / 4860000000000 < 0`

uniformly on `[0,1]`, subject only to the explicitly retained interval-generator rounding audit item.

Run `python3 RUN_REPAIRED_332_VERIFY.py` from the package root.  The verifier is fail-closed on missing modular runs, incomplete cover partition, failed exact threshold certificate, inconsistent error fractions, or nonpositive final margin.
