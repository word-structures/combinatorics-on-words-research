# PAPER 8 STATE — theorem checkpoint v4

Date: 2026-09-03

## Canonical H8 continuum state

| profile | B | continuum C sign | hard Delta_a sign | status |
|---|---:|---|---|---|
| (3,3,2) | 2/3 | negative | positive | COMPUTER_ASSISTED_THEOREM_PASS |
| (4,2,2) | 8/3 | positive | negative | COMPUTER_ASSISTED_THEOREM_PASS |
| (4,3,1) | 14/3 | positive | negative | COMPUTER_ASSISTED_THEOREM_PASS |
| (5,2,1) | 26/3 | positive | negative | COMPUTER_ASSISTED_THEOREM_PASS |

The four susceptibility functions are additionally certified in strict pointwise order over the entire soft path:

`C_332 < C_422 < C_431 < C_521`.

This ordering agrees with the B ordering **inside this four-profile H8 family**. No universal B-order theorem is claimed.

## Exact finite-context monotonicity

At the certified radii:

- 332: L=220
- 422: L=220
- 431: L=220 upgrade (the v3 sign certificate used L=176)
- 521: L=180

all exact finite-context susceptibility functions satisfy `C_L'(x)>0` on `[0,1]` by global Bernstein coefficient positivity.

This is an exact finite-context result. Infinite-context monotonicity remains unclaimed.

## Independence upgrades in v4

- 332 L220 exact polynomial: outgoing-edge modular DP agrees coefficient-by-coefficient for four primes; independent dense-resolvent comparison max error < 2e-9; independent integer monotonicity check passes.
- 431 L220 exact polynomial: outgoing-edge modular DP agrees coefficient-by-coefficient for four primes; its graph/sizes are byte-identical to the v3 mixing-cover graph.
- 521 L180 exact polynomial: new outgoing-edge modular DP agrees coefficient-by-coefficient for four primes.
- 422 retains the independent modular cross-check preserved in v3.

## Deliberately open

- fully directed-rounding / ball-arithmetic replay of interval covers;
- independent proof audit of the common `4 K tau^B` tail lemma;
- external code review / replay;
- novelty / subsumption relative to the literature;
- any universal minimum-B theorem;
- any universal susceptibility-ordering theorem beyond this H8 family;
- infinite-context monotonicity in x;
- H9: NOT RUN.
