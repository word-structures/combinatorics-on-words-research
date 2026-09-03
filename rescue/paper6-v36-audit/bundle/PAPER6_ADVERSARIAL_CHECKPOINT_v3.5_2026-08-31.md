# PAPER 6 — ADVERSARIAL CHECKPOINT v3.5
**Date:** 2026-08-31  
**Status:** new coefficient-free theorem seed proved; novelty not promoted

## Executive outcome

After v3.4 demoted the response-screening and frozen-coefficient narratives,
research returned to first-principles Abelian extension geometry.

A new exact theorem seed was obtained without rank fitting:

\[
R_{k,j}(s)=S_{2k-j}(s)-2S_{k-j}(s).
\]

For any bounded extension of length \(m\), every newly created Abelian square
with half-period \(k\ge m\) is equivalent to a prefix-profile hit

\[
P_j(x)=R_{k,j}(s).
\]

Because every matchable target has coordinate mass \(j\), all unbounded
long-period obstructions collapse, for current-response purposes, into finite
sets

\[
T_j(s)\subseteq\mathcal C_j(d).
\]

The exact response is therefore a path-avoidance problem on the finite
Parikh-prefix composition DAG.

The total universal obstacle vertices through extension length \(m\) are

\[
\boxed{\binom{m+d}{d}-1}.
\]

For ternary \(m=40\), this is only

\[
\boxed{12\,340}.
\]

A noncommutative DP then compiles the exact weighted long-period response
operator using polynomially many coefficient states for fixed alphabet size,
once the history target sets are known.

The theorem extends directly to Abelian \(p\)-powers.

## Validation

All preregistered direct/signature, scalar compiler, noncommutative matrix
compiler, selected-library trie, and Abelian-p-power tests passed with zero
mismatches.

## Guardrail / negative result

The finite obstacle signature is **not** update-closed.

Inside the actual FULL-L4 selected library,

```text
s = aaab|aaac
t = abbb|aaac
b = aaab
```

provides equal-length safe histories with identical current response descriptor
but distinct successor descriptors after the same safe selected block.

Therefore no regular-language or finite-state conclusion is allowed.

## Novelty status

No novelty promotion.

Initial literature attacks found nearby template, crucial-word, and follower-set
machinery, but no direct match for the combined bounded-extension obstacle and
noncommutative compiler statement.

Status remains:

\[
\boxed{\text{PROVED THEOREM SEED — NOVELTY UNASSESSED}.}
\]

## Current Paper-6 direction

This result is a more credible theorem foundation than the v2.6--v3.4
observability/aliasing narratives because:

1. its proof is direct and coefficient-free;
2. it is valid for arbitrary histories and alphabets;
3. it is unbounded in the long half-period;
4. it yields an exact operator compiler;
5. its limitation is explicitly known by counterexample.

The next gate is to determine whether the history target sets \(T_j(s)\) admit
a useful block-profile/cut-defect update theorem. That question must be attacked
with preregistered counterexamples before any general-mechanism claim.
