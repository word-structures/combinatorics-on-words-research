# Stage-A soundness — independent verification artifacts

**Preserved:** 2026-08-14. **Preservation-only pass — no new claim is made by this directory.**

These three scripts produced the independent-verification evidence recorded in the notes
column of `MATH_CLAIMS.md` **row 80**. Until this preservation they existed only in a
session-scoped temporary directory: a canonical claim cited evidence that could not be
re-run. That is the gap this directory closes, and the only thing it does.

**These are verification artifacts, not production code.** Nothing here is part of any
pipeline. Nothing here should be imported by production code — doing so would destroy the
independence that makes them worth keeping.

---

## 1. What each script is

### `stagea_soundness.js` — concrete-coding soundness checker

Enumerates **every** concrete coding `g : Σ₆ → Σ₃^L` and, for each one, compares two
verdicts computed by disjoint code paths:

- **Ground truth** (`hasBlockAlignedSquare_stringLevel`) — materialises the coded word
  `g(w)` as an explicit array and detects a block-aligned abelian square by *directly
  counting letters* in two adjacent windows. No matrix algebra anywhere in this path.
- **Predicate under test** (`predicateEliminates`) — computes `M_g·d` over the collected
  difference set and reports elimination when it vanishes.

A **false rejection** — predicate says eliminate, but no block-aligned square exists — is
the fatal case, and is what the whole exercise hunts for.

```
node stagea_soundness.js <L> <n> <mMin> <mMax> [--profile-invariance]
```

`n` is the number of `h₆` iterations, so the source word is `h₆ⁿ(a)` of length `3ⁿ`.

### `stagea_profile_level.js` — profile-tuple checker

Same ground-truth oracle, lifted to Parikh profiles so the production-sized domain becomes
reachable. Three modes:

| Mode | Purpose |
|---|---|
| `sweep <L> <n> <mMin> <mMax> [--limit=N]` | full or subsampled profile-tuple sweep; reports `exhaustive: true` only when every tuple was tested |
| `inv <L> <n> <mMin> <mMax> <samples>` | profile-invariance: for sampled profile tuples, checks all concrete codings realising them agree on the ground-truth verdict |
| `adver <L> <n> <mMin> <mMax>` | adversarial/extreme profiles and an order-sensitivity probe |

### `independent_l5_mass_check.js` — Stage-A accounting re-derivation

Streams a Stage-A survivor NDJSON file and independently re-derives the profile count and
coding mass. Independence comes from the derivation: the per-profile multiplicity is
computed from the multinomial coefficient `5!/(nₐ! n_b! n_c!)`, where the original script
brute-force enumerated all `3⁵` assignments. It additionally checks a property the original
never tested — that `profileIndex` is exactly the base-21 mixed-radix encoding of the six
profile vectors.

```
node independent_l5_mass_check.js <path-to-stageA_survivors.ndjson>
```

---

## 2. What claim this supports

`MATH_CLAIMS.md` **row 80** — the reduction of `S_large(L)` to the Parikh-level condition
on the coding's incidence matrix, and specifically the statement that a block-aligned
abelian square exists **iff** `M_g·d = 0`.

Row 80's status is `COMPUTED` and these scripts **do not change that**. They are evidence
for an existing claim, not a new one.

The direction that must not be lost: **elimination is sound; survival remains
non-informative.** See row 82. A profile surviving Stage A is not a candidate — it is
merely not eliminated.

The Stage-A survivor artifact these accounting figures describe is identified in
`research/provenance/STAGE_A_L5_MANIFEST.md`.

---

## 3. Independence — what is and is not independent

Independence is a list, not a property (`EPISTEMIC_DISCIPLINE.md` §5). Stated honestly:

| Dimension | Status | Why |
|---|---|---|
| **Derivation** | **INDEPENDENT** | The *iff* was re-derived from Parikh additivity through a uniform coding before the production algorithm was read. |
| **Algorithm** | **INDEPENDENT** | The ground-truth oracle materialises `g(w)` and counts letters. The production filter contains no such oracle. |
| **Data representation** | **INDEPENDENT** | `h₆ⁿ(a)` built by array push over letter indices, not string concatenation. |
| **Input generation** | **INDEPENDENT** | Codings and profiles enumerated here from scratch; profiles generated as compositions of `L` into 3 parts. |
| **Imports** | **INDEPENDENT** | `stagea_soundness.js` and `stagea_profile_level.js` have **zero `require()` calls** of any kind. `independent_l5_mass_check.js` requires only the Node built-ins `fs` and `readline`. **No project module is imported by any of the three.** |
| **Language** | **SHARED** | JavaScript, same as `scripts/parikh-block-filter.js`. |
| **Runtime** | **SHARED** | Same Node.js, same machine. |
| **Author / agent** | **SHARED** | Same AI agent lineage as the code under audit. |
| **`h₆` definition** | **SHARED BY TRANSCRIPTION** | `H6` is transcribed inline from `src/morphisms.js` rather than imported — verified character-for-character identical. A transcription error would be caught by the positive controls, but the *definition* is common to both sides. |

**Consequence.** These runs are strong evidence that the implemented predicate matches the
mathematics. They are **weak** evidence about anything requiring author or runtime
independence. The strongest partial mitigation is that the derived *iff* independently
reproduces a statement already in canonical row 80, authored separately at a different time.

---

## 4. Exhaustive coverage actually run

Reported in `MATH_CLAIMS.md` row 80's notes and reproduced below. **Zero false rejections
in every case.**

| Scope | Scale | False rejections |
|---|---|---|
| L=1, all concrete codings | 729 | **0** |
| L=2, all concrete codings | 531,441 | **0** |
| L=2, all profile tuples | 46,656 | **0** |
| L=3, all profile tuples | 1,000,000 | **0** |
| **L=5, all profile tuples — the entire production domain `21⁶`** | **85,766,121** | **0** |
| L=5, extreme/degenerate profiles | 21 | **0** |
| Order-sensitivity probe | 18 pairs | **0** |

Cumulative: **1,580,138 concrete codings and 86,812,777 profile tuples, zero
counterexamples.**

Cross-implementation agreement, computed before comparison against canonical values:
185 distinct differences · 24 L=2 survivors · 192 L=2 concrete codings · 14,394 L=3
survivors. Row 80's own L=4 figures reproduced exactly: **320,352** survivors and
**2,451,788,832** concrete codings.

### Source and window parameters

| | |
|---|---|
| Source morphism | `h₆ = {a→ace, b→adf, c→bdf, d→bdc, e→afe, f→bce}`, 3-uniform |
| Source word | `h₆ⁿ(a)`, length `3ⁿ` |
| Verification runs | `n = 4` (81 source symbols), `m ∈ [2,8]`, giving 185 distinct differences |
| Row-80 L=4 cross-check | `n = 8`, `mMax = 25`, 903 distinct differences |
| **Production Stage A (for contrast — not what these scripts run)** | `L=5`, `mMax=120`, `iterN=9`; source `h₆⁹(a)` = 19,683 symbols → **98,415** coded symbols |

The verification runs deliberately use a **smaller** window than production. A smaller
difference set is the harder test for soundness: fewer differences means fewer chances to
eliminate, so any elimination that does fire is more exposed to being wrong.

---

## 5. Limitations

Read these before citing anything in this directory.

1. **Not a formal proof.** No proof assistant was involved. Exhaustive testing over a
   finite domain is not a proof of the general statement, and `EPISTEMIC_DISCIPLINE.md` §3
   applies in full.
2. **Same author, language, and runtime** as the code under audit (§3). These runs are not
   evidence about AI methodology, and must not be cited as such.
3. **No implication of L=5 closure.** Stage-A soundness removes a blocker. It says nothing
   about whether the L=5 family closes; that depends on the Stage-B campaign and its
   independent audit. **Survival at Stage A carries no positive avoidance guarantee.**
4. **Block-aligned squares only.** The *iff* is exact for squares aligned to block
   boundaries with `K = mL`. Non-aligned squares and `K` values that are not multiples of
   `L` are invisible to this method by construction — see row 82.
5. **Scope.** Uniform `g`, the fixed 3-uniform `h₆`, `m ≥ 2`. Nothing here covers
   non-uniform codings, other source morphisms, or `L ≥ 6`.
6. **`inv` mode is non-deterministic** — it samples profile tuples with `Math.random()` and
   has no seed. Its counts vary between runs. The `sweep` and `adver` modes are fully
   deterministic.
7. **`independent_l5_mass_check.js` needs a 273 MB input that is not in this repository.**
   Without that file this script cannot run at all. Its identity, both current file
   locations, and its durability status are recorded in
   `research/provenance/STAGE_A_L5_MANIFEST.md` §5 — **that manifest is the authority; do
   not restate its paths or hashes here.** Note in particular that the two copies live on
   the same physical volume, so the input is redundant against accidental deletion but not
   against device failure.
8. **Its final two comparison lines are a drift detector, not verification.** The script
   ends by comparing against the literals `5153928` and `3316540933500`. Per
   `EPISTEMIC_DISCIPLINE.md` §8 that is a drift detector. **The independence lives in the
   multinomial derivation above those lines, not in the comparison** — which is exactly why
   the derivation was written differently from the original.
9. **The cross-implementation checks in §4 came from a fourth script that is lost.** The
   185/24/192/14,394 agreement figures and the L=4 pair (320,352 and 2,451,788,832) were
   produced by a separate reconstruction of the Parikh-block filter, which was **not**
   preserved and no longer exists anywhere — searched across the repository, both intake
   trees, every worktree, and `C:\MSVC`. Only its three JSON outputs survive; they are
   preserved in `evidence/` and documented in §6. **An output is not a substitute for
   source-level auditability.** See §6 for exactly which of those results the preserved
   checkers can and cannot reproduce.

---

## 6. Historical execution artifacts (`evidence/`)

Three JSON outputs, preserved **byte-for-byte** on 2026-08-14 from the same session-scoped
temporary directory as the scripts. No whitespace was normalised, no JSON rewritten, no
content reinterpreted or regenerated.

**All three were produced by the same lost fourth script**, not by the checkers in this
directory. Each carries an identical self-description in its `note` field:

> *"Independent reconstruction of MATH_CLAIMS.md row 80/82's Parikh-block filter (original
> script lost). Not a restoration — a fresh computation. Cross-check against row 80/82
> figures before trusting for any claim."*

That script's source **does not survive**. It was searched for across the repository, both
intake trees, every worktree, and `C:\MSVC`; it exists nowhere. What follows is therefore a
record of a computation, not a re-runnable one.

| File | Bytes | SHA256 (source = tracked) |
|---|---|---|
| `evidence/prod_l2.json` | 813 | `b274c30c0ee4c290069c13cb978796fa07181be3aa76abefdde2773a87028478` |
| `evidence/prod_l3.json` | 202,035 | `1b7157ff96cd5022b5931cec5440bec508cb648219012f3a3690af7e3878f1b4` |
| `evidence/prod_l4_row80.json` | 5,126,197 | `65e1de6059de00afbfae7e8fba834d783588af41e7a910d18c8170ce3f6e7079` |

Original source path: `%LOCALAPPDATA%\Temp\claude\C--abc\<session-id>\scratchpad\`.
Original mtimes: 2026-08-13 20:42:55, 20:43:12, 20:43:32.

### What each artifact records

| | `prod_l2.json` | `prod_l3.json` | `prod_l4_row80.json` |
|---|---|---|---|
| Run parameters | `L=2, iterN=4, mMax=8` | `L=3, iterN=4, mMax=8` | `L=4, iterN=8, mMax=25` |
| Distinct differences | 185 | 185 | 903 |
| Profile domain `D` | 6 | 10 | 15 |
| Profile tuples | 46,656 | 1,000,000 | 11,390,625 |
| **Survivors** | **24** | **14,394** | **320,352** |
| Concrete string codings | 192 | 2,312,874 | 2,451,788,832 |
| Wall clock | 0.037 s | 0.144 s | 1.763 s |
| Payload | full survivor list | full survivor list | full survivor list |

`prod_l4_row80.json` is the artifact behind the L=4 cross-check quoted in `MATH_CLAIMS.md`
row 80's notes.

### Reproducibility, checked rather than assumed

Verified on 2026-08-14 by running the preserved checkers against each artifact's own
recorded configuration:

| Artifact | Generating implementation | Result reproducible by preserved code? |
|---|---|---|
| `prod_l2.json` | **lost** | **YES — reproduced.** `stagea_profile_level.js sweep 2 4 2 8` returns 46,656 tuples, **24 survivors**, 185 differences. Exact match, 0 false rejections. |
| `prod_l3.json` | **lost** | **YES — reproduced.** `stagea_profile_level.js sweep 3 4 2 8` returns 1,000,000 tuples, **14,394 survivors**, 185 differences. Exact match, 0 false rejections, 6 s. |
| `prod_l4_row80.json` | **lost** | **PARTIALLY.** `sweep 4 8 2 25` reproduces the *shared inputs* exactly — source length 6,561, **903** distinct differences, `D = 15`, 11,390,625 tuples. The **survivor count 320,352 has not been re-derived** by preserved code: the exhaustive L=4 sweep with a string-level oracle over a 6,561-symbol source is hours of compute and was not run. **`totalStringCodings = 2,451,788,832` cannot be reproduced by these checkers at all** — they operate at profile level and do not compute concrete-coding mass. |

### What this preservation does and does not do

- These files are **provenance and evidence artifacts, not authorities.** `MATH_CLAIMS.md`
  is the only claim authority; nothing here overrides or supplements a ledger row.
- **No evidence level is upgraded by preserving them.** Row 80 remains `COMPUTED`. An
  artifact that records a computation is weaker evidence than code that can re-perform it,
  and preserving the artifact does not close that difference.
- **The output does not substitute for source-level auditability.** Nobody can now inspect
  how the lost script computed what it reported. The numbers can be *compared*; the method
  cannot be *reviewed*.
- Canonical `scripts/parikh-block-filter.js` computes the L=4 figures correctly — the
  `multinomial4` defect recorded in `NEGATIVE_RESULTS.md` §24 only bites at `L = 5`. But
  reproducing a number with the canonical script is **not the same independence path**: it
  is the very implementation the lost script existed to cross-check. Agreement with it
  would confirm arithmetic, not independence.
- **The lost checker must not be reconstructed and presented as the historical one.** A
  later reimplementation would be a new artifact with new provenance, and representing it
  as the 2026-08-13 checker would be a provenance falsification. If one is ever written, it
  gets a new name, a new date, and its own record.

---

## 7. Provenance

Rescued from a session-scoped temporary directory
(`%LOCALAPPDATA%\Temp\claude\C--abc\<session-id>\scratchpad\`) on 2026-08-14. The three
scripts are **byte-for-byte identical** to the artifacts that produced the reported
results; no portability fix was needed, because none contains a hard-coded path.

| File | SHA256 (source = tracked, verified identical) | Bytes |
|---|---|---|
| `stagea_soundness.js` | `c8cd8b8f7f1cb5153ebfb3ff8400f32c66cbee4574d5a034573d7b06d62d073a` | 6,212 |
| `stagea_profile_level.js` | `b910f551c3946fe0db4bc6c8d100b14499a771f43cbe171e54819146031609ed` | 7,958 |
| `independent_l5_mass_check.js` | `c54c52e30db966e89477af270f335b238488e02edf61fb3f96de582aa239722f` | 2,880 |

Original mtimes: 2026-08-13 20:39, 20:40, and 20:06 respectively.

---

## 8. Reproduction

All commands are run from this directory. Runtimes are from a smoke test on 2026-08-14
while the H4 campaign was occupying six cores.

### Cheap — seconds, safe to run any time

```bash
node stagea_soundness.js 1 4 2 8
```
Expect: `totalCodings: 729`, `eliminated: 729`, `survived: 0`, `falseRejections: 0`.

```bash
node stagea_profile_level.js sweep 2 4 2 8
```
Expect: `totalProfileTuples: 46656`, `exhaustive: true`, `survived: 24`,
`falseRejections: 0`.

```bash
node stagea_profile_level.js adver 5 4 2 8
```
Expect: `extremeProfilesTested: 21`, `eliminated: 21`, `falseRejections: 0`,
`orderProbePairs: 18`, `orderSensitivityDisagreements: 0`.

### Moderate — minutes

```bash
node stagea_soundness.js 2 4 2 8
```
All 531,441 concrete codings at L=2. Expect `falseRejections: 0`.

```bash
node stagea_profile_level.js sweep 3 4 2 8
```
All 1,000,000 L=3 profile tuples. Expect `exhaustive: true`, `falseRejections: 0`.

### Expensive — do not run while a campaign is using the machine

```bash
node stagea_profile_level.js sweep 5 4 2 8
```
The full `21⁶ = 85,766,121` production profile domain. This is the headline result:
`exhaustive: true`, `eliminated: 74,240,763`, `survived: 11,525,358`,
`falseRejections: 0`. Long-running and CPU-bound.

### Requires the external survivor artifact

```bash
node independent_l5_mass_check.js <path-to-stageA_survivors.ndjson>
```
Expect the multiplicity table `[1,5,10,10,5,1,5,20,30,20,5,10,30,30,10,10,20,10,5,5,1]`
summing to 243, then `profiles = 5153928`, `mass = 3316540933500`, `minD = 125`,
`maxD = 216000000`, and zero malformed vectors and zero `profileIndex` mismatches.
See limitation 7.

---

## 9. Smoke tests performed at preservation time

Run on 2026-08-14 immediately after copying, to confirm the tracked copies work from their
new location with no temp-directory dependency:

| Command | Result |
|---|---|
| `stagea_soundness.js 1 4 2 8` | 729 codings, 729 eliminated, **0 false rejections** ✅ |
| `stagea_profile_level.js sweep 2 4 2 8` | 46,656 tuples, exhaustive, 24 survivors, **0 false rejections** ✅ |
| `stagea_profile_level.js adver 5 4 2 8` | 21/21 eliminated, **0 false rejections**, 18 order pairs, 0 disagreements ✅ |
| `independent_l5_mass_check.js <2000-record slice>` | multiplicity table correct and summing to 243; 0 malformed vectors; 0 mixed-radix mismatches ✅ |

Additional runs cross-checking the preserved `evidence/` artifacts (§6):

| Command | Result |
|---|---|
| `stagea_profile_level.js sweep 3 4 2 8` | 1,000,000 tuples, exhaustive, **14,394 survivors** — exact match to `prod_l3.json`; 0 false rejections; 6 s ✅ |
| `stagea_profile_level.js sweep 4 8 2 25 --limit=1` | srcLen 6,561, **903** differences, `D = 15`, 11,390,625 tuples — shared inputs of `prod_l4_row80.json` reproduced exactly ✅ |

Every reproduced figure matches the originally reported value. Two things were
**deliberately not run**: the exhaustive L=5 sweep and the exhaustive L=4 sweep — both are
long and CPU-bound, and the H4 campaign was occupying the machine.

The mass checker was exercised on a 2,000-record slice for portability only. On a slice its
final two comparison lines correctly print `false`, because they compare against full-set
constants (see limitation 8). That is the expected output, not a failure.
