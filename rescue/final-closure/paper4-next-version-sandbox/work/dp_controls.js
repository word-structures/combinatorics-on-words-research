'use strict';
/* MANDATORY SOUNDNESS CONTROL.
 * A K<=40-clean triple is NOT a long-band positive control.  The exact testable
 * statement is:  for the actual F of a known triple,
 *    DP marks F's prefix path as hitting a forbidden state
 *      <=>  H(eafea) with that F really contains an Abelian square with K in 41..100.
 * Both directions must hold, or the projection is unsound/incomplete. */
const fs=require('fs');const CR=require('./cleanroom_eafea_projection.js');
const V="eafea";
function cnt(s){const c=[0,0,0];for(let i=0;i<s.length;i++)c[s.charCodeAt(i)-97]++;return c;}
function directLongBand(E,A,F){                 // ground truth
  const H=[...V].map(ch=>({e:E,a:A,f:F})[ch]).join("");
  for(let K=41;K<=100;K++)for(let s=0;s+2*K<=H.length;s++){
    const h1=cnt(H.substr(s,K)),h2=cnt(H.substr(s+K,K));
    if(h1[0]===h2[0]&&h1[1]===h2[1]&&h1[2]===h2[2])return {K,s};
  }
  return null;
}
function compileAll(E,A){
  const ws=CR.windows(); let unavoid=0; const forb=new Map();
  for(const [s,K] of ws){const c=CR.compile(s,K,E,A);
    if(c.kind==="UNAVOIDABLE")unavoid++;
    else if(c.kind==="FORBID")forb.set(c.j+"|"+c.target.join(","),{j:c.j,target:c.target});}
  return {unavoid,forb};
}
function pathHitsForbidden(F,forb){
  const pf=CR.prefixes(F);
  for(let j=0;j<=40;j++){const k=j+"|"+pf[j].join(",");if(forb.has(k))return {j,state:pf[j]};}
  return null;
}
const recs=fs.readFileSync(process.argv[2],'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
let n=0,agree=0,dis=0,unav=0; const bad=[];
for(const r of recs){
  const {A,E,F}=r; if(!A||!E||!F)continue; n++;
  const {unavoid,forb}=compileAll(E,A);
  const direct=directLongBand(E,A,F);
  const hit=pathHitsForbidden(F,forb);
  const predicted = unavoid>0 || hit!==null;
  if(unavoid>0)unav++;
  if(predicted===(direct!==null))agree++;
  else{dis++;if(bad.length<5)bad.push({id:r.id&&r.id.slice(0,12),unavoid,hit,direct});}
}
console.log(JSON.stringify({file:process.argv[2].split("/").pop(),triples:n,
  agree,disagree:dis,withOrderIndependentUnavoidable:unav},null,1));
if(dis){console.log("SOUNDNESS FAILURES:",JSON.stringify(bad,null,1));process.exit(2);}
console.log("PASS: DP forbidden-state prediction matches direct long-band reality on every triple.");
