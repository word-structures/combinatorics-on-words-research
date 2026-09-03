const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;
const maxD = 18;

function exploreTree(seed, side) {
    let frontier = [seed];
    let maxCorridor = 0;
    let currentCorridor = 0;
    
    console.log(`\nSeed: ${seed}, Side: ${side}`);
    let extinct = false;
    
    for (let d = 1; d <= maxD; d++) {
        let nextF = [];
        let branchCounts = {0:0, 1:0, 2:0, 3:0, 4:0};
        
        for (let w of frontier) {
            let children = 0;
            for (let c of alphabet) {
                let cand = (side === 'right') ? w + c : c + w;
                if (inLanguage(cand, 4, minK, alphabet)) {
                    nextF.push(cand);
                    children++;
                }
            }
            branchCounts[children]++;
        }
        
        if (nextF.length === 0) {
            console.log(`  Extinct at depth ${d}`);
            extinct = true;
            break;
        }
        
        if (branchCounts[1] === frontier.length) {
            currentCorridor++;
            if (currentCorridor > maxCorridor) maxCorridor = currentCorridor;
        } else {
            currentCorridor = 0;
        }
        
        if (d === maxD || d === 10) {
            console.log(`  Depth ${d}: ${nextF.length} states. Branching: ` + 
                Object.entries(branchCounts).filter(x => x[1]>0).map(x => `${x[0]}:${x[1]}`).join(', '));
        }
        
        if (d === maxD) {
            let sfxs = new Set();
            for (let w of nextF) {
                sfxs.add((side === 'right') ? w.slice(-5) : w.slice(0, 5));
            }
            console.log(`  Suffix-compression at ${maxD} (len 5): ${sfxs.size} distinct`);
        }
        
        frontier = nextF;
    }
    
    if (!extinct) {
        console.log(`  Max forced corridor length: ${maxCorridor}`);
    }
}

let wK = 'abcdacbabdabacdacbcdad';
let w8 = 'abcabdcb'; 
let w9 = 'abacabadc';

exploreTree(w8, 'left');
exploreTree(w8, 'right');
exploreTree(w9, 'left');
exploreTree(w9, 'right');
exploreTree(wK, 'left');
exploreTree(wK, 'right');
