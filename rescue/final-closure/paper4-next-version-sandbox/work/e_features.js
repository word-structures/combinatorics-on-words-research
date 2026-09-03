'use strict';
/* PHASE 2 — exact features of E words, chosen because they appear in the
   Phase-1 boundary equations (prefix Parikh vectors), not by arbitrary selection. */
const fs=require('fs');const G=require('./gate.js');
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
function prefixes(w){const a=[[0,0,0]];for(let i=0;i<w.length;i++){const p=a[i].slice();p[w.charCodeAt(i)-97]++;a.push(p);}return a;}
function feats(E){
  const pre=prefixes(E);
  const suf=pre.map((p,i)=>[pre[40][0]-p[0],pre[40][1]-p[1],pre[40][2]-p[2]]);
  const pms=pre.map((p,i)=>[p[0]-suf[i][0],p[1]-suf[i][1],p[2]-suf[i][2]]);
  // internal abelian-square status
  let minSq=null;for(let k=2;2*k<=40&&minSq===null;k++)for(let i=0;i+2*k<=40;i++){
    const a=pre[i+k],b=pre[i],c=pre[i+2*k];
    if(a[0]-b[0]===c[0]-a[0]&&a[1]-b[1]===c[1]-a[1]&&a[2]-b[2]===c[2]-a[2]){minSq=k;break;}}
  // drift: how far prefix deviates from the linear interpolation t/40 * m(E)
  const m=pre[40];let maxDrift=0,sumAbsDrift=0;
  for(let t=0;t<=40;t++){const d=[0,1,2].map(j=>pre[t][j]-m[j]*t/40);
    const n=Math.max(...d.map(Math.abs));maxDrift=Math.max(maxDrift,n);sumAbsDrift+=d.reduce((s,x)=>s+Math.abs(x),0);}
  return {sha:G.sha(E).slice(0,12),profile:pre[40],minInternalSquareK:minSq,
    maxPrefixDrift:+maxDrift.toFixed(3),meanAbsDrift:+(sumAbsDrift/41).toFixed(3),
    prefix10:pre[10],prefix20:pre[20],prefix30:pre[30],
    prefixMinusSuffix20:pms[20]};
}
console.log("historical E words — exact features (prefix Parikh data appears directly in the Phase-1 equations)\n");
console.log("idx sha          minSqK  maxDrift  meanAbsDrift  p(10)      p(20)      p(30)");
pools.E.forEach((E,i)=>{const f=feats(E);
  console.log(String(i).padStart(3),f.sha,String(f.minInternalSquareK).padStart(6),
    String(f.maxPrefixDrift).padStart(9),String(f.meanAbsDrift).padStart(13),
    "  ["+f.prefix10.join(",")+"]  ["+f.prefix20.join(",")+"]  ["+f.prefix30.join(",")+"]");
});
// compare against random E
function mulberry(a){return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);
  t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd=mulberry(7788);
function genE(){const need=G.PROFILE.e.slice();const w=new Uint8Array(40);
 const q=[new Int32Array(41),new Int32Array(41),new Int32Array(41)];let nodes=0;
 function ok(n){const km=Math.min(20,n>>1);
   for(let k=2;k<=km;k++){const a=n-2*k,b=n-k;
     if(q[0][b]-q[0][a]===q[0][n]-q[0][b]&&q[1][b]-q[1][a]===q[1][n]-q[1][b]&&q[2][b]-q[2][a]===q[2][n]-q[2][b])return false;}
   return true;}
 function rec(m){if(++nodes>2e6)return false;if(m===40)return true;
   const o=[0,1,2];for(let i=2;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=o[i];o[i]=o[j];o[j]=t;}
   for(const c of o){if(!need[c])continue;for(let t=0;t<3;t++)q[t][m+1]=q[t][m];q[c][m+1]++;
     if(ok(m+1)){w[m]=c;need[c]--;if(rec(m+1))return true;need[c]++;}}return false;}
 return rec(0)?Array.from(w).map(x=>"abc"[x]).join(""):null;}
const rd=[];for(let i=0;i<60;i++){const E=genE();if(E)rd.push(feats(E));}
const avg=k=>(rd.reduce((s,x)=>s+x[k],0)/rd.length).toFixed(3);
const havg=k=>(pools.E.reduce((s,E)=>s+feats(E)[k],0)/pools.E.length).toFixed(3);
console.log("\n              historical(9)   random(60, same seed as the exhaustive zero run)");
console.log("maxPrefixDrift  ",havg("maxPrefixDrift").padStart(8),"      ",avg("maxPrefixDrift"));
console.log("meanAbsDrift    ",havg("meanAbsDrift").padStart(8),"      ",avg("meanAbsDrift"));
