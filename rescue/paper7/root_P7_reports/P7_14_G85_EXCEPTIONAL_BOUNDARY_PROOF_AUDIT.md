# P7_14 — G85 EXCEPTIONAL BOUNDARY PROOF AUDIT

We formalized the exact desubstitution architecture required to prove that the exceptional boundary candidate $Y = ad \cdot g_{85}^\omega(a)$ is Abelian-square-free across all scales. The infinity proof structure relies on mapping crossing Abelian squares to smaller near-squares in the preimage.

## 1. Synchronization Lemma / Bound
Keränen's original proof establishes that $g_{85}$ is recognizable. Any factor of sufficient length (the synchronization delay $S$) admits a unique decomposition into $g_{85}$ blocks. Computationally, block boundaries can be uniquely resolved by looking at any window of length $\ge 3 \times 85 = 255$ symbols. This ensures that the alignment of both halves of a large crossing Abelian square ($U$ and $V$) is rigidly determined, up to partial prefix/suffix residuals of length strictly less than 85.

## 2. Incidence-Matrix Lattice Audit
We computed the exact algebraic properties of the $g_{85}$ incidence matrix $M_{85}$:
* **Determinant:** $43435 \neq 0$
* **Rank:** 4
* **Integer Kernel:** Trivial (only the zero vector)
* **Adjugate Matrix Maximum Element:** $4059$

Because the determinant is non-zero, the integer kernel is empty. There are no "hidden" Parikh shifts that map to the zero vector. For a crossing square, the Parikh equation $M_{85} \cdot \Delta W = \Delta R$ uniquely determines the preimage difference $\Delta W$. Because the residual $\Delta R$ is bounded by the block length (85), we obtain a strict norm bound on $\Delta W$:
$$\| \Delta W \|_\infty \le \frac{4 \times 4059 \times 85}{43435} \approx 31.7$$
This guarantees that the two halves of the desubstituted near-square differ by at most 31 characters, enforcing a finite set of boundary states.

## 3. Residual-Type Set & 4. Strict Descent Proof
* **Strict Descent:** Because the morphism is 85-uniform, desubstituting a crossing square of half-period $K$ yields a preimage configuration of length approximately $K/85$. For any $K$ larger than the synchronization and residual boundaries ($K \gg 85 \times 32$), strict descent $\mu(\text{child}) < \mu(\text{parent})$ is mathematically guaranteed.
* **Complete Residual-Type Set:** While mathematically proven to be finite (due to the strict $\Delta W$ bounds), the full explicit enumeration of all valid $(u_{suf}, v_{pre}, v_{suf}, \Delta W)$ tuples involves thousands of algebraic states. It is not listed here pending a full graph compilation.

## 5. Residual Transition Graph & 6. Base Cases
To close the proof, the complete transition graph of these boundary residual states must be built, ensuring that all paths end in impossible base cases or are resolved for $K \le K_0$. Because this requires a massive exhaustive search through the boundary alignments and solving Parikh equations at each node, it remains computationally unresolved in this session.

## 7. Hostile Counterexample Search
We actively tested $ad \cdot g_{85}^\omega(a)$ against direct Abelian-square checkers. No counterexamples were found up to length $10,000$. The boundary attachment does not trigger any illegal finite collisions, confirming it is robust at the finite scale.

## 8. Final Classification

`BOUNDARY PROOF INCOMPLETE`

*(Sub-classification: `UNRESOLVED BASE CASE` / Transition graph requires dedicated computational closure)*
