# P7_19 — EXCEPTIONAL-BOUNDARY COMPARATIVE SCREEN

We executed a structural comparison across all seven frozen exceptional boundary candidates from P7_12. 
Each boundary configuration $B \cdot g_{85}^\omega(a)$ was evaluated for backward morphic accessibility, right-infinity proof status, and its exact balanced and left finite-survival profiles across a common prefix family ($m \in [3, 20]$).

## 1. Candidate Comparison Table

| Boundary | Escape Length | Infinity Status | G85 Backward | Min Left Frontier (d=12) | Min Balanced Frontier (d=7) | Structural Classification |
|---|---|---|---|---|---|---|
| `dbd` | 3 | FINITE-ONLY (C) | NO G85 BACKWARD | 312 | 371 | SEPARATION-POTENTIAL CANDIDATE |
| `cad` | 3 | FINITE-ONLY (C) | NO G85 BACKWARD | 514 | 409 | BALANCED-COLLAPSE CANDIDATE |
| `cbd` | 1 | FINITE-ONLY (C) | NO G85 BACKWARD | 392 | 419 | BALANCED-COLLAPSE CANDIDATE |
| `bad` | 3 | FINITE-ONLY (C) | NO G85 BACKWARD | 697 | 1160 | UNSTRUCTURED SURVIVOR |
| `ad` (Control) | 3 | PROVED (P7_16) | NO G85 BACKWARD | 776 | 1178 | UNSTRUCTURED SURVIVOR |
| `bdb` | 2 | FINITE-ONLY (C) | NO G85 BACKWARD | 787 | 2013 | UNSTRUCTURED SURVIVOR |
| `adb` | 4 | FINITE-ONLY (C) | NO G85 BACKWARD | 633 | 2687 | UNSTRUCTURED SURVIVOR |

### Notes on Classification Features
* **F1 (Right Infinity):** Only `ad` has a fully certified P7_16-style infinity proof. All others were finitely validated to $N=10,000$ in P7_12.
* **F2 (Morphic Backward Access):** None of the boundaries function as a valid suffix of any $g_{85}$ block (`ca`, `db`, `ac`, `bd`). Furthermore, no cross-boundary junction $c_{last} \cdot a$ can produce them. They all structurally block exact $g_{85}$ desubstitution to the left.
* **F3 & F4 (Collapse Tendency):** The boundaries `dbd`, `cad`, and `cbd` significantly outperform the `ad` control, displaying tightly constrained frontiers that resist the exponential explosion seen in `ad` and `adb`.

## 2. Decision

The boundaries `dbd` and `cad` exhibit the ideal structural profile: they block morphic backward completion (suggesting no trivial left-infinite extension) and show highly constrained balanced survival profiles (making them primary targets for a finite extinction proof).

`P7_19 PROMOTED CANDIDATES`
1. **`dbd`**
2. **`cad`**

No further deep computation has been executed on the remaining candidates.
