# Research Paper Pipeline — AI-assisted combinatorics research

**Status:** proposed project-level protocol  
**Date:** 2026-08-29  
**Purpose:** make research-paper work reproducible across context-window resets and across ChatGPT / Claude / Antigravity without redundant passes.

---

## 1. Core principle

Every research paper moves through the same gated pipeline:

\[
\text{DISCOVERY}
\rightarrow
\text{CLAIM FREEZE}
\rightarrow
\text{PROOF CLOSURE}
\rightarrow
\text{NOVELTY KILL}
\rightarrow
\text{REPRODUCIBILITY}
\rightarrow
\text{MANUSCRIPT}
\rightarrow
\text{HOSTILE REFEREE}
\rightarrow
\text{PROMOTION}.
\]

A later stage may not silently repair an earlier stage. If a blocker is found, move the paper back to the stage that owns that blocker.

The goal is to minimize duplicated auditing while preserving independent verification.

---

## 2. Single source of truth per paper

Each paper should maintain these canonical project records:

### `PAPER_STATUS.md`
One-page current state:
- paper thesis;
- current main theorem;
- strongest safe novelty statement;
- open blockers in priority order;
- current manuscript hash;
- current proof artifact hash;
- current reproducibility artifact hash;
- current verdict;
- explicit non-claims.

### `CLAIM_LEDGER.csv`
One row per material claim:
- claim id;
- exact statement;
- status;
- proof/evidence artifact;
- independent replay status;
- literature status;
- manuscript section;
- promotion status.

Allowed statuses:
- `CONJECTURE`
- `PROVED`
- `PROOF_INCOMPLETE`
- `EXACT_FINITE_COMPUTATION`
- `INDEPENDENTLY_REPLAYED`
- `FINITE_POPULATION_EVIDENCE`
- `KNOWN_PRIOR_ART`
- `NOVELTY_UNRESOLVED`
- `NOVELTY_PROVISIONALLY_SUPPORTED`
- `REFUTED`
- `PROHIBITED_CLAIM`

### `NOVELTY_LEDGER.csv`
One row per possible novelty collision:
- our object/theorem;
- equivalent formulations searched;
- source;
- exact theorem/page;
- relation: exact / more general / weaker / adjacent / no match;
- primary-source status;
- blocker.

### `EVIDENCE_MANIFEST.json`
For every computational result:
- input artifacts + hashes;
- command;
- software/runtime;
- output artifact + hash;
- expected headline;
- independent checker route.

### `DECISION_LOG.md`
Only irreversible or framing decisions:
- why a claim was demoted;
- why a run was voided;
- why an experiment was stopped;
- why a paper was split/not split;
- why a novelty claim changed.

Do not use this as a research diary.

---

## 3. Stage gates

### Stage 0 — Discovery

Purpose:
find mathematics, counterexamples, mechanisms, computational phenomena.

Allowed:
- exploratory scripts;
- loose conjectures;
- failed experiments;
- multiple candidate directions.

Not allowed:
- manuscript novelty language;
- canonical theorem claims.

Exit gate:
a candidate theorem or exact research question can be written in one paragraph.

Artifact:
`DISCOVERY_FREEZE.md`

---

### Stage 1 — Claim Freeze

Before large proof/computation work, freeze exactly what is being claimed.

Required:
- hypotheses;
- theorem statement;
- definitions;
- non-claims;
- smallest known examples;
- falsification conditions.

Exit gate:
another model can tell exactly what would refute the claim.

Artifacts:
- `CLAIM_FREEZE.md`
- initial `CLAIM_LEDGER.csv`

---

### Stage 2 — Proof Closure

Primary solver/coauthor derives the theorem completely.

Requirements:
- no “remaining cases analogous” unless symmetry is formally stated;
- boundary cases;
- parameter edge cases;
- exact cardinalities;
- symbolic proof where theorem quantifies over all parameters.

Computational checks are falsification layers, not replacements for symbolic proof.

Exit gate:
all theorem-level claims are `PROVED` or explicitly downgraded.

Artifacts:
- `FULL_PROOF.md`
- machine checker where useful.

---

### Stage 3 — Independent Mathematical Kill

A different agent must try to break the theorem.

Its job is not editing.

Attack:
- normalization;
- off-by-one cases;
- hidden hypotheses;
- smallest counterexample;
- equivalence to simpler known theorem;
- false generalization.

Exit gate:
either counterexample frozen or independent `PASS` with explicit coverage.

Artifact:
`INDEPENDENT_PROOF_AUDIT.md`

Important:
Do this once per material theorem revision, not after every wording edit.

---

### Stage 4 — Novelty Kill

Only after the theorem statement is stable enough to compare.

Translate the theorem into several vocabularies before searching.

Required separation:
1. known algebra/infrastructure;
2. routine corollaries;
3. candidate new theorem;
4. candidate new application.

Priority:
read the highest-risk primary source before broadening the search indefinitely.

Exit gate:
- all high-risk prior-art sources cleared or explicitly unresolved;
- strongest safe novelty sentence written;
- known parts explicitly disclaimed.

Artifacts:
- `NOVELTY_LEDGER.csv`
- `PRIMARY_LITERATURE_AUDIT.md`
- `SAFE_NOVELTY_STATEMENT.md`

Never treat a negative search as proof of novelty.

---

### Stage 5 — Reproducibility Closure

Do before final manuscript rewrite.

For every headline computation:
- exact inputs;
- hashes;
- exact command;
- expected result;
- runtime;
- failure semantics;
- independent checker.

No cap may silently mean UNSAT.
Voided runs remain documented.

Exit gate:
a fresh researcher can reproduce every computer-assisted headline without hidden local state.

Artifacts:
- `REPRODUCIBILITY_SPEC.md`
- `EVIDENCE_MANIFEST.json`

---

### Stage 6 — Manuscript Architecture

Only now decide the paper story.

Answer:
- What is the one main theorem?
- What was known?
- What is new?
- Why does it matter?
- What is only an application?
- What belongs in supplement?

Remove:
- research chronology;
- duplicated architecture sections;
- failed mechanism detours unless scientifically useful;
- generic machinery presented as novelty.

Exit gate:
abstract, introduction, theorem hierarchy and section plan all tell the same story.

Artifacts:
- `MANUSCRIPT_ARCHITECTURE.md`
- submission-candidate manuscript.

---

### Stage 7 — Hostile Referee Simulation

Three roles:

1. **specialist referee**
   - novelty/significance/prior art;

2. **proof referee**
   - completeness/cases/boundaries;

3. **computer-assisted referee**
   - reproducibility/provenance/certificates.

Each gives:
`ACCEPT / MINOR / MAJOR / REJECT`.

Repair valid local defects once.

If criticism attacks a stage-gate issue, return to that stage instead of patching prose around it.

Artifact:
`FINAL_REFEREE_REPORT.md`

---

### Stage 8 — Owner Promotion

Only owner decides canonical/Git promotion.

Promotion checklist:
- theorem claims closed;
- novelty status honest;
- reproducibility package present;
- manuscript hash frozen;
- no unresolved contradiction between audits;
- non-claims explicit.

After promotion:
create a release/handoff note with exact hashes and next research questions.

---

## 4. Multi-agent division of labour

Avoid three agents performing the same task.

### ChatGPT — orchestrator / synthesis
- maintains the paper status model;
- designs stage gates;
- cross-compares audits;
- catches contradictions between agents;
- drafts precise next prompts;
- decides what work is redundant.

### Claude — primary closure coauthor
Best used for:
- long proof derivations;
- manuscript restructuring;
- deep literature comparison;
- reproducibility documentation;
- full-paper coherence.

### Antigravity — independent adversary
Best used for:
- clean-room proof reconstruction;
- equivalence-kill attempts;
- normalization audits;
- independent code/checker routes;
- smallest counterexamples.

Rule:
the primary authoring agent and the independent auditor should not be the same for the same material theorem.

---

## 5. Efficiency rules

### Rule A — One active blocker
At any time, identify the single highest-value blocker.

Do not start five attractive side projects while a gating blocker is unresolved.

### Rule B — No repeated full audits
After an audit passes, re-audit only if:
- theorem statement changes;
- definitions change;
- computational semantics change;
- new primary prior art appears.

Editorial changes do not trigger a new mathematical audit.

### Rule C — Freeze before branching
Before asking another model to investigate:
- freeze current statement;
- hash it;
- give the next model exact inputs;
- specify what would count as a contradiction.

### Rule D — Separate proof, novelty and application
Do not ask one experiment to prove all three.

A theorem can be correct but old.
A result can be new but only computational evidence.
An application can be useful without being the paper's novelty.

### Rule E — Promote infrastructure downward
If Deep Search shows a component is classical:
- demote it to a lemma/tool;
- cite it;
- sharpen the actual novelty.

Do not defend weak novelty claims for sunk-cost reasons.

### Rule F — Stop adding mathematics once submission gates close
Future ideas go to `FUTURE_RESEARCH.md`, not into the current paper.

---

## 6. Context-window survival protocol

At the end of every major session, update only:

1. `PAPER_STATUS.md`
2. `CLAIM_LEDGER.csv`
3. `DECISION_LOG.md`
4. hashes of new definitive artifacts.

Then create a compact:

`NEXT_CONTEXT_HANDOFF.md`

containing:
- current theorem;
- current blockers;
- exact files to read first;
- exact files that are obsolete;
- next action;
- prohibited regressions.

A new model/context should read these files first instead of reconstructing the project from conversation history.

---

## 7. Suggested repository structure

```text
research/
  RESEARCH_PAPER_PIPELINE.md
  papers/
    paper2/
      00-status/
      10-claims/
      20-proof/
      30-novelty/
      40-evidence/
      50-reproducibility/
      60-manuscript/
      70-referee/
      90-handoff/
    paper3/
      ...
    paper4/
      ...
  future/
    FUTURE_RESEARCH.md
```

Scratch work remains outside canonical paper folders until owner promotion.

---

## 8. Paper-4 immediate state under this pipeline

Paper 4 is currently between Stages 3–5:

- main 6/34/19 mathematics substantially closed;
- independent adversarial checks have not found a central mathematical defect;
- novelty boundary is being localized against Carpi/template prior art;
- final all-\(L\) distinctness closure and reproducibility remain;
- manuscript rewrite should wait until those gates are resolved.

This is precisely the kind of situation the pipeline is designed to handle:
do not launch new mechanisms; close the active gates and then rewrite once.

---

## 9. Project-level principle

The research repository should preserve **decisions and evidence**, not every conversational step.

The durable unit is:

\[
\boxed{
\text{claim}
+
\text{proof/evidence}
+
\text{independent audit}
+
\text{novelty status}
+
\text{hash}
}
\]

Everything else is replaceable process.
