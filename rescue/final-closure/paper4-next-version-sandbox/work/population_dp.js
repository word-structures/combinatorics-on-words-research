'use strict';
/* PRIMARY EXPERIMENT — apply the exact full-eafea K=41..100 DP to the REAL persisted
   populations.  E populations are reproduced deterministically (same seed/generator as
   the original exhaustive runs); A populations are re-enumerated exhaustively per E. */
const fs=require('fs'),path=require('path');
const G=require('./gate.js'),R=require('./rng.js'),P=require('./persist.js');
const DP=require('./dp_fast.js');
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const POOLE=new Set(pools.E);
const which=process.argv[2];                 // R | H
const runId=process.argv[3];
const RUN=path.join(__dirname,'..','runs',runId);

function pre(s,cap){const n=cap+1,q=[new Int32Array(n),new Int32Array(n),new Int32Array(n)];
  for(let i=0;i<s.length;i++){for(let t=0;t<3;t++)q[t][i+1]=q[t][i];q[s.charCodeAt(i)-97][i+1]++;}return q;}
function endClean(q,n,km){const k2=Math.min(km,n>>1);
  for(let k=2;k<=k2;k++){const a=n-2*k,b=n-k;
    if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
  return true;}
/* exact reproduction of the original random-E generator */
function mkGenE(rnd){return function(){
  const need=G.PROFILE.e.slice(),w=new Uint8Array(40);
  const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
  function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
    const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
    for(const c of o){if(!need[c])continue;
      for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
      if(endClean(q,m+1,20)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}
    return false;}
  return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;};}

let Elist=[];
if(which==="R"){const rnd=R.mk(7788),gen=mkGenE(rnd);
  while(Elist.length<60){const E=gen();if(!E)continue;if(POOLE.has(E))continue;Elist.push(E);}}
else Elist=pools.E.slice();

const man={runId,kind:"full-eafea K=41..100 DP over real persisted populations",
  population:which==="R"?"POPULATION R: 60 random non-canonical E (seed 7788, generator reproduced exactly)"
                         :"POPULATION H: 9 historical E",
  eCount:Elist.length,
  dpScope:"eafea only, K=41..100, 3600 windows; exact forbidden-prefix-state DAG over F",
  codeSha:{gate:P.fileSha('gate.js'),dp:P.fileSha('dp_fast.js'),cleanroom:P.fileSha('cleanroom_eafea_projection.js'),runner:P.fileSha(__filename)},
  host:P.host,startedUtc:new Date().toISOString(),status:"RUNNING"};
P.writeAtomic(path.join(RUN,'manifest.json'),man);
const perE=new P.Appender(path.join(RUN,'per_e.jsonl'));
const perPair=new P.Appender(path.join(RUN,'per_pair_summary.jsonl'));

let TOT=0,UNAV=0,DPEMPTY=0,SURV=0;
const t0=Date.now();
Elist.forEach((E,ei)=>{
  const qA=pre(E,80),needA=G.PROFILE.a.slice(),Aw=new Uint8Array(40);
  let aC=0,unav=0,dpEmpty=0,surv=0; let minPaths=null,maxPaths=null;
  const forbHist={},widthMin=[];
  (function recA(m){
    if(m===40){aC++;
      const A=Array.from(Aw).map(x=>"abc"[x]).join("");
      const r=DP.analyzeFast(E,A);
      if(r.unavoidable>0){unav++;dpEmpty++;}
      else if(!r.dpSurvives){dpEmpty++;}
      else{surv++;
        const p=r.paths; if(minPaths===null||p<minPaths)minPaths=p; if(maxPaths===null||p>maxPaths)maxPaths=p;
        widthMin.push(r.minWidth);}
      const bucket=Math.floor(r.forbidden/50)*50; forbHist[bucket]=(forbHist[bucket]||0)+1;
      return;}
    for(let c=0;c<3;c++){if(!needA[c])continue;const pos=40+m,n=pos+1;
      for(let t=0;t<3;t++)qA[t][n]=qA[t][pos];qA[c][n]++;
      if(endClean(qA,n,40)){Aw[m]=c;needA[c]--;recA(m+1);needA[c]++;}}
  })(0);
  TOT+=aC;UNAV+=unav;DPEMPTY+=dpEmpty;SURV+=surv;
  perE.write({ei,E_sha:G.sha(E).slice(0,16),population:which,aComplete:aC,
    dpUnavoidable:unav,dpEmpty,dpSurvives:surv,
    fracKilled:aC?+(dpEmpty/aC).toFixed(6):null,
    minSurvivingPaths:minPaths===null?null:minPaths.toString(),
    maxSurvivingPaths:maxPaths===null?null:maxPaths.toString(),
    medianMinWidth:widthMin.length?widthMin.sort((a,b)=>a-b)[Math.floor(widthMin.length/2)]:null,
    forbiddenHistogram:forbHist,ts:new Date().toISOString()});
});
man.status="COMPLETED";man.finishedUtc=new Date().toISOString();
man.summary={eCount:Elist.length,totalAPairs:TOT,dpUnavoidable:UNAV,dpEmpty:DPEMPTY,dpSurvives:SURV,
  fracKilledByDP:TOT?+(DPEMPTY/TOT).toFixed(6):null,seconds:+((Date.now()-t0)/1000).toFixed(1)};
P.writeAtomic(path.join(RUN,'manifest.json'),man);
perE.close();perPair.close();
console.log(JSON.stringify(man.summary,null,1));
