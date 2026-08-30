# READABILITY_REFEREE_TEMPLATE.md

**Role:** reader / exposition referee — the fourth Stage 7 referee.
**Protocol:** `docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md`
**Gate:** `docs/research/PAPER_LIFECYCLE.md`, Stage 7.

---

## The role

Mathematically mature. Outside the discovery context. Has not read the scratch
notes, the theorem seeds, the code, or the prior sessions.

**This referee does not check whether the paper is true.** The proof referee
does that. This referee tries to *say the paper back* from the manuscript alone.

> **A mis-paraphrase by a competent reader is an exposition defect, even when
> the definition is formally correct.**

That inversion is the entire value of the role. Do not argue the reader into the
intended reading — record where the text produced the wrong one.

---

## Rules of engagement

1. **Paraphrase, do not tick.** A checked box is not evidence. Every row needs
   the referee's own words. An empty "Evidence" cell fails the row.
2. **Manuscript only.** No repository, no code, no AI explanation of the paper.
   If the answer required any of those, the row fails — that is
   `No AI-only semantics`.
3. **Report first impression, not final understanding.** Where the paper was
   eventually decipherable but cost a re-read, record it as friction.
4. **Quote the location.** Section, figure, equation number.
5. The agent that writes an exposition repair may not sign it off
   (`PAPER_LIFECYCLE.md` §5).

---

## Report table

| # | Item | Can explain? | Paraphrase / evidence | Defect | Severity |
|---|---|---|---|---|---|
| 1 | Research object — what is actually being studied | | | | |
| 2 | Main question, in one sentence | | | | |
| 3 | Prerequisites — what a reader must already know | | | | |
| 4 | Running example — what it is, where it recurs | | | | |
| 5 | Central project-specific term 1 | | | | |
| 6 | Central project-specific term 2 | | | | |
| 7 | Central project-specific term 3 | | | | |
| 8 | Main figure — what question it answers | | | | |
| 9 | Main theorem, informally | | | | |
| 10 | Proof architecture — the shape, not the steps | | | | |
| 11 | Symbolic proof vs finite validation — where the line falls | | | | |
| 12 | Every large number — what it counts, what it does not | | | | |
| 13 | Strongest non-claim the paper makes | | | | |
| 14 | Significance — why a reader in the field should care | | | | |

Severity: `blocking` · `major` · `minor` · `note`.

A row is **failed** when the referee cannot answer from the manuscript, or
answers in a way the authors recognise as wrong.

---

## Friction log

Anything that cost the reader effort but did not fail a row.

| Location | Friction type | Reader question | Severity | Proposed fix |
|---|---|---|---|---|

Types: undefined term · notation overload · forward meaning · hidden
prerequisite · implicit warrant · visual mismatch · split attention ·
unexplained abstraction · unexplained number · scope ambiguity ·
proof/computation conflation · project-internal jargon.

---

## Verdict

Exactly one:

```
ACCEPT   — every row answerable; friction is cosmetic
MINOR    — all rows answerable; named local repairs
MAJOR    — one or more rows failed; structural exposition repair needed
REJECT   — the conceptual route from concrete object to main theorem is absent
```

`MAJOR` and `REJECT` return the paper to Stage 6H. They do not return it to
Stage 2 unless the referee found a *mathematical* problem, which belongs to the
proof referee instead.

---

## Closing note for the referee

The question is not "is this paper good?" It is:

> Could a mathematician who was not present during the discovery see what object
> was studied, why the definitions exist, and how the proof reaches the theorem —
> from this document alone?
