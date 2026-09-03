# P7_08 EXISTING TRACKER AND RIGHT EXTENDABILITY AUDIT

## A. Existing-code inventory

The repository currently contains the following tools dedicated to extending factors and searching for infinite certificates:

1.  **`src/unfavourable-factors.js`**
    *   **Computes:** `extensionDepth` via depth-first search for any starting factor, testing finite extensions up to a specified bounded `cap`. 
    *   **Type of extension:** Tests finite left extension, finite right extension, and combinations (either side exhausted).
    *   **Specific for $w_K$:** No previous computations natively targeted $w_K$. The script default-scanned short factors (lengths 8, 9, 11).

2.  **`src/rauzy-graph.js`**
    *   **Computes:** Fixed-order Rauzy graphs (nodes are length $n$, edges are length $n+1$) and Cassaigne second-difference checks.
    *   **Type of extension:** Heuristic graph cycles for finite languages. 

3.  **`tests/test.js`**
    *   **Computes:** Regression tests for the aforementioned scripts, verifying there are exactly 48 proven unfavourable factors of length 8 in $\mathcal{A}_4$.

## B. Semantic audit

The semantics in the existing codebase exactly align with strict scientific requirements:

*   **Finite Extinction ($R_d(w) = \emptyset$):** 
    In `unfavourable-factors.js`, returning a depth $< \text{cap}$ triggers an exhaustion verdict, categorizing the word accurately as `"PROVEN unfavourable"`.
*   **Finite Survival ($R_d(w) \neq \emptyset$):** 
    If a tree hits `cap`, the script refuses to declare it infinite. It explicitly logs: *"Its right extension reached the cap of [CAP], which is EVIDENCE of boundless right extension and NOT proof."* 
*   **Infinite Right Extendability ($w \in re(\mathcal{A}_4)$):** 
    The script explicitly notes that a true proof requires an independent infinite certificate (e.g., *"a morphism whose fixed point has it as a prefix, or a cycle argument in the language itself rather than in a capped tree"*).
*   **Rauzy Logic:** 
    `src/rauzy-graph.js` enforces the `RAW CYCLE — NO INFINITE PROOF VALUE` doctrine explicitly in its terminal output: *"For aa2f and aa2fr the graphs describe the language of FINITE words. A vertex can have positive out-degree and still not extend to an infinite word, so these graphs do not answer Makela's question."* 

## C. Reproduction

We tested $w_K$ (`abcdacbabdabacdacbcdad`) directly using `extensionDepth` for strictly right-sided extensions.

*   **Depth 10 to Depth 500:** The DFS rapidly hit the cap at $d=100, 150, 200, 300, 500$. 
*   **Branching Distribution (via independent exact BFS):** 
    The right-extension tree is strictly growing, heavily branching, and shows no signs of funneling into a narrow corridor.
    *   $r_1(w_K) = 2$
    *   $r_2(w_K) = 5$
    *   $r_{10}(w_K) = 147$
    *   $r_{20}(w_K) = 2,099$
    *   $r_{33}(w_K) = 169,872$
*   **First depth with $r_d = 0$:** None encountered.
*   **Maximum completed depth:** BFS completed to $d=33$ (exponentially growing); DFS verified single-branch survival to $d=500$.

## D. $w_K$ current right-extension status

`FINITE RIGHT SURVIVAL TO DEPTH 500 — NO INFINITY CLAIM`

## E. Structural observations

Unlike the two-sided alternating extension sequence (which strictly forced the tree into a terminal finite corridor of width $\le 16$ before extincting it at depth 96), the right-only extension tree behaves completely differently. It rapidly undergoes monotonic exponential branching ($> 169,000$ surviving right contexts after just 33 steps). 

Because it expands so widely, finding a strictly local exact transformation (I2) or a perfectly bounded future-complete quotient (I3) will require isolating the correct Abelian-square-avoidance boundaries. The constraint "bites" much less stringently when the left side is frozen.

## F. Next decision

`CONTINUE CERTIFICATE SEARCH, NOT CAP CHASE`
