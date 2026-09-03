# PEX-C4 + L6 prospective certification battery H08-H11

**Date:** 2026-08-25  
**Status:** FIRST PROSPECTIVE INTERNAL-CERTIFICATE SUCCESS  
**Independent audit:** REQUIRED  
**h=8:** untouched  
**Novelty:** NOT_ESTABLISHED

---

# 1. Why this experiment matters

This was the first battery in which **both** sides of the proposed sign
criterion were frozen before the response was inspected:

1. PEX-C4 continuation-capacity mechanism lower bound;
2. L6 rigorous residual-tail certificate candidate.

The previous h=7 battery had frozen PEX-C4 but not yet had a completed
rigorous residual certifier.

This battery therefore tests the complete architecture in the intended order:

\[
\text{freeze target}
\to
\text{certify mechanism}
\to
\text{certify complement}
\to
\text{freeze sign prediction}
\to
\text{reveal response}.
\]

---

# 2. Freeze

Battery freeze SHA-256:

`36ea5e511975386180eb1be2d207a133aef6c1ab7f50cb65daa95acf244d12c8`

Targets used baseline \(L_6\), half-length \(h=7\), target width 14, and the
new positional predicate

\[
\boxed{x_0=x_2}.
\]

Profiles:

- H08: `(3,2,2)`
- H09: `(3,3,1)`
- H10: `(4,2,1)`
- H11: `(5,1,1)`

No PEX score or response was computed before the freeze.

---

# 3. Frozen internal certifier

The certifier was fixed in advance:

### PEX-C4 mechanism

- all oriented one-endpoint placements at lags 15 and 16;
- PEX-3 exclusion/equality signature;
- continuation-capacity fields
  \[
  (N_4(s),N_4(s_{\rm ref})).
  \]

### L6 residual certifier

- exact 1688-state S3 quotient;
- \(Q^{23}>0\);
- exact continuation vector \(Q^{300}1\);
- true-vs-proxy projective factor
  \[
  E<1+3\times10^{-27};
  \]
- common 40-step mass \(>0.988\);
- Dobrushin bound
  \[
  \tau(P^{40})<0.012;
  \]
- exact infinite response tail after lag 400
  \[
  <1.462\times10^{-12};
  \]
- frozen finite-prefix budget
  \[
  7.5\times10^{-4};
  \]
- frozen per-kernel allowance
  \[
  10^{-6};
  \]
- frozen target-probability allowance
  \[
  10^{-10}.
  \]

No constants were tightened after the targets were selected.

---

# 4. Certification stage before reveal

Certification-stage SHA-256:

`52736bf633a397281c3053596377227015ecfb7ac482282a46810a24d47fd3df`

The pre-reveal values were:

| Target | safe PEX-C4 echo lower | residual upper | criterion upper |
|---|---:|---:|---:|
| H08 | 0.000829872095 | +0.004085895473 | +0.003256023377 |
| H09 | 0.001518527630 | **−0.002562924199** | **−0.004081451829** |
| H10 | 0.000322603335 | **−0.001733087351** | **−0.002055690686** |
| H11 | 0.000036236768 | +0.000388679679 | +0.000352442911 |

Thus the frozen predictions were:

\[
\boxed{\text{H08: INCONCLUSIVE}}
\]

\[
\boxed{\text{H09: NEGATIVE\_CERTIFIED}}
\]

\[
\boxed{\text{H10: NEGATIVE\_CERTIFIED}}
\]

\[
\boxed{\text{H11: INCONCLUSIVE}}.
\]

Prediction freeze SHA-256:

`3aeab279f645e30c94867b6bcd38c5693fd8494977d06a46d1082af79a869e12`

At this point no H08-H11 full response derivative had been computed.

---

# 5. Response reveal

Only after the predictions were frozen, the full derivatives were computed
with a fresh true-Parry-chain reconstruction.

## H08

Frozen prediction:

`INCONCLUSIVE`

Revealed:

\[
A'_{H08}(0)
=
+0.00246150385946.
\]

Independent central finite-difference check:

\[
+0.00246150594205.
\]

H08 is positive.

## H09

Frozen prediction:

\[
\boxed{\text{NEGATIVE\_CERTIFIED}}
\]

Revealed:

\[
\boxed{
A'_{H09}(0)
=
-0.00487328143823
<0.
}
\]

Independent central finite-difference check:

\[
-0.00487328732172.
\]

The frozen negative certification was correct.

## H10

Frozen prediction:

\[
\boxed{\text{NEGATIVE\_CERTIFIED}}
\]

Revealed:

\[
\boxed{
A'_{H10}(0)
=
-0.00281395062792
<0.
}
\]

Independent central finite-difference check:

\[
-0.00281395415266.
\]

The frozen negative certification was correct.

## H11

Frozen prediction:

`INCONCLUSIVE`

Revealed:

\[
A'_{H11}(0)
=
-0.000397723136774.
\]

Independent central finite-difference check:

\[
-0.000397724020429.
\]

H11 is a false negative only in the colloquial sense of "not certified";
the protocol explicitly allows INCONCLUSIVE and made no positive claim.

Response-reveal SHA-256:

`2a590f559e9f1f27aebea71b48aab3033bba2f529190be2449b56f562e0a6d88`

---

# 6. Prospective outcome

Among the three negative revealed targets:

- H09 was prospectively NEGATIVE_CERTIFIED;
- H10 was prospectively NEGATIVE_CERTIFIED;
- H11 was INCONCLUSIVE.

Among the one positive revealed target:

- H08 was INCONCLUSIVE.

Therefore, in this small battery:

\[
\boxed{
2/2\text{ certified negative calls were correct}.
}
\]

and the frozen certifier captured

\[
\boxed{
2/3
}
\]

of the actually negative targets.

There were:

\[
\boxed{0\text{ false certified negative calls}.}
\]

This is a very small pilot sample and should not be converted into a
population-level precision/recall claim.

---

# 7. What has now been demonstrated

This is the first project experiment satisfying the complete intended causal
order:

\[
\boxed{
\text{unseen exact target}
\to
\text{response-blind combinatorial certificate}
\to
\text{rigorous-candidate residual budget}
\to
\text{negative sign certification}
\to
\text{correct response reveal}.
}
\]

The result is stronger than the earlier h4 design example and stronger than
the previous PEX-C4 h=7 battery, because the sign labels H09/H10 were frozen
before the answer was known.

---

# 8. What this does NOT establish

It does not yet establish:

- publication-grade rigorous proof, because the L6 certificate still awaits
  clean-room independent audit;
- novelty or priority;
- universal usefulness of PEX-C4;
- a complete sign classifier;
- a positive-response prediction theorem.

H11 shows that PEX-C4 remains conservative and incomplete.

The strongest safe statement is:

> **PEX-C4 + the L6 residual certifier achieved its first prospective
> internal-certificate successes on two previously unrevealed h=7 positional
> targets.**

---

# 9. Scientific interpretation

The evidence now supports a coherent chain:

\[
\text{finite forbidden-pattern structure}
\]

\[
\Downarrow
\]

\[
\text{continuation capacity }N_m
\]

\[
\Downarrow
\]

\[
\text{rigorous Parry transition enclosure}
\]

\[
\Downarrow
\]

\[
\text{delayed one-endpoint echo lower bound}
\]

\[
\Downarrow
\]

\[
\text{residual-tail certificate}
\]

\[
\Downarrow
\]

\[
\boxed{\text{prospective response-sign certification}.}
\]

This is the first evidence that the continuation-capacity mechanism is not
only a post-hoc explanation of h4/H02.

---

# 10. Current epistemic status

## h4 theorem line

**COMPUTER-ASSISTED PROOF CANDIDATE — INTERNAL CERTIFICATE PASSES —
INDEPENDENT AUDIT REQUIRED**

## general continuation theorem

**GENERAL SUFFICIENT CRITERION CANDIDATE — PROOF ARCHITECTURE WRITTEN —
INDEPENDENT AUDIT REQUIRED**

## PEX-C4 portable rule

**FIRST PROSPECTIVE INTERNAL-CERTIFICATE SUCCESSES: H09, H10**

## L6 residual certifier

**INTERNAL RIGOROUS CERTIFICATE CANDIDATE — PROSPECTIVELY USED SUCCESSFULLY —
INDEPENDENT AUDIT REQUIRED**

## novelty

**NOT_ESTABLISHED**

No h=8.
