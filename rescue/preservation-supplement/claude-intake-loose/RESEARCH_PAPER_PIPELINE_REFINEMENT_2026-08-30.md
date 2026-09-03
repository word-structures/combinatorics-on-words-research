# Research paper pipeline — refinement of the 2026-08-29 proposal

**Status:** proposal for owner review. Nothing here has been applied.
**Input:** `RESEARCH_PAPER_PIPELINE_PROPOSAL_2026-08-29.md` (489 lines)
**Reviewed against:** `AGENTS.md`, `EPISTEMIC_DISCIPLINE.md`, `MATH_CLAIMS.md`,
`NEGATIVE_RESULTS.md`, `LITERATURE_COVERAGE.md`, `CURRENT_FOCUS.md`, `CLAUDE.md`
**Evidence base:** the Paper 4 v1.0 → v1.1 submission audit (2026-08-29/30) and
the profile-guided-synthesis evaluation (2026-08-29)

---

## 1. The finding that changes the recommendation

The proposal is good, and most of it already exists in this repository under
different names.

| Proposal artifact | Already exists as | Overlap |
|:--|:--|:--|
| `CLAIM_LEDGER.csv` | `MATH_CLAIMS.md` (224 rows, Level 1 / 1P / 2 statuses) | near-total |
| `NOVELTY_LEDGER.csv` | `LITERATURE_COVERAGE.md` (235 lines) | near-total |
| `PAPER_STATUS.md` | `CURRENT_FOCUS.md` + `KNOWLEDGE_STATE.md` | high |
| `DECISION_LOG.md` | `NEGATIVE_RESULTS.md` + `CLAUDE.md` write-through check | high |
| Stage 3 Independent Kill | `EPISTEMIC_DISCIPLINE.md` §5 | proposal is **weaker** |
| Stage 5 Reproducibility | `AGENTS.md` 9, 17 + `EPISTEMIC` §8 | high |
| `research/papers/paperN/00-…90-` | `AGENTS.md` placement taxonomy | **conflicts** |

Two of these deserve emphasis.

**`EPISTEMIC_DISCIPLINE.md` §5 is stronger than the proposal's Stage 3.** The
proposal says "a different agent must try to break the theorem." §5 says
independence is not a property but a *list* — derivation, algorithm, data
representation, input generation, language, runtime, author — and that you must
name which axes actually differ, because "two checks that share a conceptual
error are not independent merely because they live in separate files." That
lesson was paid for once already (`NEGATIVE_RESULTS.md` §10). Replacing it with
"a different agent" would be a regression.

**Adopting the proposal as written would fork the epistemic system into two
parallel ledgers.** This project's documented failure mode is precisely
divergence between documents that record the same fact — `EPISTEMIC_DISCIPLINE`
§1 lists "if two documents disagree on a citation for the same fact, is that
flagged and resolved" as a mandatory pre-`LEVEL_2` check. A second claim ledger
would guarantee that condition rather than test for it.

**Recommendation: do not adopt it as a new parallel system.** Extract the layer
that is genuinely absent, land it as a small addition, and map the rest onto the
files that already exist.

---

## 2. What is genuinely new in the proposal

Four things, none of which the current setup has:

1. **A paper-level lifecycle.** The existing system is *claim*-centric: the unit
   of governance is a `MATH_CLAIMS.md` row. Nothing governs a paper as an object
   moving toward release.
2. **Back-routing.** "A later stage may not silently repair an earlier stage."
   This is the single best idea in the document. It is what stops prose being
   patched around a mathematical hole.
3. **One active blocker** (Rule A) and **stop adding mathematics once gates
   close** (Rule F). Both are real disciplines this project visibly lacks — the
   Paper 4 sessions repeatedly opened new mechanisms while gates were open.
4. **Infrastructure demotion** (Rule E): if prior art shows a component is
   classical, demote it to a cited lemma rather than defending it for sunk-cost
   reasons.

Keep all four.

---

## 3. What is missing — and what it cost

The pipeline stops at Stage 8 (Owner Promotion). It has **no stage that owns the
artifact a reader actually receives.** Stage 6 owns the story; Stage 7 owns the
content. Nothing owns the PDF.

Every single defect in the Paper 4 v1.1 audit lived in that gap:

| Finding | Which stage would have caught it? |
|:--|:--|
| Title page missing the project identity | none |
| Nineteen-family table orphaning one row across a page break | none |
| No maintained `.tex`; build was a discarded pandoc intermediate | none |
| Five false defects raised from `pdftotext` output | none |
| Stated manuscript v1.4 hash not locatable | Stage 5 requires hashes but defines no failure semantics |

The mathematics was closed and correct throughout. The title page was still
wrong. **A claim lifecycle cannot catch an artifact defect**, because the defect
is not in any claim.

### The five false defects are the important part

Working from `pdftotext -layout` output I reported, with apparent evidence:
Figure 1 missing `κ`, `≥` and minus signs; Figure 3 labels overprinted onto one
baseline; the nineteen-family table column-shifted; the population tables
row-shifted; reference diacritics broken. **All five were false.** All five were
disproved by rendering one page each.

The cause is structural, not careless: a text extractor reconstructs reading
order from glyph coordinates, so it *manufactures* exactly the artifacts —
column drift, baseline collision, dropped glyphs without `ToUnicode` maps —
that look like layout defects. The tool's failure modes are isomorphic to the
defects being hunted.

That generalises well beyond PDFs, and it is the rule most worth adding.

---

## 4. Refined design

### 4.1 Two lifecycles, not one

> The existing system governs **claims**. The missing layer governs **artifacts**.
> A paper is the join, and the join is where this project has been losing time.

```
CLAIM lifecycle   (exists)   conjecture → derived → proved → independently
                             audited → novelty-assessed        [MATH_CLAIMS.md]

ARTIFACT lifecycle (absent)  source → reproducible build → rendered artifact →
                             observed → released              [proposed]
```

### 4.2 Stage 9 — Artifact Closure

Insert between Stage 7 (Hostile Referee) and Stage 8 (Owner Promotion). It owns
the object, never the mathematics; if it finds a mathematical problem it
back-routes to Stage 2 or 3 rather than fixing anything.

**Entry:** manuscript content frozen by Stage 7.

**Gate conditions:**

1. **Baseline rebuild passes.** The *unchanged* source rebuilds with the current
   toolchain and reproduces the released artifact (page count and normalised
   text). Only then is any edit made. Without this control every later
   difference is ambiguous between the edit and the toolchain.
2. **Every audited page has been observed as a rendered image** — minimum: title
   page, each figure page, each table, first and last page.
3. **Repairs re-observed** against the pre-repair artifact; a repair that
   introduces a new visible problem is reverted, and the rejected attempt is
   recorded.
4. **Build is reproducible from the source of record**: exact command, exact
   toolchain versions, forward-computed hashes for source, every included asset,
   and output.
5. **Changelog classifies every difference** as METADATA / TYPOGRAPHY /
   REFERENCE / CLARIFICATION / MATHEMATICAL. Any MATHEMATICAL entry back-routes
   to Stage 2 and the artifact is not released.

**Artifact:** one submission-audit report carrying the defect ledger of §4.4.

### 4.3 Fewer files, not more

The proposal creates roughly twelve tracked files per paper. That is the main
practical risk: process that gets abandoned under deadline. The v1.1 audit
needed **three** deliverables — the artifact, a hash manifest, and one report.

**Refinement: one `PAPER_STATUS.md` per paper**, holding the stage table
inline, plus the existing global ledgers. Everything else is generated on
demand and stays in `scratch/`.

A gate is never skipped. It is closed either as passed or as
`NOT APPLICABLE — because …`. That keeps the trail without the ceremony.

### 4.4 The defect ledger — with a DISPROVED class

`MATH_CLAIMS.md` has `REFUTED` for claims. Nothing records **a suspected defect
that was investigated and found not to exist.** So the next session re-derives
it at full cost — which is exactly what would have happened to all five
`pdftotext` artifacts above.

Five classes, as used in the v1.1 audit:

| class | meaning |
|:--|:--|
| `CONFIRMED` | observed in the artifact; must be fixed or explicitly accepted |
| `DISPROVED` | suspected, investigated, shown not to exist — **with the disproof** |
| `OUT_OF_SCOPE` | real, but not part of this artifact |
| `ACCEPTED_RESIDUAL` | real, observed, deliberately not fixed, with the reason |
| `UNRESOLVED` | open; must state whether it blocks release |

**Rule: a `DISPROVED` item may not be re-raised without new evidence of a
different kind than the evidence that disproved it.**

### 4.5 Sharpening back-routing (refines the proposal's Rule B)

Rule B says "editorial changes do not trigger a new mathematical audit." True,
and incomplete. In v1.1, three purely editorial edits shifted the pagination of
every page in the document. Editorial changes do not invalidate the *claim*
gates; they fully invalidate the *artifact* gate.

Make invalidation explicit per gate:

| change | invalidates | leaves valid |
|:--|:--|:--|
| theorem statement / definitions | Stages 2–9 | Stage 0–1 |
| computational semantics | Stages 3, 5, 9 | Stages 2, 4 |
| new primary prior art | Stage 4 | Stages 2, 3, 5 |
| editorial / typographic | **Stage 9 only** | Stages 2–7 |
| toolchain or asset change | **Stage 9 only** | Stages 2–7 |

### 4.6 Roles, not vendors

The proposal assigns ChatGPT = orchestrator, Claude = closure, Antigravity =
adversary. Model line-ups change; the invariant does not. Define the roles and
one constraint, and let the owner map roles to whatever is available:

> **The agent that authored a theorem's proof, or a repair, may not be the agent
> that signs off on it.**

Stated honestly: in the v1.1 build I was both author and auditor of my own
repairs, and it shows — the first two repair attempts each removed a one-row
table orphan by introducing a 45–70% blank page. Only re-observation caught it.
The constraint is not bureaucratic.

Independence is then reported using `EPISTEMIC_DISCIPLINE.md` §5's axes, not as
a binary.

### 4.7 Stage 0 — cheapest decisive measurement first

Add one exit condition: **name the cheapest measurement that could kill the
direction, and run it before investing in the direction.**

Evidence: in the profile-guided-synthesis evaluation the decisive result was
negative and cheap — measuring `D_r`, the number of distinct active cutpoint
depths, gave `D_r = L−1` at every `L` from 5 to 40 and refuted the compression
claim outright. It also independently reproduced a Paper 4 §9.2 finding from a
different direction. That single measurement was worth more than the four
theorem drafts around it.

### 4.8 Negative results have a home

The proposal has no destination for a direction that dies well. This repository
already has one: `NEGATIVE_RESULTS.md` (495 lines). Wire it in explicitly — a
Stage 0 or Stage 3 kill writes there, with its scope parameters stated per
`EPISTEMIC_DISCIPLINE.md` §2.

---

## 5. Proposed concrete edits

### 5.1 `AGENTS.md` — new section "Artifact and release protocol"

House style: numbered, imperative, each rule carrying the failure that earned it.

> **A1. OBSERVE THE ARTIFACT, NOT A PROXY.** A claim about what a delivered
> artifact looks like must be evidenced by the artifact in the form the reader
> receives it — a rendered page, not a text extraction; the built binary, not
> the source. Extraction tools locate; they do not evidence. This rule exists
> because of a concrete failure: the Paper 4 v1.1 audit raised five defects
> from `pdftotext -layout` output — missing `κ`/`≥`/minus glyphs in Figure 1,
> overprinted labels in Figure 3, and three misaligned tables — and all five
> were false, each disproved by rendering a single page. A text extractor
> reconstructs reading order from glyph coordinates, so its failure modes are
> isomorphic to the layout defects being hunted.
>
> **A2. BASELINE REBUILD BEFORE ANY EDIT.** Before changing a source that
> produces a released artifact, rebuild the unchanged source with the current
> toolchain and show it reproduces the released artifact. Without this control,
> every later difference is ambiguous between the edit and the toolchain. In the
> v1.1 build the control passed — 25 pages, text identical after whitespace
> normalisation — and is the only reason a three-line changelog can be trusted.
>
> **A3. A REPAIR THAT WORSENS THE ARTIFACT IS REVERTED, NOT KEPT.** Every repair
> is re-observed against the pre-repair artifact, and the rejected attempts are
> recorded. Two of three v1.1 repair attempts removed a one-row table orphan by
> introducing a 45–70% blank page; the accepted repair — declaring table column
> widths — removed the orphan with no blank and no content change.
>
> **A4. A DISPROVED SUSPICION IS RECORDED, NOT DISCARDED.** When a suspected
> defect is investigated and shown not to exist, write it down together with its
> disproof. It may not be re-raised without new evidence of a different kind.
> Otherwise the next session pays full price to re-derive the same false defect.
>
> **A5. UNVERIFIABLE HISTORICAL PROVENANCE NEVER EDITS CONTENT.** If a stated
> historical hash cannot be located, that is a record-keeping gap: it does not
> license rewriting scientific text and does not block release. Anchor
> provenance forward — hashes computed now from the files used now. Motivating
> case: the stated consolidated-manuscript v1.4 hash was not found; the
> manuscript asserts no hash, so nothing required correction.
>
> **A6. A NUMBER THAT GATES A DECISION MUST HAVE AN EXACT ROUTE.** No
> floating-point result may change a claim's status — least of all to a negative
> — without confirmation by an exact or symbolic computation. Motivating
> near-miss: a QR iteration reported the `h₆` subdominant eigenvalue as `0`,
> which would have killed a research line; the exact characteristic polynomial
> `x³(x−3)(x²−3)` gives `√3`, corroborated by `trace = 3` and `rank = 4`.

### 5.2 `EPISTEMIC_DISCIPLINE.md` — new §13, "The artifact boundary"

Extends §10 (verification boundary vs claim boundary) by one axis: **what the
source says and what the reader receives are two different boundaries.** The
mathematics can be perfect while the title page is wrong, and no claim-level
check will ever see it. Add the §10-style recurring-gap row:

| Verified | Often written as |
|:--|:--|
| the source is correct | the delivered artifact is correct |

### 5.3 New file — `docs/research/PAPER_LIFECYCLE.md`

Stages 0–9, the invalidation table (§4.5), the role constraint (§4.6), the
defect classes (§4.4), and an explicit mapping of each stage onto the existing
canonical file that already owns its evidence. **Not** a new ledger.

### 5.4 Per paper — one `PAPER_STATUS.md`

Replaces the proposal's twelve files. Stage table inline; everything else
generated on demand into `scratch/`.

---

## 6. What to drop from the proposal

| Item | Reason |
|:--|:--|
| `CLAIM_LEDGER.csv` | duplicates `MATH_CLAIMS.md`; a second claim ledger guarantees the divergence `EPISTEMIC` §1 exists to prevent |
| `NOVELTY_LEDGER.csv` | duplicates `LITERATURE_COVERAGE.md` |
| `research/papers/paperN/00-…90-` tree | conflicts with the `AGENTS.md` placement taxonomy |
| Stage 3 as "a different agent" | weaker than `EPISTEMIC` §5; cite §5 instead |
| Vendor-named agent roles | replace with roles + the independence constraint |

---

## 7. Honest assessment

The proposal's diagnosis is right and its stage decomposition is sound. Its two
weaknesses are that it was written without reading the repository it governs —
so it rebuilds two-thirds of an existing, harder-won system — and that it stops
one stage short of where this project actually loses time.

The refinement is therefore small: **keep the lifecycle and the back-routing,
map the ledgers onto the files that already exist, add Stage 9, and add six
rules that this session paid for.**

Adopting §5.1 alone would have prevented every wasted hour of the v1.1 audit.

---

## 8. File classification (per `CLAUDE.md`)

This document: **SCRATCH** — untracked proposal in `scratch/claude-intake/`,
alongside the proposal it reviews. Promotion of §5.1–§5.4 into canonical files
is an **OWNER DECISION** and has not been made. No canonical file has been
modified and Git has not been touched.
