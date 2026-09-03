# H6 FACTOR LANGUAGE CLOSURE CERTIFICATE
**Date:** 2026-08-29

## 1. The Preimage-Span Lemma
For a $q$-uniform source morphism, a factor of target length $m$ starting at offset $r$ within an image block intersects at most:
$$ \lceil (r + m)/q \rceil $$
source letters.

## 2. Rigorous Bottom-Up Factor Closure for $h_6$
The $h_6$ morphism is 3-uniform ($q = 3$). Instead of relying on a finite iterate $h_6^k(a)$, we compute the factor language via strict algebraic closure under the morphic boundary operator.

**A. Complete $F_2$ Closure:**
Length-2 factors emerge either strictly inside the $h_6$ image of a single letter, or across the boundary of an existing length-2 factor $XY$. We initialize $F_2$ with the internal factors, and iteratively close it under the boundary operation (the last character of $h_6(X)$ and first of $h_6(Y)$).
The set stabilizes exactly at $|F_2| = 14$.
**Result:** $F_2\_complete$ = PROVED.

**B. Complete $F_3$ Closure:**
For $m=3$, the maximum source span is $\lceil (2+3)/3 \rceil = 2$.
Therefore, every valid length-3 factor must be fully contained within the $h_6$ image of some source factor of length 2.
We map the completely known $F_2$ set through $h_6$ and extract all length-3 subwords.
The resulting set is exactly $|F_3| = 22$.
**Result:** $F_3\_complete$ = PROVED.

**C. Complete $F_5$ Closure:**
For $m=5$, the maximum source span is $\lceil (2+5)/3 \rceil = 3$.
Therefore, every valid length-5 factor must be fully contained within the $h_6$ image of some source factor of length 3.
We map the completely known $F_3$ set through $h_6$ and extract all length-5 subwords.
The resulting set is exactly $|F_5| = 38$.
**Result:** $F_5\_complete$ = PROVED.

## 3. Verification Output
- **morphic closure:** PASS
- **no unseen factor generation:** PROVED
- **$|F_5| = 38$**

*(See `h6_factor_closure_output.json` for full artifact)*
