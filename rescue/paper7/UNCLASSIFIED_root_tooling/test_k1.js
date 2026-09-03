const { buildContainer } = require('./src/sft-container.js');

function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) {
    w[i] = code % 3;
    code = Math.floor(code / 3);
  }
  return w;
}

const c = buildContainer(3); // m=5, avoids K=2.
let hasK1 = false;
for(let code of c.states) {
  const w = codeToWord(code, 5);
  for(let i=0; i<4; i++) if (w[i] === w[i+1]) { hasK1 = true; break; }
}
console.log('has K=1?', hasK1);
