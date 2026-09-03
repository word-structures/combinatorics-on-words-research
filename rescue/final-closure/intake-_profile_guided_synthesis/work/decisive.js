'use strict';
/* Decisive computation 3: (a) elision DENSITY vs block gap g, which is what
 * observation #3 actually claims; (b) the compression parameter D_r. */
const img={a:'ace',b:'adf',c:'bdf',d:'bdc',e:'afe',f:'bce'}, Ls='abcdef';
const P=[[15,11,10,12,13,19],[14,12,14,10,16,11],[11,17,16,18,11,10]];
const RHO={A:[15,14,11],B:[11,12,17],C:[10,14,16],D:[12,10,18],E:[13,16,11],F:[19,11,10]};
let w='a'; while(w.length<200000){let n='';for(const ch of w)n+=img[ch];w=n;}
const N=[[0,0,0,0,0,0]];
for(let i=0;i<w.length;i++){const p=N[i].slice();p[Ls.indexOf(w[i])]++;N.push(p);}

/* (a) density of windows NOT elidable by the crude box bound.
   Reachable set for a (1,-2,1) signature at profile rho is contained in
   the box  prod_i [-2 rho_i, 2 rho_i].  */
console.log('=== (a) fraction of windows NOT safe-elidable by the box bound ===');
console.log('    (rho = F = (19,11,10), box radius per coord = 2*rho_i = 38,22,20)');
const R=[38,22,20];
console.log('   g      K=g*40     frac NOT elidable');
for(const g of [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]){
  let tot=0,inside=0; const lim=w.length-2*g, step=Math.max(1,Math.floor(lim/20000));
  for(let b=0;b<lim;b+=step){
    const t=P.map((r,i)=>r.reduce((s,x,j)=>s+x*(N[b][j]-2*N[b+g][j]+N[b+2*g][j]),0));
    tot++; if(t.every((v,i)=>Math.abs(v)<=R[i])) inside++;
  }
  console.log('  '+String(g).padStart(5)+'  '+String(g*40).padStart(9)+'      '+
    (inside/tot).toFixed(5)+(inside===0?'   <- all elidable':''));
}

/* (b) compression parameter D_r: distinct active cutpoint depths for one role,
   for the honest window set "all (s,K) with 2<=K<=Kmax inside a cover of n blocks". */
console.log('\n=== (b) D_r = distinct active cutpoint depths for a role, and compression ===');
console.log('  compression factor = product over gaps of multinomial(gap length, profile delta)');
console.log('  D_r = L-1 means the waypoint chain IS the literal word (no compression)');
console.log('    L   Kmax   n_blocks   D_r   (L-1)   D_r/(L-1)');
for(const L of [5,6,8,10,12,16,20,40]){
  for(const Kmax of [2*L, 3*L]){
    const n=3, depths=new Set();
    for(let K=2;K<=Kmax;K++) for(let s=0;s+2*K<=n*L;s++)
      for(const t of [s,s+K,s+2*K]){ const b=Math.floor(t/L), d=t-b*L;
        if(b===1 && d>0 && d<L) depths.add(d); }   // role occupying block 1
    console.log('  '+String(L).padStart(4)+'  '+String(Kmax).padStart(5)+'  '+String(n).padStart(8)+
      '   '+String(depths.size).padStart(4)+'   '+String(L-1).padStart(5)+'    '+
      (depths.size/(L-1)).toFixed(3)+(depths.size===L-1?'   <- NO COMPRESSION':''));
  }
}
