'use strict';
/* Descriptive control: same instrumented scan applied to the quota-matched H
   AF-positive pairs, so the RX death-depth distribution is interpretable.
   NOT a preregistered hypothesis test. */
const fs=require('fs'),G=require('./gate.js'),P=require('./persist.js');
const TB=require('./target_buckets.js');
const L=TB.L,PF=TB.PROFILE.f,CAP=3e7;
const jl=p=>fs.readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const posH=jl('../runs/afexBIG_H/af_positive.jsonl');
const Amap=new Map(posH.map(p=>[G.sha(p.A).slice(0,16),p.A]));
const hM=JSON.parse(fs.readFileSync('../runs/h_matched_quota.json','utf8'));
function solve(comp){
  const byMax=new Map();
  for(const [sig,s] of comp.T){ if(!s.faf.size&&!s.afe.size)continue;
    const t=comp.termsOf.get(sig),m=Math.max(...t.map(z=>z[0]));
    if(!byMax.has(m))byMax.set(m,[]); byMax.get(m).push({sig,terms:t,faf:s.faf,afe:s.afe}); }
  const x=[[0,0,0]],need=PF.slice(),w=new Uint8Array(L);
  let nodes=0,capped=false,found=null,deepest=0,ext=0;
  (function rec(d){ if(found||capped)return; if(++nodes>CAP){capped=true;return;}
    if(d>deepest)deepest=d; if(d===L){found=1;return;}
    let ok=false,killed=0;
    for(let c=0;c<3;c++){ if(!need[c])continue;
      const nx=x[d].slice();nx[c]++;x[d+1]=nx;
      let hit=false; const bs=byMax.get(d+1);
      if(bs)for(const b of bs){ let v=[0,0,0];
        for(const [dd,cc] of b.terms){const xv=x[dd];v=[v[0]+cc*xv[0],v[1]+cc*xv[1],v[2]+cc*xv[2]];}
        const k=v.join(','); if(b.faf.has(k)||b.afe.has(k)){hit=true;break;} }
      if(hit)killed++; else {ok=true;w[d]=c;need[c]--;rec(d+1);need[c]++;}
      if(found||capped)return; }
    if(!ok&&killed)ext++;
  })(0);
  return {sat:found!==null,nodes,capped,deathDepth:found?null:deepest,extinctionNodes:ext};
}
const rows=[];
for(const r of hM.perE) for(const h of r.hits){
  const A=Amap.get(h.A_sha),E=pools.E[r.eIndex];
  if(!A||!E){console.log('FAIL-CLOSED missing');process.exit(2);}
  const res=solve(TB.compileBuckets(A,E));
  rows.push({eIndex:r.eIndex,rank:h.rank,A_sha:h.A_sha,both:h.both,AFE:h.AFE,...res});
}
P.writeAtomic('../runs/h_reach_scan.json',{cap:CAP,rows});
const dd={},ddNeg={};let sat=0;
for(const r of rows){ if(r.sat){sat++;continue;} dd[r.deathDepth]=(dd[r.deathDepth]||0)+1;
  if(!r.both)ddNeg[r.deathDepth]=(ddNeg[r.deathDepth]||0)+1; }
console.log('H quota AF-positive pairs scanned:',rows.length);
console.log('  combined-gate SAT (F exists passing FAF+AFE buckets):',sat);
console.log('  death-depth histogram (unsat):',JSON.stringify(dd));
console.log('  capped:',rows.filter(r=>r.capped).length);
console.log('  agreement sat vs AF_AND_AFE_EXISTS:',rows.filter(r=>r.sat===!!r.both).length+'/'+rows.length);
