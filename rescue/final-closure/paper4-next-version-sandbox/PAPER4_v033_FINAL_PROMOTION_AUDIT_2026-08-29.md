# Paper 4 v0.33 — final promotion audit

**Date:** 2026-08-29
**Status:** sandbox only. No canonical edit. No `MATH_CLAIMS` edit. No Git
mutation. No manuscript mutation. No canonical promotion performed.
Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`.

---

## 0. Inputs and provenance

| artifact | sha256 | manifest |
|---|---|---|
| `PAPER4_MANUSCRIPT_v0.33_REFEREE_REPAIR_SANDBOX_2026-08-29.zip` | `6fa400d65d45f00992615df522ee009a8c482073238eb2ff1881a1d94414a7c2` | — |
| `PAPER4_MANUSCRIPT_v0.33_...md` | `eb17d64669b478afc0d060eb384e956930bc2cfda6a387c8eaf8f1cd33bfbf71` | **MATCH** |
| `PAPER4_v0.33_CHANGELOG_2026-08-29.md` | `a58fb6884f04f28eaa7a6401b1737e348bf3ac415b471f7fa4a5eb863b2decc2` | **MATCH** |

The zip was located one level above the sandbox in `scratch/claude-intake/` and
unpacked read-only to `_v033_audit/`. Source zip untouched.

## 1. The computational gap is closed

`SANDBOX_REPORT_AFE_EXISTS_263_CROSSCHECK_2026-08-29.md` reports the result:
**263/263 agreement, 86 secondary positives, 0 unresolved, 0 witness failures**,
with the decisive C4 control (42 pairs AFE-positive but joint-negative) proving
the second route is AFE-only and not the joint gate, and a third solver-free
literal checker validating all 86 witnesses.

**Defect D1 is closed.**

## 2. Defect-by-defect audit of the v0.33 repair

I checked the manuscript text itself, not the changelog's claims.

| id | defect (from v0.32a audit) | v0.33 status | evidence |
|---|---|---|---|
| **D1** | 263/263 attributed to the wrong predicate | **FIXED** | §13 now says "for the **joint** predicate `AF_AND_AFE_EXISTS` (44 positive)"; §17.3 and Appendix B repeat the restriction. *Now superseded — see P1.* |
| **D2** | false frontier-compression benefit | **FIXED, exactly** | §12.2 states `A_d = {1,…,d}` for 38 of 40 depths, `max\|A_d\| = 38`, forced by the 342 ternary constraints; multiplicity 1; quotient DAG = full legal prefix trie; "maximally history-dependent"; identity kept for canonical accounting, not compression |
| **D3** | numbering collision at 12.4 | **FIXED** | no duplicate remains |
| **D4** | 34→19, cardinalities, distinctness labelled "proved from definitions" without derivations | **FIXED** | new **§17.2 "Exact statements whose manuscript proofs are currently outlines"** holds all three; Appendix A row reads "EXACTLY VERIFIED + CLEAN-ROOM RECONSTRUCTED; manuscript proof currently an outline" |
| **D5** | arity-0 class unmentioned in §10 | **FIXED** | §10: "703 of the 3,081 raw windows are of this arity-zero type; a violated one makes the instance unsatisfiable before any letter of `F` is chosen" |
| **D6** | undefined "Gate T" | **FIXED** | removed from the architecture; the only surviving occurrence is the Appendix-B note recording its removal |
| **D7** | ADEF stage with no cover | **FIXED** | §15: "omitted here because no factor-maximal ADEF cover has yet been promoted into the manuscript" |
| **D8** | Lemma 11.1 used a `K=1` constraint | **FIXED, verified** | replaced by `u=aba, v=baa`, continuation `aa`, constraint `X₁−2X₃+X₅=0`. I recomputed independently: both give `X₃=(2,1)`; results `(1,−1)` vs `(0,0)`; depths 1,3,5 are a genuine `K=2` progression |
| **D9** | `L=4` wording | **FIXED, exactly** | §8.1: "At `L=4` the quotient already has 19 classes, but they are not yet the stable Table-1 family list: `Z_s = ∅` …" |
| **D10** | raw windows vs effective constraints | **FIXED** | §10: "1,238 unary windows aggregate to 443 distinct (depth,target) pairs, and 652 further unary windows are discarded soundly" — matches my measurement exactly |
| **D11** | generic cutset machinery not disclaimed | **FIXED** | §16 now disclaims "first-hit prefix cuts, future-equivalence state quotients, layered weighted counting DAGs" as generic |
| refs | two uncertain entries, one incomplete | **FIXED conservatively** | the unverifiable *Math. Comp.* DOI replaced by `arXiv:2605.20504`; the uncertain Keränen 2010 entry **removed** rather than guessed; ICALP 1992 completed with LNCS 623, 41–52 |

**All eleven defects are repaired.** No repair introduced a new mathematical
claim, and the one piece of new mathematics (the D8 example) is correct.

## 3. Residual issues — three local text patches

None is mathematical or computational.

1. **§13's closing sentence is now factually outdated.** It states the
   `AFE_EXISTS` column "has not yet received an equivalent two-solver
   cross-check". It has, as of this report. Leaving it would make the canonical
   manuscript understate its own validation.
2. **Orphaned Keränen citation.** §16 line 1242 still asserts "Keränen used
   staged prefix algorithms in Abelian-square-free constructions", but the
   reference supporting that (Keränen 2010) was removed as unverified. The
   surviving ICALP 1992 entry is about avoidability on four letters, not staged
   prefix algorithms. Conservative removal orphaned the sentence.
3. **Version-label slips.** Appendix A is headed "Epistemic ledger for v0.32"
   and Appendix B "Editorial changes through v0.32" in a v0.33 manuscript.

## 4. Verification I performed independently in this pass

- Manifest hashes of both v0.33 files — **MATCH**.
- The 263-pair population re-derived from the frozen artifacts: **263 rows, 86
  AFE-true, 44 joint-true** — matching the protocol's pre-registered
  expectation of 86 positive / 177 negative.
- The full AFE cross-check (§1).
- The D8 example arithmetic, recomputed from scratch.
- The D10 numbers (`1238 → 443`, `652` discarded) against my own
  implementation-semantics measurement from the v0.32a audit.
- The D2 numbers (`max |A_d| = 38`, 38 of 40 depths, ternary-forced) against my
  own frontier measurement.

Carried forward from the v0.32a audit, unchanged: Theorem 8.1 and all nineteen
Table-1 cardinalities independently reproduced; Phase-II claims A–F clean-room
verified with forced-UNSAT coverage; every §13 headline number matching its run
artifact exactly.

## 5. One honest caveat on audit independence

§17.1 of v0.33 now cites the Phase-II clean-room audit — **my** audit — as
validation. That is accurate, but it is an *internal* audit within the same
project, not external peer review. The manuscript should not be read as having
third-party validation of Phase II. This does not block promotion of a sandbox
draft; it should be remembered at submission time.

## 6. Verdict

> ## **B. READY AFTER LOCAL TEXT PATCHES**

The computational blocker is gone: the `AFE_EXISTS` cross-check passes
263/263 with an independent solver and an independent literal checker. All
eleven referee defects are genuinely repaired in the text, not merely claimed
in the changelog. No mathematical blocker, no provenance blocker, and no
remaining computational blocker was found.

It is **B** rather than **A** for exactly one substantive reason: §13 now
asserts the absence of a cross-check that this session has just supplied.
That sentence must be updated before canonical promotion, together with two
cosmetic fixes. Exact replacement wording is in
`PAPER4_v033_FINAL_REQUIRED_PATCHES_2026-08-29.md`.

None of the deferred items — the weighted-frontier H/RX mechanism experiment,
the complete `Aset` theorem, a complete six-block `H`, a Mäkelä solution, or
novelty closure — is required for canonical v0.33, and none was attempted.

I have **not** promoted anything. Canonical promotion remains an owner decision.

## 7. File classification (per `CLAUDE.md`)

All artifacts produced in this session are **SCRATCH**, correctly placed under
`scratch/claude-intake/_paper4-next-version-sandbox/`. **No new root-level
files.** Candidates for later **OWNER DECISION** on canonicalization: this
audit, the cross-check report, its protocol, and the results CSV.
