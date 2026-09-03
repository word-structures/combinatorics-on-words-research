# Claims and evidence matrix — continuation-capacity variance-response paper

**Draft status:** pre-Claude / pre-canonical  
**Rule:** no statement moves to `PROVED` or `CERTIFIED` because this file says so. Canonical claim promotion requires independent audit and the repository governance process.

| ID | Statement | Proposed manuscript role | Current evidence | Current status | Required gate |
|---|---|---|---|---|---|
| C01 | \(a(\varepsilon)=\partial_t^2\mathcal P(0,\varepsilon)\) and \(a'(0)=\partial_\varepsilon\partial_t^2\mathcal P(0,0)\) with stated sign convention | background proposition | finite-matrix thermodynamic formalism | STANDARD / DERIVE EXPLICITLY | Claude derivation + primary source |
| C02 | \(c_k'=\dot\pi FP^kf+\sum_j\pi FP^j\dot PP^{k-1-j}f\) | analytic lemma | direct matrix differentiation | DIRECT PROOF CANDIDATE | clean-room derivation |
| C03 | one-endpoint identity \(\mathrm{Cov}(f_0f_k,1_G)=p_GK/q\) under \(S_q\) | central proposition | direct symmetry proof | DIRECT PROOF CANDIDATE | check indexing/centering |
| C04 | finite continuation partition gives \(K\ge\sum_B\mu_Bp_B^- - b\) | central lemma | conditioning inequality | DIRECT / ELEMENTARY | notation audit |
| C05 | \(Q_m=N_m(j)/N_{m+1}(i)\to P_{ij}\) | central bridge | Perron--Frobenius | KNOWN-METHOD CONSEQUENCE | primary-source positioning |
| C06 | \(Q_m/R_m\le P_{ij}\le R_mQ_m\) | central bridge | direct convexity proof | DIRECT PROOF | clean-room proof |
| C07 | \(\underline E_{\mathcal M}>C_{\rm rest}\Rightarrow a'(0)<0\) | general sign criterion | decomposition + C03/C04 | DIRECT PROOF CANDIDATE | audit mechanism bookkeeping |
| C08 | h4 local contribution \(>0\), full derivative \(<0\) | motivating result | multiple numerical routes | COMPUTATIONAL + CERTIFICATE CANDIDATE | audit exact definitions |
| C09 | h4 lags 9/10 dominated by one-endpoint channel | mechanism evidence | finite placement decomposition | COMPUTATIONAL FINITE-STATE FACT | independent reconstruction |
| C10 | h4 structural echo lower \(>0.03421029898\) | mechanism theorem instance | 750-cell structural certificate | INTERNAL PASS | interval/outward audit |
| C11 | h4 residual \(<0.01912964464\) | mechanism theorem instance | interval/tail certificate | INTERNAL PASS | independent verifier |
| C12 | h4 mechanism-aware upper \(a'(0)<-0.0060801278\) | headline theorem candidate | C10+C11+prefix | INTERNAL COMPUTER-ASSISTED PASS | clean-room audit |
| C13 | minimal L6 chain has 10128 states; S3 quotient 1688 | certificate infrastructure | exact enumeration | COMPUTED EXACT | independent constructor |
| C14 | L6 quotient \(Q^{23}>0\), entries 1..5981 | certificate infrastructure | exact integer power | INTERNAL EXACT | standalone verifier |
| C15 | L6 projective factor \(E<1+3e-27\) | certificate infrastructure | exact continuation residual + Birkhoff bound | INTERNAL RIGOROUS CANDIDATE | re-derive contraction inequality |
| C16 | \(\alpha_{40}>0.988\), hence \(\tau(P^{40})<0.012\) | certificate infrastructure | directed-down minorization | INTERNAL RIGOROUS CANDIDATE | audit IEEE/downward propagation |
| C17 | 13-block \(\tau_{13}(n)\le\tau_{11}(n-2)\) | certificate infrastructure | recoding argument | PROOF CANDIDATE | **high-priority clean-room proof** |
| C18 | response tail after lag 400 \(<1.462e-12\) | certificate infrastructure | rational staircase sum | INTERNAL RIGOROUS CANDIDATE | independently recompute |
| C19 | finite-prefix sensitivity budget \(7.5e-4\) valid | certificate infrastructure | conservative internal derivation | **WEAKEST L6 CERTIFICATE LINK** | formal inequality audit + executable verifier |
| C20 | PEX-C4 design rule fixed before H08-H11 | provenance | freeze/hash artifacts | HISTORICALLY PRESERVED | verify git/artifact timestamps/hashes |
| C21 | H09/H10 labeled NEGATIVE_CERTIFIED before reference derivative evaluation | prospective evidence | frozen prediction artifact | PRESERVED EXPERIMENTAL FACT | provenance audit |
| C22 | H09/H10 later reference derivatives are negative | prospective evidence | true-Parry + finite-difference cross-check | COMPUTATIONAL FACT | independent implementation desirable |
| C23 | PEX-C4 is a general useful predictor | not a current claim | tiny correlated battery | **NOT ESTABLISHED** | fresh families / theory |
| C24 | method is response-blind end-to-end | prohibited wording | residual computes response prefix | **FALSE / DO NOT CLAIM** | none |
| C25 | novelty/priority of continuation-echo framework | related-work claim | targeted search only | NOT_ESTABLISHED | specialist primary-source audit |

## Headline claim hierarchy for drafting

**Tier A — analytic/direct:** C03--C07.  
**Tier B — h4 computer-assisted theorem candidate:** C08--C12.  
**Tier C — scalable L6 certificate candidate:** C13--C19.  
**Tier D — prospective experimental evidence:** C20--C22.  
**Tier E — excluded from current claims:** C23--C25.

## Claims that must not be conflated

- hard deletion \(\neq\) finite soft penalty;
- local profile term \(\neq\) full response;
- response-blind mechanism lower bound \(\neq\) response-blind full certificate;
- prospectively frozen exact subtarget \(\neq\) fully independent new-family holdout;
- finite-difference cross-check \(\neq\) clean-room independent implementation;
- `INCONCLUSIVE` \(\neq\) positive prediction;
- standard Perron/Poisson/correlation machinery \(\neq\) novelty.
