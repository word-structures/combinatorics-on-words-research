# Phase C–D: Attempt to Derive 34 Patterns and 19 Families from Carpi

**Date:** 2026-08-29
**Status:** ADVERSARIAL

## Phase C: The 34 Patterns

### The role-membership mask chi

Paper 4 defines chi(b) = 1 if block b is an X-occurrence, 0 otherwise.
This is a PARTIAL-ASSIGNMENT concept: some blocks are assigned (known), one role X is unresolved.

**Question: Does Carpi have this concept?**

NO. Carpi's theorem is about whether a morphism h is abelian power-free.
It does NOT consider partial assignment. In Carpi's framework, ALL blocks are determined by the morphism.
There is no concept of "one role unresolved" — the morphism is either given completely or not.

The occurrence mask chi is a Paper 4 innovation driven by the staged construction.
Carpi never needs it because Carpi never partially assigns block roles.

### Block-coincidence consistency

Paper 4's key constraint: if two cutpoints fall in the SAME macro block (b_j = b_k), then chi(b_j) = chi(b_k) because chi is a function of the block, not the cutpoint.

This block-coincidence constraint reduces the number of admissible masks:
- Z_s: b_0 = b_1 = b_2, so chi is constant. 2 patterns (all-X or all-non-X).
- P_t: b_0 = b_1 < b_2, so chi(b_0) = chi(b_1) but chi(b_2) free. 2 x 2 = 4 patterns.
- M_t: b_0 < b_1 = b_2, similar. 4 patterns.
- Z, P, M: all three blocks distinct, chi free. 2^3 = 8 patterns each.

Total: 2 + 4 + 4 + 8 + 8 + 8 = 34.

**Can Carpi produce this count?**

NO. Carpi does not have:
1. The concept of a partial assignment (chi does not exist in Carpi).
2. The carry-domain partition (the six domains are not in Carpi).
3. Block-coincidence constraints (Carpi's conditions apply to fully specified morphisms).

The 34-pattern count is intrinsically a PARTIAL-ASSIGNMENT object. It cannot exist in a framework that only considers fully specified morphisms.

## Phase D: The 19 Families

### The role-projected support equivalence

Paper 4 defines the reduced support signature:
  sigma = red(chi(b_0) x_{i_0} - 2 chi(b_1) x_{i_1} + chi(b_2) x_{i_2})

For each of the 34 domain/mask patterns, the COMPLETE SET of sigma values over all valid (a, h) in the domain is computed. Two patterns are equivalent if their complete sigma sets are identical.

This quotient reduces 34 -> 19.

### Can Carpi produce the 19-family quotient?

The equivalence relation requires:
1. The support signature sigma (depends on chi, which Carpi lacks).
2. The domain lattice (depends on carry classification, which Carpi does not use).
3. The complete-set equality criterion (a new equivalence relation on constraint types).

**NONE of these three components exist in Carpi's framework.**

### Detailed obstruction to derivation

Even if one tried to retroactively introduce partial assignment into Carpi's framework:

Carpi's boundary types (delta_0, delta_1, delta_2) in {0,1}^3 give 8 types.
If we added chi masks to each, we would get 8 x 2^3 = 64 raw types (before coincidence constraints).
After coincidence, we would NOT get 34 because Carpi's coincidence structure is different — Carpi's boundary types do not encode same-block constraints the same way.

More fundamentally: the 19-family classification is a statement about the GEOMETRY OF PREFIX-DEPTH SUPPORTS. Carpi's theorem is a CRITERION FOR MORPHISM PRESERVATION. These are different mathematical objects:

- Carpi asks: "does h map ASF words to ASF words?"
- Paper 4 asks: "what are the possible unresolved coefficient structures when one block role is unknown?"

The answer to Carpi's question is a boolean (yes/no for a given morphism).
The answer to Paper 4's question is a finite catalogue of algebraic support types.

## Phase D Conclusion

The 19-family classification CANNOT be derived from Carpi.
The first new mathematical definition required is the occurrence mask chi(b) under partial assignment.
The first new lemma required is block-coincidence consistency (if b_j = b_k then chi(b_j) = chi(b_k)).
The novel mathematical content is the complete-set quotient from 34 raw patterns to 19 support families.
