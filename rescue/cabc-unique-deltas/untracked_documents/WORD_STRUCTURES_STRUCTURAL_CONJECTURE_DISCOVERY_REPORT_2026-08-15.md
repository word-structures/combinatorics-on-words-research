---
title: "Word Structures: Structural Conjecture Discovery"
subtitle: "Research report, integration framework, and shared brief for hostile review"
author: "Word Structures research process — human + AI synthesis"
date: "15 August 2026"
---

# Executive summary

Word Structures has reached a methodological turning point. The project began by asking how far exact search, morphism families, bounded closures, and optimized backtracking could be pushed. Those efforts produced valuable negative knowledge, audited finite closures, and strong engineering. They also revealed a recurring asymmetry: the project has become very good at proving that particular constructions fail, while Mäkelä's problem is fundamentally an existence and extendability problem.

The resulting strategic shift is **from computation as destination to computation as a structural instrument**. The aim is no longer to maximize record length or enumerate the next parameter merely because it exists. The aim is to discover simple statements about the geometry of the aa2f continuation language, attack them cheaply, and retain the structural information whether they survive or fail.

This report consolidates the emerging method into one research programme. Its central mechanism is the **Conjecture Garden**: a disciplined environment in which a broad Programme Question is paired with a finite Current Challenge, a Cheapest Kill, exact epistemic status, literature status, and a record of what a failure teaches. The Garden is deliberately separated from `MATH_CLAIMS.md`: exploratory conjectures may be wrong, trivial, or known elsewhere; canonical claims may not.

The strongest current structural axes are:

1. **Depth** — how deep can a continuation subtree remain viable before it dies? (`G001 Deception Depth`)
2. **Width / branching** — how long can finite-lookahead survival remain effectively one-dimensional? (`G003 Forced Corridors`)
3. **Topology of infinite solutions** — if infinite aa2f solutions exist, can one be isolated? (`G004 No Lonely Immortals`, pending hostile literature/theorem audit)
4. **Scale complexity of obstruction** — how many distinct Abelian-square scales are needed to force extinction or constrained continuation? (`G005' Future Obstruction Width`, `G006 Obstruction Turnover`, `G007 Relevant-Scale Sparsity`, all still research seeds)

A key historical anchor is that Currie and Shelton proved an “empty or perfect” theorem for ordinary k-power-free infinite words, while Keränen explicitly studied unfavourable Abelian-square-free factors and long deceptive extendability. These make extendability, branching, and perfectness natural structural questions rather than branding inventions. At the same time, the Abelian setting is not automatically covered by the ordinary power-free proofs; theorem transfer must be audited rather than assumed.

The report recommends a conservative integration path: keep the Garden repository-first and small; treat `G001` and `G003` as mature programme cards; preserve `G002` as a worked example of a conjecture trivialized at formalization; subject `G004` to a hostile literature and proof-transfer audit before elevating it; keep `G005'–G007` in an internal nursery until their definitions and any scratch observations are independently reproduced. Public web presentation should follow only after the project has demonstrated at least one complete Garden lifecycle from question to challenge to exact result to interpretation.

The deeper goal is not to manufacture “new conjectures.” It is to create a repeatable way to notice when a failed computation, an old theorem, a duality, a compression gap, or a counterexample is actually pointing at a new mathematical object.

# 1. Why the research direction changed

## 1.1 The previous mode was productive but asymmetric

The project accumulated substantial machinery for bounded elimination:

- exact backtracking and independent validation;
- Route-C Stage-A / Stage-B decomposition;
- large audited closure computations;
- symbolic Parikh obstructions;
- FORBID4 incremental checking and second-difference formulations;
- extensive optimization attempts, including safe-sleep scheduling;
- negative-results governance and claim discipline.

These are genuine assets. The problem is strategic rather than technical: repeated improvements in elimination power do not automatically improve the project's understanding of why an infinite aa2f word should or should not exist.

The safe-sleep cycle made this distinction unusually visible. A mathematically sound work-compression idea could remove the overwhelming majority of certain long-period checks while still making whole-search runtime worse because bookkeeping dominated. The important lesson was broader than optimization:

> **Proof/work compression is not the same thing as runtime compression, and runtime compression is not the same thing as mathematical progress.**

This suggested a new criterion for experiments: before running them, state which mathematically different worlds their outcomes would distinguish.

## 1.2 The new objective: structural understanding

Mäkelä's question is an existence problem about the aa2f language. The strategically relevant objects are therefore not only long words but the **continuation structure** around all finite words:

- which prefixes die immediately;
- which survive for a long time and then die;
- which branches remain genuinely viable under finite lookahead;
- whether infinite solutions, if they exist, are isolated or abundant;
- which Abelian-square scales actually control extinction.

This shift also better matches the identity of **Word Structures**. A record is a scalar. A continuation tree, obstruction cover, branching corridor, or perfectness question is a structure.

# 2. The central methodological idea: conjectures as research instruments

The Conjecture Garden should not be understood as a list of attractive guesses. Its purpose is to improve the *design of research*.

A useful Garden conjecture should satisfy four tests:

> **Easy to state. Hard to settle. Useful if true. Useful if false.**

The important addition is that every active conjecture is split into two layers.

## 2.1 Programme Question

A Programme Question is the broad structural statement that gives direction. It may quantify over all words, all horizons, or infinite objects. It need not be finitely refutable by one computation.

Example:

> For doomed aa2f words, is deception depth uniformly bounded?

Formally, if δ(w) is the maximum additional aa2f extension length available from a doomed word w, ask whether

`sup { δ(w) : w is doomed } < infinity.`

## 2.2 Current Challenge

A Current Challenge is an exact bounded rung that finite computation can actually kill.

Example:

> `G001-C20`: every doomed word satisfies δ(w) <= 20.

One verified word with δ(w) > 20 refutes `G001-C20`. It does **not** refute the umbrella Programme Question that some larger universal constant might exist.

This distinction prevents a recurring epistemic failure: forcing an interesting universal question into an arbitrary finite formulation simply because a program needs a target.

## 2.3 Cheapest Kill

Every Current Challenge declares in advance:

- the exact witness that would refute it;
- the computational budget;
- the meaning of a found counterexample;
- the meaning of no counterexample within the stated bounds;
- the stop condition.

The allowed bounded outcomes are deliberately austere:

- `REFUTED`
- `SURVIVES THIS TEST`
- `INCONCLUSIVE`
- `MOTIVATES WEAKER / DIFFERENT CHALLENGE`

“No counterexample found” is never translated into “probably true” by default.

# 3. The stress-test metaphor: conjectures should be attacked, not protected

The most useful metaphor that emerged in discussion was horticultural: a conjecture should be treated less like a delicate flower and more like a chili plant deliberately stressed so that its response becomes informative.

The metaphor is playful; the method is serious.

A conjecture can fail in several scientifically distinct ways:

1. **REFUTED** — the statement is false.
2. **TRIVIALIZED** — formalization reveals a simple answer, so the question is not a useful research problem.
3. **KNOWN** — literature already settles it.
4. **MALFORMED** — the quantifiers or object fail to express the intended phenomenon.
5. **SURVIVES BOUNDED ATTACK** — it remains open, with exact finite evidence only.
6. **PROOF CANDIDATE** — a real argument exists and now deserves hostile mathematical audit.

The first four are not project failures. They are computational savings and conceptual gains.

`G002 Death Certificates` is the canonical worked example. The appealing question “Does every dead word have a short reason for dying?” became trivial when “dead” was formalized as an immediate ternary right dead end: there are only three possible next letters, so at most three one-step Abelian-square witnesses suffice. The interesting residue is not immediate death but **future extinction**: can the eventual death of an entire continuation subtree be certified compactly without enumerating that subtree?

The failed conjecture therefore produced a better object.

# 4. Human + AI discovery workflow

The project has converged on a division of labour in which different agents are used for different epistemic tasks.

## 4.1 Human role

The human researcher owns:

- scientific relevance;
- which questions are worth project time;
- whether a conjecture is pedagogically interesting but scientifically weak;
- go / no-go decisions for computation;
- approval of public and canonical claims;
- the final judgement about whether a result changes the research direction.

## 4.2 AI roles

A useful practical division is:

- **Gemini Pro Low** — routine documentation and low-risk repository execution.
- **Gemini Pro High** — repo-grounded formalization, exact finite experiment design, implementation, parity checks, accounting, and bounded evidence.
- **Claude Opus** — hostile theorem audit, proof transfer, source/literature audit, novelty-risk review, and claim-boundary analysis.
- **GPT-5.6 Sol** — synthesis across research lines, cross-pollination brainstorming, architecture of research questions, and integration of mathematical, engineering, and pedagogical views.

The important principle is not the brand of model but the **separation of author and attacker**. The agent that invents a conjecture should not be the only agent allowed to validate its mathematics.

## 4.3 The full loop

A mature Garden loop is:

`Phenomenon noticed`
→ `candidate formulations generated`
→ `formalization`
→ `triviality / counterexample attack`
→ `targeted literature audit`
→ `Programme Question + Current Challenge`
→ `Cheapest Kill preregistration`
→ `exact bounded probe`
→ `independent verification`
→ `interpretation`
→ `proof attempt if warranted`
→ `hostile proof/source audit`
→ `human approval`
→ `MATH_CLAIMS promotion, if justified`.

At any stage the item may instead become a refuted or trivialized Garden entry, a Graveyard item, or an archived seed.

# 5. Claim firewall and evidence levels

The Garden and the claim ledger have opposite temperaments.

## 5.1 Garden

The Garden may contain:

- speculative programme questions;
- formally precise but unproved conjectures;
- bounded challenges;
- failed conjectures;
- trivialized ideas;
- evidence windows;
- literature status such as `not checked` or `targeted search only`.

It should default to:

- `PROJECT RESEARCH QUESTION`
- `NOVELTY CLAIMED: false`.

## 5.2 MATH_CLAIMS.md

`MATH_CLAIMS.md` remains the sole authority for established project claims. Garden survival, AI confidence, visual curve shape, and record support are never sufficient for promotion.

A theorem-like promotion normally requires a written proof, hostile mathematical audit, source checks where relevant, and human approval. A finite computational promotion requires exact scope, reproducibility, independent verification appropriate to the claim, and human approval.

## 5.3 A critical methodological slogan

> **A search cutoff is not extinction.**

This is particularly important for deception-depth work. Exact δ(w) can be reported only when the continuation subtree rooted at w has actually been exhausted. If a branch hits a depth or budget cutoff, the node is right-censored: its extinction depth is unknown and it cannot be used as an exact counterexample.

# 6. Structural map: four axes of the aa2f language

The current conjectures become more coherent when organized by the aspect of continuation structure they measure.

## 6.1 Axis I — Depth

**Question:** How deep can a finite doomed future be?

This is the territory of `G001 Deception Depth`.

## 6.2 Axis II — Width and branching

**Question:** How long can a viable finite-lookahead continuation structure remain effectively one-dimensional?

This is the territory of `G003 Forced Corridors`.

## 6.3 Axis III — Topology of infinite solutions

**Question:** If infinite solutions exist, what is the topology of the solution space? Can an infinite solution be isolated?

This is the territory of `G004 No Lonely Immortals`.

## 6.4 Axis IV — Scale complexity

**Question:** How many distinct Abelian-square half-length scales are simultaneously needed to explain extinction, forced choices, or imminent danger?

This is the emerging territory of `G005'`, `G006`, and `G007`.

These axes suggest a research picture broader than “does an infinite word exist?”: the project studies the **geometry, topology, and multiscale obstruction structure of the aa2f continuation language**.

# 7. Current conjecture portfolio

The following statuses are recommendations for research organization, not canonical mathematical claims.

## 7.1 G001 — Deception Depth

**Childlike question:**

> How long can a doomed word pretend to be alive?

For a finite aa2f word w whose continuation subtree is finite, define δ(w) as the maximum number of additional letters achievable along any aa2f continuation from w.

**Programme Question:**

`Is sup δ(w) finite over all doomed aa2f words?`

**Current Challenge candidate:**

`G001-C20: δ(w) <= 20 for every doomed w.`

**Why it matters:** A proven universal bound C would make future extinction decidable by a bounded forward horizon: if a word has an extension of length C+1, it cannot be doomed under that theorem. This is a statement about **future-search depth**, not bounded suffix memory, regularity, or SFT structure.

**Main caution:** bounded computation can refute a specified C but cannot establish the existence or non-existence of some unspecified universal bound.

**Research value:** high pedagogical clarity; direct reuse of exact DFS; natural measure of the difference between “locally alive” and “globally doomed.”

## 7.2 G002 — Death Certificates

**Childlike question:**

> Does every dead word have a short reason for dying?

**Status:** `TRIVIALIZED at formalization` for the immediate-dead-end version.

Immediate ternary death has only three candidate next letters, so a certificate consisting of one valid Abelian-square witness per blocked letter has size at most three.

**What survived:** the deeper **Future Extinction Certificate** idea. The nontrivial question is whether the finite death of an entire continuation subtree admits a compact compressed certificate — for example through a small set of obstruction scales, symbolic covers, or a compressed proof DAG — without enumerating every descendant.

This residue directly motivates the scale-complexity axis.

## 7.3 G003 — Forced Corridors

**Childlike question:**

> If we look k steps ahead, how long can there be only one genuinely viable way forward?

Let a word be k-live if it admits an aa2f continuation of length k. A successor is k-live when it leaves a continuation of the remaining horizon. A state is forced at lookahead k when exactly one successor remains live at that horizon. A k-corridor is a consecutive run of such forced states as the horizon decreases.

**Programme Question:**

`Does there exist an absolute C bounding all finite-k forced corridor lengths?`

**Current Challenge candidate:**

`G003-C20`.

**Why it matters:** This measures the geometry of the finite-lookahead continuation tree: uniformly bushy versus arbitrarily long nearly deterministic tunnels.

**Main caution:** for fixed k, corridor length is automatically bounded by k. The content is uniformity across all k and all states. Legal successor, k-live successor, and a DFS traversal choice must remain distinct concepts.

## 7.4 G004 — No Lonely Immortals / Abelian Perfectness

**Childlike question:**

> If an aa2f word can live forever, can it ever be alone?

Let X_M be the set of one-sided infinite ternary words avoiding every Abelian square of half-length K >= 2.

**Candidate Programme Question:**

`Is X_M empty or perfect?`

Equivalently, if X_M is nonempty, does every x in X_M have another infinite solution sharing every prescribed finite prefix length with x?

This is the strongest current candidate for a **topological umbrella question**.

**Why it matters:** It asks whether a hypothetical infinite solution can be an isolated fragile path, or whether infinite solvability necessarily brings local abundance of other infinite solutions.

**Literature position:** ordinary k-power-free omega-word spaces have an “empty or perfect” theorem due to Currie and Shelton. That makes G004 a natural Abelian transfer question, but not an automatic theorem. The exact Currie–Shelton mechanism must be reconstructed and tested step by step in the Abelian setting before G004 is presented as an open project conjecture.

**Status recommendation:** `CANDIDATE / HOSTILE LITERATURE AUDIT PENDING`; novelty not claimed.

## 7.5 G005' — Future Obstruction Width

**Childlike question:**

> Can proving that every future dies require more and more different square sizes?

The original brainstorm proposed a Helly-like idea: perhaps a bounded number of Abelian-square half-lengths K always suffices to cover all failing continuations at a given finite horizon. Formalization suggests defining a minimum hitting-set style invariant over the K-values that witness failure across the horizon.

The scientifically interesting question is not currently “three periods suffice.” It is whether the minimum number of distinct obstruction scales is uniformly bounded, grows with horizon, or can become arbitrarily large.

**Status recommendation:** `SEED`.

**Important evidence warning:** numerical “scratch” examples mentioned during brainstorming are not canonical evidence unless independently recomputed with exact definitions and an independent checker. They should not enter public Garden cards or claims until reproduced.

## 7.6 G006 — Obstruction Turnover / Fresh Reasons

**Childlike question:**

> If a word forces you down one path for a long time, must it keep inventing new reasons to block the other choices?

For a forced corridor, collect the distinct K-values that witness rejection of alternatives along the corridor. The programme asks whether arbitrarily long forced corridors necessarily require an unbounded number of distinct obstruction scales.

A strong finite rung could compare corridor length with the number of distinct blocker scales, but no particular linear law should be privileged without a mechanism.

**Why it matters:** If a fixed small set of K-values can force arbitrarily long corridors, that would reveal a low-complexity recurrent forcing mechanism. If the number of required scales grows, then forced behaviour is intrinsically multiscale.

**Status recommendation:** `SEED`, pending exact reproduction and literature audit.

## 7.7 G007 — Relevant-Scale Sparsity

**Childlike question:**

> To understand only the next t moves, can a very old word still have arbitrarily many different square sizes that matter right now?

The safe-sleep mathematics introduced a distance of a K-state from immediate candidate danger and a bounded rate at which this distance can change under appends. This suggests counting the number of K-values that are close enough to danger to become relevant within a finite horizon t.

**Programme Question:** for fixed t, is the number of such relevant scales uniformly bounded over all aa2f prefixes, independent of prefix length?

**Why it matters:** A positive result would be a genuine structural compression theorem for finite lookahead. A negative result would produce hard states in which arbitrarily many scales are simultaneously near-critical.

**Status recommendation:** `SEED`; definition must be tied exactly to the proved distance lemma before any computation.

# 8. Conjecture graph and logical relationships

The Garden should eventually show relationships, not merely cards.

A current conceptual graph is:

```text
G001 Deception Depth
    |  measures finite doomed-tree depth
    |
    +------------------------------+
                                   |
G003 Forced Corridors ------------+----> G004 No Lonely Immortals ?
    |  finite-k tree narrowness          infinite solution topology
    |
    +--> branching-density / entropy literature (stronger/different axes)

G002 immediate Death Certificates
    --TRIVIALIZED-->
        Future Extinction Certificate
              |
              +--> G005' Future Obstruction Width
              +--> G006 Obstruction Turnover

FORBID4 second-difference / safe-sleep structure
              |
              +--> G007 Relevant-Scale Sparsity

Route-C profile-vs-order-sensitive split
              |
              +--> general lesson: Parikh-level summaries do not capture all
                   internal-order obstruction structure
```

A particularly promising theorem candidate is the implication

`bounded finite-k forced corridors => no isolated infinite aa2f solution`.

The intuitive proof is that if an infinite solution were isolated after some prefix, then every competing side branch along it would eventually die. For any desired finite run length r, only finitely many side branches are relevant in the first r steps, so a sufficiently deep lookahead would see only the isolated path across those steps, creating a forced corridor of length r. This implication requires a hostile quantifier/off-by-one audit before being treated as established.

The converse is not expected automatically: a perfect infinite-solution space may still contain branching gaps of unbounded length.

# 9. Literature anchors and why they matter

This section records targeted anchors, not a completed novelty review.

## 9.1 Currie (1995): structure and extendibility of k-power-free words

Currie explicitly studied the branching tree of k-power-free words and proved perfectness in several parameter regimes, together with effective extendibility methods. This is direct precedent for treating extension-tree geometry as a first-class combinatorics-on-words object.

## 9.2 Currie & Shelton (1996, 2003): Cantor sets and empty-or-perfect

Currie and Shelton developed Cantor-set methods for repetition avoidance and later proved that, for a natural number k and finite alphabet, the set of omega-words avoiding k-th powers is either empty or perfect. This is the closest known structural analogue to G004.

The scientific opportunity is not to cite the theorem as if it solved the Abelian case, but to reconstruct its mechanism and ask exactly which steps survive replacement of equality-of-blocks by equality-of-Parikh-vectors.

## 9.3 Keränen (2010): unfavourable factors

Keränen defined unfavourable Abelian-square-free factors that cannot occur as proper factors of any two-sided infinite Abelian-square-free word, and highlighted the phenomenon that relatively short factors can remain extendable for a very long distance and through many branches before eventually being classified unfavourable. He also noted the possibility of one-sided unbounded extendability for such factors as an open experimental direction.

This is an important historical bridge to deception depth, extinction certificates, and one-sided versus two-sided extendability.

## 9.4 Shur (2008): extendable parts preserve exponential growth rate

For arbitrary factorial languages, the right-, left-, and two-sided extendable parts have the same exponential growth rate as the whole language. This is a useful *negative-space theorem*: it kills naive conjectures claiming that the immortal/extendable core must have strictly smaller exponential growth rate merely because many finite words are doomed.

It also illustrates a recurring lesson: the right invariant may be branching geometry, certificate complexity, or subexponential detail rather than headline growth rate.

## 9.5 Petrova & Shur (2021): branching and Markov entropy

Their work formalizes prefix-tree branching statistics and Markov entropy for repetition-free languages, including experimental study of Abelian-power-free languages. Separate work gives nontrivial branching-density bounds for canonical cube-free and square-free languages.

This situates G003 in an existing research tradition while also warning that bounded gaps, positive density, and entropy are different properties and must not be conflated.

## 9.6 Salo (2021): trees in positive-entropy subshifts

Salo proves that positive-entropy subshifts contain steadily branching binary trees with branching times of positive lower asymptotic density. This provides a clean symbolic-dynamics comparison point for the hierarchy:

- nonempty solution space;
- perfectness / no isolated points;
- bounded branching gaps;
- positive branching density;
- positive entropy.

These are not equivalent in general.

## 9.7 Fici & Puzynina: Abelian combinatorics survey

The survey confirms that Parikh-vector equivalence is the central commutative structure behind Abelian repetitions and gathers the modern literature and open problems. It is a natural starting point for novelty audits of any proposed Abelian analogue or new scale invariant.

# 10. What the process gives the project

## 10.1 Better use of existing engineering

The project has already paid for exact DFS, incremental Parikh checking, symbolic obstruction engines, Stage-A profile methods, second-difference states, symmetry tools, and extensive validation. Structural programmes allow these assets to “pay rent” as instruments rather than as ends.

Examples:

- DFS becomes a deception-depth and continuation-tree instrument.
- k-lookahead becomes a forced-corridor instrument.
- symbolic obstruction machinery becomes a certificate / scale-complexity instrument.
- safe-sleep distance mathematics becomes a relevant-scale invariant.
- negative Route-C results become evidence about where profile-level summaries cease to explain order-sensitive structure.

## 10.2 Less wasted computation

A Garden challenge must state how it can die before receiving serious compute. This discourages “one more L,” uncontrolled census expansion, and optimization without a mathematical discriminator.

## 10.3 Better negative results

A failed conjecture is preserved with the exact reason it failed. This builds a map of the language's negative space and prevents future agents from rediscovering the same seductive mistake.

## 10.4 New publication-sized side questions

Even if Mäkelä remains unresolved, structural invariants such as deception depth, forced-corridor geometry, perfectness, or obstruction-scale width can become independent research notes if they support real theorems, sharp counterexamples, or reusable algorithms.

## 10.5 Better collaboration

Researchers can enter through a precise card rather than needing to understand the full project. A card states the object, the open question, what is known, what would refute the current rung, and what code or literature is relevant.

## 10.6 Better pedagogy

The same research objects translate honestly to Abelisk:

- Deception Depth: “You survived 12 more moves — but was there ever an infinite future?”
- Forced Corridors: “How many moves are forced before there is a real choice?”
- Trivialized G002: “A beautiful guess can die before we ever use a computer.”
- No Lonely Immortals: “If a path goes forever, can it be the only path nearby?”

This teaches conjecture versus theorem, finite versus infinite evidence, counterexamples, and the scientific value of being wrong.

# 11. What the process gives other researchers

The Garden method is potentially useful beyond this project because it makes several normally implicit steps explicit.

## 11.1 Separates a research programme from a benchmark

A broad conjecture need not be distorted into a finitely decidable statement. Instead, finite challenges become calibrated probes of the broader question.

## 11.2 Makes AI provenance intellectually useful

Rather than asking whether an AI “discovered” something, the record can show:

- which question the human valued;
- which formulations AI proposed;
- which model attacked them;
- which counterexample killed them;
- which literature theorem changed the question;
- which exact computation remains.

That is a more credible and reproducible account of AI-assisted mathematics.

## 11.3 Encourages adversarial collaboration

The authoring model and auditing model have different jobs. This reduces agreement cascades in which multiple models simply elaborate the same mistaken premise.

## 11.4 Preserves conceptual ancestry

A conjecture ladder records how a strong beautiful statement failed and what weaker or orthogonal question was born from the failure. This can be scientifically useful history, not just project management.

# 12. How to notice that “this could be a new conjecture”

The most important long-term benefit is a set of **conjecture triggers**: recurring situations that should make a researcher stop and formalize a structural question.

## Trigger 1 — Repeated failure with the same shape

If unrelated methods fail for what appears to be the same reason, do not merely add them to the Graveyard. Ask whether there is a common property X that would explain all failures.

This is the **post-mortem inversion**.

## Trigger 2 — A trivialization leaves a deeper quantifier

If an attractive question becomes trivial when formalized, ask which quantifier made it trivial.

Example:

“short reason for immediate death” is trivial;
“short reason for eventual extinction of the whole continuation tree” is not.

## Trigger 3 — A computation has enormous work but a small conceptual summary

When billions of cases collapse to a few obstruction types, ask whether the minimum summary size is itself an invariant.

This is where certificate complexity and obstruction width come from.

## Trigger 4 — A classical non-Abelian theorem has no obvious Abelian transfer

Do not merely ask “does the analogue hold?” Reconstruct the original proof and identify the exact step that equality-of-blocks provides and Parikh-equivalence may lack.

This is the route that produced G004.

## Trigger 5 — Two measurements look dual

If one programme measures depth of dead branches and another width of live branches, ask whether there is a topological or graph-theoretic statement above them.

This is how G001 / G003 naturally point toward G004.

## Trigger 6 — An optimization lemma describes mathematics better than speed

If an engineering optimization fails but introduces a clean invariant, detach the invariant from the optimization.

Safe-sleep may fail as a scheduler while its distance-to-danger state may still support G007.

## Trigger 7 — A counterexample needs many scales

If a simple small-certificate conjecture fails, do not immediately increase the bound. Ask whether “number of scales required” is the real object.

This is the seed of G005'.

## Trigger 8 — The finite statistic has a meaningful infinite limit

If a finite-k object stabilizes or grows, ask what topological statement would be forced if a uniform bound held.

Finite-k forced corridors potentially connect to isolated infinite solutions.

## Trigger 9 — Search behaviour and language behaviour diverge

Whenever a statement depends on DFS order, heuristics, or a particular seed, try to replace it with a traversal-invariant language object before calling it structure.

This correction was essential for G003.

## Trigger 10 — Literature kills the obvious version

Do not stop at “already known.” Ask what nearby quantity the theorem leaves uncontrolled.

Shur's growth-rate theorem kills a naive “extendable core has smaller exponential rate” conjecture, but leaves branching geometry and finer complexity available.

# 13. A repeatable conjecture-generation protocol

The following protocol should be reusable whenever a structural phenomenon is noticed.

## Step 1 — State the phenomenon without theory

One paragraph: what was observed, failed, or felt surprising?

## Step 2 — Negative-space prompt

Explicitly forbid the project's habitual answers: morphisms, record length, entropy extrapolation, regularity claims, or any other route that would make the response generic.

## Step 3 — Cross-pollinate

Borrow one framework from elsewhere — topology, Helly theory, percolation, symbolic dynamics, graph theory, proof complexity, statistical mechanics — but immediately ask which assumptions fail in the aa2f setting.

## Step 4 — Formalize the object before the conjecture

Define the graph, metric, certificate size, corridor, hitting-set width, or topological space first. Many bad conjectures disappear at this stage.

## Step 5 — Hostile first-principles attack

Try to prove it trivial or produce an elementary counterexample before any search.

## Step 6 — Targeted literature audit

Search not only the sentence of the conjecture but the underlying object and adjacent terminology. Record the closest theorem and the exact gap.

## Step 7 — Split Programme Question / Current Challenge

Only the challenge needs an immediate finite kill.

## Step 8 — Preregister the Cheapest Kill

Exact witness, exact budget, exact outcome semantics.

## Step 9 — Independent exact probe

Critical predicates receive a second implementation or verifier.

## Step 10 — Harvest the failure

If the conjecture dies, ask what new invariant the counterexample exposed before moving on.

This last step is essential. The Garden is not a cemetery of failed guesses; it is a mechanism for converting failed guesses into better objects.

# 14. Proposed project integration

## 14.1 Immediate state

The current Garden V0 draft should remain a repository-first research document rather than a public website feature until the mathematical cards are settled. The architecture is mature enough to retain; the portfolio is still evolving.

## 14.2 Recommended card hierarchy after hostile review

**Mature enough for the Garden core:**

- `G001 Deception Depth`
- `G003 Forced Corridors`

**Worked failure:**

- `G002 Death Certificates — TRIVIALIZED AT FORMALIZATION`

**Candidate centerpiece pending hostile literature/theorem audit:**

- `G004 No Lonely Immortals`

**Internal nursery / not yet public active conjectures:**

- `G005' Future Obstruction Width`
- `G006 Obstruction Turnover`
- `G007 Relevant-Scale Sparsity`

## 14.3 Why not publish every idea immediately

The Garden becomes scientifically weaker if every brainstorming output gets an ID and a webpage. A deliberately small active set preserves meaning. A useful rule is a WIP limit of roughly three to five active programme questions.

## 14.4 Website timing

The public Garden should be built only after at least one full lifecycle is real:

`FORMALIZED -> Current Challenge -> exact probe -> result -> interpretation / revision`.

The first page should show failures as prominently as survivors.

## 14.5 Repository authority map

A minimal authority map should remain:

- `MATH_CLAIMS.md` — established claims only.
- `OPEN_RESEARCH_QUESTIONS.md` — broad canonical open-question inventory.
- `NEGATIVE_RESULTS.md` — closed failed approaches / Graveyard.
- `docs/research/CONJECTURE_GARDEN_V0.md` or successor — active structural programmes and their finite challenges.
- `docs/plans/intake/` — preregistration drafts and implementation plans.

The Garden should link to these rather than duplicate their canonical contents.

# 15. Recommended research priority after the next Opus audit

The next hostile review should evaluate `G004 No Lonely Immortals` as the possible topological umbrella of the programme.

The audit should answer:

1. Is the statement already known for this exact Abelian avoidance language?
2. Is it an immediate consequence of a general theorem?
3. What is the actual mechanism in Currie–Shelton's ordinary power-free proof?
4. Which steps transfer to Abelian square avoidance and which fail?
5. Does the standard “nonempty implies continuum many solutions” argument hold independently, even if perfectness fails?
6. Is `G003 => G004` correct with exact quantifiers?
7. Can an isolated aa2f solution be ruled out by a simpler recurrence or extension argument?
8. If G004 remains genuinely open-looking, should it become the Garden's central programme card?

Only after this audit should the project decide whether the first Garden computation should be `G001-C20`, a `G003` finite-k challenge, or a probe designed specifically to expose the finite shadows of possible isolated immortals.

# 16. What not to do

The structural pivot will fail if it becomes a new form of uncontrolled activity. Therefore:

- Do not mass-generate conjectures.
- Do not assign novelty labels before literature review.
- Do not call a bounded survivor evidence of truth.
- Do not invent asymptotic ladders such as sqrt(n) or log(n) from attractive plots without a mechanism.
- Do not convert every engineering metric into a mathematical invariant.
- Do not optimize the record hunter unless a structural programme needs instrumentation.
- Do not resume Route-C enumeration merely because another L exists.
- Do not let pedagogy determine scientific priority.
- Do not hide trivialized or refuted questions.
- Do not treat chat-level “scratch” numerical claims as evidence until independently executed and preserved.

# 17. Proposed shared principles for Opus, Gemini, and the human researcher

The project will reach better consensus if every agent operates under the same compact principles:

1. **Structure before scale.** Ask what is being measured before increasing the bound.
2. **Author and attacker are different roles.**
3. **Formalize before computing.**
4. **Literature before novelty.**
5. **Programme Question is not the Current Challenge.**
6. **A cutoff is not extinction.**
7. **Finite survival is not truth.**
8. **A failed conjecture must pay rent by teaching something.**
9. **Every serious computation must distinguish mathematical worlds.**
10. **Only audited results cross the claim firewall.**

# 18. Research benefits in one page

For **Word Structures**, this methodology:

- turns a large collection of tools into structural instruments;
- focuses computation on discriminating questions;
- integrates old negative results rather than abandoning them;
- creates publishable side questions around extendability, branching, topology, and obstruction scales;
- gives the project a coherent research identity beyond a single record hunt;
- provides honest public explanation of human-AI collaboration;
- links research directly to Abelisk pedagogy without changing the mathematics.

For **researchers**, it offers:

- precise entry points into the project;
- explicit evidence and novelty status;
- reproducible finite challenges;
- a record of why attractive approaches failed;
- a natural way to compare computational, topological, and combinatorial descriptions of the same language;
- a model for using AI as generator, adversary, synthesizer, and implementation assistant without treating AI agreement as proof.

For **students and the public**, it shows that mathematics is not a sequence of correct answers. It is a cycle of guesses, definitions, counterexamples, proof attempts, and increasingly precise questions.

# 19. Final perspective

The deepest outcome of the recent brainstorming is not any single conjecture.

It is the recognition that the project can systematically convert four things into mathematics:

- **failed algorithms** into invariants;
- **failed conjectures** into better quantifiers;
- **old theorems** into transfer questions;
- **counterexamples** into structural specimens.

That is the research engine the Conjecture Garden should preserve.

The intended future moment is exactly this:

> A researcher notices that several difficult examples all fail in the same strange way, stops the computation, and says: **“Wait — this is not just an annoyance. This itself may be the conjecture.”**

If the project learns to recognize those moments reliably, Word Structures will have gained something more durable than another record or another closed parameter family: a method for discovering the right questions.

# References and literature anchors

The following references are included as anchors for the structural programme. They do not constitute a complete novelty review.

1. Currie, J. D. (1995). *On the structure and extendibility of k-power free words*. European Journal of Combinatorics 16(2), 111–124. DOI: 10.1016/0195-6698(95)90051-9.
2. Currie, J. D., & Shelton, R. O. (1996). *Cantor Sets and Dejean's Conjecture*. Journal of Automata, Languages and Combinatorics 1(2), 113–127.
3. Currie, J. D., & Shelton, R. O. (2003). *The set of k-power free words over Sigma is empty or perfect*. European Journal of Combinatorics 24(5), 573–580. DOI: 10.1016/S0195-6698(03)00044-1.
4. Keränen, V. (2010). *Combinatorics on Words — Suppression of Unfavorable Factors in Pattern Avoidance*. The Mathematica Journal 11. DOI: 10.3888/tmj.11.3-4.
5. Shur, A. M. (2008). *Comparing complexity functions of a language and its extendable part*. RAIRO — Theoretical Informatics and Applications 42(3), 647–655. DOI: 10.1051/ita:2008021.
6. Petrova, E. A., & Shur, A. M. (2021). *Branching Frequency and Markov Entropy of Repetition-Free Languages*. Developments in Language Theory 2021, LNCS, 328–341. Preprint: arXiv:2105.02750.
7. Petrova, E. A., & Shur, A. M. (2021). *Branching Densities of Cube-Free and Square-Free Words*. Algorithms 14(4), 126. DOI: 10.3390/a14040126.
8. Salo, V. (2021). *Trees in Positive Entropy Subshifts*. Axioms 10(2), 77. DOI: 10.3390/axioms10020077.
9. Fici, G., & Puzynina, S. (2022). *Abelian Combinatorics on Words: a Survey*. arXiv:2207.09937.

# Appendix A — Proposed Garden card template

**ID**  
**NAME**  
**STATUS**  
**CHILDLIKE QUESTION**  
**PROGRAMME QUESTION** — exact formal statement  
**CURRENT CHALLENGE** — exact bounded rung  
**CHEAPEST KILL** — explicit counterexample/witness specification  
**IF FOUND** — exact logical consequence  
**IF NOT FOUND** — exact bounded statement only  
**WHY IT MATTERS**  
**CURRENT EVIDENCE** — canonical evidence only  
**COUNTEREVIDENCE / KNOWN RISKS**  
**LITERATURE STATUS**  
**NOVELTY CLAIMED** — default false  
**RELATED CLAIMS / GRAVEYARD / QUESTIONS**  
**WHAT WE LEARNED** — required when refuted or trivialized  
**LAST REVIEWED**

# Appendix B — Minimal public status vocabulary

- `SEED` — worthwhile question not yet formalized.
- `FORMALIZED` — precise statement; no active experiment.
- `UNDER_ATTACK` — a preregistered Current Challenge is actively being tested.
- `SURVIVED_BOUNDED` — no counterexample within exact published bounds; no universal implication.
- `REFUTED` — statement is false by verified counterexample or proof.
- `TRIVIALIZED` — formalization revealed a trivial answer; not an active research problem.
- `PROMOTED` — an established result has passed project claim governance and has a canonical claim entry.

# Appendix C — Opus consensus checklist

Before the Garden is treated as the project's canonical structural programme, hostile review should explicitly agree or disagree with the following:

- The structural pivot is scientifically preferable to additional routine Route-C enumeration.
- Programme Question / Current Challenge is the right epistemic split.
- `G001` is meaningful without implying regularity or SFT structure.
- `G003` is correctly finite-k and traversal-independent.
- `G002` is correctly preserved as a trivialized worked failure.
- `G004` is either known, a corollary, false, or a genuinely nontrivial Abelian transfer question; literature status must be determined.
- The candidate implication `G003 => G004` is either proved or rejected with exact quantifiers.
- `G005'–G007` remain internal seeds until exact reproduction and literature review.
- Public Garden work should wait until one complete research lifecycle has been demonstrated.
- Claim governance remains unchanged.
