# CLAUDE PROJECT UPDATE MANUAL
## Integrating Human Readability and Visual Mathematical Exposition into the Word Structures Repository

**Version:** v0.1  
**Date:** 2026-08-30  
**Repository:** `word-structures/combinatorics-on-words-research`

---

# Mission

Update the project so that human readability, visual traceability, worked examples, and outsider comprehension become explicit parts of the research lifecycle.

The motivating lesson is Paper 4: mathematical, reproducibility, hostile-referee, and artifact checks can all pass while a highly capable external mathematician still finds the setup and terminology harder to enter than necessary.

The update must change future behavior, especially for Paper 6.

---

# Hard constraints

## DO NOT

- do not reopen or rewrite frozen Paper 4 mathematics;
- do not modify the frozen Paper 4 manuscript or PDF;
- do not strengthen novelty claims;
- do not renumber lifecycle Gates 0–9;
- do not duplicate `MATH_CLAIMS.md`;
- do not duplicate `LITERATURE_COVERAGE.md`;
- do not create large process bureaucracy;
- do not claim education research directly proves an optimal research-paper format;
- do not cite literature from memory;
- do not merge automatically.

## MUST

- read current governance first;
- obey `AGENTS.md`;
- obey `EPISTEMIC_DISCIPLINE.md`;
- obey `docs/research/PAPER_LIFECYCLE.md`;
- use English in canonical repository documents;
- verify primary sources before committing citations;
- preserve proof/computation/novelty distinctions;
- keep Paper 4 frozen;
- make Paper 6 the first full adoption case.

---

# Recommended branch

Create:

```text
docs/human-readability-protocol-2026-08-30
```

from current `origin/main`.

Do not merge.

---

# Phase 0 — baseline

Run:

```powershell
git fetch origin
git checkout main
git pull --ff-only
git status --short
git log -1 --oneline
```

Read in full:

```text
AGENTS.md
EPISTEMIC_DISCIPLINE.md
docs/research/PAPER_LIFECYCLE.md
CURRENT_FOCUS.md
LITERATURE_COVERAGE.md
```

Inspect `papers/paper4/` as the motivating closed artifact.

Inspect any current canonical Paper 6 location if one exists.

---

# Phase 1 — verify literature before committing

The supplied long protocol contains a bibliography, but current repository rules require direct verification.

For every source you intend to cite canonically:

1. open the primary publisher/DOI/author source;
2. capture a short supporting passage;
3. record author, title, venue, year, DOI, checked date;
4. record what project rule it supports;
5. distinguish empirical studies from expert expository advice.

Priority sources:

- Halmos 1970;
- Duval 2006;
- Ainsworth 2006;
- Arcavi 2003;
- Atkinson et al. 2000;
- Chandler & Sweller 1991;
- Kalyuga et al. 2003;
- Nathan & Petrosino 2003;
- Inglis & Alcock 2012;
- Rittle-Johnson & Star 2007;
- Watson & Mason 2005;
- Mayer 2008.

Safe wording:

> This protocol is informed by adjacent research on mathematical comprehension, examples, multiple representations, cognitive load, visualization, and expertise.

Unsafe wording:

> Cognitive science proves that every theorem must have a diagram.

---

# Phase 2 — create canonical long-form protocol

Proposed path:

```text
docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md
```

Use the supplied `HUMAN_FIRST_MATHEMATICAL_RESEARCH_PROTOCOL_v0.1_2026-08-30.md` as the conceptual source.

The canonical protocol should include:

1. Human Traceability Principle;
2. master exposition ladder;
3. CVAS rule;
4. noun-before-symbol rule;
5. first-use contract;
6. running-example requirement;
7. paper-and-pencil witness rule;
8. visualization taxonomy;
9. proof readability rules;
10. intended-reader/prerequisite model;
11. Stage 6H Human Comprehension subgate;
12. Stage 7 reader/exposition referee;
13. Stage 8 visual-semantic check;
14. AI vs human roles;
15. anti-pattern catalogue;
16. templates/checklists;
17. Paper 6 application;
18. verified bibliography.

Keep the operational summary near the top.

---

# Phase 3 — minimally update PAPER_LIFECYCLE.md

Do not renumber gates.

## Stage 6 — Manuscript Architecture

Extend the exit condition so that it also requires, in substance:

- central project-specific concepts motivated before formal use;
- a concrete running example;
- appropriate visual/representational bridge for the main mechanism;
- a mathematically mature outsider can trace the main theorem from concrete object to formal statement.

Link to the new protocol.

## Stage 7 — Hostile Referee

Add:

```text
reader / exposition referee
```

Definition:

> mathematically mature, not immersed in discovery history, and required to paraphrase the main objects, mechanism, theorem, and non-claims.

The agent that writes an exposition repair may not sign off that same repair.

## Stage 8 — Artifact Closure

Add compact visual-semantic checks:

- figure labels legible;
- notation matches text;
- captions state figure purpose;
- figure/equation correspondence survives rendering;
- no unnecessary split attention.

---

# Phase 4 — minimally update AGENTS.md

Add a compact mandatory section:

```text
## Human comprehension and visual exposition
```

Recommended operational rules:

1. **NOUN BEFORE SYMBOL.**
2. **MOTIVATE BEFORE DEFINE.**
3. **RUNNING EXAMPLE:** each central paper mechanism has at least one concrete example.
4. **PAPER-AND-PENCIL WITNESS:** each computer-assisted headline has a human-scale inspectable instance.
5. **REPRESENTATIONAL BRIDGE:** connect concrete, visual, algebraic, and structural views when applicable.
6. **FIGURES ANSWER QUESTIONS:** no decorative figures; notation must match text.
7. **PROOF ≠ VALIDATION:** symbolic proof and finite checking remain explicitly separate.
8. **NUMBER + NOUN:** every large number says what is counted/dimensioned and what it does not imply.
9. **READER REFEREE:** Stage 7 includes an outsider to discovery context.
10. **NO AI-ONLY SEMANTICS:** AI may assist comprehension but the paper must contain the conceptual bridges.

Link to the long protocol instead of duplicating it.

---

# Phase 5 — create reusable reader-referee template

Proposed path:

```text
docs/research/READABILITY_REFEREE_TEMPLATE.md
```

Use:

| Item | Reader can explain? | Evidence / paraphrase | Defect | Severity |
|---|---:|---|---|---|

Required items:

- research object;
- main question;
- prerequisites;
- running example;
- central project-specific terms;
- main figure;
- theorem informal meaning;
- proof architecture;
- symbolic/computational boundary;
- strongest non-claim;
- significance/consequence.

Verdict:

```text
ACCEPT / MINOR / MAJOR / REJECT
```

The reader must paraphrase; check boxes alone are insufficient.

---

# Phase 6 — Paper 4 treatment

Paper 4 is the motivating case.

Do not modify:

```text
papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md
papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.pdf
```

Do not create Paper 4 v1.2 in this task.

Record only the process lesson:

> mathematical and artifact closure can pass while an expert reader still reports orientation and terminology friction.

---

# Phase 7 — Paper 6 immediate adoption

This is the highest-value output.

Inspect the current canonical Paper 6 status/notes.

If no approved canonical Paper 6 location exists, propose a path and wait for owner approval rather than inventing one.

Paper 6 must be designed around this conceptual sequence.

## Human opening question

Start from:

> If two different block histories allow the same continuations now, can they still have different continuation counts later?

Do not start with `218298 -> 2691 -> 2689 -> 1179`.

## Required running witnesses

Identify exact project witnesses for:

1. same current response but different future counts;
2. all-horizon count-equivalent but non-equitable pair;
3. finite-moment near miss;
4. structural partition that already separates a true count-equivalent pair.

Preserve exact provenance.

## Required conceptual figure plan

```text
F1  literal block history / what a state is
F2  current legal responses
F3  same current response, different future
F4  equitable vs count-equivalent contrast
F5  218298 -> 2691 -> 2689 -> 1179 with nouns on every arrow
F6  toy 3-functions / 2-dimensional span
F7  signed response cocycle transition diagram
F8  partition-refinement no-go
F9  1179 = 12 + 1167 transient/persistent split
F10 P4/P5 structural observables -> signed basis -> invariant future space
```

These are figure specifications, not final drawings.

## Required term order

```text
literal history
legal continuation
future-count function
current response
equitable state
all-horizon count equivalence
count state
future-count vector
linear span
Krylov space
signed response defect
cocycle
transient/persistent decomposition
structural observable basis
```

## Required conceptual distinction

Make visually and verbally explicit:

```text
state merging != future-dynamics minimization
```

Use a tiny linear-dependence example before the real 1179-dimensional result.

## Required partition no-go

Explain:

> refinement cannot recreate a merge that the starting partition has already destroyed.

Show it visually before introducing signed linear recombination.

---

# Phase 8 — synchronize research and exposition

Add a lightweight research-note rule.

Every major theorem seed should also record:

```text
Exact claim
Smallest witness
Why it matters
One-sentence human explanation
Possible figure
Likely reader confusion
Tempting stronger claim that is false
```

This may remain in `scratch/` during discovery.

The purpose is to avoid reconstructing exposition later from AI memory.

---

# Phase 9 — audit

Run:

```powershell
git status --short
git diff --check
node scripts/check-claims-drift.js
```

Run broader tests only if required by current governance.

Search new documentation for:

```text
first ever
obviously
clearly
trivial
it is easy to see
as is well known
```

Inspect every occurrence.

Search for unexplained project abbreviations.

---

# Literature integrity audit

For every committed bibliography item report:

| Source | Primary source opened? | DOI verified? | Supporting passage stored? | Project rule |
|---|---:|---:|---:|---|

If a source cannot be verified, remove it or label it unresolved.

---

# Scope audit

Confirm the update does not:

- change mathematics;
- change claim statuses;
- alter Paper 4 frozen bytes;
- change current research direction;
- assert that literal picturability is a truth criterion;
- claim all theorems require a picture;
- claim education studies generalize without limitation to research mathematicians.

The real rule is:

> every important abstraction needs a human traceability route; that route may be a figure, table, worked example, contrast case, or hand-checkable calculation.

---

# Recommended commits

Prefer focused commits:

```text
docs(research): add human readability and visual exposition protocol
docs(research): integrate human comprehension into paper lifecycle
docs(agents): require human-traceable mathematical exposition
```

Do not create a giant mixed commit if the changes are separable.

---

# Push policy

Push the branch.

Do not merge.

Return branch and commit SHAs.

---

# Required final report

Per current `AGENTS.md`, use a table.

| Check | Source / evidence | Reproduced? | Matches? | Verdict |
|---|---|---:|---:|---|
| governance baseline read | files + SHAs | yes | yes | |
| primary literature verified | source ledger | yes | yes/no | |
| long protocol created | path | yes | yes | |
| lifecycle Stage 6 integration | diff | yes | yes | |
| Stage 7 reader referee | diff | yes | yes | |
| Stage 8 visual-semantic check | diff | yes | yes | |
| AGENTS operational rules | diff | yes | yes | |
| reader template | path | yes | yes | |
| Paper 4 frozen bytes unchanged | hashes | yes | yes | |
| Paper 6 human architecture plan | path/status | yes | yes | |
| claims drift linter | raw output | yes | yes | |
| git diff --check | raw output | yes | yes | |
| no mathematical claim changes | diff audit | yes | yes | |

End exactly one:

```text
READY FOR OWNER REVIEW — NOT MERGED
```

or

```text
BLOCKED — DO NOT MERGE
```

---

# Final quality test

The governance update succeeds only if a future agent can answer operationally:

1. Who is the intended reader?
2. What must be motivated before formal notation?
3. What concrete witness accompanies a theorem or computational headline?
4. When should a visual representation be used?
5. How are visual, algebraic, and structural representations connected?
6. Who tests readability?
7. Where can readability block release?
8. How is AI prevented from masking missing exposition?
9. How will Paper 6 introduce `218298 -> 2691 -> 2689 -> 1179` without losing the reader?
10. How is proof rigor preserved while accessibility improves?

If these answers still require project memory, the update is incomplete.

---

# Closing instruction to Claude

Do not optimize for producing more documentation.

Optimize for changing future research behavior.

The target process is:

\[
oxed{	ext{concrete object}	o	ext{human picture}	o	ext{mathematical language}	o	ext{formal proof}}
\]

with a reverse path back to the object.

The goal is not that an AI can explain the paper after reading the repository.

The goal is that the paper itself contains enough structure for a mathematician to understand it.
