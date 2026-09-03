'use strict';
/* §5 — exact attribution tree on the AF-positive A words found in §3.
   For each such A: enumerate ALL complete-AF F, find every E in its population that
   generates it, then classify each (E,A) pair by the first failing stage. */
const fs=require('fs');const G=require('./gate.js'),R=require('./rng.js');
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
/* all complete-AF F for a given A (exhaustive) */
function allF(A,cap){
  const q1=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];
  const q2=[new Int32Array(81),new Int32Array(81),new Int32Array(81)];
  for(let i=0;i<40;i++){for(let t=0;t<3;t++)q2[t][i+1]=q2[t][i];q2[A.charCodeAt(i)-97][i+1]++;}
  const need=G.PROFILE.f.slice(),Fw=new Uint8Array(40);const out=[];let nodes=0,capped=false;
  (function rec(m){
    if(capped)return;
    if(++nodes>cap){capped=true;return;}
    if(m===40){const F=Array.from(Fw).map(x=>"abc"[x]).join("");
      if(G.checkAF(A,F).pass)out.push(F);return;}
    for(let c=0;c<3;c++){if(!need[c])continue;
      for(let t=0;t<3;t++)q1[t][m+1]=q1[t][m];q1[c][m+1]++;
      const n2=40+m+1;for(let t=0;t<3;t++)q2[t][n2]=q2[t][n2-1];q2[c][n2]++;
      if(endClean(q1,m+1,20)&&endClean(q2,n2,60)){Fw[m]=c;need[c]--;rec(m+1);need[c]++;}
      if(capped)return;}})(0);
  return {F:out,capped,nodes};
}
/* E population -> which E generate a given A */
function Aset(E){const s=new Set();
  const q=[new Int32Array(81),new Int32Array(81),new Int32Array(81)];
  for(let i=0;i<40;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[E.charCodeAt(i)-97][i+1]++;}
  const need=G.PROFILE.a.slice(),Aw=new Uint8Array(40);
  (function rec(m){if(m===40){s.add(Array.from(Aw).map(x=>"abc"[x]).join(""));return;}
    for(let c=0;c<3;c++){if(!need[c])continue;const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)q[t][n]=q[t][pos];q[c][n]++;
      if(endClean(q,n,40)){Aw[m]=c;need[c]--;rec(m+1);need[c]++;}}})(0);
  return s;}
const Hs=pools.E.slice();
const Rs=[];{const rnd=R.mk(7788);
  const gen=()=>{const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
    const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
    function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
      const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
      for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
        if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}return false;}
    return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;};
  while(Rs.length<60){const E=gen();if(!E||POOLE.has(E))continue;Rs.push(E);}}
const build=(v,b)=>[...v].map(c=>b[c]).join("");
const cl=(s,k)=>!G.hasSquareUpTo(s,k);
function run(label,Es,posFile){
  const pos=fs.readFileSync(posFile,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
  const Amap=new Map();
  Es.forEach((E,i)=>{for(const A of Aset(E)){if(!Amap.has(A))Amap.set(A,[]);Amap.get(A).push(i);}});
  const lv={L1:0,L2:0,L3:0,L4:0};let pairs=0,totF=0,anyCap=false;
  for(const p of pos){
    const A=p.A; const es=Amap.get(A)||[];
    const {F,capped}=allF(A,20000000); if(capped)anyCap=true; totF+=F.length;
    for(const ei of es){const E=Es[ei];pairs++;
      let passAFE=false,passAE=false,all=false;
      for(const f of F){
        const bAFE=cl(build("afe",{a:A,e:E,f}),40);
        const bEAF=cl(build("eaf",{a:A,e:E,f}),40);
        const bFEA=cl(build("fea",{a:A,e:E,f}),40);
        if(bAFE)passAFE=true;
        if(bAFE&&bEAF)passAE=true;
        if(bAFE&&bEAF&&bFEA){all=true;break;}
      }
      if(all)lv.L4++; else if(passAE)lv.L3++; else if(passAFE)lv.L2++; else lv.L1++;
    }
  }
  console.log(`\n${label}: AF-positive A = ${pos.length}   total complete-AF F witnesses = ${totF}   anyCap=${anyCap}`);
  console.log(`  (E,A) pairs whose A is AF-positive: ${pairs}`);
  console.log(`  LEVEL 1 (AF exists, every F fails AFE)          : ${lv.L1}`);
  console.log(`  LEVEL 2 (some F passes AFE, all fail EAF)       : ${lv.L2}`);
  console.log(`  LEVEL 3 (some passes AFE+EAF, all fail FEA)     : ${lv.L3}`);
  console.log(`  LEVEL 4 (complete K<=40 AEF triple exists)      : ${lv.L4}`);
  return lv;
}
run("POPULATION H",Hs,"../runs/afex_H/af_positive.jsonl");
run("POPULATION R",Rs,"../runs/afex_R/af_positive.jsonl");
