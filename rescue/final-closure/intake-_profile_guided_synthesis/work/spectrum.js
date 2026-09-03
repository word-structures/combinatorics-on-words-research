'use strict';
/* Decisive computation 1: spectrum of the h6 substitution matrix, the kernel of
 * the Paper-4 profile map, and whether subdominant modes survive projection. */
const L2 = (A)=>{ // eigenvalues via QR iteration (real Schur, good enough for magnitudes)
  const n=A.length; let M=A.map(r=>r.slice());
  for(let it=0; it<20000; it++){
    // Gram-Schmidt QR
    const Q=[],R=Array.from({length:n},()=>new Array(n).fill(0));
    for(let j=0;j<n;j++){
      let v=M.map(r=>r[j]);
      for(let i=0;i<j;i++){ let d=0; for(let k=0;k<n;k++) d+=Q[i][k]*M[k][j]; R[i][j]=d;
        for(let k=0;k<n;k++) v[k]-=d*Q[i][k]; }
      let nn=Math.hypot(...v); R[j][j]=nn;
      Q.push(nn<1e-14? v.map(()=>0) : v.map(x=>x/nn));
    }
    const N=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){let s=0;for(let k=0;k<n;k++)s+=R[i][k]*Q[j][k];N[i][j]=s;}
    M=N;
  }
  return M;
};
// incidence matrix of h6 : M[i][j] = #occurrences of letter i in h6(letter j)
const img={a:'ace',b:'adf',c:'bdf',d:'bdc',e:'afe',f:'bce'};
const Ls='abcdef';
const M=Array.from({length:6},()=>new Array(6).fill(0));
for(let j=0;j<6;j++) for(const ch of img[Ls[j]]) M[Ls.indexOf(ch)][j]++;
console.log('M_h6 (rows a..f, cols a..f):');
M.forEach((r,i)=>console.log('  '+Ls[i]+' '+r.join(' ')));
console.log('column sums:', M[0].map((_,j)=>M.reduce((s,r)=>s+r[j],0)).join(','));
const T=L2(M);
const ev=[]; for(let i=0;i<6;i++) ev.push(T[i][i]);
// detect 2x2 blocks (complex pairs)
const out=[];
for(let i=0;i<6;i++){
  if(i<5 && Math.abs(T[i+1][i])>1e-8){
    const a=T[i][i],b=T[i][i+1],c=T[i+1][i],d=T[i+1][i+1];
    const tr=a+d, det=a*d-b*c, disc=tr*tr/4-det;
    const re=tr/2, im=Math.sqrt(Math.max(0,-disc));
    out.push({re,im,mod:Math.hypot(re,im)}); out.push({re,im:-im,mod:Math.hypot(re,im)});
    i++;
  } else out.push({re:T[i][i],im:0,mod:Math.abs(T[i][i])});
}
out.sort((x,y)=>y.mod-x.mod);
console.log('\neigenvalues (by modulus):');
out.forEach(e=>console.log('   '+e.re.toFixed(6)+(e.im?(e.im>0?' + ':' - ')+Math.abs(e.im).toFixed(6)+'i':'         ')+'   |lambda| = '+e.mod.toFixed(6)));
console.log('\nlambda_1 =', out[0].mod.toFixed(6), ' lambda_2 =', out[1].mod.toFixed(6));
console.log('discrepancy growth exponent  log|l2|/log|l1| =', (Math.log(out[1].mod)/Math.log(out[0].mod)).toFixed(6));
console.log('=> bulk discrepancy', out[1].mod>1 ? 'GROWS like n^'+(Math.log(out[1].mod)/Math.log(3)).toFixed(4) : 'is BOUNDED (|l2|<1)');
