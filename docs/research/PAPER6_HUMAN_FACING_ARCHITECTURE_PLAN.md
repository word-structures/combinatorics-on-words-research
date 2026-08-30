# PAPER6_HUMAN_FACING_ARCHITECTURE_PLAN.md

**Status:** exposition plan for a paper that is not yet written. It fixes no
mathematics, promotes no claim, and asserts no novelty.
**Governs:** how Paper 6 introduces its objects, in what order, and with which
concrete witnesses.
**Protocol:** `docs/research/HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md`
**Gate:** `docs/research/PAPER_LIFECYCLE.md` Stage 6H.

> **Open owner decision — canonical location.** No canonical Paper 6 directory
> exists. `papers/paper6/`, matching `papers/paper4/`, is the obvious
> destination, but this document does not create it. This plan lives in
> `docs/research/` until the owner approves a canonical path.

---

## 1. Why Paper 6 needs this more than Paper 4 did

Paper 4 asked the reader to absorb five project-specific nouns quickly. Paper 6
is worse: its current vocabulary includes future-count semantics, equitable
states, all-horizon count equivalence, signed response cocycles, Krylov spaces,
transient/persistent decomposition, latent carriers, persistent injection and
signed structural observables — and its headline is a chain of four large
numbers.

Written in discovery order, Paper 6 loses the reader on page one while being
entirely correct.

---

## 2. The opening

**Do not open with** `218298 → 2691 → 2689 → 1179`.

**Open with a question a mathematician can hold in their head:**

> If two different block histories allow exactly the same continuations right
> now, can they still have different numbers of legal continuations later?

The answer is yes, the project has an exact witness for it, and that witness is
the whole paper in miniature. Every abstraction afterwards earns its place by
being needed to answer this question precisely.

---

## 3. Running witnesses

These are real objects from the frozen `v2.3` checkpoint, re-verified during the
2026-08-30 adversarial audit. Provenance must be preserved when they are used.

### W1 — same present, different future

*Source:* `P6_Q2_PERSISTENT_FRINGE_INJECTION_CERT_v0.1_2026-08-30.json`

```
A = aaabaaacaaabbbcabccca      (equitable class 28)
B = aaabaaacaaabbbcbaccca      (equitable class 47)
```

The two histories differ in **one interior character**. Their legal next-block
sets are *exactly equal* — the certificate records
`exact_legal_set_equal: true`, with 55 commonly forbidden blocks and no unique
fringe on either side. Yet their continuation counts diverge:

| horizon | from A | from B |
|---|---:|---:|
| 12 | 6 867 627 | 8 737 466 |
| 13 | 25 468 722 | 32 446 851 |
| 14 | 94 642 975 | 120 488 590 |

This is Figure 3 and it is the paper's motivating fact. It is checkable by hand
at the level that matters: the reader can see the single differing character and
the identical legal sets.

### W2 — count-equivalent but not equitable

*Source:* `P6_Q2_COUNT_VS_EQUITABLE_COUNTEREXAMPLE_CERT_v0.1_2026-08-30.json`

```
A = aaabaaacabcbbbabcccab      (equitable class 224, 54 raw histories)
B = aaabacccbabbbcbaaacb       (equitable class 1021, 102 raw histories)
```

Identical continuation counts at **every** horizon — the prefix
`1, 5, 24, 108, 313, 1337, 4565, 17383, 63060, 237827, 879007, 3281006`
agrees, verified exactly for `n = 0…2690` and then forced for all `n` by
Cayley–Hamilton on the 2691-dimensional quotient. Their outgoing multiplicities
into count classes nevertheless differ, so they are *not* equitable.

This is Figure 4, and it is why `2691` and `2689` are different numbers.

### W3 — the toy linear dependence

Three states with future-count functions `f1`, `f2`, `f3 = f1 + f2`. Three
distinct states; a two-dimensional span. Written on half a page, by hand.

This is Figure 6, and it must appear **before** any Krylov space. It is the
entire intuition for `2689 ≠ 1179`.

---

## 4. Figure plan

Specifications, not drawings. Each states the question it answers.

| # | Question it answers | Content |
|---|---|---|
| F1 | What is a state? | A literal block history with the retained suffix marked; show that the memory is a sliding window of `2K−1` characters, not a whole word |
| F2 | What can happen next? | The legal next-block fan-out from one state |
| F3 | **Can present agreement hide future divergence?** | W1: identical legal sets, diverging counts |
| F4 | What is the difference between the two equivalences? | W2: same counts at every horizon, different transition structure |
| F5 | What are the four numbers? | `218298 → 2691 → 2689 → 1179`, **with a noun on every node and an operation on every arrow** |
| F6 | Why is 2689 not 1179? | W3: `f3 = f1 + f2` |
| F7 | What is a signed response defect? | The successor-difference diagram (below), then the algebra |
| F8 | Why can't refinement fix this? | A true count-equivalent pair already separated by the structural partition; refinement cannot recreate a lost merge |
| F9 | What is `1179 = 12 + 1167`? | Transient zero-root sector against persistent sector |
| F10 | Where is this going? | Structural observables → signed combinations → invariant future space |

**F7 must be drawn before `Δ = (e_s − e_t)Q` is written**, and the equation must
be given its reading in words:

```
state s                              state t
  |                                    |
  +-- block a --> s_a                  +-- block a --> t_a
  +-- block b --> s_b                  +-- block b --> t_b
  +-- block c --> s_c                  +-- block c --> t_c

                    subtract

        (s_a + s_b + s_c) − (t_a + t_b + t_c)
                        |
                        v
                  signed defect Δ
```

> Put one unit of mass at `s`, subtract one unit at `t`, apply one transition
> step. The result records how their successor distributions differ.

**F5 caption must carry the non-interpretation**: rank 1179 means all statewise
future-count sequences lie in a 1179-dimensional rational space; it does *not*
mean there are 1179 count-equivalence classes — there are 2689.

---

## 5. Term introduction order

No term may appear before its predecessors have been used on a concrete object.

```
 1  literal block history
 2  legal continuation
 3  future-count function
 4  current response
 5  equitable state
 6  all-horizon count equivalence
 7  count state
 8  future-count vector
 9  linear span
10  Krylov space
11  signed response defect
12  cocycle
13  transient / persistent decomposition
14  structural observable basis
```

Do not lead with *Krylov*, *cocycle*, or *persistent injection*. Make the reader
feel the problem those words solve first.

**Internal labels that must not reach the manuscript** until they have a
descriptive mathematical referent: `Q2`, `Kmax`, `BAL3`, `HASH30`, `RX`,
`AFE`, `latent carrier`, `fringe injection`.

---

## 6. The central conceptual distinction

```
state merging  ≠  future-dynamics minimization
```

Show it with W3 before the real result. Three states that cannot be merged into
two — their transition behaviour genuinely differs — while their future
dynamics needs only two linear dimensions.

Then the partition no-go (F8), stated in words the reader already owns:

> Refinement cannot recreate a merge that the starting partition has already
> destroyed.

Only after that does signed linear recombination become a natural move rather
than a technical escalation.

---

## 7. The failure ladder

Selected motivation, not chronology. Each rung is a real project result and each
must be shown by its smallest witness:

```
current response alone            fails   (W1)
  -> finite response trees        fail
    -> bisimulation               fails    (W2)
      -> static obstruction signatures fail
        -> partition refinement   fails structurally
          -> signed linear semantics becomes necessary
```

Include only the rungs that logically force the next concept. This is the
project's falsification culture used as exposition, which is what
`NEGATIVE_RESULTS.md` is for.

---

## 8. What this plan deliberately does not headline

The 2026-08-30 adversarial audit of checkpoint v2.3 found that the
"four recency-gauged block profiles + one adjacency bit" result is **exactly
certified but not canonical**: an equally simple descriptor — four length-4
windows anchored at offset 0 of the stored suffix, with no adjacency bit —
attains the same exact rank `1179/1179` and `1167/1167` over five primes. The
audit also confirmed that profile-only incompleteness is *not* established,
because modular rank bounds rational rank only from below.

Therefore Paper 6 must **not** be architected around the one-bit result or
around the `S_2` fragment-activation narrative until:

1. an exact rational upper bound for the profile-only measurement exists
   (one explicit integer kernel witness suffices); and
2. the descriptor-invariance question is settled — which windowings attain full
   rank, and what the successful ones have in common.

The exact semantic hierarchy `218298 → 2691 → 2689 → 1179 = 12 + 1167`, W1 and
W2 are the assets that survived the audit intact. This plan is built on those.

Audit report: `scratch/claude-intake/paper6/_audit_2026-08-30/`
(untracked; promote only if the owner wants it in history).

---

## 9. Stage 6H checklist for Paper 6

| Stage 6H condition | Paper 6 status |
|---|---|
| reader declared | pending draft |
| motivation precedes formalism | planned, §5 order |
| running example | **have it** — W1, extended by W2 |
| representational bridge | planned, F1–F10 |
| paper-and-pencil witness | **have it** — W3 for the rank result; W1/W2 are hand-inspectable |
| boundary / non-example | **have it** — W2 is the non-example for "same counts implies same structure" |
| numbers have nouns | required in F5 caption |
| outsider route, no AI-only semantics | to be tested by the Stage 7 reader referee |

Six of eight are already answerable from existing certified material. The
missing two are drafting work, not research.
