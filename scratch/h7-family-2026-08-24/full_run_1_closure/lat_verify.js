const fs = require('fs');
const { buildContainer, tarjanSCC } = require('../../../src/sft-container.js');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;

function toTernary(str) {
  return str.split('').map(c => c === 'a' ? 0 : c === 'b' ? 1 : 2);
}

function wordToCode(w) {
  let code = 0;
  let p = 1;
  for(let i=w.length-1; i>=0; i--) {
    code += w[i] * p;
    p *= 3;
  }
  return code;
}

const rootStr = "aaabaaacaaabb";
const rootW = toTernary(rootStr);
const rootCode = wordToCode(rootW);
const rootIdx = states.indexOf(rootCode);

const walks = ["cbacccaaabaaacaaabb", "bcabccaaabaaacaaabb", "baacccaaabaaacaaabb"];
const res = [];
let verifiedAll = true;

const parikhs = [];

for (let walk of walks) {
  const w = toTernary(walk);
  let cur = rootIdx;
  let validTransitions = true;
  let p = [0,0,0];
  for (let letter of w) {
    p[letter]++;
    let nextState = -1;
    for (let target of adj[cur]) {
      if (states[target] % 3 === letter) {
        nextState = target;
        break;
      }
    }
    if (nextState === -1) {
      validTransitions = false;
      break;
    }
    cur = nextState;
  }
  const closed = validTransitions && (cur === rootIdx);
  if (!closed) verifiedAll = false;
  parikhs.push(p);
  res.push({
    walk_str: walk,
    valid_transitions: validTransitions,
    returns_to_root: (cur === rootIdx),
    closed: closed,
    parikh: p
  });
}

// Construct projected differences
// Projected: we use b and c components (indices 1 and 2)
// Since sum is L=19 for all, only 2 differences are independent.
// Let's use diff 1 = p0 - p2, diff 2 = p1 - p2
const diff1 = [parikhs[0][1] - parikhs[2][1], parikhs[0][2] - parikhs[2][2]];
const diff2 = [parikhs[1][1] - parikhs[2][1], parikhs[1][2] - parikhs[2][2]];

const matrix = [diff1, diff2];
const det = diff1[0] * diff2[1] - diff1[1] * diff2[0];

const out = {
  root_word: rootStr,
  length: 19,
  walks: res,
  projected_differences: matrix,
  matrix: matrix,
  signed_determinant: det,
  absolute_determinant: Math.abs(det)
};

fs.writeFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/LATTICE_CERTIFICATE.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
