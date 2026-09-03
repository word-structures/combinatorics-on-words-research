'use strict';
/* §7 — exact constraint anatomy of the DOMINANT short trigram AFE = A F E at K<=40.
   F is block 1 (positions 40..79).  For K<=40 several cut points may share a block,
   so the K>L single-prefix lemma does NOT apply; count the real structure. */
const L=40,V="afe";
const PROFILE={a:[15,14,11],e:[13,16,11],f:[19,11,10]};
function decomp(p){if(p===L*V.length)return [V.length-1,L];const q=Math.floor(p/L);return [q,p-L*q];}
const byCount={0:0,1:0,2:0,3:0};
const unary=new Set(),binary=new Set(),ternary=new Set();
const coefPat={};let total=0;const depths=new Set();
for(let K=2;K<=40;K++)for(let s=0;s+2*K<=L*V.length;s++){
  total++;
  const cuts=[[s,1],[s+K,-2],[s+2*K,1]];const fT=[];
  for(const [p,c] of cuts){const [q,t]=decomp(p);if(V[q]==='f')fT.push({c,j:t});}
  byCount[fT.length]=(byCount[fT.length]||0)+1;
  fT.forEach(x=>depths.add(x.j));
  if(fT.length===1)unary.add(fT[0].c+"@"+fT[0].j);
  if(fT.length===2){binary.add(fT.map(x=>x.c+"@"+x.j).join(" , "));
    coefPat[fT.map(x=>x.c).join(",")]=(coefPat[fT.map(x=>x.c).join(",")]||0)+1;}
  if(fT.length===3)ternary.add(fT.map(x=>x.c+"@"+x.j).join(" , "));
}
console.log("AFE = A F E   (F is block 1),  K = 2..40");
console.log("total windows:",total);
console.log("windows by # cut points inside the F block:",JSON.stringify(byCount));
console.log("");
console.log("distinct UNARY   F-prefix constraint shapes:",unary.size);
console.log("distinct BINARY  F-prefix constraint shapes:",binary.size);
console.log("distinct TERNARY F-prefix constraint shapes:",ternary.size);
console.log("binary coefficient patterns:",JSON.stringify(coefPat));
console.log("distinct F-prefix depths referenced:",depths.size,"of 41");
console.log("");
/* same for EAF and FEA for comparison */
for(const VV of ["eaf","fea"]){
  const dec=p=>{if(p===L*VV.length)return [VV.length-1,L];const q=Math.floor(p/L);return [q,p-L*q];};
  const bc={0:0,1:0,2:0,3:0};let tt=0;
  for(let K=2;K<=40;K++)for(let s=0;s+2*K<=L*VV.length;s++){tt++;
    let n=0;for(const p of [s,s+K,s+2*K]){const [q]=dec(p);if(VV[q]==='f')n++;}
    bc[n]=(bc[n]||0)+1;}
  console.log(VV.toUpperCase()+": total",tt," by #F-cuts:",JSON.stringify(bc));
}
console.log("");
console.log("=> AFE at K<=40 is NOT a single-prefix problem: it has",byCount[2],"binary and",
            byCount[3],"ternary F-prefix windows.");
console.log("   Representation must be at least a binary-relation CSP over p_F(0..40),");
console.log("   not the 2640-state unary DAG used for the long band.");
