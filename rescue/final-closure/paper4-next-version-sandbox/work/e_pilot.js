'use strict';
/* Pilot: measure the true cost of EXHAUSTIVE E closure over one complete-AF pair.
   DFS is driven on the fafea window (F A F E A) because its prefix F A F is fixed,
   giving full incremental pruning from E's first letter.  eafea verified at completion. */
const fs=require('fs');const G=require('./gate.js');
const pairs=JSON.parse(fs.readFileSync('../fixtures/af_complete_pass.json','utf8'));
const which=+(process.argv[2]||0), NODECAP=+(process.argv[3]||5e7);
const {A,F}=pairs[which];
const EREQ=G.PROFILE.e.slice();                       // [13,16,11]
const PRE=F+A+F;                                      // 120 fixed letters
const NP=PRE.length, TOT=NP+40;                       // E occupies 120..159
const P0=new Int32Array(TOT+1),P1=new Int32Array(TOT+1),P2=new Int32Array(TOT+1);
for(let i=0;i<NP;i++){P0[i+1]=P0[i];P1[i+1]=P1[i];P2[i+1]=P2[i];
  const c=PRE.charCodeAt(i)-97;if(c===0)P0[i+1]++;else if(c===1)P1[i+1]++;else P2[i+1]++;}
// squares ending exactly at position n (1-indexed length n), half-period k<=100
function endOK(n){
  const kmax=Math.min(100,n>>1);
  for(let k=2;k<=kmax;k++){
    const a=n-2*k,b=n-k;
    if(P0[b]-P0[a]===P0[n]-P0[b]&&P1[b]-P1[a]===P1[n]-P1[b]&&P2[b]-P2[a]===P2[n]-P2[b])return false;
  }
  return true;
}
const rem=EREQ.slice(); const E=new Uint8Array(40);
let nodes=0,complete=0,hits=0,capped=false; const hitList=[];
function rec(m){
  if(++nodes>NODECAP){capped=true;return;}
  if(m===40){
    complete++;
    const Ew=Array.from(E).map(x=>"abc"[x]).join("");
    const r=G.checkAEF(A,Ew,F);
    if(r.pass){hits++;hitList.push(Ew);}
    return;
  }
  for(let c=0;c<3;c++){
    if(!rem[c])continue;
    const pos=NP+m, n=pos+1;
    P0[n]=P0[pos];P1[n]=P1[pos];P2[n]=P2[pos];
    if(c===0)P0[n]++;else if(c===1)P1[n]++;else P2[n]++;
    if(endOK(n)){E[m]=c;rem[c]--;rec(m+1);rem[c]++;}
    if(capped)return;
  }
}
const t0=Date.now();rec(0);const dt=(Date.now()-t0)/1000;
console.log(JSON.stringify({pairIndex:which,A_sha:G.sha(A).slice(0,12),F_sha:G.sha(F).slice(0,12),
  nodes,capped,completeE:complete,completeAEFhits:hits,seconds:+dt.toFixed(2),
  exhaustive:!capped, hitList},null,1));
