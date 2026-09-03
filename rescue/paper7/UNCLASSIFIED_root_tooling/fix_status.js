const fs = require('fs');
const file = 'papers/paper4/PAPER_STATUS.md';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/6328876BB37C618CEB6479EE244D0A4E1075F436805F7E8FFB4A59D57991C4D0/, '71B185E10E2014AD3B88C1789695EEA1A5434089121D0EE221269AB16B85995E');
fs.writeFileSync(file, content);
