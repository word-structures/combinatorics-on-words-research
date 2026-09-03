'use strict';
/* PHASE 8 — how much pruning does the full 3600-window eafea long band add
   beyond the original 380-equation no-carry EAF subfamily (q=(0,1,2), K=41..59)? */
const fs=require('fs');const CR=require('./cleanroom_eafea_projection.js');const DP=require('./dp_fast.js');
const G=require('./gate.js');
const L=40,V="eafea",PF=CR.PROFILE.f;
/* build the two window structure sets */
function structFor(filter){
  return CR.windows().filter(([s,K])=>{
    const q=[s,s+K,s+2*K].map(p=>CR.decomp(p)[0]);
    return filter(s,K,q);
  }).map(([s,K])=>{
    const cuts=[[s,1],[s+K,-2],[s+2*K,1]];let cs=[0,0,0];const terms=[];let fT=null;
    for(const [p,c] of cuts){const [q,t]=CR.decomp(p);const Sq=CR.S(q);
      cs=[cs[0]+Sq[0]*c,cs[1]+Sq[1]*c,cs[2]+Sq[2]*c];
      const role=V[q]; if(role==='f')fT={coef:c,j:t}; else terms.push({role,t,c});}
    return {s,K,cs,terms,fT};});
}
const SUB380=structFor((s,K,q)=>q[0]===0&&q[1]===1&&q[2]===2&&K>=41&&K<=59);
const FULL=structFor(()=>true);
console.log("380-subfamily window count:",SUB380.length,"   full long band:",FULL.length);
function run(struct,pE,pA){
  let unav=0;const forb=new Map();
  for(const w of struct){
    let x=w.cs[0],y=w.cs[1],z=w.cs[2];
    for(const t of w.terms){const pv=(t.role==='e'?pE:pA)[t.t];x+=pv[0]*t.c;y+=pv[1]*t.c;z+=pv[2]*t.c;}
    if(!w.fT){if(x===0&&y===0&&z===0)unav++;continue;}
    const c=w.fT.coef,j=w.fT.j,a=-x/c,b=-y/c,d=-z/c;
    if(!Number.isInteger(a)||!Number.isInteger(b)||!Number.isInteger(d))continue;
    if(a<0||b<0||d<0||a>PF[0]||b>PF[1]||d>PF[2]||a+b+d!==j)continue;
    forb.set(j*1000000+a*10000+b*100+d,{j,target:[a,b,d]});
  }
  if(unav>0)return {killed:true,why:"unavoidable"};
  const r=DP.dp(forb);
  return {killed:!r.ok,why:r.ok?null:"dag-empty"};
}
/* iterate population H exactly as population_dp.js does */
function pre(s,cap){const n=cap+1,q=[new Int32Array(n),new Int32Array(n),new Int32Array(n)];
  for(let i=0;i<s.length;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[s.charCodeAt(i)-97][i+1]++;}return q;}
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
let tot=0,k380=0,kFull=0,kBoth=0,kFullOnly=0,k380Only=0;
for(const E of pools.E){
  const pE=CR.prefixes(E);
  const qA=pre(E,80),needA=G.PROFILE.a.slice(),Aw=new Uint8Array(40);
  (function recA(m){
    if(m===40){tot++;
      const A=Array.from(Aw).map(x=>"abc"[x]).join("");
      const pA=CR.prefixes(A);
      const a=run(SUB380,pE,pA).killed, b=run(FULL,pE,pA).killed;
      if(a)k380++; if(b)kFull++; if(a&&b)kBoth++; if(b&&!a)kFullOnly++; if(a&&!b)k380Only++;
      return;}
    for(let c=0;c<3;c++){if(!needA[c])continue;const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)qA[t][n]=qA[t][pos];qA[c][n]++;
      if(endClean(qA,n,40)){Aw[m]=c;needA[c]--;recA(m+1);needA[c]++;}}
  })(0);
}
console.log(JSON.stringify({population:"H (9 historical E)",totalEApairs:tot,
  killedBy380:k380,killedByFull3600:kFull,killedByBoth:kBoth,
  killedOnlyByFull:kFullOnly,killedOnlyBy380:k380Only,
  survivesFullLongBand:tot-kFull,
  extraPruningFromFull:+((kFullOnly/tot)*100).toFixed(3)+"%"},null,1));
