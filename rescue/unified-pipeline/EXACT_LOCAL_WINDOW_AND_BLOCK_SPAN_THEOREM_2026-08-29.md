# EXACT LOCAL WINDOW AND BLOCK SPAN THEOREM
**Date:** 2026-08-29

## 1. Definition and Bound
Let L be the uniform block length. Suppose a new block of length L is appended to an existing valid prefix. We wish to detect any newly completed abelian square of half-period K <= H, where H = 2L - 1.

1. **Maximum total violating-factor length:**
   2K_max = 2(2L - 1) = 4L - 2.

2. **Maximum required suffix history:**
   As derived previously, if the square ends at the first character of the new block (index 0, assuming 0-indexed offset within the new block), it spans 1 character of the new block and requires (4L - 2) - 1 = 4L - 3 characters of history from the prefix.

## 2. Number of Intersected Macro Blocks
**Theorem:** For L >= 4, a newly completed violating factor of length 4L - 2 can intersect up to **5** macro-blocks (4 blocks from the prefix + the newly appended block).

**Proof by Alignment:**
- A string of length X intersects a maximum of ceil((X - 1) / L) + 1 blocks in a fixed L-uniform grid.
- Here X = 4L - 2.
- Thus, the maximum intersected blocks is ceil((4L - 3) / L) + 1.
- For L >= 4, 4L - 3 > 3L, meaning (4L - 3) / L = 3 + eps where eps > 0.
- Therefore, ceil(3 + eps) + 1 = 4 + 1 = 5.

**Counterexample to the 4-block claim:**
Let L = 4. H = 7. X = 14.
Let the grid boundaries be ..., -16, -12, -8, -4, 0, 4.
The new block is [0, 3].
If the square ends at index 0, it starts at 0 - 14 + 1 = -13.
The index -13 falls in the block [-16, -13] (which is 4 blocks back from 0).
The blocks intersected are:
1. [-16, -12)  (contains -13)
2. [-12, -8)
3. [-8, -4)
4. [-4, 0)
5. [0, 4)      (contains 0)
Total blocks spanned = 5.

## 3. Consequence for Source Factors
The claim that "only source factors of length <= 4 are needed" is **FALSE**. To verify local window bounds K <= 2L - 1, the synthesis compiler must verify the block assignments corresponding to all source factors of length **up to 5**.
