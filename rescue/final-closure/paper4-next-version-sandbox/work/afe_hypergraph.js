'use strict';
/* §2 — exact AFE K<=40 constraint hypergraph over x_j = p_F(j), j=0..40.
   AFE = A F E ; F is block 1 (positions 40..79).
   Window (s,K): cuts s, s+K, s+2K with coefs (+1,-2,+1).
   Terms whose block is F contribute coef * x_t ; everything else is a constant C(A,E).
   Canonical constraint SHAPE = sorted list of (coef, depth).  Constant depends on (A,E). */
const L=40,V="afe";
const PROFILE={a:[15,14,11],e:[13,16,11],f:[19,11,10]};
const add=(u,w)=>[u[0]+w[0],u[1]+w[1],u[2]+w[2]];
function decomp(p){if(p===L*V.length)return [V.length-1,L];const q=Math.floor(p/L);return [q,p-L*q];}
function S(q){let s=[0,0,0];for(let j=0;j<q;j++)s=add(s,PROFILE[V[j]]);return s;}
const wins=[];
for(let K=2;K<=40;K++)for(let s=0;s+2*K<=L*V.length;s++)wins.push([s,K]);
const shapes=new Map(); const byArity={0:0,1:0,2:0,3:0};
let sameDepthCollision=0;
for(const [s,K] of wins){
  const cuts=[[s,1],[s+K,-2],[s+2*K,1]];
  const fT=[];
  for(const [p,c] of cuts){const [q,t]=decomp(p); if(V[q]==='f')fT.push({c,t});}
  byArity[fT.length]++;
  const depths=fT.map(x=>x.t);
  if(new Set(depths).size!==depths.length)sameDepthCollision++;
  const key=fT.slice().sort((a,b)=>a.t-b.t||a.c-b.c).map(x=>`${x.c}*x${x.t}`).join(" + ");
  if(!shapes.has(key))shapes.set(key,{arity:fT.length,terms:fT.slice().sort((a,b)=>a.t-b.t),n:0});
  shapes.get(key).n++;
}
console.log("AFE K<=40 windows:",wins.length);
console.log("by arity (# F-prefix variables):",JSON.stringify(byArity));
console.log("windows where two cuts hit the SAME F depth:",sameDepthCollision,"(expect 0)");
console.log("distinct canonical constraint SHAPES after dedup:",shapes.size);
console.log("");
const un=[...shapes.values()].filter(x=>x.arity===1);
const bi=[...shapes.values()].filter(x=>x.arity===2);
const te=[...shapes.values()].filter(x=>x.arity===3);
const zr=[...shapes.values()].filter(x=>x.arity===0);
console.log("=== ARITY 0 (F-order-independent) ===");
console.log("  distinct shapes:",zr.length," windows:",zr.reduce((s,x)=>s+x.n,0));
console.log("");
console.log("=== UNARY ===  distinct shapes:",un.length," windows:",un.reduce((s,x)=>s+x.n,0));
{const perDepth={},coef={};
 for(const u of un){const d=u.terms[0].t;perDepth[d]=(perDepth[d]||0)+1;coef[u.terms[0].c]=(coef[u.terms[0].c]||0)+1;}
 console.log("  depths referenced:",Object.keys(perDepth).length,"of 41  (min",Math.min(...Object.keys(perDepth).map(Number)),
   "max",Math.max(...Object.keys(perDepth).map(Number))+")");
 console.log("  coefficient histogram:",JSON.stringify(coef));
 console.log("  shapes per depth: min",Math.min(...Object.values(perDepth)),"max",Math.max(...Object.values(perDepth)));}
console.log("");
console.log("=== BINARY ===  distinct shapes:",bi.length," windows:",bi.reduce((s,x)=>s+x.n,0));
{const pairs=new Set(),span={},coef={};
 for(const b of bi){const [p,q]=b.terms;pairs.add(p.t+","+q.t);
   span[q.t-p.t]=(span[q.t-p.t]||0)+1;coef[[p.c,q.c].join(",")]=(coef[[p.c,q.c].join(",")]||0)+1;}
 const sp=Object.keys(span).map(Number).sort((a,b)=>a-b);
 console.log("  distinct unordered depth pairs (i<j):",pairs.size);
 console.log("  span |j-i|: min",sp[0],"max",sp[sp.length-1],"  distinct spans:",sp.length);
 console.log("  span histogram (first 12):",JSON.stringify(Object.fromEntries(sp.slice(0,12).map(k=>[k,span[k]]))));
 console.log("  coefficient patterns:",JSON.stringify(coef));}
console.log("");
console.log("=== TERNARY ===  distinct shapes:",te.length," windows:",te.reduce((s,x)=>s+x.n,0));
{const trip=new Set(),span={},coef={},arith={eq:0,ne:0};
 for(const t of te){const [p,q,r]=t.terms;trip.add([p.t,q.t,r.t].join(","));
   span[r.t-p.t]=(span[r.t-p.t]||0)+1;coef[[p.c,q.c,r.c].join(",")]=(coef[[p.c,q.c,r.c].join(",")]||0)+1;
   if(q.t-p.t===r.t-q.t)arith.eq++;else arith.ne++;}
 const sp=Object.keys(span).map(Number).sort((a,b)=>a-b);
 console.log("  distinct depth triples:",trip.size);
 console.log("  span k-i: min",sp[0],"max",sp[sp.length-1]);
 console.log("  coefficient patterns:",JSON.stringify(coef));
 console.log("  depths in arithmetic progression (j-i == k-j):",arith.eq,"  not:",arith.ne);}
console.log("");
console.log("=== GLOBAL ===");
{const inc={};let maxRef=0,maxRefAt=null;
 const need=new Map();  // for each depth d, the set of earlier depths referenced by a constraint whose max depth is d
 for(const sh of shapes.values()){
   if(sh.arity===0)continue;
   const ds=sh.terms.map(x=>x.t);
   for(const d of ds)inc[d]=(inc[d]||0)+1;
   const mx=Math.max(...ds);
   if(!need.has(mx))need.set(mx,new Set());
   for(const d of ds)if(d<mx)need.get(mx).add(d);
 }
 for(const [d,s] of need){if(s.size>maxRef){maxRef=s.size;maxRefAt=d;}}
 const incV=Object.values(inc);
 console.log("  constraint incidence per depth: min",Math.min(...incV),"max",Math.max(...incV),
   " total incidences",incV.reduce((a,b)=>a+b,0));
 console.log("  MAX earlier depths referenced when depth d completes:",maxRef,"(at d="+maxRefAt+")");
 // primal graph connectivity + a greedy pathwidth-style upper bound along the natural order
 const adj=new Map();for(let d=0;d<=40;d++)adj.set(d,new Set());
 for(const sh of shapes.values()){if(sh.arity<2)continue;const ds=sh.terms.map(x=>x.t);
   for(const a of ds)for(const b of ds)if(a!==b)adj.get(a).add(b);}
 let edges=0;for(const s of adj.values())edges+=s.size;edges/=2;
 console.log("  primal graph: 41 vertices,",edges,"edges");
 // "active window" bound: max over d of |{earlier depths still needed at d}|
 let maxActive=0;
 for(let d=0;d<=40;d++){const act=new Set();
   for(const sh of shapes.values()){if(sh.arity<2)continue;const ds=sh.terms.map(x=>x.t);
     const mn=Math.min(...ds),mx=Math.max(...ds);
     if(mn<=d&&d<mx)for(const x of ds)if(x<=d)act.add(x);}
   if(act.size>maxActive)maxActive=act.size;}
 console.log("  max simultaneously-active earlier depths (pathwidth-style bound along j=0..40):",maxActive);
 console.log("  => a DP whose state is 'all 41 prefix vectors' is unnecessary, but the active");
 console.log("     window is",maxActive,"deep, so a fixed-lookback DP is NOT sufficient either.");}
