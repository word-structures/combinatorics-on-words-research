# Proof Skeleton

Let $\mathcal{A}_4$ be the language of Abelian-square-free words over $\{a,b,c,d\}$.
Let $s = \texttt{abacabadc}$.
Let $C = \texttt{abacabadcdb}$, and let $F_C(V) = C \cdot g_{85}(V)$, where $g_{85}$ is Keränen's 85-uniform morphism.

### Lemma 1
$s \in \mathcal{A}_4$.
*Proof:* Checked by direct enumeration.

### Lemma 2
$L_1(s) = \emptyset$. No single letter can precede $s$ to form an Abelian-square-free word.
*Proof:*
- $a + s \implies \texttt{aa} \quad (K=1)$
- $b + s \implies \texttt{baba} \quad (K=2)$
- $c + s \implies \texttt{cabacaba} \quad (K=4)$
- $d + s \implies \texttt{dabacabadc} \quad (K=5)$
Every possible one-letter left extension creates an immediate Abelian square. Therefore, $s \notin le(\mathcal{A}_4)$.

### Lemma 3
There exists an invariant class $\mathcal{C}_C \subseteq \mathcal{A}_4$ consisting of words that avoid a specific set of 36 near-square residual configurations (defined in `RESIDUAL_STATE_DEFINITION.md`). The class $\mathcal{C}_C$ is preserved by the mapping $F_C(V)$.
*Proof:* See `verify_p7_main_theorem.js` and `RESIDUAL_TRANSITIONS.csv`. Any square or residual configuration crossing the boundary $C \mid g_{85}(V)$ desubstitutes via exact geometric descent to either an Abelian square or a residual configuration in $V$. The descent measure $\mu = |W_U|$ satisfies $\mu' < \mu$. If $V \in \mathcal{C}_C$, it avoids all such configurations. Thus $F_C(V) \in \mathcal{C}_C$.

### Lemma 4
$C \in \mathcal{C}_C$.
*Proof:* Verified by direct enumeration against the finite base cases. $C$ avoids all Abelian squares and all 36 configurations for short lengths. 

### Proposition
Define $W_0 = C$, and $W_{n+1} = F_C(W_n)$. Then $W_n \in \mathcal{A}_4$ for all $n$.
*Proof:* Since $W_0 = C \in \mathcal{C}_C$ (Lemma 4) and $F_C$ preserves $\mathcal{C}_C$ (Lemma 3), $W_n \in \mathcal{C}_C$ for all $n$ by induction. Since $\mathcal{C}_C \subseteq \mathcal{A}_4$, $W_n \in \mathcal{A}_4$.

### Corollary
The limit $W_\infty = C \cdot g_{85}(C) \cdot g_{85}^2(C) \cdots$ is well-defined because $W_n \prec W_{n+1}$. Since every finite factor of $W_\infty$ is contained in some $W_n$, $W_\infty$ is Abelian-square-free.
Since $s$ is a prefix of $W_\infty$, $s$ has an infinite right extension in $\mathcal{A}_4$. Therefore, $s \in re(\mathcal{A}_4)$.

### Theorem
$$s \in re(\mathcal{A}_4) \setminus le(\mathcal{A}_4)$$
*Proof:* Follows directly from Lemma 2 ($s \notin le(\mathcal{A}_4)$) and Corollary ($s \in re(\mathcal{A}_4)$).

### Corollary
$$re(\mathcal{A}_4) \setminus e(\mathcal{A}_4) \neq \emptyset$$
*Proof:* By definition, $e(\mathcal{A}_4) \subseteq le(\mathcal{A}_4)$. Since $s \in re(\mathcal{A}_4)$ but $s \notin le(\mathcal{A}_4)$, $s \notin e(\mathcal{A}_4)$.
