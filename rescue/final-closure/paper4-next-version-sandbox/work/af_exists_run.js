'use strict';
/* §3 runner — exact AF_EXISTS(A) over an EXACTLY DELIMITED deterministic subpopulation:
   the first N distinct A in the persisted enumeration order (no randomness, fully
   reproducible).  Every verdict is exhaustive unless flagged capped. */
const fs=require('fs'),path=require('path');
const {afExists}=require('./af_exists.js');const G=require('./gate.js'),P=require('./persist.js');
const pop=process.argv[2], N=+process.argv[3], CAP=+process.argv[4], runId=process.argv[5];
const arr=JSON.parse(fs.readFileSync(`../runs/distinctA_${pop}.json`,'utf8'));
const RUN=path.join(__dirname,'..','runs',runId);
const man={runId,kind:"exact AF_EXISTS(A) over a delimited deterministic subpopulation",
  population:pop,distinctATotal:arr.length,subpopulation:`first ${N} distinct A in persisted enumeration order`,
  nodeCapPerA:CAP,gateVersion:G.GATE_VERSION,
  codeSha:{gate:P.fileSha('gate.js'),solver:P.fileSha('af_exists.js'),runner:P.fileSha(__filename)},
  host:P.host,startedUtc:new Date().toISOString(),status:"RUNNING"};
P.writeAtomic(path.join(RUN,'manifest.json'),man);
const out=new P.Appender(path.join(RUN,'af_positive.jsonl'));
let pos=0,neg=0,capped=0,nodes=0;const t0=Date.now();
for(let i=0;i<Math.min(N,arr.length);i++){
  const A=arr[i];const r=afExists(A,CAP);nodes+=r.nodes;
  if(r.capped){capped++;continue;}
  if(r.exists){pos++;out.write({id:G.sha("AFEX|"+A),A,F_witness:r.witness,
    A_sha:G.sha(A),F_sha:G.sha(r.witness),population:pop,index:i,nodes:r.nodes,ts:new Date().toISOString()});}
  else neg++;
}
man.status="COMPLETED";man.finishedUtc=new Date().toISOString();
man.summary={population:pop,evaluated:Math.min(N,arr.length),afPositive:pos,afNegative:neg,
  capped,allExhaustive:capped===0,meanNodes:Math.round(nodes/Math.min(N,arr.length)),
  seconds:+((Date.now()-t0)/1000).toFixed(1)};
P.writeAtomic(path.join(RUN,'manifest.json'),man);out.close();
console.log(JSON.stringify(man.summary,null,1));
