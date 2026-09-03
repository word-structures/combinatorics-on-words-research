'use strict';
/* Memoized form of cleanroom_eafea_projection: window STRUCTURE (q,t,coef,S-sum,roles)
   is independent of E and A, so it is precompiled once.  Logic identical; verified
   against the unoptimized implementation below. */
const CR=require('./cleanroom_eafea_projection.js');
const L=40,V="eafea",PF=CR.PROFILE.f;
const WS=CR.windows();
const STRUCT=WS.map(([s,K])=>{
  const cuts=[[s,1],[s+K,-2],[s+2*K,1]];
  let cs=[0,0,0]; const terms=[]; let fT=null;
  for(const [p,c] of cuts){
    const [q,t]=CR.decomp(p); const Sq=CR.S(q);
    cs=[cs[0]+Sq[0]*c,cs[1]+Sq[1]*c,cs[2]+Sq[2]*c];
    const role=V[q];
    if(role==='f'){fT={coef:c,j:t};} else terms.push({role,t,c});
  }
  return {s,K,cs,terms,fT};
});
function compileFast(pE,pA){
  let unavoid=0; const forb=new Map();
  for(const w of STRUCT){
    let x=w.cs[0],y=w.cs[1],z=w.cs[2];
    for(const t of w.terms){const pv=(t.role==='e'?pE:pA)[t.t];x+=pv[0]*t.c;y+=pv[1]*t.c;z+=pv[2]*t.c;}
    if(!w.fT){ if(x===0&&y===0&&z===0)unavoid++; continue; }
    const c=w.fT.coef,j=w.fT.j;
    const a=-x/c,b=-y/c,d=-z/c;
    if(!Number.isInteger(a)||!Number.isInteger(b)||!Number.isInteger(d))continue;
    if(a<0||b<0||d<0||a>PF[0]||b>PF[1]||d>PF[2])continue;
    if(a+b+d!==j)continue;
    forb.set(j*1000000+a*10000+b*100+d,{j,target:[a,b,d]});
  }
  return {unavoid,forb};
}
function dp(forb){
  const key=(a,b,c)=>a*1000000+b*1000+c;
  const bad=new Set();for(const v of forb.values())bad.add(key(v.target[0],v.target[1],v.target[2]));
  let cur=new Set([key(0,0,0)]);
  if(bad.has(key(0,0,0)))return {ok:false,depthDied:0,widths:[0]};
  const widths=[1];
  for(let d=1;d<=L;d++){
    const nx=new Set();
    for(const st of cur){const a=(st/1000000)|0,b=((st/1000)|0)%1000,c=st%1000;
      if(a<PF[0]){const k=key(a+1,b,c);if(!bad.has(k))nx.add(k);}
      if(b<PF[1]){const k=key(a,b+1,c);if(!bad.has(k))nx.add(k);}
      if(c<PF[2]){const k=key(a,b,c+1);if(!bad.has(k))nx.add(k);}}
    widths.push(nx.size);
    if(!nx.size)return {ok:false,depthDied:d,widths};
    cur=nx;
  }
  return {ok:cur.has(key(PF[0],PF[1],PF[2])),depthDied:null,widths};
}
/* count profile-correct F words surviving the DAG (exact path count) */
function countPaths(forb){
  const bad=new Set();for(const v of forb.values())bad.add(v.target[0]*1000000+v.target[1]*1000+v.target[2]);
  let cur=new Map([[0,1n]]);
  for(let d=1;d<=L;d++){
    const nx=new Map();
    for(const [st,c] of cur){const a=(st/1000000)|0,b=((st/1000)|0)%1000,z=st%1000;
      const push=(k)=>{if(!bad.has(k))nx.set(k,(nx.get(k)||0n)+c);};
      if(a<PF[0])push((a+1)*1000000+b*1000+z);
      if(b<PF[1])push(a*1000000+(b+1)*1000+z);
      if(z<PF[2])push(a*1000000+b*1000+(z+1));}
    if(!nx.size)return 0n; cur=nx;
  }
  return cur.get(PF[0]*1000000+PF[1]*1000+PF[2])||0n;
}
function analyzeFast(E,A){
  const pE=CR.prefixes(E),pA=CR.prefixes(A);
  const {unavoid,forb}=compileFast(pE,pA);
  if(unavoid>0)return {unavoidable:unavoid,forbidden:forb.size,dpSurvives:false,depthDied:null,
    minWidth:0,paths:0n,reason:"F-order-independent unavoidable"};
  const r=dp(forb);
  const byDepth={};for(const v of forb.values())byDepth[v.j]=(byDepth[v.j]||0)+1;
  return {unavoidable:0,forbidden:forb.size,forbiddenByDepth:byDepth,dpSurvives:r.ok,
    depthDied:r.depthDied,minWidth:r.widths?Math.min(...r.widths.slice(1,40)):0,
    widths:r.widths,paths:r.ok?countPaths(forb):0n};
}
module.exports={analyzeFast,compileFast,dp,countPaths,STRUCT};
if(require.main===module){
  const fs=require('fs');
  const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
  const surv=JSON.parse(fs.readFileSync('../runs/survivors_30pairs.json','utf8'));
  // agreement with the unoptimized implementation
  let ok=0,bad=0;
  for(let i=0;i<25;i++){
    const t=surv[i%surv.length];
    const a=CR.analyze(t.E,t.A), b=analyzeFast(t.E,t.A);
    if(a.unavoidable===b.unavoidable && a.distinctForbiddenStates===b.forbidden && a.dpSurvives===b.dpSurvives)ok++;else{bad++;console.log("MISMATCH",JSON.stringify({a,b}));}
  }
  console.log("optimized vs unoptimized agreement:",ok,"ok,",bad,"mismatches");
  const t0=Date.now();for(let i=0;i<300;i++)analyzeFast(surv[i%surv.length].E,surv[i%surv.length].A);
  console.log("fast DP per pair:",((Date.now()-t0)/300).toFixed(3),"ms");
}
