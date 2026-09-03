# PAPER 8 STATE — theorem checkpoint v2

PAPER8_STATUS = ACTIVE_RESEARCH_CANDIDATE
DATE = 2026-09-03
NOVELTY_STATUS = NOT_ESTABLISHED
H8_STATUS = EXPLORATORY_DISCOVERY
H8_FUTURE_BLIND_HOLDOUT = FORFEITED
H9_OPENED = NO

## Main scientific question

How does Parikh-profile geometry, together with the background symbolic dynamics and pattern-return structure, determine the response of asymptotic letter-count variance when one Abelian-square profile is penalized or deleted?

## Mechanism now supported

The working architecture is

`Parikh geometry -> S3 representation split -> Perron/Parry dynamics -> low-rank return kernel -> variance susceptibility`.

Key exact/local formulas retained from prior work include

\[
L_h(v)=q_v\left(V_{2h}(L_{h-1})-\frac43B(v)\right)
\]

and the full-shift specialization

\[
L_h(v)=\frac49q_v(h-3B(v)).
\]

At `t=0`, S3 symmetry splits the relevant transfer dynamics into trivial and standard representations; the letter-imbalance observable lives in the standard representation.

## H8 profiles and hard responses

- `(3,3,2)`: positive hard response.
- `(4,2,2)`: negative hard response.
- `(4,3,1)`: negative hard response.
- `(5,2,1)`: negative hard response.

The finite H2–H8 minimum-B sign split is 19/19, but remains a bounded finite observation.

## First continuum certificate

THEOREM_ID = P8-H8-521-CONTINUUM-SIGN-1
PROFILE = (5,2,1)
STATUS = COMPUTER_ASSISTED_THEOREM_PASS
INDEPENDENT_EXTERNAL_AUDIT = PENDING

Certificate components:

- exact L=180 Bernstein/subdivision positivity;
- `C_180(x) > 5.499062597288395` on `[0,1]`;
- complete 460-interval forward/reverse 36-step minorization cover;
- observed certified global `alpha_36 > 0.8905641208011343`;
- theorem deliberately uses exact `alpha=89/100`, `tau=11/100`;
- conservative finite-to-infinite tail `<0.3208964539844447`;
- resulting `C_521(x) > 5.178166143303951`.

Thus the internally audited certificate implies `C_521(x)>0` for every `x in [0,1]`, hence `a(x)` increases from hard deletion to baseline and `Delta_a(5,2,1)<0`.

## Next priorities

1. Independent red-team audit of theorem 521 source code and tail lemma.
2. Port the same proof architecture to `(4,3,1)` (low-rank return structure 73/146; S3-orbit averages are especially favorable).
3. Then `(4,2,2)`.
4. Last, the difficult positive profile `(3,3,2)`.
5. Only after mechanism predictions are frozen should a new h-level be considered.
