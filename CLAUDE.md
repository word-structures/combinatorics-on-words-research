# Claude Code router for this repository

`AGENTS.md` is the canonical authority for this repository. Claude must read
`AGENTS.md` before modifying anything here. This file is a pointer, not a
policy source — it must not duplicate `AGENTS.md` policy text.

`AGENTS.md` governs, in full detail:

- repository file placement (root-avoidance, the `src/` / `scripts/` /
  `tests/` / `scratch/` / `docs/` / `docs/archive/` / `research/` /
  `datasets/` / `.github/` classification, and root-reservation rules);
- experimental-output handling (what may enter Git history and what stays
  untracked, and the prohibition on Claude auto-staging/committing/moving/
  deleting/pushing experimental material without explicit owner
  authorization);
- the Git publication workflow (worktree/branch isolation, pre-commit
  review, protected-main publication, human approval gates);
- mathematical claim discipline (citation, verification levels, calibrated
  language, the claims-drift linter, and the other rules in `AGENTS.md`'s
  mathematical claims protocol section);
- provenance and historical-record handling.

## Before owner review, on every task

Classify every new or untracked file Claude has created or touched as one of:

- **KEEP / CANONICALIZE** — belongs in Git history under `AGENTS.md`'s
  placement rules, at the classified destination.
- **ARCHIVE** — intentionally preserved but inactive/historical; goes to
  `docs/archive/`.
- **SCRATCH / DISCARD** — temporary/experimental; stays untracked in
  `scratch/`, or is discarded.
- **OWNER DECISION** — placement or disposition is genuinely ambiguous;
  report it and wait rather than guessing.

Report every proposed new root-level file explicitly, before creating it.

## RESEARCH STATE CHANGE CHECK

Before declaring a research session closed, ask whether it produced:

- exact refutation
- derived result
- primary source opened / access route died
- formalized question
- priority change
- claim-boundary correction
- permanent evidence
- new mathematical capability / representation

If none:
close with no canonical update.

If any:
every triggered canonical consequence must be one of:

- UPDATED NOW
- PROPOSED FOR HUMAN APPROVAL
- PENDING WITH A NAMED BLOCKER

before the session is CLOSED.

Never automatic:

- proved
- literature novelty
- flagship-objective change
- major compute allocation
- quantifier widening

WRITE-THROUGH V0 TRIAL:
review after 3 state-changing research sessions.
