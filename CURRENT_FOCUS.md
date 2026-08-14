# Current Focus

**Updated:** 2026-08-14
**Review due:** 2026-09-06 (end of the bootstrap allocation window)
**Full roadmap:** `ROADMAP.md` · **Research authority:** `NEXT_STEP.md`

---

## One active epic

# Repository safety and rights (WS-1)

## Last authorized task — completed

# `TASK-0001` — Preserve and trace the D40 dataset provenance

**Status: `COMPLETED`**

Authorized 2026-08-06 (`docs/program/PLAN_REGISTRY.yaml`, `bootstrap_status.first_task`).
Executed and merged as commit `0ac5b2a`.

```text
Specification   docs/tasks/TASK-0001.md
Findings        docs/program/OD-2-PROVENANCE-FINDINGS.md
Raw evidence    research/dictionaries/D40-0001/
```

It was executed under the bounded scope defined in TASK-0001 and produced exactly
the four files authorized by §4.

**Completion did not resolve OD-2.** Per TASK-0001 §15, completing it did not grant
permission to use, publish, remove, or redistribute the dataset. Its status remains
`RIGHTS_AND_PROVENANCE_UNRESOLVED` until the owner resolves OD-2 on the evidence the
task produced.

## Currently active

**No implementation task is currently authorized and in progress.**

This means no formally recorded implementation task is active. It does not mean the
project is inactive: governance, documentation, and infrastructure work has merged
since TASK-0001 under direct owner instruction rather than under a recorded successor
implementation task. No successor implementation task has been selected or authorized.

## Long-running computation in flight — descriptive, not an authorized epic

**This is not an authorized epic and not a task.** It is recorded here so that a reader
of this file alone learns that a large computation is occupying this machine, and does
not start a conflicting or duplicate campaign.

```text
Name        L=5 Route-C full-family closure campaign ("H4")
Location    C:\MSVC\L5_FULL_CLOSURE_CAMPAIGN_1\results_h4\   (outside this repository)
State       IN FLIGHT — not complete
Progress    read it from the campaign artifacts; deliberately not copied here
Authority   results_h4\FINAL_AUDIT.txt — the only completion signal
Claim       NONE, until that audit exists and independently passes
```

**No progress figure is recorded here on purpose.** A shard count is stale the moment it
is written, and a stale count in a canonical file invites someone to reason from it. The
campaign's own artifacts are the only current source; completion is signalled by the
audit file, not by a count.

**Partial progress is not a result.** A campaign that has not finished has decided nothing
about the L=5 family: the shards not yet processed could contain a survivor, which would
be a positive finding rather than an error. No `MATH_CLAIMS.md` row may cite this campaign
until the campaign audit exists and independently passes. Row 49 is unaffected and must
not be reworded on the strength of partial progress.

**Naming hazard.** A file named `FINAL_AUDIT.txt` already exists elsewhere in the tree
(`imported-artifacts\L5_FINAL_VERIFICATION_4\six_lane_results\`). That one is a
**six-shard rehearsal** of the tooling and establishes nothing about the L=5 family. Only
the campaign path above is authoritative.

**This block needs a revisit when the campaign ends** — at that point the audit result,
not a progress figure, is what belongs here.

---

## Do not start

```text
Git-history remediation                 OD-1 — separate decision, six prerequisites
Any D40 compilation, audit, or search   OD-2 — status RIGHTS_AND_PROVENANCE_UNRESOLVED
Removal of the dataset from the tree    OD-2 — TASK-0001's output now exists; the
                                        decision itself is still open
Ledger translation                      OD-5 — AGENTS.md rule 8 governs until amended
Public recruitment                      OD-1
Website shell or toolchain adoption     OD-8 — after math-core extraction
Java engine migration                   OD-13 — approved target; the Word Structures
                                        organization now exists, but migration still
                                        requires its own bounded, separately approved
                                        task
Editing AGENTS.md                       TASK-GOV is a candidate, not approved
Any pedagogy pilot                      transfer task not yet designed
The 85-cell Master puzzle               conditional on g85 verification
Restoring mechanics from Abelisk v2 or the foundation document
```

---

## Stop conditions

TASK-0001 carried its own stop conditions (`docs/tasks/TASK-0001.md` §9); they were
spent when the task completed. **When a successor implementation task is authorized,
it states its own.**

---

## Standing constraints

```text
MATH_CLAIMS.md is the sole claim authority
no browser or AI output self-certifies
a finite record never supports an infinite-existence claim
REP (reproducibility) and IND (independence) are reported separately
Abelisk v3 active · v2 superseded · foundation historical/reference
English canonical for new public structured content
motor accessibility is an active requirement
pedagogical effectiveness is an untested hypothesis
Java COW Backtracker v1.2 is the reference version, never v1.1
CEGIS Route A remains the research authority unless NEXT_STEP.md changes
```

---

## Open owner decisions

| # | Subject |
|---|---|
| OD-1 | Git-history remediation — needs a controlled plan |
| OD-2 | D40 dataset rights and provenance — direction recorded, decision open |
| OD-5 | Ledger translation — option D drafted, needs an `AGENTS.md` rule 8 amendment |

Ten others are decided. See `docs/program/OWNER_DECISIONS_REQUIRED.md`.
