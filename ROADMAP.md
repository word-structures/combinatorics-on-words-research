# Roadmap

**Status:** approved program roadmap, bootstrap phase
**Created:** 2026-08-06 (Wave 4)
**Authority:** `docs/program/PROGRAM_MAP.md`, `docs/program/OWNER_DECISIONS_REQUIRED.md`
**Current focus:** `CURRENT_FOCUS.md`
**Research authority:** `CURRENT_FOCUS.md`

This roadmap organizes work into six parallel workstreams with work-in-progress
limits. It does **not** activate every plan. Twelve of fifteen intake plans remain
`PROPOSED`, and appearing in a workstream below does not make an item authorized —
each still requires a bounded task specification.

---

## 1. Priority constraints

These bind every workstream and are not negotiable within the roadmap.

```text
1   unresolved rights and provenance block all computational, experimental,
    publication, redistribution and research use of the D40 dataset.
    Read-only provenance preservation and tracing is explicitly excluded.
2   claim authority remains singular — MATH_CLAIMS.md
3   no browser or AI output self-certifies
4   finite records do not support an infinite-existence claim
5   independent verification (IND) is a separate axis from reproducibility (REP)
6   Abelisk v3 is active; v2 is superseded; the foundation document is
    historical / reference
7   English is canonical for new public structured content
8   motor accessibility is an active requirement
9   pedagogical effectiveness is currently an untested hypothesis
10  Java COW Backtracker v1.2 is the reference version
```

---

## 2. Work-in-progress limits

Adopted instead of activating plans. Percentages expire; WIP limits do not.

```text
2026-08-06 → 2026-09-06          bootstrap allocation (OD-9)
    60%  safety and shared foundations
    30%  research
    10%  documentation and review

from 2026-09-06                   work-in-progress limits (PLAN-CHARTER-001 §5.1)
    max 3 active research lines
    max 2 active infrastructure projects
    max 2 active educational / community pilots
```

Additional standing limits, from PLAN-WEB-001 §30:

```text
one active architecture epic
maximum two active feature migrations
one public release at least every four weeks
```

**Current active count: zero.** `TASK-0001`, the one authorized implementation task,
is **complete** (merged as `0ac5b2a`). No successor implementation task has been
selected or authorized, and none is described as active anywhere until the owner
explicitly authorizes it. This counts formally recorded implementation tasks; it does
not imply the project is idle.

---

## 3. Workstreams

### WS-1 — Repository safety and rights

**Why first:** it gates public exposure of every other workstream, and two of its
items cannot be retrofitted.

| Item | State | Blocker |
|---|---|---|
| **TASK-0001** — preserve and trace the D40 dataset provenance | **`COMPLETED`** — merged `0ac5b2a`; findings in `docs/program/OD-2-PROVENANCE-FINDINGS.md` | — |
| Artifact-denylist CI + strengthened `.gitignore` | ready | needs repo admin |
| Rights and artifact inventory across tree, branches, tags, history | ready | — |
| OD-1 remediation plan (six prerequisites) | blocked | owner decision |
| Removal from current tree, if required | blocked | OD-2 outcome |
| Authorized local research copy, if legally allowed | blocked | OD-2 outcome |
| Git-history remediation | blocked | **OD-1, separate from OD-2** |
| Replacement by a project-generated or redistributable dictionary | blocked | OD-2 outcome |

The five D40 steps are kept distinct **by owner direction**, because collapsing
provenance tracing into history remediation converts a reversible triage into an
irreversible rewrite.

### WS-2 — Mathematical research

**Authority:** `CURRENT_FOCUS.md`. This roadmap does not reprioritize research.

| Item | State |
|---|---|
| Route A length-7 exhaustion independent verification | carried over |
| Route B (h8) algebraic exclusion verification | **BLOCKED** — H8_BLINDNESS_BREACH=NO |
| Cut-and-Certify E1 -> E2 | ready; Gate A for its line |
| Stage-B test structure and constraints (B22) | **CLOSED** — h7 / PR #54 merged |
| B16 golden-control pilot | ready |
| All D40-derived research | **blocked on OD-2** |

**Research programmes recorded under WS-2.** Proposals, not authorized work and not
results. **No programme below is an established result**, and none may claim novelty: the
referenced bibliography was not located, so novelty risk is stated conservatively and is
unadjudicated. The summaries here are self-contained; the longer working drafts they were
condensed from are unpublished laboratory material and are deliberately not cited as an
authority by this document.

| # | Programme | Why it matters | Evidence today | First bounded experiment | Novelty risk | Depends on |
|---|---|---|---|---|---|---|
| 1 | Exhaustive finite morphism-family classification | the project's most mature concrete asset | rows 49, 111, 114 (`COMPUTED`); **CLOSED** — H4 / PR #54 merged | closed | medium-high | — |
| 2 | Unified obstruction / Δ calculus | would replace case-by-case elimination with a finite obstruction basis | **hypothesis only** — surface resemblance; the one concrete instance is the Stage-A condition `M_g·d = 0` (row 80) | cluster `(K, pos)` from existing shard summaries; data already in hand | high | none (data exists) |
| 3 | Proof-guided exact search / branch-death explanation | turns dead branches into explanations rather than pruning | mixed, mostly negative | gated | high | programme 2's first experiment |
| 5 | Experimental algorithmics of exact word search | the project's strongest negative-result corpus | a bounded positive performance improvement with exact path parity has been independently evidenced; several other reported figures were **not** reproducible and are excluded | curate existing results | medium | none |

**Programme 2 is a hypothesis, not a programme result.** The project's standing
transfer warning applies to it directly: `NEGATIVE_RESULTS.md` §12 records a technique
that worked dramatically in its own setting and lost in another. The one durable by-product
available now is an *observation*, not a theorem: `M_g·d` is unchanged by adding a
constant vector to every column of `M_g`, so the Stage-A test distinguishes codings only
up to a global Parikh shift.

### WS-3 — Verification and research software

**Why it matters:** it produces the Layer-4 checker that WS-1 and WS-2 both need.

| Item | State |
|---|---|
| `TASK-GOV` — disambiguate verifier names and contracts | candidate |
| Mark `scratch/dict_backtracker.js` non-certifying | ready |
| Layer-4 independent verifier with mutation tests | ready |
| Verify or refute the rolling-hash boundary claim | ready |
| Record registry with persistent IDs, checksums, AA2F/AA2FR separated | ready |
| `REP` / `IND` level definitions (OD-12) | ready |
| Java engine migration and v1.2 release | **deferred** — OD-13, org now exists; migration still needs its own bounded, separately approved task |

**Research programmes recorded under WS-3.** Same status as the WS-2 table: proposals,
not authorized work, not results, no novelty claim.

| # | Programme | Why it matters | Evidence today | First bounded experiment | Novelty risk | Depends on |
|---|---|---|---|---|---|---|
| 4 | Computational proof / certificate protocol | what a computation must emit to be checkable without re-running it | partially in place already: per-shard hashes, frozen core fingerprint, golden fixtures, mutation tests | define a certificate for one kill (coding ID → `(K, pos)` witness) and check a sample without the C++ engine | high as general method; lower as a domain instantiation | none |
| 7 | Negative-result memory as an active resource | can structured negative memory prevent repeated dead ends? | **the mechanism already exists** — `NEGATIVE_RESULTS.md` has permanent `§N` numbering and a finality taxonomy | track whether future sessions actually cite entries by number | medium-low as engineering | none |
| 8 | Small formal kernels attached to large computation | a machine-checked predicate anchoring a very large search | none formal; the target is small — prefix-sum arithmetic over a ternary alphabet | formalise only "this prefix-sum test detects abelian squares with `K ∈ [6,40]`" | high | competes with programme 1 |

### WS-4 — Abelisk and pedagogy

| Item | State |
|---|---|
| Mathematical core extraction (four layers, Abelisk shape) | ready — highest-leverage technical item |
| Abelisk v3 first sprint (six authored moments) | ready |
| Tutorial MVP 1 (scenes 0–5, 7–8, 11) | ready |
| Transfer task design for the first pilot | **required before any pilot** |
| Accessibility floor including motor requirements | binding on all of the above |
| 85-cell Master | **conditional** — pending `g85` verification |
| Daily puzzle, archive, level editor | deferred |

### WS-5 — AI evaluation

| Item | State |
|---|---|
| Provenance labels (origin × review status) | ready |
| Contamination ledger | ready |
| AI incident log | ready |
| Benchmark and holdout design | proposal only |

Standing rule: an AI-generated checker is not independent merely because it came from
another session. Independence is argued in terms of code lineage, algorithmic
independence, shared test data, shared assumptions, and model exposure.

**Research programme 6 — verifier-grounded human/AI/verifier working architecture.**
Recorded under WS-5 as a **research programme, not adopted as policy**. The question is
whether deterministic verification plus persistent negative memory measurably improves
AI-assisted mathematical research. The proposal originates in an unpublished working
document whose architecture is explicitly **not** adopted here, and which this roadmap
does not treat as an authority. What the project has taken from it is vocabulary only,
already folded into `EPISTEMIC_DISCIPLINE.md` §5 and §10.

**Hard constraint: n = 1.** One project, one owner, one AI lineage, no control arm. **No
comparative effectiveness claim about AI-assisted research is supportable on this
evidence**, and none may be made — including from individual episodes written up as
laboratory records, which are not evaluations of methodology. Adjacent published work exists
and has not been surveyed, so no novelty claim attaches either.

| Item | State |
|---|---|
| Programme 6 — verifier-grounded discovery | **proposal only**; not policy; `n = 1` |
| Whether the cheap process items catch real defects over one quarter | first bounded experiment; not started |

### WS-6 — Community and open participation

**Gated:** broad promotion waits on OD-1.

| Item | State |
|---|---|
| `.github/` issue forms | **done** — research-material issue form and `config.yml` merged |
| `.github/` PR template | ready |
| `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md` | ready |
| Required CI checks on `main` | **done** — `.github/workflows/ci.yml` runs claims-drift and tests |
| Branch protection settings | ready — needs repo admin; current setting not recorded here |
| Discussions, unadvertised | ready |
| Broad recruitment campaign | **blocked on OD-1** |
| Credit and authorship policy | ready |

---

## 4. Sequence, not schedule

Deliberately no dates beyond the OD-9 allocation window. Ordering is by dependency.

```text
NOW          nothing authorized — TASK-0001 (WS-1) is complete

NEXT         artifact-denylist CI            WS-1, independent of OD-1/OD-2
             TASK-GOV                        WS-3, removes a verifier ambiguity
             mark dict_backtracker.js non-certifying   WS-3

THEN         Layer-4 verifier + mutation tests         WS-3
             Cut-and-Certify E1 → E2                   WS-2, produces a Layer-4 candidate
             mathematical core extraction              WS-4

LATER        record registry                  needs Layer-4 verifier
             B16 golden-control pilot         validates the conjecture record model
             community health files + .github/         needs repo admin

GATED        computational, experimental, publication, redistribution
             and research use of the D40 dataset       OD-2
                 NOT gated: read-only provenance preservation and
                 tracing — done by TASK-0001
             public recruitment               OD-1
             ledger translation               OD-5
             website shell                    after core extraction
             Java migration                   OD-13, still deferred to its own
                                              bounded task; org now exists
```

---

## 5. Stop and review

**2026-09-06 — end of the bootstrap allocation window.** Re-decide OD-9 against WIP
limits. Do not renew percentages by default.

**Per PLAN-WEB-001 §30:** pause any architecture work that produces none of lower bug
risk, faster load, stable links, evidence traceability, contributor usability,
accessibility, or feature parity.

**Per PLAN-REC-001 §18:** every research campaign defines stop rules and a
resurrection condition **before** it runs. A campaign without them cannot acquire them
afterwards, because the decision to continue will already have been made under sunk
cost.

**Per PLAN-CHARTER-001 §35.3, quarterly:** *which research line would we stop if it
belonged to someone else?*

---

## 6. What this roadmap does not do

- It does not activate any plan. Twelve remain `PROPOSED`.
- It does not reprioritize research. `NEXT_STEP.md` holds that authority.
- It does not authorize implementation of anything. `TASK-0001` was authorized
  separately, by the owner, and is recorded here only as completed.
- It does not resolve OD-1, OD-2, or OD-5.
- It does not set dates beyond the OD-9 window.
