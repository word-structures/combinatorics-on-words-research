
const { mapWindow } = require('./scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/dynamic_topology_mapper.js');
let input = "";
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
    let cases = JSON.parse(input);
    let results = cases.map(c => mapWindow(c));
    console.log(JSON.stringify(results));
});
    