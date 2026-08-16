# Conjecture Garden V0 (INTERNAL RESEARCH REGISTER)

## Philosophy & The Claim Firewall
The Conjecture Garden is an internal research register for tracking what we are investigating. 

**The Claim Firewall:** 
The Garden is exploratory and falsifiable. Nothing in the Garden constitutes an established mathematical claim until it passes strict governance and is promoted to `MATH_CLAIMS.md`.

## Refutation-Promotion Rule
When an exact finite counterexample refutes a project conjecture:
permanent witness preserved -> NEGATIVE_RESULTS entry -> Garden status updated -> structural residue identified OR explicit NO STRUCTURAL RESIDUE / STOP
before the producing research session is considered closed.
Do NOT automate this. Do NOT build lifecycle machinery.

## Programme Question vs. Current Challenge
The Garden structurally separates mathematical ambitions from immediate tests. A finite challenge failing does NOT automatically kill its programme.
*   **PROGRAMME QUESTION:** A broad structural question providing overarching research direction.
*   **CURRENT CHALLENGE:** An exact, bounded rung on the ladder (e.g., $C \le 20$), mechanically falsifiable.

## Critical Rule: A Search Cutoff is Not Extinction
When searching for dead ends or bounding continuation trees, distinguish an **EXACTLY EXHAUSTED SUBTREE** from **SEARCH CUTOFF / BUDGET CENSORING**. If any descendant reaches the depth/budget cutoff, the depth is **UNKNOWN / RIGHT-CENSORED** and must not be used as a counterexample for bounding depths.

## Exact Epistemic Outcome Vocabulary
Mathematical status is separate from strategic priority.
*   `SEED`: A raw question, not yet precisely stated or formalized.
*   `FORMALIZED`: Mathematically precise, quantified, and falsifiable, but no active computation.
*   `UNDER_ATTACK`: Active compute budget allocated for testing.
*   `SURVIVED_BOUNDED`: No counterexample found within explicitly stated finite bounds. Implies nothing universally and never means "probably true".
*   `REFUTED`: Strictly false, verified counterexample preserved.
*   `TRIVIALIZED`: Trivial answer, not worth pursuing mathematically.
*   `PROMOTED`: Canonical `MATH_CLAIMS.md` entry.

---

## Active & Historical Conjectures

### G001 — Deception Depth
*   **Status:** `FORMALIZED`
*   **Programme Question:** For doomed aa2f words $w$, define $\delta(w)$ as the max additional aa2f extension length from $w$. Is $\sup \delta(w)$ finite over doomed aa2f words?
*   **Current Challenge:** **G001-C20**: Every doomed word $w$ satisfies $\delta(w) \le 20$.
*   **Novelty Claimed:** false

### G002 — Death Certificates
*   **Status:** `TRIVIALIZED`
*   **Strategic Priority:** STOP
*   **Note:** Killed during formalization; immediate dead ends have a trivial $\le 3$ witness cover.

### G003 — Forced Corridors
*   **Status:** `FORMALIZED`
*   **Strategic Priority:** LOW
*   **Note:** Does there exist an absolute constant $C$ such that every finite-$k$ live continuation tree has a forced-corridor length $\gamma \le C$?

### G004 — No Lonely Immortals
*   **Status:** `FORMALIZED`
*   **Strategic Priority:** STOP
*   **Note:** Ordinary-power analogue known; abelian version unlocated.
*   **Novelty Claimed:** false

### G005 — Three Periods Suffice
*   **Status:** `REFUTED`
*   **Strategic Priority:** STOP
*   **Note:** Refuted by exact counterexample $w = \texttt{abacccaaacbc}$, $t=4$, requiring 7 periods. See `docs/evidence/structural-2026-08-15/verify_g005.js`.

### G005' — Extinction Width $\eta$
*   **Status:** `FORMALIZED`
*   **Strategic Priority:** LOW
*   **Note:** Programme seed investigating the supremum of extinction scale complexity $\eta(w) = h(w,\delta(w)+1)$.
*   **Novelty Claimed:** false

### G006 — Obstruction Hall Property (including G006-L Local Hall)
*   **Status:** `REFUTED`
*   **Strategic Priority:** STOP
*   **Note:** Same refutation family for both variants. Refuted by complete forced corridor length 19, $s=5$ deficiency. See `docs/evidence/structural-2026-08-15/probe_tail_chase.js`.

### Prefix Scale Credit
*   **Status:** `SURVIVED_BOUNDED`
*   **Strategic Priority:** LOW
*   **Note:** Tested exactly up to complete forced corridors of length 6 within $N \le 18$ bounded census. This is NOT "probably true". Later scratch-only extension reached $N \le 22$; it is not canonical preserved evidence and changed no strategic decision.

### Zero-Credit Renewal
*   **Note:** EXACT REFORMULATION OF PREFIX SCALE CREDIT — NO SEPARATE GARDEN ID.
