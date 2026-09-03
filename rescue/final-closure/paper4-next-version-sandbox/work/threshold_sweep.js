'use strict';
/* EXTINCTION-THRESHOLD SWEEP.
   For each ceiling KMAX, run the exhaustive E closure over every complete-AF
   pair and count how many pairs admit at least one E passing the AEF cover
   {eafea,fafea} up to KMAX.  Locates where complete-AEF dies. */
const fs=require('fs');const G=require('./gate.js');
const pairs=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const KS=(process.argv[3]||"40,45,50,55,60,70,80,90,100").split(",").map(Number);
console.log("pairs:",pairs.length);
console.log("KMAX  pairsWithHit  totalHitE  totalCompleteE  totalNodes");
for(const KMAX of KS){
  let pairsHit=0,hits=0,comp=0,nodes=0;
  for(const {A,F} of pairs){
    const PRE=F+A+F,NP=PRE.length,T=NP+40;
    const p0=new Int32Array(T+1),p1=new Int32Array(T+1),p2=new Int32Array(T+1);
    for(let i=0;i<NP;i++){p0[i+1]=p0[i];p1[i+1]=p1[i];p2[i+1]=p2[i];
      const c=PRE.charCodeAt(i)-97;if(c===0)p0[i+1]++;else if(c===1)p1[i+1]++;else p2[i+1]++;}
    const need=G.PROFILE.e.slice();const E=new Uint8Array(40);let h=0;
    function endOK(n){const km=Math.min(KMAX,n>>1);
      for(let k=2;k<=km;k++){const a2=n-2*k,b2=n-k;
        if(p0[b2]-p0[a2]===p0[n]-p0[b2]&&p1[b2]-p1[a2]===p1[n]-p1[b2]&&p2[b2]-p2[a2]===p2[n]-p2[b2])return false;}
      return true;}
    function gateOK(Ew){for(const v of G.AEF_COVER){
      const s=G.build(v,{a:A,e:Ew,f:F});if(G.hasSquareUpTo(s,KMAX))return false;} return true;}
    (function rec(m){
      nodes++;
      if(m===40){comp++;const Ew=Array.from(E).map(x=>"abc"[x]).join("");
        if(gateOK(Ew)){h++;hits++;} return;}
      for(let c=0;c<3;c++){if(!need[c])continue;
        const pos=NP+m,n=pos+1;p0[n]=p0[pos];p1[n]=p1[pos];p2[n]=p2[pos];
        if(c===0)p0[n]++;else if(c===1)p1[n]++;else p2[n]++;
        if(endOK(n)){E[m]=c;need[c]--;rec(m+1);need[c]++;}}
    })(0);
    if(h)pairsHit++;
  }
  console.log(String(KMAX).padStart(4),String(pairsHit).padStart(13),String(hits).padStart(11),String(comp).padStart(15),String(nodes).padStart(12));
}
