# PREFIX-CHAIN REALIZABILITY LEMMA
**Date:** 2026-08-29

## 1. Statement of the Lemma
Let the target block size be $L$. Let $\rho \in \mathbb{N}^m$ be a prescribed Parikh profile such that $|\rho|_1 = L$.
Let the distinct depths referenced by a formal signature $\sigma$ be $0 \le d_1 < d_2 < \dots < d_k \le L$.
Let $Y_{d_j} \in \mathbb{N}^m$ be candidate Parikh vectors for these depths.

**Lemma:** The sequence of vectors $(Y_{d_1}, Y_{d_2}, \dots, Y_{d_k})$ is realizable as the prefix Parikh vectors of a single concrete word $W$ of profile $\rho$ if and only if:
1. $|Y_{d_j}|_1 = d_j$ for all $1 \le j \le k$.
2. $\mathbf{0} \le Y_{d_1} \le Y_{d_2} \le \dots \le Y_{d_k} \le \rho$ component-wise.

Equivalently, all segment increments:
- $\Delta_1 = Y_{d_1}$
- $\Delta_2 = Y_{d_2} - Y_{d_1}$
- $\dots$
- $\Delta_{k+1} = \rho - Y_{d_k}$
are non-negative integer Parikh vectors whose $L_1$ norms equal their respective segment lengths.

## 2. Proof (Necessity $\implies$)
Assume the chain is realizable. Then there exists a word $W$ of profile $\rho$ such that the prefix $W[0 \dots d_j]$ has Parikh vector $Y_{d_j}$.
1. By definition, a prefix of length $d_j$ must have exactly $d_j$ characters, so $|Y_{d_j}|_1 = d_j$.
2. For any $i < j$, the prefix $W[0 \dots d_j]$ is exactly $W[0 \dots d_i]$ concatenated with the segment $W[d_i \dots d_j]$. Let the Parikh vector of this segment be $S$. Since $S$ counts character frequencies, $\mathbf{0} \le S$. Since Parikh vectors are additive under concatenation, $Y_{d_j} = Y_{d_i} + S \implies Y_{d_i} \le Y_{d_j}$ component-wise.
The same logic applies to the final segment up to length $L$ (profile $\rho$), proving $\mathbf{0} \le Y_{d_1} \le \dots \le \rho$.

## 3. Proof (Sufficiency $\impliedby$)
Assume conditions 1 and 2 hold. We must construct a valid word $W$ of profile $\rho$.
Define the required segment increments:
- $\Delta_1 = Y_{d_1}$ (length $d_1$)
- $\Delta_j = Y_{d_j} - Y_{d_{j-1}}$ (length $d_j - d_{j-1}$) for $2 \le j \le k$
- $\Delta_{k+1} = \rho - Y_{d_k}$ (length $L - d_k$)
By condition 2, every $\Delta_j$ is a non-negative integer vector.
By condition 1, $|\Delta_j|_1$ equals the exact length of the segment.
Because $\Delta_j$ contains non-negative integers summing to the required length, it represents a valid Parikh profile for that segment. We can construct a concrete sub-word $w_j$ by simply outputting the characters according to their counts in $\Delta_j$ in any arbitrary order.
Concatenating these sub-words $W = w_1 w_2 \dots w_{k+1}$ produces a word whose prefix at each depth $d_j$ is exactly $Y_{d_j}$ and whose total profile is exactly $\rho$.
Thus, the chain is constructively realizable.
