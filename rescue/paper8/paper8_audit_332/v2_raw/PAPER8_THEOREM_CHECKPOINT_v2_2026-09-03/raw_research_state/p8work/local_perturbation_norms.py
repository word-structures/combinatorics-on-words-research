import numpy as np, json, sys, time
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant];f0=(codes%3==0).astype(float)-1/3
pid=int(sys.argv[1]);p=profiles[pid-1];B=sum((int(z)-8/3)**2 for z in p);xs=[1e-6,.01,.1,.5,1.0]
rows=[]
for x in xs:
 wt=np.ones(len(u));wt[ep==pid]=x;r=np.ones(N);l=np.ones(N)
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<3e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=wt*r[v]/(lam*r[u])
 def P(z):return np.bincount(u,weights=trans*z[v],minlength=N)
 f=f0-np.dot(pi,f0)
 def pois(rhs):
  z=np.zeros(N)
  for k in range(5000):
   nz=rhs+P(z);nz-=np.dot(pi,nz);er=np.max(abs(nz-z));z=nz
   if er<1e-12:break
  return z
 up=pois(f);H=2*f*up-f*f;zH=pois(H-np.dot(pi,H))
 targ=ep==pid;base=np.zeros(len(u));base[targ]=r[v[targ]]/(lam*r[u[targ]])
 hbar=np.bincount(u,weights=base,minlength=N);qlog=np.dot(pi,hbar);psi=pois(hbar-qlog)
 ppe=base+trans*(psi[v]-psi[u]-qlog)
 # row l1 norm of derivative kernel
 rowabs=np.bincount(u,weights=np.abs(ppe),minlength=N)
 def Pp(z):return np.bincount(u,weights=ppe*z[v],minlength=N)
 y=Pp(up);y-=np.dot(pi,y);zy=pois(y);term1=np.dot(pi,Pp(zH));dadx=term1+2*np.dot(pi,f*zy)
 # pi derivative pi' = pi P' Z; get via adjoint iteration on forcing b_j=sum_i pi_i P'_ij
 b=np.bincount(v,weights=pi[u]*ppe,minlength=N); b-=b.sum()*pi # numerical zeroing
 # solve row stationary derivative by forward fixed point: eta = b + eta P
 eta=np.zeros(N)
 for kk in range(5000):
  neta=b+np.bincount(v,weights=eta[u]*trans,minlength=N);neta-=neta.sum()*pi;ereta=np.max(abs(neta-eta));eta=neta
  if ereta<1e-13:break
 rows.append(dict(x=x,lambda_=float(lam),da_dx=float(dadx),Pprime_inf=float(rowabs.max()),Pprime_rowabs_mean=float(np.dot(pi,rowabs)),psi_osc=float(np.ptp(psi)),u_osc=float(np.ptp(up)),zH_osc=float(np.ptp(zH)),zy_osc=float(np.ptp(zy)),pi_prime_l1=float(np.abs(eta).sum()),pi_prime_sup=float(np.abs(eta).max()),pf_it=it))
 print(p.tolist(),rows[-1],flush=True)
open(f'/mnt/data/h8cp/local_perturb_norms_pid{pid}.json','w').write(json.dumps({'profile':p.tolist(),'rows':rows},indent=2))
