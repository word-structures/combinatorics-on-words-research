# Adversarial Manual for AI-Assisted Mathematical Research

**Status:** General research-process guidance  
**Scope:** AI-assisted mathematical discovery, computational mathematics, theorem formation, falsification, replay, interpretation, and novelty assessment  
**Purpose:** Prevent persuasive narratives, attractive patterns, computational success, or AI confidence from being mistaken for mathematical understanding, generality, or novelty.

---

## 1. Core principle

AI-assisted research should optimize for **survival under attack**, not for how quickly a plausible story can be assembled around a result.

The default research sequence is:

**observation → written falsifiers → kill tests → independent replay → interpretation → generalization → novelty review**

Do not silently reorder this as:

**observation → interpretation → supporting tests**

The second order encourages confirmation bias, narrative lock-in, and theorem-shaped overfitting.

---

## 2. Distrust persuasion, including AI persuasion

A fluent AI can produce a coherent explanation before the mathematics warrants one.

Therefore:

- rhetorical confidence is not evidence;
- aesthetic simplicity is not evidence;
- repeated positive experiments are not automatically evidence for the proposed mechanism;
- a result becoming easier to narrate does not make it more general;
- a result becoming harder to narrate does not make it less true;
- the process must reward the discovery of errors, failed mechanisms, and scope reductions.

An AI assistant should be judged partly by whether it is willing to destroy its own previous interpretation.

A good research turn may end with:

> The exact result survives, but the proposed explanation fails.

That is progress.

---

## 3. Keep epistemic statuses separate

Do not compress distinct levels of knowledge into a single word such as “result”.

### EXACT FACT

A statement established by a proof, exact calculation, certificate, or other reproducible exact route.

This says the statement is true in the stated scope.

It does **not** imply:
- generality;
- structural explanation;
- importance;
- novelty.

### STRUCTURAL OBSERVATION

Exact or high-confidence data exhibits a pattern that appears mathematically organized.

Examples:
- a kernel is localized to certain coordinates;
- several exact relations have small support;
- multiple instances share the same rank defect;
- a response type appears controlled by bounded local data.

This is stronger than an anecdotal pattern but weaker than a theorem explaining the pattern.

### HYPOTHESIS

A proposed mechanism or general rule that makes falsifiable predictions.

A useful hypothesis must say not only what would support it, but what would kill it.

### GENERAL THEOREM

A statement proved at the claimed level of generality without relying on instance-specific rank fitting, coefficient fitting, or post-hoc selection.

A theorem should explain why the observed instance behaves as it does, rather than merely reproduce its numerical outcome.

### NOVELTY UNASSESSED

Default status for every potentially new mathematical result produced in an AI-assisted workflow.

Correctness and novelty are separate questions.

### NOVELTY REVIEWED

Use only after documented adversarial prior-art review.

Even then, do not treat historical priority as mathematically proved.

---

## 4. Write falsifiers before explanation-building

When a promising mechanism appears, record its kill conditions **before** designing the next supporting experiment.

A falsifier should be concrete.

Bad:

> See whether the mechanism still looks plausible.

Good:

> If the proposed pairwise mechanism is correct, the exact decomposition must close by order 2. Any required order greater than 2 falsifies this mechanism.

Good:

> If the claimed local descriptor is sufficient, states agreeing on that descriptor must have identical canonical response types. One counterexample kills sufficiency.

Good:

> If the phenomenon is caused by startup or boundary effects, it must disappear after restriction to a closed saturated recurrent regime.

Preregistered falsifiers protect the project from moving the goalposts after the result is known.

---

## 5. Run kill tests before rescue tests

After a hypothesis is stated, the next question is not:

> What experiment would make this look better?

It is:

> What is the cheapest exact experiment that could kill it?

Prioritize tests that attack:

- necessity;
- sufficiency;
- invariance;
- closure;
- locality;
- independence from startup/boundary effects;
- cross-instance transfer;
- dependence on fitted coefficients;
- dependence on a particular quotient or representation.

If a mechanism fails, record the failure explicitly.

Do not immediately replace it with a nearby story and present the sequence as uninterrupted progress.

---

## 6. Preserve negative results

A falsified explanation is research evidence.

Do not erase it by rewriting the current story as though the failed interpretation never existed.

Record:

- what was believed;
- why it was plausible;
- the kill criterion;
- the exact counterevidence;
- what survives after demotion.

Negative results prevent repeated rediscovery of dead ends and reveal which parts of an observed phenomenon are genuinely robust.

A healthy project should be able to say:

> The fact survived; the mechanism did not.

---

## 7. Audit object identity before interpreting numbers

Many serious computational errors are not arithmetic errors. They are **semantic object mismatches**.

Before comparing ranks, kernels, SCCs, quotients, recurrent cores, or state counts, verify that the compared objects are actually the same mathematical object.

Typical dangerous confusions include:

- raw-state cyclic core vs. raw members represented by cyclic quotient classes;
- induced subgraph vs. a closed subsystem;
- recurrent states vs. states belonging to recurrent quotient classes;
- literal states vs. quotient states;
- weighted quotient membership vs. raw graph membership;
- saturated regime vs. mixed startup/saturated regime;
- full future semantics vs. persistent future semantics.

Every decision-gating number should carry a noun.

Prefer:

> rational rank of the canonical response-family matrix on the closed saturated raw-state system

over:

> rank = 850.

If two selections have different semantics, never use the same informal label for both.

---

## 8. Closure must be checked, not assumed

Restricting a dynamical system to a visually natural subset can change the dynamics if transitions leave that subset.

Before using a subset as a standalone counting system, verify closure:

**if x is in S and x → y is legal, then y is also in S.**

If the subset is not closed, an induced subgraph may delete legal continuations and therefore alter future-count semantics.

When closure fails, either:

- use the full system;
- construct a mathematically justified quotient/restriction;
- or state explicitly that the induced system answers a different question.

---

## 9. Independent replay should be meaningfully independent

“Ran it twice” is not independent verification.

When feasible, vary at least one major axis:

- implementation;
- algorithm;
- data representation;
- mathematical formulation;
- programming language;
- exact arithmetic route;
- graph algorithm;
- checker;
- canonicalization route.

For important results, prefer a second path that shares as little code as practical with the discovery path.

Examples:

- fast affine builder vs. slow literal string-level checker;
- one SCC implementation vs. an independently written SCC implementation;
- modular rank discovery vs. exact rational relation verification;
- optimized checker vs. brute-force reference on a reduced domain.

Independent replay is especially important after a surprising or aesthetically attractive result.

---

## 10. Exact arithmetic and modular evidence must not be conflated

Modular computation is useful for discovery and lower bounds, but its epistemic role must be explicit.

Distinguish:

- exact integer/rational proof;
- modular lower bound;
- CRT reconstruction;
- exact residual verification after reconstruction;
- probabilistic evidence;
- floating-point evidence.

A common sound pattern is:

1. discover rank or relations modulo several primes;
2. reconstruct candidate rational relations;
3. verify those relations against the exact integer/rational object;
4. combine an exact upper bound with a modular lower bound;
5. conclude equality.

The final report must state which step provides which logical direction.

---

## 11. Do not fit a theorem to beautiful coefficients

Small-support or attractive exact relations are clues, not explanations.

Do not infer a mechanism merely because coefficients look simple.

Conversely, ugly coefficients do not refute the existence of a structural theorem.

If an identity with coefficients such as

`47, 9, -1, -9`

appears, the correct question is not:

> What theorem could produce these coefficients?

The safer question is:

> What coefficient-free structural statement would predict that a relation of this type must exist?

Generalization should be driven by invariant structure, not by reverse-engineering one fitted identity.

---

## 12. Prefer coefficient-free predictions across instances

Before opening a new test instance, state what the proposed mechanism predicts **without using coefficients learned from the old instance**.

Examples:

- the kernel should remain confined to older coordinates;
- bounded boundary information should determine the one-step response type;
- matched random partitions should not reproduce the structured deficiency;
- a certain type of relation should exist, without predicting fitted numerical coefficients;
- the same factorization should occur at a specified abstraction level.

Then test the prediction in a genuinely different instance.

This is much stronger than finding a second dataset and tuning a new explanation after seeing it.

---

## 13. Cross-instance replication is a theorem gate, not decoration

A mechanism observed in one exact system may still be an instance-specific accident.

Before promoting a structural mechanism toward theorem status, ask:

- Does it survive a change of parameter?
- Does it survive a change of language or constraint family?
- Does it survive a different recurrent component?
- Does it survive removal of startup effects?
- Does it survive a different representation?
- Does it survive an independently generated instance?

The purpose is not to accumulate similar examples indefinitely.

The purpose is to force the proposed mechanism to make a prediction outside the environment where it was invented.

---

## 14. Use matched controls to separate structure from generic linear algebra

Many rank, observability, compression, and recovery phenomena arise generically.

A structured system should not receive a structural interpretation until appropriate controls are tested.

Useful controls include:

- random partitions with the same number of families;
- random partitions with the same family-size distribution;
- generic random linear measurements with matched dimensions;
- scrambled descriptors preserving coarse combinatorial statistics;
- alternative natural descriptors.

A stronger non-genericity signal is not merely:

> the structured measurement has rank defect.

It is:

> the structured measurement behaves systematically differently from matched controls.

Controls must be matched to the claim being tested.

---

## 15. Distinguish static information from dynamically recoverable information

A measurement can lose information at one instant while the dynamics later reveal the missing directions.

Therefore distinguish:

- static rank;
- future-space rank;
- persistent rank;
- one-step recovered rank;
- multi-step observability;
- exact future-count equivalence;
- structural/transition equivalence.

Do not infer permanent loss of information from a static rank defect.

Do not infer structural equivalence from equality of current responses.

When information recovers under dynamics, the theorem-level question should be:

> What structural property forces the missing directions to become observable?

not merely:

> At what depth does the rank become full?

---

## 16. Separate response statistics from complete response types

Aggregate statistics can hide structure.

When testing a local mechanism, distinguish:

- whether a particular continuation is legal;
- number of legal continuations;
- histogram of legal blocks;
- complete canonical set of legal continuations;
- multiset or histogram of complete response types.

If a mechanism fails at the level of individual obstruction reasons but succeeds at the level of complete canonical response sets, the stronger object may be the correct semantic unit.

Do not reduce to weaker summaries merely because they are easier to analyze.

---

## 17. Canonicalization is mathematics, not housekeeping

When symmetries are present, canonicalization changes the object being compared.

Document:

- the symmetry group;
- the chosen gauge/canonical representative;
- how state data transform;
- how continuation blocks transform;
- whether canonicalization is applied consistently to both state and response.

A canonical response type is meaningful only if the same symmetry action is applied coherently to the state and all outgoing continuations.

---

## 18. Localization is an observation until its cause is proved

If a kernel, defect, or ambiguity is localized to certain coordinates, record that exactly.

But distinguish:

> all observed kernel generators can be chosen inside a specified coordinate fiber

from:

> those coordinates are the causal source of the kernel.

The first can be an exact linear-algebraic fact.

The second is a structural explanation requiring proof.

Do not convert localization into causation by prose.

---

## 19. Mechanism promotion ladder

A candidate mechanism should move through explicit stages:

### Stage A — observed pattern
Exact data suggests a structure.

### Stage B — falsifiable hypothesis
State a coefficient-free mechanism and written kill criteria.

### Stage C — local kill tests
Attack the simplest competing explanations.

### Stage D — independent replay
Reproduce the underlying exact fact through an independent route.

### Stage E — cross-instance prediction
Write the prediction before examining the next instance.

### Stage F — cross-instance survival
The mechanism survives a meaningfully different system.

### Stage G — general proof
Prove the mechanism without fitting the proof to the original numerical instance.

Only Stage G supports a general-theorem claim.

---

## 20. Do not continuously re-rate a paper after every positive experiment

Frequent narrative re-scoring creates pressure to interpret every positive computation as progress toward publication.

Instead, define research gates.

Change the overall assessment only when a gate closes.

Examples:

- exact fact independently reproduced;
- artifact/object identity audit passed;
- main alternative explanation killed;
- cross-instance prediction survived;
- general proof obtained;
- novelty review completed.

A failed mechanism may improve the research process without increasing theorem readiness.

---

## 21. AI-originated novelty has uncertain provenance

An AI-generated theorem or mechanism may be:

- independently derived;
- a rediscovery of known mathematics;
- equivalent to a known theorem stated differently;
- influenced by mathematical structure encountered during training;
- a combination of known ingredients whose source is not recoverable.

The model usually cannot reliably distinguish these possibilities.

Therefore:

> **AI may propose novelty. AI may not certify its own novelty.**

And:

> **Proof can be exact. Novelty can only be evidence-backed.**

Absence of a citation is not evidence of novelty.

Failure of the model to recall a source is not evidence of novelty.

Agreement among multiple models is not proof of independent provenance.

---

## 22. Novelty review must be adversarial

For an important theorem, do not ask only:

> Can you find related work?

Also ask:

> Assume this theorem is already known. Find the strongest result that could subsume it.

Search:

- exact terminology;
- synonyms;
- equivalent mathematical formulations;
- stronger theorems;
- adjacent fields;
- older terminology;
- primary-source bibliographies;
- forward/backward citation chains.

For high-stakes novelty claims, seek human field expertise when feasible.

Passing a novelty audit reduces risk.

It does not prove historical priority.

---

## 23. Do not anthropomorphize provenance failures

The relevant danger is not primarily deliberate deception.

Prefer:

> The model may reproduce or reconstruct prior mathematical structure without recoverable provenance.

over:

> The model copied this and hid the source.

Likewise, do not claim independent intellectual discovery merely because the derivation in the current session does not cite prior work.

---

## 24. Preserve the distinction between truth, mechanism, generality, importance, and novelty

These are separate axes.

A result can be:

- true but unexplained;
- explained but unimportant;
- important but already known;
- new but narrow;
- computationally exact but not yet generalized.

Never use one axis as evidence for another.

| Axis | Question |
|---|---|
| Truth | Is the statement correct? |
| Mechanism | Do we understand why it is true? |
| Generality | Does it survive beyond the fitted instance? |
| Importance | Does it answer a meaningful mathematical question? |
| Novelty | Is it absent from known prior literature to the best of documented search? |

---

## 25. Human readability is a consolidation requirement, not a discovery speed limit

Do not force every exploratory computation to become publication-quality exposition immediately.

During discovery, preserve at least:

- the exact object;
- the claim;
- provenance;
- a minimal witness;
- the suspected mechanism;
- the falsifier;
- a possible human-scale explanation.

Full visualization, terminology cleanup, proof maps, and reader-facing exposition can occur later.

The principle is:

> **Discover at machine speed. Consolidate at human depth.**

But no important result should remain permanently trapped in AI-only semantics.

---

## 26. Every major result should leave an audit trail

For a decision-gating result, preserve enough information to answer:

- What exact object was computed?
- Which code or artifact produced it?
- Which mathematical semantics does that object represent?
- Was the subsystem closed?
- Was the result exact, modular, probabilistic, or heuristic?
- What independent replay exists?
- What hypothesis was being tested?
- What would have falsified it?
- What negative tests were run?
- Which interpretations were killed?
- What remains only conjectural?
- What novelty status applies?

The goal is not bureaucracy.

The goal is to make later reconstruction possible without trusting narrative memory.

---

## 27. Preferred language after a mechanism fails

Use direct demotion language.

Examples:

> The exact rank statement survives, but the proposed pairwise-overlap mechanism is falsified.

> The earlier interpretation depended on a different state selection and does not apply to the corrected object.

> The phenomenon remains exact; its structural explanation is unresolved.

> This result is interesting evidence for the candidate mechanism, not yet a theorem.

Avoid:

> The mechanism was mostly right.

unless a precise surviving subclaim is stated.

---

## 28. Preferred language after a mechanism survives

Do not jump directly to “the theorem.”

Use:

- survived the preregistered kill test;
- independently reproduced;
- replicated in a second instance;
- consistent with the candidate mechanism;
- now merits a general proof attempt.

Only after proof:

- theorem.

---

## 29. Research-agent behavior contract

An AI research agent working under this manual should:

1. state the exact object before interpreting it;
2. separate fact from explanation;
3. write falsifiers for new mechanisms;
4. seek disconfirming tests first;
5. report semantic object mismatches immediately;
6. preserve negative results;
7. avoid theorem-fitting to numerical coefficients;
8. prefer independent replay for important facts;
9. distinguish modular evidence from exact proof;
10. use matched controls where generic effects are plausible;
11. make cross-instance predictions before seeing the next instance;
12. avoid escalating paper-quality or novelty ratings after each positive result;
13. keep novelty unassessed until adversarial literature review;
14. admit uncertainty without replacing it with persuasive prose;
15. explicitly retract or demote prior interpretations when evidence requires it.

---

## 30. Compact decision protocol

When a new exciting result appears, ask in this order:

### Q1 — What exactly is true?
Write the smallest precise statement supported by the current evidence.

### Q2 — What exact object does the statement refer to?
Check raw/quotient/recurrent/saturated/weighted/persistent semantics.

### Q3 — What would kill the proposed explanation?
Write falsifiers before more tests.

### Q4 — Can the fact be independently replayed?
Use a meaningfully different route if the result matters.

### Q5 — Is the phenomenon generic?
Run matched controls or alternative descriptors when appropriate.

### Q6 — Does the mechanism make a coefficient-free cross-instance prediction?
Write it before opening the new instance.

### Q7 — Did the prediction survive?
If no, demote the mechanism. If yes, attempt general proof.

### Q8 — Is the theorem actually proved?
Do not substitute rank fitting or finite replication for a general theorem.

### Q9 — Is novelty assessed?
If not, say so.

### Q10 — Can a human understand what the theorem is about?
Before publication, build the semantic and visual bridge.

---

## 31. Failure cases this manual is designed to prevent

### Beautiful relation trap
A small-support exact identity is found and immediately interpreted as a deep mechanism.

**Response:** treat it as a clue; preregister coefficient-free predictions.

### Wrong-object trap
Two related but nonidentical recurrent, cyclic, quotient, or weighted selections are treated as the same object.

**Response:** object-identity audit before interpretation.

### Induced-subgraph trap
A non-closed subset is used as if it preserved future counting.

**Response:** prove closure or state that the semantics changed.

### Positive-test spiral
Every new experiment is chosen to strengthen the current story.

**Response:** write kill tests first.

### Narrative inertia
A mechanism fails but the paper story is adjusted so the result still sounds like uninterrupted progress.

**Response:** preserve explicit demotion and negative result.

### Genericity trap
A rank or observability result is interpreted as special structure although matched controls behave the same way.

**Response:** matched controls.

### Static-loss trap
Static measurement deficiency is interpreted as permanent information loss.

**Response:** analyze dynamic observability separately.

### AI novelty trap
The model finds no citation and calls the theorem new.

**Response:** novelty remains unassessed until adversarial literature review.

### Repeated-model-consensus trap
Several AI systems agree on an interpretation or novelty claim.

**Response:** correlated models are not independent epistemic witnesses.

### Human-lag trap
Research is slowed until every discovery has a polished visualization.

**Response:** preserve human-understanding seeds during discovery; consolidate fully before publication.

---

## 32. Project maxims

> **Observation is not mechanism.**

> **Replication is not generality.**

> **Exactness is not novelty.**

> **AI confidence is not evidence.**

> **A failed explanation is useful evidence.**

> **Write the falsifier before falling in love with the theorem.**

---

## 33. How to integrate this into an existing repository

This is a **general manual**, not a demand to duplicate all of its text across governance files.

When mapping it into an existing project:

1. inspect the current governance;
2. identify which principles already exist;
3. strengthen existing rules instead of creating parallel authorities;
4. keep one canonical home for each process concept;
5. add only short operational summaries to agent instructions;
6. connect the principles to existing lifecycle gates;
7. avoid project-specific numbers, paper-specific artifacts, or temporary hypotheses in permanent governance;
8. preserve established claim ledgers, literature ledgers, artifact protocols, and frozen-paper rules;
9. do not renumber mature lifecycle gates merely to accommodate this manual;
10. keep the final governance proportional: strong enough to change behavior, light enough to be used.

The goal is not to create more documentation.

The goal is to make the research process reliably self-correcting.
