'use strict';
/* Decisive computation 2: does the BULK target actually grow, and does the
 * Paper-4 profile map annihilate the growing mode? */
const img={a:'ace',b:'adf',c:'bdf',d:'bdc',e:'afe',f:'bce'}, Ls='abcdef';
// profile matrix P (3 x 6), columns = source letters a..f  (roles A..F)
const P=[[15,11,10,12,13,19],[14,12,14,10,16,11],[11,17,16,18,11,10]];
console.log('P column sums:', P[0].map((_,j)=>P.reduce((s,r)=>s+r[j],0)).join(','));

// 1) does P annihilate the sqrt(3) eigenvectors of M?
const M=Array.from({length:6},()=>new Array(6).fill(0));
for(let j=0;j<6;j++) for(const ch of img[Ls[j]]) M[Ls.indexOf(ch)][j]++;
function nullspaceOf(A,n){ // returns basis of null space of A (n x n), float
  const B=A.map(r=>r.slice()); const piv=[]; let r=0;
  for(let c=0;c<n&&r<n;c++){ let p=-1,best=1e-9;
    for(let i=r;i<n;i++) if(Math.abs(B[i][c])>best){best=Math.abs(B[i][c]);p=i;}
    if(p<0) continue; [B[r],B[p]]=[B[p],B[r]];
    const d=B[r][c]; for(let j=0;j<n;j++) B[r][j]/=d;
    for(let i=0;i<n;i++) if(i!==r) {const f=B[i][c]; if(Math.abs(f)>1e-12) for(let j=0;j<n;j++) B[i][j]-=f*B[r][j];}
    piv.push(c); r++;
  }
  const free=[...Array(n).keys()].filter(c=>!piv.includes(c)); const basis=[];
  for(const fc of free){ const v=new Array(n).fill(0); v[fc]=1;
    piv.forEach((pc,i)=>{ v[pc]=-B[i][fc]; }); basis.push(v); }
  return basis;
}
const s3=Math.sqrt(3);
for(const lam of [s3,-s3]){
  const A=M.map((r,i)=>r.map((v,j)=> v-(i===j?lam:0)));
  const ns=nullspaceOf(A,6);
  for(const v of ns){
    const Pv=P.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
    const nv=Math.hypot(...v), nPv=Math.hypot(...Pv);
    console.log('lambda='+lam.toFixed(6)+'  eigvec='+v.map(x=>x.toFixed(3)).join(',')+
      '\n     P*v = ['+Pv.map(x=>x.toFixed(4)).join(', ')+']   |P v|/|v| = '+(nPv/nv).toFixed(6)+
      (nPv<1e-8?'   *** ANNIHILATED ***':'   -> SURVIVES'));
  }
}
// 2) measure the actual bulk second difference along h6^omega(a)
let w='a'; while(w.length<200000){ let n=''; for(const ch of w) n+=img[ch]; w=n; }
const N=[[0,0,0,0,0,0]];
for(let i=0;i<w.length;i++){ const p=N[i].slice(); p[Ls.indexOf(w[i])]++; N.push(p); }
console.log('\nsource prefix length used:', w.length);
console.log('\n gap g   max |P*(N(b)-2N(b+g)+N(b+2g))|_inf over b   (sampled)');
const rows=[];
for(const g of [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384]){
  let mx=0; const lim=w.length-2*g;
  const step=Math.max(1,Math.floor(lim/4000));
  for(let b=0;b<lim;b+=step){
    const D=[0,0,0,0,0,0];
    for(let k=0;k<6;k++) D[k]=N[b][k]-2*N[b+g][k]+N[b+2*g][k];
    const t=P.map(r=>r.reduce((s,x,j)=>s+x*D[j],0));
    const m=Math.max(...t.map(Math.abs)); if(m>mx)mx=m;
  }
  rows.push({g,mx});
  console.log('  '+String(g).padStart(6)+'      '+String(mx).padStart(8)+'      ratio to sqrt(g): '+(mx/Math.sqrt(g)).toFixed(3));
}
console.log('\nreachable-set radius bound for a (1,-2,1) signature at L=40:  |sigma(X)|_inf <= 4L = 160');
const cross=rows.find(r=>r.mx>160);
console.log('first sampled gap with bulk target exceeding 160:', cross? cross.g : 'none in range');
