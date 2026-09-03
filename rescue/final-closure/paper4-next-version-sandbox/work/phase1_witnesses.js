'use strict';
const fs=require('fs');const BA=require('./boundary_algebra.js');
const d=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const pops=[["CANONICAL39","../runs/diag_canon39.json"],["NEWBASINS24","../runs/diag_newpop.json"]];
const rows=[];
for(const [label,path] of pops){
  for(const w of d(path)){
    const eq=BA.equation(w.cover,w.offset,w.firstBadK);
    if(!eq){console.log("NO EQ for",w.id);continue;}
    rows.push({label,id:w.id,cover:w.cover,s:w.offset,K:w.firstBadK,r:eq.r,
      roles:eq.roles.join(""),offsets:[eq.t0,eq.t1,eq.t2],M:eq.M,key:eq.key,
      halfParikh:w.halfParikh});
  }
}
console.log("witnesses assigned:",rows.length);
const byKey=new Map();for(const r of rows){if(!byKey.has(r.key))byKey.set(r.key,[]);byKey.get(r.key).push(r);}
console.log("DISTINCT boundary-equation classes realized by witnesses:",byKey.size);
console.log("");
console.log("class                                                        count  pops");
const ent=[...byKey.entries()].sort((a,b)=>b[1].length-a[1].length);
for(const [k,v] of ent){
  const pops=[...new Set(v.map(x=>x.label))].join("+");
  console.log(k.padEnd(58),String(v.length).padStart(5),"  "+pops);
}
console.log("");
console.log("role-triple histogram:",JSON.stringify(rows.reduce((a,x)=>(a[x.roles]=(a[x.roles]||0)+1,a),{})));
console.log("r = K-40 histogram   :",JSON.stringify(rows.reduce((a,x)=>(a[x.r]=(a[x.r]||0)+1,a),{})));
console.log("M vectors            :",JSON.stringify([...new Set(rows.map(x=>x.M.join(",")))]));
fs.writeFileSync("../runs/phase1_witness_classes.json",JSON.stringify(rows,null,1));
