'use strict';
/* PHASE 1 — symbolic derivation of the K = 40+r boundary equations in H(v).
 *
 * DERIVATION (from definitions, no fitting):
 *   H(v) = concatenation of |v| blocks of length L=40; position p lies in block
 *   q = floor(p/L) at offset t = p - Lq.  With S(q) = sum_{j<q} m(v[j]) and
 *   p_x(t) = Parikh of the length-t prefix of block x,
 *        P(p) = S(q) + p_{v[q]}(t).
 *   UV at start s with |U|=|V|=K is an Abelian square iff
 *        P(s+2K) - 2P(s+K) + P(s) = 0.
 *   Substituting the three decompositions (s,K) -> (q0,t0),(q1,t1),(q2,t2):
 *        [S(q2) - 2S(q1) + S(q0)]            <- MACRO term M (constant vector)
 *      + [p_{x2}(t2) - 2 p_{x1}(t1) + p_{x0}(t0)] = 0     <- BOUNDARY term
 *   i.e. the normalized boundary equation
 *        p_{x2}(t2) - 2 p_{x1}(t1) + p_{x0}(t0) = -M .
 *
 * A "boundary-equation class" is the deterministic key
 *        ( (x0,t0), (x1,t1), (x2,t2), M ).
 * Two (s,K) pairs sharing that key are literally the same equation.
 */
const L=40;
const PROFILE={a:[15,14,11],b:[11,12,17],c:[10,14,16],d:[12,10,18],e:[13,16,11],f:[19,11,10]};
const add=(u,w)=>[u[0]+w[0],u[1]+w[1],u[2]+w[2]];
const sub=(u,w)=>[u[0]-w[0],u[1]-w[1],u[2]-w[2]];
const neg=u=>[-u[0],-u[1],-u[2]];

function decomp(p,nBlocks){                      // p -> (q,t), t in 0..40
  if(p===L*nBlocks) return [nBlocks-1,L];
  const q=Math.floor(p/L); return [q,p-L*q];
}
function S(v,q){let s=[0,0,0];for(let j=0;j<q;j++)s=add(s,PROFILE[v[j]]);return s;}

/* symbolic equation for cover word v, start s, half-period K */
function equation(v,s,K){
  const n=v.length, tot=L*n;
  if(s<0||s+2*K>tot) return null;
  const [q0,t0]=decomp(s,n), [q1,t1]=decomp(s+K,n), [q2,t2]=decomp(s+2*K,n);
  const M=add(sub(S(v,q2),[2*S(v,q1)[0],2*S(v,q1)[1],2*S(v,q1)[2]]),S(v,q0));
  const terms=[{role:v[q0],t:t0,coef:1},{role:v[q1],t:t1,coef:-2},{role:v[q2],t:t2,coef:1}];
  const rhs=neg(M);                                // boundary terms must equal -M
  const key=`${v[q0]}${t0}|${v[q1]}${t1}|${v[q2]}${t2}|M=${M.join(",")}`;
  return {v,s,K,r:K-L,q0,t0,q1,t1,q2,t2,roles:[v[q0],v[q1],v[q2]],M,rhs,terms,key};
}

/* evaluate the symbolic equation for concrete blocks: returns residual vector */
function residual(eq,blocks){
  const pre={};
  for(const role of new Set(eq.roles)){
    const w=blocks[role]; const arr=[[0,0,0]];
    for(let i=0;i<w.length;i++){const p=arr[i].slice();p[w.charCodeAt(i)-97]++;arr.push(p);}
    pre[role]=arr;
  }
  let acc=eq.M.slice();
  for(const tm of eq.terms){const pv=pre[tm.role][tm.t];
    acc=[acc[0]+tm.coef*pv[0],acc[1]+tm.coef*pv[1],acc[2]+tm.coef*pv[2]];}
  return acc;                                     // zero  <=>  abelian square
}
module.exports={L,PROFILE,decomp,S,equation,residual};

if(require.main===module){
  for(const v of ["eafea","fafea"]){
    const tot=L*v.length; const classes=new Map(); let count=0;
    for(let r=1;r<L;r++){const K=L+r;
      for(let s=0;s+2*K<=tot;s++){
        const eq=equation(v,s,K); if(!eq)continue; count++;
        if(!classes.has(eq.key))classes.set(eq.key,{key:eq.key,roles:eq.roles,M:eq.M,
          offsets:[eq.t0,eq.t1,eq.t2],members:[]});
        classes.get(eq.key).members.push({s,K,r:eq.r});
      }}
    console.log(`${v}: (s,K) pairs with K=40+r, 1<=r<40 : ${count}   distinct equation classes : ${classes.size}`);
    // how many classes have M = 0 (pure boundary identity)?
    let zeroM=0;for(const c of classes.values())if(c.M.every(x=>x===0))zeroM++;
    console.log(`        classes with macro term M = 0 : ${zeroM}`);
  }
}
