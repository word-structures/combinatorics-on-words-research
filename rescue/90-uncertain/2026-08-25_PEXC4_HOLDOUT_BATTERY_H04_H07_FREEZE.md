# PEX-C4 Prospective Holdout Battery H04-H07 — FROZEN BEFORE ANY SCORE OR RESPONSE

**Freeze date:** 2026-08-25  
**Status:** PROSPECTIVE PILOT BATTERY FOR PEX-C4  
**Design rule:** `2026-08-25_PEXC4_DESIGN_FREEZE.md`  
**Absolute fence:** h=8 is forbidden and untouched.

## Why this battery

PEX-C4 was designed using:
- h4 profile (2,1,1);
- H01 h6 (2,2,2), x0=x1;
- H02 h6 (3,2,1), x0=x1.

Those are permanently design data.

The next untouched bounded half-length below h=8 is h=7.  This battery freezes
all four exposed h=7 profile classes in increasing imbalance order, each with
the same positional subevent.

No target may be replaced after seeing its PEX-C4 score or response.

## Baseline

\[
X=L_6,
\]

the ternary finite-state shift avoiding Abelian squares of half-lengths

\[
2,3,4,5,6.
\]

Target width:

\[
W=14.
\]

## Frozen targets

For every target, a newly completed 14-symbol block

\[
x_0x_1\dots x_{13}
\]

must:
1. be a 7-Abelian square;
2. have the specified canonical half-profile;
3. satisfy
   \[
   x_0=x_1.
   \]

Targets:

- **H04:** profile `(3,2,2)`, `x0=x1`
- **H05:** profile `(3,3,1)`, `x0=x1`
- **H06:** profile `(4,2,1)`, `x0=x1`
- **H07:** profile `(5,1,1)`, `x0=x1`

All target events are invariant under ternary color permutations.

The positional predicate is not reversal invariant, so both original and
reversed orientations must be treated explicitly.

## Frozen PEX-C4 rule

Mechanism placements:
- all oriented one-endpoint placements at separations
  \[
  W+1=15,\qquad W+2=16.
  \]

Context signature:
1. complete append-color exclusion signature for K=2,3,4,5,6;
2. last-three relative equality pattern;
3. fourth-from-last equals reference bit;
4. fourth-from-last equals third-from-last bit;
5. \(N_4(s)\): number of admissible length-4 continuations from current state;
6. \(N_4(s_{\rm ref})\): number of admissible length-4 continuations after
   appending the reference color, or a fixed impossible sentinel if forbidden.

For every cell use the minimum baseline Parry transition probability of the
reference color.

Compute

\[
\underline E_{\rm PEX-C4}
=
\frac{2p_G}{3}
\sum_m\max(\underline K_m,0).
\]

Separately bound the response complement by \(C_{\rm rest}\).

Prediction:
- `NEGATIVE_CERTIFIED` iff a certified
  \[
  \underline E_{\rm PEX-C4}>C_{\rm rest};
  \]
- otherwise `INCONCLUSIVE`;
- `EMPTY_TARGET` if the preregistered target has zero baseline mass.

There is no positive-sign prediction.

## Reveal order

1. Freeze this document and hash.
2. Compute PEX-C4 mechanism-only artifacts for H04-H07.
3. Attempt rigorous/conservative residual bounds without computing full response signs.
4. Freeze predictions and hashes.
5. Only then compute/reveal full response signs.
6. Preserve every result. No substitutions.

No h=8.
