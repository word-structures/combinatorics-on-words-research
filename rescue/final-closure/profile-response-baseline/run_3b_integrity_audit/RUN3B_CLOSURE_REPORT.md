
========================================================================
PROFILE-RESPONSE EVIDENCE CLOSURE AUDIT H2-H7
------------------------------------------------------------------------
RUN_VERSION: 3B (Integrity Audit)
FINAL_VERDICT: RUN3B_ACCEPT_BASELINE
SIGN_RULE_MATCHES: 15 / 15
TEST_SUITE_STATUS: PASS
REPRODUCIBILITY_STATUS: PASS
METHOD_C_STATUS: PASS
========================================================================

# EXECUTIVE SUMMARY

An independent mechanical evidence verifier was run. No causal or mechanistic language is used.

* The observed sign split in the finite h=2...7 baseline perfectly matches the tested property: Most Balanced classes show delta_a > 0, while other classes show delta_a < 0.
* The numerical certificate is securely stored.
* Method C (curvature finite-difference) was rigorously verified and agrees with Method A.
* The h=5 profile (3,1,1) contains a cyclic SCC, confirming an infinite language property on that branch, so its delta_a is well-defined.
* Presentation invariance (h=3 length 3 vs 5) evaluated precisely to the same dominant eigenvalue.
* Two separate reproductions completely match field-for-field.
* All test suite checks passed natively.

Note: Novelty is not established.
