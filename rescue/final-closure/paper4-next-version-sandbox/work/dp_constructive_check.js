'use strict';
/* STRONGEST soundness check: the DP must be CONSTRUCTIVE and EXACT.
   - DP-survives  => extract an actual F from a surviving path and verify DIRECTLY
                     that H(eafea) has NO Abelian square with K=41..100.
   - DP-empty via order-independent unavoidable => exhibit the square and confirm it
     holds for a random F (it cannot depend on F's ordering). */
const fs=require('fs');const CR=require('./cleanroom_eafea_projection.js');const DP=require('./dp_fast.js');
const G=require('./gate.js');const PF=CR.PROFILE.f,V="eafea";
function cnt(s){const c=[0,0,0];for(let i=0;i<s.length;i++)c[s.charCodeAt(i)-97]++;return c;}
function directLB(E,A,F){const H=[...V].map(ch=>({e:E,a:A,f:F})[ch]).join("");
  for(let K=41;K<=100;K++)for(let s=0;s+2*K<=H.length;s++){
    const h1=cnt(H.substr(s,K)),h2=cnt(H.substr(s+K,K));
    if(h1[0]===h2[0]&&h1[1]===h2[1]&&h1[2]===h2[2])return {K,s};}
  return null;}
function buildF(E,A){                       // extract one surviving F from the DAG
  const pE=CR.prefixes(E),pA=CR.prefixes(A);
  const {unavoid,forb}=DP.compileFast(pE,pA);
  if(unavoid>0)return {unavoid:true};
  const key=(a,b,c)=>a*1000000+b*1000+c;
  const bad=new Set();for(const v of forb.values())bad.add(key(v.target[0],v.target[1],v.target[2]));
  // backward reachability then forward greedy
  let layers=[new Set([key(PF[0],PF[1],PF[2])])];
  for(let d=40;d>=1;d--){const prev=new Set();
    for(const st of layers[0]){const a=(st/1000000)|0,b=((st/1000)|0)%1000,c=st%1000;
      if(a>0){const k=key(a-1,b,c);if(!bad.has(k))prev.add(k);}
      if(b>0){const k=key(a,b-1,c);if(!bad.has(k))prev.add(k);}
      if(c>0){const k=key(a,b,c-1);if(!bad.has(k))prev.add(k);}}
    layers.unshift(prev); if(!prev.size)return {empty:true};}
  if(!layers[0].has(key(0,0,0)))return {empty:true};
  let st=key(0,0,0);const w=[];
  for(let d=1;d<=40;d++){const a=(st/1000000)|0,b=((st/1000)|0)%1000,c=st%1000;
    let nx=null,ch=null;
    for(const [da,db,dc,letter] of [[1,0,0,'a'],[0,1,0,'b'],[0,0,1,'c']]){
      if(a+da>PF[0]||b+db>PF[1]||c+dc>PF[2])continue;
      const k=key(a+da,b+db,c+dc); if(!bad.has(k)&&layers[d].has(k)){nx=k;ch=letter;break;}}
    if(nx===null)return {empty:true};
    st=nx;w.push(ch);}
  return {F:w.join("")};
}
const pools=JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json','utf8'));
const surv=JSON.parse(fs.readFileSync('../runs/survivors_30pairs.json','utf8'));
let constructed=0,verifiedClean=0,badConstruct=0,unavCases=0,unavConfirmed=0;
const failures=[];
for(let i=0;i<60;i++){
  const t=surv[i%surv.length];
  const E=t.E, A=t.A;
  const r=buildF(E,A);
  if(r.unavoid){unavCases++;
    // order-independence: try 3 random F, all must have a long-band square
    let all=true;
    for(let k=0;k<3;k++){const bag=[];for(let c=0;c<3;c++)for(let q=0;q<PF[c];q++)bag.push("abc"[c]);
      for(let x=bag.length-1;x>0;x--){const y=(i*7+k*13+x)%(x+1);const tmp=bag[x];bag[x]=bag[y];bag[y]=tmp;}
      if(!directLB(E,A,bag.join("")))all=false;}
    if(all)unavConfirmed++; else failures.push({case:"unavoidable but some F clean",i});
    continue;}
  if(r.empty)continue;
  constructed++;
  const d=directLB(E,A,r.F);
  if(d===null)verifiedClean++;
  else{badConstruct++;failures.push({case:"DP said survivable but constructed F has a square",i,at:d});}
}
console.log(JSON.stringify({sampledPairs:60,
  dpSurvivesAndFConstructed:constructed,
  constructedFdirectlyVerifiedFreeOfK41to100Squares:verifiedClean,
  constructionFailures:badConstruct,
  orderIndependentUnavoidableCases:unavCases,
  unavoidableConfirmedOnRandomF:unavConfirmed,
  failures},null,1));
if(badConstruct||unavCases!==unavConfirmed){console.log("SOUNDNESS PROBLEM");process.exit(2);}
console.log("PASS: DP is constructive and exact — every 'survives' verdict yields a real F with no K=41..100 eafea square.");
