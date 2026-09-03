# P7 Manuscript v0.4 Claim Audit

**Date:** 2026-09-03  
**Theorem status:** `INDEPENDENTLY REPRODUCED`  
**Novelty status:** `NO PRIOR RESOLUTION FOUND - NOVELTY PROVISIONAL`

The four allowed classifications below identify the source of support. Finite checks state their exact bounded objects; they are not external validation.

| Major claim | Classification | Evidence and exact scope |
|---|---|---|
| `abacabadc` is Abelian-square-free | `FINITE CERTIFICATE` | Direct definition check of every factor of the 9-symbol word; no violation found. |
| No letter can precede `abacabadc` while preserving ASF | `PROVED IN TEXT` | Four explicit paper-and-pencil verifiable Abelian-square witnesses. |
| $s\notin le(\mathcal A_4)$ | `PROVED IN TEXT` | One-step left death excludes every nonempty left extension. |
| $g_{85}$ maps every finite ASF word to an ASF word | `EXTERNAL THEOREM` | Keränen 1992, DOI 10.1007/3-540-55719-9_62; opened primary text records that the morphism itself is a-2-free. |
| The displayed incidence matrix has determinant 43435 | `FINITE CERTIFICATE` | Recomputed exactly from all four 85-symbol images with integer arithmetic. |
| Every crossing square with half-period at least 85 induces a seed state | `PROVED IN TEXT` | Equation (5.4) derives the complete finite parameterization. |
| The seed enumeration contains 99 rows and 35 unique states | `FINITE CERTIFICATE` | Author verifier and independent clean-room reconstruction agree exactly; no missing, extra, or duplicate rows. |
| Every recursive residual alignment desubstitutes to a state in $Q$ | `PROVED IN TEXT` | Equation (6.1) and the exhaustive alignment parameterization. |
| The recursive relation contains 17 rows and closes in $Q$ | `FINITE CERTIFICATE` | Exact independent reconstruction; all 17 submitted rows match and zero source states lie outside $Q$. |
| Every realized recursive transition decreases occurrence position | `PROVED IN TEXT` | $a=\lfloor(j-11)/85\rfloor<j$. |
| Minimum exact descent margin is 79; no realized transition is nondecreasing | `FINITE CERTIFICATE` | Exact integer evaluation of all 17 reconstructed rows. |
| The state-only graph has exactly one two-state cyclic SCC | `FINITE CERTIFICATE` | Exact SCC enumeration on the 35-state/17-row directed graph. |
| A prefix of length 178 covers every short/nonrecursive case | `PROVED IN TEXT` | Bounds are 178 for short crossings, 23 for a first mark in $C$, and 169 for same-block residuals. |
| The conservative 190-symbol base window contains no ASF or residual violation | `FINITE CERTIFICATE` | Direct scan of the fixed 190-symbol prefix of $Cg(C)$. No minimality claim is made for 190. |
| $C$ belongs to the corrected invariant class | `FINITE CERTIFICATE` | Direct checks of the 11-symbol word for ASF and all 35 residual states, plus its tautological prefix property. |
| $V\in\mathcal C^*$ implies $Cg(V)\in\mathcal C^*$ | `PROVED IN TEXT` | Exhaustive internal/short-crossing/long-crossing and nonrecursive/recursive residual case split. |
| Every $W_n$ is ASF and $W_\infty$ is ASF | `PROVED IN TEXT` | Invariant induction followed by the finite-factor argument for the nested limit. |
| $s\in re(\mathcal A_4)\setminus le(\mathcal A_4)$ | `PROVED IN TEXT` | Explicit right-infinite ASF extension plus left death. |
| $re(\mathcal A_4)\setminus e(\mathcal A_4)\ne\varnothing$ | `PROVED IN TEXT` | Main theorem and $e(\mathcal A_4)\subseteq le(\mathcal A_4)$. |
| Keränen posed the one-sided unfavorable-factor phenomenon as open | `HISTORICAL / NOVELTY CLAIM` | Keränen 2010 primary source, DOI 10.3888/tmj.11.3-4, opened 2026-09-03. |
| No prior equivalent resolution was found through 2026-09-03 | `HISTORICAL / NOVELTY CLAIM` | Primary-source, forward-citation, and alternate-term search; closed citation indexes were not exhaustively accessible. |
| The theorem has priority or a demonstrated logical separation from all prior work | `HISTORICAL / NOVELTY CLAIM` | Not claimed. Novelty remains provisional; only the stated implication to Keränen's phenomenon is used. |

## Rejected provenance

| Item | Classification | Status |
|---|---|---|
| v0.1 36-state proof package | `FINITE CERTIFICATE` | Rejected: malformed residual semantics and false prefix-free closure; $V=b$ gives boundary `bb` in $Cg(b)$. It is not evidence for v0.4. |

## Final support table

| Claim | Source | Reproduced? | Matches? |
|---|---|---:|---:|
| Main theorem | Text proof + finite certificate + Keränen external theorem | Yes | Yes |
| 99 -> 35 -> 17 reduction | Clean-room reconstruction | Yes | Yes |
| Historical novelty | Literature audit | Not provable by search | Provisional only |
