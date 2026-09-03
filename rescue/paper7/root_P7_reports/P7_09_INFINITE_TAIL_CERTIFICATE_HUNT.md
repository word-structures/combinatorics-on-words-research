# P7_09 INFINITE-TAIL CERTIFICATE HUNT

## A. Certified infinite-A4 construction inventory

A search of the repository and canonical project sources (`src/morphisms.js`, `MATH_CLAIMS.md`) identifies the following mathematically certified infinite four-letter Abelian-square-free (ASF) constructions:

1. **G85 (Keränen 1992)**
   - **Type:** 85-uniform endomorphism.
   - **Properties:** Provably preserves ASF. $g_{85}^\omega(a)$ produces a right-infinite ASF word.
   - **Source:** ICALP 1992 / Fici & Puzynina 2023.
   - **Verification:** `LEVEL_2_VERIFIED_SOURCE` (verified character-by-character in the repository).
2. **G98 (Keränen 2002)**
   - **Type:** 98-letter substitution / D0L generator.
   - **Properties:** Produces an infinite ASF word when iterated on 'a'. (Forms a DT0L system with G85).
   - **Source:** IAS Murmansk 2002 / TCS 410 (2009).
   - **Verification:** `LEVEL_2_VERIFIED_SOURCE`.
3. **G109**
   - **Type:** 109-letter morphism.
   - **Verification:** Internal checksum verified in the repository.

## B. Depth-500 structural sample

We generated the lexicographically first and last depth-500 right continuations of the Keränen seed $w_K$. 
To check for natural block structures or recursively expanding suffixes, we analyzed the continuations for maximal repeated substrings.
*   **Result:** The longest repeated factor in the 522-character sequence is only 13 characters long (`dabcbdbabdbcd`), occurring exactly twice. 
*   **Conclusion:** The greedy DFS branches exhibit extreme irregularity. There is no natural block structure, periodic motif, or simple recursive pattern emerging directly from the search tree.

## C. Tail-capture results

We cross-referenced the depth-500 continuations against the certified morphic fixed points to check for a tail-capture ($w_K B Y$).
*   **Targets:** Prefixes and large interior factors of $g_{85}^\omega(a)$, $g_{98}^\omega(a)$, and $g_{109}^\omega(a)$.
*   **Permutations:** Tested under all 24 possible alphabet permutations.
*   **Max Overlap:** The longest exact suffix-to-morphism match discovered was only **21 characters**. (A length-20 overlap is statistically expected by chance between any two long 4-letter ASF strings).
*   **Bridge Search:** An explicit BFS search for a finite bridge $B$ of length up to 12 such that $w_K B g_{85}^\omega(a)$ remains valid yielded exactly 0 hits.
*   **Conclusion:** No substantial exact tail capture exists within the available computational window.

## D. Recursive-rule candidates

Because the depth-500 extensions lack any internal repeating block structure (no repeats $>13$ characters), no deterministic block replacement rule ($U_n \mapsto U_{n+1}$) or recursive suffix expansion can be extracted from this data. The branch behaves as an unpatterned combinatorial path.

## E. Boundary-proof prospects

Because we found no tail capture $Y$ and no recursive rule $C_n \to C_{n+1}$, we do not possess a target algebraic structure. Therefore, formulating an inductive or desubstitution-based boundary proof is impossible with the current data.

## F. Classification

`NO CERTIFICATE SIGNAL`
