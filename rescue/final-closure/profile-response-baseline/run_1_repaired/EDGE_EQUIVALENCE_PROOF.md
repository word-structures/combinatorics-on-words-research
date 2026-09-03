# Edge Equivalence Proof

An edge in the de Bruijn graph over words of length m = 2h-1 corresponds to a word w of length 2h.
The state from which the edge originates is u = w[0 ... 2h-2], and the target state is  = w[1 ... 2h-1].

The OLD system requires states to avoid Abelian squares of half-length K \in \{2, ..., h-1\}.
Thus, u is OLD-valid if it avoids these squares, and  is OLD-valid if it avoids them.

Any Abelian square of half-length K \le h-1 has length 2K \le 2h-2. 
Therefore, if such a square exists in w, its start index i satisfies i + 2K \le 2h.
If i + 2K \le 2h-1, the square is fully contained in w[0 ... 2h-2] = u.
If i \ge 1, the square is fully contained in w[1 ... 2h-1] = v.
Since 2K \le 2h-2, a square cannot simultaneously require both index 0 and index 2h-1.
Thus, every Abelian square of half-length K \in \{2, ..., h-1\} in w is contained in either u or .
Consequently, the full word w avoids K \in \{2, ..., h-1\} if and only if both u and  do.

The newly appearing K=h obstruction requires a word of length 2h. The only possible window for a K=h square in w is the entire word w itself. Thus, testing whether w is a K=h square is exactly the condition for whether the edge introduces a new K=h obstruction.

This proves that checking u and  for OLD-validity and checking w for a K=h square (Method B) is mathematically identical to checking w for OLD-validity and K=h violation directly (Method A).
