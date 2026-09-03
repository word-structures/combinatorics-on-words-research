# Primary Theorem

Let $\mathcal{A}_4$ be the factorial language of finite Abelian-square-free words over the alphabet $\Sigma_4 = \{a,b,c,d\}$.
Let $s$ be the finite word:
$s = \texttt{abacabadc}$

**Theorem:** 
$$s \in re(\mathcal{A}_4) \setminus le(\mathcal{A}_4)$$
where $re(\mathcal{A}_4)$ is the set of words that can be infinitely extended to the right in $\mathcal{A}_4$, and $le(\mathcal{A}_4)$ is the set of words that can be infinitely extended to the left in $\mathcal{A}_4$.

Because $s$ belongs to the language, this explicitly proves that the difference between the right-extendable and left-extendable parts of $\mathcal{A}_4$ is non-empty:
$$re(\mathcal{A}_4) \setminus le(\mathcal{A}_4) \neq \emptyset$$

**Corollary:**
Let $e(\mathcal{A}_4)$ be the set of two-sided extendable words (factors of bi-infinite Abelian-square-free words). By definition, $e(\mathcal{A}_4) \subseteq le(\mathcal{A}_4)$. Thus:
$$re(\mathcal{A}_4) \setminus e(\mathcal{A}_4) \neq \emptyset$$
