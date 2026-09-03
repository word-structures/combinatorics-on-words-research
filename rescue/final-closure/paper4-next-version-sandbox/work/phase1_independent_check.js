'use strict';
/* INDEPENDENT CHECK of the Phase-1 symbolic derivation.
 * Shares NO code with boundary_algebra.js: it rebuilds H(v) as an actual string,
 * slices the two halves as substrings, counts letters directly, and compares that
 * boolean against the symbolic residual.  Fails closed on ANY disagreement. */
const BA=require('./boundary_algebra.js');
const L=40;
const PROF={a:[15,14,11],e:[13,16,11],f:[19,11,10]};
function mkRandom(prof,rnd){                 // profile-correct random word, no gate
  const bag=[];for(let c=0;c<3;c++)for(let i=0;i<prof[c];i++)bag.push("abc"[c]);
  for(let i=bag.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=bag[i];bag[i]=bag[j];bag[j]=t;}
  return bag.join("");
}
function mulberry(a){return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);
  t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function countLetters(s){const c=[0,0,0];for(let i=0;i<s.length;i++)c[s.charCodeAt(i)-97]++;return c;}

const rnd=mulberry(424242);
let tested=0,agree=0,disagree=0,sqTrue=0;
const bad=[];
for(let trial=0;trial<40;trial++){
  const blocks={a:mkRandom(PROF.a,rnd),e:mkRandom(PROF.e,rnd),f:mkRandom(PROF.f,rnd)};
  for(const v of ["eafea","fafea"]){
    const H=[...v].map(ch=>blocks[ch]).join("");   // actual 200-letter string
    const tot=H.length;
    for(let r=1;r<L;r++){const K=L+r;
      for(let s=0;s+2*K<=tot;s++){
        // DIRECT: slice the two halves and count letters
        const h1=countLetters(H.substr(s,K)), h2=countLetters(H.substr(s+K,K));
        const direct=(h1[0]===h2[0]&&h1[1]===h2[1]&&h1[2]===h2[2]);
        // SYMBOLIC: residual of the derived boundary equation
        const eq=BA.equation(v,s,K);
        const res=BA.residual(eq,blocks);
        const symbolic=(res[0]===0&&res[1]===0&&res[2]===0);
        tested++;
        if(direct===symbolic){agree++;if(direct)sqTrue++;}
        else{disagree++;if(bad.length<5)bad.push({v,s,K,direct,symbolic,res});}
      }}
  }
}
console.log(JSON.stringify({trials:40,covers:2,comparisons:tested,agree,disagree,
  actualAbelianSquaresSeen:sqTrue},null,1));
if(disagree){console.log("DISAGREEMENTS:",JSON.stringify(bad,null,1));process.exit(2);}
console.log("PASS: symbolic boundary equation is exactly equivalent to direct Parikh equality on every tested (v,s,r).");
