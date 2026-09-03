'use strict';
/* Paper-4 subset-gate core library.  Gate version string is part of every record. */
const crypto=require('crypto');

const GATE_VERSION = "subset-cover-2026-08-28/h6/L40/AF=faf,K<=60;AEF=eafea+fafea,K<=100";

const PROFILE = { a:[15,14,11], b:[11,12,17], c:[10,14,16], d:[12,10,18], e:[13,16,11], f:[19,11,10] };
const AF_COVER  = ["faf"];
const AEF_COVER = ["eafea","fafea"];
const L = 40;

function parikh(w){const p=[0,0,0];for(let i=0;i<w.length;i++)p[w.charCodeAt(i)-97]++;return p;}
function profileOK(w,role){const p=parikh(w),q=PROFILE[role];return w.length===L&&p[0]===q[0]&&p[1]===q[1]&&p[2]===q[2];}

/* Complete abelian-square scan, written straight from the definition:
   UV is an abelian square iff Psi(U)=Psi(V), |U|=|V|=k>=2. */
function squaresUpTo(s,kmax){
  const n=s.length;
  const P0=new Int32Array(n+1),P1=new Int32Array(n+1),P2=new Int32Array(n+1);
  for(let i=0;i<n;i++){P0[i+1]=P0[i];P1[i+1]=P1[i];P2[i+1]=P2[i];
    const c=s.charCodeAt(i)-97; if(c===0)P0[i+1]++;else if(c===1)P1[i+1]++;else P2[i+1]++;}
  const out=[];
  for(let k=2;k<=kmax&&2*k<=n;k++)
    for(let i=0;i+2*k<=n;i++)
      if(P0[i+k]-P0[i]===P0[i+2*k]-P0[i+k] &&
         P1[i+k]-P1[i]===P1[i+2*k]-P1[i+k] &&
         P2[i+k]-P2[i]===P2[i+2*k]-P2[i+k]) out.push([k,i]);
  return out;
}
function hasSquareUpTo(s,kmax){
  const n=s.length;
  const P0=new Int32Array(n+1),P1=new Int32Array(n+1),P2=new Int32Array(n+1);
  for(let i=0;i<n;i++){P0[i+1]=P0[i];P1[i+1]=P1[i];P2[i+1]=P2[i];
    const c=s.charCodeAt(i)-97; if(c===0)P0[i+1]++;else if(c===1)P1[i+1]++;else P2[i+1]++;}
  for(let k=2;k<=kmax&&2*k<=n;k++)
    for(let i=0;i+2*k<=n;i++)
      if(P0[i+k]-P0[i]===P0[i+2*k]-P0[i+k] &&
         P1[i+k]-P1[i]===P1[i+2*k]-P1[i+k] &&
         P2[i+k]-P2[i]===P2[i+2*k]-P2[i+k]) return true;
  return false;
}
const build=(v,blocks)=>{let s="";for(const ch of v)s+=blocks[ch];return s;};
const kmaxFor=v=>Math.floor(v.length*L/2);

/* Complete AF gate: every AF-only obstruction, i.e. H(faf)=F A F, K=2..60. */
function checkAF(A,F){
  if(!profileOK(A,'a')) return {pass:false,reason:"A profile"};
  if(!profileOK(F,'f')) return {pass:false,reason:"F profile"};
  const viol=[];
  for(const v of AF_COVER){
    const s=build(v,{a:A,f:F});
    for(const [k,i] of squaresUpTo(s,kmaxFor(v))) viol.push({cover:v,k,i});
  }
  return {pass:viol.length===0, violations:viol, coverWords:AF_COVER, kmax:AF_COVER.map(kmaxFor)};
}
/* Complete AEF gate: H(eafea)=E A F E A and H(fafea)=F A F E A, K=2..100. */
function checkAEF(A,E,F){
  if(!profileOK(A,'a')) return {pass:false,reason:"A profile"};
  if(!profileOK(E,'e')) return {pass:false,reason:"E profile"};
  if(!profileOK(F,'f')) return {pass:false,reason:"F profile"};
  const viol=[];
  for(const v of AEF_COVER){
    const s=build(v,{a:A,e:E,f:F});
    for(const [k,i] of squaresUpTo(s,kmaxFor(v))) viol.push({cover:v,k,i});
  }
  return {pass:viol.length===0, violations:viol, coverWords:AEF_COVER, kmax:AEF_COVER.map(kmaxFor)};
}
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const afId  = (A,F)   => sha(`AF|${GATE_VERSION}|${A}|${F}`);
const aefId = (A,E,F) => sha(`AEF|${GATE_VERSION}|${A}|${E}|${F}`);

module.exports={GATE_VERSION,PROFILE,AF_COVER,AEF_COVER,L,parikh,profileOK,
  squaresUpTo,hasSquareUpTo,build,kmaxFor,checkAF,checkAEF,sha,afId,aefId};
