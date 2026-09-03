# Research architecture assessment — profile-guided prefix-Parikh synthesis

Paper 4 is frozen infrastructure and was not edited. This is an evaluation of
the experimental transfer work built on top of it.

---

## 1. The chain, layer by layer

| stage | status | note |
|---|---|---|
| source language → block-profile assignment | **heuristic** | no theorem selects profiles; the design objective of §5 is well posed but unvalidated |
| block-profile assignment → profile feasibility | **exact, weak** | the box bound `R_σ(ρ) ⊆ box(2ρ)` is exact and cheap, but it is a *necessary* condition only |
| profile feasibility → exact window compilation | **exact** | Paper 4's six-domain compiler; frozen and independently audited |
| window compilation → joint prefix-Parikh CSP | **exact** | Theorem A, proved and verified here; genuine multi-role extension of Paper 4 |
| joint CSP → literal block realization | **exact** | Theorem B, constructive |
| literal realization → global certificate | **absent** | the decisive gap; see §4 |

The honest reading: **the middle of the chain is exact mathematics, the two ends
are not.** Profile selection is heuristic at the front; global certification is
missing at the back. What sits between them is solid and now proved.

## 2. What is genuinely new here

**Theorem A is a real extension**, not a restatement. Paper 4 classifies the
support layer with *one* unresolved role. Theorem A allows *all* roles unresolved
simultaneously, with windows coupling two different unknown blocks, and shows
the waypoint CSP is exactly equivalent to literal existence relative to the
declared window set. The proof is short but the statement is not a corollary of
Paper 4 as written.

**The discrepancy bridge is the most interesting object.** Combining
`R_σ(ρ) ⊆ box(2ρ)` (bounded, `Θ(L)`) with the growth of the source discrepancy
(`Θ(√g)` for `h₆`, since `λ₂ = √3`) yields a quantitative prediction about
*which windows can be discarded without any search*. This connects substitution
spectral theory to Abelian-square avoidance in a way I have not seen made
explicit, and it is the part most likely to be publishable.

## 3. What fails

**The compression claim fails outright.** The waypoint representation was
supposed to replace literal block construction by a smaller variable set. For
any *complete* window set it does not: `D_r = L−1` at every `L` tested, so the
waypoint chain is in bijection with the block word, and the compression factor
is exactly `1`. Restricting the half-period does not help — only restricting the
start set does, and a complete gate cannot. Proposition C proves this.

This is the same phenomenon Paper 4 already recorded from the other direction
(frontier multiplicity `1`, quotient = prefix trie). Two independent
measurements agreeing is strong evidence that it is structural, not incidental.

**Consequently the architecture is a constraint-set reduction, not a
state-space reduction.** That distinction should be stated plainly in any
write-up, because "prefix-Parikh synthesis replaces literal search" is the
natural but incorrect reading.

**Observation #3 does not survive re-measurement** at `L = 40`: at `K ≤ 100` the
non-elidable fraction is exactly `1.00000`. Whatever was seen, the discrepancy
mechanism is not its cause at that scale.

## 4. The decisive gap

Elision removes windows; it does not certify their absence. Summing the measured
`Θ(1/√g)` density over gaps up to `G` leaves

```
Θ(G) windows  →  Θ(√G) surviving windows.
```

That is a genuine asymptotic reduction and it attacks exactly Paper 4's
acknowledged long-period weakness — but `Θ(√G)` is still unbounded. **The
missing theorem is whether the surviving windows can be organized into a finite
certificate**, for instance by showing that the survivors fall into finitely many
template/ancestor classes. Without that, long periods remain open and the
architecture buys a better constant, not a new capability.

This single question determines whether the line is worth a paper.

## 5. Complexity

The key parameter is `D_r`. Compression occurs iff `D_r < L−1`, and the exact
factor is `Π_gaps multinomial(gap length, profile difference)`.

- **Best case** (`D_r` small): only for artificially sparse window sets — a
  single start, or windows restricted to one block boundary. Not a complete gate.
- **Typical and worst case**: `D_r = L−1`, factor `1`.

So the formulation is *not* independent of `L`; it re-encodes the literal word
whenever the gate is complete. Any claim of scaling advantage must first exhibit
a window set with `D_r < L−1` that is still sound for the intended conclusion.

## 6. Algorithms

Given that the state space is not reduced, the choice of solver is an
engineering question, and the constraint shape argues against the obvious pick.

- The core constraints are **disequalities** `σ_j(X) ≠ −t_j` over integer
  vectors. ILP handles these badly: each disequality needs a big-M
  disjunction or an indicator, so `n` windows cost `n` binaries and the LP
  relaxation is nearly vacuous. **ILP is likely the worst choice here**, not the
  default.
- **CP-SAT** is the natural fit: disequalities are native, the monotone chain is
  a simple channelling constraint, and profile sums are exact linear
  constraints. This is what I would prototype first.
- **SAT** requires an order-encoding of each coordinate and blows up the clause
  count, but propagates well; worth a comparison only after CP-SAT.
- **Custom DP over Parikh states** is what the existing solvers already do, and
  since `D_r = L−1` it is provably no worse asymptotically than the waypoint
  CSP. Its advantage is the exact first-hit accounting Paper 4 already
  establishes.

The realistic gain is not from switching solver but from **feeding a smaller
constraint set** to whichever solver is used — which is the elision result.

## 7. Novelty — what would need a literature search

Stated conservatively, and *not* asserted:

1. **Prefix-Parikh waypoint CSP for Abelian repetitions.** Likely adjacent to
   known Parikh-automata and integer-programming encodings; the multi-role
   equivalence may be folklore. Needs checking against Parikh automata and
   semilinear-set literature.
2. **Exact reachable-set compilation of a support signature under a fixed
   profile.** The chain-realizability lemma is elementary and probably known in
   some form; the *use* as a one-way elision filter may not be.
3. **Substitution-spectrum-guided profile design.** This is the least likely to
   be known in this exact form, but deviation of Birkhoff sums for substitutions
   is a developed subject, and the connection may already exist under other
   terminology.
4. **The `λ₂` versus reachable-radius crossover.** The strongest candidate. I am
   not aware of a statement relating a substitution's subdominant eigenvalue to
   the density of eliminable Abelian-square windows, but that is an absence of
   knowledge, not evidence of absence.

No novelty is claimed. Items 3 and 4 are where a search should start.

## 8. Summary judgement

The architecture contains one real theorem (A), one useful exact filter with a
quantified asymptotic (D.1–D.2), one refuted headline claim (compression), and
one unreproduced observation (#3). The interesting direction is not
"replace search by CSP" — that fails — but **"use the source substitution's
spectrum to discard long-period windows before search"**, which is exact, cheap,
and gets stronger precisely where Paper 4 is weakest.
