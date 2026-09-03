'use strict';
/* Exact integer verification of the h6 spectrum. */
const img={a:'ace',b:'adf',c:'bdf',d:'bdc',e:'afe',f:'bce'}, Ls='abcdef';
const M=Array.from({length:6},()=>new Array(6).fill(0));
for(let j=0;j<6;j++) for(const ch of img[Ls[j]]) M[Ls.indexOf(ch)][j]++;
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));
// characteristic polynomial by Faddeev-LeVerrier (exact rationals not needed: integers here)
function charpoly(A){const n=A.length; let Mk=A.map(r=>r.slice()); const c=[1];
  let I=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
  let Mprev=I.map(r=>r.slice());
  for(let k=1;k<=n;k++){
    Mk = mul(A,Mprev);
    const tr = Mk.reduce((s,r,i)=>s+r[i],0);
    const ck = -tr/k; c.push(ck);
    Mprev = Mk.map((r,i)=>r.map((v,j)=> v + (i===j?ck:0)));
  }
  return c;
}
const cp=charpoly(M);
console.log('characteristic polynomial coefficients (x^6 ... x^0):');
console.log('  ', cp.map(x=>Math.round(x*1e9)/1e9).join('  '));
console.log('=> char poly is x^6 - 3x^5 =', cp.slice(1).every((v,i)=> Math.abs(v-(i===0?-3:0))<1e-9) ? 'CONFIRMED' : 'NOT of that form');
// powers: is M^k = 3^{k-1} * R exactly for some k, with R rank one?
let P=M.map(r=>r.slice());
for(let k=2;k<=7;k++){
  P=mul(M,P);
  const s=Math.pow(3,k-1);
  const scaled=P.map(r=>r.map(v=>v/s));
  const allCols = scaled[0].map((_,j)=>scaled.map(r=>r[j]));
  const same = allCols.every(c=>c.every((v,i)=>Math.abs(v-allCols[0][i])<1e-12));
  console.log('M^'+k+' / 3^'+(k-1)+' : all columns identical = '+same+
    (same? '  -> column = ['+allCols[0].map(x=>x.toFixed(4)).join(', ')+']' : ''));
  if(same) break;
}
// nilpotency of the non-Perron part: M - 3*(rank-one projector)
console.log('\nrank of M:', (()=>{const A=M.map(r=>r.slice());let rank=0;
  for(let c=0,r=0;c<6&&r<6;c++){let p=-1;for(let i=r;i<6;i++)if(Math.abs(A[i][c])>1e-9){p=i;break;}
   if(p<0)continue; [A[r],A[p]]=[A[p],A[r]];
   for(let i=0;i<6;i++) if(i!==r&&Math.abs(A[i][c])>1e-9){const f=A[i][c]/A[r][c];for(let j=0;j<6;j++)A[i][j]-=f*A[r][j];}
   r++;rank++;} return rank;})());
