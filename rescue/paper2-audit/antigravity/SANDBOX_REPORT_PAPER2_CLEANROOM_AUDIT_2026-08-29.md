# Paper 2 Clean-Room Audit Report
**Date:** 2026-08-29
**Status:** Independent Clean-Room Audit

## 1. Soft-Response Theorem Spine (P2-B)
I audited the spine connecting local geometry to continuation capacity and variance response.
- **Continuation Capacity Lemma:** The substitution of the opaque Parry transition $P_{ij}$ with the combinatorial count ratio $Q_m = N_m(j)/N_{m+1}(i)$ bounded by the certified projective factor $R_m$ is exact. This perfectly bridges the forbidden-continuation tree to a rigorous probability enclosure.
- **Echo Sign Criterion:** The structural separation $A'(0) = R_{\mathcal{M}} + R_{rest}$ correctly splits the response. By only crediting certified negative contributions from the frozen PEX-3 placements ($\underline{E}_{PEX}$), the theorem securely guarantees $A'(0) < 0$ when $\underline{E}_{PEX} > C_{rest}$.

## 2. Shared Lemma Analysis (P2-C)
**Finding:** The proof architectures for the tail bounds are **genuinely distinct**.
- Paper 2 bounds $C_{rest}$ using time-domain real scalar correlation sums and Dobrushin contraction coefficients ($\tau_k$) applied to the unperturbed matrix $P$.
- Paper 3 bounds the blocked centered-return tail using frequency-domain (complex $z$) Banach-valued Cauchy estimates over resolvent matrices $B(t)^{-1}$.
**Recommendation:** Do NOT merge or cross-cite them as the same lemma. Keep Paper 2 in the time domain, as it preserves the physical intuition of "delayed lag correlation".

## 3. Analytic Upgrade Decision (P2-D)
**Verdict:** 2. Useful interpretation only.
While the resolvent/return generating function machinery from Paper 3 could technically compute the second derivatives for Paper 2, it would obscure the core scientific contribution of Paper 2: the combinatorial *continuation capacity* ($N_m$) and the lag-by-lag mechanism-aware $PEX-3$ echo. The time-domain Dobrushin approach should remain the primary method for Paper 2. The resolvent connection can be mentioned as an interpretation but should not replace the main theorem.

## 4. Novelty Classification (P2-E)
- **Generic Markov/Perron/Dobrushin bounds:** KNOWN.
- **Combinatorial Continuation Capacity Enclosure (Lemma 2):** NOVELTY_UNRESOLVED (Project-specific bridge).
- **Mechanism-Aware Portable Echo Criterion (PEX-3):** NOVELTY_UNRESOLVED (Project-specific).

## Verdict
**B. SOUND, BUT RETURN UPGRADE SHOULD STAY OPTIONAL.**
The mathematical spine is exact and rigorous. The explicit time-domain tail bound and the continuation capacity lemma fit the physical narrative perfectly.

