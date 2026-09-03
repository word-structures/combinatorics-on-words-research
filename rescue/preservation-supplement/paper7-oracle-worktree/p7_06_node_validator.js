const fs = require('fs');

const p1 = "adbcacbcdabacadbdacdcbcdcacdbdadbcacbcdabacadacabcdac"; // 53 chars
const p2 = "adcbacbcdabacadbdacdcbcdcacdbdadbcacbcdabacadacabcdac";

function parikh(s) {
    let p = { a: 0, b: 0, c: 0, d: 0 };
    for (let char of s) p[char]++;
    return p;
}

function D(s, K) {
    let p2K = parikh(s.substring(0, 2*K - 1));
    let pK = parikh(s.substring(0, K - 1));
    let diff = {
        a: p2K.a - 2 * pK.a,
        b: p2K.b - 2 * pK.b,
        c: p2K.c - 2 * pK.c,
        d: p2K.d - 2 * pK.d
    };
    return diff;
}

function formatD(d) {
    if (d.a === 1 && d.b === 0 && d.c === 0 && d.d === 0) return 'e_a';
    if (d.a === 0 && d.b === 1 && d.c === 0 && d.d === 0) return 'e_b';
    if (d.a === 0 && d.b === 0 && d.c === 1 && d.d === 0) return 'e_c';
    if (d.a === 0 && d.b === 0 && d.c === 0 && d.d === 1) return 'e_d';
    return JSON.stringify(d);
}

console.log("Validating p1:");
for (let K of [1, 5, 7, 11, 27]) {
    console.log(`D_${K} = ${formatD(D(p1, K))}`);
}

function printWitnesses(p_name, s) {
    console.log(`\nWitnesses for ${p_name}:`);
    for (let K of [1, 5, 7, 11, 27]) {
        let pK = parikh(s.substring(0, K - 1));
        let c_killed = D(s, K);
        let char_killed = Object.keys(c_killed).find(k => c_killed[k] === 1);
        pK[char_killed]++;
        console.log(`  c=${char_killed} killed by K=${K}, profile P=(${pK.a},${pK.b},${pK.c},${pK.d})`);
    }
}
printWitnesses('p1', p1);
printWitnesses('p2', p2);
