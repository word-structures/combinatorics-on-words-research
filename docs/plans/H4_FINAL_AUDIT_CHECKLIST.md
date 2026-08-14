# H4_FINAL_AUDIT_CHECKLIST.md

> ## ⚠ PRE-OUTCOME CHECKLIST — PRESERVED UNCHANGED
>
> **This checklist was fixed on 2026-08-13, before the H4 campaign completed and before
> any campaign outcome was known.** That is the entire source of its value: a checklist
> written after the result exists can be unconsciously shaped by that result, and nobody
> would be able to tell.
>
> **Preservation record**
>
> | | |
> |---|---|
> | Source | `scratch/intake/2026-08-12-weekly-sync/H4_FINAL_AUDIT_CHECKLIST.md` (untracked intake) |
> | Source SHA256 | `9e236d29869f4ac8875e8a9d1b483e8b8b91e1ecdc3e6c737626905f849ef8d0` |
> | Preserved | 2026-08-14, campaign still in flight, `FINAL_AUDIT.txt` **absent** |
> | Body | **verbatim.** Only this banner was added. No check was added, removed, reworded, or reordered. |
>
> **Rules for anyone editing this file.** Do not update it using observed campaign
> results. Do not add checks derived from what the campaign turned out to produce. Do not
> soften a check because it looks likely to pass. If a check is genuinely wrong, record
> the correction and the date **as an appendix**, leaving the original text intact — the
> pre-outcome version is the artifact worth having.

**Date prepared:** 2026-08-13
**Status:** PREPARATION ONLY. The campaign has **not** finished. Nothing here is a result.
**Trigger:** run this only once `results_h4\FINAL_AUDIT.txt` exists.

---

## ⚠ 0. NAMING HAZARD — read before anything else

There are **two** files named `FINAL_AUDIT.txt`. They are not the same thing.

| File | What it actually is |
|---|---|
| `imported-artifacts\L5_FINAL_VERIFICATION_4\six_lane_results\FINAL_AUDIT.txt` | a **six-shard rehearsal** of the verification pipeline |
| `C:\MSVC\L5_FULL_CLOSURE_CAMPAIGN_1\results_h4\FINAL_AUDIT.txt` | the **authoritative 2219-shard campaign audit** — *does not exist yet* |

The rehearsal artifact demonstrates that the wrapper, alerting, crash/resume and audit
tooling work. **It establishes nothing about the L=5 family.**

This hazard has now been independently flagged three times (intake README, task brief,
and the audit that found the file). Recorded as **NR-M9**. Do not let it collapse.

---

## 1. Coverage and completeness

- [ ] `FINAL_AUDIT.txt` exists at the campaign path, and is the **campaign** audit (§0).
- [ ] Shard count: **2219 / 2219** present, each with a valid `.done` marker.
- [ ] **No missing shard ids** — verify the id set is exactly `{0 … 2218}`, not merely that the count is 2219.
- [ ] **No duplicate coverage** — union of per-shard profile ranges partitions the domain; no profile counted twice.
- [ ] Profiles summed across shards = **5,153,928** exactly.
- [ ] `missing = 0` as reported by the audit, **and** independently recomputed.

## 2. Mass accounting

- [ ] Processed codings = **3,316,540,933,500** exactly.
- [ ] Rejected codings = **3,316,540,933,500** exactly.
- [ ] `processed = rejected + survivors` per shard **and** in aggregate — recompute, do not trust the field.
- [ ] `plannedCodings = processed` for every shard.
- [ ] Aggregate mass matches the independently re-derived Stage-A mass (VGAI-EPISODE-0001).

## 3. Identity and provenance fingerprints

- [ ] `coreFingerprintSha256` = `8ee27c558e1d8adbee3df437df36c321ac593d3b5ba3c52e637ffcff8bd42d8f` on **every** shard, exactly one distinct value.
- [ ] `h6SourceSha256` = `02682f49e7b4980d5f310a917e9d0d7971cc8d9f71ef84e11a7e2df0023d77b0`, exactly one distinct value.
- [ ] `stageASha256` = `5d85138a0c432ae1ba59a6734326e431de5c417a5d7abcae31e6f8850da4eca1`, and the referenced file still hashes to it.
- [ ] `planManifestSha256` = `fbfac5c4a34733b60253f9ff4a428eedafbdfa0318c130757ddd031beae9611b`.
- [ ] `executableSha256` recorded and unchanged across the run.
- [ ] Confirm no shard was produced by a **different** build mid-campaign.

## 4. Survivors

- [ ] `survivors = 0` in aggregate.
- [ ] `SURVIVOR_ALERTS.ndjson` absent, or present and consistent with the survivor records.
- [ ] Every `shard_*.survivors.bin` is empty, and its SHA256 equals the empty-input digest `e3b0c442…b855`.
- [ ] **If any survivor exists:** stop the audit. Independently reconstruct that coding from `(profileIndex, codingId)`, re-run the exact checker *and* the JS oracle, and treat it as a **major positive finding**, not an error to be explained away.

## 5. Independent rechecks (do not rely on the campaign's own audit)

- [ ] Re-run the JS reference oracle on a deterministic random sample of codings across many shards; compare verdicts to the C++ engine.
- [ ] Re-verify the golden fixture against the shipped expected values.
- [ ] Re-run `mutation_test.ps1` — confirm the checker **fails** when mutated (non-vacuity).
- [ ] Verify the K=40 control still triggers as designed.
- [ ] Spot-check the unranking: for sampled `codingId`s, confirm mixed-radix decode reproduces the intended concrete coding. **(Link 8 of the closure chain is currently `PENDING` — this is where it closes.)**

## 6. Invariants already verified mid-flight (recheck at completion)

At 825 completed shards these held with zero violations; confirm they still hold at 2219:

- [ ] `rejected + survivors == processed` — 0 violations.
- [ ] `plannedCodings == processed` — 0 mismatches.
- [ ] exactly one distinct core fingerprint and one distinct h6 source hash.

## 7. Classification

- [ ] Audit reports `FULL_CLOSURE_ZERO_SURVIVORS_PASS` **and** every box above is independently confirmed.
- [ ] If any check fails → classification is **not** closure. Record the failure; do not downgrade the check.

## 8. Exact bounded claim supported (draft — owner decides wording)

If and only if everything above passes, the supported statement is approximately:

> Every uniform coding `g : Σ₆ → Σ₃⁵` (all `243⁶ = 205,891,132,094,649`) either
> (a) is eliminated by the block-aligned Parikh condition `M_g·d = 0` for some
> `d` from `h₆⁹(a)` with `m ∈ [2,120]` — witnessing an abelian square of half-length
> `K = 5m` within the first **98,415** coded symbols; or
> (b) has an abelian square of half-length `K ∈ [6,40]` within the first **3,645** coded
> symbols of `g(h₆⁶(a))`.
> Stage A retained 5,153,928 profiles covering 3,316,540,933,500 codings; Stage B
> processed all of them with 0 survivors.

**Mandatory accompanying scope statement:**

- Does **not** establish Mäkelä's conjecture.
- Does **not** cover non-uniform `g`, `L ≥ 6`, or source morphisms other than `h₆`.
- The combined window is **98,415** coded symbols, *not* 3,645 — Stage A's window is 27× larger (see `L5_PRE_H4_CLOSURE_STATUS.md` §3).
- Status `COMPUTED`, not `PRIMARY`. Not a theorem.

## 9. Relationship to canonical row 49

- [ ] Do **not** edit row 49 as part of the audit.
- [ ] Produce a separate reconciliation proposal (see `CLAIMS_RECONCILIATION.md` §1): likely **differently scoped**, plausibly stronger in the coding-family and witness-bound axes, narrower in window and K-range. Owner decides wording.

---

## 10. Prerequisites that should be closed *before* the audit runs

| Prerequisite | Current status |
|---|---|
| Stage-A soundness | **CLOSED WITH STATED SCOPE** (VGAI-EPISODE-0002) |
| Stage-A survivor integrity (SHA256) | **CLOSED** |
| Stage-A survivor **durability** | **UNRESOLVED** — one untracked copy |
| Stage-B unranking independent check | **PENDING** — §5 closes it |
| Oracle parity re-verification | **PENDING** — §5 closes it |

Resolving durability *before* the campaign ends is advisable: if the survivor file were
lost after completion, the recorded hash would prove only that something specific is
missing, and the result could not be re-verified against its input.
