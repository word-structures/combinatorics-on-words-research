# Profile Response Baseline for h=2...7

This capsule preserves a bounded finite-family computational observation of the profile-class response to hard-deletion transitions L_{h-1} -> L_h for h=2,...,7. This is an internally audited computational evidence package and establishes results for h=2...7 only.

NOVELTY_STATUS = NOT_ESTABLISHED.
(No universal law, proof for arbitrary h, predicting h8, or claims that B dominates universally are established by this finite data).

## Canonical Profile Universe
The exact occurring canonical half-Parikh profile-count vector is:
PROFILE_VECTOR = [2,2,1,3,3,4]
with TOTAL = 15.

Explicitly:

h=2:
    (1,1,0)
    (2,0,0)

h=3:
    (1,1,1)
    (2,1,0)

h=4:
    (2,1,1)

h=5:
    (2,2,1)
    (3,1,1)
    (3,2,0)

h=6:
    (2,2,2)
    (3,2,1)
    (4,1,1)

h=7:
    (3,2,2)
    (3,3,1)
    (4,2,1)
    (5,1,1)

## Observed Bounds
Using canonical B(v) = sum_i (v_i - h/3)^2, the 15 occurring profile classes divide computationally as:
- minimum-B classes:
    6 total
    6 with hard-deletion delta_a > 0
- all other occurring classes:
    9 total
    9 with hard-deletion delta_a < 0

## Numerical Method Claim Boundaries
- Method A:
    Poisson / Green-Kubo variance computation.
- Method B:
    independent moment-growth computation.
- Method C:
    pressure-curvature spot checks using the selected audited cases.
    (RUN3C originally computed 38 cases with max |A-C| ~ 1.45e-7 and max epsilon-scale spread ~ 3.11e-8, while this final durable verification selectively retains 6 pressure-curvature spot-check artifacts.)
- q_v:
    two independently implemented computations agree within the recorded numerical tolerance; and
    profile q_v masses partition the direct total deleted-edge Parry mass within the recorded numerical tolerance.

## SCC / Period Claim Boundaries
- UNIQUE_CYCLIC_COMPONENT_STATUS = PASS
- For h=5, profile (3,1,1):
    language infinite
    one relevant cyclic component / unique relevant component as supported
    period = 1

## Presentation Invariance
RUN3C originally tested presentation invariance with lambda diff = 0, a diff ~ 2.11e-14, and C diff ~ 1.80e-8. However, the durable certificate promoted here restricts its scope:
PRESENTATION_INVARIANCE_SCOPE = SPECTRAL_RADIUS_ONLY

## Historical Corrections
RUN2:
    rejected because the variance formula was incorrect.
    Correct variance:
        sigma^2 = 2<f,g>_pi - <f,f>_pi
    equivalently:
        sigma^2 = <f,f>_pi + 2<f,Pg>_pi
    with (I-P+Pi)g=f.

RUN3B:
    q_v target-index bug.
    Incorrect conceptual form:
        P_func(i, out[i].indexOf(j))
    Correct:
        P_func(i,j)
    where j is the target-state index.
    Therefore:
        RUN3B_QV_STATUS = SUPERSEDED

RUN3C:
    corrected numerical computation.
    RUN3C text/header incorrectly reported profile-count vector:
        [1,1,3,3,4,3]
    but later profile-identity repair established that this was a REPORTING-ONLY error.
    Correct vector:
        [2,2,1,3,3,4]

RUN3D / RUN3D2:
    independently repaired profile identity and confirmed the correct profile universe.

Durable RUN3C recovery:
    regenerated corrected evidence as actual persistent artifacts.

H8_RUN = NO
H8_BLINDNESS_BREACH = NO
