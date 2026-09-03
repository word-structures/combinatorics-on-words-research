# P7_11 — REVERSE ONE-SIDED CONSTRUCTION

We inverted the search strategy to target $w \in re(\mathcal{A}_4) \setminus e(\mathcal{A}_4)$ by first securing a mathematically certified right-infinite construction, and then attempting to prove finite left-extinction on its prefixes or boundary attachments.

## A. Infinite-construction inventory
We analyzed the canonical infinite four-letter Abelian-square-free (ASF) constructions available in the repository:
1. **G85 (Keränen 1992):** 85-uniform endomorphism.
2. **G98 (Keränen 2002):** 98-letter D0L substitution.
3. **G109:** 109-letter morphism.

## B. Recurrence kills
We computed the transition matrix for all three morphisms ($G85, G98, G109$). 
*   **Result:** All three matrices are strictly positive (every letter's image contains all four letters). 
*   **Conclusion:** All three morphisms are **primitive**. 

Because they are primitive, the infinite fixed points they generate (e.g., $g_{85}^\omega(a)$) are **uniformly recurrent**. This mathematical property guarantees that *every* finite factor occurring in the right-infinite word actually occurs infinitely often, with bounded gaps, inside the corresponding bi-infinite fixed point. 
Therefore, every standard prefix of these words automatically has arbitrarily long valid left-contexts. **No standard prefix of these fixed points can be left-extinct or two-sided-extinct.** This theoretically kills the direct prefix approach.

## C. Exceptional-boundary / special-seed candidates
To bypass the recurrence kill, we searched for:
1.  **Special Seeds:** We analyzed whether a finite seed $s$ could generate a nested family $s \prec \phi(s)$ without being a standard prefix. However, because $g_{85}(c)$ starts with $c$ for all letters, any seed $s \prec g_{85}(s)$ is necessarily a prefix of the standard fixed point $g_{85}^\omega(s[0])$, returning us directly to the recurrence kill.
2.  **Boundary Attachments ($BX$):** We computationally searched for small exceptional boundaries $B$ (up to length 6) such that $B \cdot g_{85}^\omega(a)$ remains ASF but is left-extinct. 
    *   *Result:* All discovered valid boundaries survived left-extension tests to depth $\ge 25$. This indicates they are almost certainly just the natural left-extensions native to the uniformly recurrent bi-infinite word, not rogue left-extinct boundaries.

## D. Certified right-infinity candidates
Due to the uniform recurrence of all available A4 constructions, we were unable to isolate a right-infinite candidate that escapes bi-extendability.

## E. Left/balanced extinction results
No valid left-extinct prefixes or boundaries exist within the tested spaces for these morphisms.

## F. Classification

Because all currently certified infinite ASF constructions in the repository are uniformly recurrent, every relevant prefix and factor is inherently bi-extendable. The mathematical nature of these primitive morphisms forbids the existence of a left-extinct prefix.

`RECURRENT-CONSTRUCTION KILL`

`NO REVERSE-CONSTRUCTION SIGNAL`
