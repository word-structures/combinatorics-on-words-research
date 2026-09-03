'use strict';
/* PHASE 3 — EXACT closure of the radius-1 profile-preserving shell.
   Domain: every E at profile-preserving Hamming distance 2 from a historical E,
   deduplicated, then reduced by the SOUND necessary condition that E itself be
   abelian-square-free for K<=20 (E is a block of H(eafea), so any such square is
   an AEF-gate violation).  For each surviving E, the FULL A profile class and,
   for every surviving A, the FULL F profile class are searched exhaustively. */
const fs=require('fs'),path=require('path');
const G=require('./gate.js'),P=require('./persist.js');
const runId=process.argv[2],CAP=+(process.argv[3]||4e8);
const RUN=path.join(__dirname,'..','runs',runId);
const cands=JSON.parse(fs.readFileSync(path.join(__dirname,'..','runs','shell_r1_filtered.json'),'utf8'));
const pools=JSON.parse(fs.readFileSync(path.join(__dirname,'..','fixtures','canonical_pools.json'),'utf8'));
const POOLA=new Set(pools.A),POOLE=new Set(pools.E),POOLF=new Set(pools.F),POOLT=new Set(pools.tripleIds);
const man={runId,kind:"radius-1 profile-preserving shell, EXACT closure",gateVersion:G.GATE_VERSION,
  domain:"E at profile-preserving Hamming distance 2 from any of the 9 historical E, deduplicated (4670), "+
         "reduced by the SOUND necessary condition 'E abelian-square-free for K=2..20' to "+cands.length+". "+
         "For each E: FULL Parikh(15,14,11) A class and FULL Parikh(19,11,10) F class searched exhaustively.",
  candidates:cands.length,nodeCap:CAP,
  codeSha:{gate:P.fileSha(path.join(__dirname,'gate.js')),runner:P.fileSha(__filename)},
  host:P.host,startedUtc:new Date().toISOString(),status:"RUNNING"};
P.writeAtomic(path.join(RUN,'manifest.json'),man);
const hits=new P.Appender(path.join(RUN,'aef40_hits.jsonl'));
const perE=new P.Appender(path.join(RUN,'per_e.jsonl'));
function pre(s,cap){const n=cap+1,q=[new Int32Array(n),new Int32Array(n),new Int32Array(n)];
  for(let i=0;i<s.length;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[s.charCodeAt(i)-97][i+1]++;}return q;}
function clean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
let tot=0,prod=0,newT=0,disj=0,anyCap=false;
const t0=Date.now();
cands.forEach((cd,ci)=>{
  const E=cd.E; const qA=pre(E,80); const needA=G.PROFILE.a.slice(); const Aw=new Uint8Array(40);
  let aN=0,aC=0,fN=0,fCapped=false,hitsE=0,aCapped=false;
  (function recA(m){
    if(++aN>CAP){aCapped=true;return;}
    if(m===40){aC++;
      const A=Array.from(Aw).map(x=>"abc"[x]).join("");
      const qF=pre(E+A,120); const needF=G.PROFILE.f.slice(); const Fw=new Uint8Array(40);
      (function recF(m2){
        if(++fN>CAP){fCapped=true;return;}
        if(m2===40){
          const F=Array.from(Fw).map(x=>"abc"[x]).join("");
          if(!G.checkAF(A,F).pass)return;
          for(const v of G.AEF_COVER) if(G.hasSquareUpTo(G.build(v,{a:A,e:E,f:F}),40))return;
          const tid=G.aefId(A,E,F);
          const isNew=!POOLT.has(tid), dj=!POOLA.has(A)&&!POOLE.has(E)&&!POOLF.has(F);
          if(hits.write({id:tid,kind:"AEF_CLEAN_K40",A,E,F,gateVersion:G.GATE_VERSION,
            aefK:[2,40],afK:[2,60],shellSeeds:cd.seeds,hamming:2,
            overlap:{A_in_old8:POOLA.has(A),E_in_old9:POOLE.has(E),F_in_old7:POOLF.has(F),
                     inCanonical39:!isNew,strictDisjoint:dj},
            provenance:{runId,candidateIndex:ci,method:"radius-1 shell exact closure"},
            A_sha:G.sha(A),E_sha:G.sha(E),F_sha:G.sha(F),ts:new Date().toISOString()})){
            hitsE++;tot++;if(isNew)newT++;if(dj)disj++;}
          return;}
        for(let c=0;c<3;c++){if(!needF[c])continue;const pos=80+m2,n=pos+1;
          for(let t=0;t<3;t++)qF[t][n]=qF[t][pos];qF[c][n]++;
          if(clean(qF,n,40)){Fw[m2]=c;needF[c]--;recF(m2+1);needF[c]++;}
          if(fCapped)return;}
      })(0);
      return;}
    for(let c=0;c<3;c++){if(!needA[c])continue;const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)qA[t][n]=qA[t][pos];qA[c][n]++;
      if(clean(qA,n,40)){Aw[m]=c;needA[c]--;recA(m+1);needA[c]++;}
      if(aCapped)return;}
  })(0);
  if(aCapped||fCapped)anyCap=true;
  if(hitsE)prod++;
  perE.write({candidateIndex:ci,E_sha:G.sha(E).slice(0,16),shellSeeds:cd.seeds,
    aNodes:aN,aComplete:aC,fNodes:fN,aCapped,fCapped,exhaustive:!aCapped&&!fCapped,
    P40:hitsE>0,aefK40Hits:hitsE,ts:new Date().toISOString()});
});
man.status="COMPLETED";man.finishedUtc=new Date().toISOString();
man.summary={candidates:cands.length,productiveE:prod,totalHits:tot,notInCanonical39:newT,
  strictDisjoint:disj,anyCap,exhaustive:!anyCap,seconds:+((Date.now()-t0)/1000).toFixed(1)};
P.writeAtomic(path.join(RUN,'manifest.json'),man);
hits.close();perE.close();
console.log(JSON.stringify(man.summary,null,1));
