# Reliability Engine

## Overview

The Reliability Engine is a formal evidence ledger and validation system for capturing, classifying, and testing methodological and tooling failures within the research workflow.

It serves as the repository's epistemic memory. Every time an agent, tool, or human makes a methodological error (e.g., executing a confirmatory run on holdout data, silently swallowing numerical errors, or committing an unverified script), it is recorded here so that it can be structurally prevented in the future.

## Failure Ledger

The `failure-ledger.json` is a permanent, immutable record of historical failures.

### JSON Schema and Validation

- The JSON Schema (`schemas/failure-ledger.schema.json`) is the durable
  data contract.
- The dependency-free Node validator
  (`scripts/reliability/validate-failure-ledger.js`) enforces the v0.1
  runtime subset.
- Later versions may replace the custom validator with a standards
  validator if justified.

### Actors Semantics

The `actors` field records roles materially involved in the episode.
It is NOT a blame or causal-attribution field.
Detection responsibility belongs in `detection_layer`.

### Evidence Anchor Note

Failure Ledger entries are historical assertions and must be reviewable
against preserved repository artifacts / Git history.
`preserved_artifacts` does not mean that every historical state is stored
as a current working-tree file; Git history may contain the relevant
before/after evidence.