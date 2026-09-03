# Paper 7 v0.2 — Final Hostile Independent Audit

Audit date: 2026-09-03  
Auditor posture: untrusted submission; attempted falsification before comparison with prior conclusions.  
Mathematical computation status: `LEVEL_1_INTERNAL_CHECKSUM`; external-source statements are separately identified as opened primary sources.

## Final verdicts

| Axis | Exact verdict | Basis |
|---|---|---|
| Mathematical theorem | `THEOREM INDEPENDENTLY REPRODUCED` | A clean-room implementation independently derived the load-bearing $99\to35\to17$ reduction; an exact universal case split establishes generic closure; left death and the finite-to-infinite step were independently checked. |
| Novelty | `NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL` | Primary-source and forward/alternate-term searches found the question but no prior resolution; coverage limitations prevent stronger language. |
| Manuscript | `MAJOR REVISION` | The theorem survives, but publication metadata, computer-proof scope language, ledger/provenance integration, and human-readable exposition require material repair. |
| Relation to Keränen's question | `STRONGER FORM OF A POSITIVE ANSWER` | The construction gives a right-infinite extension and the stronger local obstruction of no legal one-letter left extension; “strictly stronger” is not claimed. |

## Package custody, category order, and hashes

| Item | Result |
|---|---|
| Submitted ZIP | `P7_v0.2_FULL_PACKAGE_2026-09-03.zip` |
| Submitted ZIP SHA-256 | `CF7863A17E3504E59CC224DF9B13551AC1615E7F7006E0EC9CAAE732850C2443` |
| Category A read first | Manuscript source/PDF, morphism JSON, state/seed/transition CSVs, verifier, and base definitions |
| Category B read later | Prior claim audit, independent red-team report, and README conclusions |
| Original package modified | No |
| New root-level files | None |

| Load-bearing inner-package file | SHA-256 |
|---|---|
| `G85.json` | `14691275141D683807AF260B635D0F4C7EDBEE57EA9B1EC39DB85897FD1FDCD2` |
| `P7_MANUSCRIPT_v0.2.md` | `E261074008DA5B8612A4FF317575AE980CB4462CA0E9C980D39C9F9E09BDFDC8` |
| `P7_MANUSCRIPT_v0.2.tex` | `B253748401C538305624FBE2B56016CC5426992E71B3D465464E55C63BA5D71D` |
| `P7_MANUSCRIPT_v0.2.pdf` | `6FE6E57A4419419BE281207FDC9DBC04A894436E86CEE2CC81385AEC03D5DC62` |
| `P7_V2_SEED_ROWS.csv` | `FB1879AA08D54933049F73366FAB8244C9764E9B1E38E32DA05B389518123B67` |
| `P7_V2_RESIDUAL_STATES.csv` | `26CD658E2A3D67F094475F58AE982EAC697EC03BCFC57676C12D352229B0211A` |
| `P7_V2_RECURSIVE_TRANSITIONS.csv` | `83CC904E798659BA534C8CCB90943AE4E3A473478C08F25CB6A0F43F6011C41D` |
| `verify_p7_main_theorem_v2.py` | `BF03AEFBAF512224916592D693CD2B1D7B57861C5A3ED2931FD2BA930C12AB29` |

The outer and inner manuscript PDFs are binary-different: outer SHA-256 `A6BD50B1CD62BC25AED39355E03A6AD761253CC3FC79683BBE118AE90ED116B2`, inner SHA-256 `6FE6E57A4419419BE281207FDC9DBC04A894436E86CEE2CC81385AEC03D5DC62`. Both have eight letter-size pages and identical metadata timestamps. Rendering both at 120 dpi produced pixel-identical page images on all eight pages. The suspected visible defect is therefore `DISPROVED`; the unresolved defect is release identity/provenance.

## Definitions and quantifiers

Shur defines

$$
re(L)=\{W\in L:\forall n\in\mathbb N\;\exists V\in\Sigma^+,\ |V|\ge n,\ WV\in L\},
$$

with the symmetric definition of $le(L)$, and

$$
e(L)=\{W\in L:\forall n\in\mathbb N\;\exists U,V\in\Sigma^+,\ |U|,|V|\ge n,\ UWV\in L\}.
$$

The primary text says, “Obviously, re(L) ∩ le(L) ⊇ e(L)” ([Shur 2008, p. 650](https://doi.org/10.1051/ita:2008021), opened 2026-09-03).

| Quantifier audit | Result |
|---|---|
| $e(L)\subseteq le(L)$ | Immediate for every language, not only factorial languages: discard the right witness $V$ from each quantified pair. |
| Explicit infinite extension $\Rightarrow re(\mathcal A_4)$ | Every finite prefix of the infinite continuation supplies an arbitrarily long finite extension. |
| Arbitrarily long finite extensions $\Rightarrow$ compatible infinite extension | Valid for a factorial language over a finite alphabet: the tree of continuations is prefix-closed, finitely branching, and arbitrarily deep; König's lemma supplies an infinite branch. |
| Route used for $s$ | The proof constructs an explicit $W_\infty$ beginning with $s$; it does not infer infinity from sampled finite survival. |

## Independent mathematical audit

| Obligation | Result | Evidence |
|---|---|---|
| $s$ is ASF | No violation found in all factors of the 9-symbol word | Fresh direct Parikh checker |
| Left death | All four prepended words fail | Exact witnesses are recorded in `P7_CODEX_HIGH_CERTIFICATE_RECONSTRUCTION.md` |
| $C$ is ASF | No violation found in all factors of the 11-symbol word | Fresh direct checker |
| Morphism transcription | Four 85-symbol images, correct alphabet, cyclic relation | Clean-room checks plus post-reconstruction equality against JSON/verifier/MD/TeX |
| External preservation theorem | Verified | Keränen's primary abstract explicitly states preservation for every ASF input word, not merely a fixed point |
| Tower | Lengths $11,946,80421$; nested prefixes; algebraic expansion agrees | Independent generation |
| Crossing geometries | 99 | Derived from the exact boundary equation before loading submitted CSV |
| Residual states | 35 | Unique states from the 99 clean-room rows |
| Recursive transitions | 17 | All legal image-letter offsets independently enumerated |
| State quotient | Survives hostile audit | Internal order cancels under Parikh additivity; every distinct alignment is retained; nonrecursive geometries have separate exhaustive base treatment |
| Exact descent | Minimum margin 79; no nondecreasing occurrence transition | Exact integers over all 17 rows |
| State graph cycles | One two-state SCC | Harmless under strict occurrence-position descent |
| Base threshold | Independent sufficient length 178 | Submitted 190 window is safe with 12-symbol slack |
| Base contents | No Abelian square or $Q$-occurrence in all relevant factors of the 190-symbol prefix | Fresh direct checks |
| $C\in\mathcal C^*$ | Yes | Prefix, ASF, and residual avoidance all checked |
| Generic closure | Yes | Exhaustive internal/short-crossing/long-crossing and nonrecursive/recursive residual case partition |
| Infinite limit | Yes | Formal induction and finite-factor contradiction, not empirical extrapolation |

## Falsification attempts

| Written kill criterion | Attack | Outcome |
|---|---|---|
| A boundary square with $K\ge85$ is not represented by the seed equation | Independently enumerated every $(i,x,r,y,t)$ and solved with exact adjugate arithmetic | No omitted geometry found; 99 rows match exactly |
| A distinct-block residual alignment yields a source outside $Q$ | Enumerated every legal letter-offset alignment for every reconstructed state | Zero source states outside $Q$ |
| $(q,x,y)$ forgets order or alignment needed later | Compared the symbolic expansion for arbitrary $A,B$ and retained every alignment separately | No missing dependence; three multiply aligned targets remain explicit |
| A recursive path can cycle without decreasing | Found SCCs and evaluated exact occurrence-position descent per transition | One state-only cycle exists, but each realized edge descends by at least 79 |
| A nonrecursive case can occur beyond the submitted window | Derived absolute position bounds from $\sum q=2j+1-k$ | Common sufficient prefix length is 178; 190 is safe |
| The old prefixless invariant is still being used implicitly | Tested $V=b$ and audited every use of $C\preceq V$ | Old class fails by boundary `bb`; corrected class excludes it and fixes the base prefix |
| Finite regressions are substituted for infinity | Removed $W_1/W_2$ from the logical chain and reconstructed universal closure | Induction remains complete without regression extrapolation |

## v0.1 failure and v0.2 repair

| Question | Finding |
|---|---|
| Why the 36-state kernel failed | Its residual expression cancelled its own prefix and could not have the positive coordinates present in its table; its prefixless generic closure was also false. |
| Concrete counterexample | $V=b$ is ASF and passes the vacuous old residual condition, while $Cg(b)$ contains `bb` at zero-based start 10. |
| Does v0.2 merely relabel the old argument? | No. It replaces the malformed residual by $V=A x B y D$, $q=P(A)-P(B)$, and adds the essential $C$-prefix invariant. |
| Is stale 36-state evidence needed? | No. The new finite system was regenerated without reading v0.1 or the submitted v0.2 tables. |

## Supplied verifier obligation table

| Obligation | Actually checked? | How? | Complete? |
|---|---:|---|---:|
| G85 consistency across files | No | Images are hard-coded; JSON/CSV/manuscript are not compared | No |
| External G85 preservation theorem | No | Printed as a subject-to assumption | No; correctly external |
| Left death | Yes | Direct Abelian-square witnesses | Yes |
| 99-row completeness | Yes, relative to its encoded equation | Exhaustive parameter loops and exact integer solve | Yes after the equation is justified mathematically |
| 35-state completeness | Yes, relative to seed enumeration | Deduplication of generated states | Yes |
| 17-transition completeness | Yes, relative to state/alignment model | Exhaustive offsets and exact solve | Yes after the transition equation is justified |
| Transition equations | Computed, not independently derived | Hard-coded vector equation | Internally consistent |
| Strict descent | No | No complexity or margin calculation | No |
| 190-base contents | Yes | Direct square/state scan of one fixed prefix | Yes for that word |
| 190-base completeness | No | Does not derive why all short cases share that prefix | No |
| $C\in\mathcal C^*$ | Yes | Direct ASF and state-occurrence checks | Yes |
| Generic invariant closure | No | No universal object or exhaustive proof case split is executable | No |

| Classification | Verdict |
|---|---|
| `DATA CONSISTENCY CHECKER` | Too weak a label: it does regenerate certificate data internally. |
| `CERTIFICATE VERIFIER` | Correct label for the submitted program, limited to its encoded finite obligations. |
| `INDEPENDENT THEOREM RECONSTRUCTION` | Incorrect for the submitted program; this role is instead filled by the separate clean-room code plus the mathematical reconstruction report. |

The final line `THEOREM LOGIC CERTIFIED ...` is stronger than the program's actual checks and violates the repository's bounded-claim language discipline. It should be replaced by a precise list of the finite obligations checked and the external/prose obligations not checked.

## Primary-source and novelty audit

| Source or search channel | Primary finding | Short source text or outcome |
|---|---|---|
| Keränen 1992, ICALP, [DOI](https://doi.org/10.1007/3-540-55719-9_62) | $g_{85}$ preserves ASF inputs | “the morphism g itself is a-2-free” |
| Shur 2008, RAIRO, [primary PDF](https://numdam.org/item/10.1051/ita%3A2008021.pdf) | Exact $re,le,e$ quantifiers and inclusion | “Obviously, re(L) ∩ le(L) ⊇ e(L).” |
| Keränen 2010, Mathematica Journal, [primary PDF](https://content.wolfram.com/sites/19/2010/02/Keranen.pdf) | One-direction unbounded extension was open | “the existence of such unfavorable factors remains an open question” |
| Cummings–Mays 2001, EJC, [primary PDF](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v8i1r27/pdf/) | Finite maximal constructions | “We construct Abelian square-free finite strings which are maximal” |
| Bullock 2004, EJC, [primary PDF](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v11i1r17/pdf/) | Left/right maximal terminology and finite bounds | “A word w is left-maximal if”; no right-infinite/left-dead theorem located |
| Korn 2003, [DOI](https://doi.org/10.1016/S0097-3165(03)00016-5) | Short finite maximal constructions | “cannot be extended to the left or right”; no right-infinite/left-dead theorem located |
| Carpi 1998, [journal abstract](https://www.sciencedirect.com/science/article/pii/S0166218X9788002X) | Exponential growth and uncountably many infinite ASF words | “number of Abelian square-free words of each length grows exponentially” |
| Fici–Puzynina 2022/2023, [DOI](https://doi.org/10.1016/j.cosrev.2022.100532), [arXiv](https://arxiv.org/abs/2207.09937) | Broad modern survey checked | “We survey known results and open problems”; no equivalent resolution surfaced |
| Crossref | Queries for exact and alternate terminology | No equivalent resolution surfaced; raw responses retained under `tmp/` |
| Semantic Scholar and OpenAlex | Forward search from Keränen 2010 | Sparse citation records; no equivalent resolution surfaced |
| arXiv, journal databases, author pages, thesis search | Alternate terms including crucial/premaximal/left-maximal/right-infinite | No equivalent resolution surfaced |

Coverage limitation: direct Google Scholar, Scopus, and Web of Science result sets were not available. Model recall and agreement are not novelty evidence. The model may reconstruct prior structure without recoverable provenance. Accordingly, all four novelty axes remain `NOT_ESTABLISHED` even though no prior resolution was found.

## Keränen question formalization

| Item | Formalization |
|---|---|
| Keränen's requested phenomenon | An ASF word that is unfavorable—cannot be embedded with arbitrarily long contexts on both sides—yet is unboundedly extendable in at least one direction; in Shur notation, an element of $(re(\mathcal A_4)\cup le(\mathcal A_4))\setminus e(\mathcal A_4)$. |
| Paper 7 result | $s\in re(\mathcal A_4)\setminus le(\mathcal A_4)$. |
| Logical comparison | Since $e\subseteq le$, Paper 7 implies $s\in re\setminus e$. In addition, $s$ has no legal one-letter left extension, stronger local information than failure of unbounded left extension. |
| Classification | `STRONGER FORM OF A POSITIVE ANSWER` |

## Manuscript hostile audit

| Target word or claim | Finding |
|---|---|
| “complete” / “all” | Mathematically supported for the 99, 35, 17, and base partitions after clean-room reconstruction. The manuscript should expose one human-scale row so a reader can see the completeness map rather than infer it from files. |
| “preserves” | Supported by the opened Keränen primary source. |
| “therefore” | The finite-to-infinite implications are valid; the tree-equivalence sentence should explicitly retain factoriality. |
| “open” | Supported for Keränen 2010; the present-day claim is appropriately provisional. |
| “stronger” | Logically defensible as written; the manuscript correctly avoids “strictly.” |
| Prior-work sentence | “Those results concern words blocked on both sides” is overbroad because the cited papers explicitly define and discuss one-sided maximality, although their headline constructions are finite maximal words and do not provide the asymmetric infinite continuation. |
| v0.1 residue | No 36-state proof dependency found; Appendix B correctly supersedes it. |
| Visual artifact | Eight pages are readable with no clipping, overlap, or missing glyphs. Appendix morphism strings and file names wrap poorly across lines. |
| Human comprehension | No sustained worked residual occurrence bridges word positions, image cuts, equation (5.4), a state row, a transition row, and descent. This is the main exposition defect. |

## Scores

| Axis | Score / 10 | Explanation |
|---|---:|---|
| Theorem correctness confidence | 9.2 | Independent exact reconstruction and universal closure succeeded; the remaining dependency is the established external Keränen theorem rather than an observed internal defect. |
| Completeness proof quality | 8.7 | The case partition is exhaustive and the 178/190 bounds are explicit; the manuscript needs a clearer semantic bridge for human verification. |
| Clean-room reproducibility | 9.3 | Standard-library code regenerates all counts, rows, digests, descent, and base checks without reading submitted certificates. |
| Certificate transparency | 7.4 | CSVs are small and exact, but the submitted verifier does not consume them and overstates its theorem-level scope. |
| Novelty evidence | 7.0 | Primary sources, forward indexes, databases, survey, theses, and alternate terminology were searched; important closed indexes remain unavailable. |
| Significance if novel | 8.0 | It resolves a specifically posed one-sided extension phenomenon with an explicit short witness and constructive infinite continuation. |
| Manuscript exposition | 5.5 | The formal proof is compact, but the central residual mechanism lacks a running human-scale example and the prior-work sentence needs correction. |
| Publication readiness | 3.5 | Author placeholders, claim-ledger integration, verifier wording, artifact identity, and exposition must be repaired before submission. |

## Required actions before submission

| Priority | Required action | Mathematical effect |
|---:|---|---|
| 1 | Replace author placeholders and establish one canonical PDF with a manifest covering the delivered artifact | None; publication/release integrity |
| 2 | Replace `THEOREM LOGIC CERTIFIED` with bounded obligation-level output and document unchecked external/prose obligations | None; prevents overclaiming |
| 3 | Add a full worked boundary geometry through seed state, recursive transition, and exact descent, with a clear witness category | None expected; makes the proof independently readable |
| 4 | Correct the sentence claiming all cited maximal-word results concern words blocked on both sides | None; literature accuracy |
| 5 | State factoriality explicitly in the finite-extension/infinite-branch equivalence | None; quantifier precision |
| 6 | Register the new mathematical and novelty claims in `MATH_CLAIMS.md` under the repository protocol, with human approval before modifying/committing that file | None; repository provenance compliance |

## Closing claim table

| Claim | Source | Reproduced? | Matches? |
|---|---|---:|---:|
| $s\in re(\mathcal A_4)\setminus le(\mathcal A_4)$ | Clean-room checker, exact certificate reconstruction, Keränen preservation theorem | Yes | Yes |
| $99\to35\to17$ | Clean-room enumeration, then submitted-table comparison | Yes | Yes |
| Generic invariant closure | Independent exhaustive case split | Yes | Yes |
| Present novelty | September 2026 search described above | Not provable by search | No prior resolution found; provisional |
| Manuscript acceptable without changes | Hostile manuscript/artifact audit | No | No — major revision |
