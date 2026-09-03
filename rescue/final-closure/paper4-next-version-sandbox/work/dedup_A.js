'use strict';
/* §2 — deduplicate the A words across populations H and R. */
const fs=require('fs');const G=require('./gate.js'),R=require('./rng.js');
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
function pre(s,cap){const n=cap+1,q=[new Int32Array(n),new Int32Array(n),new Int32Array(n)];
  for(let i=0;i<s.length;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[s.charCodeAt(i)-97][i+1]++;}return q;}
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
function mkGenE(rnd){return function(){
  const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
  const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
  function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
    const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
    for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
      if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}
    return false;}
  return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;};}
function Alist(E){const out=[];const qA=pre(E,80),need=G.PROFILE.a.slice(),Aw=new Uint8Array(40);
  (function rec(m){if(m===40){out.push(Array.from(Aw).map(x=>"abc"[x]).join(""));return;}
    for(let c=0;c<3;c++){if(!need[c])continue;const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)qA[t][n]=qA[t][pos];qA[c][n]++;
      if(endClean(qA,n,40)){Aw[m]=c;need[c]--;rec(m+1);need[c]++;}}})(0);
  return out;}
const Hs=pools.E.slice();
const Rs=[];{const rnd=R.mk(7788),gen=mkGenE(rnd);
  while(Rs.length<60){const E=gen();if(!E||POOLE.has(E))continue;Rs.push(E);}}
function build(Es,label){
  const mult=new Map(); let pairs=0;
  Es.forEach((E,i)=>{const as=Alist(E);pairs+=as.length;
    for(const A of as)mult.set(A,(mult.get(A)||0)+1);});
  console.log(label+": E="+Es.length+"  (E,A) pairs="+pairs+"  distinct A="+mult.size);
  return {mult,pairs};
}
const H=build(Hs,"POPULATION H"), Rr=build(Rs,"POPULATION R");
let inter=0;for(const a of H.mult.keys())if(Rr.mult.has(a))inter++;
console.log("\ndistinct A overlap  H ∩ R :",inter);
console.log("union distinct A          :",H.mult.size+Rr.mult.size-inter);
function mstat(m,label){
  const v=[...m.values()].sort((a,b)=>a-b);
  const hist={};for(const x of v)hist[x]=(hist[x]||0)+1;
  console.log(label+" multiplicity of A across E: min",v[0],"median",v[Math.floor(v.length/2)],"max",v[v.length-1]);
  console.log("   histogram (mult:count):",JSON.stringify(Object.fromEntries(Object.entries(hist).slice(0,12))));
}
mstat(H.mult,"H"); mstat(Rr.mult,"R");
fs.writeFileSync('../runs/distinctA_H.json',JSON.stringify([...H.mult.keys()]));
fs.writeFileSync('../runs/distinctA_R.json',JSON.stringify([...Rr.mult.keys()]));
fs.writeFileSync('../runs/A_multiplicity.json',JSON.stringify({
  H:{pairs:H.pairs,distinct:H.mult.size},R:{pairs:Rr.pairs,distinct:Rr.mult.size},overlap:inter}));
console.log("\ncaching potential: F work per distinct A instead of per (E,A) pair");
console.log("   H:",H.pairs,"->",H.mult.size,"("+(H.pairs/H.mult.size).toFixed(1)+"x reduction)");
console.log("   R:",Rr.pairs,"->",Rr.mult.size,"("+(Rr.pairs/Rr.mult.size).toFixed(1)+"x reduction)");
