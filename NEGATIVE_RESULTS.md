# Negative Results and Rejected Hypotheses (Graveyard of Ideas)

This document is an archive of research lines, ideas, and hypotheses that have been tested and **proven wrong or insufficient**.

In mathematics and algorithmics, dead ends are as valuable as successes. Documenting them saves future researchers (and AIs) weeks of wasted work, and keeps the project from going in circles.

**The bar for logging here is deliberately low.** This also includes an idea that *worked* but was not worth it (§9), an idea that worked in the wrong place (§8), and a working method that turned out to be wrong even though its output was correct (§10). A dead end does not mean a mistake — it means measured information about which direction is not worth taking.

---

## Index, newest first

The numbering is permanent (it is referenced elsewhere), so the order of
novelty is here rather than in the document's body. Skim this before
proposing anything.

**Finality column, added 2026-08-01.** Entries are not equally final and reading them as if they were is a real failure mode (see the proposal at the end of this file for the motivating case). Three kinds:

- **NECESSARY** — a logical or mathematical obstruction. Cannot change with more compute or a better method. Closed forever.
- **BOUNDED** — exhaustive *within a stated window* and silent outside it. A better method or more compute could genuinely reopen these. **These are unfinished measurements, not dead ends** — treat the language accordingly.
- **CONTEXTUAL** — the technique works, but not in this setting. A warning about transfer, not about the technique.

| Date | # | Final? | What collapsed | In one sentence |
|---|---|---|---|---|
| 2026-09-04 | [§37](#37-paper-6-standalone-novelty-claims-for-the-obstacle-hierarchy-and-the-counting-compiler) | **CONTEXTUAL** | Two Paper 6 standalone novelty claims (literature boundary, **not** a refutation) | Two preserved Paper 6 novelty audits report the bounded-defect decomposition as sitting inside an established Abelian-template line and the counting compiler inside an established counting literature, so neither is novel standing alone; the mathematics is untouched and broader Paper 6 novelty stays unassessed. Canonical entry: `LITERATURE_COVERAGE.md` section 2e -- no claim row, by design. |
| 2026-09-04 | [§36](#36-one-step-response-aliasing-as-sufficient-for-future-equivalence) | **NECESSARY** | One-step response aliasing as sufficient for future equivalence | Two clean-room reconstructions from definitions kill it from different directions: `same one-step response -> same count` stays false, and an obstruction unattainable now can become attainable later, so the state is not Markov-sufficient. Row 131. |
| 2026-09-04 | [§35](#35-profile-incidence-rank-collapse-as-the-direct-semantic-mechanism) | **CONTEXTUAL** | Profile-incidence rank collapse as the semantic mechanism | Dead states and rational aliasing account for much of it -- **298** two-row proportional relations over just **72** pivot rows, not the historical "197", which belongs to a different object entirely. Row 130. |
| 2026-09-04 | [§34](#34-the-35-dimensional-hidden-sector-as-a-startup-artefact) | **BOUNDED** | The 35-dimensional hidden sector as a startup artefact | Removing startup does not remove the deficiency: 1796 groups at rank 1144 against target 1179, and the persistent system still shows 1138 against 1167. The historical 850/1176/326 figures are withdrawn as unsupported. Row 129. |
| 2026-09-04 | [§33](#33-the-adjacency-decoration-as-the-required-descriptor-and-the-gap-as-abelian-geometry) | **NECESSARY** (necessity) / **CONTEXTUAL** (interpretation) | The adjacency decoration as the required descriptor, and the gap as Abelian geometry | Four grid-misaligned offset-0 windows carrying no decoration, and blind to the last character, reach exact 1179/1179 over five primes -- necessity refuted, and the inference from the gap to an Abelian-geometric mechanism blocked; but a granularity-matched control added exactly zero rank, so `epsilon` is **not** generic either, and no replacement mechanism is claimed. Row 128. |
| 2026-09-04 | [§32](#32-a-large-exact-future-count-dimension-as-a-structural-theorem-in-itself) | **CONTEXTUAL** | A large exact future dimension as a theorem in itself | The preserved referee audit marks the weighted-automaton and Hankel/Krylov apparatus `CLASSICAL`; a large exact rank is what that machinery produces, and carries no combinatorial theorem on its own. Row 127. |
| 2026-09-04 | [§31](#31-a-bounded-state-descriptor-for-the-aa2fr-legal-future-and-the-paper-4-frontier-compression-benefit) | **BOUNDED** (descriptor) / **NECESSARY** (frontier) | A bounded-state descriptor for the AA2FR legal future, and Paper 4 frontier compression | The preserved kill report gives a distinguishability argument with no exhibited witness block, so the candidate state `S = (family_id, target_class, bounded_history)` is **withdrawn rather than proved impossible**; separately, the v0.33 frontier is measured to be the full legal prefix trie (`max \|A_d\| = 38`, `A_d = {1,...,d}` at 38 of 40 depths). See `MATH_CLAIMS.md` rows 125 and 126. |
| 2026-09-04 | [§30](#30-the-time-domain-and-resolvent-tail-bounds-are-the-same-lemma) | **NECESSARY** | "Paper 2 and Paper 3 prove the same tail lemma" | They do not: time-domain Dobrushin sums on the unperturbed `P` versus frequency-domain Banach-valued Cauchy estimates on resolvents `B(t)^-1` - the preserved audit records both bounds as standing, while the shortcut of cross-citing one as the other does not. |
| 2026-09-04 | [§29](#29-paper-3s-eta_v---43-bv--xi_v-factorisation) | **NECESSARY** | Paper 3's `eta_v = -(4/3) B(v) + Xi_v` exact factorisation | The preserved audit records that exact evaluation of `H_tt` makes `O_1` also emit cross-terms in `P_3 = sum v_c^3` and `h`-dependent factors, so the identity fails under the stated conventions; the preserved audit records a surviving decomposition that defines `Xi_v` structurally instead of by subtraction. |
| 2026-09-04 | [§28](#28-paper-7-v01s-residual-closure-lemma-36-state-kernel) | **NECESSARY** | Paper 7 v0.1's 36-state residual-closure lemma | `V = b` is Abelian-square-free and passes the residual condition vacuously, yet `C g85(b)` contains `bb` at position 10 - one two-letter square at the seam refutes the closure the whole v0.1 proof rested on. |
| 2026-08-14 | [§24](#24-a-headline-aggregate-computed-somewhere-else-without-the-hand-off-being-recorded) | **CONTEXTUAL** | A pipeline script's own headline aggregate | `multinomial4`'s factorial table stops at `4!`, so at L=5 the Stage-A filter printed `NaN` for its total-codings line, and the figure actually used (3,316,540,933,500) came from a different script with the substitution recorded nowhere. |
| 2026-08-04 | [§23](#23-route-b-intermediate-alphabet-mathematically-excluded-for-h_8) | **NECESSARY** | Route B (intermediate alphabet) for $h_8$ | $M_{h_8}$'s expanding subspace has dimension 4 and any ternary $M_g$ has kernel dimension $\ge 5$, so by Grassmann the intersection is non-trivial for *every* ternary $g$ — Prop 9's decision procedure is inapplicable to $h_8$ (independent verification still pending per the entry's own note). |
| 2026-08-04 | [§22](#22-route-a-exhaustion-up-to-length-7-by-prefix-scan) | **BOUNDED** | Route A (3→3 non-uniform morphisms, max length 7) | Exhausted exactly: out of 493,848 pure non-uniform ternary morphisms with max length 7, all produce an abelian square of K >= 2 within the first 18 characters of the fixed point. |
| 2026-08-01 | [§21](#21-a-certified-standalone-verifier-that-never-ran-the-verification) | **NECESSARY** / CONTEXTUAL | A standalone CLI's self-reported "Certified" banner | Three independent bugs (never loaded the morphism, a structurally-impossible default, an unpruned DFS) made a program print `[CERTIFIED]` for a computation it never ran; fixed same commit, but the module has produced no other result since |
| 2026-08-01 | [§20](#20-spiral-dynamics-complex-eigenvalues-as-a-requirement-for-avoiding-abelian-squares) | **NECESSARY** | "Spiral dynamics": complex eigenvalues as a requirement | Prediction verified (g85 has −8±3i, h6 is real) but refuted by row 5: h6^ω(a) IS abelian-square-free with a purely real spectrum |
| 2026-08-01 | [§19](#19-near-miss-density-in-the-record-word-as-a-measure-of-structural-fragility) | **NECESSARY** | Near-miss density as "structural fragility" | An unconstrained random word of the same length is near-miss-denser than the real record word — same sample-size artifact as `MATH_CLAIMS.md` row 37 |
| 2026-08-01 | [§18](#18-proposition-9s-condition-2-as-a-structural-filter-for-s_largel) | **NECESSARY** | Prop 9's Condition 2 as a filter for S_large(L) | Condition 2 holds for 69–85% of block types at L=1,2,3 while S_large is empty at all three — it is nearly orthogonal to whether a coding works |
| 2026-07-31 | [§17](#17-a-clean-slate-search-for-a-10-character-uniform-coding-g-for-h6s-image-collapses-into-a-dead-end) | **BOUNDED** ⚠ | Clean-slate search for a 10-uniform coding | **Its own text overstates this.** Bounded exhaustion of 3^60 with weak propagation; row 78 later found 200,106 survivors of the same window at L=6 by exact CSP |
| 2026-07-31 | [§16](#16-keränens-g85-projection-to-three-letters) | **NECESSARY** | $g_{85}$'s 4$\to$3 projection | All 36 surjections collapsed immediately at length K=2; the structure does not condense |
| 2026-07-31 | [§15](#15-ai-epistemology-and-going-in-circles) | **CONTEXTUAL** | AI epistemology | An AI is an executor of finite tests, not a mathematical oracle; free-form ideas are often just flawed analogies |
| 2026-07-30 | [§14](#14-the-shape-of-the-growth-curve-as-a-predictor-of-approaching-exhaustion) | **NECESSARY** | Growth-curve shape as a predictor of exhaustion | A three-point budget curve was noise across 20 classes, predicted nothing |
| 2026-07-30 | [§13](#13-partial-corroboration-as-full-confirmation) | **NECESSARY** | Partial corroboration as full | Four matching fields out of five felt like confirmation; the unchecked DOI did not exist |
| 2026-07-30 | [§12](#12-up-and-down--transferring-an-ordering-heuristic-to-the-aa2f-search) | **CONTEXTUAL** | Transferring the Up-and-Down ordering to aa2f search | Works dramatically in its own setting, loses in aa2f — the technique is setting-specific |
| 2026-07-30 | [§11](#11-a-free-search-engine-summary-as-a-source-methodological-dead-end) | **NECESSARY** | A search-engine summary as a source | The summary gave a literal claim with an author's name and figures; neither was in the original |
| 2026-07-30 | [§10](#10-a-pure-definition-level-verifier-as-an-independent-checker-methodological-dead-end) | **CONTEXTUAL** | A definition-level verifier as an independent checker | Worked flawlessly but did not reach its own target; the independence axis was wrong, not the idea |
| 2026-07-30 | [§9](#9-net-gain-from-a-pruning-table-in-a-single-run) | **CONTEXTUAL** | Net gain from a pruning table in a single run | 1.00× — the value is exclusively in reuse |
| 2026-07-30 | [§8](#8-extendability-table-as-a-record-hunt-accelerator) | **CONTEXTUAL** | Table as a record-hunt accelerator | Same longest word, pruned and unpruned; it is an elimination tool, not a record tool |
| 2026-07-30 | [§7](#7-container-relaxation-as-an-elimination-tool-for-additive-squares) | **BOUNDED** | Container as an additive elimination tool | "Did not die at *reachable* window sizes" — the window bound is the whole claim |
| earlier | §6 | **NECESSARY** | "Rosetta filter" | Would reject 88% of legal continuations |
| earlier | §5 | **NECESSARY** | FORBID4 as a universal rule | Occurs 2,820 times in the record word |
| earlier | §4 | **NECESSARY** | Parikh imbalance as small | Measured the opposite |
| earlier | §3 | **NECESSARY** | Reverse-engineering the record word | Exponential factor complexity vs. the linear complexity a morphic word must have |
| earlier | §2 | **NECESSARY** | Rauzy SCC as proof of infiniteness | Local condition, global problem |
| earlier | §1 | **BOUNDED** | Morphism scanning k = 7…9 | A logarithm of sample size — but the statement is about reachable k, not all k |

---

## 1. Scanning Uniform Morphisms ($k=7..9$)
**Hypothesis:** If we test ever-larger uniform morphism lengths ($k=7, 8, 9...$), we will eventually find a fixed point that avoids abelian squares of half-length $K \ge 2$.
**Why it was shot down:**
- A regression analysis was run on the survival-length maxima for $k=2..6$. The result showed an almost perfect fit ($R^2 = 0.998$) to the formula $max \approx 2.29 \cdot \ln N$, where $N$ is the number of morphisms tested.
- **Conclusion:** the growth of the maximum length is not a structural signal that the problem is being solved, but purely a **sample-size artifact** (the tail of a statistical distribution). Searching at larger $k$ without a new structural idea is a waste of computational resources.

## 2. The Rauzy Graph's Strongly Connected Component (SCC) as Proof
**Hypothesis:** If we find a Strongly Connected Component (SCC) in the Rauzy graph of a constraint language (e.g. abelian square-free) at window $n$, we have proven that the language is infinite.
**Why it was shot down:**
- Avoiding abelian squares requires global control of Parikh balance, which cannot be packed into a finite memory window. A Rauzy graph of length $n$ only guarantees that no squares arise **up to length $n$**. That is a local, not a global, property.
- **Conclusion:** the Rauzy graph and its SCC are excellent *heuristic pre-filters*, but they have no absolute proof value (Level 2). Proving infiniteness requires finding the generating rule of the language (a morphism) and feeding it into an exact verification engine (e.g. `decide-realizability.js`).

## 3. Reverse-Engineering the "Record Word" (Morphism Mining)
**Hypothesis:** The 25,379-character word found by Keränen and Gavrilenko is so long that there must be an algebraic rule behind it (e.g. a block substitution or morphism). With desktop computing power we can extract (reverse-engineer) that rule from the word.
**Why it was shot down:**
- The word's factor complexity $p(n)$ was measured. A morphic word's complexity must grow linearly ($p(n) \le C \cdot n$). Keränen's 25k word has $p(15) = 14,502$, i.e. it grows exponentially, following the growth of the whole $aa2f$ language.
- **Conclusion:** the word is a pure product of an optimized depth-first search (DFS / random walk). It has massive topological entropy. There is no rule ("DNA") to reverse-engineer, because none exists.

## 4. Morphisms' Parikh Imbalance is Small
**Hypothesis:** A word produced by an algebraic rule (morphism) is so synchronized that its Parikh imbalance (the difference between the most and least frequent letter) stays tightly bounded, e.g. $< 10$.
**Why it was shot down:**
- Empirical measurement showed exactly the opposite. The genuine morphic word ($g_3(h_6^\omega(a))$) produced a Parikh imbalance of **2,298** at length 25,379. Keränen's DFS-search word had a corresponding imbalance of only **322**.
- **Conclusion:** when a morphism's transition matrix has an eigenvalue $|\lambda| > 1$ (as in $h_6$'s case, $|\lambda_2| = \sqrt{3}$), the imbalance grows theoretically without bound, at rate $\sqrt{N}$. In this respect the morphism is "more imbalanced" than a well-pruned DFS walk.

## 5. FORBID4 Factors Are Universally Lethal
**Hypothesis:** The six "dead-end factors" found by the project's DFS search (`baac`, `caab`, `abbc`, `cbba`, `accb`, `bcca`) inevitably lead to death, and should be hard-coded as a rule excluded from all searches.
**Why it was shot down:**
- Analyzing the 25,379-character survivor word showed that each of these six FORBID4 factors occurs in the word hundreds of times (e.g. `accb` 501 times).
- **Conclusion:** FORBID4 is lethal only in a narrow, specific search space. If we banned them globally from future AI searches or optimizers, we would make finding the 25,000-character word *mathematically impossible*.

## 6. Data-Driven Smart DFS ("Rosetta Filter")
**Hypothesis:** Since the 25k word survived, we can extract from it all the used $N$-length sub-words as an "allowed dictionary", and filter all future depth-first searches (DFS) through it.
**Why it was shot down:**
- The 25,379-character word uses a total of 14,502 unique factors at length 15. The number of legal 15-length factors in the whole $aa2f$ language is 120,084.
- **Conclusion:** the filter would throw away 88% of fully legal continuation paths just because Keränen's search *happened* not to hit them. This would lead to overfitting and would more likely act as a ceiling than a springboard. A pure empirical record hunt is worth avoiding in any case, since our goal is an exact, infinite proof (Level 2).

---

*Items 7–10 logged 2026-07-30 (the `sanalab` development session). All four are measured, not guessed; the figures are in the claims ledger rows 51–55.*

## 7. Container Relaxation as an Elimination Tool for Additive Squares
**Hypothesis:** The same de Bruijn container machinery that produced the frequency bounds and SCC structure on the abelian side (rows 51–52) works on the additive side as **elimination**: growing the window K ∈ [2,kmax], the container eventually dies, and a dead container would prove that an alphabet cannot avoid additive squares.
**Why it was shot down:**
- The container's cost grows as |A|^(2·kmax−1). With four letters, kmax = 7 already gives tens of millions of raw states, and at reachable kmax values the container **did not die** for a single four-letter alphabet.
- Meanwhile, an exhaustive DFS on the **actual** language finished in seconds for several alphabet classes (row 54).
- **Conclusion:** elimination is a search question, not a container question. The container remains the right tool for what it is good at — necessary conditions and structure — but the relaxation is too loose to die where the actual language dies. More generally: **a relaxation's death is strong evidence, but a relaxation cannot be tightened arbitrarily without an exponential cost.** The change of direction is logged in `SANALAB_PLAN.md` 3b.

## 8. Extendability Table as a Record-Hunt Accelerator
**Hypothesis:** Since the extendability-depth table is a sound pruning oracle and reduces search nodes 84–89× in elimination (row 55), it should also help with the **record hunt** — i.e. finding longer words at the same budget for unresolved alphabet classes.
**Why it was shot down:**
- Measured on classes {0,1,2,5} and {0,1,3,5}, at budgets 2·10⁶ and 10⁷: pruned and unpruned search gave **exactly the same longest word** (78/81 and 76/83), even though thousands of prunings occurred.
- The reason is structural: branch-and-bound only prunes branches that **cannot beat the current best**. When the language does not end, the best keeps growing, and pruning never hits the record path.
- The table's informativeness and cost grow together: h = 7 → 0.7% of entries got a finite bound (62M nodes), h = 8 → 6.0% (162M), h = 10 → 96.3% (1.2 billion). **Every case costs more than the entire search budget.**
- **Conclusion:** the oracle is an **elimination tool, not a record tool**. Pruning that relies on "this branch cannot be better" is useless when something better keeps turning up. The record hunt needs a different kind of aid (e.g. search order), and that is a heuristic, not an invariant.

## 9. Net Gain from a Pruning Table in a Single Run
**Hypothesis:** A sound pruning oracle that reduces search nodes by nearly a hundredfold speeds up the run correspondingly.
**Why it was shot down:**
- Building the table requires, in practice, the same tree traversal as the search itself: {0,1,2,3} search nodes 751,156 vs. the table's 725,960; {0,1,3,4} 2,638,908 vs. 2,611,320. The total cost is **1.00×**.
- **Conclusion:** the benefit is **exclusively in reuse** — for the same alphabet again, at a deeper cap, or for another representative of the affine class (the transfer costs 0 search nodes). This is `SANALAB_PLAN.md` 5d's residual principle, and also its warning: **the value of a residual must always be measured over reuse, not within a single run.** A speedup figure without the construction cost is a misleading way to report.

## 10. A Pure Definition-Level Verifier as an Independent Checker (methodological dead end)
**Hypothesis:** To maximize independence, the verification prompt given to another model is best constrained as tightly as possible — banning graphs, automata, and dynamic programming guarantees a structurally different implementation.
**Why it was shot down:**
- The ban forced exhaustive generation, whose cost is |A|^N. With four letters that covers roughly N ≤ 10, while the results to be verified are at lengths 50–62.
- **So the verifier could never check the very result the computation was done for** — even though it worked flawlessly and matched on every value tested.
- **Conclusion:** the right axis of independence is not "dumb vs. smart" but **a different algorithmic idea in the same performance class**. The corrected specification (a level-by-level breadth-first search that checks every extension completely from scratch) is in `SANALAB_PLAN.md` 6b.1, and it is in use in `additive-sweep.js`. General lesson: **two implementations only cover what the slower one reaches**, so verification needs a third layer — property invariants that hold at full length (6b.2).

## 11. A Free Search-Engine Summary as a Source (methodological dead end)
*Logged 2026-07-30.*

**Hypothesis:** a search engine's generated summary is good enough as a *lead*, which can be marked untraced and traced later. The risk is managed, because the mark prevents its use.

**Why it was shot down:**
- The summary gave a literal, plausible claim with an author's name and figures: *"Freedman has shown that the longest word over {a,b,c,d} with the condition a+d = b+c that avoids additive squares has length ≤ 60."* It matched the project's own row 54's balanced classes and the value 60 perfectly — so perfectly that it felt like confirmation.
- Thorough tracing on 2026-07-30: **the name "Freedman" does not appear in Fici & Puzynina's survey at all** (the full text was extracted from the PDF and searched), and the number 60 is not in §8.4. No origin was found anywhere.
- **The damage had already been done before the tracing.** The claim steered two sessions' priorities: it was marked on the critical path in two documents, and row 54 was written with the caveat "this may be a replication" — a caveat with no basis whatsoever.
- **Conclusion:** marking something untraced prevents *citing* it but does not prevent the claim from **steering the work order**, and that is the costly effect. Rule: a search-engine summary is not a lead but **noise, until it has been located in some openable document**. It may be logged as a *question* ("does such a result exist?"), never as the *form of a claim* with an author's name and figures. The same applies to any language-model-generated summary of a source it has not opened — including this agent.
- **What the tracing produced anyway:** a stronger delimitation than the sought claim would have (row 58). That does not undo the lesson; a lucky side effect does not make the method right.

## 12. "Up and Down" — Transferring an Ordering Heuristic to the aa2f Search
*Logged 2026-07-30. See `MATH_CLAIMS.md` row 60.*

**Hypothesis:** the alternating priority ordering reported in Lietard's thesis, which dramatically increased the length of an additively cube-free word over {0,1,2,3}, transfers to the project's aa2f record search. The reasoning seemed strong: both are deep languages, and `NEGATIVE_RESULTS.md` §8 had already ruled out pruning but left the **ordering** open.

**Why it was shot down:**
- A controlled measurement in the technique's **own** setting confirmed that it works: on additive cubes {0,1,2,3} with budget 10⁶, fixed order reached 24,396 and alternating reached the length cap of 300,000. So the technique is not bad.
- In aa2f it **lost clearly**: at budget 2·10⁷, fixed order 2,034, alternating 619 and 1,764. An ordering favoring the rarest letter also lost (1,111).
- **Conclusion:** the technique is setting-specific, not general. Candidate explanation (hypothesis): alternation counters *drift*, and aa2f's failure mode is apparently not drift. This is independently supported by row 42 — Parikh imbalance does not discriminate in aa2f, so balancing it cannot steer the search.
- **The methodological lesson, which matters more here than the result:** my first measurement was done in the wrong setting (additive squares) and would, on its own, have led to concluding that *the technique does not work*. A controlled test in its own setting refuted that. **A technique borrowed from the literature must be tested first where it comes from** — otherwise you are measuring the transfer, not the method, and rejecting a working idea for the wrong reason.

## 13. Partial Corroboration as Full Confirmation
*Logged 2026-07-30. See `MATH_CLAIMS.md` row 23.*

**Hypothesis:** when a retracted source reference is found in an independent bibliography and **the volume, number, pages, and year match**, the reference is corroborated and the retraction can be reversed.

**Why it was shot down:**
- This is exactly what was done for row 23 earlier the same day: Fici & Puzynina's bibliography gave four matching fields, and the row was raised from `REJECTED` → `INDIRECT`.
- **The DOI was not checked.** A few hours later the DOI registry revealed that the identifier in the ledger, `10.1137/16M1087493`, **does not exist at all** (Crossref 404), and the correct one is `10.1137/17M1149377`.
- Four correct fields out of five felt like confirmation. It was precisely the field left unchecked that was wrong.
- **An embarrassing detail that must be recorded:** the wrong identifier disappeared from the ledger only when the cell was rewritten — **by accident, not as the result of a check**. The row did not improve through diligence but through luck.
- **Conclusion:** **corroboration covers only the fields actually compared, not the record as a whole.** When a reference is restored from retraction, each field must be checked separately and the checked fields named. Persistent identifiers (DOI, arXiv ID) must be checked against the registry, because they are exactly the fields a human or a model cannot assess by eye — a wrong year is noticed, a wrong DOI is not.

## 14. The Shape of the Growth Curve as a Predictor of Approaching Exhaustion
*Logged 2026-07-30. See `additive-morphism-scan.js`, `OPEN_RESEARCH_QUESTIONS.md` B10.*

**Hypothesis:** as the budget is increased (10⁶ → 10⁷ → 10⁸), the shape of the growth of the longest word found (leveling off vs. accelerating vs. steady) would predict which of the unresolved unbalanced alphabet classes is closest to exhaustion, and would guide where to deepen the search first.

**Why it was shot down:**
- Run for all 20 open classes at three budget levels, and the growth shape was classified by the two consecutive differences. The result was noisy: classes fell into "leveling off", "accelerating", and "steady growth" groups with no detectable relationship to other properties (e.g. the size of the imbalance).
- A three-point growth curve is too short to separate genuine structure from sampling noise — the same basic problem as the sample-size artifact of row 37, now measured on a different variable.
- **Conclusion:** the diagnostic was not used for prioritization. Instead, the project moved directly to a method that can actually settle infiniteness in either direction — a morphism search (`additive-morphism-scan.js`) — because no shape of a DFS growth curve can ever prove an infinite language (§2's lesson generalized to a new context).

## 15. AI Epistemology and Going in Circles
*Logged 2026-07-31. A consolidating methodological observation.*

**Hypothesis (earlier working method):** an AI agent can genuinely generate new theoretical breakthroughs (such as MCTS, applying Roth's theorem, HD0L projection, holography) when asked for "genuinely new ideas we have not thought of". Such proposals are worth treating as possible solution paths to Mäkelä's conjecture.

**Why it was shot down:**
- An AI's training data is based on linguistic and semantic associations, not mathematical invariants. When an AI is asked for a new idea without constraints, it produces **flawed analogies**:
  - Example 1: "Apply Roth's density theorem to prefix sums" $\to$ Roth's theorem concerns *sets* without repetition, a prefix sum is a *sequence*.
  - Example 2: "Use MCTS navigation" $\to$ this only measures the efficiency of the search program, and can never prove infiniteness. It still only produces a finite word (see §2, §3, §14).
  - Example 3: "Project additive squares with an HD0L morphism" $\to$ the additive condition is a scalar (a sum), while the abelian condition (where the projection worked) is a 6D vector. The degrees of freedom do not transfer.
- **The AI goes in circles**, because it names the same underlying mistake (e.g. finite search) with ever-new terms (Toeplitz mining, MCTS, blind DFS) without understanding that the mathematical kill condition is the same for all of them.

**Conclusion and the correct way to use it (mechanism):**
- An AI **must NOT** be used as a mathematical oracle from which open directions are requested.
- An AI is a **relentless executor of finite tests**.
- Idea-evaluation mechanism: an idea must be an **invariant formulation** that can be turned into a **finite computation**.
- Every new idea must have an explicit **kill condition** stated right at the start. If an idea cannot be coded and disproven (killed) within 5 minutes of coding and computing time, it is not a valid research idea for this project. For example, CEGIS morphism synthesis (ORQ section E8) or Keränen's $g_{85}$'s three-letter projection (E7) are correctly formulated AI tasks, because they are clearly bounded and finitely executable.

## 16. Keränen's g85 Projection to Three Letters
*Logged 2026-07-31. See `OPEN_RESEARCH_QUESTIONS.md` E7, `scratch/g85_projection_test.js`*

**Hypothesis:** Keränen's $g_{85}$'s fixed point is completely abelian-square-free over a 4-letter alphabet. Since Mäkelä's conjecture over a 3-letter alphabet *allows* trivial squares (i.e. abelian squares of period K=1), it might be possible that by projecting $g_{85}$ to three letters (merging two letters), the resulting abelian squares would only be those allowed K=1 squares, and K $\ge$ 2 squares would be avoided.

**Why it was shot down:**
- All 36 possible surjections from the 4-letter alphabet to the 3-letter one were generated and tested up to $g_{85}$'s second iteration (length 7225).
- **The kill condition was met immediately:** none of the 36 surjections survived. Every projection produced an abelian square of period **K = 2** immediately at the start of the word (positions 0, 1, 2, 4, 9, or 27 depending on the surjection).
- **Conclusion:** $g_{85}$'s abelian-square-freeness fundamentally relies on its ability to exploit all four degrees of freedom jointly. The structure cannot be "compressed" into three dimensions in a way that preserves balance even in short (K=2) windows. The attempt to find a 3-letter solution by shrinking the 4-letter solution is a proven dead end.

## 17. A Clean-Slate Search for a 10-Character Uniform Coding (g') for h6's Image Collapses into a Dead End
*Logged 2026-07-31. See `scratch/cegis_g_synth.js`*

**Idea:** build a CEGIS-based, character-by-character DFS search looking for a pure $g': \Sigma_6 \to \Sigma_3^{10}$ coding that would avoid abelian squares (even at periods $K \in [2,5]$, where the original $g_3$ fails). This would have been a pure solution to the original Rao & Rosenfeld $h_6$ base.
**Implementation:** `cegis_g_synth.js` was run first with `MAX_K=7` and then with the looser condition `MAX_K=5`, pruning prefixes on the fly, letter by letter, in first-occurrence order.
**Result (kill condition met):** bounded exhaustion. The search went through 500 million branches and reached a construction depth of 59/60 (i.e. it attempted to place the last letter, $f$), but kept backtracking entire letters ($f$ and $d$), never finding a single complete 60-character assignment that survived.
**Conclusion:** the space $3^{60}$ is, under these conditions (avoiding even $K \in [2,5]$), extremely hostile. It is possible that *no* 10-uniform coding can avoid small squares in $h_6$'s structure without other compromises. The original $g_3$'s success (0 squares for $K \ge 6$) is an exceptional property not found by systematic "clean-slate" search. The search should be constrained to strongly coupled local mutations, or non-uniform codings should be allowed.

## 18. Proposition 9's Condition 2 as a structural filter for S_large(L)
*Logged 2026-08-01. See `MATH_CLAIMS.md` row 79.*

**Hypothesis:** S_large(L) — the set of uniform codings whose image of h6^omega(a) avoids the large periods — was measured empty at L = 1, 2, 3, while L = 4 hit the budget wall twice. The hypothesis was that Proposition 9's Condition 2 (E_e(M_h) INTERSECT ker(M_g) = {0}) is the algebraic reason for that emptiness. If so, symbol-level search could be replaced by linear algebra: Condition 2 depends only on each block's Parikh vector, never on the arrangement of symbols inside the block, so it can be swept over block TYPES (compositions of L into 3 parts, O(L^2) per letter) instead of strings (3^L per letter). That would have turned an intractable search into a cheap exact computation at every L.

**Why it was shot down:**
- The machinery worked and passed its regression control: g3's own block types returned rank 3 and eligible = true, reproducing `decision-preconditions.js`'s independently computed verdict for (h6, g3).
- But Condition 2 turned out to be almost unrestrictive. Of the full-rank block-type combinations it holds for **372/540 (68.9%) at L=1, 34,560/44,100 (78.4%) at L=2, and 837,996/984,420 (85.1%) at L=3** — abundantly satisfiable at exactly the three lengths where S_large is *provably empty*. Whatever forces S_large(1..3) = 0, it is not Condition 2.
- **The module said so in advance and it was read too quickly.** `decision-preconditions.js`'s own closing note states: *"this verifies the HYPOTHESES of Proposition 9 for our constants. It does not implement the proposition, does not compute any parent set, and does not re-prove Theorem 9. It establishes that the downstream algorithm is applicable here - nothing more."* Condition 2 is a gate on whether the decision *procedure* applies, not on whether the *word* works. Those are different questions and the hypothesis conflated them.
- **Conclusion:** eligibility for a decision procedure is not evidence about the object the procedure would decide. More generally: when a cheap algebraic invariant is proposed as a proxy for an expensive search, the first test is not "does the invariant compute correctly" but **"does it separate known-positive from known-negative cases"**. Here it separates nothing — it is satisfied by the overwhelming majority of candidates on both sides. That test costs minutes and should precede any implementation.

**One thing the failure did produce, and it is worth keeping:** nobody had ever measured how restrictive Condition 2 is. The answer — barely at all — is good news for the wider programme, because it means that if a genuine survivor is ever found, the Proposition 9 machinery will very probably apply to it. The gate is wide open; the difficulty is elsewhere.

## 19. Near-miss density in the record word as a measure of "structural fragility"
*Logged 2026-08-01.*

**Hypothesis (externally proposed):** the 23,379-character verified aa2f record word contains near-abelian-squares (adjacent equal-length blocks whose Parikh vectors differ by the minimal nonzero amount) up to K=6065, spanning 51.9% of the word's length. This was proposed as evidence that the aa2f language is "structurally fragile" — long legal words walk a knife's edge with no room to maneuver, which would explain why search is hard.

**Why the raw number checks out but the interpretation was shot down:**
- The parity correction first: three Parikh differences over a fixed 3-letter alphabet with equal-length blocks always sum to zero, so their L1 norm is always even. "Off by one letter" is L1 distance 2, not 1.
- Independently recomputed from `datasets/keranen_23379.txt` (not taken on report): largest K with a near-miss (L1=2) is **K=6065, span 12,130 characters, 51.9% of the word** — reproduced exactly. A control on the same script passed: 0 abelian squares at K≥2, 11,795 at K=1 (the allowed trivial ones), matching what a verified aa2f word must show.
- **The decisive test: the same statistic computed on a uniformly random, completely unconstrained ternary word of the same length.** The random word's near-miss reached **K=9152 (78.3% of the word)** with **534,539** near-miss instances, against the real record word's 147,588. The unconstrained random word is *more* near-miss-dense than the carefully constructed aa2f word, not less.
- **Conclusion:** this is the same failure mode already logged at row 37 (`MATH_CLAIMS.md`): checking O(n²) window pairs (all positions × all half-lengths) makes some near-hit close to certain regardless of the word's language, simply from the number of comparisons made. The statistic is a sample-size artifact of the measurement, not a property of aa2f. If anything, the comparison points the opposite direction from the hypothesis: the real word has *fewer* near-misses than chance would predict, which is at least consistent with (though not proof of) the avoidance constraint mildly suppressing near-collisions rather than the word "walking a tightrope."
- **A visualization idea built on the same premise** (a Parikh-difference heatmap, with the pitch "the real word's heatmap would be uniformly dark, showing fragility everywhere") is undermined by the same finding: an unconstrained random word would look at least as dark, so the visualization would not distinguish structure from noise. Not built.

**What would survive this critique, if anyone wants to pursue it:** normalized near-miss *rate* (not raw count, not "largest K reached") compared between the real word and the random baseline, with statistical significance stated. That is an invariant, calibrated question. It was not attempted here because it is unclear what it would be used for even if the difference is significant — no concrete follow-up question was identified.

---

## Proposal, not yet adopted: classifying entries by how final they are

*Raised by the maintainer 2026-08-01. Recorded here because it is a real
gap in this document, but NOT applied — reclassifying 19 existing sections
is a change to how every one of them reads, and that is a maintainer
decision (rule 5 in spirit, if not in letter).*

Every section in this document currently reads with the same finality.
They are not equally final, and at least one is demonstrably weaker than
its own language suggests. Three distinguishable kinds:

- **NECESSARY** — a logical or mathematical obstruction that cannot change
  regardless of future compute or cleverness. §2 is the clearest case: a
  local condition cannot certify a global property, and no amount of
  computation alters that. §3 likewise: a word whose factor complexity
  grows exponentially cannot be morphic, because morphic words have linear
  complexity. These are closed forever.
- **BOUNDED** — the result is exhaustive *within a stated window* and says
  nothing outside it. §7 ("did not die at reachable window sizes"), §17
  (bounded exhaustion of 3^60), and the L=4 attempts logged under Step 1
  are all of this kind. A better method or more compute could genuinely
  reopen these. They are not dead ends; they are unfinished measurements
  wearing the language of dead ends.
- **CONTEXTUAL** — the technique works, but not here. §8 (a sound pruning
  oracle that is useless for record-hunting specifically), §12 (an ordering
  heuristic that wins in its own setting and loses in aa2f). These are
  warnings about transfer, not about the technique.

**The concrete case that motivates this, and it is not hypothetical:**
§17 concludes that the 3^60 space is "extremely hostile" and that
possibly *no* 10-uniform coding avoids small squares. That reads as
NECESSARY. It is BOUNDED at best — the search order had almost no
constraint propagation (assignment was letter-major, so the first five
letters constrained roughly 80 of 12,960 symbols), and 500 million
branches is a vanishing fraction of 3^60. The same question was later
shown to be *exactly decidable* by the locality-CSP (row 78), which found
200,106 survivors of the small window at L=6 — the opposite of an empty
stratum. §17's language outran its evidence, and nothing in this
document's format flagged that.

**Why this matters beyond tidiness:** the whole point of this file is to
stop the project revisiting closed ground. If BOUNDED entries are read as
NECESSARY, the file does the opposite of its job — it closes off routes
that are merely unfinished. That is a failure mode with no current guard.

## 20. "Spiral dynamics": complex eigenvalues as a requirement for avoiding abelian squares
*Logged 2026-08-01. See `MATH_CLAIMS.md` rows 5, 18, 32; `OPEN_RESEARCH_QUESTIONS.md` section D.*

**Hypothesis:** avoiding abelian squares in a long word requires the Parikh vector to rotate rather than travel in a straight line — a "spiral" — and in linear algebra that means the incidence matrix must have **complex conjugate eigenvalues**. Prediction: Keränen's g85 (which works, 4 letters) should have complex eigenvalues, while h6 (whose spectrum is real) should be structurally incapable, explaining route (c)'s failures. Proposed use: filter candidate morphisms by "has complex eigenvalues" before any word generation, millions of times cheaper than searching.

**The empirical prediction is correct, and checking it produced a fact the project had not recorded:**
- h6: char poly x⁶ − 3x⁵ − 3x⁴ + 9x³, spectrum **{3, +√3, −√3, 0, 0, 0}** — entirely real (row 18).
- g85: char poly x⁴ − 76x³ − 804x² + 2804x + 43435, which factors as (x − 85)(x − 7)(x² + 16x + 73). The quadratic has discriminant 256 − 292 = **−36 < 0**, so the spectrum is **{85, 7, −8+3i, −8−3i}** — genuinely complex.

So the two morphisms do differ exactly as predicted.

**Why it was shot down anyway — by the project's own row 5:**
- **h6^ω(a) is completely abelian-square-free** (row 5, Rao & Rosenfeld Theorem 4, re-derived in-house at row 32). It avoids abelian squares at *every* period, over six letters, with a **purely real spectrum**. A morphism with no complex eigenvalues therefore does avoid abelian squares, and the claimed requirement is false as stated. The counterexample was in the ledger the whole time.
- Retreating to "…required over **four** letters" does not save it: that is a claim with one supporting example (g85) and no attempt at the other known 4-letter morphisms (g98, g109 — row 3), and it has no mechanism, only the analogy.
- **`OPEN_RESEARCH_QUESTIONS.md` section D already rejects this exact shape**, with the reason that matters most: *"Spectral gap as a predictor of a morphism's correctness — the incidence matrix loses letter order within the image. Two morphisms with the same matrix can behave completely differently at periods K = 2…5."* Complex-vs-real is a property of the incidence matrix, so two morphisms sharing a matrix share the verdict while behaving differently. It cannot predict correctness, and a filter built on it would discard valid candidates and keep invalid ones with equal enthusiasm.
- The companion proposal to **maximize near-misses** as an objective function was refuted the previous day in §19: an unconstrained random word is *more* near-miss-dense than the real record word, so maximizing that quantity pushes toward randomness, not toward structure.

**What the exercise was still worth:** g85's spectrum, including the complex pair −8 ± 3i, is a real measured fact that was not in the ledger. And the test was cheap and decisive — which is exactly the standard §15 asks new ideas to meet, even when they fail. **The general lesson, and it is the third time this document records it:** a metaphor that maps convincingly onto the mathematics is not evidence about the mathematics. The mapping has to survive contact with the cases already in the ledger, and this one did not survive the first case it met.

## 21. A "Certified" Standalone Verifier That Never Ran the Verification

*Logged 2026-08-01. See `MATH_CLAIMS.md` row 26 (`REJECTED` -> corrected same commit); `index.html` Module 18 ("Seam Search & Verification").*

**What was believed to be true:** `seam-hpc-cli.js`, the standalone Node.js
script the app's Module 18 tells visitors to download and run, audited
boundary ("seam") collisions in `g3(h6^n(a))` for periods K >= 6 and, on a
clean run, printed a banner reading `[CERTIFIED] Provable asymptotic
stability replicated`. The UI around it presented a "Provenance Chain"
(Observed -> Candidate -> Independently verified -> Certified) as though the
script's own output could advance a candidate along it.

**Why it was shot down, and it was not one bug but three, found in a single
audit:**
- **The certification was never computed.** `--mode=p6` never loaded
  `morphisms.js` at all, so it could not scan `g3(h6^n(a))` -- it ran a
  generic ternary DFS with an arbitrary cutoff, incremented a `passed`
  counter unconditionally, and the main thread printed a **hardcoded** line,
  `Boundary Collision Violations Observed: 0`, followed by the "Certified"
  banner regardless of what (if anything) had actually run.
- **The weld mode's own default input was mathematically impossible to
  pass.** It scanned K from 1, but the default U = g3(a) =
  `bbbaabaaac` contains the factor `baab`, a K=2 abelian square by
  construction -- g3's images contain exactly 34 such squares at K in
  [2,5] (row 6b) on purpose. The seam question is only meaningful for
  K >= 6; the tool's own default guaranteed a false failure or a
  meaningless pass before it ever reached the question it claimed to
  answer.
- **The DFS pruned nothing.** It was a full 3^maxLen enumeration,
  asymptotically worse than `morphisms.js`'s already-existing, tested
  `weldBridge()` -- the tool duplicated logic that already worked
  correctly and made it slower in the process.

**Corrected in the same commit** (row 26): the mode now loads H6 and G3,
generates the real word, splits K = 6..maxK across workers, and reports an
actual count (`--depth=8 --maxK=40`: 65,610 symbols, K = 6..40, 0 abelian
squares) with output that explicitly disclaims proving anything about the
infinite word. `check-claims-drift.js` gained two permanent checks (6b, 6c):
one fails the build if any program prints the words *certified / provable /
proven / publication-grade*, the other fails it if the p6 mode does not load
`morphisms.js`. Both still pass as of this entry.

**Why this belongs in the graveyard even though it was fixed, and why it is
logged as a methodological entry rather than a mathematical one:** in
roughly a year of this project's ledger, Module 18 / `seam-hpc-cli.js` has
never produced a single mathematical finding recorded anywhere in
`MATH_CLAIMS.md` or elsewhere in this file. Its one appearance in the
project's history is this row -- a report on itself. **The structural
lesson is the one this document exists to keep visible:** the ledger
audits documents, not running programs, and a program's own stdout is not
subject to any of the checks that guard prose. A tool can announce its own
success in exactly the calibrated-sounding language ("CERTIFIED",
"provable") that the rest of this project works to avoid, and nothing
short of someone actually reading the code catches it. Three independent
implementations of the same weld/seam search now exist in this repository
(`src/morphisms.js`, `aa2fr-worker.js`'s in-browser copy, and this CLI); the
first two are tested and have never produced a false claim, and the third
is the one that did.

**Finality: NECESSARY for the specific bug (a program printing an
unconditional "Certified" banner is wrong regardless of future compute),
CONTEXTUAL for the general lesson (extending automated auditing to program
output, not just documents, would close this class of failure — a real
option, not attempted here).**

## 22. Route A Exhaustion Up to Length 7 by Prefix Scan

*Logged 2026-08-04. See `MATH_CLAIMS.md` row 121 (renumbered from a duplicate row 84 on 2026-09-04), `src/cegis-scanner.js`.*

**Hypothesis:** Route A of the project roadmap seeks a direct, non-uniform ternary morphism $h: \{a,b,c\} \to \{a,b,c\}^*$ that avoids abelian squares of period $K \ge 2$, with image lengths up to 7. A full CEGIS loop with exact algebraic verifications (Proposition 9 / Jordan decomposition) would find or rule out candidates.

**Why it was shot down (and why Level 3 was never needed):**
- To find candidates to feed into the algebraic Tiers, `src/cegis-scanner.js` was written to perform a trivial prefix-scan (Tier 1).
- The candidate space requires individual images $h(x)$ to be completely abelian square free (including $K=1$, since they are factors of the target word, which can only contain trivial squares if it is a fixed point). There are exactly 114 such pure ternary words up to length 7.
- This creates exactly 493,848 candidates ($38 \times 114 \times 114$, where $h(a)$ starts with 'a').
- **The kill condition was met immediately by Tier 1:** Every single one of these 493,848 candidates produced an abelian square of $K \ge 2$ within the first **18 characters** of its generated fixed point.
- The best surviving morphism was `{a: 'abcab', b: 'bc', c: 'ca'}`, which survived to length 17 before failing.

**Conclusion:** 
- The search space for Route A (direct 3→3 non-uniform morphisms with $|h(x)| \le 7$) is exactly and completely dead. There are no survivors to pass to any higher-level algebraic decision procedure.
- The hypothesis that direct 3→3 morphisms might be structurally too poor (compared to Rao-Rosenfeld's use of a richer 6-letter intermediate alphabet $h_6$ projected down via $g_3$) gains credibility. A direct 3-letter morphism may simply not have enough degrees of freedom to balance the Parikh vectors without forcing a small abelian square.
- **Finality: BOUNDED.** The result is an exact exhaustion up to length 7. It says nothing about length 8 or beyond, nor does it address the intermediate-alphabet strategy.

## 23. Route B (Intermediate Alphabet) mathematically excluded for $h_8$

*Logged 2026-08-04. See `MATH_CLAIMS.md` row 107.*

**Hypothesis:** Route B of the project roadmap seeks an intermediate alphabet strategy, extending the Rao & Rosenfeld approach. A candidate morphism $h_8: \Sigma_8 \to \Sigma_8^*$ was hypothesized to admit a ternary projection $g: \Sigma_8 \to \Sigma_3^*$ that avoids abelian squares by satisfying Rao & Rosenfeld's Proposition 9 (specifically Condition 2: trivial intersection between the expanding subspace of $M_h$ and the kernel of $M_g$).

**Why it was shot down:**
- The incidence matrix $M_{h_8}$ has an expanding subspace $E_e$ of dimension 4, due to 4 roots of its characteristic polynomial having modulus > 1.
- Any uniform ternary projection $g: \Sigma_8 \to \Sigma_3^*$ produces a $3 \times 8$ Parikh matrix $M_g$, which has rank at most 3. By the rank-nullity theorem, $\dim(\ker M_g) \ge 5$.
- By Grassmann's formula in $\mathbb{R}^8$: $\dim(E_e \cap \ker M_g) \ge 4 + 5 - 8 = 1$.
- **The kill condition was met mathematically:** The intersection $E_e \cap \ker M_g$ is guaranteed to be non-trivial for *any* ternary mapping $g$. Therefore, Rao & Rosenfeld's decision procedure (which relies on a trivial intersection to bound the discrepancy) is fundamentally inapplicable to $h_8$ mapped to 3 letters.

**Conclusion:** 
- The $h_8$ hypothesis is fatally flawed for the template method. No finite parent set can be computed via Proposition 9 for any ternary mapping of $h_8^\omega(e)$.
- This structural failure aligns with the empirical failure found by `scripts/h8-image-sweep.js`, which found 0 survivors for $L=2$.
- **Finality: NECESSARY.** The exclusion is based on a mathematical proof (linear algebra), not bounded search. (Pending independent verification by Claude, as requested by the user, before fully closing this branch).

## 24. A headline aggregate computed somewhere else, without the hand-off being recorded

*Logged 2026-08-14. Engineering/methodological entry. Defect reproduced live against
`scripts/parikh-block-filter.js`; see also `research/provenance/STAGE_A_L5_MANIFEST.md` §3.*

**Hypothesis (implicit, never stated):** the Stage-A filter script
`scripts/parikh-block-filter.js` reports its own accounting, so the total-codings
figure printed alongside its survivor count is that script's own output.

**Why it was shot down:**
- The script's helper `multinomial4` carries the factorial table `[1, 1, 2, 6, 24]`
  — `0!` through `4!`. At `L = 5` the lookup `fact[5]` is `undefined`, so the
  multinomial evaluates to `NaN`.
- Confirmed by direct call: `multinomial4([3,1,1]) → NaN`, and the L=5 run prints
  `total concrete string codings ... : NaN`.
- The figure the project actually uses, **3,316,540,933,500**, was produced by a
  *different* script, `l5_accounting_and_strata.js`. That value is correct — it was
  independently re-derived during the 2026-08-13 intake audit — but **the
  substitution is recorded nowhere**: not in the filter script, not in a comment,
  not in a log line.
- Nothing was mathematically wrong. Elimination decisions and the survivor list are
  unaffected, and the helper is correct for `L ≤ 4`, so the L=4 measurements in
  `MATH_CLAIMS.md` rows 80 and 82 stand.

**Conclusion:**
- **The lesson is about provenance, not arithmetic.** When a pipeline's headline
  aggregate is computed by a different program than the one that produced the data,
  the hand-off must be written down at the point of substitution. Otherwise the
  provenance silently forks, and the next reader — who sees a plausible number next
  to a survivor count — has no way to tell that the two came from different places.
- A visible `NaN` is the benign case: it fails loudly. The dangerous version of this
  pattern is a broken aggregate that still prints a plausible number.
- Compare §21, where a program announced `[CERTIFIED]` for work it never ran. Same
  class: **a program's own output is not audited by any of the checks that guard
  prose in this repository.**
- **Finality: CONTEXTUAL.** The defect itself is a two-character fix (extend the
  factorial table). The transfer warning — that an aggregate's origin must be
  recorded where the substitution happens — is the part worth keeping.

## 25. G005 "Three Periods Suffice" (Extinction Obstruction Width)

*Logged 2026-08-16. See `docs/evidence/structural-2026-08-15/verify_g005.js`.*

**Hypothesis:** At most three half-length scales $K$ suffice to explain every finite extinction. Formally: for every doomed $w$ and every $t \ge \delta(w)+1$, $h(w,t) \le 3$.

**Why it was shot down:**
- The exact finite witness is $w = \texttt{abacccaaacbc}$ with extension length $t = 4$.
- The word is an immediate dead end at depth 3, so $\delta(w) = 3$. The required condition $t \ge \delta(w)+1$ holds for $t=4$.
- The compressed first-failure-prefix verifier proves equivalence to literal enumeration of all 81 full futures because every length-4 future has a unique shortest invalid prefix, $W_w(u)$ depends only on that first-failure prefix, and multiplicity of identical hyperedges does not affect the transversal number.
- The transversal number of the obstruction hypergraph for this word is exactly 7, i.e., $h(w,4) = 7$.
- Every period $K \in \{2,3,4,5,6,7,8\}$ is indispensable, with a singleton witness set for at least one future branch.
- This refutes the universal claim.

**Conclusion:**
- Exact verification path: Evaluated first-failure witnesses over all 81 futures of length 4 in `docs/evidence/structural-2026-08-15/verify_g005.js` (output `docs/evidence/structural-2026-08-15/verify_g005.out`).
- **Structural residue:** Extinction Width $\eta(w)$ (defined as $h(w,\delta(w)+1)$) remains an OPEN project question, not a claim. Here $\eta(w)=7$.
- **Novelty:** NOT CLAIMED.
- **Finality:** NECESSARY.

## 26. G006 Obstruction Hall Property (including G006-L Local Hall)

*Logged 2026-08-16. See `docs/evidence/structural-2026-08-15/probe_tail_chase.out`, `docs/evidence/structural-2026-08-15/probe_local_hall.out`.*

**Hypothesis:** The subsets of required obstruction scales $R_i$ along a complete forced corridor satisfy Hall's Marriage Condition ($\left| \bigcup_{i \in I} R_i \right| \ge |I|$ for all $I$). G006-L proposed this for local/censored forced runs.

**Why it was shot down:**
- The exact finite witness is $W = \texttt{abccaabacbbaaabbbaa}$. The forced corridor naturally terminates at length 19.
- The forced-state blocker sets are:
  - $R_0 = \{2,7\}$
  - $R_1 = \{2,7\}$
  - $R_2 = \{3,6\}$
  - $R_3 = \{2,4,5\}$
  - $R_4 = \{2,6,7\}$
  - $R_5 = \{3,7\}$
- The Hall-deficient subset is $I = \{0,1,2,4,5\}$ with union $\{2,3,6,7\}$. The size is $4 < 5$, violating Hall's condition.
- The same witness refutes both the complete-only and local Hall variants.
- This witness DOES NOT refute Prefix Scale Credit.

**Conclusion:**
- **Structural residue:** Chronology matters; Hall was strictly stronger than Prefix Scale Credit.
- **Novelty:** NOT CLAIMED.
- **Finality:** NECESSARY.

## 27. Route-C L=6 combined-filter closure: no coding survives both tests

*Logged 2026-08-17. See `MATH_CLAIMS.md` row 112 and the evidence capsule
`docs/research/evidence/l6-route-c-closure-2026-08/`.*

**Hypothesis:** some uniform coding `g : Σ₆ → Σ₃⁶` applied to `h₆^ω(a)` yields an
infinite aa2f word, giving Mäkelä's conjecture by Route C at `L = 6`.

**Why it was shot down:**
- The small-window condition (`K ∈ [2,5]`) is decided exactly by locality: such a
  square spans at most 10 image symbols, hence lies inside `g(u)` for one of the 22
  length-3 factors of `h₆^ω(a)`. Exactly 1,200,636 concrete codings (200,106
  S₃-canonical classes) satisfy it.
- Stage-A eliminates 1,200,288 of them by the exact kernel condition `M_g·d = 0`,
  each elimination exhibiting a block-aligned abelian square with `K = 6m ≥ 6`.
- The remaining 348 codings each receive an explicitly exhibited string-level
  abelian square with `K ∈ [6,10]`, ending at or before image position 34.
- Combined survivors: 0.

**Conclusion:**
- `S_small(6) ∩ S_large(6) = ∅`. No uniform `L=6` coding of `h₆` yields an aa2f word.
- **Explicit boundary:** this does **not** prove `S_large(6) = ∅`, does **not** change
  `L*` (still `{6,…,10}`), extends to **neither** `L ≥ 7` **nor** non-uniform codings,
  and does not bear on Mäkelä's conjecture itself. No `L=6 → L=7` inference exists.
- **Novelty:** NOT CLAIMED.
- **Finality: BOUNDED COMPUTED.** Exhaustive and exact over the uniform `L=6` family.

---

## 28. Paper 7 v0.1's residual-closure lemma (36-state kernel)

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 122 (`REJECTED`). Evidence
preserved on `rescue/paper7-raw-preservation-2026-09-03` (`7c235b5`): the failed lemma
in `rescue/paper7/P7_MAIN_THEOREM_RELEASE_v0.1/PROOF.md` and
`rescue/paper7/P7_MAIN_THEOREM_RELEASE_v0.1/RESIDUAL_STATE_DEFINITION.md`; the
refutation in `rescue/paper7/CODEX_INDEPENDENT_AUDIT/P7_CODEX_HIGH_FINAL_AUDIT.md`.*

**Hypothesis:** for `C = abacabadcdb` and Keranen's 85-uniform `g85`, there is an
invariant class `C_C` inside `A4` consisting of the words avoiding a fixed set of
**36 near-square residual configurations**, and that class is closed under
`F_C(V) = C g85(V)`. Closure would have given the right-infinite extension directly.

**Why it was shot down:**
- The residual expression **cancelled its own prefix**, so it could not exhibit the
  positive coordinates that appeared in its own transition table; the prefixless
  generic closure statement was false.
- **Exact counterexample.** Take `V = b`. It is Abelian-square-free and satisfies the
  v0.1 residual condition vacuously, yet `C g85(b)` contains `bb` at zero-based
  position 10 - the final letter of `C` against the first letter of `g85(b)`. An
  abelian square of half-length 1, immediately across the seam the lemma was supposed
  to control.
- Re-verified here from canonical data: the `g85` in the preserved Paper 7 package is
  byte-identical to `G85_A` in `src/morphisms.js` (`MATH_CLAIMS.md` row 3, `PRIMARY`),
  and `(C + g85(b))[10..11] = "bb"`.

**Conclusion:**
- The v0.1 closure mechanism is **false as stated**. A single two-letter square at the
  seam refutes it; no amount of extra residual states repairs an argument whose
  residual cancels its own prefix.
- **What this does not kill.** It says nothing about whether the Paper 7 statement is
  true. v0.2 replaced the malformed residual with `V = A x B y D`, `q = P(A) - P(B)`
  and an explicit `C`-prefix invariant, and the independent audit recorded that this is
  **not** a relabelling and that the new finite system was regenerated without reading
  v0.1. That later construction is unmerged and unpromoted, and this entry deliberately
  does not depend on it.
- **Why the seam is the lesson:** the failed lemma reasoned about `V` and about
  `g85(V)` but not about the one position where they meet. `V = b` is the shortest
  possible witness that the boundary is where such arguments break.
- **Novelty:** NOT CLAIMED.
- **Finality: NECESSARY.** An exhibited counterexample to a stated closure property.
  No future compute reopens it.

---

## 29. Paper 3's `eta_v = -(4/3) B(v) + Xi_v` factorisation

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 123 (`REJECTED`). Evidence
preserved on `rescue/paper3-audit-raw-2026-09-03` (`3180c6a`): the derivation itself in
`rescue/paper3-audit/antigravity/xi-closure/PHASE_A_DERIVATION.md`, the pre-refutation
candidate in
`rescue/paper3-audit/antigravity/xi-closure/XI_CURRENT_CLAIM_FREEZE_2026-08-29.md`, the
refutation in
`rescue/paper3-audit/antigravity/xi-closure/PAPER3_XI_CLOSURE_THEOREM_2026-08-29.md`,
and the machine-readable verdict row in
`rescue/paper3-audit/antigravity/xi-closure/PAPER3_XI_STATUS_MATRIX_2026-08-29.csv`.*

**Hypothesis:** the hard-response curvature factorises exactly as
`eta_v = -(4/3) B(v) + Xi_v`, with `B(v) = sum_c (v_c - h/3)^2 = h^2 (d_1(v) - 1/3)`,
i.e. the `O_1` short-contact overlap extracts **exactly** `-(4/3) B(v)` under scaling
and `Xi_v` is defined as the remainder by subtraction.

**Why it was shot down:**
- The preserved Paper 3 audit records that exact algebraic evaluation of the scalar
  recurrence `H_tt` yields, from the `O_1` overlap terms, **cross-terms proportional to
  `P_3 = sum_c v_c^3`** together with `h`-dependent structural scaling factors. That
  evaluation has not been re-derived in this project.
- The status matrix records the outcome as reproduced-but-not-matching:
  *"Exact operator trace yields h-dependent polynomials. -4/3 B(v) rejected as exact
  identity under raw conventions."*
- So `-(4/3) B(v)` is at best an approximation, or presumes a scalar normalisation
  convention that was never stated.

**Conclusion:**
- The factorisation is **not an exact identity** under the conventions in force. A
  remainder defined by subtracting a term that is itself wrong inherits the error.
- **What this does not kill.** The preserved Paper 3 audit records a *different*
  decomposition as surviving, `eta_v = eta_short(v) + eta_return(v)`, in which `Xi_v`
  is defined **structurally** through the operators `A_v` and `E_v` rather than by
  subtraction - which is what bypasses the discrepancy rather than papering over it -
  and records the exact `(B, J, U)` reduction of the short-contact operator and the
  finite-depth interval certifier as untouched. **None of those positives is promoted
  here:** they hold no canonical ledger row, and row 123 adjudicates only the rejected
  exact identity.
- **Provenance caveat, per `EPISTEMIC_DISCIPLINE.md` section 5.** The derivation and its
  refutation both come from the `antigravity/` working context - a second AI. That is
  **corroboration, not an independent verification channel**. What is well-evidenced
  here is that the candidate was posed and then rejected, recorded consistently across
  three artifacts including a machine-readable matrix; the algebra itself has not been
  re-derived on a genuinely independent axis.
- **Novelty:** NOT CLAIMED.
- **Finality: NECESSARY** for the exact-identity reading - a stated identity either
  holds or it does not, and the cross-terms are exhibited. Whether some *rescaled*
  version of the relation holds is a different, still-open question.

---

## 30. "The time-domain and resolvent tail bounds are the same lemma"

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 124 (`REJECTED`). Evidence
preserved on `rescue/paper2-audit-raw-2026-09-03` (`6a2681e`): the `REFUTED` row in
`rescue/paper2-audit/antigravity/PAPER2_CLAIM_STATUS_MATRIX_2026-08-29.csv` and the
analysis in
`rescue/paper2-audit/antigravity/SANDBOX_REPORT_PAPER2_CLEANROOM_AUDIT_2026-08-29.md`
section 2.*

**Hypothesis:** Paper 2's tail bound and Paper 3's tail bound are the same result in
different notation, so one lemma could be proved once and cross-cited by both.

**Why it was shot down:** the two proof architectures are **genuinely distinct**, not
notational variants of one another:
- Paper 2 bounds `C_rest` in the **time domain**, with real scalar correlation sums and
  Dobrushin contraction coefficients `tau_k` applied to the *unperturbed* matrix `P`.
- Paper 3 bounds the blocked centered-return tail in the **frequency domain**, with
  complex `z`, Banach-valued Cauchy estimates over the resolvent matrices `B(t)^-1`.

Different domain, different object bounded, different analytic machinery. The claim
status matrix records the identity claim as `REFUTED / FALSE` without qualification.

**Conclusion:**
- The identity is **false**. The explicit consequence recorded by the audit is
  operational: *do not merge or cross-cite them as the same lemma.*
- **What this does not kill.** The preserved Paper 2 audit records both bounds as
  standing - its claim matrix marks the surrounding Paper 2 statements `PROVED` - and
  this entry adjudicates only the proposed identity between them. Neither paper loses a
  result here, and neither gains one: what is lost is the shortcut of proving one and
  claiming the other. The audit records the resolvent machinery as remaining available
  to Paper 2 as an *interpretation*, which is a different and weaker relationship than
  identity. **No Paper 2 or Paper 3 positive is promoted by this entry;** none holds a
  canonical ledger row.
- **Why this is worth canonical memory:** a false lemma-identity is the cheapest way to
  create a citation that looks supported and is not. Two bounds that agree numerically
  on the cases tested are still two bounds.
- **Provenance caveat, per `EPISTEMIC_DISCIPLINE.md` section 5:** single-source, from
  the `antigravity/` context. Corroboration, not independent verification.
- **Novelty:** NOT CLAIMED.
- **Finality: NECESSARY.** The architectures are exhibited and differ; this does not
  reopen with more compute.

---

## 31. A bounded-state descriptor for the AA2FR legal future, and the Paper 4 frontier-compression benefit

*Logged 2026-09-04. **Two separate canonical claims:** `MATH_CLAIMS.md` row 125
(`REJECTED`, the bounded-state descriptor) and row 126 (`REJECTED`, the frontier
benefit). Evidence preserved on `rescue/paper4-recordhunt-transfer-raw-2026-09-03`
(`1040048`):
`rescue/paper4-recordhunt-transfer/PAPER4_STATE_COMPRESSION_KILL_REPORT_2026-08-29.md`
and
`rescue/paper4-recordhunt-transfer/PAPER4_TO_VEIKKO_TRANSFER_CORRECTION_2026-08-29.md`;
and on `rescue/final-closure-artifacts-2026-09-03` (`2fde076`):
`rescue/final-closure/paper4-next-version-sandbox/PAPER4_v033_FINAL_PROMOTION_AUDIT_2026-08-29.md`,
defect **D2**.*

**Two candidates, tested separately and killed separately:**
1. **(row 125)** the 19 support families, augmented with finite information, form a
   state `S = (family_id, target_class, bounded_history)` that determines the legal
   infinite continuations of an **AA2FR** word - a bounded-state descriptor for the
   legal future;
2. **(row 126)** the Paper 4 v0.33 frontier identity delivers a **compression** benefit
   in search.

**Why (1) was withdrawn - an argument, not a completed proof:** an abelian square at
position `N` can be created against *any* earlier start `i < N`, so roughly `N/2`
threats are live at once, each demanding a specific target Parikh vector. The preserved
kill report argues that a bounded state therefore cannot separate two deep histories
that share a local suffix but differ far back: appending a suitable length-`N` block
would complete a square for one and not the other, so their legal futures would differ
while their states agree. **This is a distinguishability sketch, not a proof.** No
witness block is exhibited anywhere in the preserved material and no bound on `N` is
given, so what is recorded here is the **withdrawal of this candidate descriptor**, not
a universal finite-state impossibility theorem. The preserved report's own verdict line
reads `STATE COMPRESSION DEAD-END (PROVEN)`; that wording is stronger than the argument
beneath it and is deliberately not imported. What survives intact is the narrower
reading the report also gives: the 19 families classify the *geometric support* of a
square without erasing the history-dependence of the Parikh vectors.

**Scope note (`AGENTS.md` mathematical rule 14).** The kill report states its objective
for **AA2FR**; its verdict line then widens to abelian-square-free generation in
general. This entry and row 125 follow the objective. Nothing here transfers to AA2F,
or to unrestricted abelian-square-free generation, without a fresh argument.

**Why (2) was shot down - by measurement:** the v0.33 audit recorded defect D2, a
*false frontier-compression benefit*. Measured at `L = 40`: `A_d = {1,...,d}` for **38
of 40 depths**, `max |A_d| = 38`, forced by the 342 ternary constraints, multiplicity 1,
and the quotient DAG is **the full legal prefix trie** - "maximally history-dependent".
The identity is retained for canonical accounting; it compresses nothing. The audit
records having checked these figures against its own frontier measurement, and records
in its own section 5 that it is an internal audit rather than external review.

**Conclusion:**
- The proposed bounded-state descriptor is withdrawn, and the frontier identity carries
  no measured compression benefit. Under the tested formulation the search state
  shatters rather than compresses.
- This is **consistent with an existing canonical non-claim**:
  `papers/paper4/PAPER_STATUS.md` already records that *"the 19 families are not
  automaton states"*. That is a disclaimer, and this entry does not upgrade it into an
  impossibility theorem.
- **What this does not kill, and a retraction that belongs here.** The accompanying
  transfer correction withdrew three earlier statements as *overreach in the negative
  direction*, and they must not be re-imported from this entry:
  - *"Direct prefix-local exact pruning cannot be done"* - **overreach**. What was shown
    is narrower: the 19-family data alone lacks constraint power under an unconstrained
    letter DFS. Pruning may still work with restricted continuation classes (fixed
    suffix dictionaries, restricted macro alphabets, template-conditioned languages).
  - *"Future certificates are computationally equivalent to DFS lookahead"* - no formal
    reduction or lower bound was ever given. Status: no cheaper certificate found *in
    the tested formulation*.
  - *"The 19 inequalities are a theoretical complexity shift"* - they are constraint
    **schemas**, not 19 global constraints; the number instantiated grows with `(s, K)`,
    domain type, role mask and target profile. SAT and ILP both encode NP-hard problems;
    no complexity class changed. Any solver speedup claim needs an A/B benchmark that
    has not been run.
- **Novelty:** NOT CLAIMED.
- **Finality, one label per half - they are not the same kind of result.**
  **BOUNDED** for the bounded-state descriptor (row 125): the argument is unfinished,
  and a completed proof with an exhibited witness block, or a different descriptor,
  could genuinely reopen it. This is an unfinished argument, not a closed door.
  **NECESSARY** for the frontier benefit (row 126): D2's measurement is exact at the
  `L = 40` frontier it measured and does not reopen with more compute.
  **CONTEXTUAL** for prefix-local pruning: not impossible, merely without a useful rule
  in the unconstrained-DFS setting that was tested.

---

## 32. A large exact future-count dimension as a structural theorem in itself

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 127 (`REJECTED`). Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/checkpoint_v2.6/CLAUDE_ADVERSARIAL_REFEREE_AUDIT_v2.3_2026-08-30.md` section 8, and
`rescue/paper6-raw-artifacts/checkpoint_v2.6/PAPER6_LITERATURE_NOVELTY_AUDIT_v0.1_2026-08-30.md`.*

> **PROVENANCE NOTE FOR THE WHOLE PAPER 6 BLOCK (sections 32-37).** These entries do not
> restore the 2026-08-31 Paper 6 harvest prose, and deliberately so. In that harvest
> **ten of eleven** candidate sections carried
> `docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md` in their
> `Evidence:` field -- a **Paper 3** h=2..7 profile-response intake, cited for Paper 6
> results *because it happened to be tracked*. The harvest audit corrected itself
> (`docs/research/PAPER4_6_NEGATIVE_RESULTS_HARVEST_AUDIT_2026-08-31.md`) and blocked all
> eleven candidates. **This is an audit and provenance failure, not a mathematical
> result**, and it is recorded here rather than as a claim: a tracked file is not
> supporting evidence merely because it is tracked. Two candidates additionally carried
> figures the preserved corpus does not support; those are corrected in sections 34 and
> 35 rather than repeated. Three further candidates remain **blocked for missing
> evidence** and are deliberately absent below.

**WHAT FAILED.** That the Paper 6 system's large exact future-count dimension is, on its
own, a structural theorem -- a new combinatorial constraint on words rather than a
measurement of one.

**HOW IT FAILED.** The preserved referee audit classifies the apparatus that produces the
number: weighted cutoff transfer matrices with Perron growth, and Hankel/Krylov minimal
future dimension, are both marked `CLASSICAL`; observable/dual measurement coordinates
and the recency alphabet frame likewise. Only the *specific* exact hierarchy is marked
`PLAUSIBLY NEW (system-specific)`. A large exact rank is what linear algebra over a
weighted automaton yields; the theorem, if there is one, has to be about *which*
coordinates are complete, not about the size of the number.

**SCOPE.** The interpretive claim only.

**WHAT SURVIVES / WHAT IS NOT CLAIMED.** The exact finite dimension is **not** rejected.
The preserved Paper 6 audit records an exactly certified hierarchy for the FULL-L4/Q2
system and calls it the checkpoint's strongest asset; **that result holds no canonical
ledger row and is not promoted here.** Nothing in this entry says Paper 6 lacks a
theorem; it says this particular route to one does not work.

**EVIDENCE.** As in the dateline. The audit rebuilt the apparatus in JavaScript from the
theorem statements alone: the derivation, algorithm, language and data-representation
axes differ from the original Python, while model/vendor, source corpus and human
reviewer are shared (`EPISTEMIC_DISCIPLINE.md` section 5). Implementation-independent
recomputation, not an external verification channel.

**FINALITY: CONTEXTUAL.** A statement about which apparatus is standard, not a
mathematical impossibility.

**MATH_CLAIMS ROW: 127.**

---

## 33. The adjacency decoration as the required descriptor, and the gap as Abelian geometry

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 128 (`REJECTED`). Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/checkpoint_v2.6/CLAUDE_ADVERSARIAL_REFEREE_AUDIT_v2.3_2026-08-30.md` sections 6.1, 6.2, 6.3, 7 and 12, and
`rescue/paper6-raw-artifacts/checkpoint_v2.6/P6_Q2_EXACT_SPACETIME_OBSERVABILITY_SPECTRUM_CERT_v0.1_2026-08-30.json`.
Provenance note: section 32.*

**WHAT FAILED.** That the four recency-gauged profiles plus the adjacency decoration
`S_2` (equivalently `epsilon`) are *the* required structural descriptor of the FULL-L4/Q2
future space -- and therefore that the observability gap reflects a special Abelian
geometry.

**HOW IT FAILED.** By exhibited counterexample, not by absence of proof. Four length-4
windows anchored at offset 0 of the stored 21-character suffix attain exact rank 1179 of
1179 and 1167 of 1167 with **no decoration at all**. That descriptor is deliberately
misaligned with the block grid and cannot see the last character of a length-21 state,
and it was checked over five primes -- 65521, 65519, 1000003, 999983, 2147483647 --
against an independently exact rational target, so the result is exact rather than
modular evidence. Two further decorations the fragment theory does not predict also close
the gap, one with fewer groups than `epsilon`. Necessity is refuted, not merely unproved.

**SCOPE.** The necessity claim and the geometric reading of the gap, for FULL-L4/Q2.

**WHAT SURVIVES / WHAT IS NOT CLAIMED.** Emphatically **not** that `epsilon` is generic,
and **not** that generic linear algebra explains the phenomenon. The preserved audit ran
a granularity-matched null control -- an arbitrary split of 287 randomly chosen families
at the same 2083 group count, seeds 1 to 5 -- and it added **exactly zero** rank, 1144
five times over. `epsilon` is therefore *not* a generic refinement. What the audit also
found is that splitting the same 287 families with an arbitrary bit does reach 1179, so
`epsilon`'s content is *which* families need refining, not *how*. **What this entry
establishes is a blocked inference, not a cause.** The exhibited alternative descriptor
refutes the necessity of the `epsilon` decoration and blocks the inference from the
observed gap to the proposed Abelian-geometric mechanism. No positive claim is made here
about what actually produces the gap; that would be a new mechanism, and it has no
ledger authority.

**EVIDENCE.** As in the dateline; independence axes as in section 32.

**FINALITY: NECESSARY** for the necessity claim -- a counter-descriptor is exhibited and
verified against an exact target, and no further compute reopens it. **CONTEXTUAL** for
the broader interpretation -- a systematic study of which descriptors attain 1179 could
still find a structural invariant, and the preserved audit recommends exactly that.

**MATH_CLAIMS ROW: 128.**

---

## 34. The 35-dimensional hidden sector as a startup artefact

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 129 (`REJECTED`). Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/checkpoint_v2.6/P6_Q2_MINIMAL_35_PHASE_REFINEMENT_EXACT_CERT_v0.1_2026-08-30.json` and
`rescue/paper6-raw-artifacts/checkpoint_v2.6/CLAUDE_ADVERSARIAL_REFEREE_AUDIT_v2.3_2026-08-30.md` section 6.3. Provenance note: section 32.*

**WHAT FAILED.** That the 35-dimensional hidden sector of the FULL-L4/Q2 static profile
measurement is merely a startup or transient artefact, removable by discarding the
startup sequence.

**HOW IT FAILED.** The deficiency is a property of the measurement, not of a transient.
Certified: the true grid gives **1796** measurement groups at profile-only rank **1144**
against exact target dimension **1179** -- a gap of exactly **35** -- and the certificate
records that at least 35 added measurement rows are necessary. Removing startup does not
help: on the persistent system the profiles-only rank is **1138** against **1167**, still
a gap of **29**.

**SCOPE.** Bounded to these two exact preserved finite systems at `L=4`/Q2. Nothing is
claimed for other block lengths, libraries or quotients.

**WHAT SURVIVES / WHAT IS NOT CLAIMED.** The exact certificates stand and are not
promoted here. **Figures deliberately withdrawn:** the historical form of this candidate
cited "rank 850 vs space 1176, or 326 hidden dimensions". Those are not used, because
they are not supported -- `850` and `326` appear in no Markdown anywhere in the preserved
corpus, only as incidental integers inside large JSON arrays, and `1176` there names a
different object, the rank of exact-current-response difference behaviours. The correct
preserved persistent comparison is 1138 against 1167.

**EVIDENCE.** As in the dateline; independence axes as in section 32.

**FINALITY: BOUNDED.** Exhaustive only inside the measured systems. A different
measurement design could genuinely reopen the question, and this entry should be read as
an unfinished measurement rather than a closed door.

**MATH_CLAIMS ROW: 129.**

---

## 35. Profile-incidence rank collapse as the direct semantic mechanism

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 130 (`REJECTED`). Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/proportional_relations.json` and
`rescue/paper6-raw-artifacts/checkpoint_v2.6/P6_Q2_PROFILE_ONLY_ROW_RELATIONS_RECONSTRUCTED_v0.1_2026-08-30.json`.
Provenance note: section 32.*

**WHAT FAILED.** That the rank collapse of the profile-to-state incidence matrix is
itself the direct semantic mechanism of future equivalence.

**HOW IT FAILED.** The collapse is substantially accounted for by structural dead states
and by rational two-row proportional aliasing rather than by deep right-context
equivalence. The preserved relation set holds **298** two-row proportional relations,
spread over **298** distinct dependent rows but only **72** distinct pivot rows -- a
concentration that is itself the point. The reconstructed row-relation certificate
resolves the profile-only system into **1144** pivot rows and **652** dependent rows over
six primes.

**SCOPE.** The semantic-mechanism interpretation.

**WHAT SURVIVES / WHAT IS NOT CLAIMED.** The raw rank and relation data are not rejected;
the incidence matrix still measures the constrained subspace it was built to measure.
**Figure deliberately withdrawn:** the historical form said "exactly 197 two-row raw
proportional relations were found". The preserved artifact holds 298, counted directly in
this session; no subset of it totals 197; and 197 is the one-profile observability index
of a *different* object in the same programme, with its own certificate file. It must not
be imported here. This is the same failure mode as section 24 -- a figure travelling out
of the run that produced it.

**EVIDENCE.** As in the dateline. The 298 was obtained by parsing the preserved JSON, not
read from a summary.

**FINALITY: CONTEXTUAL.** What fails is an explanatory reading of exact data that itself
stands.

**MATH_CLAIMS ROW: 130.**

---

## 36. One-step response aliasing as sufficient for future equivalence

*Logged 2026-09-04. Canonical claim: `MATH_CLAIMS.md` row 131 (`REJECTED`). Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/PAPER6_SEMANTICS_HIERARCHY_AUDIT_v0.1_2026-08-29.md` and
`rescue/paper6-raw-artifacts/theory_bundle/PAPER6_LATENT_OBSTRUCTION_MEMORY_KILL_v0.1_2026-08-29.md`.
Provenance note: section 32.*

**WHAT FAILED.** That equality or linear dependence of the complete one-step legal-next-
block response sets is sufficient to determine equality of future counts, and therefore
future equivalence.

**HOW IT FAILED.** Along two separate preserved paths.
- *Algebraically.* The semantics-hierarchy audit rebuilt the finite cutoff automata from
  definitions only -- alphabet, `aa2f` and `aa2fr` rules, suffix memory, weighted block
  transitions -- and records that `same profile -> same count` and `same one-step response
  -> same count` **both remain false**. The correct chain runs literal suffix state, then
  future-language semantics, then stable weighted/equitable semantics, then all-horizon
  count semantics, then Krylov/Hankel linear semantics.
- *Geometrically.* The latent-obstruction-memory kill test (gate P6-C4) reaches the
  analogue: an affine obstruction value unattainable at the present step can shift into an
  attainable one after future blocks, so a state keeping only currently-triggerable
  requirements is **not Markov-sufficient**.

**SCOPE.** The *sufficiency* of one-step response.

**WHAT SURVIVES / WHAT IS NOT CLAIMED.** The preserved audit records the one-step
response space as remaining a valid super-kernel -- every frozen semantic relation tested
continues to annihilate it. That is recorded, not promoted; it holds no ledger row.

**EVIDENCE.** As in the dateline. The best-evidenced item of this batch: two clean-room
reconstructions from definitions rather than one, reaching the same negative from
different directions, with the semantics audit independently reproducing the earlier
headline collapses 210 to 91 to 16 and 474 to 186 to 31. Both remain internal to this
project -- corroboration across two derivations, not an external verification channel
(`EPISTEMIC_DISCIPLINE.md` section 5).

**FINALITY: NECESSARY.** A sufficiency claim refuted by exhibited counterexample structure
does not reopen with more compute.

**MATH_CLAIMS ROW: 131.**

---

## 37. Paper 6 standalone novelty claims for the obstacle hierarchy and the counting compiler

> **NOVELTY / LITERATURE BOUNDARY -- NOT A MATHEMATICAL REFUTATION.** Nothing here says
> any Paper 6 mathematics is wrong. This entry has **no `MATH_CLAIMS.md` row on purpose**:
> novelty is a statement about the literature, so its canonical home is
> `LITERATURE_COVERAGE.md` section 2e, not the claim ledger
> (`EPISTEMIC_DISCIPLINE.md` section 13).

*Logged 2026-09-04. Canonical entry: `LITERATURE_COVERAGE.md` section 2e. Evidence
preserved on `rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):
`rescue/paper6-raw-artifacts/checkpoint_v2.6/PAPER6_BOUNDED_DEFECT_NOVELTY_AUDIT_v0.1_2026-08-30.md`,
`rescue/paper6-raw-artifacts/checkpoint_v2.6/PAPER6_COUNTING_NOVELTY_UPDATE_v0.1_2026-08-30.md`,
`rescue/paper6-raw-artifacts/checkpoint_v2.6/P6_LITERATURE_REFERENCES_v0.1_2026-08-30.json` (18 references with URLs).
Provenance note: section 32.*

**WHAT WAS WITHDRAWN.** Two standalone novelty claims, each on its own:
1. that formulating Abelian-square long-root obstructions as a hierarchy of
   second-difference bounded target layers is novel in itself;
2. that counting safe continuations via a Parikh-composition dynamic program is a novel
   algorithmic compiler technique in itself.

**ON WHAT BASIS.** Two preserved Paper 6 novelty audits, each naming specific overlapping
work rather than gesturing at it. For (1) the bounded-defect decomposition -- linear bulk
term plus bounded prefix/suffix corrections -- is reported as sitting inside an
established Abelian-template line, with the audit stating outright that this must not be
claimed as a first discovery. For (2) counting repetition-avoiding words and proving
exponential growth are reported as established themes, with named prior work including an
improved counting lower bound. **The works those audits name are deliberately not
reproduced here**: this project has not opened them, and `AGENTS.md` rule 1 is triggered
by writing such a citation at all, not by how it is labelled afterwards. They are queued
in `LITERATURE_COVERAGE.md` section 2e, which is where the audit artifacts are cited.

**WHAT IS NOT CLAIMED.** Not that Paper 6 "has no novelty" -- broader Paper 6 novelty is
**unassessed**, which is a different statement from unfavourable. The v3.6 graded-
transport theorem seed is explicitly **not adjudicated** here; the preserved v3.6
checkpoint labels itself `EXACT GENERAL THEOREM SEED -- NOVELTY UNASSESSED` and names its
own next gate. And the mathematics is untouched: both audits record the identities and
derivations as correct.

**CITATION DISCIPLINE.** What is canonical here is that *the preserved audits reached this
conclusion*, not that this project has confirmed it from sources. Those sources have not
been opened under this repository's standard, so their author/year/journal details are
not written into canonical files at all -- `AGENTS.md` rule 1 forbids writing the citation
before opening the source, and labelling it `AUDIT-QUEUE` afterwards does not satisfy the
rule. `LITERATURE_COVERAGE.md` section 2e cites the preserved audit artifacts themselves
and records the external works as an unverified queue that must be opened before any
canonical source claim is made.

**FINALITY: CONTEXTUAL.** A boundary drawn against known work, which further primary-
source reading can move in either direction.

**MATH_CLAIMS ROW: none, by design.** See `LITERATURE_COVERAGE.md` section 2e.
