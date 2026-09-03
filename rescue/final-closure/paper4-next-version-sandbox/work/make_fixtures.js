'use strict';
const fs=require('fs'),path=require('path');
const G=require('./gate.js');
const TSV=process.argv[2], OUT=process.argv[3];
const lines=fs.readFileSync(TSV,'utf8').split(/\r?\n/).filter(x=>x.length);
const trip=new Map(), afp=new Map();
for(const l of lines){const p=l.split("\t");
  trip.set(p[1]+"|"+p[3]+"|"+p[4],{A:p[1],E:p[3],F:p[4]});
  afp.set(p[1]+"|"+p[4],{A:p[1],F:p[4]});}
console.log("canonical distinct (A,E,F):",trip.size,"  distinct (A,F):",afp.size);

let afPass=0,afFail=0; const afPassList=[],afFailList=[];
for(const {A,F} of afp.values()){
  const r=G.checkAF(A,F);
  if(r.pass){afPass++;afPassList.push({A,F});}
  else{afFail++;afFailList.push({A,F,minK:Math.min(...r.violations.map(v=>v.k)),n:r.violations.length});}
}
console.log("COMPLETE-AF gate (F A F, K<=60) on the 15 canonical AF pairs:");
console.log("   pass:",afPass,"  fail:",afFail);
if(afFailList.length)console.log("   failing minK values:",JSON.stringify(afFailList.map(x=>x.minK)));

let aefPass=0,aefFail=0; const aefFailList=[];
for(const {A,E,F} of trip.values()){
  const r=G.checkAEF(A,E,F);
  if(r.pass)aefPass++; else{aefFail++;aefFailList.push({A,E,F,minK:Math.min(...r.violations.map(v=>v.k))});}
}
console.log("COMPLETE-AEF gate on the 39 canonical triples: pass:",aefPass," fail:",aefFail);

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(path.join(OUT,'negative_aef_39.json'),JSON.stringify(aefFailList,null,1));
fs.writeFileSync(path.join(OUT,'af_complete_pass.json'),JSON.stringify(afPassList,null,1));
fs.writeFileSync(path.join(OUT,'af_complete_fail.json'),JSON.stringify(afFailList,null,1));
// synthetic hard negatives
const syn=[
  {name:"periodic_A",A:"abc".repeat(13)+"a",F:afPassList[0]?afPassList[0].F:[...afp.values()][0].F},
  {name:"wrong_profile_A",A:"a".repeat(40),F:[...afp.values()][0].F},
];
fs.writeFileSync(path.join(OUT,'synthetic_negatives.json'),JSON.stringify(syn,null,1));
console.log("fixtures written to",OUT);
