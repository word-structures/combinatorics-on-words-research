'use strict';
/* Evaluate the 39 distinct (A,E,F) triples of the canonical 14266 ABFE census
 * against the COMPLETE AEF gate: H(eafea) and H(fafea), 2 <= K <= 100.
 * Independent abelian-square test written from the definition.
 */
const fs=require('fs');
const TSV=process.argv[2];
const PROF={a:[15,14,11],b:[11,12,17],c:[10,14,16],d:[12,10,18],e:[13,16,11],f:[19,11,10]};
function parikh(w){const p=[0,0,0];for(const ch of w)p[ch.charCodeAt(0)-97]++;return p;}
function firstSquare(s,kmax){                       // returns {k,i} or null
  const n=s.length,P=[new Int32Array(n+1),new Int32Array(n+1),new Int32Array(n+1)];
  for(let i=0;i<n;i++){for(let t=0;t<3;t++)P[t][i+1]=P[t][i];P[s.charCodeAt(i)-97][i+1]++;}
  for(let k=2;k<=kmax&&2*k<=n;k++)for(let i=0;i+2*k<=n;i++)
    if(P[0][i+k]-P[0][i]===P[0][i+2*k]-P[0][i+k]&&
       P[1][i+k]-P[1][i]===P[1][i+2*k]-P[1][i+k]&&
       P[2][i+k]-P[2][i]===P[2][i+2*k]-P[2][i+k]) return {k,i};
  return null;
}
function allSquares(s,kmax){
  const n=s.length,P=[new Int32Array(n+1),new Int32Array(n+1),new Int32Array(n+1)],out=[];
  for(let i=0;i<n;i++){for(let t=0;t<3;t++)P[t][i+1]=P[t][i];P[s.charCodeAt(i)-97][i+1]++;}
  for(let k=2;k<=kmax&&2*k<=n;k++)for(let i=0;i+2*k<=n;i++)
    if(P[0][i+k]-P[0][i]===P[0][i+2*k]-P[0][i+k]&&
       P[1][i+k]-P[1][i]===P[1][i+2*k]-P[1][i+k]&&
       P[2][i+k]-P[2][i]===P[2][i+2*k]-P[2][i+k]) out.push({k,i});
  return out;
}
const COVER=["eafea","fafea"];                       // independently certified above
function buildH(v,B){return [...v].map(ch=>B[ch]).join("");}

const lines=fs.readFileSync(TSV,'utf8').split(/\r?\n/).filter(x=>x.length);
const triples=new Map();
for(const l of lines){const p=l.split("\t"); triples.set(p[1]+"|"+p[3]+"|"+p[4],true);}
console.log("distinct (A,E,F) triples in census:",triples.size);

// profile check
let profBad=0;
for(const t of triples.keys()){const[A,E,F]=t.split("|");
  if(parikh(A).join()!==PROF.a.join()||parikh(E).join()!==PROF.e.join()||parikh(F).join()!==PROF.f.join())profBad++;}
console.log("triples with wrong role profiles:",profBad);

let clean=0,dirty=0; const shortV=[],longV=[],minKs=[];
for(const t of triples.keys()){
  const[A,E,F]=t.split("|");const B={a:A,e:E,f:F};
  let sh=0,lo=0,mink=null;
  for(const v of COVER){
    const s=buildH(v,B), kmax=Math.floor(s.length/2);   // = 100
    for(const sq of allSquares(s,kmax)){
      if(sq.k<=40)sh++;else lo++;
      if(mink===null||sq.k<mink)mink=sq.k;
    }
  }
  if(sh+lo===0)clean++;else{dirty++;shortV.push(sh);longV.push(lo);minKs.push(mink);}
}
console.log("COMPLETE-AEF gate (H(eafea),H(fafea), 2<=K<=100):");
console.log("  triples PASSING complete gate :",clean);
console.log("  triples FAILING complete gate :",dirty);
const sum=a=>a.reduce((x,y)=>x+y,0);
console.log("  total violations: short(K<=40) =",sum(shortV)," long(K>40) =",sum(longV));
console.log("  min failing K per triple: min=",Math.min(...minKs)," max=",Math.max(...minKs));
const hist={};for(const k of minKs)hist[k]=(hist[k]||0)+1;
console.log("  histogram of minimal failing K:",JSON.stringify(hist));
