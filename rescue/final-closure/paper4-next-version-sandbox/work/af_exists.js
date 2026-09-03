'use strict';
/* §3 — exact AF_EXISTS(A): does some profile-correct F make H(faf)=F.A.F clean for K<=60?
   DFS over F with two sound incremental prunings:
     (a) F[0..m) itself                      (positions 0..m of F.A.F)
     (b) A + F[0..m)                         (positions 40..80+m of F.A.F -- fully determined)
   Full F.A.F verified at completion.  Both prunings only reject genuine violations. */
const G=require('./gate.js');
const PF=G.PROFILE.f;
function mkAF(A){
  const preA=[[0,0,0]];for(let i=0;i<40;i++){const p=preA[i].slice();p[A.charCodeAt(i)-97]++;preA.push(p);}
  return {A,preA};
}
function afExists(A,cap){
  // arrays for F prefix and for A+Fprefix
  const q1=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];       // F alone
  const q2=[new Int32Array(81),new Int32Array(81),new Int32Array(81)];       // A then F prefix
  for(let i=0;i<40;i++){for(let t=0;t<3;t++)q2[t][i+1]=q2[t][i];q2[A.charCodeAt(i)-97][i+1]++;}
  const need=PF.slice();const Fw=new Uint8Array(40);
  let nodes=0,capped=false,found=null;
  function endOK(q,n,km){const k2=Math.min(km,n>>1);
    for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
      if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
    return true;}
  function rec(m){
    if(found||capped)return;
    if(++nodes>cap){capped=true;return;}
    if(m===40){
      const F=Array.from(Fw).map(x=>"abc"[x]).join("");
      if(G.checkAF(A,F).pass)found=F;
      return;}
    for(let c=0;c<3;c++){
      if(!need[c])continue;
      for(let t=0;t<3;t++)q1[t][m+1]=q1[t][m];q1[c][m+1]++;
      const n2=40+m+1;
      for(let t=0;t<3;t++)q2[t][n2]=q2[t][n2-1];q2[c][n2]++;
      if(endOK(q1,m+1,20)&&endOK(q2,n2,60)){Fw[m]=c;need[c]--;rec(m+1);need[c]++;}
      if(found||capped)return;
    }}
  rec(0);
  return {exists:found!==null,witness:found,nodes,capped};
}
module.exports={afExists};
if(require.main===module){
  const fs=require('fs');
  const H=JSON.parse(fs.readFileSync('../runs/distinctA_H.json','utf8'));
  const R=JSON.parse(fs.readFileSync('../runs/distinctA_R.json','utf8'));
  const CAP=+(process.argv[2]||5e6), N=+(process.argv[3]||40);
  for(const [lab,arr] of [["H",H],["R",R]]){
    let pos=0,neg=0,cap=0,tn=0;const t0=Date.now();
    for(let i=0;i<N;i++){const r=afExists(arr[Math.floor(i*arr.length/N)],CAP);
      tn+=r.nodes; if(r.capped)cap++; else if(r.exists)pos++; else neg++;}
    console.log(`${lab}: sampled ${N}  AF_EXISTS true=${pos} false=${neg} capped=${cap}`+
      `  meanNodes=${Math.round(tn/N)}  ms/A=${((Date.now()-t0)/N).toFixed(1)}`);
  }
}
