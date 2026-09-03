# Paper 4 — One-Command H40 Final Certifier Milestone

**Version 1.0 — 2026-08-27**  
**Status:** `EXECUTABLE / FAIL-CLOSED REGRESSION PASS`

Tool:

`PAPER4_H40_FINAL_CERTIFIER_v1.0.py`

## Pipeline

For an input

```text
a WORD
b WORD
c WORD
d WORD
e WORD
f WORD
```

the certifier executes:

\[
\text{profile + affine-lift kernel}
\to
\text{22 actual }h_6\text{ trigrams, }p=2,\ldots,40
\to
\text{outer-parent generation}
\to
\text{fail-closed h}_6\text{ source realizability}.
\]

A mathematical failure exits nonzero and records a witness where available.

No h=8 computation and no D40 data are used.

## Regression self-test

`PAPER4_H40_FINAL_CERTIFIER_SELFTEST_v1.0.py` gives:

1. malformed role profile: `PASS` — correctly rejected;
2. known finite-fail H40: `PASS` — reproduces
   `ace`, start 4, half-period 6, factor `acbbabbbcaab`;
3. forced Gate-T H40 regression: `PASS` — 40425 outer parents and witness
   `cbce`, template `[eps,b,e], d=0`;
4. Rao--Rosenfeld \(g_3\) Gate-T positive control: `PASS` —
   11023 outer parents, all nonrealizable.

Overall:

\[
\boxed{\texttt{SELFTEST PASS}}.
\]

No real H40 candidate currently reaches final `CERTIFIED`, because no known
candidate passes both the finite gate and Gate T.  Therefore the full
success-path awaits a genuine candidate; both mathematical FAIL paths and the
Gate-T PASS engine are regression-covered.
