# Reliability Engine v0.1 — Implementation Design
## Minimal Math-Assurance Overlay for `combinatorics-on-words-research`

**Prepared:** 2026-08-25  
**Status:** **DESIGN DRAFT — NOT REPOSITORY POLICY**  
**Target implementation:** separate methodology branch after human review  
**Repository base for design context:** `main` at `0c0b45b26985c75bbc6b71da02b19efe0084e6dc`  
**Mathematical scope:** Abelian-square / combinatorics-on-words project only  
**h=8 rule:** no computation, inspection, enumeration, or system construction as part of Reliability Engine implementation

---

# 1. Objective

Implement the smallest useful Reliability Engine that prevents recurrence of already observed process failures without turning exploratory mathematics into bureaucracy.

v0.1 has three mandatory components:

1. **Failure Ledger**
2. **Claim Assurance Record (CAR) for high-value claims only**
3. **Artifact Freshness / derivation-closure check**

A fourth component is recommended if low-cost:

4. **Minimal Run Attestation**

v0.1 is not a new agent framework.

v0.1 does not replace:

- `MATH_CLAIMS.md`;
- `CURRENT_FOCUS.md`;
- `AGENTS.md`;
- `EPISTEMIC_DISCIPLINE.md`;
- Git;
- CI;
- independent mathematical checking;
- preregistration;
- human review.

It connects them.

---

# 2. Non-goals

Do **not** implement in v0.1:

- general scientific workflow orchestration;
- autonomous multi-agent voting;
- scalar trust/confidence scoring;
- W3C PROV/RDF storage;
- SACM implementation;
- RO-Crate export;
- blockchain;
- cryptographic signing infrastructure;
- a dashboard;
- a web UI;
- vector search;
- autonomous claim promotion;
- automatic novelty claims;
- hidden chain-of-thought capture;
- h=8 research.

---

# 3. Core invariants

v0.1 should make the following invariants executable.

## I1 — Canonical claim authority remains unchanged

```text
MATH_CLAIMS.md is still the sole canonical mathematical claim ledger.
Reliability Engine can block eligibility.
Reliability Engine cannot automatically promote a claim.
```

## I2 — Evidence is not a scalar

No `trust_score`.

No `confidence_percent`.

Status is multidimensional.

## I3 — Missing raw log blocks computational evidence promotion

```text
if claim requires E1+ computational evidence
and raw_log is missing:
    promotion_eligible = false
```

## I4 — Stale derived artifact cannot support a high-value claim

```text
if artifact.status == stale:
    artifact.admissible = false
```

## I5 — Holdout exposure revokes same-prediction preregistration eligibility

```text
if data_exposed == true:
    same_prediction_prereg_eligible = false
```

## I6 — Formal proof and statement fidelity are separate

```text
kernel_checked = true
does not imply
intended_statement_verified = true
```

## I7 — Overrides are allowed but durable

```text
override.used = true
requires:
  actor
  timestamp
  reason
  affected_state
```

## I8 — Exploration remains cheap

Scratch calculations must remain possible without CAR creation.

They simply remain non-canonical until promoted through higher tiers.

---

# 4. Assurance tiers

## E0 — Scratch exploration

Requirements:

- normal Git/scratch discipline;
- no CAR;
- no preregistration;
- dirty worktree allowed;
- no canonical claim promotion.

Use for:

- toy calculations;
- debugging;
- theory sketches;
- speculative code.

## E1 — Reusable computational evidence

Requirements:

- raw output/log;
- code and input identity;
- run attestation or equivalent manifest;
- independent post-check where required by existing repo rules.

Use for:

- counts;
- finite scans;
- benchmark values;
- reproducibility evidence.

## E2 — High-value claim candidate

Requirements:

- CAR;
- explicit scope;
- evidence links;
- independence fingerprint;
- defeaters;
- literature status when relevant;
- human-understanding status.

Use for:

- candidate theorem;
- candidate mechanism;
- major negative result;
- paper-facing empirical observation;
- novelty claim.

## E3 — Confirmatory/holdout/paper-facing

Requirements:

- E2;
- preregistration state frozen where applicable;
- holdout exposure state;
- decisive-test role separation;
- clean-room/external check where feasible;
- human promotion decision.

---

# 5. Proposed repository layout

No new root files.

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
  attest-run.js

tests/reliability/
  failure-ledger.test.js
  claim-assurance.test.js
  artifact-freshness.test.js
  state-transition.test.js

  fixtures/
    stale-artifact/
    exposed-holdout/
    missing-raw-log/
    unresolved-defeater/
```

If `attest-run.js` proves expensive, defer it to v0.1b.

---

# 6. Failure Ledger schema

Recommended YAML structure:

```yaml
schema_version: 0.1

failures:
  - failure_id: FL-001
    episode: string
    date: YYYY-MM-DD

    observed_symptom: string
    failure_mode: string

    actors:
      - human
      - AI
      - tool
      - system

    triggering_conditions:
      - string

    why_plausible: string

    scientific_impact: string
    epistemic_impact: string

    detection_layer: string

    preserved_artifacts:
      - path: string
        sha256: string|null

    corrective_action:
      - string

    defense_introduced:
      - string

    recurrence_test:
      path: string|null

    dataset_role:
      enum:
        - ENGINE_DESIGN_SET
        - ENGINE_EVAL_SET

    residual_risk: string
```

Validator rules:

- `failure_id` unique;
- date valid;
- `dataset_role` mandatory;
- at least one `corrective_action`;
- if an artifact path is claimed hash-bound, SHA256 must be valid format;
- no `blame` field;
- no scalar severity required in v0.1.

---

# 7. Initial Failure Ledger population

Use historical failures only as `ENGINE_DESIGN_SET`.

Suggested initial entries:

```text
FL-001 wrong asymptotic variance formula
FL-002 target-index bug
FL-003 hard-coded SUCCESS criterion
FL-004 wrong SCC ranking/interpretation
FL-005 finite-soft positive edges thresholded away
FL-006 stale derived report / report-code divergence
FL-007 human-authorized execution before prereg freeze
FL-008 corrupted derived Markdown presentation
FL-009 inaccurate method label in derived report
FL-010 structural-phase-transition interpretation overreach
FL-011 uncertain narrative provenance
FL-012 --no-verify governance exception
```

Do not over-document.

Each entry should fit comfortably on one screen.

---

# 8. Claim Assurance Record schema

Recommended YAML:

```yaml
schema_version: 0.1

claim_id: CAR-0001

statement: >
  Exact bounded claim text.

scope:
  domain: string
  parameters: {}
  excluded_scope:
    - string

claim_type:
  enum:
    - theorem
    - finite_computation
    - mechanism
    - negative_result
    - literature
    - novelty
    - methodological

epistemic_status: string

evidence:
  - evidence_id: E-001
    type: raw_log|json|proof|source|certificate|expert_review
    artifact: path|null
    run_id: string|null
    admissibility: admissible|blocked|stale|superseded|unknown

independence:
  derivation: independent|shared|partial|unknown|na
  algorithm: independent|shared|partial|unknown|na
  data_representation: independent|shared|partial|unknown|na
  input_generation: independent|shared|partial|unknown|na
  language: independent|shared|partial|unknown|na
  runtime: independent|shared|partial|unknown|na
  model_family: independent|shared|partial|unknown|na
  model_provider: independent|shared|partial|unknown|na
  prompt_context: clean_room|exposed|partial|unknown|na
  source_set: independent|shared|partial|unknown|na
  human_operator: independent|shared|partial|unknown|na
  evaluator_oracle: independent|shared|partial|unknown|na

defeaters:
  - defeater_id: D-001
    description: string
    blocking: true|false
    status: open|under_test|refuted|confirmed|accepted_residual|superseded
    resolution_evidence:
      - string

preregistration:
  relevant: true|false
  eligible: true|false|null
  protocol_hash: string|null
  data_exposed: true|false|null
  holdout_id: string|null
  override:
    used: true|false
    reason: string|null

literature:
  relevant: true|false
  last_search_date: YYYY-MM-DD|null
  primary_sources_opened:
    - string
  novelty_status: not_assessed|not_established|antecedent_found|candidate_differentiation

formalization:
  relevant: true|false
  system: Lean|Coq|Isabelle|other|null
  kernel_checked: true|false|null
  statement_fidelity_reviewed: true|false|null
  fidelity_artifact: string|null

human_gate:
  understanding_check: pending|pass|fail|na
  scope_approval: pending|pass|fail|na

external_review:
  status: not_requested|requested|received|blocking_concern|pass|na
  artifact: string|null

promotion:
  eligible_for_math_claims: true|false
  blockers:
    - string
```

---

# 9. CAR validator rules

Minimum rules:

## R1
`claim_id` unique.

## R2
`statement` non-empty.

## R3
`scope` required.

## R4
If any evidence item is `stale` or `blocked` and is marked required by the claim class, promotion must be false.

## R5
If any `blocking: true` defeater is `open`, `under_test`, or `confirmed`, promotion must be false.

## R6
If `preregistration.data_exposed == true`, then `preregistration.eligible` cannot be true for the same prediction.

## R7
If `formalization.kernel_checked == true` and `statement_fidelity_reviewed != true`, validator must not allow any derived field equivalent to `intended_theorem_verified=true`.

## R8
If claim type is `novelty`, then `literature.relevant=true` and `novelty_status` cannot be `not_assessed` for promotion.

## R9
If claim type is `finite_computation`, scope must contain explicit parameter/window information.

## R10
Human understanding pass is required for promotion eligibility.

The validator does not promote.

It only detects inconsistent state.

---

# 10. Independence fingerprint — no score

Do not add:

```yaml
independence_score: 8.5
```

The axes themselves matter.

Example:

```yaml
independence:
  derivation: shared
  algorithm: independent
  data_representation: independent
  input_generation: shared
  language: independent
  runtime: independent
  model_family: na
  model_provider: na
  prompt_context: exposed
  source_set: shared
  human_operator: shared
  evaluator_oracle: shared
```

This says much more than “independently verified.”

---

# 11. Artifact dependency manifest

Recommended `research/reliability/artifact-dependencies.json`:

```json
{
  "schema_version": "0.1",
  "artifacts": [
    {
      "artifact": "scratch/profile-response-red-team/WORKING_REPORT.md",
      "generator": "scratch/profile-response-red-team/build_working_report.js",
      "inputs": [
        "scratch/profile-response-red-team/audit_phases_1_3_results.json",
        "scratch/profile-response-red-team/soft_test_out.json"
      ],
      "mode": "deterministic_regeneration",
      "semantic_checks": [
        {
          "type": "json_markdown_numeric_match",
          "source": "scratch/profile-response-red-team/audit_phases_1_3_results.json",
          "source_pointer": "/phase3_diagnostic/stats_A/spearman",
          "target": "scratch/profile-response-red-team/WORKING_REPORT.md",
          "target_key": "Spearman correlation"
        }
      ]
    }
  ]
}
```

This is an example only.

The implementation should generalize path handling but remain small.

---

# 12. Artifact freshness algorithm

Pseudocode:

```text
for each dependency entry:
    validate paths

    if mode == deterministic_regeneration:
        copy declared inputs + generator into temp workspace
        run generator with declared command
        compare generated artifact bytes with committed artifact
        if mismatch:
            FAIL STALE_DERIVED_ARTIFACT

    run semantic checks
    if semantic mismatch:
        FAIL DERIVED_ARTIFACT_SEMANTIC_DRIFT
```

If full temporary regeneration is hard, v0.1 can initially use dependency hashes:

```text
manifest stores last-known:
  generator_hash
  input_hashes
  artifact_hash

if generator/input hash changed
and artifact hash did not:
    FAIL
```

But deterministic regeneration is preferred.

---

# 13. Freshness checker output

Success:

```text
RELIABILITY ARTIFACT CHECK

PASS  WORKING_REPORT.md
  generator: build_working_report.js
  inputs: 2
  deterministic regeneration: byte-identical
  semantic checks: 3/3

ALL RELIABILITY ARTIFACT CHECKS PASSED
```

Failure:

```text
RELIABILITY ARTIFACT CHECK

FAIL  WORKING_REPORT.md
  class: STALE_DERIVED_ARTIFACT
  generator changed since artifact derivation
  regeneration differs from committed artifact

BLOCKING:
  artifact cannot support E1+ evidence
```

No dramatic language.

---

# 14. Run attestation design

If included in v0.1:

```yaml
schema_version: 0.1
run_id: RUN-2026-0001
timestamp: ISO-8601

git:
  sha: string
  dirty: true|false

command: string
working_directory: string
parameters: {}

code:
  - path: string
    sha256: string

inputs:
  - path: string
    sha256: string

outputs:
  - path: string
    sha256: string

raw_log:
  path: string
  sha256: string

runtime:
  os: string
  node: string|null
  python: string|null
  compiler: string|null

agent:
  provider: string|null
  model: string|null

operator:
  role: human|agent|mixed

research_mode:
  exploratory: true|false
  confirmatory: true|false

preregistration:
  protocol_hash: string|null
  frozen_before_run: true|false|null

blinding:
  holdout_id: string|null
  exposed_before_run: true|false|null

override:
  used: true|false
  reason: string|null
```

---

# 15. `attest-run.js`

Desired use:

```bash
node scripts/reliability/attest-run.js \
  --id RUN-2026-0001 \
  --mode exploratory \
  --command "node scratch/foo.js" \
  --code scratch/foo.js \
  --input research/data/input.json \
  --output scratch/out.json \
  --log scratch/run.log
```

Behavior:

1. capture Git SHA/dirty state;
2. hash declared files;
3. execute command;
4. write raw log;
5. hash outputs;
6. write run YAML/JSON;
7. never silently claim confirmatory status.

If `--mode confirmatory`:

- prereg protocol must be provided;
- `frozen_before_run=true`;
- holdout state must be valid;
- otherwise refuse or downgrade to exploratory with explicit human override.

For v0.1, **downgrade is safer than destructive refusal** for ordinary research, except for explicitly protected holdouts.

---

# 16. Holdout state

Create a small holdout registry only if current project governance can define it without exposing data.

Example:

```yaml
holdouts:
  - holdout_id: PROFILE_RESPONSE_H8
    status: sealed
    allowed_actions:
      - metadata_update
      - preregistration_drafting
    forbidden_actions:
      - construction
      - enumeration
      - computation
      - exploratory_probe
```

Important:

- no hidden values;
- no profile contents;
- no h=8 system inspection;
- this is policy metadata only.

---

# 17. Exposure transition test

Fixture:

```yaml
before:
  preregistration:
    eligible: true
    data_exposed: false

event:
  type: DATA_EXPOSURE

after_expected:
  preregistration:
    eligible: false
    data_exposed: true
```

Test must fail if state remains eligible.

This is a direct regression test for the PR #56 process lesson.

---

# 18. Defeater test

Fixture CAR:

```yaml
defeaters:
  - defeater_id: D-1
    blocking: true
    status: open

promotion:
  eligible_for_math_claims: true
```

Validator must fail:

```text
CAR INVALID:
promotion eligibility conflicts with open blocking defeater D-1
```

---

# 19. Formalization-fidelity test

Fixture:

```yaml
formalization:
  kernel_checked: true
  statement_fidelity_reviewed: false

promotion:
  eligible_for_math_claims: true
```

Whether this blocks promotion depends on claim type and policy, but validator must at minimum emit:

```text
FORMAL_PROOF_ONLY:
kernel check does not establish intended statement fidelity
```

For theorem claims where formal proof is the decisive evidence, this should block.

---

# 20. Missing raw log test

Fixture finite computation:

```yaml
claim_type: finite_computation
evidence:
  - type: json
    artifact: result.json
    raw_log: null
promotion:
  eligible_for_math_claims: true
```

Must fail when existing project policy requires raw output.

---

# 21. Override design

Overrides are not hidden failures.

Example:

```yaml
override:
  override_id: OVR-001
  timestamp: 2026-08-25T12:00:00+03:00
  actor: human_research_owner
  rule: PREREGISTRATION_FREEZE_REQUIRED
  action: allow_exploratory_execution
  consequence:
    confirmatory_status: false
    preregistration_eligibility: false
  reason: curiosity_driven_exploration
```

The engine should make this easy.

If overrides are painful to record, users will bypass the engine.

---

# 22. CI integration

Recommended first CI command:

```bash
node scripts/reliability/validate-failure-ledger.js
node scripts/reliability/validate-claim-assurance.js
node scripts/reliability/check-artifact-freshness.js
```

Add to existing test pipeline only after local use proves stable.

Rollout:

```text
Week 1: warning mode
Week 2+: blocking only for deterministic violations
```

Do not block on subjective fields.

---

# 23. Pre-commit versus CI

Use pre-commit for fast deterministic checks:

- schema validity;
- obvious inconsistent states;
- cheap freshness checks.

Use CI for:

- deterministic regeneration;
- slower tests;
- clean environment replay.

Do not use pre-commit for:

- literature novelty judgments;
- human understanding;
- external expert review.

Those are state requirements, not automated truth tests.

---

# 24. Migration policy

Do not backfill every historical result.

Backfill only:

1. historical failures used as ENGINE_DESIGN_SET;
2. one or two high-value claims used to test CAR ergonomics;
3. one artifact chain used for freshness.

A massive historical migration would create low-value work and risk rewriting history.

---

# 25. First CAR candidate

Choose a high-value but non-h8 claim.

Possible candidates:

- profile-response 13/13 finite sign observation;
- a major Route-C bounded result;
- another existing paper-level candidate.

Selection criteria:

- real evidence already exists;
- several assurance dimensions matter;
- no new mathematics required;
- does not require h=8.

Do not choose a trivial claim merely to get a green demo.

---

# 26. First freshness target

Use the already observed failure chain:

```text
audit_phases_1_3_results.json
soft_test_out.json
       ↓
build_working_report.js
       ↓
WORKING_REPORT.md
```

Why:

- real failure happened here;
- deterministic relationship exists;
- expected numeric semantic checks are known;
- direct regression value.

This is exactly what ENGINE_DESIGN_SET is for.

---

# 27. First Failure Ledger entries

Write concise records.

Example:

```yaml
- failure_id: FL-006
  episode: profile-response-soft-engine-prep
  date: 2026-08-25
  observed_symptom: >
    Generator/analysis code and machine-readable results were updated,
    but the committed Markdown working report retained stale values/wording.
  failure_mode: STALE_DERIVED_ARTIFACT
  actors: [AI, system]
  triggering_conditions:
    - derived report regeneration was not coupled to generator changes
  why_plausible: >
    Code correctness and artifact freshness were reviewed separately.
  scientific_impact: >
    Underlying corrected machine-readable value existed.
  epistemic_impact: >
    Narrative artifact could misstate the evidence if treated as current.
  detection_layer: independent_repository_audit
  corrective_action:
    - regenerate and synchronize derived artifacts
  defense_introduced:
    - artifact freshness checker
  recurrence_test:
    path: tests/reliability/fixtures/stale-artifact/
  dataset_role: ENGINE_DESIGN_SET
  residual_risk: >
    Semantic drift may remain if artifact regeneration is nondeterministic.
```

---

# 28. Prospective evaluation freeze

Do not count future events for methodology claims until a protocol exists.

Create later:

```text
research/reliability/RELIABILITY_ENGINE_EVALUATION_PROTOCOL_v1.md
```

It should specify:

- date of freeze;
- engine version;
- design-set cutoff;
- eval-set start;
- metrics;
- metric blind spots;
- amendment procedure;
- what counts as a reliability-relevant event;
- what counts as claim promotion;
- how overrides are counted;
- what claims about efficacy are forbidden.

This is not part of implementation v0.1 unless the software stabilizes.

---

# 29. Metric card candidates

## M1 Detection stage

```text
before_candidate_claim
before_pr
during_pr
post_merge_pre_claim
post_claim
post_publication
```

## M2 Time to detection

Minutes/hours/days from artifact creation or state transition.

## M3 Claim-promotion block

Did a deterministic control block an inconsistent claim state?

## M4 Artifact freshness incident

Count stale artifacts detected before merge.

## M5 Override completeness

Fraction of overrides with actor, reason, timestamp, consequence.

## M6 Replayability

Can the declared run be replayed from attested code/input/environment?

## M7 False block

A deterministic engine rule blocked work that, after review, should have been allowed.

## M8 Human overhead

Minutes per E2/E3 claim.

Do not create a composite score.

---

# 30. Methodology anti-Goodhart rules

For each metric record:

```yaml
metric:
  name:
  interpretation:
  blind_spot:
  gaming_risk:
  evidential_standing:
```

Example:

```yaml
name: open_defeater_count
interpretation: number of currently open defeaters
blind_spot: low count may mean under-reporting, not high quality
gaming_risk: users avoid registering doubts
evidential_standing: descriptive_only
```

This prevents “clean dashboard” behavior from becoming the objective.

---

# 31. Human workflow

For E2/E3 claim review, UI is unnecessary.

A CLI prompt or YAML fields suffice.

Human understanding check:

```text
[ ] I can state the claim.
[ ] I can state its scope boundary.
[ ] I can name the strongest evidence.
[ ] I can name the strongest open defeater.
[ ] I know whether the result is exploratory or confirmatory.
```

No automatic “pass” based on LLM-generated answers.

---

# 32. Model/agent metadata

Record when relevant:

```yaml
agent:
  provider:
  model:
  role:
  prompt_artifact:
```

But do not overfit schema to current model names.

The engine must survive model turnover.

---

# 33. Prompt retention

Retain task prompts when:

- they materially define experiment scope;
- they define role separation;
- they specify forbidden actions;
- they are necessary to interpret a run.

Do not retain every conversational turn.

Do not retain hidden chain-of-thought.

---

# 34. External source state

CAR literature section should support:

```text
UNSEARCHED
SEARCH_IN_PROGRESS
PRIMARY_SOURCES_OPENED
ANTECEDENT_FOUND
NOVELTY_NOT_ESTABLISHED
CANDIDATE_DIFFERENTIATION
EXPERT_AUDIT_PENDING
```

Never use:

```text
NOVEL = true
```

as an automatic field.

Novelty remains a human/expert judgment backed by search evidence.

---

# 35. Error messages should be epistemically precise

Bad:

```text
CLAIM FAILED
```

Better:

```text
PROMOTION BLOCKED

Claim: CAR-0003
Reason:
  blocking defeater D-004 is OPEN
Scientific truth status:
  NOT DETERMINED BY THIS CHECK
```

Bad:

```text
RUN INVALID
```

Better:

```text
RUN NOT ADMISSIBLE AS CONFIRMATORY EVIDENCE

Reason:
  preregistration was not frozen before execution

Exploratory status:
  ALLOWED
```

The tool should never confuse governance failure with mathematical falsity.

---

# 36. Tests derived from PR #56

At minimum:

```text
T-001 wrong_formula_fixture_requires_independent_derivation_status
T-002 target_index_bug_fixture_detected_by_oracle_mismatch
T-003 hardcoded_success_cannot_override_failed_gate
T-004 scc_selection_uses_declared_criterion
T-005 finite_soft_positive_edges_not_removed
T-006 stale_working_report_fails_freshness
T-007 exposed_data_invalidates_same_prediction_prereg
T-008 corrupted_template_placeholders_detected
T-009 method_label_semantic_mismatch_detected
T-010 override_requires_reason
T-011 no_verify_event_can_be_logged_as_exception
T-012 missing_raw_log_blocks_E1_promotion
```

Not all tests need implementation in v0.1. Prioritize T-006, T-007, T-010, T-012.

---

# 37. Implementation sequence — three PRs

## PR A — ledger and schemas

Changes:

```text
research/reliability/README.md
research/reliability/failure-ledger.yaml
research/reliability/schemas/failure-ledger.schema.json
scripts/reliability/validate-failure-ledger.js
tests/reliability/failure-ledger.test.js
```

No CAR yet.

Goal:
- test ergonomics;
- record design set.

## PR B — freshness

Changes:

```text
research/reliability/artifact-dependencies.json
scripts/reliability/check-artifact-freshness.js
tests/reliability/artifact-freshness.test.js
```

Goal:
- automatically reproduce PR #56 stale-artifact failure.

## PR C — CAR

Changes:

```text
research/reliability/claims/CAR-0001.yaml
research/reliability/schemas/claim-assurance.schema.json
scripts/reliability/validate-claim-assurance.js
tests/reliability/claim-assurance.test.js
```

Optional `attest-run.js` only if clean.

This sequence limits blast radius.

---

# 38. Branch/governance proposal

When implementation begins:

```text
methodology/reliability-engine-v0.1-2026-08-XX
```

Rules:

- branch from current `main`;
- no direct main edits;
- no force push;
- no h=8;
- no `MATH_CLAIMS.md` changes;
- no `CURRENT_FOCUS.md` change unless human explicitly decides methodology becomes active research direction;
- draft PR first;
- implementation audit before merge.

---

# 39. Acceptance gate for PR A

Must show:

| Check | Required |
|---|---|
| Schema validation | PASS |
| Historical entries | 8–12 concise entries |
| All historical entries marked `ENGINE_DESIGN_SET` | PASS |
| No blame language | PASS |
| No new root files | PASS |
| No h=8 content beyond policy metadata | PASS |
| MATH_CLAIMS unchanged | PASS |
| CURRENT_FOCUS unchanged | PASS |
| Existing tests | PASS |
| Claims drift | PASS |

---

# 40. Acceptance gate for PR B

Must demonstrate:

1. clean committed artifact chain passes;
2. mutate generator without regenerating report -> fails;
3. restore + regenerate -> passes;
4. change JSON field without report update -> semantic check fails;
5. no scientific computation beyond deterministic fixture/regeneration necessary for the check;
6. forensic frozen artifacts not modified.

---

# 41. Acceptance gate for PR C

Must demonstrate:

1. valid CAR passes;
2. open blocking defeater + promotion=true fails;
3. exposed data + prereg eligible=true fails;
4. novelty claim with `not_assessed` literature status cannot be promotion-eligible;
5. finite computational claim without scope fails;
6. human-understanding pending blocks promotion;
7. no automatic state changes to `MATH_CLAIMS.md`.

---

# 42. h=8 isolation test

Implementation PR must include a grep/static check or human audit that no script under `scripts/reliability/`:

- imports an h=8 generator;
- constructs h=8 state;
- enumerates h=8 profiles;
- reads h=8 result files;
- runs h=8 computation.

Reliability Engine work should require **zero mathematical h=8 access**.

---

# 43. Performance budget

v0.1 should stay cheap.

Targets:

- schema validation: < 1 second;
- basic freshness metadata check: < 2 seconds;
- deterministic regeneration checks: ideally < 30 seconds;
- normal pre-commit total: tolerable;
- heavy regeneration: CI rather than pre-commit.

If the engine materially slows every exploratory commit, redesign it.

---

# 44. Documentation budget

`research/reliability/README.md` should be short.

It should answer:

1. What is this?
2. What is not this?
3. Which research tiers exist?
4. How to add a Failure Ledger entry?
5. When is CAR required?
6. How does freshness checking work?
7. How are overrides recorded?
8. What does “blocked” mean?
9. How does this relate to `MATH_CLAIMS.md`?
10. What must never happen automatically?

Do not duplicate `AGENTS.md`.

---

# 45. Data model versioning

Every YAML/JSON schema:

```yaml
schema_version: 0.1
```

When changing semantics:

- bump version;
- migration explicit;
- old files remain interpretable;
- do not silently reinterpret historical records.

This is especially important for longitudinal evaluation.

---

# 46. Engine version attestation

Future methodology evaluation should record:

```yaml
reliability_engine:
  version: 0.1.0
  git_sha: ...
```

Otherwise future performance data cannot be tied to the control system that was actually active.

---

# 47. Failure of the engine itself

Create failure class namespace:

```text
ENGINE_FALSE_NEGATIVE
ENGINE_FALSE_POSITIVE
ENGINE_STATE_CORRUPTION
ENGINE_SCHEMA_BUG
ENGINE_FRESHNESS_BUG
ENGINE_OVERRIDE_BYPASS
ENGINE_PERFORMANCE_BURDEN
```

The engine is not exempt from its own Failure Ledger.

---

# 48. Definition of “promotion”

v0.1 should define promotion narrowly.

Candidate:

> **Promotion** = an intentional transition that makes a result eligible for entry into `MATH_CLAIMS.md`, a canonical research result document, or paper-facing assertive prose.

Scratch reports are not promotion.

Forensic preservation is not promotion.

Git commit alone is not promotion.

This distinction avoids bureaucratic overreach.

---

# 49. Definition of “evidence admissibility”

Evidence can exist without being admissible for a particular claim.

Examples:

```text
raw exploratory JSON:
  exists = true
  admissible_for_exploratory_observation = true
  admissible_for_preregistered_confirmation = false
```

This should be a core CAR concept.

---

# 50. Definition of “superseded”

`superseded` means:

- historically preserved;
- no longer current evidence/interpretation;
- not deleted;
- not silently treated as current.

Examples:

- old preregistration draft after data exposure;
- old derived report after generator fix;
- old mechanism explanation after structural correction.

---

# 51. Definition of “blocked”

`blocked` means:

> current requirements for promotion are not satisfied.

It does **not** mean false.

This semantic distinction should appear in every validator error.

---

# 52. Definition of “contradicted”

`contradicted` means:

> current evidence contains a direct conflict with the claim as stated.

It still may not imply universal mathematical falsity if the conflicting evidence itself is uncertain.

The claim should link the contradiction artifact.

---

# 53. Definition of “invalid”

Reserve `invalid` for objects with internal structural problems:

- malformed schema;
- bad hash;
- impossible state;
- corrupted artifact.

Do not use it for ordinary open scientific disagreement.

---

# 54. External expert packet generator — later, not v0.1

Future v0.2 possibility:

```bash
node scripts/reliability/build-expert-packet.js CAR-0003
```

Output:

```text
claim.md
scope.md
evidence-index.md
defeaters.md
reproduction.md
literature.md
```

Do not build now.

First prove CAR itself is useful.

---

# 55. Future SACM/PROV export — later

If the methodology matures:

```text
CAR -> SACM-like claim/evidence structure
Run -> W3C PROV/RO-Crate
Attestation -> SLSA-like provenance
```

But only after real interoperability need appears.

Avoid standards cosplay.

---

# 56. ResearchLoop relationship

If a methodology paper is later written, it must explicitly cite and compare with ResearchLoop.

Potential differentiation table:

| Dimension | ResearchLoop | Reliability Engine candidate |
|---|---|---|
| General computational research control plane | Yes | No / intentionally narrower |
| RQ spine / task contracts | Strong | Reuse existing repo workflow; not core novelty |
| Claim admission gates | Strong | Math-specific claim classes |
| Blocker preservation | Strong | Failure Ledger + defeaters |
| Formal theorem statement fidelity | Not central | Candidate core |
| Finite/infinite scope semantics | Not central | Candidate core |
| Independence fingerprint | Not central | Candidate core |
| Prereg/holdout exposure revocation | Some related gating | Candidate explicit transition |
| MATH_CLAIMS boundary | Domain-specific | Core integration |
| Prospective open-math longitudinal study | Different evaluation | Candidate contribution |

Do not imply ResearchLoop lacks a feature without primary-source re-audit at publication time.

---

# 57. Success criteria for the project, not the software

After 6–12 months, ask:

- Did we detect a new failure class before canonical promotion?
- Did the engine preserve an inconvenient contradiction?
- Did it prevent stale evidence from being cited?
- Did it correctly downgrade an exposed test?
- Did a human override remain transparent?
- Did researchers bypass the system because it was too heavy?
- Did an external expert find something our internal system missed?
- Did we spend more time maintaining assurance metadata than doing math?

If the last answer dominates, simplify.

---

# 58. Immediate next action after design approval

Do **not** ask Antigravity to implement everything.

First create a methodology design branch with only:

```text
research/reliability/README.md
research/reliability/failure-ledger.yaml
research/reliability/schemas/failure-ledger.schema.json
scripts/reliability/validate-failure-ledger.js
tests/reliability/failure-ledger.test.js
```

That is PR A.

Then review.

Only then proceed to freshness.

---

# 59. Final v0.1 decision

**GO**, with constraints.

Build the smallest version that:

- remembers failures;
- exposes claim-state contradictions;
- catches stale artifacts;
- optionally attests runs;
- never turns a process checker into a truth oracle;
- never touches h=8;
- never auto-promotes mathematical claims;
- never replaces the existing governance documents;
- remains cheap enough for real research.

If v0.1 cannot stay small, stop and redesign.

---

# END
