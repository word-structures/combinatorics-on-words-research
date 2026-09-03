const fs = require('fs');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
const rows = JSON.parse(fs.readFileSync(dir + '/PROFILE_BASELINE_RUN3C_RECOVERED.json', 'utf8'));

let sign_cert = {
    MOST_BALANCED_TOTAL: 0,
    MOST_BALANCED_POSITIVE: 0,
    MOST_BALANCED_ZERO: 0,
    MOST_BALANCED_NEGATIVE: 0,
    OTHER_TOTAL: 0,
    OTHER_POSITIVE: 0,
    OTHER_ZERO: 0,
    OTHER_NEGATIVE: 0
};

for(let h=2; h<=7; h++) {
    let h_rows = rows.filter(r => r.h === h);
    if (h_rows.length === 0) continue;
    let min_B = 1e9;
    for(let r of h_rows) {
        let p = r.profile.split(',').map(Number);
        let b = 0;
        for(let x of p) b += (x - h/3)*(x - h/3);
        r.b_val = b;
        if (b < min_B - 1e-9) min_B = b;
    }
    for(let r of h_rows) {
        let isMB = Math.abs(r.b_val - min_B) < 1e-9;
        let sign = Math.sign(r.delta_A);
        if (isMB) {
            sign_cert.MOST_BALANCED_TOTAL++;
            if (sign>0) sign_cert.MOST_BALANCED_POSITIVE++;
            else if (sign<0) sign_cert.MOST_BALANCED_NEGATIVE++;
            else sign_cert.MOST_BALANCED_ZERO++;
        } else {
            sign_cert.OTHER_TOTAL++;
            if (sign>0) sign_cert.OTHER_POSITIVE++;
            else if (sign<0) sign_cert.OTHER_NEGATIVE++;
            else sign_cert.OTHER_ZERO++;
        }
    }
}
fs.writeFileSync(dir + '/PROFILE_SIGN_FINAL_CERTIFICATE.json', JSON.stringify(sign_cert, null, 2));
console.log("Generated SIGN");
