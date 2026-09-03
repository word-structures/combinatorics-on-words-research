'use strict';
/* Theorem A/B verification at brute-force scale, plus the D_r criterion check. */
const AB='abc';
function words(rho){const n=rho.reduce((a,b)=>a+b,0),out=[],w=[],need=rho.slice();
 (function rec(d){if(d===n){out.push(w.join(''));return;}
  for(let c=0;c<3;c++){if(!need[c])continue;need[c]--;w.push(AB[c]);rec(d+1);w.pop();need[c]++;}})(0);return out;}
const pref=s=>{const a=[[0,0,0]];for(let i=0;i<s.length;i++){const p=a[i].slice();p[s.charCodeAt(i)-97]++;a.push(p);}return a;};

/* ---- THEOREM B: chain realizability -------------------------------------- */
console.log('=== Theorem B: chain condition <=> realizable waypoints ===');
let bTested=0,bFail=0;
for(const rho of [[2,2,1],[3,1,2],[2,1,1],[1,2,2]]){
  const L=rho.reduce((a,b)=>a+b,0), W=words(rho);
  const realized=new Set();
  for(const s of W){const X=pref(s); for(let d1=1;d1<L;d1++)for(let d2=d1+1;d2<L;d2++)
    realized.add(d1+'|'+d2+'|'+X[d1].join(',')+'|'+X[d2].join(','));}
  for(let d1=1;d1<L;d1++)for(let d2=d1+1;d2<L;d2++){
    for(let a1=0;a1<=rho[0];a1++)for(let b1=0;b1<=rho[1];b1++){const c1=d1-a1-b1; if(c1<0||c1>rho[2])continue;
     for(let a2=a1;a2<=rho[0];a2++)for(let b2=b1;b2<=rho[1];b2++){const c2=d2-a2-b2;
      if(c2<c1||c2>rho[2])continue;
      const key=d1+'|'+d2+'|'+[a1,b1,c1].join(',')+'|'+[a2,b2,c2].join(',');
      const chainOK=true; // constructed to satisfy the chain condition
      bTested++; if(chainOK!==realized.has(key)) bFail++;
     }}}
}
console.log('  chain-satisfying waypoint pairs tested:',bTested,' not realizable:',bFail,
  bFail===0?'  => Theorem B HOLDS':'  => COUNTEREXAMPLE');

/* ---- THEOREM A: joint CSP <=> literal existence, 2 roles, shared windows -- */
console.log('\n=== Theorem A: joint prefix-Parikh CSP <=> literal block words ===');
let seed=7; const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
let aTested=0,aFail=0;
for(let trial=0;trial<300;trial++){
  const rhoP=[[2,1,1],[1,2,1],[2,2,1]][Math.floor(rnd()*3)];
  const rhoQ=[[1,1,2],[2,1,1],[1,2,1]][Math.floor(rnd()*3)];
  const LP=rhoP.reduce((a,b)=>a+b,0), LQ=rhoQ.reduce((a,b)=>a+b,0);
  /* random window set: each window is  sum a_j X^(r)_{d_j} + t != 0  */
  const nw=1+Math.floor(rnd()*4), Wset=[];
  for(let i=0;i<nw;i++){
    const terms=[]; const k=1+Math.floor(rnd()*3);
    for(let j=0;j<k;j++){ const r=rnd()<0.5?'P':'Q'; const Lr=r==='P'?LP:LQ;
      terms.push({r,d:1+Math.floor(rnd()*(Lr-1)),a:[1,-2,1][Math.floor(rnd()*3)]}); }
    const t=[Math.floor(rnd()*5)-2,Math.floor(rnd()*5)-2,Math.floor(rnd()*5)-2];
    Wset.push({terms,t});
  }
  const evalW=(W,XP,XQ)=>{const v=[0,0,0];
    for(const tm of W.terms){const X=(tm.r==='P'?XP:XQ)[tm.d];for(let i=0;i<3;i++)v[i]+=tm.a*X[i];}
    return v.every((x,i)=>x+W.t[i]===0);};
  /* literal search */
  const WP=words(rhoP), WQ=words(rhoQ); let literal=false;
  for(const p of WP){const XP=pref(p);
    for(const q of WQ){const XQ=pref(q); if(Wset.every(W=>!evalW(W,XP,XQ))){literal=true;break;}}
    if(literal)break;}
  /* CSP over waypoints at the active depths only, then realize via Theorem B */
  const DP=[...new Set(Wset.flatMap(W=>W.terms.filter(t=>t.r==='P').map(t=>t.d)))].sort((a,b)=>a-b);
  const DQ=[...new Set(Wset.flatMap(W=>W.terms.filter(t=>t.r==='Q').map(t=>t.d)))].sort((a,b)=>a-b);
  const chains=(D,rho,L)=>{const out=[];
    (function rec(i,prev,acc){ if(i===D.length){out.push(acc.slice());return;}
      const d=D[i];
      for(let a=prev[0];a<=rho[0];a++)for(let b=prev[1];b<=rho[1];b++){const c=d-a-b;
        if(c<prev[2]||c>rho[2])continue; acc.push([a,b,c]); rec(i+1,[a,b,c],acc); acc.pop(); }
    })(0,[0,0,0],[]); return out;};
  const CP=chains(DP,rhoP,LP), CQ=chains(DQ,rhoQ,LQ);
  let csp=false;
  for(const cp of CP){const XP={}; DP.forEach((d,i)=>XP[d]=cp[i]);
    for(const cq of CQ){const XQ={}; DQ.forEach((d,i)=>XQ[d]=cq[i]);
      if(Wset.every(W=>!evalW(W,XP,XQ))){csp=true;break;}}
    if(csp)break;}
  aTested++; if(csp!==literal){aFail++;
    if(aFail<3)console.log('  MISMATCH literal='+literal+' csp='+csp+' rhoP='+rhoP+' rhoQ='+rhoQ);}
}
console.log('  trials:',aTested,' mismatches:',aFail, aFail===0?'  => Theorem A HOLDS on this range':'  => COUNTEREXAMPLE FOUND');

/* ---- D_r criterion: is it vacuous? ---------------------------------------- */
console.log('\n=== D_r: when does compression actually occur? ===');
const L=12,n=3;
for(const [label,keep] of [['all starts, K in [2,24]',()=>true],
    ['single K=7, all starts',(s,K)=>K===7],
    ['single start s=0, all K',(s,K)=>s===0],
    ['K in [2,24], s ≡ 0 mod 12',(s,K)=>s%12===0]]){
  const depths=new Set();
  for(let K=2;K<=24;K++)for(let s=0;s+2*K<=n*L;s++){ if(!keep(s,K))continue;
    for(const t of [s,s+K,s+2*K]){const b=Math.floor(t/L),d=t-b*L; if(b===1&&d>0&&d<L)depths.add(d);}}
  console.log('  '+label.padEnd(26)+' D_r = '+String(depths.size).padStart(3)+' / '+(L-1));
}
