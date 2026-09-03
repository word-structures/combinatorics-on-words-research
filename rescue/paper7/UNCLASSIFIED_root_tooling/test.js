const fs = require('fs');
const labels = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/checkpoint_v2.6/P6_Q2_RECENCY_PROFILE_ONEBIT_LABELS_v0.1_2026-08-30.json', 'utf8'));

let no_bit_seen = new Map();
for (let l of labels) {
    // "(((3, 1, 0), (3, 0, 1), (3, 1, 0), (2, 2, 0)), 1)"
    let match = l.match(/\(\((.*?)\), \d\)/);
    if (match) {
        let no_bit = match[1];
        if (!no_bit_seen.has(no_bit)) {
            no_bit_seen.set(no_bit, no_bit_seen.size);
        }
    }
}
console.log("Unique NO_BIT groups:", no_bit_seen.size);

// Read the relations
const relsData = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/checkpoint_v2.6/P6_Q2_PROFILE_ONLY_ROW_RELATIONS_RECONSTRUCTED_v0.1_2026-08-30.json', 'utf8'));
const piv = relsData.pivot_rows;
const dep = relsData.dependent_rows;
const rels = relsData.relations;

let no_bit_array = Array.from(no_bit_seen.keys());

let proportional = [];
for (let j = 0; j < rels.length; j++) {
    let r = rels[j];
    if (r.pivot_positions.length === 1) {
        let depRow = dep[j];
        let pivRow = piv[r.pivot_positions[0]];
        let depCoeff = r.dependent_coefficient;
        let pivCoeff = r.pivot_coefficients[0];
        let depLabel = no_bit_array[depRow];
        let pivLabel = no_bit_array[pivRow];
        proportional.push({depRow, pivRow, depLabel, pivLabel, depCoeff, pivCoeff});
    }
}
console.log("Proportional relations count:", proportional.length);

fs.writeFileSync('scratch/claude-intake/paper6/proportional_relations.json', JSON.stringify(proportional, null, 2));

for(let i=0; i<Math.min(10, proportional.length); i++) {
    console.log(proportional[i]);
}
