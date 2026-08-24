
/**
 * Standalone Independent Verifier for Route-C L=6 Closure Residue
 *
 * This verifier reconstructs 348 certified residue codings and rigorously verifies
 * that each stated K>=6 Abelian square explicitly exists within g(h6^omega(a)).
 *
 * It fails CLOSED on any mismatch.
 */
const fs = require('fs');
const crypto = require('crypto');

// 1. Load certificates
let certsLines = fs.readFileSync(__dirname + '/residue_certificates.jsonl', 'utf8').trim().split('\n');
if (certsLines.length !== 348) throw new Error('FAIL: Expected 348 certificates, got ' + certsLines.length);

let certs = certsLines.map(line => JSON.parse(line));
let codings = [];

// h6 definition
const H6 = { a:'ace', b:'adf', c:'bdf', d:'bdc', e:'afe', f:'bce' };
let h6_seed = 'a';
for (let i = 0; i < 6; i++) {
  h6_seed = h6_seed.split('').map(c => H6[c]).join('');
}

for (let cert of certs) {
  let g = cert.coding;
  codings.push(g);

  if (g.length !== 36) throw new Error('FAIL: wrong coding length ' + g);

  // Explicitly check alphabet block order
  let dict = cert.images;
  let re_g = dict.a + dict.b + dict.c + dict.d + dict.e + dict.f;
  if (re_g !== g) throw new Error('FAIL: wrong block order serialization in ' + g);

  // Reconstruct prefix
  let w = '';
  // Generate enough prefix to comfortably exceed maximum death end position (<= 34)
  for (let i = 0; i < 20; i++) {
    w += dict[h6_seed[i]];
  }

  // Validate witness bounds
  if (cert.witness_end > 34) throw new Error('FAIL: witness end > 34: ' + cert.witness_end);
  if (cert.k < 6 || cert.k > 10) throw new Error('FAIL: K out of bounds [6, 10]: ' + cert.k);

  let u = w.substring(cert.witness_start, cert.witness_start + cert.k);
  let v = w.substring(cert.witness_start + cert.k, cert.witness_end);

  if (u !== cert.first_half) throw new Error('FAIL: first half mismatch at start ' + cert.witness_start);
  if (v !== cert.second_half) throw new Error('FAIL: second half mismatch');

  // Recompute Parikh
  let uc = [0,0,0], vc = [0,0,0];
  for (let i = 0; i < cert.k; i++) {
    uc[u.charCodeAt(i) - 97]++;
    vc[v.charCodeAt(i) - 97]++;
  }

  if (uc[0] !== vc[0] || uc[1] !== vc[1] || uc[2] !== vc[2]) {
    throw new Error('FAIL: Parikh vectors unequal in stated halves: ' + uc + ' vs ' + vc);
  }
  if (uc[0] !== cert.parikh[0] || uc[1] !== cert.parikh[1] || uc[2] !== cert.parikh[2]) {
    throw new Error('FAIL: Certificate Parikh vector does not match recomputed vector');
  }
}

// 7. Check Hash
codings.sort();
let hashContent = codings.join('\n') + '\n';
let hash = crypto.createHash('sha256').update(hashContent).digest('hex');
const EXPECTED_HASH = '15c89ab72a8d8a2ebc782884e308b195454188d30da2dd87c554889a7189e18f';

if (hash !== EXPECTED_HASH) {
  throw new Error('FAIL: wrong hash ' + hash);
}

// Ensure uniqueness
let uniqueSet = new Set(codings);
if (uniqueSet.size !== 348) throw new Error('FAIL: Duplicate codings detected');

console.log('SUCCESS: All 348 explicit string-level K>=6 certificates independently verified.');
