const fs = require('fs');
const { buildContainer, tarjanSCC } = require('../../../src/sft-container.js');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;

const alive = new Int32Array(states.length).fill(1);
const scc = tarjanSCC([...Array(states.length).keys()], adj, alive);
const sizes = new Int32Array(scc.ncomp);
for(let i=0; i<states.length; i++) if (scc.comp[i] !== -1) sizes[scc.comp[i]]++;
const dominantSccId = Array.from(sizes).indexOf(Math.max(...sizes));

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

if (rootIdx === -1) throw new Error("Root state is not valid!");
if (scc.comp[rootIdx] !== dominantSccId) throw new Error("Root not in essential SCC!");

const walks = ["ccaaabaaacaaabb", "cccaaabaaacaaabb"];
const res = [];

let verifiedAll = true;

for (let walk of walks) {
  const w = toTernary(walk);
  let cur = rootIdx;
  let validTransitions = true;
  for (let letter of w) {
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
  res.push({
    walk_str: walk,
    length: walk.length,
    valid_transitions: validTransitions,
    returns_to_root: (cur === rootIdx),
    closed
  });
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const g = gcd(walks[0].length, walks[1].length);

const out = {
  root_word: rootStr,
  walks: res,
  period_conclusion: g === 1 && verifiedAll ? 1 : -1,
  gcd: g
};

fs.writeFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/PERIOD_CERTIFICATE.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
