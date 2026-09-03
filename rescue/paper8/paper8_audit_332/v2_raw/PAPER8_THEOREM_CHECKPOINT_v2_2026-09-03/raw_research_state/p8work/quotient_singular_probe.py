import numpy as np, scipy.sparse as sp
from scipy.sparse.linalg import svds
import sys, json
pid=int(sys.argv[1]);x=float(sys.argv[2])
Q=np.load(f'/mnt/data/h8cp/quotient_pid{pid}.npz');nxt=Q['nxt'];typ=Q['typ'];K=nxt.shape[0];cc,ss=np.where(nxt>=0);dd=nxt[cc,ss];tt=typ[cc,ss];ew=np.where(tt==1,x,1.0)
r=np.ones(K);l=np.ones(K)
for it in range(5000):
 nr=np.bincount(cc,weights=ew*r[dd],minlength=K);nl=np.bincount(dd,weights=ew*l[cc],minlength=K);nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if er<3e-13:break
Ar=np.bincount(cc,weights=ew*r[dd],minlength=K);lam=float(np.dot(l,Ar)/np.dot(l,r));l/=np.dot(l,r);pi=l*r;pi/=pi.sum();pe=ew*r[dd]/(lam*r[cc])
P=sp.csr_matrix((pe,(cc,dd)),shape=(K,K))
sq=np.sqrt(pi); S=sp.diags(sq)@P@sp.diags(1/sq)
# top singular values
sv=svds(S,k=4,which='LM',return_singular_vectors=False,tol=1e-10,maxiter=100000);sv=np.sort(sv)[::-1]
out={'pid':pid,'profile':Q['profile'].tolist(),'x':x,'K':K,'lambda':lam,'pf_err':float(er),'singular_values':sv.tolist(),'pi_min':float(pi.min()),'pi_max':float(pi.max())}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/singular_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
