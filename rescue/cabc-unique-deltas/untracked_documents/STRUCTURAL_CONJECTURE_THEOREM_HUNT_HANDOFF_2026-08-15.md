# Word Structures — Structural Conjecture Theorem-Hunt Handoff

**Date:** 2026-08-15  
**Purpose:** Single read-first handoff for Claude Opus (or another hostile theorem auditor) before any further structural aa2f work.  
**Status:** Research handoff only. Not a claim ledger. No novelty claims.

---

## 0. Read this first

This document is a map, not an authority.

Before doing mathematics, audit the repository and read the source material listed below. Treat `MATH_CLAIMS.md` as the sole canonical authority for established claims. Treat scratch outputs as bounded evidence only. Do not infer universal theorems from the finite census.

**Repository files to locate and read:**

- `MATH_CLAIMS.md`
- `EPISTEMIC_DISCIPLINE.md`
- `NEGATIVE_RESULTS.md`
- `OPEN_RESEARCH_QUESTIONS.md`
- `RESEARCH_CONTEXT.md`
- `NEXT_STEP.md`
- `docs/research/CONJECTURE_GARDEN_V0.md`
- `docs/plans/intake/G001_C20_CHALLENGE.md`
- `scratch/probe_structural.js`
- `scratch/probe_structural_2.js`
- `scratch/probe_micro.js`
- `scratch/probe_hall_structure.js`
- `scratch/probe_local_hall.js`
- `scratch/probe_blocker_stats.js`
- `scratch/probe_tail_chase.js`
- `scratch/evidence/structural_2026-08-15/probe_local_hall.out`
- `scratch/evidence/structural_2026-08-15/probe_blocker_stats.out`
- `scratch/evidence/structural_2026-08-15/probe_tail_chase.out`
- any other file containing:
  - `Deception Depth`
  - `Forced Corridors`
  - `No Lonely Immortals`
  - `Future Obstruction Width`
  - `Three Periods Suffice`
  - `Fresh Reasons`
  - `Obstruction Turnover`
  - `Scale Credit`
  - `Hall`
  - `abacccaaacbc`
  - `aaabaaacbbaa`

Do not assume this list is exhaustive. Search the repository recursively for related reports, scratch programs, raw outputs, artifacts, and prior experiments.

At the beginning of your audit, state what you found and what appears to be missing.

---

# 1. Why this research programme exists

The project is deliberately moving from:

> **compute farther**

toward:

> **understand the structure that makes continuation, extinction, forcing, and branching difficult.**

The motivating principle is:

> A failed algorithm may be evidence of a structural invariant.  
> A failed conjecture may reveal the right quantity to measure.  
> A bounded counterexample may be more valuable than another record.

The project therefore uses conjectures as **research instruments**, not as branding objects.

The desired cycle is:

1. notice a structural anomaly;
2. formulate the simplest exact object that captures it;
3. attempt the cheapest possible kill;
4. preserve counterexamples;
5. extract the invariant exposed by the failure;
6. strengthen or weaken the statement only for a mathematical reason;
7. search the literature;
8. search for a proof mechanism;
9. promote nothing to `MATH_CLAIMS.md` without the existing verification and human-approval process.

A visually attractive conjecture is not progress unless it either survives a meaningful attack or dies in an informative way.

---

# 2. Mathematical setting

Work over the ternary alphabet

\[
\Sigma=\{a,b,c\}.
\]

A finite word is **aa2f** when it contains no Abelian square of half-length

\[
K\ge 2.
\]

Thus the trivial length-2 squares `aa`, `bb`, `cc` are allowed, while every Abelian square with two adjacent length-\(K\) blocks having equal Parikh vectors is forbidden for \(K\ge2\).

The central Mäkelä problem asks whether an infinite ternary aa2f word exists.

The structural programme below is intentionally broader. Its questions are designed to remain meaningful even when they do not directly settle existence.

---

# 3. Epistemic rules that must not be weakened

## 3.1 Programme Question vs Current Challenge

A **Programme Question** may be infinite, universal, or impossible to kill by one finite computation.

A **Current Challenge** is an exact bounded rung with a mechanically interpretable result.

Example:

Programme:

\[
\sup \delta(w)<\infty\ ?
\]

Challenge:

\[
\delta(w)\le20\ ?
\]

A witness with \(\delta(w)=37\) kills the `C20` challenge. It does **not** kill the programme question asking whether some universal finite bound exists.

## 3.2 Cheapest Kill

A finite computation may:

- refute a specified bound;
- produce an explicit universal counterexample;
- refute a finite-\(k\) statement;
- leave a statement surviving an exact finite window.

It may not establish:

- a universal bound from finite survival;
- an asymptotic law from a curve;
- infinite extendability from a search cutoff;
- “probably true” as a mathematical status.

## 3.3 A search cutoff is not extinction

If any continuation branch reaches the computational boundary, the node is **right-censored**.

It is not proved doomed.

Exact extinction depth is available only when the entire continuation subtree is exhaustively closed.

## 3.4 Scratch is not canonical

Scratch experiments are allowed to generate:

- conjectures;
- counterexamples;
- specimens;
- proof ideas.

They are not claim-ledger results until independently validated and promoted through the project’s governance.

---

# 4. Structural map

The current programme has four interacting axes.

## A. DEPTH

How deep can a continuation tree remain viable before finite extinction?

Primary object: **G001 Deception Depth**.

## B. BRANCHING / WIDTH

How long can viable continuation remain effectively one-track?

Primary object: **G003 Forced Corridors**.

## C. TOPOLOGY

Can an infinite solution be isolated in the solution space?

Primary object: **G004 No Lonely Immortals**.

## D. SCALE COMPLEXITY

How many distinct Abelian-square half-length scales are required to explain extinction or forcing?

Primary objects:

- **G005′ Future/Extinction Obstruction Width**
- **G006 Obstruction Hall Property**

The scale-complexity axis emerged from failed conjectures, not from an a priori theory.

---

# 5. G001 — Deception Depth

For a doomed finite aa2f word \(w\), define

\[
\delta(w)
\]

as the maximum number of additional letters by which \(w\) can still be extended while remaining aa2f.

By finite branching and König’s lemma, a word with no infinite extension has finite \(\delta(w)\).

**Programme Question**

\[
\sup\{\delta(w): w\text{ doomed}\}<\infty\ ?
\]

Childlike form:

> **How long can a doomed word pretend to be alive?**

Important distinction:

\[
\text{bounded future-search depth}
\not\Rightarrow
\text{bounded suffix memory or SFT structure}.
\]

If a universal bound \(C\) were proved, then a valid extension of length \(C+1\) would rule out doom. A length-\(C\) extension would not suffice.

---

# 6. G003 — Forced Corridors

Use finite-\(k\) liveness only.

Let \(E_k(w)\) be the set of aa2f continuations of \(w\) of length \(k\).

A word is \(k\)-live when \(E_k(w)\neq\varnothing\).

A successor is live at the corresponding remaining horizon when its continuation subtree survives the remaining lookahead.

A state is **forced** at a finite lookahead when exactly one successor remains live.

A finite-\(k\) forced corridor is a run of such states with decreasing lookahead.

The interesting programme is a **uniform** bounded-corridor question across all \(k\), not the trivial fact that a fixed-\(k\) corridor is at most \(k\) long.

Childlike form:

> **If we look far enough ahead, how long can there be only one genuinely viable way forward?**

No claim about morphic or deterministic generation follows automatically from branching behaviour.

---

# 7. G004 — No Lonely Immortals

Let \(X_M\) be the one-sided space of infinite ternary aa2f words.

Candidate programme question:

\[
X_M=\varnothing
\quad\text{or}\quad
X_M\text{ is perfect?}
\]

Equivalent non-isolation form:

\[
\forall x\in X_M,\ \forall n,\ \exists y\in X_M,\ y\ne x,
\quad y[0:n]=x[0:n].
\]

Childlike form:

> **If an aa2f word can live forever, can it ever be alone?**

**Status:** project research question.  
**Novelty:** not claimed.  
**Literature status:** targeted search found a close ordinary-power analogue, but full hostile transfer/novelty audit remains pending.

Closest known direction to reconstruct carefully:

- Currie on extendibility of ordinary \(k\)-power-free words;
- Currie–Shelton: ordinary \(k\)-power-free omega-word space empty or perfect;
- Keränen: unfavorable factors / extendability;
- Shur: complexity of extendable parts;
- Petrova–Shur: branching of repetition-free languages;
- Salo: branching in positive-entropy subshifts;
- modern Abelian-combinatorics survey.

Do not call G004 new until the literature audit is complete.

### Proposed bridge from G003

Candidate implication:

\[
\text{uniformly bounded finite-}k\text{ forced corridors}
\Longrightarrow
\text{No Lonely Immortals}.
\]

Sketch to audit:

If an infinite solution were isolated after prefix \(w\), every competing side branch along its unique immortal continuation would be doomed. Each such side branch therefore has finite continuation depth. Given any desired corridor length \(r\), choose lookahead large enough to see the deaths of all side branches arising in the first \(r\) steps. The finite-lookahead tree then appears forced for at least \(r\) steps. Hence an isolated immortal would force arbitrarily long finite-\(k\) forced corridors.

Quantifiers and horizon offsets must be audited before this becomes a lemma.

---

# 8. G002 — Death Certificates: a useful failure

Original attractive question:

> **Does every dead word have a short reason for dying?**

The immediate-dead-end formulation trivialized.

Over a ternary alphabet, an immediate dead end has only three one-letter continuations to block. One valid Abelian-square witness per rejected next letter gives an immediate certificate of size at most three.

**Status:** `TRIVIALIZED`, not `REFUTED`.

What survived:

> a deeper **future extinction certificate** question, where an entire finite continuation tree must be certified dead without enumerating it naively.

This failure directly motivated the scale-complexity work below.

---

# 9. G005 — Three Periods Suffice: refuted

A proposed Helly-inspired conjecture suggested that at most three half-length scales \(K\) might suffice to explain every finite extinction.

This is false.

The exact bounded specimen is

\[
w=\texttt{abacccaaacbc},
\qquad
t=4.
\]

It is aa2f, has exactly one valid continuation at horizons \(1,2,3\), and none at horizon \(4\).

For every length-\(t\) future \(u\), examine the earliest append at which \(wu\) first becomes invalid. Let \(W_w(u)\) be the complete set of \(K\ge2\) witnessing an Abelian square at that first-invalid append.

Define

\[
h(w,t)
=
\min\left\{
|S|:
S\cap W_w(u)\ne\varnothing
\text{ for every length-}t\text{ future }u
\right\}.
\]

For the specimen:

\[
h(w,4)=7,
\]

with \(K\)-universe

\[
\{2,3,4,5,6,7,8\}.
\]

Each \(K=2,\ldots,8\) is individually indispensable: there exists a future whose earliest failure has singleton witness set \(\{K\}\).

Thus the universal statement \(h(w,t)\le3\) is refuted by one exact finite counterexample.

This is the archetypal Garden success:

\[
\text{bad conjecture}
\rightarrow
\text{counterexample}
\rightarrow
\text{better invariant}.
\]

---

# 10. G005′ — Extinction Width

For a doomed word define

\[
\eta(w)=h(w,\delta(w)+1).
\]

The extinction-horizon stability lemma is exact:

\[
t\ge\delta(w)+1
\quad\Longrightarrow\quad
h(w,t)=\eta(w).
\]

Reason: every longer future has already encountered its first failure by the extinction horizon; increasing \(t\) only duplicates already-dead branches and does not change the first-failure witness family.

For the validated specimen:

\[
w=\texttt{abacccaaacbc},
\qquad
\delta(w)=3,
\qquad
\eta(w)=7.
\]

This gives doomed words two conceptually different coordinates:

\[
\delta(w)=\text{extinction depth},
\]

\[
\eta(w)=\text{extinction scale complexity}.
\]

**Programme Question**

\[
\sup\{\eta(w):w\text{ doomed}\}<\infty\ ?
\]

Childlike form:

> **Can explaining why a word must die require arbitrarily many different square sizes?**

No universal conclusion follows from the single \((\delta,\eta)=(3,7)\) specimen.

---

# 11. Obstruction hypergraph

The scale-complexity work has a clean hypergraph formulation.

For future extinction:

- vertices: Abelian-square half-length scales \(K\ge2\);
- hyperedges: complete first-failure witness sets \(W_w(u)\).

Then

\[
h(w,t)
\]

is exactly the transversal number of this finite obstruction hypergraph.

For forced corridors, define \(R_i\) at forced state \(w_i\) as the union of all \(K\)-values witnessing the immediately rejected one-letter branches.

The \(R_i\) are **not** the same objects as the future-extinction hyperedges. They live in the same \(K\)-vertex universe but represent a local projection/union of immediate failures.

Do not collapse the two constructions.

---

# 12. G006 — Obstruction Hall Property

> **HISTORICAL DEVELOPMENT — G006 IS NOW REFUTED.**
> Sections 12–17 document how the candidate arose and what was learned
> before the exact counterexample. They are not the current research
> state. Current status and structural residue are in Sections 18–21.

For a complete immediate-forced corridor

\[
C=(w_0,\ldots,w_{r-1}),
\]

let

\[
R_i=R(w_i)
\]

be the set of all half-length scales witnessing at least one rejected immediate successor at state \(w_i\).

The first bounded observation was

\[
\left|\bigcup_iR_i\right|\ge r.
\]

A stronger prefix observation defined

\[
q_j=
\left|\bigcup_{i<j}R_i\right|-j,
\]

and found \(q_j\ge0\) in the bounded census.

The stronger discovered structure was Hall’s condition:

\[
\boxed{
\left|\bigcup_{i\in I}R_i\right|\ge |I|
\quad
\text{for every subset }I\subseteq\{0,\ldots,r-1\}.
}
\]

If universal, Hall’s marriage theorem would imply the existence of distinct representatives

\[
K_i\in R_i,
\qquad
K_i\ne K_j
\quad(i\ne j).
\]

Interpretation:

> every forced state can be assigned a different period scale that is active at that state.

Do **not** say that a scale is “consumed”, or that the assigned \(K_i\) is a complete certificate for the whole forced state. A chosen \(K_i\) merely belongs to \(R_i\).

Childlike form:

> **Can every forced step be given its own different square size that helped force that step?**

---

# 13. Exact bounded evidence for G006

After correcting right-censoring at the \(N=18\) enumeration boundary:

- complete forced corridors:
  - \(r=1\): 135,144
  - \(r=2\): 24,264
  - \(r=3\): 6,456
  - \(r=4\): 1,248
  - \(r=5\): 168
  - \(r=6\): 48
- maximum complete corridor length: \(6\);
- right-censored fragments were excluded from exact completed-corridor statistics;
- no complete-corridor counterexample to
  \[
  |\Omega(C)|\ge |C|
  \]
  was found;
- maximum observed reuse of a single \(K\) within one complete corridor: \(4\).

A maximum-length example has

\[
R_i=
[
\{2,4\},
\{2,5\},
\{3,6\},
\{2,4,5,6\},
\{2,7\},
\{3,8\}
].
\]

One SDR is

\[
[2,5,3,4,7,8].
\]

This demonstrates substantial scale reuse while still allowing distinct representatives.

---

# 14. Hall microprobe results

Using all complete corridors in the exact \(N\le18\) census:

- Prefix Scale Credit survived.

In the earlier complete-corridor N<=18 census, Hall survived that
particular bounded window and no deficient subset was found there.
This was later overturned by the exact length-19 complete counterexample
in Section 18.

For the maximum-length \(r=6\) complete corridors, explicit SDRs were constructed.

This was a **bounded exact fact**, not a universal theorem.

Do not use the phrase “Distinct-Scale Matching Theorem” until a universal proof exists.

---

# 15. Hall-tight structure mining

The next probe did not increase \(N\). It mined the existing exact \(N\le18\) data.

Across all complete corridors:

- 280,080 nonempty subset configurations were tested;
- 2,220 subsets were Hall-tight:
  \[
  \left|\bigcup_{i\in I}R_i\right|=|I|;
  \]
- no Hall violation occurred.

The tight structure is not simple.

## 15.1 Non-contiguous tight sets occur

Inclusion-minimal tight subsets can skip states, e.g.

\[
I=\{1,3\}.
\]

## 15.2 Tight sets are not laminar

Crossing tight sets occur, e.g.

\[
A=\{0,1,3\},
\qquad
B=\{1,2,3\}.
\]

Thus a proof cannot rely on a simple interval or laminar decomposition.

## 15.3 Prefix credit is strictly weaker than full Hall

There are corridors for which every proper prefix has positive scale credit while a non-prefix subset is Hall-tight.

Example blocker trajectory:

\[
[
\{2,3\},
\{2,4\},
\{2,3\}
].
\]

The non-prefix set \(\{0,2\}\) is tight.

## 15.4 Simple stronger claims that failed

The following are **not** viable universal explanations:

- every state introduces a new \(K\);
- an SDR can always be chosen nondecreasing in corridor order;
- tight subsets form an interval family;
- tight subsets form a laminar family.

Do not rescue these by adding arbitrary thresholds.

## 15.5 Pairwise local diversity is automatic

For fixed K, at most one appended letter can be blocked by K.
Therefore an immediate forced state, which rejects two distinct letters,
satisfies |R_i| >= 2.

Hence:

|R_i union R_{i+1}| >= 2

is automatic and had no explanatory power for Hall.

## 15.6 Matching redundancy

In the observed maximum-length corridors the SDR is not rigid: many distinct matchings exist, and no single representative was forced at every step in the reported extremal cases.

This suggests that any proof mechanism may involve redundancy rather than a canonical monotone assignment.

Again: bounded evidence only.

---

# 16. Why G006 was mathematically interesting

Hall attempted to prohibit extreme arbitrary-subset scale compression. It was refuted. The exact counterexample showed arbitrary-subset abstraction discarded chronological order. This motivated returning attention to Prefix Scale Credit.

---

# 17. Structural residue from the failed Hall theorem hunt

This is postmortem structural mathematics, not an attempt to revive G006.

The following structure remains useful even though Hall is false:
- fixed-K uniqueness lemma;
- |R_i| >= 2;
- adjacent-recurrence Lemma 5;
- consecutive-run Lemma 6;
- minimal Hall-deficiency bicyclic-core reduction.

---

# 18. Conjecture-discovery lesson

The current chain is scientifically important in its own right:

\[
\text{G002 short certificate}
\]

was trivialized, which led to a deeper future-extinction question.

Then

\[
\text{G005 Three Periods Suffice}
\]

was killed by an exact seven-scale counterexample.

The counterexample produced

\[
\eta(w)=\text{Extinction Width}.
\]

Independent corridor measurements produced

\[
|\Omega(C)|\ge|C|.
\]

Strengthening from terminal support to prefix support produced Scale Credit.

Strengthening from prefixes to **all subsets** produced Hall's condition (G006).

G006 and G006-L (local Hall) were **REFUTED** by an explicitly extracted right-censored dead-end run.

Exact complete forced corridor:
```text
step 0 len13 abccaabacbbaa       R={2,7}
step 1 len14 abccaabacbbaaa      R={2,7}
step 2 len15 abccaabacbbaaab     R={3,6}
step 3 len16 abccaabacbbaaabb    R={2,4,5}
step 4 len17 abccaabacbbaaabbb   R={2,6,7}
step 5 len18 abccaabacbbaaabbba  R={3,7}
len19 abccaabacbbaaabbbaa        DEAD END
```

Hall-deficient subset:
`I={0,1,2,4,5}`
with union
`N(I)={2,3,6,7}`
yielding `|I|=5`, `|N(I)|=4`, `deficiency=1`.

The same witness DOES NOT refute Prefix Scale Credit (`q-sequence = [1,0,1,2,1,0]`) and DOES NOT refute terminal support (`|Omega|=6=|C|`).

Therefore the implication hierarchy follows directly:

`Hall => Prefix Scale Credit => Terminal Support`

- Hall applied to every prefix subset gives Prefix Scale Credit.
- Terminal Support is the final-prefix instance.

The exact counterexample satisfies Prefix Scale Credit but violates Hall. Therefore, **Prefix Scale Credit does NOT imply Hall**. Hall is strictly stronger than Prefix Scale Credit on the aa2f forced-corridor class. (We do not claim anything yet about whether Terminal Support implies Prefix Scale Credit).

Thus the discovery chain is:

\[
\boxed{
\text{failed idea}
\to
\text{counterexample}
\to
\text{invariant}
\to
\text{bounded law}
\to
\text{stronger abstraction}
\to
\text{classical combinatorial structure}
\to
\text{subtle refutation revealing strict hierarchies}.
}
\]

This is the model the Conjecture Garden is intended to reproduce in future work.

A future "conjecture trigger" should fire whenever one of the following occurs:

1. a conjecture dies but the counterexample has a measurable extremal feature;
2. a search statistic repeatedly sits on a sharp boundary;
3. a bounded inequality survives while simpler explanations fail;
4. an invariant naturally becomes a known object after abstraction;
5. different failed research lines can be expressed in the same state space;
6. a minimal counterexample appears to require a special configuration;
7. a proof attempt repeatedly needs the same missing lemma;
8. a local phenomenon survives heavy reuse/recycling and therefore suggests a global conservation/exchange law.

---

# 19. G006 POSTMORTEM / STRUCTURAL RESIDUE

The G006 theorem hunt is closed because full arbitrary-subset Hall was too strong (it discarded chronological prefix order). 

Record of surviving structural residues:
- **Exact counterexample:** (see section 18 above, length 19 dead end)
- **Exact deficient subset:** `I={0,1,2,4,5}`
- **Exact provenance:** Hashes captured in `scratch/evidence/structural_2026-08-15/`
- **Fixed-K uniqueness lemma:** A fixed K blocks at most one appended letter.
- **|R_i| >= 2 corollary:** Follows unconditionally from uniqueness.
- **Adjacent-recurrence Lemma 5:** Constraints on consecutive returns.
- **Consecutive-run Lemma 6:** Constraints on continuous recurrence blocks.
- **Minimal Hall-deficiency bicyclic-core reduction:** (POSTMORTEM) Established for the structural hypergraph geometry, though Hall is now refuted.

Explicitly, any MRL' / s=3 Hall rescue work is **DEPRIORITIZED**: it may remain mathematically interesting but is no longer relevant to saving G006.

---

# 20. ZERO-CREDIT RENEWAL — EXACT REFORMULATION OF PREFIX SCALE CREDIT

Definitions:
```text
Omega_j = union_{i<j} R_i
q_j = |Omega_j| - j
a_j = |R_j \ Omega_j|
```

Identity:
```text
q_{j+1} = q_j + a_j - 1
```

Since $a_j \ge 0$:
- if $q_j \ge 1$, then $q_{j+1} \ge 0$ automatically;
- if $q_j = 0$, then $q_{j+1} \ge 0$ iff $a_j \ge 1$.

With $q_0 = 0$, therefore:

**Prefix Scale Credit:**
`q_j >= 0 for every prefix j`
is EXACTLY EQUIVALENT to:
**Zero-Credit Renewal:**
`whenever q_j = 0, the next forced state introduces at least one previously unseen K.`

- This is an EXACT REFORMULATION of Prefix Scale Credit.
- No permanent Garden ID.
- Not a separate conjecture.
- No novelty claim.
- The open candidate remains Prefix Scale Credit itself.

*Evidence closed under:*
`scratch/probe_local_hall.js` (`93948DA42EDC749515B8B9CB70FA740969EA836AF8992428FC9D5C85479E66EF`)
`scratch/evidence/structural_2026-08-15/probe_local_hall.out` (`14FA8E1DDB7DB07180F1FB85ECD3BEA0A9F3FFE76A911A4ECAAFAAE85A0AEF59`)
`scratch/probe_blocker_stats.js` (`EE51CCFF9AAA671F9CF45D82E72F0971A96EE4A24981B52E2BAF99649B49943A`)
`scratch/evidence/structural_2026-08-15/probe_blocker_stats.out` (`4C705957E1C62D6416BCB8A3CE4DE4C713C5A7B0243842B2CE404D4A289504CC`)
`scratch/probe_tail_chase.js` (`C3E1AD869C1C80CBD12C3004E68918E7A7D3604BB29C4C7DCBEC603243DD81A6`)
`scratch/evidence/structural_2026-08-15/probe_tail_chase.out` (`D6A9093C884990581C9208E0BF489D39AF133043D1AEE6C2BB535B52F4038A32`)

Note: Git HEAD/worktree provenance must remain scratch-only until integrated.

---

# 21. Exact statuses at handoff

| Object | Status |
|---|---|
| G001 Deception Depth | Programme question |
| G003 Forced Corridors | Programme question |
| G004 No Lonely Immortals | LOGICAL AUDIT COMPLETED; PRIMARY-SOURCE LITERATURE / NOVELTY AUDIT PENDING |
| G002 immediate Death Certificates | TRIVIALIZED |
| G005 Three Periods Suffice | REFUTED by exact finite counterexample |
| G005' Extinction Width \(\eta\) | Structural invariant / programme seed |
| Extinction-width stability lemma | Exact definitional lemma, subject to normal audit |
| Obstruction hypergraph formulation | Clean abstraction, not a theorem |
| G006 Obstruction Hall Property | REFUTED by exact complete finite counterexample |
| G006-L Local Hall | REFUTED by the same exact local Hall-deficient configuration |
| Prefix Scale Credit | SURVIVES CURRENT EXACT EVIDENCE; NOT implied true by the Hall counterexample |
| Terminal Support Inequality | SURVIVES CURRENT EXACT EVIDENCE |
| Scale Saturation | Refuted by bounded counterexample |
| Every state introduces new K | Refuted |
| monotone SDR | Refuted |
| interval/laminar tight-set explanation | Refuted |
| Zero-Credit Renewal | EXACT REFORMULATION OF PREFIX SCALE CREDIT |

---

# 22. Required final output from Opus

After reading the repository and this handoff, return two clearly separated reports.

## A. G004 report

- primary-source literature audit / Currie-Shelton mechanism / Abelian transfer, with no novelty claim.

## B. Prefix Scale Credit report

Now knowing Zero-Credit Renewal is exactly equivalent:
- test for triviality;
- look for a proof mechanism;
- try the cheapest mathematical falsification;
- assess whether Lemmas 5/6 genuinely constrain zero-credit renewal;
- do NOT revive Hall.

Do not ask for a larger computation. No code unless a microscopic counterexample checker is genuinely necessary. No repository edits. No commit. No novelty claims.

---

# 23. Final principle

The goal is not to accumulate conjectures.

The goal is to discover a coherent theory of the aa2f continuation tree.

The best future conjectures should arise when a calculation, proof failure, or counterexample exposes a structural quantity that the project did not know it needed.

> **Do not ask only whether a word survives.  
> Ask what structure makes survival, extinction, and forced choice possible.**
