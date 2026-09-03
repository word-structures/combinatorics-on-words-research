const { inLanguage } = require('../src/unfavourable-factors.js');
let wK = 'abcdacbabdabacdacbcdad';
let frontier = [wK];
for (let d = 1; d <= 50; d++) {
    let nextF = [];
    for (let w of frontier) {
        for (let c of ['a','b','c','d']) {
            let cand = c + w;
            if (inLanguage(cand, 4, 1, ['a','b','c','d'])) nextF.push(cand);
        }
    }
    console.log(`Depth ${d}: ${nextF.length}`);
    frontier = nextF;
}
