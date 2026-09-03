'use strict';
/* PHASE 9 — exact constraint anatomy of fafea = F A F E A (F occurs TWICE).
   Count windows by how many cut points land in an F block, and canonicalize the
   binary constraints c1*p_F(i) + c2*p_F(j) = C. */
const L=40,V="fafea";
const PROFILE={a:[15,14,11],e:[13,16,11],f:[19,11,10]};
const add=(u,w)=>[u[0]+w[0],u[1]+w[1],u[2]+w[2]];
const mul=(u,k)=>[u[0]*k,u[1]*k,u[2]*k];
function decomp(p){if(p===L*V.length)return [V.length-1,L];const q=Math.floor(p/L);return [q,p-L*q];}
function S(q){let s=[0,0,0];for(let j=0;j<q;j++)s=add(s,PROFILE[V[j]]);return s;}
const byCount={0:0,1:0,2:0,3:0};
const unary=new Set(), binary=new Set(), depthPairs=new Set(), coefPat={};
let total=0;
for(let K=41;K<=100;K++)for(let s=0;s+2*K<=L*V.length;s++){
  total++;
  const cuts=[[s,1],[s+K,-2],[s+2*K,1]];
  const fT=[];
  for(const [p,c] of cuts){const [q,t]=decomp(p); if(V[q]==='f')fT.push({c,j:t,q});}
  byCount[fT.length]=(byCount[fT.length]||0)+1;
  if(fT.length===1)unary.add(fT[0].c+"@"+fT[0].j);
  if(fT.length===2){
    const a=fT[0],b=fT[1];
    binary.add(`${a.c}*p(${a.j}) + ${b.c}*p(${b.j})`);
    depthPairs.add(a.j+","+b.j);
    const key=[a.c,b.c].join(",");coefPat[key]=(coefPat[key]||0)+1;
  }
}
console.log("fafea = F A F E A   (F at blocks 0 and 2)");
console.log("total long-band windows K=41..100:",total);
console.log("windows by # cut points inside an F block:",JSON.stringify(byCount));
console.log("");
console.log("distinct UNARY prefix-state constraint shapes (coef@depth):",unary.size);
console.log("distinct BINARY prefix-state constraint shapes:",binary.size);
console.log("distinct (i,j) depth pairs in binary constraints:",depthPairs.size);
console.log("binary coefficient patterns:",JSON.stringify(coefPat));
console.log("");
// compare with eafea
let e0=0,e1=0,e2=0,et=0;
{const VV="eafea";
 const dec=p=>{if(p===L*VV.length)return [VV.length-1,L];const q=Math.floor(p/L);return [q,p-L*q];};
 for(let K=41;K<=100;K++)for(let s=0;s+2*K<=L*VV.length;s++){et++;let n=0;
   for(const p of [s,s+K,s+2*K]){const [q]=dec(p);if(VV[q]==='f')n++;}
   if(n===0)e0++;else if(n===1)e1++;else e2++;}}
console.log("eafea for comparison: total",et," 0-F:",e0," 1-F:",e1," 2-F:",e2);
console.log("");
console.log("=> fafea needs an augmented state: a plain 2640-state prefix DAG is NOT sufficient,");
console.log("   because",byCount[2],"windows couple TWO prefix states of the same F word.");
