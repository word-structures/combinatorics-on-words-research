# P7_13 — BOUNDARY INFINITY AND BALANCED EXTINCTION

We subjected the exceptional boundaries discovered in P7_12 to strict epistemic corrections, formalized an all-scale desubstitution proof architecture, and performed balanced-context extinction testing to seek a decisive separation witness.

## A. Frozen Exceptional Boundaries
The following boundary attachments to $X = g_{85}^\omega(a)$ are frozen for analysis, having proven finite escape lengths $E(B)$ from the recurrent core $\mathcal{L}(X)$:
1. `cbd` ($E=1$)
2. `bdb` ($E=2$)
3. `ad` ($E=3$)
4. `bad` ($E=3$)
5. `cad` ($E=3$)
6. `dbd` ($E=3$)
7. `adb` ($E=4$)

## B. Corrected Epistemic Status
Previous classifications are hereby mathematically corrected:
* Finite check of $BX[0:N] \in \mathcal{A}_4$ (even to $N=10,000$) establishes only:
  `EXCEPTIONAL BOUNDARY CANDIDATE — ASF VERIFIED FINITELY TO N, INFINITY PROOF PENDING`.
* Finite left-survival of prefixes to depth 25 establishes only:
  `FINITE LEFT SURVIVAL TO DEPTH 25`. It does NOT establish $w \in le(\mathcal{A}_4)$ or bi-infinite extendability.

## C. Infinity Proof / Desubstitution Status
To prove $BX \in \mathcal{A}_4$ across all scales, we formalized the boundary-desubstitution architecture:
1. **Recognizability:** Any sufficiently large Abelian square $UV$ in $B \cdot g_{85}(X_0)$ must decompose over the 85-uniform blocks.
2. **Alignment:** $U$ starts precisely at the boundary, giving $U = B \cdot g_{85}(W_U) \cdot u_{suf}$. The second half aligns as $V = v_{pre} \cdot g_{85}(W_V) \cdot v_{suf}$.
3. **Parikh Discrepancy:** The equation $P(U) = P(V)$ enforces:
   $$M_{85} \cdot (P(W_U) - P(W_V)) = P(v_{pre}) + P(v_{suf}) - P(B) - P(u_{suf})$$
4. **Finite Reduction:** Because the unaligned residuals ($u_{suf}, v_{pre}, v_{suf}$) are strictly shorter than 85 characters, the right-hand side is bounded. Because the Parikh matrix $M_{85}$ is expansive/non-singular, the difference $P(W_U) - P(W_V)$ in the preimage is strictly bounded.
5. **Current State:** This setup reduces the infinite space of crossing squares to a finite automaton of boundary residual states. However, because $M_{85}$ is not Parikh-constant, fully proving this requires computing the exact closure of these residual states. We do not claim desubstitution until this exhaustive finite base-case check is completely executed.

## D. Balanced $T_d$ Results
We tested prefixes $w_m = B \cdot X[0:m]$ for the shortest candidate `ad` at lengths $m \in [3, 30]$ using a balanced-context BFS to find $T_d(w_m)$.
*   **Result:** All tested prefixes branch heavily and survive balanced extensions up to depth 10.
*   **Status:** `BALANCED SURVIVAL TO DEPTH 10 — NO e CLAIM`.

## E. Exact Extinction Certificates
No exact balanced-extinction certificate ($T_d = \emptyset$) was found in the modest tested range. The candidates did not immediately die in two-sided context.

## F. Classification

`BOUNDARY-INFINITY CANDIDATE`
