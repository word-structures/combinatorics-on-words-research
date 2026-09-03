# PEX-3 prospective pilot battery H01-H03 — summary

**Date:** 2026-08-25  
**Status:** completed prospective pilot battery  
**h=8:** untouched

## Frozen order

1. Target battery H01-H03 frozen.
2. PEX-3 mechanism artifacts computed without response derivatives.
3. Predictions frozen:
   - H01 INCONCLUSIVE
   - H02 INCONCLUSIVE
   - H03 EMPTY_TARGET
4. Only then were H01/H02 responses computed.

Prediction artifact SHA-256:

`8140809fd59a8a2082b15b1baefbf9df4b00630b3a5f98bc4c02182d4e2b17c5`

## Revealed results

### H01

Target:
h=6, profile (2,2,2), first two target symbols equal.

Frozen PEX-3:
INCONCLUSIVE.

Response:

\[
A'_{H01}(0)
\approx
+0.0021376677553842545.
\]

Independent fourth-order finite-difference check:

\[
+0.002137667756787106.
\]

Difference:

\[
1.40\times10^{-12}.
\]

### H02

Target:
h=6, profile (3,2,1), first two target symbols equal.

Frozen PEX-3:
INCONCLUSIVE.

Response:

\[
A'_{H02}(0)
\approx
-0.0019058078223251728.
\]

Independent finite-difference check:

\[
-0.0019058078260192346.
\]

Difference:

\[
3.69\times10^{-12}.
\]

### H03

h=6, profile (4,1,1), first two target symbols equal.

The preregistered target event has zero baseline target edges.

Status:
EMPTY_TARGET.

It was preserved and not replaced.

## Scientific interpretation

This is a useful negative/neutral pilot result.

PEX-3:
- made no false certified sign claim;
- did not certify either nonempty new positional subtarget;
- therefore has **not yet been prospectively validated as a useful general
  predictor**.

The general sufficient theorem candidate is not falsified by this result:
INCONCLUSIVE is an allowed output.

However, claims that the specific frozen PEX-3 feature rule is a broadly
effective predictor must now remain unproven.

The h=4 mechanism/certificate result is unaffected.

## Next methodological rule

Do not retune PEX-3 using H01/H02 and then reuse H01/H02 as validation.

If a PEX-4 or other improved certificate is designed using these outcomes,
H01/H02 become ENGINE_DESIGN_SET examples for that new rule.  A fresh
prospective battery is then required.

## Immediate research question

Why does the h=4 target yield a very strong certifiable one-endpoint echo,
while the h=6 positional subtargets yield weak PEX-3 certificates even though
one of them has a genuinely negative response?

This comparison may help identify the missing coarse structural variable
needed for a stronger portable theorem without invalidating the general
criterion.
