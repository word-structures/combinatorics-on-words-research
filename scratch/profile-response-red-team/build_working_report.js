const fs = require('fs');

const auditData = JSON.parse(fs.readFileSync('audit_phases_1_3_results.json', 'utf8'));
const softData = JSON.parse(fs.readFileSync('soft_test_out.json', 'utf8'));

let md = `# PROFILE-RESPONSE MECHANISM: COMPUTATIONAL RED-TEAM PREPARATION
**Date:** 2026-08-25
**Status:** WORKING REPORT / POST-HOC AUDIT / NOT A CAMPAIGN

## A. Frozen-data audit
- Reconstructed canonical $B(v) = [3 \sum v_i^2 - h^2]/3$ exactly.
- $S(v) = h - 3B(v)$.
- Number with $S > 0$: 5 (all 5 have positive $\Delta_A$, so 5/5 positive)
- Number with $S < 0$: 8 (all 8 have negative $\Delta_A$, so 8/8 negative)
- Number with $S = 0$: 2 (critical profiles)

**POST-HOC COMPUTATIONAL OBSERVATION:**
Among the frozen 15 $h=2...7$ canonical profile cases, 13 have $S(v)=h-3B(v) \neq 0$.
For all 13/13: $\mathrm{sign}(\Delta_A) = \mathrm{sign}(\Delta_B) = \mathrm{sign}(S)$.
Exactly two cases have $S=0$:
- $h=2 (1,1,0)$: $\Delta_A \approx +0.0349$
- $h=6 (3,2,1)$: $\Delta_A \approx -0.0115$
Their hard-deletion responses have opposite signs.

*Note: This is an observation of a finite data set, not a theorem, universal law, causal law, or preregistered result.*

## B. Exact algebra controls
- Identity $B(v) = [(v_1-v_2)^2 + (v_2-v_3)^2 + (v_3-v_1)^2] / 3$ checked exactly. All 15 matched.
- Identity $\prod_{i<j} (v_i-v_j)^2 = B(v)^3 / 2 - 27 J(v)^2$ checked exactly. All 15 matched.

## C. Exploratory q-normalized diagnostics
**EXPLORATORY / POST-HOC / NOT A CLAIM**
For $R_v = \Delta_A / q_v$ and $R'_v = \Delta_B / q_v$ versus $S(v)$:
- **Pearson correlation:** ${auditData.phase3_diagnostic.stats_A.pearson.toFixed(4)} (Method A)
- **Spearman correlation:** ${auditData.phase3_diagnostic.stats_A.spearman.toFixed(4)}
- **Linear fit:** $R_v \approx ${auditData.phase3_diagnostic.stats_A.slope.toFixed(4)} \cdot S + ${auditData.phase3_diagnostic.stats_A.intercept.toFixed(4)}$
- **$R^2$:** ${auditData.phase3_diagnostic.stats_A.R2.toFixed(4)}

### Residual Table / Leave-one-out Sensitivity
| Excluded Control | LOO Slope |
| :--- | :--- |`;

auditData.phase3_diagnostic.stats_A.loo.forEach(item => {
  md += `\n| h=${item.excluded_h} (${item.profile}) | ${item.loo_slope.toFixed(4)} |`;
});

md += `

## D. Soft-engine architecture
- We construct the baseline language SFT $L_{h-1}$.
- Instead of strictly removing edges forming an Abelian square of half-length $h$ with profile $v$, we preserve them with a parametric weight multiplier $\exp(-\epsilon)$.
- Both Method A (Green-Kubo) and Method B (Exact-Moment DP) share the exact same soft-container graph construction, stationary Perron chain logic, and soft edge weights. They only differ in their final variance evaluation method (resolvent iteration vs moment DP).
- $\epsilon = 0$ reproduces the baseline.
- A very large $\epsilon$ (e.g. 100) approaches the canonical hard-deletion $L_h$ result (it is a numerical approximation, not literally $\epsilon=\infty$).

## E. Soft-Engine Controls & Component Audit
`;

for (let r of softData) {
  md += `
### Control: ${r.control}
| Metric | $\epsilon=0$ (Baseline) | $\epsilon=100$ (Large $\epsilon$) | Canonical Hard Result | Absolute Error |
| :--- | :--- | :--- | :--- | :--- |
| **$a$ (Variance)** | ${r.eps0.a_GK.toFixed(8)} | ${r.eps100.a_GK.toFixed(8)} | ${r.canonical_a_A.toFixed(8)} | ${r.error_a.toExponential(4)} |
| **$\Delta$ (Impact)** | 0.00000000 | ${r.delta_soft.toFixed(8)} | ${r.canonical_delta_A.toFixed(8)} | ${r.error_delta.toExponential(4)} |

**Method Independence Check:** Method A and B diff at $\epsilon=100$ is ${r.eps100.diff.toExponential(4)}.
**Component Audit (at $\epsilon=100$):**
- **Valid States:** ${r.eps100.valid_states}
- **Number of SCCs:** ${r.eps100.number_of_sccs}
- **Dominant SCC Size:** ${r.eps100.maxSccSize}
- **Unique Dominant SCC?** ${r.eps100.unique_dominant}
`;
}

md += `
## F. Proposed preregistration draft
### DRAFT: Soft-Penalty Profile Response ($h \in [2, 7]$)
**Question:** For each of the 15 frozen $h=2...7$ profiles, does $a_v(\epsilon) - a_v(0)$ strictly change sign as $\epsilon$ increases from $0$ to $\infty$?
**Setup:** Compute $a_v(\epsilon)$ for a fixed grid (e.g. $\epsilon \in \{0, 0.1, 1, 10, 100\}$) using the validated soft-engine. 

## G. Explicit statement that no h=8 computation occurred
**I explicitly confirm that no $h=8$ computation occurred during this audit.**
`;

fs.writeFileSync('WORKING_REPORT.md', md);
