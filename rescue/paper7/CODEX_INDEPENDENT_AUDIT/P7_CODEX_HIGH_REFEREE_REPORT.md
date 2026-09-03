# Referee Report — Paper 7 v0.2

## Summary

| Item | Referee assessment |
|---|---|
| Claimed result | The explicit word `abacabadc` is a prefix of a right-infinite four-letter Abelian-square-free word but admits no one-letter left extension preserving Abelian-square-freeness. |
| Method | Iterate $F(V)=Cg_{85}(V)$ inside a prefix-and-residual invariant; reduce boundary obstructions to 99 geometries, 35 states, 17 recursive rows, and a 190-symbol base window. |
| Independent outcome | The theorem was independently reproduced. The paper is not ready for publication in its current form. |

## Correctness

| Question | Finding |
|---|---|
| Negative half | Correct. A fresh direct checker found the four stated Abelian squares in $as,bs,cs,ds$ and none in $s$. |
| Positive half | Correct subject to Keränen's established $g_{85}$ preservation theorem. |
| Finite reduction | Independently regenerated as exactly 99 seed rows, 35 states, and 17 recursive transitions. Submitted and reconstructed sets agree exactly. |
| Genericity | The proof applies to every $V$ in the stated invariant class, not merely to computed tower words. |
| Infinity step | Correct finite-factor argument from nested ASF prefixes. |

## Computer-assisted proof

| Component | Assessment |
|---|---|
| Arithmetic | Exact integer/fraction arithmetic is sufficient; no decision depends on floating point. |
| Submitted verifier | A valid finite certificate verifier for its encoded equations, but not an independent theorem reconstruction. |
| Independent verifier | Reconstructs the seed/state/transition sets without importing or parsing submitted verifier/CSV code or data. |
| Certificate equality | Exact set equality and StateID equality were checked after reconstruction. |
| Regression checks | $W_1$ and $W_2$ checks are correctly non-load-bearing. |

## Main proof risk

| Risk | Resolution |
|---|---|
| State quotient may forget word order | The equations depend only on $P(A)-P(B)$; order is irrelevant to this implication. |
| State quotient may forget image alignment | It does not: every legal $(h,r,k,t)$ is retained, including multiple alignments for the same target. |
| Recursive cycles may invalidate termination | A two-state SCC exists, but each realized edge decreases the first marked position by at least 79. |
| One observed base prefix may not cover arbitrary $V$ | The required hypothesis $C\preceq V$ fixes the first 190 symbols of every $Cg(V)$; the independent sufficient bound is 178. |
| Old v0.1 gap may persist | It does not. The corrected word-level residual and prefix condition directly remove the two old failure modes. |

## Novelty

| Axis | Referee assessment |
|---|---|
| Theorem novelty | No prior equivalent existence result found; `NOT_ESTABLISHED`. |
| Witness novelty | No external occurrence of `abacabadc` as this witness found; `NOT_ESTABLISHED`. |
| Infinite-construction novelty | No prior use of $C g(C)g^2(C)\cdots$ for this boundary problem found; `NOT_ESTABLISHED`. |
| Proof-method novelty | No prior 35-state residual/desubstitution certificate found; `NOT_ESTABLISHED`. |
| Overall | `NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`. |

## Relation to Keränen's question

| Item | Assessment |
|---|---|
| Primary wording | Keränen wrote that “the existence of such unfavorable factors remains an open question” ([primary 2010 PDF](https://content.wolfram.com/sites/19/2010/02/Keranen.pdf), opened 2026-09-03). |
| Formal implication | $s\in re(\mathcal A_4)\setminus le(\mathcal A_4)$ implies $s\in re(\mathcal A_4)\setminus e(\mathcal A_4)$ because $e\subseteq le$. |
| Classification | `STRONGER FORM OF A POSITIVE ANSWER`; no claim of strict logical separation is made. |

## Exposition

| Finding | Required revision |
|---|---|
| The core mechanism is introduced directly through dense symbolic equations. | Add one running word-level configuration showing $A,x,B,y,D$, the two image cuts, equation (5.4), its state row, a recursive alignment, and the decrease of $\mu$. |
| The reader cannot currently move from a CSV row back to the geometry. | Add a column-level dictionary and one reverse reconstruction from row to picture/positions. |
| The witness category is implicit. | Label the four left-death factors as paper-and-pencil verifiable witnesses and the full finite certificate as a machine-certified exact witness. |
| The prior-work sentence says the cited results concern words blocked on both sides. | Replace it with the precise distinction: the literature includes one-sided maximal terminology/constructions but does not provide the opposite-side infinite continuation proved here. |
| Appendix strings and filenames wrap awkwardly in the rendered PDF. | Use a smaller dedicated verbatim environment, discretionary breaks, or a supplementary-file table. |

## Reproducibility

| Item | Assessment |
|---|---|
| Submitted data | Small, readable, and exactly matched by the clean-room reconstruction. |
| Submitted verifier dependencies | Python standard library; favorable. |
| Data wiring | Weak: the verifier regenerates internally and does not validate the delivered CSV/JSON/manuscript copies. |
| Artifact identity | Two binary-different PDFs are shipped at outer and inner levels although all rendered pages are pixel-identical. Select and hash one canonical artifact. |
| Claims ledger | The new theorem and certificate claims are not registered in the repository's `MATH_CLAIMS.md`. This must be addressed under the project's human-approval protocol. |

## Major issues

| ID | Issue | Publication consequence |
|---|---|---|
| P7-001 | Author field remains `[author placeholders]`. | Submission blocker. |
| P7-002 | Submitted verifier prints a theorem-level certification beyond its executable scope. | Must be corrected to bounded obligation language. |
| P7-003 | No human-scale worked example exposes the residual certificate semantics. | Central proof is formally compact but not independently usable by a reader. |
| P7-004 | Delivered outer and inner PDFs have different hashes without a canonical-artifact declaration. | Release provenance is ambiguous. |
| P7-005 | Project claim-ledger requirements are not yet satisfied for the new theorem. | Repository/release governance blocker, not a mathematical refutation. |

## Minor issues

| ID | Issue | Required correction |
|---|---|---|
| P7-006 | The supplied verifier does not connect its generated data to shipped CSV/JSON/manuscript representations. | Add explicit comparisons or clearly state that CSVs are presentation-only. |
| P7-007 | Prior-work language overstates the two-sided focus of all cited maximal-word papers. | Narrow the sentence. |
| P7-008 | The finitely-branching-tree equivalence omits factoriality in the sentence stating it. | State “for a factorial language over a finite alphabet.” |
| P7-009 | Appendix strings and filenames break across lines. | Improve typesetting. |
| P7-010 | The verifier emits a replacement character for the dash on the tested Windows console. | Use ASCII output or configure UTF-8 explicitly. |

## Recommendation

| Decision | Rationale |
|---|---|
| `MAJOR REVISION` | I found no theorem-fatal gap and independently reproduced the finite kernel and universal closure. Revision is nevertheless major because the current artifact is not publication-ready and the computer-assisted proof must be presented with bounded scope, a reader-verifiable semantic bridge, canonical artifact identity, and corrected literature wording. |

## Closing claim table

| Claim | Source | Reproduced? | Matches? |
|---|---|---:|---:|
| Mathematical result | Independent reconstruction and primary external lemma | Yes | Yes |
| Novelty | September 2026 multi-channel search | Not certifiable by absence | Provisional only |
| Current manuscript ready for acceptance | Artifact, exposition, and governance audit | No | No |
