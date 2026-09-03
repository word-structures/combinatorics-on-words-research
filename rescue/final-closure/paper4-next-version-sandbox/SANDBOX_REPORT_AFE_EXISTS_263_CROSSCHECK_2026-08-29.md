# `AFE_EXISTS` independent cross-check — 263 quota-matched canonical H pairs

**Date:** 2026-08-29
**Status:** sandbox only. No canonical edit. No `MATH_CLAIMS` edit. No Git
mutation. No manuscript mutation. Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`.

**Protocol:** `AFE_EXISTS_263_CROSSCHECK_PROTOCOL_2026-08-29.md`,
sha256 `e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641`,
**written and hashed before any new verdict was computed.**

**Purpose:** close defect **D1** of the v0.32a referee audit — the existing
263/263 two-solver agreement validated `AF_AND_AFE_EXISTS`, not the
manuscript-headline predicate `AFE_EXISTS`.

---

## 1. Result

> ## **PASS — 263/263 agreement, 86 secondary positives, 0 unresolved.**

| quantity | value |
|---|---:|
| total pairs | **263** |
| primary `AFE_EXISTS` positive | **86** |
| **secondary `AFE_EXISTS` positive** | **86** |
| **agreement** | **263 / 263** |
| unresolved (capped) | **0** |
| witness literal-validation failures | **0** |
| joint `AF_AND_AFE_EXISTS` positive (distinct predicate) | 44 |
| runtime | 97.1 s |

The success condition fixed in §5 of the protocol — `secondary = 86`,
`agreement = 263/263`, `unresolved = 0` — is met exactly.

## 2. Why the second route is genuinely independent

The primary verdicts come from `stage_bcd.stageDFS(A,E,'AFE',2·10⁷)` compiling
through `afe_csp.compile`: a unary `Map`, a binary list, and an in-DFS
`selfClean` ternary check.

The secondary route uses the Report-12 **signature/target-bucket** framework
(`target_buckets.js`): a different window enumeration producing reduced
signature strings mapped to forbidden target sets, with a freshly written DFS
(`work/afe_only_crosscheck.js`). It shares no code with `afe_csp.js` or
`stage_bcd.js`.

Protocol requirements, all satisfied:

1. **No FAF constraint participates** — only the AFE cover `['a','f','e']`,
   `K ∈ [2,40]`, is enumerated. No FAF window is ever built, so this holds by
   construction rather than by filtering.
2. No stored AFE verdict is read by the secondary route.
3. Target buckets compiled independently from `(A,E)`.
4. Exact closing-depth semantics (each signature evaluated when its maximum
   referenced depth is first assigned).
5. **Arity-0 constraints included** — 724 arity-0 windows per instance under
   the free-variable classification; `deadAFE` honoured. (No H instance
   actually triggered `deadAFE`; see §5.)
6. Endpoint reductions preserved (`x₀ = 0`; a cut at depth `L` folds `m(F)`
   into the affine target).
7. Equal-depth coefficients combined, zero coefficients removed.
8. F profile enforced exactly as `(19,11,10)`.
9. **No cap read as UNSAT** — cap `2·10⁹`, never reached; 0 capped rows.

## 3. The decisive control: AFE-only is not the joint gate

The protocol's STOP condition was that the secondary solver might silently
reproduce `AF_AND_AFE_EXISTS` (44 positives). It does not:

| control | pairs | primary AFE | joint | secondary AFE | verdict |
|---|---:|---|---|---|---|
| C1 AFE-positive, joint-positive | 3 | true | true | **true** | match |
| C2 AFE-negative | 3 | false | false | **false** | match |
| C4 **AFE-positive, joint-negative** | 3 | true | **false** | **true** | **match** |

C4 is the proof. On pairs where the joint gate is unsatisfiable but AFE alone is
satisfiable, the secondary route returns **SAT** — which the joint gate cannot
do. Across the full run there are **42 such pairs** (`86 − 44`), and the
secondary route returns SAT on every one.

## 4. Witness validation (Phase 4) — a third, solver-free route

For each of the 86 secondary SAT verdicts, one `F` witness was retained and
checked directly from the literal word `A·F·E`, with no solver state consulted:

1. `Ψ(F) = (19,11,10)`;
2. no abelian square of half-period `K ∈ [2,40]` at any start `s` with
   `s + 2K ≤ 120`, by direct prefix-Parikh comparison.

**86 / 86 witnesses valid, 0 failures.** Witness SHA-256 values are recorded
per pair in the results CSV.

*Honest note on witness diversity:* the 86 witnesses comprise only **15
distinct `F` words**, because the DFS returns the first witness in a fixed
letter order and many `(A,E)` pairs admit the same first `F`. Each witness was
nevertheless validated **against its own `(A,E)` pair**, so there are 86
independent validations, not 15.

## 5. Negative-side control (Phase 5)

A deterministic control set — first pair, last pair, fewest nodes, most nodes,
median — was re-run with the cap removed entirely:

| pair id | nodes | sat | capped | exhaustive |
|---|---:|---|---|---|
| `0\|1d73299bd17892a7` | 149,632 | false | false | ✅ |
| `8\|599ccdbd453e0523` | 49,993 | false | false | ✅ |
| `7\|fbbd5268736127f7` | 826 | false | false | ✅ |
| `6\|9c8cd145662aeaff` | 455,826 | false | false | ✅ |
| `7\|cda205df9b663ca5` | 38,218 | false | false | ✅ |

All five close every branch without a cap. No full UNSAT certificates were
built for the other 172 negatives, and no minimum-UNSAT-core work was started.

**Coverage gap recorded, not hidden:** protocol control **C3** (a pair with an
arity-0 `deadAFE` obstruction) could **not** be exercised — no H pair in the
263 has `deadAFE = true`. The arity-0 *class* exists (724 windows per instance)
but no instance is killed by it. The `deadAFE` code path is therefore
**untested on this population**. It cannot affect the result here: had it
fired incorrectly it would have produced a spurious UNSAT and a mismatch, and
there were none.

## 6. What this does and does not establish

**Establishes.** The manuscript-headline `AFE_EXISTS` counts (86 positive, 177
negative over 263 quota-matched canonical H pairs) are confirmed by a second,
independently implemented AFE-only solver, with the positive side additionally
confirmed by a third solver-free literal checker. Defect **D1** is closed.

**Does not establish.** Nothing about RX (this run touched only H), nothing
about the mechanism of the H/RX separation, nothing about Mäkelä, nothing about
`L = 40` impossibility, and nothing about novelty. `0/137` remains finite
evidence. No probability interpretation is offered or implied.

## 7. Artifacts

| file | role |
|---|---|
| `AFE_EXISTS_263_CROSSCHECK_PROTOCOL_2026-08-29.md` | protocol, hashed pre-execution |
| `runs/PROTOCOL_AFE_263.sha256` | that hash |
| `work/afe_only_crosscheck.js` | AFE-only compiler, fresh DFS, literal checker |
| `work/afe_controls.js` | Phase-2 controls incl. the decisive C4 |
| `work/afe_263_run.js` | Phase 3/4/5 runner |
| `runs/afe_controls.json` | control results |
| `runs/afe_263_crosscheck.json` | full per-pair results + negative controls |
| `AFE_EXISTS_263_CROSSCHECK_RESULTS_2026-08-29.csv` | 263-row per-pair table |
