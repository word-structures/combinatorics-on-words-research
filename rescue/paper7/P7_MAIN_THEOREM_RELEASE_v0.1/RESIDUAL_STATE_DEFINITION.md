# Residual State Definition

A residual state (or near-square configuration) describes a strictly prefix-anchored condition that must be avoided by any word $V \in \mathcal{C}_C$. 

Each state $S \in Q$ is uniquely defined by:
- A Parikh discrepancy vector $q = [q_a, q_b, q_c, q_d]$.
- A bounding character $c_{mid} \in \Sigma_4$.
- An ending character $c_{end} \in \Sigma_4$.

A word $V$ contains the state $S = (q, c_{mid}, c_{end})$ if and only if $V$ can be factored as:
$$V = W_U \cdot c_{mid} \cdot W_{gap} \cdot c_{end} \cdot X$$
such that:
$$P(W_U) - P(W_U \cdot c_{mid} \cdot W_{gap}) = q$$

The invariant class $\mathcal{C}_C$ requires $V$ to avoid Abelian squares AND all 36 configurations defined in `RESIDUAL_STATES.csv`.

### Completeness and Geometric Descent
The 36 states perfectly close the transition graph representing any square that could cross the boundary $C \mid g_{85}(V)$.
Every such crossing square in $F_C(V)$ maps (via the inverse of the Parikh block-substitution matrix) strictly to a state $S \in Q$ in $V$. 
The length of the involved prefix $|W_U|$ in $V$ is strictly bounded by:
$$|W_U| = \frac{|U| - |C| - o_{mid}}{85} < \frac{|U|}{85}$$
where $|U|$ is the prefix length of the occurrence in $F_C(V)$.
This strict inequality forms a well-founded geometric descent, terminating in base cases of length $\le 190$, which are empirically verified.
