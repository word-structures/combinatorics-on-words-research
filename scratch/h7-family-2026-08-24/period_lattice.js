const { buildContainer, tarjanSCC } = require('../../src/sft-container.js');
const fs = require('fs');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;
const valid_states = states.length;

const alive = new Int32Array(valid_states).fill(1);
const scc = tarjanSCC([...Array(valid_states).keys()], adj, alive);
const sizes = new Int32Array(scc.ncomp);
for (let i = 0; i < valid_states; i++) if (scc.comp[i] !== -1) sizes[scc.comp[i]]++;
const maxSccSize = Math.max(...sizes);
const dominantSccId = Array.from(sizes).indexOf(maxSccSize);

let root = -1;
for (let i = 0; i < valid_states; i++) {
  if (scc.comp[i] === dominantSccId) {
    root = i; break;
  }
}

console.log('Root:', root);

const cyclesByLength = {};
let foundCoprime = false;
let foundDet = false;
let periodCert = [];
let detCert = null;

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

const queue = [{ state: root, path: [], freqs: [0,0,0] }];
let head = 0;
while (head < queue.length) {
  const cur = queue[head++];
  if (cur.path.length > 0 && cur.state === root) {
    const L = cur.path.length;
    if (!cyclesByLength[L]) cyclesByLength[L] = [];
    cyclesByLength[L].push(cur);
    
    // Check coprime
    if (!foundCoprime) {
      const lengths = Object.keys(cyclesByLength).map(Number);
      for(let i=0; i<lengths.length; i++) {
        for(let j=i+1; j<lengths.length; j++) {
          if (gcd(lengths[i], lengths[j]) === 1) {
            foundCoprime = true;
            periodCert = [lengths[i], lengths[j]];
            console.log('Found coprime lengths:', periodCert);
          }
        }
      }
    }
    
    // Check determinant
    if (!foundDet) {
      const sameLen = cyclesByLength[L];
      for(let i=0; i<sameLen.length; i++) {
        for(let j=i+1; j<sameLen.length; j++) {
          const v1 = sameLen[i].freqs;
          const v2 = sameLen[j].freqs;
          // projected differences: b and c
          const db = v1[1] - v2[1];
          const dc = v1[2] - v2[2];
          // We need ANOTHER pair of cycles to form a 2x2 matrix
          // Actually, we can take the difference between any pair of cycles of the SAME length!
          // So let's collect all difference vectors for this length
          const diffs = [];
          for(let m=0; m<sameLen.length; m++) {
            for(let n=m+1; n<sameLen.length; n++) {
              diffs.push({
                db: sameLen[m].freqs[1] - sameLen[n].freqs[1],
                dc: sameLen[m].freqs[2] - sameLen[n].freqs[2],
                w1: sameLen[m].path,
                w2: sameLen[n].path
              });
            }
          }
          
          for(let m=0; m<diffs.length; m++) {
            for(let n=m+1; n<diffs.length; n++) {
              const det = diffs[m].db * diffs[n].dc - diffs[m].dc * diffs[n].db;
              if (Math.abs(det) === 1) {
                foundDet = true;
                detCert = {
                  L: L,
                  det: det,
                  pair1: [diffs[m].w1, diffs[m].w2],
                  pair2: [diffs[n].w1, diffs[n].w2]
                };
                console.log('Found det 1 at length', L);
                break;
              }
            }
            if(foundDet) break;
          }
        }
        if(foundDet) break;
      }
    }
    
    if (foundCoprime && foundDet) {
      break;
    }
  }
  
  if (cur.path.length < 25) {
    const out = adj[cur.state];
    for (let target of out) {
      if (scc.comp[target] !== dominantSccId) continue;
      const letter = states[target] % 3;
      const nf = [...cur.freqs];
      nf[letter]++;
      queue.push({ state: target, path: [...cur.path, letter], freqs: nf });
    }
  }
}

const out = {
  root,
  periodCert,
  detCert
};
fs.writeFileSync('scratch/h7-family-2026-08-24/PERIOD_LATTICE_CERTIFICATE.json', JSON.stringify(out, null, 2));
