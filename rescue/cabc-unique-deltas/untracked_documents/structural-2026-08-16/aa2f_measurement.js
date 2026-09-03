const fs = require('fs');
const crypto = require('crypto');

function B_blocks(P, n, K, y) {
    let target = [0,0,0];
    target[y] = -1;
    for(let c=0; c<3; c++) {
        let val = P[n+1-2*K][c] - 2*P[n+1-K][c] + P[n][c];
        if (val !== target[c]) return false;
    }
    return true;
}

function directSuffixScanner(w, y) {
    const s = w + y;
    const n = s.length;
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        let p1 = [0,0,0];
        let p2 = [0,0,0];
        for(let i=0; i<K; i++) {
            p1[s.charCodeAt(n - 2*K + i) - 97]++;
            p2[s.charCodeAt(n - K + i) - 97]++;
        }
        if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) {
            return K;
        }
    }
    return -1;
}

function checkAa2f(w) {
    for (let n=1; n<=w.length; n++) {
        for (let K=1; K<=Math.floor(n/2); K++) {
            let p1=[0,0,0], p2=[0,0,0];
            for(let i=0; i<K; i++) {
                p1[w.charCodeAt(n - 2*K + i) - 97]++;
                p2[w.charCodeAt(n - K + i) - 97]++;
            }
            if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) return false;
        }
    }
    return true;
}

const files = [
    'record_word_100.txt',
    'record_word_200.txt',
    'record_word_1000.txt',
    'record_word_2000.txt',
    'record_word_2500_pure.txt',
    'record_word_5000_pure.txt'
];

for (const file of files) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        continue;
    }
    let w = fs.readFileSync(file, 'utf8').trim();
    const hash = crypto.createHash('sha256').update(w).digest('hex');
    
    console.log(`\n==========================================`);
    console.log(`File: ${file}`);
    console.log(`Length: ${w.length}`);
    console.log(`SHA256: ${hash}`);
    
    let isAa2f = checkAa2f(w);
    console.log(`Valid aa2f: ${isAa2f}`);
    if (!isAa2f) continue;
    
    // compute Parikh
    let P = [[0,0,0]];
    let cur = [0,0,0];
    for(let i=0; i<w.length; i++) {
        cur = [...cur];
        cur[w.charCodeAt(i)-97]++;
        P.push(cur);
    }
    
    let forcedStates = []; // array of { n, mu }
    let max_mu_overall = 0;
    
    for (let n=1; n<=w.length; n++) {
        let blocked = [];
        let kappas = {};
        for (let y=0; y<3; y++) {
            let min_K = -1;
            for (let K=1; K<=Math.floor((n+1)/2); K++) {
                let isSqB = false;
                if (K >= 2) {
                    isSqB = B_blocks(P, n, K, y);
                } else if (K === 1) { 
                    isSqB = (w.charCodeAt(n-1)-97 === y);
                }
                if (isSqB) {
                    min_K = K;
                    break;
                }
            }
            if (min_K !== -1) {
                blocked.push(y);
                kappas[y] = min_K;
            }
        }
        
        if (blocked.length === 2) { // exactly two blocked
            let mu = Math.max(kappas[blocked[0]], kappas[blocked[1]]);
            forcedStates.push({ n, mu });
            if (mu > max_mu_overall) max_mu_overall = mu;
        }
    }
    
    console.log(`Total forced states: ${forcedStates.length}`);
    console.log(`word\tlength\th\t|F_h|\t#{mu >= h}\tD_h\t|W|/h\tmax_mu\tlongest_run`);
    
    let max_h = Math.floor((w.length + 1) / 2);
    for (let h=1; h<=max_h; h++) {
        let F_h = forcedStates.filter(s => s.n >= 2*h - 1);
        if (F_h.length < 30) continue; // reporting threshold
        
        let count_mu = 0;
        let max_mu_h = 0;
        let current_run = 0;
        let longest_run = 0;
        
        for (let s of F_h) {
            if (s.mu >= h) {
                count_mu++;
                current_run++;
                if (current_run > longest_run) longest_run = current_run;
            } else {
                current_run = 0;
            }
            if (s.mu > max_mu_h) max_mu_h = s.mu;
        }
        
        let D_h = (count_mu / F_h.length).toFixed(4);
        let W_h = (w.length / h).toFixed(2);
        
        // choose some sampled h to print (to not overwhelm output if max_h is 2500)
        // print powers of 2 and every 50
        if (h <= 10 || h % 10 === 0 || h === max_h) {
            console.log(`${file}\t${w.length}\t${h}\t${F_h.length}\t${count_mu}\t${D_h}\t${W_h}\t${max_mu_h}\t${longest_run}`);
        }
    }
}
