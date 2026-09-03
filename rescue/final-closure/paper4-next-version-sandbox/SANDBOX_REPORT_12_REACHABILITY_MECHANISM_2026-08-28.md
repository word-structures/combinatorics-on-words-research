# Sandbox Report 12 — reachability mechanism

**Date:** 2026-08-28 (completed 2026-08-29 local)
**Status:** sandbox only. No canonical edit. No Git mutation. No promotion.
**Selection rule:** `PHASE4_SELECTION_RULE_2026-08-28.md`,
sha256 `c3a570a1c26ac24fd495b9961a4d4d4215e62cded97fab64aabf32a081db5518`,
**hashed before the RX AF pass completed and before any RX downstream verdict existed.**
The deprecated per-signature greedy UNSAT-core extraction was **not** resumed.

---

## 1. Case selection — branch R2

Branch **R1** (an RX `AF_AND_AFE_EXISTS` case) is **ABSENT**: Report 11 found
none. The rule's fallback therefore applied: instrument **every** RX AF-positive
pair and take the greatest extinction depth, ties by `(eIndex, rank)`.

All **137** RX pairs were instrumented (`runs/rx_reach_scan.json`); 0 capped,
0 satisfiable. Selected cases:

| label | population | E | rank | note |
|---|---|---:|---:|---|
| `RX_DEEPEST` | RX | 48 | 1 | death depth **37**, the deepest of 137 |
| `H_POSITIVE` | H | 0 | 2063 | `AF_AND_AFE` true, smallest `(eIndex, rank)` |
| `H_NEGATIVE` | H | 0 | 44 | AF-positive, `AF_AND_AFE` false, smallest `(eIndex, rank)` |

## 2. Instrumented traces

| | `RX_DEEPEST` | `H_POSITIVE` | `H_NEGATIVE` |
|---|---|---|---|
| verdict | UNSAT | **SAT** | UNSAT |
| death depth | **37** | — | 32 |
| nodes | 10,720 | 2,868 | 7,622 |
| extinction nodes | 2,960 | 736 | 2,084 |
| killer arity 1 / 2 / 3 | 1,193 / 2,686 / 12,878 | 1,045 / 397 / 3,502 | 2,984 / 1,612 / 9,830 |
| ternary share | 76.8 % | 70.9 % | 68.2 % |
| FAF-only / AFE-only / **bothSameValue** | 690 / 310 / **15,757** | 510 / 34 / **4,400** | 2,897 / 247 / **11,282** |
| bothSameValue share | **94.0 %** | 89.0 % | 78.2 % |

### 2.1 Prefix state immediately before final extinction

This is the measurement the research question turns on. F's profile is
`(a,b,c) = (19,11,10)`.

| case | depth | prefix Parikh | **remaining profile** | killer |
|---|---:|---|---|---|
| `RX_DEEPEST` | 37 | `[19, 8, 10]` | **`[0, 3, 0]`** | `1*x36 + -2*x38` = `(-19,-11,-10)`, in FAF **and** AFE |
| `H_POSITIVE` | 33 | `[15, 8, 10]` | `[4, 3, 0]` | 2 ternary kills, both value `(0,0,0)` |
| `H_NEGATIVE` | 32 | `[16, 6, 10]` | `[3, 5, 0]` | unary `1*x33` (FAF only, 17 targets) + ternary `(0,0,0)` |

`RX_DEEPEST`'s final state is a **forced corridor**: both the `a` budget (19/19)
and the `c` budget (10/10) are exhausted at depth 37, so the *only* legal
continuation is `b`, and that single continuation is forbidden by a binary
signature whose target lies in both families. The search does not die from a
wealth of constraints — it dies because the letter budget was consumed in an
order that left no alternative.

That is a genuine **ordering/reachability** signature, and it is qualitatively
different from the two H cases, whose deepest extinction nodes still have two
letters available.

## 3. But it does not separate the populations

The same instrumented scan was run over the quota-matched H AF-positive pairs
(263 cases) as a descriptive control (`runs/h_reach_scan.json`).

| extinction depth | 29 | 31 | 32 | 33 | 34 | 35 | 36 | 37 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **RX** (137, all UNSAT) | – | – | 10 | 34 | 33 | 34 | 22 | **4** |
| **H** (219 UNSAT of 263) | 3 | 2 | 13 | 126 | 24 | 24 | 17 | **10** |

**The ranges overlap almost completely**, and H actually reaches the maximum
depth 37 more often (10 cases) than RX does (4). Neither the maximum depth nor
the support of the distribution separates the populations. H's mass concentrates
at depth 33 (57.5 % of its failures) while RX's spreads over 33–35; that is a
shape difference with fully overlapping support, and **no threshold is fitted to
it**.

The only clean separation remains binary and is the Report-11 result: among
AF-positive pairs, **44 of 263 H cases are satisfiable and 0 of 137 RX cases
are**.

## 4. Cross-check

The bucket-gate DFS used here and the independent `stageDFS` of Reports 7–11
agree on **263 / 263** quota-matched H pairs (`sat` ⇔ `AF_AND_AFE_EXISTS`).
Two independently written solvers, identical verdicts.

## 5. Answer to the research question

> Does selectivity live in a dynamic reachability / ordering property of prefix
> states rather than static support or target counts?

**Not on this evidence — reachability is not a sharper discriminator.**

- **Static support** was already eliminated (Report 8; population-scale in
  Report 10: `S1 ≡ 1560`, `S2 ≡ 1160` on all 437 pairs).
- **Static target-collision counts** were eliminated by the preregistered
  Report-10 census (overlapping ranges).
- **Dynamic extinction depth** is now eliminated on the same standard: the RX
  and H distributions overlap across 32–37, and H reaches the deepest values
  more often.

What the traces *do* show is a **mechanism**, not a discriminator: failure
occurs when the prefix path exhausts its letter budget into a forced corridor
and the single remaining continuation is forbidden by a target lying in **both**
families simultaneously (78–94 % of all rejections across the three cases).
That describes *how* a given `(E,A)` dies. It does not explain *why* H admits 44
survivors and RX admits none.

**Status of the forced-corridor observation: UNTESTED.** It rests on three
instrumented cases, exactly as the selection rule anticipated. It is
hypothesis-generating only and must be preregistered separately before any
population-scale test.

## 6. Strict summary (G–H; A–F in Report 11)

**G. Does dynamic reachability show a sharper discriminator than static geometry?**
**No.** Extinction-depth distributions overlap almost entirely (RX 32–37; H
29–37), and H attains the deepest value more often than RX. This is the fourth
candidate mechanism eliminated on a preregistered or equally strict standard,
after support topology, long-band projection, the midpoint family, and static
target-collision counts. The single surviving separation is the binary one:
44/263 satisfiable in H, 0/137 in RX.

**H. What should and should not be promoted later?**

*Candidates, none promoted now:*

1. **The exposure-matched separation itself** — at capped quota 5000, H yields
   86 AFE-existent of 263 AF-positive across 9 E, RX yields **0 of 137 across
   17 E**; 0 unresolved on both sides. This is the strongest form the
   phenomenon has taken. Blocker: it is a finite-population count over two
   non-exchangeable E-pools, not an estimate of anything.
2. **The E-level obstruction** — 24 of 60 random E admit **no** compatible A word
   at all, while all 9 canonical E do. Outcome-independent, exactly measured.
   Blocker: needs its own preregistered characterisation before being called a
   property of canonical E.
3. **Relocating the phenomenon to the `AFE_EXISTS` stage**, with AF∩AFE
   downstream. Blocker: none computational; it is a re-description of frozen
   counts and should be adopted in wording immediately, but it is still not a
   theorem.
4. **The two-solver agreement (263/263)** as a validation record.

*Must NOT be promoted:*

- Any statement that R "cannot" produce an AFE-existent pair. 137 exhaustive
  failures over 17 E are evidence, not a proof, and the standing prohibition on
  reading finite negative results as impossibility applies in full.
- The forced-corridor mechanism as a discriminator — it is **UNTESTED** (n = 3).
- The depth-shape difference at 33 — overlapping support, no threshold fitted.
- Anything about Mäkelä, about `L = 40` impossibility, or about novelty.
  `NOVELTY_UNRESOLVED`. Mäkelä **OPEN**.
- The phrase "60 random E tested" for the Report-7 result, in any context.

## 7. Artifacts

| file | role |
|---|---|
| `PHASE4_SELECTION_RULE_2026-08-28.md` + `runs/PHASE4_SELECTION_RULE.sha256` | hashed before results |
| `work/reach_mechanism.js` | instrumented DFS, `--scan` and `--cases` |
| `runs/rx_reach_scan.json` | all 137 RX pairs instrumented |
| `runs/phase4_selected.json` | the three selected cases |
| `runs/reach_mechanism_traces.json` | full traces incl. prefix state before final extinction |
| `work/h_reach_scan.js`, `runs/h_reach_scan.json` | H descriptive control (263 pairs) |
