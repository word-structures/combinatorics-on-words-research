# H4 Computational Evidence Closure Report

This document is the human-readable summary of the H4 computational evidence closure audit. It establishes the exhaustive elimination of the Route-C $L=5$ uniform coding family under the two preregistered finite tests and their stated bounds.

## 1. PREREGISTRATION

The campaign was preregistered to exhaustively scan the space of $L=5$ uniform codings (compositions of 5 into 3 parts) over the alphabet $\Sigma_6$. The domain size is precisely $3^5 = 243$ choices for each of the 6 symbols, meaning a total family size of $243^6 = 205,891,132,094,649$ uniform $L=5$ codings.

The exhaustive search was split into two stages:
*   **Stage A**: Elimination via block-aligned Parikh condition $M_g \cdot d = 0$.
*   **Stage B**: Exact finite prefix abelian square checking.

## 2. PRODUCTION CAMPAIGN

The production campaign processed the remaining candidates in a parallel compute farm. Due to the massive scale of the data, the raw campaign artifacts remain external to this repository and are preserved at:
`C:\MSVC\L5_FULL_CLOSURE_CAMPAIGN_1\results_h4\`

The raw campaign directory layout consists of 2219 `.summary.json` shards, corresponding `.survivors.bin` outputs, and `.done` markers. The raw shard corpus is deliberately NOT committed to the version control system due to its multi-gigabyte footprint. The exact accounting numbers recorded here were independently reconstructed and verified from that raw corpus (see §4).

**Artifact durability limitation.** "Independently reconstructed and verified" describes the *verification* performed, not the *physical redundancy* of the underlying artifacts. At the time of writing, the Stage-A input artifact `stageA_survivors.ndjson` (272,918,577 bytes, SHA-256 `5d85138a0c432ae1ba59a6734326e431de5c417a5d7abcae31e6f8850da4eca1`) exists as a single untracked local copy on a single physical disk, and no second physical medium was available on this machine. This durability item was already marked UNRESOLVED in the preregistration (`L5_PRE_H4_CLOSURE_STATUS.md` §7b, `H4_FINAL_AUDIT_CHECKLIST.md` §10) and remains unresolved. It does not affect the scientific result, which was verified while the artifacts were present and intact; it affects the ability to re-verify against the original input should that copy be lost.

## 3. AUTHORITATIVE FINAL AUDIT

The authoritative audit completed successfully and produced the core JSON and TXT artifacts archived in this package.

**Accepted Accounting:**
*   **family size:** $243^6 = 205,891,132,094,649$ uniform $L=5$ codings
*   **Stage-A survivor profiles:** 5,153,928
*   **concrete codings reaching Stage B:** 3,316,540,933,500
*   **Stage-B processed:** 3,316,540,933,500
*   **rejected:** 3,316,540,933,500
*   **survivors:** 0
*   **shards:** 2219 / 2219
*   **missing:** 0
*   **duplicates:** 0

## 4. INDEPENDENT RECONSTRUCTION / DECISION CHECKS

An independent audit (takeover phase) was executed to confirm the campaign's integrity from raw shards and to re-verify the essential scientific controls. The scripts used (`h4_reconstruct.js`, `verify_samples.js`) are archived in the `audit/` subdirectory.

*   **independent reconstruction:** **46 PASS / 0 FAIL**, 0 anomalies (RERUN NOW). This figure is the mechanically counted output of the archived `audit/h4_reconstruct.js`, not a transcribed total.
*   **sampled decision checks:** 4438 / 4438 preregistered samples independently evaluated (RERUN NOW) — see the scope statement below for exactly what this does and does not observe
*   **oracle parity:** PASS (RERUN NOW)
*   **golden fixture:** PASS (RERUN NOW), 10,000 codings, with coding-identity, decision, K, position, invalid-witness and survivor discrepancies all 0
*   **K=40 control:** PASS (RERUN NOW)
*   **unranking checks:** PASS (RERUN NOW)
*   **mutation control:** PASS as reported by the earlier audit session; **not re-executed during the final takeover review**, because the test rewrites `src/checker.cpp` and `src/engine.cpp` in place and requires repeated rebuilds. What was verified read-only instead: all 12 mathematical-core files in that validation workspace hash to their `PACKAGE_PROVENANCE.json` values, i.e. the workspace was left pristine, consistent with a clean restore.

**Additional checks performed during the takeover review, not covered by either archived script:**

*   **cross-shard profile partition** — 5,153,928 plan rows, 5,153,928 unique `profileIndex` values, 0 duplicates, 0 out-of-range, summed domain size exactly 3,316,540,933,500. This closes `H4_FINAL_AUDIT_CHECKLIST.md` §1 "no duplicate coverage", which `h4_reconstruct.js` (which sums `profileCount` only) and `audit_campaign.js` (which checks duplicates within a shard only) do not verify across shards.
*   **artifact integrity recomputation** — for all 2219 shards: `.done` marker `summarySha256` versus recomputed summary hash (0 mismatches); each plan shard CSV on disk versus its plan-declared SHA-256 (0 mismatches; recomputed from the file by neither archived script); each `shard_N.survivors.bin` recomputed versus its recorded `survivorSha256` (0 mismatches) and equal to the empty-input digest (0 non-empty).

### 4.1 Scope of `verify_samples.js` — what it does and does not observe

This distinction is recorded deliberately, because an earlier summary of this package described the script more strongly than it warrants.

**What the script directly establishes.** It independently evaluates the 4438 preregistered sample codings (2 per completed shard: coding `0` of the shard's first planned profile, and coding `D-1` of its last planned profile, matching `audit_campaign.js`) and finds a Stage-B abelian-square violation for **all 4438**. That is, each sampled coding *should* be rejected.

**What the script does not do.** Its `seenAsSurvivor` value is hardcoded `false`; the script never opens `shard_N.survivors.bin`. It therefore does **not** independently read the production verdict for each sample. The original `audit_campaign.js` does read the survivor binary and populate that field from disk; the archived takeover script does not.

**Where the production REJECT side actually comes from.** A separately verified chain, not from this script:

1. complete shard and domain accounting (2219/2219 shards, ids exactly {0…2218}, 0 missing, 0 duplicate, profile partition verified disjoint);
2. `processed = rejected + survivors` per shard and in aggregate;
3. `survivors = 0`;
4. all 2219 `shard_N.survivors.bin` files independently verified empty (0 bytes, and recomputed SHA-256 equal to the empty-input digest).

Given (1)–(4), every planned coding — including all 4438 samples — received production verdict REJECT. **The combined chain is accepted.** What must not be said is that `verify_samples.js` itself observed those production verdicts.

**Implementation independence.** The script's JS mathematical evaluator (`hasStageBViolation`, `reconstructBlocks`, the realization table, and the `h6` source construction) is derived from and character-identical to the existing audit JS logic in `audit_campaign.js`. The meaningful independence axis is therefore **the JS evaluator versus the C++ production engine**, not two independently written JS algorithms. Re-running it confirms reproducibility of the JS side; it is not a second independent implementation.

**Provenance of Validation Controls:**

*   **Golden Fixture, K=40, and Unranking tests:** executed (RERUN NOW) against the build of the historical validation workspace (`a1-l5-stageb-cpp-exact-engine-1`). The **mutation** control was not re-executed in the final review (see above).

*   **Hash terminology — two distinct objects, stated exactly.** These must not be conflated:

    | Object | Value | What it is |
    |---|---|---|
    | `src/checker.cpp` | `cebed1df82fb07111aacd1e8a519bd70f7a98e0fa926438b1f1755a216fc2b6a` | the SHA-256 of **one individual file**, matching `PACKAGE_PROVENANCE.json` → `mathematicalCoreFilesSha256["src/checker.cpp"]` |
    | H4 mathematical-core fingerprint | `8ee27c558e1d8adbee3df437df36c321ac593d3b5ba3c52e637ffcff8bd42d8f` | the **composite** fingerprint, computed over all **12** declared mathematical-core files, matching `PACKAGE_PROVENANCE.json` → `mathematicalCoreFingerprintSha256` |

    `cebed1df…` is **not** the mathematical-core fingerprint; it is the per-file hash of `checker.cpp` alone. The composite `8ee27c55…` is the value attested by every one of the 2219 shard summaries (`coreFingerprintSha256`) and recorded in `FINAL_AUDIT.json` as `expectedCoreFingerprintSha256`. Matching a single file does not by itself establish that the whole core matches.

    **Independently verified during the takeover review:** all **12** individual mathematical-core files hash to their `PACKAGE_PROVENANCE.json` values, **and** the composite fingerprint recomputes to `8ee27c55…` (domain-separated hash over the 12 named files, via the package's own `verify_core.js`). The controls therefore ran against the same mathematical core as production, on the strength of all 12 files plus the composite — not on the strength of one file.

*   **Oracle Parity test:** the test source was verified unmodified and re-run (RERUN NOW) — PASS. Its module path is a rigid relative path (`../../../../scripts/step1_string_level.js`) that cannot resolve from the package's real location, so the required directory nesting was reconstructed in a temporary scratch location using byte-identical copies of the tool files and junctions to the real repository `scripts/` and `src/`. No source file was edited. This is a known brittleness of the tool, recorded rather than papered over. The test compares the canonical and independent JS oracles on `violated`, `K` and `pos` — i.e. it requires witness-level agreement, not merely matching verdicts.

*(Note: If re-running the JS scripts in `audit/` against a local filesystem, you must update the hardcoded paths to point to your campaign location. They are preserved precisely AS-RUN for strict evidence continuity).*

## 4.2 Open provenance caveats

These two items are known limitations of the H4 evidence as it exists. They are recorded permanently rather than retrofitted, because retrofitting either one after the campaign has ended could not be done honestly. Neither invalidates the accepted bounded result.

**A. Per-shard executable identity is not recorded.** Every one of the 2219 shard summaries attests the same mathematical-core *source* fingerprint (`coreFingerprintSha256` = `8ee27c55…`, exactly one distinct value across all shards, independently confirmed). However, shard summaries do **not** carry an `executableSha256` field. The run manifest (`full_run_manifest.json`) records one executable hash — `9464563c0afd8f228fcdd290c413779a08b3cdcb05b5e8523cdd2b31ad6df591`, which matches the on-disk engine — but the campaign involved resumes across multiple sessions, and that manifest is a single record rather than a per-shard attestation. Therefore the statement *"every shard was produced by exactly the same binary"* **cannot be reconstructed from the per-shard artifacts**. What the artifacts do support is that every shard attests the same mathematical-core source. This gap is recorded, not retrofitted; recording an executable hash per shard is an improvement for future campaigns, not something that can be added to H4 after the fact.

**B. The real-survivor validation path was never naturally exercised.** H4 produced zero survivors, so the code path that validates an actual survivor record — tying it to its planned profile, re-deriving the coding from `(profileIndex, codingId)`, and re-checking it independently (`audit_campaign.js`, survivor loop) — never executed on real data. A **synthetic** alert self-test did exercise the alert mechanism (`results_h4/_alert_selftest/SURVIVOR_ALERTS.ndjson`, one record explicitly marked `"source":"synthetic-self-test"`), which is why the alerting pipeline is known to fire rather than assumed to. The distinction is deliberate: the alert mechanism was tested synthetically; the survivor-validation path has no natural (non-synthetic) execution evidence. The preregistered STOP-on-survivor rule likewise remains policy that was never triggered.

## 5. BOUNDED SCIENTIFIC INTERPRETATION

Every uniform coding $g : \Sigma_6 \rightarrow \Sigma_3^5$, among all $243^6 = 205,891,132,094,649$ codings, is eliminated by at least one of the two preregistered finite tests:

**Stage A:**
a block-aligned Parikh obstruction $M_g \cdot d = 0$ arising from $h_6^9(a)$ for $m \in [2,120]$, corresponding to half-length $K=5m \in [10,600]$ within the first 98,415 coded symbols;

**or Stage B:**
an abelian square of half-length $K \in [6,40]$ within the first 3,645 coded symbols of $g(h_6^6(a))$.

Stage A retained 5,153,928 profiles representing 3,316,540,933,500 concrete codings.
Stage B processed every one of those codings and found 0 survivors.

**Status: COMPUTED / bounded exhaustive finite computation.**

**Explicit Non-Claims:**
This result constitutes a massive exhaustion of a strict bound. However, H4 DOES NOT establish:
*   Mäkelä's conjecture;
*   the existence or nonexistence of all ternary constructions;
*   non-uniform morphisms;
*   uniform image lengths $L \ge 6$;
*   alternative source morphisms;
*   any stronger infinite claim than the finite tests actually establish.
