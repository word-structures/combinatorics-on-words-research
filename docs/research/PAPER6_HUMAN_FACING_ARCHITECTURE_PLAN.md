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

**Do not open with** the four-number semantic chain (raw histories -> transition states -> count states -> future-space dimension).

**Open with a question a mathematician can hold in their head:**

> If two different block histories allow exactly the same continuations right
> now, can they still have different numbers of legal continuations later?

The manuscript should answer this question using a concrete certified witness.
A candidate witness exists in the research checkpoint, but it may enter the
canonical manuscript only after promotion to MATH_CLAIMS.md.

---

## 3. Running witnesses

**Claim-ledger status.** `MATH_CLAIMS.md` currently holds **no row** for any
Paper 6 object. Under `AGENTS.md` rule 7 the ledger has exclusive rights over
mathematical and empirical findings, so this plan states the *role* each witness
plays in the exposition and **does not restate its exact values as canonical
findings**. The exact material stays in the untracked checkpoint and audit
directories named below.

> Each witness below is a **candidate certified witness — claim-ledger promotion
> pending**. Before any of it enters a manuscript, the underlying result must
> first receive a `MATH_CLAIMS.md` row, and the manuscript must cite that row.

Witness categories follow
`HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md` §5. They are not
interchangeable, and category 3 is never called checkable by hand.

### W1 SLOT — same-present/different-future witness

*Status:* UNPROMOTED — DO NOT CITE AS FINDING
*Candidate artifact:* `P6_Q2_PERSISTENT_FRINGE_INJECTION_CERT_v0.1_2026-08-30.json`
(checkpoint v2.3, untracked)

Required exposition role: show two literal histories, their current legal
responses, and a later divergence.
Candidate research artifact exists; exact properties remain claim-ledger
promotion pending.

- **Category 1** for the two literal histories.
- **Category 3** for their later divergence.

This is Figure 3, and it is intended to prove that current response is inadequate.

### W2 — count-equivalent/non-equitable contrast

*Status:* UNPROMOTED — DO NOT CITE AS FINDING
*Candidate artifact:* `P6_Q2_COUNT_VS_EQUITABLE_COUNTEREXAMPLE_CERT_v0.1_2026-08-30.json`
(checkpoint v2.3, untracked)

Required exposition role: demonstrate why transition equivalence and future count equivalence differ.
Candidate research artifact exists; all-horizon equivalence remains claim-ledger promotion pending.

- **Category 1** for the two literal histories.
- **Category 3, unavoidably**, for the equivalence: all-horizon agreement would require exact computation over a finite range plus a Cayley-Hamilton forcing argument. **This is not a paper-and-pencil verification** and must never be presented as one.

This is Figure 4, and it is intended to show why the transition-state count and the count-state count are different numbers.

### W3 — the toy linear dependence

Three states with future-count functions `f1`, `f2`, `f3 = f1 + f2`. Three
distinct states; a two-dimensional span.

- **Category 2 — genuine paper-and-pencil verifiable witness.** Half a page, no
  certificate, no project data. The reader checks it completely.

This is Figure 6 and it must appear **before** any Krylov space. It is the whole
intuition for why the number of count states and the dimension of the future
space differ — carried entirely by a witness the reader can verify unaided.
W3 is the reason the result becomes intelligible; W1 and W2 are the reason it is
true.

---

## 4. Figure plan

Specifications, not drawings. Each states the question it answers.

| # | Question it answers | Content |
|---|---|---|
| F1 | What is a state? | A literal block history with the retained suffix marked; show that the memory is a sliding window of `2K−1` characters, not a whole word |
| F2 | What can happen next? | The legal next-block fan-out from one state |
| F3 | **Can present agreement hide future divergence?** | W1: identical legal sets, diverging counts |
| F4 | What is the difference between the two equivalences? | W2: same counts at every horizon, different transition structure |
| F5 | What are the four numbers? | the semantic chain, **with a noun on every node and an operation on every arrow**; the literal values are supplied from the promoted ledger row, not from this plan |
| F6 | Why is the count-state total larger than the future dimension? | W3: `f3 = f1 + f2` |
| F7 | What is a signed response defect? | The successor-difference diagram (below), then the algebra |
| F8 | Why can't refinement fix this? | A true count-equivalent pair already separated by the structural partition; refinement cannot recreate a lost merge |
| F9 | How does the future space split? | transient zero-root sector against persistent sector |
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

**F5 caption must carry the non-interpretation**: the rank says that all
statewise future-count sequences lie in a rational space of that dimension; it
does *not* say that the number of count-equivalence classes equals it. Those are
different numbers, and the caption must say so.

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

The final manuscript should use only those no-go rungs that have been promoted
to MATH_CLAIMS.md before drafting.

candidate simpler representation
  |
  | if registered no-go result establishes insufficiency
  v
next representation
  ...

For example:
current response alone
  -> finite response trees
    -> bisimulation
      -> static obstruction signatures
        -> partition refinement
          -> signed linear semantics

Include only the rungs that logically force the next concept. This is the
project's falsification culture used as exposition, which is what
`NEGATIVE_RESULTS.md` is for.

## 8. Governance Fence

Architecture must not be built around any descriptor-specific claim until that
claim is promoted to MATH_CLAIMS.md. Research-checkpoint candidates remain
outside the canonical exposition plan.

## 9. Stage 6H checklist for Paper 6

| Stage 6H condition | Paper 6 status |
|---|---|
| reader declared | pending draft |
| motivation precedes formalism | planned, §5 order |
| running example | candidate — W1, extended by W2; ledger promotion pending |
| representational bridge | planned, F1–F10 |
| human-scale witness, status stated | candidate — W3 is category 2 (paper-and-pencil verifiable); W1 and W2 are category 1 for the objects and **category 3 for their claims** |
| boundary / non-example | candidate — W2 is the non-example for "same counts implies same structure"; ledger promotion pending |
| numbers have nouns | required in F5 caption |
| outsider route, no AI-only semantics | to be tested by the Stage 7 reader referee |

Six of eight conditions already have candidate material; the remaining two are
drafting work. **None of the six closes until the underlying results receive
`MATH_CLAIMS.md` rows** — Stage 6H cannot close ahead of Gate 1, and this plan
does not attempt to.
