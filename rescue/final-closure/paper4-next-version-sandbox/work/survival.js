'use strict';
/* Exact survival curve.  For each complete-AF pair, exhaustively enumerate every
   E (full Parikh (13,16,11) class) that passes the AEF cover through K<=40, then
   compute each survivor's exact first failing K in 41..100.
   N(t) = # triples with firstBadK > t. */
const fs=require('fs');const G=require('./gate.js');
const pairs=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const KBASE=40;
function firstBadK(A,E,F,lo,hi){
  let best=null,ctx=null,off=null;
  for(const v of G.AEF_COVER){
    const s=G.build(v,{a:A,e:E,f:F});
    const n=s.length;
    const P0=new Int32Array(n+1),P1=new Int32Array(n+1),P2=new Int32Array(n+1);
    for(let i=0;i<n;i++){P0[i+1]=P0[i];P1[i+1]=P1[i];P2[i+1]=P2[i];
      const c=s.charCodeAt(i)-97;if(c===0)P0[i+1]++;else if(c===1)P1[i+1]++;else P2[i+1]++;}
    for(let k=lo;k<=hi&&2*k<=n;k++){
      if(best!==null&&k>=best)break;
      for(let i=0;i+2*k<=n;i++)
        if(P0[i+k]-P0[i]===P0[i+2*k]-P0[i+k]&&P1[i+k]-P1[i]===P1[i+2*k]-P1[i+k]&&P2[i+k]-P2[i]===P2[i+2*k]-P2[i+k]){
          if(best===null||k<best){best=k;ctx=v;off=i;} break; }
    }
  }
  return best===null?null:{k:best,cover:ctx,offset:off};
}
const survivors=[];
for(const pr of pairs){
  const {A,F}=pr, src=pr.src||"?";
  const PRE=F+A+F,NP=PRE.length,T=NP+40;
  const p0=new Int32Array(T+1),p1=new Int32Array(T+1),p2=new Int32Array(T+1);
  for(let i=0;i<NP;i++){p0[i+1]=p0[i];p1[i+1]=p1[i];p2[i+1]=p2[i];
    const c=PRE.charCodeAt(i)-97;if(c===0)p0[i+1]++;else if(c===1)p1[i+1]++;else p2[i+1]++;}
  const need=G.PROFILE.e.slice();const E=new Uint8Array(40);
  function endOK(n){const km=Math.min(KBASE,n>>1);
    for(let k=2;k<=km;k++){const a=n-2*k,b=n-k;
      if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
    return true;}
  function gate40(Ew){for(const v of G.AEF_COVER){
    const s=G.build(v,{a:A,e:Ew,f:F});if(G.hasSquareUpTo(s,KBASE))return false;}return true;}
  (function rec(m){
    if(m===40){const Ew=Array.from(E).map(x=>"abc"[x]).join("");
      if(gate40(Ew)){const fb=firstBadK(A,Ew,F,41,100);
        survivors.push({A,E:Ew,F,src,id:G.aefId(A,Ew,F),
          firstBadK:fb?fb.k:null,cover:fb?fb.cover:null,offset:fb?fb.offset:null});}
      return;}
    for(let c=0;c<3;c++){if(!need[c])continue;
      const pos=NP+m,n=pos+1;p0[n]=p0[pos];p1[n]=p1[pos];p2[n]=p2[pos];
      if(c===0)p0[n]++;else if(c===1)p1[n]++;else p2[n]++;
      if(endOK(n)){E[m]=c;need[c]--;rec(m+1);need[c]++;}}
  })(0);
}
const bySrc={};for(const s of survivors)bySrc[s.src]=(bySrc[s.src]||0)+1;
console.log("K<=40-clean AEF triples found:",survivors.length,JSON.stringify(bySrc));
const hist={};for(const s of survivors)hist[s.firstBadK===null?"NONE(survives K<=100)":s.firstBadK]=
  (hist[s.firstBadK===null?"NONE(survives K<=100)":s.firstBadK]||0)+1;
console.log("exact first-bad-K histogram:",JSON.stringify(hist));
console.log("");
console.log(" t   N(t)=# triples still clean through K<=t");
for(let t=40;t<=50;t++){
  const n=survivors.filter(s=>s.firstBadK===null||s.firstBadK>t).length;
  console.log(String(t).padStart(3),String(n).padStart(6));
}
fs.writeFileSync(process.argv[3],JSON.stringify(survivors,null,1));
console.log("\nwitnesses written to",process.argv[3]);
