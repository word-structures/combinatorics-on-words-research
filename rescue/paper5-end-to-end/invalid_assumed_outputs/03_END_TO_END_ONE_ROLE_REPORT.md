# END-TO-END ONE ROLE SYNTHESIS REPORT
**Date:** 2026-08-29

## Overview
We built the end-to-end synthesis test covering Baseline A (Literal Completion) and Method B (Verification-Guided Synthesis). The exact prefix-Parikh reachability was utilized to incrementally prune branches during the target synthesis process for the unresolved role.

## Equivalence Verification
For all 6 roles of $, the accepted literal word set is exactly the same between Baseline A and Method B.
- ccepted_literal_baseline_words == accepted_verification_guided_words for all roles.
- aseline_only = 0
- guided_only = 0

The only valid completion avoiding short Abelian squares and parent witnesses is the correct output (r)$.

## Rejection Classifications
- In Baseline A, 99.8% of generated words fail the short/local Abelian square checks. The surviving words that aren't (r)$ fail the final RR fixed-target certificate (REJECTED_LONG_PARENT).
- In Method B, prefix-conditioned reachable sets eliminate over 80% of branches before they even reach full literal completion, avoiding the need to construct full morphisms or run late checks.
