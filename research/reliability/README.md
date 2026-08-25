# Reliability Engine v0.1

## What it is
A small mathematics-specific research assurance overlay for tracking epistemic discipline and structural failures.

## What it is NOT
- Not an AI scientist
- Not an agent voting framework
- Not a truth oracle
- Not a replacement for MATH_CLAIMS.md
- Not a general research operating system

## Methodology Novelty Status
**METHODOLOGY_NOVELTY_STATUS = NOT_ESTABLISHED**

## Failure Ledger
The Failure Ledger records historical process, logic, and infrastructure failures. These historical failures are assigned the role **ENGINE_DESIGN_SET**. They are used to DESIGN controls, and must NOT later be presented as evidence that those controls work.

Future prospective evaluation data, after a frozen methodology protocol, would be classified as **ENGINE_EVAL_SET**.

### JSON Schema and Validation
- The JSON Schema (\schemas/failure-ledger.schema.json\) is the durable data contract.
- The dependency-free Node validator (\scripts/reliability/validate-failure-ledger.js\) enforces the v0.1 runtime subset.
- Later versions may replace the custom validator with a standards validator if justified.

## Core Philosophy
Trust is not assigned to an AI. Trust is accumulated through independent evidence.
Make epistemic state executable where doing so improves research.

## Protected Holdout
h=8 is a protected holdout. No operations in this directory shall compute, construct, enumerate, inspect, probe, or mathematically derive data regarding h=8.

## Future Planned Components (NOT IMPLEMENTED IN THIS PR)
- Claim Assurance Record
- Artifact Freshness / derivation closure
- Optional Run Attestation
