const fs = require('fs');
let code = fs.readFileSync('generate_run3_baseline.js', 'utf8');
code = code.replace(
    'if (!has_out && has_cycle) recurrent_sccs.push(scc);',
    'if (has_cycle) recurrent_sccs.push(scc);'
);
fs.writeFileSync('generate_run3_baseline.js', code);
