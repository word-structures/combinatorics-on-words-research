# EPISTEMIC_DISCIPLINE.md

**Purpose:** This document is not about the mathematics. It is about how we handle claims, citations, and results in this project. It is the single most reusable output of this session — more valuable to the next agent than any individual finding, because it prevents the same class of mistakes from recurring.

Read this before writing to `MATH_CLAIMS.md`, `NEGATIVE_RESULTS.md`, or any tab-facing text.

---

## 1. Citation Protocol

**Rule:** A citation earns `LEVEL_2_VERIFIED_SOURCE` only if the current session has actually opened the primary source (or a clearly identified secondary source quoting it verbatim) and can point to the specific theorem, page, or line. A citation recalled from training data or from a prior session's summary is `UNVERIFIED` until re-checked, no matter how specific or confident it sounds.

**Why this matters:** Over the course of this project, a single real result (Rao & Rosenfeld's ternary abelian-square construction) was cited correctly, then incorrectly, then correctly again, across different sessions — including one instance where a session produced highly specific-sounding "verbatim" C++ variable names and LaTeX labels for a paper that, on inspection, was not actually the right paper. Confident specificity is not evidence of verification. It can be the opposite.

**Checklist before marking anything `LEVEL_2`:**
- [ ] Did this session fetch the actual source (not recall it)?
- [ ] Does the source's own content (theorem statement, formula, morphism definition) match what we're citing it for — not just the title?
- [ ] If a number, string, or formula is being copied from the source, has it been transcribed exactly, not reconstructed from memory?
- [ ] If two documents in this project disagree on a citation for the same fact, is that flagged and resolved before either is trusted?

**When resuming or reviewing prior work:** treat every existing `LEVEL_2` tag as a claim to spot-check, not a fact to build on. Citation drift happens silently between sessions.

---

## 2. Scope Precision

**Rule:** State the exact boundary of what was tested. Never generalize a bounded result to an unbounded claim.

**Pattern to avoid:** "Route A is exhausted" after testing only non-uniform morphisms with per-letter image length ≤ 6, drawn from one specific enumerable pool. The correct statement is: *"No primitive, prolongable non-uniform ternary morphism with individual images ≤ 6 characters (from pool P) produces a fixed point surviving past length 17 — independently verified, full enumeration of 294,912 candidates."* This is a real, useful, citable negative result. "Exhausted" is not.

**Test before writing any claim:** Can you name the exact parameter that was bounded (alphabet, length, image size, search depth)? If yes, put that parameter in the sentence. If the sentence is true without that parameter, it's over-general and probably false.

**This applies symmetrically to positive results too:** finding a longer example does not mean a shorter search's dead end was "wrong" in general — it means the shorter search had a narrower scope. Compare scopes, not just lengths.

---

## 3. Finite Computation and Infinite Claims

**Rule:** No finite search result — however long, however clean, however many workers agree — moves the needle on an infinite existence question. Not "makes it more likely." Not "less likely." A longer finite witness is more data of the *same kind* as before, not stronger evidence toward an unproven infinite claim.

**Symmetrically:** a heuristically-pruned search terminating early does not demonstrate the true (unpruned) search space is finite. It demonstrates the *pruned* space is finite. These are different claims and must be labeled as different claims.

**Banned framing (because it misstates what computation can prove):**
- "The conjecture is more/less alive than ever" after any single run.
- "This proves X is more likely" for any unproven existence statement.
- Treating a longer example as incremental progress toward a proof, unless it is actually part of a bounded, complete decision procedure (e.g. the CEGIS/Rao–Rosenfeld realizability check, which *is* a real decision procedure within its stated preconditions).

---

## 4. Heuristic vs. Exact Results Must Never Merge

**Rule:** If rule-set B is a strict subset of rule-set A (e.g. AA2FR ⊂ AA2F), then a B-search finding shorter examples than an A-search is not a discovery — it is arithmetic, guaranteed by the definitions. Do not narrate expected set-inclusion facts as empirical breakthroughs.

**What *is* worth recording** when this happens: a concrete instance where the stricter rule visibly discarded a specific extendable branch, and a correction to any place where a B-result was previously mislabeled as an A-result. That's a bookkeeping fix, not a mathematical one — record it as such.

**Every result must carry its exact rule-set label** (`aa2f`, `aa2fr`, `pure`, `heuristic`, alphabet size, morphism family) in the filename, the log line, and the ledger entry. No exceptions, no matter how obvious the mode seems from context.

---

## 5. Independent Re-verification Is Mandatory, Not Optional

**Rule:** Any generated word, count, or structural claim — before it is logged, celebrated, or reported to a person outside the project — must be re-checked by a *fresh, from-scratch* computation that does not reuse the search's own incremental state. This has caught real bugs in this project (a seed-locking issue that produced a false "universal dead end" signal) and confirmed real results (search-space sizes, survivor counts) that turned out to be exactly right.

- The check must use a different code path than the one that produced the claim.
- If a reported artifact (a word, a count) doesn't match on re-verification — including simple things like exact length — stop and resolve the discrepancy before writing anything down permanently.

**Name the dimensions.** "Independent" is not a property a check either has or lacks; it is a list. State, for each re-verification, which of these actually differ from the original: **derivation** (the mathematical argument), **algorithm**, **data representation**, **input generation**, **language**, **runtime**, **author**, **model/vendor**, **source corpus**, **human reviewer**. A check that shares the derivation is not independent evidence for the derivation, however different its code is.

Two checks that share a conceptual error are not independent merely because they live in separate files, were written at different times, or were produced by different sessions. The shared component is exactly where the risk sits, so it is the component that must be named rather than the differing ones.

**AI plurality is not independence.** A second AI analysis is not automatically an independent verification channel. Neither is another prompt to the same model, another session, a related model working from the same artifacts, several agents reusing the same search vocabulary, nor several vendors whose training corpora and source dependencies may be correlated. Different vendors are not perfectly independent either: the correlation is *unmeasured*, not *absent*, and an unmeasured correlation cannot be reported as an axis that differs. Treat an AI channel as **corroboration** until at least one non-model axis genuinely differs. AI plurality may increase robustness; it does not by itself establish epistemic independence.

This project has already miscounted on exactly this axis: `MATH_CLAIMS.md` row 6c described a *"fourfold verification"* in which one of the four channels was another AI's analysis of the same artifacts. Corrected 2026-08-31 — the mathematical content of the row was not touched, only the classification of the channel.

**This project has already paid for this lesson once:** `NEGATIVE_RESULTS.md` §10 records a definition-level verifier that worked flawlessly and still did not check what it was meant to check — *"the independence axis was wrong, not the idea."* Listing the axes in advance is what would have caught it.

---

## 6. Self-Assessment Discipline

**Rule:** No session grades its own output "perfect," "10/10," or "not a single error." If asked to review completed work, the task is to find the counterexample, not to confirm success. Grandiose self-assessment is itself a signal to slow down and check harder, not a signal of quality.

**Rule:** Avoid narrative/dramatic language in technical logs — "monumental," "epistemological reset," "scientific bomb," "elävä hengittävä tutkimuslaitos." If a result needs adjectives to sound important, restate it in plain, bounded, numeric terms instead. If it's still important, the numbers will show it.

---

## 7. Application and Impact Claims Get the Same Scrutiny as Math Claims

**Rule:** A claim like "this connects to cryptography / DNA design / line coding" is a factual claim and needs the same sourcing standard as a theorem citation — not a lower bar because it's framed as inspiration rather than proof. Loose family resemblance between fields ("both involve avoiding repetition") is not the same as an established, citable application. When in doubt, cite the precise adjacent field and its actual technique (e.g. "DNA codeword design," which is a real field using cross-hybridization distance metrics — a related but distinct problem from abelian square avoidance) rather than implying direct applicability that hasn't been checked.

---

## 8. Numeric Drift Checklist (run before any ledger update)

- [ ] Does this number already exist elsewhere in the project's docs under a different value? If yes, which is correct, and why did it change?
- [ ] Was this number computed exhaustively, or extrapolated/estimated? Label which.
- [ ] Was the reduction factor (e.g. a symmetry-based dedup) verified against the raw, unreduced computation at least once?
- [ ] Does the claimed artifact (word, file, string) match its own stated metadata (length, mode, alphabet) on direct inspection?
- [ ] Does the verifying script contain the expected value as a literal? If so it is a **drift detector, not verification** — independent confirmation requires a different derivation path. (A drift detector is worth having; it just must not be reported as a check of the value.)

---

## 9. One-Line Summary for New Sessions

> Verify before citing. Scope before generalizing. A longer finite example is not a proof of anything infinite. Never let a restricted rule's result stand in for the general one. Re-check everything from scratch before it goes in the ledger. Report results in numbers, not adjectives.

---

## 10. Verification Boundary and Claim Boundary

*Added after §9 deliberately: §9 is referenced elsewhere as "the one-line summary", so it keeps its number.*

**Rule:** What the machine established and what the project states are two different boundaries. When they differ — and they almost always do — **write the gap down in the same place as the result**, not in a separate caveats document that can be read apart from it.

The verification boundary is what a specific run actually decided, at the parameters it actually used. The claim boundary is the sentence the project is willing to defend. A result is only safe to record when both are stated and the distance between them is visible.

**Recurring gap types.** Each of these has occurred in this project:

| Verified | Often written as |
|---|---|
| a finite window of a word | a property of the infinite word |
| a bounded parameter range (`K ∈ [6,40]`, `m ∈ [2,120]`) | all values of that parameter |
| one fixed morphism family, one source morphism | arbitrary morphisms |
| a sampled benchmark on one machine | a workload-independent speedup |
| two implementations agreeing | the mathematics being proved |
| no local citation found | the result being new |

The first three are covered in detail by §2 (Scope Precision) and §3 (Finite Computation and Infinite Claims); the fourth by §7; the sixth by §1. This section does not restate them — it names the shared shape so the pattern is recognisable in cases the earlier sections do not anticipate.

**The composition trap.** When two verified stages are combined, the claim's boundary is the *union* of their boundaries, not the tighter one. A live instance: the L=5 Route-C pipeline's Stage A examines the first **98,415** coded symbols while Stage B examines the first **3,645**. A combined statement's window is 98,415 — 27× larger than the number a reader would take from the Stage-B side alone. Nothing was wrong with either stage; the gap lives entirely in the join.

**Practical test before recording anything:** write one sentence for what was verified and one for what is being claimed. If they are the same sentence, one of them is wrong.

---

## 11. Immediate Capture vs. Claim Acceptance

**Rule:** Canonicalization (capturing a result in the repository) is part of doing the research, but claim acceptance remains a separate human-gated review decision. Immediate capture does not imply claim acceptance.


---

## 12. The Artifact Boundary

*§10 separates what a computation verified from what the project claims. This section adds one more boundary, on a different axis: what the **source** says and what the **reader receives** are not the same object.*

**Rule:** A source-level check is not evidence about the delivered artifact. Verify the artifact in the form the reader gets it.

**Why this matters:** the Paper 4 preprint v1.0 → v1.1 audit found the mathematics closed, correct, and unchanged — and the title page still wrong (the author block omitted the project identity entirely), and the nineteen-family table still splitting across a page boundary, so that a table asserting "exactly nineteen" displayed eighteen rows and then one. Neither defect is *in* any claim, so no claim-level check could ever have seen them.

**The symmetric error is worse, and this project made it.** Working from `pdftotext -layout` output, that same audit reported five defects — missing `κ`, `≥` and minus glyphs in a figure; overprinted figure labels; three misaligned tables — and **every one was false**. A text extractor infers reading order from glyph coordinates, so it manufactures precisely the appearances (column drift, collided baselines, glyphs silently dropped for want of a `ToUnicode` map) that a layout defect would produce. *The proxy's failure modes were isomorphic to the defect being hunted.* Five suspected defects, five disproofs, one rendered page each.

Add to §10's table of recurring gaps:

| Verified | Often written as |
|---|---|
| the source is correct | the delivered artifact is correct |
| a proxy view of the artifact | the artifact |

**Practical test:** before recording a defect in a delivered artifact, name the observation you actually made. If the answer is "a tool's textual rendering of it" rather than "the artifact as a reader sees it", you have located a candidate, not established a defect.

**Corollary — record the disproofs.** A suspicion investigated and found empty is a result, and it costs as much to obtain the second time as the first. Write it down with its disproof. See `AGENTS.md`, "Artifact and release protocol", rules 1 and 4.

---

## 13. The Axes Are Separate

*§10 and §12 each separate one pair of boundaries. This section states the general shape: **truth, mechanism, generality, importance and novelty are different axes, and none of them is evidence for another.***

**Rule:** never let a result's standing on one axis silently raise its standing on another.

| Axis | Question | Where its status lives |
|---|---|---|
| **Truth / evidence** | Is the statement established, and by what route? | `MATH_CLAIMS.md`, status column (`PRIMARY` / `COMPUTED` / `INDIRECT` / `REJECTED`) |
| **Mechanism** | Do we know *why* the phenomenon occurs? | `MATH_CLAIMS.md`, mechanism-status column (§14 below, and the ledger's own preamble) |
| **Generality** | Does it survive beyond the instance it was fitted to? | the claim sentence itself — §2 requires the bounded parameter to be *in* the sentence; `PAPER_LIFECYCLE.md` Gate 2 owns it for a paper |
| **Importance** | Does it answer a question someone was asking? | no status field, deliberately: it is an editorial judgement, and a status field would invite self-scoring (§6) |
| **Novelty** | What is the documented state of prior-art review? | `LITERATURE_COVERAGE.md`, `NOVELTY_STATUS` |

**Inferences that are not permitted:**

- an exact computation does not establish a mechanism;
- a mechanism surviving in two instances does not make it a theorem;
- a theorem is not thereby novel;
- a novel result is not thereby important;
- an attractive, simple or well-narrated interpretation is not thereby true;
- a result becoming *harder* to narrate does not make it less true.

**The mechanism axis moves independently of the truth axis, in both directions.** A mechanism may be demoted without demoting the exact fact underneath it, and this is the normal outcome of a successful kill test, not a failure of the research:

> The fact survived; the mechanism did not.

When a mechanism fails: keep the exact fact at its existing truth status, mark the mechanism `FALSIFIED` in the ledger, write the negative result to `NEGATIVE_RESULTS.md` with its scope parameters per §2, and **do not rewrite the surrounding prose so that the failed interpretation was never held.** A story with no visible demotions is not a story of uninterrupted progress; it is a story someone has been editing.

Avoid *"the mechanism was mostly right"* unless a precise surviving subclaim is stated. After survival, prefer *survived the registered kill test*, *independently reproduced*, *replicated in a second instance*, *now merits a general proof attempt* — and reserve *theorem* for after the proof.

---

## 14. Object Identity and Closure

*Many serious computational failures in this project's field are not arithmetic errors. They are **semantic object mismatches**: the number is computed correctly, for a different object than the one being discussed.*

**Rule — every decision-gating number carries a mathematical noun.** Before a number is compared, interpreted, or allowed to change a claim's status, record which exact object it belongs to.

Bad:

> `rank = 55`

Better:

> the rational rank of *[precisely named matrix]* restricted to *[precisely named state selection]*

Distinctions that must not be collapsed under one informal label:

- raw states vs. quotient states;
- a raw recurrent core vs. the raw members represented by recurrent quotient classes;
- an induced subgraph vs. a closed subsystem;
- a startup / mixed regime vs. a saturated regime;
- a weighted quotient vs. the literal-state system;
- the full future vs. the persistent future;
- transition equivalence vs. future-count equivalence.

If two selections have different semantics, they never share an informal name. This is a research-validity rule, not an exposition rule: `AGENTS.md`'s "every large number needs a noun" governs how a number is *presented* to a reader, and this section governs whether the number may be *interpreted* at all.

**Rule — closure is checked, not assumed.** If a restricted subset `S` is used as a standalone dynamical or counting system, verify closure:

> if `x ∈ S` and `x → y` is legal, then `y ∈ S`.

Restricting to a visually natural subset can change the dynamics. Where closure fails, an induced subgraph silently deletes legal continuations, so it answers a **different mathematical question** — often one that looks like the intended one and returns plausible numbers. Either use a closed system, justify the restriction mathematically, or state explicitly that the induced subsystem has different semantics. Do not report a closure check as done when what was checked is that the subset *looks* natural.

---

## 15. `DERIVED` / Level 1P Internal Proof Status

> **STATUS: PROPOSAL, RESCUED 2026-08-31 — NOT YET OWNER-ACCEPTED.**
> The token is declared in the ledger's vocabulary and accepted by the parser,
> and **no ledger row uses it.** Reclassifying any existing row is a separate
> decision that this section does not make. See "What this proposal does not
> settle" below.

**Rule:** mathematical derivations that are internally proved but lack external source verification use the `DERIVED` (`LEVEL_1P_INTERNAL_PROOF`) status. To qualify:

- a complete, written derivation must exist;
- all assumptions and quantifiers must be explicit;
- the derivation must be reproducible without relying on the discovering AI's hidden reasoning;
- independent re-derivation or hostile proof audit remains required before stronger promotion;
- this status carries **no** literature-novelty implication;
- this status carries **no** external-verification implication.

**The gap it addresses.** The truth axis (§13) asks *by what route is this established*, and until now it offered one internal answer: `COMPUTED`, defined as verified computationally in this project. That single token spans two genuinely different things — a finite window checked by machine, and an exact algebraic derivation that decides a question outright. The ledger has been compensating for this in prose. Row 17 interrupts itself to say the quality differs from other Level 1 rows, *"tämä ei ole äärellisen ikkunan empiirinen havainto vaan eksakti algebrallinen johto"*; row 20 opens with the same disclaimer; row 99 describes *"a short, exact linear-algebra proof"* while carrying `COMPUTED`. When rows have to explain in free text that their status understates them, the status vocabulary is missing a value.

`DERIVED` sits between `COMPUTED` and `PRIMARY` on that axis: stronger than a finite computational check, weaker than a claim verified against an external source. It is **not** a claim of novelty, importance, or generality — those are separate axes (§13), and a `DERIVED` row's `NOVELTY_STATUS` remains `NOT_ESTABLISHED` exactly as before.

**What this proposal does not settle**, and what an owner decision must:

1. **Which rows, if any, move.** 56 of the ledger's `COMPUTED` rows mention an exact derivation or proof in their text. That is a *candidate* set discovered by keyword, not a reviewed one. Migrating rows is per-row evidence work under `AGENTS.md` rule 1, not a bulk relabelling — and a bulk relabelling is precisely the operation rule 8 warns destroys calibration.
2. **Whether `LEVEL_1P` is the right name.** It is chosen to sort between Level 1 and Level 2 and reads as a patch on a numbering scheme rather than a concept. `DERIVED` alone may be the better public token.
3. **Whether a proved derivation should instead raise the *mechanism* axis.** `PROVED MECHANISM` already exists there. If a row's proof explains *why* rather than establishing *that*, it may belong on that axis instead — and some rows will legitimately want both.

Until those are decided, the correct reading of this section is: the gap is real and attested by the ledger's own prose; the remedy is drafted; nothing has been reclassified.
