# R3 EXACT LOCAL MEMORY LEMMA
**Date:** 2026-08-29

## 1. The 3L Memory Claim Audit
**Claim:** "To check all abelian squares of half-period $K < 2L$, it is sufficient to retain $3L$ characters of history."
**Status:** FALSE

## 2. Exact Memory Lemma
**Lemma:** To rigorously verify all newly completed abelian squares of half-period $K \le 2L - 1$ upon appending a block of length $L$ to a prefix $P$, the required suffix memory of $P$ is exactly **$4L - 3$ characters**.

**Proof:**
1. Let the appended block be $B$ with $|B| = L$.
2. The maximum half-period checked is $K_{max} = 2L - 1$. The maximum total square length is $2K_{max} = 4L - 2$.
3. For an abelian square $UV$ to be "newly completed" by the addition of $B$, its endpoint $e$ must lie within $B$. Let $e$ be 1-indexed from the start of $B$ ($1 \le e \le L$).
4. The start index of the square relative to the start of $B$ is $e - (4L - 2)$.
5. The maximum required history from $P$ occurs when the square extends furthest to the left. This happens when the square ends as early as possible in $B$, which is $e = 1$.
6. At $e = 1$, the square spans $1$ character in $B$ and requires $(4L - 2) - 1 = 4L - 3$ characters from $P$.
7. Therefore, a suffix of length $4L - 3$ from $P$ is strictly necessary and sufficient.

**Counterexample to 3L:**
Let $L = 10$. The $3L$ assumption retains 30 characters.
$K_{max} = 19$, max square length $= 38$.
If a square ends at the first character of $B$, it extends 37 characters into $P$.
Since $37 > 30$, the 30-character memory is completely blind to this violation. The $3L$ boundary is INSUFFICIENT.
