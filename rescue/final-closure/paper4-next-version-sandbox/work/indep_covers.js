'use strict';
/* INDEPENDENT verification of Paper-4 subset-factor covers.
 * Method deliberately different from verify_paper4_subset_covers.py:
 *   - no hardcoded bigram set (F2 is DERIVED)
 *   - no ceil((n+2)/3) recursion; factors extracted by direct scan of a prefix
 *   - primitivity checked explicitly
 *   - prefix sufficiency demonstrated by saturation across two prefix lengths
 * Written from the definition. Exploratory independent check.
 */
const H6 = { a:"ace", b:"adf", c:"bdf", d:"bdc", e:"afe", f:"bce" };
const L = ["a","b","c","d","e","f"];

// ---- 1. primitivity of the macro morphism -------------------------------
const idx = Object.fromEntries(L.map((x,i)=>[x,i]));
let A = L.map(()=>L.map(()=>0));
for (const x of L) for (const ch of H6[x]) A[idx[ch]][idx[x]]++;   // A[i][j] = #i in h6(j)
function matmul(P,Q){const R=P.map(()=>Q[0].map(()=>0));
  for(let i=0;i<6;i++)for(let k=0;k<6;k++){if(!P[i][k])continue;for(let j=0;j<6;j++)R[i][j]+=P[i][k]*Q[k][j];}return R;}
let Pw = A.map(r=>r.slice()), primAt = 0;
for (let p=1;p<=20;p++){ if(Pw.every(r=>r.every(v=>v>0))){primAt=p;break;} Pw=matmul(Pw,A); }
console.log("macro morphism primitive: " + (primAt>0) + (primAt?` (A^${primAt} > 0)`:""));

// ---- 2. generate prefixes, derive factors by direct scan -----------------
function gen(iters){ let w="a"; for(let i=0;i<iters;i++){ let n=""; for(const c of w) n+=H6[c]; w=n; } return w; }
function factorsUpTo(w, maxN){
  const F=[]; for(let n=0;n<=maxN;n++)F.push(new Set());
  for(let n=1;n<=maxN;n++) for(let i=0;i+n<=w.length;i++) F[n].add(w.substr(i,n));
  return F;
}
const MAXN = 25;
const wShort = gen(9), wLong = gen(12);
const Fs = factorsUpTo(wShort, MAXN), Fl = factorsUpTo(wLong, MAXN);
let saturated = true;
for(let n=1;n<=MAXN;n++) if(Fs[n].size!==Fl[n].size) saturated=false;
console.log(`prefix lengths ${wShort.length} vs ${wLong.length}; factor counts saturate to n=${MAXN}: ${saturated}`);
console.log("derived complexity p(1..8) = [" + [1,2,3,4,5,6,7,8].map(n=>Fl[n].size).join(",") + "]");
console.log("derived F2 (14 expected) = " + [...Fl[2]].sort().join(","));

// ---- 3. subset covers, derived independently ----------------------------
function analyze(name, S){
  const set = new Set(S.split(""));
  const only = [];                       // S-only factors by length
  let R = 0;
  for(let n=1;n<=MAXN;n++){
    const v = [...Fl[n]].filter(w=>[...w].every(ch=>set.has(ch))).sort();
    only[n]=v; if(v.length) R=n;
  }
  if (R >= MAXN) throw new Error(name+": bound not closed within MAXN");
  // fail closed: nothing at R+1, and (factoriality) hence nothing beyond
  if (only[R+1].length !== 0) throw new Error(name+": nonempty at R+1");
  const all = []; for(let n=1;n<=R;n++) all.push(...only[n]);
  const cover = all.filter(w=>!all.some(z=>z!==w && z.includes(w)))
                   .sort((x,y)=>x.length-y.length || (x<y?-1:1));
  // every S-only factor must sit inside a cover word
  for(const w of all) if(!cover.some(c=>c.includes(w))) throw new Error(name+": uncovered "+w);
  // every cover word must be a genuine factor of the fixed point
  for(const c of cover) if(!wLong.includes(c)) throw new Error(name+": cover word not a factor "+c);
  return {name, R, cover, perWordK: cover.map(c=>Math.floor(c.length*40/2)),
          maxK: Math.max(...cover.map(c=>Math.floor(c.length*40/2))), noneAt: R+1};
}
const out = [analyze("AF","af"), analyze("AEF","aef"), analyze("NO_C_ABDEF","abdef")];
console.log("");
for(const r of out)
  console.log(`${r.name.padEnd(12)} R=${String(r.R).padStart(2)}  cover=[${r.cover.join(", ")}]  perWordKmax=[${r.perWordK.join(", ")}]  maxK=${r.maxK}  none at length ${r.noneAt}`);

// ---- 4. subsumption: does the AEF cover subsume the AF cover? ------------
const af = out[0].cover, aef = out[1].cover;
console.log("\nAEF cover subsumes AF cover: " +
  af.every(x=>aef.some(y=>y.includes(x))) + "  (" + af.map(x=>x+" in "+(aef.find(y=>y.includes(x))||"NONE")).join("; ") + ")");
