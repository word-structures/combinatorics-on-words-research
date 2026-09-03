'use strict';
/* Structural diagnostic for a population of K<=40-clean AEF triples:
   exact first-bad-K in 41..100, cover, offset, K mod 40, start phase,
   half-Parikh vector of the first violating half, deterministic witness hash. */
const fs=require('fs'),crypto=require('crypto');const G=require('./gate.js');
function analyze(A,E,F){
  let best=null;
  for(const v of G.AEF_COVER){
    const s=G.build(v,{a:A,e:E,f:F}),n=s.length;
    const P=[new Int32Array(n+1),new Int32Array(n+1),new Int32Array(n+1)];
    for(let i=0;i<n;i++){for(let t=0;t<3;t++)P[t][i+1]=P[t][i];P[s.charCodeAt(i)-97][i+1]++;}
    for(let k=41;k<=100&&2*k<=n;k++){
      if(best&&k>=best.k)break;
      for(let i=0;i+2*k<=n;i++)
        if(P[0][i+k]-P[0][i]===P[0][i+2*k]-P[0][i+k]&&P[1][i+k]-P[1][i]===P[1][i+2*k]-P[1][i+k]&&P[2][i+k]-P[2][i]===P[2][i+2*k]-P[2][i+k]){
          const half=[P[0][i+k]-P[0][i],P[1][i+k]-P[1][i],P[2][i+k]-P[2][i]];
          best={k,cover:v,offset:i,kMod40:k%40,startPhase:i%40,startBlock:Math.floor(i/40),
                halfParikh:half,
                witnessHash:crypto.createHash('sha256').update(v+"|"+k+"|"+i+"|"+s.substr(i,2*k)).digest('hex').slice(0,32)};
          break;}
    }
  }
  return best;
}
const file=process.argv[2],label=process.argv[3];
const recs=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(x=>x).map(JSON.parse);
const out=[];
for(const r of recs){
  const a=analyze(r.A,r.E,r.F);
  out.push({id:r.id,src:label,overlap:r.overlap||null,
            firstBadK:a?a.k:null,...(a||{})});
}
const surv=out.filter(x=>x.firstBadK===null);
console.log(`# ${label}: ${out.length} triples`);
const h={};for(const x of out)h[x.firstBadK===null?"SURVIVES_K100":x.firstBadK]=(h[x.firstBadK===null?"SURVIVES_K100":x.firstBadK]||0)+1;
console.log("first-bad-K histogram :",JSON.stringify(h));
const cov={};for(const x of out)if(x.cover)cov[x.cover]=(cov[x.cover]||0)+1;
console.log("cover histogram       :",JSON.stringify(cov));
const ph={};for(const x of out)if(x.startPhase!==undefined)ph[x.startPhase]=(ph[x.startPhase]||0)+1;
console.log("start-phase histogram :",JSON.stringify(ph));
const km={};for(const x of out)if(x.kMod40!==undefined)km[x.kMod40]=(km[x.kMod40]||0)+1;
console.log("K mod 40 histogram    :",JSON.stringify(km));
const hp={};for(const x of out)if(x.halfParikh)hp[x.halfParikh.join(",")]=(hp[x.halfParikh.join(",")]||0)+1;
console.log("half-Parikh histogram :",JSON.stringify(hp));
console.log("survival N(t):");
let line=" ";for(let t=40;t<=50;t++)line+=` N(${t})=${out.filter(x=>x.firstBadK===null||x.firstBadK>t).length}`;
console.log(line);
console.log("SURVIVING THROUGH K<=100 :",surv.length);
if(process.argv[4])fs.writeFileSync(process.argv[4],JSON.stringify(out,null,1));
