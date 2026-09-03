'use strict';
/* §4 — order-independent 3-bit survival signature (C_AFE, C_EAF, C_FEA) at K<=40,
   evaluated on every known complete-AF (A,F) pair crossed with H and R E-words.
   §6 — regression: the short-gate pipeline must recover every known K<=40-clean triple. */
const fs=require('fs');const G=require('./gate.js'),R=require('./rng.js');
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
const build=(v,b)=>[...v].map(c=>b[c]).join("");
const clean=(s,k)=>!G.hasSquareUpTo(s,k);
function bits(E,A,F){return {
  AFE:clean(build("afe",{a:A,e:E,f:F}),40),
  EAF:clean(build("eaf",{a:A,e:E,f:F}),40),
  FEA:clean(build("fea",{a:A,e:E,f:F}),40)};}
/* known complete-AF pairs */
const canon=JSON.parse(fs.readFileSync('../fixtures/af_complete_pass.json','utf8'));
const fresh=JSON.parse(fs.readFileSync('../runs/fresh_v2_af_FINAL.json','utf8'));
const AFpairs=canon.map(x=>({A:x.A,F:x.F,src:"canonical"}))
  .concat(fresh.map(x=>({A:x.A,F:x.F,src:"fresh"})));
/* E populations */
const Hs=pools.E.slice();
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
const Rs=[];{const rnd=R.mk(7788);
  const gen=()=>{const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
    const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
    function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
      const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
      for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
        if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}return false;}
    return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;};
  while(Rs.length<60){const E=gen();if(!E||POOLE.has(E))continue;Rs.push(E);}}

function table(Es,label){
  const sig={},cum={AFE:0,EAF:0,FEA:0};let n=0,all=0;
  for(const E of Es)for(const {A,F} of AFpairs){
    const b=bits(E,A,F);n++;
    const k=(b.AFE?1:0)+""+(b.EAF?1:0)+""+(b.FEA?1:0);
    sig[k]=(sig[k]||0)+1;
    if(b.AFE)cum.AFE++; if(b.EAF)cum.EAF++; if(b.FEA)cum.FEA++;
    if(b.AFE&&b.EAF&&b.FEA)all++;
  }
  console.log(`\n${label}: ${Es.length} E x ${AFpairs.length} complete-AF pairs = ${n} triples`);
  console.log("  3-bit signature (AFE,EAF,FEA) -> count:");
  for(const k of Object.keys(sig).sort())console.log("     ("+k.split("").join(",")+") : "+sig[k]);
  console.log("  marginal pass rates: AFE "+(cum.AFE/n*100).toFixed(2)+"%   EAF "+(cum.EAF/n*100).toFixed(2)+
              "%   FEA "+(cum.FEA/n*100).toFixed(2)+"%");
  console.log("  all three clean (K<=40 AEF triple): "+all+"  ("+(all/n*100).toFixed(3)+"%)");
  return {n,all,cum,sig};
}
const h=table(Hs,"POPULATION H (9 historical E)");
const r=table(Rs,"POPULATION R (60 random E)");
console.log("\n=== marginal separation H - R (percentage points) ===");
for(const k of ["AFE","EAF","FEA"])
  console.log("  "+k+": "+((h.cum[k]/h.n-r.cum[k]/r.n)*100).toFixed(2)+" pp");

/* §6 regression */
console.log("\n=== §6 KNOWN-POSITIVE REGRESSION ===");
const known=fs.readFileSync('../runs/canon39.jsonl','utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse)
  .concat(fs.readFileSync('../runs/newpop_combined.jsonl','utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse));
const seen=new Set();let recovered=0,lost=0;const lostList=[];
for(const t of known){
  const id=G.aefId(t.A,t.E,t.F); if(seen.has(id))continue; seen.add(id);
  const b=bits(t.E,t.A,t.F);
  const afOK=G.checkAF(t.A,t.F).pass;
  if(b.AFE&&b.EAF&&b.FEA&&afOK)recovered++;
  else{lost++;lostList.push({id:id.slice(0,12),...b,afOK});}
}
console.log("distinct known K<=40-clean triples:",seen.size);
console.log("recovered by short-gate pipeline (complete-AF + AFE + EAF + FEA):",recovered," lost:",lost);
if(lost)console.log("LOST:",JSON.stringify(lostList.slice(0,5),null,1));
console.log(lost===0?"PASS - no known positive lost":"FAIL");
