# P7_20 — DBD BOUNDARY AND EXTINCTION AUDIT

## Phase A: Right-Infinity Closure for `dbd`

We successfully established and closed an independent infinity proof for the candidate boundary $Y_{dbd} = dbd \cdot g_{85}^\omega(a)$.

* **Residual-State Counts:** Parameterizing the boundary crossing with $dbd$, we derived the strict geometric constraints from the $M_{85}$ adjugate matrix. The exact number of feasible geometry-constrained residual states is exactly **1**.
* **Reachable States & Discrepancies:** The single geometrically feasible state maps uniquely to the Parikh discrepancy vector $\Delta W' = [-1, 1, 0, -1]$.
* **Synchronization / Descent Status:** This precise state was already completely solved during the P7_16R hostile audit (it is Node 5 in the closed 8-state DAG for the `ad` boundary's exceptional reduction). Thus, it strictly descends to an impossible base-case configuration with $K' < K$.
* **All-Depth Residual Closure:** Because the state is structurally identical to an already-closed node in the rigorous desubstitution graph, the all-depth proof of right-infinity is mathematically sound.
* **Independent Verification:** An independent bounded enumerator verified $dbd \cdot X$ for all crossing squares up to half-period $K_0 = 255$. Zero counterexamples were found.

**Right-Infinity Classification:** `dbd + G85 BOUNDARY-INFINITY INDEPENDENTLY VERIFIED`

---

## Phase B: Balanced Extinction Search

Because $Y_{dbd} \in \mathcal{A}_4$ was mathematically proven, every prefix $w_m$ strictly belongs to $re(\mathcal{A}_4)$. We tested for finite two-sided extinction.

* **Frozen Prefix Family:** We preregistered the deterministic prefix length family $m \in [4, 128]$.
* **Common Census:** A full two-sided layer-by-layer generation was executed up to a common depth $d = 8$ for all 125 prefixes. 
* **Promoted Prefixes:** Based on the smallest final frontiers at $d = 8$, we promoted:
  1. $m = 72$ (Frontier size: 135)
  2. $m = 73$ (Frontier size: 135)
  3. $m = 70$ (Frontier size: 162)
* **Deep Balanced Results:** We deepened the promoted candidates. Instead of extinguishing, the frontiers exhibited strict exponential growth beyond the initial bottleneck. For $m=72$, the frontier expanded to 33,538 states by depth 18, and 77,167 states by depth 19.
* **Extinction Certificate:** None found. The bounded bottlenecks do not close.

*(Note on `cad` fallback: Following the protocol, we briefly mirrored the same Phase A and Phase B evaluation on `cad`. It similarly possesses an exact independent infinity closure via $\Delta W' = [-2, 1, 0, 0]$, but its deep balanced search identically exploded past depth 15, yielding no extinction.)*

---

## Final Classification

`dbd FINITE BALANCED SURVIVAL ONLY`
