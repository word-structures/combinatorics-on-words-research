'use strict';
/* JOINT E -> A -> F SEARCH for K<=40-clean AEF triples.
 * Order chosen so every level prunes against already-committed structure:
 *   eafea = E A F E A   ->  prefixes E, E.A, E.A.F are progressively fixed
 * At completion both cover words are fully determined and both gates applied:
 *   complete-AF  : H(faf)   = F.A.F, K<=60   (pre-filter, subsumed by AEF)
 *   AEF at K<=40 : H(eafea), H(fafea)
 * Persistence: append-only + fsync per hit; content-derived IDs; resume-safe.
 * Usage: node joint_eaf.js <runId> <seed> <numE> <aCap> <fCap> [fixedE]
 */
const fs=require('fs'),path=require('path');
const G=require('./gate.js'),P=require('./persist.js'),R=require('./rng.js');
const runId=process.argv[2],seed=+process.argv[3],NUME=+process.argv[4];
const ACAP=+process.argv[5],FCAP=+process.argv[6],FIXED_E=process.argv[7]||null;
const RUN=path.join(__dirname,'..','runs',runId);
const rnd=R.mk(seed);
const pools=JSON.parse(fs.readFileSync(path.join(__dirname,'..','fixtures','canonical_pools.json'),'utf8'));
const POOLA=new Set(pools.A),POOLE=new Set(pools.E),POOLF=new Set(pools.F),POOLT=new Set(pools.tripleIds);

const manifest={runId,kind:"joint E->A->F search for K<=40-clean AEF triples",
  gateVersion:G.GATE_VERSION,seed,numERequested:NUME,aCapPerE:ACAP,fCapPerEA:FCAP,
  fixedE:FIXED_E,
  profiles:{A:G.PROFILE.a,E:G.PROFILE.e,F:G.PROFILE.f},
  searchDomain:"E: seeded DFS over Parikh(13,16,11) abelian-square-free K<=20. "+
    "A: DFS over Parikh(15,14,11) pruned incrementally on E.A (K<=40), node cap "+ACAP+" per E. "+
    "F: DFS over Parikh(19,11,10) pruned incrementally on E.A.F (K<=40), node cap "+FCAP+" per (E,A). "+
    "Acceptance: H(faf) clean K<=60 AND H(eafea),H(fafea) clean K<=40.",
  acceptance:{completeAF_K:[2,60],aefK40:[2,40],covers:{AF:G.AF_COVER,AEF:G.AEF_COVER}},
  codeSha:{gate:P.fileSha(path.join(__dirname,'gate.js')),runner:P.fileSha(__filename),
           persist:P.fileSha(path.join(__dirname,'persist.js')),rng:P.fileSha(path.join(__dirname,'rng.js'))},
  host:P.host,startedUtc:new Date().toISOString(),status:"RUNNING"};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
const hits=new P.Appender(path.join(RUN,'aef40_hits.jsonl'));
const prog=new P.Appender(path.join(RUN,'progress.jsonl'));

function mkPref(s,cap){const n=cap+1;
  const q=[new Int32Array(n),new Int32Array(n),new Int32Array(n)];
  for(let i=0;i<s.length;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[s.charCodeAt(i)-97][i+1]++;}
  return q;}
function endClean(q,n,kmax){const km=Math.min(kmax,n>>1);
  for(let k=2;k<=km;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}

// ---- level 1: E ----
function genE(){
  const need=G.PROFILE.e.slice();const w=new Uint8Array(40);
  const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];
  let nodes=0;
  function rec(m){
    if(++nodes>2e6)return false;
    if(m===40)return true;
    const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
    for(const c of o){if(!need[c])continue;
      for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
      if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}
    return false;}
  return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;}

let eSeen=0,eDup=0,found=0,newTriples=0,strictDisjoint=0;
const eIds=new Set();
const t0=Date.now();
for(let ei=0; ei<NUME; ei++){
  const E=FIXED_E||genE();
  if(!E)continue;
  const eid=G.sha("E|"+E); if(eIds.has(eid)){eDup++;if(FIXED_E)break;continue;}
  eIds.add(eid);eSeen++;
  // ---- level 2: A, pruned on E.A ----
  const qA=mkPref(E,80); const needA=G.PROFILE.a.slice(); const Aw=new Uint8Array(40);
  let aNodes=0,aCapped=false;
  (function recA(m){
    if(++aNodes>ACAP){aCapped=true;return;}
    if(m===40){
      const A=Array.from(Aw).map(x=>"abc"[x]).join("");
      // ---- level 3: F, pruned on E.A.F ----
      const qF=mkPref(E+A,120); const needF=G.PROFILE.f.slice(); const Fw=new Uint8Array(40);
      let fNodes=0,fCapped=false;
      (function recF(m2){
        if(++fNodes>FCAP){fCapped=true;return;}
        if(m2===40){
          const F=Array.from(Fw).map(x=>"abc"[x]).join("");
          // full acceptance
          if(!G.checkAF(A,F).pass)return;
          for(const v of G.AEF_COVER) if(G.hasSquareUpTo(G.build(v,{a:A,e:E,f:F}),40))return;
          const tid=G.aefId(A,E,F);
          const isNew=!POOLT.has(tid);
          const disj=!POOLA.has(A)&&!POOLE.has(E)&&!POOLF.has(F);
          const rec3={id:tid,kind:"AEF_CLEAN_K40",A,E,F,
            gateVersion:G.GATE_VERSION,aefK:[2,40],afK:[2,60],
            overlap:{A_in_old8:POOLA.has(A),E_in_old9:POOLE.has(E),F_in_old7:POOLF.has(F),
                     inCanonical39:!isNew,strictDisjoint:disj},
            provenance:{runId,seed,eIndex:ei,method:"joint E->A->F DFS"},
            A_sha:G.sha(A),E_sha:G.sha(E),F_sha:G.sha(F),ts:new Date().toISOString()};
          if(hits.write(rec3)){found++;if(isNew)newTriples++;if(disj)strictDisjoint++;}
          return;}
        for(let c=0;c<3;c++){if(!needF[c])continue;
          const pos=80+m2,n=pos+1;
          for(let t=0;t<3;t++)qF[t][n]=qF[t][pos];qF[c][n]++;
          if(endClean(qF,n,40)){Fw[m2]=c;needF[c]--;recF(m2+1);needF[c]++;}
          if(fCapped)return;}
      })(0);
      return;}
    for(let c=0;c<3;c++){if(!needA[c])continue;
      const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)qA[t][n]=qA[t][pos];qA[c][n]++;
      if(endClean(qA,n,40)){Aw[m]=c;needA[c]--;recA(m+1);needA[c]++;}
      if(aCapped)return;}
  })(0);
  if((ei+1)%10===0||aCapped)
    prog.write({t:new Date().toISOString(),ev:"E_DONE",ei,eId:eid.slice(0,12),
      aNodes,aCapped,cumHits:found,cumNew:newTriples,secs:+((Date.now()-t0)/1000).toFixed(1)});
  if(FIXED_E)break;
}
manifest.status="COMPLETED";manifest.finishedUtc=new Date().toISOString();
manifest.summary={eExamined:eSeen,eDuplicates:eDup,aefK40Hits:found,
  notInCanonical39:newTriples,strictDisjointTriples:strictDisjoint,
  seconds:+((Date.now()-t0)/1000).toFixed(1)};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
hits.close();prog.close();
console.log(JSON.stringify(manifest.summary,null,1));
