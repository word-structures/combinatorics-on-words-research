# P7_26 — BALANCED EXTINCTION TEST OF THE PROVED `ad` DEFECT TOWER

We tested the strictly Abelian-square-free, right-infinite multi-scale defect tower $W_\infty = ad \cdot g_{85}(ad) \dots$ for balanced (two-sided) extinction.

## A. Frozen P7_25 Theorem Provenance
* Boundary: `ad`
* Recurrence: $W_{n+1} = ad \cdot g_{85}(W_n)$
* Invariant $\mathcal{C}_{ad}$: Proven closed and mathematically verifiable over the 11-state constraint space. 
* Right Infinity: Strictly verified. $W_n \in re(\mathcal{A}_4)$ for all $n$.

## B. Exact Generation
We successfully generated the first three multi-scale objects and verified their lengths:
* $W_0 = ad$ (length 2)
* $W_1 = ad \cdot g_{85}(a) \cdot g_{85}(d)$ (length 172)
* $W_2 = ad \cdot g_{85}(ad \cdot g_{85}(a) \cdot g_{85}(d))$ (length 14,622)

## C & D. Balanced Frontier Tables & Matched Controls
We ran exact balanced context expansions $T_d(W_n)$ using the entire constraint geometry (all $16$ outer letter extensions per parent) alongside a perfectly matched single-defect control $C_1$ generated from $ad \cdot g_{85}^\omega(a)$ (length 172).

| Depth $d$ | $W_1$ Survivors | $C_1$ (Control) Survivors | $W_2$ Survivors |
| :--- | :--- | :--- | :--- |
| 1 | 6 | 6 | 6 |
| 2 | 40 | 40 | 40 |
| 3 | 170 | 170 | 170 |
| 4 | 430 | 430 | - |
| 5 | 1326 | 1326 | - |
| 6 | 3388 | 3388 | - |
| 7 | 7872 | 7872 | - |
| 8 | 15105 | 15105 | - |

## G. Scale/Death-Pattern Analysis
The balanced frontier tables reveal a striking, negative result:
1. **No Material Obstruction:** The frontier profile of the recursive multi-scale defect $W_1$ is **quantitatively identical** to the single-defect control $C_1$ at all evaluated depths.
2. **Structural Independence:** Even pushing to depth 3 on the massive $W_2$ candidate (length 14,622) yielded the exact same survival sizes (6, 40, 170). The extensions are entirely dominated by the local structure of the boundaries. Because $g_{85}$ is symmetric over alphabet permutations, the varying right-tails ($g_{85}(d)$ vs $g_{85}(b)$) prune exactly the same number of branches, meaning no new multiscale interference occurs.
3. **Explosion:** The frontiers exhibit broad, exponential survival. The defect hierarchy completely fails to force synchronized collapse.

## H. Final Classification
Because $W_1$ and $W_2$ both show broad balanced survival with no frontier strengthening compared to single-defect controls, and because no scale-linked obstruction recursion materializes, we execute the Plan-B kill criterion.

`TOWER RIGHT-INFINITE BUT NO TWO-SIDED OBSTRUCTION SIGNAL`
