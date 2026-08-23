const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

console.log('--- L=6 ROUTE-C CLOSURE VERIFICATION ---');

// 1. EXACT POPULATION REPRODUCTION
const H6 = { a:'ace', b:'adf', c:'bdf', d:'bdc', e:'afe', f:'bce' };
let w = 'a';
for (let i=0; i<6; i++) w = w.split('').map(c => H6[c]).join('');
let F3_set = new Set();
for (let i=0; i<w.length-2; i++) F3_set.add(w.substring(i, i+3));
const f3_arr = Array.from(F3_set);
const f2_arr = Array.from(new Set(f3_arr.map(x => x.substring(0, 2)).concat(f3_arr.map(x => x.substring(1, 3)))));

if (f2_arr.length !== 14 || f3_arr.length !== 22) {
  throw new Error('FAIL: |F2| or |F3| size mismatch');
}

let domains = [];
for(let i=0; i<729; i++) {
  let s = ''; let tmp = i;
  for(let j=0; j<6; j++) { s += String.fromCharCode(97 + (tmp % 3)); tmp = Math.floor(tmp / 3); }
  domains.push(s);
}

function hasSq(s) {
  const n = s.length;
  for (let k=2; k<=5 && 2*k<=n; k++) {
    for (let i=0; i<=n - 2*k; i++) {
      let u_a=0, u_b=0, u_c=0, v_a=0, v_b=0, v_c=0;
      for (let j=0; j<k; j++) {
        let c1 = s[i+j];
        if (c1==='a') u_a++; else if(c1==='b') u_b++; else u_c++;
        let c2 = s[i+k+j];
        if (c2==='a') v_a++; else if(c2==='b') v_b++; else v_c++;
      }
      if (u_a===v_a && u_b===v_b && u_c===v_c) return true;
    }
  }
  return false;
}
domains = domains.filter(d => !hasSq(d));

const vars = ['a', 'b', 'c', 'd', 'e', 'f']; // STRICT ALPHABETICAL ORDER
let varIdx = {a:0, b:1, c:2, d:3, e:4, f:5};

let adj2 = [];
for (let i=0; i<6; i++) {
  adj2[i] = [];
  for (let f2 of f2_arr) {
     let maxIdx = Math.max(varIdx[f2[0]], varIdx[f2[1]]);
     if (maxIdx === i) adj2[i].push({f2: f2});
  }
}
let adj3 = [];
for (let i=0; i<6; i++) {
  adj3[i] = [];
  for (let f3 of f3_arr) {
     let maxIdx = Math.max(varIdx[f3[0]], varIdx[f3[1]], varIdx[f3[2]]);
     if (maxIdx === i) adj3[i].push({f3: f3});
  }
}

let sq2 = new Uint8Array(360 * 360);
for (let i=0; i<360; i++) {
  for (let j=0; j<360; j++) {
     sq2[i * 360 + j] = hasSq(domains[i] + domains[j]) ? 1 : 0;
  }
}

let sq3 = new Uint8Array(360 * 360 * 360);
for (let i=0; i<360; i++) {
  for (let j=0; j<360; j++) {
     if (sq2[i * 360 + j]) continue;
     for (let k=0; k<360; k++) {
       sq3[i * 129600 + j * 360 + k] = hasSq(domains[i] + domains[j] + domains[k]) ? 1 : 0;
     }
  }
}

let mappingIdx = {};
let solutions = 0;
let canonicalSet = new Set();
let allSols = [];

function getCanonical(str) {
  let map = {}, next = 97, res = '';
  for(let i=0; i<str.length; i++) {
    if (!map[str[i]]) map[str[i]] = String.fromCharCode(next++);
    res += map[str[i]];
  }
  return res;
}

function search(idx) {
  if (idx === 6) {
    solutions++;
    let full = '';
    for (let c of vars) full += domains[mappingIdx[c]]; // ALPHABETICAL
    canonicalSet.add(getCanonical(full));
    allSols.push(full);
    return;
  }
  let v = vars[idx];
  for (let d = 0; d < 360; d++) {
    mappingIdx[v] = d;
    let ok = true;
    for (let j = 0; j < adj2[idx].length; j++) {
       let f2 = adj2[idx][j].f2;
       let d1 = mappingIdx[f2[0]], d2 = mappingIdx[f2[1]];
       if (sq2[d1 * 360 + d2]) { ok = false; break; }
    }
    if (!ok) continue;
    for (let j = 0; j < adj3[idx].length; j++) {
       let f3 = adj3[idx][j].f3;
       let d1 = mappingIdx[f3[0]], d2 = mappingIdx[f3[1]], d3 = mappingIdx[f3[2]];
       if (sq3[d1 * 129600 + d2 * 360 + d3]) { ok = false; break; }
    }
    if (!ok) continue;
    search(idx + 1);
  }
}

process.stdout.write('Regenerating population...');
search(0);
console.log(' done');
if (solutions !== 1200636) throw new Error('FAIL: concrete population ' + solutions);
console.log('population .......... 1,200,636 PASS');
if (canonicalSet.size !== 200106) throw new Error('FAIL: canonical population ' + canonicalSet.size);
console.log('canonical ...........   200,106 PASS');

// 2. STAGE-A PARTITION
let m1_pairs = Array.from(f2_arr);
let diffs = [];
for (let m=2; m<=100; m++) {
  let seen = new Set();
  for (let i=0; i<w.length - 2*m; i++) {
     let w1 = w.substring(i, i+m);
     let w2 = w.substring(i+m, i+2*m);
     let c1 = [0,0,0,0,0,0], c2 = [0,0,0,0,0,0];
     for(let j=0; j<m; j++) {
       c1[w1.charCodeAt(j)-97]++;
       c2[w2.charCodeAt(j)-97]++;
     }
     let d = c1.map((v, idx) => v - c2[idx]);
     let d_str = d.join(',');
     if (!seen.has(d_str)) {
       seen.add(d_str);
       diffs.push({m, d});
     }
  }
}

let m1_killed = 0;
let stageA_killed = 0;
let residue = [];

for (let g of allSols) {
  let Mg = [];
  for (let i=0; i<6; i++) {
    let block = g.substring(i*6, i*6+6);
    let a=0,b=0,c=0;
    for (let char of block) {
      if (char==='a') a++; else if (char==='b') b++; else c++;
    }
    Mg.push([a,b,c]);
  }

  let m1_dead = false;
  for (let xy of m1_pairs) {
    let x = xy.charCodeAt(0)-97;
    let y = xy.charCodeAt(1)-97;
    if (Mg[x][0]===Mg[y][0] && Mg[x][1]===Mg[y][1] && Mg[x][2]===Mg[y][2]) {
       m1_dead = true;
       break;
    }
  }
  if (m1_dead) m1_killed++;

  let stageA_dead = false;
  if (!m1_dead) {
    for (let diff of diffs) {
      let r0 = 0, r1 = 0, r2 = 0;
      for (let i=0; i<6; i++) {
        r0 += Mg[i][0] * diff.d[i];
        r1 += Mg[i][1] * diff.d[i];
        r2 += Mg[i][2] * diff.d[i];
      }
      if (r0 === 0 && r1 === 0 && r2 === 0) {
        stageA_dead = true;
        break;
      }
    }
  }

  if (m1_dead || stageA_dead) {
    stageA_killed++;
  } else {
    residue.push(g);
  }
}

if (m1_killed !== 504672) throw new Error('FAIL: m=1 killed ' + m1_killed);
if (stageA_killed !== 1200288) throw new Error('FAIL: Stage-A killed ' + stageA_killed);
console.log('Stage-A eliminated .. 1,200,288 PASS');

if (residue.length !== 348) throw new Error('FAIL: residue size ' + residue.length);
console.log('residue .............       348 PASS');

// 3. EXACT RESIDUE EQUALITY & HASH
residue.sort();
let hashContent = residue.join('\n') + '\n';
let hash = crypto.createHash('sha256').update(hashContent).digest('hex');
const EXPECTED_HASH = '15c89ab72a8d8a2ebc782884e308b195454188d30da2dd87c554889a7189e18f';
if (hash !== EXPECTED_HASH) throw new Error('FAIL: Hash mismatch');
console.log('residue hash ........ PASS');

// Compare vs JSONL
let certsLines = fs.readFileSync(path.join(__dirname, 'residue_certificates.jsonl'), 'utf8').trim().split('\n');
if (certsLines.length !== 348) throw new Error('FAIL: JSONL length mismatch');
let certCodings = certsLines.map(l => JSON.parse(l).coding).sort();
for (let i=0; i<348; i++) {
  if (residue[i] !== certCodings[i]) throw new Error('FAIL: Residue equality mismatch at index ' + i);
}

// 4. CERTIFICATE VERIFICATION
for (let i=0; i<348; i++) {
  let cert = JSON.parse(certsLines[i]);
  let g = cert.coding;
  let dict = cert.images;
  let re_g = dict.a + dict.b + dict.c + dict.d + dict.e + dict.f;
  if (re_g !== g) throw new Error('FAIL: Certificate coding mismatch');

  let p = '';
  for (let j=0; j<20; j++) p += dict[w[j]];

  let u = p.substring(cert.witness_start, cert.witness_start + cert.k);
  let v = p.substring(cert.witness_start + cert.k, cert.witness_end);

  if (u !== cert.first_half || v !== cert.second_half) throw new Error('FAIL: Witness substring mismatch');

  let uc = [0,0,0], vc = [0,0,0];
  for (let j=0; j<cert.k; j++) {
    uc[u.charCodeAt(j) - 97]++;
    vc[v.charCodeAt(j) - 97]++;
  }
  if (uc[0]!==vc[0] || uc[1]!==vc[1] || uc[2]!==vc[2]) throw new Error('FAIL: Parikh violation in certificate');
}

console.log('explicit deaths ..... 348/348 PASS');
console.log('combined survivors .. 0 PASS');
console.log('ROUTE_C_L6_CLOSURE_CERTIFICATE_PASS');
