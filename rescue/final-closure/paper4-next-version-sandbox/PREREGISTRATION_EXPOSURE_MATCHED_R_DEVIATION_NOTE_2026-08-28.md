# Deviation / correction note — exposure-matched R preregistration

**Applies to:** `PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md`,
sha256 `bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c`.

The preregistration file is **not edited** — it stays exactly as hashed. This
note records every discrepancy found after hashing.

---

## D1. Arithmetic error in the H feasibility line (descriptive, no design change)

**§6 of the preregistration states:**

> "Under `Q = 5000`, H's capped total is 31,775 trials over 9 E, **5** at exact quota."

**Correct value: 4 at exact quota.**

The H `|Aset|` values are `[26646, 50593, 201, 1435, 8778, 13821, 3289, 3513,
3337]`. Exactly four are `≥ 5000`: `26646, 50593, 8778, 13821`. The capped
total of **31,775** is correct; only the count of E reaching the quota was
mis-stated.

**Impact: none on design or results.** The quota rule, the ordering rule, the
caps and the decision rules are unchanged. The affected stratum `H-5000-EQ`
therefore contains **4** E and 20,000 trials, not 5 E and 25,000. This was
discovered while running `rx_h_matched.js`, which reports the realised value
directly from the data, and is reported as the realised value everywhere.

**Detected:** after hashing, before the RX AF pass completed. It could not have
been influenced by any RX outcome.

## D2. Clarification of the stop condition's scope (no rule change)

§10 says "STOP expansion" on any `AF_AND_AFE_EXISTS = true` in RX. The reading
applied is:

- the **preregistered population is still evaluated to completion** — stopping
  mid-enumeration would leave the primary counts undefined and would itself be
  an outcome-dependent decision;
- **no expansion beyond it** occurs: no further quota, no further population,
  no additional E, and Phase 4 is restricted to the frozen triple.

The witness is frozen and hashed at the moment it is found, as required.

## D3. Unit of the primary counts (clarification, not a change)

Both RX and quota-matched H count `(E, A)` **pairs**, not distinct A. This is
the unit named in §7 ("A trials per E", "AF-positive count per E") and is the
unit in which H's frozen `bcdBIG_H` results are recorded. Note that the
quota-matched H AF-positive pair count (263) exceeds the Report-7 distinct-A
count (202) for this reason alone; the two are not the same quantity and are
never compared directly.

## D4. `AF_EXISTS` memoisation across E (implementation, stated in advance)

`AF_EXISTS(A)` depends on A alone, so it is computed once per distinct A and
reused when the same A appears under another E. This was stated in §4 of the
preregistration. It changes no verdict and no count; it only avoids recomputing
identical decisions.

## D5. Run `afexRX` VOIDED — two concurrent writers (my defect)

The first execution attempt was corrupted and is **discarded as a result**,
though retained on disk.

**Cause.** An early `nohup node rx_run.js > ... &` launch appeared to fail
because its output redirect could not be read, but the **process had started**.
A second process was later launched through the background task runner. Both
appended to `runs/afexRX/`.

**Evidence.** `af_pairs.jsonl` holds 42,647 rows for only 22,564 distinct
`(eIndex, rank)` keys; 18,170 keys were written more than once. Two live PIDs
(27196 started 18:54:44, 31268 started 18:56:47) were confirmed by process
inspection and both were terminated.

**Disposition.** The directory is **retained, not deleted**, and marked by
`runs/afexRX/VOID.json` with status `VOID_CONCURRENT_WRITERS`. All of its
counts and all timings in `afexRX.stdout` are void. Individual `nodes` values
remain genuine per-`(E,A)` measurements and were used **only** as a cost model,
never as a result.

**Superseded by** run `afexRX2`, which takes an exclusive `O_EXCL` lock at
`runs/afexRX2/RUN.lock` and refuses to start if another run holds it.

**No preregistered parameter changed:** quota `Q = 5000`, AF cap `5·10⁶`,
recheck cap `2·10⁹`, the `Alist` ordering rule, the fail-closed rule and all
decision rules are identical. Only process management and file I/O changed.

## D6. Per-record `fsync` cost — implementation defect, corrected

`persist.js`'s `Appender` calls `fs.fsyncSync` after **every** record. Report 7's
`af_exists_run.js` persisted only AF-positive rows (202 and 58 records), but
`rx_run.js` wrote one record per trial (~75,000). Per-record fsync — compounded
by two processes contending on the same files — dominated the voided run:
about **640 ms/trial observed** against **~45 ms/trial** predicted from the
measured node counts (mean ≈ 59,300 nodes/trial at ≈ 1.3·10⁶ nodes/s).

**Correction in `afexRX2`:** AF-positive and capped rows keep per-record fsync
(they are rare and are the evidentiary records); the high-volume per-trial audit
log uses a buffered stream flushed and fsynced at every **E boundary**, together
with a `perE_partial.json` checkpoint. Durability is preserved at E granularity;
no verdict is affected.

## D7. The preregistered fail-closed cap rule was observed working

Before being voided, the run exercised §4's rule exactly once and correctly:
A word at `eIndex 12, rank 66` hit the `5·10⁶` cap, was persisted, and the
automatic `2·10⁹` re-decision resolved it **AF-negative in 6,483,407 nodes**
in about 4 seconds. This is recorded in `runs/afexRX/capped.jsonl`, which is
valid. (An earlier `wc -l` reported 0 lines only because the file has no
trailing newline; the file has always held both records.)

---

No other deviation. No canonical edit, no Git mutation, no promotion.
