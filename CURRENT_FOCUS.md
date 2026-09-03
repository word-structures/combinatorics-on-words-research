# Current Focus

**Updated:** 2026-08-25
**Review due:** 2026-09-06 (end of the bootstrap allocation window)
**Full roadmap:** `ROADMAP.md`
**Research authority:** This document is the SINGULAR current research-direction authority.

---

## CURRENT RESEARCH DIRECTION

**Overarching Mathematical Goal:** Mäkelä's conjecture asks whether there exists an infinite ternary word whose only Abelian squares are the trivial length-2 squares aa, bb, cc (equivalently, avoiding Abelian squares of half-length K >= 2).

(Uniform morphic images applied to a symmetric fixed point represent one specific attack route toward this conjecture.)

### The Profile-Response Mechanism

The canonical claim baseline has advanced substantially. The h=7 preregistered experiment is closed with a MIXED result, and the audited h=2,...,7 profile universe is now closed as a finite computational family.

* **PRIMARY RESEARCH QUESTION**: Why, in the audited finite h=2,...,7 profile family, does the sign of the hard-deletion asymptotic-variance response split exactly between the minimum-B profiles and all remaining profiles?
* **MECHANISM FRAMEWORK**:
  ```text
  profile v
      ->
  local composition geometry / S3 invariants
      +
  pattern overlap / return / correlation structure
      ->
  perturbed Perron-Parry dynamics
      ->
  Green-Kubo / asymptotic-variance response
      ->
  sign(delta_a)
  ```
* **ACTIVE TENSIONS** (max 3):
  1. B(v) gives a striking 15/15 finite-family classification for the sign split, but it is an algebraic composition property.
  2. The actual asymptotic variance response is dynamically generated and should depend on temporal overlap/correlation structure.
  3. The structural formulation (resolvent/group-inverse) must be theoretically reconciled with the dynamical (pattern-correlation/automaton) formulation.
* **NEXT HIGH-INFORMATION ACTION**: A PREDECLARED h=2,...,7 mechanism experiment or derivation to discriminate whether B is causal or merely a proxy for overlap dynamics. (Do NOT compute h=8).
* **DECISION**: HOLD h=8. The next high-information action must be mechanism-focused on the existing finite family.
* **CRITICAL CONSTRAINT**: Do NOT state that B causes the sign. The novelty of the 15-case split is NOT_ESTABLISHED.

### CRITICAL CLAIM BOUNDARY

A finite computational observation over h=2,...,7 does not establish a universal law for arbitrary h, nor does it predict h=8.

Therefore, no inference from the 15-case sign split to arbitrary bounds or structural causation is authorized without an explicit mathematical derivation or a new preregistered empirical test.

Explicitly:
- **H8_RUN = YES** — an h=8 computation was performed (2026-09-02/03) without the
  preregistration this section required.
- **H8_BLINDNESS_BREACH = YES** — recorded by owner adjudication 2026-09-03.

### Owner decision 2026-09-03 — the h=8 holdout is contaminated

This section reserved h=8 as a **blind holdout**: the family whose outcome was to
test, unseen, whether `B` is causal or merely a proxy. On 2026-08-25 it recorded
`H8_RUN = NO`, `H8_BLINDNESS_BREACH = NO`, and *"h=8 may only begin after a
separate preregistration is committed."*

The Paper 8 work computed the four-profile h=8 family — `(3,3,2)`, `(4,2,2)`,
`(4,3,1)`, `(5,2,1)` — on 2026-09-02/03. **No h=8 preregistration was ever
committed**, on any branch, at any time; every preregistration in repository
history belongs to h=7, Paper 4, or Paper 6.

Therefore, by owner adjudication:

- **h=8 can no longer serve as this project's blind holdout.** Blindness, once
  spent, cannot be restored, and **no retrospective preregistration may be
  written to repair it.** None has been.
- The existing h=8 artifacts are **retained in full** as *post-hoc exploratory*
  evidence. They are preserved on `rescue/paper8-raw-preservation-2026-09-03`
  and nothing is deleted, relabelled invalid, or rerun to repair this.
- **No claim may cite h=8 as blind, unseen, preregistered, or independent
  holdout validation** of the `B`-causality mechanism. Any such phrasing is an
  overclaim, whatever the arithmetic shows.
- This adjudicates **experimental design only.** It is *not* a finding about the
  mathematical correctness of Paper 8, which is a separate and still-open
  question — see `docs/program/OWNER_DECISIONS_REQUIRED.md` OD-14.

The `CRITICAL CONSTRAINT` above is unchanged and now load-bearing: **B causality
remains unestablished**, and the experiment that was designed to test it blind is
no longer available to do so.

Re-establishing a blind test of `B`-causality now requires a *different* unseen
family, preregistered before it is computed.

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

## Closed Epics

### H7 Preregistered Experiment
- **State**: COMPLETE — audited and closed.
- **Result**: MIXED. See the canonical evidence package for the exact bounded claims.

### H4 — Route-C full-family closure
- **State**: COMPLETE — audited, independently reviewed, merged.
- **Evidence**: `docs/evidence/h4-l5-full-closure-2026-08/`

---

## Do not start

```text
Further h=8 work                        H8_BLINDNESS_BREACH = YES (breach recorded
                                        2026-09-03); the holdout is spent, so no
                                        further h=8 run can restore blindness
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
Editing AGENTS.md                       TASK-GOV is a candidate, not approved.
                                        One bounded exception, owner-authorized
                                        2026-08-31: the adversarial mechanism and
                                        novelty governance integration. That
                                        authorization is spent; it does not
                                        reopen AGENTS.md for anything else.
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
