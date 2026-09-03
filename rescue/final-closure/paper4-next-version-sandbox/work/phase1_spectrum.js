'use strict';
const BA=require('./boundary_algebra.js');
const L=40;const P=BA.PROFILE;
const l1=v=>Math.abs(v[0])+Math.abs(v[1])+Math.abs(v[2]);
console.log("=== M spectrum over ALL (s,K=40+r) regimes ===");
for(const v of ["eafea","fafea"]){
  const spec=new Map();
  for(let r=1;r<L;r++){const K=L+r;
    for(let s=0;s+2*K<=L*v.length;s++){
      const eq=BA.equation(v,s,K);
      const key=eq.roles.join("")+" | q="+[eq.q0,eq.q1,eq.q2].join(",")+" | M="+eq.M.join(",");
      if(!spec.has(key))spec.set(key,{roles:eq.roles.join(""),q:[eq.q0,eq.q1,eq.q2],M:eq.M,n:0,l1:l1(eq.M)});
      spec.get(key).n++;
    }}
  console.log("\n"+v+":");
  const arr=[...spec.values()].sort((a,b)=>a.l1-b.l1||b.n-a.n);
  for(const x of arr)
    console.log(`   roles=${x.roles}  q=${x.q.join(",")}  M=(${x.M.join(",")})  |M|_1=${String(x.l1).padStart(2)}  pairs=${x.n}`);
  console.log("   MIN |M|_1 =",Math.min(...arr.map(x=>x.l1)));
}
console.log("\n=== derived identity: no-carry regime q=(q0,q0+1,q0+2) ===");
console.log("   M = m(v[q0+1]) - m(v[q0]);  boundary RHS = m(v[q0]) - m(v[q0+1])");
for(const v of ["eafea","fafea"])
  for(let q=0;q+2<v.length;q++){
    const M=[0,1,2].map(i=>P[v[q+1]][i]-P[v[q]][i]);
    console.log(`   ${v} q0=${q}: roles ${v[q]}${v[q+1]}${v[q+2]}  M=m(${v[q+1]})-m(${v[q]})=(${M.join(",")})  |M|_1=${l1(M)}`);
  }
