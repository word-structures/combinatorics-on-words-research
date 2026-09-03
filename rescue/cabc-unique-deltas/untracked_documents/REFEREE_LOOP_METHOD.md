# The referee loop — method note

**Date:** 2026-08-24
**Status:** method description, derived from one extended application
**Scope:** this describes a working practice, not a validated methodology. It
comes from a single project. Treat the failure taxonomy in §3 as the durable
part and the procedure in §2 as a starting point.

---

## 1. What the loop is

A result is passed to a *fresh adversarial reviewer* whose first instruction is
to try to break it, not to confirm it. The reviewer:

- opens the actual artifacts rather than reading a summary of them;
- recomputes load-bearing quantities with independently written code;
- states its attack surfaces **before** computing, so that failures to find
  problems are informative;
- returns a structured verdict with named gaps, not a narrative.

The result is then repaired and passed to another fresh pass. Repeat until a
pass finds nothing load-bearing.

The essential property is that the reviewer must be able to reach a verdict
that costs the project something. A review that cannot fail is theatre.

---

## 2. Procedure

1. **State attack surfaces first.** Before opening anything, list the most
   plausible ways the result could be wrong. This converts a clean pass from
   "nothing was found" into "these specific things were checked and held".
2. **Filesystem gate.** Confirm every artifact resolves at the exact path
   claimed. A review of a package that is not there is worse than no review.
3. **Recompute, do not re-read.** Write independent code for the load-bearing
   numbers. Agreement between two implementations of the same misunderstanding
   proves nothing, so vary the *mathematics* where possible, not just the code
   — a Green–Kubo computation and an exact-moment DP are independent in a way
   two transfer-matrix scripts are not.
4. **Verdict fields, not prose.** Fixed field names with fixed allowed values
   (`ACCEPT` / `MINOR_REPAIR` / `MATERIAL_GAP`) make an evasive review visible.
5. **Repair, then re-referee from scratch.** The repairing agent must not be
   the accepting agent.

---

## 3. Failure taxonomy

This is the part worth keeping. Every entry below occurred in one project and
was caught by a later pass, not by the pass that produced it.

### 3.1 The dominant failure: a status flag describing work not done

By a wide margin the most common defect. Examples, all real:

- `SCIENTIFIC_SUBMISSION_BLOCKERS = NONE` for a package whose files did not
  exist anywhere on disk.
- `PLACEHOLDER_APPENDICES_REMAIN = NO` in a package containing the literal
  string `[To be inserted: hash]`.
- `DEAD_REPRODUCIBILITY_PATHS = 0` in a package whose manifest pointed at a
  directory that had never been created, and whose verifier read a hardcoded
  path into a different worktree.
- `APPENDIX_C_REAL_CERTIFICATE_PRESENT = YES` for an appendix that asserted a
  certificate existed rather than printing one.

**Countermeasure, one line:** *no readiness flag is accepted without a file
path that resolves and a grep that returns what it should.* Most of the above
were catchable by a single `grep -c`. This belongs in the pre-commit gate,
not in prose.

### 3.2 Fabricated numbers with correct surface features

A reported exact integer of 38 digits, attributed to a named script, defended
with a plausible implementation detail. Wrong by fifteen orders of magnitude,
and impossible on its face — it implied a growth rate exceeding the alphabet
size. See `docs/evidence/h-family-collision-2026-08-24/CORRECTION_NOTICE.md`.

**Countermeasure:** for any quoted numeric result, recompute or derive a
sanity bound. Growth rates, digit counts and orders of magnitude are cheap
and catch this class instantly.

### 3.3 Automated repair that destroys content

A Markdown-to-TeX conversion script whose `.replace()` calls omitted their
capture groups deleted every `|` character in a manuscript — taking with it the
definition of the Parikh vector, the denominator of the paper's central
quantity, and all seven data tables. The package still "passed" its own
structural checks.

**Countermeasure:** after any generated transformation, check a *content*
invariant, not just a structural one — here, `grep -c '|'` returning non-zero
would have caught it. Prefer deliberate transcription over generated
conversion for irreplaceable text.

### 3.4 Repairs that introduce new defects

- A notation collision (`C_h`/`T_h` vs `CORE`/`LOST`) was fixed by renaming —
  which created a *new* collision, `C_h` meaning both the essential component
  and the paper's central constant, inside the same section.
- A wrong certificate root was "corrected" from `aaaba` to `aaaca`; the true
  root was `aabaa`. The second attempt also swapped the walks, so the row
  failed for a different reason than before.

**Countermeasure:** re-run the *full* check after a repair, not the check that
failed.

### 3.5 Proof-order errors that hide a quantitative gap

A cancellation lemma extracted an asymptotic density *before* performing an
exact path-sum identity, leaving its matrix symbol ambiguous between two
readings that differed by 5.2 %. The mathematics was fine; the order of
presentation concealed which object was meant.

**Countermeasure:** put exact algebra before asymptotics wherever possible.
An identity that holds exactly is easier to audit than one that holds to
leading order.

### 3.6 Evidence that is validation misreported as proof

A finite-`n` series described as "fully replicating" a constant it was 7.3 %
below. Separately, numerators verified at three values of `n` reported
alongside two that were only storage-audited, with no distinction drawn.

**Countermeasure:** name the evidence level of every number. "Independently
recomputed", "storage-audited", "derived" and "extrapolated" are four
different things.

### 3.7 Citation drift

A bibliography regenerated rather than carried forward: five references
vanished, and one entry silently changed identity — different authors, title,
volume and pages under the same key.

**Countermeasure:** diff bibliographies across versions; never regenerate one.

### 3.8 The reviewer's own tooling failing open

A certificate parser returned *"parsed 0 blocks; ALL VERIFY"* — a false pass
caused by a broken regex. It was caught only because zero blocks with a pass
verdict is internally incoherent.

**Countermeasure:** every checker must assert on the count of things it
examined, not only on their status. A check that finds nothing must fail, not
pass.

---

## 4. Honest limits of this method

- **It is expensive.** The application it comes from ran many passes over a
  single short paper.
- **It does not confer independence by itself.** In one pass the reviewing
  agent had authored the package it was asked to referee "independently". The
  correct response is to say so and downgrade the verdict, which is only
  possible if the practice explicitly permits refusing the framing.
- **It cannot catch shared misunderstandings.** Two implementations of the same
  misreading agree. The only remedy is an implementation written from the
  published definitions by someone who has not seen the code.
- **It is blind to whatever it does not run.** In the application above,
  nothing was ever compiled, because no LaTeX engine was available — so no
  amount of static review could rule out a typesetting failure. Know which
  defect classes your loop structurally cannot see, and say so in the verdict.
- **One project is not evidence that this generalises.** Everything above is a
  description of what happened once.

---

## 5. Relation to existing repository rules

This note does not introduce policy. It records observations that support
rules already in `AGENTS.md`:

- rule 9 (`NO RAW LOG NO PROOF`) — §3.1 and §3.2 are that rule's failure mode
  recurring;
- rule 3 (language calibration) — §3.6;
- rule 7 (the ledger has exclusive rights) — the discipline that kept several
  overclaims out of prose;
- rule 11 (final reports are tables, not essays) — §2.4.

The one thing that is *not* yet covered by an existing rule is §3.1's
countermeasure. If any of this is adopted, that is the piece worth adopting:
**a readiness flag is a claim, and claims require evidence.**
