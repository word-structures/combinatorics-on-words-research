# JOINT PREFIX-PARIKH ORACLE REPORT
**Date:** 2026-08-29

## Methodology
For each test window:
- **Literal pass (A):** Enumerate all words with profile ρ. For each word, compute
  σ(prefix Parikh vectors) + t and check if it equals 0.
- **CSP pass (B):** Enumerate all monotone prefix-Parikh chains Y_0=0, Y_{d1}, ..., Y_L=ρ
  satisfying |Y_d|₁ = d and 0 ≤ Y_{d1} ≤ ... ≤ ρ componentwise.
  For each chain, evaluate σ(Y) + t and check if it equals 0.
- **Compare:** The set of σ(X)+t values reachable by literal words must equal
  those reachable by valid chains. Any discrepancy is a STOP condition.

## Results
### L = 5, ρ = [2,1,2]
- Words tested: 30
- Windows tested: 166
- Literal solutions (total): 190
- CSP chain solutions (total): 25
- Literal-only (STOP if > 0): 0
- CSP-only (STOP if > 0): 0

### L = 6, ρ = [2,2,2]
- Words tested: 90
- Windows tested: 195
- Literal solutions (total): 700
- CSP chain solutions (total): 67
- Literal-only (STOP if > 0): 0
- CSP-only (STOP if > 0): 0

## Verdict
- **Total windows tested:** 361
- **literal_only:** 0
- **csp_only:** 0

> **No discrepancies found.** Literal and CSP feasibility agree on all tested windows.
