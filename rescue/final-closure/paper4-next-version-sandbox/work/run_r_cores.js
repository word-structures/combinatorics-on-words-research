'use strict';
const fs=require('fs'),G=require('./gate.js'),R=require('./rng.js');
const TB=require('./target_buckets.js'),UC=require('./unsat_core.js');
const jl=p=>fs.readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
const Rs=[];{const r2=R.mk(7788);
  const gen=()=>{const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
    const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
    function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
      const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(r2()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
      for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
        if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}return false;}
    return rec(0)?Array.from(w).map(v=>"abc"[v]).join(""):null;};
  while(Rs.length<60){const E=gen();if(!E||POOLE.has(E))continue;Rs.push(E);}}
const posR=jl('../runs/afexBIG_R/af_positive.jsonl');
const survR=jl('../runs/bcdBIG_R/pairs.jsonl').filter(x=>x.AFE_EXISTS);
const out=[];
for(const s of survR){
  const E=Rs[s.eIndex]; const p=posR.find(x=>G.sha(x.A).slice(0,16)===s.A_sha);
  const comp=TB.compileBuckets(p.A,E);
  const t0=Date.now();
  const full=UC.solve(comp,null,50000000);
  const core=UC.minimalCore(comp,5000000);
  const cls=core.unsat?UC.classify(core.core,comp):null;
  const active=[...comp.T.keys()].filter(k=>comp.T.get(k).faf.size||comp.T.get(k).afe.size);
  const both=active.filter(k=>comp.T.get(k).faf.size&&comp.T.get(k).afe.size).length;
  const rec={E_sha:s.E_sha,A_sha:s.A_sha,sat:full.sat,deathDepth:full.deathDepth,
    activeSignatures:active.length,bothConstrain:both,
    coreSize:core.size||null,prefixLen:core.prefixLen||null,totalSigs:core.totalSigs||null,
    classification:cls,core:core.core||null,secs:+((Date.now()-t0)/1000).toFixed(1)};
  out.push(rec);
  console.log(JSON.stringify({E:rec.E_sha,A:rec.A_sha,sat:rec.sat,deathDepth:rec.deathDepth,
    activeSignatures:rec.activeSignatures,bothConstrain:rec.bothConstrain,
    coreSize:rec.coreSize,classification:cls,secs:rec.secs},null,1));
}
fs.writeFileSync('../runs/R_unsat_cores.json',JSON.stringify(out,null,1));
console.log('persisted -> runs/R_unsat_cores.json');
