const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
let data = JSON.parse(fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.json'), 'utf8'));

let mb_total = 0;
let mb_pos_a = 0;
let mb_pos_b = 0;
let oth_total = 0;
let oth_neg_a = 0;
let oth_neg_b = 0;

let sign_agree = true;

for (let row of data) {
    let signA = row.delta_A > 0 ? 1 : (row.delta_A < 0 ? -1 : 0);
    let signB = row.delta_B > 0 ? 1 : (row.delta_B < 0 ? -1 : 0);
    if (signA !== signB) sign_agree = false;
    
    if (row.is_most_balanced) {
        mb_total++;
        if (row.delta_A > 0) mb_pos_a++;
        if (row.delta_B > 0) mb_pos_b++;
    } else {
        oth_total++;
        if (row.delta_A < 0) oth_neg_a++;
        if (row.delta_B < 0) oth_neg_b++;
    }
}

let OUT = {
    MOST_BALANCED_TOTAL: mb_total,
    MOST_BALANCED_POSITIVE_A: mb_pos_a,
    MOST_BALANCED_POSITIVE_B: mb_pos_b,
    OTHER_TOTAL: oth_total,
    OTHER_NEGATIVE_A: oth_neg_a,
    OTHER_NEGATIVE_B: oth_neg_b,
    SIGN_AGREEMENT: sign_agree,
    STATUS: sign_agree ? 'PASS' : 'FAIL'
};

fs.writeFileSync(path.join(dir, 'PROFILE_SIGN_CERTIFICATE.json'), JSON.stringify(OUT, null, 2));

console.log("MOST_BALANCED_TOTAL =", mb_total);
console.log("MOST_BALANCED_POSITIVE_A =", mb_pos_a);
console.log("MOST_BALANCED_POSITIVE_B =", mb_pos_b);
console.log("OTHER_TOTAL =", oth_total);
console.log("OTHER_NEGATIVE_A =", oth_neg_a);
console.log("OTHER_NEGATIVE_B =", oth_neg_b);
console.log("SIGN_STATUS =", OUT.STATUS);
