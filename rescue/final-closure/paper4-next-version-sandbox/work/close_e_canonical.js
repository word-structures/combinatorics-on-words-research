'use strict';
/* EXHAUSTIVE complete-AEF closure over a given set of complete-AF pairs.
   DFS driven on the fafea window (prefix F.A.F fixed => full incremental pruning).
   Sound: no abelian square with k>60 fits inside the 120-letter F.A.F prefix,
   and that prefix is already certified by the complete-AF gate (K<=60).
   Every complete-AEF hit is fsync'd immediately. */
const fs=require('fs'),path=require('path');
const G=require('./gate.js'),P=require('./persist.js');
const runId=process.argv[2], pairsFile=process.argv[3], NODECAP=+(process.argv[4]||2e8);
const RUN=path.join(__dirname,'..','runs',runId);
const pairs=JSON.parse(fs.readFileSync(pairsFile,'utf8'));

const manifest={runId,kind:"exhaustive-E-closure",gateVersion:G.GATE_VERSION,
  inputPairsFile:path.basename(pairsFile),inputPairsCount:pairs.length,
  inputPairsSha:P.fileSha(pairsFile),
  eProfile:G.PROFILE.e, aefCover:G.AEF_COVER, aefKmax:G.AEF_COVER.map(G.kmaxFor),
  eDomain:"ALL words of length 40 with Parikh profile (13,16,11) -- full profile class, no sampling",
  method:"DFS on H(fafea)=F.A.F.E.A with incremental abelian-square pruning (squares ending at each new position, K<=100); H(eafea)=E.A.F.E.A verified in full at completion",
  nodeCapPerPair:NODECAP,
  codeSha:{gate:P.fileSha(path.join(__dirname,'gate.js')),runner:P.fileSha(__filename)},
  host:P.host,startedUtc:new Date().toISOString(),status:"RUNNING"};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
const out=new P.Appender(path.join(RUN,'aef_hits.jsonl'));
const per=new P.Appender(path.join(RUN,'per_pair.jsonl'));

let totNodes=0,totComplete=0,totHits=0,anyCapped=false;
pairs.forEach((pr,idx)=>{
  const {A,F}=pr;
  const PRE=F+A+F, NP=PRE.length, T=NP+40;
  const p0=new Int32Array(T+1),p1=new Int32Array(T+1),p2=new Int32Array(T+1);
  for(let i=0;i<NP;i++){p0[i+1]=p0[i];p1[i+1]=p1[i];p2[i+1]=p2[i];
    const c=PRE.charCodeAt(i)-97;if(c===0)p0[i+1]++;else if(c===1)p1[i+1]++;else p2[i+1]++;}
  const need=G.PROFILE.e.slice(); const E=new Uint8Array(40);
  let nodes=0,complete=0,capped=false; const hits=[];
  function endOK(n){const kmax=Math.min(100,n>>1);
    for(let k=2;k<=kmax;k++){const a=n-2*k,b=n-k;
      if(p0[b]-p0[a]===p0[n]-p0[b]&&p1[b]-p1[a]===p1[n]-p1[b]&&p2[b]-p2[a]===p2[n]-p2[b])return false;}
    return true;}
  function rec(m){
    if(++nodes>NODECAP){capped=true;return;}
    if(m===40){complete++;
      const Ew=Array.from(E).map(x=>"abc"[x]).join("");
      const r=G.checkAEF(A,Ew,F);
      if(r.pass){
        const rec2={id:G.aefId(A,Ew,F),kind:"COMPLETE_AEF",A,E:Ew,F,
          A_profile:G.PROFILE.a,E_profile:G.PROFILE.e,F_profile:G.PROFILE.f,
          gateVersion:G.GATE_VERSION,cover:G.AEF_COVER,kRange:[2,100],
          provenance:{runId,pairIndex:idx,afId:G.afId(A,F),inputPairsFile:path.basename(pairsFile)},
          A_sha:G.sha(A),E_sha:G.sha(Ew),F_sha:G.sha(F),ts:new Date().toISOString()};
        if(out.write(rec2)){hits.push(Ew);totHits++;}
      }
      return;}
    for(let c=0;c<3;c++){
      if(!need[c])continue;
      const pos=NP+m,n=pos+1;
      p0[n]=p0[pos];p1[n]=p1[pos];p2[n]=p2[pos];
      if(c===0)p0[n]++;else if(c===1)p1[n]++;else p2[n]++;
      if(endOK(n)){E[m]=c;need[c]--;rec(m+1);need[c]++;}
      if(capped)return;
    }}
  rec(0);
  totNodes+=nodes;totComplete+=complete;if(capped)anyCapped=true;
  per.write({pairIndex:idx,afId:G.afId(A,F),A_sha:G.sha(A).slice(0,16),F_sha:G.sha(F).slice(0,16),
    eNodes:nodes,eComplete:complete,capped,exhaustive:!capped,aefHits:hits.length,
    ts:new Date().toISOString()});
});
manifest.status="COMPLETED";manifest.finishedUtc=new Date().toISOString();
manifest.summary={pairs:pairs.length,totalENodes:totNodes,totalCompleteE:totComplete,
  completeAefHits:totHits,anyPairCapped:anyCapped,
  exhaustiveOverFullEProfileClass:!anyCapped};
P.writeAtomic(path.join(RUN,'manifest.json'),manifest);
out.close();per.close();
console.log(JSON.stringify(manifest.summary,null,1));
