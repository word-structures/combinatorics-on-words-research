import numpy as np, scipy.sparse as sp, scipy.sparse.linalg as sla, json,sys
pid=int(sys.argv[1]);x=float(sys.argv[2]);
A0=sp.load_npz(f'/mnt/data/h8cp/s3_Atri_pid{pid}.npz').tocsc();B=sp.load_npz(f'/mnt/data/h8cp/s3_Btri_pid{pid}.npz').tocsc();n=A0.shape[0]
# PF lambda of A0+xB
A=A0+x*B;r=np.ones(n);l=np.ones(n)
for it in range(5000):
 nr=A@r;nl=A.T@l;nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if er<3e-14:break
lam=float(np.dot(l,A@r)/np.dot(l,r))
# exact selector factor B=U V^T using active columns
cols=np.unique(B.nonzero()[1]);U=B[:,cols].toarray(); # n x rank, V selects cols
M=(sp.eye(n,format='csc')*lam-A0);lu=sla.splu(M);X=lu.solve(U);K=X[cols,:]  # V^T X
vals=np.linalg.eigvals(K);rho=float(max(abs(vals)));closest=min(vals,key=lambda z:abs(z-1/x))
out={'pid':pid,'x':x,'n':n,'rank':len(cols),'lambda':lam,'kernel_rho':rho,'x_rho':x*rho,'closest_to_1_over_x':[float(closest.real),float(closest.imag)],'target':1/x,'pf_err':float(er),'kernel_min':float(K.min()),'kernel_max':float(K.max())}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/return_kernel_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
