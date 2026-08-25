# Claude Research Intake: Profile-Response Mechanism (2026-08-27)

## A. Exact repository state

canonical pre-doc-sync main:
`72e9403239712bc6813b66fc77c014bb793a51ea`

PR #54:
merged

profile-response evidence path:
`research/verification/profile-response-h2-h7-2026-08-25/`

(The documentation-sync branch is later than that frozen scientific baseline and does not change `MATH_CLAIMS.md`).

## B. Frozen scientific baseline

Profile count vector for h=2..7:

`[2,2,1,3,3,4]`

Total profile classes:

`15`

Profiles:

**h2:**
`(1,1,0)`
`(2,0,0)`

**h3:**
`(1,1,1)`
`(2,1,0)`

**h4:**
`(2,1,1)`

**h5:**
`(2,2,1)`
`(3,1,1)`
`(3,2,0)`

**h6:**
`(2,2,2)`
`(3,2,1)`
`(4,1,1)`

**h7:**
`(3,2,2)`
`(3,3,1)`
`(4,2,1)`
`(5,1,1)`

Canonical imbalance:

```
B(v) = sum_i (v_i - h/3)^2
     = [3 sum_i v_i^2 - h^2] / 3
```

Finite-family observation:

- all 6/6 minimum-B classes have `delta_a > 0`
- all 9/9 other classes have `delta_a < 0`

Scope:
- finite h=2..7 family only
- computational observation
- not universal
- not causal
- novelty NOT_ESTABLISHED

## C. h=7 frozen prereg result

valid = `37,698`
essential = `32,976`
lambda = `1.7776384757456016`
a ≈ `0.082823826517`
C = `1.1094410038856453`

Preregistered outcome:
MIXED

P1/P2/P5/P6 confirmed
P3/P4 out of range
F4 triggered

Do not promote h=7 into the published h=2..6 family.

## D. Correction provenance

Explicitly distinguish:

**RUN2:**
REJECTED

Reasons include:
- wrong asymptotic variance formula
- weak SCC ranking
- hard-coded SUCCESS
- governance breach
- novelty overclaim

**RUN3B:**
SUPERSEDED due to q_v target-index bug

**RUN3C:**
corrected numerical baseline

**RUN3D2:**
helper computeB used the wrong normalized scalar
`(3 sum v_i^2 - h^2)/(2h(h-1))`

Important:
this scalar is a positive fixed-h multiple of canonical B, so minimum-profile classification was unaffected, but it must not be reused quantitatively.

## E. Correct asymptotic-variance formula

```
sigma^2 = 2 <f,g>_pi - <f,f>_pi
```
where
```
(I - P + Pi) g = f
```
Equivalent form:
```
sigma^2 = <f,f>_pi + 2 <f, P g>_pi
```

## F. RUN3C verification baseline

variance formula PASS
edge-equivalence mismatches = `0`
profile classification mismatches = `0`
q_v Q1/Q2 diff = `0`
q partition residual = `0`

unique graph dominance PASS
minimum dominance margin = `0.002841`

h5 profile (3,1,1):
- infinite
- one cyclic SCC
- unique dominant SCC
- period 1
- lambda ≈ `1.25841`

Method A/B:
max diff = `3.12e-13`

delta A/B:
max diff = `4.01e-13`

Method C:
original RUN3C tested 38 cases
max |A-C| = `1.45e-7`
epsilon spread = `3.11e-8`

IMPORTANT durable-package distinction:
the durable promoted verification package retains only 6 pressure-curvature spot-check artifacts.

Do NOT collapse:
38 original tested cases
vs
6 durable retained checks

## G. Presentation invariance

RUN3C tested h3 presentation invariance numerically for:

`lambda`
`a`
`C`

Observed differences approximately:

lambda diff = `0`
a diff = `2.11e-14`
C diff = `1.80e-8`

BUT the durable certificate promoted in the canonical package restricts its claim to:

`PRESENTATION_INVARIANCE_SCOPE = SPECTRAL_RADIUS_ONLY`

Do not broaden the durable claim.

## H. Current theoretical synthesis

### H1. Established / derived
(Currently empty; mechanism is computed or hypothesized, not mathematically proven).

### H2. Computed observations
- 15-profile finite family (h=2...7)
- 6/6 minimum-B profiles have delta_a > 0
- 9/9 remaining profiles have delta_a < 0
- verified RUN3C numerical facts

### H3. Hypotheses / mechanism candidates

Current mechanism sketch:
```text
profile v
   ->
local composition geometry / S3 invariants
   +
temporal overlap / return / correlation structure
   ->
perturbed Perron-Parry chain
   ->
Green-Kubo / asymptotic-variance response
   ->
sign(delta_a)
```

Candidate S3 invariants / quantities include:

`B(v)`
`J(v) = product_i(v_i - h/3)`

Current interpretation:
B classifies the observed sign split perfectly over the 15-case family, but B is NOT yet established as causal.

The dynamical response may depend on quantities such as:

`T_v`
`D_v`
`eta_v`
`tau_v`
`Theta_v`

(If these definitions are not durable, they are candidate notation requiring audit).

## I. Literature status

### I1. Directly opened / repository-verified primary sources
(Currently empty for the profile-response mechanism).

### I2. Audit queue / research-report leads

The audit queue should include:

- Bóna, Maga & Richey 2026
- Guibas-Odlyzko correlation-polynomial literature
- Goulden-Jackson cluster method
- Parry/Perron measure foundations
- Cheriyath / Agarwal / Tikekar
- Chandgotia / Marcus / Richey / Wu
- Markov pressure / Poisson / Green-Kubo sensitivity
- Drazin / group inverse
- multivariate pattern correlation / cumulant literature

Novelty remains:
NOT_ESTABLISHED

Do not promote research-report leads to verified primary literature.

## J. Exact Claude tasks

Claude should NOT merely summarize. Ask for independent derivation and adversarial checking.

Tasks:

1. Independently derive the full-shift / unconstrained local composition response.
2. Determine exactly where B(v) enters and whether the first local composition term is proportional to B(v).
3. Analyze the role of the cubic S3 invariant J(v).
4. Independently derive the constrained asymptotic-variance response using Perron/Parry perturbation + Poisson/group-inverse/Green-Kubo methods.
5. Derive or identify a pattern-overlap / correlation-matrix formulation of the same response.
6. Determine whether the two formulations are mathematically equivalent.
7. Attempt to construct a decomposition of the form:
   `response(v) = local_term_h(v) + correlation_term(v)`
   or a more precise alternative.
8. Red-team the hypothesis: "B is causal" and search for reasons why B may only be a proxy for overlap dynamics.
9. Look specifically for a theorem strategy where a discrete B-gap plus a uniform bound on the correlation correction forces the sign.
10. Propose the smallest PREDECLARED h=2..7 mechanism experiment that can discriminate competing explanations.
11. Do NOT inspect, enumerate, construct, simulate, infer empirical data from, or otherwise compute h=8.

## K. Required Claude output

Require:

- theorem / lemma candidates
- assumptions written explicitly
- derivations
- exact points where proof fails
- possible counterexamples
- literature dependencies
- source gaps
- candidate mechanism decomposition
- smallest discriminating preregistered experiment
- explicit red-team section
- no novelty claim
- no h8 computation
- no repo mutation
