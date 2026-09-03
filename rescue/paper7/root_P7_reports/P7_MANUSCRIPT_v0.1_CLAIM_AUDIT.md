# MANUSCRIPT CLAIM AUDIT

| Major Claim | Manuscript Section | Audit Classification | Justification |
| :--- | :--- | :--- | :--- |
| $\mathcal{A}_4$ is infinite | 1. Introduction | `EXTERNAL CITATION` | Keränen (1992) established the 85-uniform morphism proving this. |
| $e(L) \subseteq le(L)$ | 2. Preliminaries | `PROVED IN PAPER` | Follows trivially from factorial language definition requiring both sides vs one side. |
| $L_1(s) = \emptyset$ | 3. The Left-Maximal Witness | `PROVED IN PAPER` / `SUPPORTED BY CERTIFICATE` | The 4 rows in Lemma 1 are explicit and human-verifiable, backed by the `LEFT_DEATH_CERTIFICATE.json` data. |
| $s \notin le(\mathcal{A}_4)$ | 3. The Left-Maximal Witness | `PROVED IN PAPER` | Immediate consequence of $L_1(s) = \emptyset$. |
| $W_\infty$ is well-defined | 4. The Right-Infinite Construction | `PROVED IN PAPER` | $W_n \prec W_{n+1}$ is algebraically proven in text due to prefix concatenation. |
| Completeness of 36 Residual States | 5. Residual-State Lemma | `PROVED IN PAPER` / `SUPPORTED BY CERTIFICATE` | Parametrization over all boundaries $(o_{\text{mid}}, o_{\text{end}})$ covers all geometries. Evaluated exhaustively in `RESIDUAL_STATES.csv` and `RESIDUAL_TRANSITIONS.csv`. |
| Descent Inequality ($\mu' < \mu$) | 6. Strict Descent and Finite Certificate | `PROVED IN PAPER` | $\mu \le (|U| - 11) / 85$ strictly bounds the preimage length. |
| Finite Base Cases avoid 36 states | 6. Strict Descent and Finite Certificate | `SUPPORTED BY CERTIFICATE` | Checked by `verify_p7_main_theorem.js` on `BASE_CASES.json` up to $|U| \le 190$. |
| $s \in re(\mathcal{A}_4) \setminus le(\mathcal{A}_4)$ | 7. Main Theorem | `PROVED IN PAPER` | Conclusion of inductive limit $W_\infty$ and Lemma 1. |
| Keränen Open Question Relationship | 9. Relation to Previous Work | `EXTERNAL CITATION` | Verified against Keränen 2010 ("unfavourable factors"). |
| Shur Growth Rates | 9. Relation to Previous Work | `EXTERNAL CITATION` | Verified against Shur (2008+). |
| Minimal possible witness length | 10. Discussion | `DISCUSSION / OPEN QUESTION` | Explicitly marked as future work. No minimality claims made. |

**Audit Result:** No major claims have status `UNSUPPORTED`. All mathematical deductions map properly to the frozen certificate and external citations.

**Final Status:** `MANUSCRIPT v0.1 GENERATED — CLAIM AUDIT PASS`
