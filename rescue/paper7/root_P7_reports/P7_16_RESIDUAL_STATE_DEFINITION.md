# P7_16 — RESIDUAL STATE DEFINITION

## Mathematical Definition of a Residual State

A residual state for a hypothetical crossing Abelian square $UV$ over the boundary $ad | X$ where $X = g_{85}^\omega(a)$ is mathematically parameterized by a 5-tuple:
$$(c_1, k_1, c_2, k_2, \Delta W)$$
subject to exact geometric constraints.

### 1. Geometric Boundary Constraints
Because $U$ originates strictly at the $ad$ boundary, it parses into $g_{85}$ blocks. Thus:
* $U$ ends with a prefix $p_U$ of the block $g_{85}(c_1)$, with length $k_1$.
* $V$ immediately follows $U$, so it starts with the complementary suffix $s_V$ of length $85 - k_1$. This strictly enforces $p_U \cdot s_V = g_{85}(c_1)$.
* $V$ ends with a prefix $p_V$ of some block $g_{85}(c_2)$, with length $k_2$.

### 2. Parikh Equation
The requirement $P(U) = P(V)$ translates to the block preimage difference $\Delta W = P(W_U) - P(W_V)$:
$$M_{85} \cdot \Delta W = P(s_V) + P(p_V) - P(p_U) - P(ad)$$
Because $P(s_V) = P(g_{85}(c_1)) - P(p_U)$, this reduces to:
$$M_{85} \cdot (\Delta W - e_{c_1}) = P(p_V) - 2 P(p_U) - P(ad)$$

### 3. Preimage Translation
A state is strictly defined as the resulting near-square translated back into the preimage sequence $X_0$:
Let $\Delta W' = \Delta W - e_{c_1}$. 
The desubstituted halves $U', V'$ in $X_0$ must satisfy:
$$P(U') - P(V') = \Delta W'$$
where $U'V'$ is a contiguous prefix of $X_0$.

### 4. Realizability
A state is realizable if and only if $X_0$ contains a prefix $U'V'$ with the specified Parikh difference $\Delta W'$. If no such prefix exists, the state is `IMPOSSIBLE`.
