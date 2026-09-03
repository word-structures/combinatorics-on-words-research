# MANUSCRIPT ARCHITECTURE

**Title Candidate:** "One-Sided Extendability in the Four-Letter Abelian-Square-Free Language"

The paper will be structured to present the striking human-verifiable obstruction early, delaying the heavy computer-assisted machinery to the later sections. This ensures maximum readability and conceptual clarity.

## 1. Introduction
- **Historical Context:** Erdős's question (1961), Keränen's resolution (1992).
- **The Problem:** Extending Abelian-square-free (ASF) words. Define $re(\mathcal{A}_4)$, $le(\mathcal{A}_4)$, and $e(\mathcal{A}_4)$ using Shur's notation. Introduce Keränen's concept of unfavourable factors (words $\notin e(\mathcal{A}_4)$) and his open question regarding one-sided infinite extensions.
- **Contribution:** State the main theorem $re(\mathcal{A}_4) \setminus le(\mathcal{A}_4) \neq \emptyset$. Emphasize the explicit witness $s = \text{abacabadc}$.

## 2. Preliminaries
- Formal definitions of Parikh vectors, Abelian squares, and the language $\mathcal{A}_4$.
- Formal definitions of extendability languages ($re$, $le$, $e$).
- Proof of elementary subset relations (e.g., $e(L) \subseteq le(L)$).

## 3. The Left-Maximal Witness (The Negative Half)
- Introduce the witness $s = \text{abacabadc}$.
- Present the tiny, explicit table showing that $a+s$, $b+s$, $c+s$, and $d+s$ contain Abelian squares at lengths $K=1, 2, 4, 5$.
- Conclude with Lemma: $s \notin le(\mathcal{A}_4)$. This immediately establishes $s$ as a left-dead word.

## 4. The Right-Infinite Construction (The Positive Half)
- Define the boundary $C = \text{abacabadcdb}$ and Keränen's 85-uniform morphism $g_{85}$.
- Define the affine word mapping $F_C(V) = C \cdot g_{85}(V)$.
- Define the nested sequence $W_0 = C$, $W_{n+1} = F_C(W_n)$, and its limit $W_\infty$.
- State the positive goal: prove $W_n \in \mathcal{A}_4$ for all $n$, ensuring $W_\infty \in \mathcal{A}_4$. Since $s \prec W_\infty$, this will establish $s \in re(\mathcal{A}_4)$.

## 5. Residual-State Lemma
- Explain the mechanism of squares crossing the boundary $C \mid g_{85}(V)$.
- Mathematically define the 36-state invariant class $\mathcal{C}_C$.
- State the completeness lemma: any square or residual near-square in $F_C(V)$ maps strictly to an Abelian square or a state in $Q$ within $V$.

## 6. Strict Descent and Finite Certificate
- Define the complexity measure $\mu = |W_U|$ (the length of the involved prefix).
- State the Strict Descent Lemma: $\mu' < \mu$.
- Resolve the finite base cases: verify $W_1$ against the 36 states up to the descent threshold.
- Conclude that $F_C$ preserves $\mathcal{C}_C$.

## 7. Main Theorem
- Combine Section 3 ($s \notin le(\mathcal{A}_4)$) and Section 6 ($s \in re(\mathcal{A}_4)$).
- State the main theorem $s \in re(\mathcal{A}_4) \setminus le(\mathcal{A}_4)$.
- Conclude the corollary $re(\mathcal{A}_4) \setminus e(\mathcal{A}_4) \neq \emptyset$, answering Keränen's question.

## 8. Computational Verification
- Describe the structure of the data certificate (`G85`, `RESIDUAL_STATES`, `RESIDUAL_TRANSITIONS`, `BASE_CASES`).
- Describe the independent algebraic verifier and the 7-point mutation suite ensuring fail-closed robustness.

## 9. Relation to Previous Work
- Compare with Shur's growth rate theorems.
- Compare with Korn/Currie's finite maximal words.
- Explicitly trace the resolution of Keränen's unfavourable factor open question.

## Appendices
- Full table of the 36 residual states.
- Source repository and reproducibility instructions.
