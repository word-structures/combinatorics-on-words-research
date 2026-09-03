const fs = require('fs');

const log = fs.readFileSync('LR_tracker.txt', 'utf8').split('\n');

let max_rt = 0;
let level_44_states = [];

for (let i = 0; i < log.length; i++) {
    if (log[i].includes('| L |')) {
        let parts = log[i].split('|');
        let rt = parseInt(parts[2].trim());
        if (rt > max_rt) max_rt = rt;
        
        let depth = parseInt(parts[0].trim());
        if (depth === 44 && log[i+1].includes('Left states:')) {
            let states_str = log[i+1].substring(log[i+1].indexOf('Left states:') + 12).trim();
            level_44_states = states_str.split(' ').map(x => x.split(':')[0]).filter(x => x);
        }
    }
}

console.log("Max |R_t|:", max_rt);
console.log("Depth 44 unique left contexts:", level_44_states.length);
console.log(level_44_states.join('\n'));
