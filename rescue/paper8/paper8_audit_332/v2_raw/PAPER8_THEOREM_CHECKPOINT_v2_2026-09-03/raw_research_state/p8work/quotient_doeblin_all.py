import numpy as np, scipy.sparse as sp,sys,json,time
pid=int(sys.argv[1]);x=float(sys.argv[2]);mstep=int(sys.argv[3]) if len(sys.argv)>3 else 50
Q=np.load(f'/mnt/data/h8cp/a_tilt_quotient_pid{pid}.npz');rr=Q['rows'];cc=Q['cols'];tar=Q['target'];mult=Q['mult'].astype(float);K=len(Q['sizes']);ew=mult*np.where(tar==1,x,1.0)
r=np.ones(K);l=np.ones(K)
for it in range(5000):
 nr=np.bincount(rr,weights=ew*r[cc],minlength=K);nl=np.bincount(cc,weights=ew*l[rr],minlength=K);nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if er<5e-14:break
Ar=np.bincount(rr,weights=ew*r[cc],minlength=K);lam=float(np.dot(l,Ar)/np.dot(l,r));pe=ew*r[cc]/(lam*r[rr]);P=sp.csr_matrix((pe,(rr,cc)),shape=(K,K))
rowsum=np.asarray(P.sum(axis=1)).ravel();print('K',K,'rowerr',max(abs(rowsum-1)),flush=True)
alpha=0.;batch=50;t0=time.time();mins=[]
for st in range(0,K,batch):
 jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)));X[jj,np.arange(len(jj))]=1.0
 for _ in range(mstep):X=P@X
 mn=X.min(axis=0);alpha+=float(mn.sum());mins.extend(mn.tolist())
 if st%500==0:print('st',st,'alpha',alpha,'sec',time.time()-t0,flush=True)
out={'pid':pid,'profile':Q['profile'].tolist(),'x':x,'K':K,'m':mstep,'alpha_all_columns':alpha,'max_minor_col':float(max(mins)),'positive_minor_columns':int(np.sum(np.array(mins)>0)),'pf_err':float(er),'lambda':lam,'seconds':time.time()-t0}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/doeblin_all_pid{pid}_x{x}_m{mstep}.json','w').write(json.dumps(out,indent=2))
