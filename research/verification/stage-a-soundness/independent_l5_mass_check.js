#!/usr/bin/env node
'use strict';
// INDEPENDENT re-derivation of the L=5 Stage-A coding mass.
// Deliberately does NOT reuse the original script's logic:
//  - domainSize is derived from the multinomial coefficient 5!/(na! nb! nc!)
//    instead of brute-force enumerating all 3^5 assignments;
//  - profileId ordering is re-derived and cross-checked;
//  - profileIndex is independently checked as a base-21 mixed-radix encoding.
// Audit-only. Reads, never writes, the evidence.

const fs = require('fs');
const readline = require('readline');

const input = process.argv[2];

function fact(n) { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; }

// Independent derivation: profile (na,nb) -> multinomial count over L=5 slots.
// Original script counted these by enumerating 3^5 assignments.
const L = 5;
const domainSize = Array(21).fill(0);
const idOf = new Map();
{
  // Re-derive the same triangular index the original used: na*6 - na*(na-1)/2 + nb
  for (let na = 0; na <= L; na++) {
    for (let nb = 0; nb + na <= L; nb++) {
      const nc = L - na - nb;
      const id = na * 6 - (na * (na - 1)) / 2 + nb;
      const cnt = Number(fact(L) / (fact(na) * fact(nb) * fact(nc)));
      domainSize[id] = cnt;
      idOf.set(`${na},${nb}`, id);
    }
  }
}

const sum = domainSize.reduce((a, b) => a + b, 0);
console.log('independent domainSize:', JSON.stringify(domainSize));
console.log('sum (must be 3^5=243):', sum, sum === 243 ? 'OK' : 'MISMATCH');

let count = 0n;
let mass = 0n;
let badVector = 0;
let badIndex = 0;
let minD = null, maxD = 0n;

const rl = readline.createInterface({
  input: fs.createReadStream(input, { encoding: 'utf8' }),
  crlfDelay: Infinity
});

rl.on('line', line => {
  if (!line) return;
  const rec = JSON.parse(line);
  const v = rec.vectors;
  if (!Array.isArray(v) || v.length !== 6) { badVector++; return; }

  let D = 1n;
  let idx = 0n;
  for (const x of v) {
    if (!Number.isInteger(x) || x < 0 || x >= 21) { badVector++; return; }
    D *= BigInt(domainSize[x]);
    idx = idx * 21n + BigInt(x);   // independent mixed-radix check
  }
  if (BigInt(rec.profileIndex) !== idx) badIndex++;

  count++;
  mass += D;
  if (minD === null || D < minD) minD = D;
  if (D > maxD) maxD = D;
});

rl.on('close', () => {
  console.log('--- INDEPENDENT RESULT ---');
  console.log('profiles           =', count.toString());
  console.log('coding mass        =', mass.toString());
  console.log('minD               =', minD === null ? 'n/a' : minD.toString());
  console.log('maxD               =', maxD.toString());
  console.log('malformed vectors  =', badVector);
  console.log('profileIndex mismatches (base-21 mixed radix) =', badIndex);
  console.log('--- COMPARISON ---');
  console.log('profiles === 5153928        :', count === 5153928n);
  console.log('mass === 3316540933500      :', mass === 3316540933500n);
});
