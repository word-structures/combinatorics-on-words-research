'use strict';
/* CROSS-PAPER TEST: does Paper-3 Theorem 4.1 (shift-one rigidity) hold verbatim
   for Paper-4 AFE windows?
   Paper 3 (fixed half-length h, word w):
      window at s : P(s+h)-P(s) = P(s+2h)-P(s+h)
      window at s+1 likewise; subtracting gives
      e_{w[s]} - 2 e_{w[s+h]} + e_{w[s+2h]} = 0  =>  w[s]=w[s+h]=w[s+2h].
   Paper 4 uses the SAME second-difference form with half-period K on H(v).
   So the identical derivation should force w[s]=w[s+K]=w[s+2K] whenever two
   Abelian squares of the SAME K start at adjacent positions s and s+1. */
const G = require('./gate.js');
function mul(a) { return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rnd = mul(90210);
function rw(p) { const b = []; for (let c = 0; c < 3; c++) for (let i = 0; i < p[c]; i++) b.push("abc"[c]); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b.join(""); }
function pre(s) { const a = [[0, 0, 0]]; for (let i = 0; i < s.length; i++) { const p = a[i].slice(); p[s.charCodeAt(i) - 97]++; a.push(p); } return a; }
function isSq(P, s, K) { const a = P[s], b = P[s + K], c = P[s + 2 * K];
  return b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1] && b[2] - a[2] === c[2] - b[2]; }

let adjacentPairs = 0, rigidityHolds = 0, rigidityFails = 0;
const fails = [];
for (let trial = 0; trial < 300; trial++) {
  const A = rw(G.PROFILE.a), E = rw(G.PROFILE.e), F = rw(G.PROFILE.f);
  const H = A + F + E, P = pre(H), n = H.length;
  for (let K = 2; K <= 40; K++) {
    for (let s = 0; s + 2 * K + 1 <= n; s++) {
      if (isSq(P, s, K) && isSq(P, s + 1, K)) {
        adjacentPairs++;
        const ok = (H[s] === H[s + K] && H[s + K] === H[s + 2 * K]);
        if (ok) rigidityHolds++; else { rigidityFails++; if (fails.length < 3) fails.push({ K: K, s: s, letters: [H[s], H[s + K], H[s + 2 * K]] }); }
      }
    }
  }
}
console.log("Paper-3 shift-one rigidity applied to Paper-4 AFE windows (300 random A,E,F):");
console.log("  adjacent same-K square pairs found : " + adjacentPairs);
console.log("  rigidity w[s]=w[s+K]=w[s+2K] holds : " + rigidityHolds);
console.log("  rigidity FAILS                     : " + rigidityFails);
if (fails.length) console.log("  failures: " + JSON.stringify(fails));
console.log(rigidityFails === 0
  ? "  => Paper-3 Theorem 4.1's derivation transfers verbatim to Paper-4 windows."
  : "  => does NOT transfer.");

/* Does Paper 4's compiled constraint system already use this?  Check whether the
   AFE binary constraints encode adjacent-s pairs at equal K. */
const C = require('./afe_csp.js');
let sameK = 0, diffK = 0;
const seen = new Set();
for (const w of C.WIN) seen.add(w.s + "|" + w.K);
// count how many (s,K) have (s+1,K) also a window -> the rigidity rule would couple them
let couplable = 0;
for (const w of C.WIN) if (seen.has((w.s + 1) + "|" + w.K)) couplable++;
console.log("\nAFE windows whose (s+1,K) neighbour is also a window: " + couplable + " of " + C.WIN.length);
console.log("  (these are the pairs on which the rigidity rule could propagate)");
