const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/A7_NUMERICAL_AUDIT.json', 'utf8'));
const a7 = data.A7_METHOD_A;

const C_6 = 0.996661;
const C_free = 3 * Math.sqrt(3) / (4 * Math.PI);
const C_7 = 1 / (2 * Math.sqrt(3) * Math.PI * a7);
const ratio = (2 / 9) / a7;
const c7_over_cfree = C_7 / C_free;
const diff = Math.abs(c7_over_cfree - ratio);

const out = {
  C_6: C_6,
  C_7: C_7,
  "C_7_MINUS_C_6": C_7 - C_6,
  "C_7_OVER_C_6": C_7 / C_6,
  "C_7_OVER_C_free": c7_over_cfree,
  "ratio_identity_residual": diff
};

fs.writeFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/C7_AUDIT.json', JSON.stringify(out, null, 2));
