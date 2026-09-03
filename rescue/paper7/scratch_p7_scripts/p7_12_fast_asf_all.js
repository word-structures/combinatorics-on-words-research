const { G85 } = require('../src/morphisms.js');

let X1 = G85['a'];
let X2 = ''; for (let c of X1) X2 += G85[c];
let X3 = ''; for (let c of X2) X3 += G85[c];

function testCand(B) {
    let cand = B + X3.slice(0, 10000);
    let N = cand.length;

    let parikh = { a: new Int32Array(N+1), b: new Int32Array(N+1), c: new Int32Array(N+1), d: new Int32Array(N+1) };
    for (let i = 0; i < N; i++) {
        parikh.a[i+1] = parikh.a[i] + (cand[i] === 'a' ? 1 : 0);
        parikh.b[i+1] = parikh.b[i] + (cand[i] === 'b' ? 1 : 0);
        parikh.c[i+1] = parikh.c[i] + (cand[i] === 'c' ? 1 : 0);
        parikh.d[i+1] = parikh.d[i] + (cand[i] === 'd' ? 1 : 0);
    }

    let isASF = true;
    for (let len = 1; len <= Math.floor(N / 2); len++) {
        for (let i = 0; i <= N - 2 * len; i++) {
            let mid = i + len;
            let end = i + 2 * len;
            if (parikh.a[mid] - parikh.a[i] === parikh.a[end] - parikh.a[mid] &&
                parikh.b[mid] - parikh.b[i] === parikh.b[end] - parikh.b[mid] &&
                parikh.c[mid] - parikh.c[i] === parikh.c[end] - parikh.c[mid] &&
                parikh.d[mid] - parikh.d[i] === parikh.d[end] - parikh.d[mid]) {
                isASF = false;
                break;
            }
        }
        if (!isASF) break;
    }
    console.log(`${B}+X is ASF up to length 10000: ${isASF}`);
}

testCand('ad');
testCand('adb');
testCand('bad');
testCand('bdb');
testCand('cad');
testCand('cbd');
testCand('dbd');
