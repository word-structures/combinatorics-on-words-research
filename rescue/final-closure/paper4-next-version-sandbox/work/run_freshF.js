'use strict';
/* FRESH-F -> COMPLETE-AF search, fail-closed.
   Every complete-AF hit is fsync'd to af_hits.jsonl the instant it is found.
   Usage: node run_freshF.js <runId> <seed> <numF> <aNodeCapPerF> */
const fs=require('fs'),path=require('path');
const G=require('./gate.js'),P=require('./persist.js'),R=require('./rng.js');

const runId=process.argv[2], seed=+process.argv[3], NUMF=+process.argv[4], ACAP=+process.argv[5];
const RUN=path.join(__dirname,'..','runs',runId);
const rnd=R.mk(seed);

const manifest={
  runId, kind:"freshF->completeAF", gateVersion:G.GATE_VERSION,
  seed, numFRequested:NUMF, aNodeCapPerF:ACAP,
  profiles:{A:G.PROFILE.a,E:G.PROFILE.e,F:G.PROFILE.f}, blockLength:G.L,
  afCover:G.AF_COVER, afKmax:G.AF_COVER.map(G.kmaxFor),
  aefCover:G.AEF_COVER, aefKmax:G.AEF_COVER.map(G.kmaxFor),
  fGeneration:"seeded DFS over profile-(19,11,10) words, F itself abelian-square-free for all K<=20 (K<=|F|/2); letter order shuffled per node by seeded PRNG; restart on exhaustion with next PRNG state",
  aSearch:"exhaustive DFS over profile-(15,14,11) words with incremental pruning on F.A (squares ending at each new position, K<=60); full H(faf)=F.A.F verified at completion; per-F node cap "+ACAP,
  codeSha:{gate:P.fileSha(path.join(__dirname,'gate.js')),
           runner:P.fileSha(__filename),
           persist:P.fileSha(path.join(__dirname,'persist.js')),
           rng:P.fileSha(path.join(__dirname,'rng.js'))},
  host:P.host, startedUtc:new Date().toISOString(), status:"RUNNING"
};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
const afOut=new P.Appender(path.join(RUN,'af_hits.jsonl'));
const prog =new P.Appender(path.join(RUN,'progress.jsonl'));

// ---------- fresh F generation ----------
function genF(){
  const need=G.PROFILE.f.slice(); const w=new Uint8Array(40);
  const p0=new Int32Array(41),p1=new Int32Array(41),p2=new Int32Array(41);
  function endOK(n){const kmax=n>>1;
    for(let k=2;k<=kmax;k++){const a=n-2*k,b=n-k;
      if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
    return true;}
  let nodes=0;
  function rec(m){
    if(++nodes>2e6)return false;
    if(m===40)return true;
    const order=[0,1,2];
    for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=order[i];order[i]=order[j];order[j]=t;}
    for(const c of order){
      if(!need[c])continue;
      p0[m+1]=p0[m];p1[m+1]=p1[m];p2[m+1]=p2[m];
      if(c===0)p0[m+1]++;else if(c===1)p1[m+1]++;else p2[m+1]++;
      if(endOK(m+1)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}
    }
    return false;}
  return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;
}

// ---------- exhaustive A search for a fixed F ----------
function searchA(F){
  const need=G.PROFILE.a.slice(); const A=new Uint8Array(40);
  const T=80; const p0=new Int32Array(T+1),p1=new Int32Array(T+1),p2=new Int32Array(T+1);
  for(let i=0;i<40;i++){p0[i+1]=p0[i];p1[i+1]=p1[i];p2[i+1]=p2[i];
    const c=F.charCodeAt(i)-97;if(c===0)p0[i+1]++;else if(c===1)p1[i+1]++;else p2[i+1]++;}
  function endOK(n){const kmax=Math.min(60,n>>1);
    for(let k=2;k<=kmax;k++){const a=n-2*k,b=n-k;
      if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
    return true;}
  let nodes=0,complete=0,capped=false; const hits=[];
  function rec(m){
    if(++nodes>ACAP){capped=true;return;}
    if(m===40){complete++;
      const Aw=Array.from(A).map(x=>"abc"[x]).join("");
      const r=G.checkAF(Aw,F);
      if(r.pass)hits.push(Aw);
      return;}
    for(let c=0;c<3;c++){
      if(!need[c])continue;
      const pos=40+m,n=pos+1;
      p0[n]=p0[pos];p1[n]=p1[pos];p2[n]=p2[pos];
      if(c===0)p0[n]++;else if(c===1)p1[n]++;else p2[n]++;
      if(endOK(n)){A[m]=c;need[c]--;rec(m+1);need[c]++;}
      if(capped)return;
    }}
  rec(0);
  return {nodes,complete,capped,hits};
}

let fSeen=0,fDup=0,afHits=0,fCapped=0; const fIds=new Set();
for(let i=0;i<NUMF;i++){
  const F=genF();
  if(!F){prog.write({t:new Date().toISOString(),ev:"F_GEN_FAIL",i});continue;}
  const fid=G.sha("F|"+G.GATE_VERSION+"|"+F);
  if(fIds.has(fid)){fDup++;continue;}
  fIds.add(fid); fSeen++;
  const r=searchA(F);
  if(r.capped)fCapped++;
  for(const A of r.hits){
    const rec={id:G.afId(A,F),kind:"COMPLETE_AF",A,F,
      A_profile:G.PROFILE.a,F_profile:G.PROFILE.f,
      gateVersion:G.GATE_VERSION,cover:G.AF_COVER,kRange:[2,60],
      provenance:{runId,seed,fIndex:i,fId:fid,method:"freshF-seededDFS + exhaustive-A-DFS"},
      A_sha:G.sha(A),F_sha:G.sha(F),ts:new Date().toISOString()};
    if(afOut.write(rec))afHits++;          // fsync'd inside write()
  }
  if((i+1)%25===0||r.hits.length)
    prog.write({t:new Date().toISOString(),ev:"F_DONE",i,fId:fid.slice(0,12),
      aNodes:r.nodes,aComplete:r.complete,capped:r.capped,hits:r.hits.length,cumAfHits:afHits});
}
manifest.status="COMPLETED";manifest.finishedUtc=new Date().toISOString();
manifest.summary={fGenerated:fSeen,fDuplicates:fDup,fWithCappedASearch:fCapped,completeAfHits:afHits};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
afOut.close();prog.close();
console.log(JSON.stringify(manifest.summary,null,1));
