# Frozen Prospective Protocol — PEX-3 continuation-echo criterion

**Date frozen:** 2026-08-25  
**Status:** preregistration-style protocol for future non-h8 holdout  
**DO NOT MODIFY AFTER HOLDOUT RESPONSE IS KNOWN**

## Fence

No h=8 construction, enumeration, inspection, profiling, or response
calculation is permitted under this protocol.

## Input

A previously untested finite-state forbidden-pattern system satisfying:

- mixing finite-state baseline;
- ternary or \(S_q\)-symmetric alphabet action;
- \(S_q\)-invariant target event \(G\);
- finite target width \(W\);
- no prior response-sign calculation for that exact target.

## Prediction rule

1. Select **all oriented one-endpoint placements** at separations
   \(W+1\) and \(W+2\).
2. Use the fixed **PEX-3** context partition:
   - complete next-symbol exclusion signature for the baseline forbidden
     classes;
   - equality pattern of the last three context symbols relative to the
     reference color;
   - bit: fourth-from-last equals reference color;
   - bit: fourth-from-last equals third-from-last.
3. For each cell compute an interval lower transition floor.
4. Obtain \(\underline K_m\) and credit only positive lower bounds.
5. Compute
   \[
   \underline E_{\rm PEX}
   =
   \frac{2p_G}{q}
   \sum_m\max(\underline K_m,0).
   \]
6. Independently bound all omitted response terms by
   \(C_{\rm rest}\).
7. Record the prediction:
   - **NEGATIVE CERTIFIED** if
     \[
     \underline E_{\rm PEX}>C_{\rm rest};
     \]
   - **INCONCLUSIVE** otherwise.
8. Freeze all numbers and hashes.
9. Only then compute the full response sign for comparison.

## Prohibited tuning

After the holdout target is selected, do not:

- change \(W+1,W+2\) to different lags;
- add suffix features;
- increase suffix depth;
- discard unfavorable placements except through the predefined
  \(\max(\underline K,0)\) rule;
- change the exclusion signature;
- use the observed response to choose a context partition.

Any such change creates a new design protocol and invalidates the holdout.

## Required report

- target definition;
- baseline/target symmetry proof;
- PEX-3 cell counts;
- every \(\underline K_m\);
- \(\underline E_{\rm PEX}\);
- residual certificate;
- frozen prediction;
- response result revealed afterward;
- PASS / INCONCLUSIVE / FALSIFIED-IMPLEMENTATION status.

The first holdout should be deliberately chosen outside h=8.
