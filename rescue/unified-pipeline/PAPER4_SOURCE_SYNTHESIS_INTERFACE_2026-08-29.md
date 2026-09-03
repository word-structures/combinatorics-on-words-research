# PAPER 4 SOURCE SYNTHESIS INTERFACE (CORRECTED)
**Date:** 2026-08-29

## 1. Separation of Constraints
The exact mathematical interface bridges the macroscopic properties of the source language with the microscopic structure of the target blocks. The fundamental abelian square equation is X_2 - 2X_1 + X_0 = 0.

A constraint consists of:
1. **Support Schema:** A linear combination of full-block Parikh profiles (e.g., +2 P(B_a) - 1 P(B_b)). This is determined entirely by the factors of the source word x.
2. **Affine Target:** The residual Parikh vectors from the fractional boundary blocks (the prefixes and suffixes at the cutpoints).

## 2. Precompilation and Reusability
**What can be precompiled once for fixed L and source language?**
- The set of all possible geometric domains, occurrence masks, and reduced support schemas over the alphabet Gamma (e.g., {a..f} for h6).

**What changes when only a Parikh profile is assigned to a block?**
- The Support Schema evaluates to a fixed vector (the affine target t). 
- For a support family F and an unresolved block profile rho, we can compute a mathematically exact reachable correction set:
  R_F(rho) = { sigma(X_1, X_2, X_3) | X_i is a valid prefix-chain of profile rho }
- **CRITICAL SAFE-ELISION RULE:** If -t is not in R_F(rho), the window CANNOT be an abelian square, regardless of the internal letter permutations. 
- **Correction:** This does NOT invalidate the entire profile assignment! It merely renders this specific window **ALGEBRAICALLY SAFE**. The candidate assignment survives this window without needing exact letter evaluation. 

**What changes when the concrete order of letters is assigned?**
- The Affine Target (the fractional boundaries) becomes exactly known. The constraint is fully instantiated. Only then, if the square actually forms, does the candidate die (Search-Tree Pruning).

## 3. Terminology Distinction
- **Safe Window Elimination:** A window is skipped because it is mathematically impossible to form a square. (Reduces checking cost, candidate lives).
- **Search-Tree Pruning:** A candidate assignment is killed because it forms an unavoidable square. (Reduces candidate space).
Paper 4 primarily provides massive safe window elimination at the profile level, which makes the remaining search tree traversable.
