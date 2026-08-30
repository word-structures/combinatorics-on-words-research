# AGENT WORKFLOW & MATHEMATICAL CLAIMS PROTOCOL
*(This document is mandatory reading and must be followed by every AI agent and developer working in this repository.)*

## Mathematical claims protocol (mandatory for every session)

1. **CITE BEFORE YOU CODE:** if you are about to write an author/year/journal/theorem-number citation into any file (code, MD, UI text), you must first fetch and open that source (DOI/arXiv identifier) and quote briefly (max ~15 words) the exact passage the claim comes from. "I recall someone saying..." or a second-hand paraphrase (e.g. another website's description of the paper) is NOT sufficient as a primary source — it is a secondary source and must be labelled as such.

2. **TWO LEVELS, NEVER ONE:** every morphism/constant/claim in `MATH_CLAIMS.md` gets exactly one of the following statuses, never implicitly either:
   - `LEVEL_1_INTERNAL_CHECKSUM`: proves only that the data has not changed between commits. Does NOT prove external correctness.
   - `LEVEL_2_VERIFIED_SOURCE`: someone has opened the primary source and compared it character by character / sentence by sentence. Requires a URL/DOI + date + a short quote stored next to the claim.
   The default for new data is ALWAYS Level 1, never Level 2, unless verification has just happened and is documented.

3. **LANGUAGE CALIBRATION for finite checks:** use phrasing like "no violations found in [a,b]" or "in an N-symbol prefix" — never "confirmed", "proven", "certified" without an exact, bounded window stated right next to it.

4. **PROVENANCE IS RECORDED IMMEDIATELY, NOT AFTERWARDS:** when you generate, extract, or derive a string/constant from any source (another paper, a website, your own search or mining), write in the SAME commit message exactly where it came from and how confident you are. "I am not sure where this came from" is an acceptable and desirable sentence in a commit message when it is true — better than a fabricated precision that later has to be unpicked forensically.

5. **HUMAN APPROVAL BEFORE COMMIT/PUSH** whenever a change touches `MATH_CLAIMS.md`, `morphisms.js`'s canonical data, or any UI text presenting a scientific claim or badge status. Routine bug fixes (e.g. data-type overflow fixes) that do not depend on an external source may be committed independently.

6. **PERIODIC RE-VERIFICATION:** as Level 1 claims accumulate, do not let them sit forever as an "empirical" default that nobody ever tries to raise to Level 2. Add a "last attempted to trace: [date]" column to the claims ledger so it is visible which claims have gone stale without anyone even trying.

7. **THE LEDGER HAS EXCLUSIVE RIGHTS (NO UNCLAIMED FINDINGS IN PROSE):** no mathematical or empirical "finding", "proven" claim, or absolute conclusion may appear in any documentation (even in brainstorming, vision, or planning papers) without a matching entry and status in `MATH_CLAIMS.md`. If a claim is not registered in the ledger, it is only a proposal or a preliminary hypothesis, and the text must be written strictly accordingly (e.g. *"the scanner found no candidate in this bounded search space"*, never *"the scanner proved"*).

8. **RECORDING LANGUAGE IS ENGLISH:** all new documentation, code comments, commit messages, module output, and ledger rows are written in **English**. The reason is research-driven, not stylistic: the field's literature, citations, and any prospective collaborators are English-speaking, and a claim an outsider cannot read is not verifiable. **Discussion with the maintainer is conducted in Finnish** — this rule governs the recorded trail, not the interaction. **Migration:** documents previously written in Finnish are translated as they get touched anyway, for other reasons. `MATH_CLAIMS.md` is translated **one row at a time, only when that row is touched anyway — never as a mass translation.** Calibrated language ("no violations in [a,b]") is exactly what a mass translation loses, and that calibration is the ledger's entire value. Citations always remain in their original language.

9. **NO RAW LOG, NO PROOF:** a summary of what a command or script did is not evidence that it did it. When reporting a computation's result — in a ledger row, a commit message, or to the maintainer — the raw output (or a representative excerpt of it) must actually have been read, not paraphrased from memory of what the code was supposed to print. This rule exists because of a concrete failure: `MATH_CLAIMS.md` row 105 (2026-08-02) described a Hankel-rank computation on two specific sequences that its own cited script never performed — the script ran, produced output, and the row was written from what the script was *supposed* to do rather than what its output actually showed. It was caught only when someone opened the script itself, not the summary of it.

10. **INTERFACE CONTRACT BEFORE CODE:** before editing any file that already has readers depending on its current shape (a UI, a public API, another module's `require()`), state up front what the change does *not* alter — e.g. "this does not change the slide count, the color variables, or any function signature `enumerateSAbelian` callers rely on." This is a scope fence, not a formality: it is the difference between a targeted fix and an incidental rewrite that quietly changes behavior nobody asked to change.

11. **FINAL REPORTS ARE TABLES, NOT ESSAYS:** a session or task's closing summary is reported as rows of `Claim | Source | Reproduced? | Matches?` (or the equivalent for the task at hand), not narrative prose. A table cannot smuggle in an unearned "we did it" — every cell has to be either true or empty. Free-text summaries are where overclaiming has repeatedly crept in; a table structurally forbids the sentence that isn't backed by a specific, checkable cell.

12. **THE LINTER IS MANDATORY, NOT A REMINDER:** `node scripts/check-claims-drift.js` (and `node tests/test.js` when `MATH_CLAIMS.md`, `src/`, `scripts/`, or `tests/` change) run automatically as a pre-commit hook (`scripts/git-hooks/pre-commit`, installed once per clone via `node scripts/install-git-hooks.js` — see `CONTRIBUTING.md`). A rule stated in prose can be forgotten under context pressure; this cannot silently be skipped without `git commit --no-verify`, which is itself a decision that must be explained if taken.

13. **SEED HYGIENE FOR PURE RUNS:** Never seed a `--pure` run with the exact output word of a heuristic run. Use either a short/neutral seed (e.g. "a") or another long seed that was itself discovered entirely in `--pure` mode from a neutral seed. This prevents locking the algorithm into paths arbitrarily restricted by past heuristics.

14. **EXPLICIT MODE LABELING:** Every output filename and log entry must explicitly state the rule used (e.g., `_pure` vs `_heuristic` / `_aa2fr`). Pure (AA2F) and restricted (AA2FR) results must never be mixed or ambiguously labeled.

15. **EXHAUSTION REPORTING MUST STATE BOUNDS:** Every "exhausted search space" report must explicitly state whether the search was permitted to backtrack below the initial seed (`minLength=0`) or if the seed was locked (`minLength=seed.length`). A search exhaustion with a locked long seed is a local dead end, not a global one.

16. **A LONGER FINITE WORD IS NOT PROOF OF AN INFINITE ONE:** Finding a longer valid finite sequence does not make the existence of an infinite sequence "more likely". It is strictly just a longer finite example. Do not use hyperbolic framing (e.g., "the conjecture is stronger than ever") when referring to finite records.

17. **INDEPENDENT POST-CHECK IS MANDATORY:** Every claimed record must be validated by an independent checker (e.g. `verifyAa2fr`) that verifies the word post-generation. Never skip this check assuming the generation code is flawless.

## Repository file placement and experimental-output handling (mandatory for every session)

1. **NO ROOT FILES BY DEFAULT:** do not create new files in the repository root by default.

2. **CLASSIFY BY PURPOSE:**
   - `src/` — reusable implementation code.
   - `scripts/` — reusable CLI, research, development, migration, or maintenance tooling.
   - `tests/` — automated regression, correctness, integration, or reproducibility tests.
   - `scratch/` — temporary experiments, diagnostics, one-off probes, debug output, generated investigation material.
   - `docs/` — current project documentation.
   - `docs/archive/` — intentionally preserved inactive/historical material.
   - `research/` — canonical research/evidence artifacts and research-program material.
   - `datasets/` — deliberately tracked datasets with documented provenance, rights/status, and intended use.
   - `.github/` — GitHub workflows, issue forms, PR templates, and repository automation.

3. **ROOT IS RESERVED FOR:** canonical top-level project documents; conventional package/configuration metadata; files demonstrably required at root by the current GitHub Pages deployment; explicitly owner-approved exceptions.

4. **EXISTING ROOT FILES ARE NOT PRECEDENT** for adding new root files.

5. **AMBIGUOUS PLACEMENT IS NOT DEFAULTED TO ROOT:** if placement is genuinely ambiguous, report the proposed file, its purpose, its permanence, and the candidate path, and wait for owner review.

6. **INSPECT BEFORE COMMIT:** before every commit, inspect all modified and untracked files.

7. **REPORT EVERY NEW ROOT FILE:** explicitly report every newly created root-level file.

8. **UNTRACKED BY DEFAULT FOR GENERATED OUTPUT:** generated/reproducible experiment output should normally remain untracked unless it is itself required evidence, provenance, or a published artifact.

9. **AI AUTHORSHIP IS NOT A REASON TO COMMIT:** experimental material does not enter Git history merely because an AI agent created it.

10. **NO AUTOMATIC GIT OPERATIONS ON EXPERIMENTAL MATERIAL:** AI agents must not automatically stage, commit, move, delete, or push experimental material without explicit owner authorization.

11. **A CLEAR LONG-TERM PURPOSE IS REQUIRED FOR GIT HISTORY:** a file should enter Git history only when preservation has a clear long-term purpose such as implementation, reproducibility, testing, documentation, provenance, evidence, or public functionality.

## Artifact and release protocol (mandatory whenever a released artifact is produced)

*The mathematical claims protocol above governs **claims**. This section governs the **artifact a reader actually receives** — a PDF, a built page, a released dataset. A claim-level check cannot catch an artifact defect, because the defect is not in any claim: the mathematics can be entirely correct while the title page is wrong. See `docs/research/PAPER_LIFECYCLE.md` for where these rules sit in the paper lifecycle.*

1. **OBSERVE THE ARTIFACT, NOT A PROXY:** a claim about what a delivered artifact looks like must be evidenced by that artifact in the form the reader receives it — a rendered page, not a text extraction; the built output, not the source. Extraction tools *locate*; they do not *evidence*. This rule exists because of a concrete failure: the Paper 4 preprint v1.1 audit (2026-08-29) raised five defects from `pdftotext -layout` output — missing `κ`/`≥`/minus glyphs in Figure 1, overprinted labels in Figure 3, and three misaligned tables — and **all five were false**, each disproved by rendering a single page. The cause is structural, not careless: a text extractor reconstructs reading order from glyph coordinates, so its own failure modes (column drift, baseline collision, glyphs dropped for want of a `ToUnicode` map) are isomorphic to the layout defects being hunted.

2. **BASELINE REBUILD BEFORE ANY EDIT:** before changing a source that produces a released artifact, rebuild the **unchanged** source with the current toolchain and show that it reproduces the released artifact. Without this control every later difference is ambiguous between "my edit" and "the toolchain". In the v1.1 build this control passed — 25 pages, extracted text identical to v1.0 after whitespace normalisation — and it is the only reason a three-line changelog can be trusted. When the historical toolchain is gone, this control is what replaces it; do not reconstruct discarded build intermediates for their own sake.

3. **A REPAIR THAT WORSENS THE ARTIFACT IS REVERTED, NOT KEPT:** every repair is re-observed against the pre-repair artifact, and rejected attempts are recorded rather than silently dropped. Two of the three v1.1 repair attempts removed a one-row table orphan by introducing a 45–70% blank page; the accepted repair (declaring table column widths so no cell wraps) removed the orphan with no blank page and no content change. A fix must be smaller than the defect it fixes.

4. **A DISPROVED SUSPICION IS RECORDED, NOT DISCARDED:** when a suspected defect is investigated and shown not to exist, write it down **together with its disproof**, and do not re-raise it without new evidence of a different kind than the evidence that disproved it. Otherwise the next session pays full price to re-derive the same false defect — which is exactly what would have happened to all five items above. Defect classes: `CONFIRMED`, `DISPROVED`, `OUT_OF_SCOPE`, `ACCEPTED_RESIDUAL`, `UNRESOLVED`.

5. **UNVERIFIABLE HISTORICAL PROVENANCE NEVER EDITS CONTENT:** if a stated historical hash cannot be located, that is a record-keeping gap. It does not license rewriting scientific text, and it does not block release. Anchor provenance **forward** — hashes computed now, from the files actually used now. Motivating case: the stated consolidated Paper 4 manuscript hash `6df6d6a7…` was not found anywhere on disk, while the stated v1.0 PDF hash verified exactly; because the manuscript asserts no hash of its own, nothing required correction.

6. **A NUMBER THAT GATES A DECISION MUST HAVE AN EXACT ROUTE:** no floating-point result may change a claim's status — least of all to a negative — without confirmation by an exact or symbolic computation. Motivating near-miss: a QR iteration reported the subdominant eigenvalue of the `h6` incidence matrix as `0`, which would have killed a research line as "bounded discrepancy"; the exact characteristic polynomial `x³(x−3)(x²−3)` gives `√3`, independently corroborated by `trace = 3` and `rank = 4` (see `MATH_CLAIMS.md` row 115).

## Human comprehension and visual exposition (mandatory for every manuscript)

*The protocols above govern whether a result is **true** and whether the delivered artifact is **correct**. This section governs whether a mathematician outside the discovery context can **use** it. Full protocol: `docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md`. Gate integration: `docs/research/PAPER_LIFECYCLE.md` Stage 6H, Stage 7, Stage 8. This rule exists because Paper 4 passed every gate the project had and an external mathematician still reported that the setup and terminology were harder to enter than necessary — the authors met `carry domain`, `support family`, `unresolved role`, `affine target` and `mask` one at a time over months; the reader meets all five on page two.*

1. **NOUN BEFORE SYMBOL:** the reader must know what an object *is* before it is given `σ`, `Δ`, `Q`, `κ` or any other symbol.

2. **MOTIVATE BEFORE DEFINE:** state the problem a concept solves before the concept exists. A formal definition is never a concept's first appearance.

3. **ONE RUNNING EXAMPLE PER CENTRAL MECHANISM:** at least one concrete object survives several sections and grows more abstract with the exposition. Isolated examples do not satisfy this.

4. **PAPER-AND-PENCIL WITNESS:** every computer-assisted headline carries a human-scale instance a reader can check without running anything. Exhaustive computation is not replaced; its *semantics* is made inspectable.

5. **REPRESENTATIONAL BRIDGE:** central mechanisms are supported across concrete, visual, algebraic and structural views, and the reader can move between them **in both directions**. Picture-to-equation without equation-to-picture means the views are not yet integrated.

6. **FIGURES ANSWER QUESTIONS:** no decorative figures. Every symbol in a figure uses the same glyph as the text, labels sit next to what they label, and each caption states what is shown, what to notice, and what it does **not** prove.

7. **SYMBOLIC PROOF ≠ FINITE VALIDATION:** exposition must not blur the boundary that the claims protocol and `EPISTEMIC_DISCIPLINE.md` §3 keep apart.

8. **EVERY LARGE NUMBER NEEDS A NOUN AND A NON-INTERPRETATION:** say what it counts or dimensions, and what it does not imply. `218298 → 2691 → 2689 → 1179` is not a result until every arrow carries an operation and every number carries a noun.

9. **READER REFEREE:** Stage 7 includes a fourth referee who is outside the discovery context and must *paraphrase* the paper back, not approve it. A mis-paraphrase by a competent reader is an exposition defect even when the definition is formally correct. Template: `docs/research/READABILITY_REFEREE_TEMPLATE.md`.

10. **NO AI-ONLY SEMANTICS:** an AI may assist comprehension, but the conceptual bridges must be **in the paper**. An AI can reconstruct a missing bridge from filenames, code, prior sessions and project memory; a reader cannot. If the bridge exists only when an AI supplies it, it is not written yet.

*Scope limit: these are exposition rules informed by adjacent research, not a theorem about how mathematicians read. Picturability is not a truth criterion and not every theorem needs a figure — every important abstraction needs a **traceability route**, which may be a figure, a table, a worked example, a contrast case, or a hand-checkable calculation.*
