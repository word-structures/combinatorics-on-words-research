# PEX-C4 Prospective Battery H04-H07 — Result

**Date:** 2026-08-25  
**Status:** PROSPECTIVE PILOT COMPLETED / FORMAL PREDICTIONS INCONCLUSIVE  
**h=8:** untouched  
**Novelty:** NOT_ESTABLISHED

## 1. Freeze

Battery frozen before any PEX-C4 score or response:

- H04: h=7 profile (3,2,2), x0=x1
- H05: h=7 profile (3,3,1), x0=x1
- H06: h=7 profile (4,2,1), x0=x1
- H07: h=7 profile (5,1,1), x0=x1

Freeze SHA-256:

`caa71b1cd6180476734c3f1d9808a2f817b2cf07767e33129deef6136b5a5cb4`

PEX-C4 rule was not modified after freeze.

## 2. Mechanism-only stage

The frozen PEX-C4 mechanism scores were:

| Holdout | q | positive lower-kernel placements | E_PEX-C4 |
|---|---:|---:|---:|
| H04 | 0.0068342950 | 12 / 56 | 0.00118221473 |
| H05 | 0.0059512631 | 25 / 56 | 0.00212542776 |
| H06 | 0.0006742848 | 28 / 56 | 0.00024437869 |
| H07 | 0 | — | EMPTY_TARGET |

No full response derivative had been computed at this stage.

## 3. Residual prediction stage

Before response reveal, a Float64 complement calculation through lag 140 gave:

| Holdout | E_PEX-C4 | C_rest prefix through 140 | last-20 absolute mass |
|---|---:|---:|---:|
| H04 | 0.00118221473 | +0.00573757887 | 9.87e-12 |
| H05 | 0.00212542776 | -0.00302814945 | 7.42e-12 |
| H06 | 0.00024437869 | -0.00204453665 | 1.02e-12 |

Numerically, the frozen criterion inequality would therefore favor:
- H04: not negative-certified;
- H05: negative;
- H06: negative.

However the residual tail was **not rigorously certified**.

The frozen formal predictions therefore remained:

- H04: INCONCLUSIVE
- H05: INCONCLUSIVE
- H06: INCONCLUSIVE
- H07: EMPTY_TARGET

Prediction SHA-256:

`500a5d11d023dcef70affbdc01b97e756cdd9398677935f163a80765d00ed35e`

This conservative decision was frozen before response reveal.

## 4. Response reveal

Only after predictions were frozen:

### H04

\[
A'(0)\approx+0.00451814335460.
\]

Central finite-difference check:

\[
+0.00451814806980.
\]

### H05

\[
A'(0)\approx-0.00522843171120.
\]

Central finite-difference check:

\[
-0.00522843742687.
\]

### H06

\[
A'(0)\approx-0.00229553939972.
\]

Central finite-difference check:

\[
-0.00229554225982.
\]

### H07

EMPTY_TARGET.

Response artifact SHA-256:

`ff7f9bb6fc96ff28fe49d31036060467c7b91c56663d6cdf6d04e985b5117a5e`

## 5. Interpretation

The formal prospective outcome is still:

**PEX-C4 PORTABLE CERTIFICATION = NOT YET VALIDATED**

because none of H04-H06 received a rigorous pre-reveal
`NEGATIVE_CERTIFIED` label.

However, the pre-reveal **numerical criterion data separated all three
nonempty response signs correctly**:

- H04: mechanism smaller than positive residual diagnostic -> actual positive;
- H05: mechanism exceeded residual diagnostic -> actual negative;
- H06: mechanism exceeded residual diagnostic -> actual negative.

This is encouraging design evidence for continuation capacity, but it must not
be upgraded retroactively into a prospective certified success.

## 6. What the experiment actually identified

The bottleneck is no longer the PEX-C4 continuation mechanism.

For H05/H06, the pre-reveal numerical residuals were already favorable by
orders far larger than the observed last-20-lag mass.

The bottleneck is:

\[
\boxed{\text{rigorous residual-tail certification for the larger }L_6\text{ system}.}
\]

The next methodological target should therefore be a portable validated
residual solver/bound for h=7-scale systems.

## 7. Research consequence

The current evidence hierarchy is:

1. h4 mechanism-aware certificate: strong internal proof candidate;
2. general continuation-echo sufficient theorem: mathematically plausible;
3. PEX-C4 continuation-capacity mechanism:
   promising on fresh h=7 subtargets;
4. prospective **formal** validation:
   blocked by residual certification, not by the sign pattern.

Do not retune H04-H06 and reuse them as holdouts.

No h=8.
