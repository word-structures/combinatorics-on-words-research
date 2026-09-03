const { extensionDepth, inLanguage } = require('../src/unfavourable-factors.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

console.log('inLanguage:', inLanguage(wK, 4, minK, alphabet));

for (let cap of [10, 20, 30, 40, 50, 60, 70, 80]) {
    const rDepth = extensionDepth(wK, 'right', alphabet, minK, cap);
    const lDepth = extensionDepth(wK, 'left', alphabet, minK, cap);
    console.log(`Cap ${cap}: Left depth = ${lDepth}, Right depth = ${rDepth}`);
}
