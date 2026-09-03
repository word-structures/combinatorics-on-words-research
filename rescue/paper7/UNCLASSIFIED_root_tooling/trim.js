const fs = require('fs');
const files = [
  'papers/paper4/reproducibility/PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt',
  'papers/paper4/reproducibility/PAPER4_VOIDED_RUNS_2026-08-29.md',
  'papers/paper4/reproducibility/README.md',
  'papers/paper4/reproducibility/SANDBOX_REPORT_PAPER4_REPRODUCIBILITY_CLOSURE_2026-08-29.md'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/[ \t]+$/gm, '');
    fs.writeFileSync(f, content);
  }
});
