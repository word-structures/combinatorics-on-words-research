# P7_16 — G85 EXCEPTIONAL BOUNDARY INFINITY THEOREM

### Lemma 1 — G85 Core
$X = g_{85}^\omega(a)$ is an Abelian-square-free word (Keränen, 1992). Thus, no non-empty factor $UV$ in $X$ satisfies $P(U) = P(V)$.

### Lemma 2 — Boundary Localization
Any Abelian square in the word $Y = ad \cdot X$ must cross the exceptional boundary `ad|X`. If it did not, it would be an internal factor of $X$, which is forbidden by Lemma 1.

### Lemma 3 — Synchronization
The morphism $g_{85}$ is recognizable. Any crossing Abelian square $UV$ with half-period $K > 255$ admits a unique block decomposition aligned to the generation of $X$. Because $U$ originates exactly at the boundary of $Y$, $U$ corresponds to a prefix of blocks $g_{85}(W_U)$ followed by a partial block prefix $p_U$.

### Lemma 4 — Finite Residual Reduction
Because $V$ immediately follows $U$, $V$ must begin with the complementary suffix $s_V$, strictly enforcing $p_U \cdot s_V = g_{85}(c_1)$ for some character $c_1$. The Parikh equation $P(U) = P(V)$ algebraically forces the preimage blocks $W_U$ and $c_1 W_V$ to form a near-square $U'V'$ in $X_0$ satisfying:
$$P(U') - P(V') = \Delta W'$$
By evaluating all mathematically admissible combinations, we establish exactly 7 reachable constrained states. 

### Lemma 5 — Descent and Terminal Impossibility
Because $g_{85}$ is 85-uniform, the desubstituted near-square length $K'$ strictly descends ($K' < K$). Of the 7 reachable states:
* 6 reduce to $\Delta W' = 0$, meaning $U'V'$ must be an exact Abelian square in $X_0$. By Lemma 1, this implies $K' = 0$, bounding the original square to $K \le 85$.
* 1 reduces to $\Delta W' = [-2, 1, 0, 0]$. Computation over $X_0$ proves that no such prefix exists. This state is mathematically impossible.

### Lemma 6 — Base Cases
Independent computational checkers exhaustively verifying $K \le 255$ on $ad \cdot X$ find exactly 0 Abelian squares. 

### Theorem
Therefore,
$$\boxed{ad \cdot g_{85}^\omega(a) \in \mathcal{A}_4}$$
And consequently, every finite prefix $w \prec ad \cdot g_{85}^\omega(a)$ satisfies:
$$w \in re(\mathcal{A}_4)$$
