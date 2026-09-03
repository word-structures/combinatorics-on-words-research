'use strict';
/* POSITIVE CONTROL for the E-closure search machinery.
   Same DFS, but with an artificially reduced half-period ceiling KMAX.
   At small KMAX solutions must exist; if the search finds and persists them,
   the machinery is capable of producing hits, so a 0-hit result at KMAX=100
   is a real negative rather than a silent search failure. */
const fs=require('fs');const G=require('./gate.js');
const pairs=JSON.parse(fs.readFileSync('../fixtures/af_complete_pass.json','utf8'));
const {A,F}=pairs[0];
function run(KMAX,MAXHITS){
  const PRE=F+A+F,NP=PRE.length,T=NP+40;
  const p0=new Int32Array(T+1),p1=new Int32Array(T+1),p2=new Int32Array(T+1);
  for(let i=0;i<NP;i++){p0[i+1]=p0[i];p1[i+1]=p1[i];p2[i+1]=p2[i];
    const c=PRE.charCodeAt(i)-97;if(c===0)p0[i+1]++;else if(c===1)p1[i+1]++;else p2[i+1]++;}
  const need=G.PROFILE.e.slice();const E=new Uint8Array(40);
  let nodes=0,complete=0,hits=0;const list=[];let stop=false;
  function endOK(n){const km=Math.min(KMAX,n>>1);
    for(let k=2;k<=km;k++){const a=n-2*k,b=n-k;
      if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
    return true;}
  // gate at reduced KMAX over both cover words
  function gateOK(Ew){
    for(const v of G.AEF_COVER){
      const s=G.build(v,{a:A,e:Ew,f:F});
      if(G.hasSquareUpTo(s,KMAX))return false;
    } return true;}
  function rec(m){
    if(stop)return;
    nodes++;
    if(m===40){complete++;const Ew=Array.from(E).map(x=>"abc"[x]).join("");
      if(gateOK(Ew)){hits++;if(list.length<MAXHITS)list.push(Ew);if(hits>=MAXHITS)stop=true;}
      return;}
    for(let c=0;c<3;c++){if(!need[c])continue;
      const pos=NP+m,n=pos+1;p0[n]=p0[pos];p1[n]=p1[pos];p2[n]=p2[pos];
      if(c===0)p0[n]++;else if(c===1)p1[n]++;else p2[n]++;
      if(endOK(n)){E[m]=c;need[c]--;rec(m+1);need[c]++;}
      if(stop)return;}}
  rec(0);
  return {KMAX,nodes,completeE:complete,hits,sample:list.slice(0,2)};
}
for(const K of [6,8,10,12,20,40,60,100]){
  const r=run(K,3);
  console.log(`KMAX=${String(K).padStart(3)}  nodes=${String(r.nodes).padStart(9)}  completeE=${String(r.completeE).padStart(6)}  HITS=${r.hits}`);
  if(r.hits&&K<=10)console.log(`            witness E = ${r.sample[0]}`);
}
