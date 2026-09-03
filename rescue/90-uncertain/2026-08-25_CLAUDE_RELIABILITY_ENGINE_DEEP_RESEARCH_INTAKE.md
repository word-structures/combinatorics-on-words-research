# Reliability Engine — Deep Research Intake for Claude
## Designing a Human–AI Research Assurance Instrument for Open-Ended Mathematics

**Prepared:** 2026-08-25  
**Project:** `word-structures/combinatorics-on-words-research`  
**Intended use:** independent review by Claude before any repository-level methodology redesign  
**Domain scope:** Abelian-square / combinatorics-on-words research remains the sole mathematical testbed.

---

# 0. Epistemic status of this document

This is a **research-design intake**, not a canonical project policy and not a novelty claim.

It combines:

1. the repository's existing epistemic and agent-governance machinery;
2. a targeted external literature reconnaissance conducted on 2026-08-25;
3. design proposals inferred from that literature;
4. concrete failure modes already observed in the Abelian-square project;
5. hypotheses about what could become a publishable human–AI research methodology.

External papers listed here were **located/opened on the web for this synthesis**, but that does **not automatically grant the repository's `LEVEL_2_VERIFIED_SOURCE` status**. Before any source enters canonical repository literature or supports a canonical claim, Claude or another audit session must reopen the primary source under the repository's citation protocol and record the exact relevant passage/theorem/page.

**METHODOLOGY_NOVELTY_STATUS = NOT_ESTABLISHED**

The central design question is:

> How can a human–AI team conduct open-ended mathematical research so that confidence is earned from independent evidence, provenance, adversarial challenge, reproducibility, and explicit human gates rather than from trust in any individual model?

A useful motto is:

> **Trust is not assigned to an AI. Trust is accumulated through independent evidence.**

---

# 1. Executive conclusion

The current project is **already a proto–Reliability Engine**.

The repository contains unusually strong ingredients:

- a single mathematical claims ledger;
- explicit claim-boundary discipline;
- primary-source citation gates;
- independent re-verification requirements;
- explicit independence dimensions rather than merely "two implementations";
- Git provenance and protected-main workflows;
- correction history;
- failed-run preservation;
- drift checks and tests;
- preregistration;
- a sealed h=8 holdout;
- role separation across human / theory agent / literature-audit agent / implementation agent;
- explicit prohibition against automatically widening claims, claiming novelty, or promoting results.

The most important literature-based conclusion is that the engine should **not** be presented as inventing all of these ideas. Its components have close ancestors in:

- reproducible computational science;
- independent verification and validation (IV&V);
- safety/assurance cases;
- Assurance 2.0;
- preregistration and blind analysis;
- provenance standards and research objects;
- scientific software testing;
- formal verification;
- human-factors / systems approaches to error;
- recent human–AI and multi-agent scientific workflows.

The potentially distinctive contribution is the **integration**:

> a longitudinal, claim-centric, human-gated research assurance architecture for AI-assisted mathematics, evaluated in a real open-ended mathematical research program rather than only on a benchmark.

That novelty must be searched directly. It is currently only a candidate.

---

# 2. The key shift: from "AI workflow" to "research assurance system"

A normal AI workflow asks:

> How do we get the agents to produce a better answer?

A Reliability Engine should ask a different question:

> What evidence would justify accepting this research claim, what could defeat that evidence, and what independent processes are needed before promotion?

This is closer to **assurance engineering** than to ordinary prompt engineering.

The external tradition closest to this architecture may be **Assurance 2.0** (Bloomfield & Rushby). Its organizing idea is that assurance should be built from explicit **claims, arguments, evidence, and defeaters/counterevidence**, with attention to unresolved doubts rather than only accumulating positive support.

That maps almost perfectly onto mathematical research:

```text
Top mathematical claim
        |
        v
precise subclaims / lemmas
        |
        v
proofs + computations + source evidence
        |
        v
independent reproduction / formal checking / expert review
        |
        v
explicit defeaters and unresolved doubts
```

The proposed Reliability Engine should therefore be designed less like a "council of smart AIs" and more like a **research assurance case generator and auditor**.

---

# 3. What the project already has

The current repository already implements many of the strongest ideas found in the external literature.

## 3.1 Existing epistemic controls

`EPISTEMIC_DISCIPLINE.md` already contains, in substance:

- source verification before citation;
- bounded scope language;
- finite computation ≠ infinite theorem;
- separation of heuristic and exact results;
- independent re-verification as mandatory;
- explicit dimensions of independence:
  - derivation,
  - algorithm,
  - data representation,
  - input generation,
  - language,
  - runtime,
  - author;
- numeric drift checks;
- verification boundary vs claim boundary;
- separation between immediate capture and claim acceptance.

This is a strong foundation.

## 3.2 Existing governance controls

`AGENTS.md` already requires:

- cite before code;
- explicit source verification levels;
- immediate provenance;
- human approval gates for canonical claims;
- no unclaimed findings in prose;
- no raw log = no proof;
- interface contracts before code;
- structured final reports;
- mandatory linter/tests;
- independent post-checks;
- bounded exhaustion language;
- careful file placement;
- no automatic publication of experimental AI artifacts.

`CLAUDE.md` already adds a research-state change check and makes major scientific promotions non-automatic.

## 3.3 Existing experimental controls

The project also has:

- preregistered experiments;
- a real blind holdout (`h=8`);
- independent checker paths;
- canonical evidence packages;
- durable correction history;
- rejection of erroneous runs rather than silent cleanup;
- multiple model/agent roles.

This means the immediate goal should **not** be to replace the current process with a huge new bureaucracy.

The goal should be to:
1. formalize what is already working;
2. automate the metadata that is currently manual;
3. instrument the system so that its effectiveness can later be studied.

---

# 4. A live example: why an engine is needed

A useful Reliability Engine case occurred on 2026-08-25.

An implementation agent reported that a soft-engine audit repair was "fully complete" and claimed, among other things, a tie-corrected Spearman value and regenerated audit outputs.

Independent repository inspection found:

- the repaired analysis code did in fact implement tie-aware ranks;
- the machine-readable results produced the corrected Spearman value;
- but the durable Markdown report and another generated JSON artifact were stale and had not been regenerated/committed;
- the agent's final narrative still reported the stale number.

The mathematical core was not thereby refuted. The failure was instead a **synchronization/provenance failure between code, derived artifacts, and final narrative**.

Candidate failure class:

> **STALE_DERIVED_ARTIFACT / REPORT–CODE DIVERGENCE**

This is an excellent example of why "the model says it finished" is not an assurance boundary.

A future engine should detect this automatically by binding every derived report to hashes of the exact input artifacts and generator version.

---

# 5. External literature map

## 5.1 Reproducible computational research

### National Academies of Sciences, Engineering, and Medicine (2019)
**Reproducibility and Replicability in Science**  
DOI: `10.17226/25303`

Relevant design lessons:

- code/data versions are essential reporting details;
- version control is part of reproducibility infrastructure;
- scientific workflow systems and reproducibility audits are legitimate scientific controls;
- incomplete reporting and errors are systemic reproducibility risks.

### Sandve, Nekrutenko, Taylor & Hovig (2013)
**Ten Simple Rules for Reproducible Computational Research**  
PLOS Computational Biology 9(10):e1003285  
DOI: `10.1371/journal.pcbi.1003285`

Especially relevant rules:

1. track how every result was produced;
2. avoid manual manipulation;
3. archive exact external program versions;
4. version-control custom scripts;
5. record intermediate results;
6. record seeds;
7. retain raw data;
8. generate hierarchical output;
9. connect textual statements to underlying results;
10. expose scripts/runs/results.

### Reliability Engine implication

Every high-value computational result should carry a machine-readable **Run Attestation**:

```yaml
run_id:
claim_ids:
git_commit:
code_hashes:
input_hashes:
environment:
runtime:
model_or_tool_versions:
command:
parameters:
random_seed:
raw_output_hash:
derived_artifact_hashes:
generator_versions:
started_at:
finished_at:
operator:
```

The human should not have to type most of this manually. Capture should be automatic.

---

# 6. Independent Verification & Validation (IV&V)

NASA's IV&V framework is unusually relevant.

NASA distinguishes:

- **Verification:** are we building the product right?
- **Validation:** are we building the right product?

For research:

- **verification** asks whether the computation/proof implements the stated method correctly;
- **validation** asks whether the stated method actually answers the mathematical question intended.

This distinction directly describes a failure already known in this project: a verifier can run flawlessly and still verify the wrong mathematical object.

NASA also treats independence as multidimensional (technical, managerial, financial). The exact dimensions differ in research, but the important insight transfers:

> **independence is not equivalent to having a second participant.**

## 6.1 Proposed research-independence fingerprint

For every important reproduction, record which dimensions actually differ:

| Axis | Same / Different / Unknown |
|---|---|
| model family | |
| model provider | |
| discovery context | |
| prompt / task formulation | |
| mathematical derivation | |
| algorithm | |
| data representation | |
| input generation | |
| implementation language | |
| runtime / numerical library | |
| source set | |
| human author/operator | |
| oracle/verifier | |

Do **not** collapse this to one "independence score" initially.

A second model that received the first model's derivation is not an independent derivation.  
A separately written program sharing the same incorrect oracle is not independent evidence for the underlying mathematics.

---

# 7. Correlated failure: why "three AIs agree" is weak evidence

Knight & Leveson's classic 1986 experiment on multi-version software is a powerful warning.

Twenty-seven independently developed software versions were tested. Failures were correlated substantially more often than would be expected under a naive independence assumption.

The analogy should be explicit:

> Different AI agents can share training distributions, conventions, source material, problem framing, and conceptual blind spots.

Therefore:

```text
three agents agree
```

must never automatically become:

```text
three independent pieces of evidence
```

The engine should prefer **heterogeneous evidence**:

- a natural-language derivation;
- a symbolic/algebraic derivation;
- an independent program;
- an exact small-case enumeration;
- a formal proof;
- an external expert;
- a preregistered holdout.

Diversity of *method* is usually more valuable than headcount.

---

# 8. AI self-critique and multi-agent debate: useful, not sufficient

The AI literature is mixed, which is important.

## 8.1 Self-refinement can help

Madaan et al. (NeurIPS 2023), **Self-Refine**, showed that iterative self-feedback can improve outputs on a range of tasks.

This supports using the same agent for:
- drafting;
- local cleanup;
- generating objections;
- improving exposition.

## 8.2 Intrinsic self-correction can fail

Huang et al. (ICLR 2024), **Large Language Models Cannot Self-Correct Reasoning Yet**, found that reasoning self-correction without external feedback can fail and sometimes degrade performance.

Design consequence:

> self-review is a productivity layer, not an acceptance layer.

## 8.3 Multi-agent debate is not automatically reliable

Smit et al. (ICML 2024), **Should We Be Going MAD?**, found that multi-agent debate did not reliably outperform simpler prompting/ensemble methods across their benchmarks and was sensitive to protocol choices.

Design consequence:

> "Claude debated ChatGPT" is not itself evidence.

A debate becomes useful only when:
- roles are asymmetric;
- objections are explicit;
- evidence is attached;
- unresolved disputes block promotion;
- a discriminating test can be designed.

---

# 9. Assurance 2.0: the strongest conceptual ancestor

### Bloomfield & Rushby
**Assurance 2.0: A Manifesto**  
arXiv: `2004.10474`

The central design idea is not merely "collect evidence."

It is:

> make the reasoning from evidence to claim explicit, and actively identify **defeaters** and counterevidence.

A research claim should therefore not merely have a list of supporting artifacts.

It should have something like:

```yaml
claim_id: C117
statement: ...
scope: ...
assumptions:
  - ...
support:
  - E221
  - E235
argument:
  - A44
defeaters:
  unresolved:
    - D19
  resolved:
    - D11
residual_doubts:
  - ...
```

## 9.1 Do not use a single confidence number

Bloomfield & Rushby's later work on confidence in Assurance 2.0 argues against reducing confidence to one simple scalar, instead distinguishing positive support, negative challenges, and residual doubts.

That is particularly important for AI-assisted research.

Do **not** build:

```text
CLAIM CONFIDENCE = 87%
```

Build a multidimensional state instead.

---

# 10. A proposed Atomic Claim Record

Every *high-value* claim should eventually have an Atomic Claim Record (ACR). Do not require this for every exploratory thought.

Example:

```yaml
claim_id: PR-015
statement: >
  Among the frozen h=2,...,7 profile family, all 13 cases with
  S(v)=h-3B(v) != 0 satisfy sign(delta_A)=sign(delta_B)=sign(S).
scope:
  h: [2,7]
  family: frozen_profile_response
  n_cases: 13
claim_type: POST_HOC_COMPUTATIONAL_OBSERVATION

origin:
  proposed_by: ChatGPT
  date: 2026-08-25

epistemic:
  derivation_status: COMPUTED
  reproduction_status: CROSS_IMPLEMENTATION_REPRODUCED
  theorem_status: NOT_PROVED
  novelty_status: NOT_ESTABLISHED

evidence:
  - evidence_id: ...
    type: canonical_dataset
  - evidence_id: ...
    type: independent_recomputation

independence:
  derivation: partial
  algorithm: different
  data_representation: ...
  model_family: ...
  runtime: ...

preregistration:
  mode: POST_HOC
  sealed_holdout_exposed: false

defeaters:
  unresolved:
    - small finite family
    - possible correlation-tail explanation
  resolved:
    - wrong historical computeB normalization not reused

review:
  internal_adversarial: yes
  external_domain_expert: no
  peer_review: no

human_gate:
  understood_by_owner: pending
  approved_for_claim_ledger: no
```

This is not intended as bureaucratic YAML for everything. It is for candidate results that may become paper claims.

---

# 11. Claim states should be multidimensional, not one linear ladder

A tempting lifecycle is:

```text
IDEA -> HYPOTHESIS -> COMPUTED -> REPRODUCED -> PROVED -> PUBLISHED
```

That is useful visually but hides orthogonal dimensions.

A better engine tracks separate axes.

## Epistemic axis

- IDEA
- HYPOTHESIS
- DERIVED
- COMPUTED
- PROVED
- REFUTED

## Reproduction axis

- NONE
- SAME_PATH_RERUN
- CROSS_METHOD
- CROSS_IMPLEMENTATION
- EXTERNAL_REPRODUCTION

## Literature axis

- UNCHECKED
- LOCATED
- PRIMARY_OPENED
- SOURCE_AUDITED
- NOVELTY_SEARCHED

## Experiment-design axis

- EXPLORATORY
- POST_HOC
- PREDECLARED
- PREREGISTERED
- BLINDED_CONFIRMATORY

## Review axis

- SELF_REVIEW
- INTERNAL_ADVERSARIAL
- HETEROGENEOUS_AGENT_REVIEW
- EXTERNAL_EXPERT
- PEER_REVIEW

## Human-understanding axis

- NOT_REVIEWED
- HUMAN_SUMMARY_COMPLETED
- ASSUMPTIONS_UNDERSTOOD
- OWNER_ACCEPTED

No single axis substitutes for another.

A claim can be:
- mathematically proved but novelty-unchecked;
- computationally reproduced but post-hoc;
- preregistered but implemented incorrectly;
- formally verified but formalized against the wrong informal statement.

---

# 12. Preregistration and blinding

### Nosek et al. (PNAS 2018)
**The preregistration revolution**  
DOI: `10.1073/pnas.1708274114`

The key distinction is between:
- generating a hypothesis using observed data;
- testing it using new observations.

This maps directly to computational mathematics when the project is using finite experiments to generate conjectures.

## 12.1 Reliability Engine lanes

The engine should have two visibly separate lanes:

```text
EXPLORATORY LANE
idea -> inspect -> fit -> discover -> revise

CONFIRMATORY LANE
freeze hypothesis -> freeze method -> seal test data -> execute -> report regardless of result
```

Never convert an exploratory result into a confirmatory result by changing its label after the fact.

## 12.2 Blind analysis and sealed cases

The project's h=8 blindness is a strong methodological asset.

A sealed holdout should track:

```yaml
holdout_id:
sealed_at:
permitted_metadata:
forbidden_operations:
exposure_events:
contamination_status:
preregistration_commit:
opened_at:
```

However, unknown mathematical cases are precious. Do not use h=8 as a routine software test.

Use:
- synthetic fixtures;
- exact small cases;
- known historical cases;
- mutation tests

for everyday calibration.

Reserve sealed unknown cases for genuine confirmatory questions.

---

# 13. Provenance: from Git history to claim replay

Git gives file history, but a research engine needs **semantic provenance**.

The long-term ideal is:

```text
Claim C117
  |
  +-- arose from observation O34
  |
  +-- uses dataset D19
  |
  +-- computed by run R202
  |      +-- code SHA ...
  |      +-- input hash ...
  |      +-- raw output ...
  |
  +-- challenged by defeater X7
  |
  +-- repaired in run R219
  |
  +-- independently reproduced in R231
  |
  +-- literature audit L41
  |
  +-- preregistration P8
```

Then:

> **REPLAY CLAIM C117**

could reconstruct the research path.

## 13.1 Relevant external models

- W3C PROV provides a general provenance ontology.
- RO-Crate packages research objects.
- Workflow Run RO-Crate explicitly records workflow execution provenance and bundles inputs, outputs, code and related artifacts.
- Micropublications model scientific outputs as defeasible arguments supported by evidence and repeatable methods.

The project probably should **not** implement all of these standards immediately.

But their data models should inform our schema so that future export/interoperability is possible.

---

# 14. Micropublications: a direct conceptual match

Clark, Ciccarese & Goble (2014):
**Micropublications: a semantic model for claims, evidence, arguments and annotations in biomedical communications**  
DOI: `10.1186/2041-1480-5-28`

Their starting point is highly relevant:

scientific publications are representations of **defeasible arguments**, supported by data and repeatable methods.

That suggests a powerful reframe:

`MATH_CLAIMS.md` should eventually be viewed not merely as a table of claims, but as the human-readable surface of a **claim-evidence graph**.

This is likely one of the strongest literature bridges for a Reliability Engine paper.

---

# 15. Scientific software testing: the oracle problem

Mathematical research code has a special risk:

> the program can execute perfectly while implementing the wrong mathematical predicate.

This is a form of the **oracle problem** in scientific software testing.

The engine should maintain a test pyramid.

## Level 1 — unit tests
Local helpers, parsing, encoding, arithmetic identities.

## Level 2 — exact small-case oracle tests
Cases whose full answer can be computed independently.

## Level 3 — property-based tests
Examples:
- alphabet permutation invariance;
- profile orbit invariance;
- known monotonicity where mathematically guaranteed;
- exact conservation identities.

## Level 4 — metamorphic tests
When no exact expected answer exists, transform the input in a way that should preserve/change a known relation.

## Level 5 — differential tests
Two genuinely different algorithms.

## Level 6 — mutation tests
Deliberately break:
- index;
- sign;
- normalization;
- threshold;
- profile mapping;
and require the test suite to detect the mutation.

## Level 7 — presentation invariance
Change the state representation / higher-block presentation and verify invariant mathematical outputs.

## Level 8 — independent external reproduction
Fresh implementation outside the discovery codebase.

The key principle:

> test the mathematical specification, not only the implementation.

---

# 16. Formal verification: powerful but not magical

Formal proof assistants can provide extremely strong checking once a theorem has been accurately formalized.

Recent mathematical AI systems such as AlphaProof show the strength of formal-language verification.

But formal verification has a critical boundary:

```text
proof assistant proves FORMAL_STATEMENT
```

does not automatically imply:

```text
FORMAL_STATEMENT == intended informal research claim
```

A wrong translation can be formally proved.

Therefore a Reliability Engine needs a **formalization equivalence gate**:

1. informal claim fixed;
2. formal statement written;
3. independent human/agent audit of equivalence;
4. then formal proof.

Formal proof is one assurance layer, not a replacement for claim-boundary review.

---

# 17. Human factors: design for fallibility, not heroism

James Reason's system approach to human error is a useful general principle.

Do not build a process that assumes:
- the human will always notice;
- Claude will always be skeptical;
- ChatGPT will remember the constraint;
- Antigravity will regenerate all artifacts;
- the expert reviewer will catch everything.

Build layered controls because every participant can fail.

This is particularly important for a human research owner who is not a domain specialist.

The engine's purpose should not be to make the human *pretend* to be the expert.

It should make the human capable of asking:

- What exactly is being claimed?
- What assumptions does it need?
- Which evidence supports it?
- Which independent route checked it?
- What objections remain?
- Which part do I personally understand?
- What must an external mathematician still check?

---

# 18. Human understanding must be an explicit gate

A risk of advanced AI assistance is that artifact quality can rise faster than the human's understanding.

For a research system, this is dangerous.

Proposed high-tier claim gate:

## Human Understanding Statement

Before a claim is promoted to a publication-level candidate, the research owner writes, in their own words:

1. the claim;
2. why it matters;
3. the assumptions;
4. the core proof/computational idea;
5. what the independent evidence establishes;
6. what it does not establish;
7. the strongest unresolved doubt.

This is **not** a test that the human can reproduce every proof line.

It is a test that the human actually owns the epistemic boundary.

If the statement cannot be written, promotion pauses.

---

# 19. Roles and separation of powers

The current project has organically developed a useful structure.

Possible formal roles:

## Human Research Owner
- chooses goals;
- sets risk tolerance;
- approves preregistrations;
- controls sealed holdouts;
- accepts/rejects canonical claim promotion;
- writes human-understanding statement.

## Discovery/Synthesis Agent
- generates hypotheses;
- synthesizes mechanisms;
- proposes discriminating experiments;
- cannot unilaterally promote its own claim.

## Clean-Room Theory/Literature Agent
- derives from scratch;
- checks primary sources;
- attacks the discovery agent's argument;
- must disclose which prior artifacts it saw.

## Implementation/Reproduction Agent
- writes code;
- builds durable artifacts;
- runs tests;
- records provenance;
- cannot accept its own experiment as a scientific claim.

## External Domain Expert
- joins only for high-value claims;
- receives a bounded assurance package;
- is asked to find errors, not endorse the project.

No role is "the authority."

Authority belongs to the evidence chain.

---

# 20. A rule worth formalizing

> **No single agent may originate a high-value claim, implement the decisive confirming test, and serve as the final acceptance judge for that claim.**

This is not because any one model is untrustworthy.

It is because role separation reduces correlated self-confirmation.

Exceptions may be allowed for low-risk exploratory work, but not canonical promotion.

---

# 21. Defeater Ledger / Failure Ledger

The project already preserves failed runs. This should become a formal research object.

Possible file:

`research/methodology/FAILURE_LEDGER.md`

or a machine-readable companion under `research/methodology/failures/`.

For every substantive failure:

```yaml
failure_id:
date:
stage:
claim_or_run:
failure_class:
symptom:
why_it_looked_plausible:
root_cause:
detection_layer:
would_it_have_escaped_without_this_control:
affected_artifacts:
scientific_impact:
repair:
new_control_added:
residual_risk:
```

## Candidate taxonomy from this project

### F1 — Mathematical derivation error
Example: wrong asymptotic-variance formula.

### F2 — Index / target-mapping error
Example: q_v target-index bug.

### F3 — Normalization / coordinate mismatch
Example: wrong `computeB` scalar reused quantitatively.

### F4 — Success-criterion contamination
Example: hard-coded SUCCESS.

### F5 — Structural graph misclassification
Example: ranking SCCs by size rather than spectral radius.

### F6 — Numerical threshold changes mathematical topology
Example: soft positive edges discarded by a tolerance.

### F7 — Citation / source hallucination
Precise-looking source attribution without direct verification.

### F8 — Scope / quantifier widening
Finite or bounded computation narrated as general mathematical conclusion.

### F9 — Governance breach
Example: force push despite additive-history rule.

### F10 — Documentation-state corruption
Example: unrelated B22 preregistration falsely marked closed.

### F11 — Stale derived artifact
Code fixed but generated report/output not refreshed.

### F12 — Correlated audit failure
Multiple agents agree because they share a derivation/oracle.

The goal is not to shame an agent.

The goal is to learn which layer caught the defect and how the engine changed.

---

# 22. Engine telemetry

If the Reliability Engine may itself become a research contribution, we need prospective measurements.

Do **not** build a single "trust score."

Track process telemetry instead.

## Claim telemetry
- candidate claims created;
- claims promoted;
- claims weakened;
- claims rejected;
- claims later corrected;
- claims surviving external review.

## Failure telemetry
- failures by taxonomy;
- detection layer;
- time to detection;
- severity;
- whether the failure reached canonical docs;
- whether a new control was added.

## Reproduction telemetry
- rerun success rate;
- cross-method success rate;
- cross-implementation success rate;
- fresh-clone reproduction rate;
- environment drift failures.

## Artifact telemetry
- stale derived artifact incidents;
- raw-output/report mismatches;
- orphan evidence;
- broken claim→evidence links.

## Independence telemetry
- independence fingerprints for high-value claims;
- number of genuinely different derivation routes;
- number of shared-oracle audits mislabeled as independent.

## Preregistration telemetry
- exploratory vs confirmatory runs;
- protocol deviations;
- holdout exposure incidents;
- unplanned parameter changes.

## Human-understanding telemetry
- claims blocked because the human could not explain the boundary;
- assumptions misunderstood and later corrected;
- external expert corrections.

These measurements could later support an empirical methods paper.

---

# 23. The engine should version itself

If the methodology evolves after every discovered bug, then "the Reliability Engine" is a moving target.

Define versions:

```text
RE-v0.1  current informal/proto engine
RE-v0.2  claim records + failure ledger
RE-v0.3  run attestations + stale-artifact CI
RE-v1.0  frozen prospective evaluation protocol
```

Every future high-value claim should record which engine version governed it.

This is essential if we later want to make an empirical statement such as:

> adding independence fingerprints reduced false acceptance.

Without engine versions, retrospective causal claims will be impossible.

---

# 24. Meta-preregistration: the methodology itself needs protection from hindsight

There is a subtle danger:

If we build the Reliability Engine by looking at every failure and then later claim that the engine is excellent because it catches those failures, we have evaluated it on its training set.

Therefore:

## Retrospective phase
Use historical failures to design the engine.

But label them:

`ENGINE_DESIGN_SET`

## Prospective phase
Freeze:
- failure taxonomy;
- promotion gates;
- telemetry;
- evaluation criteria;

before observing the next set of high-value research episodes.

Label those future episodes:

`ENGINE_PROSPECTIVE_EVALUATION_SET`

This is the methodological equivalent of the h=8 principle.

---

# 25. Proposed threat model

A real engine should be threat-model driven.

| Threat | Preventive control | Detective control | Corrective control |
|---|---|---|---|
| hallucinated citation | primary-source gate | citation audit | retract/repair |
| wrong derivation | role separation | clean-room derivation | revise theorem |
| shared conceptual error | independence fingerprint | heterogeneous method | external expert/formal proof |
| implementation bug | tests | differential/mutation tests | repair + regression |
| verifier checks wrong property | specification contract | independent oracle/metamorphic test | redesign verifier |
| stale report | generated artifact hashes | CI freshness check | regenerate |
| post-hoc tuning | preregistration | deviation log | relabel exploratory |
| holdout leakage | access control | exposure ledger | contaminate/replace holdout |
| scope widening | bounded claim schema | claim-drift linter | narrow wording |
| agent self-approval | role policy | promotion gate | require separate reviewer |
| model consensus mistaken for independence | independence matrix | audit fingerprint | new evidence route |
| context/handoff loss | handoff schema | contradiction scan | correction entry |
| formal proof of wrong statement | statement mapping | formalization audit | refactor statement |
| environment/version drift | run attestation | fresh-clone CI | pin/containerize |
| automation outpaces human understanding | human-summary gate | comprehension review | pause promotion |
| selective reporting / best-of-many | attempt ledger | provenance/replay | disclose full search |

---

# 26. Automated controls worth building

The engine should automate repetitive assurance so that human attention is saved for mathematics.

## 26.1 Derived-artifact freshness check

Every generated evidence/report artifact should contain or be accompanied by:

```yaml
generated_by:
generator_sha:
input_hashes:
generated_at:
```

CI recomputes or verifies these fingerprints.

This would have caught the 2026-08-25 stale report incident automatically.

## 26.2 Claim-evidence link linter

For every promoted claim:

- referenced evidence object exists;
- evidence hash resolves;
- scope fields match;
- claim does not refer to a superseded artifact;
- required gates are present.

## 26.3 Holdout sentinel

If a sealed h=8 path/tool is accessed before authorization:
- hard fail;
- record contamination event.

## 26.4 Source-status linter

Prevent prose from using:
- `proves`,
- `known`,
- `novel`,
- `literature shows`

when the cited source status does not satisfy the required audit level.

## 26.5 Reproduction command

Every evidence capsule should ideally support:

```bash
node reproduce.js <claim_id>
```

or an equivalent containerized command.

---

# 27. Minimal viable Reliability Engine — do not overengineer

The strongest recommendation from this synthesis is **restraint**.

The repository already has many good controls.

Do not add twenty forms.

Add three things first.

## MVE-1: Failure Ledger

Begin recording substantive failures prospectively.

This has high scientific value and low implementation cost.

## MVE-2: Claim Assurance Record for high-value claims only

A small machine-readable file alongside the evidence capsule containing:
- claim;
- scope;
- evidence;
- independence;
- defeaters;
- prereg status;
- review status.

Do not migrate the entire historical ledger immediately.

## MVE-3: Derived-artifact freshness / run-attestation automation

Fix the class of failure just observed:
code changed, output/report stale.

These three changes would materially improve assurance without distracting from Abelian-square research.

---

# 28. What should remain intentionally human

Do not automate:

- final mathematical importance judgment;
- claim promotion to "proved";
- novelty judgment;
- decision to expose a sealed holdout;
- interpretation of unresolved theoretical disagreement;
- external expert acceptance;
- the human-understanding statement.

The engine should make the decision **better informed**, not make the decision disappear.

---

# 29. What should NOT be part of this project now

Do not expand the research domain to:

- conflict resolution;
- medicine;
- physics;
- general AI safety;
- broad autonomous science;
- "peace machine" applications.

The abstract architecture may later transfer to those areas.

But the current project becomes much stronger if it can say:

> We developed and evaluated the assurance system in one deep, adversarially difficult domain: open-ended combinatorics-on-words research.

Breadth can be a later validation study.

---

# 30. Why Abelian-square research is a strong testbed

This domain has useful properties for studying research reliability:

1. **Real open questions**  
   The system cannot simply retrieve the answer.

2. **Exact mathematical predicates**  
   Many local properties can be independently checked.

3. **Large computational search spaces**  
   Software correctness matters.

4. **Infinite-vs-finite boundaries**  
   Overclaiming risks are explicit.

5. **Literature depth**  
   Citation quality can be audited.

6. **Multiple proof/computation modes**  
   Symbolic, automata, spectral, exhaustive search, morphisms, combinatorics.

7. **Natural holdouts**  
   New h-levels or parameter ranges can be sealed.

8. **Real failure history**  
   The project already contains enough errors/corrections to study assurance behavior.

This is much better than designing a toy benchmark that was built specifically to make the engine look good.

---

# 31. Recent human–AI mathematical research comparators

## 31.1 Weinhold (2026)

Diana Weinhold:
**How a Non-Theorist and Two AIs Proved a Theorem: Anatomy of a Human-AI Collaboration in Mathematical Economics**  
SSRN 6591059 / DOI `10.2139/ssrn.6591059`

This is an unusually close comparator.

The abstract emphasizes:
- a non-theorist human;
- multiple LLMs;
- a later hostile AI auditor;
- complementary error modes;
- dead ends as useful construction;
- context management;
- a documented error taxonomy;
- synchronization between prose, mathematics and executable objects.

Important limitation:
the paper states that its claimed proofs had not yet been reviewed by a human mathematician at the time of posting.

### Reliability Engine opportunity

The current project could go beyond the case-study narrative by making:
- claim states machine-readable;
- independence explicit;
- preregistration prospective;
- artifacts replayable;
- failure interception measurable;
- external expert review a planned gate.

## 31.2 AI Co-Mathematician (2026)

Google's **AI Co-Mathematician** is a stateful interactive research workbench supporting:
- ideation;
- literature;
- computational exploration;
- theorem proving;
- theory building;
- uncertainty;
- failed hypotheses;
- mathematical artifacts.

This means the novelty of "a persistent AI mathematics workspace" is likely weak.

Our possible distinction is not raw capability.

It is **assurance architecture and empirical reliability measurement**.

## 31.3 AI Scientist (2024)

The **AI Scientist** explores the opposite end of the spectrum: extensive automation of idea generation, experimentation, writing and simulated review.

This is useful as a contrast.

Reliability Engine should intentionally be:
- human-gated;
- provenance-first;
- skeptical of self-review;
- designed around defeaters;
- optimized for trustworthy claim promotion rather than maximum autonomous throughput.

## 31.4 OpenAI First Proof (2026)

OpenAI's First Proof report is highly relevant because it explicitly notes that expert review was necessary and that the fast evaluation process was not as clean as desired for a properly controlled evaluation.

This supports a genuine research gap:

> research-grade AI reasoning needs an evaluation/assurance framework, not only stronger models.

---

# 32. Potential methods-paper framing

Avoid framing:

> "We invented a multi-agent AI scientist."

That claim is likely false or weak.

Prefer:

> **Research Assurance for Human–AI Mathematical Discovery: A Longitudinal Case Study in Combinatorics on Words**

or:

> **A Claim-Centric Reliability Architecture for Human–AI Mathematical Research**

or:

> **From AI Output to Research Assurance: Provenance, Independent Verification, Preregistration and Defeaters in Open-Ended Mathematics**

The contribution would be:

1. a concrete architecture;
2. a longitudinal error taxonomy;
3. measurable assurance interventions;
4. real mathematical case studies;
5. prospective evaluation;
6. ideally at least one externally validated or peer-reviewed mathematical result produced under the process.

---

# 33. Candidate research questions for a PhD / methods program

## RQ1 — Error ecology
What classes of failure occur in longitudinal AI-assisted mathematical research?

## RQ2 — Detection
Which assurance controls detect which failure classes?

## RQ3 — Independence
Which dimensions of independence are actually predictive of detecting shared errors?

## RQ4 — Provenance
Can claim-centric provenance make AI-assisted mathematical discoveries practically replayable?

## RQ5 — Confirmatory discipline
Does preregistration/blinding reduce post-hoc overfitting and narrative drift in computational conjecture testing?

## RQ6 — Human understanding
Can increasing AI capability coexist with demonstrable human understanding of the accepted claim boundary?

## RQ7 — Cost
What assurance controls give the highest error-detection benefit per unit of time/compute/human effort?

## RQ8 — External validity
Do claims that pass internal Reliability Engine gates survive external expert review better than claims produced by less structured workflows?

---

# 34. Evaluation design

A serious methodology paper needs more than anecdotes.

## 34.1 Retrospective dataset

Use historical incidents as a **design dataset**, for example:

- wrong asymptotic-variance formula;
- q_v target-index error;
- hard-coded success;
- wrong B normalization;
- incorrect SCC ranking;
- force-push governance breach;
- false B22 closure/documentation drift;
- wrong evidence pointer;
- soft-edge threshold topology bug;
- stale generated artifact after code repair.

For each:
- which layer originally caught it?
- which proposed engine control would catch it?
- could a simpler control catch it?
- how late did it escape?

Do not call retrospective detection proof of engine effectiveness.

## 34.2 Prospective evaluation

Freeze Reliability Engine v1.0.

Then observe future high-value research episodes.

Measure:
- failures;
- detection;
- escapes;
- time/cost;
- external reviewer corrections.

## 34.3 Shadow comparisons

For selected archived problems, create blind comparison packets:

A. one-agent ordinary workflow  
B. Reliability Engine workflow

Ask an external evaluator to judge:
- correctness;
- traceability;
- ease of finding weaknesses;
- reproducibility;
- calibration.

This should be designed carefully to avoid merely comparing polished vs unpolished documents.

---

# 35. External expert layer

Before the project claims that Reliability Engine has produced reliable new mathematics, add a human domain expert who did not participate in discovery.

Give them a **bounded assurance package**:

```text
1. exact claim
2. assumptions
3. proof/derivation
4. smallest necessary evidence
5. independent reproduction report
6. unresolved defeaters
7. literature boundary
8. reproduction command
```

Ask:

> Find the strongest flaw or missing assumption.

Not:

> Do you like this work?

Their corrections should become engine telemetry.

---

# 36. A possible Research Assurance Package structure

```text
research/assurance/<claim-id>/
    CLAIM.yaml
    ARGUMENT.md
    DEFEATERS.yaml
    EVIDENCE_MANIFEST.json
    INDEPENDENCE.yaml
    LITERATURE_AUDIT.md
    PREREGISTRATION.md
    RUN_ATTESTATIONS/
    RAW/
    REPRODUCE.md
    HUMAN_UNDERSTANDING.md
    EXTERNAL_REVIEW.md
```

This is a future target, not an immediate migration requirement.

---

# 37. Claim replay

A standout feature for both science and exposition would be a generated timeline:

```text
C117 created
  ↓
Hypothesis proposed
  ↓
First derivation failed
  ↓
Reason recorded
  ↓
Corrected derivation
  ↓
Implementation
  ↓
Independent reproduction
  ↓
Defeater raised
  ↓
Repair
  ↓
Preregistration
  ↓
Blind run
  ↓
Claim promoted
```

The replay should be generated from metadata, not manually narrated after the fact.

This would make the project unusually auditable.

---

# 38. "Peace machine" generalization — later, not now

At an abstract level, the architecture could generalize beyond mathematics:

```text
multiple interpretations
        ↓
atomic claims
        ↓
provenance
        ↓
separate fact / inference / value judgment
        ↓
adversarial but structured challenges
        ↓
shared evidence
        ↓
human decision
```

That may eventually be relevant to conflict interpretation, policy analysis, or deliberation.

But pursuing that now would weaken the research program.

First prove that the assurance architecture works in a domain where:
- truth is crisp;
- computations can be replayed;
- claims can eventually be externally checked.

Mathematics is an unusually good proving ground.

---

# 39. Minimal next implementation after Claude review

Do not implement this document directly.

After Claude's independent audit, the likely smallest next methodology PR should contain only:

### 1. Failure Ledger
A durable but lightweight taxonomy and record.

### 2. High-value Claim Assurance Record schema
Only for new candidate paper-level claims.

### 3. Derived-artifact freshness check
A CI mechanism binding reports to the code/inputs that generated them.

Possibly:

### 4. `docs/research/methodology/RELIABILITY_ENGINE.md`
A short current design document, explicitly versioned and non-grandiose.

Everything else remains a roadmap.

---

# 40. Exact literature audit queue for Claude

Claude should independently open primary sources and classify them.

## P0 — load-bearing

1. **Bloomfield & Rushby (2020/2021), Assurance 2.0: A Manifesto**
   - claims / arguments / evidence;
   - defeaters;
   - indefeasibility;
   - whether our proposed claim-assurance case is genuinely analogous.

2. **Bloomfield & Rushby, Assessing Confidence with Assurance 2.0**
   - why confidence should not be a single scalar;
   - positive / negative / residual perspectives.

3. **NASA IV&V guidance / NASA-STD-8739.8B**
   - definitions of verification, validation and independence;
   - what can be adapted without pretending mathematical research is safety-critical software engineering.

4. **National Academies (2019), Reproducibility and Replicability in Science**
   - code/data versioning;
   - workflow and reproducibility audit recommendations.

5. **Sandve et al. (2013), Ten Simple Rules for Reproducible Computational Research**
   - result→workflow traceability;
   - public scripts/runs/results;
   - intermediate artifacts.

6. **Nosek et al. (2018), The preregistration revolution**
   - exploratory vs confirmatory distinction.

7. **Knight & Leveson (1986), Experimental Evaluation of Independence in Multiversion Programming**
   - correlated independent failures;
   - limits of naive independence assumptions.

8. **Huang et al. (ICLR 2024), Large Language Models Cannot Self-Correct Reasoning Yet**
   - limits of intrinsic self-correction.

9. **Smit et al. (ICML 2024), Should We Be Going MAD?**
   - limits and protocol sensitivity of multi-agent debate.

10. **Clark, Ciccarese & Goble (2014), Micropublications**
    - machine-readable claims/evidence/challenge.

11. **AI Co-Mathematician (2026)**
    - direct comparator for stateful multi-agent mathematical workbench.

12. **Weinhold (2026)**
    - direct case-study comparator for non-theorist + multiple AI + hostile audit.

13. **OpenAI First Proof report (2026)**
    - expert-review needs and controlled-evaluation limitations.

## P1 — architecture completion

14. W3C PROV-O.
15. RO-Crate / Workflow Run RO-Crate.
16. GSN / CAE assurance case standards.
17. Self-Refine (Madaan et al., 2023).
18. formal verification / AlphaProof / Lean workflow literature.
19. scientific software oracle/metamorphic testing literature.
20. NeurIPS reproducibility program / artifact review literature.
21. FAIR principles.

## P2 — only if needed

22. SLSA provenance as an engineering analogy.
23. human factors / Reason system model.
24. adversarial collaboration literature.
25. collective intelligence / social-independence literature.

---

# 41. Questions Claude must answer

Claude must not merely praise the design.

## Literature novelty

1. Is "research assurance" already an established term/framework for AI-assisted science?
2. Has anyone explicitly applied assurance cases / CAE / GSN / Assurance 2.0 to mathematical research or AI-assisted theorem discovery?
3. Are there existing claim-evidence-provenance systems that already subsume the proposed Atomic Claim Record?
4. Is the proposed integration genuinely distinguishable from AI Co-Mathematician, AI Scientist, provenance systems and open-science workflows?
5. Is Weinhold's case study already too close for a methodology paper to claim originality?

## Architecture

6. Which proposed controls are redundant with the current repository?
7. Which controls create bureaucracy without measurable value?
8. Which controls can be automated?
9. What is the minimum viable architecture?
10. Should claim states be multidimensional as proposed?

## Independence

11. Is the proposed independence fingerprint defensible?
12. What literature measures dependence/correlation among AI agents?
13. How should shared training data/model families affect an independence claim?
14. Can independence be experimentally measured rather than only described?

## Evaluation

15. How should a prospective Reliability Engine evaluation be preregistered?
16. What would count as a fair baseline?
17. What metrics avoid rewarding documentation volume rather than actual reliability?
18. How many future research episodes would be enough for a meaningful case-study paper?

## Human factors

19. Is a Human Understanding Statement useful or performative?
20. How can actual understanding be assessed without turning the process into an exam?
21. What role must an external mathematician play before claims about success are justified?

## Threats

22. What important failure classes are missing from the threat model?
23. How can agents collude/correlate unintentionally?
24. How can the system detect stale artifact / narrative divergence?
25. What attacks could pass every proposed gate while leaving the top claim false?

---

# 42. Claude red-team task

Claude should produce four outputs.

## OUTPUT A — Literature audit

A table:

| Source | Opened primary? | Exact relevant theorem/section | What transfers | What does not | Novelty implication |

No secondary-summary inflation.

## OUTPUT B — Architecture critique

For each proposed Reliability Engine component:

- KEEP
- MODIFY
- REJECT
- DEFER

with reasons.

## OUTPUT C — Minimal Reliability Engine v0.1

Specify no more than the smallest set of controls that materially improves the current project.

## OUTPUT D — Publishability / PhD assessment

Give separate ratings for:

1. methodological novelty;
2. empirical evaluability;
3. fit for a methods paper;
4. fit for a PhD chapter/program;
5. risk of being "just good project management";
6. what evidence would move each rating upward.

Claude must actively search for reasons the idea is **not** novel.

---

# 43. Proposed methodology-paper hypothesis — not a claim

A possible central hypothesis is:

> A claim-centric human–AI research workflow that combines explicit provenance, heterogeneous independent verification, defeater tracking, preregistration/blinding, scientific software testing and human/external review will intercept classes of false or overstated mathematical claims that survive ordinary single-agent or self-review workflows.

This is testable.

It should eventually be preregistered before prospective evaluation.

---

# 44. Possible stronger contribution

The deepest idea may not be "use multiple AIs."

It may be:

> **Make epistemic state executable.**

That means:
- a claim has a machine-readable scope;
- evidence has hashes and provenance;
- independence is declared by dimension;
- unresolved defeaters block promotion;
- a preregistration has a sealed state;
- derived reports prove which code/input version generated them;
- CI can reject an invalid epistemic transition.

In that form, the repository is not only storing research.

It is enforcing parts of the research method.

This is a potentially powerful and much more specific contribution than "AI helps research."

---

# 45. Final recommendation to Claude

Assume the following until disproved:

1. the individual ingredients are mostly **not novel**;
2. "multi-agent" is **not** evidence of reliability;
3. self-review is useful but insufficient;
4. provenance and reproducibility should be automated;
5. the current repository already contains a strong proto-engine;
6. the publishable novelty, if any, is the **integration + longitudinal empirical evaluation + real mathematical output**;
7. Abelian-square research should remain the only substantive mathematical domain;
8. methodology evaluation itself must be prospectively frozen before claims of effectiveness.

The desired endpoint is not a perfect AI.

It is a research system in which:

> no participant has to be infallible for a high-value claim to become defensible.

---

# Appendix A — Bibliographic starting list

These are starting points for direct audit, not canonical repo citations.

1. Bloomfield, R. E. & Rushby, J. **Assurance 2.0: A Manifesto.** arXiv:2004.10474.
2. Bloomfield, R. E. & Rushby, J. **Assessing Confidence with Assurance 2.0.** SRI technical report, 2022.
3. NASA. **Independent Verification & Validation Overview** and **NASA-STD-8739.8B Software Assurance and Software Safety Standard.**
4. National Academies of Sciences, Engineering, and Medicine. **Reproducibility and Replicability in Science.** 2019. DOI: 10.17226/25303.
5. Sandve, G. K., Nekrutenko, A., Taylor, J. & Hovig, E. **Ten Simple Rules for Reproducible Computational Research.** PLOS Computational Biology 9(10):e1003285, 2013. DOI: 10.1371/journal.pcbi.1003285.
6. Nosek, B. A., Ebersole, C. R., DeHaven, A. C. & Mellor, D. T. **The preregistration revolution.** PNAS 115(11):2600–2606, 2018. DOI: 10.1073/pnas.1708274114.
7. Knight, J. C. & Leveson, N. G. **An Experimental Evaluation of the Assumption of Independence in Multiversion Programming.** IEEE Transactions on Software Engineering 12(1):96–109, 1986.
8. Huang, J. et al. **Large Language Models Cannot Self-Correct Reasoning Yet.** ICLR 2024. arXiv:2310.01798.
9. Smit, A. P. et al. **Should We Be Going MAD? A Look at Multi-Agent Debate Strategies for LLMs.** ICML 2024, PMLR 235:45883–45905. arXiv:2311.17371.
10. Madaan, A. et al. **Self-Refine: Iterative Refinement with Self-Feedback.** NeurIPS 2023. arXiv:2303.17651.
11. Clark, T., Ciccarese, P. N. & Goble, C. A. **Micropublications: a semantic model for claims, evidence, arguments and annotations in biomedical communications.** Journal of Biomedical Semantics 5:28, 2014. DOI: 10.1186/2041-1480-5-28.
12. Leo, S. et al. **Recording provenance of workflow runs with RO-Crate.** arXiv:2312.07852.
13. Reason, J. **Human error: models and management.** BMJ 320:768–770, 2000.
14. Zheng, D. et al. **AI Co-Mathematician: Accelerating Mathematicians with Agentic AI.** arXiv:2605.06651, 2026.
15. Weinhold, D. **How a Non-Theorist and Two AIs Proved a Theorem: Anatomy of a Human-AI Collaboration in Mathematical Economics.** SSRN 6591059, 2026. DOI: 10.2139/ssrn.6591059.
16. Lu, C. et al. **The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery.** arXiv:2408.06292, 2024.
17. OpenAI. **Our First Proof submissions.** 2026. Direct web source; audit exact passages before repo canonicalization.

---

# Appendix B — Minimal Failure Ledger template

```markdown
## FAILURE-XXXX — Short name

**Date:**  
**Research episode:**  
**Affected claim(s):**  
**Failure class:**  
**Detected by:**  
**Engine version:**  

### What happened

### Why it looked plausible

### Root cause

### What evidence exposed it

### Could it have escaped without this layer?

### Scientific impact

### Repair

### New control introduced

### Residual risk
```

---

# Appendix C — Minimal claim assurance record

```yaml
claim_id:
statement:
scope:
claim_type:

origin:
  date:
  actor:

status:
  epistemic:
  reproduction:
  literature:
  experiment_mode:
  review:

evidence: []

independence:
  derivation:
  algorithm:
  representation:
  input_generation:
  implementation:
  runtime:
  model_family:
  author:

defeaters:
  unresolved: []
  resolved: []

preregistration:
  id:
  holdout_status:

human_gate:
  understanding_statement:
  approval:

history: []
```

---

# Appendix D — Immediate non-goals

- Do not claim the Reliability Engine is unique.
- Do not create a general autonomous scientist.
- Do not expand beyond combinatorics on words.
- Do not convert all historical repository material at once.
- Do not assign model-generated confidence percentages to claims.
- Do not equate number of agents with number of independent checks.
- Do not expose h=8 for methodology testing.
- Do not let methodology work delay the current mathematical theory/literature audit.
