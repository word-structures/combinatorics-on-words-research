const { extensionDepth } = require('../src/unfavourable-factors.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

for (let cap of [100, 150, 200, 300, 500]) {
    const start = Date.now();
    const rDepth = extensionDepth(wK, 'right', alphabet, minK, cap);
    const elapsed = Date.now() - start;
    console.log(`Cap ${cap}: Right depth = ${rDepth} (${elapsed}ms)`);
}
