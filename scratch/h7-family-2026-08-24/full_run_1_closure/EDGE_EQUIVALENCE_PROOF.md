# Edge Equivalence Proof

The full mathematical definition requires that a 14-letter extended word contains no Abelian square of half-length K in {2, 3, 4, 5, 6, 7}.
An optimized builder computes this by verifying two independent conditions:
1. The target 13-letter state is valid (contains no K in {2..6}).
2. The full 14-letter word is not a K=7 Abelian square.

**Proof of Equivalence:**
Assume the source 13-letter state (indices 0..12) is valid.
When a 14th letter (index 13) is appended, any newly formed Abelian square must end at index 13.
Therefore, a new Abelian square of half-length K has length 2K and occupies indices (14 - 2K) through 13.
- If K <= 6, then 2K <= 12. The indices of the new square are contained within the range (14 - 12) to 13, which is 2 to 13.
This means the new square of length <= 12 is entirely contained within the *target* 13-letter state (which occupies indices 1 to 13).
- If the target 13-letter state is valid, it contains no Abelian square of half-length K <= 6. Thus, no new K <= 6 square can possibly end at index 13.
- The only remaining possible new Abelian square must have 2K > 12, which means 2K = 14, i.e., K = 7.
- This K = 7 square occupies indices 0 through 13, spanning the entire 14-letter word.
Therefore, testing the target 13-letter state for validity and the entire 14-letter word for K=7 is exactly equivalent to testing the full 14-letter word for all K in {2..7}.
