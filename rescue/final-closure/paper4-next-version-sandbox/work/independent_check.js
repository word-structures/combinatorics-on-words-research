'use strict';
/* INDEPENDENT CHECKER -- deliberately does NOT require gate.js.
 * Differences from the search predicate:
 *   - covers are re-derived here from the h6 factor language (not taken as constants)
 *   - abelian-square test counts letters directly in each half (no prefix sums)
 *   - profiles re-derived from the rank-one lift M' = M_g3 + 10*ones (not hardcoded)
 * Usage: node independent_check.js <hitsFile> <mode: AF|AEF>
 */
const fs=require('fs');

// --- profiles re-derived from the lift, not copied -----------------------
const Mg3={a:[5,4,1],b:[1,2,7],c:[0,4,6],d:[2,0,8],e:[3,6,1],f:[9,1,0]};
const PROF={}; for(const k in Mg3) PROF[k]=Mg3[k].map(v=>v+10);

// --- covers re-derived from the factor language --------------------------
const H6={a:"ace",b:"adf",c:"bdf",d:"bdc",e:"afe",f:"bce"};
function prefix(iters){let w="a";for(let i=0;i<iters;i++){let n="";for(const c of w)n+=H6[c];w=n;}return w;}
function coverFor(symbols,maxN=25){
  const w=prefix(12),S=new Set(symbols.split("")),all=[];let R=0;
  for(let n=1;n<=maxN;n++){
    const s=new Set();
    for(let i=0;i+n<=w.length;i++){const f=w.substr(i,n);
      let ok=true;for(const ch of f)if(!S.has(ch)){ok=false;break;}
      if(ok)s.add(f);}
    if(s.size){R=n;all.push(...s);}
  }
  if(R>=maxN)throw new Error("cover bound not closed");
  return all.filter(x=>!all.some(z=>z!==x&&z.includes(x))).sort();
}
// --- abelian square test by direct counting (definition-level) -----------
function isAbSquare(s,i,k){
  const c1=[0,0,0],c2=[0,0,0];
  for(let t=0;t<k;t++){c1[s.charCodeAt(i+t)-97]++;c2[s.charCodeAt(i+k+t)-97]++;}
  return c1[0]===c2[0]&&c1[1]===c2[1]&&c1[2]===c2[2];
}
function violations(s,kmax){const out=[];
  for(let k=2;k<=kmax&&2*k<=s.length;k++)for(let i=0;i+2*k<=s.length;i++)
    if(isAbSquare(s,i,k))out.push([k,i]);
  return out;}
function profOK(w,role){const p=[0,0,0];for(const ch of w)p[ch.charCodeAt(0)-97]++;
  return w.length===40&&p[0]===PROF[role][0]&&p[1]===PROF[role][1]&&p[2]===PROF[role][2];}

const file=process.argv[2],mode=process.argv[3];
const cover=mode==="AF"?coverFor("af"):coverFor("aef");
console.log("independently re-derived "+mode+" cover:",JSON.stringify(cover));
console.log("independently re-derived profiles: A="+PROF.a+" E="+PROF.e+" F="+PROF.f);

let n=0,pass=0,fail=0,profBad=0;const failures=[];
for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
  if(!line.trim())continue; const r=JSON.parse(line); n++;
  const blocks={a:r.A,e:r.E,f:r.F};
  let ok=profOK(r.A,'a')&&profOK(r.F,'f')&&(mode==="AF"||profOK(r.E,'e'));
  if(!ok){profBad++;failures.push({id:r.id,why:"profile"});fail++;continue;}
  let v=[];
  for(const cw of cover){
    let s="";for(const ch of cw)s+=blocks[ch];
    v.push(...violations(s,Math.floor(s.length/2)).map(x=>({cover:cw,k:x[0],i:x[1]})));
  }
  if(v.length===0)pass++;else{fail++;failures.push({id:r.id,why:"abelian square",first:v[0],count:v.length});}
}
console.log(JSON.stringify({file,mode,records:n,independentlyConfirmed:pass,rejected:fail,badProfile:profBad,
  failures:failures.slice(0,5)},null,1));
process.exit(fail===0?0:2);
