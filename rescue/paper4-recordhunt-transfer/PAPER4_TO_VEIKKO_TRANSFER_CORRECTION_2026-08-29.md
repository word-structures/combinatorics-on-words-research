# PAPER4_TO_VEIKKO_TRANSFER_CORRECTION_2026-08-29

## Epistemic Audit of Previous Claims

### 1. Prefix Pruning Claim
**Previous Claim:** "Direct prefix-local exact pruning... cannot be done."
**Correction:** The claim of mathematical impossibility was an overreach. The audit only established that the 19-family data alone is insufficient under a pure, unconstrained letter DFS model (where future Parikh vectors can take any value in the simplex). 
**Updated Status:** NO USEFUL RULE FOUND IN THIS AUDIT. Prefix-local pruning from Paper 4 geometry lacks constraint power in a purely unconstrained letter DFS. However, pruning may still be viable if the continuation class is restricted (e.g., using fixed suffix dictionaries, restricted macro alphabets, or template-conditioned continuation languages).

### 2. Future-Certificate Claim
**Previous Claim:** Future certificates are "computationally equivalent to DFS lookahead."
**Correction:** No formal reduction or lower-bound complexity proof was provided to justify computational equivalence. 
**Updated Status:** NO CHEAPER CERTIFICATE FOUND IN THE TESTED FORMULATION. Extracting a certificate using Paper 4's algebraic geometry for an unconstrained letter DFS was not found to be cheaper than simply exploring the local combinatorial violations in our limited prototype.

### 3. ILP / SAT Claim
**Previous Claim:** Converting the problem to 19 integer inequality constraints represents a "theoretical complexity shift."
**Correction:** 
- Both SAT and ILP can encode NP-hard problems; there is no change in computational complexity class. 
- The 19 support families are constraint *schemas*, not 19 total global constraints. 
- The actual number of instantiated constraints for a word of length N grows as a function of the start position s, half-length K, domain type, physical carry configuration (role mask), and target profile. The Paper-4 formulation compresses the *content* of the abelian square test into affine vector sums, but it does *not* compress the number of (s, K) pairs that must be instantiated.
**Updated Status:** HYPOTHESIS / FUTURE BENCHMARK. Any claim of solver speedup or memory reduction requires a rigorous A/B encoding benchmark, which has not yet been performed.

### 4. Structure-Discovery Claim
**Previous Claim:** Splitting a record word into blocks and feeding it to Paper 4 "rigorously proves" it generates an infinite sequence.
**Correction:** An empirical block decomposition of a finite record word does not automatically guarantee an infinite source language. The logical chain requires exact theorems at each step:
1. 
ecord word -> candidate block alphabet (Requires extracting a complete, non-overlapping cover of the record word).
2. candidate block alphabet -> candidate transition/source system (Requires extracting transition rules or a DAG).
3. candidate source system -> candidate infinite generator (Requires proving the DAG has an infinite path or cycle).
4. generator + block images -> Paper-4 certification problem (Paper 4 compiles the Abelian-square constraints for this candidate structured system, but it does not, by itself, prove the resulting system is conflict-free for all K).
**Updated Status:** PROMISING, BUT REQUIRES EXACT MATHEMATICAL CHAINING.

### 5. State-Compression Claim
**Previous Claim:** "Finite Markovian state compression is mathematically ruled out" and "PROVEN".
**Correction:** The adversarial argument presented did not formally prove that the language of future aa2fr continuations is non-regular (Claim D). It only established:
- Claim A: 19-family id alone is not a sufficient state.
- Claim B: A particular bounded-history augmentation fails.
- Claim C: The empirical L=40 AFE frontier quotient showed no compression (multiplicity 1).
**Updated Status:** SIMPLE FINITE-STATE AUGMENTATION FAILED. Whether a highly complex finite-state-plus-counter representation could work, or whether the language is strictly non-regular, remains an open formal question.
