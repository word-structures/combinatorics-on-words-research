'use strict';
/* Targeted mechanism probes on the two R near-miss pairs (cheap, decisive).
   Instead of a full minimal UNSAT core, ask which CLASSES of constraint are necessary. */
const fs=require('fs'),G=require('./gate.js'),R=require('./rng.js');
const TB=require('./target_buckets.js'),UC=require('./unsat_core.js');
const jl=p=>fs.readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
function popR(){const out=[];const r2=R.mk(7788);
  const gen=()=>{const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
    const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
    function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
      const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(r2()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
      for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
        if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}return false;}
    return rec(0)?Array.from(w).map(v=>"abc"[v]).join(""):null;};
  while(out.length<60){const E=gen();if(!E||POOLE.has(E))continue;out.push(E);}return out;}
function isMidpoint(terms){const c=terms.map(t=>t[1]);
  return (terms.length===1&&c[0]===2)||(terms.length===2&&c[0]===1&&c[1]===1);}
function subset(comp,pred){const S=new Set();
  for(const [sig,v] of comp.T){if(!(v.faf.size||v.afe.size))continue;if(pred(sig,v,comp.termsOf.get(sig)))S.add(sig);}return S;}
/* variant compile: keep only chosen target kinds */
function filterComp(comp,keepFaf,keepAfe){
  const T=new Map();
  for(const [sig,v] of comp.T){
    const f=keepFaf?v.faf:new Set(), a=keepAfe?v.afe:new Set();
    if(f.size||a.size)T.set(sig,{faf:f,afe:a});}
  return {T:T,termsOf:comp.termsOf,deadFAF:keepFaf&&comp.deadFAF,deadAFE:keepAfe&&comp.deadAFE};
}
const CAP=+(process.argv[2]||30000000);
const Rs=popR();
const posR=jl('../runs/afexBIG_R/af_positive.jsonl');
const survR=jl('../runs/bcdBIG_R/pairs.jsonl').filter(x=>x.AFE_EXISTS);
const out=[];
for(const s of survR){
  const E=Rs[s.eIndex]; const p=posR.find(x=>G.sha(x.A).slice(0,16)===s.A_sha);
  const comp=TB.compileBuckets(p.A,E);
  const active=[...comp.T.keys()].filter(k=>comp.T.get(k).faf.size||comp.T.get(k).afe.size);
  const both=active.filter(k=>comp.T.get(k).faf.size&&comp.T.get(k).afe.size);
  const mids=active.filter(k=>isMidpoint(comp.termsOf.get(k)));
  const noMid=new Set(active.filter(k=>!isMidpoint(comp.termsOf.get(k))));
  const t0=Date.now();
  const full=UC.solve(comp,null,CAP);
  const dropMid=UC.solve(comp,noMid,CAP);
  const fafOnly=UC.solve(filterComp(comp,true,false),null,CAP);
  const afeOnly=UC.solve(filterComp(comp,false,true),null,CAP);
  const rec={E_sha:s.E_sha,A_sha:s.A_sha,
    activeSignatures:active.length,bothConstrainSameForm:both.length,midpointSignatures:mids.length,
    full:{sat:full.sat,deathDepth:full.deathDepth,capped:full.capped,nodes:full.nodes},
    withoutMidpointSignatures:{sat:dropMid.sat,deathDepth:dropMid.deathDepth,capped:dropMid.capped},
    FAFtargetsOnly:{sat:fafOnly.sat,deathDepth:fafOnly.deathDepth,capped:fafOnly.capped},
    AFEtargetsOnly:{sat:afeOnly.sat,deathDepth:afeOnly.deathDepth,capped:afeOnly.capped},
    secs:+((Date.now()-t0)/1000).toFixed(1)};
  out.push(rec);console.log(JSON.stringify(rec,null,1));
}
fs.writeFileSync('../runs/R_mechanism_probes.json',JSON.stringify(out,null,1));
console.log('persisted -> runs/R_mechanism_probes.json');
