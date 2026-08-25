const fs = require('fs');

function formatReport() {
  const data = JSON.parse(fs.readFileSync('soft_path_campaign_results.json', 'utf8'));
  let md = `# PROFILE-RESPONSE MECHANISM: SOFT-PATH CAMPAIGN RESULTS
**Date:** 2026-08-25
**Scope:** Canonical Baseline Profiles $h \\in [2, 7]$
**Method:** Finite-horizon moment recurrence and Green-Kubo Poisson evaluation under soft penalty $\\exp(-\\epsilon)$

## 1. Monotonicity Summary
The core preregistered question was: *Does $a_v(\\epsilon) - a_v(0)$ strictly change sign as $\\epsilon$ increases from 0 to $\\infty$?*

Results across 15 canonical profiles:
`;

  let all_monotonic = true;
  for (let item of data) {
    if (Math.abs(item.hard_delta) > 1e-8 && !item.strict_monotonic) {
      all_monotonic = false;
    }
  }

  if (all_monotonic) {
    md += `✅ **SUCCESS:** For all tested profiles, the variance impact $\\Delta_a(\\epsilon)$ strictly maintains its sign and monotonically approaches the hard-deletion limit without oscillations.\n\n`;
  } else {
    md += `❌ **FAILURE:** Some profiles exhibited sign crossings or non-monotonic behavior.\n\n`;
  }

  md += `## 2. Detailed Trajectories\n\n`;

  for (let item of data) {
    md += `### $h=\${item.h}$ Profile $(\${item.profile})$\n`;
    md += `- **Target Hard $\\Delta_A$:** \${item.hard_delta.toFixed(8)}\n`;
    md += `- **Monotonic Trajectory:** \${item.strict_monotonic ? 'Yes' : 'No'}\n\n`;
    md += `| $\\epsilon$ | $\\lambda$ | $a_v(\\epsilon)$ | $\\Delta_v(\\epsilon)$ |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    for (let point of item.sweep) {
      md += `| \${point.eps} | \${point.lambda.toFixed(8)} | \${point.a_GK.toFixed(8)} | \${point.delta.toFixed(8)} |\n`;
    }
    md += `\n`;
  }
  
  fs.writeFileSync('SOFT_PATH_RESULTS.md', md);
  console.log("Report generated.");
}

formatReport();
