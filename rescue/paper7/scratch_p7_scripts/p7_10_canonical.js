const { extensionDepth, factorsOfLength } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;
const CAP = 40;

function canonical(w) {
    function perm(s) {
        let map = {};
        let next = 0;
        let res = '';
        for (let c of s) {
            if (map[c] === undefined) map[c] = alphabet[next++];
            res += map[c];
        }
        return res;
    }
    let w1 = perm(w);
    let w2 = perm(w.split('').reverse().join(''));
    return w1 < w2 ? w1 : w2;
}

function analyzeCandidates(N) {
    const factors = factorsOfLength(N, alphabet, minK);
    let rows = [];
    for (const u of factors) {
        const L = extensionDepth(u, 'left', alphabet, minK, CAP);
        const R = extensionDepth(u, 'right', alphabet, minK, CAP);
        if ((L < CAP && R === CAP) || (R < CAP && L === CAP)) {
            rows.push({ u, L, R, can: canonical(u) });
        }
    }
    
    let grouped = {};
    for (let r of rows) {
        if (!grouped[r.can]) grouped[r.can] = [];
        grouped[r.can].push(r);
    }
    
    console.log(`\nLength ${N} canonical asymmetric candidates:`);
    for (let k in grouped) {
        let rep = grouped[k][0];
        console.log(`  Canonical: ${k} (count: ${grouped[k].length}), rep: ${rep.u}, L=${rep.L}, R=${rep.R}`);
    }
}

analyzeCandidates(8);
// analyzeCandidates(9); // takes longer, maybe skip if 8 gives us good candidates
