const { buildContainer, tarjanSCC } = require('../../src/sft-container.js');
const fs = require('fs');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;

const raw_states = Math.pow(3, 13);
const valid_states = states.length;
let full_edges = 0;
for(let i=0; i<adj.length; i++) full_edges += adj[i].length;

const alive = new Int32Array(valid_states).fill(1);
const scc = tarjanSCC([...Array(valid_states).keys()], adj, alive);

const sizes = new Int32Array(scc.ncomp);
for (let i = 0; i < valid_states; i++) {
  if (scc.comp[i] !== -1) {
    sizes[scc.comp[i]]++;
  }
}

const number_of_sccs = scc.ncomp;
const maxSccSize = Math.max(...sizes);
const dominant_scc_count = Array.from(sizes).filter(s => s === maxSccSize).length;
const essential_states = maxSccSize;
const lost_states = valid_states - essential_states;
const lost_fraction = lost_states / valid_states;

const dominantSccId = Array.from(sizes).indexOf(maxSccSize);
let essential_edges = 0;
for(let i=0; i<valid_states; i++) {
  if (scc.comp[i] === dominantSccId) {
    for(let out of adj[i]) {
      if (scc.comp[out] === dominantSccId) {
        essential_edges++;
      }
    }
  }
}

const out = {
  raw_states,
  valid_states,
  full_edges,
  number_of_sccs,
  dominant_scc_count,
  essential_states,
  lost_states,
  lost_fraction,
  essential_edges
};
fs.writeFileSync('scratch/h7-family-2026-08-24/GRAPH_COUNTS.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
