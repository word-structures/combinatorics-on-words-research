'use strict';
/* CLEAN-ROOM equivalence: direct substring Parikh  vs  my compiled projection.
   Ground truth = actual substrings.  No shared logic with the supplied verifier. */
const CR=require('./cleanroom_eafea_projection.js');
const P=CR.PROFILE, V="eafea";
function mulberry(a){return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);
  t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function rw(p,rnd){const b=[];for(let c=0;c<3;c++)for(let i=0;i<p[c];i++)b.push("abc"[c]);
  for(let i=b.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=b[i];b[i]=b[j];b[j]=t;}return b.join("");}
function cnt(s){const c=[0,0,0];for(let i=0;i<s.length;i++)c[s.charCodeAt(i)-97]++;return c;}
const rnd=mulberry(20260828);
const ws=CR.windows();
let comps=0,agree=0,dis=0,sq=0,byKind={UNAVOIDABLE:0,INACTIVE:0,FORBID:0};
const bad=[];
const TRIALS=+(process.argv[2]||80);
for(let t=0;t<TRIALS;t++){
  const E=rw(P.e,rnd),A=rw(P.a,rnd),F=rw(P.f,rnd);
  const H=[...V].map(ch=>({e:E,a:A,f:F})[ch]).join("");
  const pF=CR.prefixes(F);
  for(const [s,K] of ws){
    const h1=cnt(H.substr(s,K)),h2=cnt(H.substr(s+K,K));
    const direct=(h1[0]===h2[0]&&h1[1]===h2[1]&&h1[2]===h2[2]);
    const c=CR.compile(s,K,E,A);
    let pred;
    if(c.kind==="UNAVOIDABLE")pred=true;
    else if(c.kind==="INACTIVE")pred=false;
    else if(c.kind==="FORBID"){const v=pF[c.j];pred=(v[0]===c.target[0]&&v[1]===c.target[1]&&v[2]===c.target[2]);}
    else pred=null;
    byKind[c.kind]=(byKind[c.kind]||0)+1;
    comps++;
    if(pred===direct){agree++;if(direct)sq++;}
    else{dis++;if(bad.length<5)bad.push({s,K,kind:c.kind,direct,pred});}
  }
}
console.log(JSON.stringify({trials:TRIALS,windowsPerTrial:ws.length,comparisons:comps,
  agree,disagree:dis,genuineSquaresSeen:sq,windowKindTotals:byKind},null,1));
if(dis){console.log("DISAGREEMENTS:",JSON.stringify(bad,null,1));process.exit(2);}
console.log("PASS: clean-room projection is exactly equivalent to direct substring Parikh equality.");
