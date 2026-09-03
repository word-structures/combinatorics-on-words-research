# PEX-C4 Design Freeze

**Freeze date:** 2026-08-25  
**Status:** NEW DESIGN PROTOCOL — NOT YET PROSPECTIVELY VALIDATED  
**Design data:** h4, H01, H02 only  
**h=8:** forbidden / untouched

PEX-C4 supersedes PEX-3 only for future experiments.  It must not be used to
relabel H01/H02 as holdouts.

## Frozen context signature

Start with all PEX-3 fields:

1. complete append-color exclusion signature;
2. last-three equality pattern relative to reference color;
3. fourth-from-last equals reference bit;
4. fourth-from-last equals third-from-last bit.

Add exactly:

5. \(N_4(s)\): number of admissible length-4 continuations from the current
   state;
6. \(N_4(s_{\rm ref})\): number of admissible length-4 continuations after
   appending the reference color; use a fixed impossible sentinel if the
   reference color is forbidden.

No other feature may be added after a holdout response is seen.

## Frozen mechanism family

For target width \(W\):

- all oriented one-endpoint placements at separations \(W+1,W+2\).

## Decision rule

Compute lower kernels from cell transition floors and

\[
\underline E_{\rm PEX-C4}
=
\frac{2p_G}{q}
\sum_m\max(\underline K_m,0).
\]

Separately obtain a certified residual upper bound \(C_{\rm rest}\).

Predict `NEGATIVE_CERTIFIED` only if

\[
\underline E_{\rm PEX-C4}>C_{\rm rest}.
\]

Otherwise predict `INCONCLUSIVE`.

## Design-set evidence

- h4: original PEX structure already captures about 98.8% of positive kernel
  mass.
- H02: PEX-3 captures about 20.0%; PEX-C4 design refinement captures about
  98.4%.
- H01 positive control: depth-4 mechanism strength remains small.

These are design observations, not validation.

## Future validation

A fresh non-h8 target or battery must be frozen before:
- PEX-C4 score;
- residual calculation;
- response sign.

No tuning on that target afterward.
