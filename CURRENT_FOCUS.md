# Current Focus

**Updated:** 2026-08-16 (Structural direction reset)
**Review due:** 2026-09-06 (end of the bootstrap allocation window)
**Full roadmap:** `ROADMAP.md`
**Research authority:** This document is the SINGULAR current research-direction authority.

---

## CURRENT RESEARCH DIRECTION

### Steering Block

* **PRIMARY RESEARCH QUESTION**: Can two legal aa2f pieces be joined so that only seam-crossing Abelian squares require control, and can the large-scale seam obstruction be bounded or made sparse enough to support construction?
* **ACTIVE TENSIONS** (max 3):
  1. Second-difference invariance makes every non-seam-crossing window safe under deletion/splicing, but seam-crossing K are unbounded.
  2. Ordinary square-free theory controls large periods by density decay (Petrova-Shur) rather than K <= F; the aa2f setting lacks Fine-Wilf / Lyndon-Schützenberger rigidity.
  3. Chronology appears essential: Hall/arbitrary-subset structure is false, while Prefix Scale Credit survives only bounded tests.
* **NEXT HIGH-INFORMATION ACTION**: Formalize the finitely falsifiable large-scale blocker-density target, including its exact denominator, eligible positions, boundary correction, and quantifier domain, before running the kill probe.
* **DECISION**: KILL
* **DEPRIORITIZED**: G006/Hall rescue, G004 theorem hunt, larger Prefix Scale Credit census, FORBID4 safe-sleep optimization
* **LAST STATE-CHANGING EVENT**: Petrova-Shur 2021 primary full text read and proof-mechanism comparison: ordinary large-period control relies on literal-period rigidity that does not directly survive Parikh equality.

### CRITICAL CLAIM BOUNDARY

A finite aa2f record word need not be a prefix of an infinite aa2f word.

Therefore non-decay measured on a finite record word cannot by itself refute a theorem quantified only over infinite aa2f paths.

No measurement is authorized until we decide whether the target is:
A. a universal FINITE statement over finite aa2f words,
or
B. an INFINITE-PATH statement.

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

## H4 — completed, promoted, no longer active work

```text
Name        L=5 Route-C full-family closure campaign ("H4")
Raw corpus  C:\MSVC\L5_FULL_CLOSURE_CAMPAIGN_1\results_h4\   (outside this repository)
State       COMPLETE — audited, independently reviewed, merged
Evidence    docs/evidence/h4-l5-full-closure-2026-08/        (in this repository)
Claim       MATH_CLAIMS.md row 111 — COMPUTED (Level 1), bounded
Result      2219/2219 shards, 0 missing, 0 duplicate, 0 survivors
```

**What the result is.** Every uniform coding `g : Σ_6 -> Σ_3^5` — all `243^6` of them — is
eliminated by at least one of two preregistered finite tests: Stage A's block-aligned
Parikh obstruction from `h_6^9(a)` (`m \in [2,120]`, `K = 5m \in [10,600]`, first 98,415 coded
symbols), or Stage B's exact check (`K \in [6,40]`, first 3,645 coded symbols of
`g(h_6^5(a))`). Stage A retained 5,153,928 profiles = 3,316,540,933,500 codings; Stage B
processed all of them and found 0 survivors.

**What it is not.** It is a *finite*, Route-C, L=5 result. It does **not** establish
Mäkelä's conjecture, and does not cover non-uniform morphisms, `L > 6`, all ternary
constructions, or source morphisms other than `h_6`. The combined window is **98,415**
coded symbols, not 3,645 — Stage A's window is 27x larger (`EPISTEMIC_DISCIPLINE.md` §10).

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
on a stratified sample.

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
Abelisk v3 active > v2 superseded > foundation historical/reference
English canonical for new public structured content
motor accessibility is an active requirement
pedagogical effectiveness is an untested hypothesis
Java COW Backtracker v1.2 is the reference version, never v1.1
```

---

## Open owner decisions

| # | Subject |
|---|---|
| OD-1 | Git-history remediation — needs a controlled plan |
| OD-2 | D40 dataset rights and provenance — direction recorded, decision open |
| OD-5 | Ledger translation — option D drafted, needs an `AGENTS.md` rule 8 amendment |

Ten others are decided. See `docs/program/OWNER_DECISIONS_REQUIRED.md`.
