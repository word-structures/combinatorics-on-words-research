const fs = require('fs');

const proportional = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/proportional_relations.json', 'utf8'));

// Helper to parse '(a, b, c), (d, e, f), ...' into arrays of arrays
function parseProfiles(str) {
    let parts = str.split('), (');
    parts[0] = parts[0].replace('(', '');
    parts[parts.length-1] = parts[parts.length-1].replace(')', '');
    return parts.map(p => p.split(', ').map(Number));
}

// Helper to compute gcd
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

let shift_cases = [];

for (let r of proportional) {
    let depP = parseProfiles(r.depLabel);
    let pivP = parseProfiles(r.pivLabel);
    
    // c * pivRow + depCoeff * depRow = 0 (from the script, the term is depCoeff*G[dep] + pivCoeff*G[piv] == 0)
    // So depRow = (-pivCoeff / depCoeff) * pivRow
    let num = -r.pivCoeff;
    let den = r.depCoeff;
    let g = gcd(num, den);
    num /= g;
    den /= g;
    let sign = (den < 0) ? -1 : 1;
    num *= sign;
    den *= sign;

    // Check if one is a shifted version of the other or has a specific difference
    let diffs = [];
    for(let i=0; i<4; i++) {
        let d = [];
        for(let j=0; j<3; j++) {
            d.push(depP[i][j] - pivP[i][j]);
        }
        diffs.push(d);
    }
    
    // We want to see how P1, P2, P3, P4 are related
    shift_cases.push({
        dep: depP,
        piv: pivP,
        ratio: `${num}/${den}`,
        diffs: diffs
    });
}

// Let's print out the first 20 and group them by ratio or diffs
console.log("Analyzing 20 proportional relations...");
for(let i=0; i<20; i++) {
    let c = shift_cases[i];
    console.log(`Relation ${i}: ratio = ${c.ratio}`);
    console.log(`  Dep: ${JSON.stringify(c.dep)}`);
    console.log(`  Piv: ${JSON.stringify(c.piv)}`);
    console.log(`  Diff: ${JSON.stringify(c.diffs)}`);
    console.log("---");
}

let ratio_counts = {};
for(let c of shift_cases) {
    ratio_counts[c.ratio] = (ratio_counts[c.ratio] || 0) + 1;
}
console.log("Ratio distribution:", ratio_counts);

