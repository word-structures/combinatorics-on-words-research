'use strict';
/* §7 — matched H-side controls: same probes as the R near-miss pairs. */
const fs=require('fs'),G=require('./gate.js');
const TB=require('./target_buckets.js'),UC=require('./unsat_core.js');
const jl=p=>fs.readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
function isMid(t){const c=t.map(x=>x[1]);return (t.length===1&&c[0]===2)||(t.length===2&&c[0]===1&&c[1]===1);}
function filt(comp,kf,ka){const T=new Map();
  for(const [s,v] of comp.T){const f=kf?v.faf:new Set(),a=ka?v.afe:new Set();if(f.size||a.size)T.set(s,{faf:f,afe:a});}
  return {T:T,termsOf:comp.termsOf,deadFAF:kf&&comp.deadFAF,deadAFE:ka&&comp.deadAFE};}
const CAP=30000000;
const posH=jl('../runs/afexBIG_H/af_positive.jsonl');
const pairs=jl('../runs/bcdBIG_H/pairs.jsonl');
const POS=pairs.filter(x=>x.AF_AND_AFE_EXISTS).slice(0,4);
const NEG=pairs.filter(x=>!x.AF_AND_AFE_EXISTS&&x.AFE_EXISTS).slice(0,4);
const out=[];
for(const [label,list] of [["H_POSITIVE",POS],["H_AFEonly_NEGATIVE",NEG]]){
  for(const s of list){
    const E=pools.E[s.eIndex]; const p=posH.find(x=>G.sha(x.A).slice(0,16)===s.A_sha);
    if(!p){console.log("  (A not found for "+s.A_sha+")");continue;}
    const comp=TB.compileBuckets(p.A,E);
    const active=[...comp.T.keys()].filter(k=>comp.T.get(k).faf.size||comp.T.get(k).afe.size);
    const both=active.filter(k=>comp.T.get(k).faf.size&&comp.T.get(k).afe.size).length;
    const mids=active.filter(k=>isMid(comp.termsOf.get(k)));
    const noMid=new Set(active.filter(k=>!isMid(comp.termsOf.get(k))));
    const full=UC.solve(comp,null,CAP);
    const dropMid=UC.solve(comp,noMid,CAP);
    const fafOnly=UC.solve(filt(comp,true,false),null,CAP);
    const afeOnly=UC.solve(filt(comp,false,true),null,CAP);
    const rec={label:label,E_sha:s.E_sha,A_sha:s.A_sha,
      activeSignatures:active.length,bothConstrainSameForm:both,midpointSignatures:mids.length,
      full:{sat:full.sat,deathDepth:full.deathDepth,nodes:full.nodes,capped:full.capped},
      withoutMidpoints:{sat:dropMid.sat,deathDepth:dropMid.deathDepth},
      FAFonly:{sat:fafOnly.sat,deathDepth:fafOnly.deathDepth},
      AFEonly:{sat:afeOnly.sat,deathDepth:afeOnly.deathDepth}};
    out.push(rec);
    console.log(label+" E="+rec.E_sha+" A="+rec.A_sha+
      " | full sat="+full.sat+" death="+full.deathDepth+
      " | noMid sat="+dropMid.sat+" death="+dropMid.deathDepth+
      " | FAFonly="+fafOnly.sat+" AFEonly="+afeOnly.sat+
      " | sigs="+active.length+" both="+both+" mid="+mids.length);
  }
}
fs.writeFileSync('../runs/H_control_probes.json',JSON.stringify(out,null,1));
console.log('persisted -> runs/H_control_probes.json');
