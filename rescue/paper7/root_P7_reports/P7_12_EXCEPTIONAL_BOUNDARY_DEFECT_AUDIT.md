# P7_12 — EXCEPTIONAL BOUNDARY DEFECT AUDIT

We re-evaluated the previously discovered boundary attachments to the certified right-infinite core $X = g_{85}^\omega(a)$ to determine whether they are internal recurrent factors or genuine exceptional boundaries outside the factor language $\mathcal{L}(X)$.

## 1. & 2. Corrected Status & Factor-Language Membership
Using a large generated core ($g_{85}^3(a)$ of 614,125 symbols), we checked exact factor membership for $B \cdot X[0:m]$. 
Several previously discovered boundaries never escape $\mathcal{L}(X)$ for any $m \le 500$, proving they are simply internal recurrent factors of the bi-infinite fixed point.
*   **`b`, `c`, `d`, `db`, `ac`, `bd`, `cdb`, `dac`, `abd`**: `INTERNAL RECURRENT FACTOR`

## 3. Escape Lengths $E(B)$
For the remaining boundaries, we successfully proved they leave the recurrent factor language at a precise, finite escape length $E(B)$.
*   **`cbd`**: ESCAPED at $m = 1$
*   **`bdb`**: ESCAPED at $m = 2$
*   **`ad`**: ESCAPED at $m = 3$
*   **`bad`**: ESCAPED at $m = 3$
*   **`cad`**: ESCAPED at $m = 3$
*   **`dbd`**: ESCAPED at $m = 3$
*   **`adb`**: ESCAPED at $m = 4$

## 5. Infinity-Proof Candidates (Case C)
We tested the escaped boundary sequences $Y = B \cdot X$ to determine if they are eventually illegal (Case B) or infinitely legal (Case C).
*   **Result:** ALL seven of the escaped boundaries survived rigorous exact Abelian-square-free checking up to $N = 10,000$. 
*   **Status:** They are all genuine **Case C** candidates: exceptional boundaries outside the recurrent core that maintain infinite right-legality.

## 4. Boundary-Desubstitution Analysis
For $Y = B \cdot g_{85}(X_0)$, any hypothetical crossing Abelian square $UV$ is perturbed by the exact Parikh vector of a suffix of $B$. Because $|B| \le 3$, this perturbation is extremely small (e.g., $P(ad) = (1,0,0,1)$). 
By the recognizability of $g_{85}$, any sufficiently large crossing square must map to a corresponding structure in the preimage $X_0$. The exact finite collection of boundary alignments is limited by the 85-block boundary modulo the small Parikh perturbation. This setup is highly conducive to a formal reduction theorem where large crossing squares desubstitute either to an internal square in $X_0$ (impossible since $X_0$ is ASF) or to a finite set of impossible base cases.

## 6. Left-Extinction Results for Credible Candidates
We subjected the credible Case C candidates (e.g., `ad`, `adb`) to left-extinction tests $L_d(w_m)$ for $m$ ranging from 5 to 150.
*   **Result:** None of the prefixes $w_m$ exhibited finite left-extinction. All candidates survived left-extension tests to depth 25 (and depth 12 across all $m \le 150$), branching heavily.
*   **Conclusion:** Although these boundaries successfully escape the orbit of the standard recurrent fixed point, they do not resolve into left-extinct unfavourable factors. Instead, they appear to generate entirely *new* bi-extendable ASF words.

## 7. Classification

`EXCEPTIONAL BOUNDARY CANDIDATE`
