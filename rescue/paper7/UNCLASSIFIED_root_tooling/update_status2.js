const fs = require('fs');
const file = 'papers/paper4/PAPER_STATUS.md';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\| 7 \| Hostile Referee \| \*\*UNSATISFIED\*\* \| Proof\/Computational referees have not completed a hostile audit\. \|/, '| 7 | Hostile Referee | **PASS** | papers/paper4/audit/PAPER4_GATE_7_HOSTILE_REFEREE_REPORT.md |');
fs.writeFileSync(file, content);
