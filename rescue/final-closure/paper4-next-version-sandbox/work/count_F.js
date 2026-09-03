'use strict';
/* Exhaustively count/enumerate the F domain:
   |F|=40, Parikh (19,11,10), F abelian-square-free for every K=2..20.
   (F is a factor of H(faf), so this is a necessary condition.) */
const G=require('./gate.js');
const CAP=+(process.argv[2]||5e8);
const need=G.PROFILE.f.slice(); const w=new Uint8Array(40);
const p0=new Int32Array(41),p1=new Int32Array(41),p2=new Int32Array(41);
function endOK(n){const kmax=n>>1;
  for(let k=2;k<=kmax;k++){const a=n-2*k,b=n-k;
    if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
  return true;}
let nodes=0,count=0,capped=false; const sample=[];
function rec(m){
  if(++nodes>CAP){capped=true;return;}
  if(m===40){count++; if(sample.length<5)sample.push(Array.from(w).map(x=>"abc"[x]).join("")); return;}
  for(let c=0;c<3;c++){
    if(!need[c])continue;
    p0[m+1]=p0[m];p1[m+1]=p1[m];p2[m+1]=p2[m];
    if(c===0)p0[m+1]++;else if(c===1)p1[m+1]++;else p2[m+1]++;
    if(endOK(m+1)){w[m]=c;need[c]--;rec(m+1);need[c]++;}
    if(capped)return;
  }}
const t0=Date.now();rec(0);
console.log(JSON.stringify({domain:"F: len40 profile(19,11,10) abelian-square-free K=2..20",
  nodes,capped,exhaustive:!capped,count,seconds:+((Date.now()-t0)/1000).toFixed(1),sample},null,1));
