# SOURCE CONTROLLER COMPARISON
**Date:** 2026-08-29

## 1. Goal
Identify the optimal source language / controller $x \in \Gamma^\omega$ to direct the block assignment $G : \Gamma \to \{a,b,c\}^L$. The source must be square-free, as any ordinary square $ww$ in $x$ maps to an ordinary (and thus abelian) square $G(w)G(w)$ in the target.

## 2. Plausible Source Systems

### A. The h6 Morphism (Rao & Rosenfeld)
- **Alphabet Size:** $|\Gamma| = 6$
- **Uniformity:** Yes, length 3.
- **Factor Complexity (Lengths 1..5):** 6, 14, 22, 30, 38.
- **Known Avoidance:** Proven square-free.
- **Suitability:** High. The 6-letter alphabet provides exactly 6 block variables ($B_a \dots B_f$) to solve the affine constraints. The factor complexity is remarkably low (only 38 length-5 factors instead of 7776), meaning the local verification gate is extremely cheap.

### B. Ternary Square-Free (e.g. Leech's L13)
- **Alphabet Size:** $|\Gamma| = 3$
- **Uniformity:** Yes, length 13.
- **Factor Complexity:** For a typical ternary square-free word, $|F_2| = 6, |F_3| = 12, |F_4| = 18, |F_5| = 24$.
- **Suitability:** Moderate. A 3-letter source means we only have 3 blocks ($B_0, B_1, B_2$) to configure. This drastically reduces the search space (searching for a 3-tuple instead of a 6-tuple), but it may lack the necessary degrees of freedom (Parikh vector independence) required to satisfy Paper 4's 19-family constraints globally.

### C. The h8 Morphism
- **Alphabet Size:** $|\Gamma| = 8$
- **Uniformity:** No (lengths 1 and 2).
- **Suitability:** Poor for strict uniform block assignment without gap/offset analysis. Non-uniform sources misalign the boundaries of the $L$-blocks, complicating the local bound arithmetic.

## 3. Conclusion
The **h6** controller remains the most rational target for initial synthesis. It strikes an optimal balance: its alphabet is large enough (6) to provide geometric flexibility for Paper 4 constraints, but its factor complexity (38 at length 5) is so restricted that local certification is effectively instantaneous. 
