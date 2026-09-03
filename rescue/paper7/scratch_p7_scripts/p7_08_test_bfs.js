const { inLanguage } = require('../src/unfavourable-factors.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

let frontier = [wK];
console.log('d | r_d');

for (let step = 1; step <= 60; step++) {
    let next_frontier = [];
    for (let w of frontier) {
        for (let c of alphabet) {
            let next_w = w + c;
            if (inLanguage(next_w, 4, minK, alphabet)) {
                next_frontier.push(next_w);
            }
        }
    }
    console.log(`${step} | ${next_frontier.length}`);
    frontier = next_frontier;
    if (frontier.length === 0) break;
}
