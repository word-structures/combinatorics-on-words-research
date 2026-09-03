'use strict';
/* CLEAN-ROOM independent derivation of the full eafea long-band projection.
 * Shares NO code with verify_full_eafea_longband_projection.py.
 * Ground truth for validation is DIRECT substring Parikh equality, never their code.
 *
 * eafea = E A F E A, L=40, blocks 0..4, F is block 2 only (positions 80..119).
 * Equation: sum_i coef_i * P(c_i) = 0, coefs (+1,-2,+1) at c=(s, s+K, s+2K).
 * P(p) = S(q) + p_{v[q]}(t).  S(q) is a sum of fixed profiles -> F-ORDER-INDEPENDENT.
 * F-order dependence enters only via terms with v[q_i]='f'.
 * For K>40, |c_i-c_j| >= K >= 41 > 39, and block 2 spans 40 positions,
 * so AT MOST ONE cut point can lie in block 2.  (verified below, not assumed)
 */
const L=40, V="eafea";
const PROFILE={a:[15,14,11],e:[13,16,11],f:[19,11,10]};
const add=(u,w)=>[u[0]+w[0],u[1]+w[1],u[2]+w[2]];
const mul=(u,k)=>[u[0]*k,u[1]*k,u[2]*k];
function decomp(p){ if(p===L*V.length) return [V.length-1,L]; const q=Math.floor(p/L); return [q,p-L*q]; }
function S(q){let s=[0,0,0];for(let j=0;j<q;j++)s=add(s,PROFILE[V[j]]);return s;}
function prefixes(w){const a=[[0,0,0]];for(let i=0;i<w.length;i++){const p=a[i].slice();p[w.charCodeAt(i)-97]++;a.push(p);}return a;}

/* Compile one window into: {kind, j, coef, target} */
function compile(s,K,E,A){
  const pE=prefixes(E), pA=prefixes(A);
  const cuts=[[s,1],[s+K,-2],[s+2*K,1]];
  let const_=[0,0,0];           // everything F-order-independent
  let fTerms=[];                // {coef, j}
  for(const [p,c] of cuts){
    const [q,t]=decomp(p);
    const_=add(const_,mul(S(q),c));
    const role=V[q];
    if(role==='f') fTerms.push({coef:c,j:t});
    else const_=add(const_,mul(role==='e'?pE[t]:pA[t],c));
  }
  // complete F blocks inside S(q) already counted (fixed profile) -> order independent
  if(fTerms.length===0){
    const active = const_[0]===0&&const_[1]===0&&const_[2]===0;
    return {kind: active?"UNAVOIDABLE":"INACTIVE"};   // holds for EVERY ordering of F, or none
  }
  if(fTerms.length>1) return {kind:"MULTI_F",n:fTerms.length};   // must not happen for K>40
  const {coef,j}=fTerms[0];
  // coef*p_F(j) + const_ = 0  ->  p_F(j) = -const_/coef
  const tgt=[0,1,2].map(k=>-const_[k]/coef);
  const integral=tgt.every(x=>Number.isInteger(x));
  const feasible=integral && tgt.every((x,k)=>x>=0&&x<=PROFILE.f[k]) && tgt[0]+tgt[1]+tgt[2]===j;
  if(!feasible) return {kind:"INACTIVE",reason:integral?"infeasible-state":"non-integral",j,coef};
  return {kind:"FORBID",j,coef,target:tgt};
}

/* enumerate the long band */
function windows(){const out=[];for(let K=41;K<=100;K++)for(let s=0;s+2*K<=L*V.length;s++)out.push([s,K]);return out;}

/* DP over F prefix states avoiding forbidden states */
function dpSurvives(forbidden){
  const key=(a,b,c)=>a*1000000+b*1000+c;
  const F=PROFILE.f;
  let cur=new Set([key(0,0,0)]);
  const bad=new Set(forbidden.map(t=>key(t[0],t[1],t[2])));
  if(bad.has(key(0,0,0)))return {ok:false,depthDied:0,widths:[0]};
  const widths=[1];
  for(let d=1;d<=L;d++){
    const nxt=new Set();
    for(const st of cur){
      const a=Math.floor(st/1000000),b=Math.floor(st/1000)%1000,c=st%1000;
      if(a<F[0]){const k=key(a+1,b,c);if(!bad.has(k))nxt.add(k);}
      if(b<F[1]){const k=key(a,b+1,c);if(!bad.has(k))nxt.add(k);}
      if(c<F[2]){const k=key(a,b,c+1);if(!bad.has(k))nxt.add(k);}
    }
    widths.push(nxt.size);
    if(nxt.size===0)return {ok:false,depthDied:d,widths};
    cur=nxt;
  }
  return {ok:cur.has(key(F[0],F[1],F[2])),depthDied:null,widths};
}

function analyze(E,A){
  const ws=windows();
  let unavoid=0,inactive=0,multi=0; const forb=new Map();
  for(const [s,K] of ws){
    const c=compile(s,K,E,A);
    if(c.kind==="UNAVOIDABLE")unavoid++;
    else if(c.kind==="INACTIVE")inactive++;
    else if(c.kind==="MULTI_F")multi++;
    else forb.set(c.target.join(",")+"@"+c.j,{j:c.j,target:c.target});
  }
  const forbidden=[...forb.values()].map(x=>x.target);
  const byDepth={};for(const x of forb.values())byDepth[x.j]=(byDepth[x.j]||0)+1;
  const dp = unavoid>0 ? {ok:false,depthDied:null,widths:null} : dpSurvives(forbidden);
  return {windows:ws.length,unavoidable:unavoid,inactive,multiF:multi,
          distinctForbiddenStates:forb.size,forbiddenByDepth:byDepth,
          dpSurvives:dp.ok,depthDied:dp.depthDied,minWidth:dp.widths?Math.min(...dp.widths.slice(1,40)):null,
          widths:dp.widths};
}
module.exports={compile,windows,analyze,dpSurvives,prefixes,PROFILE,decomp,S};

if(require.main===module){
  const ws=windows();
  console.log("independent eafea long-band window count (K=41..100):",ws.length);
  // verify the at-most-one-F-cut structural claim over ALL windows and any E,A
  let multi=0,byCount={0:0,1:0};
  for(const [s,K] of ws){
    const cuts=[s,s+K,s+2*K]; let n=0;
    for(const p of cuts){const [q]=decomp(p); if(V[q]==='f')n++;}
    byCount[n]=(byCount[n]||0)+1; if(n>1)multi++;
  }
  console.log("windows by number of cut points inside the unique F block:",JSON.stringify(byCount));
  console.log("windows with MORE THAN ONE F cut point:",multi,"(claim requires 0)");
}
