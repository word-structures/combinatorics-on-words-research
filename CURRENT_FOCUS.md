# Current Focus

**Updated:** 2026-08-15 (H4 completed and promoted; B22 is next)
**Review due:** 2026-09-06 (end of the bootstrap allocation window)
**Full roadmap:** `ROADMAP.md` · **Research authority:** `NEXT_STEP.md`, **except where this
file supersedes it** — `NEXT_STEP.md` predates H4's completion and its L=5 targets are
superseded (see its banner).

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

# `B22` — Stage-B constraint census

**Next research work, as preregistered.** B22 asks whether the bounded L=5 Stage-B test
set admits useful normalization and deduplication, over the (K,pos)-window / 30-variable
obstruction structure. See `OPEN_RESEARCH_QUESTIONS.md` B22 and the preregistration in the
untracked intake; **the B22 preregistration is unchanged by H4 and must stay unchanged**
unless the owner explicitly decides otherwise.

B22 is a census of the constraint structure. **It is not a rerun of the 3,316,540,933,500
concrete codings.**

Nothing else is authorized. Governance, documentation, and infrastructure work continues
under direct owner instruction rather than under a recorded implementation task.

## H4 — completed, promoted, no longer active work

```text
Name        L=5 Route-C full-family closure campaign ("H4")
Raw corpus  C:\MSVC\L5_FULL_CLOSURE_CAMPAIGN_1\results_h4\   (outside this repository)
State       COMPLETE — audited, independently reviewed, merged
Evidence    docs/evidence/h4-l5-full-closure-2026-08/        (in this repository)
Claim       MATH_CLAIMS.md row 111 — COMPUTED (Level 1), bounded
Result      2219/2219 shards, 0 missing, 0 duplicate, 0 survivors
```

**What the result is.** Every uniform coding `g : Σ₆ → Σ₃⁵` — all `243⁶` of them — is
eliminated by at least one of two preregistered finite tests: Stage A's block-aligned
Parikh obstruction from `h₆⁹(a)` (`m ∈ [2,120]`, `K = 5m ∈ [10,600]`, first 98,415 coded
symbols), or Stage B's exact check (`K ∈ [6,40]`, first 3,645 coded symbols of
`g(h₆⁶(a))`). Stage A retained 5,153,928 profiles = 3,316,540,933,500 codings; Stage B
processed all of them and found 0 survivors.

**What it is not.** It is a *finite*, Route-C, L=5 result. It does **not** establish
Mäkelä's conjecture, and does not cover non-uniform morphisms, `L ≥ 6`, all ternary
constructions, or source morphisms other than `h₆`. The combined window is **98,415**
coded symbols, not 3,645 — Stage A's window is 27× larger (`EPISTEMIC_DISCIPLINE.md` §10).

**Accepted provenance caveats — still open operational facts, not scientific failures:**

```text
per-shard executable identity   not recorded; same-binary identity across the
                                campaign's resumes is not reconstructible per-shard
real-survivor validation path   never naturally exercised (0 survivors); only a
                                synthetic alert self-test exercised that path
Stage-A artifact durability     no second physical backup yet (single physical disk)
```

**Naming hazard — still live.** A file named `FINAL_AUDIT.txt` also exists at
`imported-artifacts\L5_FINAL_VERIFICATION_4\six_lane_results\`. That one is a **six-shard
rehearsal** of the tooling and establishes nothing about the L=5 family. Only the campaign
path above, and the merged evidence package, are authoritative.

**Not promoted, and not to be promoted without new work:** the idea that shallow L=5 kills
would imply anything about L=6 is an **exploratory hypothesis only**. A kill-depth
measurement remains a possible *separate* future exploration over aggregate distributions
on a stratified sample — it is **not** part of B22.

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
