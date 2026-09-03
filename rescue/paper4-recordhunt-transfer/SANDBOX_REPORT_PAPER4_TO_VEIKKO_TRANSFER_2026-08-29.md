# SANDBOX REPORT: PAPER 4 TO VEIKKO RECORD-HUNT TRANSFER

**Date:** 2026-08-29
**Objective:** Determine whether Paper 4's exact structural theory can be transferred to Veikko's production engine for operational advantage.

## Track Summaries

### A & B: Prefix-Local Pruning & Certificates
**Verdict: NEGATIVE.** Paper 4's geometry is immensely powerful when evaluating a restricted macro-alphabet (like the AFE targets). However, a pure letter DFS (Veikko's baseline) leaves the future entirely unconstrained. The algebraic degrees of freedom in the simplex are too large to geometrically prove a branch is dead without just running the DFS to check local string violations.

### C & E: Macro Record Hunter & Solver Encodings
**Verdict: PROMISING FOR ILP, WEAK FOR RAW MACRO-DFS.** Attempting to synthesize blocks without fixing a sequence of roles means checking squares for all arbitrary lengths K. However, if formulated as an Integer Linear Programming (ILP) problem rather than SAT, Paper 4's constraints fundamentally shift the complexity class. It replaces millions of Boolean adders with 19 integer inequality constraints on block identities.

### D: Record Word -> Structure Discovery
**Verdict: STRONGEST RESEARCH PATH.** This is the most operationally useful transfer. When Veikko's engine (or any heuristic) discovers a long record word, Paper 4 acts as a perfect algebraic compiler. By chunking the word and mapping it to a macro-alphabet, Paper 4's equations can rigorously prove whether the candidate block structure generates an infinite sequence, bridging computational empiricism and exact algebraic proof.

### F: Markovian State Compression
**Verdict: DEAD END (PROVEN).** We adversarially proved that no finite Markovian automaton can fully capture the legal future language of a prefix. Abelian squares force the state to maintain an infinite history dependence, shattering any attempted compression.

## FINAL VERDICT
**D. STRUCTURE-DISCOVERY TRANSFER IS PROMISING; PRODUCTION TRANSFER IS NOT**

Paper 4 cannot directly speed up Veikko's letter-by-letter DFS because exact macro-algebra requires a defined macro-alphabet. However, Paper 4 provides an exact, independently verifiable verification pipeline for structure discovery, allowing Veikko's long outputs to be automatically tested for infinite morphic capability.
