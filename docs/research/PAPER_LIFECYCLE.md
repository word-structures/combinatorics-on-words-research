# PAPER_LIFECYCLE.md — how a research paper is born and reaches release

**Status:** canonical process document.
**Scope:** governs a *paper* as an object moving toward release. It does **not**
duplicate claim governance — `MATH_CLAIMS.md` remains the single ledger for
mathematical claims, and `LITERATURE_COVERAGE.md` for prior art.

---

## 1. Why this document exists

This repository already governs **claims** well: `MATH_CLAIMS.md` holds every
claim with its verification level, `EPISTEMIC_DISCIPLINE.md` holds the rules
earned from past failures, `AGENTS.md` holds the protocol. What it has never
had is a governance layer for a **paper**, and for the **artifact a reader
finally receives**.

Two lifecycles run in parallel and must not be conflated:

```
CLAIM lifecycle      conjecture -> derived -> independently audited -> novelty-assessed
                     owner: MATH_CLAIMS.md                        (already existed)

ARTIFACT lifecycle   source -> reproducible build -> rendered artifact -> observed -> released
                     owner: this document + AGENTS.md "Artifact and release protocol"
```

The Paper 4 preprint audit (2026-08-29/30) is the motivating case: the
mathematics was closed and correct, and the delivered PDF still had a wrong
title page and a table split across a page boundary. No claim-level check can
see either, because neither defect is in a claim.

---

## 2. The gates

A paper moves through ten gates. **A later stage may never silently repair an
earlier one.** If a blocker is found, the paper returns to the stage that owns
it.

A gate is never skipped. It is closed either as passed, or explicitly as
`NOT APPLICABLE — because …`.

| # | Gate | Owns | Exit condition | Evidence lives in |
|---|---|---|---|---|
| 0 | Discovery | finding mathematics, mechanisms, counterexamples | a candidate theorem or exact question fits in one paragraph, **and** the cheapest measurement that could kill the direction has been named and run | `scratch/`, `NEGATIVE_RESULTS.md` |
| 1 | Claim Freeze | what exactly is being claimed | another agent can state precisely what would refute it | `MATH_CLAIMS.md` |
| 2 | Proof Closure | the derivation | every theorem-level claim is proved or explicitly downgraded; no "remaining cases analogous" without a stated symmetry | `MATH_CLAIMS.md`, proof artifact |
| 3 | Independent Kill | adversarial re-derivation | counterexample frozen, or independent PASS **with its independence axes named** per `EPISTEMIC_DISCIPLINE.md` §5 | audit report |
| 4 | Novelty Kill | prior art | highest-risk primary sources read or explicitly unresolved; strongest *safe* novelty sentence written; known machinery disclaimed | `LITERATURE_COVERAGE.md` |
| 5 | Reproducibility | computational headlines | a fresh researcher reproduces every computer-assisted headline with no hidden local state; no cap silently means UNSAT | evidence capsule under `docs/research/evidence/` |
| 6 | Manuscript Architecture | the story | abstract, introduction, theorem hierarchy and section plan tell one story; chronology and dead ends removed; **and Stage 6H closes** | manuscript |
| 6H | **Human Comprehension** | whether an outsider can follow the story | see §3.5 | manuscript, reader-friction ledger |
| 7 | Hostile Referee | content defects | specialist / proof / computational / **reader** referees each return ACCEPT–MINOR–MAJOR–REJECT | referee report |
| 8 | **Artifact Closure** | the delivered object | see §3 | submission audit + hash manifest |
| 9 | Owner Promotion | release | owner decision; hashes frozen; non-claims explicit | Git history, release note |

Stage 8 is the gate this project did not have. It is described in full below.
Stage 6H is a **sub-gate of Stage 6**, not a tenth gate: the numbering of Gates
0–9 is unchanged.

---

## 3. Stage 8 — Artifact Closure

Owns the object, never the mathematics. If it finds a mathematical problem it
**back-routes to Stage 2 or 3** and does not fix anything itself.

**Entry:** manuscript content frozen by Stage 7.

**Gate conditions.**

1. **Baseline rebuild passes.** The *unchanged* source rebuilds with the current
   toolchain and reproduces the previously released artifact (page count and
   normalised text). Only then is any edit made. Without this control every
   later difference is ambiguous between the edit and the toolchain.
2. **Every audited page observed as a rendered image** — at minimum the title
   page, every figure page, every table, and the first and last page. Text
   extraction may locate candidates; it may not evidence a defect
   (`AGENTS.md`, artifact protocol, rule 1).
3. **Repairs re-observed** against the pre-repair artifact. A repair that
   introduces a new visible problem is reverted and the attempt recorded.
4. **Build reproducible from the source of record**: exact command, toolchain
   versions, and forward-computed hashes for the source, every included asset,
   and the output.
5. **Changelog classifies every difference** as `METADATA` / `TYPOGRAPHY` /
   `REFERENCE` / `CLARIFICATION` / `MATHEMATICAL`. Any `MATHEMATICAL` entry
   back-routes to Stage 2 and the artifact is not released.

**Defect classes**, used by the submission audit:

| class | meaning |
|---|---|
| `CONFIRMED` | observed in the artifact; must be fixed or explicitly accepted |
| `DISPROVED` | suspected, investigated, shown not to exist — **recorded with its disproof** |
| `OUT_OF_SCOPE` | real, but not part of this artifact |
| `ACCEPTED_RESIDUAL` | real, observed, deliberately not fixed, with the reason |
| `UNRESOLVED` | open; must state whether it blocks release |

A `DISPROVED` item may not be re-raised without new evidence of a different
kind than the evidence that disproved it.

### Stage 8 also inspects visual semantics

Artifact correctness is not only "nothing overlaps". The rendered object must
still communicate the intended mathematics:

- figure labels legible at print size;
- every symbol in a figure uses the same glyph as the text;
- captions state what is shown, what to notice, and what is **not** proved;
- figure/equation correspondence survives rendering;
- no unnecessary split attention — labels sit next to what they label.

---

## 3.5 Stage 6H — Human Comprehension

A sub-gate of Stage 6. It owns whether a mathematician outside the discovery
context can follow the paper. It owns no mathematics; a mathematical problem
found here back-routes to Stage 2.

Full protocol:
`docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md`.

**Why this sub-gate exists.** Paper 4 had passed all technical gates through
Stage 8 — mathematical audit, independent kill, novelty kill, reproducibility,
manuscript architecture, hostile referee, artifact closure — with only Stage 9
owner promotion outstanding, and an external mathematician still reported that
the setup and terminology were harder to enter than necessary. Correctness and
usability are independent axes; only the first had a gate.

**Gate conditions.**

1. **Reader declared.** The intended reader and the prerequisite budget are
   written down, not assumed.
2. **Motivation precedes formalism.** Every central project-specific term is
   motivated, exemplified and — where useful — pictured before it is given a
   symbol. *Noun before symbol.*
3. **One running example.** At least one concrete object survives several
   sections and grows more abstract with the exposition.
4. **Representational bridge.** Each central mechanism has enough coverage
   across concrete / visual / algebraic / structural views that a reader can
   move between them in both directions.
5. **Human-scale witness, with its status stated.** Every computer-assisted
   headline has a human-scale instance, labelled as one of: *human-inspectable
   semantic witness* (the reader sees what the objects mean), *paper-and-pencil
   verifiable witness* (the reader can check the small claim manually), or
   *machine-certified exact witness* (concrete and readable, exact claim resting
   on a reproducible certificate). **A machine-certified witness is never
   described as checkable by hand.** The conceptual core of a result should
   normally reach the second category even when the full theorem cannot.
6. **Boundary made visible.** At least one non-example, near miss, or
   counterexample to the tempting stronger claim.
7. **Numbers have nouns.** Every large number states what it counts or
   dimensions, and what it does not imply.
8. **Outsider route exists.** A competent outsider can reach the main theorem
   from a concrete object using the manuscript alone —
   **no AI-only semantics**.

Condition 8 is the one that fails silently. An AI can reconstruct a missing
bridge from filenames, code and prior sessions; a reader cannot. If the bridge
only exists when an AI supplies it, the bridge is not in the paper.

**Exit:** all eight conditions closed, each either satisfied or explicitly
`NOT APPLICABLE — because …`.

---

## 4. Re-entry and invalidation

Returning to a stage invalidates the downstream gates that depended on it — and
only those. This is what keeps the process affordable.

| change | invalidates | leaves valid |
|---|---|---|
| theorem statement / definitions | Stages 2–8 | Stages 0–1 |
| computational semantics | Stages 3, 5, 8 | Stages 2, 4 |
| new primary prior art | Stage 4 | Stages 2, 3, 5 |
| editorial / typographic | **Stage 8 only** | Stages 2–7 |
| toolchain or included-asset change | **Stage 8 only** | Stages 2–7 |
| exposition — new example, figure, motivation, renamed term | **Stage 6H, the Stage 7 reader referee, and Stage 8** | Stages 0–5 |

The last two rows are not a formality. In the Paper 4 v1.1 build, three purely
editorial edits shifted the pagination of every page in the document. Editorial
changes do not invalidate the claim gates; they invalidate the artifact gate
completely.

---

## 5. Roles and independence

Roles are defined by function, not by vendor; model line-ups change, the
invariant does not.

- **orchestrator** — maintains paper state, cross-compares audits, catches
  contradictions between agents, decides what work is redundant.
- **closure author** — long derivations, manuscript work, reproducibility
  documentation.
- **independent adversary** — clean-room reconstruction, equivalence kills,
  smallest counterexamples, independent checker routes.
- **reader / exposition referee** — the fourth Stage 7 referee. Mathematically
  mature, outside the discovery context, working from the manuscript alone. Its
  task is not to judge whether the paper is true but to **paraphrase it back**:
  the research object, the main question, each central term, the main figure,
  the theorem, the proof architecture, the symbolic/computational boundary, and
  the strongest non-claim. *A mis-paraphrase by a competent reader is an
  exposition defect even when the definition is formally correct.* Template and
  verdict scale: `docs/research/READABILITY_REFEREE_TEMPLATE.md`.

> **Constraint: the agent that authored a theorem's proof, or a repair, may not
> be the agent that signs it off.**

The constraint applies to exposition repairs exactly as it applies to proofs:
the agent that rewrites a confusing section does not get to certify that it is
now clear.

This is not bureaucratic. In the Paper 4 v1.1 build the same agent authored and
audited its own repairs, and the first two repair attempts each removed a
one-row table orphan by introducing a 45–70% blank page. Only re-observation
caught it.

Independence is reported using the axes of `EPISTEMIC_DISCIPLINE.md` §5 —
derivation, algorithm, data representation, input generation, language,
runtime, author — never as a binary.

---

## 6. Working discipline

- **One active blocker.** Identify the single highest-value blocker and close
  it. Do not open new mechanisms while a gate is open.
- **Freeze before branching.** Before handing work to another agent: freeze the
  statement, hash it, give exact inputs, and state what would count as a
  contradiction.
- **Separate proof, novelty and application.** A theorem can be correct but
  old; a result can be new but only computational; an application can be useful
  without being the novelty.
- **Demote infrastructure downward.** If prior art shows a component is
  classical, demote it to a cited lemma and sharpen the actual novelty. Do not
  defend a weak novelty claim for sunk-cost reasons.
- **Stop adding mathematics once Stage 6 closes.** New ideas go to
  `OPEN_RESEARCH_QUESTIONS.md`, not into the current paper.
- **A direction that dies well is a result.** Stage 0 and Stage 3 kills are
  written to `NEGATIVE_RESULTS.md` with their scope parameters stated per
  `EPISTEMIC_DISCIPLINE.md` §2.

---

## 7. Per-paper record

**One file per paper**, `PAPER_STATUS.md`, holding the gate table inline:
thesis, current main theorem, strongest safe novelty statement, open blockers in
priority order, current artifact hashes, and explicit non-claims.

Everything else is generated on demand and stays in `scratch/` until it earns
promotion under the `AGENTS.md` placement rules. Process that creates a dozen
tracked files per paper is process that gets abandoned under deadline: the
Paper 4 submission audit needed three deliverables — the artifact, a hash
manifest, and one report.

---

## 8. Relationship to existing documents

This document adds a layer; it replaces nothing.

| concern | owner |
|---|---|
| mathematical claims and verification levels | `MATH_CLAIMS.md` |
| prior art and novelty status | `LITERATURE_COVERAGE.md` |
| directions that died, with scope | `NEGATIVE_RESULTS.md` |
| rules earned from past failures | `EPISTEMIC_DISCIPLINE.md` |
| protocol, placement, artifact rules | `AGENTS.md` |
| current single active focus | `CURRENT_FOCUS.md` |
| how results are written for humans | `docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md` |
| reader-referee procedure | `docs/research/READABILITY_REFEREE_TEMPLATE.md` |
| paper-level gates and release | **this document** |

If this document and any of the above ever disagree, the other document wins
and this one is corrected — with one exception: the artifact rules in
`AGENTS.md` and Stage 8 here are intended to be read together.
