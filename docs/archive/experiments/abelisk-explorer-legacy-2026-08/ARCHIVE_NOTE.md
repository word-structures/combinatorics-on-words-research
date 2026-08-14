# Legacy Explorer Abelisk
Historical Engineering Snapshot — Lineage 1

Snapshot date:
2026-08-14

Source file:
explorer.html

Source commit SHA:
b9b38842c0b2923497dfe2eb587111806f99a6cc (origin/main, merge of PR #38)

Extracted line ranges at that commit:
- CSS: explorer.html lines 331-643 (`/* 13. ABELISK STYLES */` block)
- HTML: explorer.html lines 1267-1327 (`<!-- 13. ABELIAN SNAKE -->`, `#view-snake`)
- JS: explorer.html lines 4871-5393 (`// 13. ABELISK PUZZLE (Replaces Abelian Snake)`
  through `abeliskInit();`)

Files in this directory are verbatim extracts of those three ranges, saved
as `.txt` so this directory is not itself a runnable public web surface.

## Relationship to the other Abelisk archive

`docs/archive/experiments/abelisk-hidden-echoes-prototype-2026-08/` is a
**different lineage** (lineage 2): an untracked prototype snapshotted before
the current standalone `abelisk.html` MVP was built from it. This directory
(lineage 1) is the **pre-MVP puzzle that shipped inside `explorer.html`**,
reachable in production as nav item "13. Abelisk Puzzle" / `#view-snake`,
architecturally and historically unrelated to lineage 2. The two must not be
merged or treated as versions of the same thing.

## Original purpose

A four-letter (`a,b,c,d`), full abelian-square-free (K >= 1) fill-in puzzle
embedded as one of ~20 modes in the Explorer research tool, with four
sub-modes: Classic (colour-fill), Research/Additive (alphabet {0,1,2,6}),
Cipher (decrypt a hidden phrase), and Fractal (decrypt the g85 morphism word).

## Why the public implementation was retired

Retired as part of the V1 public-site release audit (2026-08-14), as a
release BLOCKER, not a design change. It was removed from public production
because it publicly shipped:

- self-certifying verdict language ("PERFECT EQUILIBRIUM... The math holds
  strong.") of the kind `AGENTS.md`'s claims protocol and
  `scripts/check-claims-drift.js` exist to forbid;
- "nobody in the world yet knows... break the record!" framing around the
  additive mode, stronger than anything `MATH_CLAIMS.md` supports;
- an unsupported characterisation of g85 as "the fundamental 85-cell
  building block of the Abelian universe";
- a misattributed quotation ("MATHEMATICS IS THE ALPHABET WITH WHICH GOD HAS
  WRITTEN THE UNIVERSE - GALILEO GALILEI") used as a cipher solution;
- twelve unattributed third-party cipher-mode quotations of uncertain rights
  status;
- a four-letter K>=1 rule that directly contradicts the shipped ternary K>=2
  Abelisk product described on `abelisk.html`, `index.html` and
  `research.html`.

None of this reflects a judgement that the underlying puzzle-generation
engineering was bad — see "Reusable engineering ideas" below.

## What this is, and is not

- This is historical engineering material, not production code. Nothing in
  this directory is served by, linked from, or executed by the public site.
- Mathematical and public wording captured here is **not canonical**. It is
  frozen exactly as it shipped, including the defects listed above.
- The third-party quotations (`CIPHER_PHRASES`) and the Galileo attribution
  problem (`FRACTAL_PHRASE`) are preserved strictly as historical artifacts
  of what was once public. **They must not be republished, reused, or
  copied into any current or future public surface**, regardless of source
  attribution added later.
- The G85/Fractal framing and the additive-mode "record" framing must be
  independently rechecked against `MATH_CLAIMS.md` before any reuse of the
  underlying ideas — nothing in this snapshot should be treated as already
  meeting the project's claim-verification standard, precisely because it
  did not when it was live.
- `MATH_CLAIMS.md` was not touched to create this archive.

## Reusable engineering ideas

Independent of the retired public wording, the snapshot contains puzzle-
construction machinery that may be worth revisiting on its own terms in a
future, separately-scoped and separately-approved task:

- **Uniqueness-verified generation** — `generateValidSequence`,
  `isBoardValid`, `countSolutions`, `generatePuzzle`: masks cells out of a
  valid sequence while using `countSolutions` to confirm the resulting
  puzzle has exactly one solution before offering it to a player.
- **Deduction-depth difficulty rating** — `logicalDeduce`, `rateDifficulty`:
  rates a generated puzzle by how many cells can be filled by pure logical
  deduction (as opposed to search/guessing), a legitimate technique for
  puzzle difficulty independent of the specific game it was applied to here.
- **Incremental reveal / notes machinery** — the pencil-mark (`notes`) state
  per cell and the cipher `generateCipher`/reveal mechanism for progressively
  uncovering a hidden phrase as the grid is solved.

Any reuse requires its own scoped task, its own review against current
`AGENTS.md` claim-discipline rules, and must not reintroduce the retired
public wording, the unattributed quotations, or the K>=1/four-letter
convention into the current K>=2/ternary Abelisk product without a separate,
explicit owner decision.
