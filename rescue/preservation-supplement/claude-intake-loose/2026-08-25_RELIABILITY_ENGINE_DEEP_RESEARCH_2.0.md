# Reliability Engine — Deep Research 2.0
## A Math-Specific Research Assurance Overlay for Human–AI Open-Ended Research

**Prepared:** 2026-08-25  
**Project:** `word-structures/combinatorics-on-words-research`  
**Repository state used for project grounding:** `main` at merge commit `0c0b45b26985c75bbc6b71da02b19efe0084e6dc` (PR #56 merged 2026-08-25)  
**Mathematical testbed:** combinatorics on words / Abelian-square research only  
**Methodology novelty status:** **NOT_ESTABLISHED**  
**Broad architecture novelty risk:** **HIGH OVERLAP WITH PRIOR ART**  
**Practical research-utility assessment:** **STRONG CANDIDATE**  
**Recommended next implementation:** **small, math-specific assurance overlay — not a general AI-science operating system**

---

## 0. Why this document exists

The first Reliability Engine intake was written before a crucial set of events and before a decisive 2026 literature update had been fully incorporated. It correctly recognized that the project had already developed a proto-assurance system around claims, evidence, independent checks, preregistration, Git history, human gates, and correction records. It also proposed that the potentially distinctive contribution might be the integration of those elements into a longitudinal, claim-centric human–AI research methodology.

Deep Research 2.0 is a stricter reassessment.

Two things changed.

First, the project generated a real failure-rich episode around the profile-response soft-penalty work. The episode did not merely produce a scientific observation. It exposed multiple process failures in code, interpretation, derived artifacts, execution timing, provenance, and governance, while also showing that a scientific observation can survive those process failures.

Second, a fast-moving 2026 literature now contains several systems and papers that are substantially closer to the proposed Reliability Engine than the first intake assumed. Most importantly, **ResearchLoop** explicitly describes an **evidence-gated, repository-backed control plane** with research questions, durable evidence objects, claim ledgers, state transitions, blockers, and gate-bounded claim admission. Other 2026 work independently develops Git sealing, hash-bound provenance, red-line gates, cross-model role separation, prospective process metrics, claim-level auditability, auditable question certificates, spec-driven epistemic control, durable agent-community records, and claim accountability.

This changes the novelty picture materially.

The correct response is not to abandon the Reliability Engine idea. It is to narrow it.

> **Deep Research 2.0 conclusion:**  
> Do not build or claim another general “AI research control plane.”  
> Build a small **mathematics-specific assurance overlay** whose value lies in exact epistemic semantics for mathematical claims, independence, formal/informal statement fidelity, holdout contamination, computational evidence, defeaters, human understanding, and prospective evaluation inside a real open-ended mathematics programme.

A useful motto survives:

> **Trust is not assigned to an AI. Trust is accumulated through independent evidence.**

A stronger technical motto is:

> **Make epistemic state executable — but only where executable state actually improves research.**

---

# 1. Evidence policy and limits of this review

This document combines three evidence classes:

1. **Project-internal evidence** from the public repository and PR #56 history.
2. **Primary or official external sources opened during the 2026-08-25 audit**, including arXiv full text/abstracts, publisher pages, standards bodies, NASA material, Nature articles, PLOS articles, W3C, SLSA, and USENIX.
3. **Design inferences** made from those sources and from the project’s observed failures.

This is **not** a canonical mathematical claims document. It must not modify or supersede `MATH_CLAIMS.md`, `CURRENT_FOCUS.md`, `AGENTS.md`, or `EPISTEMIC_DISCIPLINE.md`.

A citation being opened for this research synthesis does **not** automatically grant any repository-specific `LEVEL_2_VERIFIED_SOURCE` status. If a source later supports a canonical repository claim, it must be reopened and handled under the repository’s own citation protocol.

The review also has a major epistemic limitation:

> This is not an exhaustive systematic review of every research-assurance, reproducibility, scientific-workflow, AI-governance, formal-methods, or multi-agent paper.

It is a targeted deep research audit designed to answer a narrower design question:

> **What should we build next, what should we explicitly not claim as novel, and what narrower methodology hypotheses remain worth testing?**

---

# 2. Executive verdict

## 2.1 The strongest conclusion

The Reliability Engine is **worth building**, but its research framing must change.

The broad claim

> “a repository-backed, evidence-gated, claim-ledger-based control plane for AI-assisted research”

is no longer a credible novelty target. ResearchLoop is already extremely close to that formulation, and multiple 2026 systems overlap with the surrounding features.

The stronger and more defensible position is:

> **Reliability Engine is a domain-specific research assurance overlay for open-ended mathematics, tested prospectively in a real mathematical research programme.**

Its purpose is not to make AI agents smarter.

Its purpose is to prevent plausible work from becoming an overclaimed mathematical conclusion without sufficient evidence.

## 2.2 Status card

| Question | Deep Research 2.0 verdict |
|---|---|
| Is the general idea of claims + evidence + gates + Git provenance new? | **No / clearly prefigured.** |
| Is a repository-backed research “control plane” new? | **No / ResearchLoop is direct prior art.** |
| Are preregistration, blinding, provenance, failure logs, assurance cases, IV&V, reproducibility, formal checking, and role separation individually new? | **No.** |
| Is “multiple agents checking each other” a sufficient reliability principle? | **No.** Correlated failures and evaluator biases make this unsafe. |
| Is a claim-centric research assurance system still useful? | **Yes.** Strongly. |
| Is there a plausible narrower math-specific research contribution? | **Yes, but NOT_ESTABLISHED.** |
| Should we build a large framework now? | **No.** |
| Should we build a small v0.1 around real observed failures? | **Yes.** |
| Can historical failures prove that the engine works? | **No.** They are design data, not evaluation data. |
| What is the strongest future evidence? | **Prospective, preregistered evaluation on later research episodes plus external expert review.** |

---

# 3. The central revision from Reliability Engine 1.0

The first intake’s core insight was directionally good:

> the project may be distinctive not because of one component, but because it integrates rigorous research practices into a persistent human–AI mathematics workflow.

Deep Research 2.0 retains the integration idea but lowers its novelty confidence because the 2026 literature is much closer than expected.

## 3.1 The “ResearchLoop shock”

Xia and Wang’s **ResearchLoop: An Evidence-Gated Control Plane for AI-Assisted Research** (2026) describes:

- durable research questions;
- task contracts;
- evidence objects;
- claim ledgers;
- closeouts;
- paper bindings;
- a repository-backed runtime;
- state transitions;
- evidence-gated claim admission;
- blocked, contradicted, and forbidden claim states;
- blocker preservation;
- version boundaries;
- a control-plane abstraction external to workers.

This overlaps not merely at the level of general philosophy. It overlaps at the level of **architecture and vocabulary**.

ResearchLoop explicitly argues that the problem is not only hallucination but **state-management failure**: artifacts, research questions, and paper claims drift out of synchronization. It further argues that the control state must live outside the agent so that narrative control, ephemeral memory, and versionless internal checklists do not become the truth source.

That is extremely close to the proposed Reliability Engine.

Therefore:

> **BROAD_CONTROL_PLANE_NOVELTY = NOT A VIABLE CLAIM**

This is a useful finding, not a setback. It prevents us from spending months rediscovering a framework class that is already being actively developed.

## 3.2 Auditable AI research writing is also close

Zhou and Yu’s **Auditable AI-Assisted Research Writing** (2026) specifies:

- Git sealing;
- anchor lineage;
- hash-bound provenance;
- red-line gates;
- logged refusals;
- cross-model role separation;
- programmatic assembly from registered sources;
- preregistered metric cards;
- explicit blind spots and evidential standing;
- prospective and retrospective cases;
- frozen stopping rules that can halt work against operator preference.

Again, several features we independently wanted are already present.

This especially weakens novelty claims around:

- “Git-backed research audit trails”;
- “cross-model role separation”;
- “preregistered process metrics”;
- “gates that can block human operators”;
- “hash-bound provenance.”

## 3.3 Claim-level auditability is a live 2026 research area

Rasheed et al. propose **claim-level auditability** as a first-class target for deep research agents, with provenance coverage, provenance soundness, contradiction transparency, and audit effort.

Van Zoonen, Tursunbayeva, and Morgan-Thomas argue that **the right unit of governance is the claim, not the tool**, and that a named human should be able to reconstruct and defend a scholarly claim.

FirstResearch introduces an auditable **Research Question Certificate** with definitions, assumptions, mechanism, falsifiable hypothesis, decisive test, and failure update rule.

Spec-Driven AI for Empirical Research treats hypotheses, data, code, artifacts, claims, and AI actions as auditable objects in a staged workflow with human gates.

Symposium proposes durable, immutable histories of agent-driven research with structured claims, fine-grained evidence, assumptions, and explicit admissibility declarations.

The field is converging.

The correct strategic move is **specialization**, not feature accumulation.

---

# 4. What the repository already does unusually well

The project does not start from zero.

At `main` after PR #56, the repository already contains a strong methodological substrate.

`EPISTEMIC_DISCIPLINE.md` already codifies:

- primary-source verification before trust;
- scope precision;
- finite computation versus infinite claim separation;
- heuristic versus exact separation;
- independent re-verification;
- explicit dimensions of independence:
  - derivation,
  - algorithm,
  - data representation,
  - input generation,
  - language,
  - runtime,
  - author;
- self-assessment discipline;
- numeric drift checks;
- verification-boundary versus claim-boundary separation;
- immediate capture versus claim acceptance.

`AGENTS.md` adds:

- cite-before-code;
- explicit verification levels;
- calibrated language;
- immediate provenance;
- human approval before canonical claim edits;
- exclusive rights for the mathematical claims ledger;
- raw-log requirements;
- interface contracts before code;
- structured closing reports;
- mandatory pre-commit drift checking;
- independent post-checks;
- file-placement rules;
- restrictions on automatic Git operations.

These are not cosmetic process rules. They already represent a primitive assurance system.

The engineering opportunity is therefore:

> **Do not replace this substrate. Encode the high-value parts that are currently implicit, manually checked, or easy to forget.**

---

# 5. PR #56 as a real assurance case study

PR #56 is valuable because it demonstrates the exact failure mode the engine must handle:

> **Scientific correctness, evidentiary sufficiency, provenance quality, epistemic status, and governance compliance are different dimensions.**

A single scalar such as “trusted,” “verified,” or “passed” cannot represent the episode.

## 5.1 Failure sequence

The profile-response soft-engine line accumulated several distinct failures and corrections:

| Event | Failure class | Scientific observation necessarily false? | Process problem real? |
|---|---|---:|---:|
| Incorrect asymptotic variance formula in an earlier run | mathematical-method error | Yes for affected output | Yes |
| Target-index bug | implementation/specification error | Yes for affected output | Yes |
| Hard-coded `SUCCESS` behavior | evaluation/gate contamination | Not necessarily all values | Yes |
| SCC ranking/interpretation by wrong criterion | structural-analysis error | Affected interpretation | Yes |
| Finite `exp(-epsilon)>0` edges thresholded away | model/implementation mismatch | Affected support analysis | Yes |
| Code repaired but generated report remained stale | stale derived artifact | Not necessarily | Yes |
| Human authorized exploratory sweep before preregistration freeze | preregistration-state failure | No | Yes |
| Derived Markdown contained `${item.h}` placeholders | corrupted derived presentation | Raw JSON may remain valid | Yes |
| Method description in derived report was inaccurate | reporting/evidence mismatch | Raw evidence may remain valid | Yes |
| Early description invoked a “structural phase transition” | interpretation overreach | Crossing may remain real | Yes |
| Initiating interaction was described with uncertain narrative provenance | provenance-risk event | No | Yes |
| A later cleanup commit used `--no-verify` | governance exception | No | Yes |

The important scientific lesson is not “the system failed.”

The more precise lesson is:

> **Different controls caught different classes of failure, and the eventual research state had to preserve both the surviving observation and the failed process history.**

## 5.2 Why this matters for engine design

A good engine must be able to represent:

```text
OBSERVATION_STATUS = SURVIVES_CURRENT_CHECKS
PREREGISTRATION_STATUS = INVALID_FOR_CONFIRMATORY_USE
DERIVED_PRESENTATION_STATUS = CORRUPTED
RAW_EVIDENCE_STATUS = PRESERVED
MECHANISM_INTERPRETATION_STATUS = RETRACTED/SUPERSEDED
NOVELTY_STATUS = NOT_ESTABLISHED
HOLDOUT_STATUS = UNEXPOSED
GOVERNANCE_EXCEPTION = RECORDED
```

All of those can be true simultaneously.

That is the core reason the Reliability Engine should use **multidimensional state**, not a single confidence score.

---

# 6. Literature foundation I — assurance cases and defeaters

## 6.1 Assurance 2.0

Bloomfield and Rushby’s Assurance 2.0 work is a strong conceptual ancestor.

Its key contribution for this project is the shift from merely collecting supportive evidence to building an explicit argument around:

- claims;
- reasoning;
- evidence;
- assumptions;
- defeaters;
- counterevidence;
- residual doubts.

The 2024 work on **Defeaters and Eliminative Argumentation in Assurance 2.0** is particularly relevant. It emphasizes vigorous skeptical challenge because human judgment is fallible and confirmation-prone.

This maps naturally to mathematical research.

A candidate theorem should not merely accumulate:

- computational agreement;
- a plausible derivation;
- an AI reviewer saying “looks correct.”

It should carry explicit doubts:

```text
D1: Is the mathematical object actually the intended one?
D2: Does the independent checker share the same derivation error?
D3: Is the result finite but being narrated as infinite?
D4: Did the experiment design change after data exposure?
D5: Is the literature novelty search incomplete?
D6: Is the formal statement faithful to the natural-language theorem?
```

The engine should not treat open defeaters as embarrassing. They are first-class research state.

## 6.2 SACM and GSN

Structured assurance cases are also standardized.

OMG’s Structured Assurance Case Metamodel (SACM) provides a machine-readable framework for claims, evidence, and argument structures.

This means that a future full-scale research assurance ontology should probably **interoperate with or learn from SACM**, rather than invent a bespoke semantic universe.

However, v0.1 should not implement SACM or RDF.

Reason:

> standards-complete semantics would add large implementation cost before the project has demonstrated that its own minimal claim states are stable.

Recommendation:

- use plain YAML/JSON now;
- make identifiers and relationships clean enough that later export is possible;
- avoid prematurely committing to a complex ontology.

---

# 7. Literature foundation II — IV&V and the myth of independent agents

NASA’s IV&V tradition distinguishes verification from validation and defines independence across technical, managerial, and financial dimensions.

The important transfer is conceptual:

> independence is not “a second person/model looked at it.”

The project already discovered this from experience and encoded independence axes in `EPISTEMIC_DISCIPLINE.md`.

Knight and Leveson’s classic multiversion-programming experiment makes the danger sharper. Twenty-seven independently developed program versions were tested on a million cases; correlated failures occurred substantially more often than naive independence assumptions would predict.

The modern AI analogue is immediate:

```text
GPT instance A agrees
GPT instance B agrees
Claude agrees
Gemini agrees
```

does not automatically equal four independent pieces of evidence.

Possible shared failure causes include:

- common training corpora;
- common textbook conventions;
- common problem statement;
- common incorrect formalization;
- shared source set;
- shared test oracle;
- shared code generator;
- shared prompt framing;
- shared human hints;
- shared numerical baseline.

Therefore, Reliability Engine must track an **independence fingerprint**, not agent count.

---

# 8. Literature foundation III — reproducibility, provenance, and attestation

## 8.1 Reproducible computational research

Sandve et al.’s reproducibility rules directly anticipate several project failures:

- track how every result was produced;
- avoid undocumented manual steps;
- archive exact program versions;
- version-control custom scripts;
- retain intermediates;
- retain raw data;
- connect textual statements to underlying results.

The PR #56 incident with an uncommitted campaign driver is almost a textbook demonstration of why “Git commit = reproducible run” is insufficient.

## 8.2 W3C PROV

W3C PROV-DM formalizes provenance in terms of:

- entities;
- activities;
- agents;
- generation;
- usage;
- derivation;
- attribution;
- association;
- invalidation.

This is conceptually useful for the engine.

But again, v0.1 should not become a W3C PROV implementation.

Use PROV as a design sanity check:

> Can we answer what artifact was generated, by what activity, using which entities, under which responsible agent, and from what prior artifact?

If not, provenance is incomplete.

## 8.3 RO-Crate / Workflow Run RO-Crate

Workflow Run RO-Crate demonstrates that execution provenance can package:

- inputs;
- outputs;
- code;
- workflow structure;
- runtime execution context.

This reinforces a key novelty correction:

> **Run attestation is not new as a concept.**

Our contribution, if any, would be its use inside a math-claim promotion process.

## 8.4 in-toto and SLSA

Software supply-chain systems such as in-toto and SLSA show how artifact lineage can be made inspectable and tamper-evident.

SLSA defines provenance as verifiable information about where, when, and how an artifact was produced.

The Reliability Engine can borrow the discipline without borrowing the entire security architecture.

For research runs, the minimal attestation should include:

- Git SHA;
- dirty state;
- exact command;
- code hashes;
- input hashes;
- output hashes;
- raw-log hash;
- runtime versions;
- parameters;
- operator/agent;
- exploratory versus confirmatory status;
- preregistration protocol hash;
- holdout/blinding flags.

---

# 9. Literature foundation IV — preregistration and blind analysis

Nosek et al. distinguish hypothesis generation from hypothesis testing and emphasize the importance of defining analysis before seeing outcomes.

MacCoun and Perlmutter advocate blind analysis to reduce bias.

For this project, the rule is now concrete:

> **Operational permission to compute is not equivalent to a completed preregistration.**

And:

> **Once the relevant outcome has been exposed, that dataset cannot later be retroactively converted into a pristine confirmatory test.**

This does **not** make exploratory data worthless.

It changes its role.

A useful engine rule is:

```text
if data_exposed == true:
    preregistration_eligible_for_same_prediction = false
```

The profile-response h=2..7 soft-path dataset is now a theory-development/design dataset for that question.

The untouched holdout must remain separately represented.

No engine should let a later narrative rewrite this distinction.

---

# 10. Literature foundation V — claims, evidence, and challenge graphs

Micropublications model scientific communication as claims supported by evidence, methods, argument, and challenge.

This is a direct ancestor of a Claim Assurance Record.

The implication is important:

> A claim record with evidence links is **not** itself a new methodological idea.

The useful research question is narrower:

> What additional state does open-ended mathematics require that generic claim/evidence systems do not make operational?

Candidate mathematics-specific additions include:

- theorem statement fidelity;
- finite versus infinite scope;
- proof status;
- computational certificate status;
- independent derivation fingerprint;
- formalization status;
- formal-statement fidelity;
- counterexample search status;
- literature novelty status;
- preregistration/holdout status;
- human mathematical understanding;
- external expert review.

That is where differentiation may survive.

---

# 11. Literature foundation VI — human factors and automation bias

James Reason’s systems approach to human error is important because it discourages blame-centered analysis.

The PR #56 premature run was not well described as:

> “the agent broke the rule”

or:

> “the human made a mistake.”

The better engineering description is:

> the system permitted curiosity-driven execution before a scientific protocol state had been frozen, and did not automatically downgrade the resulting data to exploratory status at execution time.

This is a process-design problem.

Automation-bias research further warns that “human in the loop” is not a sufficient assurance mechanism.

Humans can:

- omit checks because automation did not flag a problem;
- accept automated recommendations despite contradictory information;
- rubber-stamp high-fluency outputs.

Therefore, Reliability Engine should have a **human understanding gate**, not merely a human approval checkbox.

For a high-value claim, the human should be able to state:

1. What exactly is being claimed?
2. What does the evidence establish?
3. What does it *not* establish?
4. What is the strongest unresolved defeater?
5. What evidence would change the claim status?

Human approval is governance evidence.

It is not mathematical correctness evidence.

---

# 12. Literature foundation VII — AI debate, self-critique, and evaluator bias

AI debate and multi-agent critique can improve performance in some settings.

But they should not be confused with independent assurance.

LLM evaluators exhibit:

- position bias;
- fairness problems;
- self-preference;
- self-recognition-related preference.

This matters directly for a multi-model research workflow.

A reliability architecture should not say:

```text
three agents agree -> claim passes
```

Instead:

```text
evidence path A = numerical independent checker
evidence path B = clean-room mathematical derivation
evidence path C = formal proof assistant
evidence path D = primary-source literature audit
evidence path E = external human expert
```

Agent diversity can help generate those evidence paths.

It does not replace them.

---

# 13. Literature foundation VIII — formal mathematics and statement fidelity

Formal proof assistants provide an unusually strong verification boundary.

A kernel-checked proof is much stronger evidence than an LLM saying a proof looks correct.

But formal verification has its own critical boundary:

> **The proof assistant proves the formal statement that was encoded, not automatically the theorem humans intended.**

The Liquid Tensor Experiment’s public materials explicitly address this issue by connecting mathematical definitions and theorem statements to examples and blueprints designed to show that the formal definitions correspond to intended mathematics.

This creates an important two-gate model:

```text
FORMAL_PROOF_PASS
        +
STATEMENT_FIDELITY_PASS
        =
formal evidence for intended theorem
```

Neither subsumes the other.

For future Abelian-square theorems:

- Lean could eventually provide proof-level evidence;
- examples and independent natural-language review must still check that the formal predicates are the intended Abelian-square predicates.

This distinction is an excellent candidate for a mathematics-specific Reliability Engine feature.

---

# 14. Literature foundation IX — verifier-centered discovery

FunSearch demonstrates a powerful architecture:

> creative model + systematic evaluator.

Its success in combinatorics is directly relevant to this project.

But the evaluator is only as good as the property it checks.

A perfect verifier for the wrong predicate is a perfect implementation of the wrong question.

The project has already experienced this exact class of failure.

Therefore, Reliability Engine should distinguish:

```text
VERIFIER_IMPLEMENTATION_VALID
PREDICATE_SPECIFICATION_VALID
INPUT_GENERATION_VALID
CLAIM_SCOPE_VALID
```

A single `VERIFIED=true` field is unsafe.

---

# 15. Literature foundation X — automated science systems

The AI Scientist, Co-Scientist, Robin, and related systems show rapid progress in automating or coordinating:

- ideation;
- literature search;
- coding;
- experiments;
- data analysis;
- hypothesis generation;
- manuscript production.

Nature Machine Intelligence’s 2026 editorial on multi-agent AI systems stresses transparency, model/version/prompt reporting, human oversight, and the need to justify complexity and computational cost.

This supports a key strategic decision:

> Reliability Engine should not become another multi-agent “research team simulator.”

The workers can change over time.

The assurance substrate should survive them.

---

# 16. The 2026 close-prior-art map

This is the most important novelty section.

## 16.1 ResearchLoop — strongest overlap

**Overlap: very high.**

It already has:

- repository-backed durable state;
- research-question spine;
- task contracts;
- evidence objects;
- claim ledger;
- gates;
- state transitions;
- blocker preservation;
- claim admission;
- closeouts;
- manuscript binding.

Do not claim these as inventions.

## 16.2 Auditable AI-Assisted Research Writing

**Overlap: high.**

It already has:

- Git sealing;
- hash-bound provenance;
- refusal gates;
- cross-model separation;
- prospective metric cards;
- preregistered blind spots;
- process instrumentation.

Do not claim these features broadly as novel.

## 16.3 From Fluent to Verifiable

**Overlap: high at claim-audit layer.**

It already treats claim-level auditability as a primary design target and proposes metrics around claim/evidence traceability and contradiction transparency.

## 16.4 Symposium

**Overlap: high at durable-history layer.**

It explicitly separates durable research-community records from changing AI agents and stores structured claims/evidence/assumptions.

## 16.5 FirstResearch

**Overlap: medium-high at question/prereg layer.**

It proposes an auditable question certificate including definitions, assumptions, falsifier, decisive test, and failure-update rule.

## 16.6 Spec-Driven AI for Empirical Research

**Overlap: high at epistemic-workflow layer.**

It treats hypotheses, data, code, artifacts, claims, and AI actions as auditable objects with human gates.

## 16.7 Claim accountability

**Overlap: high at governance philosophy.**

It explicitly argues the claim, not the AI tool, should be the unit of governance, and that a human should be able to reconstruct and defend the claim.

---

# 17. Novelty map after the 2.0 audit

## 17.1 Features that should be treated as non-novel or clearly prefigured

| Feature | Novelty assessment |
|---|---|
| Claim ledger | **Prefigured / non-novel** |
| Evidence objects linked to claims | **Prefigured / non-novel** |
| Repository-backed durable research state | **Direct prior art** |
| Evidence gates | **Direct prior art** |
| Blocking claim promotion | **Direct prior art** |
| Preserving negative/failure state | **Direct prior art** |
| Git provenance | **Non-novel** |
| Hash-bound artifacts | **Non-novel** |
| Preregistration | **Established methodology** |
| Blind holdouts | **Established methodology** |
| Cross-model role separation | **Already proposed** |
| Run provenance/attestation | **Strong prior art** |
| Claim/evidence graphs | **Strong prior art** |
| Assurance cases and defeaters | **Established field** |
| Formal verification | **Established field** |
| Multi-agent critique | **Established / active field** |
| Human approval gates | **Established / active field** |
| Prospective process metric cards | **Already proposed in 2026** |

## 17.2 Surviving differentiation hypotheses

These are **not novelty claims**. They are the narrower ideas that survived the audit strongly enough to justify further search.

### H1 — Mathematics-specific Claim Assurance Record

A single record that operationally combines:

- exact mathematical statement;
- scope;
- theorem/finite-computation/mechanism/negative-result class;
- raw computational evidence;
- proof evidence;
- independent derivation fingerprint;
- verifier predicate/specification status;
- formal proof status;
- formal-statement fidelity status;
- counterexample/defeater state;
- preregistration and holdout exposure state;
- literature novelty status;
- human-understanding gate;
- external expert status;
- claim-promotion eligibility.

This exact synthesis may be less common than generic claim/evidence ledgers.

**Novelty status: NOT_ESTABLISHED.**

### H2 — Multidimensional independence fingerprint

Instead of counting reviewers, explicitly record whether checks differ in:

- derivation;
- algorithm;
- representation;
- input generation;
- programming language;
- runtime;
- model family;
- model provider;
- prompt context;
- source set;
- human operator;
- evaluator/oracle.

This directly operationalizes correlated-failure risk.

**Novelty status: NOT_ESTABLISHED.**

### H3 — Executable invalidation semantics

Examples:

```text
HOLDOUT_EXPOSED = YES
    -> SAME-PREDICTION_PREREG_ELIGIBLE = NO

GENERATOR_CHANGED && DERIVED_ARTIFACT_NOT_REFRESHED
    -> EVIDENCE_STATUS = STALE

RAW_LOG_MISSING
    -> COMPUTATIONAL_EVIDENCE_ADMISSIBLE = NO

FORMAL_PROOF_PASS && STATEMENT_FIDELITY_UNCHECKED
    -> INTENDED_THEOREM_VERIFIED = NO

PRIMARY_SOURCE_INVALIDATED
    -> DEPENDENT_NOVELTY_OR_LITERATURE_CLAIMS = BLOCKED
```

The key idea is not merely storing status but propagating invalidation through the claim graph.

**Novelty status: NOT_ESTABLISHED.**

### H4 — Enforced separation of epistemic powers

For high-value claims:

> no single actor should originate the claim, design the decisive test, execute the decisive test, and grant final promotion.

This is an assurance/IV&V-inspired rule specialized to human–AI math research.

**Novelty status: NOT_ESTABLISHED.**

### H5 — Prospective longitudinal methodology evaluation in a real open mathematical programme

Historical failures become the **ENGINE_DESIGN_SET**.

After freezing a version of the methodology, later naturally occurring research episodes become the **ENGINE_EVAL_SET**.

This is stronger than retrospective storytelling because the engine must face unknown future mistakes.

**Novelty status: NOT_ESTABLISHED, but methodologically promising.**

---

# 18. Recommended research positioning

Do not position Reliability Engine as:

- a new AI scientist;
- a general research operating system;
- a universal epistemic platform;
- a better multi-agent debate architecture;
- a proof assistant;
- a replacement for peer review;
- a truth machine.

Position it as:

> **A lightweight mathematics assurance overlay that makes high-value claim state, evidence independence, defeaters, provenance, blinding, and promotion constraints executable across changing human and AI workers.**

The narrower the claim, the stronger it becomes.

---

# 19. Threat model

The engine should be designed around failure classes, not feature wish-lists.

| ID | Threat | Example | Primary control | Residual risk |
|---|---|---|---|---|
| T01 | Wrong mathematical object/specification | checker tests wrong predicate | statement/predicate fidelity gate | humans may share misconception |
| T02 | Wrong derivation | incorrect variance formula | independent derivation + defeater | correlated theory error |
| T03 | Wrong implementation | target-index bug | independent checker/tests | same oracle reused |
| T04 | Wrong input/data | malformed profile list | input hashes + independent generator | source data itself wrong |
| T05 | Stale derived artifact | report not regenerated | freshness CI | semantic stale state can escape byte checks |
| T06 | Scope inflation | finite -> infinite language | claim scope schema + linter | subtle prose overreach |
| T07 | Novelty hallucination | “new” without audit | literature status gate | incomplete literature |
| T08 | Data exposure/HARKing | run before prereg freeze | exposure state + automatic downgrade | informal leakage outside engine |
| T09 | Correlated agent failures | multiple LLMs share error | independence fingerprint | hidden shared training causes |
| T10 | Automation bias | human rubber-stamps | understanding gate | human still may misunderstand |
| T11 | Provenance loss | uncommitted driver | run attestation | environment may remain incomplete |
| T12 | History tampering | force-push/cleanup | protected history + audit log | admin privileges |
| T13 | Cross-session drift | summary drops blocker | durable blocker/claim state | schema itself incomplete |
| T14 | Hidden override | gate bypass | explicit override record | social pressure to normalize overrides |
| T15 | Formal statement mismatch | Lean proves wrong formalization | statement fidelity review | subtle semantic mismatch |
| T16 | Evaluator/oracle bug | flawed “independent” checker | oracle independence field | unknown shared assumptions |
| T17 | Engine state/gate bug | wrong transition code | tests + human-readable state | assurance tool itself can fail |
| T18 | Bureaucracy/bypass incentive | users work outside engine | tiered fast path | shadow research |
| T19 | Confidentiality/tool leakage | sensitive review content | data classification | connector/provider risk |
| T20 | Misleading metric optimization | low blocker count becomes target | metric blind-spot cards | Goodhart effects |
| T21 | False blocking | useful exploration halted | exploratory fast path | overhead/frustration |
| T22 | Evidence quantity mistaken for independence | five near-identical checks | fingerprint + no scalar score | fingerprint may be gamed |

The engine’s job is not to eliminate these threats.

Its job is to make the most important ones:

- visible;
- typed;
- hard to silently erase;
- connected to the claims they affect.

---

# 20. Architecture: an assurance overlay, not a research OS

Recommended architecture:

```text
┌──────────────────────────────────────────────────────────┐
│                     RESEARCH WORKERS                     │
│ humans | ChatGPT | Claude | Gemini | Antigravity | code │
└─────────────────────────────┬────────────────────────────┘
                              │ produce
                              v
┌──────────────────────────────────────────────────────────┐
│                    EVIDENCE SUBSTRATE                    │
│ Git | raw logs | code | datasets | hashes | reports      │
└─────────────────────────────┬────────────────────────────┘
                              │ interpreted by
                              v
┌──────────────────────────────────────────────────────────┐
│              RELIABILITY ENGINE / ASSURANCE OVERLAY      │
│ Failure Ledger                                           │
│ Claim Assurance Records                                  │
│ Defeaters                                                │
│ Independence Fingerprints                                │
│ Run Attestations                                         │
│ Artifact Freshness                                       │
│ Prereg / Holdout State                                   │
│ Promotion Rules                                          │
└─────────────────────────────┬────────────────────────────┘
                              │ gates
                              v
┌──────────────────────────────────────────────────────────┐
│                  CANONICAL CLAIM BOUNDARY                │
│                   MATH_CLAIMS.md                         │
└──────────────────────────────────────────────────────────┘
```

The engine does not own truth.

It owns **admission state**.

---

# 21. Multidimensional claim state

A scalar `confidence = 0.91` is inappropriate.

A claim should instead have orthogonal status axes.

Example:

```yaml
claim_id: CAR-PR-004
epistemic_status: computational_observation
reproduction_status: independently_reproduced
evidence_status: raw_evidence_preserved
artifact_status: fresh
literature_status: novelty_not_established
experiment_status: exploratory_exposed
preregistration_status: ineligible_for_same_prediction
formalization_status: not_attempted
statement_fidelity_status: natural_language_only
defeater_status: open
human_understanding_status: reviewed
external_review_status: not_requested
promotion_status: not_eligible_for_math_claims
```

This representation permits a claim to be:

- computationally strong;
- reproducible;
- exploratory;
- non-novel;
- not formally proved;
- still worth researching.

That is exactly what PR #56 teaches.

---

# 22. Claim Assurance Record (CAR)

A high-value CAR should be used sparingly.

Not every scratch result deserves one.

Candidate schema:

```yaml
claim_id:
statement:
scope:
claim_type:
  # theorem | finite_computation | mechanism | negative_result
  # literature | novelty | algorithmic_record | methodological

epistemic_status:

evidence:
  - evidence_id:
    type:
    artifact:
    raw_log:
    run_attestation:
    admissibility:

independence:
  derivation:
  algorithm:
  data_representation:
  input_generation:
  language:
  runtime:
  model_family:
  model_provider:
  prompt_context:
  source_set:
  human_operator:
  evaluator_oracle:

defeaters:
  - defeater_id:
    description:
    status:
    resolution_evidence:

preregistration:
  eligible:
  protocol_hash:
  data_exposed:
  holdout_id:
  override:

literature:
  search_date:
  primary_sources_opened:
  novelty_status:

formalization:
  formal_system:
  kernel_checked:
  statement_fidelity_reviewed:
  fidelity_evidence:

human_gate:
  understanding_check:
  approval_scope:

external_review:
  status:
  reviewer_role:
  review_artifact:

promotion:
  eligible_for_math_claims:
  blockers:
```

The CAR is an assurance summary.

It must link to evidence, not copy the evidence.

---

# 23. Independence fingerprint

## 23.1 Why it is needed

“Independent reproduction” is often overclaimed.

Two programs can differ in language while sharing:

- the same formula;
- the same input generator;
- the same oracle;
- the same expected constants;
- the same hidden bug.

Two LLMs can differ in provider while sharing the same published mathematical misconception.

The engine should therefore record the axes explicitly.

## 23.2 Recommended fingerprint

```yaml
independence:
  derivation: independent | shared | partial | unknown
  algorithm: independent | shared | partial | unknown
  data_representation: independent | shared | partial | unknown
  input_generation: independent | shared | partial | unknown
  language: independent | shared | partial | unknown
  runtime: independent | shared | partial | unknown
  model_family: independent | shared | n/a | unknown
  model_provider: independent | shared | n/a | unknown
  prompt_context: clean_room | exposed | partial | n/a
  source_set: independent | shared | partial | unknown
  human_operator: independent | shared | partial | unknown
  evaluator_oracle: independent | shared | partial | unknown
```

Do **not** collapse this to a score.

The vector is the information.

---

# 24. Defeaters as first-class research state

For each high-value claim, require at least one explicit answer to:

> **How could this still be wrong?**

Candidate defeater states:

```text
OPEN
UNDER_TEST
REFUTED
CONFIRMED
ACCEPTED_RESIDUAL_RISK
SUPERSEDED
```

A claim should remain promotable only if its **blocking defeaters** are resolved or explicitly accepted by the human owner at the correct claim scope.

Example for a computational theorem candidate:

```text
D1 wrong predicate specification       OPEN
D2 finite-window overgeneralization    REFUTED by scope change
D3 checker shares generator            OPEN
D4 numerical precision instability     REFUTED by exact arithmetic
D5 literature antecedent exists        OPEN
```

This is much more informative than `confidence: high`.

---

# 25. Run attestation

PR #56 demonstrated a concrete problem:

> the executed campaign driver was not committed at execution time.

Git SHA alone therefore could not reconstruct the run.

Recommended minimal attestation:

```yaml
run_id:
timestamp:
git_sha:
git_dirty:
command:
working_directory:
parameters:
code_files:
  - path:
    sha256:
inputs:
  - path:
    sha256:
outputs:
  - path:
    sha256:
raw_log:
  path:
  sha256:
runtime:
  os:
  node:
  python:
agent:
  provider:
  model:
operator:
research_mode:
  exploratory: true|false
  confirmatory: true|false
preregistration:
  protocol_hash:
  frozen_before_run:
blinding:
  holdout_id:
  exposed_before:
override:
  used:
  reason:
```

Important rule:

> `git_dirty=true` is allowed for exploratory research, but exact executed bytes must be captured if the result is later used as evidence.

The engine should not punish exploration.

It should prevent unreconstructable exploration from silently becoming canonical evidence.

---

# 26. Artifact freshness

This is the clearest v0.1 automation because PR #56 already demonstrated its value.

## 26.1 Failure mode

```text
generator changes
derived JSON regenerates
Markdown report does not regenerate
agent reports “all synchronized”
```

The engine should detect this before merge.

## 26.2 Three tiers

### Tier 1 — dependency-hash freshness

Manifest:

```json
{
  "artifact": "scratch/x/WORKING_REPORT.md",
  "generator": "scratch/x/build_working_report.js",
  "inputs": [
    "scratch/x/audit_results.json",
    "scratch/x/soft_test_out.json"
  ]
}
```

If generator/input hash changes and artifact hash does not update, block.

### Tier 2 — deterministic regeneration

Run generator in a temporary directory and byte-compare expected artifacts.

This is stronger.

### Tier 3 — semantic consistency

For nondeterministic or environment-sensitive reports, run field-level consistency assertions:

```text
JSON.spearman == report.spearman
JSON.profile_count == report.profile_count
method_label == current_engine_method_label
```

Recommendation:

> implement Tier 2 where deterministic; Tier 3 for high-value summaries.

Timestamps alone are insufficient.

---

# 27. Executable invalidation semantics

This may be the most interesting narrower design direction.

An assurance record should not just accumulate badges.

Evidence changes should invalidate dependent state.

Examples:

## 27.1 Holdout exposure

```text
event: HOLDOUT_EXPOSED
effect:
  preregistration.same_prediction.eligible = false
  experiment.status = exploratory_or_post_hoc
```

## 27.2 Source invalidation

```text
event: PRIMARY_SOURCE_RETRACTED_OR_MISMATCHED
effect:
  dependent_literature_claims = blocked
  dependent_novelty_claims = blocked
```

## 27.3 Stale artifact

```text
event: GENERATOR_CHANGED
artifact: REPORT.md
effect:
  artifact.status = stale
  evidence.admissible = false
  dependent_claim.promotion = blocked
```

## 27.4 Formal proof without fidelity

```text
formal_proof.kernel_checked = true
statement_fidelity.reviewed = false

=> intended_theorem_verified = false
```

## 27.5 Missing raw evidence

```text
raw_log.missing = true
=> computational_evidence.paper_admissible = false
```

The important idea is **revocation**, not just admission.

---

# 28. Separation of epistemic powers

For high-value claims, define distinct roles:

- **Originator** — proposes the claim.
- **Derivation critic** — tries to break the mathematics.
- **Implementation verifier** — checks computation/code.
- **Literature auditor** — checks antecedents/novelty.
- **Experiment registrar** — freezes the test protocol.
- **Executor** — runs the decisive experiment.
- **Human research owner** — controls scope and acceptance.
- **External expert** — eventual domain review.

One person or one model may fill several low-risk roles.

But for a high-value claim, enforce:

> No single actor should originate the claim, design the decisive test, execute it, and grant final promotion.

This is not because AI is uniquely untrustworthy.

It is because **researchers are also vulnerable to motivated reasoning**.

---

# 29. Human understanding gate

A high-value claim should not enter a public paper merely because the human clicked “approve.”

A lightweight gate:

```yaml
human_understanding:
  can_state_claim_in_own_words: true
  can_state_scope_boundary: true
  can_name_strongest_evidence: true
  can_name_strongest_defeater: true
  can_state_what_would_change_mind: true
```

No essay is required.

The point is to prevent a fluent AI argument from becoming a claim that no responsible human can reconstruct.

This aligns strongly with recent claim-accountability work.

---

# 30. External expert layer

External expert review should occur **after** the internal evidence package is coherent.

Do not send a chaotic repository dump.

Prepare an expert packet:

1. one-page claim statement;
2. definitions;
3. evidence map;
4. independent-check summary;
5. open defeaters;
6. exact novelty question;
7. minimal reproducibility commands;
8. relevant primary literature;
9. what feedback is being requested.

Expert review is new evidence.

It is not an oracle.

A disagreement should update the claim/defeater state, not be silently averaged with AI votes.

---

# 31. v0.1 — what to build and what not to build

## 31.1 Build

Only four components are justified now:

1. **Failure Ledger**
2. **High-value Claim Assurance Record**
3. **Artifact Freshness / derivation-closure CI**
4. **Minimal Run Attestation** if it can be added cheaply

The first three are mandatory for v0.1.

Run attestation can be v0.1b if implementation overhead grows.

## 31.2 Do not build yet

Do not implement:

- full SACM;
- W3C PROV graph storage;
- RDF;
- RO-Crate packaging;
- a new agent orchestrator;
- a multi-agent voting system;
- an autonomous final judge;
- a scalar trust score;
- blockchain;
- cryptographic signing infrastructure beyond ordinary hashes/Git unless a real threat requires it;
- a dashboard;
- a vector database;
- a generalized “science OS”;
- full transcript capture;
- hidden chain-of-thought capture.

The current research bottleneck is epistemic discipline, not infrastructure scale.

---

# 32. Failure Ledger design

The Failure Ledger should be **blame-free but not vague**.

Suggested fields:

```yaml
failure_id:
episode:
date:
observed_symptom:
failure_mode:
actors:
  # human | AI | tool | mixed | system
triggering_conditions:
why_plausible:
scientific_impact:
epistemic_impact:
detection_layer:
preserved_artifacts:
corrective_action:
defense_introduced:
recurrence_test:
dataset_role:
  # ENGINE_DESIGN_SET | ENGINE_EVAL_SET
residual_risk:
```

The ledger should distinguish:

- error;
- exception;
- exploratory deviation;
- invalidated interpretation;
- provenance gap;
- governance override.

Not every deviation is a “failure” in the moral sense.

It is a reliability-relevant event.

---

# 33. PR #56 as ENGINE_DESIGN_SET

Historical events should populate the design set.

Candidate entries:

| ID | Failure mode | Defense suggested |
|---|---|---|
| FL-001 | wrong variance formula | independent derivation + formula unit test |
| FL-002 | target-index bug | independent oracle path |
| FL-003 | hard-coded success criterion | declarative gate + test |
| FL-004 | wrong SCC criterion | spectral criterion + audit |
| FL-005 | finite-soft support thresholding | model invariant: positive edges retained |
| FL-006 | stale derived report | artifact freshness CI |
| FL-007 | human-authorized premature execution | prereg/exposure state machine |
| FL-008 | corrupted Markdown presentation | derived artifact validation |
| FL-009 | inaccurate method label | semantic report consistency |
| FL-010 | structural-phase-transition overinterpretation | support-topology invariant + claim scope |
| FL-011 | unverified narrative provenance | provenance evidence tier |
| FL-012 | `--no-verify` governance exception | override log + CI confirmation |

These events must **not** be used as evidence that v0.1 works.

They were observed before v0.1.

They tell us what to design.

---

# 34. Prospective evaluation — the critical methodological requirement

If the Reliability Engine is ever to become a methods paper or PhD-level contribution, retrospective anecdotes are insufficient.

The project must freeze an evaluation protocol before future episodes are counted.

## 34.1 Dataset split

```text
ENGINE_DESIGN_SET
    = historical episodes already known
    = used to design controls
    = NOT valid for efficacy claims

ENGINE_EVAL_SET
    = future research episodes after protocol freeze
    = unknown failure modes at design time
    = prospectively observed
```

## 34.2 Do not optimize one score

Use a metric card.

Potential metrics:

- stage of detection;
- time to detection;
- number of claim-promotion escapes prevented;
- stale-artifact incidents;
- unreproducible-run incidents;
- preregistration violations/overrides;
- override-documentation completeness;
- claim replay success;
- open-defeater age;
- independence-fingerprint completeness;
- external-expert reversals;
- false-block rate;
- added human minutes;
- added compute cost;
- unplanned rework;
- claims downgraded before public promotion.

## 34.3 Metrics with difficult denominators

Avoid claiming:

> “we caught 95% of errors”

unless the denominator of all errors is knowable.

In open-ended research, it is not.

Prefer observable metrics:

> “Of N recorded reliability-relevant events, M were detected before claim promotion and K after.”

Even that must be interpreted cautiously because undetected events are invisible by definition.

## 34.4 Success can be a No-Go

A strong engine may make the project look slower because it blocks attractive weak claims.

That is not failure.

The appropriate question is:

> Did the engine reduce **unearned claim promotion** at tolerable cost?

---

# 35. Evaluation design alternatives

## 35.1 Longitudinal single-project study

Most feasible.

Pros:
- ecologically valid;
- real open problem;
- rich history;
- changing AI models;
- genuine human incentives.

Cons:
- no randomized control;
- learning effects;
- project domain-specific;
- difficult causal attribution.

Use cautious language:

> “prospective case evidence,” not “proved reliability improvement.”

## 35.2 Controlled microtasks

Create historical-bug reenactments and seeded failure tasks.

Pros:
- controlled;
- repeatable;
- component ablations possible.

Cons:
- may overfit known failures;
- lower ecological validity.

Use as **unit tests for the method**, not final validation.

## 35.3 External replication

Give a blinded artifact package to another researcher/team.

Pros:
- stronger independence;
- measures auditability.

Cons:
- costly;
- hard to recruit.

This could become especially valuable before a methods publication.

---

# 36. Publishability assessment

## 36.1 What is not publishable as a strong novelty claim

A paper whose contribution is essentially:

> “We use Git, multiple LLMs, claim ledgers, evidence gates, preregistration, and provenance to make AI research safer.”

would face serious novelty objections in 2026.

The literature is already there.

## 36.2 What could become publishable

A narrower paper could be credible if it contributes:

1. a **math-specific assurance model** with explicit statement-fidelity and independence semantics;
2. executable invalidation rules tied to mathematical claim promotion;
3. a transparent open implementation;
4. a prospectively frozen longitudinal evaluation;
5. real case studies where the system blocks or downgrades attractive claims;
6. external expert audit;
7. comparison against close prior art, especially ResearchLoop and the 2026 auditability frameworks.

Possible paper framing:

> **Claim-Centric Assurance for Human–AI Open-Ended Mathematics: A Prospective Case Study**

or:

> **From Verification to Assurance: Executable Epistemic State for AI-Assisted Mathematical Research**

Both titles are still only concepts.

## 36.3 PhD potential

The *engine itself* is not enough for a PhD.

A research programme could be.

A plausible doctoral question:

> How should claim-level assurance, independence, provenance, preregistration, formal verification, and human responsibility be operationalized and empirically evaluated in AI-assisted open-ended mathematical research?

A defensible thesis would need:

- theory/model of research assurance;
- implementation;
- longitudinal empirical data;
- controlled component tests;
- comparative prior-art analysis;
- domain expert involvement;
- probably more than one mathematical research line or an external replication.

The current Abelian-square project could be the primary living laboratory.

It should not be the sole argument for universal generality.

---

# 37. The strongest research hypothesis now

The most promising methods hypothesis is not:

> “multiple AIs make math reliable.”

It is:

> **Persistent, claim-centric assurance state can reduce unearned claim promotion by forcing evidence, scope, independence, defeaters, provenance, and experiment status to remain synchronized across changing human and AI workers.**

This is testable.

It can fail.

That is good.

---

# 38. Design principle: correctness and assurance are different

A mathematically correct result can have weak assurance.

A false result can temporarily have strong-looking evidence.

The engine should therefore never equate:

```text
correctness = process compliance
```

or:

```text
process failure = scientific falsity
```

PR #56 is a live example.

The sign-crossing observation can remain numerically real even though:

- its discovery was exploratory;
- the initial presentation artifact was corrupted;
- an early mechanism interpretation was overreaching;
- the campaign was run before preregistration freeze.

The engine’s value is precisely in keeping those distinctions intact.

---

# 39. Design principle: preserve failures, but do not fetishize them

Failure preservation is useful only if it changes future behavior.

A huge archive of mistakes that nobody queries is bureaucracy.

Every Failure Ledger entry should answer:

> What defense, test, state transition, or training rule changed because of this event?

If the answer is “none,” consider whether the entry needs long-term preservation.

---

# 40. Design principle: exploration must remain cheap

A reliability system that requires a CAR, preregistration, three reviewers, and a signed attestation before every ten-line scratch calculation will be bypassed.

Use tiers.

## Tier E0 — scratch exploration

- no prereg required;
- dirty worktree allowed;
- lightweight provenance;
- outputs cannot support canonical claims.

## Tier E1 — reusable computational evidence

- run attestation;
- raw log;
- artifact hashes;
- independent post-check.

## Tier E2 — high-value claim candidate

- CAR;
- defeaters;
- independence fingerprint;
- literature status;
- human understanding gate.

## Tier E3 — confirmatory / holdout / paper-facing

- prereg frozen;
- holdout state explicit;
- decisive test separation;
- external/clean-room check where feasible;
- canonical promotion review.

This tiering is crucial for usability.

---

# 41. Design principle: the engine itself needs assurance

A broken gate can provide false confidence.

Therefore, Reliability Engine code needs:

- ordinary unit tests;
- negative tests;
- mutation tests where useful;
- fixture-based state-transition tests;
- “must fail” tests;
- schema validation;
- explicit test cases from historical failures.

Examples:

```text
TEST: exposed holdout cannot return prereg_eligible=true
TEST: stale artifact cannot remain admissible
TEST: missing raw log blocks E1 promotion
TEST: formal proof without fidelity cannot mark intended theorem verified
TEST: override must leave durable record
```

The engine must be easier to audit than the research it governs.

---

# 42. Security, privacy, and transcript policy

Do not collect private hidden chain-of-thought.

It is unnecessary and creates privacy/governance problems.

Record:

- task instruction/prompt when it is part of reproducibility;
- model/provider/version when known;
- tool calls at the level needed to reconstruct work;
- commands;
- artifacts;
- raw program outputs;
- decisions;
- claim state changes;
- human approvals/overrides.

Do not require:

- hidden reasoning traces;
- personal secrets;
- unrelated conversation history.

Assurance should focus on **observable evidence and decisions**.

---

# 43. Interoperability strategy

Do not invent everything.

Long-term possible mappings:

| Reliability Engine object | External analogue |
|---|---|
| Claim Assurance Record | Assurance case / Micropublication / ResearchLoop claim |
| Evidence artifact | W3C PROV entity / RO-Crate object |
| Run attestation | SLSA/in-toto-style provenance |
| Defeater | Assurance 2.0 defeater |
| Claim state transition | ResearchLoop gate/state model |
| Prereg record | preregistration / Registered Report |
| Failure Ledger | safety incident / issue / closeout history |
| Independence fingerprint | IV&V independence decomposition |
| Formal statement fidelity | formalization blueprint/example discipline |

The immediate code should remain simple enough to replace.

---

# 44. Practical v0.1 repository layout

Proposed future branch layout:

```text
research/reliability/
  README.md
  failure-ledger.yaml

  claims/
    CAR-0001.yaml

  runs/
    RUN-0001.yaml

  schemas/
    failure-ledger.schema.json
    claim-assurance.schema.json
    run-attestation.schema.json

  artifact-dependencies.json

scripts/reliability/
  validate-failure-ledger.js
  validate-claim-assurance.js
  check-artifact-freshness.js
  attest-run.js                  # optional v0.1b

tests/reliability/
  state-transitions.test.js
  freshness.test.js
  fixtures/
```

No new root files.

No `MATH_CLAIMS.md` changes in the implementation PR.

No h=8 access.

---

# 45. Rollout strategy

## Phase 0 — design freeze

Before implementation:

- review Deep Research 2.0;
- review v0.1 design;
- decide exact schema;
- designate historical events as ENGINE_DESIGN_SET;
- freeze what v0.1 is supposed to prevent.

## Phase 1 — Failure Ledger

Implement only schema + validator + 8–12 historical design entries.

Goal:
- prove the ledger is usable;
- discover schema pain before CI enforcement.

## Phase 2 — Artifact freshness

Implement dependency manifest + deterministic/semantic checker for one real report chain.

Goal:
- prevent the exact PR #56 stale artifact class.

## Phase 3 — Claim Assurance Record

Create one CAR for one high-value existing candidate claim.

Goal:
- test whether state is informative without becoming bureaucratic.

## Phase 4 — prospective freeze

Write `RELIABILITY_ENGINE_EVALUATION_PROTOCOL_v1.md`.

Only after this point do future episodes count toward methodology evaluation.

---

# 46. Acceptance criteria for v0.1

v0.1 is successful as software if:

1. a historical stale-artifact fixture fails automatically;
2. a fresh regenerated artifact passes;
3. an exposed-holdout fixture cannot remain prereg-eligible;
4. a missing-raw-log E1 evidence record is rejected;
5. a CAR with unresolved blocking defeater cannot be promotion-eligible;
6. an override requires reason + timestamp + actor;
7. a run with dirty worktree can be captured without pretending it is committed;
8. no scalar trust score exists;
9. normal scratch exploration remains possible;
10. `MATH_CLAIMS.md` remains human-gated and canonical.

v0.1 is **not** methodologically validated merely because these tests pass.

---

# 47. What not to do next

Do not:

- run h=8 “just to see”;
- retroactively preregister the already seen h=2..7 soft-path question;
- create a general-purpose Reliability Engine website;
- announce novelty;
- write a methodology paper before prospective data exists;
- add 40 schemas;
- orchestrate five agents merely to demonstrate multi-agentism;
- treat model disagreement as scientific evidence by itself;
- use historical failures to claim efficacy;
- promote the profile-response crossing to a theorem;
- merge methodology changes directly into main without a dedicated branch and review.

---

# 48. The relation to the ongoing mathematics

The Reliability Engine is not the research programme.

The Abelian-square work remains the mathematical programme.

The engine should support, not consume, the mathematics.

A sensible resource ratio initially is something like:

```text
80–90% research work
10–20% assurance/tooling work
```

unless a concrete reliability event justifies more tooling.

The engine earns its existence only if it reduces future rework, overclaiming, or uncertainty.

---

# 49. The h=8 rule

The untouched h=8 state remains unusually valuable.

Reliability Engine must treat holdout state as an explicit resource.

Candidate state:

```yaml
holdout_id: PROFILE_RESPONSE_H8
status: sealed
exposed_to:
  human: false_or_governed
  assistant_current_context: false
  implementation_agent: false
permitted_actions:
  - preregistration_metadata_only
forbidden_actions:
  - system_construction
  - profile_enumeration
  - response_computation
  - exploratory_probe
```

The exact real project policy remains controlled by the repository, not this design draft.

The important methodology point is:

> holdout state should be machine-readable enough that accidental exposure becomes difficult to narrate away.

---

# 50. A formal sketch of claim promotion

Let a claim record be:

\[
C = (S, E, I, D, P, L, F, H, X)
\]

where:

- \(S\) = statement and scope;
- \(E\) = evidence state;
- \(I\) = independence state;
- \(D\) = defeater state;
- \(P\) = preregistration/experiment state;
- \(L\) = literature/novelty state;
- \(F\) = formalization/fidelity state;
- \(H\) = human-understanding state;
- \(X\) = external-review state.

Promotion should be a predicate:

\[
\mathrm{Promotable}(C, k)
\]

for claim class \(k\), not a universal score.

Example computational finite claim:

\[
\mathrm{Promotable}_{\text{finite-computation}}
=
E_{\text{raw}}
\land E_{\text{repro}}
\land I_{\text{min}}
\land \neg D_{\text{blocking}}
\land H_{\text{scope}}
\]

A theorem claim would require different gates.

A novelty claim would require literature gates.

This class-specific gating is safer than universal “confidence.”

---

# 51. A formal sketch of evidence invalidation

Let evidence objects form a dependency DAG \(G=(V,E)\).

Each evidence object has:

```text
fresh
stale
invalid
superseded
unknown
```

Claim admissibility is a function of its evidence dependencies.

If an upstream generator or source is invalidated, downstream evidence becomes at least `unknown/stale` until recomputed or re-audited.

This is ordinary dependency logic applied to epistemic state.

It is also the mechanism needed to turn:

> “make epistemic state executable”

from a slogan into a testable system.

---

# 52. Research questions for Reliability Engine 2.x

## RQ1
Can explicit claim-state synchronization reduce unearned claim promotion in human–AI mathematics workflows?

## RQ2
Which independence dimensions actually predict detection of real research failures?

## RQ3
How much assurance metadata is enough before researchers route around the system?

## RQ4
Which failure classes are best caught by automation versus independent humans/agents?

## RQ5
Can artifact-freshness and run-attestation controls measurably reduce rework?

## RQ6
Can statement-fidelity gates prevent “formal proof of the wrong theorem” failure modes?

## RQ7
How should preregistration exposure propagate through a long-lived research graph?

## RQ8
What is the minimum viable human-understanding check that reduces rubber-stamping without becoming performative bureaucracy?

## RQ9
Does a multidimensional independence fingerprint outperform simplistic “N independent agents” descriptions for post hoc failure analysis?

## RQ10
Can external experts efficiently audit a CAR packet without reading the full repository history?

---

# 53. Strongest claims this document supports

The following are reasonable design conclusions:

### Supported
- The repository already contains a proto-assurance workflow.
- Major proposed Reliability Engine components have substantial prior art.
- ResearchLoop is particularly close to the broad control-plane idea.
- Multiple-agent agreement is not equivalent to independent evidence.
- PR #56 demonstrates the practical need to separate scientific observation, provenance, preregistration, artifact validity, interpretation, and governance state.
- Artifact freshness is a justified immediate automation target.
- Historical failures should be used as design data, not prospective efficacy evidence.
- A small math-specific overlay is strategically preferable to a general research OS.

### Not supported
- Reliability Engine is novel.
- Reliability Engine improves research reliability.
- Reliability Engine would generalize across science.
- The current project proves a new methodology.
- The current profile-response finding validates the engine.
- A claim ledger plus Git is sufficient for scientific trust.
- Multiple AIs constitute independent verification.
- Formal proof alone guarantees intended-statement correctness.
- Human approval guarantees understanding.

---

# 54. Deep Research 2.0 final recommendation

Proceed.

But proceed with a narrower hypothesis than before.

Build **Reliability Engine v0.1 as a small assurance overlay** around the current repository.

Do not market it.

Do not generalize it.

Do not claim novelty.

Use the current project’s failures as the design set.

Freeze the evaluation protocol before future evidence.

Then let the next months of real mathematical work try to break the engine.

If it survives by catching *new* failure modes before they escape into canonical claims, while remaining cheap enough that researchers do not bypass it, then there will be something methodologically interesting to publish.

That is a much stronger path than trying to invent a large framework first.

---

# 55. Source audit ledger

The following sources were opened or inspected for this synthesis. “PRIMARY/official opened” means the source itself or an official standards/publisher page was accessed during the audit. It does not imply the repository’s own Level-2 status.

| Source | Status in this review | Relevance |
|---|---|---|
| Xia & Wang (2026), *ResearchLoop: An Evidence-Gated Control Plane for AI-Assisted Research*, arXiv:2605.28282 | PRIMARY FULL TEXT OPENED | Closest broad prior art |
| Zhou & Yu (2026), *Auditable AI-Assisted Research Writing*, arXiv:2608.10858 | PRIMARY ARXIV OPENED | Git sealing, gates, process metrics |
| Rasheed et al. (2026), *From Fluent to Verifiable*, arXiv:2602.13855 | PRIMARY ARXIV OPENED | Claim-level auditability |
| Pratt (2026), *Symposium*, arXiv:2608.19511 | PRIMARY ARXIV OPENED | Durable agent-community records |
| Wang (2026), *FirstResearch*, arXiv:2607.05682 | PRIMARY ARXIV OPENED | Auditable research-question certificate |
| Wojarnik (2026), *Spec-Driven AI for Empirical Research*, SSRN 7073778 | PRIMARY OUTLET OPENED | Epistemic control architecture |
| van Zoonen et al. (2026), *Beyond AI disclosure*, DOI 10.1016/j.emj.2026.06.001 | PUBLISHER OPENED | Claim accountability |
| Bloomfield & Rushby, *Assurance 2.0: A Manifesto*, arXiv:2004.10474 | PRIMARY OPENED | Assurance framing |
| Bloomfield, Netkachova & Rushby, *Defeaters...*, arXiv:2405.15800 | PRIMARY OPENED | Defeaters / skeptical assurance |
| OMG SACM 2.3 | OFFICIAL STANDARD OPENED | Structured assurance cases |
| NASA-STD-8739.8B | OFFICIAL NASA SOURCE OPENED | Software assurance / IV&V |
| NASA IV&V Overview | OFFICIAL NASA SOURCE OPENED | Independence dimensions |
| Knight & Leveson (1986) | PAPER COPY OPENED | Correlated multiversion failures |
| Sandve et al. (2013), DOI 10.1371/journal.pcbi.1003285 | PUBLISHER OPENED | Reproducible computation |
| National Academies (2019), *Reproducibility and Replicability in Science* | OFFICIAL REPORT MATERIAL OPENED | Scientific reproducibility |
| W3C PROV-DM | OFFICIAL STANDARD OPENED | Provenance model |
| Workflow Run RO-Crate (2024), DOI 10.1371/journal.pone.0309210 | PUBLISHER OPENED | Workflow execution provenance |
| SLSA Provenance v1.2 | OFFICIAL SPEC OPENED | Artifact provenance |
| in-toto, USENIX Security 2019 | PUBLISHER/CONFERENCE OPENED | Supply-chain attestation |
| Nosek et al. (2018), DOI 10.1073/pnas.1708274114 | PRIMARY/PUBLISHER COPY OPENED | Preregistration |
| MacCoun & Perlmutter (2015), DOI 10.1038/526187a | PUBLISHER OPENED | Blind analysis |
| Clark, Ciccarese & Goble (2014), DOI 10.1186/2041-1480-5-28 | PRIMARY/PUBLISHER OPENED | Claims/evidence/challenge model |
| Reason (2000), BMJ 320:768–770 | PRIMARY/PUBLISHER OPENED | Systems approach to human error |
| Skitka, Mosier & Burdick (1999), IJHCS 51:991–1006 | PAPER COPY OPENED | Automation bias |
| Schemmer et al. (2023), arXiv:2302.02187 | PRIMARY OPENED | Appropriate reliance |
| Irving, Christiano & Amodei (2018), arXiv:1805.00899 | PRIMARY OPENED | AI debate |
| Wang et al. (2023), arXiv:2305.17926 | PRIMARY OPENED | LLM evaluator bias |
| Panickssery, Bowman & Feng (2024), arXiv:2404.13076 | PRIMARY OPENED | LLM self-preference |
| Romera-Paredes et al. (2024), DOI 10.1038/s41586-023-06924-6 | PUBLISHER OPENED | FunSearch / systematic evaluator |
| Trinh et al. (2024), DOI 10.1038/s41586-023-06747-5 | PUBLISHER OPENED | AlphaGeometry |
| Xin et al. (2024), arXiv:2405.14333 | PRIMARY OPENED | Lean theorem proving |
| Liquid Tensor Experiment repos/blog | PRIMARY PROJECT MATERIAL OPENED | Formal statement fidelity |
| Li et al. (2025), arXiv:2512.09443 | PRIMARY OPENED | Human–AI theorem proving |
| Lu et al. (2024), arXiv:2408.06292 | PRIMARY OPENED | AI Scientist |
| Nature Machine Intelligence (2026), DOI 10.1038/s42256-026-01183-2 | PUBLISHER OPENED | Multi-agent transparency |
| FutureHouse/Robin Nature (2026), DOI 10.1038/s41586-026-10652-y | PUBLISHER OPENED | Multi-agent automated science |
| Liu & Ou (2026), *Verification-First Autonomous Catalysis* | PUBLISHER SOURCE OPENED | Verification-first science agents |

---

# 56. Bibliography / stable links

1. Xia, Y., Wang, T. (2026). **ResearchLoop: An Evidence-Gated Control Plane for AI-Assisted Research.** arXiv:2605.28282. https://arxiv.org/abs/2605.28282  
2. Zhou, Y., Yu, C. (2026). **Auditable AI-Assisted Research Writing: An Engineering Discipline with Pre-Registered Process Observation.** arXiv:2608.10858. https://arxiv.org/abs/2608.10858  
3. Rasheed, R. A., Banerjee, S., Mukherjee, A., Hazra, R. (2026). **From Fluent to Verifiable: Claim-Level Auditability for Deep Research Agents.** arXiv:2602.13855. https://arxiv.org/abs/2602.13855  
4. Pratt, D. (2026). **Symposium: Trust via Auditable Records for Communities of AI Scientist Agents.** arXiv:2608.19511. https://arxiv.org/abs/2608.19511  
5. Wang, Y. (2026). **FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents.** arXiv:2607.05682. https://arxiv.org/abs/2607.05682  
6. Wojarnik, G. (2026). **Spec-Driven AI for Empirical Research: A Scoping Review and an Architecture of Epistemic Control.** SSRN. https://doi.org/10.2139/ssrn.7073778  
7. van Zoonen, W., Tursunbayeva, A., Morgan-Thomas, A. (2026). **Beyond AI disclosure: Claim accountability and responsible research in scholarly publishing.** European Management Journal. https://doi.org/10.1016/j.emj.2026.06.001  
8. Bloomfield, R., Rushby, J. (2021). **Assurance 2.0: A Manifesto.** arXiv:2004.10474. https://arxiv.org/abs/2004.10474  
9. Bloomfield, R., Netkachova, K., Rushby, J. (2024). **Defeaters and Eliminative Argumentation in Assurance 2.0.** arXiv:2405.15800. https://arxiv.org/abs/2405.15800  
10. Object Management Group. **Structured Assurance Case Metamodel (SACM) 2.3.** https://www.omg.org/spec/SACM/2.3  
11. NASA. **NASA-STD-8739.8B Software Assurance and Software Safety Standard.** https://swehb.nasa.gov/spaces/SITE/pages/119242809/NASA-STD-8739.8B  
12. NASA. **IV&V Overview.** https://www.nasa.gov/ivv-overview/  
13. Knight, J. C., Leveson, N. G. (1986). **An Experimental Evaluation of the Assumption of Independence in Multiversion Programming.** IEEE Transactions on Software Engineering 12(1), 96–109.  
14. Sandve, G. K., Nekrutenko, A., Taylor, J., Hovig, E. (2013). **Ten Simple Rules for Reproducible Computational Research.** PLOS Computational Biology. https://doi.org/10.1371/journal.pcbi.1003285  
15. National Academies of Sciences, Engineering, and Medicine (2019). **Reproducibility and Replicability in Science.** https://doi.org/10.17226/25303  
16. W3C (2013). **PROV-DM: The PROV Data Model.** https://www.w3.org/TR/prov-dm/  
17. Leo, S. et al. (2024). **Recording provenance of workflow runs with RO-Crate.** PLOS ONE. https://doi.org/10.1371/journal.pone.0309210  
18. SLSA. **Provenance v1.2.** https://slsa.dev/spec/v1.2/provenance  
19. Torres-Arias, S. et al. (2019). **in-toto: Providing farm-to-table guarantees for bits and bytes.** USENIX Security 2019. https://www.usenix.org/conference/usenixsecurity19/presentation/torres-arias  
20. Nosek, B. A. et al. (2018). **The preregistration revolution.** PNAS. https://doi.org/10.1073/pnas.1708274114  
21. MacCoun, R., Perlmutter, S. (2015). **Blind analysis: Hide results to seek the truth.** Nature. https://doi.org/10.1038/526187a  
22. Clark, T., Ciccarese, P. N., Goble, C. A. (2014). **Micropublications: a semantic model for claims, evidence, arguments and annotations in biomedical communications.** https://doi.org/10.1186/2041-1480-5-28  
23. Reason, J. (2000). **Human error: models and management.** BMJ 320:768–770. https://www.bmj.com/content/320/7237/768  
24. Skitka, L. J., Mosier, K. L., Burdick, M. (1999). **Does automation bias decision-making?** International Journal of Human-Computer Studies 51, 991–1006. https://doi.org/10.1006/ijhc.1999.0252  
25. Schemmer, M. et al. (2023). **Appropriate Reliance on AI Advice: Conceptualization and the Effect of Explanations.** arXiv:2302.02187. https://arxiv.org/abs/2302.02187  
26. Irving, G., Christiano, P., Amodei, D. (2018). **AI safety via debate.** arXiv:1805.00899. https://arxiv.org/abs/1805.00899  
27. Wang, P. et al. (2023). **Large Language Models are not Fair Evaluators.** arXiv:2305.17926. https://arxiv.org/abs/2305.17926  
28. Panickssery, A., Bowman, S. R., Feng, S. (2024). **LLM Evaluators Recognize and Favor Their Own Generations.** arXiv:2404.13076. https://arxiv.org/abs/2404.13076  
29. Romera-Paredes, B. et al. (2024). **Mathematical discoveries from program search with large language models.** Nature 625, 468–475. https://doi.org/10.1038/s41586-023-06924-6  
30. Trinh, T. H. et al. (2024). **Solving olympiad geometry without human demonstrations.** Nature 625, 476–482. https://doi.org/10.1038/s41586-023-06747-5  
31. Xin, H. et al. (2024). **DeepSeek-Prover: Advancing Theorem Proving in LLMs through Large-Scale Synthetic Data.** arXiv:2405.14333. https://arxiv.org/abs/2405.14333  
32. Lean Prover Community. **Liquid Tensor Experiment.** https://github.com/leanprover-community/lean-liquid  
33. Topaz, A. (2022). **Definitions in the liquid tensor experiment.** https://leanprover-community.github.io/blog/posts/lte-examples/  
34. Li, C. et al. (2025). **Advancing Research via Human-AI Interactive Theorem Proving.** arXiv:2512.09443. https://arxiv.org/abs/2512.09443  
35. Lu, C. et al. (2024). **The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery.** arXiv:2408.06292. https://arxiv.org/abs/2408.06292  
36. Nature Machine Intelligence (2026). **Multi-agent AI systems need transparency.** https://doi.org/10.1038/s42256-026-01183-2  
37. FutureHouse et al. (2026). **A multi-agent system for automating scientific discovery.** Nature 655, 497–505. https://doi.org/10.1038/s41586-026-10652-y  
38. Liu, Y., Ou, P. (2026). **Verification-First Autonomous Catalysis: Large Language Models as Infrastructure for Mechanism, Computation, and Experiment.** npj Artificial Intelligence.  
39. Project repository. **EPISTEMIC_DISCIPLINE.md.** https://github.com/word-structures/combinatorics-on-words-research/blob/main/EPISTEMIC_DISCIPLINE.md  
40. Project repository. **AGENTS.md.** https://github.com/word-structures/combinatorics-on-words-research/blob/main/AGENTS.md  
41. Project repository. **PR #56 — profile-response soft-engine prep and forensic preservation.** https://github.com/word-structures/combinatorics-on-words-research/pull/56  

---

# Appendix A — Candidate CAR example for a finite computational observation

```yaml
claim_id: CAR-EXAMPLE-001
statement: >
  On the declared sampled epsilon grid for the frozen h=2..7 profile family,
  the h=4 profile (2,1,1) exhibited a sign crossing in the recorded variance
  response relative to the baseline.
scope:
  h: 4
  profile: [2, 1, 1]
  epsilon_grid: [0, 0.1, 0.5, 1, 2, 5, 10, 50, 100]
claim_type: finite_computation

epistemic_status: exploratory_computational_observation

evidence:
  - evidence_id: E-RAW-001
    type: raw_json
    admissibility: preserved_exploratory_evidence
  - evidence_id: E-LOG-001
    type: raw_execution_log
    admissibility: preserved_exploratory_evidence

independence:
  derivation: partial
  algorithm: partial
  data_representation: partial
  input_generation: shared
  language: shared
  runtime: independent_reconstruction_exists_outside_canonical_package
  model_family: n/a
  model_provider: n/a
  prompt_context: exposed
  source_set: n/a
  human_operator: shared
  evaluator_oracle: partial

defeaters:
  - defeater_id: D-001
    description: soft engine may not match intended mathematical path
    status: under_test
  - defeater_id: D-002
    description: crossing may be numerical artifact
    status: partially_refuted

preregistration:
  eligible: false
  data_exposed: true
  override:
    used: true
    type: human_authorization_before_preregistration_freeze

literature:
  novelty_status: not_established

formalization:
  formal_system: none
  kernel_checked: false
  statement_fidelity_reviewed: false

human_gate:
  understanding_check: pending_for_public_claim

promotion:
  eligible_for_math_claims: false
  blockers:
    - exploratory_status
    - novelty_not_established
    - mechanism_not_established
```

This example is illustrative, not a canonical project record.

---

# Appendix B — Candidate Failure Ledger example

```yaml
failure_id: FL-007
episode: profile-response-soft-path-2026-08-25
observed_symptom: >
  A planned preregistered soft-path question was computationally explored
  before the preregistration protocol was frozen.
failure_mode: premature_execution_before_preregistration_freeze

actors:
  - human
  - AI

triggering_conditions:
  - scientifically interesting calculation available immediately
  - human curiosity
  - no machine-enforced preregistration-state warning

why_plausible: >
  Operational permission to compute and scientific permission to treat a result
  as confirmatory were not represented as separate executable states.

scientific_impact: >
  Numerical exploratory observations remain usable for theory development.

epistemic_impact: >
  The exposed h=2..7 soft-path data cannot support a future same-prediction
  pristine preregistered test.

detection_layer: post_run_forensic_review

corrective_action:
  - classify run UNREGISTERED_EXPLORATORY_RUN
  - preserve raw artifacts
  - mark old preregistration draft SUPERSEDED

defense_introduced:
  - proposed automatic exposure-to-preregistration invalidation rule

dataset_role: ENGINE_DESIGN_SET

residual_risk: >
  Data can be exposed informally outside the engine unless human workflows
  also respect the state boundary.
```

---

# Appendix C — Candidate prospective evaluation card

```yaml
metric_id: RE-M01
name: claim_promotion_escape_stage
purpose: >
  Observe where a reliability-relevant defect is detected relative to
  canonical claim promotion.

allowed_values:
  - before_candidate_claim
  - before_pr
  - during_pr
  - after_merge_before_math_claims
  - after_math_claims
  - after_external_publication

blind_spot: >
  Undetected failures are absent from the denominator. This metric cannot
  estimate the true fraction of all failures caught.

standing: descriptive_prospective_metric
```

---

# END
