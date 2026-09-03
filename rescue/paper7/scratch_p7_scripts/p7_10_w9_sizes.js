const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

function getRightSize(w, maxD) {
    let frontier = [w];
    for (let d = 1; d <= maxD; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let c of alphabet) {
                if (inLanguage(s+c, 4, minK, alphabet)) nextF.push(s+c);
            }
        }
        frontier = nextF;
        if (frontier.length === 0) return 0;
    }
    return frontier.length;
}

const w9s = [
  'abacabadc', 'abacabdac', 'abacadbac', 'abacbadac', 'abacbadca', 'abacbdabd',
  'abacbdaca', 'abacdabac', 'abacdabad', 'abacdabca', 'abacdbabd', 'abcabdcba',
  'abcadabad', 'abcadacad'
];

for (let w of w9s) {
    let size = getRightSize(w, 15);
    console.log(`${w}: size at d=15 is ${size}`);
}
