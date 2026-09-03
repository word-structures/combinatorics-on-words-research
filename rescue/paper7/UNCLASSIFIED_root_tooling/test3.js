const fs = require('fs');

const proportional = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/proportional_relations.json', 'utf8'));

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
    if (r.depLabel.includes('None') || r.pivLabel.includes('None')) continue;
    
    // c * pivRow + depCoeff * depRow = 0
    let num = -r.pivCoeff;
    let den = r.depCoeff;
    let g = gcd(num, den);
    num /= g;
    den /= g;
    let sign = (den < 0) ? -1 : 1;
    num *= sign;
    den *= sign;

    shift_cases.push({
        dep: r.depLabel,
        piv: r.pivLabel,
        ratio: `${num}/${den}`
    });
}

console.log("Full depth (4 profiles) proportional relations:", shift_cases.length);

// Let's print out the first 10
for(let i=0; i<10; i++) {
    console.log(shift_cases[i]);
}

let ratio_counts = {};
for(let c of shift_cases) {
    ratio_counts[c.ratio] = (ratio_counts[c.ratio] || 0) + 1;
}
console.log("Ratio distribution:", ratio_counts);
